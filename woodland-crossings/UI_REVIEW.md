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
