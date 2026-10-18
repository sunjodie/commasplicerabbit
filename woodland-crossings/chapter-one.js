// Chapter 1 narration from STORY.md, including the timber clue for the revised mystery.
export const CHAPTER_ONE=[
 {
  "id": "m1",
  "title": "After the fair",
  "location": "The village square",
  "paragraphs": [
   "By the time Pip and Mara left the lantern fair, rain had begun to collect in the paper pumpkins hanging above the square. Their candlelight shone through the wet orange folds and trembled in the puddles below, where scraps of ribbon floated among the apple stalks. One pumpkin had sagged beneath the weight of the water, leaving a cheerful mouth beneath a rather unfortunate nose.",
   "Pip reached up to straighten it, balancing on the edge of the fountain so that her cape brushed the water.",
   "“Leave it,” Mara said. “You'll pull the whole string down.”",
   "“I'm only trying to straighten it,” Pip said.",
   "“You were trying to help at the cake stall too,” Mara reminded her.",
   "Pip folded the icing-stained cuff of her cape underneath and stepped down. All around them, the fair was being packed into boxes. The baker shook a shower of crumbs from her tablecloth while two neighbours struggled with a trestle table, and the last of the little painted boats bumped together in the fountain. From the open bakery door came a waft of baked apple and cinnamon that made Pip wish she had saved some of her money.",
   "Mara had tucked her handmade lantern beneath her moss-green coat, where its corners pressed awkwardly against her ribs. She had spent the afternoon cutting out its little windows, and whenever Pip came too close she turned sideways to protect it.",
   "They were passing the fountain when a light appeared across the stream.",
   "“Mara, look at the upstairs window,” Pip said, catching her sleeve."
  ],
  "notebook": "Pip’s notebook"
 },
 {
  "id": "m2",
  "title": "The upstairs light",
  "location": "Across the stream",
  "paragraphs": [
   "The old mill stood beyond the gardens with its lower walls hidden among the alders. In summer, water spilled from the wheel in silver threads, and the whole building hummed pleasantly enough to hear from the square. Now the wheel was black and still, its paddles clogged with leaves. It had stopped for winter a week earlier, and nobody had lit the upper room since.",
   "“Bram must still be working,” Mara said, following her gaze.",
   "“But his cottage was dark when we came past,” Pip said.",
   "“Perhaps he hasn't gone home yet,” Mara replied, drawing her sleeve free.",
   "Pip was about to answer when a broad head and shoulders passed between the light and the glass. She thought she recognised the high collar of Bram's green coat, but before she could be sure the figure bent down and disappeared below the windowsill. Something scraped across the floor with a long, uneven groan that carried between two gusts of rain.",
   "A narrow trail of pale shavings lay beneath the mill's side window. Rain had flattened the outer edge into the mud, but the wood tucked against the wall was still dry. Pip could smell it when the wind turned, a fresh, sharp smell that did not belong to the wet leaves.",
   "“What's he doing up there?” Pip asked.",
   "“We could ask him in the morning,” Mara suggested, looking back towards the bakery."
  ],
  "notebook": "Pip’s notebook"
 },
 {
  "id": "m3",
  "title": "Bram’s story",
  "location": "A remembered evening",
  "paragraphs": [
   "Pip knew why she wanted to go home. At the last fair, Bram had settled them beside his stove with hot cups between their paws and asked whether they knew the story of the mill bell. The cottage had smelled of drying socks and orange peel, and it had been easy to lean forward while he lowered his voice.",
   "If the bell rang after midnight, he had told them, someone would be missing before morning.",
   "When Pip asked who, Bram took his time choosing another log for the fire.",
   "“That depends who's listening,” he had said.",
   "Mara had refused to use the mill path for a week afterwards. Pip had taken it twice, although both visits had been in daylight and in the company of somebody considerably larger than herself.",
   "“It was a story,” Mara said now, as though Pip had mentioned it aloud.",
   "“I know it was,” Pip replied, keeping her eyes on the window.",
   "The light moved once more and vanished, leaving them with their own dim reflections in a puddle at their feet. Without it, the mill seemed to have drawn back into the trees. Pip could hear the stream rushing behind the garden wall, much louder than it had been on their way to the fair."
  ],
  "notebook": "Pip’s notebook"
 },
 {
  "id": "m4",
  "title": "The torn cuff",
  "location": "The mill porch",
  "paragraphs": [
   "“His cottage is the other way,” Mara said when Pip started down the mill lane.",
   "“He might need a hand,” Pip called over her shoulder, already picking her way between the puddles.",
   "Mara stayed beneath the dripping pumpkins for a moment before she tucked the lantern farther inside her coat and followed. The lane curled behind Bram's garden, where the wet rosemary brushed their knees and shed its sharp scent whenever Pip caught a branch. By the time they reached the porch, the warmth of the square had given way to the smell of damp wood and the steady dripping of the eaves.",
   "The front door stood ajar. A strip of green cloth was caught beneath the latch, its loose threads stirring whenever the wind found the gap.",
   "Pip lifted it into the light from the doorway and recognised the crooked yellow stitches along its edge. Bram had let her mend his cuff in the summer, sitting patiently with his arm on the kitchen table while she tried to make the two sides meet. She had hoped nobody else would notice how unevenly she had done it.",
   "“Bram?” she called, easing the cloth from the iron catch."
  ],
  "notebook": "Pip’s notebook"
 },
 {
  "id": "m5",
  "title": "The midnight bell",
  "location": "Inside the doorway",
  "paragraphs": [
   "Her voice travelled into the mill and received no answer. Mara pushed the door wider, revealing an oil lamp burning at the foot of the stairs and a pair of muddy tracks across the floor. Above the cold fireplace, the iron hook that held Bram's portable bell was empty, with a pale outline on the wall where its leather strap usually hung.",
   "They were still standing in the doorway when the village clock began to strike twelve. Its slow notes spread over the roofs and faded into the rain, and in the quiet after the last one, the mill bell rang from somewhere beyond the stream."
  ],
  "notebook": "The first case note"
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
