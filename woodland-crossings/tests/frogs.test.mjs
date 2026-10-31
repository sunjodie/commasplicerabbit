import {test} from 'node:test';
import assert from 'node:assert/strict';
import {FROGS,frogFinds,frogForScene,frogReached,frogArt,frogAnchor,frogPosition} from '../frogs.js';
import {explorationFrameArt,questionFrameArt} from '../frame-art.js';
import {fresh,hydrate} from '../engine.js';
test('every chapter has three to five collectible frogs with scene-specific tidbits',()=>{
 assert.equal(FROGS.length,25);assert.equal(new Set(FROGS.map(f=>f.id)).size,25);assert.equal(new Set(FROGS.slice(0,10).map(f=>frogArt(f))).size,10);
 for(let stage=0;stage<6;stage++){const frogs=FROGS.filter(f=>f.stage===stage);assert.ok(frogs.length>=3&&frogs.length<=5);assert.equal(new Set(frogs.map(f=>f.view)).size,frogs.length);}
 for(let view=0;view<5;view++)assert.equal(frogForScene(0,view).view,view);
 for(let stage=1;stage<6;stage++)assert.equal(frogForScene(stage,0).stage,stage);
 assert.deepEqual(frogFinds(['fair-frog','fair-frog','fake']),['fair-frog']);
});
test('collection survives reload without changing learning progress; searches respect reached scenes',()=>{
 const state=fresh();assert.equal(frogReached(FROGS[0],state),true);assert.equal(frogReached(FROGS[1],state),false);assert.equal(frogReached(FROGS[5],state),false);
 state.chapterOne={positions:{m2:0},read:['m1']};assert.equal(frogReached(FROGS[1],state),true);assert.equal(frogReached(FROGS[2],state),false);
 state.frogFinds=['window-frog'];const saved=hydrate(JSON.parse(JSON.stringify(state)));assert.deepEqual(saved.frogFinds,['window-frog']);assert.equal(saved.seq,0);assert.equal(saved.story,0);assert.deepEqual(saved.decorations,[]);
 saved.story=30;for(const f of FROGS)assert.equal(frogReached(f,saved),true);
});


test('frog feet follow cover-cropped source art rather than fixed screen percentages',()=>{
 const f=FROGS[0],point=frogAnchor(f,1366,714,'cover','70% 50%');
 const scale=1366/1536;assert.ok(Math.abs(point.x-1366*f.x/100)<.01);assert.ok(Math.abs(point.y-((714-1024*scale)*.5+1024*scale*f.y/100))<.01);
 const portrait=frogPosition(f,768,970,'cover','70% 50%');assert.ok(portrait.x>22&&portrait.x<746);assert.ok(portrait.y>44&&portrait.y<970);
 assert.equal(frogAnchor(f,600,400,'100% 100%').x,102);
});


test('frog perches alternate sides and use a painted fallback when a tablet crops the edge',()=>{
 assert.ok(FROGS.filter(f=>f.x<30).length>=4);assert.ok(FROGS.filter(f=>f.x>80).length>=4);
 for(const f of FROGS.slice(0,5)){const p=frogPosition(f,768,970,'cover','70% 50%');assert.ok(p.x>=22&&p.x<=746,f.id);assert.ok(p.y>=44&&p.y<=970,f.id);}
});

test('all added frogs have a visible source frame and valid painted sprite cells',()=>{
 for(const f of FROGS){
  const frame=explorationFrameArt(f.stage,f.view);assert.ok(frame,f.id);assert.equal(frame.frog.id,f.id);
  const n=f.stage*5+f.view+1;assert.equal(questionFrameArt('m'+n).frog,undefined);
  const art=frogArt(f),row=Number(art.match(/--frog-row:(-?\d+)/)[1]),col=Number(art.match(/--frog-col:(-?\d+)/)[1]);
  assert.ok([0,100].includes(row),f.id);assert.ok([0,25,50,75,100].includes(col),f.id);
  for(const [w,h] of [[1366,714],[768,970],[1024,546],[600,400]]){
   const p=frogPosition(frame.frog,w,h,'cover','70% 50%');assert.ok(p.x>=22&&p.x<=w-22,f.id);assert.ok(p.y>=44&&p.y<=h,f.id);
  }
 }
});
test('later-chapter searches unlock on reaching the scene or reading it, and retain earlier finds',()=>{
 for(let stage=1;stage<6;stage++)for(const f of FROGS.filter(f=>f.stage===stage&&f.view>0)){
  const s=fresh();s.story=stage*5;assert.equal(frogReached(f,s),false,f.id);
  s.story=stage*5+f.view;assert.equal(frogReached(f,s),true,f.id);
 }
 const s=fresh();s.story=5;s.chapterTwo={read:['m7']};assert.equal(frogReached(frogForScene(1,1),s),true);
 s.frogFinds=['fair-frog','reed-frog','eaves-frog'];assert.deepEqual(frogFinds(hydrate(JSON.parse(JSON.stringify(s))).frogFinds),s.frogFinds);
});

test('initialised page-zero entries do not unlock future frog searches',async()=>{
 const {setStoryPosition,finishStoryScene}=await import('../story-reader.js');
 for(let stage=1;stage<6;stage++){
  const s=fresh();s.story=stage*5;const first='m'+(s.story+1);
  setStoryPosition(s,first,0);
  for(const f of FROGS.filter(f=>f.stage===stage&&f.view>0))assert.equal(frogReached(f,s),false,f.id);
  finishStoryScene(s,first);
  assert.equal(frogReached(frogForScene(stage,1),s),true);
  for(const f of FROGS.filter(f=>f.stage===stage&&f.view>1))assert.equal(frogReached(f,s),false,f.id);
 }
});
