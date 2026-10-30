# Woodland Crossings — checkpoint 01

Status: agreed design recorded; playable implementation pending.

## Scope
A self-guided comma-splice adventure, separate from the original runner.
Keep the original root index.html and passage.txt unchanged.

## Agreed learning design
- Teach testing whether each side can stand alone. Use silent internal reading, never breath length as a punctuation rule.
- Start with short clauses, then dependent openings, longer clauses, however/therefore, multiple valid commas, and unmarked paragraph editing.
- Accept every supported grammatical repair, including full stops. Use explicit meaning goals for restricted repair challenges.
- Include correct sentences early; do not imply every comma needs replacing.
- Use authored, natural sentences and specific explanations.
- Hints and retries preserve adventure progress. Assisted completion does not establish independent mastery.
- Revisit skills after intervening tasks, with new examples; provide browser-local return reviews after 1, 3 and 7 days. These intervals are practical design choices, not a validated prescription.
- Distinguish adventure completion from independent performance and later retention.

## Game loop
One demonstration, then short expeditions of crossings. Sentence tools visibly repair crossings. Recover village supplies, choose a decoration, and retain all earned rewards. No death, lost coins, streak penalty, or required speed.

## Implementation plan
1. Static HTML/CSS/JavaScript; no API key, server, or paid dependencies.
2. Authored question bank with independent/dependent contrasts and increasingly complex editing.
3. Local save/resume, targeted hint ladder, progressive expeditions, review scheduler and optional bonus routes.
4. Responsive, keyboard-accessible interface and reduced-motion support.
5. Automated checks for content integrity, repairs, review timing, assisted vs independent evidence, and progression.
6. Gamification subagent review; improve observed weaknesses before final commit.

## Verification status
No playable implementation or student playtest yet. Original source inspected.
GitHub repository creation is unavailable through the connected tool, so deliver on a separate branch and pull request in sunjodie/commasplicerabbit.

# Checkpoint 02 — playable implementation

- Static game implemented in this folder; the original root game remains unchanged.
- Six expeditions, 48 authored questions, 42 crossings per adventure, local saves, hint ladder, alternative repairs, village decorations, optional challenges and return reviews.
- Gamification review applied: accept full stops before But/So; accept natural and repairs; visibly fit a bridge section; show actual return-review progress; preserve independently completed optional-route skills.
- 14 meaningful automated tests pass. Syntax checks pass.
- No browser/rendering or real-student test has been performed. See README for hosting and verification limits.
- Intended GitHub delivery: branch woodland-crossings, pull request into main. No merge or hosting configuration change.

# Checkpoint 03 — deployment entry point

The woodland-crossings branch now serves the new game from its root index.html, using the game folder as its asset base. The original runner is preserved at rabbit-runner.html. Main remains unchanged. Cloudflare must build the woodland-crossings branch to pick up this change.

# Checkpoint 04 — visual adventure

- Replaced the CSS rabbit silhouette with original vector Poppy artwork: rounded proportions, pink cheeks, scarf, expressive eyes, blinking and a happy crossing hop.
- Replaced the workbook-style play card/sidebar with an illustrated crossing world, wooden sentence platforms, draggable/tappable construction pieces, full-sentence readback and a compact supply trail.
- Complex sentences and passages remain continuous, readable text on an in-world map.
- Village rewards now use individual building illustrations, with a visual restoration scene and chosen decorations.
- Stable tool trays avoid exposing answer metadata; supports keyboard/tap alternatives to dragging.
- 17 automated tests pass, including execution of actual UI event handlers through a minimal DOM adapter. Character/building SVG artwork visually inspected. Real browser rendering, touch and student playtesting still pending.

# Checkpoint 05 — compact scouting and challenge

- Reduced desktop header, world, typography, tray and destination dimensions; removed duplicated sentence readback.
- Every route starts as continuous text with no preselected join or open tool tray. The student must decide which commas to inspect and can submit a route without changing it.
- Rewrote the opening/second-stage tasks and early transfer tasks with natural, longer clauses, correct dependent openings and several joins. Correct/incorrect routes are interleaved immediately.
- Only the first faulty join is exposed after an unsuccessful submission.
- Added permanent beacon sparks for independent story solves and optional single-sentence contracts. A valid grammatical full-stop repair under a contract receives a neutral goal reminder, not a mistake penalty.
- Contract eligibility is based on visible sentence shape so its availability does not leak answers.
- 24 automated checks pass, including actual UI handler execution for scouting, contract feedback and beacon persistence. Real browser layout/touch QA and real-student engagement testing remain pending.

- Independent return reviews and bonus-route recall can recover missing sparks for the skill’s matching expedition beacon. Memory/bonus trails do not display story-only two-spark contracts.

# Checkpoint 06 — Halloween mystery graphics and ending

- Inspected the user’s three mood references. Created original moonlit mill scenery with indigo woods, amber lanterns, pumpkins and fireflies; bundled an optimized WebP. No supplied reference image is bundled.
- Added Halloween palette and fog throughout the interface; reading panels remain opaque/light. Poppy wears a small witch hat.
- Added six optional graphic discoveries, a persistent collection, keyboard controls and reached-scene revisits without replaying grammar tasks.
- Added chapter case notes and an illustrated, replayable ending resolving the lantern, bell and map as one rescue. No score, hint, mastery or secret-collection gate.
- Preserved existing saves and active review/bonus continuation.
- 31 automated checks pass. Generated scenery and rescue SVG visually inspected. Real-browser/touch/contrast QA remains pending.
- Scope: graphics/narrative interface only. The proposed question-bank rewrite remains paused; content.js and engine.js are unchanged.

# Checkpoint 07 — original autumn storybook artwork

- Replaced flat Poppy with a softly painted original rabbit in plum cape, rust scarf and satchel, carrying a lantern. Preserved transparent alpha and existing crossing animation.
- Added moss-and-amber autumn mill scenery and a painted rescue ending showing the caretaker, travellers, bell, map and lantern. Generated artwork uses the reference for broad mood only; no stock imagery bundled. Full prompts in assets/ARTWORK.md.
- Enlarged Poppy on short desktop screens, moved his speech bubble beside him, and removed the repeated heading above the scouting prompt. Retained existing question controls and saves.
- Gamification reviewer inspected layout rules and markup; applied character visibility and dock-density suggestions.
- All 31 automated checks pass; syntax and whitespace checks pass. Images visually inspected. Browser/touch/contrast QA and student playtesting remain pending.
- Focused graphics pass only. Question-bank rewrite remains paused; content.js and engine.js unchanged.

# Checkpoint 08 — painted village landmarks

- Replaced all six flat village landmark icons and the bonus fountain emoji with seven original painted landmarks in a shared transparent atlas. The same artwork appears on the trail map, reward reveal and destination previews.
- Updated village cards and ground to moss greens, amber details and warm wood; increased illustration space and aligned cards evenly. Unbuilt places remain visibly muted, with existing labels and unlock rules.
- Preserved saved rewards, beacon status, decorations and grammar progression.
- All 31 automated checks pass; JavaScript syntax and whitespace checks pass. Atlas visually inspected; real-browser rendering/touch QA remains pending.

# Checkpoint 09 — landmark atlas clipping fix

- Fixed neighbouring atlas cells appearing inside wide map thumbnails: each landmark now uses a square CSS background tile instead of an SVG image viewport. Background painting stays within the container.
- Map thumbnails use square proportions and a consistent maximum width; map palette now matches the moss-green village.
- 31 automated checks and JavaScript/whitespace checks pass. Browser layout QA remains pending.

# Checkpoint 10 — mystery question bank and selective recovery

- Implemented 30 story questions across six chapters, 30 paired recovery variants and three fresh optional challenges. All revolve around the lantern, bell, map and rescue mystery. QUESTIONS.md records the complete story bank with briefs, originals, targets and explanations.
- Every join has one target under an explicit editing brief. Grammatical alternatives receive neutral brief feedback without a mistake/assistance penalty. Mixed submissions highlight the first genuine grammar error before any valid non-target edit.
- Added all seven FANBOYS, including inversion after nor. Twelve story tasks target semicolons in progressively varied constructions. Full stops mark required scene/time changes; conjunctions express specified relationships.
- Progresses from sentences to witness notes and two-paragraph case accounts, ending with a six-join report combining dependent openings, relative information, semicolons, a result conjunction and a new-sentence time shift. Paragraph breaks remain visible.
- Independent success does not schedule routine repetition. Only supported structures return, using a paired example after three intervening questions or a later-day revisit. Successful recovery expands to three/seven days, then retires. At most one inline recovery sits between story questions so support cannot block the ending.
- Old saves keep story progress, village rewards, discoveries and beacons. Old active question IDs and blanket review dates migrate safely. The optional one-sentence contract is hidden to avoid conflicts with the new briefs.
- Gamification reviewer checked targets, narrative continuity and progression; corrected mismatched recovery wording, repeated transition templates, the null-demo lesson path and mixed-error attribution.
- 25 automated checks pass, including full independent and fully supported routes, selective repetition/retirement, FANBOYS/semicolon coverage, save migration and actual UI handler regressions. Syntax and whitespace checks pass. Browser rendering/touch/contrast and real-student testing remain pending.

# Checkpoint 11 — locations change with the mystery

- The six chapters now use six distinct painted locations: the original lantern-lit mill, foggy footprint trail, empty bell workshop, map room, village crossroads and hillside at dawn.
- Added five original scenery assets, optimized to local 1200 × 800 WebP files. Full built-in generation prompts in assets/ARTWORK.md.
- A chapter scenery manifest drives play, home and reached-scene revisits. Each location has its own focal position; indoor scenes suppress outdoor fog, and the final hillside has lighter mist.
- Existing questions, save state, discoveries and rewards are unchanged.
- 26 automated checks pass, including all six chapter asset selections and saved-location revisits. Art visually inspected; real-browser cropping/layout/touch QA remains pending.

# Checkpoint 12 — restart, Figma UI review and disambiguation

- Added Restart game on home and in Save status, plus Play again on the ending. Confirmation explicitly lists cleared progress. Cancel leaves the current question/run untouched; confirmation uses fresh state and returns to chapter one of the latest bank.
- All questions now display whole-text sentence counts and permitted added conjunctions. Shared visible rules require supplied pieces, unchanged correct commas/wording, named joining words at the stated relationship, and splits only where requested. Grammatical alternatives remain uncredited and receive neutral no-penalty feedback.
- Audited all 63 tasks with the gamification reviewer. The correct-note semicolon-before-but ambiguity is resolved by the keep-correct-commas rule; clarified the paired recovery brief at the setting-out/hearing-voices boundary.
- Created an editable Figma UI audit with source-based desktop and phone-width control samples. Found/fixed long because-label wrapping, standardized responsive tool columns and readable labels, and checked the restart panel. These samples are not a live browser capture. See UI_REVIEW.md and https://www.figma.com/design/euhY5VCNNIoJIHzOUuIqmj .
- 30 automated checks pass, including restart cancellation/reset/entry points, visible whole-text goals, unique accepted targets and neutral feedback on an otherwise grammatical alternative. Syntax and whitespace checks pass. Live-browser layout/touch/contrast and real-student tests remain pending.

# Checkpoint 13 — art is no longer behind the questions

- Separated the current chapter scene and case-note reading panel into independent desktop columns. On phones they stack with the artwork first. No question text is inside the world-stage container.
- Scene panels use the artwork’s full 3:2 proportions, with character speech below the image. The question and tool controls remain separately readable.
- Added View artwork: opens the current chapter illustration without question or character overlays and preserves the active task/edits. Viewing art does not count as a hint.
- 31 automated checks pass, including the separate art container and artwork-view state preservation. Syntax and whitespace checks pass. Browser rendering, responsive layout and touch testing remain pending.

# Checkpoint 14 — stacked play and changing scenes

- Stacked artwork, question and answer tools on every screen. Removed the village preview from play while retaining navigation and compact beacon progress.
- Created six original four-panel painted storyboards, adding 24 compositions to the six existing establishing views. Every story question has a distinct view within its chapter’s setting. Source prompts and encoding details are recorded in assets/ARTWORK.md.
- Scene identity persists through edits, hints and reloads. Advancing changes it, including recovery and bonus routes, and returns scroll to the new artwork. View artwork shows the selected panel alone.

# Checkpoint 15 — supplied background music

- Retrieved the playback MP3 referenced by the user’s public Mureka share page for 秋夜オルゴール, credited to Jodie Sun. Bundled an optimized local MP3; provenance is in assets/MUSIC.md.
- Sound enables a single quiet looping player plus existing chimes. No initial autoplay/download. Hidden tabs pause music; returning resumes only if sound remains enabled. Playback failures are caught and can be retried.
- 40 automated checks pass, covering scene uniqueness/advance/persistence, vertical play order, bundled media, Sound behavior and all prior grammar/progress flows. Syntax and whitespace checks pass. Art visually inspected and MP3 duration/encoding verified; browser layout/audio/touch and student testing remain pending.

# Checkpoint 16 — larger artwork and quieter guidance

- Expanded desktop play artwork from a 540px to a 900px maximum, keeping the full 3:2 illustration above the question. Mobile retains its compact fit.
- Removed the fixed rabbit overlay from question scenes. Poppy now sits beside his dialogue at his original 2:3 proportions, independent of background perspective.
- Added semantic student briefs throughout the story, recovery and bonus bank. Exact conjunction names and answer-revealing chips are hidden until a hint is requested; failed attempts no longer automatically disclose the repair. Successful edits still receive explanations.
- Kept chapter-wide tool trays with only one contrast synonym per chapter and FOR as the coordinating reason word. All seven FANBOYS remain targets. Question 29 now preserves an existing YET, with a narrow migration for saved edits. Grammatical alternatives remain neutral.
- Independent gameplay review found no competing target within the trays; its wording corrections are incorporated. 43 automated checks pass, including hint disclosure, neutral feedback, guide placement and saved-edit migration. Actual browser layout/touch/audio QA remains pending.

# Checkpoint 17 — replacement background recording

- Replaced the bundled BGM with the recording from the user’s new Mureka share Aewi4tAvoYviB9sT3od2oN. Same title, different audio. Updated credit/provenance and used a new filename to avoid stale browser caches.
- Quiet opt-in playback, looping and hidden-tab pause behavior are unchanged. MP3 decode verified; 43 automated checks pass. Browser audio playback remains to be verified after deployment.

# Checkpoint 18 — mobile screenshot review

- Reviewed the supplied Android screenshot and built editable reading/action samples in the existing Figma audit: https://www.figma.com/design/euhY5VCNNIoJIHzOUuIqmj?node-id=15-2 . Checked 320px and 390px inventory-note layouts plus a narrow long-passage stress sample. Product fonts verified; final Figma screenshot has no clipped text or controls. The samples omit artwork and browser chrome and are not a browser capture.
- Reworked sentence markup so each editable punctuation mark stays attached to the preceding word. Removed wide visible button padding while retaining an expanded 44px touch area, selected/error styling, keyboard controls and accessible labels. Paragraphs, word order and full-stop capitalisation are preserved.
- Moved shared editing rules into a clearly labelled on-demand modal. Reading rules does not mark a task as supported. Added an explicit tap-to-edit instruction and tightened mobile card/action spacing.
- Moved View artwork into Poppy’s dialogue row as a labelled 44px expand control. Stacked art/question/answers and full artwork framing remain.
- 45 automated checks pass; JS syntax and whitespace checks pass. Tests cover exact rendered report wording and paragraph boundaries, rules-modal state safety and artwork-control placement. Actual mobile browser/touch QA remains pending.

# Checkpoint 19 — smaller mobile reading type

- Reduced sentence and passage text at widths up to 760px from 18px / 1.8 line-height to 16px / 1.6 to reduce scrolling. Instructions remain 12–13px; action controls and punctuation touch areas retain 44px targets.
- 45 automated checks pass and whitespace checks pass. Deployed-device rendering remains to be checked.

# Checkpoint 20 — complete narrative draft, paused before adaptation

- Finished STORY.md: a complete six-chapter story of approximately 3,100 words, preserving the approved opening and developing the midnight-bell legend into a fair-play rescue mystery. Poppy and Willow have distinct strengths, consequential mistakes and essential rescue roles.
- Character-development subagent produced the draft and companion STORY_NOTES.md. Final editorial review clarified the unusual winter light, witness dialogue, bell signalling and the safe rescue route. The notes record chronology, clue payoffs, character direction and a flexible scene outline.
- User requested task 1 only, then a pause. No question bank, art, gameplay or UI changes were made in this pass. The story is not yet integrated into the deployed game.

# Checkpoint 21 — dialogue revision

- Revised dialogue throughout STORY.md with explicit speech tags and more natural phrasing. Replaced clipped, cryptic exchanges with character-specific speech, clarified the disagreement after the bank gives way, and made the reunion and final conversation less mannered.
- Preserved the six-chapter plot, physical clues and rescue sequence. No questions, artwork, game code or UI changes. Reviewed speaker attribution and punctuation; whitespace checks pass.

# Checkpoint 22 — vivid descriptions and smoother narrative rhythm

- Reworked STORY.md throughout into fuller, more fluid narrative prose, with varied sentence lengths and concrete sensory description. Developed the fair and bakery warmth, the mill's unsettling familiarity, the flood's force and the rescue's physical effort.
- Preserved speech tags, character decisions and the six-chapter mystery. The descriptive draft is approximately 5,100 words. Reviewed plot continuity, dialogue punctuation and paragraph flow; whitespace checks pass.
- Remains story-only work. Question adaptation, art generation and game implementation are paused.

# Checkpoint 23 — one village, built bit by bit

- Implemented the user-approved village concept as one connected scene. Added four registered construction-stage edits to the finished painting and seven landmark masks. Each site's construction derives from existing story deliveries, with future sites empty and earned rewards preserved. The optional fountain derives from successful bonus challenges.
- Added landmark inspections, fit/zoom scrolling, current-build status, on-demand notes/learning panels, a construction preview during questions, and whole-village reward previews with visible finishing-touch choices.
- Read-only character/design review checked progression and encouragement. Fixed the discovered bonus award/save gap: final success awards the fountain in the same engine transaction, and old all-pass saves recover it.
- 55 automated checks pass, including construction stages, recovery/legacy saves, bonus persistence, separated hit targets and real UI-handler wiring. JS syntax and whitespace checks pass. Generated art and offline partial/finished mask composites inspected. These are not browser captures; browser masking/layout/touch verification remains pending.
- This pass changes the village only. The revised story remains a draft document; its question/art/visual-novel adaptation is still deferred.

# Checkpoint 24 — approved baselines before returning to the story

- Story baseline: STORY.md and STORY_NOTES.md at 7086f7c, approved after the speech-tag and descriptive-prose revisions. Six chapters, approximately 5,100 words.
- Village baseline: 614456d, approved by the user after viewing the implemented connected village and its gradual construction. Existing saves and rewards are preserved; 55 automated checks passed.
- Both baselines are saved on woodland-crossings. The next work returns to the story. Its question adaptation, story artwork and visual-novel implementation have not resumed.

# Checkpoint 25 — Chapter 1 illustrated story chunk

- Adapted only “After the Fair” into five illustrated scenes with paragraph-based reading pages, then five separate notebook tasks. Approved Chapter 1 prose is unchanged. The initial fair, upstairs light, Bram’s remembered story, torn cuff and empty hook each have a dedicated composition.
- Added persisted reading positions and read-scene markers. Storybook replay is limited to reached scenes and leaves edits, support status, supplies and rewards intact. Recovery questions bypass narration. Existing saves resume their current question without resetting the village.
- Rewrote the five opening questions and paired recoveries to match the new narrative. Each retains one target under its brief; two tasks practise semicolons. Later chapters retain the earlier bank pending separate adaptation.
- 61 automated checks pass, including exact prose preservation, page/reload/village resume, spoiler limits, read-only replay, question wiring and existing village construction. JS syntax and whitespace checks pass. Generated illustrations were visually inspected. Browser layout/rendering and mobile touch QA remain pending.
- Paused after Chapter 1 for review. No Chapter 2 implementation in this chunk.

# Checkpoint 26 — compact notebook and Chapter 1 story payoffs

- Removed the redundant rabbit speech strip, moved artwork enlargement onto the illustration, combined the sentence and editing controls in one notebook surface, and replaced the large star tracker with a compact supplies/build row.
- Made punctuation joins visibly distinct paper tabs while retaining generous invisible touch areas, keyboard focus and existing editing behavior. Preserved the readable mobile sentence size. Shortened the final Chapter 1 brief without changing its target.
- Successful Chapter 1 notes reveal a short scene-specific story beat over the painting and beside the continuation control. The final note has a bell pulse and quiet synthesized bell cue when sound is enabled. Success explanations are available in an expandable “Why this edit works” section. Recovery and memory trails do not replay story payoffs. No character-turn animation is claimed; these remain painted scenes.
- 62 automated checks pass, including all five story payoffs, single-delivery behavior, supported practice, saved choices, story resume, rewards and village progression. Syntax and whitespace checks pass. Desktop/mobile rendering and touch verification still require an actual browser; the test adapter does not render CSS.
- Scope remains Chapter 1 presentation and shared editing layout. Chapter 2 story adaptation is still paused.

# Checkpoint 27 — Chapter 1 detective and language stops

- Added the fresh timber-shavings clue to Chapter 1 narration and kept chapter-one.js aligned with STORY.md. Preserved existing paintings, core notes and village deliveries. Later chapters remain untouched, pending the revised deliberate-wrongdoing plot; STORY_NOTES.md explicitly marks the old innocent-Bram resolution as superseded.
- Added three brief woven-in challenges: unhighlighted word selection/replacement for agreement across a modifier; contextual interpretation of the darkened mill; a two-part claim/evidence deduction about the cuff. The detective task has two saved investigative leads, shared essential evidence and one supported answer. Its limits prevent identity from being mistaken for proof of an attack or a departure time.
- Added saved auxiliary progress, targeted retry feedback and on-request help. These neither award supplies nor alter comma-splice mastery/recovery. Correct side tasks do not repeat; recovery/review/bonus runs bypass them. Existing edits, reading positions and village saves persist.
- 69 automated checks pass, covering both leads, wrong/partial answers, typed correction and reload, guide/help isolation, full first-chapter delivery flow and existing progression. Syntax and whitespace checks pass. Browser rendering/mobile touch verification remains pending because no supported browser QA surface is available.
- Chapter 1 only. Paused before revising Chapter 2.

# Checkpoint 28 — lighter semicolon load and richer vocabulary

- Chapter 1 now has one semicolon target instead of two. The third main note uses comma + but to express a contrast between Willow’s dismissal of the legend and Poppy’s continued unease. Its paired recovery also practises contrast; the four-tool tray stays consistent across the chapter. Later chapters have not been changed in this pass.
- Raised vocabulary moderately through natural task wording: dismissed, reassurance, frayed and freshly sawn, plus apprehensive in the recall example. The short vocabulary task now asks students to infer “incongruous” from the contrast between fresh timber and damp, decaying surroundings. All four options concern plausible aspects of the scent; requested help points to the context.
- Updated teacher bank and casework notes. Existing completion records, choices and village rewards are retained; an older semicolon edit on the contrast note receives neutral brief feedback rather than a grammar penalty.
- 69 automated checks pass, including the one-semicolon limit, unique targets, full first-expedition progression and separate casework save/help state. Syntax and whitespace checks pass. Browser/mobile rendering QA remains pending.

# Checkpoint 29 — consistent desktop columns and short tension cue (local only)

- Story reading, supporting casework and core comma editing now share equal desktop columns, an 18px gutter and frame padding: illustration left, text and controls right. Paintings share a 3:2 viewport. Supporting casework now has the same framed background. Mobile retains artwork above the text and controls.
- Retrieved the supplied 60-second Mureka recording and bundled a cue with a two-second fade-in and six-second fade-out. It plays once during the Chapter 1 midnight-bell scene and its notebook, then returns to the original music. Pages/retries do not restart it. Home, village and rewards restore calm music. Both players require opt-in and pause in hidden tabs. No musical continuation or seamless loop is claimed. Later revised chapters remain unimplemented.
- 71 automated checks pass, including cue completion, opt-in, visibility, no restart on the same tense scene, leaving/resetting the cue, and muted completion. JavaScript syntax and whitespace checks pass. Rendered desktop/mobile QA and listening checks remain pending; no supported browser QA surface is available in this environment.
- Open-ended comprehension marking remains a design proposal, not an implemented grader. No manuscript/question changes or GitHub push in this checkpoint.


# Checkpoint 30 — approved Chapter 1, scene paintings and mood music

- Integrated all approved paragraphs and eight question groups. Five main boundary tasks retain village deliveries; three supporting tasks follow the porch evidence. The final scene stops at the knock, with no premature bell event or bell sound.
- Added five full-frame illustrations without clue closeups or identifiable suspects. Kept the desktop columns and mobile stack.
- Warm music at the fair and fireside memory; tension cue at the window and mill. The incomplete cue fades into silence during suspense. Pages/retries do not restart it. Sound is opt-in and hidden tabs pause it.
- Existing saves, village construction and later chapters are retained. Included the exact approved Chapter 1 source for future editorial comparisons.
- 73 automated checks pass: approved narration, unique targets, claim-plus-evidence marking, progression, saved progress, recall and music lifecycle. JavaScript syntax and asset checks pass. Final paintings visually inspected. Rendered browser and listening QA remain unavailable in this environment (no browser executable).

# Checkpoint 31 — ending-only completion secret

- Added a sealed-envelope reveal after all 30 story questions and the final village reward. The start screen announces that a secret name awaits without showing it.
- The name exists only in an ending-specific module, loaded on demand when the completed player opens the envelope. It is absent from earlier narration, questions, clues, labels and asset filenames. The reveal can be reopened from the completed ending.
- Hints, retries and optional secrets do not block completion. No screenshot, account or submission form is required.
- 74 automated checks pass, including absence before the ending, deliberate envelope opening and retrieval on replay. The approved visual-novel layout remains a mockup awaiting implementation.


# Checkpoint 32 — Chapter 1 visual novel viewport

- Implemented the approved art-filled desktop/tablet scene with bottom reading/notebook panels and Hide text. Paged long content, detective steps, feedback, menus and dialogs; moved Progress into the header.
- Preserved the approved story words, all question targets, scene music, reward progression, saved answers and the ending-only completion secret. Later chapter question screens remain on their existing layout.
- 76 automated unit/handler checks pass. Chromium viewport checks pass at seven desktop/tablet sizes, with complete first-chapter playthroughs at three sizes. No scrolling or off-screen controls in exercised states. Reviewed actual desktop/tablet screenshots. Safari and physical tablet keyboard checks remain pending.


# Checkpoint 33 — page keys, gentler music and panel identities

- Left/right arrow keys follow visible reading and notebook pages, including backward paragraph navigation. Right continues after checked answers but never selects or submits one. Text inputs, modifiers, held keys and modal boundaries retain their normal behavior.
- Added 2.4-second music crossfades. The fireside memory softens the current track rather than changing it twice; revisits resume each track’s position. The incomplete tension cue plays once per game and then stays silent in suspense. Mute and hidden tabs pause immediately. Removed the sound-toggle chime.
- Story panels remain translucent; supporting notes use ruled parchment, questions dark aubergine and teaching feedback a green inset with Poppy. Unified serif reading type and sans-serif interface type. Softened hints and feedback without changing approved story paragraphs, tasks, options or accepted answers. No new artwork.
- 82 unit/handler tests pass. Native-browser Chapter 1 playthroughs pass 239 state checks across three desktop/tablet sizes; seven-size layout checks pass 148 states. Screenshot review covers story, notes and questions. Music envelopes are tested with a deterministic clock; actual listening and physical Safari/iPad checks remain pending.


# Checkpoint 34 — readable surfaces and contained answer tools

- Field Guide and shared dialogs use an explicit cream-paper/dark-ink palette, including examples, counters, muted text and links. Scene reading and question panels are translucent without background blur; bright text and a subtle shadow preserve legibility while art remains visible.
- Replaced Arial with locally bundled Nunito Sans (Latin regular, semibold and bold; SIL OFL included), retaining Georgia for prose and examples. Initial pagination waits for the bundled interface font’s final metrics. Added an original SVG bunny favicon.
- Quoted named conjunctions and transitions in lesson/help copy. Approved story and assessment sentences, answer targets and save formats remain unchanged.
- Removed inherited negative margins from punctuation-tool symbols; tool symbols and labels are centred inside their buttons. Browser regression now checks child text bounds as well as viewport bounds.
- 82 automated tests pass; Chromium checks pass 239 playthrough states, 148 layout states at seven desktop/tablet sizes and 78 dialog states. Guide and question screenshots visually reviewed. Physical tablet/Safari verification remains pending.

# Checkpoint 35 — supplied paper page-turn sound

- Bundled the supplied page-flip recording unchanged. Added a quiet paper rustle to story/storybook page turns and shared paginated notebook/menu/dialog controls, including arrow-key clicks. Answer tools/checks do not trigger it.
- Respects Sound opt-in and hidden tabs, pauses immediately when muted, reuses one player and suppresses rapid repeats. Failed effect playback never blocks navigation or changes background music.
- 84 unit/handler checks pass, covering opt-in, visibility, throttling, valid controls and playback rejection. Browser Chapter 1 navigation regression remains part of the standard viewport check.

# Checkpoint 36 — default audio and collectible language frogs

- Sound starts enabled for a new visitor; the first pointer/key interaction unlocks browser audio. A chosen mute setting persists across reloads. The opt-in control remains available and hidden tabs still pause playback.
- Added ten original SVG frog characters with distinct accessories and short story-related grammar/vocabulary tidbits: five matched to Chapter 1 paintings and one per later chapter. Their small, muted scene artwork has 44–48px click/touch targets, no pulse and visible keyboard focus.
- Frogs collect once into a separate fieldbook within Woodland secrets. Found tidbits can be reread; reached scenes can be revisited for missed visitors. Names/tidbits stay hidden until collection. Future-scene searches are locked. This does not change grammar mastery, supplies, approved prose, question answers or the ending-only completion secret.
- 87 unit/handler tests pass. Chromium checks pass 242 complete Chapter 1 states across desktop/tablet sizes, including real frog clicks, default audio and saved mute preference; 90 dialog states across seven sizes pass without overflow. Actual scene screenshot inspected. Physical Safari/tablet audio remains unverified.


# Checkpoint 37 — The Midnight Mill

- Renamed the game to The Midnight Mill across the browser title, header, home heading and shared case-title constant. Existing save keys, branch paths, story text and discoveries remain intact.
- 87 unit/handler checks pass.

# Checkpoint 38 — frogs belong in the paintings

- Replaced flat SVG frogs with a transparent painted atlas: muted mottled skin, natural poses and understated accessories. Reduced scene size, removed hover highlighting and pointer cursor, and retained invisible 44px targets plus keyboard focus.
- Anchored frog feet to source-art surfaces rather than viewport percentages. Cover-crop positioning updates with scene resizing. Later frogs appear only in their establishing views, and missed frogs remain searchable through the existing fieldbook.
- Preserved all ten collectible IDs, saved collections and language tidbits. New asset and final generation prompt are documented in assets/frogs/ARTWORK.md.
- 88 unit/handler tests pass, including source-art anchor geometry. Native Chapter 1 browser regression passes 242 states, and dialog regression passes 90 states. Actual desktop screenshot reviewed for blend and placement. Physical Safari/tablet checks remain pending.

# Checkpoint 39 — supplied frog discovery croak

- Added the user’s frog recording unchanged, quietly triggered by clicking a painted scene frog. Fieldbook tidbit replay stays silent; there are no ambient calls revealing hiding places.
- Sound/mute and visibility pause apply, with a reused player and 400ms repeat guard. Frog collection proceeds even if audio fails. Reused the existing one-shot effect controller with configurable source, volume and cooldown; page-flip behavior is unchanged.
- 89 unit/handler tests pass, including the frog sound preset. Standard native-browser Chapter 1 progression/collection regression also passes.


# Checkpoint 40 — chapter music and dispersed frog perches

- Chapter 1 now uses warm music throughout, including the fireside memory, questions and notebook stops. The creepy cue belongs only to Chapter 3’s lesson/questions. Storybook replay does not interrupt the current track. The incomplete cue still fades to silence instead of looping.
- Frogs now use varied left/right and upper/lower source-art perches, with a second authored perch when a tablet crop removes the first. Collection identities, art, tidbits and quiet click croaks are unchanged.
- 91 unit/handler tests pass, covering chapter music mapping, varied placement and crop-safe fallback points. Native Chapter 1 browser regression passes 242 states. Actual desktop scene screenshot reviewed. Physical tablet/Safari and listening checks remain pending.

# Checkpoint 41 — hint and reward contrast repair

- Prevented the old cream supply-dock feedback styles from overriding the visual-novel palette. Hints and success feedback now use pale ink on the intended dark green surface.
- Gave parchment reward clues, reward tiles and mobile hint examples their own dark ink rather than inherited scene text. The reward clue strip is readable on its pale fill.
- Added real-browser palette assertions for feedback and reward clues. 91 unit/handler checks, 242 Chapter 1 browser states and 148 seven-size layout states pass. Hint/reward screenshots inspected.

# Checkpoint 42 — Chapter 1 frame illustrations

- Added 52 narrative and assessment paintings in 13 optimized atlases. Every displayed reading frame changes art with the text, including keyboard navigation and storybook replay.
- Approved text, questions and progression are unchanged. Revised generated shots to hide evidence and preserve lighting, location and lantern continuity. Authored frog perches on selected frames.
- 95 unit/handler tests and 242 native Chapter 1 browser states pass. All 52 frame assets are checked at desktop/tablet sizes. Art provenance and prompt set: assets/chapter-one/frames/ARTWORK.md.

# Checkpoint 43 — Poppy ear anatomy repair

- Reviewed all 52 Chapter 1 frames after the reported duplicated ears. Corrected Poppy's ear silhouettes and discarded edits that changed the baker or made a distant silhouette less clear.
- Preserved approved story, questions, page mapping and clue concealment. Added an asset cache revision so returning browsers request the corrected paintings.
- Prompt, provenance and visual review decisions are recorded under assets/chapter-one/frames.


# Checkpoint 44 — Chapter 2: What Had Left the Mill

- Based on f68c228, in a fresh worktree rather than the stale reference HEAD. Chapter 1’s approved text and corrected frame assets are preserved.
- Implemented the approved revised 32-paragraph manuscript, rain-based title and clues, dry map ink, wet-cloth placement, tentative bell-mark hypothesis, and italic unfinished note. The five reading scenes precede notebook editing to avoid question spoilers.
- Reused the visual-novel layout, chapter-aware header, translucent panels, fonts, keyboard/page navigation, warm music, sound effects and frog collection. Five joining deliveries and five matched recall variants retain the six-chapter village schedule. Chapter 2 joins start with full stops. “But” and “yet” are both accepted for contrast.
- Added four paginated notebook checks after the fifth note and before the fern-garden reward: “yet”, “for”, comma-splice recognition and evidence/result direction. Saves resume incomplete checks without duplicating deliveries. Long choice lists use two options per page.
- Four new scene paintings cover mill interior, loft, rainy streambank and shed; they are reused across related reading turns, rather than 52 unique frame paintings. The image source and full prompt are recorded in assets/chapter-two. Reviewed for rain, evidence concealment and two-ear silhouettes. Both root and subdirectory entry points load the current layout.
- 108 automated unit/handler checks pass, including a full Chapter 2 playthrough, alternate contrast acceptance, retries, legacy save migration, storybook replay, notebook reload and reward collection. Atlas cover geometry checked at desktop/tablet dimensions. No rendered-browser checks were run for this update because the supported browser-control skill is unavailable. Safari, physical-device and listening checks remain pending.

Authoritative continuation checkout: /workspace/scratch/a18277c1c45c/chapter2-release (repository root); game source in woodland-crossings/.


# Checkpoint 45 — Keep notebook answers together

- Fixed the reported single-choice appearance in “Evidence for a suspicion” and “An unexpected movement”. Three answer buttons had been split into a two-choice page and a lone-choice page. All options and the Check button now remain on one question page; context, hints and explanations still paginate. Applied to all four Chapter 2 notebook checks.
- Added a real-pagination DOM regression covering every answer set at four desktop/tablet dimension inputs. This verifies DOM visibility and grouping, not rendered physical fit. All 109 automated checks pass. Browser/Safari and physical-device verification remain pending.
- Revised entry-point and chapter-UI module URLs so returning browsers request the corrected code.


# Checkpoint 46 — Match Chapter 2 characters to Chapter 1

- Edited all four Chapter 2 paintings against actual Chapter 1 image references, preserving scenery and the four-cell atlas. Restored rounded expressive faces, anthropomorphic proportions, Poppy’s dress/cape/scarf/satchel and Willow’s moss-green coat with checked collar. Removed Willow’s invented shoulder bag.
- Replaced ornate lanterns with the established simple handmade paper lantern. Corrected oil-lamp ownership: Willow inside and upstairs; Poppy at the streambank; Willow at the shed. Checked two-ear silhouettes and concealed evidence in all four paintings.
- New asset scenes-v2.webp; prior atlas retained. Saved exact prompt, source identity, references and per-cell review in assets/chapter-two. Updated asset references and entry/module cache revisions. Story, questions, answers and progression are unchanged.
- 109 automated checks pass. New atlas visually inspected; existing cover-crop geometry applies to its unchanged 1536×1024 dimensions. Rendered-browser, Safari and physical-device checks remain pending.


# Checkpoint 47 — Willow’s proportions and face

- Re-edited Willow in all four Chapter 2 paintings using Chapter 1’s standing bakery pair as the primary reference. Shortened her elongated body, increased head-to-body ratio, rounded cheeks and muzzle, enlarged expressive eyes, and removed bright cream checked neckwear.
- The first generated pass shortened the ears too far; a second focused edit restored two long upright rabbit ears before publication. Poppy, the lamps, rainy scenery, four-cell boundaries and clue concealment are retained. Final source and both prompts are recorded in assets/chapter-two/willow-review.json and adjacent prompt files.
- Runtime now uses scenes-v3.webp; earlier assets remain for provenance. Refreshed application and art-module URLs. Story, questions, answers and progression are unchanged.
- All 109 automated checks pass. Final four-cell atlas compared visually with Chapter 1 references. Rendered-browser, Safari and physical-device checks remain pending.


# Checkpoint 48 — Use the supplied Chapter 2 artwork

- Replaced the active Chapter 2 atlas with the image the user supplied as image(20261020-153209).png. No further generative edits. Converted to lossless WebP and verified identical decoded RGB pixels.
- Runtime uses scenes-v4.webp in the reader, notebooks, storybook replay and scene revisits. Original four-cell geometry and scene order retained. Source provenance is in assets/chapter-two/user-approved-source.json.
- Refreshed entry-point and art-module cache URLs. All 109 automated checks pass; story, questions, answers and progress are unchanged.


# Checkpoint 49 — Isolate artwork in exploration dialogs

- Fixed the screenshot-reported atlas leak in Look around. Frog-search and chapter-revisit dialogs had bypassed the frame painter and rendered the four-cell atlas using the legacy cover background. They now select the correct individual Chapter 1/2 painting and use the same pixel crop as story/notebook views.
- Crop geometry is applied immediately, before image loading, so a cached/fallback atlas cannot flash multiple cells. Frame-aware frog anchors apply in exploration too; the reed frog has bank/foliage perches within the isolated streambank painting.
- All 112 automated checks pass. New checks exercise real revisit/frog-search handlers, initial crop application without Image loaded, source-cell containment at dialog/tablet dimensions and visible frog anchor coordinates. These are DOM/math checks; browser/Safari/device checks remain pending. Supplied artwork pixels and assessment/progress data are unchanged.


### Final-envelope revision · 22 October 2026

The secret village-name reveal is superseded by the baker’s Night Owl pen-name reveal. A single sentence in Chapter 2 introduces Poppy’s familiarity with the Night Owl’s detective stories, without linking them to the baker. The final envelope contains the baker’s signed note and a handwritten story about the adventure. The main investigation, questions and completion gates are unchanged. No teacher-reporting text is shown. See STORY_NOTES.md for current canon.


### Optional clue notebook · 22 October 2026

The earlier notebook deferral is now resolved following the six-chapter review. Poppy’s clue notebook is available from a persistent navigation button. It stores observed story details separately from working ideas and grammar edits. Nine optional pages ask students to select an idea, link two observations for a specific evidence connection, check that link and save their reasoning. Wrong links receive a prompt to reconsider scope or evidence, without an automatic answer reveal. Later evidence appears only once its passage is reached.

Observation collection follows the displayed mobile reading page or desktop/tablet reading part. Full completed scenes and story-task progress support existing saves. The notebook has its own left/right page navigation and does not submit answers through arrow keys. Matching, revision and notes persist in clueNotebook; opening or checking it never changes supplies, grammar hints, rewards, mandatory casework or the final-envelope gate. The baker’s ending identity is not recorded in the notebook.

### Chapter 3 illustrated scenes · 22 October 2026

Replaced the generic bell-workshop paintings with twenty narrative paintings across five scene atlases for The Wrong Path. Chapter 1's detailed art and the approved Chapter 2 rabbits supplied the visual references. The artwork follows the near-bank path, bridge rescue, hazel-bank apology, listening scene and fingerpost return. Four prose anchors per scene select the paintings; questions, retries and exploration share the matching scene's final view. Responsive reading groups may skip an intermediate painting.

Poppy carries the oil lamp; Willow's extinguished paper lantern stays concealed. Reviewed character anatomy and clothing, unreadable map/sign details, rescue positioning and same-bank return continuity. Corrected the aftermath's seated pose and invented stone bridge, plus the final sheet's ear shape and route background. Four collectible frogs remain; saved progress, the optional clue notebook and all approved prose/questions are preserved.

Assets, exact prompts, source provenance and review notes are under assets/chapter-three/frames/. Entry-point, frame and scenery caches are refreshed. Validation: 166 automated tests pass, including new narrative-anchor coverage and existing desktop/tablet crop isolation checks. Source paintings were visually reviewed. Browser, Safari and physical-device visual checks remain outstanding.

### Cloudflare deployment repair · 23 October 2026

The supplied Workers build failed because automatic setup selected the entire repository as static assets, including a 26.7 MiB Git pack. Added explicit root Wrangler configuration for the existing commaspliceanimals Worker and a root .assetsignore excluding Git history, build/dependency directories, tests and authoring material. Root and woodland-crossings URLs are preserved. The five new Chapter 3 sheets remain deployable. Verified the upload selection, asset size limit and runtime module/art references locally; actual Cloudflare deployment success still requires the next connected build.

### Natural sentence repairs · 23 October 2026

Semicolon targets now appear only in the approved Chapter 1 Q5 and its retry (two items across the 63-item bank). Chapter 2 Q5 links observations to a tentative conclusion with comma + so. Chapter 4 Q1 separates witness accounts with a full stop before However; Q3 preserves the relative-clause commas and adds comma + but. The second bonus item now starts a fresh sentence at Instead. Their retries, explanations, lesson demonstration and QUESTIONS.md are aligned. No instruction names a semicolon as the required tool. Semicolons remain in reference guidance and receive neutral feedback when grammatically valid but outside a task's writing goal.

Chapter 1 main/retry objects were compared with the previous version and are unchanged. All 167 automated tests pass, covering target uniqueness within offered tools, rendered answers, a full game flow and selective migration of unfinished edits. naturalProseRevision 2 clears outdated edits only for m10/r10, m16/r16, m18/r18 and b2 in existing saves; story progress, rewards, frogs and clue-notebook data persist. Refreshed app/content/engine cache URLs. Live deployment and physical-device checks remain unverified.

### Chapter 4 illustrated scenes · 23 October 2026

Added twenty narrative paintings across five atlases for A Bell in Two Places, using Chapter 1's detailed luminous style and established rabbit references. The entire conversation remains beneath the bakery awning: arrival, witness accounts, timing deduction, route discussion and preparation to search. Four chronological prose anchors per scene select paintings; questions, retries, casework and frog exploration share each scene's final view. Responsive reading chunks can skip an intermediate painting.

Reviewed all five source atlases for clothing, ear anatomy, supporting-cast continuity and concealed evidence. Corrected obscured/extra Poppy ears on sheets 1, 2 and 5. Established the ferryman as a brown otter in a slate-blue raincoat and brown knitted cap. Maps remain unreadable; no imagined rescue, bowls or missing characters appear. A portrait focus adjustment keeps both rabbits visible in the first map-study view. Chapter 4 retains four frogs. Approved prose/questions, saved progress and notebook data are unchanged.

Artwork, exact prompts, correction instructions, source provenance and review notes are under assets/chapter-four/frames/. Refreshed application/frame/scenery cache URLs. All 168 automated tests pass, including ordered narrative anchors, question/retry/casework/exploration mappings, frog coverage and desktop/tablet crop isolation. All five WebP files are included by deployment rules, each under 25 MiB (2,954,620 bytes combined). Source-image visual review is complete; live deployment, browser layout, Safari and physical-device checks remain outstanding.

### Scenery swaps in Chapters 1–4 · 23 October 2026

Restored seven existing scenery views by changing only frame assignments: Chapter 1's first mill-window sighting and doorway; Chapter 2's streambank; Chapter 3's opening woodland path and listening-at-the-stream beat; Chapter 4's ferry account and route discussion. Ferry/river images are location cutaways during the bakery conversation, not new journeys. Used mill-views cell 3, doorway-v3, tracks-views cell 2 and witness-views cells 1/3. Avoided old readable maps, suspect silhouettes, stitching close-ups and incorrect bell evidence. No new artwork generated or existing image files altered.

Narrative anchors, prose, questions, character action scenes, frog bindings and save data remain intact. Refreshed application/frame cache URLs. All 168 automated tests pass; browser/device verification remains outstanding.

### Chapter 1 visual continuity repair · 23 October 2026

Reviewed and corrected six illustration atlases after the sequence audit. Poppy stays on the stone fountain rim during the lantern exchange. Present-day wheel/cottage views are scenery-only cutaways, preventing a premature move from the square; the cottage is dark. Square views show the distant upper light through alder foliage, without a hilltop wheel. A lane cutaway places the mill in the distance with its upper windows dark after the light vanishes. Willow lights her lantern before Poppy enters, the mill fireplace is cold, and the final question remains indoors. Restored the original sheet 10 doorway/stairs/oil-lamp view instead of doorway-v3. The first mill-window sighting keeps its earlier scenery-only cutaway. Deliberate sunny and fireside memories remain.

Selected sibling assets, exact built-in generation prompts, source filenames and review notes are under assets/chapter-one/frames/continuity/. Six source atlases were visually reviewed; the unused sheet 04 cell 0 is excluded from the active sequence. All 52 unique frame assignments, approved prose/questions, five Chapter 1 frogs and existing saves are preserved. Refreshed app/frame cache URLs. All 168 automated tests pass, covering asset availability, narrative mapping, crops and progression. Six new assets are deployable and below the size limit (3,274,936 bytes combined). Live deployment, browser/Safari and physical-device visual checks remain outstanding.

### Approved landing title image · 27 October 2026

Set the approved uploaded moonlit mill illustration as the fixed landing artwork. Desktop/tablet display it behind a translucent left-side title/control panel; mobile displays the full 3:2 composition in the hero. Other chapter menus retain their backgrounds. The image was encoded directly to a 641,920-byte WebP without regeneration or visual edits. Mobile frog/woodland discoveries remain functional. App and interface stylesheet cache URLs refreshed in both entry points. All 168 automated tests pass, including start/restart and collectible handlers. Live deployment and browser/device visual verification remain outstanding.

## Landing layout repair · 27 October 2026

The screenshot showed six chapter cards compressed into the narrow title panel, with clipped final text. Moved the chapter overview into a paginated modal accessible from the landing buttons. Kept the approved painting and main actions, shortened the duplicated introductory copy, and centred a shorter desktop/tablet panel over the artwork. Both entry points use the refreshed app/CSS cache revision. All 168 Node tests pass; actual browser/device visual verification remains outstanding.

## Chapter 2 artwork continuity — 27 October 2026

Replaced smooth-fur four-cell reuse with twelve textured paintings across three atlases. Correct downstairs desk and narrow rainy streambank; distinct loft/window and shed/listening views; scenery/object pauses. Question and fallback backgrounds stay at the current location. Preserved approved prose/questions and four collectible frogs. Removed generated bell, surplus lights and premature/oversized cloth during review. Exact prompts, sources and paragraph mapping in assets/chapter-two/continuity/. Both entry points and app art imports refreshed. All 168 tests passed; live/device visual QA remains outstanding.

## Three-line reading panels · 27 October 2026

Story, casework context and explanatory feedback now split using a DOM measurement probe at the available content width and actual font/line-height, with at most three prose lines per reading page. Paragraphs remain separate; text is continued rather than truncated. Question/answer comparisons and controls remain together and can make the overall interface panel taller. Existing desktop/tablet presentation applies; phone stacked layout remains unchanged. New conservation test exercises all six chapters at three fit capacities. 169 tests pass; actual browser/device line counts remain unverified. Frog overlap audit and single-screen placement changes are still pending; Chapter 5 artwork remains planned only, with older scenery allowed for questions.

## Pocket cartographer perch · 27 October 2026

Moved map-frog from generic floating coordinates to the bakery arrival barrel rim (8%,54%), with a table-edge alternative (51%,48%) for cropped tablet views. Restricted it to m16-art-0; subsequent reading parts/pages, question and casework images omit it. Woodland secrets revisits that same arrival painting. Other frog placement changes from the audit remain pending. All 169 tests pass; physical placement still needs browser/device verification.

## iPad landscape preference · 27 October 2026

Added iPad detection for both mobile and desktop-site user agents. Portrait iPads get a native rotation prompt with an accessible portrait override; it closes on landscape rotation. Native orientation locking is attempted after interaction only if supported, with rejected attempts handled. Safari can require physical device rotation. Header chapter title hidden through 1180px to make space for navigation; touch targets, safe-area panel margins and visible-viewport dialog height retained. 170 automated tests pass, including device/orientation cases for 1024×768, 1133×744, 1180×820, 1194×834 and 1366×1024. These are logic checks, not rendered viewport screenshots. No browser engine is installed in this environment; visual iPad/Safari approval remains outstanding. Existing global frog overlap work remains pending.

## iPad artwork fitted above reading panels · 27 October 2026

User screenshot IMG_0201.jpeg establishes the landscape target. iPad frame geometry now fits the complete 3:2 painting into space above the actual visible story/question/casework panel, instead of cover-cropping behind it. Clip bounds isolate the selected atlas cell and prevent adjacent paintings showing in side margins. Frogs use the same fitted source bounds, so their painted coordinates no longer drift as crop changes. Panel resize observation updates geometry and frog placement. Story panels have smaller title/padding/control gaps while retaining readable type and 44px controls. All 171 tests pass, including geometric checks over every frame at five iPad viewport sizes and three panel heights. These checks establish no art cropping and frog points outside the panel, but do not constitute live Safari screenshots or manual validation of each frog's natural perch. Global single-screen frog assignment remains pending beyond map-frog.

## Restore immersive iPad crop · 28 October 2026

User rejected separate above-panel artwork. Restored full viewport cover-cropping behind translucent panels on landscape iPads; no contained image, clipping rectangle or side gutters. Top-aligned crops retain the source top edge (ears/faces) while trimming lower scenery for the wider viewport. Existing horizontal focus is retained. Frog source positions follow the actual cover transform and use alternate perches if cropped out; this does not resolve all remaining text-overlap/natural-perch work. 171 tests pass, including all-frame cover/atlas-boundary checks across five landscape iPad sizes. Actual iPad visual review remains outstanding.

## High-priority writing revision · 28 October 2026

Implemented the targeted editorial review on woodland-crossings, starting from 65e4467. Scene m18 now treats the bell's movement as a possibility, including Poppy's following narration. Scene m27 explains the travellers' return as worsening weather and an expectation that Bram's work would be finished; the ankle injury remains on the approach, before crossing. The obstruction remains unspecified to avoid introducing a second fallen limb or relocating the existing one.

Scene m29 distinguishes deliberate support removal from the unproven timing/cause of the collapse. A short resistance and evidence-based question precede the confession; no claim identifies a tool or person from saw marks alone. Bram admits he should have sought help before crossing, explains his fear and overconfidence, and describes the worsening situation after the planks failed. His rescue effort and responsibility for delayed help both remain explicit. STORY.md matches the runtime chapters.

Question m17 now has Willow testing a possible uphill route, with matching explanation; its bowl-based recovery remains a tentative inference. Question m29 and its recovery explicitly revisit earlier notebook entries so their competing explanations do not contradict the already-read confession. The main timber alternatives and retry's mistake-versus-lie alternatives are clearer. QUESTIONS.md is synchronised. Existing feedback now explicitly distinguishes grammatical joins from failure to meet the writing goal and states that no grammar mistake was counted. Field-guide wording acknowledges accepted contrast alternatives. Answer handling and scoring were not changed.

Preserved six chapters, 30 main tasks, 30 recovery tasks, three bonus items, all answer sets, tools, grammar data, word-order targets, artwork and progression. The optional independent m30 revision remains deferred: its current explicit constraints continue to match its checker. Refreshed changed module imports and both application entry points; aligned the nested entry point with the root's existing hidden-menu stylesheet cache revision.

Validation: all 171 automated tests pass, including complete UI-flow/progression, recovery, manuscript consistency, artwork mappings and reading-text conservation. An additional audit checked all 63 bank items and all 65 accepted answer combinations, and compared answer contracts with the starting commit: unchanged. git diff --check passed. Tests that asserted superseded wording/cache URLs were updated. No manual browser/iPad playthrough or live deployment verification was performed in this revision.

## Feedback explanation spacing · 28 October 2026

Fixed the desktop/tablet feedback pager's recovery/review fallback. When success feedback had no outer paragraph, it flattened the entire details element with textContent, joining “Why this edit works” and every explanation paragraph with no separators and duplicating the separately paginated explanation. The fallback now removes details before extracting plain feedback and ignores empty text. Explanation paragraphs retain their existing separate pages. Refreshed the chapter UI import and both app entry points. All 171 automated tests pass; git diff --check passes. No manual browser/device verification in this checkpoint.


## 2026-10-29 — Chapter 5 artwork

Integrated twenty reviewed paintings across five 2×2 WebP sheets for m21–m25. Preserved story, questions and progression; question screens reuse existing scenery. Corrected character, lantern and shelter continuity during image review. Four existing frogs now appear on one reading screen each, with matching exploration paintings and panel-overlap protection. Updated asset cache versions. Exact prompts and source selections are in assets/chapter-five/frames/.

Validation: 174/174 automated tests pass; git diff whitespace checks pass. Images visually reviewed; live deployment and manual iPad playthrough remain unverified.


## 2026-10-29 — Chapter 6 artwork complete

Added twenty reviewed paintings across five sheets for m26–m30, from the stretcher return to Poppy's notebook ending. Preserved all prose, questions, answers and chapter progression. Question screens retain their existing scenery. Four existing frogs each belong to one opening reading screen, with identical exploration artwork and panel-overlap protection. Updated asset cache versions.

Usage-conscious production: five initial image calls and one targeted stretcher continuity correction; no speculative variants. Prompts and partial artwork checkpointed in batches. Source map, exact prompts, correction and plan are in assets/chapter-six/frames/.

Validation: 176/176 automated tests pass; all five WebP sheets visually reviewed and verified at 1536×1024, individually under 1 MB. git diff --check passes. Manual live iPad playthrough and deployment verification remain outstanding.

## 2026-10-29 — Secret Trail and envelope artwork

Mapped b1–b3 to existing map, chipped-bell and stretcher-return paintings. Both scenery and frame rendering use these fixed mappings, including legacy saves and reloads. Added one new illustrated final-envelope reveal, loaded only when opening the existing gated envelope. Kept prose, grammar answers, rewards and unlock conditions unchanged. One image-generation call, no retries. Prompt/source and mappings saved under assets/secret/.

Validation: 177/177 tests pass, including stable bonus mappings and gated reveal imagery. Source art visually reviewed; live Safari/iPad and deployment verification remain outstanding.

## 2026-10-30 — Frog placement across all chapters

Completed Chapter 1–4 source-perch review and unified all 25 frogs on one opening reading screen each. Removed duplicates from question/casework/bonus/landing screens; later pages and reading parts omit the collectible. Exploration returns to the exact assigned painting. Existing collection IDs, tidbits and saves are preserved.

Fixed crop alignment on desktop and phone by sharing actual rendered atlas-cell bounds with frog positioning. Placement tries reviewed alternatives before hiding obstructed frogs and accounts for the full 44px touch target. Both panel and scene resizing trigger updates. Chapter 5–6 perches retained. No images generated.

Validation: 181/181 tests pass, including all-frog collection/save handlers, lifecycle and revisit mappings, six landscape tablet sizes, portrait crops, obstruction fallback and non-default crop focus. git diff --check passes. Source/perch composites reviewed; live Safari/iPad verification remains outstanding. Placement inventory: assets/frogs/PLACEMENT.md.

## 2026-10-30 — Chapter 4 artwork and shavings dialogue

Restored the existing bakery conversation paintings at m17-art-1 and m19-art-2, replacing calm-water cutaways. Prior visual review of all twenty Chapter 4 paintings found no obvious three-ear rabbit errors; no new imagery required. Corrected the artwork notes to reflect opening-frame exploration.

Revised m28 in both runtime prose and STORY.md: Poppy asks why clearing timber produced fresh shavings and what Bram was making; Willow explicitly separates evidence of woodworking from evidence of bridge provenance. Refreshed affected module and entry-point cache versions.

Validation: 181/181 automated tests pass; git diff --check passes. No manual browser/device playthrough or live deployment verification performed.

## 2026-10-30 — Hidden chapter tester

Added `?test=1` entry and persistent test controls, scene/question jumps across all six chapters, direct secret-stage access and exit to the normal game. Jumps create fresh isolated test progress; normal saves remain untouched. Updated app cache versions and documented usage.

Validation: 182/182 tests pass, including all thirty reading/question entry states, three secret states and real UI/save-isolation handlers. git diff --check passes. Live browser/device verification remains outstanding.

## 2026-10-30 — Two accounts and m21 extra ears

Replaced Chapter 4 sheet 02 and Chapter 5 sheet 01 using two targeted built-in image edits. Corrected Poppy’s ear silhouettes in all four views of each sheet, preserving the atlas layouts and cast. User report supersedes the earlier Chapter 4 no-error finding. Refreshed asset, rendering-module and app cache versions. Generation source/prompt notes sit beside each atlas.

Validation: both generated sheets visually reviewed; 1536×1024 WebP encoding retained. All 182 automated tests pass and git diff --check passes. Live browser/device verification remains outstanding.

## 2026-10-30 — m28 evidence logic

Poppy now asks whether Bram brought wood from the crossing to the mill, explicitly connecting the two locations without treating fresh shavings as a contradiction. Willow asks Bram to show them. The ferryman identifies former bridge timber and defers the removal conclusion until inspection. Runtime prose and manuscript match. Updated the marked-timber notebook trigger and dependent cache versions.

Validation: all 182 tests pass, including notebook observation collection across reading sizes, manuscript consistency and chapter tester entry states. git diff --check passes. No artwork changes; live device verification remains outstanding.

## 2026-10-30 — Frog implementation audit

Audited all 25 frog frame assignments, collection/save handlers, revisit gating, crop coordinates and panel obstruction logic. Fixed premature later-chapter search access: default page-zero entries for every scene no longer count as visited. Completed preceding scenes or actual progress permit revisits; existing collected IDs remain intact. Refreshed module/entry caches.

Validation: 183/183 tests pass, including new regression coverage using the actual reader initialisation for Chapters 2–6, all-frog collection/save handlers, unique reading-screen assignment and tablet/portrait geometry checks. git diff --check passes. Actual touch usability and live browser rendering remain unverified.

## 2026-10-30 — Full-image frog revisits

All journal exploration viewers now retain the painting’s full 3:2 proportions on desktop, tablet and phone, with a viewport-height width cap. Disabled modal pagination for these short scene views so the heading, painting and explanation stay together. Frogs retain source-art coordinates; top-edge touch targets shift inside the viewer while sprite offsets preserve the painted perch. Updated CSS and module cache versions.

Validation: 184/184 tests pass, including full atlas-cell bounds and available frog positions at widths 240–1024px for all 25 frogs, plus existing collection/save and panel-obstruction checks. git diff --check passes. Live browser/device visual verification remains outstanding.

## 2026-10-30 — Fieldbook back navigation

Added contextual modal return callbacks: fieldbook frog searches and tidbits return to the fieldbook with its prior page and scroll position. Story-found frogs retain Back to the trail. Every new modal resets the return context and button label. Updated app/UI-module cache versions.

Validation: 185/185 tests pass, including actual search → collect → back, collected-tidbit → back, restored scroll position and story-frog close handlers. git diff --check passes. Live device verification remains outstanding.

## 2026-10-30 — Village zoom

Replaced the binary zoom toggle with 100–300% zoom controls, zoom out and Fit village. Added pointer-based pinch zoom and drag panning, focal-point retention and Ctrl+wheel/trackpad pinch support. Enlarging preserves viewport height and uses inline canvas sizing to override the desktop/tablet rule that previously disabled zoom. Drag gestures suppress accidental landmark activation. Updated entry and stylesheet caches.

Validation: 186/186 tests pass, including zoom dimensions, focal position, drag, pinch, click suppression, fit reset and existing landmark interactions. git diff --check passes. Live touch/device verification remains outstanding.

## 2026-10-30 — Woodland secrets back navigation

All six non-frog discovery reveals now retain their menu return callback. Chapter exploration and its reveals use Back to Woodland secrets and restore the menu’s prior page/scroll position. Frog fieldbook labels and story discovery close behavior are preserved. Refreshed app entry cache.

Validation: 187/187 tests pass, including all six explore → reveal → back and explore → back handlers, restored scroll positions and unchanged grammar progress. git diff --check passes. Live device verification remains outstanding.

## 2026-10-30 — Clean exploration artwork

Replaced the legacy scene scaffold in Woodland secrets and frog searches with a dedicated SVG atlas-cell viewport. Each revisit displays its complete 3:2 painting directly, with collectible overlays retained. Removed the obsolete animated rabbit, mist and sparkle layers from these viewers. Background rendering is disabled in the dedicated viewer to prevent an uncropped atlas/fallback appearing during image loading. Existing geometry still aligns frogs with the painting. Refreshed CSS/app caches.

Validation: 188/188 tests pass. New real-handler coverage checks all six chapter revisits and 25 frog searches for exact cell viewports, correct source assets and absence of legacy actors/effects. git diff --check passes. Live device verification remains outstanding.

## 2026-10-30 — Persistent village trail exit

Renamed the village return action to Back to the trail. On paginated desktop/tablet menus, moved this existing button outside the pages into the fixed menu footer so it remains available on every page; pager controls reserve space alongside it. Mobile keeps the standard return action. Existing resume logic is retained. Also overrode an older desktop rule hiding the village Zoom in button. Refreshed app/CSS caches.

Validation: 188/188 tests pass, including existing reading-page resume through village/back and landmark/zoom handlers. git diff --check passes. Live device verification remains outstanding.

## 2026-10-30 — Distinguish village page navigation

Village pagination now says Previous page / Next page, and hides the disabled Previous page control on the first page. The persistent Back to the trail action remains visible. Refreshed CSS/app caches. Validation: 188/188 tests pass; git diff --check passes. Live device verification remains outstanding.

## 2026-10-30 — Single village view

Village now bypasses generic desktop/tablet menu pagination and keeps its heading, painting, zoom and action controls in one view. Removed the duplicate review banner and build note from this screen; village summary and Learning & memory trails retain their functions. Persistent Back to the trail remains outside the content. Updated CSS/UI/app caches. Validation: 188/188 tests pass; git diff --check passes. Live layout/device verification remains outstanding.

## 2026-10-30 — Chapter 1 storybook painting coverage

Chapter 1 storybook replay now follows each authored story-art anchor rather than selecting a single image per independently repaginated text block. Includes all 44 narrative paintings across its five scenes, including the seventh opening-scene panel. All prose is conserved in order and replay remains read-only. Refreshed app cache.

Validation: 189/189 tests pass, including complete Chapter 1 frame coverage and normalised prose conservation, plus existing storybook save/progression checks. git diff --check passes. Live browser verification remains outstanding.

## 2026-10-30 — Storybook scene unlock boundary

Removed the next-unread-scene preview from storybook availability across all six chapters. Scenes now require completed question progress, a completed reading record, or an explicit story-open record written when the reading view opens. Default page-zero positions do not count. Existing completed saves retain earlier scenes. Updated shared story-module and app cache versions.

Validation: 190/190 tests pass, including opening/completing every scene across all chapters without exposing the next, plus existing read-only replay/prose coverage and save checks. git diff --check passes. Live device verification remains outstanding.

## 2026-10-30 — Stable question artwork while editing

Answer and notebook choice redraws now reuse the existing loaded painting element and crop instead of recreating a fallback image. Scene/question changes and question success transitions still replace artwork normally. Question painting geometry is applied after chapter layout preparation. Updated app cache.

Validation: 191/191 tests pass, including artwork identity/crop preservation and scene/success replacement, plus existing answer, casework and progression handlers. git diff --check passes. Live browser/device flicker verification remains outstanding.

## 2026-10-30 — m15 single-answer audit

Audited m15, r15 and the optional Poppy decision reflection. Each punctuation task has exactly one accepted answer combination: comma/comma/full stop, under its explicit new-sentence goal. Enumerated all 729 offered combinations per task. Other grammatical sentence joins do not satisfy that goal. Revised the reflection to ask for directly observed behavioural change, with the keyed option describing waiting for Willow rather than inferring motivation. Removed feedback relying on an apology absent from the question context. Updated dependent module/app caches.

Validation: 193/193 tests pass, including exhaustive m15/r15 submissions and existing Chapter 3 real-handler completion/reflection checks. git diff --check passes.

## 2026-10-30 — Grammatically unique m14/m15 repairs

Revised m14/m15 and r14/r15 trays to keep comma, full stop and nor. Removed semicolon and other coordinating conjunctions that would create competing grammatical repairs. Generic repair brief replaces sentence-count instructions. Full stop is now the sole grammatical option for the faulty main-clause join; m15’s relative-clause commas remain necessary. Existing saved selections using retired options are reinitialised when those questions reopen. Updated content/engine consumers and app cache.

Validation: 193/193 tests pass. Exhaustive offered-combination audit now requires both grammatical and accepted sets to contain exactly one identical solution for each of the four tasks, without relying on the brief’s sentence count. Chapter 3 real-handler playthrough still passes. git diff --check passes.

## 2026-10-30 — Complete single-answer audit

Audited all 63 main/recovery/bonus grammar items, supporting questions, nine clue-notebook threads and optional reflection. Added per-join choice menus to exclude grammatically valid competing repairs rather than relying on restrictive briefs. Removed m7/r7’s second accepted contrast synonym. Revised mixed m24/r24 and m29/r29 joins to add their conjunctions instead of leaving existing conjunctions before an editable boundary. All questions begin with comma joins. Tightened Chapter 2 yet/for distractors and Chapter 1 agreement wording; explanations match. Retired saved tools reset on the same task. Updated answer-contract module/entry caches. Full answer inventory and manual-review limitations: ANSWER_AUDIT.md.

Validation: 196/196 tests pass, including exhaustive 2,075 offered combinations across all 63 items, unique grammatical/accepted sets, actual per-join menus for mixed tasks, legacy selection resets, notebook evidence pairs, chapter/recovery/progression and save handlers. git diff --check passes. Live device/deployment verification remains outstanding.
