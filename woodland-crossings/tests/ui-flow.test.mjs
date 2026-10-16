// Executes real UI handlers using a tiny DOM adapter. This checks wiring and
// state transitions, not browser layout, rendering, drag physics or accessibility.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {STORY} from '../content.js';
class Element {
 constructor(tag='div',attrs={}){this.tag=tag;this.attrs=attrs;this.dataset={};for(const[k,v]of Object.entries(attrs))if(k.startsWith('data-'))this.dataset[k.slice(5)]=v;this.children=[];this._html='';this.classList={add(){},remove(){},toggle(){}};this.open=false;}
 set innerHTML(value){this._html=value;this.children=[];for(const match of value.matchAll(/<(button|div|span|p|dialog)\b([^>]*)>/g)){const attrs={};for(const a of match[2].matchAll(/([\w-]+)="([^"]*)"/g))attrs[a[1]]=a[2];this.children.push(new Element(match[1],attrs));}}
 get innerHTML(){return this._html;}
 querySelectorAll(sel){if(sel.startsWith('#'))return this.children.filter(e=>e.attrs.id===sel.slice(1));const m=sel.match(/^\[([^=\]]+)(?:="([^"]*)")?\]$/);if(m)return this.children.filter(e=>Object.hasOwn(e.attrs,m[1])&&(m[2]===undefined||e.attrs[m[1]]===m[2]));if(sel.startsWith('.'))return this.children.filter(e=>(e.attrs.class||'').split(' ').includes(sel.slice(1)));return [];}
 querySelector(sel){return this.querySelectorAll(sel)[0]||null;}
 setAttribute(k,v){this.attrs[k]=v;}focus(){}showModal(){this.open=true;}close(){this.open=false;}
}
function setup(){const app=new Element(),fixed={};for(const id of ['modal','modalBody','closeModal','announce','villageBtn','guideBtn','soundBtn','saveBtn'])fixed[id]=new Element();globalThis.document={querySelector(sel){return sel==='#app'?app:fixed[sel.slice(1)]||app.querySelector(sel);}};const db=new Map();globalThis.localStorage={getItem:k=>db.get(k)||null,setItem:(k,v)=>db.set(k,v)};globalThis.window={};return{app,fixed,db,click(id){const b=document.querySelector('#'+id);assert.ok(b,`missing ${id}`);assert.equal(typeof b.onclick,'function',`${id} unwired`);b.onclick();},tool(t){const b=app.querySelector(`[data-tool="${t}"]`);assert.ok(b,`missing tool ${t}`);b.onclick();}};}
test('visual play handlers: demo, tap repair, retry, supply collection, village, paragraph and drag',async()=>{
 const ui=setup();await import('../app.js');ui.click('play');ui.click('demoStop');ui.click('startTrail');assert.match(ui.app.innerHTML,/reading-chart/);assert.equal(ui.app.querySelectorAll('[data-tool]').length,0);ui.app.querySelector('[data-join="0"]').onclick();assert.match(ui.app.innerHTML,/pip-art/);assert.match(ui.app.innerHTML,/draggable="true"/);
 ui.click('check');assert.match(ui.app.innerHTML,/One join needs another look/);ui.tool('stop');assert.match(ui.app.innerHTML.replace(/<[^>]*>/g,''),/The path beyond the old mill was hidden beneath fallen leaves\. Pip could no longer see where it led\./);ui.click('check');assert.match(ui.app.innerHTML,/On we go, Pip!/);ui.click('next');
 // Drag uses the very same fitting path as tapping, including persisted choice.
 const join=ui.app.querySelector('[data-join="0"]');join.ondrop({preventDefault(){},dataTransfer:{getData(){return 'stop';}}});let save=JSON.parse(ui.db.get('woodland-crossings-v1'));assert.equal(save.activeChoices[0],'stop');assert.equal(save.activeHelp,false);
 // Finish the rest of expedition one using authored solutions.
 while(!document.querySelector('#collect')){save=JSON.parse(ui.db.get('woodland-crossings-v1'));const q=(await import('../content.js')).BANK.find(q=>q.id===save.activeId);for(let i=0;i<q.valid.length;i++){ui.app.querySelector(`[data-join="${i}"]`).onclick();ui.tool(q.valid[i][0]);}ui.click('check');ui.click('next');}
 assert.match(ui.app.innerHTML,/reward-reveal/);ui.click('collect');ui.fixed.villageBtn.onclick();assert.match(ui.app.innerHTML,/village-landscape/);assert.match(ui.app.innerHTML,/Wildflowers/);assert.equal(JSON.parse(ui.db.get('woodland-crossings-v1')).decorations.length,1);
 // Reload into a paragraph challenge to exercise joins + continuous sentence UI.
 save=JSON.parse(ui.db.get('woodland-crossings-v1'));save.story=25;save.step=0;save.activeId=STORY[25].id;save.activeChoices=STORY[25].valid.map(()=> 'comma');save.activeHelp=false;save.activeTries=0;ui.db.set('woodland-crossings-v1',JSON.stringify(save));await import('../app.js?paragraph');ui.click('play');assert.match(ui.app.innerHTML,/passage-chart/);assert.doesNotMatch(ui.app.innerHTML,/clause-islands/);const q=STORY[25];for(let i=0;i<q.valid.length;i++){ui.app.querySelector(`[data-join="${i}"]`).onclick();ui.tool(q.valid[i][0]);}ui.click('check');assert.ok(document.querySelector('#next'));
});
test('scouting and lantern contract preserve grammar credit and earn permanent beacon sparks',async()=>{
 const ui=setup();const {fresh}=await import('../engine.js');const s=fresh();s.activeId=STORY[0].id;s.activeChoices=['comma'];ui.db.set('woodland-crossings-v1',JSON.stringify(s));await import('../app.js?contract-scout');ui.click('play');
 assert.equal(ui.app.querySelectorAll('[data-tool]').length,0);assert.match(ui.app.innerHTML,/Route already safe/);ui.click('contract');ui.app.querySelector('[data-join="0"]').onclick();ui.tool('stop');ui.click('check');assert.match(ui.app.innerHTML,/Grammatically correct/);let saved=JSON.parse(ui.db.get('woodland-crossings-v1'));assert.equal(saved.activeTries,0);assert.equal(saved.activeHelp,false);assert.equal(document.querySelector('#next'),null);
 ui.tool('and');ui.click('check');ui.click('next');saved=JSON.parse(ui.db.get('woodland-crossings-v1'));assert.equal(saved.beaconStars[0],2);
 // The next route is already correct: recognising that is an independent solve.
 assert.equal(ui.app.querySelectorAll('[data-tool]').length,0);ui.click('check');ui.click('next');saved=JSON.parse(ui.db.get('woodland-crossings-v1'));assert.equal(saved.beaconStars[0],3);assert.match(ui.app.innerHTML,/Beacon lit/);
});
test('memory trails offer recall sparks without showing an unavailable lantern contract',async()=>{const ui=setup();const {fresh}=await import('../engine.js');const s=fresh();s.story=30;s.reviewRun={skills:['boundaries'],index:0};ui.db.set('woodland-crossings-v1',JSON.stringify(s));await import('../app.js?review-contract');ui.click('play');assert.equal(document.querySelector('#contract'),null);assert.match(ui.app.innerHTML,/Independent recall adds a missing spark/);});
