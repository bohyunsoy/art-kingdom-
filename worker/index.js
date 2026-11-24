const noStore = {'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'};
const maxProfileBytes = 1_800_000;
const safeJSON = (value, status=200)=>Response.json(value,{status,headers:noStore});

function validSnapshot(value){
 if(!value||typeof value!=='object'||Array.isArray(value))return false;
 const records=['reviews','cupVotes','cupMatchRules','character'];
 const lists=['addedFilms','lifeFilms','throneHistory','criteria','compared'];
 return records.every(key=>value[key]&&typeof value[key]==='object'&&!Array.isArray(value[key]))
  &&lists.every(key=>Array.isArray(value[key]))
  &&value.criteria.length>0
  &&(value.cupRules===null||Array.isArray(value.cupRules));
}

async function readProfile(db,userId){
 return db.prepare('SELECT revision, snapshot FROM profiles WHERE user_id = ?').bind(userId).first();
}
async function profile(request, env, url){
 const userId=request.headers.get('oai-authenticated-user-id');
 const method=request.method;
 if(method!=='GET'&&method!=='PUT')return new Response(null,{status:405,headers:{...noStore,Allow:'GET, PUT'}});
 if(!userId)return method==='GET'?safeJSON({user:null}):safeJSON({error:'sign_in_required'},401);
 if(method==='GET'){
  const row=await readProfile(env.DB,userId);
  return safeJSON({user:{id:userId},revision:row?.revision??0,snapshot:row?JSON.parse(row.snapshot):null});
 }
 if(request.headers.get('origin')!==url.origin)return safeJSON({error:'origin_mismatch'},403);
 if(!request.headers.get('content-type')?.startsWith('application/json'))return safeJSON({error:'invalid_content_type'},415);
 if(Number(request.headers.get('content-length'))>maxProfileBytes)return safeJSON({error:'profile_too_large'},413);
 const raw=await request.text();
 if(new TextEncoder().encode(raw).length>maxProfileBytes)return safeJSON({error:'profile_too_large'},413);
 let input;
 try{input=JSON.parse(raw);}catch{return safeJSON({error:'invalid_json'},400);}
 if(!input||!Number.isSafeInteger(input.revision)||input.revision<0||!validSnapshot(input.snapshot)){
  return safeJSON({error:'invalid_profile'},400);
 }
 if(input.userId!==userId)return safeJSON({error:'session_changed'},401);
 const {revision}=input;
 const snapshot=JSON.stringify(input.snapshot);
 const result=revision===0
  ?await env.DB.prepare('INSERT OR IGNORE INTO profiles (user_id, revision, snapshot) VALUES (?, 1, ?)').bind(userId,snapshot).run()
  :await env.DB.prepare('UPDATE profiles SET revision = revision + 1, snapshot = ? WHERE user_id = ? AND revision = ?').bind(snapshot,userId,revision).run();
 if(result.meta.changes)return safeJSON({revision:revision+1});
 const row=await readProfile(env.DB,userId);
 if(row?.snapshot===snapshot)return safeJSON({revision:row.revision});
 return safeJSON({error:'profile_conflict',revision:row?.revision??0,snapshot:row?JSON.parse(row.snapshot):null},409);
}

export default {
 async fetch(request,env){
  const url=new URL(request.url);
  if(url.pathname==='/api/profile'){
   try{return await profile(request,env,url);}
   catch{return safeJSON({error:'storage_unavailable'},503);}
  }
  const path=url.pathname==='/'?'/index.html':url.pathname;
  if(!Object.hasOwn(siteAssets,path))return new Response('Not found',{status:404});
  if(request.method!=='GET'&&request.method!=='HEAD')return new Response(null,{status:405,headers:{Allow:'GET, HEAD'}});
  const [type,contents]=siteAssets[path];
  return new Response(request.method==='HEAD'?null:Uint8Array.from(atob(contents),char=>char.charCodeAt(0)),{
   headers:{'Content-Type':type,'Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'}
  });
 }
};
