export const EDITING_RULES='Use the pieces provided. Keep correct commas and every original word. Add joining words only where the writing goal requires them; change nothing else.';
// Authored mystery text only. Each brief has an explicit target; approved contrast synonyms are accepted. Other grammatical
// repairs receive neutral brief feedback rather than a grammar-error penalty.
export const TOOLS={comma:{label:'Keep comma',mark:',',join:', '},stop:{label:'Full stop',mark:'.',join:'. '},semi:{label:'Semicolon',mark:';',join:'; '},for:{label:'Add for',mark:', for',join:', for '},and:{label:'Add and',mark:', and',join:', and '},nor:{label:'Add nor',mark:', nor',join:', nor '},but:{label:'Add but',mark:', but',join:', but '},or:{label:'Add or',mark:', or',join:', or '},yet:{label:'Add yet',mark:', yet',join:', yet '},so:{label:'Add so',mark:', so',join:', so '},because:{label:'Add because',mark:'because',join:' because '}};
export const CHAPTERS=[
{name:'After the fair',skill:'boundaries',reward:'A cosy burrow',blurb:'Separate scenes; connect observations.',lesson:'Start with the two sides of a comma. Can each side stand as a sentence, with its own subject and verb? If so, the comma needs some help: a full stop can separate the sentences, a joining word such as “but” can connect them, or a semicolon can link them. Some commas already belong, including those after dependent openings and in lists. Read quietly to yourself, then check how the clauses fit together.',demo:['The mill was dark','a lantern appeared upstairs.'],fix:'stop',explain:'Both clauses stand alone. A full stop works; a semicolon also works when the brief asks for one sentence.'},
{name:'What Had Left the Mill',skill:'dependent',reward:'A fern garden',blurb:'Make the relationship precise.',lesson:'In this chapter, join two sentences into one. Keep every word, changing an initial capital to lower case where necessary. Put a comma before a coordinating conjunction. FANBOYS are “for”, “and”, “nor”, “but”, “or”, “yet” and “so”. A comma plus one of these can join two complete clauses. “And” adds information; “but” and “yet” express contrast; “so” gives a result; “or” offers an alternative. Choose the joining word that expresses the relationship in the writing goal. Preserve useful commas after dependent openings.',demo:['Poppy found a circular mark','Willow found another beneath the reeds.'],fix:'and',explain:'Comma + “and” adds a second discovery. Both sides have their own subject and verb.'},
{name:'The Wrong Path',skill:'long',reward:'A woodland workshop',blurb:'Separate assumptions from evidence.',lesson:'“For” gives a reason, “yet” marks contrast, and “nor” adds a second negative. After “nor”, word order often changes: “Poppy had not seen it, nor had Willow heard it.” Long subjects, embedded clauses and extra information do not change the rule for joining complete clauses.',demo:['Poppy had not seen the bell','had Willow heard it.'],fix:'nor',explain:'Comma + “nor” adds the second negative. Notice “had Willow”, rather than “Willow had”.'},
{name:'A Bell in Two Places',skill:'connectors',reward:'Lanterns for the trail',blurb:'Compare accounts and changes of viewpoint.',lesson:'“However”, “therefore” and “nevertheless” are transitions, not FANBOYS. Between two complete clauses, use a full stop or a semicolon before the transition and retain its following comma. Choose a full stop when the next idea reads more clearly as a separate sentence. A change of time, place or viewpoint can call for a new sentence. Check the instruction for whether to preserve a close link or begin a fresh sentence.',demo:['The ink was fresh','however, the paper was old.'],fix:'stop',explain:'A full stop separates the complete clauses. Capitalise “However” and retain its following comma.'},
{name:'An Answer in the Dark',skill:'mixed',reward:'A treetop lookout',blurb:'Read signals and edit rescue notes.',lesson:'Read a whole note before editing. Keep list commas, dependent openings and paired commas around extra information. Use the writing goal to decide which complete clauses belong together and where a new sentence should begin.',demo:null,explain:'Check the structure at each comma and the relationship between the ideas.'},
{name:'Before Morning',skill:'paragraph',reward:'The village gathering place',blurb:'Edit the final case report.',lesson:'Now edit connected paragraphs. Preserve correct punctuation and paragraph breaks. Read the result silently as a whole: are the cause, contrast and sequence clear? A natural rhythm helps you notice a join, but complete clauses and the editing brief decide how to repair it.',demo:null,explain:'A successful report is grammatical and follows its writing goal.'}
];
const punctuation=['comma','stop','semi','but'];
const all=Object.keys(TOOLS).filter(t=>!['because','yet'].includes(t));
const independent=['stop','semi','for','and','but','or','yet','so','because'];
const tasks=[];
function task(stage,structure,brief,answer,why,parts,echo,grammar){
 const valid=answer.map(t=>[t]);
 const grammatical=grammar||answer.map(t=>t==='comma'?['comma']:independent);
 const options=stage===0?punctuation:stage===1?['comma','stop','semi','and','but','or','so']:stage===2?[...all.filter(t=>t!=='but'),'yet']:all;
 const base={stage,skill:CHAPTERS[stage].skill,structure,brief,valid,grammar:grammatical,why,options,kind:stage>=4?'paragraph':'sentence'};
 tasks.push([{...base,id:`m${tasks.length+1}`,parts},{...base,id:`r${tasks.length+1}`,parts:echo,remedial:true}]);
}
task(0,"scene-time-shift","Present the activity in the square and the discovery at the mill as two separate sentences. Keep every word. Edit the comma after “stalls”.",[
  "stop"
],[
  "Both sides are complete clauses. A full stop gives the two sentences required by the brief. A semicolon would be grammatical but would not meet that goal."
],[
  "The villagers were dismantling the last stalls",
  "beyond the gardens, a light appeared in the mill’s upper window."
],[
  "The fairground lanterns were still glowing",
  "down by the mill, the upstairs light went out."
]);
tasks.at(-1).forEach(t=>t.options=[
  "comma",
  "stop",
  "semi"
]);
task(0,"concession-opening","Keep one sentence. Change punctuation only where necessary.",[
  "comma"
],[
  "The although-clause is dependent. Its comma attaches it to the complete main clause. Neither a full stop nor a semicolon can make the opening stand alone."
],[
  "Although the mill’s waterwheel had been idle for a week",
  "a light still burned in the upper room."
],[
  "Although the bakery was still warm and bright",
  "the lane beside the mill was dark."
]);
tasks.at(-1).forEach(t=>t.options=[
  "comma",
  "stop",
  "semi"
]);
task(0,"paired-observations","Keep one sentence. Add a coordinating conjunction that explicitly contrasts Willow’s dismissal with Poppy’s continuing unease.",[
  "but"
],[
  "Comma + “but” expresses contrast. And only adds information; so would incorrectly express a result. A semicolon is grammatical but does not supply the requested conjunction."
],[
  "Willow dismissed the legend as a fireside invention",
  "Poppy found little reassurance in the darkened window."
],[
  "Poppy insisted that she was not apprehensive",
  "she kept glancing over her shoulder."
]);
tasks.at(-1).forEach(t=>t.options=[
  "comma",
  "stop",
  "semi",
  "and",
  "but",
  "so"
]);
task(0,"noun-list","Preserve one sentence containing an ordinary list. Keep punctuation that already works. Inspect both list commas.",[
  "comma",
  "comma"
],[
  "These are three noun phrases in a list, not three independent clauses. Both commas are acceptable and may remain. The serial comma before “and” is optional in British English, but this task asks students to keep punctuation that already works.",
  "These are three noun phrases in a list, not three independent clauses. Both commas are acceptable and may remain. The serial comma before “and” is optional in British English, but this task asks students to keep punctuation that already works."
],[
  "Poppy noticed the frayed green cloth",
  "the crooked yellow stitches",
  "and the loose threads caught beneath the latch."
],[
  "Beside the bakery stood empty crates",
  "folded tables",
  "and a basket of paper lanterns."
]);
tasks.at(-1).forEach(t=>t.options=[
  "comma",
  "stop",
  "semi"
]);
task(0,"time-opening-paired-main","Keep this as one sentence without adding or removing words. Use only the repairs listed. Change punctuation only where necessary.",[
  "comma",
  "semi"
],[
  "The opening beginning “By the time” is dependent, so its comma stays.",
  "Keep the comma after the dependent opening. The second comma splices two complete clauses. Of the listed repairs, a semicolon alone joins them in one sentence while preserving every word. A colon or dash can also form a grammatical single sentence here, but neither is offered in this task."
],[
  "By the time Willow lit her lantern",
  "Poppy had called once into the mill",
  "nobody had answered."
],[
  "As Willow raised her lantern",
  "Poppy waited beside the doorway",
  "no footsteps came down the stairs."
]);
tasks.at(-1).forEach(t=>t.options=[
  "comma",
  "stop",
  "semi"
]);

task(1,"additive-independent","Join the sentences using a coordinating conjunction that presents the discoveries as additional findings.",["and"],["Both discoveries are complete clauses. A comma followed by “and” adds the second discovery."],["Poppy found a circular mark beside the porch", "Willow found a second one beneath the reeds."],["Poppy noticed a circular mark beneath the eaves", "Willow found another beneath the reeds."]);
task(1,"contrast-independent","Join the sentences using a coordinating conjunction that makes the contrast explicit.",["but"],["“But” and “yet” both express contrast. “Yet” places greater emphasis on the unexpected difference. Use a comma before either conjunction."],["The rain had softened the bootprints", "the sheltered circular marks were still clear."],["Rain fell across the path", "the circular mark beneath the eaves remained sheltered."]);
task(1,"cause-result","Join the sentences using a coordinating conjunction that makes the second action a result of the first discovery.",["so"],["“So” shows that the discovery prompts the action. Place a comma before it."],["The marks led towards the stream", "Willow raised the lamp to search for the next one."],["Poppy could not see where the bootprints led next", "she held the lamp closer to the ground."]);
task(1,"alternative-consequences","Join the sentences using a coordinating conjunction that presents the actions as alternatives.",["or"],["“Or” offers a choice between two courses of action. Place a comma before it."],["They could follow the marks to the reeds", "they could wait inside the mill for Bram."],["Poppy could bring the lamp closer to the mark", "Willow could examine it in the existing light."]);
task(1,"observation-tentative-result","Join the sentences using a coordinating conjunction that makes the tentative conclusion follow from the observed marks.",["so"],["The bootprints beside the circular mark prompt Poppy’s tentative conclusion. A comma followed by “so” expresses that inference; “thought” leaves it open to revision."],["Two deep bootprints lay beside the circular mark", "Poppy thought someone had paused there."],["A circular mark lay beside two deep bootprints", "Willow thought something heavy might have been set down there."]);
// Joining tasks start from two sentences, so the original full stop is visible.
for(const pair of tasks.slice(5,10))for(const q of pair){q.initialChoices=['stop'];q.joinTask=true;q.studentBrief=q.brief;q.options=['comma','stop','semi','and','but','yet','or','so'];}
for(const q of tasks[6])q.valid=[['but','yet']];
tasks[9][1].why=['The circular mark beside the bootprints prompts Willow’s tentative conclusion. A comma followed by “so” expresses that inference. “Thought” and “might” avoid claiming that the marks prove what happened.'];

task(2,'unexpected-yet','Keep one sentence. Use a coordinating conjunction to emphasise the gap between Poppy’s certainty and the limited evidence.', ['yet'],['Comma + “yet” marks the unexpected contrast: Poppy felt sure, although she could not identify who had left the prints. “So” would wrongly present her inability to identify the print-maker as a result of her certainty.'],['Poppy felt sure that Bram had carried the bell along the path','she could not identify who had left the prints.'],['Poppy felt sure that the marks would lead to Bram','she did not know who had left them.']);
task(2,'explanatory-for','Keep one sentence. Use a coordinating conjunction to make the second clause explain what caused the sound.', ['for'],['Comma + “for” introduces the explanation for the knocking. The broken rail caused the sound; the sound did not cause the rail to strike the bridge.'],['The sound came from the bridge','the broken rail kept striking its underside.'],['The knocking returned with each surge of water','the current lifted the loose rail against the bridge.']);
task(2,'negative-inversion','Join the sentences using “nor”. Rewrite the second clause with the correct word order and without the repeated “not”.', ['nor'],['Comma + “nor” adds the second negative. Rewrite “the bank could not be trusted” as “could the bank be trusted”: move “could” before the subject and remove “not”, because “nor” already supplies the negative.'],['The bridge could not be crossed','the bank could not be trusted.'],['Poppy could not cross the bridge','she could not trust the bank.'],[['nor','stop']]);
tasks.at(-1)[0].wordOrder={part:1,answer:'could the bank be trusted.'};
tasks.at(-1)[1].wordOrder={part:1,answer:'could she trust the bank.'};
tasks.at(-1).forEach(q=>{q.initialChoices=['stop'];q.joinTask=true;});
task(2,'embedded-that-clauses','Give each character’s view its own sentence. Keep every word.', ['stop'],['“Poppy believed” and “Willow feared” head complete main clauses. The clauses beginning with “that” are subordinate within those main clauses. A full stop gives each character’s view its own sentence.'],['Poppy believed that the prints would lead to Bram','Willow feared that the path was dangerous.'],['Poppy thought that the marks would lead to Bram','Willow believed that they should return to the village.']);
task(2,'relative-subject-main','Start a new sentence after the bank breaks away. Keep the paired commas around its description and preserve every word.', ['comma','comma','stop'],['Keep this comma: it opens the extra information “which was soft with rain”.','Keep this comma: it closes the extra information about the bank.','The first main clause is “The bank broke away where Poppy had stood”. The second is “a tuft of grass turned over once in the current”. A full stop gives the movement of the grass its own sentence.'],['The bank','which was soft with rain','broke away where Poppy had stood','a tuft of grass turned over once in the current.'],['The lamp','which had swung sideways','cast its light across the water','Willow pulled Poppy away from the crumbling bank.']);
tasks.at(-1)[1].why=['Keep this comma: it opens the extra information “which had swung sideways”.','Keep this comma: it closes the extra information about the lamp.','“The lamp cast its light across the water” and “Willow pulled Poppy away from the crumbling bank” are complete main clauses. A full stop gives Willow’s rescue action its own sentence.'];
tasks[10][1].why=['Comma + “yet” contrasts Poppy’s certainty with her uncertainty about who left the marks. “So” would wrongly make that uncertainty a result of her certainty.'];
tasks[11][1].why=['Comma + “for” introduces the cause of the repeated knocking: the current lifted the loose rail against the bridge.'];
tasks[12][1].why=['Comma + “nor” adds the second negative. Change “she could not trust the bank” to “could she trust the bank”: put “could” before “she” and remove the repeated “not”.'];
tasks[13][1].why=['“Poppy thought” and “Willow believed” head complete main clauses. Each contains a subordinate that-clause. A full stop separates the characters’ views without changing the subordinate that-clauses.'];
for(const pair of tasks.slice(10,15))for(const q of pair)q.options=['comma','stop','semi','for','and','nor','or','yet','so'];

task(3,"however-transition","Give each witness’s account its own sentence. Keep every word, including “however”.",["stop"],["Both accounts are complete clauses. A full stop gives each witness’s account its own sentence. Capitalise “However” and keep its following comma: it signals contrast but cannot join the clauses with a comma alone."],["The baker heard the bell near the footbridge", "however, the ferryman heard it above the bend."],["The baker placed the sound near the footbridge", "however, the ferryman placed it above the bend."]);
task(3,"therefore-transition","Keep the “Because” opening attached. Start a new sentence at “Therefore”. Preserve every word.",["comma", "stop"],["The opening beginning with “Because” is subordinate, so keep its comma.", "“Willow wanted to test that possibility” and “she traced a possible route on the map” are independent clauses. “Therefore” cannot join them with a comma alone. Start a new sentence before it and capitalise “Therefore”."],["Because the witnesses’ accounts allowed time for someone to carry the bell uphill", "Willow wanted to test that possibility", "therefore, she traced a possible route on the map."],["Because the neighbour had seen three clean bowls beside a covered pot", "Poppy thought a meal had been prepared", "therefore, she wondered who the guests might be."]);
tasks.at(-1)[1].why=["Keep the comma after the subordinate “Because” opening.", "“Poppy thought a meal had been prepared” and “she wondered who the guests might be” are independent clauses. A full stop before “therefore” repairs the splice and gives Poppy’s next thought its own sentence."];
task(3,"relative-description-contrast","Keep one sentence and the paired commas around the description. Add a coordinating conjunction to contrast the route’s height with the obstruction.",["comma", "comma", "but"],["Keep the comma opening the extra information about the ferryman.", "Keep the comma closing “who knew the higher crossing” before the main verb “said”.", "The main clauses are complete. A comma followed by “but” contrasts the route being above the water with the fallen limb blocking its approach."],["The ferryman", "who knew the higher crossing", "said the route was above the water", "a fallen beech limb blocked the approach."],["The cottage", "which stood beside the mill", "looked unoccupied", "the table was set for three."]);
tasks.at(-1)[1].brief="Keep one sentence and the paired commas around the description. Add a coordinating conjunction to contrast the cottage’s appearance with the prepared table.";
tasks.at(-1)[1].why=["Keep the comma opening the extra information about the cottage.", "Keep the comma closing “which stood beside the mill” before “looked”.", "A comma followed by “but” contrasts the cottage looking unoccupied with the table being set for three. Each main clause is complete."];
task(3,"condition-contrast","Keep one sentence. Use a coordinating conjunction to make the contrast between the lower path and the shelter explicit.",["but"],["Both clauses are independent. A comma followed by “but” makes the contrast explicit: the lower path is under water, while the shelter is above the flood line."],["The lower path was under water", "the old shelter stood above the flood line."],["The water covered the lower stepping stones", "Alder Arch stood well above the stream."]);
tasks.at(-1)[1].why=["A comma followed by “but” contrasts the flooded lower stones with the high crossing. Both clauses are independent."];
task(3,"record-scene-change","Start a fresh sentence when the viewpoint shifts from the unanswered door to the view through the kitchen window. Keep every word.",["stop"],["“Nobody had answered the door” and “through the kitchen window the neighbour had seen three clean bowls” are independent clauses, so a comma alone cannot join them. A full stop marks the requested shift in viewpoint. “Through the kitchen window” opens the second clause; it belongs with what the neighbour saw."],["Nobody had answered the door", "through the kitchen window the neighbour had seen three clean bowls."],["The ferryman left the saw by the wall", "beneath the awning Poppy spread out the map."]);
tasks.at(-1)[1].why=["Both clauses have their own subject and verb, so a comma alone splices them. A full stop marks the viewpoint change. “Beneath the awning” opens the second clause and stays with Poppy’s action."];
tasks.at(-1)[1].brief="Start a fresh sentence when the viewpoint shifts from the ferryman by the wall to Poppy beneath the awning. Keep every word.";

task(4,"witness-relative-and-result","Keep the existing sentence boundary and paired commas. Add a coordinating conjunction showing the result of the obstruction.",["comma", "comma", "so"],["Keep the comma opening the extra information.", "Keep the comma closing the description before the main verb.", "A comma plus “so” makes the second action a result of the first situation."],["The ferryman", "who carried the saw", "checked the path. A fallen limb blocked the track", "the adults cut it into sections."],["The baker", "who stayed beside Poppy", "watched the shelter. Poppy was cold after standing in the rain", "the baker wrapped a dry scarf around her shoulders."]);
task(4,"witness-time-shift","Keep the opening attached. Start a fresh sentence at the later event.",["comma", "stop"],["The opening is subordinate and stays attached with a comma.", "Both clauses are complete. A full stop marks the requested later event."],["When Poppy first called", "the bell rang again", "a little later, the distant light copied her signal."],["While the adults cleared the path", "Poppy held the lamp", "afterwards, the search party crossed Alder Arch."]);
task(4,"witness-two-transitions","Keep two sentences. Add a coordinating conjunction expressing contrast at the first join and one expressing a result at the second.",["but", "so"],["A comma plus “but” contrasts the apparent closeness with the obstacle.", "A comma plus “so” links the problem to the action it prompts."],["The shelter looked close", "the gorge blocked the way. The lower bridge was broken", "the rescuers went round by Alder Arch."],["Poppy wanted to join the search party", "she stayed at the rock. The distant light copied her pattern", "Willow knew someone could see them."]);
task(4,"correct-mixed-note","Edit only what needs changing. Preserve the wording, conjunctions and existing sentence boundaries.",["comma", "comma", "comma"],["Keep the comma after the subordinate opening.", "The existing coordinating conjunction already joins the clauses correctly.", "This comma separates items in a list, not complete clauses."],["Although Poppy wanted to go", "she remained beside the rock. The shelter was visible", "but the gorge prevented a direct approach. The neighbours brought lamps", "poles and canvas."],["Although the path was steep", "the party kept climbing. Willow carried the map", "and the ferryman led the way. Poppy watched the trees", "the bridge and the shelter."]);
task(4,"negative-witness-note","Join these two sentences using “nor”. Rewrite the second clause with the correct word order and without the repeated “not”.",["nor"],["“Nor” adds a second negative. Move “could” before the subject and remove “not”: the negative is supplied by “nor”."],["Poppy could not recognise the voice", "she could not see the speaker."],["Willow could not carry the mender alone", "she could not reach the shelter without crossing the gorge."]);
tasks.at(-1).forEach((q,i)=>{q.wordOrder={part:1,answer:i?'could she reach the shelter without crossing the gorge.':'could she see the speaker.'};q.initialChoices=['stop'];q.joinTask=true;q.options=[...all];q.grammar=[['nor','stop']];});
task(5,"passage-scene-and-reason","Start a new sentence when the account moves to the bakery. Keep the remaining sentences and add a coordinating conjunction making the final clause explain the preceding statement.",["comma", "stop", "for"],["Keep the comma after the subordinate opening.", "The new location begins the requested fresh sentence.", "A comma plus “for” introduces the reason for the preceding statement."],["When the rescuers reached the rock", "Poppy stood up", "at the bakery, the mender rested beside the oven. The return had been slow", "the carriers had stopped on the steep stretches."],["After the neighbours brought everyone back", "they put down their lamps", "inside the bakery, supper was heating. The mender still needed support", "she could not put weight on her ankle."]);
task(5,"passage-observation-and-result","Keep the paired commas and the existing full stop. Add a coordinating conjunction showing the action prompted by the discovery.",["comma", "comma", "so"],["Keep the opening comma around extra information.", "Keep the closing comma before the main verb.", "A comma plus “so” links the discovery to the action it prompts."],["The mender", "who had met Bram that afternoon", "remembered his warning. Her account contradicted his claim", "Willow asked about his work at the bridge."],["The ferryman", "who had repaired the crossing", "recognised his blue mark. The timber had come from the bridge", "he went to check the crossing."]);
task(5,"passage-warning-and-contrast","Preserve the paragraphs and existing full stops. Add a coordinating conjunction expressing contrast at the first join and one expressing a result at the second.",["but", "so"],["A comma plus “but” makes the contrast explicit.", "A comma plus “so” makes the second clause a result of the first."],["Bram had helped the travellers", "his help did not explain the missing timber.\n\nThe shavings alone did not show where the wood had come from", "the rabbits needed further evidence."],["The storm had battered the bridge", "it could not explain the saw marks.\n\nThe support had been cut", "the damage could not be blamed entirely on the weather."]);
task(5,"passage-reassurance-and-choice","Edit this earlier notebook entry, written before the evidence was checked. Keep the opening comma and existing conjunction. Use a coordinating conjunction to present the two possible explanations as alternatives.",["comma", "comma", "or"],["Keep the comma after the subordinate opening.", "The existing “but” already joins the complete clauses.", "A comma plus “or” presents competing explanations that were still possible when this earlier entry was written. Joining them does not establish which one is true."],["Although the shavings were fresh", "their source was uncertain. Poppy suspected wrongdoing", "but Willow wanted stronger evidence.\n\nThe marked timber might have been removed during an authorised repair", "Bram might have taken it without permission."],["Although Bram had stayed with the travellers", "his earlier claim needed checking. Willow trusted the mender’s account", "but she still wanted to check the physical evidence.\n\nBram might have misremembered his visit", "he might have lied about it deliberately."]);
task(5,"final-case-report","Keep the dependent opening and paired commas. Give the observation about the remaining brace its own sentence. Add a coordinating conjunction making the closure a result of the danger. Start a new sentence at “Later that week”.",["comma", "comma", "comma", "stop", "so", "stop"],["Keep the comma after the subordinate opening.", "Keep the comma opening extra information.", "Keep the comma closing extra information.", "These are complete clauses. A full stop gives the next observation its own sentence.", "A comma plus “so” marks the result.", "A full stop marks the requested later time; capitalise “Later”."],["Although Bram blamed the storm", "the physical evidence showed deliberate removal. The timber", "which bore a blue repair mark", "lay inside the mill", "the remaining brace had saw marks.\n\nThe bridge was unsafe", "the neighbours closed both approaches. The village examined what had happened", "later that week, a new caretaker took over."],["Although the rescue had succeeded", "questions remained. The mender", "who had spoken to Bram that afternoon", "remembered his warning", "Bram had denied visiting the crossing.\n\nTheir accounts conflicted", "Willow asked another question. The villagers investigated the missing timber", "later that week, Bram began helping to pay for repairs."]);
for(const q of tasks[23])q.grammar=[['comma'],['comma','stop','semi'],['comma']];
tasks[0][1].brief='Present the glowing fairground lanterns and the light going out at the mill as two separate sentences. Keep every word. Edit the comma after “glowing”.';
tasks[2][1].brief='Keep one sentence. Add a coordinating conjunction that contrasts Poppy’s claim with her behaviour.';
tasks[4][1].why=['The opening beginning with “As” is subordinate, so keep its comma.',tasks[4][0].why[1]];
tasks[18][1].brief='Keep one sentence. Use a coordinating conjunction to contrast the flooded stepping stones with the high crossing at Alder Arch.';
tasks[14][1].brief='Start a new sentence when the focus shifts from the lamp to Willow’s rescue action. Keep the paired commas and every word.';
tasks[29][1].brief='Keep the dependent opening and paired commas. Give Bram’s conflicting claim its own sentence. Add a coordinating conjunction making Willow’s next question a result of the conflicting accounts. Start a new sentence at “Later that week”.';
tasks[7][1].brief='Join the sentences using a coordinating conjunction that makes Poppy’s action a result of her difficulty seeing the prints.';
tasks[20][1].brief='Keep the existing full stop and paired commas. Add a coordinating conjunction making the baker’s action a result of Poppy being cold.';
tasks[22][1].why=['A comma plus “but” contrasts Poppy’s wish with her decision to stay.','A comma plus “so” makes Willow’s conclusion follow from the answering signal.'];
// Semicolons can separate list items, but are not the requested ordinary-list edit.
tasks[3].forEach(t=>t.grammar=[['comma','semi'],['comma','semi']]);
// These repair tasks have one grammatical answer among the offered tools.
for(const pair of [tasks[13],tasks[14]])for(const q of pair){
 q.options=['comma','stop','nor'];
 q.brief='Correct only the faulty punctuation using the available pieces. Keep every original word.';
}
export const STORY=tasks.map(x=>x[0]);
export const TRANSFER=tasks.map(x=>x[1]);
export const BONUS=[
{id:'b1',stage:4,skill:'mixed',structure:'bonus-fronted-within-paragraph',brief:'Keep the opening location phrase attached. Start a new sentence about the route marked on the map.',parts:['Beside the signal rock','a lantern lit the map','the marked route led towards Alder Arch.'],valid:[['comma'],['stop']],grammar:[['comma'],independent],why:['Beside the signal rock is a location phrase, not a complete sentence.','Both clauses are complete. A full stop introduces the observation about the route.'],options:all,kind:'paragraph'},
{id:'b2',stage:3,skill:'connectors',structure:'bonus-instead-transition',brief:'Give the bell’s actual destination its own sentence. Keep every word, including “instead”.',parts:['Bram had not taken the bell home','instead, he had carried it towards the flooded crossing.'],valid:[['stop']],grammar:[['stop','semi']],why:['Both clauses are complete. A full stop gives the actual destination its own sentence. Capitalise “Instead” and keep its following comma: it introduces the alternative destination.'],options:all,kind:'sentence'},
{id:'b3',stage:5,skill:'paragraph',structure:'bonus-where-clause',brief:'Keep the WHERE opening attached. Use AND to add the second action; begin a new sentence at the later time “At sunrise”.',parts:['Where the path reached the village','Poppy walked beside Willow. The baker opened the door','the neighbours brought the stretcher inside','at sunrise, the village began to stir.'],valid:[['comma'],['and'],['stop']],grammar:[['comma'],independent,independent],why:['Where introduces a dependent location clause.','And adds the neighbours’ action.','At sunrise starts a new point in the timeline.'],options:all,kind:'paragraph'}
];
export const BANK=[...STORY,...TRANSFER,...BONUS];

for(const q of BANK){
 if(['m29','r29'].includes(q.id))q.grammar[1]=['comma','stop','semi'];
 q.studentBrief=q.brief;
 q.goal={sentences:(q.parts.join(' ').match(/[.!?](?=\s|$)/g)||[]).length+q.valid.filter(v=>v[0]==='stop').length,conjunctions:[...new Set(q.valid.map(v=>v[0]).filter(t=>!['comma','stop','semi'].includes(t)))]};
}
