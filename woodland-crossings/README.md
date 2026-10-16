# Woodland Crossings

A self-guided comma-splice adventure for upper-primary and secondary learners. Help Pip repair sentence crossings and restore a woodland village. On this branch, the root index.html opens Woodland Crossings. The original game is preserved as rabbit-runner.html; main is unchanged.

## Play locally

Use any static web server. For example, from this folder:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. JavaScript modules require HTTP serving; do not double-click index.html. There is no build step, account, API key, external font, analytics or runtime dependency. The teacher does not need to upload passages or mark answers.

## Hosting

For Cloudflare, deploy the woodland-crossings branch. The repository root now opens the new game, so serving the root works. You can also deploy woodland-crossings as the static output directory. If this repository already serves its root with GitHub Pages, the folder becomes `/commasplicerabbit/woodland-crossings/` once this branch is merged and Pages has deployed. A GitHub source link is not a playable hosting URL. This pull request changes the new branch’s root entry to open Woodland Crossings; it does not change Cloudflare settings. A deployment built from main will still show the old game.

## Learning and play

- Six expeditions: complete clauses; dependent openings; longer clauses; however/therefore; several joins; passage editing without a faulty join being highlighted in advance.
- 30 story questions and 18 authored transfer questions. An adventure contains 42 crossings, including 12 interleaved memory crossings. Examples are reused after the finite transfer pool is exhausted.
- The opening mixes longer independent clauses, correct dependent openings and a multiple-join sentence. This prevents always choosing full stops from succeeding. A brief demonstration introduces each expedition. Both correct and incorrect comma uses appear early in the adventure.
- The whole sentence is displayed continuously on a compact map above the stream. No join is preselected and the tool tray stays closed until a student chooses a comma. Students scout the route, repair only what needs changing, or declare the route already safe. Dragging and tapping both fit pieces; the sentence updates immediately, including capitalisation. Testing sends Pip hopping across on success; retries never make Pip fall. Later passages remain continuous text on a parchment map. Supplies and restored buildings are shown visually.
- Full stops add capitals automatically. Valid available alternatives are accepted. Each stage uses a stable tray of pieces. Trays do not filter against the answer key; comma + and is accepted wherever it joins two independent clauses. Later because repairs must preserve the story’s meaning.
- Reading each side silently helps students identify dependence. The guide explicitly distinguishes structure from pauses or breathing.
- Independent story solves earn permanent beacon sparks. Three sparks construct and light the expedition’s lantern beacon. Independent memory checks can recover missing sparks for the matching expedition; using hints never creates a permanent reward lockout. Optional lantern contracts earn two sparks by keeping a repair in one sentence; valid full-stop repairs receive a neutral goal reminder without an error or assistance penalty. Contract availability depends on visible sentence shape, never the answer key.
- Hints and retries preserve story progress and rewards. Supported answers do not count towards an independent stamp.
- Independent stamps require two different examples with at least two intervening crossings. This is a game criterion, not a validated diagnosis of mastery.
- Browser-local return reviews become due after about 1 day, then 3 and 7 days after successful review. Supported return reviews come back after 1 day. Device time determines due dates. No background notifications are scheduled.
- Optional challenge successes persist across attempts: students only retry the skills that needed support.

## Progress, privacy and accessibility

Progress saves automatically in this browser's localStorage. It does not sync across devices. Clearing browser/site data removes it. Storage failure displays a notice. A reload restores unfinished question choices and assistance status; a crossing is credited only after Continue is selected. Sound is optional and initially off.

Controls are native buttons with keyboard focus, labels and state; layouts adapt to narrow screens, and animations respect reduced-motion preferences. There is no timer, death, punitive streak, or lost building.

## Development

- `content.js`: question bank, explanations, expeditions, sentence tools.
- `engine.js`: progression, scoring, save shape and review scheduling.
- `app.js`: UI, drag/tap fitting and browser-local save/resume.
- `visuals.js`: original SVG character, environments and village building illustrations.
- `style.css`: responsive styling and handcrafted woodland scene.
- `tests/engine.test.mjs`: content integrity and learning/progress checks.

Run checks with Node 20 or later:

```sh
npm test
node --check app.js
```

## Verification and limits

31 automated tests pass, covering all supported answer variants, dependent-clause fragments, full-stop capitalisation, every expedition and review insertion, save/resume state, assisted/independent separation, 1/3/7-day reviews, and persistent bonus successes. A gamification subagent reviewed both passes; feedback was applied to answer alternatives, stable tool trays, keyboard focus, bridge construction, review progress and bonus retries. A minimal DOM adapter executes the actual UI handlers for the demo, tap/drag repairs, retries, expedition rewards, village and passage editing. This is not a real browser test. Original character/building SVGs were rasterised and visually inspected.

Full browser rendering, touch interaction and real-student playtesting remain unverified in this environment. The finite authored answer bank does not grade arbitrary free text. Completion demonstrates performance within these structured tasks, not a guarantee that a student will avoid every comma splice in their own writing.

## Research informing the design

- Cepeda et al. (2006), Distributed practice in verbal recall tasks: https://doi.org/10.1037/0033-2909.132.3.354 . Supports distributed practice generally; the game's exact 1/3/7 schedule is a practical choice, not an experimentally validated optimum for this content.
- Purdue OWL, Run On Sentences: https://owl.purdue.edu/owl/general_writing/punctuation/independent_and_dependent_clauses/runonsentences.html . Independent-clause joins and repair patterns.

## Halloween mystery visual checkpoint

The interface now follows **The Lantern That Shouldn’t Be Lit**, using original moonlit-mill scenery, indigo/violet surroundings, amber lights, pumpkins, fog and a small witch hat for Pip. The reading surface stays light and opaque. Artwork provenance and the image-generation prompt are recorded in assets/ARTWORK.md.

Six optional woodland discoveries are clickable and keyboard accessible. They persist separately from grammar progress, never award or remove grammar credit, and remain discoverable by revisiting reached locations from **Woodland secrets** without repeating questions.

Case notes unlock after each completed chapter. The final reward opens an illustrated, replayable rescue ending explaining the lantern, portable bell and altered map. Secrets, stamps and independent answers do not gate the ending. Existing completed saves receive the ending on their next visit unless a review/bonus session is in progress.

This is a graphics and narrative-interface pass. **The proposed single-answer/FANBOYS/expanded-semicolon/structure-adaptive mystery question bank is still awaiting implementation.** The existing question data and learning scheduler are unchanged by this checkpoint.

31 automated checks pass, including optional discovery persistence, collection deduplication, evidence unlocks, ending availability, saved-review continuity and scene revisits. The generated backdrop and rescue SVG artwork were visually inspected; real-browser layout, touch and screen-reader testing remain pending.

## Autumn storybook artwork update

Pip now wears an original plum cape, rust scarf and satchel in a softly painted style. New moss-and-amber mill scenery and a full rescue painting give the mystery a warmer Halloween atmosphere. Pip is larger in the compact play scene, with his speech bubble alongside him. All three generated WebP assets live under assets/; full prompts and provenance are in assets/ARTWORK.md. The six discoveries retain their existing SVG illustrations.

31 automated checks pass. Artwork inspected; real-browser rendering and student playtesting remain pending. The question bank and scheduler are unchanged.
