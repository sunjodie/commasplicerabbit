import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {CHAPTER_FIVE} from '../chapter-five.js';
import {CHAPTER_SIX} from '../chapter-six.js';
import {CHAPTER_FIVE_SIX_CASEWORK} from '../chapter-five-six-casework.js';
import {STORY,TRANSFER} from '../content.js';
import {fresh,hydrate,wordOrderCorrect,grammarErrors,renderSentence} from '../engine.js';
import {needsStory,readingScene,finishStoryScene,storyPosition,setStoryPosition} from '../story-reader.js';
import {assessCasework,caseworkFor} from '../casework.js';
import {readingFrameArt,caseworkFrameArt} from '../frame-art.js';
import {FROGS,frogReached} from '../frogs.js';
import {chapterMusicMood} from '../music.js';
const manuscript=readFileSync(new URL('../STORY.md',import.meta.url),'utf8');
for(const [stage,scenes,title,key] of [[4,CHAPTER_FIVE,'An Answer in the Dark','chapterFive'],[5,CHAPTER_SIX,'Before Morning','chapterSix']]){
 test(`Chapter ${stage+1} prose, full reading, save/resume, artwork and frogs integrate`,()=>{
  assert.deepEqual(manuscript.split(`## ${stage+1}. ${title}\n\n`)[1].split('\n## ')[0].trim().split(/\n\n/),scenes.flatMap(s=>s.paragraphs));
  const s=fresh();s.story=stage*5;const q=STORY[s.story];
  for(const scene of scenes){assert.equal(needsStory(s,q),true);assert.equal(readingScene(s,q).id,scene.id);setStoryPosition(s,scene.id,1);const resumed=hydrate(structuredClone(s));assert.equal(storyPosition(resumed,scene.id),storyPosition(s,scene.id));finishStoryScene(s,scene.id);const art=readingFrameArt(scene.id);assert.ok(art);assert.ok(existsSync(new URL('../assets/'+art.asset.split('?')[0],import.meta.url)));assert.equal(chapterMusicMood(scene),'calm');}
  assert.equal(needsStory(s,q),false);assert.equal(s[key].read.length,5);assert.equal(s.seq,0);assert.equal(s.story,stage*5);
  assert.equal(needsStory({...s,[key]:{},reviewRun:{}},q),false);assert.equal(needsStory({...s,[key]:{}},TRANSFER[stage*5]),false);
  const frogs=FROGS.filter(f=>f.stage===stage);assert.equal(frogs.length,4);for(const f of frogs)assert.equal(frogReached(f,s),true);
 });
}
test('later inferences have exactly one valid conclusion/evidence combination and no premature stop',()=>{
 for(const t of CHAPTER_FIVE_SIX_CASEWORK){let passes=0;for(const o of t.options)for(const ev of t.evidence)if(assessCasework(t,{choice:o.id,evidence:ev.id}))passes++;assert.equal(passes,1);const q=STORY.find(q=>q.id===t.question);assert.equal(caseworkFor(fresh(),q),null);assert.equal(caseworkFor(fresh(),q,'after').id,t.id);assert.ok(caseworkFrameArt(t.id));}
});
test('new nor item requires students to produce inversion on both main and retry',()=>{
 for(const q of [STORY[24],TRANSFER[24]]){assert.equal(wordOrderCorrect(q,q.parts[1]),false);assert.equal(wordOrderCorrect(q,q.wordOrder.answer),true);assert.deepEqual(grammarErrors(q,['nor']),[]);assert.match(renderSentence(q,['nor'],q.wordOrder.answer),/, nor could she /);}
});
test('legacy later edits migrate without losing progress, rewards or discoveries',()=>{
 for(const id of ['m21','m25','r30']){const s={...fresh(),story:24,seq:29,activeId:id,activeChoices:['comma','semi'],frogFinds:['clock-frog'],decorations:[{chapter:0}]};delete s.chapterFiveSixRevision;const m=hydrate(s);assert.equal(m.activeId,null);assert.equal(m.activeChoices,null);assert.equal(m.story,24);assert.equal(m.seq,29);assert.deepEqual(m.frogFinds,s.frogFinds);assert.deepEqual(m.decorations,s.decorations);}
});
test('later story and tasks do not revive obsolete explanations or spoil the deferred notebook',()=>{
 const text=[...CHAPTER_FIVE,...CHAPTER_SIX].flatMap(s=>s.paragraphs).join(' ');
 assert.match(text,/marked timber in his workroom and the cut support/);assert.match(text,/new caretaker/);assert.match(text,/answered a different one/);assert.match(text,/handhold|something to hold/);
 for(const q of [...STORY,...TRANSFER].filter(q=>q.stage>=4))assert.doesNotMatch(q.parts.join(' '),/fog|locked for years|sleeve had caught on a nail|mill’s old porch|The caretaker/);
 const app=readFileSync(new URL('../app.js',import.meta.url),'utf8');assert.doesNotMatch(app,/No thief|The lantern was a warning|same rescue/);assert.match(app,/assets\/village\/complete.webp/);
});
