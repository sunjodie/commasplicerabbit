import {finishingTouchMarkup} from './finishing-touches.js?v=20261022-village-touches1';
// A single registered panorama. Progress is derived from existing story saves;
// recovery and optional recall never add story deliveries or reset a landmark.
export const VILLAGE_ART=['empty','foundations','framework','roofing','complete'].map(name=>`assets/village/${name}.webp`);
export const VILLAGE_SITES=[
 {id:'burrow',name:'A cosy burrow',short:'Burrow',point:[17,26],decor:[19,35],steps:['A place to call home','Stone threshold laid','Door frame raised','Walls and roof fitted','Windows and lights fitted','A cosy burrow, finished']},
 {id:'garden',name:'A fern garden',short:'Fern garden',point:[15,53],decor:[24,54],steps:['A garden waiting to grow','Planting beds prepared','Young ferns planted','Bench and borders fitted','The garden fills out','A fern garden, finished']},
 {id:'workshop',name:'A woodland workshop',short:'Workshop',point:[66,32],decor:[67,43],steps:['Room for a workshop','Stone foundations laid','Timber frame raised','Walls and roof fitted','Doors and lights fitted','A woodland workshop, finished']},
 {id:'trail',name:'Lanterns for the trail',short:'Lantern trail',point:[66,69],decor:[71,66],steps:['A path waiting for its lights','Post foundations laid','Posts raised','Lanterns installed','The trail lights up','A lantern trail, finished']},
 {id:'lookout',name:'A treetop lookout',short:'Treetop lookout',point:[47,11],decor:[47,20],steps:['A tree with a view','Platform supports fitted','Platform and stairs raised','Roof and railing fitted','The lookout lights up','A treetop lookout, finished']},
 {id:'pavilion',name:'The village gathering place',short:'Gathering place',point:[88,46],decor:[89,60],steps:['A place to gather','Stone footings laid','Timber posts raised','Roof and benches fitted','Ready for company','The gathering place, finished']},
 {id:'fountain',name:'The village fountain',short:'Fountain',point:[48,50],decor:[58,52],steps:['An optional village fountain','Stone basin started','Basin and spout fitted','The final stones are ready','The fountain is flowing','The fountain is flowing']}
];
const clamp=(n,lo,hi)=>Math.max(lo,Math.min(hi,n));
export function siteProgress(s,index){
 const site=VILLAGE_SITES[index];if(!site)return null;
 if(index===6){const finished=!!s.bonusDecor,passes=new Set((s.bonusPasses||[]).filter(k=>['mixed','connectors','paragraph'].includes(k))).size;return {...site,index,delivered:finished?3:Math.min(2,passes),total:3,phase:finished?4:Math.min(2,passes),finished,ready:false,decoration:null,beacon:false};}
 const decoration=(s.decorations||[]).find(d=>d.chapter===index),finished=!!decoration;
 const delivered=finished?5:clamp(Math.floor(Number(s.story)||0)-index*5,0,5);
 // A completed chapter may be waiting for its finishing-touch choice.
 return {...site,index,delivered,total:5,phase:Math.min(4,delivered),finished,ready:delivered===5&&!finished,decoration:decoration||null,beacon:(s.beaconStars?.[index]||0)>=3};
}
export function villageProgress(s){return VILLAGE_SITES.map((_,i)=>siteProgress(s,i));}
export function currentBuild(s){return villageProgress(s).find(p=>p.index<6&&!p.finished&&(p.delivered>0||p.index===Math.min(5,Math.floor((s.story||0)/5))));}
export function stageLabel(p){return p.finished?p.steps[5]:p.ready?'Ready for your finishing touch':p.steps[p.delivered];}
export function villageSummary(s){const p=villageProgress(s),done=p.slice(0,6).filter(x=>x.finished).length;return `${done} of 6 landmarks finished${s.bonusDecor?' · Bonus fountain flowing':''}`;}
function ornament(name){
 const head='<svg viewBox="0 0 64 64" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">';
 if(name==='Mushrooms')return head+'<path d="M18 35V55M43 29V51" stroke="#e8d8ab" stroke-width="7"/><path d="M3 36Q18 8 33 36Z" fill="#bb704e"/><path d="M27 30Q43 0 59 30Z" fill="#cb8953"/><g fill="#f4d6a4"><circle cx="13" cy="29" r="2"/><circle cx="23" cy="31" r="2"/><circle cx="40" cy="19" r="3"/><circle cx="50" cy="26" r="2"/></g><path d="M7 57Q28 47 57 56" fill="none" stroke="#6b7e48" stroke-width="5"/></svg>';
 if(name==='A lantern')return head+'<path d="M29 14V8Q35 0 41 8V14M20 17H50L46 48H24Z" fill="#96683d" stroke="#674b39" stroke-width="2"/><path d="M25 23H45L42 42H28Z" fill="#ffd38a"/><path d="M33 27Q24 41 35 42Q46 40 38 26L35 32Z" fill="#fff0bf"/><path d="M19 17H51M23 49H47" stroke="#644a3a" stroke-width="4"/></svg>';
 return head+'<path d="M13 56L17 31M32 57L31 19M48 55L47 32" fill="none" stroke="#71844a" stroke-width="3"/><path d="M29 46Q5 28 12 47M34 44Q58 31 48 49" fill="#82954e"/><g fill="#e8bb81"><circle cx="17" cy="28" r="8"/><circle cx="31" cy="16" r="8"/><circle cx="48" cy="29" r="8"/></g><g fill="#a96c8a"><circle cx="10" cy="27" r="4"/><circle cx="21" cy="22" r="4"/><circle cx="20" cy="32" r="4"/><circle cx="26" cy="10" r="4"/><circle cx="37" cy="13" r="4"/><circle cx="30" cy="23" r="4"/><circle cx="43" cy="26" r="4"/><circle cx="53" cy="28" r="4"/></g></svg>';
}
export function villageMarkup(s,{interactive=true,previewChapter=null,previewDecor=null}={}){
 const sites=villageProgress(s).map(p=>p.index===previewChapter?{...p,delivered:5,phase:4,finished:true,ready:false,decoration:previewDecor?(typeof previewDecor==='string'?{name:previewDecor}:previewDecor):p.decoration}:p);
 const summary=`${sites.slice(0,6).filter(p=>p.finished).length} of 6 landmarks finished${sites[6].finished?' · Bonus fountain flowing':''}`;
 return `<div class="village-viewport" data-zoom="1"><div class="village-canvas village-landscape" role="group" aria-label="Your connected woodland village. ${summary}."><div class="village-base" aria-hidden="true"></div>${sites.filter(p=>p.phase>0).map(p=>`<div class="village-layer" data-site="${p.id}" data-phase="${p.phase}" style="background-image:url('${VILLAGE_ART[p.phase]}');--site-mask:url('assets/village/mask-${p.id}.svg')" aria-hidden="true"></div>`).join('')}${sites.filter(p=>p.finished&&p.decoration).map(p=>finishingTouchMarkup(p.index,p.decoration)||`<span class="village-ornament" data-decoration="${p.index}" style="left:${p.decor[0]}%;top:${p.decor[1]}%" aria-hidden="true">${ornament(p.decoration.name)}</span>`).join('')}${sites.filter(p=>p.beacon&&p.phase>0).map(p=>`<span class="village-beacon" style="left:${p.point[0]}%;top:${p.point[1]+5}%" aria-hidden="true">✦</span>`).join('')}${interactive?sites.map(p=>`<button class="village-site ${p.finished?'site-finished':p.delivered?'site-building':'site-waiting'}" data-village-site="${p.index}" style="left:${p.point[0]}%;top:${p.point[1]}%" aria-label="${p.name}: ${stageLabel(p)}. ${p.delivered} of ${p.total} ${p.index===6?'independent challenges':'deliveries'}."><span aria-hidden="true">${p.finished?'✦':p.index+1}</span></button>`).join(''):''}</div></div>`;
}
