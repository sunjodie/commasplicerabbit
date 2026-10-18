export const MUSIC={src:'assets/autumn-night-v2.mp3',title:'秋夜オルゴール',source:'https://www.mureka.ai/song-detail/Aewi4tAvoYviB9sT3od2oN?is_from_share=1'};
export const TENSION_MUSIC={src:'assets/midnight-tension-cue.mp3',title:'秋夜オルゴール · tension cue',source:'https://www.mureka.ai/song-detail/8twvGFHBmzE98GQsPdY3xJ?is_from_share=1'};
// Lazy players: the unfinished tension recording plays once, then calm music resumes.
export function createMusicController({AudioClass=globalThis.Audio,onError=()=>{}}={}){
 const players=new Map();
 let enabled=false,visible=true,revision=0,tense=false,cueFinished=false;
 function player(cue){
  const key=cue?'tense':'calm';
  if(!players.has(key)){
   const audio=new AudioClass((cue?TENSION_MUSIC:MUSIC).src);
   audio.loop=!cue;audio.preload='none';audio.volume=.18;
   if(cue)audio.onended=()=>{if(tense&&!cueFinished){cueFinished=true;void sync();}};
   players.set(key,audio);
  }
  return players.get(key);
 }
 async function sync(){
  const request=++revision;
  if(!enabled||!visible){players.forEach(a=>a.pause());return false;}
  let audio;
  try{
   audio=player(tense&&!cueFinished);
   players.forEach(a=>{if(a!==audio)a.pause();});
   await audio.play();
   if(!enabled||!visible||audio!==players.get(tense&&!cueFinished?'tense':'calm')){audio.pause();return false;}
   return true;
  }catch(error){
   if(request===revision&&enabled&&visible){enabled=false;players.forEach(a=>a.pause());onError(error);}
   return false;
  }
 }
 return {
  setEnabled(value){enabled=!!value;return sync();},
  setVisible(value){visible=!!value;return sync();},
  setTense(value){
   value=!!value;if(value===tense)return Promise.resolve(false);
   tense=value;cueFinished=false;
   const cue=players.get('tense');if(cue){cue.pause();cue.currentTime=0;}
   return sync();
  }
 };
}
