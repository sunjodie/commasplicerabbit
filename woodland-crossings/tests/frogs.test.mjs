import {test} from 'node:test';
import assert from 'node:assert/strict';
import {FROGS,frogFinds,frogForScene,frogReached,frogArt} from '../frogs.js';
import {fresh,hydrate} from '../engine.js';
test('ten distinct frogs have scene-specific tidbits and original accessory art',()=>{
 assert.equal(FROGS.length,10);assert.equal(new Set(FROGS.map(f=>f.id)).size,10);assert.equal(new Set(FROGS.map(f=>frogArt(f))).size,10);
 for(let view=0;view<5;view++)assert.equal(frogForScene(0,view).view,view);
 for(let stage=1;stage<6;stage++)assert.equal(frogForScene(stage,4).stage,stage);
 assert.deepEqual(frogFinds(['fair-frog','fair-frog','fake']),['fair-frog']);
});
test('collection survives reload without changing learning progress; searches respect reached scenes',()=>{
 const state=fresh();assert.equal(frogReached(FROGS[0],state),true);assert.equal(frogReached(FROGS[1],state),false);assert.equal(frogReached(FROGS[5],state),false);
 state.chapterOne={positions:{m2:0},read:['m1']};assert.equal(frogReached(FROGS[1],state),true);assert.equal(frogReached(FROGS[2],state),false);
 state.frogFinds=['window-frog'];const saved=hydrate(JSON.parse(JSON.stringify(state)));assert.deepEqual(saved.frogFinds,['window-frog']);assert.equal(saved.seq,0);assert.equal(saved.story,0);assert.deepEqual(saved.decorations,[]);
 saved.story=30;for(const f of FROGS)assert.equal(frogReached(f,saved),true);
});
