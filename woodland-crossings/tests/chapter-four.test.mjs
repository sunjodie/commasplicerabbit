import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {CHAPTER_FOUR,nextChapterFourScene,finishChapterFourScene,setChapterFourPosition,chapterFourPosition,availableChapterFourScenes} from '../chapter-four.js';
import {CHAPTER_FOUR_CASEWORK} from '../chapter-four-casework.js';
import {STORY,TRANSFER,CHAPTERS} from '../content.js';
import {fresh,hydrate,nextQuestion,renderSentence,errors,record} from '../engine.js';
import {needsStory,readingScene,availableStoryScenes} from '../story-reader.js';
import {caseworkFor,assessCasework,updateCasework,submitCasework} from '../casework.js';
import {readingFrameArt,questionFrameArt,caseworkFrameArt} from '../frame-art.js';
import {chapterMusicMood} from '../music.js';

test('Chapter 4 reader matches the revised manuscript and establishes the two times before the inference',()=>{
 const manuscript=readFileSync(new URL('../STORY.md',import.meta.url),'utf8').split('## 4. A Bell in Two Places\n\n')[1].split('\n## 5.')[0].trim().replaceAll('*','').split(/\n\n/);
 assert.deepEqual(CHAPTER_FOUR.flatMap(x=>x.paragraphs),manuscript);
 const text=manuscript.join(' '),midnight=text.indexOf('clock struck twelve'),quarter=text.indexOf('quarter past twelve'),deduction=text.indexOf('So she heard it before');
 assert.ok(midnight>=0&&quarter>midnight&&deduction>quarter);
 assert.match(text,/called goodnight from upstairs/);assert.match(text,/If he crossed before the bridge broke/);
 assert.match(text,/high stone bridge/);assert.match(text,/lower stretch of the approach/);
 assert.match(text,/We don't know whether he found them/);assert.match(text,/folded the map along its old creases/);
 assert.doesNotMatch(text,/her thumb|one finger|handcart|fetched ropes|piece of coat|kept them supper/);
 assert.equal(CHAPTERS[3].name,'A Bell in Two Places');
});
test('Chapter 4 reading saves independently and never opens on recovery or before reaching the chapter',()=>{
 const s=fresh();s.story=15;const q=STORY[15];
 assert.equal(availableChapterFourScenes({...s,story:14}).length,0);
 for(const scene of CHAPTER_FOUR){assert.equal(needsStory(s,q),true);assert.equal(readingScene(s,q).id,scene.id);setChapterFourPosition(s,scene.id,1);const copy=hydrate(structuredClone(s));assert.equal(chapterFourPosition(copy,scene.id),chapterFourPosition(s,scene.id));finishChapterFourScene(s,scene.id);}
 assert.equal(needsStory(s,q),false);assert.equal(s.story,15);assert.equal(s.seq,0);
 assert.equal(nextChapterFourScene(s,TRANSFER[15]),null);s.reviewRun={};assert.equal(nextChapterFourScene(s,q),null);
 assert.equal(availableStoryScenes({...s,story:20}).filter(x=>x.stage===3).length,5);
});
test('Chapter 4 has the approved five targets, matching retries and explicit punctuation instructions',()=>{
 const expected=[
 'The baker heard the bell near the footbridge. However, the ferryman heard it above the bend.',
 'Because the witnesses had heard the bell in different places at different times, Willow suspected that it had moved. Therefore, she traced the path on the map.',
 'The ferryman, who knew the higher crossing, said the route was above the water, but a fallen beech limb blocked the approach.',
 'The lower path was under water, but the old shelter stood above the flood line.',
 'Nobody had answered the door. Through the kitchen window the neighbour had seen three clean bowls.'
 ];
 for(const [i,q]of STORY.slice(15,20).entries()){
  assert.equal(renderSentence(q,q.valid.map(v=>v[0])),expected[i]);assert.deepEqual(errors(q,q.valid.map(v=>v[0])),[]);
  const r=TRANSFER[15+i];assert.deepEqual(r.valid,q.valid);assert.ok(r.why.every(Boolean));
  for(const note of [q,r])assert.doesNotMatch(note.parts.join(' '),/upstream bridge|older map|delivery record|register|ledger|gate/);
 }
 assert.match(STORY[15].studentBrief,/own sentence/);assert.match(STORY[17].studentBrief,/contrast/);for(const q of STORY.slice(15,20))assert.doesNotMatch(q.studentBrief,/semicolon/);
 assert.match(STORY[16].studentBrief,/new sentence/);
 assert.match(STORY[19].why[0],/independent clauses/);assert.match(STORY[19].why[0],/Through the kitchen window/);
});
test('the two-part inference rejects a sound conclusion with irrelevant evidence, and vice versa',()=>{
 const task=CHAPTER_FOUR_CASEWORK[0],s=fresh(),q=STORY[19];s.story=19;
 assert.equal(caseworkFor(s,q),null);assert.equal(caseworkFor(s,q,'after').id,task.id);
 for(const o of task.options)for(const evidence of task.evidence)assert.equal(assessCasework(task,{choice:o.id,evidence:evidence.id}),o.id===task.answer&&evidence.id===task.evidenceAnswer);
 const before=structuredClone(s);updateCasework(s,task.id,{choice:task.answer,evidence:task.evidenceAnswer});assert.equal(submitCasework(s,task),true);
 assert.equal(caseworkFor(s,q,'after'),null);const {casework,...rest}=s;assert.deepEqual(rest,before);
 assert.equal(caseworkFor({...s,reviewRun:{}},q,'after'),null);
});
test('changed Chapter 4 tasks reset safely while completed rewards, progress and current edits survive',()=>{
 const s=fresh();s.story=18;s.seq=24;s.decorations=[{chapter:0}];s.activeId='m19';s.activeChoices=['comma','but'];delete s.chapterFourRevision;
 const migrated=hydrate(s);assert.equal(migrated.activeId,null);assert.equal(migrated.story,18);assert.equal(migrated.seq,24);assert.equal(migrated.decorations.length,1);
 assert.equal(nextQuestion(migrated).id,'m19');migrated.activeChoices=['but'];
 const resumed=hydrate(structuredClone(migrated));assert.equal(nextQuestion(resumed).id,'m19');assert.deepEqual(resumed.activeChoices,['but']);
 const p=fresh();p.story=15;let result;for(let n=15;n<20;n++)result=record(p,STORY[n],false,1);assert.equal(result.chapter,3);assert.equal(p.story,20);assert.equal(p.seq,5);
});
test('all Chapter 4 reading and inference stops have artwork and keep warm chapter music',()=>{
 for(const scene of CHAPTER_FOUR){assert.ok(readingFrameArt(scene.id));assert.ok(questionFrameArt(scene.id));assert.equal(chapterMusicMood(scene),'calm');}
 assert.ok(caseworkFrameArt(CHAPTER_FOUR_CASEWORK[0].id));
});
