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
