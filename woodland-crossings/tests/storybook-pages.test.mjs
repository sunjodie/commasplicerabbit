import {test} from 'node:test';
import assert from 'node:assert/strict';
import {CHAPTER_ONE} from '../chapter-one.js';
import {FRAME_ART} from '../frame-art.js';
import {illustratedBookPages} from '../storybook-pages.js';
test('Chapter 1 storybook includes every story painting and conserves all prose in order',()=>{
 const normalise=s=>s.replace(/\s+/g,' ').trim();
 for(const story of CHAPTER_ONE){
  const pages=illustratedBookPages(story),frames=FRAME_ART.filter(f=>f.scene===story.id&&f.kind==='story');
  assert.deepEqual(pages.map(p=>p.frame.id),frames.map(f=>f.id));
  assert.equal(normalise(pages.flatMap(p=>p.paragraphs).join(' ')),normalise(story.paragraphs.join(' ')));
  assert.ok(pages.every(p=>p.paragraphs.join('').length>0));
 }
 assert.equal(illustratedBookPages(CHAPTER_ONE[0])[6].frame.id,'m1-2-1');
});

test('storybook never exposes the next unread scene, including default page-zero entries',async()=>{
 const {fresh}=await import('../engine.js');const {availableStoryScenes,setStoryPosition,finishStoryScene,STORY_SCENES}=await import('../story-reader.js');
 for(let stage=0;stage<6;stage++){
  const s=fresh();s.story=stage*5;const scenes=STORY_SCENES.slice(stage*5,stage*5+5),current=()=>availableStoryScenes(s).filter(x=>(x.stage||0)===stage);
  assert.equal(current().length,0);
  for(const [i,scene] of scenes.entries()){
   setStoryPosition(s,scene.id,0);assert.deepEqual(current().map(x=>x.id),scenes.slice(0,i+1).map(x=>x.id));
   finishStoryScene(s,scene.id);assert.equal(current().length,i+1);
  }
 }
});
