import {test} from 'node:test';
import assert from 'node:assert/strict';
import {BANK} from '../content.js';
import {errors,renderSentence,grammarErrors} from '../engine.js';
import {CHAPTER_THREE_REFLECTION as reflection} from '../chapter-three.js';
test('m14/m15 and recovery have exactly one grammatical offered repair without a sentence-count instruction',()=>{
 for(const id of ['m14','r14','m15','r15']){
  const q=BANK.find(q=>q.id===id),combinations=[];
  function enumerate(prefix=[]){if(prefix.length===q.valid.length){combinations.push(prefix);return;}for(const t of q.options)enumerate([...prefix,t]);}enumerate();
  const grammatical=combinations.filter(choices=>!grammarErrors(q,choices).length),accepted=combinations.filter(choices=>!errors(q,choices).length);
  const target=id.endsWith('14')?['stop']:['comma','comma','stop'];
  assert.deepEqual(grammatical,[target],id+' grammatical');assert.deepEqual(accepted,[target],id+' accepted');
  assert.equal((renderSentence(q,target).match(/\./g)||[]).length,2);
  assert.doesNotMatch(q.studentBrief,/Start a new sentence|own sentence/);
  assert.deepEqual(q.options,['comma','stop','nor']);
 }
});
test('m15 reflection asks for observed behaviour and does not claim knowledge of motive',()=>{
 assert.match(reflection.prompt,/directly supported/);
 assert.equal(reflection.options.filter(o=>o.id===reflection.answer).length,1);
 assert.match(reflection.options.find(o=>o.id===reflection.answer).text,/waits for Willow/);
 assert.doesNotMatch(reflection.why,/beginning to take|apology/);
});
