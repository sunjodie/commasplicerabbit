# Background music

- Track: 秋夜オルゴール
- Creator displayed on the supplied public page: Jodie Sun
- User-supplied source: https://www.mureka.ai/song-detail/Aewi4tAvoYviB9sT3od2oN?is_from_share=1
- Source MP3: https://static-cos.mureka.ai/cos-prod/song/audio/20261017/music_166857908813827_UAL7n3L2XMxJMZ4bpXfh76_phtcun.mp3
- Bundled file: autumn-night-v2.mp3

Retrieved the playback MP3 referenced in the public share page's initial state. Encoded locally with ffmpeg/libmp3lame at 96 kbit/s, 44.1 kHz; duration 166.64 seconds, 1,999,979 bytes. No musical edits were made. Playback uses the bundled file, so the game does not fetch Mureka pages or use an external API.

Music starts only after Sound is enabled and the calm track loops at a target volume of 18%. The Sound control no longer plays a confirmation chime. Hidden tabs pause playback; return resumes only if the student left sound enabled. Failed playback resets the control and allows a manual retry. The track is credited in Save status.

Replaced with the user’s second recording on 17 October 2026. The title is unchanged, but the source audio differs. A new bundled filename avoids stale audio caches.

## Short tension cue (18 October 2026)

- User-supplied source: https://www.mureka.ai/song-detail/8twvGFHBmzE98GQsPdY3xJ?is_from_share=1
- Creator displayed in the public page state: Jodie Sun; title: 秋夜オルゴール.
- Source MP3: https://static-cos.mureka.ai/cos-prod/song/audio/20261017/5f076e9b-b8f1-498d-99e0-35b38bdf2a8a.mp3
- Source duration: 60.03 seconds. The user identifies this recording as incomplete.
- Bundled file: midnight-tension-cue.mp3; 60 seconds, MP3 96 kbit/s, 44.1 kHz. Added a two-second opening fade and six-second ending fade. No continuation has been composed, and no seamless loop is claimed. Listening verification is pending.

## Chapter 1 mood map (20 October 2026)

| Scene | Music |
| --- | --- |
| Fair closing | Original warm music, looping |
| Upstairs light | Short tension cue, once |
| Fireside memory | Current track softened to 7.5%, without switching |
| Mill lane and porch | Tension cue, once across both scenes |
| Empty mill | Continue the cue; no restart between pages/tasks |
| Home, village, rewards | Original warm music |

The incomplete tension recording keeps its existing two-second opening and six-second closing fades. After it finishes, tense scenes stay silent instead of returning to warm music. There is no fabricated continuation or loop. Re-entering suspense resumes the cue at its existing position. Once exhausted, it does not restart until a fresh game. Both tracks remain opt-in, pause in hidden tabs and share the Sound control. Storybook replay follows the scene’s mood; closing it restores the active scene. The Chapter 1 ending has no bell sound because the approved story ends before the bell rings.


## Transition refinement (20 October 2026)

Track changes use a 2.4-second cosine-eased crossfade; the outgoing player keeps playing until inaudible. The fireside memory lowers whichever track is already playing instead of switching tracks twice. Track cursors survive revisits. The incomplete tense cue is not looped or restarted after completion; suspense then remains silent. Muting or hiding the tab pauses both players immediately. Returning to the tab fades the active track in. A fresh game resets playback positions and cue availability. Deterministic tests cover intermediate volumes, rapid mood changes, late playback promises, mute/visibility and cue completion. Actual listening verification remains pending.

## Page-turn effect (20 October 2026)

User-supplied `oxidvideos-page-flip-1-178322.mp3`, bundled unchanged as `page-flip.mp3` (2.61 seconds). Used at 22% player volume for story/storybook page controls, shared page arrows and notebook return controls. Mouse, touch and keyboard-generated clicks share one trigger. Answer selection, answer checking and ordinary navigation do not trigger it. The existing Sound opt-in and hidden-tab pause apply. One reused player prevents overlapping rustles; turns within 140ms are suppressed. Playback failure is silent and does not affect progression or music.

## Default sound (20 October 2026)

New visitors see Sound on. Playback starts with their first pointer/key interaction, within the browser’s audio permission gesture. Turning Sound off pauses music/effects and remembers that choice locally across visits. Sound can be enabled again with the same control. Hidden-tab pauses remain in force.

## Frog discovery effect (20 October 2026)

User-supplied `freesound_community-frog_quak-81741.mp3`, bundled unchanged as `frog-croak.mp3` (1.41 seconds). Plays at 24% player volume only when a frog in a scene is clicked, including a previously found frog. Opening its fieldbook tidbit is silent. No ambient croaks disclose hidden positions. The shared Sound control and hidden-tab pause apply; rapid calls within 400ms are suppressed and a single player prevents overlapping croaks. Playback rejection never blocks collection.
