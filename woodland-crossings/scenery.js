// One location per chapter; all artwork is bundled locally.
export const SCENES=[
 {asset:'chapter-one/fair-v3.webp',name:'The lantern fair',focus:'50% 50%',indoors:false},
 {asset:'footprint-trail.webp',name:'The foggy streambank',focus:'65% 72%',indoors:false},
 {asset:'bell-workshop.webp',name:'The empty bell workshop',focus:'70% 64%',indoors:true},
 {asset:'map-room.webp',name:'The mill records room',focus:'68% 66%',indoors:true},
 {asset:'witness-crossroads.webp',name:'The village crossroads',focus:'48% 65%',indoors:false},
 {asset:'hillside-dawn.webp',name:'The hillside at dawn',focus:'65% 62%',indoors:false}
];

const atlases=['chapter-one/storyboard.webp','tracks-views.webp','bell-views.webp','map-views.webp','witness-views.webp','rescue-views.webp'];
const titles=[
 ['The distant mill window','A remembered fireside','The rain-soaked mill lane','The mill entrance'],
 ['A fresh heel print','Round marks by the reeds','The fork in the trail','Where the heavy load rested'],
 ['The empty tool shed','The undamaged bell mounting','The carrying-strap hook','A scrap of patched cloth'],
 ['The bridge on the map','Rain on the old map','The higher route','The record by the doorway'],
 ['The bakery clock','The ferryman’s landing','Comparing witness notes','The quiet river bend'],
 ['Blankets beneath the porch','The warning light','The safe hillside route','The rescue clues at dawn']
];
export const QUESTION_SCENES=SCENES.flatMap((base,stage)=>[
 {...base,key:`${stage}-0`,stage,view:0,scale:'100% 100%'},
 ...titles[stage].map((name,i)=>({asset:stage===0?['window-v3','fireside-v3','lane-v3','doorway-v3'].map(n=>'chapter-one/'+n+'.webp')[i]:atlases[stage],name,key:`${stage}-${i+1}`,stage,view:i+1,indoors:stage===0?[false,true,false,true][i]:base.indoors,focus:stage===0?'50% 50%':`${i%2*100}% ${Math.floor(i/2)*100}%`,scale:stage===0?'100% 100%':'200% 200%'}))
]);
// Match the current Chapter 2 story locations in fallback/exploration views too.
for(const view of QUESTION_SCENES.filter(x=>x.stage===1)){
 const [sheet,cell]=[[1,1],[1,3],[2,1],[2,2],[3,2]][view.view];
 Object.assign(view,{asset:`chapter-two/continuity/sheet-${String(sheet).padStart(2,'0')}.webp?v=c2continuity1`,name:['The lower mill room','The upper room','Bram’s desk','The streambank','The tool shed'][view.view],indoors:view.view!==3,focus:`${cell%2*100}% ${Math.floor(cell/2)*100}%`,scale:'200% 200%'});
}
SCENES[1]={...SCENES[1],...QUESTION_SCENES.find(x=>x.stage===1&&x.view===0)};
// Chapter 3 now follows the stream, broken bridge and return path.
for(const view of QUESTION_SCENES.filter(x=>x.stage===2))Object.assign(view,{
 asset:`chapter-three/frames/sheet-${String(view.view+1).padStart(2,'0')}.webp?v=c3art1`,
 name:['The near-bank path','The lower footbridge','The hazel bank','Above the broken crossing','The fingerpost'][view.view],
 indoors:false,focus:'100% 100%',scale:'200% 200%'
});
SCENES[2]={...QUESTION_SCENES.find(x=>x.stage===2&&x.view===0)};
// Witnesses compare their accounts beneath the bakery awning throughout Chapter 4.
for(const view of QUESTION_SCENES.filter(x=>x.stage===3))Object.assign(view,{
 asset:`chapter-four/frames/sheet-${String(view.view+1).padStart(2,'0')}.webp?v=c4ears2`,
 name:['Back beneath the awning','Two accounts','Time between the sounds','The way round','Supper for three'][view.view],
 indoors:false,focus:'100% 100%',scale:'200% 200%'
});
SCENES[3]={...QUESTION_SCENES.find(x=>x.stage===3&&x.view===0)};
// Chapter 5 language notes reuse quiet, spoiler-free woodland scenery.
for(const view of QUESTION_SCENES.filter(x=>x.stage===4))Object.assign(view,{
 asset:view.view===0?'tracks-views.webp':'witness-views.webp',
 frameCell:view.view===0?2:3,indoors:false,
 focus:view.view===0?'0% 100%':'100% 100%',scale:'200% 200%'
});
SCENES[4]={...QUESTION_SCENES.find(x=>x.stage===4&&x.view===0)};
// Location captions follow the revised Chapters 5–6 manuscripts.
const laterLocations=[['The old steps','The signal rock','The signal rock','The signal rock','Quarry Shelter'],['The signal rock','The bakery','The mill yard','The mill and crossing','The village square']];
for(const view of QUESTION_SCENES.filter(x=>x.stage>=4))view.name=laterLocations[view.stage-4][view.view];
// Optional trails use fixed, reviewed paintings rather than numeric chapter fallbacks.
export const BONUS_SCENES={
 b1:{stage:4,asset:'chapter-five/frames/sheet-03.webp?v=c5ears2',cell:2,name:'The map at the signal rock'},
 b2:{stage:3,asset:'chapter-six/frames/sheet-01.webp?v=c6art1',cell:2,name:'Bram and the chipped bell'},
 b3:{stage:5,asset:'chapter-six/frames/sheet-01.webp?v=c6art1',cell:3,name:'The return to the bakery'}
};
for(const [id,view] of Object.entries(BONUS_SCENES))Object.assign(view,{key:'bonus-'+id,indoors:false,focus:`${view.cell%2*100}% ${Math.floor(view.cell/2)*100}%`,scale:'200% 200%'});
export function questionScene(q,key=null){
 if(BONUS_SCENES[q.id])return BONUS_SCENES[q.id];
 const views=QUESTION_SCENES.filter(x=>x.stage===q.stage);
 const saved=views.find(x=>x.key===key);if(saved)return saved;
 const n=Number(q.id.replace(/\D/g,''))||1;
 const index=q.remedial?n%5:q.id.startsWith('b')?(n+1)%5:(n-1)%5;
 return views[index];
}
export function selectQuestionScene(s,q){
 const bonus=BONUS_SCENES[q.id];
 if(bonus){s.activeScenery={question:q.id,seq:s.seq,key:bonus.key};s.lastSceneKey=bonus.key;return bonus;}
 const old=s.activeScenery;
 if(old?.question===q.id&&old.seq===s.seq&&QUESTION_SCENES.some(x=>x.key===old.key&&x.stage===q.stage))return questionScene(q,old.key);
 let next=questionScene(q);
 if(next.key===s.lastSceneKey)next=QUESTION_SCENES.find(x=>x.stage===q.stage&&x.view===(next.view+1)%5);
 s.activeScenery={question:q.id,seq:s.seq,key:next.key};s.lastSceneKey=next.key;return next;
}
