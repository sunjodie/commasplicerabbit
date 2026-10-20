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
 {id:'dawn-frog',name:'The clover wanderer',stage:5,view:0,look:'clover',x:12,y:72.5,perches:[{x:42,y:72}],topic:'Vocabulary · relief',text:'Relief can mean the easing of worry: “Pip sighed with relief.” It can also mean help brought to people in difficulty. The surrounding words help you choose the intended meaning.'},
 {"stage":1,"view":1,"id":"eaves-frog","name":"The eaves dweller","sprite":4,"x":87,"y":59,"perches":[{"x":58,"y":62}],"topic":"Vocabulary · sheltered","text":"A sheltered spot is protected from wind or rain. “Shelter” can also be a noun: the rabbits waited under a shelter. The word’s job depends on how it is used."},
 {"stage":1,"view":3,"id":"ripple-frog","name":"The ripple watcher","sprite":5,"x":12,"y":78,"perches":[{"x":48,"y":73}],"topic":"Vocabulary · ripple","text":"A ripple is a small wave on the surface of water. The word can also describe an effect that spreads: a whispered rumour sent a ripple of worry through the village."},
 {"stage":1,"view":4,"id":"sack-frog","name":"The sack snoozer","sprite":0,"x":81,"y":76,"perches":[{"x":57,"y":71}],"topic":"Grammar · beside and besides","text":"“Beside” means next to: a pot stood beside the shed. “Besides” means in addition to: besides the pots, there were sacks. One final letter changes the meaning."},
 {"stage":2,"view":1,"id":"willow-frog","name":"The willow swayer","sprite":4,"x":16,"y":68,"perches":[{"x":43,"y":71}],"topic":"Vocabulary · sodden","text":"“Sodden” means thoroughly soaked. It is stronger than “damp”, which suggests only slight wetness. Choosing between them changes how you picture the leaves after rain."},
 {"stage":2,"view":3,"id":"hazel-frog","name":"The hazel huddler","sprite":8,"x":89,"y":74,"perches":[{"x":59,"y":71}],"topic":"Grammar · past perfect","text":"“The rain had begun before they set out.” “Had begun” places one past event before another. The past perfect helps a reader put events in order."},
 {"stage":2,"view":4,"id":"fingerpost-frog","name":"The signpost sitter","sprite":7,"x":21,"y":76,"perches":[{"x":51,"y":72}],"topic":"Vocabulary · cautious","text":"A cautious person considers possible danger before acting. Caution is care about what might happen; it does not always mean refusing to act."},
 {"stage":3,"view":1,"id":"ink-frog","name":"The inkwell observer","sprite":2,"x":84,"y":69,"perches":[{"x":57,"y":64}],"topic":"Vocabulary · legible","text":"Writing that is legible is clear enough to read. “Illegible” means difficult or impossible to read. A message can be legible without being easy to understand."},
 {"stage":3,"view":3,"id":"bramble-frog","name":"The bramble balancer","sprite":4,"x":14,"y":74,"perches":[{"x":46,"y":70}],"topic":"Grammar · possessive apostrophes","text":"“The rabbit’s map” belongs to one rabbit. “The rabbits’ map” belongs to more than one. Find the owner first, then decide where the apostrophe belongs."},
 {"stage":3,"view":4,"id":"margin-frog","name":"The margin reader","sprite":1,"x":88,"y":63,"perches":[{"x":61,"y":66}],"topic":"Vocabulary · retrace","text":"To retrace your steps is to go back along the route you took. The prefix “re-” often suggests doing something again, as in “reread” or “recheck”."},
 {"stage":4,"view":1,"id":"landing-frog","name":"The landing lounger","sprite":5,"x":13,"y":76,"perches":[{"x":45,"y":73}],"topic":"Vocabulary · an account","text":"An account can be a description of what happened. In a mystery, comparing accounts means comparing what people say they noticed. Here it has nothing to do with a bank account."},
 {"stage":4,"view":3,"id":"echo-frog","name":"The echo collector","sprite":8,"x":86,"y":72,"perches":[{"x":58,"y":69}],"topic":"Grammar · heard and herd","text":"“Heard” is the past tense of “hear”. A “herd” is a group of certain animals. The words sound alike, so use their meaning in the sentence to choose the spelling."},
 {"stage":4,"view":4,"id":"hush-frog","name":"The quiet questioner","sprite":3,"x":19,"y":62,"perches":[{"x":49,"y":66}],"topic":"Vocabulary · corroborate","text":"To corroborate an account is to provide evidence that supports it. Simply repeating the same claim does not necessarily provide new support."},
 {"stage":5,"view":1,"id":"blanket-frog","name":"The blanket borrower","sprite":8,"x":85,"y":75,"perches":[{"x":60,"y":72}],"topic":"Vocabulary · huddled","text":"To huddle is to crowd closely together, often for warmth or protection. “The travellers huddled beneath the roof” suggests both their position and their need for shelter."},
 {"stage":5,"view":3,"id":"arch-frog","name":"The archway rambler","sprite":9,"x":15,"y":71,"perches":[{"x":47,"y":68}],"topic":"Grammar · who and which","text":"“Who” usually refers to people; “which” usually refers to things or animals. In a story where animals speak and act as people, “who” can suit a character too."},
 {"stage":5,"view":4,"id":"porch-pebble-frog","name":"The pebble keeper","sprite":6,"x":90,"y":67,"perches":[{"x":62,"y":70}],"topic":"Vocabulary · reassurance","text":"Reassurance helps someone feel less worried. The prefix “re-” can suggest making someone sure again. A familiar voice or a clear explanation can offer reassurance."}
];
export function frogFinds(raw){return [...new Set(Array.isArray(raw)?raw:[])].filter(id=>FROGS.some(f=>f.id===id));}
export function frogForScene(stage,view=0){return FROGS.find(f=>f.stage===stage&&f.view===view);}
export function frogReached(f,s){
 if(s.story>=(f.stage+1)*5)return true;
 if(f.stage>Math.floor(s.story/5))return false;
 if(f.view===0)return true;
 const id='m'+(f.stage*5+f.view+1),reader=s[['chapterOne','chapterTwo','chapterThree'][f.stage]];
 return s.story>=f.stage*5+f.view||s.activeId===id||s.activeScenery?.key===f.stage+'-'+f.view||reader?.read?.includes(id)||reader?.positions?.[id]!==undefined;
}
export function frogArt(f){const index=f.sprite??(FROGS.findIndex(x=>x.id===f.id)%10);return `<span class="frog-sprite" style="--frog-col:${index%5*25}%;--frog-row:${Math.floor(index/5)*100}%;--frog-base:${index<5?.09:.14}" aria-hidden="true"></span>`;}
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
