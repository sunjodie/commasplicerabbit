import {FRAME_ART} from './frame-art.js?v=20261030-book-unlock2';
// Replay every Chapter 1 painting rather than skipping anchors when text is repaginated.
export function illustratedBookPages(story){
 const source=story.paragraphs.join('\n\n');
 const anchors=FRAME_ART.filter(f=>f.scene===story.id&&f.kind==='story').map(frame=>({frame,start:source.indexOf(frame.text.slice(0,60))})).filter(x=>x.start>=0).sort((a,b)=>a.start-b.start);
 return anchors.map((a,i)=>({frame:a.frame,paragraphs:source.slice(i===0?0:a.start,anchors[i+1]?.start??source.length).trim().split(/\n\n/)}));
}
