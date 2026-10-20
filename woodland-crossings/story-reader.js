import * as one from './chapter-one.js';
import * as two from './chapter-two.js';
export const STORY_SCENES=[...one.CHAPTER_ONE,...two.CHAPTER_TWO];
export const readingPages=one.readingPages;
export const storyScene=q=>one.chapterOneScene(q)||two.chapterTwoScene(q);
export const needsStory=(s,q)=>one.needsChapterOne(s,q)||!!two.nextChapterTwoScene(s,q);
export const readingScene=(s,q)=>two.nextChapterTwoScene(s,q)||storyScene(q);
export const storyPosition=(s,id)=>idNumber(id)>5?two.chapterTwoPosition(s,id):one.storyPosition(s,id);
export const setStoryPosition=(s,id,page)=>idNumber(id)>5?two.setChapterTwoPosition(s,id,page):one.setStoryPosition(s,id,page);
export const finishStoryScene=(s,id)=>idNumber(id)>5?two.finishChapterTwoScene(s,id):one.finishStoryScene(s,id);
export const availableStoryScenes=s=>[...one.availableStoryScenes(s),...two.availableChapterTwoScenes(s)];
function idNumber(id){return Number(id.slice(1));}
export function storyProseHTML(paragraph,escape){let html=escape(paragraph);if(paragraph.startsWith('Beside the map lay'))html=html.replace('Please don’t use the','<em>Please don’t use the</em>');return html;}
