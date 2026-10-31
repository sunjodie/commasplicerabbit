// iPadOS can identify itself as a Mac when requesting desktop websites.
export function isIPad(nav){return /iPad/i.test(nav.userAgent||'')||(/Mac/i.test(nav.platform||'')&&nav.maxTouchPoints>1);}
export function portraitIPad(nav,screen,width,height){
 if(!isIPad(nav))return false;
 const orientation=screen?.orientation?.type;
 return orientation?orientation.startsWith('portrait'):height>width;
}
export function installIPadLayout(win=window,doc=document){
 if(!isIPad(win.navigator))return;
 doc.body.classList.add('ipad-layout');
 const prompt=doc.createElement('dialog');prompt.className='ipad-rotate';
 prompt.setAttribute('aria-labelledby','ipadRotateTitle');
 prompt.innerHTML='<div class="ipad-device" aria-hidden="true"></div><h2 id="ipadRotateTitle">Turn your iPad sideways</h2><p>The story is best played in landscape, with room for the artwork and questions.</p><p class="small-note">If it stays upright, switch off Rotation Lock in Control Centre.</p><button type="button" class="secondary">Continue in portrait</button>';
 doc.body.append(prompt);let dismissed=false,previousFocus;
 function update(){
  const portrait=portraitIPad(win.navigator,win.screen,win.innerWidth,win.innerHeight);
  if(!portrait){dismissed=false;if(prompt.open)prompt.close();return;}
  if(!dismissed&&!prompt.open){previousFocus=doc.activeElement;prompt.showModal();}
 }
 prompt.querySelector('button').onclick=()=>{dismissed=true;prompt.close();};
 prompt.addEventListener('cancel',()=>{dismissed=true;});
 prompt.addEventListener('close',()=>{if(previousFocus?.isConnected)previousFocus.focus({preventScroll:true});});
 win.addEventListener('resize',update);win.addEventListener('orientationchange',update);win.screen?.orientation?.addEventListener?.('change',update);
 // Use native locking only where supported. Safari gracefully retains the rotate prompt.
 doc.addEventListener('pointerdown',()=>{if(typeof win.screen?.orientation?.lock==='function')Promise.resolve().then(()=>win.screen.orientation.lock('landscape')).catch(()=>{});},{once:true});
 update();
}
if(typeof window!=='undefined'&&typeof document!=='undefined')installIPadLayout();
