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
