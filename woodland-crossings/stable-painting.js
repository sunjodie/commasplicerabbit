// Keep the loaded painting and crop while answer controls are rebuilt around it.
export function retainPainting(root,selector,key){
 const previous=root.querySelector(selector),reuse=previous?.dataset.paintingKey===key?previous:null;
 return ()=>{const next=root.querySelector(selector);if(!next)return null;if(reuse&&next!==reuse&&next.replaceWith){next.replaceWith(reuse);return reuse;}next.dataset.paintingKey=key;return next;};
}
