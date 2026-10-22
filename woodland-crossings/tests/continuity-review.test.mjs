import {test} from 'node:test';
import assert from 'node:assert/strict';
import {CHAPTER_ONE} from '../chapter-one.js';
import {CHAPTER_TWO} from '../chapter-two.js';
import {CHAPTER_THREE,CHAPTER_THREE_REFLECTION} from '../chapter-three.js';
import {CHAPTER_FOUR} from '../chapter-four.js';
import {CHAPTER_FIVE} from '../chapter-five.js';
import {STORY,TRANSFER} from '../content.js';
import {CHAPTER_TWO_CASEWORK} from '../chapter-two-casework.js';
import {CHAPTER_FOUR_CASEWORK} from '../chapter-four-casework.js';
import {assessCasework} from '../casework.js';
const prose=ch=>ch.flatMap(s=>s.paragraphs).join(' ');
test('clock and first bell introduce Chapter 2; both flames precede extinguishing and later relighting',()=>{
 const two=prose(CHAPTER_TWO),three=prose(CHAPTER_THREE),five=prose(CHAPTER_FIVE);
 assert.ok(two.indexOf('strike twelve')<two.indexOf('a bell rang'));
 assert.ok(two.indexOf('a bell rang')<two.indexOf('She knew that bell'));
 assert.match(two,/two small flames/);assert.match(three,/blew out her paper lantern/);assert.match(five,/before the narrow path beyond the shed/);assert.doesNotMatch(five,/before leaving the mill/);
 assert.match(two,/loose shutter knocked/);assert.match(two,/recognised the sound/);assert.match(two,/hiding the floor behind it/);
 assert.match(two,/Mara passed the oil lamp to Pip/);assert.match(two,/Pip passed the oil lamp to Mara/);assert.match(three,/handed the oil lamp back to Pip/);
});
test('earlier judgements preserve uncertainty compatible with the final evidence',()=>{
 assert.match(prose(CHAPTER_ONE),/Pip had seen no light upstairs since/);
 assert.match(prose(CHAPTER_THREE),/if Bram crossed out the bridge/);assert.match(prose(CHAPTER_THREE),/If Bram made that mark/);
 assert.match(prose(CHAPTER_FOUR),/stepped away from the door/);assert.match(prose(CHAPTER_FOUR),/come back down/);assert.match(prose(CHAPTER_FOUR),/sounds like a limb/);
 assert.doesNotMatch(STORY[9].parts.join(' '),/heavy object|Whoever carried/);
 assert.doesNotMatch(STORY[10].parts.join(' '),/only prints/);
});
test('retry instructions name their own clauses and preserve the main approved Chapter 1 tasks',()=>{
 assert.match(STORY[0].brief,/after “stalls”/);assert.match(TRANSFER[0].studentBrief,/after “glowing”/);assert.doesNotMatch(TRANSFER[0].studentBrief,/stalls/);
 assert.match(TRANSFER[2].studentBrief,/Pip’s claim with her behaviour/);assert.match(TRANSFER[4].why[0],/“As”/);
 assert.match(TRANSFER[18].studentBrief,/Alder Arch/);assert.doesNotMatch(TRANSFER[18].studentBrief,/shelter/);
 assert.match(TRANSFER[16].parts.join(' '),/considered whom Bram might be expecting/);
});
test('reasoning and transfer checks use different evidence with one keyed choice per task',()=>{
 const reason=CHAPTER_TWO_CASEWORK.find(t=>t.id==='c2-for'),transfer=CHAPTER_TWO_CASEWORK.find(t=>t.id==='c2-so');
 assert.doesNotMatch(reason.prompt,/Use “for”/);assert.match(reason.options.map(o=>o.text).join(' '),/, and /);assert.match(reason.options.map(o=>o.text).join(' '),/, so /);assert.match(reason.options.map(o=>o.text).join(' '),/, for /);
 assert.match(transfer.context,/note unfinished/);assert.doesNotMatch(transfer.context,/notch|circular mark/);
 for(const t of CHAPTER_TWO_CASEWORK)assert.equal(t.options.filter(o=>assessCasework(t,{choice:o.id})).length,1);
 const t=CHAPTER_FOUR_CASEWORK[0];let valid=0;for(const choice of t.options)for(const evidence of t.evidence)if(assessCasework(t,{choice:choice.id,evidence:evidence.id}))valid++;assert.equal(valid,1);
 assert.match(CHAPTER_THREE_REFLECTION.options.find(o=>o.id==='abandon').text,/only because/);
});
