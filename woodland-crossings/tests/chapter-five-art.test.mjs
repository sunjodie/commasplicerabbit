import {test} from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {CHAPTER_FIVE} from '../chapter-five.js';
import {FRAME_ART,textFrameArt,readingScreenFrame,questionFrameArt,explorationFrameArt,caseworkFrameArt,ipadCoverGeometry} from '../frame-art.js';
import {FROGS} from '../frogs.js';
import {questionScene} from '../scenery.js';

test('Chapter 5 has twenty ordered paintings without changing the question scenery contract',()=>{
 const unique=new Set();
 for(const scene of CHAPTER_FIVE){
  const frames=FRAME_ART.filter(f=>f.scene===scene.id&&f.kind==='story');assert.equal(frames.length,4);
  let last=-1;const prose=scene.paragraphs.join(' ');
  for(const frame of frames){const at=prose.indexOf(frame.text);assert.ok(at>last,frame.id);last=at;assert.equal(textFrameArt(scene.id,frame.text),frame);unique.add(frame.asset+':'+frame.cell);assert.ok(existsSync(new URL('../assets/'+frame.asset.split('?')[0],import.meta.url)));}
  const question=questionFrameArt(scene.id);assert.ok(!question.asset.startsWith('chapter-five/'));assert.equal(questionFrameArt(scene.id.replace('m','r')),question);assert.equal(questionScene({id:scene.id,stage:4}).asset,question.asset);assert.ok(!question.frog);
 }
 assert.equal(unique.size,20);assert.equal(caseworkFrameArt('c5-answering-signal').asset,questionFrameArt('m25').asset);assert.ok(!caseworkFrameArt('c5-answering-signal').frog);
});
test('each Chapter 5 frog belongs to one initial reading screen and the same exploration painting',()=>{
 for(const frog of FROGS.filter(f=>f.stage===4)){
  const frames=FRAME_ART.filter(f=>f.frog?.id===frog.id);assert.equal(frames.length,1,frog.id);const frame=frames[0];assert.equal(frame.kind,'story');assert.equal(frame.cell,0);assert.equal(explorationFrameArt(4,frog.view),frame);
  assert.equal(readingScreenFrame(frame.scene,frame.text).frog.id,frog.id);
  for(const [page,part]of [[0,1],[1,0],[2,2]])assert.equal(readingScreenFrame(frame.scene,frame.text,page,part).frog,null);
  for(const [width,height]of [[1024,768],[1133,744],[1180,820],[1194,834],[1366,1024]]){
   const g=ipadCoverGeometry(width,height,frame.cell,frame.focus),a=frame.frog;
   const visible=[a,...a.perches].map(p=>({x:g.art.x+g.art.width*p.x/100,y:g.art.y+g.art.height*p.y/100}));
   assert.ok(visible.some(p=>p.x>=22&&p.x<=width-22&&p.y>=44&&p.y<height*.60),frog.id+' upper-area perch');
  }
 }
});

test('Chapter 5 panel avoidance checks the visible frog sprite rather than its foot alone',async()=>{
 const {frogOverlapsPanel}=await import('../frogs.js');
 const scene={left:0,top:0},panel={left:100,right:900,top:500,bottom:768};
 assert.equal(frogOverlapsPanel({x:400,y:450,size:28},scene,panel),false);
 assert.equal(frogOverlapsPanel({x:400,y:510,size:28},scene,panel),true);
 assert.equal(frogOverlapsPanel({x:95,y:510,size:28},scene,panel),true);
 assert.equal(frogOverlapsPanel({x:40,y:510,size:28},scene,panel),false);
});
