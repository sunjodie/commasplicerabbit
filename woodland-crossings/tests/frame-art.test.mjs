import {readFileSync} from 'node:fs';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {FRAME_ART,readingFrameArt,textFrameArt,questionFrameArt,caseworkFrameArt,frameGeometry} from '../frame-art.js';
import {CHAPTER_ONE,readingPages} from '../chapter-one.js';
import {textPages} from '../chapter-ui.js';
test('every chapter one reading frame and assessment stop has its own art',()=>{
 const original=FRAME_ART.filter(f=>/^m[1-5]$/.test(f.scene));assert.equal(original.length,52);assert.equal(new Set(original.map(f=>f.asset+':'+f.cell)).size,52);
 for(const s of CHAPTER_ONE){assert.ok(questionFrameArt(s.id));for(const [page,paragraphs]of readingPages(s).entries())for(const [part]of textPages(paragraphs,38).entries())assert.equal(readingFrameArt(s.id,page,part).id,`${s.id}-${page}-${part}`);}
 for(const id of ['wood-note','dark-window','yellow-stitches'])assert.ok(caseworkFrameArt(id));
});
test('responsive reading chunks map to narrative artwork without repeating adjacent paintings',()=>{
 for(const budget of [38,42,48])for(const s of CHAPTER_ONE){const ids=[];for(const paragraphs of readingPages(s))for(const page of textPages(paragraphs,budget))ids.push(textFrameArt(s.id,page.join(' ')).id);for(let i=1;i<ids.length;i++)assert.notEqual(ids[i],ids[i-1],s.id+' / '+budget);}
});
test('atlas cells cover landscape and portrait without showing neighbouring frames',()=>{
 for(const [w,h]of [[1366,714],[768,970],[600,400]])for(let cell=0;cell<4;cell++){const g=frameGeometry(w,h,cell),left=g.x+(cell%2)*g.width/2,top=g.y+Math.floor(cell/2)*g.height/2;assert.ok(left<=0&&top<=0);assert.ok(left+g.width/2>=w&&top+g.height/2>=h);}
});

test('all illustration sheets exist as complete WebP assets',()=>{
 for(const asset of new Set(FRAME_ART.map(f=>f.asset))){const b=readFileSync(new URL('../assets/'+asset,import.meta.url));assert.equal(b.toString('ascii',0,4),'RIFF');assert.equal(b.toString('ascii',8,12),'WEBP');assert.ok(b.length>100000,asset);}
});

test('Chapter 3 story, main notes and retries all have a crop frame',()=>{
 for(let n=11;n<=15;n++){
  const main=questionFrameArt('m'+n),retry=questionFrameArt('r'+n);
  assert.ok(main);assert.equal(main,retry);
  assert.ok(readingFrameArt('m'+n));
 }
 assert.equal(questionFrameArt('m11').columns,1);assert.equal(questionFrameArt('m11').rows,1);
 for(let n=12;n<=15;n++)assert.equal(questionFrameArt('m'+n).cell,n-12);
});
test('Chapter 3 crops isolate one painting in desktop, portrait and tablet landscape panels',()=>{
 for(const [width,height] of [[1366,714],[768,970],[1024,546],[600,546]])for(let n=11;n<=15;n++){
  const f=questionFrameArt('m'+n),cols=f.columns||2,rows=f.rows||2;
  const g=frameGeometry(width,height,f.cell,.7,cols,rows);
  const left=g.x+(f.cell%cols)*g.width/cols,top=g.y+Math.floor(f.cell/cols)*g.height/rows;
  assert.ok(left<=0&&top<=0);assert.ok(left+g.width/cols>=width&&top+g.height/rows>=height);
  assert.equal((g.width/cols)/(g.height/rows),1.5);
 }
});
