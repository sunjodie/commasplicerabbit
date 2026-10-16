import {test} from 'node:test';
import assert from 'node:assert/strict';
import {BANK,STORY,TRANSFER,TOOLS} from '../content.js';
import {fresh,hydrate,nextQuestion,record,errors,renderSentence,mastered,skillState,pickReview,dueSkills,startReview,startBonus,DAY} from '../engine.js';
test('content integrity: 30 story tasks, 18 transfer tasks, every repair available',()=>{
 assert.equal(STORY.length,30);assert.equal(TRANSFER.length,18);assert.equal(new Set(BANK.map(q=>q.id)).size,BANK.length);
 for(const q of BANK){assert.equal(q.parts.length,q.valid.length+1);assert.equal(q.why.length,q.valid.length);assert.ok(q.options.includes('comma'));for(const variants of q.valid){assert.ok(variants.length);for(const t of variants){assert.ok(TOOLS[t]);assert.ok(q.options.includes(t),`${q.id}: missing ${t}`);}}}
 for(let stage=0;stage<6;stage++)assert.equal(STORY.filter(q=>q.stage===stage).length,5);
});
test('all supported alternative repairs pass, keeping actual splices fails',()=>{
 for(const q of BANK){const choices=q.valid.map(v=>v[0]);assert.deepEqual(errors(q,choices),[]);q.valid.forEach((valid,i)=>{for(const alt of valid){const c=[...choices];c[i]=alt;assert.deepEqual(errors(q,c),[]);}});const original=q.valid.map(()=> 'comma');assert.equal(errors(q,original).length,q.valid.filter(v=>!v.includes('comma')).length);}
});
test('full stops capitalise; semantic connectors retain lower case',()=>{
 const q=STORY[0];assert.equal(renderSentence(q,['stop']),'The path beyond the old mill was hidden beneath fallen leaves. Pip could no longer see where it led.');assert.equal(renderSentence(q,['so']),'The path beyond the old mill was hidden beneath fallen leaves, so Pip could no longer see where it led.');assert.ok(errors(STORY[5],['stop']).length);
});
test('natural sentence-initial But and So are accepted alternatives',()=>{
 for(const q of BANK)q.parts.slice(1).forEach((p,i)=>{if(/^(but|so) /i.test(p)&&q.valid[i].includes('comma'))assert.ok(q.valid[i].includes('stop'));});
});
test('42 crossings complete six chapters, with reviews and no skipped story tasks',()=>{
 const s=fresh(),stories=[],reviews=[],finished=[];
 for(let n=0;n<42;n++){const q=nextQuestion(s);assert.ok(q);assert.ok(q.stage<=Math.min(5,Math.floor(s.story/5)));if(s.step===2||s.step===5)reviews.push(q.id);else stories.push(q.id);s.activeChoices=q.valid.map(v=>v[0]);const result=record(s,q,false,100);if(result.chapterDone)finished.push(result.chapter);}
 assert.equal(s.story,30);assert.equal(s.step,0);assert.equal(s.seq,42);assert.equal(s.completedAt,100);assert.deepEqual(stories,STORY.map(q=>q.id));assert.equal(reviews.length,12);assert.deepEqual(finished,[0,1,2,3,4,5]);assert.equal(nextQuestion(s),null);
});
test('hinted or retried success advances story but earns no independent evidence',()=>{
 const s=fresh();const q=nextQuestion(s);record(s,q,true,100);assert.equal(s.story,1);assert.equal(skillState(s,q.skill).independent.length,0);assert.equal(skillState(s,q.skill).due,100+DAY);
});
test('independent stamp requires different examples and intervening crossings',()=>{
 const s=fresh();record(s,STORY[0],false,100);record(s,STORY[1],false,100);assert.equal(mastered(s,'boundaries'),false);s.seq=3;record(s,TRANSFER[0],false,100);assert.equal(mastered(s,'boundaries'),true);
 const t=fresh();record(t,STORY[0],false);t.seq=5;record(t,STORY[0],false);assert.equal(mastered(t,'boundaries'),false);
});
test('session resumes exact unfinished question, tool choices and assistance',()=>{
 const s=fresh();const q=nextQuestion(s);s.activeChoices=['stop'];s.activeHelp=true;s.activeTries=1;const restored=hydrate(JSON.parse(JSON.stringify(s)));assert.equal(nextQuestion(restored).id,q.id);assert.deepEqual(restored.activeChoices,['stop']);assert.equal(restored.activeHelp,true);assert.equal(restored.activeTries,1);assert.equal(restored.seq,0);
});
test('memory checks start after one day; successful intervals expand to 3 then 7 days',()=>{
 const s=fresh(),q=nextQuestion(s);record(s,q,false,0);assert.deepEqual(dueSkills(s,DAY-1),[]);assert.ok(dueSkills(s,DAY).includes(q.skill));assert.equal(startReview(s,DAY),true);const rq=nextQuestion(s);record(s,rq,false,DAY);assert.equal(skillState(s,q.skill).due,4*DAY);assert.equal(startReview(s,4*DAY),true);record(s,nextQuestion(s),false,4*DAY);assert.equal(skillState(s,q.skill).due,11*DAY);
});
test('assisted return review resets interval to tomorrow and preserves rewards',()=>{
 const s=fresh();s.decorations=[{chapter:0,name:'Wildflowers'}];record(s,STORY[0],false,0);startReview(s,DAY);record(s,nextQuestion(s),true,DAY);assert.equal(skillState(s,'boundaries').due,2*DAY);assert.equal(skillState(s,'boundaries').level,0);assert.equal(s.decorations.length,1);
});
test('review chooses unseen examples within taught stages where possible',()=>{
 const s=fresh();s.story=5;s.seq=8;const q=pickReview(s);assert.ok(q.stage<=1);s.seen.push(q.id);assert.notEqual(pickReview(s).id,q.id);
});
test('optional route needs three independent successes, does not alter adventure',()=>{
 for(const missed of [false,true]){const s=fresh();s.story=30;startBonus(s);let result;for(let i=0;i<3;i++)result=record(s,nextQuestion(s),missed&&i===1,100);assert.equal(result.bonusFinished,true);assert.equal(result.earned,!missed);assert.equal(s.story,30);assert.equal(s.bonus,null);}
});
test('invalid version or story progress starts safely',()=>{assert.equal(hydrate({version:0,story:5}).story,0);assert.equal(hydrate({version:1,story:31}).story,0);assert.equal(hydrate(null).story,0);});
test('bonus retries preserve independently completed skills',()=>{const s=fresh();s.story=30;startBonus(s);record(s,nextQuestion(s),false);record(s,nextQuestion(s),true);record(s,nextQuestion(s),false);assert.deepEqual(s.bonusPasses,['mixed','paragraph']);startBonus(s);assert.deepEqual(s.bonus.skills,['connectors']);const result=record(s,nextQuestion(s),false);assert.equal(result.earned,true);});
test('building trays stay constant within a stage and do not expose answer metadata',()=>{for(let stage=0;stage<6;stage++){const tasks=BANK.filter(q=>q.stage===stage);for(const q of tasks)assert.deepEqual(q.options,tasks[0].options);}});
test('comma-and accepts every offered two-complete-clause repair without doubling existing connectors',()=>{for(const q of BANK)q.valid.forEach((v,i)=>{if(q.options.includes('and')&&v.includes('stop')&&!/^(but|so) /i.test(q.parts[i+1]))assert.ok(v.includes('and'));});});
test('opening route mixes valid commas and splices, including a multi-join task',()=>{const opening=STORY.slice(0,5);assert.ok(opening.some(q=>q.valid.every(v=>v.includes('comma'))));assert.ok(opening.some(q=>q.valid.some(v=>!v.includes('comma'))));assert.ok(opening.some(q=>q.valid.length>1));});
test('beacon sparks reward independence and contract success, never erase earlier sparks',()=>{const s=fresh();record(s,STORY[0],false,0);assert.equal(s.beaconStars[0],1);s.activeContract=true;record(s,STORY[2],false,0);assert.equal(s.beaconStars[0],3);record(s,STORY[3],true,0);assert.equal(s.beaconStars[0],3);});
test('changed question shape safely resets an unfinished old-version question',()=>{const s=fresh();s.activeId=STORY[4].id;s.activeChoices=['stop'];const q=nextQuestion(s);assert.ok(q);assert.equal(s.activeChoices.length,q.valid.length);assert.equal(s.seq,0);});
test('lantern contract availability uses visible sentence shape, not the answer key',async()=>{const {contractAvailable,contractMet}=await import('../engine.js');assert.equal(contractAvailable(STORY[0]),true);assert.equal(contractAvailable(STORY[1]),true);assert.equal(contractAvailable(STORY[29]),false);assert.equal(contractMet(STORY[0],['stop']),false);assert.equal(contractMet(STORY[0],['and']),true);});
test('independent memory reviews can recover missed expedition beacons',()=>{const s=fresh();record(s,STORY[0],true,0);assert.equal(s.beaconStars[0],0);s.story=30;for(let day of [1,4,11]){assert.equal(startReview(s,day*DAY),true);record(s,nextQuestion(s),false,day*DAY);}assert.equal(s.beaconStars[0],3);assert.equal(s.beaconStars[5],0);});
