import {test} from 'node:test';
import assert from 'node:assert/strict';
import {retainPainting} from '../stable-painting.js';
test('answer redraws reuse the loaded artwork while scene and success transitions replace it',()=>{
 let current={dataset:{},style:{backgroundImage:'loaded',backgroundPosition:'-400px 0px'}};
 const root={querySelector:()=>current};retainPainting(root,'.scene','m7:false')();const original=current;
 const restore=retainPainting(root,'.scene','m7:false');current={dataset:{},replaceWith(node){current=node;}};assert.equal(restore(),original);assert.equal(current.style.backgroundPosition,'-400px 0px');
 for(const key of ['m7:true','m8:false','case:c2']){const update=retainPainting(root,'.scene',key);const replacement={dataset:{},replaceWith(node){current=node;}};current=replacement;assert.equal(update(),replacement);assert.equal(current.dataset.paintingKey,key);}
});
