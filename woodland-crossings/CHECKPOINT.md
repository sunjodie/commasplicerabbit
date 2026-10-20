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

- Replaced the CSS rabbit silhouette with original vector Pip artwork: rounded proportions, pink cheeks, scarf, expressive eyes, blinking and a happy crossing hop.
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
- Added Halloween palette and fog throughout the interface; reading panels remain opaque/light. Pip wears a small witch hat.
- Added six optional graphic discoveries, a persistent collection, keyboard controls and reached-scene revisits without replaying grammar tasks.
- Added chapter case notes and an illustrated, replayable ending resolving the lantern, bell and map as one rescue. No score, hint, mastery or secret-collection gate.
- Preserved existing saves and active review/bonus continuation.
- 31 automated checks pass. Generated scenery and rescue SVG visually inspected. Real-browser/touch/contrast QA remains pending.
- Scope: graphics/narrative interface only. The proposed question-bank rewrite remains paused; content.js and engine.js are unchanged.

# Checkpoint 07 — original autumn storybook artwork

- Replaced flat Pip with a softly painted original rabbit in plum cape, rust scarf and satchel, carrying a lantern. Preserved transparent alpha and existing crossing animation.
- Added moss-and-amber autumn mill scenery and a painted rescue ending showing the caretaker, travellers, bell, map and lantern. Generated artwork uses the reference for broad mood only; no stock imagery bundled. Full prompts in assets/ARTWORK.md.
- Enlarged Pip on short desktop screens, moved his speech bubble beside him, and removed the repeated heading above the scouting prompt. Retained existing question controls and saves.
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
- Removed the fixed rabbit overlay from question scenes. Pip now sits beside his dialogue at his original 2:3 proportions, independent of background perspective.
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
- Moved View artwork into Pip’s dialogue row as a labelled 44px expand control. Stacked art/question/answers and full artwork framing remain.
- 45 automated checks pass; JS syntax and whitespace checks pass. Tests cover exact rendered report wording and paragraph boundaries, rules-modal state safety and artwork-control placement. Actual mobile browser/touch QA remains pending.

# Checkpoint 19 — smaller mobile reading type

- Reduced sentence and passage text at widths up to 760px from 18px / 1.8 line-height to 16px / 1.6 to reduce scrolling. Instructions remain 12–13px; action controls and punctuation touch areas retain 44px targets.
- 45 automated checks pass and whitespace checks pass. Deployed-device rendering remains to be checked.

# Checkpoint 20 — complete narrative draft, paused before adaptation

- Finished STORY.md: a complete six-chapter story of approximately 3,100 words, preserving the approved opening and developing the midnight-bell legend into a fair-play rescue mystery. Pip and Mara have distinct strengths, consequential mistakes and essential rescue roles.
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

- Chapter 1 now has one semicolon target instead of two. The third main note uses comma + but to express a contrast between Mara’s dismissal of the legend and Pip’s continued unease. Its paired recovery also practises contrast; the four-tool tray stays consistent across the chapter. Later chapters have not been changed in this pass.
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
- Story panels remain translucent; supporting notes use ruled parchment, questions dark aubergine and teaching feedback a green inset with Pip. Unified serif reading type and sans-serif interface type. Softened hints and feedback without changing approved story paragraphs, tasks, options or accepted answers. No new artwork.
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
