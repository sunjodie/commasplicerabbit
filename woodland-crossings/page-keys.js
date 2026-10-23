// Page navigation only. Never select, check or submit an answer with arrow keys.
export function handlePageArrow(event,doc=globalThis.document){
 if(event.defaultPrevented||event.repeat||event.isComposing||event.altKey||event.ctrlKey||event.metaKey||event.shiftKey||!['ArrowLeft','ArrowRight'].includes(event.key))return false;
 const target=event.target;
 if(target?.isContentEditable||target?.closest?.('input,textarea,select,[contenteditable]:not([contenteditable="false"]),[role="slider"],[role="radiogroup"]'))return false;
 const scope=doc.querySelector('dialog[open]')||doc.querySelector('#app');if(!scope)return false;
 const visible=el=>el&&!el.disabled&&el.getClientRects().length>0&&!el.closest('[hidden],[inert]')&&doc.defaultView?.getComputedStyle(el).visibility!=='hidden';
 const right=event.key==='ArrowRight';
 for(const nav of scope.querySelectorAll('.vn-pages')){
  if(!visible(nav))continue;const buttons=nav.querySelectorAll('button'),button=right?buttons[buttons.length-1]:buttons[0];
  if(visible(button)){event.preventDefault();button.click();return true;}
 }
 const selectors=right?['#notebookNext','#storyNext','#bookNext','#caseworkContinue','[data-page-continue]','#next']:['#notebookPrevious','#storyPrevious','#bookPrevious'];
 for(const selector of selectors){const b=scope.querySelector(selector);if(visible(b)){event.preventDefault();b.click();return true;}}
 return false;
}
if(typeof document!=='undefined')document.addEventListener?.('keydown',event=>handlePageArrow(event));
