import {test} from 'node:test';
import assert from 'node:assert/strict';
import {BANK,STORY} from '../content.js';
import {fresh,nextQuestion,errors,grammarErrors,wordOrderCorrect,renderSentence} from '../engine.js';
test('all 63 editing questions have exactly one grammatical offered combination, independent of the brief',()=>{
 let examined=0;
 for(const q of BANK){
  const grammatical=[],accepted=[];
  function visit(choices=[]){
   if(choices.length===q.valid.length){examined++;if(!grammarErrors(q,choices).length)grammatical.push(choices);if(!errors(q,choices).length&&wordOrderCorrect(q,q.wordOrder?.answer||''))accepted.push(choices);return;}
   for(const t of q.joinOptions[choices.length])visit([...choices,t]);
  }
  visit();const target=q.valid.map(v=>v[0]);assert.deepEqual(grammatical,[target],q.id);assert.deepEqual(accepted,[target],q.id);
  assert.equal((renderSentence(q,target,q.wordOrder?.answer||'').match(/[.!?](?=\s|$)/g)||[]).length,q.goal.sentences,q.id);
 }
 assert.equal(examined,2075);
});
test('retired answer choices reset on the same main/recovery/bonus question without losing support or progress',()=>{
 for(const id of ['m1','r6','m24','r29','b3']){
  const q=BANK.find(q=>q.id===id),s=fresh();s.story=18;s.seq=23;s.activeId=id;s.activeChoices=q.valid.map(()=> 'semi');s.activeHelp=true;
  assert.equal(nextQuestion(s).id,id);assert.deepEqual(s.activeChoices,q.initialChoices);assert.equal(s.activeHelp,true);assert.equal(s.seq,23);assert.equal(s.story,18);
 }
 assert.equal(STORY[23].valid[1][0],'but');
});
