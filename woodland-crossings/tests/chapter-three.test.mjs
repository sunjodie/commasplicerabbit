import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {STORY,TRANSFER,CHAPTERS} from '../content.js';
import {fresh,hydrate,nextQuestion,renderSentence,wordOrderCorrect,errors,record} from '../engine.js';
import {CHAPTER_THREE,CHAPTER_THREE_REFLECTION,nextChapterThreeScene,finishChapterThreeScene,setChapterThreePosition,chapterThreePosition} from '../chapter-three.js';
import {needsStory,readingScene,availableStoryScenes,storyProseHTML} from '../story-reader.js';

test('Chapter 3 reader preserves the revised manuscript and menu title',()=>{
 const manuscript=readFileSync(new URL('../STORY.md',import.meta.url),'utf8').split('## 3. The Wrong Path\n\n')[1].split('\n## 4.')[0].trim().replaceAll('*','').split(/\n\n/);
 assert.deepEqual(CHAPTER_THREE.flatMap(s=>s.paragraphs),manuscript);
 assert.equal(CHAPTERS[2].name,'The Wrong Path');
 assert.doesNotMatch(manuscript.join(' '),/farther|river working|beneath her thumb|crossed this path out/);
 assert.match(manuscript.join(' '),/“Poppy!” Willow called/);
});
test('Chapter 3 reads all five scenes before the notebook, saving reading positions separately',()=>{
 const s=fresh();s.story=10;const q=STORY[10];
 assert.equal(availableStoryScenes({...s,story:9}).some(x=>x.stage===2),false);
 for(const scene of CHAPTER_THREE){assert.equal(needsStory(s,q),true);assert.equal(readingScene(s,q).id,scene.id);setChapterThreePosition(s,scene.id,1);assert.ok(chapterThreePosition(hydrate(JSON.parse(JSON.stringify(s))),scene.id)>=0);finishChapterThreeScene(s,scene.id);}
 assert.equal(needsStory(s,q),false);assert.equal(nextChapterThreeScene(s,TRANSFER[10]),null);assert.equal(s.story,10);assert.equal(s.seq,0);
});
test('Chapter 3 targets use the chapter evidence and retain five supply awards',()=>{
 const expected=[
 'Poppy felt sure that Bram had carried the bell along the path, yet she could not identify who had left the prints.',
 'The sound came from the bridge, for the broken rail kept striking its underside.',
 'The bridge could not be crossed, nor could the bank be trusted.',
 'Poppy believed that the prints would lead to Bram. Willow feared that the path was dangerous.',
 'The bank, which was soft with rain, broke away where Poppy had stood. A tuft of grass turned over once in the current.'
 ];
 const s=fresh();s.story=10;
 for(const [i,q] of STORY.slice(10,15).entries()){assert.equal(renderSentence(q,q.valid.map(v=>v[0]),q.wordOrder?.answer),expected[i]);assert.deepEqual(errors(q,q.valid.map(v=>v[0])),[]);assert.equal(nextQuestion(s).id,q.id);record(s,q,false,10);}
 assert.equal(s.story,15);assert.equal(s.seq,5);
 for(const q of [...STORY,...TRANSFER].filter(q=>q.stage===2))assert.doesNotMatch(q.parts.join(' '),/caretaker|nail|thread|mounting/);
 assert.match(STORY[13].studentBrief,/faulty punctuation/);assert.match(STORY[14].studentBrief,/faulty punctuation/);
});
test('nor requires the student to produce inversion, on the main and retry tasks',()=>{
 for(const q of [STORY[12],TRANSFER[12]]){
  assert.match(renderSentence(q,q.initialChoices),/, /);
  assert.equal(wordOrderCorrect(q,''),false);assert.equal(wordOrderCorrect(q,q.parts[1]),false);
  assert.equal(wordOrderCorrect(q,q.wordOrder.answer),true);
  assert.equal(wordOrderCorrect(q,q.wordOrder.answer.replace(/\.$/,'').toUpperCase()),true);
  assert.doesNotMatch(renderSentence(q,['nor']),/, nor could/);
  assert.match(renderSentence(q,['nor'],q.wordOrder.answer),/, nor could/);
 }
});
test('old Chapter 3 edits reset safely; current clause rewrites survive reload',()=>{
 const old=hydrate({version:1,bankVersion:2,chapterTwoRevision:1,story:12,seq:18,activeId:'m13',activeChoices:['yet'],decorations:[{chapter:0}],beaconStars:[3,2,0,0,0,0]});
 assert.equal(old.activeId,null);assert.equal(old.story,12);assert.equal(old.seq,18);assert.equal(old.decorations.length,1);assert.deepEqual(old.beaconStars,[3,2,0,0,0,0]);
 const s=fresh();s.story=12;nextQuestion(s);s.activeWordOrder='could the bank be trusted';s.activeChoices=['nor'];
 const resumed=hydrate(JSON.parse(JSON.stringify(s)));assert.equal(nextQuestion(resumed).id,'m13');assert.equal(resumed.activeWordOrder,s.activeWordOrder);
});
test('ending reflection has one supported answer and emphasis survives storybook markup',()=>{
 assert.equal(CHAPTER_THREE_REFLECTION.answer,'together');assert.equal(CHAPTER_THREE_REFLECTION.options.filter(o=>o.id===CHAPTER_THREE_REFLECTION.answer).length,1);
 const paragraph=CHAPTER_THREE[0].paragraphs.find(p=>p.startsWith('Willow looked up'));
 assert.match(storyProseHTML(paragraph,x=>x),/<em>them<\/em>/);
});
