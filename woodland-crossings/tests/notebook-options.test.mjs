// Runs the real viewport pagination against a minimal DOM adapter. No layout engine.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {presentChapterView} from '../chapter-ui.js';
import {CHAPTER_TWO_CASEWORK} from '../chapter-two-casework.js';
class Node {
 constructor(tag='div',cls='',text=''){this.tag=tag;this.className=cls;this.textContent=text;this.children=[];this.dataset={};this.parentNode=null;this.classList={add(){},remove(){}};}
 append(...nodes){for(const node of nodes){node.remove();node.parentNode=this;this.children.push(node);}}
 remove(){if(this.parentNode){this.parentNode.children=this.parentNode.children.filter(n=>n!==this);this.parentNode=null;}}
 replaceChildren(...nodes){for(const node of this.children)node.parentNode=null;this.children=[];this.append(...nodes);}
 matches(selector){return selector.split(',').some(s=>s.startsWith('.')?this.className.split(' ').includes(s.slice(1)):this.tag===s);}
 querySelectorAll(selector){if(selector.startsWith(':scope > '))return this.children.filter(n=>n.matches(selector.slice(9)));return this.children.flatMap(n=>[...(n.matches(selector)?[n]:[]),...n.querySelectorAll(selector)]);}
 querySelector(selector){return this.querySelectorAll(selector)[0]||null;}
}
function setup(task,width,height){
 const panel=new Node('section','casework-page'),context=new Node('blockquote','casework-context',task.context),prompt=new Node('p','casework-prompt',task.prompt),group=new Node('div','casework-options'),actions=new Node('div','casework-actions');
 for(const option of task.options){const button=new Node('button','casework-option',option.text);button.dataset.caseChoice=option.id;group.append(button);}
 actions.append(new Node('button','','Check the reasoning'));panel.append(context,prompt,group,actions);
 const app=new Node(),body=new Node('body');
 globalThis.window={innerWidth:width,innerHeight:height,matchMedia:()=>({matches:true})};
 globalThis.document={body,createElement:tag=>new Node(tag),querySelector:selector=>selector==='.casework-page'?panel:selector==='#app'?app:null};
 return panel;
}
test('every Chapter 2 notebook answer set stays together on the same visible question page',()=>{
 const oldDocument=globalThis.document,oldWindow=globalThis.window;
 try{
  for(const [width,height] of [[600,600],[768,1024],[1024,600],[1366,768]])for(const task of CHAPTER_TWO_CASEWORK){
   const panel=setup(task,width,height);
   presentChapterView({kind:'casework',title:task.title,key:task.id+'-'+width,chapter:2});
   const answerPages=panel.children.filter(n=>n.dataset.pageType==='question');
   assert.equal(answerPages.length,1,task.id+': choices split across pages');
   const answer=answerPages[0],group=answer.querySelector('.casework-options');
   assert.deepEqual(group.children.map(n=>n.dataset.caseChoice),task.options.map(o=>o.id));
   assert.ok(answer.querySelector('.casework-actions'),'Check button must share the answer page');
   const nav=panel.querySelector('.vn-pages');let guard=0;
   while(answer.hidden&&guard++<10)nav.children[2].onclick();
   assert.equal(answer.hidden,false);
   assert.equal(panel.children.filter(n=>n.dataset.pageType==='question'&&!n.hidden).length,1);
   for(const choice of group.children){assert.ok(!choice.hidden);assert.equal(choice.parentNode.parentNode,answer);}
  }
 }finally{globalThis.document=oldDocument;globalThis.window=oldWindow;}
});
