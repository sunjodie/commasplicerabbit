import {test} from 'node:test';
import assert from 'node:assert/strict';
import {explorationFrameArt,paintFrame,frameGeometry} from '../frame-art.js';
import {frogPosition} from '../frogs.js';

test('exploration uses the reached Chapter 1 painting or the isolated Chapter 2 streambank cell',()=>{
 for(let view=0;view<5;view++){const f=explorationFrameArt(0,view);assert.equal(f.scene,'m'+(view+1));assert.ok(f.frog);}
 const f=explorationFrameArt(1);assert.equal(f.cell,2);assert.equal(f.frog.id,'reed-frog');assert.equal(f.asset,'chapter-two/scenes-v4.webp');
 assert.equal(explorationFrameArt(2).asset,'chapter-three/frames/sheet-01.webp?v=c3art1');
 for(let stage=3;stage<6;stage++)assert.ok(explorationFrameArt(stage).frog);
});

test('atlas crop is applied before image loading and isolates the streambank in wide and narrow dialogs',()=>{
 const oldWindow=globalThis.window,oldImage=globalThis.Image;
 try{
  globalThis.window={};globalThis.Image=undefined;
  const frame=explorationFrameArt(1);
  for(const [width,height]of [[700,260],[360,240],[1000,260],[768,970]]){
   const el={dataset:{},style:{},isConnected:true,getBoundingClientRect:()=>({width,height})};
   paintFrame(el,frame);assert.equal(el.dataset.frameArt,frame.id);assert.equal(JSON.parse(el.dataset.frogPerch).id,'reed-frog');
   const g=frameGeometry(width,height,2),[x,y]=el.style.backgroundPosition.split(' ').map(parseFloat),[w,h]=el.style.backgroundSize.split(' ').map(parseFloat);
   assert.equal(w,g.width);assert.equal(h,g.height);assert.equal(x,g.x);assert.equal(y,g.y);
   // Source cell 2 starts in the atlas's lower-left quarter. Its four boundaries
   // must contain the entire dialog so no adjoining quadrant is visible.
   const left=x,top=y+h/2;assert.ok(left<=0&&top<=0);assert.ok(left+w/2>=width&&top+h/2>=height);
   const frog=frogPosition(frame.frog,width,height,'cover','70% 50%');assert.ok(frog.x>=22&&frog.x<=width-22);assert.ok(frog.y>=44&&frog.y<=height);
  }
 }finally{globalThis.window=oldWindow;globalThis.Image=oldImage;}
});
