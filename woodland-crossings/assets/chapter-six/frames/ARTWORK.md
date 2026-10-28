# Chapter 6 artwork checkpoint

Implemented: twenty paintings in five 2×2 sheets. Built-in image generator, one initial generation per sheet; correct only material continuity/anatomy errors. Existing Chapter 5 sheets 04 and 05 provide character/style references.

| Sheet | Scene | Anchors (paragraph, zero-based) |
| --- | --- | --- |
| 01 | m26 Return | 0, 1, 3, 4 |
| 02 | m27 Accounts | 0, 1, 4, 7 |
| 03 | m28 Timber | 0, 4, 5, 6 |
| 04 | m29 Confession | 0, 2, 6, 13 |
| 05 | m30 Ending | 0, 1, 5, 7 |

Existing question scenery retained. Four existing frogs now belong to one opening reading screen each, with exploration reusing the same painting. Story and grammar content stay unchanged. Exact prompts saved in prompts.json.

Status: complete and integrated. Five initial built-in image-generation calls plus one targeted correction (the injured mender remains on the stretcher during the return). No exploratory variants generated. Selected sources and review notes are in source-map.json; the correction prompt is in corrections.json. Encoded as WebP quality 94, method 6, without content edits. All sheets are 1536×1024 and individually under 1 MB.

Validation: 176/176 automated tests pass; whitespace checks pass. Tests cover ordered scene anchors, asset existence, retry/question mappings, single-screen frogs and tablet geometry. Existing panel-overlap protection now covers Chapter 6 too. All sheets visually reviewed. Manual live iPad playthrough and deployment verification remain outstanding.

Checkpoint strategy: prompts saved first; return/timber, bakery, corrected return, and confession artwork saved incrementally before final integration. Existing question scenery, story text, grammar answers and progression preserved.
