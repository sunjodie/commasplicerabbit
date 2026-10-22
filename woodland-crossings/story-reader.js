import * as five from './chapter-five.js?v=20261022-natural-prose1';
import * as six from './chapter-six.js';
import * as one from './chapter-one.js?v=20261022-natural-prose1';
import * as two from './chapter-two.js?v=20261022-night-owl1';
import * as three from './chapter-three.js?v=20261022-natural-prose1';
import * as four from './chapter-four.js?v=20261022-natural-prose1';
export const STORY_SCENES=[...one.CHAPTER_ONE,...two.CHAPTER_TWO,...three.CHAPTER_THREE,...four.CHAPTER_FOUR,...five.CHAPTER_FIVE,...six.CHAPTER_SIX];
export const readingPages=one.readingPages;
export const storyScene=q=>one.chapterOneScene(q)||two.chapterTwoScene(q)||three.chapterThreeScene(q)||four.chapterFourScene(q)||five.chapterFiveScene(q)||six.chapterSixScene(q);
export const needsStory=(s,q)=>one.needsChapterOne(s,q)||!!two.nextChapterTwoScene(s,q)||!!three.nextChapterThreeScene(s,q)||!!four.nextChapterFourScene(s,q)||!!five.nextChapterFiveScene(s,q)||!!six.nextChapterSixScene(s,q);
export const readingScene=(s,q)=>six.nextChapterSixScene(s,q)||five.nextChapterFiveScene(s,q)||four.nextChapterFourScene(s,q)||three.nextChapterThreeScene(s,q)||two.nextChapterTwoScene(s,q)||storyScene(q);
export const storyPosition=(s,id)=>idNumber(id)>25?six.chapterSixPosition(s,id):idNumber(id)>20?five.chapterFivePosition(s,id):idNumber(id)>15?four.chapterFourPosition(s,id):idNumber(id)>10?three.chapterThreePosition(s,id):idNumber(id)>5?two.chapterTwoPosition(s,id):one.storyPosition(s,id);
export const setStoryPosition=(s,id,page)=>idNumber(id)>25?six.setChapterSixPosition(s,id,page):idNumber(id)>20?five.setChapterFivePosition(s,id,page):idNumber(id)>15?four.setChapterFourPosition(s,id,page):idNumber(id)>10?three.setChapterThreePosition(s,id,page):idNumber(id)>5?two.setChapterTwoPosition(s,id,page):one.setStoryPosition(s,id,page);
export const finishStoryScene=(s,id)=>idNumber(id)>25?six.finishChapterSixScene(s,id):idNumber(id)>20?five.finishChapterFiveScene(s,id):idNumber(id)>15?four.finishChapterFourScene(s,id):idNumber(id)>10?three.finishChapterThreeScene(s,id):idNumber(id)>5?two.finishChapterTwoScene(s,id):one.finishStoryScene(s,id);
export const availableStoryScenes=s=>[...one.availableStoryScenes(s),...two.availableChapterTwoScenes(s),...three.availableChapterThreeScenes(s),...four.availableChapterFourScenes(s),...five.availableChapterFiveScenes(s),...six.availableChapterSixScenes(s)];
function idNumber(id){return Number(id.slice(1));}
export function storyProseHTML(paragraph,escape){let html=escape(paragraph);if(paragraph.startsWith('Beside the map lay'))html=html.replace('Please don’t use the','<em>Please don’t use the</em>');if(paragraph.startsWith('Mara looked up from the map, and Pip heard how it sounded:'))html=html.replace('hadn’t wanted them to follow','hadn’t wanted <em>them</em> to follow');if(paragraph.startsWith('On their way back, Mara found'))html=html.replace('only Arch clear','only <em>Arch</em> clear');if(paragraph.includes('marked Quarry Shelter'))html=html.replace('marked Quarry Shelter','marked <em>Quarry Shelter</em>');return html;}
