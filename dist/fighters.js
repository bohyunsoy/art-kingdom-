'use strict';

// [silhouette, fabric, light, accessory, skin, hair]
const filmFighters = {
 interstellar:['armor','#8797bb','#f3f2df','helmet','#d5a084','#4c3439'],
 dune:['cloak','#694c4b','#f4a967','scarf','#cf9474','#33242f'],
 blade:['coat','#665447','#fba255','visor','#e2a783','#4b323a'],
 parasite:['suit','#343e53','#88cfbb','case','#d8a089','#2f2436'],
 inception:['suit','#525575','#9ad9ef','totem','#e2ac89','#503640'],
 arrival:['coat','#bc5a36','#ffce60','signal','#e6ab83','#8a473f'],
 her:['shirt','#b94655','#ffbca1','glasses','#e6ae86','#613d38'],
 whiplash:['shirt','#394b63','#ffca65','sticks','#e7ae83','#4d3541'],
 everything:['coat','#a03e58','#f5d351','signal','#cf8e6c','#3b2636'],
 spirited:['shirt','#af5c66','#f8e6b4','charm','#dca178','#463140'],
 grand:['suit','#824caa','#f8cc6d','case','#efb78d','#6a483e'],
 matrix:['coat','#28383d','#8dfbb4','glasses','#daa785','#342d3d'],
 tt1160419:['cloak','#826044','#f0ba68','scarf','#cc9a79','#463134'],
 tt0241527:['cloak','#502c50','#ffca71','wand','#e8aa85','#4a2e37'],
 tt0468569:['armor','#3a4160','#e3cf71','cowl','#ce957b','#242a43'],
 tt5311514:['shirt','#626fbe','#ffd08b','charm','#e2ac86','#432e41'],
 tt0096283:['coat','#598ab3','#f3d667','leaf','#e2aa82','#544038'],
 tt15398776:['suit','#5a6477','#ffbe72','hat','#dfa286','#69544e'],
 tt1517268:['coat','#c04395','#ffd39c','glasses','#e7ad83','#dfb36b'],
 tt0118694:['coat','#904367','#fca56e','flower','#da9f7f','#39273e'],
 tt0111161:['shirt','#617a89','#e6c38d','book','#dfa587','#473440'],
 tt0137523:['coat','#a94b53','#ffbc8b','glasses','#d99c7e','#7c5145'],
 tt0364569:['suit','#433753','#f38a7b','curls','#d5a181','#342534'],
 tt5700672:['suit','#345772','#92dced','case','#d8a482','#2a2739'],
 tt4633694:['armor','#54436d','#ff73a2','cowl','#9b604d','#39263a']
};

const genreFighters = {
 'SF':['armor','visor', ['#436e9d','#5a4793','#356f78'], ['#a1f8e1','#ff9cce','#a8c9ff']],
 '스릴러':['coat','scarf', ['#493d65','#824e51','#465270'], ['#ffca70','#f694a3','#94bde3']],
 '공포':['cloak','cowl', ['#693d63','#4a576c','#664050'], ['#b69ffc','#fa889c','#d6d698']],
 '판타지':['cloak','wand', ['#6d4c9e','#336f72','#6c568a'], ['#ffce78','#c3fb9a','#a7eaf9']],
 '애니메이션':['shirt','charm', ['#9b4f80','#4f84a4','#547f5e'], ['#ffd07f','#b7f3e8','#f6a6bf']],
 '로맨스':['coat','flower', ['#9a526f','#635d9a','#526f80'], ['#ffc3cd','#ffd78b','#cceec2']],
 '음악':['shirt','sticks', ['#65419c','#2d6977','#8f565b'], ['#ffc774','#e5a7f3','#9be1d3']],
 '코미디':['suit','hat', ['#925a6f','#507b6c','#705b96'], ['#ffd67b','#ffadc5','#afe8fb']],
 '액션':['armor','scarf', ['#665577','#377f86','#925669'], ['#ffd179','#ffadc5','#9ce8ff']],
 '모험':['coat','leaf', ['#587a76','#98734d','#645b91'], ['#e0f1a1','#ffd98a','#aedff1']],
 '서부':['coat','hat', ['#805358','#736145','#685695'], ['#f5c787','#ffd0a2','#f2acbe']],
 '범죄':['suit','case', ['#4a546f','#755269','#4f6667'], ['#a9e1e3','#ff967e','#edc898']],
 '미스터리':['coat','glasses', ['#62496b','#497180','#73564b'], ['#e9c27d','#a9d7ea','#fbaed2']],
 '역사':['coat','book', ['#775770','#8b694e','#425f79'], ['#efc47c','#b4ddd7','#f5a8a2']]
};
const defaultFighter=['shirt','book',['#586d91','#895975','#45736e'],['#9cebd6','#ffb583','#d7b4f9']];

function fighterDesign(film){
 const key=film.imdb||film.wikiKey||film.title+' '+(film.year||'');
 let hash=2166136261;
 for(const char of key)hash=Math.imul(hash^char.codePointAt(0),16777619);
 const seed=hash>>>0;
 const genre=[film.genre,...(film.tags??[])].find(name=>Object.hasOwn(genreFighters,name));
 const [style,prop,coats,lights]=genreFighters[genre]??defaultFighter;
 const colors=['#e2a788','#b67d61','#815346','#f0ba98','#c88f75'];
 const hairColors=['#3c2c43','#6d4748','#29374e','#433044','#845f46'];
 const gearByMood={우주:'helmet',미래:'visor',미스터리:'glasses',시간:'totem',사랑:'flower',열정:'sticks',성장:'charm'};
 const mood=(film.tags??[]).find(tag=>Object.hasOwn(gearByMood,tag));
 const look=filmFighters[film.id]??filmFighters[film.imdb]??[
  style,coats[seed%coats.length],lights[(seed>>>10)%lights.length],gearByMood[mood]??prop,
  colors[(seed>>>4)%colors.length],hairColors[(seed>>>16)%hairColors.length]
 ];
 const [outfit,fabric,accent,accessory,skin,hair]=look;
 return {outfit,fabric,accent,accessory,skin,hair,variation:(seed>>>20)%4};
}

function drawFilmFighter(canvas,film){
 const ctx=canvas.getContext('2d');
 if(!ctx)return;
 const {outfit,fabric,accent,accessory,skin,hair,variation}=fighterDesign(film);
 const ink='#161326', dim='#2e2740', bone='#f9e2ba';
 const pixel=(color,...boxes)=>{
  ctx.fillStyle=color;
  for(const [x,y,width,height] of boxes)ctx.fillRect(x,y,width,height);
 };

 // A low stance and an extended glove keep the silhouettes legible at game scale.
 pixel('#101022',[9,55,46,2],[14,57,36,2]);
 pixel(dim,[7,53,50,2],[18,54,30,2]);
 if(outfit==='coat'||outfit==='cloak'){
  pixel(ink,[16,22,22,25],[11,37,31,10],[8,45,32,6]);
  pixel(fabric,[17,24,21,20],[13,38,24,8],[10,46,27,3]);
  pixel(dim,[14,43,16,5],[11,47,10,2]);
  if(outfit==='cloak')pixel(accent,[10,48,20,1],[14,44,2,3]);
 }
 pixel(ink,[18,36,24,9],[16,42,12,7],[11,48,14,6],[36,42,12,10],[39,50,16,5]);
 pixel(dim,[19,39,20,6],[18,43,7,7],[13,49,9,3],[37,43,9,9],[42,51,12,2]);
 pixel(fabric,[21,40,5,6],[38,43,6,5],[17,48,5,2]);
 pixel(accent,[12,52,12,1],[43,53,10,1]);
 pixel(ink,[18,21,22,19],[14,25,10,11],[37,24,9,11],[43,26,10,7],[50,23,8,10]);
 pixel(fabric,[20,23,18,15],[16,26,8,8],[37,26,8,8],[44,28,8,3]);
 pixel(dim,[20,34,18,5],[16,31,5,4],[37,31,8,3]);
 pixel(accent,[21,24,14,2],[20,35,17,2],[44,28,6,1]);
 pixel(skin,[51,24,6,7],[15,32,5,4]);
 pixel(bone,[52,24,4,2]);
 pixel(ink,[49,29,9,3],[15,35,6,2]);
 pixel(fabric,[47,28,4,3]);

 if(outfit==='armor'){
  pixel(dim,[24,25,9,9],[38,25,5,4]);
  pixel(accent,[25,26,6,2],[27,29,2,4],[18,28,2,3]);
 }else if(outfit==='suit'||outfit==='coat'){
  pixel(bone,[26,23,6,11]);
  pixel(dim,[25,23,2,6],[31,25,2,6]);
  pixel(accent,[28,26,2,7]);
 }else pixel(accent,[23+variation,28,5,2],[23+variation,30,2,4]);

 pixel(ink,[20,8,17,16],[23,5,11,4],[18,11,4,9],[35,12,6,8],[24,21,11,4]);
 pixel(skin,[23,10,13,12],[35,14,4,5],[26,21,8,3]);
 pixel('#9a5d62',[24,19,12,2],[25,21,3,2]);
 pixel(hair,[21,8,15,5],[24,6,9,3],[20,11,5,7],[24,10,9-variation,4],[34,10,3,4]);
 pixel(accent,[23,8,5,1]);
 if(variation===1)pixel(hair,[20,12,3,10],[22,17,3,5]);
 if(variation===2)pixel(hair,[21,18,4,6],[18,22,4,3]);
 if(variation===3)pixel(hair,[24,5,5,2],[30,4,3,4]);
 if(outfit==='cloak'){
  pixel(ink,[19,7,5,12],[20,5,7,4],[25,4,11,3],[35,6,4,5]);
  pixel(fabric,[20,8,3,10],[21,6,5,4],[26,5,9,2],[36,7,2,3]);
  pixel(accent,[22,7,2,3]);
 }
 pixel(ink,[29,14,4,1],[32,15,2,2],[35,19,3,1]);
 pixel(bone,[32,15,1,1],[35,13,2,1]);

 switch(accessory){
  case 'helmet':
   pixel(ink,[19,7,22,16],[23,4,14,4]);
   pixel(fabric,[21,8,19,13],[24,5,12,4]);
   pixel(accent,[24,7,13,2],[20,12,3,7],[25,21,14,2]);
   pixel('#344968',[24,10,15,9]);
   pixel('#9be7f5',[26,11,11,2],[27,13,4,2]);
   break;
  case 'cowl':
   pixel(ink,[21,4,4,7],[33,4,4,7],[21,9,17,10]);
   pixel(fabric,[22,5,2,6],[34,5,2,6],[22,10,15,6]);
   pixel(accent,[29,14,5,2],[35,14,3,1]);
   break;
  case 'visor':
  case 'glasses':
   pixel(ink,[25,13,15,5]);
   pixel(accessory==='visor'?accent:'#698597',[26,14,6,2],[34,14,5,2]);
   pixel('#d5f5ee',[27,14,2,1]);
   break;
  case 'scarf':
   pixel(accent,[22,19,17,3],[19,22,18,3],[16,23,6,2],[12,24,6,2],[10,26,6,1]);
   pixel(fabric,[24,21,10,1],[18,24,9,1]);
   break;
  case 'curls':
   pixel(hair,[18,8,5,5],[21,5,4,5],[25,4,4,4],[30,5,5,4],[20,15,3,6]);
   pixel(fabric,[22,7,3,1],[28,6,4,1]);
   break;
  case 'hat':
   pixel(ink,[21,5,15,7],[17,11,25,3]);
   pixel(fabric,[23,6,12,5]);
   pixel(accent,[23,9,12,2],[18,12,23,1]);
   break;
  case 'sticks':
   pixel(bone,[54,20,2,6],[56,17,2,5],[12,29,2,5],[10,27,2,4]);
   pixel(accent,[57,15,2,3],[9,26,2,2]);
   break;
  case 'case':
  case 'book':
   pixel(ink,[4,34,14,11],[8,31,6,4]);
   pixel(fabric,[5,35,12,9]);
   pixel(accent,[6,36,1,7],[9,35,6,1],[11,39,4,2]);
   if(accessory==='book')pixel(bone,[8,42,8,1]);
   break;
  default: {
   const props={
    wand:[[56,15,2,10],[58,12,2,5],[57,12,4,2]],
    totem:[[52,18,4,4],[50,21,8,2],[53,16,2,3]],
    signal:[[49,17,2,6],[51,15,7,2],[58,17,2,6],[53,19,4,2]],
    charm:[[52,18,6,4],[54,15,2,8],[51,19,8,2]],
    leaf:[[54,17,7,4],[56,15,5,3],[53,20,3,5]],
    flower:[[54,15,4,8],[51,17,10,3],[55,21,2,6]]
   };
   if(Object.hasOwn(props,accessory)){
    pixel(accent,...props[accessory]);
    pixel(bone,[55,17,2,2]);
   }
  }
 }
}
