import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createMusicController,MUSIC,chapterMusicMood} from '../music.js';
function fixture(){
 const instances=[],pending=new Map();let time=0,id=0;
 class FakeAudio{constructor(src){this.src=src;this.plays=0;this.pauses=0;this.paused=true;this.currentTime=0;instances.push(this);}async play(){this.plays++;this.paused=false;}pause(){this.pauses++;this.paused=true;}}
 const clock={now:()=>time,schedule:fn=>{const key=++id;pending.set(key,{at:time+40,fn});return key;},cancel:key=>pending.delete(key)};
 function advance(ms){const end=time+ms;for(;;){const next=[...pending].sort((a,b)=>a[1].at-b[1].at)[0];if(!next||next[1].at>end)break;time=next[1].at;pending.delete(next[0]);next[1].fn();}time=end;}
 const c=createMusicController({AudioClass:FakeAudio,...clock});return {instances,FakeAudio,clock,advance,c};
}
const near=(value,expected)=>assert.ok(Math.abs(value-expected)<.001,`${value} differs from ${expected}`);
test('music remains opt-in, fades in quietly, loops calm and reuses players',async()=>{
 const f=fixture();await f.c.setVisible(true);assert.equal(f.instances.length,0);await f.c.setEnabled(true);const a=f.instances[0];assert.equal(a.src,MUSIC.src);assert.equal(a.loop,true);assert.equal(a.preload,'none');assert.equal(a.volume,0);f.advance(1200);near(a.volume,.09);f.advance(1200);near(a.volume,.18);await f.c.setEnabled(false);assert.equal(a.paused,true);await f.c.setEnabled(true);assert.equal(f.instances.length,1);assert.equal(a.plays,2);
});
test('real mood changes crossfade without stopping the outgoing track abruptly',async()=>{
 const f=fixture();await f.c.setEnabled(true);f.advance(2400);const calm=f.instances[0];await f.c.setTense(true);const cue=f.instances[1];assert.equal(calm.paused,false);assert.equal(cue.volume,0);f.advance(1200);near(calm.volume,.09);near(cue.volume,.09);assert.equal(calm.paused,false);f.advance(1200);assert.equal(calm.paused,true);near(cue.volume,.18);assert.equal(cue.loop,false);
});
test('the flashback softens the current passage and later scenes do not rewind the cue',async()=>{
 const f=fixture();await f.c.setTense(true);await f.c.setEnabled(true);f.advance(2400);const cue=f.instances[0];cue.currentTime=24;await f.c.setMood('memory');f.advance(2400);near(cue.volume,.075);assert.equal(f.instances.length,1);assert.equal(cue.plays,1);await f.c.setTense(true);f.advance(2400);near(cue.volume,.18);assert.equal(cue.currentTime,24);assert.equal(cue.plays,1);await f.c.setTense(false);f.advance(2400);await f.c.setTense(true);assert.equal(cue.currentTime,24);assert.equal(cue.plays,2);
});
test('an exhausted incomplete cue is not replayed on revisits; a fresh game resets it',async()=>{
 const f=fixture();await f.c.setTense(true);assert.equal(f.instances.length,0);await f.c.setEnabled(true);f.advance(2400);const cue=f.instances[0];cue.onended();await Promise.resolve();f.advance(2400);assert.equal(cue.paused,true);await f.c.setTense(false);f.advance(2400);const calm=f.instances[1];await f.c.setTense(true);f.advance(2400);assert.equal(calm.paused,true);assert.equal(cue.plays,1);await f.c.reset();f.advance(2400);await f.c.setTense(true);assert.equal(cue.plays,2);assert.equal(cue.currentTime,0);
});
test('muting and hidden tabs pause both players immediately and cancel fades',async()=>{
 const f=fixture();await f.c.setEnabled(true);f.advance(2400);await f.c.setTense(true);f.advance(800);await f.c.setVisible(false);assert.ok(f.instances.every(a=>a.paused&&a.volume===0));f.advance(5000);assert.ok(f.instances.every(a=>a.volume===0));await f.c.setVisible(true);f.advance(2400);assert.equal(f.instances[1].paused,false);await f.c.setEnabled(false);await f.c.setVisible(false);await f.c.setVisible(true);assert.ok(f.instances.every(a=>a.paused));
});
test('rapid mood changes finish with only the latest requested music audible',async()=>{
 const f=fixture();await f.c.setEnabled(true);f.advance(2400);await f.c.setTense(true);f.advance(400);await f.c.setTense(false);f.advance(400);await f.c.setTense(true);f.advance(2400);assert.equal(f.instances[0].volume,0);assert.equal(f.instances[0].paused,true);near(f.instances[1].volume,.18);
});
test('a late play promise cannot silence or leak into a newer mood',async()=>{
 const f=fixture();let resolve;f.FakeAudio.prototype.play=function(){this.plays++;this.paused=false;return this.src===MUSIC.src?new Promise(r=>resolve=r):Promise.resolve();};
 const calm=f.c.setEnabled(true);await f.c.setTense(true);f.advance(2400);resolve();await calm;assert.equal(f.instances[0].paused,true);assert.equal(f.instances[1].paused,false);near(f.instances[1].volume,.18);
});
test('playback failure is handled once and sound can be retried',async()=>{
 const f=fixture();let errors=0;f.FakeAudio.prototype.play=async function(){if(!this.plays++)throw Error('blocked');this.paused=false;};const c=createMusicController({AudioClass:f.FakeAudio,...f.clock,onError(){errors++;}});assert.equal(await c.setEnabled(true),false);assert.equal(errors,1);assert.equal(await c.setEnabled(true),true);f.advance(2400);near(f.instances[0].volume,.18);
});


test('chapter one stays calm throughout and the short creepy cue belongs only to chapter three',()=>{
 for(let stage=0;stage<6;stage++)assert.equal(chapterMusicMood({stage}),stage===2?'tense':'calm');
 assert.equal(chapterMusicMood(null),'calm');
});
