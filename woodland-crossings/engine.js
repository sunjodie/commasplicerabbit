import {BANK,STORY,TRANSFER,BONUS,CHAPTERS,TOOLS} from './content.js?v=20261022-chapter4-1';
export const DAY=86400000;
export const INTERVALS=[DAY,3*DAY,7*DAY];
export function fresh(){return {version:1,bankVersion:2,chapterTwoRevision:1,chapterThreeRevision:1,chapterFourRevision:1,activeWordOrder:'',story:0,step:0,seq:0,activeId:null,activeHelp:false,activeTries:0,activeChoices:null,seen:[],skills:{},decorations:[],reviewRun:null,bonus:null,completedAt:null,beaconStars:[0,0,0,0,0,0],activeContract:false,recovery:{},passedStructures:[],lastRecoveryAtStory:null};}
export function hydrate(raw){
 if(!raw||raw.version!==1||!Number.isInteger(raw.story)||raw.story<0||raw.story>STORY.length)return fresh();
 const s={...fresh(),...raw};
 if(raw.bankVersion!==2){
  // Keep the investigation, rewards and discoveries; discard obsolete active IDs
  // and blanket review dates from the previous bank.
  Object.assign(s,{bankVersion:2,step:raw.story%5,activeId:null,activeChoices:null,activeHelp:false,activeTries:0,activeContract:false,reviewRun:null,bonus:null,recovery:{},passedStructures:[],introduced:[]});
  s.skills=Object.fromEntries(Object.entries(s.skills||{}).map(([k,v])=>[k,{...v,due:null}]));
 }
 if(raw.chapterTwoRevision!==1){
  if(/^([mr])(6|7|8|9|10)$/.test(s.activeId||'')){s.activeChoices=['stop'];s.activeHelp=false;s.activeTries=0;s.activeContract=false;}
  s.chapterTwoRevision=1;
 }
 if(raw.chapterThreeRevision!==1){
  if(/^([mr])(11|12|13|14|15)$/.test(s.activeId||'')){s.activeId=null;s.activeChoices=null;s.activeWordOrder='';s.activeHelp=false;s.activeTries=0;s.activeContract=false;}
  s.pendingNotebook=/^m1[1-5]$/.test(s.pendingNotebook||'')?null:s.pendingNotebook;
  s.chapterThreeRevision=1;
 }
 if(raw.chapterFourRevision!==1){
  if(/^([mr])(16|17|18|19|20)$/.test(s.activeId||'')){s.activeId=null;s.activeChoices=null;s.activeWordOrder='';s.activeHelp=false;s.activeTries=0;s.activeContract=false;}
  if(/^m(16|17|18|19|20)$/.test(s.pendingNotebook||''))s.pendingNotebook=null;
  s.chapterFourRevision=1;
 }
 if(typeof s.activeWordOrder!=='string')s.activeWordOrder='';
 // Preserve older in-progress edits after the contrast word moved into the text.
 if(['m29','r29'].includes(s.activeId)&&s.activeChoices?.[1]==='yet')s.activeChoices[1]='comma';
 // Recover the fountain if all bonus passes were saved before its old UI award.
 if(['mixed','connectors','paragraph'].every(k=>s.bonusPasses?.includes(k)))s.bonusDecor=true;
 return s;
}
export function chapter(s){return Math.min(5,Math.floor(s.story/5));}
export function skillState(s,k){return s.skills[k]||{independent:[],lastSeq:-99,level:0,due:null,attempts:0};}
export function mastered(s,k){return skillState(s,k).independent.length>=2;}
export function dueSkills(s,now=Date.now()){return Object.values(s.recovery||{}).filter(x=>x.due!==null&&x.due<=now).map(x=>x.structure);}
export function pickReview(s,maxStage=chapter(s),skill=null){
 if(s.bonus)return BONUS.find(q=>q.skill===skill);
 const exact=TRANSFER.find(q=>q.structure===skill&&q.stage<=maxStage);if(exact)return exact;
 const need=Object.values(s.recovery||{}).find(x=>(!skill||x.skill===skill)&&x.stage<=maxStage);
 return need?TRANSFER.find(q=>q.structure===need.structure):null;
}
export function nextQuestion(s){
 if(s.activeId){const q=BANK.find(q=>q.id===s.activeId);if(q&&s.activeChoices?.length===q.valid.length&&s.activeChoices.every(t=>TOOLS[t]))return q;s.activeId=null;}
 let q;
 if(s.reviewRun)q=pickReview(s,5,s.reviewRun.skills[s.reviewRun.index]);
 else if(s.bonus)q=pickReview(s,5,s.bonus.skills[s.bonus.index]);
 else if(s.story>=STORY.length)return null;
 else{
  const need=Object.values(s.recovery||{}).filter(x=>s.lastRecoveryAtStory!==s.story&&x.needsSession&&x.dueSeq<=s.seq&&x.stage<=chapter(s)).sort((a,b)=>a.dueSeq-b.dueSeq)[0];
  q=need?TRANSFER.find(q=>q.structure===need.structure):STORY[s.story];
 }
 if(!q){s.reviewRun=null;s.bonus=null;return nextQuestion(s);}
 s.activeId=q.id;s.activeWordOrder='';s.activeContract=false;s.activeHelp=false;s.activeTries=0;s.activeChoices=q.initialChoices?.slice()||q.valid.map(()=> 'comma');return q;
}
export function sentenceParts(q,wordOrder=''){const parts=q.parts.slice();if(q.wordOrder&&wordOrder.trim()){let text=wordOrder.trim();text=text.charAt(0).toLowerCase()+text.slice(1);parts[q.wordOrder.part]=/[.!?]$/.test(text)?text:text+'.';}return parts;}
function normaliseClause(text){return String(text||'').trim().replace(/[.!?]$/,'').replace(/\s+/g,' ').toLowerCase();}
export function wordOrderCorrect(q,wordOrder){return !q.wordOrder||normaliseClause(wordOrder)===normaliseClause(q.wordOrder.answer);}
export function renderSentence(q,choices=q.valid.map(()=> 'comma'),wordOrder=''){return sentenceParts(q,wordOrder).reduce((out,p,i)=>{let text=p;if(i&&choices[i-1]==='stop')text=p.charAt(0).toUpperCase()+p.slice(1);return out+(i?TOOLS[choices[i-1]].join:'')+text;},'');}
export function errors(q,choices){return q.valid.map((valid,i)=>valid.includes(choices[i])?-1:i).filter(i=>i>=0);}
export function grammarErrors(q,choices){return (q.grammar||q.valid).map((valid,i)=>valid.includes(choices[i])?-1:i).filter(i=>i>=0);}
function syncDates(s){for(const c of CHAPTERS){const x=skillState(s,c.skill),pending=Object.values(s.recovery).filter(r=>r.skill===c.skill&&r.due!==null);x.due=pending.length?Math.min(...pending.map(r=>r.due)):null;s.skills[c.skill]=x;}}
export function record(s,q,assisted,now=Date.now()){
 const wasReview=!!s.reviewRun,wasBonus=!!s.bonus,recoveryTask=!!q.remedial;
 const starChapter=q.stage;s.beaconStars=s.beaconStars||[0,0,0,0,0,0];if(!assisted)s.beaconStars[starChapter]=Math.min(3,(s.beaconStars[starChapter]||0)+1);
 const x=skillState(s,q.skill);x.attempts++;x.lastSeq=s.seq;
 if(!assisted){const previous=x.independent.at(-1);if(!previous||previous.id!==q.id&&s.seq-previous.seq>=3){x.independent.push({id:q.id,seq:s.seq});x.independent=x.independent.slice(-5);}}
 s.skills[q.skill]=x;s.recovery=s.recovery||{};
 if(assisted&&!wasBonus){s.recovery[q.structure]={structure:q.structure,stage:q.stage,skill:q.skill,level:0,needsSession:true,dueSeq:s.seq+4,due:now+DAY};}
 else if(!assisted){
  s.passedStructures=[...new Set([...(s.passedStructures||[]),q.structure])];
  const r=s.recovery[q.structure];if(r){r.level++;r.needsSession=false;r.due=r.level>=3?null:now+INTERVALS[r.level];if(r.level>=3)delete s.recovery[q.structure];}
 }
 syncDates(s);s.seen=[...new Set([...s.seen,q.id])];s.seq++;s.activeId=null;s.activeChoices=null;s.activeWordOrder='';s.activeHelp=false;s.activeTries=0;s.activeContract=false;
 if(wasReview){s.reviewRun.index++;if(s.reviewRun.index>=s.reviewRun.skills.length)s.reviewRun=null;return {review:true};}
 if(wasBonus){if(!assisted)s.bonusPasses=[...new Set([...(s.bonusPasses||[]),q.skill])];s.bonus.index++;if(s.bonus.index>=s.bonus.skills.length){const earned=['mixed','connectors','paragraph'].every(k=>s.bonusPasses?.includes(k));s.bonus=null;if(earned)s.bonusDecor=true;return {bonusFinished:true,earned};}return {bonus:true};}
 if(recoveryTask){s.lastRecoveryAtStory=s.story;return {review:true};}
 s.story++;s.step=s.story%5;
 if(s.story%5===0){if(s.story===STORY.length)s.completedAt=now;return {chapterDone:true,chapter:s.story/5-1};}
 return {review:false};
}
export function startReview(s,now=Date.now()){const skills=dueSkills(s,now);if(!skills.length)return false;s.reviewRun={skills,index:0};s.activeId=null;return true;}
export function startBonus(s){const skills=['mixed','connectors','paragraph'].filter(k=>!s.bonusPasses?.includes(k));if(!skills.length)return false;s.bonus={skills,index:0};s.activeId=null;return true;}
// Authored briefs already define their sentence count. An optional one-sentence
// contract must not contradict a required full stop or duplicate the brief.
export function contractAvailable(q){return !q.brief&&!/[.!?]/.test(q.parts.join(' ').replace(/[.!?]\s*$/,''));}
export function contractMet(q,choices){return !/[.!?]/.test(renderSentence(q,choices).replace(/[.!?]\s*$/,''));}
