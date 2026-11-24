'use strict';

const profileStorage=(()=>{
 const guestKey='cine-kingdom-v1';
 let user=null, revision=0, pending=null, conflict=null, saving=false, available=true, cachedInBrowser=true;
 let apply=()=>{}, update=()=>{};
 const status=()=>!available?'계정 연결을 확인할 수 없어요. 게스트 기록은 이 브라우저에 저장돼요.'
  :!user?'게스트 · 이 브라우저에 저장'
  :conflict?'다른 기기에서 기록이 변경됐어요.'
  :saving?'계정에 저장 중…'
  :pending?(cachedInBrowser?'이 기기에 임시 저장했어요. 연결되면 다시 저장할 수 있어요.':'아직 저장하지 못했어요. 이 화면에서 다시 저장해 주세요.')
  :'계정에 저장됨';
 const returnPath=encodeURIComponent('/#character');
 const signIn='/signin-with-chatgpt?return_to='+returnPath;
 const signOut='/signout-with-chatgpt?return_to='+returnPath;
 const cacheKey=()=>guestKey+':pending:'+user.id;
 function read(key){
  try{return JSON.parse(localStorage.getItem(key));}catch{return null;}
 }
 function cache(){
  try{
   if(pending)localStorage.setItem(cacheKey(),JSON.stringify({revision,snapshot:pending}));
   else localStorage.removeItem(cacheKey());
   return true;
  }catch{return false;}
 }
 function panel(){
  const statusLine='<p id="profile-sync-status" class="subtle" role="status">'+status()+'</p>';
  if(!user)return '<section class="panel account-panel"><h2>계정 저장</h2>'+statusLine+
   '<a class="account-action" href="'+signIn+'" target="_top">ChatGPT로 로그인</a></section>';
  return '<section class="panel account-panel"><h2>내 계정</h2>'+statusLine+
   '<div class="account-actions"><button type="button" id="profile-import" data-profile="import" hidden>이 브라우저 기록 가져오기</button>'+
   '<button type="button" id="profile-retry" data-profile="retry" hidden>다시 저장</button>'+
   '<button type="button" id="profile-cloud" data-profile="cloud" hidden>계정 기록 불러오기</button>'+
   '<button type="button" id="profile-device" data-profile="device" hidden>이 기기 기록으로 저장</button>'+
   '<a class="account-action" href="'+signOut+'" target="_top">로그아웃</a></div></section>';
 }
 function paint(){
  const link=document.querySelector('#account-link');
  link.textContent=user?'내 계정':'로그인';
  link.href=user?'#character':signIn;
  link.target=user?'_self':'_top';
  link.hidden=false;
  const line=document.querySelector('#profile-sync-status');
  if(line)line.textContent=status();
  for(const [id,visible] of Object.entries({
   import:user&&revision===0&&!pending&&!conflict&&!!read(guestKey),
   retry:user&&pending&&!saving&&!conflict,
   cloud:!!conflict,
   device:!!conflict
  })){
   const button=document.querySelector('#profile-'+id);
   if(button)button.hidden=!visible;
  }
 }
 async function flush(){
  if(!user||saving||conflict||!pending)return;
  const candidate=pending;
  saving=true;
  paint();
  let retryQueued=false;
  try{
   const response=await fetch('/api/profile',{
    method:'PUT',headers:{'Content-Type':'application/json'},cache:'no-store',
    body:JSON.stringify({userId:user.id,revision,snapshot:candidate})
   });
   if(response.status===409){
    conflict=await response.json();
    return;
   }
   if(!response.ok)throw new Error('Profile save failed');
   const value=await response.json();
   revision=value.revision;
   if(pending===candidate)pending=null;
   cache();
   retryQueued=!!pending;
  }catch{
   // Keep the pending record to retry on reconnect or after reloading.
  }finally{
   saving=false;
   paint();
   if(retryQueued)void flush();
  }
 }
 async function start(callback, repaint){
  apply=callback;
  update=repaint;
  let snapshot=read(guestKey);
  try{
   const response=await fetch('/api/profile',{cache:'no-store',signal:AbortSignal.timeout(5000)});
   if(!response.ok)throw new Error('Profile load failed');
   const profile=await response.json();
   if(profile.user){
    user=profile.user;
    revision=profile.revision;
    snapshot=profile.snapshot;
    const cached=read(cacheKey());
    if(cached){
     if(JSON.stringify(cached.snapshot)===JSON.stringify(snapshot))cache();
     else{
      pending=cached.snapshot;
      if(cached.revision!==revision)conflict=profile;
      snapshot=pending;
     }
    }
   }
  }catch{
   available=false;
  }
  apply(snapshot);
  update();
  paint();
  void flush();
 }
 function save(state){
  if(!user){localStorage.setItem(guestKey,JSON.stringify(state));return;}
  pending=JSON.parse(JSON.stringify(state));
  cachedInBrowser=cache();
  void flush();
 }
 function action(name){
  if(name==='retry'){void flush();return;}
  if(name==='import'&&user&&revision===0&&!pending){
   const guest=read(guestKey);
   if(guest){const imported=apply(guest);save(imported);update();paint();}
   return;
  }
  if(!conflict)return;
  if(name==='cloud'&&confirm('이 기기의 미저장 변경을 계정 기록으로 바꿀까요?')){
   const snapshot=conflict.snapshot;
   revision=conflict.revision;
   conflict=null;
   pending=null;
   cache();
   apply(snapshot);
   update();
   paint();
  }else if(name==='device'&&confirm('계정의 최신 기록을 이 기기의 기록으로 바꿀까요?')){
   revision=conflict.revision;
   conflict=null;
   cachedInBrowser=cache();
   void flush();
  }
 }
 window.addEventListener('online',()=>void flush());
 return {start,save,action,paint,panel};
})();
