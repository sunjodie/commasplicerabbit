export const EDITING_RULES='Use the pieces provided. Keep correct commas and every original word. Add joining words only where the writing goal requires them; change nothing else.';
// Authored mystery text only. Each brief has an explicit target; approved contrast synonyms are accepted. Other grammatical
// repairs receive neutral brief feedback rather than a grammar-error penalty.
export const TOOLS={comma:{label:'Keep comma',mark:',',join:', '},stop:{label:'Full stop',mark:'.',join:'. '},semi:{label:'Semicolon',mark:';',join:'; '},for:{label:'Add for',mark:', for',join:', for '},and:{label:'Add and',mark:', and',join:', and '},nor:{label:'Add nor',mark:', nor',join:', nor '},but:{label:'Add but',mark:', but',join:', but '},or:{label:'Add or',mark:', or',join:', or '},yet:{label:'Add yet',mark:', yet',join:', yet '},so:{label:'Add so',mark:', so',join:', so '},because:{label:'Add because',mark:'because',join:' because '}};
export const CHAPTERS=[
{name:'After the fair',skill:'boundaries',reward:'A cosy burrow',blurb:'Separate scenes; connect observations.',lesson:'Start with the two sides of a comma. Can each side stand as a sentence, with its own subject and verb? If so, the comma needs some help: a full stop can separate the sentences, a joining word such as “but” can connect them, or a semicolon can link them. Some commas already belong, including those after dependent openings and in lists. Read quietly to yourself, then check how the clauses fit together.',demo:['The mill was dark','a lantern appeared upstairs.'],fix:'stop',explain:'Both clauses stand alone. A full stop works; a semicolon also works when the brief asks for one sentence.'},
{name:'What Had Left the Mill',skill:'dependent',reward:'A fern garden',blurb:'Make the relationship precise.',lesson:'In this chapter, join two sentences into one. Keep every word, changing an initial capital to lower case where necessary. Put a comma before a coordinating conjunction. FANBOYS are “for”, “and”, “nor”, “but”, “or”, “yet” and “so”. A comma plus one of these can join two complete clauses. “And” adds information; “but” and “yet” express contrast; “so” gives a result; “or” offers an alternative. Choose the joining word that expresses the relationship in the writing goal. Preserve useful commas after dependent openings.',demo:['Pip found a circular mark','Mara found another beneath the reeds.'],fix:'and',explain:'Comma + “and” adds a second discovery. Both sides have their own subject and verb.'},
{name:'The Wrong Path',skill:'long',reward:'A woodland workshop',blurb:'Separate assumptions from evidence.',lesson:'“For” gives a reason, “yet” marks contrast, and “nor” adds a second negative. After “nor”, word order often changes: “Pip had not seen it, nor had Mara heard it.” Long subjects, embedded clauses and extra information do not change the rule for joining complete clauses.',demo:['Pip had not seen the bell','had Mara heard it.'],fix:'nor',explain:'Comma + “nor” adds the second negative. Notice “had Mara”, rather than “Mara had”.'},
{name:'A Bell in Two Places',skill:'connectors',reward:'Lanterns for the trail',blurb:'Compare accounts and changes of viewpoint.',lesson:'“However”, “therefore” and “nevertheless” are transitions, not FANBOYS. Between two complete clauses, use a semicolon before the transition and retain its following comma. A change of time, place or viewpoint can call for a new sentence. Check the instruction for whether to preserve a close link or begin a fresh sentence.',demo:['The ink was fresh','however, the paper was old.'],fix:'semi',explain:'The semicolon joins the complete clauses; the comma after “however” stays.'},
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

task(3,"however-transition","Keep every word and use a semicolon to join the complete clauses. Keep the comma after “however”.",["semi"],["“However” signals contrast but is not a coordinating conjunction. The original comma splices two independent clauses; a semicolon repairs the join. The comma after “however” stays."],["The baker heard the bell near the footbridge", "however, the ferryman heard it above the bend."],["The baker had been closing her shutters", "however, the ferryman had still been helping with the crates."]);
task(3,"therefore-transition","Keep the “Because” opening attached. Repair the comma splice before “therefore” with a semicolon. Preserve every word.",["comma", "semi"],["The opening beginning with “Because” is subordinate, so keep its comma.", "“Mara suspected that it had moved” and “she traced the path on the map” are independent clauses. “Therefore” cannot join them with a comma alone. Use a semicolon before it."],["Because the witnesses had heard the bell in different places at different times", "Mara suspected that it had moved", "therefore, she traced the path on the map."],["Because the neighbour had received no answer", "she looked through the kitchen window", "therefore, she saw the prepared table."]);
tasks.at(-1)[1].why=["Keep the comma after the subordinate “Because” opening.", "“She looked through the kitchen window” and “she saw the prepared table” are independent clauses. A semicolon before “therefore” repairs the splice."];
task(3,"nevertheless-transition","Keep the description inside its paired commas. Use a semicolon to repair the join before “nevertheless”. Preserve every word.",["comma", "comma", "semi"],["Keep the comma opening the extra information about the ferryman.", "Keep the comma closing “who knew the higher crossing” before the main verb “said”.", "“The ferryman said the route was above the water” and “a fallen beech blocked the approach” are independent clauses. Use a semicolon before “nevertheless”; keep its following comma."],["The ferryman", "who knew the higher crossing", "said the route was above the water", "nevertheless, a fallen beech blocked the approach."],["The cottage", "which stood beside the mill", "was dark", "nevertheless, a table had been prepared inside."]);
tasks.at(-1)[1].why=["Keep the comma opening the extra information about the cottage.", "Keep the comma closing “which stood beside the mill” before “was”.", "“The cottage was dark” and “a table had been prepared inside” are independent clauses. Use a semicolon before “nevertheless”."];
task(3,"condition-contrast","Keep one sentence. Use a coordinating conjunction to make the contrast between the lower path and the shelter explicit.",["but"],["Both clauses are independent. A comma followed by “but” makes the contrast explicit: the lower path is under water, while the shelter is above the flood line."],["The lower path was hidden by water", "the old shelter stood above the flood line."],["The water covered the lower stepping stones", "Alder Arch stood well above the stream."]);
tasks.at(-1)[1].why=["A comma followed by “but” contrasts the flooded lower stones with the high crossing. Both clauses are independent."];
task(3,"record-scene-change","Start a fresh sentence when the viewpoint shifts from the unanswered door to the view through the kitchen window. Keep every word.",["stop"],["“Nobody had answered the door” and “through the kitchen window the neighbour had seen three clean bowls” are independent clauses, so a comma alone cannot join them. A full stop marks the requested shift in viewpoint. “Through the kitchen window” opens the second clause; it belongs with what the neighbour saw."],["Nobody had answered the door", "through the kitchen window the neighbour had seen three clean bowls."],["The ferryman left the saw by the wall", "beneath the awning Pip spread out the map."]);
tasks.at(-1)[1].why=["Both clauses have their own subject and verb, so a comma alone splices them. A full stop marks the viewpoint change. “Beneath the awning” opens the second clause and stays with Pip’s action."];
tasks.at(-1)[1].brief="Start a fresh sentence when the viewpoint shifts from the ferryman by the wall to Pip beneath the awning. Keep every word.";

task(4,"witness-relative-and-result","Keep the existing sentence boundary and paired commas. Add a coordinating conjunction showing the result of the obstruction.",["comma", "comma", "so"],["Keep the comma opening the extra information.", "Keep the comma closing the description before the main verb.", "A comma plus “so” makes the second action a result of the first situation."],["The ferryman", "who carried the saw", "checked the path. A fallen limb blocked the track", "the adults cut it into sections."],["The baker", "who stayed beside Pip", "watched the shelter. Pip needed both paws to signal", "the baker held the scarf."]);
task(4,"witness-time-shift","Keep the opening attached. Start a fresh sentence at the later event.",["comma", "stop"],["The opening is subordinate and stays attached with a comma.", "Both clauses are complete. A full stop marks the requested later event."],["When Pip first called", "the bell rang again", "a little later, the distant light copied her signal."],["While the adults cleared the path", "Pip held the lamp", "afterwards, the search party crossed Alder Arch."]);
task(4,"witness-two-transitions","Keep two sentences and every word. Use a semicolon before each transition.",["semi", "semi"],["The transition is not a coordinating conjunction. Use a semicolon between the complete clauses and keep the following comma.", "The transition is not a coordinating conjunction. Use a semicolon between the complete clauses and keep the following comma."],["The shelter looked close", "however, the gorge lay between them. The lower bridge was broken", "therefore, the rescuers went round by Alder Arch."],["Pip wanted to join the search party", "nevertheless, she stayed at the rock. The distant light copied her pattern", "therefore, Mara knew someone could see them."]);
task(4,"correct-mixed-note","Edit only what needs changing. Preserve the wording, conjunctions and existing sentence boundaries.",["comma", "comma", "comma"],["Keep the comma after the subordinate opening.", "The existing coordinating conjunction already joins the clauses correctly.", "This comma separates items in a list, not complete clauses."],["Although Pip wanted to go", "she remained beside the rock. The shelter was visible", "but the gorge prevented a direct approach. The neighbours brought lamps", "poles and canvas."],["Although the path was steep", "the party kept climbing. Mara carried the map", "and the ferryman led the way. Pip watched the trees", "the bridge and the shelter."]);
task(4,"negative-witness-note","Join these two sentences with a coordinating conjunction adding a second negative. Change the second clause’s word order as needed.",["nor"],["“Nor” adds a second negative. Move “could” before the subject and remove “not”: the negative is supplied by “nor”."],["Pip could not recognise the voice", "she could not see the speaker."],["Mara could not carry the mender alone", "she could not shorten the route."]);
tasks.at(-1).forEach((q,i)=>{q.wordOrder={part:1,answer:i?'could she shorten the route.':'could she see the speaker.'};q.initialChoices=['stop'];q.joinTask=true;q.options=[...all];q.grammar=[['nor','stop']];});
task(5,"passage-scene-and-reason","Start a new sentence when the account moves to the bakery. Add a coordinating conjunction introducing the evidence for the final judgement.",["comma", "stop", "for"],["Keep the comma after the subordinate opening.", "The new location begins the requested fresh sentence.", "A comma plus “for” introduces evidence supporting the preceding judgement."],["When the rescuers reached the rock", "Pip stood up", "at the bakery, the mender rested beside the oven. The return had been slow", "the carriers had stopped on the steep stretches."],["After the neighbours brought everyone back", "they put down their lamps", "inside the bakery, supper was heating. The mender still needed support", "she could not put weight on her ankle."]);
task(5,"passage-observation-and-result","Keep the paired commas. Add a coordinating conjunction making the contradiction a reason for further questions. Preserve the existing sentence boundary.",["comma", "comma", "so"],["Keep the opening comma around extra information.", "Keep the closing comma before the main verb.", "A comma plus “so” links the discovery to the action it prompts."],["The mender", "who had met Bram that afternoon", "remembered his warning. Her account contradicted his claim", "Mara asked about his work at the bridge."],["The ferryman", "who had repaired the crossing", "recognised his blue mark. The timber was a bridge support", "he went to check the crossing."]);
task(5,"passage-warning-and-contrast","Preserve the paragraphs and sentence boundaries. Add a conjunction expressing contrast, then use a semicolon before the transition.",["but", "semi"],["A comma plus “but” makes the contrast explicit.", "A semicolon joins complete clauses before “therefore”; keep the comma after it."],["Bram had helped the travellers", "his help did not explain the missing timber.\n\nThe shavings alone did not identify their source", "therefore, the rabbits needed further evidence."],["The storm had battered the bridge", "it could not explain the saw marks.\n\nThe support had been cut", "therefore, the damage could not be blamed entirely on the weather."]);
task(5,"passage-reassurance-and-choice","Keep the opening comma and existing conjunction. Add a conjunction presenting the explanations as alternatives, not established facts.",["comma", "comma", "or"],["Keep the comma after the subordinate opening.", "The existing “but” already joins the complete clauses.", "A comma plus “or” presents two possible explanations as alternatives."],["Although the shavings were fresh", "their source was uncertain. Pip suspected wrongdoing", "but Mara wanted stronger evidence.\n\nThe wood could have come from an authorised repair", "someone could have removed it without permission."],["Although Bram had stayed with the travellers", "his earlier claim needed checking. Mara remembered the mender’s words", "but she still asked about the timber.\n\nThe disagreement could reflect a mistake", "it could reveal a deliberate lie."]);
task(5,"final-case-report","Keep the dependent opening and paired commas. Use a semicolon between the physical observations. Add a conjunction showing the result. Start a new sentence at “Later that week”.",["comma", "comma", "comma", "semi", "so", "stop"],["Keep the comma after the subordinate opening.", "Keep the comma opening extra information.", "Keep the comma closing extra information.", "These are complete observations; the requested semicolon joins them.", "A comma plus “so” marks the result.", "A full stop marks the requested later time; capitalise “Later”."],["Although Bram blamed the storm", "the physical evidence showed deliberate removal. The timber", "which bore a blue repair mark", "lay inside the mill", "the remaining brace had saw marks.\n\nThe bridge was unsafe", "the neighbours closed both approaches. The village examined what had happened", "later that week, a new caretaker took over."],["Although the rescue had succeeded", "questions remained. The mender", "who had spoken to Bram that afternoon", "remembered his warning", "Bram had denied visiting the crossing.\n\nTheir accounts conflicted", "Mara asked another question. The villagers investigated the missing timber", "later that week, Bram began helping to pay for repairs."]);
for(const q of tasks[23])q.grammar=[['comma'],['comma','stop','semi'],['comma']];
// Semicolons can separate list items, but are not the requested ordinary-list edit.
tasks[3].forEach(t=>t.grammar=[['comma','semi'],['comma','semi']]);
export const STORY=tasks.map(x=>x[0]);
export const TRANSFER=tasks.map(x=>x[1]);
export const BONUS=[
{id:'b1',stage:4,skill:'mixed',structure:'bonus-fronted-within-paragraph',brief:'Keep the fronted location phrase attached. Link the two complete observations in one sentence using punctuation only.',parts:['Beside the signal rock','a lantern lit the map','its line followed the higher route.'],valid:[['comma'],['semi']],grammar:[['comma'],independent],why:['Beside the signal rock is a location phrase, not a complete sentence.','Both observations are complete. Use a semicolon for the requested link.'],options:all,kind:'paragraph'},
{id:'b2',stage:3,skill:'connectors',structure:'bonus-instead-transition',brief:'Keep one sentence and every word. Repair the join before INSTEAD with punctuation only.',parts:['Bram had not taken the bell home','instead, he had carried it towards the flooded crossing.'],valid:[['semi']],grammar:[['stop','semi']],why:['Instead is a transition. It needs a semicolon before it when these complete clauses stay in one sentence.'],options:all,kind:'sentence'},
{id:'b3',stage:5,skill:'paragraph',structure:'bonus-where-clause',brief:'Keep the WHERE opening attached. Use AND to add the second action; begin a new sentence at the later time “At sunrise”.',parts:['Where the path reached the village','Pip walked beside Mara. The baker opened the door','the neighbours brought the stretcher inside','at sunrise, the village began to stir.'],valid:[['comma'],['and'],['stop']],grammar:[['comma'],independent,independent],why:['Where introduces a dependent location clause.','And adds the neighbours’ action.','At sunrise starts a new point in the timeline.'],options:all,kind:'paragraph'}
];
export const BANK=[...STORY,...TRANSFER,...BONUS];

// Detailed goals are hint metadata, never displayed before a hint is requested.
const STUDENT_BRIEFS=['Start a fresh sentence when the view moves from the square to the mill. Keep every word.', 'Keep one sentence. Edit only what its structure requires.', 'Keep the two observations together in one sentence, using punctuation alone.', 'Keep the inventory as a single sentence with an ordinary list.', 'Keep the whole account in one sentence, using punctuation alone.', 'Combine the discoveries into one sentence. Use a coordinating joining word to present them as additional findings.', 'Keep one sentence. Use a coordinating joining word to make the contrast between the evidence and the empty path explicit.', 'Keep one sentence. Use a coordinating joining word to make the second action a result of the first discovery.', 'Keep one sentence. Use a coordinating joining word to present two alternative courses of action.', 'Keep both observations in one sentence, using punctuation alone.', 'Keep one sentence. Use a coordinating joining word to introduce the evidence supporting the suspicion.', 'Keep one sentence. Add the second negative statement without changing its word order.', 'Keep one sentence. Use a coordinating joining word to emphasise the unexpected contrast.', 'Keep the findings in one sentence, using punctuation alone.', 'Keep one sentence and every word. Link the observations with punctuation alone.', 'Keep one sentence and all its words. Edit punctuation where needed.', 'Keep the whole account in one sentence. Change punctuation only.', 'Keep one sentence and every word. Change punctuation only.', 'Keep one sentence. Use a coordinating joining word to make the contrast between the routes explicit.', 'Start a fresh sentence when the account moves from the written record to the investigation outside.', 'Preserve the existing sentence boundaries. Use a coordinating joining word to make the blocked view lead explicitly to its consequence.', 'Start a fresh sentence at the later time. Keep all words.', 'Keep two sentences and every word. Connect the ideas with punctuation alone.', 'Edit only what needs changing. Preserve the wording, joining words and existing sentence boundaries.', 'Keep two sentences. Add the second negative without changing its word order; connect the later observations with punctuation alone.', 'Start a fresh sentence when the account moves to the next location. Use a coordinating joining word to introduce the evidence for the final judgement. Keep the remaining boundaries.', 'Preserve the existing sentence boundaries. Use a coordinating joining word to make the damaged crossing lead explicitly to the safer route.', 'Preserve the paragraphs and sentence boundaries. Use a coordinating joining word to make the first contrast explicit; repair the remaining join with punctuation alone.', 'Preserve the paragraphs, wording and sentence boundaries. Use a coordinating joining word to present the travellers’ final options as alternatives.', 'Keep the descriptions attached to their main clauses. Link the paired observations with punctuation alone; make the warning lead explicitly to its result with a coordinating joining word. Start a fresh sentence at the final change of scene.'];
const BONUS_BRIEFS=['Keep one sentence and every word. Connect the observations with punctuation alone.', 'Keep one sentence and every word. Change punctuation only.', 'Use a coordinating joining word to present the two actions as additional events. Start a fresh sentence at sunrise; preserve the earlier boundary.'];
for(const q of BANK){
 if(['m29','r29'].includes(q.id))q.grammar[1]=['comma','stop','semi'];
 q.studentBrief=q.stage<=5&&!q.id.startsWith('b')?q.brief:q.id.startsWith('b')?BONUS_BRIEFS[Number(q.id.slice(1))-1]:STUDENT_BRIEFS[Number(q.id.slice(1))-1];
 q.goal={sentences:(q.parts.join(' ').match(/[.!?](?=\s|$)/g)||[]).length+q.valid.filter(v=>v[0]==='stop').length,conjunctions:[...new Set(q.valid.map(v=>v[0]).filter(t=>!['comma','stop','semi'].includes(t)))]};
}
