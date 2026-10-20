import {test} from 'node:test';
import assert from 'node:assert/strict';
import {BANK,STORY,TRANSFER,BONUS,TOOLS,CHAPTERS} from '../content.js';
import {fresh,hydrate,nextQuestion,record,errors,grammarErrors,renderSentence,mastered,skillState,dueSkills,startReview,startBonus,contractAvailable,DAY} from '../engine.js';
const solve=(s,q,assisted=false,now=0)=>{s.activeChoices=q.valid.map(v=>v[0]);return record(s,q,assisted,now);};
test('authored bank has an approved answer set per join, complete briefs, available tools and paired recovery examples',()=>{
 assert.equal(STORY.length,30);assert.equal(TRANSFER.length,30);assert.equal(BONUS.length,3);assert.equal(new Set(BANK.map(q=>q.id)).size,BANK.length);
 for(const q of BANK){assert.ok(q.brief);assert.equal(q.parts.length,q.valid.length+1,q.id);assert.equal(q.why.length,q.valid.length,q.id);assert.equal(q.grammar.length,q.valid.length,q.id);for(let i=0;i<q.valid.length;i++){assert.equal(q.valid[i].length,['m7','r7'].includes(q.id)?2:1,q.id);const t=q.valid[i][0];assert.ok(TOOLS[t]);assert.ok(q.options.includes(t),`${q.id} lacks ${t}`);assert.ok(q.grammar[i].includes(t),`${q.id} rejects grammatical target`);}assert.deepEqual(errors(q,q.valid.map(v=>v[0])),[]);}
 for(let stage=0;stage<6;stage++)assert.equal(STORY.filter(q=>q.stage===stage).length,5);
 assert.equal(new Set(STORY.map(q=>q.structure)).size,30);
 for(const q of STORY){const r=TRANSFER.find(r=>r.structure===q.structure);assert.ok(r);assert.notDeepEqual(r.parts,q.parts);assert.deepEqual(r.valid,q.valid);}
});
test('every FANBOYS is a target; semicolons recur in more complex structures and full reports',()=>{
 for(const t of ['for','and','nor','but','or','yet','so'])assert.ok(STORY.some(q=>q.valid.some(v=>v[0]===t)),t);
 assert.ok(STORY.filter(q=>q.valid.some(v=>v[0]==='semi')).length>=10);
 assert.ok(STORY.slice(20).every(q=>q.kind==='paragraph'));
 assert.ok(STORY.slice(25).every(q=>q.parts.join('').includes('\n\n')));
 assert.equal(STORY[29].valid.length,6);
});
test('later trays are stable and all targets are grammatical under their explicit briefs',()=>{
 for(let stage=1;stage<6;stage++){const tasks=STORY.filter(q=>q.stage===stage);for(const q of tasks)assert.deepEqual(q.options,tasks[0].options);}
 for(const q of BANK)assert.deepEqual(grammarErrors(q,q.valid.map(v=>v[0])),[]);
 const q=STORY[0];assert.deepEqual(grammarErrors(q,['semi']),[]);assert.deepEqual(errors(q,['semi']),[0]);assert.deepEqual(grammarErrors(q,['comma']),[0]);
 assert.equal(renderSentence(q,['stop']),'The villagers were dismantling the last stalls. Beyond the gardens, a light appeared in the mill’s upper window.');
 assert.match(renderSentence(STORY[12],['nor'],'could the bank be trusted.'),/, nor could the bank/);
});
test('30 independent story solves finish six chapters with no automatic repeats',()=>{
 const s=fresh(),ids=[],done=[];
 for(let i=0;i<30;i++){const q=nextQuestion(s);ids.push(q.id);const r=solve(s,q,false,100);if(r.chapterDone)done.push(r.chapter);}
 assert.deepEqual(ids,STORY.map(q=>q.id));assert.deepEqual(done,[0,1,2,3,4,5]);assert.equal(s.story,30);assert.equal(s.seq,30);assert.equal(s.completedAt,100);assert.equal(nextQuestion(s),null);assert.deepEqual(dueSkills(s,100*DAY),[]);assert.deepEqual(s.recovery,{});
});
test('only a supported structure returns, after three intervening new structures',()=>{
 const s=fresh();solve(s,nextQuestion(s),true);assert.equal(s.story,1);assert.equal(skillState(s,'boundaries').independent.length,0);
 for(let i=1;i<=3;i++){const q=nextQuestion(s);assert.equal(q.id,STORY[i].id);solve(s,q);}
 const q=nextQuestion(s);assert.equal(q.id,'r1');assert.equal(q.structure,STORY[0].structure);solve(s,q);assert.equal(s.story,4);assert.equal(nextQuestion(s).id,'m5');assert.equal(s.recovery[q.structure].needsSession,false);
});
test('failed structures get 1/3/7 day spacing, then retire after successful recall',()=>{
 const s=fresh();solve(s,nextQuestion(s),true,0);assert.deepEqual(dueSkills(s,DAY-1),[]);assert.deepEqual(dueSkills(s,DAY),[STORY[0].structure]);assert.equal(startReview(s,DAY),true);assert.equal(nextQuestion(s).id,'r1');solve(s,nextQuestion(s),false,DAY);assert.equal(s.recovery[STORY[0].structure].due,4*DAY);
 assert.equal(startReview(s,4*DAY),true);solve(s,nextQuestion(s),false,4*DAY);assert.equal(s.recovery[STORY[0].structure].due,11*DAY);
 startReview(s,11*DAY);solve(s,nextQuestion(s),false,11*DAY);assert.deepEqual(s.recovery,{});assert.equal(startReview(s,99*DAY),false);assert.equal(s.story,1);
});
test('supported recall resets spacing without removing rewards or sparks',()=>{
 const s=fresh();s.decorations=[{chapter:0,name:'Wildflowers'}];solve(s,nextQuestion(s),true,0);startReview(s,DAY);solve(s,nextQuestion(s),true,DAY);assert.equal(s.recovery[STORY[0].structure].due,2*DAY);assert.equal(s.recovery[STORY[0].structure].level,0);assert.equal(s.decorations.length,1);
 startReview(s,2*DAY);solve(s,nextQuestion(s),false,2*DAY);assert.equal(s.beaconStars[0],1);assert.equal(s.beaconStars[5],0);
});
test('save/resume retains exact task choices, support and pending structure reviews',()=>{
 const s=fresh();nextQuestion(s);s.activeChoices=['semi'];s.activeHelp=true;s.activeTries=2;
 const t=hydrate(JSON.parse(JSON.stringify(s)));assert.equal(nextQuestion(t).id,'m1');assert.deepEqual(t.activeChoices,['semi']);assert.equal(t.activeHelp,true);assert.equal(t.activeTries,2);
 solve(t,nextQuestion(t),true,0);const u=hydrate(JSON.parse(JSON.stringify(t)));assert.ok(u.recovery[STORY[0].structure]);assert.equal(u.seq,1);
});
test('old bank saves keep story, village and secrets while obsolete questions/reviews migrate safely',()=>{
 const s=hydrate({version:1,story:17,seq:24,step:3,activeId:'q19',activeChoices:['comma'],reviewRun:{skills:['long'],index:0},decorations:[{chapter:0}],easterEggs:['ghost-shroom'],beaconStars:[3,2,1,0,0,0],skills:{long:{attempts:2,independent:[],due:1}}});
 assert.equal(s.story,17);assert.equal(s.seq,24);assert.equal(s.step,2);assert.equal(s.activeId,null);assert.equal(s.reviewRun,null);assert.equal(s.skills.long.due,null);assert.equal(s.decorations.length,1);assert.deepEqual(s.easterEggs,['ghost-shroom']);assert.deepEqual(s.beaconStars,[3,2,1,0,0,0]);assert.equal(nextQuestion(s).id,'m18');
 assert.equal(hydrate({version:0,story:5}).story,0);assert.equal(hydrate({version:1,story:31}).story,0);
});
test('independent evidence requires different questions and intervening practice',()=>{
 const s=fresh();solve(s,STORY[0]);solve(s,STORY[1]);assert.equal(mastered(s,'boundaries'),false);s.seq=3;solve(s,STORY[2]);assert.equal(mastered(s,'boundaries'),true);
});
test('optional challenges are fresh structures; only unfinished skills repeat',()=>{
 const s=fresh();s.story=30;assert.equal(startBonus(s),true);const ids=[];for(let i=0;i<3;i++){const q=nextQuestion(s);ids.push(q.id);const r=solve(s,q,i===1);if(i===2)assert.equal(r.earned,false);}assert.deepEqual(ids,['b1','b2','b3']);assert.equal(s.story,30);assert.deepEqual(s.bonusPasses,['mixed','paragraph']);assert.deepEqual(s.recovery,{});
 startBonus(s);assert.deepEqual(s.bonus.skills,['connectors']);assert.equal(solve(s,nextQuestion(s)).earned,true);assert.equal(startBonus(s),false);
});
test('new briefs cannot conflict with the former optional one-sentence contract',()=>{for(const q of BANK)assert.equal(contractAvailable(q),false);});

test('persistent support never traps a student in recovery or withholds the ending',()=>{
 const s=fresh(),done=[];let count=0;while(s.story<30&&count<65){const q=nextQuestion(s);assert.ok(q);const r=solve(s,q,true,0);if(r.chapterDone)done.push(r.chapter);count++;}
 assert.equal(s.story,30);assert.ok(count<=59);assert.deepEqual(done,[0,1,2,3,4,5]);assert.equal(nextQuestion(s),null);assert.ok(Object.keys(s.recovery).length>0);
});

test('explicit whole-text goals disambiguate the offered answers, including already-correct notes',()=>{
 assert.equal(STORY[0].goal.sentences,2);assert.equal(STORY[3].goal.sentences,1);assert.equal(STORY[23].goal.sentences,3);assert.equal(STORY[29].goal.sentences,5);assert.deepEqual(STORY[29].goal.conjunctions,['so']);
 const correct=STORY[23];assert.deepEqual(grammarErrors(correct,['comma','semi','comma']),[]);assert.deepEqual(errors(correct,['comma','semi','comma']),[1]);assert.deepEqual(errors(correct,['comma','comma','comma']),[]);
 for(const q of BANK){assert.ok(q.goal.sentences>=1);const target=q.valid.map(v=>v[0]);assert.equal((renderSentence(q,target).match(/[.!?](?=\s|$)/g)||[]).length,q.goal.sentences);for(let i=0;i<target.length;i++)for(const t of q.options)if(!q.valid[i].includes(t)){const alternative=[...target];alternative[i]=t;assert.ok(errors(q,alternative).length,`${q.id}: second accepted edit at ${i}`);}}
});

test('semantic briefs and contrast trays follow the approved chapter rules',()=>{
 for(const q of BANK){assert.ok(q.studentBrief,q.id);if(q.stage!==1&&q.stage!==2)assert.doesNotMatch(q.studentBrief,/Use (AND|BUT|OR|NOR|FOR|SO|YET)|already correctly punctuated|semicolon/i);if(q.stage!==1)assert.ok(!(q.options.includes('but')&&q.options.includes('yet')),q.id);assert.ok(!q.options.includes('because'),q.id);}
 for(const id of ['m29','r29']){const q=BANK.find(q=>q.id===id);assert.match(q.parts[2],/^yet /);assert.equal(q.valid[1][0],'comma');const s=hydrate({...fresh(),activeId:id,activeChoices:['comma','yet','or'],activeHelp:true});assert.deepEqual(s.activeChoices,['comma','comma','or']);assert.equal(s.activeHelp,true);}
});
