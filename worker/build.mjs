import {mkdir,readFile,readdir,writeFile} from 'node:fs/promises';
import {join,extname} from 'node:path';

const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.jpg':'image/jpeg','.webp':'image/webp'};
const assets={};
async function collect(directory, prefix=''){
 for(const entry of await readdir(directory,{withFileTypes:true})){
  const relative=prefix+'/'+entry.name;
  if(relative==='/server'||relative==='/.openai')continue;
  const path=join(directory,entry.name);
  if(entry.isDirectory())await collect(path,relative);
  else{
   const type=types[extname(entry.name)];
   if(type)assets[relative]=[type,(await readFile(path)).toString('base64')];
  }
 }
}

await collect('dist');
await mkdir('dist/server',{recursive:true});
await mkdir('dist/.openai',{recursive:true});
await writeFile('dist/.openai/hosting.json',await readFile('.openai/hosting.json'));
const worker=await readFile('worker/index.js','utf8');
await writeFile('dist/server/index.js',worker+'\nconst siteAssets = '+JSON.stringify(assets)+';\n');
