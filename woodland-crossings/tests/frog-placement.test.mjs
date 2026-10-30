import {test} from 'node:test';
import assert from 'node:assert/strict';
import {FROGS,chooseFrogPosition,frogOverlapsPanel} from '../frogs.js';
import {FRAME_ART,readingScreenFrame,explorationFrameArt,ipadCoverGeometry,frameGeometry,paintFrame} from '../frame-art.js';

test('all 25 collectibles belong to one opening reading screen and its exact exploration painting',()=>{
 for(const frog of FROGS){
  const frames=FRAME_ART.filter(f=>f.frog?.id===frog.id);assert.equal(frames.length,1,frog.id);
  const f=frames[0];assert.equal(f.kind,'story');assert.equal(explorationFrameArt(frog.stage,frog.view),f);
  assert.equal(readingScreenFrame(f.scene,f.text,0,0).frog.id,frog.id);
  for(const [page,part]of [[0,1],[1,0],[2,3]])assert.equal(readingScreenFrame(f.scene,f.text,page,part).frog,null);
 }
 assert.ok(FRAME_ART.filter(f=>f.kind!=='story').every(f=>!f.frog));
});
test('every frog has a clear 44px target above tablet reading panels and within portrait exploration crops',()=>{
 for(const frame of FRAME_ART.filter(f=>f.frog)){
  for(const [width,height]of [[1024,768],[1133,744],[1180,820],[1194,834],[1366,1024],[1366,768]]){
   const scene={left:0,top:0,width,height},panel={left:24,right:width-24,top:height-250,bottom:height};
   const bounds=ipadCoverGeometry(width,height,frame.cell,frame.focus??.7).art;
   const p=chooseFrogPosition(frame.frog,bounds,scene,[panel]);assert.ok(p,frame.frog.id+' '+width+'x'+height);assert.equal(frogOverlapsPanel({...p,size:44},scene,panel),false);
  }
  const width=768,height=970,g=frameGeometry(width,height,frame.cell,frame.focus??.7);
  const bounds={x:g.x+frame.cell%2*g.width/2,y:g.y+Math.floor(frame.cell/2)*g.height/2,width:g.width/2,height:g.height/2};
  assert.ok(chooseFrogPosition(frame.frog,bounds,{left:0,top:0,width,height}),frame.frog.id+' portrait revisit');
 }
});
test('covered perches use a clear alternative and disappear when every target is obstructed',()=>{
 const scene={left:100,top:50,width:600,height:400},bounds={x:0,y:0,width:600,height:400};
 const frog={x:50,y:80,perches:[{x:20,y:30}]},panel={left:100,right:700,top:300,bottom:450};
 assert.deepEqual(chooseFrogPosition(frog,bounds,scene,[panel]),{x:120,y:120,size:22});
 assert.equal(chooseFrogPosition(frog,bounds,scene,[{left:100,right:700,top:50,bottom:450}]),null);
});
test('painting publishes the exact cell bounds outside iPad mode, including non-default focus',()=>{
 const oldWindow=globalThis.window,oldDocument=globalThis.document,oldImage=globalThis.Image;
 try{
  globalThis.window={};globalThis.document={body:{classList:{contains:()=>false}}};globalThis.Image=undefined;
  const el={dataset:{},style:{},getBoundingClientRect:()=>({width:600,height:700})};
  const f={id:'crop-test',cell:3,focus:.3,asset:'unused.webp'};paintFrame(el,f);
  const g=frameGeometry(600,700,3,.3);assert.deepEqual(JSON.parse(el.dataset.artBounds),{x:g.x+g.width/2,y:g.y+g.height/2,width:g.width/2,height:g.height/2});
  assert.equal(el.dataset.frogPerch,'none');
 }finally{globalThis.window=oldWindow;globalThis.document=oldDocument;globalThis.Image=oldImage;}
});

test('full-ratio revisit viewers show exactly one complete atlas cell at all device widths',()=>{
 for(const width of [240,280,360,600,768,1024])for(const frame of FRAME_ART.filter(f=>f.frog)){
  const height=width*2/3;
  for(const g of [frameGeometry(width,height,frame.cell,frame.focus??.7),ipadCoverGeometry(width,height,frame.cell,frame.focus??.7)]){
   assert.ok(Math.abs(g.width/2-width)<1e-8);assert.ok(Math.abs(g.height/2-height)<1e-8);
   assert.ok(Math.abs(g.x+frame.cell%2*width)<1e-8);
   assert.ok(Math.abs(g.y+Math.floor(frame.cell/2)*height)<1e-8);
  }
  assert.ok(chooseFrogPosition(frame.frog,{x:0,y:0,width,height},{left:0,top:0,width,height}),frame.frog.id+' '+width);
 }
});
