import {fresh} from './engine.js?v=20261030-clarice-options1';
import {BANK} from './content.js?v=20261030-clarice-options1';
import {STORY_SCENES,finishStoryScene} from './story-reader.js?v=20261030-clarice-options1';
export const testerEnabled=search=>new URLSearchParams(search).get('test')==='1';
export function testState(id,{question=false}={}){
 const q=BANK.find(q=>q.id===id&&(q.id.startsWith('m')||q.id.startsWith('b')));
 if(!q)throw new Error('Unknown test scene');
 const s=fresh();
 s.story=q.id.startsWith('b')?30:Number(q.id.slice(1))-1;s.step=s.story%5;s.introduced=[0,1,2,3,4,5];
 for(const scene of STORY_SCENES){if(Number(scene.id.slice(1))<=s.story||(question&&Math.floor((Number(scene.id.slice(1))-1)/5)===q.stage))finishStoryScene(s,scene.id);}
 if(q.id.startsWith('b'))s.bonus={skills:['mixed','connectors','paragraph'],index:Number(q.id.slice(1))-1};
 s.activeId=q.id;s.activeChoices=q.initialChoices?.slice()||q.valid.map(()=> 'comma');
 return s;
}
