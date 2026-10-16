# Woodland Crossings

A self-guided comma-splice adventure for upper-primary and secondary learners. Help Pip repair sentence crossings and restore a woodland village. The original Rabbit Punctuation Runner in the repository root is unchanged.

## Play locally

Use any static web server. For example, from this folder:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. JavaScript modules require HTTP serving; do not double-click index.html. There is no build step, account, API key, external font, analytics or runtime dependency. The teacher does not need to upload passages or mark answers.

## Hosting

Deploy this folder as the static output directory on GitHub Pages, Cloudflare Pages, or another static host. If this repository already serves its root with GitHub Pages, the folder becomes `/commasplicerabbit/woodland-crossings/` once this branch is merged and Pages has deployed. A GitHub source link is not a playable hosting URL. This pull request does not change hosting settings or deploy the original game.

## Learning and play

- Six expeditions: complete clauses; dependent openings; longer clauses; however/therefore; several joins; passage editing without a faulty join being highlighted in advance.
- 30 story questions and 18 authored transfer questions. An adventure contains 42 crossings, including 12 interleaved memory crossings. Examples are reused after the finite transfer pool is exhausted.
- A brief demonstration introduces each expedition. Both correct and incorrect comma uses appear early in the adventure.
- The student chooses a join, fits a sentence tool, then tests the crossing. A bridge section appears when a repair is fitted, and Pip crosses on success.
- Full stops add capitals automatically. Valid available alternatives are accepted. Offered conjunctions are scoped to the selected join so students are not penalised for an unlisted grammatical combination.
- Reading each side silently helps students identify dependence. The guide explicitly distinguishes structure from pauses or breathing.
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
- `app.js`: UI and browser-local save/resume.
- `style.css`: responsive styling and handcrafted woodland scene.
- `tests/engine.test.mjs`: content integrity and learning/progress checks.

Run checks with Node 20 or later:

```sh
npm test
node --check app.js
```

## Verification and limits

14 automated tests pass, covering all supported answer variants, dependent-clause fragments, full-stop capitalisation, every expedition and review insertion, save/resume state, assisted/independent separation, 1/3/7-day reviews, and persistent bonus successes. A gamification subagent reviewed the implementation; its feedback was applied to alternative answers, bridge construction, review progress and bonus retries.

Browser rendering, touch interaction and real-student playtesting remain unverified in this environment. The finite authored answer bank does not grade arbitrary free text. Completion demonstrates performance within these structured tasks, not a guarantee that a student will avoid every comma splice in their own writing.

## Research informing the design

- Cepeda et al. (2006), Distributed practice in verbal recall tasks: https://doi.org/10.1037/0033-2909.132.3.354 . Supports distributed practice generally; the game's exact 1/3/7 schedule is a practical choice, not an experimentally validated optimum for this content.
- Purdue OWL, Run On Sentences: https://owl.purdue.edu/owl/general_writing/punctuation/independent_and_dependent_clauses/runonsentences.html . Independent-clause joins and repair patterns.
