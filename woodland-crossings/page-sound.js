// One quiet paper rustle for deliberate page turns; never for answer selection.
export function isPageTurn(event){
 const button=event.target?.closest?.('.vn-pages button,#storyPrevious,#storyNext,#bookPrevious,#bookNext,[data-page-continue]');
 return !!button&&!button.disabled&&!button.closest('[hidden],[inert]');
}
export function createPageSound({AudioClass=globalThis.Audio,now=()=>performance.now()}={}){
 let audio,enabled=false,visible=true,last=-Infinity,revision=0;
 function stop(){revision++;if(audio){audio.pause();audio.currentTime=0;}}
 return {
  setEnabled(value){enabled=!!value;if(!enabled)stop();},
  setVisible(value){visible=!!value;if(!visible)stop();},
  async turn(){
   if(!enabled||!visible||!AudioClass||now()-last<140)return false;
   last=now();const request=++revision;
   try{audio??=new AudioClass('assets/page-flip.mp3');audio.preload='none';audio.volume=.22;audio.pause();audio.currentTime=0;await audio.play();if(request!==revision||!enabled||!visible){if(!enabled||!visible)audio.pause();return false;}return true;}catch{return false;}
  }
 };
}
