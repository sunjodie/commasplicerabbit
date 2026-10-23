// Painted additions use individual placements on the registered village panorama.
// Stable IDs are saved with the chosen name; old generic decorations still render.
const touch=(id,name,description,x,y,width)=>({id,name,description,image:`assets/village/finishing-touches/${id}.webp`,x,y,width});
export const FINISHING_TOUCHES=[
 [touch('herb-window-box','Herb window box','Rosemary, thyme and sage beneath a round window.',4.8,33,7),
  touch('porch-swing','Patchwork porch swing','A quiet seat with a soft patchwork cushion.',25,35,10),
  touch('acorn-mailbox','Acorn mailbox','A little wooden mailbox ready for village post.',21.5,40,5.5)],
 [touch('birdbath','Stone birdbath','A shallow pool for the garden’s feathered visitors.',26,53,7),
  touch('flower-trellis','Flowering trellis','An arch of climbing flowers at the garden entrance.',11,48,11),
  touch('frog-spout','Frog watering spout','A mossy stone frog trickles water into a little basin.',26,57,7.5)],
 [touch('rabbit-vane','Copper rabbit weather vane','A copper rabbit keeps watch above the roof.',64,26,6),
  touch('birdhouse-rack','Painted birdhouses','Three colourful homes outside the workshop.',76,44,9),
  touch('carved-owl','Carved wooden owl','A watchful little carving beside the doorway.',73,44,5.5)],
 [touch('star-lanterns','Paper star lanterns','Warm paper stars strung above the path.',68,57,17),
  touch('covered-bench','Covered resting bench','A sheltered place to pause along the trail.',82,70,12),
  touch('log-tunnel','Lantern-lit log tunnel','A hollow log with a warm glow inside.',62,64,12)],
 [touch('brass-telescope','Brass telescope','A closer look at the valley from the treetops.',56.5,15.5,6.5),
  touch('leaf-chimes','Copper-leaf wind chimes','Small copper leaves hanging from the lookout.',50,22,5),
  touch('hanging-chair','Woven hanging chair','A cushioned seat tucked beneath the platform.',55,27.5,7.5)],
 [touch('supper-table','Village supper table','Mismatched crockery and room for company.',86,66,15),
  touch('curtained-stage','Plum-curtained stage','A little wooden stage for village performances.',91,75,13),
  touch('bread-oven','Tiled bread oven','Warm bread and a wisp of smoke by the gathering place.',93,70,11)]
];
export function finishingTouches(chapter){return FINISHING_TOUCHES[chapter]||[];}
export function finishingTouch(chapter,value){
 const id=typeof value==='object'?value?.id:value;
 const name=typeof value==='object'?value?.name:value;
 return finishingTouches(chapter).find(d=>d.id===id||d.name===name)||null;
}
export function finishingTouchMarkup(chapter,value){
 const d=finishingTouch(chapter,value);
 return d?`<span class="village-addition" data-touch="${d.id}" style="left:${d.x}%;top:${d.y}%;width:${d.width}%" aria-hidden="true"><img src="${d.image}" alt="" draggable="false"></span>`:'';
}
