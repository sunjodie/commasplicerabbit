// Executes real UI handlers using a tiny DOM adapter. This checks wiring and
// state transitions, not browser layout, rendering, drag physics or accessibility.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {STORY} from '../content.js';
import {CASEWORK} from '../casework.js';
class Element {
 constructor(tag='div',attrs={}){this.tag=tag;this.attrs=attrs;this.dataset={};for(const[k,v]of Object.entries(attrs))if(k.startsWith('data-'))this.dataset[k.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]=v;this.children=[];this._html='';this.classList={add(){},remove(){},toggle(){}};this.open=false;}
 set innerHTML(value){this._html=value;this.children=[];for(const match of value.matchAll(/<(button|div|span|p|dialog|input)\b([^>]*)>/g)){const attrs={};for(const a of match[2].matchAll(/([\w-]+)="([^"]*)"/g))attrs[a[1]]=a[2];this.children.push(new Element(match[1],attrs));}}
 get innerHTML(){return this._html;}
 querySelectorAll(sel){if(sel.startsWith('#'))return this.children.filter(e=>e.attrs.id===sel.slice(1));const m=sel.match(/^\[([^=\]]+)(?:="([^"]*)")?\]$/);if(m)return this.children.filter(e=>Object.hasOwn(e.attrs,m[1])&&(m[2]===undefined||e.attrs[m[1]]===m[2]));if(sel.startsWith('.'))return this.children.filter(e=>(e.attrs.class||'').split(' ').includes(sel.slice(1)));return [];}
 querySelector(sel){return this.querySelectorAll(sel)[0]||null;}
 setAttribute(k,v){this.attrs[k]=v;}focus(){}showModal(){this.open=true;}close(){this.open=false;}
}
function setup({autoRead=true,autoCasework=true}={}){const app=new Element(),fixed={};for(const id of ['modal','modalBody','closeModal','announce','villageBtn','guideBtn','soundBtn','saveBtn'])fixed[id]=new Element();globalThis.document={querySelector(sel){return sel==='#app'?app:fixed[sel.slice(1)]||app.querySelector(sel);}};const db=new Map();globalThis.localStorage={getItem:k=>db.get(k)||null,setItem:(k,v)=>db.set(k,v)};globalThis.window={};return{app,fixed,db,click(id){const b=document.querySelector('#'+id);assert.ok(b,`missing ${id}`);assert.equal(typeof b.onclick,'function',`${id} unwired`);b.onclick();if(autoRead||autoCasework){let guard=0;while(guard++<35){const story=app.querySelector('#storyNext');if(story&&autoRead){story.onclick();continue;}const task=CASEWORK.find(t=>app.innerHTML.includes(t.title)&&app.querySelector('.casework-page'));if(task&&autoCasework){const route=app.querySelector('[data-case-route]');if(route){route.onclick();continue;}const next=app.querySelector('#caseworkContinue');if(next){next.onclick();continue;}const choice=app.querySelector(`[data-case-choice="${task.kind==='grammar'?task.word:task.answer}"]`);if(choice)choice.onclick();if(task.evidence)app.querySelector(`[data-case-evidence="${task.evidenceAnswer}"]`).onclick();if(task.kind==='grammar'){const input=app.querySelector('#caseCorrection');input.value=task.answer;input.oninput();}app.querySelector('#caseworkCheck').onclick();continue;}break;}assert.ok(guard<35,'reading/casework flow stalled');}},tool(t){const b=app.querySelector(`[data-tool="${t}"]`);assert.ok(b,`missing tool ${t}`);b.onclick();}};}
test('visual play handlers: demo, tap repair, retry, supply collection, village, paragraph and drag',async()=>{
 const ui=setup();await import('../app.js');ui.click('play');ui.click('demoStop');ui.click('startTrail');assert.match(ui.app.innerHTML,/reading-chart/);assert.equal(ui.app.querySelectorAll('[data-tool]').length,0);ui.app.querySelector('[data-join="0"]').onclick();assert.doesNotMatch(ui.app.innerHTML,/class="pip-guide"/);assert.match(ui.app.innerHTML,/draggable="true"/);
 ui.click('check');assert.match(ui.app.innerHTML,/One join needs another look/);ui.tool('stop');assert.match(ui.app.innerHTML.replace(/<[^>]*>/g,''),/The villagers were dismantling the last stalls\. Beyond the gardens, a light appeared in the mill’s upper window\./);ui.click('check');assert.match(ui.app.innerHTML,/Note saved\./);ui.click('next');
 // Drag uses the very same fitting path as tapping, including persisted choice.
 const join=ui.app.querySelector('[data-join="0"]');join.ondrop({preventDefault(){},dataTransfer:{getData(){return 'stop';}}});let save=JSON.parse(ui.db.get('woodland-crossings-v1'));assert.equal(save.activeChoices[0],'stop');assert.equal(save.activeHelp,false);
 // Finish the rest of expedition one using authored solutions.
 while(!document.querySelector('#collect')){save=JSON.parse(ui.db.get('woodland-crossings-v1'));const q=(await import('../content.js')).BANK.find(q=>q.id===save.activeId);for(let i=0;i<q.valid.length;i++){ui.app.querySelector(`[data-join="${i}"]`).onclick();ui.tool(q.valid[i][0]);}ui.click('check');ui.click('next');}
 assert.match(ui.app.innerHTML,/reward-reveal/);ui.click('collect');ui.fixed.villageBtn.onclick();assert.match(ui.app.innerHTML,/village-landscape/);ui.app.querySelector('[data-village-site="0"]').onclick();assert.match(ui.fixed.modalBody.innerHTML,/Wildflowers/);ui.click('closeModal');assert.equal(JSON.parse(ui.db.get('woodland-crossings-v1')).decorations.length,1);
 // Reload into a paragraph challenge to exercise joins + continuous sentence UI.
 save=JSON.parse(ui.db.get('woodland-crossings-v1'));save.story=25;save.step=0;save.activeId=STORY[25].id;save.activeChoices=STORY[25].valid.map(()=> 'comma');save.activeHelp=false;save.activeTries=0;ui.db.set('woodland-crossings-v1',JSON.stringify(save));await import('../app.js?paragraph');ui.click('play');assert.match(ui.app.innerHTML,/passage-chart/);assert.doesNotMatch(ui.app.innerHTML,/clause-islands/);const q=STORY[25];for(let i=0;i<q.valid.length;i++){ui.app.querySelector(`[data-join="${i}"]`).onclick();ui.tool(q.valid[i][0]);}ui.click('check');assert.ok(document.querySelector('#next'));
});
test('editing brief distinguishes grammatical alternatives without charging a mistake',async()=>{
 const ui=setup();const {fresh}=await import('../engine.js');const s=fresh();s.activeId=STORY[0].id;s.activeChoices=['comma'];ui.db.set('woodland-crossings-v1',JSON.stringify(s));await import('../app.js?brief-scout');ui.click('play');
 assert.match(ui.app.innerHTML,/Your task/);assert.equal(document.querySelector('#contract'),null);ui.app.querySelector('[data-join="0"]').onclick();ui.tool('semi');ui.click('check');assert.match(ui.app.innerHTML,/This works, but check what Pip needs/);let saved=JSON.parse(ui.db.get('woodland-crossings-v1'));assert.equal(saved.activeTries,0);assert.equal(saved.activeHelp,false);assert.equal(document.querySelector('#next'),null);
 ui.tool('stop');ui.click('check');ui.click('next');saved=JSON.parse(ui.db.get('woodland-crossings-v1'));assert.equal(saved.beaconStars[0],1);ui.click('check');ui.click('next');saved=JSON.parse(ui.db.get('woodland-crossings-v1'));assert.equal(saved.beaconStars[0],2);assert.deepEqual(saved.recovery,{});
});
test('memory trails use a supported structure and do not display conflicting contracts',async()=>{const ui=setup();const {fresh,record,startReview,DAY}=await import('../engine.js');const s=fresh();record(s,STORY[0],true,0);s.story=30;startReview(s,DAY);ui.db.set('woodland-crossings-v1',JSON.stringify(s));await import('../app.js?review-brief');ui.click('play');assert.equal(document.querySelector('#contract'),null);assert.match(ui.app.innerHTML,/compact-supply/);assert.match(ui.app.innerHTML,/Your task/);});
test('chapters without sentence demos enter witness notes and final reports safely',async()=>{for(const story of [20,25]){const ui=setup();const {fresh}=await import('../engine.js');const s=fresh();s.story=story;ui.db.set('woodland-crossings-v1',JSON.stringify(s));await import('../app.js?lesson-'+story);ui.click('play');assert.equal(document.querySelector('#showDemo'),null);ui.click('startTrail');assert.match(ui.app.innerHTML,/passage-chart/);assert.match(ui.app.innerHTML,/Your task/);}});
test('woodland discoveries persist once and do not change grammar progress',async()=>{const ui=setup();await import('../app.js?easter-eggs');const egg=ui.app.querySelector('[data-egg="ghost-shroom"]');assert.ok(egg);egg.onclick();let s=JSON.parse(ui.db.get('woodland-crossings-v1'));assert.deepEqual(s.easterEggs,['ghost-shroom']);assert.equal(s.seq,0);assert.equal(s.story,0);assert.deepEqual(s.beaconStars,[0,0,0,0,0,0]);egg.onclick();s=JSON.parse(ui.db.get('woodland-crossings-v1'));assert.equal(s.easterEggs.length,1);assert.match(ui.fixed.modalBody.innerHTML,/Optional discoveries never affect your grammar score/);});
test('mystery ending unlocks without secrets or independent stamps and explains all three clues',async()=>{const ui=setup();const {fresh}=await import('../engine.js');const s=fresh();s.story=30;s.completedAt=1;ui.db.set('woodland-crossings-v1',JSON.stringify(s));await import('../app.js?ending');assert.match(ui.app.innerHTML,/Case closed/);assert.match(ui.app.innerHTML,/No thief/);assert.match(ui.app.innerHTML,/0 \/ 6 woodland secrets/);ui.app.querySelector('[data-rescue="1"]').onclick();assert.match(document.querySelector('#rescueExplanation').textContent,/portable warning bell upstream/);ui.app.querySelector('[data-rescue="2"]').onclick();assert.match(document.querySelector('#rescueExplanation').textContent,/marked hillside route/);ui.click('endingVillage');ui.click('caseNotes');assert.match(ui.fixed.modalBody.innerHTML,/6 \/ 6 notes uncovered/);ui.click('closeModal');assert.ok(document.querySelector('#endingReplay'));ui.click('endingReplay');assert.match(ui.app.innerHTML,/Case closed/);});
test('final supported chapter completion opens the mystery ending after the reward choice',async()=>{const ui=setup();const {fresh}=await import('../engine.js');const s=fresh();s.story=30;s.pendingReward=5;ui.db.set('woodland-crossings-v1',JSON.stringify(s));await import('../app.js?ending-reward');assert.ok(document.querySelector('#collect'));ui.click('collect');assert.match(ui.app.innerHTML,/Case closed/);const saved=JSON.parse(ui.db.get('woodland-crossings-v1'));assert.equal(saved.endingSeen,true);assert.equal(saved.decorations.length,1);});
test('completed locations can be revisited for missed secrets without replaying questions',async()=>{const ui=setup();const {fresh}=await import('../engine.js');const s=fresh();s.story=30;ui.db.set('woodland-crossings-v1',JSON.stringify(s));await import('../app.js?secret-revisit');ui.click('endingSecrets');const revisit=ui.fixed.modalBody.querySelector('[data-revisit="0"]');assert.ok(revisit);revisit.onclick();const egg=ui.fixed.modalBody.querySelector('[data-egg="ghost-shroom"]');assert.ok(egg);egg.onclick();const saved=JSON.parse(ui.db.get('woodland-crossings-v1'));assert.equal(saved.story,30);assert.equal(saved.seq,0);assert.deepEqual(saved.easterEggs,['ghost-shroom']);});

test('a real grammar error is highlighted ahead of a grammatical non-target repair',async()=>{
 const ui=setup();const {fresh}=await import('../engine.js');const s=fresh(),q=STORY[29];s.story=29;s.activeId=q.id;s.activeChoices=q.valid.map(v=>v[0]);s.activeChoices[3]='and';s.activeChoices[4]='comma';ui.db.set('woodland-crossings-v1',JSON.stringify(s));await import('../app.js?mixed-brief-error');ui.click('play');ui.click('check');
 assert.equal(ui.app.querySelector('[data-join="4"]').attrs['aria-pressed'],'true');assert.equal(ui.app.querySelector('[data-join="3"]').attrs['aria-pressed'],'false');assert.equal(JSON.parse(ui.db.get('woodland-crossings-v1')).activeTries,1);
});

test('each chapter loads its own local location in play and saved scene revisits',async()=>{
 const {fresh}=await import('../engine.js');const {SCENES}=await import('../scenery.js');assert.equal(new Set(SCENES.map(x=>x.asset)).size,6);
 for(let stage=0;stage<6;stage++){const ui=setup(),s=fresh();s.story=stage*5;s.introduced=[0,1,2,3,4,5];ui.db.set('woodland-crossings-v1',JSON.stringify(s));await import('../app.js?chapter-scenery-'+stage);ui.click('play');assert.ok(ui.app.innerHTML.includes(`assets/${SCENES[stage].asset}`));assert.ok(ui.app.innerHTML.includes(SCENES[stage].indoors?'indoor-scene':'outdoor-scene'));}
 const ui=setup(),s=fresh();s.story=30;ui.db.set('woodland-crossings-v1',JSON.stringify(s));await import('../app.js?scenery-revisit');ui.click('endingSecrets');ui.fixed.modalBody.querySelector('[data-revisit="3"]').onclick();assert.match(ui.fixed.modalBody.innerHTML,/assets\/map-room.webp/);
});

test('restart is explicit, cancellable, and clears only after confirmation',async()=>{
 const ui=setup();const {fresh}=await import('../engine.js');const s=fresh();s.story=14;s.seq=18;s.decorations=[{chapter:0,name:'Wildflowers'}];s.easterEggs=['ghost-shroom'];s.beaconStars=[3,2,0,0,0,0];s.activeId=STORY[14].id;s.activeChoices=STORY[14].valid.map(()=> 'comma');ui.db.set('woodland-crossings-v1',JSON.stringify(s));await import('../app.js?restart-home');
 ui.click('restartGame');assert.match(ui.fixed.modalBody.innerHTML,/clears this browser/);ui.fixed.modalBody.querySelector('#cancelRestart').onclick();assert.equal(JSON.parse(ui.db.get('woodland-crossings-v1')).story,14);assert.equal(ui.fixed.modal.open,false);
 ui.click('restartGame');ui.fixed.modalBody.querySelector('#confirmRestart').onclick();const saved=JSON.parse(ui.db.get('woodland-crossings-v1'));assert.equal(saved.story,0);assert.equal(saved.seq,0);assert.equal(saved.activeId,null);assert.deepEqual(saved.decorations,[]);assert.deepEqual(saved.easterEggs||[],[]);assert.deepEqual(saved.beaconStars,[0,0,0,0,0,0]);assert.deepEqual(saved.recovery,{});assert.match(ui.app.innerHTML,/Meet Pip/);ui.click('play');ui.click('startTrail');assert.equal(JSON.parse(ui.db.get('woodland-crossings-v1')).activeId,STORY[0].id);
});
test('restart is reachable from the ending and from save status during a question',async()=>{
 const {fresh}=await import('../engine.js');let ui=setup(),s=fresh();s.story=30;ui.db.set('woodland-crossings-v1',JSON.stringify(s));await import('../app.js?restart-ending');ui.click('endingRestart');assert.ok(ui.fixed.modalBody.querySelector('#confirmRestart'));ui.fixed.modalBody.querySelector('#cancelRestart').onclick();assert.match(ui.app.innerHTML,/Case closed/);
 ui=setup();await import('../app.js?restart-save');ui.click('play');ui.click('startTrail');ui.fixed.saveBtn.onclick();ui.fixed.modalBody.querySelector('#restartFromSave').onclick();ui.fixed.modalBody.querySelector('#cancelRestart').onclick();assert.ok(ui.app.querySelector('[data-join="0"]'));assert.equal(JSON.parse(ui.db.get('woodland-crossings-v1')).activeId,STORY[0].id);
});

test('an already-correct note accepts only the unchanged commas under its visible rules',async()=>{
 const ui=setup();const {fresh}=await import('../engine.js');const s=fresh();s.story=23;s.activeId=STORY[23].id;s.activeChoices=['comma','semi','comma'];ui.db.set('woodland-crossings-v1',JSON.stringify(s));await import('../app.js?one-answer-correct-note');ui.click('play');assert.doesNotMatch(ui.app.innerHTML,/already correctly punctuated|Add only|editing-goals/);ui.click('editingRules');assert.match(document.querySelector('#modalBody').innerHTML,/Keep correct commas/);ui.click('closeModal');ui.click('check');assert.match(ui.app.innerHTML,/check what Pip needs/);assert.equal(document.querySelector('#next'),null);assert.equal(JSON.parse(ui.db.get('woodland-crossings-v1')).activeTries,0);ui.app.querySelector('[data-join="1"]').onclick();ui.tool('comma');ui.click('check');assert.ok(document.querySelector('#next'));
});

test('artwork has a separate panel and an unobstructed view without altering the question',async()=>{
 const ui=setup();await import('../app.js?art-first');ui.click('play');ui.click('startTrail');const html=ui.app.innerHTML;assert.match(html,/art-first/);const art=html.slice(html.indexOf('<div class="world-stage">'),html.indexOf('<div class="case-workspace">'));assert.doesNotMatch(art,/reading-chart|Your task/);assert.match(html.slice(html.indexOf('<div class="case-workspace">')),/reading-chart/);
 ui.app.querySelector('[data-join="0"]').onclick();ui.tool('stop');const before=JSON.parse(ui.db.get('woodland-crossings-v1'));ui.click('viewArtwork');assert.match(ui.fixed.modalBody.innerHTML,/artwork-preview/);assert.match(ui.fixed.modalBody.innerHTML,/assets\/chapter-one\/fair-v3.webp/);assert.doesNotMatch(ui.fixed.modalBody.innerHTML,/data-join|reading-chart/);ui.fixed.closeModal.onclick();const after=JSON.parse(ui.db.get('woodland-crossings-v1'));assert.equal(after.activeId,before.activeId);assert.deepEqual(after.activeChoices,before.activeChoices);assert.equal(after.activeHelp,false);ui.click('check');assert.ok(document.querySelector('#next'));
});

test('play keeps artwork, question and answers in order without the village preview',async()=>{
 const ui=setup();await import('../app.js?stacked-layout');ui.click('play');ui.click('startTrail');const html=ui.app.innerHTML;assert.ok(html.indexOf('class="world-stage"')<html.indexOf('class="case-workspace"'));assert.ok(html.indexOf('class="case-workspace"')<html.indexOf('class="builder-dock"'));assert.doesNotMatch(html,/peekVillage|trail-destination/);assert.match(html,/compact-supply/);ui.fixed.villageBtn.onclick();assert.match(ui.app.innerHTML,/village-landscape/);
});

test('advancing changes the scene while editing, hints and reload preserve the current view',async()=>{
 const ui=setup();await import('../app.js?question-scenes');ui.click('play');ui.click('startTrail');const first=JSON.parse(ui.db.get('woodland-crossings-v1')).activeScenery.key;ui.app.querySelector('[data-join="0"]').onclick();ui.tool('stop');assert.equal(JSON.parse(ui.db.get('woodland-crossings-v1')).activeScenery.key,first);ui.click('check');ui.click('next');const second=JSON.parse(ui.db.get('woodland-crossings-v1')).activeScenery.key;assert.notEqual(first,second);assert.match(ui.app.innerHTML,/assets\/chapter-one\/window-v3.webp/);ui.click('viewArtwork');assert.match(ui.fixed.modalBody.innerHTML,/background-size:100% 100%/);ui.fixed.closeModal.onclick();ui.click('hint');assert.equal(JSON.parse(ui.db.get('woodland-crossings-v1')).activeScenery.key,second);await import('../app.js?question-scenes-reload');ui.click('play');assert.equal(JSON.parse(ui.db.get('woodland-crossings-v1')).activeScenery.key,second);
});

test('meaning-based briefs keep exact-word hints behind an explicit request',async()=>{
 const ui=setup();const {fresh}=await import('../engine.js');const s=fresh();s.story=6;s.activeId='m7';s.activeChoices=['comma'];ui.db.set('woodland-crossings-v1',JSON.stringify(s));await import('../app.js?quiet-hints');ui.click('play');
 assert.match(ui.app.innerHTML,/makes the contrast explicit/);assert.doesNotMatch(ui.app.innerHTML,/Use BUT|Add only|editing-goals/);
 const scene=ui.app.innerHTML.slice(ui.app.innerHTML.indexOf('class="scene '),ui.app.innerHTML.indexOf('class="case-workspace"'));assert.doesNotMatch(scene,/class="rabbit /);assert.doesNotMatch(ui.app.innerHTML,/class="pip-guide"|class="pip-speech"/);
 ui.click('check');ui.click('check');assert.doesNotMatch(ui.app.innerHTML,/Try “|Comma \+ but|Use BUT/);ui.click('hint');assert.match(ui.app.innerHTML,/What the note needs:|Use BUT/);assert.equal(JSON.parse(ui.db.get('woodland-crossings-v1')).activeHelp,true);
});

test('grammatical non-target feedback does not reveal the requested conjunction',async()=>{
 const ui=setup();const {fresh}=await import('../engine.js');const s=fresh();s.story=6;s.activeId='m7';s.activeChoices=['semi'];ui.db.set('woodland-crossings-v1',JSON.stringify(s));await import('../app.js?neutral-hints');ui.click('play');ui.click('check');assert.match(ui.app.innerHTML,/This works, but check what Pip needs/);assert.doesNotMatch(ui.app.innerHTML,/Use BUT|Comma \+ but|Add only/);assert.equal(JSON.parse(ui.db.get('woodland-crossings-v1')).activeTries,0);
});

test('compact mobile controls expose rules on demand without altering edits or support',async()=>{
 const ui=setup();const {fresh}=await import('../engine.js');const s=fresh();s.story=3;s.activeId='m4';s.activeChoices=['comma','comma'];ui.db.set('woodland-crossings-v1',JSON.stringify(s));await import('../app.js?compact-mobile');ui.click('play');
 assert.match(ui.app.innerHTML,/class="join-anchor">cloth<button/);assert.match(ui.app.innerHTML,/class="join-anchor">stitches<button/);assert.doesNotMatch(ui.app.innerHTML,/class="editing-rules"/);assert.match(ui.app.innerHTML,/Tap a comma to edit/);
 const speech=ui.app.innerHTML.slice(ui.app.innerHTML.indexOf('class="world-stage"'),ui.app.innerHTML.indexOf('class="case-workspace"'));assert.match(speech,/id="viewArtwork"/);assert.match(speech,/aria-label="View artwork"/);
 const before=JSON.parse(ui.db.get('woodland-crossings-v1'));ui.click('editingRules');assert.match(ui.fixed.modalBody.innerHTML,/Keep correct commas/);ui.click('closeModal');const after=JSON.parse(ui.db.get('woodland-crossings-v1'));assert.deepEqual(after.activeChoices,before.activeChoices);assert.equal(after.activeHelp,false);ui.click('check');assert.ok(document.querySelector('#next'));
});

test('inline joins preserve report wording, paragraph breaks and full-stop capitalisation',async()=>{
 const ui=setup();const {fresh,renderSentence}=await import('../engine.js');const q=STORY[29],s=fresh();s.story=29;s.activeId=q.id;s.activeChoices=q.valid.map(v=>v[0]);ui.db.set('woodland-crossings-v1',JSON.stringify(s));await import('../app.js?inline-report');ui.click('play');const sentence=ui.app.innerHTML.split('aria-label="Route to scout">')[1].split('</div>')[0];const text=sentence.replace(/<[^>]*>/g,'').replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');assert.equal(text,renderSentence(q,s.activeChoices));assert.match(text,/\n\n/);assert.match(text,/\. By dawn/);ui.click('check');assert.ok(document.querySelector('#next'));
});

test('village is one inspectable panorama with zoom and optional case notes',async()=>{
 const ui=setup();const {fresh}=await import('../engine.js');const s=fresh();s.story=7;s.decorations=[{chapter:0,name:'Mushrooms'}];ui.db.set('woodland-crossings-v1',JSON.stringify(s));await import('../app.js?village-panorama');ui.fixed.villageBtn.onclick();assert.match(ui.app.innerHTML,/village-canvas village-landscape/);assert.doesNotMatch(ui.app.innerHTML,/class="building |evidence-grid/);assert.match(ui.app.innerHTML,/Timber|Young ferns planted/);ui.click('villageZoom');assert.equal(ui.app.querySelector('.village-viewport').attrs['data-zoom'],'2');ui.click('villageZoom');assert.equal(ui.app.querySelector('.village-viewport').attrs['data-zoom'],'1');ui.app.querySelector('[data-village-site="0"]').onclick();assert.match(ui.fixed.modalBody.innerHTML,/Mushrooms/);ui.click('closeModal');ui.click('caseNotes');assert.match(ui.fixed.modalBody.innerHTML,/evidence-grid/);ui.click('closeModal');assert.equal(JSON.parse(ui.db.get('woodland-crossings-v1')).story,7);
});

test('construction peek preserves an open repair and reward choices update the scene',async()=>{
 const ui=setup();const {fresh}=await import('../engine.js');const s=fresh();s.activeId='m1';s.activeChoices=['semi'];ui.db.set('woodland-crossings-v1',JSON.stringify(s));await import('../app.js?village-peek');ui.click('play');ui.click('buildPeek');assert.match(ui.fixed.modalBody.innerHTML,/village-base/);ui.click('closeModal');assert.deepEqual(JSON.parse(ui.db.get('woodland-crossings-v1')).activeChoices,['semi']);assert.equal(JSON.parse(ui.db.get('woodland-crossings-v1')).activeHelp,false);
 const ui2=setup(),t=fresh();t.story=5;t.pendingReward=0;ui2.db.set('woodland-crossings-v1',JSON.stringify(t));await import('../app.js?village-reward');assert.match(ui2.app.innerHTML,/village-reward-art/);ui2.app.querySelector('[data-decor="1"]').onclick();assert.match(document.querySelector('#rewardVillage').innerHTML,/#bb704e/);ui2.click('collect');const saved=JSON.parse(ui2.db.get('woodland-crossings-v1'));assert.equal(saved.decorations[0].name,'Mushrooms');assert.equal(saved.pendingReward,null);
});

test('story reader resumes its page through reload and village without counting a hint or delivery',async()=>{
 const ui=setup({autoRead:false,autoCasework:false});await import('../app.js?reader-resume');ui.click('play');ui.click('startTrail');assert.match(ui.app.innerHTML,/By the time Pip and Mara left/);assert.doesNotMatch(ui.app.innerHTML,/reading-chart/);
 ui.click('storyNext');let saved=JSON.parse(ui.db.get('woodland-crossings-v1'));assert.equal(saved.chapterOne.positions.m1,1);assert.equal(saved.story,0);assert.equal(saved.seq,0);assert.equal(saved.activeHelp,false);
 ui.fixed.guideBtn.onclick();ui.click('closeModal');assert.equal(JSON.parse(ui.db.get('woodland-crossings-v1')).activeHelp,false);
 await import('../app.js?reader-reload');ui.click('play');assert.match(ui.app.innerHTML,/Page 2 \/ /);ui.fixed.villageBtn.onclick();ui.click('back');assert.match(ui.app.innerHTML,/Page 2 \/ /);
 ui.click('storyPrevious');assert.match(ui.app.innerHTML,/By the time Pip and Mara left/);let guard=0;while(ui.app.querySelector('#storyNext')){assert.ok(guard++<20);ui.click('storyNext');}
 assert.match(ui.app.innerHTML,/reading-chart/);saved=JSON.parse(ui.db.get('woodland-crossings-v1'));assert.deepEqual(saved.chapterOne.read,['m1']);assert.equal(saved.story,0);assert.equal(saved.seq,0);
 ui.app.querySelector('[data-join="0"]').onclick();ui.tool('stop');ui.click('check');ui.click('next');assert.match(ui.app.innerHTML,/Alders hid the mill’s lower walls/);assert.equal(JSON.parse(ui.db.get('woodland-crossings-v1')).story,1);
});

test('storybook hides unreached scenes and replay preserves edits, support and deliveries',async()=>{
 const ui=setup();await import('../app.js?book-replay');ui.click('readStory');assert.equal(ui.fixed.modalBody.querySelectorAll('[data-book-scene]').length,1);ui.fixed.modalBody.querySelector('[data-book-scene="m1"]').onclick();assert.match(ui.fixed.modalBody.innerHTML,/By the time Pip and Mara left/);ui.fixed.modalBody.querySelector('#bookNext').onclick();ui.click('closeModal');ui.click('play');ui.click('startTrail');ui.app.querySelector('[data-join="0"]').onclick();ui.tool('semi');
 const before=JSON.parse(ui.db.get('woodland-crossings-v1'));ui.click('readStory');ui.fixed.modalBody.querySelector('[data-book-scene="m1"]').onclick();ui.fixed.modalBody.querySelector('#bookNext').onclick();ui.click('closeModal');assert.deepEqual(JSON.parse(ui.db.get('woodland-crossings-v1')),before);assert.match(ui.app.innerHTML,/reading-chart/);
});

test('Chapter 1 repairs reveal story beats without double-awarding progress or replaying them on recovery',async()=>{
 const {fresh}=await import('../engine.js');
 for(let i=0;i<5;i++){
  const ui=setup(),s=fresh(),q=STORY[i];s.story=i;s.activeId=q.id;s.activeChoices=q.valid.map(v=>v[0]);ui.db.set('woodland-crossings-v1',JSON.stringify(s));await import('../app.js?note-payoff-'+i);ui.click('play');
  assert.doesNotMatch(ui.app.innerHTML,/story-payoff|pip-speech/);const before=JSON.parse(ui.db.get('woodland-crossings-v1'));ui.click('check');assert.match(ui.app.innerHTML,/class="story-payoff/);assert.match(ui.app.innerHTML,/note-consequence/);assert.match(ui.app.innerHTML,/Why this edit works/);assert.equal(JSON.parse(ui.db.get('woodland-crossings-v1')).story,before.story);assert.equal(JSON.parse(ui.db.get('woodland-crossings-v1')).seq,before.seq);if(i===4){assert.match(ui.app.innerHTML,/bell-payoff/);assert.match(ui.app.innerHTML,/Keep this as one sentence without adding or removing words\./);}
 }
 const ui=setup(),s=fresh();s.activeId='r1';s.activeChoices=['stop'];ui.db.set('woodland-crossings-v1',JSON.stringify(s));await import('../app.js?recovery-no-payoff');ui.click('play');ui.click('check');assert.doesNotMatch(ui.app.innerHTML,/class="story-payoff|note-consequence/);
});

test('grammar stop saves a selected word and typed correction, resumes, and leaves the punctuation task untouched',async()=>{
 const ui=setup({autoRead:false,autoCasework:false}),{fresh}=await import('../engine.js'),s=fresh();s.story=3;s.activeId='m4';s.activeChoices=['comma','comma'];s.casework={'dark-window':{completed:true},'yellow-stitches':{completed:true}};s.chapterOne={read:['m4'],positions:{}};ui.db.set('woodland-crossings-v1',JSON.stringify(s));await import('../app.js?word-edit');ui.click('play');assert.match(ui.app.innerHTML,/Quick grammar edit/);assert.doesNotMatch(ui.app.innerHTML,/reading-chart/);
 ui.app.querySelector('[data-case-choice="6"]').onclick();let input=ui.app.querySelector('#caseCorrection');input.value='is';input.oninput();ui.click('caseworkCheck');assert.match(ui.app.innerHTML,/Keep the note in the past tense/);assert.equal(JSON.parse(ui.db.get('woodland-crossings-v1')).activeHelp,false);
 input=ui.app.querySelector('#caseCorrection');input.value='was';input.oninput();ui.fixed.guideBtn.onclick();ui.click('closeModal');await import('../app.js?word-edit-resume');ui.click('play');assert.equal(ui.app.querySelector('#caseCorrection').attrs.value,'was');assert.equal(ui.app.querySelector('[data-case-choice="6"]').attrs['aria-pressed'],'true');ui.click('caseworkCheck');assert.match(ui.app.innerHTML,/The note is clear/);ui.click('caseworkContinue');assert.match(ui.app.innerHTML,/reading-chart/);let saved=JSON.parse(ui.db.get('woodland-crossings-v1'));assert.deepEqual(saved.activeChoices,['comma','comma']);assert.equal(saved.story,3);assert.equal(saved.seq,0);assert.equal(saved.activeHelp,false);assert.equal(saved.casework['wood-note'].completed,true);
});

test('detective leads change the observation, persist on reload, and require a valid claim with evidence',async()=>{
 for(const route of ['latch','repair']){
  const ui=setup({autoRead:false,autoCasework:false}),{fresh}=await import('../engine.js'),s=fresh();s.story=3;s.activeId='m4';s.activeChoices=['comma','comma'];s.casework={'wood-note':{completed:true},'dark-window':{completed:true}};s.chapterOne={read:['m4'],positions:{}};ui.db.set('woodland-crossings-v1',JSON.stringify(s));await import('../app.js?detective-'+route);ui.click('play');assert.match(ui.app.innerHTML,/Where should we look first/);ui.app.querySelector(`[data-case-route="${route}"]`).onclick();assert.match(ui.app.innerHTML,route==='latch'?/loose threads/:/worst stitch/);
  ui.app.querySelector('[data-case-choice="coat"]').onclick();ui.app.querySelector('[data-case-evidence="green-mud"]').onclick();ui.click('caseworkCheck');assert.match(ui.app.innerHTML,/Now find the two details/);assert.equal(document.querySelector('#caseworkContinue'),null);ui.click('caseworkHint');assert.equal(JSON.parse(ui.db.get('woodland-crossings-v1')).activeHelp,false);
  await import('../app.js?detective-resume-'+route);ui.click('play');assert.doesNotMatch(ui.app.innerHTML,/Where should we look first/);ui.app.querySelector('[data-case-evidence="stitches-memory"]').onclick();ui.click('caseworkCheck');ui.click('caseworkContinue');assert.match(ui.app.innerHTML,/reading-chart/);const saved=JSON.parse(ui.db.get('woodland-crossings-v1'));assert.equal(saved.casework['yellow-stitches'].route,route);assert.equal(saved.story,3);assert.equal(saved.seq,0);assert.equal(saved.activeHelp,false);
 }
});

test('context vocabulary rejects an unsupported motive without revealing later plot or awarding supplies',async()=>{
 const ui=setup({autoRead:false,autoCasework:false}),{fresh}=await import('../engine.js'),s=fresh();s.story=3;s.activeId='m4';s.activeChoices=['comma','comma'];s.casework={'wood-note':{completed:true},'yellow-stitches':{completed:true}};s.chapterOne={read:['m4'],positions:{}};ui.db.set('woodland-crossings-v1',JSON.stringify(s));await import('../app.js?context-vocabulary');ui.click('play');ui.app.querySelector('[data-case-choice="concealed"]').onclick();ui.click('caseworkCheck');assert.match(ui.app.innerHTML,/Does the passage actually tell you that/);assert.doesNotMatch(ui.app.innerHTML,/selling|debt|supporting timber/);ui.app.querySelector('[data-case-choice="distant"]').onclick();ui.click('caseworkCheck');ui.click('caseworkContinue');const saved=JSON.parse(ui.db.get('woodland-crossings-v1'));assert.equal(saved.story,3);assert.equal(saved.seq,0);assert.equal(saved.activeHelp,false);assert.match(ui.app.innerHTML,/Pip noticed the frayed green/);
});

test('the completion secret appears only after opening the final envelope and can be retrieved again',async()=>{
 const {endingSecret}=await import('../ending-secret.js');
 const name=endingSecret().match(/<h2>(.*?)<\/h2>/)[1];
 const ui=setup();await import('../app.js?sealed-start');
 assert.doesNotMatch(ui.app.innerHTML,new RegExp(name));assert.equal(ui.app.querySelector('#endingEnvelope'),null);
 ui.click('how');assert.doesNotMatch(ui.fixed.modalBody.innerHTML,new RegExp(name));ui.click('closeModal');
 const {fresh}=await import('../engine.js');const s=fresh();s.story=30;s.completedAt=1;
 ui.db.set('woodland-crossings-v1',JSON.stringify(s));await import('../app.js?sealed-finish');
 assert.doesNotMatch(ui.app.innerHTML,new RegExp(name));
 await ui.app.querySelector('#endingEnvelope').onclick();assert.match(ui.fixed.modalBody.innerHTML,new RegExp(name));
 ui.click('closeModal');ui.click('endingVillage');assert.doesNotMatch(ui.app.innerHTML,new RegExp(name));
 ui.click('endingReplay');await ui.app.querySelector('#endingEnvelope').onclick();assert.match(ui.fixed.modalBody.innerHTML,new RegExp(name));
});

test('frogs collect once, replay their tidbits and leave language progress intact',async()=>{
 const ui=setup();await import('../app.js?frog-collection');
 assert.equal(ui.fixed.soundBtn.textContent,'Sound on');
 const frog=ui.app.querySelector('[data-frog="fair-frog"]');assert.ok(frog);frog.onclick();
 let s=JSON.parse(ui.db.get('woodland-crossings-v1'));assert.deepEqual(s.frogFinds,['fair-frog']);assert.equal(s.story,0);assert.equal(s.seq,0);assert.deepEqual(s.decorations,[]);assert.match(ui.fixed.modalBody.innerHTML,/dismantled/);
 frog.onclick();s=JSON.parse(ui.db.get('woodland-crossings-v1'));assert.deepEqual(s.frogFinds,['fair-frog']);
});


test('Chapter 2 full story, all nine questions and fern-garden delivery work through real handlers',async()=>{
 const ui=setup(),{fresh}=await import('../engine.js');const s=fresh();s.story=5;s.step=0;s.seq=5;s.introduced=[0,1];s.decorations=[{chapter:0,name:'Wildflowers'}];ui.db.set('woodland-crossings-v1',JSON.stringify(s));
 await import('../app.js?chapter-two-full');ui.click('play');
 let saved=JSON.parse(ui.db.get('woodland-crossings-v1'));assert.equal(saved.chapterTwo.read.length,5);assert.deepEqual(saved.activeChoices,['stop']);assert.match(ui.app.innerHTML,/circular mark beside the/);
 for(const q of STORY.slice(5,10)){
  saved=JSON.parse(ui.db.get('woodland-crossings-v1'));assert.equal(saved.activeId,q.id);
  ui.app.querySelector('[data-join="0"]').onclick();ui.tool(q.id==='m7'?'yet':q.valid[0][0]);ui.click('check');assert.ok(document.querySelector('#next'));ui.click('next');
 }
 saved=JSON.parse(ui.db.get('woodland-crossings-v1'));assert.equal(saved.story,10);assert.equal(saved.seq,10);assert.equal(saved.pendingReward,1);
 for(const task of CASEWORK.filter(t=>t.phase==='after'))assert.equal(saved.casework[task.id].completed,true);
 assert.ok(document.querySelector('#collect'));ui.click('collect');saved=JSON.parse(ui.db.get('woodland-crossings-v1'));assert.equal(saved.decorations.length,2);assert.equal(saved.decorations[1].chapter,1);
});

test('Chapter 2 retry keeps two-sentence source and distinguishes a splice from a grammatical non-target',async()=>{
 const ui=setup(),{fresh}=await import('../engine.js');const s=fresh();s.story=7;s.activeId='r6';s.activeChoices=['stop'];s.lastRecoveryAtStory=7;ui.db.set('woodland-crossings-v1',JSON.stringify(s));await import('../app.js?chapter-two-retry');ui.click('play');assert.match(ui.app.innerHTML,/mark beneath the/);assert.equal(document.querySelector('#storyNext'),null);
 ui.click('check');assert.match(ui.app.innerHTML,/check what Pip needs/);assert.equal(JSON.parse(ui.db.get('woodland-crossings-v1')).activeTries,0);
 ui.app.querySelector('[data-join="0"]').onclick();ui.tool('comma');ui.click('check');assert.match(ui.app.innerHTML,/One join needs another look/);
 ui.tool('and');ui.click('check');assert.ok(document.querySelector('#next'));
});

test('Chapter 2 resumes an unfinished notebook check after reload and awards supplies exactly once',async()=>{
 const ui=setup({autoRead:false,autoCasework:false}),{fresh}=await import('../engine.js');const s=fresh();s.story=9;s.step=4;s.seq=9;s.activeId='m10';s.activeChoices=['semi'];s.chapterTwo={read:['m6','m7','m8','m9','m10']};ui.db.set('woodland-crossings-v1',JSON.stringify(s));await import('../app.js?chapter-two-pending');ui.click('play');ui.click('check');ui.click('next');assert.match(ui.app.innerHTML,/An unexpected movement/);
 ui.app.querySelector('[data-case-choice="yet"]').onclick();ui.click('caseworkCheck');ui.click('caseworkContinue');assert.match(ui.app.innerHTML,/Evidence for a suspicion/);
 await import('../app.js?chapter-two-reload');ui.click('play');assert.match(ui.app.innerHTML,/Evidence for a suspicion/);assert.equal(JSON.parse(ui.db.get('woodland-crossings-v1')).story,9);
 for(const task of CASEWORK.filter(t=>t.phase==='after').slice(1)){
  const wrong=task.options.find(o=>o.id!==task.answer);ui.app.querySelector('[data-case-choice="'+wrong.id+'"]').onclick();ui.click('caseworkCheck');assert.equal(document.querySelector('#collect'),null);
  ui.app.querySelector('[data-case-choice="'+task.answer+'"]').onclick();ui.click('caseworkCheck');ui.click('caseworkContinue');
 }
 const saved=JSON.parse(ui.db.get('woodland-crossings-v1'));assert.equal(saved.story,10);assert.equal(saved.seq,10);assert.equal(saved.pendingReward,1);
 await import('../app.js?chapter-two-reward-reload');assert.ok(document.querySelector('#collect'));assert.equal(JSON.parse(ui.db.get('woodland-crossings-v1')).seq,10);
});

test('Chapter 2 storybook replay uses chapter numbering and preserves supplies and question choices',async()=>{
 const ui=setup(),{fresh}=await import('../engine.js');const s=fresh();s.story=5;s.introduced=[0,1];ui.db.set('woodland-crossings-v1',JSON.stringify(s));await import('../app.js?chapter-two-book');ui.click('play');const before=ui.db.get('woodland-crossings-v1');ui.click('readStory');ui.fixed.modalBody.querySelector('[data-book-scene="m8"]').onclick();assert.match(ui.fixed.modalBody.innerHTML,/Chapter 2 · Scene 3 of 5/);assert.equal(ui.db.get('woodland-crossings-v1'),before);
});
