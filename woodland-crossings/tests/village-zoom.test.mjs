import {test} from 'node:test';
import assert from 'node:assert/strict';
import {bindVillageZoom} from '../village-zoom.js';
test('village zoom enlarges the painting, preserves a focal point, pans and resets',()=>{
 const handlers={},controls=Object.fromEntries(['villageZoom','villageZoomOut','villageFit'].map(id=>[id,{setAttribute(){}}]));
 const canvas={style:{}},view={style:{},clientWidth:600,clientHeight:400,scrollLeft:0,scrollTop:0,setAttribute(k,v){this[k]=v;},addEventListener(k,fn){handlers[k]=fn;},getBoundingClientRect:()=>({left:0,top:0}),setPointerCapture(){}};
 bindVillageZoom({querySelector:s=>s==='.village-viewport'?view:s==='.village-canvas'?canvas:controls[s.slice(1)]});
 controls.villageZoom.onclick();assert.equal(canvas.style.width,'150%');assert.equal(view.style.height,'400px');assert.equal(view.scrollLeft,150);
 const ev=(id,x,y)=>({pointerId:id,clientX:x,clientY:y,button:0,preventDefault(){}});
 handlers.pointerdown(ev(1,100,100));handlers.pointermove(ev(1,140,120));assert.equal(view.scrollLeft,110);assert.equal(view.scrollTop,80);handlers.pointerup(ev(1,140,120));
 let stopped=false;handlers.click({preventDefault(){},stopPropagation(){stopped=true;}});assert.equal(stopped,true);
 handlers.pointerdown(ev(1,100,100));handlers.pointerdown(ev(2,200,100));handlers.pointermove(ev(2,300,100));assert.equal(canvas.style.width,'300%');handlers.pointerup(ev(1,100,100));handlers.pointerup(ev(2,300,100));
 controls.villageFit.onclick();assert.equal(canvas.style.width,'100%');assert.equal(view.style.height,'');assert.equal(view.scrollLeft,0);assert.equal(controls.villageZoomOut.disabled,true);
});
