import {test} from 'node:test';
import assert from 'node:assert/strict';
import {splitToFit} from '../chapter-ui.js';
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
   assert.ok(pieces.every(piece=>piece.length<=capacity||!piece.includes(' ')));
  }
 }
});
