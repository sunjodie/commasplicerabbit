export const EDITING_RULES='Use the pieces provided. Keep correct commas and every original word. Add joining words only where the writing goal requires them; change nothing else.';
// Authored mystery text only. Each brief has an explicit target; approved contrast synonyms are accepted. Other grammatical
// repairs receive neutral brief feedback rather than a grammar-error penalty.
export const TOOLS={comma:{label:'Keep comma',mark:',',join:', '},stop:{label:'Full stop',mark:'.',join:'. '},semi:{label:'Semicolon',mark:';',join:'; '},for:{label:'Add for',mark:', for',join:', for '},and:{label:'Add and',mark:', and',join:', and '},nor:{label:'Add nor',mark:', nor',join:', nor '},but:{label:'Add but',mark:', but',join:', but '},or:{label:'Add or',mark:', or',join:', or '},yet:{label:'Add yet',mark:', yet',join:', yet '},so:{label:'Add so',mark:', so',join:', so '},because:{label:'Add because',mark:'because',join:' because '}};
export const CHAPTERS=[
{name:'After the fair',skill:'boundaries',reward:'A cosy burrow',blurb:'Separate scenes; connect observations.',lesson:'Start with the two sides of a comma. Can each side stand as a sentence, with its own subject and verb? If so, the comma needs some help: a full stop can separate the sentences, a joining word such as “but” can connect them, or a semicolon can link them. Some commas already belong, including those after dependent openings and in lists. Read quietly to yourself, then check how the clauses fit together.',demo:['The mill was dark','a lantern appeared upstairs.'],fix:'stop',explain:'Both clauses stand alone. A full stop works; a semicolon also works when the brief asks for one sentence.'},
{name:'What Had Left the Mill',skill:'dependent',reward:'A fern garden',blurb:'Make the relationship precise.',lesson:'In this chapter, join two sentences into one. Keep every word, changing an initial capital to lower case where necessary. Put a comma before a coordinating conjunction. FANBOYS are “for”, “and”, “nor”, “but”, “or”, “yet” and “so”. A comma plus one of these can join two complete clauses. “And” adds information; “but” and “yet” express contrast; “so” gives a result; “or” offers an alternative. Choose the joining word that expresses the relationship in the writing goal. Preserve useful commas after dependent openings.',demo:['Pip found a circular mark','Mara found another beneath the reeds.'],fix:'and',explain:'Comma + “and” adds a second discovery. Both sides have their own subject and verb.'},
{name:'The Wrong Path',skill:'long',reward:'A woodland workshop',blurb:'Separate assumptions from evidence.',lesson:'“For” gives a reason, “yet” marks contrast, and “nor” adds a second negative. After “nor”, word order often changes: “Pip had not seen it, nor had Mara heard it.” Long subjects, embedded clauses and extra information do not change the rule for joining complete clauses.',demo:['Pip had not seen the bell','had Mara heard it.'],fix:'nor',explain:'Comma + “nor” adds the second negative. Notice “had Mara”, rather than “Mara had”.'},
{name:'The altered map',skill:'connectors',reward:'Lanterns for the trail',blurb:'Handle transitions and changes of scene.',lesson:'“However”, “therefore” and “nevertheless” are transitions, not FANBOYS. Between two complete clauses, use a semicolon before the transition and retain its following comma. A new time, place or topic can instead call for a new sentence. Check the brief for whether to preserve a close link or mark a new scene.',demo:['The ink was fresh','however, the paper was old.'],fix:'semi',explain:'The semicolon joins the complete clauses; the comma after “however” stays.'},
{name:'Two accounts, one night',skill:'mixed',reward:'A treetop lookout',blurb:'Edit witness notes in context.',lesson:'Read a whole note before editing. Keep list commas, dependent openings and paired commas around extra information. Use the writing goal to decide which complete clauses belong together and where a new sentence should begin.',demo:null,explain:'Check the structure at each comma and the relationship between the ideas.'},
{name:'Beyond the hillside',skill:'paragraph',reward:'The village gathering place',blurb:'Edit the final case report.',lesson:'Now edit connected paragraphs. Preserve correct punctuation and paragraph breaks. Read the result silently as a whole: are the cause, contrast and sequence clear? A natural rhythm helps you notice a join, but complete clauses and the editing brief decide how to repair it.',demo:null,explain:'A successful report is grammatical and follows its writing goal.'}
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
task(0,"paired-observations","Keep one sentence. Add a coordinating conjunction that explicitly contrasts Mara’s dismissal with Pip’s continuing unease.",[
  "but"
],[
  "Comma + “but” expresses contrast. And only adds information; so would incorrectly express a result. A semicolon is grammatical but does not supply the requested conjunction."
],[
  "Mara dismissed the legend as a fireside invention",
  "Pip found little reassurance in the darkened window."
],[
  "Pip insisted that she was not apprehensive",
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
  "Pip noticed the frayed green cloth",
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
  "By the time Mara lit her lantern",
  "Pip had called once into the mill",
  "nobody had answered."
],[
  "As Mara raised her lantern",
  "Pip waited beside the doorway",
  "no footsteps came down the stairs."
]);
tasks.at(-1).forEach(t=>t.options=[
  "comma",
  "stop",
  "semi"
]);

task(1,"additive-independent","Join the sentences using a coordinating conjunction that presents the discoveries as additional findings.",["and"],["Both discoveries are complete clauses. A comma followed by “and” adds the second discovery."],["Pip found a circular mark beside the porch", "Mara found a second one beneath the reeds."],["Pip noticed a circular mark beneath the eaves", "Mara found another beneath the reeds."]);
task(1,"contrast-independent","Join the sentences using a coordinating conjunction that makes the contrast explicit.",["but"],["“But” and “yet” both express contrast. “Yet” places greater emphasis on the unexpected difference. Use a comma before either conjunction."],["The rain had softened the bootprints", "the sheltered circular marks were still clear."],["Rain fell across the path", "the circular mark beneath the eaves remained sheltered."]);
task(1,"cause-result","Join the sentences using a coordinating conjunction that makes the second action a result of the first discovery.",["so"],["“So” shows that the discovery prompts the action. Place a comma before it."],["The marks led towards the stream", "Mara raised the lamp to search for the next one."],["Pip could not see where the bootprints led next", "she held the lamp closer to the ground."]);
task(1,"alternative-consequences","Join the sentences using a coordinating conjunction that presents the actions as alternatives.",["or"],["“Or” offers a choice between two courses of action. Place a comma before it."],["They could follow the marks to the reeds", "they could wait inside the mill for Bram."],["Pip could bring the lamp closer to the mark", "Mara could examine it in the existing light."]);
task(1,"participial-subject","Join the sentences using a semicolon. Do not add a conjunction.",["semi"],["Both clauses are complete. A semicolon links the related observations. “Whoever carried the heavy object” is the whole subject of the first clause."],["Whoever carried the heavy object had stopped beside the reeds", "two deep bootprints stood beside the circular mark."],["The person carrying the heavy object had paused beneath the reeds", "a circular mark lay beside two deep bootprints."]);
// Joining tasks start from two sentences, so the original full stop is visible.
for(const pair of tasks.slice(5,10))for(const q of pair){q.initialChoices=['stop'];q.joinTask=true;q.studentBrief=q.brief;q.options=['comma','stop','semi','and','but','yet','or','so'];}
for(const q of tasks[6])q.valid=[['but','yet']];
tasks[9][1].why=['Both clauses are complete. “Carrying the heavy object” describes the person; the main verb is “had paused”. A semicolon links the observations.'];

task(2,'unexpected-yet','Keep one sentence. Use a coordinating conjunction to emphasise the gap between Pip’s certainty and the limited evidence.', ['yet'],['Comma + “yet” marks the unexpected contrast: Pip felt sure, although she had found only prints. “So” would wrongly present the limited evidence as a result of her certainty.'],['Pip felt sure that Bram had carried the bell this way','she had found only prints.'],['Pip felt sure that the marks would lead to Bram','she did not know who had left them.']);
task(2,'explanatory-for','Keep one sentence. Use a coordinating conjunction to make the second clause explain what caused the sound.', ['for'],['Comma + “for” introduces the explanation for the knocking. The broken rail caused the sound; the sound did not cause the rail to strike the bridge.'],['The sound came from the bridge','the broken rail kept striking its underside.'],['The knocking returned with each surge of water','the current lifted the loose rail against the bridge.']);
task(2,'negative-inversion','Join the sentences with a coordinating conjunction that adds a second negative, changing the word order as needed.', ['nor'],['Comma + “nor” adds the second negative. Rewrite “the bank could not be trusted” as “could the bank be trusted”: move “could” before the subject and remove “not”, because “nor” already supplies the negative.'],['The bridge could not be crossed','the bank could not be trusted.'],['Pip could not cross the bridge','she could not trust the bank.'],[['nor','stop']]);
tasks.at(-1)[0].wordOrder={part:1,answer:'could the bank be trusted.'};
tasks.at(-1)[1].wordOrder={part:1,answer:'could she trust the bank.'};
tasks.at(-1).forEach(q=>{q.initialChoices=['stop'];q.joinTask=true;});
task(2,'embedded-that-clauses','Use a semicolon to join the two complete main clauses. Keep every word.', ['semi'],['“Pip believed” and “Mara feared” head complete main clauses. The clauses beginning with “that” are subordinate within those main clauses. A semicolon repairs the comma splice.'],['Pip believed that the prints would lead to Bram','Mara feared that the path was dangerous.'],['Pip thought that Bram had followed the marks','Mara believed that they should return to the village.']);
task(2,'relative-subject-main','Use a semicolon to repair the comma splice. Keep the paired commas around the description and preserve every word.', ['comma','comma','semi'],['Keep this comma: it opens the extra information “which was soft with rain”.','Keep this comma: it closes the extra information about the bank.','The first main clause is “The bank broke away where Pip had stood”. The second is “a tuft of grass turned over once in the current”. Use a semicolon between these complete clauses.'],['The bank','which was soft with rain','broke away where Pip had stood','a tuft of grass turned over once in the current.'],['The lamp','which had swung sideways','cast its light across the water','Mara pulled Pip away from the crumbling bank.']);
tasks.at(-1)[1].why=['Keep this comma: it opens the extra information “which had swung sideways”.','Keep this comma: it closes the extra information about the lamp.','“The lamp cast its light across the water” and “Mara pulled Pip away from the crumbling bank” are complete main clauses. A semicolon links them.'];
tasks[10][1].why=['Comma + “yet” contrasts Pip’s certainty with her uncertainty about who left the marks. “So” would wrongly make that uncertainty a result of her certainty.'];
tasks[11][1].why=['Comma + “for” introduces the cause of the repeated knocking: the current lifted the loose rail against the bridge.'];
tasks[12][1].why=['Comma + “nor” adds the second negative. Change “she could not trust the bank” to “could she trust the bank”: put “could” before “she” and remove the repeated “not”.'];
tasks[13][1].why=['“Pip thought” and “Mara believed” head complete main clauses. Each contains a subordinate that-clause. A semicolon repairs the comma splice between the main clauses.'];
for(const pair of tasks.slice(10,15))for(const q of pair)q.options=['comma','stop','semi','for','and','nor','or','yet','so'];

task(3,'however-transition','Keep one sentence and all words. Repair the join before HOWEVER using punctuation only.', ['semi'],['However is not a FANBOYS conjunction. Use a semicolon before it; its following comma stays.'],['The map had been altered','however, the original route was still visible beneath the new line.'],['The ink looked recent','however, the paper itself was brittle with age.']);
task(3,'therefore-transition','Keep the BECAUSE opening attached and preserve one sentence. Repair the remaining join with punctuation only.', ['comma','semi'],['Because introduces a dependent opening.','Therefore introduces a conclusion, but does not join complete clauses by itself. Use a semicolon before it.'],['Because the fresh line avoided the upstream bridge','Pip suspected danger there','therefore, she checked the older map.'],['Because the marked path stayed above the floodplain','Mara suspected that the water had risen','therefore, she traced the river’s old course.']);
task(3,'nevertheless-transition','Keep the WHICH description enclosed inside the first clause. Preserve one sentence and all words; repair the remaining join with punctuation only.', ['comma','comma','semi'],['Open the extra information about the map.','Close the extra information before the main verb.','Nevertheless is a transition. A semicolon links these complete clauses.'],['The old map','which had been left beside an open window','was damp at the edges','nevertheless, the hillside turning remained clear.'],['The marked paper','which Pip found beneath the ledger','was torn at one corner','nevertheless, the higher route could still be followed.']);
task(3,'condition-contrast','Keep the conditional opening attached. Use BUT for the contrast between the routes.', ['comma','but'],['If introduces a condition, so keep its comma.','The two route descriptions are complete clauses. Comma + “but” contrasts them.'],['If the old map was accurate','the lower path led straight to the bridge','the new line climbed towards the hillside.'],['If the faded markings were correct','the riverside track crossed low ground','the fresh route stayed above the water.']);
task(3,'record-scene-change','Begin a new sentence when the account leaves the written record and returns to the investigation outside. Keep all words.', ['stop'],['The record and the present action belong to different scenes. A full stop follows this editorial brief; other joins can be grammatical.'],['The delivery record said that travellers were expected before dawn','outside the gate, Pip unfolded the map in the rain.'],['The register listed two travellers for the night crossing','beside the mill, Mara traced the hillside line with one finger.']);

task(4,'witness-relative-and-result','Keep the witness description in its sentence. Use SO to connect the blocked view with its consequence. Leave correct commas alone.', ['comma','comma','so'],['The who-clause adds information about the witness.','Close that extra information before the main verb “heard”.','Use so to show that the blocked view explains the witness’s inability to see the bell.'],['The baker','who was closing her shutters','heard the bell near the mill. Fog covered the lane','she could not see who was carrying it.'],['The watchman','who was leaving the village','heard the bell beside the gate. The trees hid the bank','he could not see the person below.']);
task(4,'witness-time-shift','Keep the WHEN opening attached. Begin a new sentence at the later time, rather than adding AND.', ['comma','stop'],['When makes the opening dependent.','The later time begins a new event in the account. The brief asks for a new sentence there.'],['When the baker checked her clock','it was almost midnight','ten minutes later, a ferryman heard the same bell farther upstream.'],['When the watchman left the square','the clock was striking twelve','a quarter of an hour later, a traveller heard a bell above the bend.']);
task(4,'witness-two-transitions','Keep two sentences, preserve all words, and link each pair of complete clauses with punctuation alone.', ['semi','semi'],['However needs a semicolon before it in this sentence.','Therefore also needs a semicolon between these complete clauses.'],['The accounts appeared to disagree','however, they described different moments. The second sound came later','therefore, the bell could have moved upstream.'],['The witnesses named different places','however, their times were not the same. The later sound was farther away','therefore, someone may have carried the bell along the bank.']);
task(4,'correct-mixed-note','This note is already correctly punctuated. Preserve its words, sentence boundaries and joining words.', ['comma','comma','comma'],['Although introduces a dependent opening.','But already joins the two complete clauses.','The last comma belongs inside a list, not between two sentences.'],['Although the fog muffled the sound','both witnesses recognised the bell. Their times differed','but neither account had to be false. Pip recorded the places','times and weather.'],['Although the lane was dark','both witnesses remembered the ringing. Their positions differed','but their accounts could both be true. Mara listed the sounds','locations and times.'],[['comma'],['comma','stop','semi'],['comma']]);
task(4,'negative-witness-note','Use NOR for the second negative. Keep the BECAUSE opening attached; connect its two observations with punctuation alone in one sentence.', ['nor','comma','semi'],['Nor introduces a second negative clause, with the auxiliary verb before its subject.','Because makes the opening dependent on what follows.','The two observations after the because opening are complete clauses. A semicolon joins them.'],['The ferryman did not claim to have seen the caretaker','did he claim to know why the bell was moving. Because the wind had dropped','the ringing was clearer upstream','the second witness was nearer the sound.'],['The watchman had not recognised the coat','had he recognised the person carrying the bell. Because the rain had eased','the sound travelled farther','the later witness heard it more clearly.'],[['nor'],['comma'],independent]);

task(5,'passage-scene-and-reason','Keep the opening attached. Begin a new sentence at the change from setting out to hearing voices. Use FOR to introduce the evidence for the final judgement.', ['comma','stop','for'],['After introduces the dependent opening.','The hillside scene begins a new sentence.','For introduces evidence supporting the judgement in the preceding clause.'],['After Pip and Mara compared the accounts','they left the village','on the hillside, they heard voices through the trees. The callers were close','their words carried clearly above the rain.\n\nThe higher track curved back towards the sheltered porch behind the mill.'],['After the two friends checked the times','they followed the marked route','above the stream, a voice called from behind the trees. The shelter was nearby','warm light fell across the track.\n\nThe higher track curved back towards the sheltered porch behind the mill.']);
task(5,'passage-observation-and-result','Keep the WHO description and the WHILE opening attached. Use SO for the result of the broken bridge. Keep all other sentence boundaries.', ['comma','comma','so','comma'],['Open the extra information about the caretaker.','Close the description before the main verb.','So makes the damaged crossing the cause of choosing a safer route.','While introduces a dependent opening.'],['The caretaker','who was wrapping a blanket around a traveller','looked up as Pip arrived. The footbridge had lost two planks','he had led the travellers along the higher path.\n\nWhile the storm passed','they waited beneath the mill’s old porch.'],['The caretaker','who was pouring water into a cup','turned towards Mara. Floodwater had torn away the crossing','he had brought the travellers to the hillside shelter.\n\nWhile the rain continued','they stayed under the wooden roof.']);
task(5,'passage-warning-and-contrast','Keep the two paragraphs and existing sentence boundaries. Use BUT for the first contrast. Make the join before THEREFORE grammatical without adding words or a sentence.', ['but','semi'],['But contrasts the lack of a view with the visible warning light.','Therefore needs a semicolon before it when the clauses stay in one sentence.'],['The travellers could not see the damaged bridge','they could see the lantern in the mill’s upper window.\n\nThe light marked the danger','therefore, the caretaker had left it burning while he carried the bell upstream. The bell warned anyone who had missed the light.'],['The travellers could not make out the broken planks','they could make out the light above the waterwheel.\n\nThe lantern was a warning','therefore, the caretaker kept it lit as he took the bell along the bank. Its ringing stopped the next group before the bend.']);
task(5,'passage-reassurance-and-choice','Keep the ALTHOUGH opening and the existing YET. Use OR to offer the travellers a choice.', ['comma','comma','or'],['Although introduces a dependent opening.','The existing yet already joins the contrasting clauses; keep its comma.','Or offers two complete alternatives; and would make them cumulative instead.'],['Although the coat was torn','the caretaker was unhurt. The missing bell and altered map had looked threatening','yet both had helped the travellers reach safety.\n\nThey could wait for the rain to stop','they could return with Pip by the hillside route.'],['Although his sleeve was ripped','the caretaker was safe. The strange light and deep tracks had seemed alarming','yet both were signs of the same rescue.\n\nThe travellers could rest under the porch','they could leave with Mara when the fog cleared.']);
task(5,'final-case-report','Edit the whole report. Keep dependent openings and extra-information commas. Keep the paired physical clues in one sentence using punctuation only. Use SO for the rescue’s result. Begin a new sentence at “By dawn”. Add no other words.', ['comma','comma','comma','semi','so','stop'],['Although introduces the opening; its comma stays.','This comma opens extra information about the bell.','This comma closes that information before “had left”.','The bell’s mark and the coat’s trace are described in complete, closely related clauses. Use a semicolon.','So connects the warning and the successful result.','By dawn changes the time and begins the closing scene. Use a full stop.'],['Although the upper room had been locked for years','its lantern was burning for a reason. The portable bell','which the caretaker had carried upstream','had left a round rim in the mud','his patched coat had shed a thread beside the frame.\n\nThe light and ringing warned the travellers','they avoided the damaged bridge. The altered map showed the safer path','by dawn, everyone was waiting under the mill’s porch.'],['Although the mill had seemed deserted','someone was using its light to help. The heavy bell','which had been lifted from its frame','had pressed a ring into the bank','the torn sleeve had caught on a nail.\n\nThe caretaker marked the higher route','the travellers stayed clear of the broken crossing. The warning had reached them in time','by dawn, they were safe beneath the wooden roof.']);
// Semicolons can separate list items, but are not the requested ordinary-list edit.
tasks[3].forEach(t=>t.grammar=[['comma','semi'],['comma','semi']]);
export const STORY=tasks.map(x=>x[0]);
export const TRANSFER=tasks.map(x=>x[1]);
export const BONUS=[
{id:'b1',stage:4,skill:'mixed',structure:'bonus-fronted-within-paragraph',brief:'Keep the fronted location phrase attached. Link the two complete observations in one sentence using punctuation only.',parts:['Beside the sheltered porch','a lantern lit the map','its fresh line followed the hillside.'],valid:[['comma'],['semi']],grammar:[['comma'],independent],why:['Beside the sheltered porch is a location phrase, not a complete sentence.','Both observations are complete. Use a semicolon for the requested link.'],options:all,kind:'paragraph'},
{id:'b2',stage:3,skill:'connectors',structure:'bonus-instead-transition',brief:'Keep one sentence and every word. Repair the join before INSTEAD with punctuation only.',parts:['The caretaker had not taken the bell home','instead, he had carried it towards the flooded crossing.'],valid:[['semi']],grammar:[['stop','semi']],why:['Instead is a transition. It needs a semicolon before it when these complete clauses stay in one sentence.'],options:all,kind:'sentence'},
{id:'b3',stage:5,skill:'paragraph',structure:'bonus-where-clause',brief:'Keep the WHERE opening attached. Use AND to add the second action; begin a new sentence at the later time “At sunrise”.',parts:['Where the hillside track met the porch','Pip found the travellers. Mara folded the map','the caretaker put the bell by the door','at sunrise, they set off together.'],valid:[['comma'],['and'],['stop']],grammar:[['comma'],independent,independent],why:['Where introduces a dependent location clause.','And adds the caretaker’s action.','At sunrise starts a new point in the timeline.'],options:all,kind:'paragraph'}
];
export const BANK=[...STORY,...TRANSFER,...BONUS];

// Detailed goals are hint metadata, never displayed before a hint is requested.
const STUDENT_BRIEFS=['Start a fresh sentence when the view moves from the square to the mill. Keep every word.', 'Keep one sentence. Edit only what its structure requires.', 'Keep the two observations together in one sentence, using punctuation alone.', 'Keep the inventory as a single sentence with an ordinary list.', 'Keep the whole account in one sentence, using punctuation alone.', 'Combine the discoveries into one sentence. Use a coordinating joining word to present them as additional findings.', 'Keep one sentence. Use a coordinating joining word to make the contrast between the evidence and the empty path explicit.', 'Keep one sentence. Use a coordinating joining word to make the second action a result of the first discovery.', 'Keep one sentence. Use a coordinating joining word to present two alternative courses of action.', 'Keep both observations in one sentence, using punctuation alone.', 'Keep one sentence. Use a coordinating joining word to introduce the evidence supporting the suspicion.', 'Keep one sentence. Add the second negative statement without changing its word order.', 'Keep one sentence. Use a coordinating joining word to emphasise the unexpected contrast.', 'Keep the findings in one sentence, using punctuation alone.', 'Keep one sentence and every word. Link the observations with punctuation alone.', 'Keep one sentence and all its words. Edit punctuation where needed.', 'Keep the whole account in one sentence. Change punctuation only.', 'Keep one sentence and every word. Change punctuation only.', 'Keep one sentence. Use a coordinating joining word to make the contrast between the routes explicit.', 'Start a fresh sentence when the account moves from the written record to the investigation outside.', 'Preserve the existing sentence boundaries. Use a coordinating joining word to make the blocked view lead explicitly to its consequence.', 'Start a fresh sentence at the later time. Keep all words.', 'Keep two sentences and every word. Connect the ideas with punctuation alone.', 'Edit only what needs changing. Preserve the wording, joining words and existing sentence boundaries.', 'Keep two sentences. Add the second negative without changing its word order; connect the later observations with punctuation alone.', 'Start a fresh sentence when the account moves to the next location. Use a coordinating joining word to introduce the evidence for the final judgement. Keep the remaining boundaries.', 'Preserve the existing sentence boundaries. Use a coordinating joining word to make the damaged crossing lead explicitly to the safer route.', 'Preserve the paragraphs and sentence boundaries. Use a coordinating joining word to make the first contrast explicit; repair the remaining join with punctuation alone.', 'Preserve the paragraphs, wording and sentence boundaries. Use a coordinating joining word to present the travellers’ final options as alternatives.', 'Keep the descriptions attached to their main clauses. Link the paired observations with punctuation alone; make the warning lead explicitly to its result with a coordinating joining word. Start a fresh sentence at the final change of scene.'];
const BONUS_BRIEFS=['Keep one sentence and every word. Connect the observations with punctuation alone.', 'Keep one sentence and every word. Change punctuation only.', 'Use a coordinating joining word to present the two actions as additional events. Start a fresh sentence at sunrise; preserve the earlier boundary.'];
for(const q of BANK){
 if(['m29','r29'].includes(q.id))q.grammar[1]=['comma','stop','semi'];
 q.studentBrief=q.stage<=2?q.brief:q.id.startsWith('b')?BONUS_BRIEFS[Number(q.id.slice(1))-1]:STUDENT_BRIEFS[Number(q.id.slice(1))-1];
 q.goal={sentences:(q.parts.join(' ').match(/[.!?](?=\s|$)/g)||[]).length+q.valid.filter(v=>v[0]==='stop').length,conjunctions:[...new Set(q.valid.map(v=>v[0]).filter(t=>!['comma','stop','semi'].includes(t)))]};
}
