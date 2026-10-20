import {test} from 'node:test';
import {statSync} from 'node:fs';
import {MUSIC} from '../music.js';
import assert from 'node:assert/strict';
import {STORY,TRANSFER,BONUS} from '../content.js';
import {fresh,hydrate,nextQuestion,record,startBonus} from '../engine.js';
import {QUESTION_SCENES,questionScene,selectQuestionScene} from '../scenery.js';

test('every story question has a distinct complete scenic composition',()=>{
 assert.equal(QUESTION_SCENES.length,30);
 const views=STORY.map(q=>questionScene(q));
 assert.equal(new Set(views.map(x=>x.key)).size,30);
 assert.equal(new Set(views.filter(x=>x.stage!==1).map(x=>`${x.asset}:${x.focus}:${x.scale}`)).size,25);
 for(const q of STORY){const x=questionScene(q);assert.equal(x.stage,q.stage);assert.ok(x.name);assert.ok(['100% 100%','200% 200%'].includes(x.scale));}
});
test('supported routes and optional questions change views on every advance and keep views on reload',()=>{
 const s=fresh();let previous=null,count=0;
 while(s.story<30&&count<65){const q=nextQuestion(s),view=selectQuestionScene(s,q);assert.notEqual(view.key,previous);assert.equal(selectQuestionScene(hydrate(JSON.parse(JSON.stringify(s))),q).key,view.key);previous=view.key;record(s,q,true,0);count++;}
 assert.equal(s.story,30);startBonus(s);for(let i=0;i<3;i++){const q=nextQuestion(s),view=selectQuestionScene(s,q);assert.notEqual(view.key,previous);previous=view.key;record(s,q,false,0);}
 for(const q of [...TRANSFER,...BONUS])assert.equal(questionScene(q).stage,q.stage);
});
test('a repeated recovery question gets a different view while its open task remains stable',()=>{
 const s=fresh(),q=TRANSFER[0];const first=selectQuestionScene(s,q);s.seq++;const second=selectQuestionScene(s,q);assert.notEqual(first.key,second.key);assert.equal(selectQuestionScene(s,q).key,second.key);
});

test('every scenic asset and the supplied music are included in the static deployment',()=>{
 for(const name of new Set(QUESTION_SCENES.map(x=>x.asset)))assert.ok(statSync(new URL('../assets/'+name,import.meta.url)).size>1000,name);
 assert.ok(statSync(new URL('../'+MUSIC.src,import.meta.url)).size>1000);
});
