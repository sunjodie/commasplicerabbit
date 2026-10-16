// Authored examples; no generated text or external services at runtime.
export const TOOLS={comma:{label:'Keep comma',mark:',',join:', '},stop:{label:'Full stop',mark:'.',join:'. '},semi:{label:'Semicolon',mark:';',join:'; '},and:{label:'Add and',mark:', and',join:', and '},but:{label:'Add but',mark:', but',join:', but '},so:{label:'Add so',mark:', so',join:', so '},because:{label:'Add because',mark:'because',join:' because '}};
export const CHAPTERS=[
 {name:'The stream',skill:'boundaries',icon:'🌱',reward:'A cosy burrow',blurb:'Spot two complete sentences.',lesson:'Read each side as its own sentence. If both can stand alone, a comma by itself cannot join them.',demo:['The rain had stopped','the path was still slippery.'],fix:'but',explain:'Both parts stand alone. A full stop separates them; comma + but joins them and shows contrast.'},
 {name:'Fern hollow',skill:'dependent',icon:'🌿',reward:'A fern garden',blurb:'Some openings need an ending.',lesson:'Although, because, when and if can make an opening depend on what follows. “Although the rain had stopped…” leaves us waiting for what happened.',demo:['Although the rain had stopped','the path was still slippery.'],fix:'comma',explain:'The although opening needs the main clause. This comma already works.'},
 {name:'The old mill',skill:'long',icon:'🪵',reward:'A woodland workshop',blurb:'Read the structure, not the length.',lesson:'A long sentence can be correct, and a short one can contain a splice. Check whether each side stands alone. Breath length is not a punctuation rule. A semicolon can also link two closely related complete clauses.',demo:['The rabbit carrying a bundle of reeds reached the stream','the bridge was gone.'],fix:'stop',explain:'Both parts stand alone, even though one is much longer. A full stop works here.'},
 {name:'Lantern trail',skill:'connectors',icon:'🏮',reward:'Lanterns for the trail',blurb:'However is not the same as but.',lesson:'However and therefore do not join sentences in the same way as and, but or so. Use a full stop or semicolon before however/therefore when both sides stand alone.',demo:['The bridge looked sturdy','however, one plank was loose.'],fix:'semi',explain:'“However” signals contrast, but does not make a comma enough. A semicolon joins these related complete clauses.'},
 {name:'The canopy',skill:'mixed',icon:'🌳',reward:'A treetop lookout',blurb:'Find the faulty join among good commas.',lesson:'Look at each join separately. One sentence can contain a useful comma and a comma splice. Leave the useful commas alone.',demo:['Although the wind had dropped','the branches were still moving','a squirrel was jumping between them.'],fix:null,explain:'Keep the comma after the although opening. The comma before “a squirrel” joins two complete clauses and needs repair.'},
 {name:'Homeward',skill:'paragraph',icon:'🏡',reward:'The village gathering place',blurb:'Edit the whole passage without a marked gap.',lesson:'Read the whole passage first. Choose a comma to inspect or repair. Some passages are already correct. When you think every join works, test the route.',demo:null,explain:'The goal is to notice errors yourself, while protecting commas that already work.'}
];
let serial=0;
function q(stage,parts,valid,why,options,skill){
 // A stable tray prevents the available pieces from revealing the answer.
 const available=stage<2?['comma','stop','and']:stage===2?['comma','stop','semi','and']:stage===3?['comma','stop','semi']:['comma','stop','semi','and','because'];
 valid=valid.map((variants,i)=>{
  const v=new Set(variants);
  const alreadyJoined=/^(but|so) /i.test(parts[i+1]);
  if(v.has('comma')&&alreadyJoined)v.add('stop'); // sentence-initial But/So is valid
  if(v.has('stop')&&!alreadyJoined){v.add('and');v.add('semi');}
  return [...v].filter(t=>available.includes(t));
 });
 return {id:`q${++serial}`,stage,skill:skill||CHAPTERS[stage].skill,parts,valid,why,options:available,kind:stage===5?'paragraph':'sentence'};
}
const short=['comma','stop','and','but','so'];
const complex=['comma','stop','semi','and','but','so','because'];
export const BANK=[
 q(0,['The gate was locked','we tried the side entrance.'],[['stop','so','and']],['Both sides stand alone. “So” shows the result; a full stop also works.']),
 q(0,['The lantern flickered','it went out.'],[['stop','and']],['Both sides stand alone. A comma alone cannot join them.']),
 q(0,['The rabbit was tired','she kept walking.'],[['stop','but','and']],['Both sides stand alone. “But” makes the contrast clear.']),
 q(0,['We packed our bags','the bus arrived.'],[['stop','and']],['Both sides stand alone. Use a full stop or comma + and.']),
 q(0,['The stream was deep','we looked for a bridge.'],[['stop','so','and']],['Both sides stand alone. “So” shows why we looked for a bridge.']),
 q(1,['Although the gate was locked','we found another entrance.'],[['comma']],['“Although the gate was locked” needs the rest. Keep this comma.']),
 q(1,['When the lantern went out','we used a torch.'],[['comma']],['“When the lantern went out” sets up when something happened; the next part completes it.']),
 q(1,['The rain had stopped','the ground was still wet.'],[['stop','but','and']],['These are two complete clauses. There is no dependent opening here.'],short,'boundaries'),
 q(1,['Because the path was flooded','we took the long way home.'],[['comma']],['“Because the path was flooded” supplies a reason, but needs a main clause.']),
 q(1,['If we leave now','we can reach the mill before sunset.'],[['comma']],['“If we leave now” gives a condition; the main clause says what can happen.']),
 q(2,['The narrow path behind the old mill was covered in mud','we followed it anyway.'],[['stop','but','and']],['The first part has a subject and a complete verb phrase. The second does too.']),
 q(2,['After the last visitor had left the garden','the rabbit put away the chairs.'],[['comma']],['The after opening depends on what follows. Its length does not change that.'],short,'dependent'),
 q(2,['A little rabbit with a torn blue scarf waited by the gate','her friend had not arrived.'],[['stop','semi','and','because']],['Both clauses stand alone. A comma + and works too. “Because” makes the reason explicit.'],complex),
 q(2,['The wooden box under the kitchen table was empty','someone had taken the seeds.'],[['stop','semi','and','because']],['“The wooden box … was empty” is complete. So is “someone had taken the seeds”.'],complex),
 q(2,['Although the rain continued throughout the afternoon','the volunteers finished repairing the roof.'],[['comma']],['Although makes this first part dependent. Do not turn it into a fragment.'],short,'dependent'),
 q(3,['The bridge looked safe','however, one plank was loose.'],[['stop','semi']],['However does not repair a comma splice. Put a full stop or semicolon before it.'],['comma','stop','semi']),
 q(3,['The path was flooded','therefore, we turned back.'],[['stop','semi']],['Therefore signals a result, but the clauses still need a full stop or semicolon.'],['comma','stop','semi']),
 q(3,['The rope was thin','but it held our weight.'],[['comma']],['But is already present. Comma + but correctly joins these clauses.'],['comma','stop','semi'],'boundaries'),
 q(3,['The rabbit had checked the map','however, she still missed the turning.'],[['stop','semi']],['The map clause and the however clause can each stand alone.'],['comma','stop','semi']),
 q(3,['The gate was locked','so we tried the side entrance.'],[['comma']],['So is already joining the complete clauses. This comma works.'],['comma','stop','semi'],'boundaries'),
 q(4,['Although Maya had checked the address before leaving','she walked straight past the entrance','the small sign was hidden behind a van.'],[['comma'],['stop','semi','because']],['Keep the comma after the dependent although opening.','The sign clause stands alone. “Because” makes the reason clear.'],complex),
 q(4,['When we reached the clearing','the fire had gone out','we gathered some dry wood.'],[['comma'],['stop','semi','so','and']],['The when opening needs its main clause.','The fire clause and the we clause are complete. A comma alone cannot join them.'],complex),
 q(4,['The rabbit','who had never visited the mill before','stopped to look at the waterwheel.'],[['comma'],['comma']],['These two commas enclose extra information about the rabbit.','Keep the closing comma. “Stopped…” completes the rabbit’s main clause.'],['comma','stop','semi']),
 q(4,['Because the branches were still wet','we left them in the sun','by evening, they were dry.'],[['comma'],['stop','semi','and']],['Keep the comma after the because opening.','The drying action and the by evening clause each stand alone.'],complex),
 q(4,['Although the climb was steep','we reached the lookout','but the valley below was hidden by mist.'],[['comma'],['comma']],['Although introduces a dependent opening.','But already joins the main clauses, so the comma works.'],['comma','stop','semi']),
 q(5,['By the time we reached the village','the sun was setting. The workshop was dark','someone had forgotten to light the lanterns. We fetched a match.'],[['comma'],['stop','semi','because']],['The time opening needs the main clause.','“The workshop was dark” and “someone had forgotten…” are complete clauses.'],complex),
 q(5,['The rabbit unpacked the supplies','her friends carried them to the workshop. Although everyone was tired','they stayed to help.'],[['stop','semi','and'],['comma']],['The unpacking and carrying clauses each stand alone.','The although opening belongs with “they stayed to help”.'],complex),
 q(5,['When the rain finally stopped','we opened the windows. The garden was muddy','but the seedlings were safe.'],[['comma'],['comma']],['Keep the comma after the when opening.','But already joins the complete clauses. This passage needs no repairs.'],complex),
 q(5,['The lanterns were ready','however, the square was still empty. Because the weather had improved','we set the tables outside','our neighbours began to arrive.'],[['stop','semi'],['comma'],['stop','semi','and']],['However needs a full stop or semicolon before it here.','Keep the comma after the because opening.','The tables clause and the neighbours clause each stand alone.'],['comma','stop','semi','and']),
 q(5,['Although Maya had checked the address before leaving','she walked straight past the entrance','the small sign beside the gate was hidden behind a delivery van. Her friend called her back.'],[['comma'],['stop','semi','because']],['Keep the comma after the although opening.','The second comma joins two complete clauses. Separate them, or use because to explain why she missed the entrance.'],complex),
 // Fresh transfer bank: interleaved review, bonus routes and later visits.
 q(0,['The kettle clicked off','I poured the tea.'],[['stop','and']],['Both sides stand alone. Use a full stop or comma + and.'],short),
 q(0,['The room was warm','we opened a window.'],[['stop','so','and']],['Both sides stand alone; so shows the result.'],short),
 q(0,['The shop was closed','we would have to return tomorrow.'],[['stop','so','and']],['The two complete clauses need more than a comma.'],short),
 q(1,['Before the guests arrived','we swept the floor.'],[['comma']],['The before opening needs its main clause.'],short),
 q(1,['While the soup was simmering','we laid the table.'],[['comma']],['While sets up the timing; “we laid the table” supplies the main clause.'],short),
 q(1,['Although the journey took longer than expected','we arrived before dark.'],[['comma']],['The although opening cannot stand as a complete sentence here.'],short),
 q(2,['The last train of the evening had already left','we called a taxi.'],[['stop','semi','so','and']],['Each side has its own complete clause.'],complex),
 q(2,['The small cafe at the end of the street was full','we waited outside.'],[['stop','semi','so','and']],['Long descriptions do not remove the need for a proper join.'],complex),
 q(2,['Our neighbour with the bright green bicycle waved from the gate','she had brought our parcel.'],[['stop','semi','and']],['Both sides are complete; a comma alone is not enough.'],complex),
 q(3,['The tickets were expensive','however, the concert was worth it.'],[['stop','semi']],['However is a transition, not a coordinating conjunction.'],['comma','stop','semi']),
 q(3,['The library was closing','therefore, we borrowed the books quickly.'],[['stop','semi']],['Use a full stop or semicolon before therefore here.'],['comma','stop','semi']),
 q(3,['The weather was cold','but the hall was warm.'],[['comma']],['But already joins the clauses; this comma is correct.'],['comma','stop','semi']),
 q(4,['After we had put away the tools','we sat beside the stream','the water was perfectly still.'],[['comma'],['stop','semi','and']],['After makes the opening dependent.','The sitting clause and the water clause can stand alone.'],complex),
 q(4,['Although the cafe was busy','the queue moved quickly','so we stayed.'],[['comma'],['comma']],['Keep the comma after the although opening.','So already joins the clauses.'],['comma','stop','semi']),
 q(4,['The caretaker','who had stayed late to help us','locked the gate.'],[['comma'],['comma']],['The commas enclose extra information.','The main clause is “The caretaker locked the gate”.'],['comma','stop','semi']),
 q(5,['When the guests arrived','we brought out the food. The soup was hot','we left it to cool.'],[['comma'],['stop','semi','so']],['The when opening needs its main clause.','The soup clause and the we clause are complete.'],complex),
 q(5,['The bus was late','however, we reached the theatre in time. Although the foyer was crowded','we found our seats quickly.'],[['stop','semi'],['comma']],['Use a full stop or semicolon before however here.','The although opening belongs with the main clause.'],['comma','stop','semi']),
 q(5,['Because the forecast was good','we packed a picnic. The walk was long','but everyone enjoyed it.'],[['comma'],['comma']],['Keep the comma after the because opening.','But correctly joins the clauses; no repair is needed.'],complex)
];
export const STORY=BANK.slice(0,30);
export const TRANSFER=BANK.slice(30);
