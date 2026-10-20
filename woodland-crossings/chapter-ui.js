// View-only pagination: learning progress and answer marking remain in app/engine.
export function textPages(paragraphs,limit=55){
 const pages=[];let page=[],count=0;
 for(const paragraph of paragraphs){
  const sentences=paragraph.match(/[^.!?]+[.!?]+[”’"']*|[^.!?]+$/g)||[paragraph];
  for(const sentence of sentences){const words=sentence.trim().split(/\s+/);if(!words[0])continue;
   // Exceptionally long sentences remain accessible in consecutive reading pieces.
   for(let i=0;i<words.length;i+=limit){const piece=words.slice(i,i+limit).join(' '),n=piece.split(/\s+/).length;
    if(count+n>limit&&page.length){pages.push(page);page=[];count=0;}page.push(piece);count+=n;
   }
  }
 }
 if(page.length)pages.push(page);return pages.length?pages:[[]];
}
const wide=()=>typeof window.matchMedia==='function'&&window.matchMedia('(min-width:600px)').matches;
let active=null;
export function clearChapterView(){if(document.body){document.body.classList.remove('vn-active','vn-menu');document.querySelector('.vn-top-title')?.remove();}active=null;}
function headerControls(){const save=document.querySelector('#saveBtn'),nav=document.querySelector('header nav');if(save&&nav&&!nav.contains(save)){save.textContent='Progress';save.classList.add('quiet');nav.append(save);}}
function element(tag,cls,text){const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;}
function control(label,action,cls='secondary'){const b=element('button',cls,label);b.type='button';b.onclick=action;return b;}
function pageControls(container,pages,{initial=0,changed=()=>{},label='Part'}={}){
 let current=Math.max(0,Math.min(initial,pages.length-1));const nav=element('div','vn-pages'),back=control('← Back',()=>show(current-1)),count=element('span','vn-count'),next=control('Next →',()=>show(current+1));nav.append(back,count,next);container.append(nav);
 function show(n){current=Math.max(0,Math.min(n,pages.length-1));pages.forEach((p,i)=>{p.hidden=i!==current;p.inert=i!==current;});back.disabled=current===0;next.disabled=current===pages.length-1;count.textContent=`${label} ${current+1} / ${pages.length}`;changed(current);}
 show(current);return {show,get current(){return current;},nav};
}
function budget(){return window.innerWidth<900?42:window.innerHeight<720?38:48;}
function storyPanel(){
 const prose=document.querySelector('.story-page .story-prose');if(!prose)return;
 const paragraphs=[...prose.children].map(p=>p.textContent),pages=textPages(paragraphs,budget());let part=0;
 const previous=document.querySelector('#storyPrevious'),next=document.querySelector('#storyNext'),count=document.querySelector('.story-page-count');
 const prevAction=previous.onclick,nextAction=next.onclick,originalCount=count.textContent,nextLabel=next.textContent,wasDisabled=previous.disabled;
 function render(){prose.replaceChildren(...pages[part].map(t=>element('p',t.startsWith('“')?'spoken-line':'narration',t)));previous.disabled=part===0&&wasDisabled;next.textContent=part===pages.length-1?nextLabel:'Continue →';count.textContent=originalCount+(pages.length>1?` · Reading ${part+1}/${pages.length}`:'');}
 previous.onclick=()=>{if(part){part--;render();}else prevAction();};next.onclick=()=>{if(part<pages.length-1){part++;render();}else nextAction();};render();
 const panel=document.querySelector('.story-page'),label=element('span','eyebrow',active.title);panel.prepend(label);
 const hide=control('Hide text',()=>{const hidden=panel.hidden;panel.hidden=!hidden;hide.textContent=hidden?'Hide text':'Show text';},'vn-hide');document.querySelector('.story-reader').append(hide);
}
// A wizard remembers its current part when answer selections redraw the page.
const positions=new Map();
function caseworkPanel(key,message,completed){
 const panel=document.querySelector('.casework-page');if(!panel)return;
 const original=[...panel.children],steps=[],prose=original.filter(n=>n.matches('blockquote,.lead-observation'));
 for(const chunk of textPages(prose.map(n=>n.textContent),budget())){if(chunk.length){const page=element('div','vn-step');chunk.forEach(t=>page.append(element('p','vn-context',t)));steps.push(page);}}
 const prompt=panel.querySelector('.casework-prompt'),groups=[...panel.querySelectorAll(':scope > .casework-options')],edit=panel.querySelector('.casework-edit'),actions=panel.querySelector('.casework-actions'),continueButton=panel.querySelector('#caseworkContinue'),feedback=panel.querySelector('.casework-feedback'),explanation=panel.querySelector('details');
 if(!prompt){const page=element('div','vn-step');original.forEach(n=>page.append(n));steps.push(page);}
 else if(completed){
  steps.length=0;for(const chunk of textPages([feedback?.textContent||'Complete.',...original.filter(n=>n.matches('p:not(.casework-prompt):not(.lead-observation)')).map(n=>n.textContent)],budget())){const page=element('div','vn-step');chunk.forEach(t=>page.append(element('p','',t)));steps.push(page);}
  if(explanation)for(const chunk of textPages([...explanation.querySelectorAll('p')].map(n=>n.textContent),budget())){const page=element('div','vn-step');page.append(element('span','eyebrow','The reasoning'));chunk.forEach(t=>page.append(element('p','',t)));steps.push(page);}
  steps.at(-1).append(continueButton);
 }else{
  const answer=element('div','vn-step');if(prompt)answer.append(prompt);
  if(edit){answer.append(edit);for(const n of original.filter(n=>n.matches('label,input')))answer.append(n);}
  else if(groups[0])answer.append(groups[0]);steps.push(answer);
  if(groups[1]){const ev=element('div','vn-step');ev.append(element('p','casework-prompt','Part 2: Which pair of details provides the strongest support?'),groups[1]);steps.push(ev);}
  // Only the final answer step submits; earlier choices and evidence remain revisitable.
  if(actions)steps.at(-1).append(actions);
  if(message){const notice=element('div','vn-step');notice.append(element('p','casework-feedback',message),control('Return to the question →',()=>pager.show(steps.length-2)));steps.push(notice);}
 }
 panel.replaceChildren(element('span','eyebrow',active.title),...steps);
 let initial=positions.get(key)||0;if(message)initial=steps.length-1;if(completed)initial=0;
 const pager=pageControls(panel,steps,{initial,changed:i=>positions.set(key,i)});
 if(steps.length===1)pager.nav.hidden=true;
}
function questionPanel(){
 const workspace=document.querySelector('.case-workspace');if(!workspace)return;
 const feedback=workspace.querySelector('.feedback');if(!feedback)return;
 const paragraphs=[...feedback.querySelectorAll('p')].filter(p=>!p.closest('details')).map(p=>p.textContent);
 const details=feedback.querySelector('details');const why=details?[...details.querySelectorAll('p')].map(p=>p.textContent):[];
 const title=feedback.querySelector('strong')?.textContent||'Pip’s notebook';
 if(!paragraphs.length){const copy=feedback.cloneNode(true);copy.querySelector('strong')?.remove();copy.querySelector('.feedback-pip')?.remove();paragraphs.push(copy.textContent);}
 const standalone=feedback.querySelector('.standalone');if(standalone)paragraphs.unshift([...standalone.children].map(n=>n.textContent).join(' / '));
 const pages=textPages(paragraphs,budget()),cards=pages.map(chunk=>{const p=element('div','vn-step');p.append(element('strong','',title));chunk.forEach(t=>p.append(element('p','',t)));return p;});
 if(why.length)for(const chunk of textPages(why,budget())){const p=element('div','vn-step');p.append(element('strong','','Why this edit works'));chunk.forEach(t=>p.append(element('p','',t)));cards.push(p);}
 feedback.replaceChildren(...cards);workspace.classList.add('vn-show-feedback');
 const pager=pageControls(feedback,cards);if(cards.length===1)pager.nav.hidden=true;
 if(!document.querySelector('#next'))feedback.append(control('Return to the question →',()=>{if(active?.onDismiss)active.onDismiss();else{workspace.classList.remove('vn-show-feedback');feedback.hidden=true;}}));
}
export function presentChapterView({kind,title,key='',message='',completed=false,onDismiss=null}){
 if(!document.body||!wide())return;clearChapterView();active={kind,title,onDismiss};document.body.classList.add('vn-active');headerControls();
 const app=document.querySelector('#app');app.dataset.vnKind=kind;document.querySelector('header')?.insertBefore(element('span','vn-top-title','Chapter 1 · '+title),document.querySelector('header nav'));
 if(kind==='story')storyPanel();else if(kind==='casework')caseworkPanel(key,message,completed);else questionPanel();
}
// Auxiliary dialogs also turn pages rather than grow a scrolling box.
export function paginateModal(){
 if(!document.body||!wide())return;const body=document.querySelector('#modalBody');if(!body)return;
 const nodes=[...body.children].flatMap(node=>{if(!node.matches('.evidence-grid,.secret-grid'))return [node];const groups=[];const items=[...node.children];for(let i=0;i<items.length;i+=3){const group=node.cloneNode(false);items.slice(i,i+3).forEach(n=>group.append(n));groups.push(group);}return groups;});
 body.replaceChildren();const pages=[];let page=element('div','vn-modal-page'),words=0;body.append(page);
 for(const node of nodes){const n=node.textContent.trim().split(/\s+/).length;
  if(words+n>80&&page.childNodes.length){pages.push(page);page=element('div','vn-modal-page');body.append(page);words=0;}
  page.append(node);
  if(page.getBoundingClientRect().height>window.innerHeight-180&&page.childElementCount>1){node.remove();pages.push(page);page=element('div','vn-modal-page');page.append(node);body.append(page);words=0;}
  words+=n;
 }
 if(page.childNodes.length)pages.push(page);if(pages.length<2)return;
 pageControls(body,pages,{label:'Page'});
}

export function presentMenuView(kind){
 if(!document.body||!wide())return;clearChapterView();document.body.classList.add('vn-active','vn-menu');headerControls();
 const app=document.querySelector('#app'),root=app.querySelector('.intro-card,.finish-card,.mystery-ending')||app;
 const nodes=[];
 for(const node of [...root.children]){
  if(node.matches('.hero'))nodes.push(...node.firstElementChild.children);
  else nodes.push(node);
 }
 const frame=element('div','vn-menu-frame'),content=element('div','vn-menu-content');frame.append(content);app.replaceChildren(frame);
 app.dataset.vnKind=kind;const pages=[];let page=element('div','vn-menu-page');content.append(page);
 for(const node of nodes){
  page.append(node);
  if(page.scrollHeight>content.clientHeight&&page.childElementCount>1){node.remove();pages.push(page);page=element('div','vn-menu-page');page.append(node);content.append(page);}
 }
 if(page.childElementCount)pages.push(page);
 const pager=pageControls(frame,pages,{label:'Page'});if(pages.length===1)pager.nav.hidden=true;
}

// Tablet keyboards resize the visible viewport without necessarily resizing the page.
if(typeof window!=='undefined'&&typeof document!=='undefined'){
 const updateViewport=()=>{if(!document.documentElement?.style)return;const height=window.visualViewport?.height||window.innerHeight;document.documentElement.style.setProperty('--game-height',height+'px');document.body?.classList.toggle('vn-keyboard',height<500&&document.activeElement?.id==='caseCorrection');};
 window.visualViewport?.addEventListener('resize',updateViewport);
 document.addEventListener?.('focusin',updateViewport);document.addEventListener?.('focusout',updateViewport);updateViewport();
}
