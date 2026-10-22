// Chapter 4: sequence, a possible route and the limits of the evidence.
import {readingPages} from './chapter-one.js?v=20261022-natural-prose1';
export const CHAPTER_FOUR=[
  {
    "id": "m16",
    "stage": 3,
    "title": "Back beneath the awning",
    "location": "The bakery awning",
    "mood": "calm",
    "paragraphs": [
      "The bakery windows were still bright when they reached the square. Steam had clouded the upper panes, and through the open door Pip could see a tray of buns cooling beneath a cloth. Two neighbours were carrying the last tables inside while the baker held the door with her hip, calling instructions over the scrape of the legs on the stones.",
      "Pip tried to tell her everything at once. She began with the torn strip of green cloth they had left at the mill, then jumped to the missing bell, and she was halfway through describing the muddy floor when Mara interrupted to explain about the bridge. As soon as the baker understood, she stepped away from the door and guided them under the awning.",
      "“Stay here, both of you,” she said. “I'll get someone.”",
      "Within a few minutes, villagers were gathering with lanterns and coats pulled over their fair clothes. One neighbour went to Bram's cottage beside the mill, and the ferryman arrived with a saw. The ordinary clatter of getting ready steadied Pip enough to spread the map across a flour sack without spilling the cup of warm apple juice the baker had set beside her."
    ]
  },
  {
    "id": "m17",
    "stage": 3,
    "title": "Two accounts",
    "location": "The bakery awning",
    "mood": "calm",
    "paragraphs": [
      "“I heard that bell,” the baker said. “Just after the clock struck twelve. Down towards the footbridge.”",
      "“I heard it up on the hillside,” the ferryman told her, setting the saw against the wall. “Above the bend.”",
      "Pip looked from one to the other. She could picture the path between the bridge and the trees, with the water hiding the lower part of it, but she could no longer picture Bram walking there. In her mind the bell travelled through the dark without him, ringing among branches that would have caught its strap if anybody had been carrying it.",
      "“Are you certain?” Mara asked the ferryman.",
      "“Yes,” he said. “The quarter past twelve had just struck when I finished helping with the crates. I went down to the landing and tied up the punt, and then I heard it. No one's taking a boat out again until that water goes down.”",
      "The baker was certain too. She had been closing her upstairs shutters when the sound reached her and had glanced at the clock, which still showed only a few minutes past midnight. Afterwards, she had come back down to help finish packing away the tables.",
      "“I thought he was playing one of his jokes,” she admitted, looking out towards the mill."
    ]
  },
  {
    "id": "m18",
    "stage": 3,
    "title": "Time between the sounds",
    "location": "The bakery awning",
    "mood": "calm",
    "paragraphs": [
      "Mara smoothed a crease in the map. The longer she studied it, the more Pip wanted her to say something, even if it was only to ask another question.",
      "“What are you thinking?” Pip asked.",
      "“Were you still helping with the crates when she shut her shutters?” Mara asked the ferryman.",
      "“That's right,” he replied. “She called goodnight from upstairs. We still had the last stack to put away.”",
      "“So she heard it before you'd finished the crates, and you heard it after,” Mara said. “It could have been in both places. Someone had time to carry it uphill.”",
      "Pip heard the words again, this time with a space between the two sounds. There had been time for footsteps in that space, even if nobody had seen who was walking.",
      "“It sounded higher up when we were at the shed too,” Mara added. She placed a claw beside the footbridge on the map and traced the path up the far bank until she reached a hatched patch marked Quarry Shelter. Pip leaned closer, seeing for the first time that the little shape above the lettering was a roof."
    ]
  },
  {
    "id": "m19",
    "stage": 3,
    "title": "The way round",
    "location": "The bakery awning",
    "mood": "calm",
    "paragraphs": [
      "“You think Bram carried it up there?” she asked.",
      "“He might have done,” Mara replied. “If he crossed before the bridge broke.”",
      "“The old shelter's above the flood line,” the ferryman said, bending over the map. “If he reached that bank, that's where he could have gone to get clear of the water.”",
      "“Can we get there?” the baker asked.",
      "“Round by Alder Arch,” he said. “It's the high stone bridge further up the gorge, well above the water. We climb on this bank, cross there and come back along the opposite hillside. I walked the lower stretch of the approach this afternoon, as far as the old steps.”",
      "“There are brambles right across the track,” Pip told him. “And a heavy branch beyond them, with smaller ones caught in the bushes.”"
    ]
  },
  {
    "id": "m20",
    "stage": 3,
    "title": "Supper for three",
    "location": "The bakery awning",
    "mood": "calm",
    "paragraphs": [
      "“That sounds like a limb from the beech beside the steps,” he said. “It leaned right over that path. We'll need the saw.”",
      "The neighbour returned from Bram's cottage while they were looking at the route. Nobody had answered the door, but through the kitchen window she had seen three clean bowls beside a covered pot, with chairs drawn up ready at the table.",
      "“He was expecting the mender and her apprentice,” the baker said, pressing a floury paw to her forehead. “He told me he'd kept some supper for them. I'd forgotten.”",
      "“They'd have come towards the footbridge, wouldn't they?” Pip asked.",
      "“Usually,” the ferryman said. “I didn't bring them over. My last passengers were across before the fair ended.”",
      "“Perhaps he went out to meet them,” Pip said.",
      "“We know he was expecting them,” Mara replied. “We don't know whether he found them.”",
      "Pip looked down at the little roof on the map. Bram might be up there with two other people, listening for someone to come, while she had been looking behind sacks and imagining the worst.",
      "“We should try the shelter,” she said. She moved her cup clear of the paper and folded the map along its old creases before passing it to the ferryman.",
      "“We'll go together,” he told her. “Keep close, both of you, and let us clear the way.”"
    ]
  }
];
export function chapterFourScene(q){return q&&!q.remedial?CHAPTER_FOUR.find(x=>x.id===q.id)||null:null;}
function reader(s){const old=s.chapterFour||{},ids=new Set(CHAPTER_FOUR.map(x=>x.id));return {version:1,read:Array.isArray(old.read)?[...new Set(old.read.filter(x=>ids.has(x)))]:[],positions:Object.fromEntries(CHAPTER_FOUR.map(scene=>[scene.id,Math.max(0,Math.min(readingPages(scene).length-1,Number.isInteger(old.positions?.[scene.id])?old.positions[scene.id]:0))]))};}
export function nextChapterFourScene(s,q){if(!chapterFourScene(q)||s.reviewRun||s.bonus)return null;const read=reader(s).read;return CHAPTER_FOUR.find(scene=>!read.includes(scene.id))||null;}
export function chapterFourPosition(s,id){return reader(s).positions[id]||0;}
export function setChapterFourPosition(s,id,page){const scene=CHAPTER_FOUR.find(x=>x.id===id);if(!scene)return;s.chapterFour=reader(s);s.chapterFour.positions[id]=Math.max(0,Math.min(readingPages(scene).length-1,Math.floor(Number(page)||0)));}
export function finishChapterFourScene(s,id){if(!CHAPTER_FOUR.some(x=>x.id===id))return;s.chapterFour=reader(s);s.chapterFour.read=[...new Set([...s.chapterFour.read,id])];}
export function availableChapterFourScenes(s){if(s.story<15)return [];const read=reader(s).read;const next=CHAPTER_FOUR.findIndex(scene=>!read.includes(scene.id));return CHAPTER_FOUR.filter((scene,i)=>s.story>=20||read.includes(scene.id)||i===(next<0?4:next));}
