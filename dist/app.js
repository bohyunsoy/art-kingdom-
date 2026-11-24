'use strict';

const baseFilms = [
 ['interstellar','인터스텔라','Interstellar',2014,'SF','크리스토퍼 놀란',169,'tt0816692','지구의 미래가 위태로워지자 전직 조종사 쿠퍼는 인류가 살 새 터전을 찾아 웜홀 너머로 떠난다.',['우주','가족','시간']],
 ['dune','듄: 파트 2','Dune: Part Two',2024,'SF','드니 빌뇌브',166,'tt15239678','폴 아트레이데스는 프레멘에 합류해 아라키스의 미래와 자신에게 주어진 운명 사이에서 선택한다.',['우주','운명','권력']],
 ['blade','블레이드 러너 2049','Blade Runner 2049',2017,'SF','드니 빌뇌브',164,'tt1856101','복제인간을 추적하는 K가 사회의 질서를 뒤흔들 비밀을 발견하고 실종된 전직 블레이드 러너를 찾아 나선다.',['정체성','미래','미스터리']],
 ['parasite','기생충','Parasite',2019,'스릴러','봉준호',132,'tt6751668','기우가 부유한 박 사장 집의 과외를 맡으면서 두 가족의 삶이 예상치 못한 방식으로 얽힌다.',['계급','가족','권력']],
 ['inception','인셉션','Inception',2010,'SF','크리스토퍼 놀란',148,'tt1375666','꿈에 침투해 비밀을 훔치는 코브는 표적의 무의식에 생각을 심는 임무를 맡는다.',['시간','미스터리','정체성']],
 ['arrival','컨택트','Arrival',2016,'SF','드니 빌뇌브',116,'tt2543164','세계 곳곳에 나타난 우주선의 목적을 파악하기 위해 언어학자 루이즈가 외계의 언어를 해독한다.',['시간','가족','우주']],
 ['her','그녀','Her',2013,'로맨스','스파이크 존즈',126,'tt1798709','외로운 편지 대필 작가 테오도르는 목소리로 교감하는 운영체제 사만다에게 마음을 연다.',['미래','사랑','정체성']],
 ['whiplash','위플래쉬','Whiplash',2014,'드라마','데이미언 셔젤',106,'tt2582802','재즈 드러머를 꿈꾸는 앤드루는 그를 극한으로 몰아붙이는 지휘자 플레처를 만난다.',['열정','권력','성장']],
 ['everything','에브리씽 에브리웨어 올 앳 원스','Everything Everywhere All at Once',2022,'SF','다니엘 콴 · 다니엘 샤이너트',139,'tt6710474','세탁소를 운영하는 에블린은 멀티버스의 다른 삶을 경험하며 가족과 세계를 구할 방법을 찾는다.',['가족','시간','정체성']],
 ['spirited','센과 치히로의 행방불명','Spirited Away',2001,'애니메이션','미야자키 하야오',125,'tt0245429','치히로는 신들의 목욕탕에서 일하며 돼지로 변한 부모님을 구하고 집으로 돌아갈 방법을 찾는다.',['성장','가족','정체성']],
 ['grand','그랜드 부다페스트 호텔','The Grand Budapest Hotel',2014,'코미디','웨스 앤더슨',99,'tt2278388','전설적인 호텔 지배인과 신입 로비 보이가 유산과 명화를 둘러싼 소동에 휘말린다.',['우정','성장','미스터리']],
 ['matrix','매트릭스','The Matrix',1999,'SF','라나 워쇼스키 · 릴리 워쇼스키',136,'tt0133093','해커 네오는 자신이 살아온 세계가 거대한 가상 현실일 수 있다는 단서를 발견한다.',['미래','정체성','권력']]
];
const builtinFilms = [...baseFilms, ...extraCatalog].map(([id,title,en,year,genre,director,minutes,imdb,plot,tags,image])=>{
 const [displayTitle,original,...alternate] = koreanReleaseTitles[imdb] ?? [];
 const aliases = [...new Set([title,original,...alternate].filter(value=>value&&value!==(displayTitle||title)&&value!==en))];
 return {id,title:displayTitle||title,en,aliases,year,genre,director,minutes,imdb,plot,tags,image:image || 'posters/'+id+'.jpg'};
});

const glyphs = {
 crown:'M2 6h3v3h3V6h3V3h2v3h3v3h3V6h3v11H2z M3 20h18',
 home:'M3 10l9-7 9 7v10H3z M9 20v-7h6v7',
 explore:'M3 4h18v16H3z M7 4v16 M17 4v16 M3 9h4 M3 15h4 M17 9h4 M17 15h4',
 journal:'M5 3h14v18H5z M8 8h8 M8 12h8 M8 16h5',
 compare:'M5 4v16 M19 4v16 M2 8h12 M10 16h12',
 spark:'M12 2l2.8 7.2L22 12l-7.2 2.8L12 22l-2.8-7.2L2 12l7.2-2.8z',
 user:'M8 4h8v8H8z M4 21v-5l4-2h8l4 2v5z',
 sliders:'M4 5h16 M4 12h16 M4 19h16 M8 2v6 M15 9v6 M9 16v6',
 star:'M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z',
 flag:'M5 22V3h14l-3 5 3 5H5',
 map:'M2 6l6-3 8 3 6-3v15l-6 3-8-3-6 3z M8 3v15 M16 6v15',
 ticket:'M3 6h18v4a2 2 0 0 0 0 4v4H3v-4a2 2 0 0 0 0-4z M15 8v2 M15 12v2 M15 16v1',
 duel:'M4 3l5 2 11 11-3 3L6 8z M4 20l3-3 M15 7l3-3 3-1-1 4-4 4 M14 20l6-6 M3 17l4 4'
};
const icon = name => '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" aria-hidden="true"><path d="'+glyphs[name]+'"/></svg>';
const nav = {world:['왕국 지도','map'],home:['왕국 광장','home'],quests:['왕국 퀘스트','flag'],chronicle:['왕좌실록','crown'],map:['마을 지도','map'],explore:['영화 탐색','explore'],upcoming:['개봉예정작','ticket'],journal:['나의 감상록','journal'],compare:['이상형 월드컵','duel'],recommend:['취향 추천','spark'],criteria:['평가 기준','sliders'],character:['나의 캐릭터','user']};
const defaults = {cupVotes:{},cupMatchRules:{},cupRules:null,addedFilms:[],watchlist:[],villages:[{id:'story-village',name:'스토리 마을',description:'이야기와 전개가 인상 깊었던 영화들',films:[]},{id:'mood-village',name:'분위기 마을',description:'분위기와 여운이 오래 남는 영화들',films:[]}],reviews:{},lifeFilms:null,throneHistory:[],criteria:[{id:'story',name:'이야기',weight:2},{id:'visual',name:'영상미',weight:1},{id:'after',name:'여운',weight:1}],character:{name:'시네 탐험가',hair:0,hairStyle:0,outfit:0,outfitStyle:0,skin:0,accessory:0},compared:[],didCompare:false,customized:false};
let state, films;
const $ = sel => document.querySelector(sel);
const esc = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const movie = id => films.find(f=>f.id===id);
const rating = id => state.reviews[id]?.overall;
function loadState(snapshot){
 state={...JSON.parse(JSON.stringify(defaults)),...snapshot};
 films=[...builtinFilms,...state.addedFilms];
 state.lifeFilms=(state.lifeFilms??(state.life?[state.life]:[])).filter(id=>movie(id)&&rating(id));
 delete state.life;
 return state;
}
const accountStorage=typeof profileStorage==='undefined'?null:profileStorage;
const save=()=>accountStorage?accountStorage.save(state):localStorage.setItem('cine-kingdom-v1',JSON.stringify(state));
function guestState(){
 try{return JSON.parse(localStorage.getItem('cine-kingdom-v1'));}catch{return null;}
}
const isLifeFilm=id=>state.lifeFilms.includes(id);
const currentReign=()=>state.throneHistory.length+1;
const reviewCount = () => Object.keys(state.reviews).length;
const mean = () => reviewCount() ? (Object.values(state.reviews).reduce((sum,r)=>sum+r.overall,0)/reviewCount()).toFixed(1) : '—';
const level = () => 1+Math.floor((reviewCount()*20 + Number(state.customized)*15 + Number(state.didCompare)*15)/50);
let search = '', genre = '', period = '', visibleCount = 30, toastTimer;
const route = () => Object.hasOwn(nav,location.hash.slice(1)) ? location.hash.slice(1) : 'world';
const go = page => { if(route()===page) render(); else location.hash=page; };
function toast(msg){$('#toast').textContent=msg;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),2800);}
function poster(film, eager=false){
 const title=esc(film.title);
 return '<span class="poster poster-frame"><span class="poster-fallback" aria-hidden="true">'+icon('explore')+'<span>'+title+'</span></span>'+
  (film.image?'<img '+(eager?'fetchpriority="high"':'loading="lazy"')+' src="'+esc(film.image)+'" alt="'+title+' 포스터">':'')+'</span>';
}
function cupFighter(film,side=0){
 return '<span class="cup-fighter" data-facing="'+side+'"><canvas width="64" height="64" data-cup-fighter="'+esc(film.id)+'" aria-hidden="true"></canvas></span>';
}
const metadata = f => [f.year,f.genre,f.minutes && f.minutes+'분'].filter(Boolean).map(esc).join(' · ');
const filmCard = (f,note='') => '<button class="film" data-film="'+esc(f.id)+'">'+poster(f)+'<span class="film-info"><span class="film-title" title="'+esc(f.title)+'">'+esc(f.title)+'</span><span class="film-meta">'+[f.year,f.genre].filter(Boolean).map(esc).join(' · ')+(rating(f.id)?' · <em>★ '+rating(f.id).toFixed(1)+'</em>':'')+'</span></span>'+(note?'<span class="tag-note">'+esc(note)+'</span>':'')+'</button>';
const grid = (items,extra='') => '<div class="film-grid '+extra+'">'+items.join('')+'</div>';
const title = (tag,name,desc) => '<div class="intro"><div><span class="eyebrow">'+tag+'</span><h1>'+name+'</h1><p>'+desc+'</p></div></div>';
const empty = (msg,button='') => '<div class="panel empty">'+msg+(button?'<br><button class="primary" data-go="explore">'+button+'</button>':'')+'</div>';
const highestRatedFilm = () => films.filter(f=>rating(f.id)).sort((a,b)=>rating(b.id)-rating(a.id)||state.reviews[b.id].time-state.reviews[a.id].time)[0];
function throneHall(){
 const favorites=state.lifeFilms.map(movie);
 const shared=favorites.length>1;
 const king=favorites[0]??highestRatedFilm();
 const access='<a class="throne-chronicle" href="#chronicle">왕좌실록 보기</a>';
 const label=favorites.length?'제'+currentReign()+'대 왕':'왕좌의 전당';
 const heading=shared?'함께 오른 인생영화':king?esc(king.title):'왕좌가 비어 있어요';
 const detail=shared?'인생영화 '+favorites.length+'편':king
  ?(favorites.length?'인생 영화':'왕국 최고 평점')+' · ★ '+rating(king.id).toFixed(1)
  :'첫 감상평을 남기고 왕좌에 오를 영화를 만나보세요.';
 const action=shared?'':king?'<button class="primary" data-film="'+esc(king.id)+'">왕좌의 영화 보기</button>'
  :'<button class="primary" data-go="explore">첫 영화 기록하기</button>';
 return '<section class="hero'+(shared?' hero-shared':'')+'"><div class="hero-content"><span class="badge">'+icon('crown')+' '+label+'</span><h2>'+heading+'</h2><p>'+detail+'</p><div class="throne-links">'+action+access+'</div></div>'+
  (shared?'<div class="throne-gallery">'+favorites.map(f=>filmCard(f)).join('')+'</div>':king?'<div class="throne-art">'+poster(king,true)+'</div>':'')+'</section>';
}
function chronicle(){
 const heading=title('✦  ROYAL CHRONICLE','왕좌실록','왕좌를 함께 지킨 인생영화와 세대가 바뀐 기록을 살펴보세요.');
 const entries=state.throneHistory.map((reign,index)=>({...reign,number:index+1}));
 if(state.lifeFilms.length){
  entries.push({number:currentReign(),films:state.lifeFilms.map(id=>({id,title:movie(id).title})),current:true});
 }
 if(!entries.length)return heading+empty('아직 기록된 인생영화가 없어요. 영화 평가 화면에서 첫 인생영화를 지정해 보세요.','영화 탐색');
 const dates=new Intl.DateTimeFormat('ko-KR',{timeZone:'Asia/Seoul',year:'numeric',month:'long',day:'numeric'});
 return heading+'<ol class="reign-list">'+entries.reverse().map(reign=>
  '<li class="panel reign-entry"><div class="reign-heading"><h2>제'+reign.number+'대 왕</h2>'+
  (reign.current?'<span class="badge">현재 왕좌</span>':'<time class="subtle" datetime="'+new Date(reign.replacedAt).toISOString()+'">'+dates.format(reign.replacedAt)+' 퇴위</time>')+'</div>'+
  '<div class="throne-gallery">'+reign.films.map(({id,title})=>{
   const f=movie(id);
   const name='<span class="reign-film-title">'+esc(title)+'</span>';
   return f?'<button class="film reign-film" data-film="'+esc(id)+'">'+poster({...f,title})+name+'</button>'
    :'<span class="reign-film">'+name+'</span>';
  }).join('')+'</div></li>').join('')+'</ol>';
}
const questChapters=[
 ['왕국에 첫발을', [['첫 감상 기록','영화 한 편에 평점 남기기','reviews',1,'explore'],['취향의 결투','월드컵에서 영화 두 편 고르기','comparison',1,'compare'],['나의 왕국 주민','캐릭터 꾸미고 저장하기','avatar',1,'character']]],
 ['기록의 시작', [['상영관 단골','영화 5편 평가하기','reviews',5,'explore'],['한 줄의 감상','전체 감상평을 남긴 영화 2편 모으기','notes',2,'explore'],['마음에 남은 인물','최애 캐릭터 기록하기','favorites',1,'explore']]],
 ['나만의 눈으로', [['감상록 첫 장','영화 8편 평가하기','reviews',8,'explore'],['나만의 기준','평가 기준 1개 추가하기','criteria',1,'criteria'],['별점의 이유','기준별 설명을 남긴 영화 2편 모으기','explanations',2,'explore']]],
 ['왕좌로 가는 길', [['첫 왕의 즉위','인생영화 1편 지정하기','life',1,'explore'],['결승의 순간','월드컵 대결 1회 완료하기','cups',1,'compare'],['낯선 장르','서로 다른 장르 4개 평가하기','genres',4,'explore']]],
 ['왕국의 수집가', [['열다섯 편의 기록','영화 15편 평가하기','reviews',15,'explore'],['상영관 확장','목록 밖 영화 1편 추가하기','added',1,'explore'],['다시 극장으로','관람 횟수 2회 이상인 영화 2편 기록하기','rewatched',2,'explore']]],
 ['시간을 건너', [['옛 극장의 손님','1999년까지 개봉한 영화 3편 평가하기','classics',3,'explore'],['왕국의 기록관','전체 감상평을 남긴 영화 6편 모으기','notes',6,'explore'],['넓어지는 취향','서로 다른 장르 6개 평가하기','genres',6,'explore']]],
 ['왕국의 심사위원', [['기준이 있는 감상','나만의 평가 기준 2개 만들기','criteria',2,'criteria'],['꼼꼼한 평론','기준별 설명을 남긴 영화 5편 모으기','explanations',5,'explore'],['두 번째 결승','월드컵 대결 2회 완료하기','cups',2,'compare']]],
 ['왕국 연대기', [['두 편의 인생영화','현재 왕좌와 실록에 서로 다른 영화 2편 남기기','life',2,'chronicle'],['잊지 못할 얼굴들','최애 캐릭터를 남긴 영화 5편 모으기','favorites',5,'explore'],['스물네 편의 감상','영화 24편 평가하기','reviews',24,'explore']]],
 ['취향의 지평선', [['고전 순례','1999년까지 개봉한 영화 6편 평가하기','classics',6,'explore'],['장르를 넘나들다','서로 다른 장르 8개 평가하기','genres',8,'explore'],['다시 보는 즐거움','관람 횟수 2회 이상인 영화 4편 기록하기','rewatched',4,'explore']]],
 ['왕국의 명예 시민', [['서른 편의 감상','영화 30편 평가하기','reviews',30,'explore'],['왕립 감상록','전체 감상평을 남긴 영화 10편 모으기','notes',10,'explore'],['영화 결투의 달인','월드컵 대결 3회 완료하기','cups',3,'compare']]]
];
function questChapter(rank){
 const chapter=questChapters[rank-1];
 if(chapter)return chapter;
 const films=Math.ceil(rank*2.5)+5, notes=rank+1;
 return ['왕국 감상록 확장',[
  ['상영 기록 쌓기','영화 '+films+'편 평가하기','reviews',films,'explore'],
  ['감상평 쌓기','전체 감상평을 남긴 영화 '+notes+'편 모으기','notes',notes,'explore']
 ]];
}
function questMetrics(){
 const reviews=Object.values(state.reviews);
 const reviewed=Object.keys(state.reviews).map(movie).filter(Boolean);
 const life=[...state.lifeFilms,...state.throneHistory.flatMap(reign=>reign.films.map(f=>f.id))];
 return {
  reviews:reviewCount(), avatar:Number(state.customized), comparison:Number(state.didCompare),
  notes:reviews.filter(r=>r.note?.trim()).length,
  favorites:reviews.filter(r=>r.favoriteCharacter?.trim()).length,
  criteria:state.criteria.filter(c=>!defaults.criteria.some(d=>d.id===c.id)).length,
  explanations:reviews.filter(r=>Object.values(r.explanations??{}).some(text=>text.trim())).length,
  life:new Set(life).size,
  cups:Object.entries(state.cupVotes).filter(([key,votes])=>votes.length===cupRuleRounds(state.cupMatchRules[key]??cupAreas).length).length,
  genres:new Set(reviewed.map(f=>f.genre).filter(Boolean)).size,
  added:state.addedFilms.length, rewatched:reviews.filter(r=>r.watchCount>=2).length,
  classics:reviewed.filter(f=>f.year&&f.year<2000).length
 };
}
function questProgress(tasks,metrics){
 let done=0;
 const rows=tasks.map(([name,description,key,target,route])=>{
  const count=Math.min(metrics[key],target);
  const complete=count===target;
  done+=Number(complete);
  return '<a href="#'+route+'" class="quest-row"><span class="quest-symbol" aria-hidden="true">'+(complete?'✓':'◇')+'</span><span><strong>'+name+'</strong><small>'+description+'</small></span><b aria-label="'+(complete?'완료':count+' / '+target)+'">'+count+'/'+target+'</b></a>';
 }).join('');
 return rows+'<small class="muted">완료 '+done+' / '+tasks.length+'</small><progress class="quest-progress" value="'+done+'" max="'+tasks.length+'" aria-label="퀘스트 완료 수"></progress>';
}
// Hit areas are percentages of the original, uncropped map illustration.
const worldStops=[
 ['home','왕국의 성',37.8,11,23.2,31.5],
 ['quests','왕국을 둘러싼 산',16,1.5,21.3,27],
 ['chronicle','떠 있는 두루마리',43,0.5,13.5,10.5],
 ['compare','전투장',64.5,11.5,17,19.5],
 ['journal','왕국 학교',18.4,29.5,14.4,27],
 ['explore','왕국 도서관',63.2,31.5,18.8,26.5],
 ['recommend','왕국 백화점',17,61,19.8,26.5],
 ['upcoming','왕국 영화관',40.3,58.5,21,31],
 ['map','마을',64.2,62.5,18.2,23]
];
function worldMap(){
 const hotspots=worldStops.map(([key,landmark,x,y,width,height])=>{
  const [label]=nav[key];
  return '<a class="world-landmark" href="#'+key+'" aria-label="'+landmark+', '+label+'" style="--landmark-x:'+x+'%;--landmark-y:'+y+'%;--landmark-width:'+width+'%;--landmark-height:'+height+'%"><span class="world-landmark-label">'+label+'</span></a>';
 }).join('');
 return '<div class="world-viewport" role="region" aria-label="왕국 지도"><nav class="world-map" aria-label="장소 고르기"><img class="world-art" src="world-map.webp" width="1600" height="800" alt="" draggable="false" fetchpriority="high">'+hotspots+'</nav></div>';
}
function updateQuestHud(){
 const [,tasks]=questChapter(level());
 const metrics=questMetrics();
 const complete=tasks.filter(([, ,key,target])=>metrics[key]>=target).length;
 $('#hud-quest-count').textContent=complete+' / '+tasks.length;
 $('#hud-quest').setAttribute('aria-label','왕국 퀘스트 '+tasks.length+'개 중 '+complete+'개 완료');
}

function kingdomQuests(){
 const rank=level(),metrics=questMetrics();
 const chapters=Array.from({length:Math.max(questChapters.length,rank+1)},(_,i)=>{
  const chapterLevel=i+1, unlocked=chapterLevel<=rank;
  const [name,tasks]=questChapter(chapterLevel);
  return '<details class="panel quest-chapter"'+(chapterLevel===rank?' open':'')+'><summary><span class="badge">Lv. '+chapterLevel+'</span> <strong>'+name+'</strong><span class="quest-chapter-status">'+
   (chapterLevel===rank?'현재 레벨':unlocked?'열림':'잠김')+'</span></summary>'+
   (unlocked?questProgress(tasks,metrics):'<ul>'+tasks.map(([,description])=>'<li>'+description+'</li>').join('')+'</ul><p class="subtle">Lv. '+chapterLevel+'부터 진행할 수 있어요.</p>')+'</details>';
 });
 return title('✦  ROYAL QUESTS','왕국 퀘스트','캐릭터 레벨에 맞춰 새 목표가 열려요. 저장한 활동이 진행도에 자동으로 반영됩니다.')+
  '<div class="quest-chapters">'+chapters.join('')+'</div>';
}
function ratingDistribution(){
 const bins=['0.5–1','1.1–2','2.1–3','3.1–4','4.1–5'];
 const counts=bins.map(()=>0);
 for(const {overall} of Object.values(state.reviews)){
  if(Number.isFinite(overall)&&overall>=0.5&&overall<=5)counts[Math.ceil(overall)-1]++;
 }
 const highest=Math.max(1,...counts);
 const summary=bins.map((label,i)=>label+'점 '+counts[i]+'편').join(', ');
 return '<div class="rating-distribution"><small>별점 분포</small><div class="distribution-bars" role="img" aria-label="종합 별점 분포. '+summary+'">'+
  counts.map(count=>'<span class="distribution-track" aria-hidden="true"><i style="--bar-height:'+count/highest*100+'%"></i></span>').join('')+'</div></div>';
}
function plazaStats(){
 const tiles=[['explore','감상한 영화',reviewCount()+'편'],['star','평균 평점',mean()],['spark','캐릭터 레벨','Lv. '+level()]];
 return '<div class="stats"><div class="panel stat stat-viewings"><div class="stat-value"><span class="stat-icon">'+icon(tiles[0][0])+'</span><span><small>'+tiles[0][1]+'</small><strong>'+tiles[0][2]+'</strong></span></div>'+ratingDistribution()+'</div>'+
  tiles.slice(1).map(([glyph,label,value])=>'<div class="panel stat"><span class="stat-icon">'+icon(glyph)+'</span><span><small>'+label+'</small><strong>'+value+'</strong></span></div>').join('')+'</div>';
}
function home(){
 return title('✦  KINGDOM PLAZA','왕국 광장','당신의 취향이 왕국의 역사가 됩니다.')+
 throneHall()+
 plazaStats()+
 '<section><div class="section-head"><h2>'+icon('explore')+' 상영관 둘러보기</h2><button class="quiet" data-go="explore">전체 영화 보기</button></div>'+grid(films.slice(0,5).map(f=>filmCard(f)),'home-films')+'</section>';
}
function options(list,value){return list.map(([id,label])=>'<option value="'+esc(id)+'" '+(String(id)===String(value)?'selected':'')+'>'+esc(label)+'</option>').join('');}
function explorer(){
 const genres=[...new Set(films.map(f=>f.genre).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'ko'));
 return title('✦  CINEMA ARCHIVE','영화 탐색','왕국의 영화 '+films.length+'편을 둘러보고, 목록 밖의 영화도 추가할 수 있어요.')+
 '<div class="filter"><input id="search" type="search" aria-label="영화 검색" placeholder="영화 제목, 감독, 키워드" value="'+esc(search)+'"><select id="genre" aria-label="장르">'+options([['','모든 장르'],...genres.map(g=>[g,g])],genre)+'</select><select id="period" aria-label="개봉 시기">'+options([['','모든 시기'],['modern','2000년 이후'],['classic','1999년까지'],['added','내가 추가한 영화']],period)+'</select><button class="primary" data-catalog-search>영화 찾아 추가</button></div><div id="results"></div><p class="subtle catalog-credit">영화 자료 <a href="https://www.kaggle.com/datasets/rounakbanik/the-movies-dataset" target="_blank" rel="noopener">The Movies Dataset</a> · <a href="https://developer.imdb.com/non-commercial-datasets/" target="_blank" rel="noopener">IMDb 한국 제목</a> · <a href="https://www.imdb.com/" target="_blank" rel="noopener">IMDb 포스터</a></p>';
}
function results(){
 const needle=search.trim().toLowerCase();
 const compact=catalogTitle(needle);
 const matches=films.filter(f=>{
  const inPeriod=!period || (period==='added' ? f.added : f.year && (period==='modern' ? f.year>=2000 : f.year<2000));
  const names=filmTitles(f);
  const textMatches=[...names,f.director,f.genre,...f.tags].join(' ').toLowerCase().includes(needle);
  const titleMatches=compact&&names.some(name=>catalogTitle(name).includes(compact));
  return inPeriod&&(!genre||f.genre===genre)&&(textMatches||titleMatches);
 });
 $('#results').innerHTML=matches.length
  ? grid(matches.slice(0,visibleCount).map(f=>filmCard(f)))+(matches.length>visibleCount?'<div class="load-more"><button data-more>영화 더 보기 ('+visibleCount+' / '+matches.length+')</button></div>':'')
  : '<div class="panel empty">왕국 목록에서 일치하는 영화를 찾지 못했어요.<br><button class="primary" data-catalog-search>외부 영화 검색</button></div>';
}
let selectedVillageId='', villageFilmQuery='';
const villageLimit=()=>level()+2;
const findVillage=id=>state.villages.find(village=>village.id===id);
const activeVillage=()=>findVillage(selectedVillageId)??state.villages[0];

function kingdomMap(){
 const active=activeVillage();
 const slots=state.villages.length, limit=villageLimit();
 const available=slots<limit;
 const tiles=state.villages.map((village,i)=>
  '<button type="button" class="village-pin" data-village-select="'+esc(village.id)+'" aria-pressed="'+(active?.id===village.id)+'" style="--village-tone:'+['#cf90e7','#79cbbb','#f7bd77'][i%3]+'"><span class="village-house" aria-hidden="true"></span><strong>'+esc(village.name)+'</strong><small>'+village.films.length+'편</small></button>'
 ).join('');
 return title('✦  KINGDOM MAP','지도','마을마다 주제를 정하고, 어울리는 영화들을 모아 보세요.')+
  '<section class="panel kingdom-map"><div class="map-toolbar"><div><h2>왕국의 마을</h2><p class="subtle">Lv. '+level()+' · 마을 '+slots+' / '+limit+'개</p></div><button class="primary" data-village-edit="" '+(available?'':'disabled')+'>마을 추가</button></div>'+
  '<div class="map-land"><canvas id="map-terrain" aria-hidden="true"></canvas><div class="village-grid">'+tiles+'</div></div>'+
  (!available?'<p class="subtle map-unlock">Lv. '+Math.max(level()+1,slots-1)+'에서 마을 자리가 열려요.</p>':'')+'</section>'+
  (active?villageCollection(active):'');
}
function villageCollection(village){
 const collection=village.films.map(movie).filter(Boolean);
 return '<section class="panel village-collection"><div class="map-toolbar"><div><h2>'+esc(village.name)+'</h2>'+(village.description?'<p class="subtle">'+esc(village.description)+'</p>':'')+'</div><div class="village-actions"><button data-village-edit="'+esc(village.id)+'">마을 수정</button></div></div>'+
 '<div class="village-search"><label for="village-film-query">마을에 영화 추가</label><input id="village-film-query" type="search" placeholder="한국어 제목 또는 원제 검색" value="'+esc(villageFilmQuery)+'"><div id="village-results" aria-live="polite">'+villageFilmMatches(village)+'</div></div>'+
 (collection.length?grid(collection.map(f=>'<div class="village-film">'+filmCard(f)+'<button class="quiet" data-village-remove="'+esc(f.id)+'" data-village-id="'+esc(village.id)+'" aria-label="'+esc(f.title)+' 마을에서 빼기">마을에서 빼기</button></div>')):empty('아직 담은 영화가 없어요. 위에서 작품을 검색해 보세요.'))+'</section>';
}
function villageFilmMatches(village){
 const query=catalogTitle(villageFilmQuery.trim());
 if(!query)return '';
 const matches=films.filter(f=>filmTitles(f).some(name=>catalogTitle(name).includes(query)));
 if(!matches.length)return '<p class="subtle">검색 결과가 없어요.</p>';
 return '<div class="compare-options">'+matches.map(f=>{
  const included=village.films.includes(f.id);
  return '<button type="button" class="compare-option" data-village-add="'+esc(f.id)+'" data-village-id="'+esc(village.id)+'" '+(included?'disabled':'')+'><strong>'+esc(f.title)+'</strong><small>'+metadata(f)+(included?' · 추가됨':'')+'</small></button>';
 }).join('')+'</div>';
}
function paintMap(){
 const canvas=$('#map-terrain');
 const height=Math.max(36,Math.ceil(state.villages.length/2)*19);
 canvas.width=128;canvas.height=height;
 const ctx=canvas.getContext('2d');
 const tile=(color,x,y,w,h)=>{ctx.fillStyle=color;ctx.fillRect(x,y,w,h);};
 tile('#a9d8b8',0,0,128,height);
 for(let y=0;y<height;y++){
  const river=101+Math.floor(9*Math.sin(y/9));
  tile('#8ac5e7',river,y,13,1);
  tile('#b2dcf0',river+2,y,2,1);
  if(y%5===0)tile('#e4f5fb',river+8,y,3,1);
  if(y%19===13)tile('#d7bfa7',4,y,120,1);
  if(y%19===14)tile('#ead3ba',4,y,120,1);
 }
 for(let i=0;i<height*4;i++){
  const x=(i*37+11)%128, y=(i*17+5)%height;
  if(x>87&&x<124)continue;
  if(i%9===0){
   tile('#679a81',x-1,y,5,4);
   tile('#70ae88',x,y-1,3,3);
   tile('#a4cfa4',x+1,y-2,1,2);
  }else tile(i%3===0?'#f8e6a3':'#92c8a6',x,y,2,1);
 }
}
function editVillage(id){
 const village=findVillage(id);
 if(!village&&state.villages.length>=villageLimit())return;
 const dlg=$('#dialog');
 dlg.innerHTML='<div class="dialog-head"><h2 id="dialog-title">'+(village?'마을 수정':'마을 추가')+'</h2><button class="close" aria-label="닫기" data-close>×</button></div>'+
  '<form id="village-form" data-village="'+esc(id)+'"><label class="field-label">마을 이름<input class="field-label" name="name" required maxlength="30" placeholder="예: 디자인 마을" value="'+esc(village?.name??'')+'"></label>'+
  '<label class="field-label">마을 설명<textarea name="description" rows="3" maxlength="240" placeholder="어떤 영화를 모으는 마을인가요?">'+esc(village?.description??'')+'</textarea></label><button class="primary">마을 저장</button></form>';
 dlg.setAttribute('aria-labelledby','dialog-title');
 if(!dlg.open)dlg.showModal();
}
function saveVillage(form,values){
 const name=String(values.get('name')).trim();
 const description=String(values.get('description')).trim();
 const village=findVillage(form.dataset.village);
 if(!name){toast('마을 이름을 입력해 주세요.');return;}
 if(state.villages.some(v=>v.id!==village?.id&&v.name.toLowerCase()===name.toLowerCase())){
  toast('이미 같은 이름의 마을이 있어요.');return;
 }
 if(village){
  Object.assign(village,{name,description});
  selectedVillageId=village.id;
 }else{
  if(state.villages.length>=villageLimit())return;
  selectedVillageId=crypto.randomUUID();
  state.villages.push({id:selectedVillageId,name,description,films:[]});
  villageFilmQuery='';
 }
 save();
 $('#dialog').close();
 render();
 document.querySelectorAll('[data-village-select]').forEach(pin=>{
  if(pin.dataset.villageSelect===selectedVillageId)pin.focus();
 });
 toast('마을을 저장했어요.');
}
function updateVillageMembership(village,filmId,included){
 if(included===village.films.includes(filmId))return;
 if(included)village.films.push(filmId);
 else village.films=village.films.filter(id=>id!==filmId);
}
function setVillageFilm(villageId,filmId,included){
 const village=findVillage(villageId);
 if(!village||!movie(filmId))return;
 updateVillageMembership(village,filmId,included);
 save();
 render();
 toast(included?'마을에 영화를 담았어요.':'마을에서 영화를 뺐어요.');
}
function movieVillages(id){
 return '<details class="movie-villages"><summary>마을에 담기</summary><div>'+state.villages.map(village=>
  '<label><input type="checkbox" data-village-member="'+esc(village.id)+'" data-member-film="'+esc(id)+'" '+(village.films.includes(id)?'checked':'')+'> '+esc(village.name)+'</label>'
 ).join('')+'</div></details>';
}

function upcoming(){
 const saved=state.watchlist.map(movie).filter(Boolean).reverse();
 return title('✦  WATCHLIST','개봉예정작','보고싶어요로 담아 둔 영화 '+saved.length+'편')+
  (saved.length?grid(saved.map(f=>filmCard(f))):empty('아직 보고싶어요로 담은 영화가 없어요.','영화 탐색'));
}
function journal(){
 const watched=films.filter(f=>rating(f.id)).sort((a,b)=>state.reviews[b.id].time-state.reviews[a.id].time);
 const king=state.lifeFilms.length?null:highestRatedFilm()?.id;
 return title('✦  WATCH JOURNAL','나의 감상록','기록한 평점과 감상평을 다시 만나보세요.')+(watched.length?grid(watched.map(f=>{
  const review=state.reviews[f.id];
  const badge=isLifeFilm(f.id)?'♛ 인생 영화 · 왕좌':king===f.id?'♛ 왕좌의 영화':'';
  const details=[badge,review.watchCount!=null?'관람 '+review.watchCount+'회':'',review.favoriteCharacter?'최애 '+review.favoriteCharacter:''];
  return filmCard(f,details.filter(Boolean).join(' · '));
 })):empty('아직 기록이 없어요. 첫 영화에 평점을 남겨 보세요.','영화 탐색'));
}
const compareQueries=['',''];
function compareMatches(slot){
 const query=catalogTitle(compareQueries[slot].trim());
 if(!query)return [];
 const other=state.compared[1-slot];
 const ranked=films.filter(f=>f.id!==other).map(f=>{
  const names=filmTitles(f).map(catalogTitle);
  const rank=names.includes(query)?0:names.some(name=>name.startsWith(query))?1:names.some(name=>name.includes(query))?2:3;
  return {f,rank};
 }).filter(({rank})=>rank<3);
 return ranked.sort((a,b)=>a.rank-b.rank||a.f.title.localeCompare(b.f.title,'ko')).map(({f})=>f);
}
function compareResults(slot){
 const query=compareQueries[slot].trim();
 if(!query)return '';
 const matches=compareMatches(slot);
 if(!matches.length)return '<p class="subtle">검색 결과가 없어요.</p>';
 return '<div class="compare-options">'+matches.map(f=>'<button type="button" class="compare-option" data-compare-slot="'+slot+'" data-compare-pick="'+esc(f.id)+'"><strong>'+esc(f.title)+'</strong><small>'+metadata(f)+'</small></button>').join('')+'</div>';
}
function chooseComparison(slot,id){
 if(id&&(!movie(id)||id===state.compared[1-slot]))return;
 state.compared[slot]=id;
 compareQueries[slot]='';
 if(state.compared[0]&&state.compared[1])state.didCompare=true;
 save();render();
 $('#compare-search-'+slot).focus();
}
function comparison(){
 const cup=currentCup();
 const header=title('✦  FILM DUEL','이상형 월드컵','두 작품을 고르고, 평가 요소마다 더 마음에 드는 영화를 선택하세요.');
 const settings='<button class="quiet" data-cup-settings>'+icon('sliders')+' 월드컵 기준 설정</button>';
 if(cup&&cupOpen){
  return header+cupStage(cup)+'<div class="cup-controls"><button class="quiet" data-cup-exit>대결 영화 고르기</button><div>'+
   (cup.votes.length?'<button class="quiet" data-cup-undo>마지막 선택 다시 하기</button>':'')+
   (cup.votes.length?'<button class="quiet" data-cup-reset>처음부터 다시</button>':'')+'</div></div>';
 }
 const ids=[state.compared[0]||'',state.compared[1]||''];
 const startLabel=cup?.votes.length===cup?.rounds.length?'대결 결과 보기':cup?.votes.length?'대결 이어 하기':'대결 시작';
 return header+'<div class="cup-setup-tools"><span class="subtle">새 대결 · '+cupRuleRounds(state.cupRules??cupAreas).length+'개 평가 요소</span>'+settings+'</div><div class="compare">'+ids.map((id,i)=>{
  const f=movie(id), review=state.reviews[id];
  return '<section class="panel compare-panel"><form class="compare-search" data-compare-form="'+i+'"><label for="compare-search-'+i+'">'+(i===0?'첫 번째 영화':'두 번째 영화')+'</label><input id="compare-search-'+i+'" name="query" type="search" data-compare-query="'+i+'" placeholder="'+(f?'다른 영화 검색':'한국어 제목 또는 원제 검색')+'" value="'+esc(compareQueries[i])+'"></form><div class="compare-results" id="compare-results-'+i+'" aria-live="polite">'+compareResults(i)+'</div>'+
   (f?'<div class="compare-selected">'+cupFighter(f,i)+'<strong>'+esc(f.title)+'</strong><p class="subtle">'+metadata(f)+'</p><p class="score">'+(review?'★ '+review.overall.toFixed(1):'—')+'</p><ul>'+filmCriteria(review?.filmRules).map(c=>'<li>'+esc(c.name)+' '+(review?.scores?.[c.id]??'—')+'</li>').join('')+'</ul><div class="compare-actions"><button data-film="'+esc(id)+'">영화 상세</button><button class="quiet" data-compare-clear="'+i+'">선택 해제</button></div></div>':'<p class="subtle">비교할 영화를 검색해 선택하세요.</p>')+'</section>';
 }).join('')+'</div>'+(cup?'<div class="cup-start"><button class="primary" id="cup-start" data-cup-open>'+startLabel+'</button>'+
  (cup.votes.length?'<span class="subtle">'+cup.votes.length+' / '+cup.rounds.length+' 완료</span>':'')+'</div>':'');
}
const cupAreas=[
 ['이야기',[
  ['소재·설정','이야기의 출발점과 세계의 설정이 흥미로운가?'],
  ['서사 구조·개연성','사건의 흐름과 인과관계가 설득력 있는가?'],
  ['전개·속도','이야기가 흘러가는 속도가 작품에 어울리는가?'],
  ['결말','결말이 이야기와 인물의 선택을 잘 마무리하는가?']
 ]],
 ['인물',[
  ['캐릭터의 입체성','인물이 여러 면을 지닌 존재로 느껴지는가?'],
  ['동기·변화','인물의 선택과 변화에 납득할 만한 이유가 있는가?'],
  ['인물 간 관계','인물들의 관계가 자연스럽고 이야기에 의미를 더하는가?']
 ]],
 ['연기',[
  ['감정 표현','배우가 인물의 감정을 섬세하고 설득력 있게 전달하는가?'],
  ['배역 소화·호흡','배우가 인물에 어울리고 다른 배우와 자연스럽게 호흡하는가?']
 ]],
 ['연출',[
  ['표현 방식·일관성','장면을 보여주는 방식이 작품의 의도와 어울리는가?'],
  ['분위기·긴장 조절','몰입, 긴장, 웃음, 불편함 등을 효과적으로 만들어내는가?']
 ]],
 ['영상',[
  ['촬영·구도','카메라의 위치와 움직임이 의미나 감정을 전달하는가?'],
  ['색감·조명','색과 빛이 분위기와 이야기에 기여하는가?'],
  ['미술·공간·의상','배경과 소품, 의상이 세계관과 인물을 구체화하는가?'],
  ['시각효과','효과가 장면에 자연스럽게 어우러지고 목적에 맞는가?']
 ]],
 ['편집',[
  ['장면 연결·리듬','장면의 순서와 길이가 이야기와 감정에 어울리는가?'],
  ['정보 전달','무엇을 언제 보여주고 감추는지가 효과적인가?']
 ]],
 ['소리',[
  ['음악','음악이 장면의 감정을 풍부하게 만드는가?'],
  ['음향·침묵','효과음, 공간감, 침묵을 의미 있게 사용하는가?']
 ]],
 ['주제',[
  ['주제의 깊이','영화가 던지는 질문에 생각해볼 여지가 있는가?'],
  ['주제의 전달','작품의 주제가 인물과 사건을 통해 자연스럽게 전달되는가?'],
  ['관점·독창성','익숙한 소재에서도 작품만의 관점이나 새로운 해석이 느껴지는가?'],
  ['재현의 태도','작품이 인물, 집단, 현실의 문제를 어떤 시선으로 다루는가?']
 ]],
 ['전체 완성도',[
  ['요소 간 조화','이야기, 연기, 영상, 소리가 함께 하나의 작품을 이루는가?'],
  ['의도 달성','영화가 관객에게 전하고자 한 감정이나 생각을 잘 전달하는가?']
 ]],
 ['개인적 경험',[
  ['몰입도·재미','보는 동안 집중하게 되고 다음 장면이 궁금했는가?'],
  ['정서적 울림','영화가 내 감정을 얼마나 움직였는가?'],
  ['공감·개인적 연결','인물이나 상황이 내 경험과 이어지거나 공감을 불러일으켰는가?'],
  ['여운·사유','영화가 끝난 뒤에도 장면이나 질문이 떠올랐는가?'],
  ['재관람 욕구','다시 보고 싶거나 다시 보면 새롭게 느낄 부분이 있는가?']
 ]]
];
const cupRuleRounds=areas=>areas.flatMap(([area,items])=>items.map(([element,question])=>({area,element,question})));
let cupOpen=false, cupHit='';

let cupDraft;

function openCupSettings(){
 cupDraft=structuredClone(state.cupRules??cupAreas);
 renderCupSettings(0);
 const dlg=$('#dialog');
 dlg.setAttribute('aria-labelledby','dialog-title');
 dlg.showModal();
}
function renderCupSettings(openArea){
 $('#dialog').innerHTML='<div class="dialog-head"><h2 id="dialog-title">월드컵 기준 설정</h2><button class="close" aria-label="닫기" data-close>×</button></div>'+
  '<p class="subtle cup-settings-note">영역별로 평가 요소와 질문을 편집하세요. 저장한 기준은 새로 시작하는 대결에 적용돼요.</p><form id="cup-settings-form" novalidate>'+cupDraft.map(([area,items],i)=>
   '<details class="cup-rule-area" '+(i===openArea?'open':'')+'><summary>'+esc(area||'새 영역')+' <span class="subtle">· '+items.length+'개 요소</span></summary><div class="cup-rule-body">'+
   '<label class="cup-rule-field">영역 이름<input data-rule-area="'+i+'" required maxlength="40" value="'+esc(area)+'"></label>'+
   items.map(([element,question],j)=>'<div class="cup-rule-item"><label class="cup-rule-field">평가 요소<input data-rule-area="'+i+'" data-rule-item="'+j+'" data-rule-field="0" required maxlength="60" value="'+esc(element)+'"></label>'+
   '<label class="cup-rule-field cup-rule-question">질문<input data-rule-area="'+i+'" data-rule-item="'+j+'" data-rule-field="1" maxlength="200" value="'+esc(question)+'"></label>'+
   '<button type="button" class="quiet" data-rule-action="remove-item" data-area="'+i+'" data-item="'+j+'" aria-label="'+esc(element||'평가 요소')+' 삭제">삭제</button></div>').join('')+
   '<div class="cup-rule-actions"><button type="button" data-rule-action="add-item" data-area="'+i+'">요소 추가</button><button type="button" class="quiet" data-rule-action="remove-area" data-area="'+i+'">영역 삭제</button></div></div></details>').join('')+
  '<p class="subtle cup-settings-error" role="status"></p><div class="cup-rule-actions"><button type="button" data-rule-action="add-area">영역 추가</button><button type="button" class="quiet" data-rule-action="restore">기본 30개 불러오기</button><button class="primary">기준 저장</button></div></form>';
}
function changeCupRule(input){
 const {ruleArea,ruleItem,ruleField}=input.dataset;
 const group=cupDraft[Number(ruleArea)];
 if(ruleItem===undefined)group[0]=input.value;
 else group[1][Number(ruleItem)][Number(ruleField)]=input.value;
}
function editCupRules({ruleAction,area,item}){
 let i=Number(area);
 if(ruleAction==='restore'){cupDraft=structuredClone(cupAreas);i=0;}
 if(ruleAction==='add-area'){i=cupDraft.length;cupDraft.push(['',[['','']]]);}
 if(ruleAction==='remove-area'){cupDraft.splice(i,1);i=Math.max(0,i-1);}
 if(ruleAction==='add-item')cupDraft[i][1].push(['','']);
 if(ruleAction==='remove-item')cupDraft[i][1].splice(Number(item),1);
 renderCupSettings(i);
 if(ruleAction==='add-area') $('#cup-settings-form [data-rule-area="'+i+'"]').focus();
 if(ruleAction==='add-item') $('#cup-settings-form [data-rule-area="'+i+'"][data-rule-item="'+(cupDraft[i][1].length-1)+'"]').focus();
}
function saveCupRules(){
 const rules=cupDraft.map(([area,items])=>[area.trim(),items.map(([name,question])=>[name.trim(),question.trim()])]);
 const invalid=rules.findIndex(([area,items])=>!area||!items.length||items.some(([name])=>!name));
 if(!rules.length||invalid!==-1){
  renderCupSettings(invalid);
  const error=$('.cup-settings-error');
  error.textContent='영역 이름과 평가 요소를 입력하고, 영역마다 요소를 하나 이상 남겨 주세요.';
  error.setAttribute('tabindex','-1');
  error.focus();
  return;
 }
 state.cupRules=rules;
 save();
 $('#dialog').close();
 render();
 $('[data-cup-settings]').focus();
 toast('월드컵 기준을 저장했어요.');
}


function currentCup(){
 const left=movie(state.compared[0]), right=movie(state.compared[1]);
 if(!left||!right||left.id===right.id)return null;
 const key=JSON.stringify([left.id,right.id].sort());
 const votes=state.cupVotes[key]??[];
 const areas=state.cupMatchRules[key]??(votes.length?cupAreas:state.cupRules??cupAreas);
 return {left,right,key,votes,areas,rounds:cupRuleRounds(areas)};
}
function cupTally(cup,votes){
 return [cup.left.id,cup.right.id,'tie'].map(id=>votes.filter(vote=>vote===id).length);
}
function cupResults(cup){
 const totals=cupTally(cup,cup.votes);
 const winner=totals[0]===totals[1]?null:totals[0]>totals[1]?cup.left:cup.right;
 let offset=0;
 const rows=cup.areas.map(([area,items])=>{
  const areaVotes=cup.votes.slice(offset,offset+items.length);
  offset+=items.length;
  const scores=cupTally(cup,areaVotes);
  return '<details class="cup-area"><summary><strong>'+esc(area)+'</strong><span>'+scores.join(' · ')+'</span></summary><ul>'+items.map(([element],i)=>{
   const vote=areaVotes[i];
   const title=vote==='tie'?'무승부':vote===cup.left.id?cup.left.title:cup.right.title;
   return '<li><span>'+esc(element)+'</span><strong>'+esc(title)+'</strong></li>';
  }).join('')+'</ul></details>';
 }).join('');
 return '<section class="panel cup-finale">'+(winner?cupFighter(winner)+'<span class="cup-ko" aria-hidden="true">K.O.</span>':'')+'<div><span class="eyebrow">월드컵 결과</span><h2 id="cup-heading" tabindex="-1">'+(winner?esc(winner.title)+' 우승':'공동 우승')+'</h2><p class="subtle">'+cup.rounds.length+'개 요소에서 더 많이 선택된 영화가 우승해요.</p></div></section>'+
  '<section class="panel cup-breakdown"><h3>영역별 결과</h3><p class="subtle">영역을 열면 각 평가 요소에서 선택한 작품을 볼 수 있어요.</p><div class="cup-scoreboard">'+[cup.left.title,cup.right.title,'무승부'].map((name,i)=>'<div><strong>'+totals[i]+'</strong><span>'+esc(name)+'</span></div>').join('')+'</div>'+rows+'</section>';
}
function cupStage(cup){
 if(cup.votes.length===cup.rounds.length)return cupResults(cup);
 const step=cup.votes.length;
 const {area,element,question}=cup.rounds[step];
 const totals=cupTally(cup,cup.votes);
 const contenders=[cup.left,cup.right];
 const meters=contenders.map((f,i)=>'<div class="cup-contender"><div><strong>'+esc(f.title)+'</strong><span>'+totals[i]+'점</span></div><meter min="0" max="'+cup.rounds.length+'" value="'+totals[i]+'" aria-label="'+esc(f.title)+' 득점"></meter></div>');
 return '<section class="panel cup-question cup-arena"><div class="cup-hud">'+meters[0]+'<b aria-hidden="true">VS</b>'+meters[1]+'</div><div class="cup-stage-status"><span class="badge">'+esc(area)+'</span><span>'+step+' / '+cup.rounds.length+' 완료</span></div><progress value="'+step+'" max="'+cup.rounds.length+'" aria-label="월드컵 진행률"></progress><h2 id="cup-heading" tabindex="-1">'+esc(element)+'</h2>'+(question?'<p>'+esc(question)+'</p>':'')+
  '<div class="cup-candidates">'+contenders.map((f,i)=>'<button type="button" class="cup-vote cup-player-'+(i+1)+(cupHit===f.id?' cup-landed':'')+'" data-cup-vote="'+esc(f.id)+'" aria-label="'+esc(f.title)+' 선택">'+cupFighter(f,i)+'<strong>'+esc(f.title)+'</strong><small>'+metadata(f)+'</small></button>').join('')+
  '<div class="cup-round-call" aria-hidden="true">'+(cupHit==='tie'?'DRAW':cupHit?'HIT!':'ROUND '+(step+1))+'</div></div><button type="button" class="cup-tie" data-cup-vote="tie">무승부</button></section>';
}
function renderCup(){
 render();
 $('#cup-heading')?.focus();
 cupHit='';
}
function cupAction({cupOpen:action,cupVote,cupUndo,cupExit,cupReset}){
 const cup=currentCup();
 if(!cup)return;
 if(action!==undefined){
  cupOpen=true;
  renderCup();
  return;
 }
 if(cupExit!==undefined){
  cupOpen=false;
  render();
  $('#cup-start')?.focus();
  return;
 }
 if(!cupOpen)return;
 if(cupVote&&[cup.left.id,cup.right.id,'tie'].includes(cupVote)&&cup.votes.length<cup.rounds.length){
  state.cupMatchRules[cup.key]=cup.areas;
  state.cupVotes[cup.key]=[...cup.votes,cupVote];
  cupHit=cupVote;
 }else if(cupUndo!==undefined&&cup.votes.length){
  state.cupVotes[cup.key]=cup.votes.slice(0,-1);
 }else if(cupReset!==undefined&&confirm('이 대결의 선택을 지우고 처음부터 다시 할까요?')){
  delete state.cupVotes[cup.key];
  delete state.cupMatchRules[cup.key];
 }else return;
 save();
 renderCup();
}

function recommendation(){
 const watched=films.filter(f=>rating(f.id));
 const ranked=films.filter(f=>!rating(f.id)).map(f=>{
  let score=0, strongest=0, anchor;
  watched.forEach(w=>{
   const similarity=Number(Boolean(f.genre)&&f.genre===w.genre)+Number(Boolean(f.director)&&f.director===w.director)*2+f.tags.filter(t=>w.tags.includes(t)).length*1.5;
   const affinity=similarity*(rating(w.id)-2.5);
   score+=affinity;
   if(affinity>strongest){strongest=affinity;anchor=w;}
  });
  return {f,score,anchor};
 }).sort((a,b)=>b.score-a.score);
 return title('✦  TASTE ORACLE','취향 추천','내 평점과 영화의 장르, 감독, 주제를 바탕으로 다음 작품을 찾아보세요.')+(!watched.length?empty('평점을 남기면 취향에 맞는 작품이 여기에 나타나요.','평점 남기기'):ranked.length?grid(ranked.slice(0,36).map(({f,anchor})=>filmCard(f,anchor?'〈'+anchor.title+'〉와 비슷해요':'새로운 취향 탐색'))):empty('왕국의 모든 영화를 평가했어요.'));
}
function criteria(){
 return title('✦  RATING RULES','평가 기준','나만의 항목을 만들고 가중 평균으로 영화 평점을 계산하세요.')+'<section class="panel"><form id="criteria-form"><div class="stack">'+state.criteria.map(c=>'<div class="criterion"><label>'+esc(c.name)+'</label><input type="number" name="'+c.id+'" min="1" max="10" value="'+c.weight+'" aria-label="'+esc(c.name)+' 가중치" required><button type="button" data-remove="'+c.id+'" aria-label="'+esc(c.name)+' 삭제">삭제</button></div>').join('')+'</div><p class="subtle" style="margin:12px 0">가중치가 클수록 자동 평점에 더 크게 반영돼요. 관람 횟수는 각 영화에 별도로 기록해요.</p><button class="primary">가중치 저장</button></form></section><form class="panel form-row" id="add-criterion"><label>새 평가 기준<input name="name" required maxlength="20" placeholder="예: 음악"></label><label>가중치<input name="weight" aria-label="새 기준 가중치" type="number" min="1" max="10" value="1" required></label><button>기준 추가</button></form>';
}
const palette={hair:['#261735','#533d81','#62dbe2','#f485b8'],outfit:['#7650bd','#216c69','#b24678','#485888'],skin:['#eab49e','#c48462','#8b5147','#f6cdaf']};
const characterOptions=[
 ['hairStyle','헤어스타일',['기본 가르마','단발','긴 머리','올림머리']],
 ['hair','머리색',['흑발','보라','민트','핑크']],
 ['outfitStyle','의상',['재킷','후드','로브','멜빵']],
 ['outfit','의상 색',['보라','청록','분홍','파랑']],
 ['skin','피부색',['피치','샌드','브라운','라이트']],
 ['accessory','액세서리',['없음','왕관','바이저','헤드폰']]
];
function sprite(target,c,decorative=false){
 const canvas=document.createElement('canvas'); canvas.width=32;canvas.height=32;
 if(decorative)canvas.setAttribute('aria-hidden','true');
 else{
  canvas.setAttribute('aria-label','픽셀 캐릭터');
  canvas.setAttribute('role','img');
 }
 const ctx=canvas.getContext('2d');
 const rect=(color,x,y,w,h)=>{ctx.fillStyle=color;ctx.fillRect(x,y,w,h);};
 const hair=palette.hair[c.hair],skin=palette.skin[c.skin],coat=palette.outfit[c.outfit];
 const hairStyle=c.hairStyle??0, outfitStyle=c.outfitStyle??0;
 rect('#110e23',5,27,22,3);
 if(hairStyle===1)rect(hair,8,6,16,14);
 if(hairStyle===2)rect(hair,8,6,16,18);
 if(hairStyle===3)rect(hair,12,1,8,5);
 rect('#231a39',9,22,14,6);rect(coat,8,17,16,8);rect('#39264c',8,20,3,5);rect('#39264c',21,20,3,5);
 if(outfitStyle===1){
  rect(coat,9,13,14,7);rect('#39264c',12,17,8,2);rect('#e8d4ff',13,19,1,4);rect('#e8d4ff',18,19,1,4);rect('#39264c',12,23,8,2);
 }else if(outfitStyle===2){
  rect(coat,8,19,16,9);rect('#493354',8,23,2,5);rect('#493354',22,23,2,5);rect('#ffd17d',15,19,2,8);rect('#ffd17d',9,26,14,1);
 }else if(outfitStyle===3){
  rect('#dbcee4',10,18,12,4);rect(coat,11,17,2,7);rect(coat,19,17,2,7);rect(coat,11,22,10,5);rect('#ffd17d',12,22,2,2);rect('#ffd17d',18,22,2,2);
 }else rect('#8df7db',15,19,2,4);
 rect(hair,9,5,14,11);rect(hair,11,3,10,3);rect(skin,11,8,10,9);rect(skin,14,16,4,3);
 if(hairStyle===1){
  rect(hair,9,7,3,11);rect(hair,20,7,3,11);rect(hair,11,7,10,4);
 }else if(hairStyle===2){
  rect(hair,8,9,3,14);rect(hair,21,9,3,14);rect(hair,10,7,4,4);rect(hair,14,7,8,2);
 }else if(hairStyle===3){
  rect(hair,11,7,10,2);rect(hair,10,9,2,3);rect(hair,20,9,2,3);
 }else{
  rect(hair,10,7,4,4);rect(hair,13,7,7,2);
 }
 rect('#241934',12,12,2,2);rect('#241934',18,12,2,2);rect('#a25577',15,15,2,1);
 if(c.accessory===1){rect('#ffd17d',10,4,12,3);rect('#ffd17d',10,1,2,4);rect('#ffd17d',15,0,2,4);rect('#ffd17d',20,1,2,4);}
 if(c.accessory===2){rect('#7af4db',10,11,12,3);rect('#2e496d',11,12,4,2);rect('#2e496d',17,12,4,2);}
 if(c.accessory===3){rect('#c77aff',7,9,3,7);rect('#c77aff',22,9,3,7);rect('#c77aff',9,5,2,5);rect('#c77aff',21,5,2,5);}
 target.replaceChildren(canvas);
}
function character(){
 const c=state.character;
 const cards=characterOptions.map(([key,label,values])=>'<fieldset class="avatar-choices"><legend>'+label+'</legend><div class="avatar-options">'+values.map((value,i)=>
  '<label class="avatar-option"><input type="radio" name="'+key+'" value="'+i+'" '+(i===(c[key]??0)?'checked':'')+'><span class="avatar-option-card"><span class="avatar-thumb" data-avatar-key="'+key+'" data-avatar-value="'+i+'"></span><span>'+value+'</span></span></label>'
 ).join('')+'</div></fieldset>').join('');
 return title('✦  CHARACTER STUDIO','나의 캐릭터','왕국에서 쓸 이름을 정하고 픽셀 캐릭터를 꾸며 보세요.')+'<div class="character"><div class="panel sprite-preview" id="sprite"></div><form class="panel" id="character-form"><label>캐릭터 이름<input name="name" value="'+esc(c.name)+'" maxlength="18" required class="field-label"></label>'+cards+'<p class="subtle" style="margin:12px 0 14px">Lv. '+level()+' · 평가와 퀘스트 완료로 레벨이 올라요.</p><button class="primary">캐릭터 저장</button></form></div>'+(accountStorage?.panel()??'');
}
function characterInput(form){
 const v=new FormData(form);
 const look=Object.fromEntries(characterOptions.map(([key])=>[key,Number(v.get(key))]));
 return {name:String(v.get('name')).trim(),...look};
}
function previewCharacter(){
 const look=characterInput($('#character-form'));
 sprite($('#sprite'),look);
 document.querySelectorAll('[data-avatar-key]').forEach(thumb=>{
  sprite(thumb,{...look,[thumb.dataset.avatarKey]:Number(thumb.dataset.avatarValue)},true);
 });
}
const pages={world:worldMap,home,quests:kingdomQuests,chronicle,map:kingdomMap,explore:explorer,upcoming,journal,compare:comparison,recommend:recommendation,criteria,character};
function render(){
 const current=route();
 document.body.classList.toggle('world-view',current==='world');
 $('#side-name').textContent=state.character.name;
 $('#side-level').textContent='LV. '+level();
 updateQuestHud();
 sprite($('#side-avatar'),state.character);
 $('#content').innerHTML=pages[current]();
 if(current==='explore') results();
 if(current==='map')paintMap();
 if(current==='compare'){
  for(const canvas of document.querySelectorAll('[data-cup-fighter]')){
   drawFilmFighter(canvas,movie(canvas.dataset.cupFighter));
  }
 }
 if(current==='character') previewCharacter();
 accountStorage?.paint();
}
let searchResults = [];
let lookupRequest;

function catalogDialog(){
 lookupRequest?.abort();
 searchResults=[];
 const dlg=$('#dialog');
 dlg.innerHTML='<div class="dialog-head"><h2 id="dialog-title">영화 찾아 추가</h2><button class="close" aria-label="닫기" data-close>×</button></div>'+
  '<form class="filter" id="external-search"><input required maxlength="100" name="query" aria-label="외부 영화 제목" placeholder="한국어 또는 영어 제목" value="'+esc(search.trim().slice(0,100))+'"><button class="primary">위키백과 검색</button></form>'+
  '<p id="external-status" class="subtle" aria-live="polite">제목을 입력하면 위키백과의 영화 문서와 포스터를 찾아요.</p><div class="external-results" id="external-results"></div>'+
  '<details class="manual-film"><summary>직접 입력해서 추가</summary><form id="manual-film"><div class="form-row"><label>제목<input name="title" required maxlength="120"></label><label>개봉 연도<input type="number" name="year" min="1888" max="2100"></label></div><div class="form-row"><label>장르<input name="genre" maxlength="30"></label><label>감독<input name="director" maxlength="90"></label></div><label class="field-label">포스터 주소 (선택)<input class="field-label" type="url" name="image" placeholder="https://" maxlength="1000"></label><button type="submit">내 영화로 추가</button></form></details>';
 dlg.setAttribute('aria-labelledby','dialog-title');
 if(!dlg.open)dlg.showModal();
}
function httpsImage(value){
 try{
  const url=new URL(value);
  return url.protocol==='https:'&&!url.username&&!url.password?url.href:'';
 }catch{return '';}
}
function catalogTitle(value){
 return value.toLowerCase().normalize('NFKC').replace(/[^\p{L}\p{N}]/gu,'');
}
function filmTitles(film){
 return [film.title,film.en,...(film.aliases??[])].filter(Boolean);
}
function existingFilm(candidate){
 const names=filmTitles(candidate).map(catalogTitle);
 return films.find(f=>(candidate.wikiKey&&candidate.wikiKey===f.wikiKey)||
  ((!candidate.year||!f.year||candidate.year===f.year)&&filmTitles(f).some(n=>names.includes(catalogTitle(n)))));
}
async function wikiSearch(query,lang,signal){
 const url=new URL('https://'+lang+'.wikipedia.org/w/api.php');
 url.search=new URLSearchParams({
  action:'query',generator:'search',gsrsearch:query+(lang==='ko'?' 영화':' film'),gsrlimit:'12',gsrnamespace:'0',
  prop:'pageimages|description|pageprops|langlinks',lllang:lang==='ko'?'en':'ko',pilicense:'any',piprop:'thumbnail',pithumbsize:'450',format:'json',origin:'*'
 });
 const response=await fetch(url,{signal});
 if(!response.ok)throw new Error('Wikipedia request failed');
 const data=await response.json();
 if(data.error)throw new Error('Wikipedia search failed');
 return Object.values(data.query?.pages??{}).sort((a,b)=>a.index-b.index).flatMap(page=>{
  const description=page.description??'';
  const year=Number(description.match(/\b(18\d\d|19\d\d|20\d\d)\b/)?.[0])||null;
  const isFilm=lang==='ko'?/영화/.test(description)&&!/영화제|영화 목록|영화상|영화 시리즈|배우|영화 감독|영화 제작사/.test(description)
   :/\bfilm\b/i.test(description)&&!/film series|film festival|film list|film director|film award|production company/i.test(description);
  if(!year||!isFilm||page.pageprops?.disambiguation!==undefined)return [];
  const cleanTitle=value=>value.replace(/\s*\([^)]*(?:film|영화)[^)]*\)\s*$/i,'').trim();
  const main=cleanTitle(page.title), linked=cleanTitle(page.langlinks?.[0]?.['*']??'');
  return [{
   title:lang==='ko'?main:linked||main,en:lang==='en'?main:linked,year,genre:'',director:'',minutes:null,imdb:'',plot:description,tags:[],
   image:httpsImage(page.thumbnail?.source),wikiKey:page.pageprops?.wikibase_item||lang+':'+page.pageid,
   source:'https://'+lang+'.wikipedia.org/?curid='+Number(page.pageid)
  }];
 });
}
async function lookupFilm(query){
 if(!query)return;
 lookupRequest?.abort();
 const controller=new AbortController();
 lookupRequest=controller;
 const status=$('#external-status'), container=$('#external-results');
 searchResults=[];
 status.textContent='영화를 검색하고 있어요…';
 container.replaceChildren();
 const timeout=setTimeout(()=>controller.abort(),10000);
 const languages=/[가-힣]/.test(query)?['ko','en']:['en','ko'];
 const results=await Promise.allSettled(languages.map(lang=>wikiSearch(query,lang,controller.signal)));
 clearTimeout(timeout);
 if(lookupRequest!==controller||!status.isConnected||!$('#dialog').open)return;
 const found=new Map();
 for(const result of results){
  if(result.status!=='fulfilled')continue;
  for(const f of result.value){
   const first=found.get(f.wikiKey);
   if(!first)found.set(f.wikiKey,f);
   else if(!first.image)first.image=f.image;
  }
 }
 searchResults=[...found.values()].slice(0,12);
 status.textContent=searchResults.length?'추가할 영화를 선택하세요.':results.some(r=>r.status==='rejected')
  ?'검색 결과를 불러오지 못했어요. 다시 검색하거나 직접 입력해 주세요.'
  :'일치하는 영화가 없어요. 다른 제목으로 검색하거나 직접 입력해 주세요.';
 container.innerHTML=searchResults.map((f,i)=>{
  const existing=existingFilm(f);
  return '<div class="external-item">'+poster(f)+'<span><strong>'+esc(f.title)+'</strong><small>'+esc(f.year+' · '+f.plot)+'</small></span>'+
   (existing?'<button data-film="'+esc(existing.id)+'">이미 등록됨</button>':'<button data-add-film="'+i+'">추가</button>')+'</div>';
 }).join('');
}
function addManualFilm(values){
 const get=name=>String(values.get(name)||'').trim();
 const title=get('title'), image=httpsImage(get('image'));
 if(!title){toast('영화 제목을 입력해 주세요.');return;}
 if(get('image')&&!image){toast('포스터 주소는 https://로 시작해야 해요.');return;}
 addFilm({title,en:'',year:Number(get('year'))||null,genre:get('genre'),director:get('director'),minutes:null,imdb:'',plot:'',tags:[],image});
}
function addFilm(candidate){
 if(!candidate)return;
 const existing=existingFilm(candidate);
 if(existing){detail(existing.id);toast('이미 목록에 있는 영화예요.');return;}
 const f={...candidate,id:'added-'+crypto.randomUUID(),added:true};
 state.addedFilms.push(f);
 try{save();}
 catch{
  state.addedFilms.pop();
  toast('브라우저에 영화를 저장하지 못했어요.');
  return;
 }
 films.push(f);
 if(route()==='explore'){
  search='';genre='';period='added';visibleCount=30;
 }
 render();
 detail(f.id);
 toast('영화를 왕국에 추가했어요.');
}

const starOptions=[['','별점 선택'],...Array.from({length:10},(_,i)=>[(i+1)/2,((i+1)/2).toFixed(1)])];

let reviewDraft;
function filmCriteria(rules){
 const excluded=new Set(rules?.excluded??[]);
 return [...state.criteria.filter(c=>!excluded.has(c.id)),...(rules?.custom??[])].map(c=>({
  ...c,weight:rules?.weights?.[c.id]??c.weight
 }));
}
const criterionWeightOptions=Array.from({length:10},(_,i)=>[i+1,i+1]);
const sliderText=score=>score?score.toFixed(1):'미평가';
function reviewFields(){
 const active=filmCriteria(reviewDraft.rules);
 const excluded=new Set(reviewDraft.rules.excluded);
 const restore=state.criteria.filter(c=>excluded.has(c.id));
 return (active.length?active.map(c=>{
  const name=esc(c.name), key=esc(c.id);
  const score=Number(reviewDraft.scores[c.id])||0;
  return '<div class="review-criterion"><div class="review-criterion-head"><label class="review-rule-weight"><span>가중치</span><select data-review-weight="'+key+'" aria-label="'+name+' 가중치">'+options(criterionWeightOptions,c.weight)+'</select></label><label for="review-score-'+key+'">'+name+'</label>'+
   '<button type="button" class="quiet" data-review-remove="'+key+'" aria-label="'+name+' 기준 빼기">빼기</button></div>'+
   '<div class="review-score-row"><input id="review-score-'+key+'" name="score-'+key+'" type="range" min="0" max="5" step="0.5" value="'+score+'" data-review-score aria-label="'+name+' 점수" aria-valuetext="'+sliderText(score)+'" style="--score-fill:'+score*20+'%"><output for="review-score-'+key+'">'+sliderText(score)+'</output></div>'+
   '<label class="review-note">'+name+' 설명<textarea name="explain-'+key+'" rows="2" placeholder="이 점수를 준 이유를 남겨 보세요." maxlength="1000">'+esc(reviewDraft.explanations[c.id]??'')+'</textarea></label></div>';
 }).join(''):'<p class="subtle">이 영화에 적용할 기준을 아래에서 추가할 수 있어요.</p>')+
  (restore.length?'<div class="review-rule-restore">'+restore.map(c=>'<button type="button" class="quiet" data-review-restore="'+esc(c.id)+'">'+esc(c.name)+' 다시 넣기</button>').join('')+'</div>':'');
}
function reviewScores(values,criteria){
 return Object.fromEntries(criteria.flatMap(c=>{
  const score=Number(values.get('score-'+c.id));
  return score>=.5&&score<=5?[[c.id,score]]:[];
 }));
}
function reviewExplanations(values,criteria){
 return Object.fromEntries(criteria.map(c=>[c.id,String(values.get('explain-'+c.id)??'').trim()]).filter(([,text])=>text));
}
function refreshReviewScore(form){
 const criteria=filmCriteria(reviewDraft.rules);
 const score=weighted(reviewScores(new FormData(form),criteria),null,criteria);
 form.querySelector('#weighted-score').textContent=score===null?'기준 점수를 선택하면 계산돼요.':'★ '+score.toFixed(1)+' / 5';
}
function updateReviewControl(input){
 if(input.dataset.reviewWeight!==undefined){
  const id=input.dataset.reviewWeight;
  const base=[...state.criteria,...reviewDraft.rules.custom].find(c=>c.id===id);
  const weight=Number(input.value);
  if(weight===base?.weight)delete reviewDraft.rules.weights[id];
  else reviewDraft.rules.weights[id]=weight;
 }else{
  const score=Number(input.value);
  input.style.setProperty('--score-fill',score*20+'%');
  input.setAttribute('aria-valuetext',sliderText(score));
  input.nextElementSibling.textContent=sliderText(score);
 }
 refreshReviewScore(input.form);
}
function editReviewCriteria(button){
 const form=button.form, criteria=filmCriteria(reviewDraft.rules);
 const {reviewRemove,reviewRestore,reviewAdd}=button.dataset;
 const {rules,scores,explanations}=reviewDraft;
 const values=new FormData(form);
 for(const {id} of criteria){
  scores[id]=values.get('score-'+id)??'';
  explanations[id]=values.get('explain-'+id)??'';
 }
 let focusId=reviewRestore;
 if(reviewRemove){
  if(state.criteria.some(c=>c.id===reviewRemove))rules.excluded.push(reviewRemove);
  else{
   rules.custom=rules.custom.filter(c=>c.id!==reviewRemove);
   delete rules.weights[reviewRemove];
  }
 }else if(reviewRestore){
  rules.excluded=rules.excluded.filter(id=>id!==reviewRestore);
 }else if(reviewAdd!==undefined){
  const input=form.elements['criterion-name'];
  const name=input.value.trim();
  if(!name||[...state.criteria,...rules.custom].some(c=>c.name.toLowerCase()===name.toLowerCase())){
   toast('기존 기준과 다른 이름을 입력해 주세요.');
   input.focus();
   return;
  }
  focusId='f'+crypto.randomUUID();
  rules.custom.push({id:focusId,name,weight:Number(form.elements['criterion-weight'].value)});
  input.value='';
 }
 form.querySelector('#review-rule-list').innerHTML=reviewFields();
 refreshReviewScore(form);
 (focusId?form.elements.namedItem('score-'+focusId):form.elements['criterion-name'])?.focus();
}
function toggleReviewMode(button){
 const form=button.form, select=form.elements.overall;
 const manual=select.disabled;
 select.disabled=!manual;
 form.querySelector('#manual-score').hidden=!manual;
 form.querySelector('#automatic-score').hidden=manual;
 button.textContent=manual?'기준 점수로 계산':'따로 별점매기기';
 button.setAttribute('aria-expanded',String(manual));
 if(manual)select.focus();
}
function reviewVillageFields(id){
 return '<fieldset class="review-villages"><legend>마을 선택 <span class="subtle">(선택사항)</span></legend><div>'+
  state.villages.map(village=>'<label><input type="checkbox" name="review-village" value="'+esc(village.id)+'" '+(village.films.includes(id)?'checked':'')+'> '+esc(village.name)+'</label>').join('')+
  '</div></fieldset>';
}
function lifeFilmFields(id){
 const included=isLifeFilm(id);
 const choice=!included&&state.lifeFilms.length>0;
 return '<div class="review-life"><label class="review-life-toggle"><input type="checkbox" name="life" '+(included?'checked':'')+(choice?' aria-controls="life-film-options"':'')+'> 내 인생 영화로 지정</label>'+
  (choice?'<fieldset id="life-film-options" hidden disabled><legend>기존 인생영화 어떻게 할까요?</legend><label><input type="radio" name="life-action" value="add" required> 기존 인생영화에 추가하기</label><label><input type="radio" name="life-action" value="replace"> 기존 인생영화를 대체함</label></fieldset>':'')+
  '<p class="subtle">추가한 인생영화는 왕좌에 함께 올라요. 대체하면 이전 대는 왕좌실록에 남아요.</p></div>';
}

function toggleWatchlist(button){
 const id=button.dataset.watchlist;
 if(!movie(id))return;
 const selected=!state.watchlist.includes(id);
 state.watchlist=selected?[...state.watchlist,id]:state.watchlist.filter(filmId=>filmId!==id);
 save();
 button.setAttribute('aria-pressed',String(selected));
 render();
 toast(selected?'개봉예정작에 담았어요.':'개봉예정작에서 뺐어요.');
}
function detail(id){
 const f=movie(id), review=state.reviews[id], dlg=$('#dialog');
 if(!f)return;
 const source=f.imdb?'<a class="badge" href="https://www.imdb.com/title/'+esc(f.imdb)+'/" target="_blank" rel="noopener">IMDb에서 더 보기</a>'
  :f.source?'<a class="badge" href="'+esc(f.source)+'" target="_blank" rel="noopener">위키백과에서 더 보기</a>':'';
 const manual=review?.auto===false;
 const wanted=state.watchlist.includes(id);
 reviewDraft={
  rules:{excluded:[...(review?.filmRules?.excluded??[])],custom:[...(review?.filmRules?.custom??[])],weights:{...review?.filmRules?.weights}},
  scores:{...review?.scores},explanations:{...review?.explanations}
 };
 dlg.innerHTML='<div class="dialog-head"><div><span class="eyebrow">'+esc(f.en)+'</span><h2 id="dialog-title">'+esc(f.title)+'</h2></div><button class="close" aria-label="닫기" data-close>×</button></div><div class="dialog-body">'+poster(f)+'<div><p>'+metadata(f)+(f.director?'<br>감독 '+esc(f.director):'')+'</p><p>'+esc(f.plot||'')+'</p><div class="film-detail-actions">'+source+'<button type="button" class="watchlist-toggle" data-watchlist="'+esc(id)+'" aria-pressed="'+wanted+'"><span aria-hidden="true"></span>보고싶어요</button></div>'+movieVillages(id)+'</div></div>'+
  '<form id="review-form" data-id="'+esc(id)+'"><div class="review-overall"><div class="review-overall-head"><strong>종합 별점</strong><button type="button" class="quiet" data-review-mode aria-controls="manual-score" aria-expanded="'+manual+'">'+(manual?'기준 점수로 계산':'따로 별점매기기')+'</button></div>'+
  '<div id="automatic-score" '+(manual?'hidden':'')+'><output id="weighted-score" aria-live="polite"></output><p class="subtle">점수를 매긴 기준만 가중 평균에 반영돼요.</p></div>'+
  '<div id="manual-score" '+(manual?'':'hidden')+'><label class="review-manual-label">직접 입력 별점 (5점 만점)<select name="overall" required '+(manual?'':'disabled')+'>'+options(starOptions,manual?review.overall:'')+'</select></label></div></div>'+
  '<fieldset class="review-criteria"><legend>기준별 평가 <span class="subtle">(5점 만점)</span></legend><div id="review-rule-list">'+reviewFields()+'</div><div class="review-rule-editor"><label>이 영화의 새 기준<input name="criterion-name" maxlength="30" placeholder="예: 색감"></label><label>가중치<select name="criterion-weight">'+options(criterionWeightOptions,1)+'</select></label><button type="button" data-review-add>기준 추가</button></div></fieldset>'+
  '<div class="review-extras"><label>관람 횟수<input name="watch-count" type="number" inputmode="numeric" min="0" step="1" value="'+esc(review?.watchCount??'')+'" placeholder="예: 2"></label><label>최애 캐릭터<input name="favorite-character" maxlength="120" value="'+esc(review?.favoriteCharacter??'')+'" placeholder="영화 속 캐릭터 이름"></label></div>'+
  '<label class="field-label">전체 감상평<textarea name="note" rows="2" placeholder="어떤 장면이 가장 기억에 남았나요?" maxlength="1500">'+esc(review?.note??'')+'</textarea></label>'+lifeFilmFields(id)+reviewVillageFields(id)+'<button class="primary">감상 기록 저장</button> '+(review?'<button type="button" data-delete="'+esc(id)+'">기록 삭제</button>':'')+'</form>';
 refreshReviewScore(dlg.querySelector('#review-form'));
 dlg.setAttribute('aria-labelledby','dialog-title'); if(!dlg.open) dlg.showModal();
}
function weighted(scores, fallback, criteria){
 const scored=criteria.filter(c=>scores[c.id]!==undefined);
 if(!scored.length)return fallback;
 return Math.round(scored.reduce((n,c)=>n+scores[c.id]*c.weight,0)/scored.reduce((n,c)=>n+c.weight,0)*10)/10;
}
function updateAuto(){
 for(const review of Object.values(state.reviews)){
  if(review.auto) review.overall=weighted(review.scores,review.overall,filmCriteria(review.filmRules));
 }
}
document.addEventListener('error',event=>{
 const img=event.target;
 if(img.matches?.('.poster-frame img'))img.hidden=true;
},true);
$('#logo').innerHTML=icon('crown');
window.addEventListener('hashchange',()=>{const settings=$('.game-settings');if(settings)settings.open=false;if(state)render();window.scrollTo(0,0);});
document.addEventListener('keydown',e=>{
 const settings=$('.game-settings');
 if(e.key==='Escape'&&settings?.open&&settings.contains(e.target)){
  settings.open=false;
  $('#game-settings-toggle').focus();
 }
 if(e.key==='/'&&!$('#dialog').open&&!e.target.matches('input,textarea,select,[contenteditable]')){e.preventDefault();go('explore');setTimeout(()=>$('#search')?.focus(),0);}
});
document.addEventListener('click',e=>{
 const settings=$('.game-settings');
 if(settings?.open&&(!settings.contains(e.target)||e.target.closest('.game-settings a')))settings.open=false;
 const action=e.target.closest('button');
 if(!action)return;
 const d=action.dataset;
 if(d.go){go(d.go);if(action.matches('.header-search'))setTimeout(()=>$('#search')?.focus(),0);}
 if(d.film)detail(d.film);
 if(d.watchlist)toggleWatchlist(action);
 if(d.villageSelect){
  selectedVillageId=d.villageSelect;
  villageFilmQuery='';
  render();
  [...document.querySelectorAll('[data-village-select]')].find(pin=>pin.dataset.villageSelect===selectedVillageId)?.focus();
 }
 if(d.villageEdit!==undefined)editVillage(d.villageEdit);
 if(d.villageAdd){
  setVillageFilm(d.villageId,d.villageAdd,true);
  $('#village-film-query')?.focus();
 }
 if(d.villageRemove){
  setVillageFilm(d.villageId,d.villageRemove,false);
  $('#village-film-query')?.focus();
 }
 if(d.profile)accountStorage?.action(d.profile);
 if(d.reviewMode!==undefined)toggleReviewMode(action);
 if(d.reviewAdd!==undefined||d.reviewRemove||d.reviewRestore)editReviewCriteria(action);
 if(action.matches('[data-cup-open],[data-cup-vote],[data-cup-exit],[data-cup-undo],[data-cup-reset]'))cupAction(d);
 if(d.cupSettings!==undefined)openCupSettings();
 if(d.ruleAction)editCupRules(d);
 if(d.comparePick)chooseComparison(Number(d.compareSlot),d.comparePick);
 if(d.compareClear!==undefined)chooseComparison(Number(d.compareClear),'');
 if('catalogSearch'in d)catalogDialog();
 if('more'in d){
  const firstNew=visibleCount;
  visibleCount+=30;
  results();
  document.querySelectorAll('#results .film')[firstNew]?.focus();
 }
 if(d.addFilm!==undefined)addFilm(searchResults[Number(d.addFilm)]);
 if('close'in d)$('#dialog').close();
 if(d.remove){
  if(state.criteria.length<2){toast('평가 기준을 하나 이상 남겨 주세요.');return;}
  state.criteria=state.criteria.filter(c=>c.id!==d.remove);updateAuto();save();render();toast('평가 기준을 삭제했어요.');
 }
 if(d.delete&&confirm('이 영화의 감상 기록을 삭제할까요?')){
  delete state.reviews[d.delete];
  state.lifeFilms=state.lifeFilms.filter(id=>id!==d.delete);
  save();$('#dialog').close();render();toast('감상 기록을 삭제했어요.');
 }
});
document.addEventListener('input',e=>{
 if(e.target.matches('[data-review-score],[data-review-weight]'))updateReviewControl(e.target);
 if(e.target.dataset.ruleArea!==undefined)changeCupRule(e.target);
 if(e.target.id==='village-film-query'){
  villageFilmQuery=e.target.value;
  $('#village-results').innerHTML=villageFilmMatches(activeVillage());
 }
 if(e.target.id==='search'){search=e.target.value;visibleCount=30;results();}
 if(e.target.dataset.compareQuery!==undefined){
  const slot=Number(e.target.dataset.compareQuery);
  compareQueries[slot]=e.target.value;
  $('#compare-results-'+slot).innerHTML=compareResults(slot);
 }
 if(e.target.matches('#character-form input[type=radio]'))previewCharacter();
});
document.addEventListener('change',e=>{
 if(e.target.name==='life'){
  const choices=e.target.form.querySelector('#life-film-options');
  if(choices)choices.hidden=choices.disabled=!e.target.checked;
 }
 if(e.target.dataset.villageMember){
  const {villageMember,memberFilm}=e.target.dataset;
  const staged=[...document.querySelectorAll('#review-form [name="review-village"]')].find(input=>input.value===villageMember);
  if(staged)staged.checked=e.target.checked;
  setVillageFilm(villageMember,memberFilm,e.target.checked);
 }
 if(e.target.matches('[data-review-score],[data-review-weight]'))updateReviewControl(e.target);
 if(e.target.id==='genre'){genre=e.target.value;visibleCount=30;results();}
 if(e.target.id==='period'){period=e.target.value;visibleCount=30;results();}

});
document.addEventListener('submit',e=>{
 const form=e.target, values=new FormData(form);
 e.preventDefault();
 if(form.dataset.compareForm!==undefined){
  const slot=Number(form.dataset.compareForm);
  const [first]=compareMatches(slot);
  if(first)chooseComparison(slot,first.id);
  return;
 }
 if(form.id==='village-form'){saveVillage(form,values);return;}
 if(form.id==='cup-settings-form'){saveCupRules();return;}
 if(form.id==='external-search'){lookupFilm(String(values.get('query')).trim());return;}
 if(form.id==='manual-film'){addManualFilm(values);return;}
 if(form.id==='review-form'){
  const id=form.dataset.id;
  const criteria=filmCriteria(reviewDraft.rules);
  const scores=reviewScores(values,criteria);
  const auto=form.elements.overall.disabled;
  const overall=auto?weighted(scores,null,criteria):Number(values.get('overall'));
  if(!overall){
   toast(auto?'자동 계산에 사용할 기준 점수를 선택해 주세요.':'종합 별점을 선택해 주세요.');
   (auto?form.querySelector('[data-review-score]'):form.elements.overall)?.focus();
   return;
  }
  const explanations=reviewExplanations(values,criteria);
  const designate=values.has('life')&&!isLifeFilm(id);
  const lifeAction=values.get('life-action');
  if(designate&&state.lifeFilms.length&&lifeAction!=='add'&&lifeAction!=='replace'){
   toast('인생영화를 추가할지 대체할지 선택해 주세요.');
   form.querySelector('[name="life-action"]')?.focus();
   return;
  }
  const countInput=String(values.get('watch-count')??'');
  const watchCount=countInput===''?null:Number(countInput);
  if(watchCount!==null&&(!Number.isSafeInteger(watchCount)||watchCount<0)){
   toast('관람 횟수는 0 이상의 정수로 입력해 주세요.');
   form.elements['watch-count'].focus();
   return;
  }
  const favoriteCharacter=String(values.get('favorite-character')??'').trim();
  state.reviews[id]={overall,auto,scores,explanations,filmRules:reviewDraft.rules,watchCount,favoriteCharacter,note:String(values.get('note')).trim(),time:Date.now()};
  const selectedVillages=new Set(values.getAll('review-village'));
  for(const village of state.villages)updateVillageMembership(village,id,selectedVillages.has(village.id));
  if(designate&&lifeAction==='replace'&&state.lifeFilms.length){
   state.throneHistory.push({replacedAt:Date.now(),films:state.lifeFilms.map(filmId=>({id:filmId,title:movie(filmId).title}))});
   state.lifeFilms=[id];
  }else if(designate){
   state.lifeFilms.push(id);
  }
  if(!values.has('life'))state.lifeFilms=state.lifeFilms.filter(filmId=>filmId!==id);
  $('#dialog').close();toast(designate?'인생 영화가 왕좌에 올랐어요.':'감상 기록을 저장했어요.');
 }
 if(form.id==='character-form'){
  const character=characterInput(form);
  if(!character.name){toast('캐릭터 이름을 입력해 주세요.');return;}
  state.character=character;state.customized=true;toast('캐릭터를 저장했어요.');
 }
 if(form.id==='criteria-form'){
  state.criteria=state.criteria.map(c=>({...c,weight:Number(values.get(c.id))}));
  updateAuto();toast('평가 기준을 저장했어요.');
 }
 if(form.id==='add-criterion'){
  const name=String(values.get('name')).trim();
  if(!name||state.criteria.some(c=>c.name.toLowerCase()===name.toLowerCase())){toast('새로운 기준 이름을 입력해 주세요.');return;}
  state.criteria.push({id:'c'+crypto.randomUUID(),name,weight:Number(values.get('weight'))});toast('평가 기준을 추가했어요.');
 }
 save();render();
});
if(accountStorage)void accountStorage.start(loadState,render);
else{loadState(guestState());render();}
