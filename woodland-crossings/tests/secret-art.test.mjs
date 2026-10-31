import {test} from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {BONUS} from '../content.js';
import {questionScene,selectQuestionScene} from '../scenery.js';
import {questionFrameArt} from '../frame-art.js';
import {fresh,hydrate} from '../engine.js';

test('secret trails retain reviewed paintings across legacy scenery saves and reloads',()=>{
 const expected=[['chapter-five/frames/sheet-03.webp',2],['chapter-six/frames/sheet-01.webp',2],['chapter-six/frames/sheet-01.webp',3]];
 for(const [i,q] of BONUS.entries()){
  const s=fresh();s.activeScenery={question:q.id,seq:s.seq,key:q.stage+'-0'};s.lastSceneKey='bonus-'+q.id;
  const view=selectQuestionScene(s,q),frame=questionFrameArt(q.id);
  assert.equal(view.key,'bonus-'+q.id);assert.equal(frame.asset.split('?')[0],expected[i][0]);assert.equal(frame.cell,expected[i][1]);assert.equal(frame.frog,undefined);
  assert.equal(view.asset,frame.asset);assert.equal(view.cell,frame.cell);assert.ok(existsSync(new URL('../assets/'+expected[i][0],import.meta.url)));
  assert.deepEqual(selectQuestionScene(hydrate(JSON.parse(JSON.stringify(s))),q),view);assert.equal(questionScene(q,'0-0'),view);
 }
});
