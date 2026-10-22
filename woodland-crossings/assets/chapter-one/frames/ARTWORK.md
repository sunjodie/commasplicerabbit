# Chapter 1 frame illustrations

52 original illustrated frames: 44 reading beats, five notebook scenes and three supporting challenges. Generated with the built-in image generator using the existing Chapter 1 paintings as style and character references. Thirteen 1536 × 1024 atlases contain four 768 × 512 landscape paintings each. WebP encoding totals approximately 4.5 MB. The renderer displays one cell at a time and preloads nearby frames.

## Prompts and provenance

The shared generation prompt is in `prompt-template.txt`. `plan.json` records each passage and its associated frame; sheets follow that ordering, top-left, top-right, bottom-left, bottom-right. `source-map.json` records the retained original generation filenames. The originals are retained outside the deployment assets.

Revision instructions corrected the following: keep present-time lantern hidden and unlit until entry; keep the girls in the square until their walk begins; never identify the window figure; use an enclosed cottage stove; extinguish the upper window after the light vanishes; omit literal evidence closeups including cloth, stitching, shavings and the empty bell hook; show reactions or sheltered conversations instead. Notebook compositions contain no readable writing. Sheet 11 depicts lighting, entry, looking upward and reacting to the sound; sheet 12 uses outdoor notebook compositions after each preceding passage.

## Integration

`frame-art.js` maps responsive text chunks to narrative source offsets without changing approved prose or pagination. Different desktop/tablet word budgets may omit some small-screen beats. Storybook replay and artwork views use the same frame mapping. Source-cell geometry prevents adjacent paintings appearing in portrait crops. The existing scene illustration remains a loading fallback. Frog perches are authored on selected frames; other frames have none. Uncollected frogs remain available in Woodland secrets.

## Review

All sheets were inspected for mood and evidence spoilers. Unit checks cover mapping, assets and crops. Browser checks cover all 52 frames at desktop and tablet dimensions, plus the complete Chapter 1 progression and readable hint/reward palettes. Physical device and Safari checks remain pending.

## Ear anatomy correction

Re-edited Poppy's ear silhouettes with the built-in image generator after duplicated lobes were reported. The exact surgical edit prompt is saved in `ear-correction-prompt.txt`; retained source filenames are recorded in `source-map.json`. `anatomy-review.json` records accepted sheets and discarded revisions. The approved paintings retain exactly two anatomical ears per rabbit; profile views may obscure an ear. Asset URL revisions refresh browser caches.
