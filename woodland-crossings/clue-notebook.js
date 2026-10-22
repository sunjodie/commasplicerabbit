// Optional detective reasoning. This state never awards supplies or grades grammar.
const clue=(id,scene,anchor,title,text)=>({id,scene,anchor,title,text});
export const NOTEBOOK_CLUES=[
 clue('light','m1','in the mill’s upper window','An upstairs light','A light appeared in the mill’s upper window.'),
 clue('figure','m2','the figure bent down','A moving figure','A broad figure crossed the lit window. Poppy could not be sure who it was.'),
 clue('scraping','m2','Something scraped across the floor','A scraping sound','Something scraped across the upstairs floor at quarter to twelve.'),
 clue('legend','m3','someone would be missing before morning','Bram’s bell story','Bram had told a story about the bell ringing after midnight.'),
 clue('shavings','m4','the wood tucked against the wall was still dry','Fresh shavings','Pale wood shavings lay beneath the side window, with some still dry against the wall.'),
 clue('cloth','m4','A strip of green cloth was caught beneath the latch','Cloth on the latch','A strip of green cloth was caught beneath the mill’s latch.'),
 clue('stitches','m4','the cuff of his green coat in the summer','The familiar repair','Poppy recognised the uneven yellow stitches from her repair to Bram’s coat cuff.'),
 clue('empty-hook','m5','the mill bell was empty','An empty hook','The hook that usually held the mill bell was empty.'),
 clue('bell-chip','m6','a small chip in its lip','A chipped bell','Poppy remembered a small chip in the bell’s lip.'),
 clue('mud','m6','one heel had slipped','Muddy prints','Deep prints crossed the mill floor. A heel had left a smear at the stairs.'),
 clue('map','m8','back along the opposite hillside','The altered map','The low footbridge was crossed out, and a route via Alder Arch had been drawn in.'),
 clue('note','m8','Bram’s pen lay across the page','The unfinished note','The note began “Please don’t use the” and stopped. The pen lay in a blot of ink.'),
 clue('circular-gap','m9','A little gap interrupted the edge of the circular mark','A gap in a circular mark','The circular mark was about the bell’s width, with a small gap in its edge.'),
 clue('deep-prints','m9','A pair of deeper bootprints stood beside it','Prints beside the mark','Two deeper bootprints stood beside the sheltered circular mark.'),
 clue('broken-bridge','m12','two planks were missing','The damaged bridge','Planks were missing from the low bridge, and a broken rail struck its underside.'),
 clue('baker-time','m17','Down towards the footbridge','The baker’s account','The baker heard the bell near the footbridge just after midnight.'),
 clue('ferryman-time','m17','and then I heard it','The ferryman’s account','After quarter past twelve, the ferryman finished the crates, tied his punt and heard the bell above the bend.'),
 clue('bowls','m20','with chairs drawn up ready at the table','A prepared table','Three clean bowls stood beside a covered pot, with chairs ready at the table.'),
 clue('supper','m20','kept some supper for them','Expected visitors','The baker remembered Bram saying he had kept supper for the mender and her apprentice.'),
 clue('no-answer','m20','Nobody had answered the door','No answer at the cottage','The neighbour received no answer at Bram’s cottage.'),
 clue('signal','m22','then did it once more','Poppy’s pattern','Poppy raised her lamp twice, paused, then raised it once more.'),
 clue('copied-signal','m22','paused, and moved again','The answering pattern','The distant light moved twice, paused and moved again.'),
 clue('unknown-voice','m22','She could not recognise the speaker','An unidentified voice','Poppy heard a voice at the shelter but could not recognise it.'),
 clue('denial','m25','since yesterday morning','Bram’s first account','Bram said he had not been to the crossing since yesterday morning.'),
 clue('witness','m25','You were on the far approach','The mender’s account','The mender said Bram had spoken to her at the far approach that afternoon.'),
 clue('bell-rest','m26','while I tightened the strap','Where Bram rested the bell','Bram said he had rested the bell by the porch and under the reeds while tightening its strap.'),
 clue('rescue','m27','Those parts of his account agreed with theirs','Help during the rescue','The travellers’ accounts agreed that Bram helped them uphill after the bridge failed.'),
 clue('marked-timber','m28','This was a support, not loose scrap','A marked bridge support','The timber at the mill bore the ferryman’s blue repair mark and two square bolt holes.'),
 clue('no-repair','m28','No replacements were authorised','No authorised replacement','The ferryman said no replacement of those supports had been authorised.'),
 clue('cut-brace','m29','There were no torn fibres','The cut at the bridge','The bridge had empty bolt holes and a remaining brace with a flat, saw-marked end rather than torn fibres.'),
 clue('admission','m29','removed braces from the old crossing too','Bram’s admission','Bram admitted removing and selling timber, including bridge braces.'),
 clue('chest-account','m29','dragging the chest in front of them','The upstairs scraping explained','Bram said he had dragged the chest in front of the timber at quarter to twelve.'),
 clue('warning-account','m29','Their next call made him leave it unfinished','The warning explained','Bram said he crossed out the bridge and began a warning before the travellers’ next call made him leave.')
];
const idea=(id,text)=>({id,text});
const thread=(id,title,observations,theories,answer,pair,why,question,later=null)=>({id,title,observations,theories,answer,pair,why,question,later});
export const NOTEBOOK_THREADS=[
 thread('upstairs','The upstairs light',['light','figure','scraping','legend'],[
  idea('using-room','Someone was in the upper room that night.'),idea('certain-bram','The light proves the figure was Bram.'),idea('ghost','The light proves Bram has been working there every night.')],
 'using-room',['light','figure'],'A light and a moving figure support someone being there. They do not establish who it was or what they were doing.','Which observation establishes presence, and which would be needed to establish identity?',{clue:'chest-account',text:'Bram later explains that he was moving the chest. That later account answers a question the light alone could not.'}),
 thread('cloth','The cloth on the latch',['cloth','stitches','shavings','mud'],[
  idea('taken','Someone pulled Bram out of the mill.'),idea('coat','The cloth probably came from Bram’s coat.'),idea('message','Bram deliberately left the cloth as a message.')],
 'coat',['cloth','stitches'],'The cloth on the latch and the remembered repair link it to Bram’s coat. They do not explain how it became caught.','Which detail connects this particular cloth to this particular coat?'),
 thread('warning','The unfinished note',['map','note','empty-hook','mud'],[
  idea('bell','The note definitely warned someone not to ring the bell.'),idea('bridge','The note may have warned against using the low footbridge.'),idea('writer','The map proves who wrote the note.')],
 'bridge',['map','note'],'The crossed-out bridge gives a possible object for “Please don’t use the”. The unfinished words keep this an interpretation rather than a complete message.','Which two details connect the incomplete words to one possible route?',{clue:'warning-account',text:'Bram later describes altering the map and beginning the warning. His account supplies information that was missing earlier.'}),
 thread('bell-marks','The circular marks',['bell-chip','circular-gap','deep-prints','empty-hook'],[
  idea('carrier','The marks identify Bram as the person who carried the bell.'),idea('same-time','The marks prove that all the prints were made at the same time.'),idea('rested','The bell may have been set down beside the stream.')],
 'rested',['bell-chip','circular-gap'],'The chip and the gap could correspond, so the bell is a possible source of the mark. Bootprints alone do not identify a carrier.','Which two details could link the shape of this object to the shape of its mark?',{clue:'bell-rest',text:'Bram later describes resting the bell in those places. His account fits the earlier marks.'}),
 thread('two-accounts','The bell in two places',['baker-time','ferryman-time','map','broken-bridge'],[
  idea('time','The accounts allow time for the bell to have been moved.'),idea('two-bells','The accounts prove there were two bells.'),idea('lying','The difference proves one witness was lying.')],
 'time',['baker-time','ferryman-time'],'The witnesses describe different times as well as different places. Their accounts need not place the bell in two places at once.','Are the witnesses describing the same moment?'),
 thread('supper','The prepared supper',['bowls','supper','no-answer','map'],[
  idea('shelter','The bowls prove all three were together at the shelter.'),idea('guests','Bram expected the mender and her apprentice for supper.'),idea('finished','The clean bowls prove the guests had already eaten.')],
 'guests',['bowls','supper'],'The prepared table and the baker’s recollection support expected guests. Neither locates those guests now.','Which details establish an expectation, and which would be needed to establish a present location?'),
 thread('answering-light','The answering light',['signal','copied-signal','unknown-voice','ferryman-time'],[
  idea('bram','The light proves Bram was holding the distant lamp.'),idea('walking','The light proves everyone at the shelter could walk.'),idea('answer','Someone could see Poppy’s light and deliberately answer it.')],
 'answer',['signal','copied-signal'],'Copying a distinctive pattern supports a deliberate reply. It does not identify the person holding the other lamp.','What makes this sequence an answer rather than another movement in the distance?'),
 thread('contradiction','Two accounts of the crossing',['denial','witness','rescue','unknown-voice'],[
  idea('conflict','Bram’s first account and the mender’s account cannot both be accurate.'),idea('harm','The disagreement proves Bram intended to injure the mender.'),idea('rescue','Helping with the rescue proves Bram’s first account was true.')],
 'conflict',['denial','witness'],'One account excludes an afternoon visit; the other describes one. That conflict needs checking. It does not by itself establish a motive.','Which two statements cannot both describe what happened?'),
 thread('timber','The timber and the bridge',['marked-timber','cut-brace','no-repair','shavings'],[
  idea('weather','The storm alone tore this support from the bridge.'),idea('removed','A support from the bridge had been deliberately removed.'),idea('intent','The physical evidence alone proves someone intended to hurt a traveller.')],
 'removed',['marked-timber','cut-brace'],'The repair mark connects the mill timber to the bridge. The bolt holes and saw-marked end show deliberate removal rather than a support simply tearing away.','Which detail identifies the timber’s source, and which shows how the support was removed?',{clue:'admission',text:'Bram later admits the removal and sales. The physical evidence supplied an independent reason to question him.'})
];
const linkGoals={"upstairs": "Connect the unusual light to a visible sign of someone in its window.", "cloth": "Connect the cloth on the latch to a detail Poppy recognised from a particular coat.", "warning": "Connect the unfinished words to a specific alteration on the map.", "bell-marks": "Connect a feature of the bell to a corresponding feature in the circular mark.", "two-accounts": "Compare where and when the two witnesses heard the bell.", "supper": "Connect the table setting to something a witness remembers Bram saying.", "answering-light": "Compare Poppy’s chosen sequence with the movement she saw in reply.", "contradiction": "Compare the two accounts of Bram’s last visit to the crossing.", "timber": "Link a physical feature of the timber at the mill to a physical feature remaining at the bridge."};
for(const t of NOTEBOOK_THREADS)t.linkGoal=linkGoals[t.id];
const chapterKeys=['chapterOne','chapterTwo','chapterThree','chapterFour','chapterFive','chapterSix'];
const normalise=t=>String(t||'').toLowerCase().replace(/[’‘]/g,"'").replace(/\s+/g,' ').trim();
export function notebookState(s){
 const raw=s.clueNotebook?.version===1?s.clueNotebook:{};
 return {version:1,seen:Array.isArray(raw.seen)?raw.seen.filter(id=>NOTEBOOK_CLUES.some(c=>c.id===id)):[],tails:raw.tails&&typeof raw.tails==='object'?raw.tails:{},links:raw.links&&typeof raw.links==='object'?raw.links:{}};
}
export function availableNotebookClues(s){
 const seen=new Set(notebookState(s).seen),progress=Number.isInteger(s.story)?s.story:0;
 return NOTEBOOK_CLUES.filter(c=>{
  const n=Number(c.scene.slice(1)),key=chapterKeys[Math.floor((n-1)/5)];
  return seen.has(c.id)||n<=progress||s[key]?.read?.includes(c.scene);
 });
}
export function observeNotebookText(s,scene,text){
 if(!NOTEBOOK_CLUES.some(c=>c.scene===scene))return false;
 const book=notebookState(s),chunk=normalise(text),joined=(book.tails[scene]||'')+' '+chunk;
 const added=NOTEBOOK_CLUES.filter(c=>c.scene===scene&&!book.seen.includes(c.id)&&joined.includes(normalise(c.anchor))).map(c=>c.id);
 // A short tail lets an anchor straddle consecutive displayed reading parts.
 book.tails={...book.tails,[scene]:joined.slice(-180)};book.seen=[...new Set([...book.seen,...added])];s.clueNotebook=book;
 return added.length>0;
}
export function availableNotebookThreads(s){const seen=new Set(availableNotebookClues(s).map(c=>c.id));return NOTEBOOK_THREADS.filter(t=>t.pair.every(id=>seen.has(id)));}
export function notebookLink(s,id){
 const raw=notebookState(s).links[id]||{};
 return {theory:typeof raw.theory==='string'?raw.theory:'',clues:Array.isArray(raw.clues)?[...new Set(raw.clues.filter(x=>typeof x==='string'))].slice(0,2):[],note:typeof raw.note==='string'?raw.note.slice(0,400):'',checked:raw.checked===true};
}
export function updateNotebookLink(s,id,patch){
 const t=availableNotebookThreads(s).find(t=>t.id===id);if(!t)return false;
 const book=notebookState(s),old=notebookLink(s,id),seen=new Set(availableNotebookClues(s).map(c=>c.id)),next={...old};
 if(Object.hasOwn(patch,'theory')){if(!t.theories.some(x=>x.id===patch.theory))return false;next.theory=patch.theory;next.checked=false;}
 if(Object.hasOwn(patch,'clues')){if(!Array.isArray(patch.clues)||patch.clues.length>2||patch.clues.some(x=>!t.observations.includes(x)||!seen.has(x)))return false;next.clues=[...new Set(patch.clues)];next.checked=false;}
 if(Object.hasOwn(patch,'note'))next.note=String(patch.note).slice(0,400);
 s.clueNotebook={...book,links:{...book.links,[id]:next}};return true;
}
export function assessNotebookLink(s,id){
 const t=availableNotebookThreads(s).find(x=>x.id===id);if(!t)return {status:'unavailable',message:'Read further to collect observations for this page.'};
 const link=notebookLink(s,id),seen=new Set(availableNotebookClues(s).map(c=>c.id));
 if(!link.theory||link.clues.length!==2||link.clues.some(x=>!seen.has(x)||!t.observations.includes(x)))return {status:'incomplete',message:'Choose a working idea and link two observations before checking.'};
 if(link.theory!==t.answer)return {status:'revise',message:'This idea goes further than the observations establish. Could you make a smaller claim?',question:t.question};
 if(!t.pair.every(id=>link.clues.includes(id)))return {status:'revise',message:'These details are related to the mystery. Look for the pair that makes this page’s specific connection.',question:t.question};
 return {status:'supported',message:t.why,question:'How do these observations support your idea?'};
}
export function checkNotebookLink(s,id){const result=assessNotebookLink(s,id);if(['supported','revise'].includes(result.status)){const book=notebookState(s);s.clueNotebook={...book,links:{...book.links,[id]:{...notebookLink(s,id),checked:true}}};}return result;}
export function notebookFollowUp(s,id){const t=availableNotebookThreads(s).find(x=>x.id===id);return t?.later&&availableNotebookClues(s).some(c=>c.id===t.later.clue)?t.later.text:'';}
