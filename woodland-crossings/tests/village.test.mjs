import {test} from 'node:test';
import assert from 'node:assert/strict';
import {statSync,readFileSync} from 'node:fs';
import {fresh,hydrate,record,nextQuestion,startBonus} from '../engine.js';
import {VILLAGE_ART,VILLAGE_SITES,villageProgress,siteProgress,currentBuild,stageLabel,villageMarkup} from '../village.js';
const solve=(s,help=false)=>record(s,nextQuestion(s),help,0);
test('story deliveries build the current landmark step by step, leaving future sites empty',()=>{
 const s=fresh();assert.equal(villageProgress(s).filter(p=>p.phase).length,0);assert.equal(currentBuild(s).id,'burrow');
 for(let i=1;i<=5;i++){if(nextQuestion(s).remedial)solve(s);solve(s,true);const p=siteProgress(s,0);assert.equal(p.delivered,i);assert.equal(p.phase,Math.min(4,i));assert.equal(siteProgress(s,1).phase,0);assert.equal(p.finished,false);}
 assert.equal(siteProgress(s,0).ready,true);s.decorations.push({chapter:0,name:'Mushrooms'});assert.equal(siteProgress(s,0).finished,true);assert.equal(currentBuild(s).id,'garden');assert.match(stageLabel(siteProgress(s,0)),/finished/);
});
test('recovery and recall do not add construction deliveries, and reload retains built places',()=>{
 const s=fresh();solve(s,true);for(let i=0;i<3;i++)solve(s);assert.equal(nextQuestion(s).id,'r1');const before=villageProgress(s);solve(s);assert.deepEqual(villageProgress(s),before);
 s.decorations.push({chapter:0,name:'A lantern'});s.beaconStars[0]=3;const loaded=hydrate(JSON.parse(JSON.stringify(s)));assert.deepEqual(villageProgress(loaded),villageProgress(s));assert.equal(siteProgress(loaded,0).phase,4);assert.equal(siteProgress(loaded,0).beacon,true);
});
test('existing rewards stay visible even in a sparse older save, while restart empties the site',()=>{
 const s=hydrate({version:1,story:0,decorations:[{chapter:4,name:'Wildflowers'}]});assert.equal(siteProgress(s,4).phase,4);assert.equal(siteProgress(s,4).finished,true);assert.equal(siteProgress(fresh(),4).phase,0);
});
test('the fountain grows only from successful bonus tasks and flows only after earned',()=>{
 const s=fresh();s.story=30;assert.equal(siteProgress(s,6).phase,0);startBonus(s);solve(s);assert.equal(siteProgress(s,6).phase,1);solve(s,true);assert.equal(siteProgress(s,6).phase,1);solve(s);assert.equal(siteProgress(s,6).phase,2);assert.equal(siteProgress(s,6).finished,false);startBonus(s);assert.equal(solve(s).earned,true);assert.equal(s.bonusDecor,true);assert.equal(siteProgress(s,6).phase,4);
});
test('one panorama renders only earned layers, seven inspectable sites and chosen decorations',()=>{
 const s=fresh();s.story=7;s.decorations=[{chapter:0,name:'Mushrooms'}];const html=villageMarkup(s);assert.equal((html.match(/class="village-base"/g)||[]).length,1);assert.equal((html.match(/class="village-layer"/g)||[]).length,2);assert.equal((html.match(/data-village-site=/g)||[]).length,7);assert.match(html,/mask-burrow.svg/);assert.match(html,/framework.webp/);assert.doesNotMatch(html,/data-site="fountain"/);
 const preview=villageMarkup(s,{interactive:false,previewChapter:1,previewDecor:'A lantern'});assert.match(preview,/data-decoration="1"/);assert.doesNotMatch(preview,/data-village-site/);assert.equal(s.decorations.length,1);
});
test('all stage paintings and landmark masks are bundled at matching dimensions',()=>{
 assert.equal(VILLAGE_ART.length,5);for(const file of VILLAGE_ART){const buf=readFileSync(new URL('../'+file,import.meta.url));assert.ok(buf.length>1000);assert.equal(buf.toString('ascii',0,4),'RIFF');assert.equal(buf.toString('ascii',8,12),'WEBP');}
 for(const p of VILLAGE_SITES){const path=new URL(`../assets/village/mask-${p.id}.svg`,import.meta.url);assert.ok(statSync(path).size>100);assert.match(readFileSync(path,'utf8'),/viewBox="0 0 1536 1024"/);}
});
test('a legacy save with all bonus passes recovers its earned fountain',()=>{
 const s=hydrate({...fresh(),story:30,bonusPasses:['mixed','connectors','paragraph']});assert.equal(s.bonusDecor,true);assert.equal(siteProgress(s,6).phase,4);
});
test('landmark hit targets stay separated in a narrow fitted village',()=>{
 const width=264,height=width*2/3;
 for(let i=0;i<VILLAGE_SITES.length;i++)for(let j=i+1;j<VILLAGE_SITES.length;j++){
  const a=VILLAGE_SITES[i].point,b=VILLAGE_SITES[j].point;
  assert.ok(Math.abs(a[0]-b[0])*width/100>=44||Math.abs(a[1]-b[1])*height/100>=44,`${i} and ${j} touch targets overlap`);
 }
});

test('each landmark offers three distinct bundled painted additions with safe panorama placement',async()=>{
 const {FINISHING_TOUCHES,finishingTouches,finishingTouch}=await import('../finishing-touches.js');
 const {createHash}=await import('node:crypto');const ids=new Set(),images=new Set();
 assert.equal(FINISHING_TOUCHES.length,6);
 for(const [chapter,options]of FINISHING_TOUCHES.entries()){
  assert.equal(options.length,3);
  for(const d of options){
   assert.ok(!ids.has(d.id));ids.add(d.id);
   assert.equal(finishingTouch(chapter,d.id),d);assert.equal(finishingTouch(chapter,{name:d.name}),d);
   const buf=readFileSync(new URL('../'+d.image,import.meta.url));
   assert.equal(buf.toString('ascii',0,4),'RIFF');assert.equal(buf.toString('ascii',8,12),'WEBP');
   assert.ok(buf.includes(Buffer.from('ALPH')),`${d.id} must preserve transparency`);
   images.add(createHash('sha256').update(buf).digest('hex'));
   assert.ok(d.x-d.width/2>=0&&d.x+d.width/2<=100,d.id);
   assert.ok(d.y-d.width*1.5>=0&&d.y<=100,d.id);
   const s=fresh(),before=structuredClone(s);
   const html=villageMarkup(s,{previewChapter:chapter,previewDecor:d,interactive:false});
   assert.ok(html.includes(`data-touch="${d.id}"`));assert.ok(html.includes(d.image));
   assert.deepEqual(s,before,'preview must not award or save anything');
  }
 }
 assert.equal(ids.size,18);assert.equal(images.size,18);assert.deepEqual(finishingTouches(6),[]);
 assert.equal(finishingTouch(0,'Mushrooms'),null,'legacy choices keep their original artwork');
});
