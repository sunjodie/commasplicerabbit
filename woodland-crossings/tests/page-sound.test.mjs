import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createPageSound,isPageTurn} from '../page-sound.js';
test('paper sound follows opt-in and visibility, reuses one player and throttles rapid turns',async()=>{
 let time=0;const players=[];
 class Audio{constructor(src){this.src=src;this.plays=0;players.push(this);}pause(){this.paused=true;}async play(){this.paused=false;this.plays++;}}
 const sound=createPageSound({AudioClass:Audio,now:()=>time});
 assert.equal(await sound.turn(),false);assert.equal(players.length,0);
 sound.setEnabled(true);assert.equal(await sound.turn(),true);assert.equal(players[0].volume,.22);
 assert.equal(await sound.turn(),false);time=200;assert.equal(await sound.turn(),true);assert.equal(players.length,1);assert.equal(players[0].currentTime,0);
 sound.setVisible(false);assert.equal(players[0].paused,true);time=400;assert.equal(await sound.turn(),false);
 sound.setVisible(true);assert.equal(await sound.turn(),true);sound.setEnabled(false);assert.equal(players[0].paused,true);
});
test('only enabled page controls qualify, and sound failure does not throw',async()=>{
 const button={disabled:false,closest:()=>null};const event={target:{closest:selector=>selector.includes('#storyNext')?button:null}};
 assert.equal(isPageTurn(event),true);button.disabled=true;assert.equal(isPageTurn(event),false);assert.equal(isPageTurn({target:{closest:()=>null}}),false);
 class Audio{pause(){}play(){return Promise.reject(new Error('blocked'));}}
 const sound=createPageSound({AudioClass:Audio});sound.setEnabled(true);assert.equal(await sound.turn(),false);
});

test('frog effect uses the supplied recording quietly and throttles repeated croaks',async()=>{
 let time=0,player;class Audio{constructor(src){this.src=src;player=this;}pause(){this.paused=true;}async play(){this.paused=false;}}
 const effect=createPageSound({AudioClass:Audio,now:()=>time,src:'assets/frog-croak.mp3',volume:.24,cooldownMs:400});effect.setEnabled(true);
 assert.equal(await effect.turn(),true);assert.equal(player.src,'assets/frog-croak.mp3');assert.equal(player.volume,.24);
 time=200;assert.equal(await effect.turn(),false);time=401;assert.equal(await effect.turn(),true);effect.setEnabled(false);assert.equal(player.paused,true);
});
