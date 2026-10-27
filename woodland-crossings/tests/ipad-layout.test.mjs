import {test} from 'node:test';
import assert from 'node:assert/strict';
import {isIPad,portraitIPad} from '../ipad-layout.js';
test('iPad landscape preference recognises mobile and desktop iPad identities only',()=>{
 const ipad={userAgent:'Mozilla iPad',platform:'iPad',maxTouchPoints:5},desktop={userAgent:'Mozilla Macintosh',platform:'MacIntel',maxTouchPoints:5};
 for(const nav of [ipad,desktop]){
  assert.ok(isIPad(nav));
  for(const [w,h] of [[1024,768],[1133,744],[1180,820],[1194,834],[1366,1024]])assert.equal(portraitIPad(nav,{},w,h),false);
  assert.equal(portraitIPad(nav,{},768,1024),true);
  assert.equal(portraitIPad(nav,{orientation:{type:'portrait-primary'}},768,400),true,'keyboard does not change physical orientation');
 }
 assert.equal(isIPad({platform:'MacIntel',maxTouchPoints:0}),false);
 assert.equal(isIPad({userAgent:'iPhone',platform:'iPhone',maxTouchPoints:5}),false);
 assert.equal(isIPad({userAgent:'Android',platform:'Linux',maxTouchPoints:5}),false);
});
