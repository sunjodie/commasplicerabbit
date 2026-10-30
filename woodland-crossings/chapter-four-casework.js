// A two-part inference stop; no extra supply delivery.
export const CHAPTER_FOUR_CASEWORK=[
  {
    "id": "c4-supper-evidence",
    "question": "m20",
    "phase": "after",
    "kind": "deduction",
    "title": "Supper and a shelter",
    "label": "Evidence and hypothesis",
    "context": "Through Bram’s kitchen window, the neighbour saw three clean bowls beside a covered pot, with chairs drawn up at the table. The baker remembered Bram mentioning supper for the mender and her apprentice. Poppy pointed to Quarry Shelter on the map.",
    "prompt": "Part 1: Which judgement best separates the supported conclusion from Poppy’s unconfirmed hypothesis?\nPart 2: Which pair of details most strongly supports the conclusion about supper?",
    "options": [
      {
        "id": "location",
        "text": "Bram expected the two guests; the unanswered cottage door indicates that they are together at Quarry Shelter.",
        "feedback": "Separate what preparations show from what would establish arrival, departure or present location."
      },
      {
        "id": "already-eaten",
        "text": "Bram prepared three places because the mender and apprentice had reached the cottage.",
        "feedback": "Separate what preparations show from what would establish arrival, departure or present location."
      },
      {
        "id": "prepared",
        "text": "The details suggest that Bram expected the two guests for supper; their present location remains uncertain.",
        "feedback": "Separate what preparations show from what would establish arrival, departure or present location."
      },
      {
        "id": "alone",
        "text": "The supper preparations and empty cottage show that Bram left with his two guests.",
        "feedback": "Separate what preparations show from what would establish arrival, departure or present location."
      }
    ],
    "answer": "prepared",
    "evidence": [
      {
        "id": "map-bell",
        "text": "The shelter marked on the map and the bell heard above the bend.",
        "feedback": "Those details concern a possible search location, rather than preparation for supper."
      },
      {
        "id": "table-memory",
        "text": "The prepared table beside the covered pot and the baker’s recollection of Bram’s supper plans.",
        "feedback": "Consider what these details establish, and what they leave uncertain."
      },
      {
        "id": "door-bridge",
        "text": "The unanswered cottage door and the broken footbridge.",
        "feedback": "Neither detail establishes that a meal was prepared for guests."
      },
      {
        "id": "cloth-boots",
        "text": "The torn green cloth at the mill and Bram’s spare boots in the shed.",
        "feedback": "Those earlier clues do not identify the purpose of the prepared table."
      }
    ],
    "evidenceAnswer": "table-memory",
    "hint": "Separate evidence of preparations at the cottage from evidence of anyone’s present location.",
    "evidenceHint": "Your judgement stays within the evidence. Now choose the details that support supper preparations, rather than a possible location.",
    "why": "The bowls, chairs and covered pot suggest a meal was prepared for three. The baker’s recollection supports the expectation of the mender and apprentice. None of these details places Bram or his guests at Quarry Shelter. That remains a plausible hypothesis worth checking, not an established fact.",
    "success": "Poppy records the supper preparations as supported and the shelter as a place to check."
  }
];
