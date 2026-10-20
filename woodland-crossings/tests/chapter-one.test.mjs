import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {CHAPTER_ONE,chapterOneScene,readingPages,needsChapterOne,storyPosition,setStoryPosition,finishStoryScene,availableStoryScenes} from '../chapter-one.js';
import {STORY,TRANSFER} from '../content.js';
import {fresh,hydrate} from '../engine.js';

test('chapter one preserves every approved paragraph in order and pages at paragraph boundaries',()=>{
 const approved=readFileSync(new URL('../STORY.md',import.meta.url),'utf8').split('## 1. After the Fair\n\n')[1].split('\n## 2.')[0].trim().split(/\n\n/);
 assert.deepEqual(CHAPTER_ONE.flatMap(s=>s.paragraphs),approved);
 assert.deepEqual(CHAPTER_ONE.map(s=>s.id),STORY.slice(0,5).map(q=>q.id));
 for(const scene of CHAPTER_ONE){const pages=readingPages(scene);assert.deepEqual(pages.flat(),scene.paragraphs);assert.ok(pages.every(p=>p.length===1||p.join(' ').split(/\s+/).length<=85));}
});
test('reader saves resume positions without awarding supplies or changing question state',()=>{
 const s=fresh(),before=structuredClone(s);setStoryPosition(s,'m1',2);assert.equal(storyPosition(s,'m1'),2);assert.equal(needsChapterOne(s,STORY[0]),true);finishStoryScene(s,'m1');assert.equal(needsChapterOne(s,STORY[0]),false);
 const {chapterOne,...rest}=s;assert.deepEqual(rest,before);assert.equal(storyPosition(hydrate(JSON.parse(JSON.stringify(s))),'m1'),2);
});
test('reader handles legacy and malformed state and never gates recovery, review or later chapters',()=>{
 const s=fresh();assert.equal(storyPosition(s,'m1'),0);assert.equal(needsChapterOne(s,STORY[0]),true);
 s.chapterOne={read:['m1','m1','invalid'],positions:{m1:999,m2:-4,m3:'bad'}};setStoryPosition(s,'m4',999);assert.deepEqual(s.chapterOne.read,['m1']);assert.equal(storyPosition(s,'m1'),readingPages(CHAPTER_ONE[0]).length-1);assert.equal(storyPosition(s,'m2'),0);assert.equal(storyPosition(s,'m3'),0);
 assert.equal(chapterOneScene(TRANSFER[0]),null);assert.equal(needsChapterOne(s,TRANSFER[0]),false);assert.equal(needsChapterOne(s,STORY[5]),false);s.reviewRun={};assert.equal(needsChapterOne(s,STORY[1]),false);s.reviewRun=null;s.bonus=true;assert.equal(needsChapterOne(s,STORY[1]),false);
 const before=structuredClone(s);setStoryPosition(s,'unknown',5);finishStoryScene(s,'unknown');assert.deepEqual(s,before);
});
test('storybook unlocks only reached scenes and reading does not unlock later scenes',()=>{
 const s=fresh();assert.deepEqual(availableStoryScenes(s).map(x=>x.id),['m1']);finishStoryScene(s,'m1');assert.equal(availableStoryScenes(s).length,1);s.story=1;assert.equal(availableStoryScenes(s).length,2);s.story=30;assert.equal(availableStoryScenes(s).length,5);
});

test('story is the complete approved chapter and ends before the bell',()=>{const approved=JSON.parse(readFileSync(new URL('../chapter-one-approved.json',import.meta.url)));assert.equal(CHAPTER_ONE.flatMap(s=>s.paragraphs).join('\n\n'),approved.text);assert.match(CHAPTER_ONE.at(-1).paragraphs.at(-1),/no footsteps came down the stairs/);assert.deepEqual(CHAPTER_ONE.map(s=>s.mood),['calm','calm','calm','calm','calm']);});
