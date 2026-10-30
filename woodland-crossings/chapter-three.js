// Chapter 3: the bridge, the unstable bank and a safer decision.
import {readingPages} from './chapter-one.js?v=20261030-book-unlock2';
export const CHAPTER_THREE=[
  {
    "id": "m11",
    "stage": 2,
    "title": "Beyond the shed",
    "location": "The near-bank path",
    "mood": "tense",
    "paragraphs": [
      "Beyond the shed, the path narrowed between the stream and a steep bank threaded with hazel roots. Willow blew out her paper lantern and let the wick cool before tucking it beneath her coat. She handed the oil lamp back to Poppy so she could unfold the map. On a walk here before the rain, Poppy had kicked through dry yellow leaves while Willow complained about the ones that landed in her boots. Now those leaves lay plastered against the roots in sodden heaps, and the lower stepping stones had disappeared beneath brown water.",
      "Poppy kept the lamp close to the ground so she could follow the prints. Each time she found another, a little of her certainty returned. She was sure Bram had walked this way, carrying the bell, and that if they stayed with the marks they would come to wherever he had gone.",
      "“Poppy, if Bram crossed out the bridge, he may have meant us to avoid it,” Willow said, sheltering the map beneath an overhanging branch.",
      "“Perhaps he didn't want anyone following him,” Poppy replied, watching the light creep into the next footprint.",
      "Willow looked up from the map, and Poppy heard how it sounded: as if Bram hadn’t wanted them to follow. She had meant someone else, but she couldn’t say who.",
      "“We should go back,” Willow said. “There are still people in the square. Someone might know where he went.”",
      "Before Poppy could answer, wood knocked against wood around the bend. She hurried towards the noise. “Poppy!” Willow called behind her, still trying to fold the wet map without tearing it."
    ]
  },
  {
    "id": "m12",
    "stage": 2,
    "title": "The hollow knocking",
    "location": "The lower footbridge",
    "mood": "tense",
    "paragraphs": [
      "The bridge came into view through a curtain of willow branches. Its near end was still fixed to the bank, and for a moment Poppy saw the familiar handrail and felt foolish for being afraid. Then the light reached the middle, where two planks were missing and a broken rail dipped into the water. Each time the current lifted it, it struck the underside of the bridge with a dull, hollow knock.",
      "Poppy stepped closer, trying to see whether the footprints continued onto the remaining boards. Under her boot, the mud shifted with a soft sucking sound, and before she could draw back something caught her hard across the shoulders.",
      "Willow had seized her cape. Poppy stumbled against her as the lamp swung sideways, throwing a great yellow arc across the roots and water. A piece of bank broke away from the place where she had been standing and slid into the stream, carrying a tuft of grass that turned over once before it vanished."
    ]
  },
  {
    "id": "m13",
    "stage": 2,
    "title": "Where Poppy had stood",
    "location": "The hazel bank",
    "mood": "tense",
    "paragraphs": [
      "They backed along the path with Willow still gripping the cape. Only when they reached the hazel bank did she let go, and even then Poppy could feel where the cloth had pulled tight beneath her chin.",
      "“I was trying to tell you,” Willow said, her voice unsteady. “You didn't even wait.”",
      "Poppy looked down at the lamp instead of answering. Mud speckled its glass, and her paws shook as she tried to wipe it away with the clean part of her cuff.",
      "“I'm sorry,” she said. “I thought I could see where he'd gone.”",
      "Willow stood close enough for their shoulders to touch while she caught her breath. When she took out the map again, Poppy held the lamp above it and waited for her to find the bridge."
    ]
  },
  {
    "id": "m14",
    "stage": 2,
    "title": "Listening again",
    "location": "Above the broken crossing",
    "mood": "tense",
    "paragraphs": [
      "“If Bram made that mark, he may have known there was something wrong with the bridge,” Willow said.",
      "“The message wasn't finished either,” Poppy replied, remembering the pen lying in its own ink. “It looks as though whoever wrote it left in a hurry.”",
      "They listened for the bell, but for a while all they heard was the stream working at the bridge. Water slapped the boards, loose wood knocked against the supports, and rain moved through the leaves above them in sudden waves. When the ringing finally came, Poppy turned towards the far bank, then looked over her shoulder because she could no longer be sure where it had begun."
    ]
  },
  {
    "id": "m15",
    "stage": 2,
    "title": "The higher path",
    "location": "The fingerpost",
    "mood": "tense",
    "paragraphs": [
      "On their way back, Willow found the entrance to the higher path beneath a leaning wooden fingerpost. Moss had grown thickly over the lettering, leaving only Arch clear at the end. Behind it, brambles stretched from one side of the track to the other, their hooked stems gleaming where the lamp touched them. Further in, a heavy branch lay across the path, with smaller limbs caught in the undergrowth beyond it.",
      "“We aren't going in there on our own,” Willow said, folding the map away.",
      "Poppy raised the lamp for one last look. Nothing moved beyond the thorns, though the woods seemed to go on a great deal further than they had in daylight. She waited until Willow was ready, and together they followed the near-bank path back past the mill towards the village."
    ]
  }
];
export const CHAPTER_THREE_REFLECTION={
  "id": "c3-waiting",
  "title": "Waiting at the fingerpost",
  "context": "Poppy hurried ahead at the bridge. At the fingerpost, she waited until Willow was ready before they returned together.",
  "prompt": "What does this change most strongly suggest about Poppy?",
  "answer": "together",
  "options": [
    {
      "id": "certain",
      "text": "She has decided that none of her own observations can be trusted.",
      "feedback": "Waiting for Willow does not mean Poppy has stopped trusting every observation she makes."
    },
    {
      "id": "together",
      "text": "She is beginning to take Willow’s caution seriously and act together.",
      "feedback": "At the bridge she hurried ahead; at the fingerpost she waits for Willow."
    },
    {
      "id": "abandon",
      "text": "She waits only because she is frightened, rather than because she is listening to Willow.",
      "feedback": "Fear may play a part, but “only” dismisses her apology and her decision to wait for Willow."
    }
  ],
  "why": "Poppy’s behaviour changes from rushing ahead to waiting for Willow. This supports a small shift towards listening and acting together; it does not show that she distrusts every observation or that fear is her only reason for waiting."
};
export function chapterThreeScene(q){return q&&!q.remedial?CHAPTER_THREE.find(x=>x.id===q.id)||null:null;}
function reader(s){const old=s.chapterThree||{},ids=new Set(CHAPTER_THREE.map(x=>x.id));return {version:1,read:Array.isArray(old.read)?[...new Set(old.read.filter(x=>ids.has(x)))]:[],positions:Object.fromEntries(CHAPTER_THREE.map(scene=>[scene.id,Math.max(0,Math.min(readingPages(scene).length-1,Number.isInteger(old.positions?.[scene.id])?old.positions[scene.id]:0))]))};}
export function nextChapterThreeScene(s,q){if(!chapterThreeScene(q)||s.reviewRun||s.bonus)return null;const read=reader(s).read;return CHAPTER_THREE.find(scene=>!read.includes(scene.id))||null;}
export function chapterThreePosition(s,id){return reader(s).positions[id]||0;}
export function setChapterThreePosition(s,id,page){const scene=CHAPTER_THREE.find(x=>x.id===id);if(!scene)return;s.chapterThree=reader(s);s.chapterThree.positions[id]=Math.max(0,Math.min(readingPages(scene).length-1,Math.floor(Number(page)||0)));}
export function finishChapterThreeScene(s,id){if(!CHAPTER_THREE.some(x=>x.id===id))return;s.chapterThree=reader(s);s.chapterThree.read=[...new Set([...s.chapterThree.read,id])];}
export function availableChapterThreeScenes(s){if(s.story<10)return [];return CHAPTER_THREE.filter(scene=>Number(scene.id.slice(1))<=s.story||s.chapterThree?.read?.includes(scene.id)||s.storyOpened?.includes(scene.id));}
