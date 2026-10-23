# The Midnight Mill

**22 October 2026 — Poppy’s clue notebook:** Open the new Clue notebook navigation button during any chapter. It collects observations from displayed reading passages and completed scenes, offers nine optional working pages, and lets students match two observations to a tentative conclusion. Students can revise an idea, check the specific evidence connection and save a short explanation. Later observations add context without rewriting the student’s earlier choices. Existing reading saves gain observations from scenes already reached. Notebook work never awards supplies, changes grammar assistance status or unlocks the ending. Automated model and real-handler tests cover spoiler boundaries, matching, revision and save/resume. Browser/Safari/physical-device visual checks remain outstanding.


A self-guided comma-splice mystery for upper-primary and secondary learners: **The Midnight Mill**. Poppy and Willow investigate a light in the old mill, a missing warning bell and an altered map. Their rescue leads to a further investigation of Bram’s account and the missing bridge timber.

On `woodland-crossings`, the repository root opens the new game. The original runner is preserved as `rabbit-runner.html`; `main` is unchanged. Deploy this branch on Cloudflare. No build step, account, teacher setup, API key, external font or runtime service is required. Serve locally over HTTP rather than opening the HTML file directly.

Cloudflare Workers: run `npx wrangler deploy` from the repository root. The checked-in `wrangler.jsonc` names the existing `commaspliceanimals` Worker and serves the root entry point plus the game subdirectory. `.assetsignore` excludes Git history, build/dependency directories, tests and authoring notes from uploads. Leave the Cloudflare build command empty and select the `woodland-crossings` branch. Existing game URLs are preserved.

## Learning progression

There are 30 new story tasks in six chapters of five, plus 30 authored recovery variants and three optional challenges. `QUESTIONS.md` lists every story question, editing brief and target answer.

1. Recognise complete clauses, dependent openings and list commas; distinguish a new scene from paired observations.
2. Join discoveries with and, contrast with but, show results with so and offer alternatives with or.
3. Complete FANBOYS with for, nor and yet; handle inversion after nor, embedded clauses and long subjects.
4. Punctuate transitions and contrast accounts, while preserving dependent openings and relative descriptions; split at a scene change.
5. Edit connected witness notes while protecting correct commas and following the timeline.
6. Edit two-paragraph accounts and a final report combining several repairs.

FANBOYS means **for, and, nor, but, or, yet, so**. One main Chapter 1 question and its retry practise a semicolon; full stops, conjunctions and preserved commas provide the other target edits. Semicolons remain available as grammatical alternatives where appropriate. Full-stop tasks explicitly require a new sentence at a time or scene change. Conjunction tasks specify the intended relationship and, where alternatives would remain ambiguous, the word to use.

## One target without false grammar penalties

Each join has one target under a visible editing brief. The engine separately records grammatical alternatives. A grammatical repair that does not meet the brief gets a neutral reminder, without a mistake or assistance penalty. A genuine error highlights the first grammatically faulty join, not an earlier valid alternative. Hints give explanations and preserve progress.

Students read continuous text, choose commas to inspect and drag/tap native button tools. Full stops capitalise the next word. Correct comma uses appear alongside splices from the first chapter. Later questions preserve actual paragraph breaks. Students are encouraged to read silently, but taught that a pause alone does not justify a comma.

## Selective repetition and spacing

An independently solved structure does not automatically repeat. A structure that needed a hint or a grammar-error retry enters a recovery queue. A different authored example returns after at least three intervening questions. The same supported structure can also become due on a later visit after roughly one day. Successful recall schedules the next checks after three and seven days; after three independent recovery successes it retires. Supported recall resets its interval. These intervals are practical design choices, not a validated optimum for this game.

Concepts recur in increasingly complex constructions and passages. The structure tags identify the authored exercise patterns for recovery; they are not an automatic linguistic parser. Exact recovery text may recur on later checks of a previously supported structure. Device time sets dates; there are no background notifications.

An independent route has 30 story crossings. Additional recovery crossings depend on where support was needed, with at most one between successive story questions so repeated support cannot trap a student in a recovery loop. Recovery crossings never skip story content. All six rewards and the mystery ending remain available with hints.

## Challenge, rewards and saves

Independent solves earn permanent beacon sparks; three light an expedition’s beacon. Recovery can earn missing sparks for its own chapter. Hints do not remove buildings, supplies or earlier sparks. The former optional one-sentence contract is hidden because it could contradict a question’s required sentence count. The optional trail has three fresh challenge structures; independent successes persist, so only unfinished challenges return.

Six optional graphic discoveries persist separately from grammar credit. Revisit reached locations through Woodland secrets to find missed discoveries without repeating questions. The ending is illustrated and replayable, with no score or discovery gate.

Progress saves in this browser’s localStorage, without cross-device sync. Old-bank saves preserve story position, rewards, secrets and beacons; obsolete active questions and blanket review schedules are cleared. New-bank unfinished choices and assistance resume exactly. Clearing site data removes the save. Storage failures show a notice. Sound starts on and respects a saved mute choice; motion respects reduced-motion preferences.

## Files and checks

- `content.js`: authored story, recovery and bonus questions; single targets, grammatical alternatives, briefs and lessons.
- `engine.js`: progression, selective recovery, spacing and save migration.
- `app.js`: lessons, editing controls, neutral feedback and rewards.
- `visuals.js`, `halloween.js`, `assets/`: original painted artwork, optional discoveries and narrative interface. Generation prompts are in `assets/ARTWORK.md`.
- `tests/`: engine/content checks and real app-handler execution with a minimal DOM adapter.

Run `npm test` in this folder. JavaScript syntax and whitespace checks are also run. 40 automated checks pass. They cover the uninterrupted story route, selective recovery, spacing/retirement, FANBOYS, target availability, grammatical alternatives, save migration, optional challenges and UI flows. The DOM adapter does not render CSS. Browser layout, touch, screen-reader and real-student testing remain pending.

This finite bank does not grade arbitrary free text. Completing the structured game is not a guarantee of error-free independent writing.

## Changing locations

Each chapter has its own painted environment, now expanded into five question views: the lantern-lit mill, foggy streambank, bell workshop, records room, village crossroads and hillside at dawn. scenery.js maps chapter to local artwork and focal position. Play, home and reached-location revisits use this same map. Indoor rooms suppress outdoor fog. Five new artwork files are under assets/; prompts and provenance are in assets/ARTWORK.md.

## Restart and explicit answer goals

Restart game is available on home and in Save status; the ending offers Play again. The confirmation clears this browser’s investigation, village, beacons, secrets and reviews only after Yes, restart game. Cancel preserves the current state.

Every question shows the required sentence count for the whole finished text and the permitted added joining words. The shared editing rules require keeping correct commas unchanged. Within the supplied tools and these rules, one full edit meets the task; other grammatical alternatives do not earn completion or a grammar-error penalty. QUESTIONS.md records these constraints with every story task.

Figma layout samples and findings: https://www.figma.com/design/euhY5VCNNIoJIHzOUuIqmj . UI_REVIEW.md describes the scope and resulting code changes; this review does not replace live-browser testing.

## Unobstructed artwork

Play uses separate scenery and case-note panels: stacked as artwork, question and answer tools on every screen. Scene panels preserve the full 3:2 image proportions; the question does not overlay the art. View artwork opens the current chapter painting by itself without changing the student’s task, choices or assistance status. Browser layout checks remain pending.

## Scene progression and music

Thirty story questions have thirty distinct compositions: six chapter establishing views and 24 new clue-specific storyboard panels. scenery.js selects/persists the current view and avoids repeating the immediately previous view when advancing, including recovery/bonus questions. Editing, hints and reloads do not shuffle an open question’s scenery. Each new question scrolls to its new artwork. View artwork shows only the current view.

The play screen stacks artwork, question and answer tools on all screens. The village preview is removed from play; Your village remains in navigation. Beacon progress is a compact indicator beside question progress.

The supplied Mureka track, 秋夜オルゴール, is bundled locally. Sound enables quiet looping BGM and success chimes; playback pauses when the tab is hidden. It does not autoplay on page load. Provenance and encoding details are in assets/MUSIC.md. Browser playback/layout/touch verification remains pending.

Desktop artwork now grows to 900px wide. Poppy is a consistently proportioned guide beside his dialogue, outside the changing scene. Student briefs describe meaning rather than naming conjunctions; exact-word guidance requires Ask Poppy for a hint. Chapter-wide trays avoid competing BUT/YET choices while retaining all FANBOYS practice. QUESTIONS.md separates student briefs from on-request help.

Mobile reading uses compact inline punctuation with larger invisible tap areas, so commas remain beside their words. Editing rules open on demand without counting as a hint; View artwork is a labelled expand button beside Poppy’s dialogue. The mobile screenshot review and Figma samples are recorded in UI_REVIEW.md.

The village is now one connected painted panorama. Each story delivery builds its current landmark: foundations, framework, roof/walls, lights, then a chosen finishing touch. Site positions stay fixed and future landmarks remain empty. The village uses five registered paintings with seven independent masks; Zoom in enables native scrolling around the scene. Click a marker for delivery status and decoration details. See your build opens a read-only preview during a question. Finished rewards survive hints, recovery and returning saves. The bonus fountain grows from independent optional challenges and is awarded atomically. Artwork prompts and provenance are in assets/village/ARTWORK.md.

## Chapter 1 story adaptation

The approved Chapter 1 now plays as five illustrated reading scenes, followed by five separate notebook edits. Reading uses short pages at paragraph boundaries and remembers the current page. It awards no deliveries and counts no hints. Existing question progress, recovery schedules and village rewards remain intact. The storybook replays reached scenes without altering edits or revealing later scenes.

Only Chapter 1 has been adapted. Chapters 2–6 still use the earlier question bank and presentation while the new story is implemented in reviewable chunks. Approved prose remains in STORY.md; chapter-one.js preserves its first chapter verbatim. Chapter 1 artwork and prompts are documented in assets/chapter-one/ARTWORK.md.

Validation: 61 automated checks pass, including exact narration, reading/resume, replay and village progression. UI checks execute real handlers through a DOM adapter. Browser layout and touch verification remain pending.

The editing screen uses a compact supply row and one notebook panel below the artwork. Editable joins are visible punctuation tabs. Chapter 1 solutions reveal scene-specific narrative captions, with an optional bell cue at the final note; explanations expand on demand. The full suite now has 62 passing checks.

Chapter 1 now weaves three short supporting stops between its five main notes: a word-level agreement edit, vocabulary in context and a claim/evidence deduction with two investigative leads. All five supply deliveries still come from sentence-editing work. Auxiliary answers and hints save separately and never change comma-splice mastery or erase rewards. The revised mystery plants fresh timber shavings; later chapters still await adaptation to Bram’s deliberate wrongdoing. See CHAPTER_ONE_CASEWORK.md. The automated suite now has 69 passing checks; browser/mobile rendering QA remains pending.

Chapter 1 difficulty tuning: one semicolon target, one comma + but contrast, one full-stop repair and two comma-preservation notes. Vocabulary now includes a context-supported “incongruous” question and slightly richer notebook wording, while the five main sentence tasks and three supporting stops stay in place.


## Chapter 1 visual novel layout (20 October 2026)

Desktop and tablet (600px and wider) use a fixed viewport: large scene artwork with a translucent story panel and a darker notebook panel. Long reading passages, detective context, conclusions, evidence and feedback turn pages instead of expanding. Hide text exposes the painting. Phones retain the existing stacked layout. Menus, rewards and auxiliary dialogs also paginate. Progress is accessible from the header.

Questions, accepted answers, story words, saved progress and rewards are unchanged. The revised manuscripts for Chapters 2–6 still await separate integration; their question screens retain the previous layout.

Validation: `npm test` runs the core checks. Optional real-browser regression: install Playwright in your development environment, then run `BROWSER_EXECUTABLE_PATH=/path/to/chromium node tests/viewport-check.cjs`. It serves only this local folder and reports overflow, off-screen controls, runtime errors and complete Chapter 1 progression (including recovery and rewards). Without an executable override it uses Playwright’s installed Chromium. It writes reports to the temporary directory; set `QA_DIR` to choose another destination.


Chapter 1 navigation and presentation refinement: left/right arrows turn visible pages and continue after checked answers. They never choose or submit answers and do not interfere with typing. Story panels are translucent, notes use parchment, questions use a dark panel and teaching feedback uses Poppy’s green inset. Georgia carries reading text and Arial carries interface controls throughout the game. Music crossfades over 2.4 seconds, the fireside memory lowers the current track, and revisits resume playback rather than restarting it. The incomplete tension cue remains silent after finishing until a fresh game. No new artwork or approved question/story wording was introduced. Current unit/handler suite: 82 passing tests.


Readability update: Nunito Sans now replaces Arial for interface text, with embedded local font data in fonts.css and the SIL Open Font License in assets/FONT-LICENSE.txt. Georgia remains the reading face. The game has an SVG bunny favicon. Scene panels use translucent dark fills; Field Guide/dialogs use dark ink on cream. Punctuation-tool text is centred without legacy tile offsets, and browser regression checks that each tool label stays inside its button. Named language examples such as “but” are quoted in teaching copy.

Sound is enabled by default and begins after the first interaction to respect browser autoplay rules; a chosen mute setting persists. Ten small collectible frogs now offer optional story-related language tidbits. Five accompany Chapter 1’s paintings and one appears in each later chapter. Woodland secrets contains their fieldbook, replayable tidbits and searches of reached scenes. Frog collection saves independently from grammar scores and supplies.

Frogs now use a locally bundled painted sprite atlas, with subdued texture and source-art positioning rather than floating vector icons. Hidden click targets retain keyboard focus, while hover adds no visual beacon. See assets/frogs/ARTWORK.md for the asset and generation prompt.


Music now follows chapters rather than scene changes: warm throughout Chapter 1, with the short creepy cue reserved for Chapter 3. Storybook replay keeps the active track. Frog perches alternate sides and heights; an authored alternate perch keeps each visitor on a scene surface when tablet cropping hides its primary position.

Chapter 1 now includes 52 frame illustrations. The generation prompts, frame map, source provenance and review notes are in [frame artwork notes](assets/chapter-one/frames/ARTWORK.md).
