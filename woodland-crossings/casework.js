// Short supporting challenges. These never award story deliveries or affect
// comma-splice mastery. All essential evidence is printed in the challenge.
export const CASEWORK=[
 {id:'wood-note',question:'m2',kind:'grammar',title:'A note by the mill',label:'Quick grammar edit',
  context:'Pale shavings lie beneath the window. The exposed edge is wet, but those against the wall are dry. Pip adds an observation to her notebook.',
  prompt:'There is one grammatical error in this note. Tap the incorrect word, then replace it with one word. Keep the meaning and tense.',
  text:'The smell of newly cut boards were stronger beside the mill wall.',
  answer:'was',word:6,
  hint:'Find the subject of the verb. Is it “smell” or “boards”? The phrase beginning with “of” describes the subject.',
  why:'The subject is “smell”, which is singular. “Of newly cut boards” describes the smell; it does not make the subject plural. The past-tense verb is “was”.',
  success:'Pip records the fresh wood smell. It is a detail to remember, not yet an explanation.'},
 {id:'dark-window',question:'m3',kind:'vocabulary',title:'When the light goes out',label:'Words in context',
  context:'“The light moved once more and vanished, leaving them with their own dim reflections in a puddle at their feet. Without it, the mill seemed to have drawn back into the trees.”',
  prompt:'In this context, what does “drawn back into the trees” suggest about how the mill now appears to Pip?',
  options:[
   {id:'concealed',text:'Its unlit window proves that someone inside is deliberately hiding from her.',feedback:'Someone may be hiding, but the description does not establish anyone’s intention.'},
   {id:'distant',text:'It seems more remote and less welcoming once the light has gone out.'},
   {id:'movement',text:'It appears to be moving away because the wind is shaking the trees.',feedback:'“Seemed” describes Pip’s impression. There is no suggestion that the building moves.'},
   {id:'relief',text:'It seems less threatening because she can no longer see the figure.',feedback:'Read the darkness alongside the rushing stream. The scene gives Pip less reassurance, not more.'}
  ],answer:'distant',
  hint:'Compare the lighted window with the darkness that replaces it. The phrase describes an impression of distance and withdrawal, not a change in the building’s position.',
  why:'“Drawn back” personifies the mill as withdrawing. Losing the small sign of human presence makes it seem remote and unwelcoming; the words do not prove why the light went out.',
  success:'Pip keeps watching. Losing sight of the room has not made her feel safer.'},
 {id:'yellow-stitches',question:'m4',kind:'deduction',title:'The familiar stitches',label:'Detective work · Claim + evidence',
  context:'Green cloth is caught beneath the mill’s latch, with loose threads moving in the draught. Pip recognises crooked yellow stitches along its edge. She remembers sewing that uneven repair on Bram’s cuff while he sat at his kitchen table in the summer.',
  prompt:'Which conclusion is best supported at this point? Then choose the pair of details that justifies it.',
  routes:[{id:'latch',text:'Examine the latch',observation:'Mara holds her lantern close to the iron catch. The loose threads are snagged beneath it, beside a rough edge on the iron. Pip eases them free while Mara keeps the lantern steady.'},{id:'repair',text:'Recall the summer repair',observation:'Pip turns the cloth over. She remembers struggling to make the edges of Bram’s cuff meet, and hiding the worst stitch underneath. Bram had kept his arm on the kitchen table while she worked, turning his wrist whenever she asked.'}],
  options:[
   {id:'recent',text:'Bram must have left the mill after the fair ended.',feedback:'The cloth has no reliable time marker. It cannot establish when he passed the latch.'},
   {id:'attack',text:'Someone must have dragged Bram through the doorway against his will.',feedback:'A snagged cuff could have several explanations. There is no evidence of force by another person.'},
   {id:'coat',text:'The cloth came from Bram’s coat, but it does not establish what happened to him.'},
   {id:'inside',text:'Bram must still be inside because part of his coat is caught on the door.',feedback:'A piece of cloth can remain after its wearer has gone. Its position does not locate Bram.'}
  ],answer:'coat',
  evidence:[{id:'green-mud',text:'The cloth is green, and there are muddy tracks inside.',feedback:'Neither detail identifies a particular coat. Mud does not explain Pip’s recognition.'},{id:'stitches-memory',text:'The stitches are crooked and yellow, and Pip remembers making that repair on Bram’s cuff.'},{id:'latch-bell',text:'The cloth is caught on the latch, and Bram once told them the bell legend.',feedback:'The legend does not identify the cloth. Its position explains the snag, not the owner.'}],evidenceAnswer:'stitches-memory',
  hint:'Separate identity from events. Which details link this particular cloth to a known coat? Which details could actually establish a time, an attack or Bram’s current location?',
  why:'The distinctive stitching matches Pip’s first-hand memory of repairing Bram’s cuff. Together they identify the coat. They do not establish when the cloth caught, why it tore or where Bram is now.',
  success:'Mara enters “Bram’s coat” in the notebook. Beside it she leaves a space for what they still do not know.'}
];
export function caseworkFor(s,q){if(!q||q.remedial||s.reviewRun||s.bonus)return null;return CASEWORK.find(t=>t.question===q.id&&!caseworkState(s,t.id).completed)||null;}
export function caseworkState(s,id){const raw=s.casework?.[id]||{};return {choice:typeof raw.choice==='string'?raw.choice:'',evidence:typeof raw.evidence==='string'?raw.evidence:'',correction:typeof raw.correction==='string'?raw.correction:'',route:typeof raw.route==='string'?raw.route:'',attempts:Number.isInteger(raw.attempts)&&raw.attempts>=0?raw.attempts:0,hinted:raw.hinted===true,completed:raw.completed===true};}
export function updateCasework(s,id,patch){if(!CASEWORK.some(t=>t.id===id))return;s.casework={...s.casework,[id]:{...caseworkState(s,id),...patch}};}
export function assessCasework(t,work){
 if(t.kind==='grammar')return work.choice===String(t.word)&&work.correction.trim().toLowerCase()===t.answer;
 return work.choice===t.answer&&(t.kind!=='deduction'||work.evidence===t.evidenceAnswer);
}
export function submitCasework(s,t){const work=caseworkState(s,t.id),correct=assessCasework(t,work);updateCasework(s,t.id,{attempts:work.attempts+1,completed:correct});return correct;}
