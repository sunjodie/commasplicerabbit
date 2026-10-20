import * as one from './chapter-one.js';
import * as two from './chapter-two.js';
import * as three from './chapter-three.js';
export const STORY_SCENES=[...one.CHAPTER_ONE,...two.CHAPTER_TWO,...three.CHAPTER_THREE];
export const readingPages=one.readingPages;
export const storyScene=q=>one.chapterOneScene(q)||two.chapterTwoScene(q)||three.chapterThreeScene(q);
export const needsStory=(s,q)=>one.needsChapterOne(s,q)||!!two.nextChapterTwoScene(s,q)||!!three.nextChapterThreeScene(s,q);
export const readingScene=(s,q)=>three.nextChapterThreeScene(s,q)||two.nextChapterTwoScene(s,q)||storyScene(q);
export const storyPosition=(s,id)=>idNumber(id)>10?three.chapterThreePosition(s,id):idNumber(id)>5?two.chapterTwoPosition(s,id):one.storyPosition(s,id);
export const setStoryPosition=(s,id,page)=>idNumber(id)>10?three.setChapterThreePosition(s,id,page):idNumber(id)>5?two.setChapterTwoPosition(s,id,page):one.setStoryPosition(s,id,page);
export const finishStoryScene=(s,id)=>idNumber(id)>10?three.finishChapterThreeScene(s,id):idNumber(id)>5?two.finishChapterTwoScene(s,id):one.finishStoryScene(s,id);
export const availableStoryScenes=s=>[...one.availableStoryScenes(s),...two.availableChapterTwoScenes(s),...three.availableChapterThreeScenes(s)];
function idNumber(id){return Number(id.slice(1));}
export function storyProseHTML(paragraph,escape){let html=escape(paragraph);if(paragraph.startsWith('Beside the map lay'))html=html.replace('Please don’t use the','<em>Please don’t use the</em>');if(paragraph.startsWith('Mara looked up from the map, and Pip heard how it sounded:'))html=html.replace('hadn’t wanted them to follow','hadn’t wanted <em>them</em> to follow');if(paragraph.startsWith('On their way back, Mara found'))html=html.replace('only Arch clear','only <em>Arch</em> clear');return html;}
