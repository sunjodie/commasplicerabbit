# Chapter 5 artwork — An Answer in the Dark

Implemented: twenty paintings in five 2×2 atlases, each cell a landscape 3:2 composition. Status: integrated and visually reviewed.

| Sheet | Scene | Reading sequence |
| --- | --- | --- |
| 01 | m21 | Preparations; leaving village; old steps and obstruction; signal rock |
| 02 | m22 | Calling; gorge cutaway; patterned lamp signal; ferryman calls |
| 03 | m23 | Sawing; paper lantern relit; map handed over; Poppy stays |
| 04 | m24 | Limb rolled clear; scarf; distant Alder Arch crossing; lamps reach shelter |
| 05 | m25 | Arrival at overhang; rope handhold; conflicting accounts; stretcher preparation |

Poppy remains with the baker at the signal rock after m23. Willow joins the rescue with her relit paper lantern. Before m25, shelter figures remain anonymous. Bram is the established badger in a green coat. The mender is a fox and her apprentice a tan rabbit in blue. No embedded text, UI, frogs or answer-revealing evidence. Existing scenery is reused for question screens. Four existing Chapter 5 frog IDs are each attached to one reading frame, with exploration revisiting that exact frame.

Exact built-in image generator prompts are in prompts.json and corrections.json. Source selections and review notes are in source-map.json. References use the existing Chapter 1 and Chapter 4 art. The selected PNGs were encoded as WebP at quality 94, method 6, without content edits.

Reading anchors are defined in frame-art.js: m21 uses the opening, bakery-window sentence, and paragraphs 1–2; m22 uses paragraphs 0, 1, 3, 6; m23 uses 0, 1, 2, 4; m24 uses 0–3; m25 uses 0, 1, 2, 5. Clock, landing, echo and hush frogs appear only on their opening reading screen and disappear on subsequent pages or parts. Exploration reuses the same painting. A panel-overlap guard hides obscured frogs.

Validation: all 174 automated tests pass, including scene ordering, asset mappings, frog visibility and panel geometry. All five 1536×1024 sheets were visually inspected. Live deployment and a manual iPad playthrough have not been verified.
