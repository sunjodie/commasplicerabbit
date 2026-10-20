// Approved Chapter 1. Art contains atmosphere rather than answer-bearing evidence.
export const CHAPTER_ONE=[
  {
    "id": "m1",
    "title": "After the fair",
    "location": "The village square",
    "mood": "calm",
    "paragraphs": [
      "By the time Pip and Mara left the lantern fair, rain had begun to collect in the paper pumpkins hanging above the square. Their candlelight shone through the wet orange folds and trembled in the puddles below, where scraps of ribbon floated among the apple stalks. One pumpkin had sagged beneath the weight of the water, leaving a cheerful mouth beneath a rather unfortunate nose.",
      "Pip reached up to straighten it, balancing on the edge of the fountain so that her cape brushed the water.",
      "“Leave it,” Mara said. “You’ll pull the whole string down.”",
      "“I’m only trying to straighten it,” Pip said.",
      "“You were trying to help at the cake stall too,” Mara reminded her.",
      "Pip folded the icing-stained hem of her cape underneath and stepped down. All around them, the fair was being packed into boxes. The baker shook a shower of crumbs from her tablecloth while two neighbours struggled with a trestle table, and the last of the little painted boats bumped together in the fountain. From the open bakery door came a waft of baked apple and cinnamon that made Pip wish she had saved some of her money.",
      "Mara had tucked her handmade lantern, still unlit, beneath her moss-green coat, where its corners pressed awkwardly against her ribs. She had spent the afternoon cutting out its little windows, and whenever Pip came too close she turned sideways to protect it.",
      "The baker came to the doorway with two folded blankets over her arm. “If you see the mender and her apprentice, tell them their room’s ready,” she called. “They usually come over the low bridge, but I haven’t seen them yet.”",
      "Pip promised she would, already hoping the visitors might bring one of the little clockwork animals the apprentice sometimes made from scraps.",
      "They were passing the fountain when a light appeared beyond the gardens, in the mill’s upper window.",
      "“Look,” Pip said, catching Mara’s sleeve. “Upstairs.”"
    ],
    "notebook": "Pip’s notebook"
  },
  {
    "id": "m2",
    "title": "The upstairs light",
    "location": "Beyond the gardens",
    "mood": "calm",
    "paragraphs": [
      "Alders hid the mill’s lower walls. In summer, water spilled from the wheel in silver threads, and the whole building hummed pleasantly enough to hear from the square. Now the wheel was black and still, its paddles clogged with leaves. It had stopped for winter a week earlier, and nobody had lit the upper room since.",
      "“Bram must still be working,” Mara said, following her gaze.",
      "“But his cottage was dark when we came past,” Pip said.",
      "“Then he’s still here, isn’t he?” Mara replied, drawing her sleeve free.",
      "As the village clock began to chime the quarter to twelve, a broad head and shoulders passed between the light and the glass. Pip thought she recognised the high collar of Bram’s green coat, but before she could be sure the figure bent down and disappeared below the windowsill. Something scraped across the floor with a long, uneven groan that carried between two gusts of rain.",
      "“What’s he doing up there?” Pip asked.",
      "“We could ask him in the morning,” Mara suggested, looking back towards the bakery."
    ],
    "notebook": "Pip’s notebook"
  },
  {
    "id": "m3",
    "title": "Bram’s story",
    "location": "A remembered evening",
    "mood": "calm",
    "paragraphs": [
      "Pip knew why Mara wanted to go home. At the last fair, Bram had settled them beside his stove with hot cups between their paws and asked whether they knew the story of the mill bell. The cottage had smelled of drying socks and orange peel, and it had been easy to lean forward while he lowered his voice.",
      "If the mill bell rang after midnight, he had told them, someone would be missing before morning. The mill bell was the little brass bell he kept above the mill fireplace, with a leather strap so that he could carry it to the bank when the water rose.",
      "When Pip asked who, Bram took his time choosing another log for the stove.",
      "“That depends who’s listening,” he had said.",
      "Mara had refused to use the mill lane for a week afterwards. Pip had taken it twice that week, although both visits had been in daylight and in the company of somebody considerably larger than herself.",
      "“It was a story,” Mara said now, as though Pip had mentioned it aloud.",
      "“I know it was,” Pip replied, keeping her eyes on the window.",
      "The light moved once more and vanished, leaving them with their own dim reflections in a puddle at their feet. Without it, the mill seemed to have drawn back into the trees. Pip could hear the stream rushing behind the garden wall, much louder than it had been on their way to the fair."
    ],
    "notebook": "Pip’s notebook"
  },
  {
    "id": "m4",
    "title": "The mill lane",
    "location": "The mill porch",
    "mood": "calm",
    "paragraphs": [
      "“He might need a hand,” Pip said, already picking her way down the mill lane between the puddles.",
      "Mara stayed beneath the dripping pumpkins for a moment before she tucked the lantern farther inside her coat and followed. The lane curled behind Bram’s cottage and continued towards the mill. No light showed beneath the cottage’s steep roof. Along the garden fence, wet rosemary brushed their knees and shed its sharp scent whenever Pip caught a branch. By the time they reached the mill porch, the warmth of the square had given way to the smell of damp wood and the steady dripping of the eaves.",
      "A narrow trail of pale shavings lay beneath the mill’s side window. Rain had flattened the outer edge into the mud, but the wood tucked against the wall was still dry. Pip could smell it when the wind turned, a fresh, sharp smell that did not belong to the wet leaves.",
      "The front door stood ajar. A strip of green cloth was caught beneath the latch, its loose threads stirring whenever the wind found the gap.",
      "Pip lifted it into the light from the doorway and recognised the crooked yellow stitches along its edge. Bram had let her mend the cuff of his green coat in the summer, sitting patiently with his arm on the kitchen table while she tried to make the two sides meet. She had hoped nobody else would notice how unevenly she had done it.",
      "“Bram?” she called, easing the cloth from the iron catch."
    ],
    "notebook": "Pip’s notebook"
  },
  {
    "id": "m5",
    "title": "The empty mill",
    "location": "Inside the doorway",
    "mood": "calm",
    "paragraphs": [
      "Her voice travelled into the mill and received no answer. Mara pushed the door wider, revealing an oil lamp burning at the foot of the stairs and muddy tracks across the floor. She took the lantern from beneath her coat and stepped inside, keeping its paper sides clear of the lamp as she touched her candle’s wick to the oil flame. Light filled the little windows she had cut so carefully, and she held the lantern clear of the door as Pip squeezed past. Above the cold fireplace, the iron hook that held the mill bell was empty, with a pale outline on the wall where its leather strap usually hung.",
      "Something knocked against the wall beyond the porch. Pip waited with the torn cloth caught between her paws, but no footsteps came down the stairs."
    ],
    "notebook": "Pip’s notebook"
  }
];

export function chapterOneScene(q){return q&&!q.remedial?CHAPTER_ONE.find(s=>s.id===q.id)||null:null;}
export function readingPages(scene,maxWords=85){
 const pages=[];let page=[],words=0;
 for(const paragraph of scene.paragraphs){const count=paragraph.split(/\s+/).length;if(page.length&&words+count>maxWords){pages.push(page);page=[];words=0;}page.push(paragraph);words+=count;}
 if(page.length)pages.push(page);return pages;
}
function reader(s){const old=s.chapterOne||{},ids=new Set(CHAPTER_ONE.map(x=>x.id));return {version:1,read:Array.isArray(old.read)?[...new Set(old.read.filter(x=>ids.has(x)))]:[],positions:Object.fromEntries(CHAPTER_ONE.map(scene=>[scene.id,Math.max(0,Math.min(readingPages(scene).length-1,Number.isInteger(old.positions?.[scene.id])?old.positions[scene.id]:0))]))};}
export function needsChapterOne(s,q){const scene=chapterOneScene(q);return !!scene&&!s.reviewRun&&!s.bonus&&!reader(s).read.includes(scene.id);}
export function storyPosition(s,id){return reader(s).positions[id]||0;}
export function setStoryPosition(s,id,page){const scene=CHAPTER_ONE.find(x=>x.id===id);if(!scene)return;s.chapterOne=reader(s);s.chapterOne.positions[id]=Math.max(0,Math.min(readingPages(scene).length-1,Math.floor(Number(page)||0)));}
export function finishStoryScene(s,id){if(!CHAPTER_ONE.some(x=>x.id===id))return;s.chapterOne=reader(s);s.chapterOne.read=[...new Set([...s.chapterOne.read,id])];}
export function availableStoryScenes(s){return CHAPTER_ONE.filter((_,i)=>i<=Math.min(4,Math.max(0,Number(s.story)||0)));}
