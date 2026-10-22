import {CHAPTER_FIVE_SIX_CASEWORK} from './chapter-five-six-casework.js';
import {CHAPTER_TWO_CASEWORK} from './chapter-two-casework.js?v=20261022-simulator-feedback1';
import {CHAPTER_FOUR_CASEWORK} from './chapter-four-casework.js?v=20261022-simulator-feedback1';
// Supporting questions from the approved Chapter 1.
export const CASEWORK=[
  {
    "question": "m4",
    "id": "wood-note",
    "kind": "grammar",
    "title": "The fresh timber",
    "label": "Quick grammar edit",
    "context": "Pip records the fresh scent beside the mill wall.",
    "prompt": "Find and replace one grammatically incorrect word. Preserve meaning and past tense.",
    "text": "The scent of freshly sawn boards were particularly sharp beside the mill wall.",
    "answer": "was",
    "word": 6,
    "hint": "Find the subject of the verb. Does the phrase beginning with “of” change its number?",
    "why": "The singular subject is “scent”. The intervening phrase “of freshly sawn boards” does not make it plural.",
    "success": "Pip keeps the observation in her notebook."
  },
  {
    "question": "m4",
    "id": "dark-window",
    "kind": "vocabulary",
    "title": "Something out of place",
    "label": "Words in context",
    "context": "The mill had been silent since its wheel stopped for winter. Beneath the window, however, lay pale wood shavings. Their sharp, fresh scent seemed incongruous among the wet leaves and damp wood.",
    "prompt": "Which meaning of “incongruous” best fits this context?",
    "options": [
      {
        "id": "concealed",
        "text": "Stronger than the other smells around it.",
        "feedback": "Go back to the clues. Does the passage actually tell you that?"
      },
      {
        "id": "distant",
        "text": "Unexpected in those particular surroundings.",
        "feedback": "Go back to the clues. Does the passage actually tell you that?"
      },
      {
        "id": "movement",
        "text": "Impossible to explain from the visible evidence.",
        "feedback": "Go back to the clues. Does the passage actually tell you that?"
      },
      {
        "id": "relief",
        "text": "Easily confused with the smells surrounding it.",
        "feedback": "Go back to the clues. Does the passage actually tell you that?"
      }
    ],
    "answer": "distant",
    "hint": "Compare the fresh scent with the wet surroundings. What relationship does the word describe?",
    "why": "“Incongruous” expresses a mismatch with the setting. A confuses incongruity with intensity. C overstates the mystery because the visible shavings suggest a source. D overlooks how the sharp scent of fresh shavings stands out among the wet surroundings.",
    "success": "The fresh scent stands apart from its surroundings. Its cause is still uncertain."
  },
  {
    "question": "m4",
    "id": "yellow-stitches",
    "kind": "deduction",
    "title": "The familiar stitches",
    "label": "Detective work · Claim + evidence",
    "context": "A strip of green cloth hung beneath the latch. Along its edge ran crooked yellow stitches. Pip remembered making that uneven repair on the cuff of Bram’s green coat during the summer. Earlier, she had glimpsed a broad figure upstairs wearing what looked like a green coat, but it had moved before she could be certain.",
    "prompt": "Part 1: Which conclusion is most securely supported?\nPart 2: Which pair of details provides the strongest support?",
    "routes": [
      {
        "id": "latch",
        "text": "Examine the latch",
        "observation": "Pip studies where the cloth caught, taking care not to pull its loose threads."
      },
      {
        "id": "repair",
        "text": "Recall the summer repair",
        "observation": "Pip remembers turning the cuff of Bram’s green coat to hide her worst stitch underneath."
      }
    ],
    "options": [
      {
        "id": "recent",
        "text": "Bram’s coat caught on the latch as he hurried out of the mill.",
        "feedback": "Go back to the clues. Does the passage actually tell you that?"
      },
      {
        "id": "coat",
        "text": "A piece of cloth from Bram’s coat remained caught beneath the latch.",
        "feedback": "Go back to the clues. Does the passage actually tell you that?"
      },
      {
        "id": "inside",
        "text": "Bram returned to the mill that evening wearing his damaged coat.",
        "feedback": "Go back to the clues. Does the passage actually tell you that?"
      },
      {
        "id": "attack",
        "text": "Bram left the cloth on the latch so that Pip would recognise it.",
        "feedback": "Go back to the clues. Does the passage actually tell you that?"
      }
    ],
    "answer": "coat",
    "evidence": [
      {
        "id": "green-mud",
        "text": "The cloth’s green colour and the figure’s apparently green coat.",
        "feedback": "Go back to the clues. Does the passage actually tell you that?"
      },
      {
        "id": "latch-bell",
        "text": "The cloth’s position beneath the latch and the light burning upstairs.",
        "feedback": "Go back to the clues. Does the passage actually tell you that?"
      },
      {
        "id": "stitches-memory",
        "text": "The distinctive stitching and Pip’s memory of making the repair.",
        "feedback": "Go back to the clues. Does the passage actually tell you that?"
      },
      {
        "id": "figure",
        "text": "The figure’s broad shoulders and its disappearance below the window.",
        "feedback": "Go back to the clues. Does the passage actually tell you that?"
      }
    ],
    "evidenceAnswer": "stitches-memory",
    "hint": "Separate the identity of the cloth from assumptions about when or why it caught.",
    "why": "The cloth can be identified without establishing when it caught, the direction Bram travelled or his intention. Part 1’s other choices add those unsupported details. For Part 2, colour alone is weak evidence: Mara is also wearing a green coat. The distinctive stitching and Pip’s memory of making it link the cloth specifically to Bram’s coat.",
    "success": "Mara records the identification. What happened at the doorway remains uncertain."
  }
];
CASEWORK.push(...CHAPTER_TWO_CASEWORK);
CASEWORK.push(...CHAPTER_FOUR_CASEWORK,...CHAPTER_FIVE_SIX_CASEWORK);
export function caseworkFor(s,q,phase='before'){if(!q||q.remedial||s.reviewRun||s.bonus)return null;return CASEWORK.find(t=>t.question===q.id&&(t.phase||'before')===phase&&!caseworkState(s,t.id).completed)||null;}
export function caseworkState(s,id){const raw=s.casework?.[id]||{};return {choice:typeof raw.choice==='string'?raw.choice:'',evidence:typeof raw.evidence==='string'?raw.evidence:'',correction:typeof raw.correction==='string'?raw.correction:'',route:typeof raw.route==='string'?raw.route:'',attempts:Number.isInteger(raw.attempts)&&raw.attempts>=0?raw.attempts:0,hinted:raw.hinted===true,completed:raw.completed===true};}
export function updateCasework(s,id,patch){if(!CASEWORK.some(t=>t.id===id))return;s.casework={...s.casework,[id]:{...caseworkState(s,id),...patch}};}
export function assessCasework(t,work){
 if(t.kind==='grammar')return work.choice===String(t.word)&&work.correction.trim().toLowerCase()===t.answer;
 return work.choice===t.answer&&(t.kind!=='deduction'||work.evidence===t.evidenceAnswer);
}
export function submitCasework(s,t){const work=caseworkState(s,t.id),correct=assessCasework(t,work);updateCasework(s,t.id,{attempts:work.attempts+1,completed:correct});return correct;}
