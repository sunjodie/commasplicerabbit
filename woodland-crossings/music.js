export const MUSIC={src:'assets/autumn-night-v2.mp3',title:'秋夜オルゴール',source:'https://www.mureka.ai/song-detail/Aewi4tAvoYviB9sT3od2oN?is_from_share=1'};
// Lazy creation avoids downloading or playing audio before a sound-button gesture.
export function createMusicController({AudioClass=globalThis.Audio,onError=()=>{}}={}){
 let audio=null,enabled=false,visible=true,revision=0;
 async function sync(){
  const request=++revision;
  if(!enabled||!visible){audio?.pause();return false;}
  try{
   if(!audio){audio=new AudioClass(MUSIC.src);audio.loop=true;audio.preload='none';audio.volume=.18;}
   await audio.play();
   if(!enabled||!visible){audio.pause();return false;}
   return true;
  }catch(error){
   if(request===revision&&enabled&&visible){enabled=false;audio?.pause();onError(error);}
   return false;
  }
 }
 return {setEnabled(value){enabled=!!value;return sync();},setVisible(value){visible=!!value;return sync();}};
}
