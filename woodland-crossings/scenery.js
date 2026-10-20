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
export function questionScene(q,key=null){
 const views=QUESTION_SCENES.filter(x=>x.stage===q.stage);
 const saved=views.find(x=>x.key===key);if(saved)return saved;
 const n=Number(q.id.replace(/\D/g,''))||1;
 const index=q.remedial?n%5:q.id.startsWith('b')?(n+1)%5:(n-1)%5;
 return views[index];
}
export function selectQuestionScene(s,q){
 const old=s.activeScenery;
 if(old?.question===q.id&&old.seq===s.seq&&QUESTION_SCENES.some(x=>x.key===old.key&&x.stage===q.stage))return questionScene(q,old.key);
 let next=questionScene(q);
 if(next.key===s.lastSceneKey)next=QUESTION_SCENES.find(x=>x.stage===q.stage&&x.view===(next.view+1)%5);
 s.activeScenery={question:q.id,seq:s.seq,key:next.key};s.lastSceneKey=next.key;return next;
}
