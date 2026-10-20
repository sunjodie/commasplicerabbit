# Figma UI review

Editable audit: https://www.figma.com/design/euhY5VCNNIoJIHzOUuIqmj?node-id=2-2

The review uses source-based control/layout samples, not a capture of the deployed game. Fonts are DM Sans and Fraunces, matching the CSS. The board covers a 936px desktop question panel and 344px phone samples with 312px usable text width. It includes the longest report brief, complete report text, all eleven tool labels and restart confirmation.

## Findings applied

- A 21px `because` mark wrapped in the narrow sample. Use a 16px single-line mark, with standard punctuation/conjunction marks at 22px. Final Figma marks fit on one line.
- Use predictable tool grid columns: three on phones, adaptive 96px-minimum columns on larger screens. Keep tool labels at 12px and targets at least 80px high.
- Keep task goals separate from the question itself, with wrapping goal chips and 14px briefs. Paragraph text preserves its line breaks.
- Restart gets explicit consequences, two distinct stacked phone controls at least 48px high, initial focus on Keep playing, and no duplicate generic dialog-close button. Restart heading uses Fraunces at a compact size.

## Limits

The audit did not render the browser CSS, drag interactions, scenery cropping, full navigation or screen-reader flow. The editable samples validate typography/wrapping at selected widths. Thirty automated checks cover app-handler and engine behavior, including cancellation and destructive confirmation. Live-browser and student testing remain pending.

## Subsequent art-panel update

The game now separates artwork and question content into a vertical artwork → question → answer layout on every screen. Scenes use 3:2 proportions and a View artwork dialog. This subsequent structural change was verified by automated handler/state checks, not captured in the Figma sample board above. Live-browser layout verification remains pending.

## Larger artwork and quieter guidance

Desktop illustration maximum increased from 540px to 900px. Full 3:2 framing and stacked reading order remain. Pip is outside the artwork in a 54×81px guide slot (44×66px on mobile), preserving the original 320×480 image proportions. Scene close-ups no longer contain an out-of-scale overlay.

Default briefs describe relationships; explicit conjunction chips are removed. Exact-word hints are opt-in, and repeated failed attempts do not auto-reveal answers. Independent source review checked the goals against stable chapter trays. 43 automated checks pass. This pass has no new Figma/browser capture; responsive rendering remains to be checked in the deployed game.

## Android screenshot review — 17 October

The supplied screenshot showed visually detached comma controls, repeated instructions consuming several lines, and a separate artwork link row. These have been addressed in code. Punctuation is attached to its preceding word with a non-wrapping anchor and an expanded 44px hit area. Mobile sentence type remains 18px with 1.8 line-height. Editing rules remain available in a modal, and the default dock explicitly explains tapping a comma. The artwork expander shares the dialogue row and has a 44px target and accessible name.

Figma reading/action samples: https://www.figma.com/design/euhY5VCNNIoJIHzOUuIqmj?node-id=15-2 . Reviewed the final screenshot of 320px and 390px note layouts and a 248px passage stress sample. DM Sans and Fraunces verified. No text or controls clip in these samples. They exclude artwork/browser chrome and do not model browser hit testing. 45 handler/engine/media checks pass; actual responsive browser rendering and finger hit accuracy still require deployed-device verification.

## Follow-up — smaller mobile reading type

At the user’s request, mobile sentence/passage text now uses 16px with 1.6 line-height. Instruction sizes and 44px action/touch targets are retained. The earlier Figma samples show the previous 18px sizing; this focused CSS follow-up has not been recaptured. 45 automated checks pass; deployed-device rendering remains pending.

## Connected progressive village

Replaced the separate reward tiles with a single contiguous painted clearing and independent construction layers. The panorama appears before the case notes; case notes and learning details open on demand. Seven subtle landmark markers have 44px targets with nonoverlapping bounds at a 264px scene width. A persistent zoom/fit control enables native two-axis scrolling without page-wide horizontal overflow. The full scene stays at a 3:2 aspect ratio. Finishing-touch previews update the chapter reward scene. During play, See your build opens a preview without changing edits or hint status.

Five generated paintings and static partial/finished source-composition proofs were visually inspected. The proofs are not browser captures. Browser CSS masking, desktop/mobile layout and actual touch panning remain pending. Automated checks cover progress, recovery/save compatibility, bonus award persistence, target separation, controls and existing gameplay.

## Chapter 1 reader review

Desktop uses an illustration beside a compact reading panel; mobile stacks the illustration above the prose. Pages break at whole paragraphs (at most 85 words in this chapter), with 16px mobile prose, 44px controls and page counts. Dialogue retains the approved speech tags. Notebook work remains a separate screen and keeps the prior artwork/question/answers order. New scene paintings already contain the characters, so no duplicate rabbit sprite is overlaid.

Reading progress survives reloads and village visits. The storybook can replay reached scenes without changing edits or consuming hints. Tests use a DOM adapter and validate handlers/state only; actual desktop/mobile rendering, viewport height, keyboard focus and touch behavior still require browser verification.

## Compact notebook revision

The editing view now has one illustration and one notebook panel. The separate rabbit speech strip is removed, artwork enlargement sits at the top-right of the painting, and the supply indicator is a compact text row with a build link. The notebook contains the brief, sentence, tool tray, feedback, hint and check/continue control. Punctuation tabs have a contrasting paper fill and visible underline in addition to the existing 44px hit area. Sentence text remains 16px on mobile.

After a Chapter 1 solution, a brief narrative caption appears over the illustration and in the notebook feedback so it remains available near the continue control. The bell caption has a gentle pulse (disabled for reduced-motion preferences) and a sound-opt-in bell cue. Grammar explanations expand on demand. Character art remains static. Automated handler/state checks pass; physical-device rendering, overlap and touch QA remain pending.

## Chapter 1 supporting challenges

Short casework screens reuse the current scene art, with evidence and interaction in a separate paper panel. Mobile stacks the art above the task. Grammar editing uses individually tappable words and a 16px replacement input with a visible label; the corrected sentence appears after success. Choice buttons have pressed states, minimum 48px heights and textual feedback. Detective lead choice changes the opening observation but both paths provide all essential evidence. Input, route and partial selections persist across reload/village visits. Wrong answers preserve supplies and leave a clue option available. No success relies on colour, sound or a hidden object. Handler/state QA passes; actual screen-reader, keyboard and mobile layout testing remains pending.

## 18 October — stable desktop reading position (local)

Story reader, supporting casework and notebook now share an equal-column desktop grid with matching gutter, padding and 3:2 paintings. Illustration stays left and content stays right; mobile remains stacked. This is a source-level layout update. Browser rendering, tablet legibility and touch checks remain pending. Existing behavior suite: 71 passing checks; it does not validate rendered layout.


## Approved visual novel implementation — 20 October 2026

- Replaced Chapter 1 desktop/tablet columns with full-viewport paintings, translucent reading panels and opaque question panels. Tablet portrait uses a crop that keeps both rabbits visible. Reading text can be hidden.
- Kept readable type and 44px controls. Context, conclusions and supporting evidence occupy separate revisitable steps; hints and feedback replace the current panel rather than expanding it. Hidden steps are inert for keyboard navigation.
- Shared menus, rewards and dialogs turn pages. Progress moved into the header. The correction field responds to tablet visual-viewport changes without losing the typed answer to a redraw.
- Browser checked at 1440×900, 1366×768, 1024×768, 768×1024, 820×1180, 600×800 and 1024×600: no page overflow or off-screen controls in the exercised Chapter 1 states. Complete native-click playthroughs also passed at 1366×768, 768×1024 and 1024×600, including wrong-answer feedback, recovery, detective work and the village reward. Guide, secret collection, progress and storybook dialog checks passed. Desktop and portrait screenshots visually reviewed.
- 76 unit/handler checks pass. Browser tests cover Chromium; physical iPad/Safari and its software keyboard remain unverified. Phone layout remains stacked.
