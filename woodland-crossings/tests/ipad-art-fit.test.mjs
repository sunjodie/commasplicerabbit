import {test} from 'node:test';
import assert from 'node:assert/strict';
import {FRAME_ART,ipadCoverGeometry} from '../frame-art.js';
test('iPad crops fill the entire landscape viewport without gutters or adjacent atlas cells',()=>{
 for(const [width,height] of [[1024,578],[1133,554],[1180,630],[1194,644],[1366,834]])for(const frame of FRAME_ART){
  const g=ipadCoverGeometry(width,height,frame.cell,frame.focus??.7,frame.columns||2,frame.rows||2),a=g.art;
  assert.ok(a.x<=.01&&a.y<=.01);
  assert.ok(a.x+a.width>=width-.01&&a.y+a.height>=height-.01);
  assert.ok(a.y===0,'top edge retained for faces and ears');
  assert.ok(Math.abs(a.width/a.height-1.5)<.001);
  assert.ok(Math.abs(g.x+(frame.cell%(frame.columns||2))*a.width-a.x)<.001);
  assert.ok(Math.abs(g.y+Math.floor(frame.cell/(frame.columns||2))*a.height-a.y)<.001);
 }
});
