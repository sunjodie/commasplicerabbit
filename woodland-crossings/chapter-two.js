// Approved Chapter 2. Read the investigation before editing its notebook.
import {readingPages} from './chapter-one.js?v=20261022-consistency14-1';
export const CHAPTER_TWO=[
  {
    "id": "m6",
    "stage": 1,
    "title": "The sound beyond the stream",
    "location": "The mill’s lower room",
    "mood": "calm",
    "paragraphs": [
      "The village clock began to strike twelve. As its last chime faded, a bell rang beyond the stream. Pip tightened her grip on the torn strip of green cloth until cold water squeezed between her paws. She knew that bell well enough to recognise the slight rattle that followed each stroke. There was a small chip in its lip; she had caught a claw on it once while helping Bram polish the brass. The sound came from beyond the stream, and with the empty hook in front of her it sounded wrong.",
      "Mara turned up the lamp and lifted it from the stair. A little smoke curled from the wick before the flame steadied, bringing the mill’s lower room into view. Bram worked here, though he lived in the cottage beside the mill. There was the wooden crate Bram sat on to change his boots, with a bundle of reeds tucked behind it and the dented watering can he had been promising to mend since spring. Everything was familiar except the mud. Deep prints crossed the boards, and at the foot of the stairs one heel had slipped far enough to leave a brown smear against the first riser.",
      "“He went out in a hurry,” Pip said.",
      "“He might have been coming in,” Mara pointed out. “We don’t know yet.”",
      "Pip looked at the cloth and imagined Bram being pulled backwards through the doorway, trying to catch hold of something while his sleeve tore. The picture came so readily that she almost told Mara, but she had only the picture, not a reason."
    ]
  },
  {
    "id": "m7",
    "stage": 1,
    "title": "The open chest",
    "location": "The upper room",
    "mood": "calm",
    "paragraphs": [
      "They climbed to the upper room, where the air smelled of old grain and the sweet, dusty straw packed between the rafters. Rain tapped against the window above an open storage chest. Its lid rested against the wall, and two clean tracks ran across the dusty boards from the place where the chest usually stood. The chest stood across the narrow space beneath the sloping roof, hiding the floor behind it. Inside, among folded sacks and a few coils of twine, a pale circle showed where Bram kept his long rope.",
      "Pip went to the window while Mara held the lamp behind her. At first she could see only the flame and her own wide eyes, but when she cupped her paws around her face the far bank emerged between the reflections. Something pale shifted among the branches, disappeared, then moved again in the same place.",
      "“Can you see him?” Mara asked.",
      "“No, it’s only a branch,” Pip said at last, drawing away from the cold glass."
    ]
  },
  {
    "id": "m8",
    "stage": 1,
    "title": "The unfinished note",
    "location": "Bram’s desk",
    "mood": "calm",
    "paragraphs": [
      "Downstairs, they found Bram’s map spread across his desk beneath a jar of pencils. Its corners had curled with age, and the stream wandered through the middle in a thin blue line, much tidier than the water they could hear outside. Somebody had crossed out the low footbridge in thick black ink and drawn a new route up the valley, past a crossing labelled Alder Arch and back along the opposite hillside.",
      "Mara passed the oil lamp to Pip and lifted the map. “Someone’s drawn something on here,” she said, bringing it closer to the light.",
      "Pip leaned over her shoulder. Whoever had crossed out the bridge had pressed so hard that the pen had nearly worn through the paper.",
      "“Wouldn’t he have left us a note?” she asked.",
      "Beside the map lay a sheet headed Please don’t use the. The words stopped in the middle of the line, with the rest of the line left blank. Bram’s pen lay across the page, its nib resting in a dark blot that had spread into the paper fibres.",
      "“Please don’t use the,” Pip read aloud.",
      "“The what?” Mara asked.",
      "Pip looked from the unfinished words to the crossed-out bridge.",
      "“He hasn’t said.”",
      "Mara checked that the map’s ink was dry, folded it along its old creases and slipped it inside her coat. Pip repeated the unfinished words to herself. Before they left, she laid the wet cloth along the edge of the desk, clear of the papers, so Bram would see it if he came back."
    ]
  },
  {
    "id": "m9",
    "stage": 1,
    "title": "Circular marks",
    "location": "The streambank",
    "mood": "calm",
    "paragraphs": [
      "Outside, a loose shutter knocked against the wall beside the porch. Pip watched it strike the stone again and recognised the sound they had heard from the doorway. The lamp picked out a trail of bootprints leading from the porch towards the stream. Rain had softened their edges. Beside the porch, however, a circular mark lay deep in the mud beneath the shelter of the eaves. It was about the width Pip remembered the bell’s rim being.",
      "She crouched beside it. A little gap interrupted the edge of the circular mark.",
      "“Could that be from the bell?” she asked, holding the lamp low. “There’s a chip in the lip.”",
      "Mara bent to look.",
      "“It could be,” she said. “Let’s see if there’s another.”",
      "They found a second circular mark beneath the reeds, where the overhanging leaves had kept off some of the rain. A pair of deeper bootprints stood beside it. Water had begun to gather in the heels, reflecting two small flames when Pip passed the lamp over them.",
      "“Someone must have put something down here,” Mara said.",
      "Pip looked towards the trees beyond the stream. She tried to picture Bram carrying the bell, but from where she stood she could not see where the prints led next.",
      "A rustling further along made Pip straighten so quickly that her knees hurt, but the light showed only reed heads brushing against one another. She walked on with Mara and tried not to keep looking behind them."
    ]
  },
  {
    "id": "m10",
    "stage": 1,
    "title": "Higher up",
    "location": "The tool shed",
    "mood": "calm",
    "paragraphs": [
      "The tool shed stood open beside the path. Pip passed the oil lamp to Mara so she could lift it above the workbench. Its roof dripped onto a row of empty flowerpots, and in the lamplight they saw Bram’s spare boots waiting neatly beneath his workbench. Pip looked behind a pile of sacks before she could stop herself.",
      "“That sounded higher up,” Mara said when the bell rang again, turning towards the trees above the far bank.",
      "“Bram says sound travels strangely in the rain,” Pip replied.",
      "She wished she had not said his name. Mara was still listening, with one ear turned towards the woods, and neither of them could stop listening for the next stroke."
    ]
  }
];
export function chapterTwoScene(q){return q&&!q.remedial?CHAPTER_TWO.find(x=>x.id===q.id)||null:null;}
function reader(s){const old=s.chapterTwo||{},ids=new Set(CHAPTER_TWO.map(x=>x.id));return {version:1,read:Array.isArray(old.read)?[...new Set(old.read.filter(x=>ids.has(x)))]:[],positions:Object.fromEntries(CHAPTER_TWO.map(scene=>[scene.id,Math.max(0,Math.min(readingPages(scene).length-1,Number.isInteger(old.positions?.[scene.id])?old.positions[scene.id]:0))]))};}
export function nextChapterTwoScene(s,q){if(!chapterTwoScene(q)||s.reviewRun||s.bonus)return null;const read=reader(s).read;return CHAPTER_TWO.find(scene=>!read.includes(scene.id))||null;}
export function chapterTwoPosition(s,id){return reader(s).positions[id]||0;}
export function setChapterTwoPosition(s,id,page){const scene=CHAPTER_TWO.find(x=>x.id===id);if(!scene)return;s.chapterTwo=reader(s);s.chapterTwo.positions[id]=Math.max(0,Math.min(readingPages(scene).length-1,Math.floor(Number(page)||0)));}
export function finishChapterTwoScene(s,id){if(!CHAPTER_TWO.some(x=>x.id===id))return;s.chapterTwo=reader(s);s.chapterTwo.read=[...new Set([...s.chapterTwo.read,id])];}
export function availableChapterTwoScenes(s){if(s.story<5)return [];const read=reader(s).read;const next=CHAPTER_TWO.findIndex(scene=>!read.includes(scene.id));return CHAPTER_TWO.filter((scene,i)=>s.story>=10||read.includes(scene.id)||i===(next<0?4:next));}
