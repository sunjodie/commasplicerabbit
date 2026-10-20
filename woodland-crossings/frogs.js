// Optional language discoveries. These never reveal evidence or assessment answers.
export const FROGS=[
 {id:'fair-frog',name:'The ribbon collector',stage:0,view:0,look:'ribbon',x:17,y:26.6,perches:[{x:40,y:53.5}],topic:'Vocabulary · dismantle',text:'The stalls are being dismantled: taken apart piece by piece. “Dis-” often suggests reversal, as in “disconnect” and “disarm”, but a prefix is a clue rather than a guarantee.'},
 {id:'window-frog',name:'The stargazer',stage:0,view:1,look:'glasses',x:88,y:64.5,perches:[{x:73,y:65.5}],topic:'Grammar · a complete thought',text:'“A light glimmered” is a complete clause. “Beyond the gardens” tells us where, but it needs a clause to belong to. A long phrase is not necessarily a sentence.'},
 {id:'fireside-frog',name:'The fireside reader',stage:0,view:2,look:'book',x:14,y:26.5,perches:[{x:74.5,y:32.5}],topic:'Vocabulary · a legend',text:'A legend is a traditional story passed from person to person. Calling something a legend tells us how the story has travelled, not whether every detail is true.'},
 {id:'rain-frog',name:'The raincoat rambler',stage:0,view:3,look:'umbrella',x:13,y:56,perches:[{x:41,y:57.1}],topic:'Grammar · “its” and “it’s”',text:'“The lantern lost its glow” uses “its” to show possession. “It’s raining” means “it is raining”. Try expanding “it’s” before choosing an apostrophe.'},
 {id:'porch-frog',name:'The mossy doorkeeper',stage:0,view:4,look:'leaf',x:91,y:73.5,perches:[{x:75,y:74.5}],topic:'Vocabulary · a threshold',text:'A threshold is the strip at the bottom of a doorway. It can also mean the beginning of something: “on the threshold of an adventure”. A physical place can lend a word a figurative meaning.'},
 {id:'reed-frog',name:'The reed musician',stage:1,view:0,look:'reed',x:16,y:64,perches:[{x:48,y:54}],topic:'Vocabulary · a trace',text:'A trace is a small sign that something was there. “A trace of mud” suggests only a little mud; “trace the route” uses the same word as a verb meaning to follow or mark its course.'},
 {id:'bell-frog',name:'The copper tinkerer',stage:2,view:0,look:'cap',x:83,y:70,perches:[{x:49,y:46.5}],topic:'Grammar · “however”',text:'“The bell was small; however, it was heavy.” “However” signals contrast, but it cannot join two complete clauses with just a comma. A full stop before “however” also works.'},
 {id:'map-frog',name:'The pocket cartographer',stage:3,view:0,look:'map',x:27,y:44.5,perches:[{x:53,y:38}],topic:'Vocabulary · a winding path',text:'A winding path turns repeatedly. “Winding” here rhymes with “finding”; winding a clock uses the same pronunciation. Wind blowing through the trees has a different vowel sound.'},
 {id:'clock-frog',name:'The patient listener',stage:4,view:0,look:'scarf',x:90,y:53.5,perches:[{x:51,y:52}],topic:'Grammar · reported speech',text:'Direct speech gives the speaker’s words: “I heard a bell,” she said. Reported speech carries the message: she said that she had heard a bell. The viewpoint and time may change with the reporting context.'},
 {id:'dawn-frog',name:'The clover wanderer',stage:5,view:0,look:'clover',x:12,y:72.5,perches:[{x:42,y:72}],topic:'Vocabulary · relief',text:'Relief can mean the easing of worry: “Pip sighed with relief.” It can also mean help brought to people in difficulty. The surrounding words help you choose the intended meaning.'}
];
export function frogFinds(raw){return [...new Set(Array.isArray(raw)?raw:[])].filter(id=>FROGS.some(f=>f.id===id));}
export function frogForScene(stage,view=0){return FROGS.find(f=>f.stage===stage&&f.view===view);}
export function frogReached(f,s){if(f.stage>Math.floor(s.story/5))return false;if(f.stage||s.story>=5||f.view===0)return true;const id='m'+(f.view+1);return s.activeId===id||s.chapterOne?.read?.includes(id)||s.chapterOne?.positions?.[id]!==undefined;}
export function frogArt(f){const index=FROGS.findIndex(x=>x.id===f.id);return `<span class="frog-sprite" style="--frog-col:${index%5*25}%;--frog-row:${Math.floor(index/5)*100}%;--frog-base:${index<5?.09:.14}" aria-hidden="true"></span>`;}
// The point marks the frog's feet on the source painting, not on the screen.
export function frogAnchor(f,width,height,size='cover',position='50% 50%'){
 let artWidth=width,artHeight=height;
 if(size==='cover'){const scale=Math.max(width/1536,height/1024);artWidth=1536*scale;artHeight=1024*scale;}
 const [px,py]=position.split(' ').map(v=>v==='center'?.5:v==='left'||v==='top'?0:v==='right'||v==='bottom'?1:parseFloat(v)/100);
 return {x:(width-artWidth)*(Number.isFinite(px)?px:.5)+artWidth*f.x/100,y:(height-artHeight)*(Number.isFinite(py)?py:.5)+artHeight*f.y/100,size:Math.min(36,Math.max(26,artWidth*.022))};
}
export function frogPosition(f,width,height,size,position){
 const options=[f,...(f.perches||[]).map(perch=>({...f,...perch}))];
 const points=options.map(option=>frogAnchor(option,width,height,size,position));
 return points.find(p=>p.x>=22&&p.x<=width-22&&p.y>=44&&p.y<=height)||points[0];
}
let observer;
export function placeFrogs(root){
 if(typeof window==='undefined'||!window.getComputedStyle)return;
 observer?.disconnect();
 const buttons=[...(globalThis.document.querySelectorAll?.('.woodland-frog')||root.querySelectorAll('.woodland-frog'))];
 function place(){for(const button of buttons){const f=FROGS.find(x=>x.id===button.dataset.frog),scene=button.closest('.painted-scene');if(!f||!scene||!scene.isConnected)continue;const perch=scene.dataset.frogPerch;if(perch==='none'){button.hidden=true;continue;}const override=perch?JSON.parse(perch):null;if(override&&override.id!==f.id){button.hidden=true;continue;}const rect=scene.getBoundingClientRect(),style=window.getComputedStyle(scene),point=frogPosition(override?{...f,...override,perches:override.perches||f.perches||[]}:f,rect.width,rect.height,scene.dataset.frameArt?'cover':style.backgroundSize,scene.dataset.frameArt?'70% 50%':style.backgroundPosition);button.style.left=point.x+'px';button.style.top=point.y+'px';button.style.setProperty('--frog-size',point.size+'px');button.hidden=point.x<22||point.x>rect.width-22||point.y<44||point.y>rect.height;}}
 place();window.requestAnimationFrame?.(place);
 if(typeof ResizeObserver!=='undefined'){observer=new ResizeObserver(place);buttons.forEach(b=>{const scene=b.closest('.painted-scene');if(scene)observer.observe(scene);});}
}
