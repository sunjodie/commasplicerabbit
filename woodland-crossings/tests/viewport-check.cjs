// Optional rendered regression: requires Playwright and Chromium. No game source edits or external requests.
const {chromium}=require('playwright');
const fs=require('fs'),os=require('os');
(async()=>{
const path=require('path'),http=require('http');const root=path.resolve(__dirname,'..');const qa=process.env.QA_DIR||path.join(os.tmpdir(),'woodland-viewport-qa');
const server=http.createServer((req,res)=>{const f=path.join(root,decodeURIComponent(req.url.split('?')[0]==='/'?'/index.html':req.url.split('?')[0]));try{res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.html':'text/html','.json':'application/json','.webp':'image/webp'})[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f));}catch{res.writeHead(404);res.end();}});await new Promise(r=>server.listen(8123,'127.0.0.1',r));

const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE_PATH||undefined,headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu']});
const assert=require('assert/strict');const results=[];fs.mkdirSync(qa,{recursive:true});
const {STORY,BANK}=await import(require('url').pathToFileURL(path.join(root,'content.js')).href);
const {CASEWORK}=await import(require('url').pathToFileURL(path.join(root,'casework.js')).href);
for(const [width,height] of [[1366,768],[768,1024],[1024,600]]){
 const page=await browser.newPage({viewport:{width,height}});page.setDefaultTimeout(3000);const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:8123');
 async function check(label){
 const frame=page.locator('[data-frame-art]').first();if(await frame.count())await page.waitForFunction(()=>{const e=document.querySelector('[data-frame-art]');return e&&getComputedStyle(e).backgroundImage.includes('/frames/sheet-')},{},{timeout:8000});
const r=await page.evaluate(()=>{const visible=e=>!!e.getClientRects().length&&!e.closest('[hidden]');const palette=[];for(const e of document.querySelectorAll('.case-workspace.vn-show-feedback .feedback')){if(!visible(e))continue;const style=getComputedStyle(e);if(style.backgroundColor!=='rgba(0, 0, 0, 0)'||style.color!=='rgb(255, 247, 233)')palette.push('unreadable-feedback-palette: '+style.backgroundColor+' / '+style.color);} for(const e of document.querySelectorAll('.chapter-clue p')){if(visible(e)&&getComputedStyle(e).color!=='rgb(73, 56, 47)')palette.push('unreadable-reward-clue');} const spilled=[...document.querySelectorAll('.sentence-piece>b,.sentence-piece>span')].filter(visible).filter(e=>{const a=e.getBoundingClientRect(),b=e.closest('button').getBoundingClientRect();return a.top<b.top-1||a.bottom>b.bottom+1||a.left<b.left-1||a.right>b.right+1;}).map(e=>'tool-label-overflow: '+e.textContent);return {scroll:document.documentElement.scrollHeight>innerHeight+2||document.documentElement.scrollWidth>innerWidth+2,bad:[...document.querySelectorAll('button,input,.story-prose,.vn-context,.sentence,.vn-menu-page:not([hidden])')].filter(visible).filter(e=>{const b=e.getBoundingClientRect();return b.bottom>innerHeight+2||b.top< -2||b.left< -2||b.right>innerWidth+2}).map(e=>e.id||e.className).concat(spilled,palette)}});results.push({width,height,label,...r,errors:[...errors]});}
 await page.locator('#play').waitFor();assert.equal(await page.locator('#soundBtn').textContent(),'Sound on');await page.locator('#soundBtn').click();await page.reload();await page.locator('#play').waitFor();assert.equal(await page.locator('#soundBtn').textContent(),'Sound off');await page.locator('#soundBtn').click();
 let testedReadingKeys=false;await page.locator('#play').click();
 for(let guard=0;guard<160;guard++){
  await check('step-'+guard);if(await page.locator('#collect').count())await page.screenshot({path:path.join(qa,`reward-fixed-${width}-${height}.png`)});
  const visible=async selector=>await page.locator(selector).count()&&await page.locator(selector).first().isVisible();
  if(await visible('#startTrail')){await page.locator('#startTrail').click();continue;}
  if(await visible('#storyNext')){
   if(!testedReadingKeys){await page.screenshot({path:path.join(qa,`frog-scene-${width}-${height}.png`)});await page.locator('.vn-hide').click();await page.locator('[data-frog="fair-frog"]').click();await check('frog-reveal');assert.match(await page.locator('#modalBody').innerText(),/The ribbon collector/);const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('woodland-crossings-v1')));assert.deepEqual(saved.frogFinds,['fair-frog']);assert.equal(saved.seq,0);await page.locator('#closeModal').click();await page.locator('.vn-hide').click();const art=await page.locator('[data-frame-art]').first().getAttribute('data-frame-art');const text=await page.locator('.story-prose').innerText();await page.keyboard.press('ArrowRight');assert.notEqual(await page.locator('.story-prose').innerText(),text);assert.notEqual(await page.locator('[data-frame-art]').first().getAttribute('data-frame-art'),art);await page.keyboard.press('ArrowLeft');assert.equal(await page.locator('.story-prose').innerText(),text);testedReadingKeys=true;}
   await page.keyboard.press('ArrowRight');continue;
  }
  if(await visible('#caseworkContinue')){await page.locator('#caseworkContinue').click();continue;}
  if(await page.locator('.casework-page').count()){
   const title=await page.locator('.casework-page>.eyebrow').textContent();const t=CASEWORK.find(t=>t.title===title);if(!t)throw Error('Unknown task '+title);
   if(await visible('[data-case-route]')){await page.locator('[data-case-route]').first().click();continue;}
   const key=t.kind==='grammar'?String(t.word):t.answer;const choice=page.locator('[data-case-choice="'+key+'"]');
   if(await choice.count()&&await choice.isVisible()&&await choice.getAttribute('aria-pressed')!=='true'){await choice.click();continue;}
   if(await visible('#caseCorrection')){await page.locator('#caseCorrection').fill(t.answer);await page.keyboard.press('ArrowLeft');assert.equal(await page.locator('#caseCorrection').inputValue(),t.answer);assert.equal(await page.locator('#caseCorrection').evaluate(el=>el.selectionStart),t.answer.length-1);}
   if(t.evidence){const evidence=page.locator('[data-case-evidence="'+t.evidenceAnswer+'"]');if(await evidence.isVisible()&&await evidence.getAttribute('aria-pressed')!=='true'){await evidence.click();continue;}}
   if(await visible('#caseworkCheck')){const before=await page.evaluate(()=>localStorage.getItem('woodland-crossings-v1'));await page.keyboard.press('ArrowRight');assert.equal(await page.evaluate(()=>localStorage.getItem('woodland-crossings-v1')),before);await page.locator('#caseworkCheck').click();continue;}
   const next=page.locator('.casework-page>.vn-pages button').last();if(await next.count()&&!await next.isDisabled()){await page.keyboard.press('ArrowRight');continue;}
   throw Error('Stuck casework '+title);
  }
  if(await visible('#next')){await page.locator('#next').click();continue;}
  if(await visible('#check')){
   const before=await page.evaluate(()=>localStorage.getItem('woodland-crossings-v1'));await page.keyboard.press('ArrowRight');assert.equal(await page.evaluate(()=>localStorage.getItem('woodland-crossings-v1')),before);
   const s=await page.evaluate(()=>JSON.parse(localStorage.getItem('woodland-crossings-v1')));const q=BANK.find(q=>q.id===s.activeId);if(!q)throw Error('Unknown question');
   if(q.id==='m1'&&!s.activeTries){await page.locator('#check').click();await check('wrong-feedback');await page.getByRole('button',{name:'Return to the question →',exact:true}).click();}
   for(let i=0;i<q.valid.length;i++){await page.locator('[data-join="'+i+'"]').click();await page.locator('[data-tool="'+q.valid[i][0]+'"]').click();}
   await page.locator('#check').click();continue;
  }
  if(await visible('#collect')){await page.locator('#collect').click();break;}
  const menuNext=page.locator('.vn-menu-frame>.vn-pages button').last();if(await menuNext.count()&&!await menuNext.isDisabled()){await menuNext.click();continue;}
  throw Error('Unknown screen '+(await page.locator('#app').innerText()).slice(0,200));
 }
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('woodland-crossings-v1')));if(saved.story!==5||saved.decorations.length!==1)throw Error('Chapter not complete');await check('complete');
 await page.locator('#guideBtn').click();await check('guide');await page.locator('#closeModal').click();
 await page.setViewportSize({width:height,height:width});await page.waitForTimeout(200);await check('rotate');
 await page.close();
}
fs.writeFileSync(path.join(qa,'flow-results.json'),JSON.stringify(results,null,2));console.log(JSON.stringify({checks:results.length,failures:results.filter(r=>r.scroll||r.bad.length||r.errors.length)},null,2));await browser.close();server.close();if(results.some(r=>r.scroll||r.bad.length||r.errors.length))throw Error('Viewport check failed');
})().catch(e=>{console.error(e);process.exit(1)});
