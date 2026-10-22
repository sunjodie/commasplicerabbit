import {test} from 'node:test';
import assert from 'node:assert/strict';
import {fresh,hydrate} from '../engine.js';
import {STORY_SCENES,readingPages} from '../story-reader.js';
import {textPages} from '../chapter-ui.js';
import {NOTEBOOK_CLUES,NOTEBOOK_THREADS,notebookState,availableNotebookClues,observeNotebookText,availableNotebookThreads,notebookLink,updateNotebookLink,assessNotebookLink,checkNotebookLink,notebookFollowUp} from '../clue-notebook.js';
const ids=s=>availableNotebookClues(s).map(c=>c.id);
const apart=s=>{const {clueNotebook,...rest}=s;return rest;};

test('the notebook starts empty and never treats an unread cursor or active question as an observed clue',()=>{
 const s=fresh();assert.deepEqual(ids(s),[]);assert.deepEqual(availableNotebookThreads(s),[]);
 s.activeId='m8';s.chapterTwo={positions:{m8:8},read:[]};assert.deepEqual(ids(s),[]);
 observeNotebookText(s,'m1','They were passing the fountain when a light appeared beyond the gardens, in the mill’s upper window.');
 assert.deepEqual(ids(s),['light']);assert.deepEqual(availableNotebookThreads(s),[]);
 observeNotebookText(s,'m1','the figure bent down');assert.deepEqual(ids(s),['light'],'anchors only unlock in their own scene');
});
test('reading parts collect all authored observations across desktop and tablet word budgets without advancing the game',()=>{
 for(const budget of [38,42,48]){
  const s=fresh(),before=structuredClone(s);
  for(const scene of STORY_SCENES){
   for(const paragraphs of readingPages(scene))for(const part of textPages(paragraphs,budget))observeNotebookText(s,scene.id,part.join(' '));
   assert.ok(availableNotebookClues(s).every(c=>Number(c.scene.slice(1))<=Number(scene.id.slice(1))));
  }
  assert.equal(ids(s).length,NOTEBOOK_CLUES.length,budget);assert.deepEqual(apart(s),before);
 }
});
test('clues spanning displayed parts unlock only after the full anchor is encountered',()=>{
 const s=fresh();observeNotebookText(s,'m4','Bram had let her mend the cuff of his');
 assert.equal(ids(s).includes('stitches'),false);
 observeNotebookText(s,'m4','green coat in the summer, sitting patiently');assert.equal(ids(s).includes('stitches'),true);
 assert.equal(ids(s).includes('cloth'),false,'other observations from the same scene stay hidden');
});
test('existing reading and completion saves gain past observations without unlocking future scenes',()=>{
 const s=fresh();s.story=5;s.chapterTwo={read:['m6','m7'],positions:{}};
 assert.ok(ids(s).includes('stitches'));assert.ok(ids(s).includes('bell-chip'));assert.equal(ids(s).includes('note'),false);
 assert.equal(ids(s).includes('admission'),false);
 s.story=30;assert.equal(ids(s).length,NOTEBOOK_CLUES.length);
 const malformed=fresh();malformed.clueNotebook={version:1,seen:['invented'],links:{},tails:{}};assert.deepEqual(ids(malformed),[]);
});
test('each working page has exactly one supported idea and evidence pair; unrelated or hidden clues are rejected',()=>{
 const s=fresh();s.story=30;
 for(const t of NOTEBOOK_THREADS){
  let supported=0;
  for(const theory of t.theories)for(let a=0;a<t.observations.length;a++)for(let b=a+1;b<t.observations.length;b++){
   assert.equal(updateNotebookLink(s,t.id,{theory:theory.id,clues:[t.observations[a],t.observations[b]]}),true);
   if(assessNotebookLink(s,t.id).status==='supported')supported++;
  }
  assert.equal(supported,1,t.id);
  assert.equal(updateNotebookLink(s,t.id,{clues:['not-a-clue','light']}),false);
  assert.equal(updateNotebookLink(s,t.id,{theory:'invented'}),false);
 }
 const early=fresh();assert.equal(updateNotebookLink(early,'timber',{theory:'removed'}),false);
});
test('checking, revising and typed reasoning persist independently of scores, supplies and active edits',()=>{
 const s=fresh();s.story=3;s.seq=5;s.activeId='m4';s.activeChoices=['comma','semi'];s.activeHelp=false;s.decorations=[{chapter:0,name:'Wildflowers'}];s.chapterOne={read:['m4']};
 const before=structuredClone(s);
 updateNotebookLink(s,'cloth',{theory:'taken',clues:['cloth','stitches']});
 assert.equal(checkNotebookLink(s,'cloth').status,'revise');
 assert.equal(notebookLink(s,'cloth').checked,true);
 updateNotebookLink(s,'cloth',{theory:'coat'});assert.equal(notebookLink(s,'cloth').checked,false);
 assert.equal(checkNotebookLink(s,'cloth').status,'supported');
 updateNotebookLink(s,'cloth',{note:'The repair links this cloth to the coat.'});
 const loaded=hydrate(JSON.parse(JSON.stringify(s)));assert.equal(notebookLink(loaded,'cloth').note,'The repair links this cloth to the coat.');
 assert.equal(notebookLink(loaded,'cloth').checked,true);assert.deepEqual(apart(s),before);
 assert.equal(notebookLink(fresh(),'cloth').theory,'');
});
test('feedback prompts a smaller claim before explaining a supported link, and later evidence stays hidden',()=>{
 const s=fresh();s.story=10;
 updateNotebookLink(s,'bell-marks',{theory:'carrier',clues:['bell-chip','circular-gap']});
 const r=checkNotebookLink(s,'bell-marks');assert.equal(r.status,'revise');assert.doesNotMatch(r.message,/could correspond|rested|Bram said/i);
 assert.equal(notebookFollowUp(s,'bell-marks'),'');
 s.story=26;assert.match(notebookFollowUp(s,'bell-marks'),/Bram later/);
 assert.equal(notebookFollowUp(s,'upstairs'),'');
 s.story=29;assert.match(notebookFollowUp(s,'upstairs'),/moving the chest/);
});
test('the ending identity is absent from the notebook and personal notes are bounded',()=>{
 assert.doesNotMatch(JSON.stringify([NOTEBOOK_CLUES,NOTEBOOK_THREADS]),/Night Owl|baker is|Amber Hollow/);
 const s=fresh();s.story=30;updateNotebookLink(s,'cloth',{note:'x'.repeat(900)});assert.equal(notebookLink(s,'cloth').note.length,400);
 assert.equal(notebookState(s).version,1);
});
