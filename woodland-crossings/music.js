export const MUSIC={src:'assets/autumn-night-v2.mp3',title:'秋夜オルゴール',source:'https://www.mureka.ai/song-detail/Aewi4tAvoYviB9sT3od2oN?is_from_share=1'};
export const TENSION_MUSIC={src:'assets/midnight-tension-cue.mp3',title:'秋夜オルゴール · tension cue',source:'https://www.mureka.ai/song-detail/8twvGFHBmzE98GQsPdY3xJ?is_from_share=1'};
// Crossfades preserve playback positions; the incomplete cue is never looped.
export function createMusicController({AudioClass=globalThis.Audio,onError=()=>{},now=()=>performance.now(),schedule=fn=>setTimeout(fn,40),cancel=clearTimeout,fadeMs=2400}={}){
 const players=new Map();let enabled=false,visible=true,revision=0,mood='calm',lastKey='calm',cueFinished=false,frame=null;
 function stopFade(){if(frame!==null){cancel(frame);frame=null;}}
 function desiredKey(){const key=mood==='memory'?lastKey:mood;return key==='tense'&&cueFinished?null:key;}
 function player(key){
  if(!players.has(key)){
   const audio=new AudioClass((key==='tense'?TENSION_MUSIC:MUSIC).src);audio.loop=key==='calm';audio.preload='none';audio.volume=0;
   if(key==='tense')audio.onended=()=>{cueFinished=true;void sync();};players.set(key,audio);
  }
  return players.get(key);
 }
 function fadeTo(target){
  stopFade();const started=now(),starts=new Map([...players].map(([key,a])=>[key,a.volume]));
  const level=mood==='memory'?.075:.18;
  function tick(){
   frame=null;if(!enabled||!visible)return;
   const t=fadeMs<=0?1:Math.min(1,Math.max(0,(now()-started)/fadeMs)),ease=(1-Math.cos(Math.PI*t))/2;
   for(const [key,a]of players){const finish=key===target?level:0;a.volume=Math.max(0,Math.min(1,starts.get(key)+(finish-starts.get(key))*ease));if(t===1&&key!==target)a.pause();}
   if(t<1)frame=schedule(tick);
  }
  tick();
 }
 async function sync(){
  const request=++revision;stopFade();
  if(!enabled||!visible){players.forEach(a=>{a.volume=0;a.pause();});return false;}
  const key=desiredKey();if(!key){fadeTo(null);return false;}
  try{
   const audio=player(key);if(audio.paused!==false)await audio.play();
   if(request!==revision){if(!enabled||!visible||key!==desiredKey())audio.pause();return false;}
   if(!enabled||!visible){audio.pause();return false;}
   lastKey=key;fadeTo(key);return true;
  }catch(error){if(request===revision&&enabled&&visible){enabled=false;stopFade();players.forEach(a=>{a.volume=0;a.pause();});onError(error);}return false;}
 }
 return {
  setEnabled(value){enabled=!!value;return sync();},
  setVisible(value){visible=!!value;return sync();},
  setMood(value){value=['calm','tense','memory'].includes(value)?value:'calm';if(value===mood)return Promise.resolve(false);mood=value;return sync();},
  setTense(value){return this.setMood(value?'tense':'calm');},
  reset(){stopFade();cueFinished=false;mood='calm';lastKey='calm';players.forEach(a=>{a.pause();a.currentTime=0;a.volume=0;});return sync();}
 };
}

// Keep a chapter’s musical identity steady across its story, notes and questions.
export function chapterMusicMood(q){return q?.stage===2?'tense':'calm';}
