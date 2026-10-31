import {test} from 'node:test';
import assert from 'node:assert/strict';
import {splitToFit,sentenceUnits} from '../chapter-ui.js';
import {CHAPTER_ONE} from '../chapter-one.js';
import {CHAPTER_TWO} from '../chapter-two.js';
import {CHAPTER_THREE} from '../chapter-three.js';
import {CHAPTER_FOUR} from '../chapter-four.js';
import {CHAPTER_FIVE} from '../chapter-five.js';
import {CHAPTER_SIX} from '../chapter-six.js';

test('fitted reading pieces preserve every word across all six chapters',()=>{
 for(const scene of [...CHAPTER_ONE,...CHAPTER_TWO,...CHAPTER_THREE,...CHAPTER_FOUR,...CHAPTER_FIVE,...CHAPTER_SIX])for(const paragraph of scene.paragraphs){
  for(const capacity of [60,120,240]){
   const pieces=splitToFit(paragraph,text=>text.length<=capacity);
   assert.equal(pieces.join(' '),paragraph.trim().replace(/\s+/g,' '));
   assert.ok(pieces.every((piece,i)=>piece.length<=capacity||sentenceUnits(piece).length===1||i===pieces.length-1));
   const units=sentenceUnits(paragraph);let consumed=0;for(const piece of pieces){const n=sentenceUnits(piece).length;assert.equal(piece,units.slice(consumed,consumed+n).join(' '));consumed+=n;}
  }
 }
});

test('dialogue reporting tags stay attached to their quotation',()=>{
 const text='“Why?” Poppy asked. “Can we look?” Willow nodded.';
 assert.deepEqual(splitToFit(text,()=>false),['“Why?” Poppy asked.','“Can we look?”','Willow nodded.']);
});

test('whole sentences move to the following existing page without increasing the page count',()=>{
 const sentence='One two three four five six seven eight nine ten.';
 const text=[sentence,sentence,sentence].join(' ');
 const pages=splitToFit(text,value=>value.length<=80);
 assert.equal(pages.length,2);assert.equal(pages[0],sentence);assert.equal(pages[1],sentence+' '+sentence);
});
