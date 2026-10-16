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
