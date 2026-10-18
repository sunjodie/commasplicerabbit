import {test} from 'node:test';
import assert from 'node:assert/strict';
import {CASEWORK,caseworkFor,caseworkState,updateCasework,assessCasework,submitCasework} from '../casework.js';
import {fresh,hydrate} from '../engine.js';
import {STORY,TRANSFER} from '../content.js';

test('three supporting stops leave all five sentence-editing tasks in place',()=>{
 assert.deepEqual(STORY.slice(0,5).map(q=>q.id),['m1','m2','m3','m4','m5']);assert.equal(STORY.slice(0,5).filter(q=>q.valid.some(v=>v[0]==='semi')).length,1);assert.equal(STORY[2].valid[0][0],'but');assert.equal(CASEWORK.length,3);assert.deepEqual(CASEWORK.map(t=>t.kind).sort(),['deduction','grammar','vocabulary']);
 for(const task of CASEWORK){assert.ok(STORY.some(q=>q.id===task.question));if(task.kind==='grammar')assert.equal(task.text.split(' ')[task.word],'were');else{assert.equal(task.options.filter(o=>o.id===task.answer).length,1);assert.equal(new Set(task.options.map(o=>o.id)).size,task.options.length);}if(task.evidence)assert.equal(task.evidence.filter(o=>o.id===task.evidenceAnswer).length,1);}
});
test('correct detective work requires both a supported claim and the matching evidence',()=>{
 const t=CASEWORK.find(t=>t.kind==='deduction');for(const o of t.options)for(const e of t.evidence){assert.equal(assessCasework(t,{choice:o.id,evidence:e.id}),o.id===t.answer&&e.id===t.evidenceAnswer);}
 const grammar=CASEWORK[0];assert.equal(assessCasework(grammar,{choice:'6',correction:' Was '}),true);assert.equal(assessCasework(grammar,{choice:'5',correction:'was'}),false);assert.equal(assessCasework(grammar,{choice:'6',correction:'is'}),false);
});
test('casework choices, help and completion survive hydration without affecting grammar mastery or rewards',()=>{
 const s=fresh(),before=structuredClone(s),t=CASEWORK[2];updateCasework(s,t.id,{route:'repair',choice:'recent',evidence:t.evidenceAnswer});assert.equal(submitCasework(s,t),false);assert.equal(caseworkState(s,t.id).attempts,1);updateCasework(s,t.id,{hinted:true,choice:t.answer});assert.equal(submitCasework(s,t),true);assert.equal(caseworkState(hydrate(JSON.parse(JSON.stringify(s))),t.id).completed,true);const {casework,...rest}=s;assert.deepEqual(rest,before);
});
test('casework gates only its own unreached question and never recovery or review',()=>{
 const s=fresh();assert.equal(caseworkFor(s,STORY[0]),null);assert.equal(caseworkFor(s,STORY[1]).id,'wood-note');assert.equal(caseworkFor(s,TRANSFER[1]),null);s.reviewRun={};assert.equal(caseworkFor(s,STORY[1]),null);s.reviewRun=null;s.bonus={};assert.equal(caseworkFor(s,STORY[1]),null);s.bonus=null;updateCasework(s,'wood-note',{completed:true});assert.equal(caseworkFor(s,STORY[1]),null);const before=structuredClone(s);updateCasework(s,'unknown',{completed:true});assert.deepEqual(s,before);
});
