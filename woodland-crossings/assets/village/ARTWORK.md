# Connected village artwork

The user approved a single finished panorama and requested gradual construction in the same scene. The built-in image_gen tool generated the approved image and four registered edits. All five paintings are bundled here as WebP, 1536 × 1024. No external image service is contacted by the game.

## Assets and source images

| Bundled asset | Source generation | Purpose |
| --- | --- | --- |
| complete.webp | exec-b2e356fe-632c-47cf-bfde-be976ddd7744.png | Approved completed village |
| empty.webp | exec-d9ae6c75-9341-4687-b5c8-c0c44f071845.png | Same clearing before the rewards are built |
| foundations.webp | exec-64beca70-d7a6-49c2-b06c-caf31b37d8ea.png | Footings, planting beds and platform supports |
| framework.webp | exec-a600c8cf-7e35-482e-a1f6-5301f163491b.png | Timber frames, young planting and bare lamp posts |
| roofing.webp | exec-96cf1051-04b9-4bd4-b15a-0a496caa9e00.png | Unfinished roofs, walls and unlit lanterns |

Source generations were created in /workspace/scratch/1ca0f6b69156/generated_images. Final project files are in /workspace/scratch/1ca0f6b69156/rabbit-reference/woodland-crossings/assets/village. WebP encoding uses Pillow at quality 87, method 6. Originals are retained.

Seven SVG masks select landmark footprints in the common 1536 × 1024 coordinate system. Trail-lamp areas are cut out of the other footprints, so path lighting can arrive separately. The masks are deterministic layout assets, not replacements for the generated paintings. Each landmark is layered independently over the empty clearing. The same scene therefore supports all combinations of earned buildings without generating a separate full image for every game save. Small selected finishing-touch ornaments are native SVG in village.js.

## Prompt set

### Completed concept

Illustration-story concept preview for a cosy, slightly eerie storybook rabbit mystery game. One beautiful contiguous, geographically coherent village panorama with all rewards built together on common terrain. Landscape 3:2, gently elevated three-quarter viewpoint with foreground, middle ground and background depth. Painterly gouache and luminous storybook illustration, fine soft fur, mossy wood, autumn textures, warm candlelight against plum-blue twilight. Six distinct connected landmarks: round-door burrow in a grassy rise; fern garden with bench, flowers and mushrooms; timber woodland workshop with open doorway and tools; lantern trail along winding paths and an intact footbridge; roofed treetop lookout with stairs; open gathering pavilion with communal table and bunting. Optional central stone fountain. Finishing touches of wildflowers, rounded mushrooms and lamps. Tiny mushroom ghost, witch-hat frog, detective owl and punctuation pumpkin as subordinate discoveries. Foreground Pip is a compact cream rabbit with bent ear, plum cape, rust scarf, satchel and brass lantern. Mara is a taller grey-brown rabbit in a moss-green coat holding an amber paper lantern. A kind badger may sit at the table. Continuous terrain, inviting rather than frightening, no UI, text, labels, numbers, separate islands, grid, panels, watermark or gore.

### Shared edit constraints

Precise-object-edit of the completed village. An aligned construction-stage asset, not a new composition. Exact same 1536 × 1024 camera, framing, terrain, stream, intact bridge, fences, large tree, mountains, sky, paths and foreground Pip and Mara with their handheld lamps. Preserve lighting style, palette and unchanged details. Changes remain inside construction footprints. No labels, panels, UI, blueprints or text. Each source is independently edited from the approved finished painting to preserve registration.

### Empty clearing edit

All six reward sites and fountain are absent before construction. The burrow is a grassy mound without openings or chimney, the garden is natural leaf ground without ornamental planting or bench, the tree has no lookout or stairs, the workshop and pavilion are empty clearings, and the fountain is ordinary paving. Remove built trail lamps, their direct glow and reflections, plus feast inhabitants and furnishing. Preserve paths, fences, bridge, distant lights, foreground rabbits and their handheld lamps. Warm autumn twilight with fireflies.

### Foundations edit

All sites are only at foundations stage. Burrow excavation with rough threshold and bricks, no door or windows. Dug garden beds and seedling ferns, no bench. A little timber bracing at the tree platform height, no cabin or stairs. Workshop perimeter foundation and stacked lumber, no walls or roof. Pavilion footings and stacked timbers, no posts or roof. Low path-post bases without lamps. Low circular fountain foundation without water or frog. Only foreground Pip and Mara remain as inhabitants.

### Framework edit

All sites at timber-frame stage, visibly unfinished. Rough wooden burrow arch and low stonework without finished door or glow. Young fern planting and bench frame. Tree platform, raw posts and partial stairs without roof or cabin. Workshop exposed wall posts and triangular rafters without cladding or roof tiles. Pavilion posts and trusses without roof, feast or inhabitants. Bare path posts with unlit brackets. Unfinished circular fountain basin. No extra inhabitants, decorative pumpkins or completed flower borders.

### Roofing edit

All sites at nearly-ready roof-and-walls stage. Burrow arch and windows fitted but dark, unfinished door and some stone gaps. Larger ferns, mostly assembled bench, pots and sparse beds. Lookout roof partly shingled, incomplete railing, fitted stairs and temporary scaffolding. Workshop walls clad, roof half-shingled, dark doors, bare bench and tidy scaffold. Pavilion partly roofed with basic bare table and benches. Installed trail lanterns unlit. Dry fountain with unfinished stone finial. No feast, decorative flowers or extra inhabitants. Foreground rabbits' lamps and distant village lights remain.

## Verification

Paintings were visually inspected. Offline static composites of a partial village and the fully built village were inspected for registration, footprint coverage and obvious seams. These proofs render the app's mask geometry against the bundled paintings, not a browser screenshot. No browser rendering or finger hit testing was performed in this environment. Modern browser CSS mask support, responsive zoom and actual touch panning still need deployed-device verification.
