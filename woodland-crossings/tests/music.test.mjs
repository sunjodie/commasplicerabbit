import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createMusicController,MUSIC} from '../music.js';
function fixture(){const instances=[];class FakeAudio{constructor(src){this.src=src;this.plays=0;this.pauses=0;instances.push(this);}async play(){this.plays++;}pause(){this.pauses++;}}return {instances,AudioClass:FakeAudio};}
test('music waits for opt-in, loops quietly, and reuses one player across toggles',async()=>{const f=fixture(),c=createMusicController(f);assert.equal(f.instances.length,0);await c.setVisible(true);assert.equal(f.instances.length,0);await c.setEnabled(true);const a=f.instances[0];assert.equal(a.src,MUSIC.src);assert.equal(a.loop,true);assert.equal(a.volume,.18);assert.equal(a.preload,'none');await c.setEnabled(false);assert.ok(a.pauses);await c.setEnabled(true);assert.equal(f.instances.length,1);assert.equal(a.plays,2);});
test('hidden tabs pause and return only resumes user-enabled music',async()=>{const f=fixture(),c=createMusicController(f);await c.setEnabled(true);const a=f.instances[0];await c.setVisible(false);assert.equal(a.pauses,1);await c.setVisible(true);assert.equal(a.plays,2);await c.setEnabled(false);await c.setVisible(false);await c.setVisible(true);assert.equal(a.plays,2);});
test('playback failure is handled and a later user toggle can retry',async()=>{let errors=0;const f=fixture();f.AudioClass.prototype.play=async function(){if(!this.plays++)throw Error('blocked');};const c=createMusicController({...f,onError(){errors++;}});assert.equal(await c.setEnabled(true),false);assert.equal(errors,1);assert.equal(await c.setEnabled(true),true);assert.equal(f.instances.length,1);});
test('tension stays silent before opt-in and plays once before returning to calm',async()=>{
 const f=fixture(),c=createMusicController(f);
 await c.setTense(true);assert.equal(f.instances.length,0);
 await c.setEnabled(true);const cue=f.instances[0];
 assert.match(cue.src,/midnight-tension/);assert.equal(cue.loop,false);
 await c.setTense(true);assert.equal(cue.plays,1);
 cue.onended();await Promise.resolve();const calm=f.instances[1];
 assert.equal(calm.src,MUSIC.src);assert.equal(calm.loop,true);assert.equal(calm.plays,1);
 await c.setVisible(false);await c.setVisible(true);assert.equal(cue.plays,1);
 await c.setTense(true);assert.equal(cue.plays,1);
 await c.setTense(false);await c.setTense(true);assert.equal(cue.plays,2);
});
test('leaving a tense scene stops and rewinds its cue; sound-off prevents an ended event starting music',async()=>{
 const f=fixture(),c=createMusicController(f);await c.setEnabled(true);const calm=f.instances[0];
 await c.setTense(true);const cue=f.instances[1];assert.ok(calm.pauses);
 cue.currentTime=22;await c.setTense(false);assert.equal(cue.currentTime,0);assert.ok(cue.pauses);
 await c.setTense(true);await c.setEnabled(false);const plays=calm.plays;
 cue.onended();await Promise.resolve();assert.equal(calm.plays,plays);
});
