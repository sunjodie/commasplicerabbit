import {test} from 'node:test';
import assert from 'node:assert/strict';
import {BANK} from '../content.js';
import {errors,renderSentence,grammarErrors} from '../engine.js';
import {CHAPTER_THREE_REFLECTION as reflection} from '../chapter-three.js';
test('all offered m15 and r15 answer combinations yield exactly one successful submission',()=>{
 for(const id of ['m15','r15']){
  const q=BANK.find(q=>q.id===id),accepted=[];
  for(const a of q.options)for(const b of q.options)for(const c of q.options){const choices=[a,b,c];if(!errors(q,choices).length)accepted.push(choices);}
  assert.deepEqual(accepted,[['comma','comma','stop']],id);
  assert.equal(grammarErrors(q,accepted[0]).length,0);
  assert.equal((renderSentence(q,accepted[0]).match(/\./g)||[]).length,2);
  assert.equal(errors(q,['comma','comma','semi']).length,1);
  assert.match(q.studentBrief,/Start a new sentence/);
 }
});
test('m15 reflection asks for observed behaviour and does not claim knowledge of motive',()=>{
 assert.match(reflection.prompt,/directly supported/);
 assert.equal(reflection.options.filter(o=>o.id===reflection.answer).length,1);
 assert.match(reflection.options.find(o=>o.id===reflection.answer).text,/waits for Willow/);
 assert.doesNotMatch(reflection.why,/beginning to take|apology/);
});
