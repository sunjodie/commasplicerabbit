import {test} from 'node:test';
import assert from 'node:assert/strict';
import {textPages} from '../chapter-ui.js';
import {CHAPTER_ONE} from '../chapter-one.js';
test('viewport reading chunks retain every approved word and all dialogue',()=>{
 for(const limit of [38,42,48])for(const scene of CHAPTER_ONE){const pages=textPages(scene.paragraphs,limit);assert.equal(pages.flat().join(' ').replace(/\s+/g,' ').trim(),scene.paragraphs.join(' ').replace(/\s+/g,' ').trim());assert.ok(pages.every(p=>p.join(' ').split(/\s+/).length<=limit));}
});
test('unusually long sentences remain intact without losing words',()=>{
 const s=Array.from({length:140},(_,i)=>'word'+i).join(' ')+'.';const p=textPages([s],42);assert.equal(p.flat().join(' '),s);assert.equal(p.length,1);
});
