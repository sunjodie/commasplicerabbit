import {readingPages} from './chapter-one.js?v=20261022-simulator-feedback1';
export const CHAPTER_FIVE=[
  {
    "id": "m21",
    "stage": 4,
    "title": "The higher path",
    "location": "The old steps",
    "mood": "calm",
    "paragraphs": [
      "Before they left, the baker put a lantern in her window for anyone returning by the village road. A neighbour brought folded canvas and two stout poles from the fair stalls. Pip followed the ferryman between the gardens, with Mara beside her and the other lamps bobbing behind. At the last turn, the warm square in the bakery window disappeared among the trees.",
      "Beneath the brambles were old stone steps, edged with ferns and worn into shallow hollows. The adults cut back the thorns and passed the stems carefully from paw to paw. Beyond the steps, a fallen limb of the beech blocked the narrow track. Its trunk leaned into the bushes, with smaller branches caught beneath it.",
      "Just before the obstruction, a broad rock overlooked the opposite slope. The ferryman checked the ground before letting Pip and the baker stand beside it. Across the gorge, a bell rang three times. Pip raised the oil lamp she had carried from the mill and found a small light beneath a rocky overhang."
    ]
  },
  {
    "id": "m22",
    "stage": 4,
    "title": "An answering light",
    "location": "The signal rock",
    "mood": "calm",
    "paragraphs": [
      "“Bram!” Pip called, with both paws cupped beside her mouth.",
      "The ringing stopped. Far below, a branch crashed against the stones, and for a moment the rush of water seemed to fill the whole valley. Then three more strokes came through the rain.",
      "Pip wanted to call that an answer. But the bell had been ringing before she shouted too.",
      "“We can see your light!” she called. She raised and lowered her lamp twice, waited, then did it once more. Across the gorge, the small light moved twice, paused, and moved again.",
      "“They can see us,” Mara said.",
      "A voice followed, broken by the water and the distance. Pip caught “three of us”, then something she could not understand, and finally “can't walk”. She could not recognise the speaker.",
      "“Stay at the shelter!” the ferryman called. “We're coming round!”"
    ]
  },
  {
    "id": "m23",
    "stage": 4,
    "title": "Two useful jobs",
    "location": "The signal rock",
    "mood": "calm",
    "paragraphs": [
      "The ferryman returned to the fallen limb, where the saw began its steady rasp. From the rock, the shelter looked almost close enough to touch. Between it and Pip's lamp, the gorge fell away into darkness full of water.",
      "Mara brought out her paper lantern. She had blown out its candle before the narrow path beyond the shed and tucked it beneath her coat; the corners had crumpled when she pulled Pip away from the bank. Now she eased them apart and lit the wick from the oil lamp. Amber light filled the little windows.",
      "“I can hold the map for you,” she told the ferryman. “There's another fork after Alder Arch.”",
      "He passed it to her. “Stay between us, and tell me when we're near the turning.”",
      "Pip wanted to go too. She had followed the prints and called across the gorge, and she wanted to see who would stand up when the rescuers arrived. Then the shelter light dipped out of sight. She lifted her lamp, and it rose again.",
      "“I'll stay here,” she said. “They'll know we haven't gone away.”"
    ]
  },
  {
    "id": "m24",
    "stage": 4,
    "title": "Across Alder Arch",
    "location": "The signal rock",
    "mood": "calm",
    "paragraphs": [
      "The baker stayed with Pip while the others rolled the sawn length clear. Wet sawdust clung to the ferryman's boots. Beyond the obstruction, the lamps began to climb, disappearing behind trees and appearing again a little higher.",
      "Whenever the shelter light moved, Pip answered. Between signals, the baker helped her rest the lamp on the broad rock and wrapped a dry scarf around her shoulders. Pip could feel the warmth gathering beneath her wet cape.",
      "Further up the gorge, the search party appeared in a row across the high stone bridge. Mara's small paper lantern travelled between two larger lamps. Then the opposite hillside hid them.",
      "Pip watched until her eyes watered. At last, new lights gathered beneath the overhang. A voice called that they had found Bram and both travellers. The mender had hurt her ankle. They were bringing her back."
    ]
  },
  {
    "id": "m25",
    "stage": 4,
    "title": "What Mara noticed",
    "location": "Quarry Shelter",
    "mood": "calm",
    "paragraphs": [
      "Later, Mara would tell Pip how Bram had risen when the lamps reached the shelter. His coat was muddy, and the mender sat with her ankle wrapped beside the apprentice's work case. A long rope ran between two trees along the slippery slope below them.",
      "Bram said he had fixed it there so the apprentice could help the mender climb to the overhang. It had given them something to hold, but it could not make her able to walk the steep path to Alder Arch.",
      "As the neighbours unfolded their canvas, Bram began talking about the bridge. “The storm took the support away. I hadn't been down to the crossing since yesterday morning. I knew nothing was wrong until I heard them calling tonight.”",
      "The mender looked up. “But you stopped us there this afternoon. You were on the far approach. You told us to take Alder Arch because you were doing work underneath.”",
      "“I meant I hadn't crossed it,” Bram said quickly. He bent to help with the canvas before she could answer.",
      "Mara held the lamp steady while the ferryman secured the stretcher. She did not interrupt. But she kept the two statements separate in her mind: Bram had said he had not been to the crossing; the mender said he had spoken to her there. They could ask again when everyone was warm."
    ]
  }
];
export function chapterFiveScene(q){return q&&!q.remedial?CHAPTER_FIVE.find(x=>x.id===q.id)||null:null;}
function reader(s){const old=s.chapterFive||{},ids=new Set(CHAPTER_FIVE.map(x=>x.id));return {version:1,read:Array.isArray(old.read)?[...new Set(old.read.filter(x=>ids.has(x)))]:[],positions:Object.fromEntries(CHAPTER_FIVE.map(scene=>[scene.id,Math.max(0,Math.min(readingPages(scene).length-1,Number.isInteger(old.positions?.[scene.id])?old.positions[scene.id]:0))]))};}
export function nextChapterFiveScene(s,q){if(!chapterFiveScene(q)||s.reviewRun||s.bonus)return null;const read=reader(s).read;return CHAPTER_FIVE.find(scene=>!read.includes(scene.id))||null;}
export function chapterFivePosition(s,id){return reader(s).positions[id]||0;}
export function setChapterFivePosition(s,id,page){const scene=CHAPTER_FIVE.find(x=>x.id===id);if(!scene)return;s.chapterFive=reader(s);s.chapterFive.positions[id]=Math.max(0,Math.min(readingPages(scene).length-1,Math.floor(Number(page)||0)));}
export function finishChapterFiveScene(s,id){if(!CHAPTER_FIVE.some(x=>x.id===id))return;s.chapterFive=reader(s);s.chapterFive.read=[...new Set([...s.chapterFive.read,id])];}
export function availableChapterFiveScenes(s){if(s.story<20)return [];const read=reader(s).read;const next=CHAPTER_FIVE.findIndex(scene=>!read.includes(scene.id));return CHAPTER_FIVE.filter((scene,i)=>s.story>=25||read.includes(scene.id)||i===(next<0?4:next));}
