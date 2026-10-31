export const clampZoom=value=>Math.min(3,Math.max(1,value));
export function bindVillageZoom(root){
 const view=root.querySelector('.village-viewport'),canvas=root.querySelector('.village-canvas');if(!view||!canvas)return;
 let zoom=1,gesture=null,moved=false;const pointers=new Map();
 const plus=root.querySelector('#villageZoom'),minus=root.querySelector('#villageZoomOut'),fit=root.querySelector('#villageFit');
 function setZoom(value,x=view.clientWidth/2,y=view.clientHeight/2){
  const next=clampZoom(value),ratio=next/zoom,left=((view.scrollLeft||0)+x)*ratio-x,top=((view.scrollTop||0)+y)*ratio-y;
  if(zoom===1&&next>1)view.style.height=view.clientHeight+'px';
  zoom=next;canvas.style.width=zoom*100+'%';view.setAttribute('data-zoom',String(zoom));
  view.scrollLeft=left;view.scrollTop=top;if(zoom===1){view.style.height='';view.scrollLeft=0;view.scrollTop=0;}
  plus.disabled=zoom>=3;minus.disabled=zoom<=1;fit.disabled=zoom===1;
  plus.setAttribute('aria-label','Zoom in, currently '+Math.round(zoom*100)+' percent');
 }
 plus.onclick=()=>setZoom(zoom+.5);minus.onclick=()=>setZoom(zoom-.5);fit.onclick=()=>setZoom(1);
 const point=e=>{const r=view.getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top};};
 function rebase(){const p=[...pointers.values()];gesture=p.length>1?{distance:Math.hypot(p[1].x-p[0].x,p[1].y-p[0].y),zoom,x:(p[0].x+p[1].x)/2,y:(p[0].y+p[1].y)/2,left:view.scrollLeft||0,top:view.scrollTop||0}:p.length?{...p[0],left:view.scrollLeft||0,top:view.scrollTop||0}:null;}
 view.addEventListener?.('pointerdown',e=>{if(e.button!==0)return;if(!pointers.size)moved=false;pointers.set(e.pointerId,point(e));rebase();});
 view.addEventListener?.('pointermove',e=>{
  if(!pointers.has(e.pointerId)||!gesture)return;pointers.set(e.pointerId,point(e));const p=[...pointers.values()];
  if(p.length>1){const distance=Math.hypot(p[1].x-p[0].x,p[1].y-p[0].y);if(!gesture.distance)return;const target=clampZoom(gesture.zoom*distance/gesture.distance);setZoom(target);view.scrollLeft=(gesture.left+gesture.x)*target/gesture.zoom-(p[0].x+p[1].x)/2;view.scrollTop=(gesture.top+gesture.y)*target/gesture.zoom-(p[0].y+p[1].y)/2;moved=true;}
  else if(zoom>1){const dx=p[0].x-gesture.x,dy=p[0].y-gesture.y;if(Math.hypot(dx,dy)>5)moved=true;if(moved){view.scrollLeft=gesture.left-dx;view.scrollTop=gesture.top-dy;}}
  if(moved){view.setPointerCapture?.(e.pointerId);e.preventDefault();}
 });
 const end=e=>{pointers.delete(e.pointerId);rebase();};view.addEventListener?.('pointerup',end);view.addEventListener?.('pointercancel',end);
 view.addEventListener?.('click',e=>{if(moved){e.preventDefault();e.stopPropagation();moved=false;}},true);
 view.addEventListener?.('wheel',e=>{if(!e.ctrlKey)return;e.preventDefault();const p=point(e);setZoom(zoom*Math.exp(-e.deltaY*.01),p.x,p.y);},{passive:false});
 setZoom(1);
}
