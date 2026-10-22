import {availableNotebookClues,availableNotebookThreads,notebookLink,updateNotebookLink,assessNotebookLink,checkNotebookLink,notebookFollowUp} from './clue-notebook.js?v=20261022-clue-notebook1';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const source=c=>`Chapter ${Math.floor((Number(c.scene.slice(1))-1)/5)+1} · Scene ${(Number(c.scene.slice(1))-1)%5+1}`;
const reasoning=(link,label='My reasoning')=>`<label class="clue-note-label" for="notebookReason">${label} <span>(optional · saved as you type)</span></label><input id="notebookReason" class="clue-reason" type="text" maxlength="400" value="${esc(link.note)}" placeholder="These observations fit together because…">`;
const control=(id,text,disabled=false)=>`<button id="${id}" class="secondary" ${disabled?'disabled':''}>${text}</button>`;
export function createClueNotebook({getState,save,showModal,announce=()=>{},doc=globalThis.document}){
 let page=0,id=null,step=0,mode='index';
 const root=()=>doc.querySelector('#modalBody');
 function render(){
  const state=getState(),clues=availableNotebookClues(state),threads=availableNotebookThreads(state),t=threads.find(t=>t.id===id);
  if(mode==='thread'&&!t)mode='index';
  const top=`<div class="clue-book-heading"><span class="eyebrow">Evidence &amp; working ideas</span><h2 id="clueNotebookTitle">Poppy’s clue notebook</h2><p>${clues.length} observations collected · ${threads.length} working pages open</p></div><div class="clue-book-tabs">${control('notebookIndex','Working ideas')}${control('notebookObservations','Collected observations')}</div>`;
  let html;
  if(mode==='index'){
   const pages=Math.max(1,Math.ceil(threads.length/4));page=Math.min(page,pages-1);
   html=`<p class="clue-book-intro">Choose an idea, link two observations and explain the connection. You can revise your thinking as the story unfolds.</p><div class="clue-book-index">${threads.slice(page*4,page*4+4).map(t=>{const link=notebookLink(state,t.id),result=link.checked?assessNotebookLink(state,t.id):null;return `<button class="clue-thread" data-notebook-thread="${t.id}"><strong>${esc(t.title)}</strong><span>${result?.status==='supported'?'Supported link':result?'Revisit the evidence':link.theory?'Idea in progress':'Start a working idea'}${notebookFollowUp(state,t.id)?' · Later evidence available':''}</span></button>`;}).join('')}</div>${!threads.length?`<div class="clue-book-empty"><p>${clues.length?'You have a first observation. Keep reading before deciding what it means.':'Your first page is waiting. Observations will appear as you read the story.'}</p>${clues.slice(0,2).map(c=>`<p><b>${esc(c.title)}:</b> ${esc(c.text)}</p>`).join('')}</div>`:''}<p class="clue-book-note">Notebook links are optional. They do not change your grammar scores or village supplies.</p><div class="clue-book-controls">${control('notebookPrevious','← Back',page===0)}<span>Working pages ${page+1} / ${pages}</span>${control('notebookNext','Next →',page===pages-1)}</div>`;
  }else if(mode==='observations'){
   const pages=Math.max(1,Math.ceil(clues.length/3));page=Math.min(page,pages-1);
   html=`<p class="clue-book-intro">These are observations from passages you have reached. An observation can support more than one question.</p><div class="clue-observation-list">${clues.slice(page*3,page*3+3).map(c=>`<article class="clue-observation"><strong>${esc(c.title)}</strong><p>${esc(c.text)}</p><small>${source(c)}</small></article>`).join('')}</div>${!clues.length?'<p class="clue-book-empty">Read the opening scene to begin collecting observations.</p>':''}<div class="clue-book-controls">${control('notebookPrevious','← Back',page===0)}<span>Observations ${page+1} / ${pages}</span>${control('notebookNext','Next →',page===pages-1)}</div>`;
  }else{
   const link=notebookLink(state,t.id),selected=t.theories.find(x=>x.id===link.theory),result=link.checked?assessNotebookLink(state,t.id):null;
   const heading=`<div class="clue-thread-heading"><span class="eyebrow">${step===0?'1 · Working idea':step===1?'2 · Link observations':step===2?'3 · Reflect & revise':'Later evidence'}</span><h3>${esc(t.title)}</h3></div>`;
   if(step===0)html=heading+`<p class="clue-book-intro">What can we reasonably say from the observations so far?</p><div class="clue-theories">${t.theories.map(x=>`<button class="clue-choice ${link.theory===x.id?'selected':''}" data-notebook-theory="${x.id}" aria-pressed="${link.theory===x.id}">${esc(x.text)}</button>`).join('')}</div>${reasoning(link,'My first reasoning')}<div class="clue-book-controls">${control('notebookPrevious','← Working pages')}<span>Step 1 / 3</span>${control('notebookNext','Link observations →',!selected)}</div>`;
   else if(step===1)html=heading+`<p class="clue-working-idea">${esc(selected?.text||'Choose a working idea first.')}</p><p class="clue-book-intro">Choose two observations. ${esc(t.linkGoal)}</p><div class="clue-evidence">${clues.filter(c=>t.observations.includes(c.id)).map(c=>`<button class="clue-choice ${link.clues.includes(c.id)?'selected':''}" data-notebook-clue="${c.id}" aria-pressed="${link.clues.includes(c.id)}"><strong>${esc(c.title)}</strong><span>${esc(c.text)}</span><small>${source(c)}</small></button>`).join('')}</div><div class="clue-book-controls">${control('notebookPrevious','← Revise idea')}<span>${link.clues.length} / 2 linked</span>${control('notebookCheck','Check this link',!selected||link.clues.length!==2)}</div>`;
   else if(step===2)html=heading+`<div class="clue-link-feedback" role="status"><strong>${result?.status==='supported'?'A supported link':'Keep this idea open'}</strong><p>${esc(result?.message||'Check your selected observations first.')}</p><p>${esc(result?.question||'')}</p></div>${notebookFollowUp(state,t.id)?control('notebookLater','Read later evidence'):''}${reasoning(link)}<div class="clue-book-controls">${control('notebookPrevious','← Revisit observations')}${control('notebookRevise','Revise idea')}${control('notebookNext','Other working pages →')}</div>`;
   else html=heading+`<div class="clue-later-evidence"><p>${esc(notebookFollowUp(state,t.id))}</p></div><p class="clue-working-idea">Your working idea: ${esc(selected?.text||'')}</p>${link.note?`<p class="clue-saved-note">Your reasoning: ${esc(link.note)}</p>`:''}<p class="clue-book-intro">Does this later observation strengthen your idea or make you want to revise it?</p><div class="clue-book-controls">${control('notebookPrevious','← Your link')}${control('notebookRevise','Revise idea')}${control('notebookNext','Other working pages →')}</div>`;
  }
  showModal(`<section class="clue-notebook" data-notebook-mode="${mode}" aria-labelledby="clueNotebookTitle">${top}<div class="clue-book-page">${html}</div></section>`,{paginate:false});
  root().querySelector('#notebookIndex').onclick=()=>{mode='index';page=0;render();};
  root().querySelector('#notebookObservations').onclick=()=>{mode='observations';page=0;render();};
  const previous=root().querySelector('#notebookPrevious'),next=root().querySelector('#notebookNext');
  if(previous)previous.onclick=()=>{if(mode!=='thread'){if(page>0){page--;render();}}else if(step>0){step--;render();}else{mode='index';page=0;render();}};
  if(next)next.onclick=()=>{if(mode!=='thread'){page++;render();}else if(step===0&&notebookLink(getState(),id).theory){step=1;render();}else if(step>=2){mode='index';page=0;render();}};
  root().querySelectorAll('[data-notebook-thread]').forEach(b=>b.onclick=()=>{id=b.dataset.notebookThread;mode='thread';step=0;render();});
  root().querySelectorAll('[data-notebook-theory]').forEach(b=>b.onclick=()=>{updateNotebookLink(getState(),id,{theory:b.dataset.notebookTheory});save();render();root().querySelector(`[data-notebook-theory="${b.dataset.notebookTheory}"]`)?.focus();});
  root().querySelectorAll('[data-notebook-clue]').forEach(b=>b.onclick=()=>{
   const value=b.dataset.notebookClue,link=notebookLink(getState(),id),selected=link.clues.includes(value);
   if(!selected&&link.clues.length===2){announce('Remove one linked observation before choosing another.');return;}
   updateNotebookLink(getState(),id,{clues:selected?link.clues.filter(x=>x!==value):[...link.clues,value]});save();render();root().querySelector(`[data-notebook-clue="${value}"]`)?.focus();
  });
  const check=root().querySelector('#notebookCheck');if(check)check.onclick=()=>{const r=checkNotebookLink(getState(),id);if(['supported','revise'].includes(r.status)){save();step=2;render();announce(r.status==='supported'?'This link is supported by the selected observations.':'Keep this idea open and revisit the evidence.');}};
  const later=root().querySelector('#notebookLater');if(later)later.onclick=()=>{step=3;render();};
  const revise=root().querySelector('#notebookRevise');if(revise)revise.onclick=()=>{step=0;render();};
  const reason=root().querySelector('#notebookReason');if(reason)reason.oninput=()=>{updateNotebookLink(getState(),id,{note:reason.value});save();};
 }
 return {open(){mode='index';page=0;id=null;step=0;render();}};
}
