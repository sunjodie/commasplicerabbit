import {BANK,STORY,TRANSFER,CHAPTERS,TOOLS} from './content.js';
export const DAY=86400000;
export const INTERVALS=[DAY,3*DAY,7*DAY];
export function fresh(){return {version:1,story:0,step:0,seq:0,activeId:null,activeHelp:false,activeTries:0,activeChoices:null,seen:[],skills:{},decorations:[],reviewRun:null,bonus:null,completedAt:null,beaconStars:[0,0,0,0,0,0],activeContract:false};}
export function hydrate(raw){if(!raw||raw.version!==1||!Number.isInteger(raw.story)||raw.story<0||raw.story>30)return fresh();return {...fresh(),...raw};}
export function chapter(s){return Math.min(5,Math.floor(s.story/5));}
export function skillState(s,k){return s.skills[k]||{independent:[],lastSeq:-99,level:0,due:null,attempts:0};}
export function mastered(s,k){return skillState(s,k).independent.length>=2;}
export function dueSkills(s,now=Date.now()){return CHAPTERS.map(c=>c.skill).filter(k=>{const x=skillState(s,k);return x.due!==null&&x.due<=now;});}
export function pickReview(s,maxStage=chapter(s),skill=null){const pool=TRANSFER.filter(q=>q.stage<=maxStage&&(!skill||q.skill===skill));const candidates=pool.length?pool:TRANSFER.filter(q=>q.stage<=maxStage);return [...candidates].sort((a,b)=>{const score=q=>(s.seen.includes(q.id)?10000:0)+(mastered(s,q.skill)?1000:0)+Math.max(0,15-(s.seq-skillState(s,q.skill).lastSeq))*10+BANK.indexOf(q);return score(a)-score(b);})[0];}
export function nextQuestion(s){if(s.activeId){const existing=BANK.find(q=>q.id===s.activeId);if(existing&&s.activeChoices?.length===existing.valid.length)return existing;s.activeId=null;}let q;
 if(s.reviewRun){q=pickReview(s,5,s.reviewRun.skills[s.reviewRun.index]);}
 else if(s.bonus){q=pickReview(s,5,s.bonus.skills[s.bonus.index]);}
 else if(s.story>=STORY.length)return null;
 else if(s.step===2||s.step===5)q=pickReview(s);
 else q=STORY[s.story];
 s.activeId=q.id;s.activeContract=false;s.activeHelp=false;s.activeTries=0;s.activeChoices=q.valid.map(()=> 'comma');return q;
}
export function renderSentence(q,choices=q.valid.map(()=> 'comma')){return q.parts.reduce((out,p,i)=>{let text=p;if(i&&choices[i-1]==='stop')text=p.charAt(0).toUpperCase()+p.slice(1);return out+(i?TOOLS[choices[i-1]].join:'')+text;},'');}
export function errors(q,choices){return q.valid.map((valid,i)=>valid.includes(choices[i])?-1:i).filter(i=>i>=0);}
export function record(s,q,assisted,now=Date.now()){
 const starChapter=s.reviewRun||s.bonus?Math.max(0,CHAPTERS.findIndex(c=>c.skill===q.skill)):chapter(s);s.beaconStars=s.beaconStars||[0,0,0,0,0,0];if(!assisted)s.beaconStars[starChapter]=Math.min(3,(s.beaconStars[starChapter]||0)+(s.activeContract&&!s.reviewRun&&!s.bonus?2:1));
 const x=skillState(s,q.skill);x.attempts++;x.lastSeq=s.seq;
 if(!assisted){const previous=x.independent.at(-1);if(!previous||previous.id!==q.id&&s.seq-previous.seq>=3){x.independent.push({id:q.id,seq:s.seq});x.independent=x.independent.slice(-5);}}
 if(s.reviewRun){if(!assisted){x.level=Math.min(3,x.level+1);x.due=now+INTERVALS[Math.min(2,x.level)];}else{x.level=0;x.due=now+DAY;}}
 else if(x.due===null||assisted)x.due=now+DAY;
 s.skills[q.skill]=x;s.seen=[...new Set([...s.seen,q.id])];s.seq++;
 s.activeId=null;s.activeChoices=null;s.activeHelp=false;s.activeTries=0;
 if(s.reviewRun){s.reviewRun.index++;if(s.reviewRun.index>=s.reviewRun.skills.length)s.reviewRun=null;return {review:true};}
 if(s.bonus){if(!assisted)s.bonusPasses=[...new Set([...(s.bonusPasses||[]),q.skill])];s.bonus.independent+=assisted?0:1;s.bonus.index++;if(s.bonus.index>=s.bonus.skills.length){const earned=['mixed','connectors','paragraph'].every(k=>s.bonusPasses?.includes(k));s.bonus=null;return {bonusFinished:true,earned};}return {bonus:true};}
 const review=s.step===2||s.step===5;if(!review)s.story++;
 s.step++;if(s.step>=7){s.step=0;if(s.story===30)s.completedAt=now;return {chapterDone:true,chapter:Math.floor(s.story/5)-1};}return {review};
}
export function startReview(s,now=Date.now()){const skills=dueSkills(s,now);if(!skills.length)return false;s.reviewRun={skills,index:0};s.activeId=null;return true;}
export function startBonus(s){s.bonus={skills:['mixed','connectors','paragraph'].filter(k=>!s.bonusPasses?.includes(k)),index:0,independent:0};if(!s.bonus.skills.length)s.bonus.skills=['mixed','connectors','paragraph'];s.activeId=null;}

export function contractAvailable(q){return !/[.!?]/.test(q.parts.join(' ').replace(/[.!?]\s*$/,''));}
export function contractMet(q,choices){return !/[.!?]/.test(renderSentence(q,choices).replace(/[.!?]\s*$/,''));}
