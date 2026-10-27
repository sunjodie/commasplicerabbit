import {test} from 'node:test';
import assert from 'node:assert/strict';
import {FRAME_ART,fittedArtGeometry} from '../frame-art.js';
import {FROGS} from '../frogs.js';
test('complete paintings and frog source points fit above iPad reading panels',()=>{
 for(const [width,height] of [[1024,578],[1133,554],[1180,630],[1194,644],[1366,834]])for(const panelHeight of [160,210,300]){
  const available=height-panelHeight-20;
  for(const frame of FRAME_ART){
   const g=fittedArtGeometry(width,available,frame.cell,frame.columns||2,frame.rows||2),a=g.art;
   assert.ok(a.x>=-.01&&a.y>=-.01);
   assert.ok(a.x+a.width<=width+.01&&a.y+a.height<=available+.01);
   assert.ok(Math.abs(a.width/a.height-1.5)<.001);
   if(frame.frog){const f={...FROGS.find(f=>f.id===frame.frog.id),...frame.frog};
    const x=a.x+a.width*f.x/100,y=a.y+a.height*f.y/100;
    assert.ok(x>=a.x&&x<=a.x+a.width&&y>=a.y&&y<=a.y+a.height);
    assert.ok(y<height-panelHeight);
   }
  }
 }
});
