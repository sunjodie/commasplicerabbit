import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {CHAPTER_TWO,nextChapterTwoScene,chapterTwoPosition,setChapterTwoPosition,finishChapterTwoScene,availableChapterTwoScenes} from '../chapter-two.js';
import {STORY,TRANSFER,CHAPTERS} from '../content.js';
import {fresh,hydrate,nextQuestion,errors,renderSentence,record} from '../engine.js';
import {caseworkFor,caseworkState,updateCasework,submitCasework} from '../casework.js';
import {CHAPTER_TWO_CASEWORK} from '../chapter-two-casework.js';
import {readingPages} from '../chapter-one.js';
import {textPages} from '../chapter-ui.js';
import {storyProseHTML} from '../story-reader.js';
import {textFrameArt,questionFrameArt,caseworkFrameArt,frameGeometry} from '../frame-art.js';

test('Chapter 2 preserves the approved 32 paragraphs and rain continuity',()=>{
 const approved=JSON.parse(readFileSync(new URL('../chapter-two-approved.json',import.meta.url))).text;
 assert.equal(CHAPTER_TWO.flatMap(x=>x.paragraphs).join('\n\n'),approved);
 assert.equal(CHAPTERS[1].name,'What Had Left the Mill');
 assert.doesNotMatch(approved,/\bfog\b|\bfingers\b|\bfarther\b|\bgate\b|\bfence\b/);
 assert.match(approved,/It could be/);assert.match(approved,/clear of the papers/);
 for(const q of [...STORY,...TRANSFER].filter(q=>q.stage===1))assert.doesNotMatch(q.parts.join(' '),/\bfog\b|\bgate\b|\bfence\b|dragging|smooth rim/);
});
test('all approved reading words survive desktop and tablet pagination',()=>{
 for(const limit of [38,42,48])for(const scene of CHAPTER_TWO)for(const paragraphs of readingPages(scene)){
  const chunks=textPages(paragraphs,limit);assert.equal(chunks.flat().join(' '),paragraphs.join(' '));assert.ok(chunks.every(p=>p.join(' ').split(/\s+/).length<=limit));
 }
 assert.match(storyProseHTML(CHAPTER_TWO[2].paragraphs.find(p=>p.startsWith('Beside the map')),s=>s),/<em>Please don’t use the<\/em>/);
});
test('full investigation is read before notebook clues; reading neither delivers supplies nor unlocks future scenes',()=>{
 const s=fresh();s.story=5;const before=structuredClone(s);
 assert.deepEqual(availableChapterTwoScenes(s).map(x=>x.id),['m6']);
 for(const [i,scene] of CHAPTER_TWO.entries()){
  assert.equal(nextChapterTwoScene(s,STORY[5]).id,scene.id);
  setChapterTwoPosition(s,scene.id,999);assert.equal(chapterTwoPosition(s,scene.id),readingPages(scene).length-1);
  finishChapterTwoScene(s,scene.id);assert.equal(availableChapterTwoScenes(s).length,Math.min(5,i+2));
 }
 assert.equal(nextChapterTwoScene(s,STORY[5]),null);
 const {chapterTwo,...rest}=s;assert.deepEqual(rest,before);
 assert.equal(chapterTwoPosition(hydrate(JSON.parse(JSON.stringify(s))),'m8'),chapterTwo.positions.m8);
});
test('reader ignores review/recovery and sanitises malformed chapter data',()=>{
 const s=fresh();s.story=5;s.chapterTwo={read:['m6','m6','bad'],positions:{m7:-4,m8:'bad'}};
 assert.equal(nextChapterTwoScene(s,STORY[5]).id,'m7');assert.equal(chapterTwoPosition(s,'m7'),0);
 setChapterTwoPosition(s,'m8',2);assert.deepEqual(s.chapterTwo.read,['m6']);
 assert.equal(nextChapterTwoScene(s,TRANSFER[5]),null);s.reviewRun={};assert.equal(nextChapterTwoScene(s,STORY[5]),null);
 s.story=0;assert.deepEqual(availableChapterTwoScenes(s),[]);
 const before=structuredClone(s);setChapterTwoPosition(s,'bad',0);finishChapterTwoScene(s,'bad');assert.deepEqual(s,before);
});
test('five joining notes start as two complete sentences and accept exactly the approved answers',()=>{
 const s=fresh();s.story=5;
 for(const q of STORY.slice(5,10)){
  assert.equal(nextQuestion(s).id,q.id);assert.deepEqual(s.activeChoices,['stop']);
  assert.match(renderSentence(q,s.activeChoices),/\. [A-Z]/);
  for(const t of q.options)assert.equal(errors(q,[t]).length===0,q.valid[0].includes(t),q.id+' '+t);
  assert.equal((renderSentence(q,[q.valid[0][0]]).match(/[.!?](?=\s|$)/g)||[]).length,1);
  record(s,q,false,0);
 }
 assert.equal(s.story,10);assert.equal(s.seq,5);
 assert.deepEqual(STORY[6].valid,[['but','yet']]);assert.deepEqual(TRANSFER[6].valid,STORY[6].valid);
 assert.match(renderSentence(STORY[5],['and']),/porch, and Mara/);
});
test('new saves retain edits and only old Chapter 2 active stems have their choices reset',()=>{
 const s=fresh();s.story=6;s.activeId='m7';s.activeChoices=['yet'];s.activeTries=1;
 assert.deepEqual(hydrate(JSON.parse(JSON.stringify(s))).activeChoices,['yet']);
 delete s.chapterTwoRevision;const updated=hydrate(s);assert.deepEqual(updated.activeChoices,['stop']);assert.equal(updated.activeTries,0);assert.equal(updated.story,6);
 s.activeId='m1';s.activeChoices=['semi'];assert.deepEqual(hydrate(s).activeChoices,['semi']);
});
test('all four notebook checks gate only final reward and require their single correct option',()=>{
 const s=fresh();s.story=9;const q=STORY[9],before=structuredClone(s);
 assert.equal(caseworkFor(s,q),null);
 for(const task of CHAPTER_TWO_CASEWORK){
  assert.equal(caseworkFor(s,q,'after').id,task.id);
  for(const option of task.options){updateCasework(s,task.id,{choice:option.id});assert.equal(submitCasework(s,task),option.id===task.answer);}
  updateCasework(s,task.id,{choice:task.answer});assert.equal(submitCasework(s,task),true);
  assert.equal(caseworkState(hydrate(JSON.parse(JSON.stringify(s))),task.id).completed,true);
 }
 assert.equal(caseworkFor(s,q,'after'),null);
 const {casework,...rest}=s;assert.deepEqual(rest,before);
 s.reviewRun={};assert.equal(caseworkFor(s,q,'after'),null);
});
test('all Chapter 2 views have local rain artwork and safe desktop/tablet atlas crops',()=>{
 for(const scene of CHAPTER_TWO){assert.ok(textFrameArt(scene.id,scene.paragraphs[0]));assert.ok(questionFrameArt(scene.id));}
 for(const task of CHAPTER_TWO_CASEWORK)assert.ok(caseworkFrameArt(task.id));
 for(const [width,height] of [[1366,714],[768,970],[1024,546]])for(let cell=0;cell<4;cell++){
  const g=frameGeometry(width,height,cell),left=g.x+cell%2*g.width/2,top=g.y+Math.floor(cell/2)*g.height/2;
  assert.ok(left<=0&&top<=0&&left+g.width/2>=width&&top+g.height/2>=height);
 }
 const b=readFileSync(new URL('../assets/chapter-two/scenes-v1.webp',import.meta.url));assert.equal(b.toString('ascii',0,4),'RIFF');
});


test('root and game entry points load the same visual-novel styles and versioned application',()=>{
 const root=readFileSync(new URL('../../index.html',import.meta.url),'utf8'),game=readFileSync(new URL('../index.html',import.meta.url),'utf8');
 assert.match(root,/<base href="\.\/woodland-crossings\/">/);
 for(const html of [root,game]){assert.match(html,/href="fonts.css"/);assert.match(html,/href="chapter-ui.css"/);assert.match(html,/src="app.js\?v=20261020-chapter2"/);assert.match(html,/<title>The Midnight Mill<\/title>/);}
});
