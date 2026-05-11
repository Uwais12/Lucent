# Audio Asset Brief — Lucent: Shards of the Shattered Sun

> **Production-ready brief for outsourced sound, music, and voice work.**
> Read alongside `design/00-design-pillars.md`, `design/03-world-and-theme.md`, `design/05-launch-scope.md`, and `research/games/art-audio-direction.md`.
> This document is the single source of truth for the launch audio package. Any deviation from the targets here requires written sign-off from the design lead.

---

## 0. Audience snapshot

This brief is written for three external collaborators:

1. **A single composer** (likely from SoundBetter or an ArtStation direct hire) handling all five music tracks plus mix masters.
2. **A sound designer** (Sonniss GameAudioGDC base; bespoke customization for signature cues) handling all fifty SFX plus FMOD authoring.
3. **A single female voice actor** plus a dialogue editor handling the launch narration package of thirty lines.

A separate freelancer (the FMOD integrator) wires everything into the Unity client. Section 6 is written for them.

Everything in this brief assumes the project art and tone commitments in `design/03-world-and-theme.md`: a hopeful, mythic, prismatic, crystalline fantasy world — the **last bright thing in a fading world**. Audio's job is to make that fantasy *felt*, not narrated.

---

## 1. Tonal pillars

Lucent's audio personality is **hopeful-mythic, crystalline, sparse-but-warm**. The world is dimming and the player carries the last light — every track and every cue should sound like that sentence. We lean on **sustained string beds** under **glassy harp and bell motifs**, with **breath-and-choir warmth** rather than brass-driven heroism; the prismatic palette of the art finds its sonic mirror in additive overtones, glass percussion, and gently detuned harmonics. Reference touchstones we will steer toward are **Hades** (Darren Korb's "Out of Tartarus" / "On the Coast"), **Hyper Light Drifter** (Disasterpeace's haze-and-pulse), **Tunic** (Lifeformed / Janice Kwan's elegiac woodwinds), **GRIS** (Berlinist's restrained piano + strings + voice), and **Solar Ash** (Disasterpeace's slow-rising synthetic awe). Reference points we will steer **away from** are **anime-rock energy**, **modern dubstep drops**, **brass-heavy military fantasy** (Total War / Two Steps From Hell), and **chiptune nostalgia**; the closest mood comparator we will avoid even though we love it is **Slay the Spire** — that game's audio is excellent but it is *not* what Lucent sounds like. Lucent should feel less like a battle and more like **walking into a cathedral that someone left a candle in for you**.

### Tonal "do / don't" matrix

| Dimension | Do | Don't |
|---|---|---|
| Rhythmic feel | Pulse-based, breath-paced, sub-90 BPM under combat | Four-on-the-floor club energy |
| Harmony | Modal (Aeolian, Dorian, Lydian); suspended chords; quartal voicings | Power-chord rock; major-minor pop progressions |
| Lead instruments | Harp, glass marimba, vibraphone, soft female choir, solo violin, low flute | Distorted guitar, lead synth saw, brass section, taiko ostinato |
| Percussion | Glass, wood, brushed snare, hand drums, breath-air rhythm | Big-room kicks, gated reverb 80s drums, full orchestral percussion |
| Texture | Additive shimmer, granular bell tails, gentle tape saturation | Modern sidechain pumping, bitcrushed FX, dubstep wobble |
| Voice | One warm, low-mid female narrator; sparse; not breathy | Multi-voice radio chatter; whispered ASMR; epic Latin choir |
| Emotional register | Grief touched with hope; "the dark forgets you now" | Triumphalism; horror; cute-cozy |

---

## 2. Music track list (5 at launch)

All five tracks are delivered as:

- **Stems** (one `.wav` per instrument family: strings, woodwinds, harp/keys, choir/voice, percussion, FX/atmos, sub/bass)
- **Stereo bounce** (final composer mix)
- **48 kHz / 24-bit `.wav`** masters; loop points marked sample-accurate; -18 LUFS integrated
- **FMOD-ready event session** (`.fspro` source if the budget allows; otherwise the layered stems plus a written cue sheet that the FMOD integrator can implement)

Each track has a **combat-intensity RTPC** that crossfades stems from a quiet baseline up through a percussion layer to a brass-light "crest" layer. RTPC values:

- `combat_intensity = 0.0`: ambient bed only (strings + harp + atmos)
- `combat_intensity = 0.4`: bed + glass percussion + soft choir pad
- `combat_intensity = 0.8`: bed + percussion + choir + accent woodwinds + sub
- `combat_intensity = 1.0`: full ensemble crest (still no metallic brass; warm horn + low choir only)

### Track 1 — `MUS_MENU_The_Lanterns_Are_Lit`

| Field | Value |
|---|---|
| **Use case** | Main menu, hub, hero select |
| **Structure** | 8 s intro → 90 s loop → 6 s outro tail |
| **Tempo / key** | 72 BPM, A Aeolian |
| **Instrumentation** | Harp arpeggio (lead), sustained string bed (low + high pad), glass marimba, soft female choir "ah", sub-fundamental drone, breath-air shaker |
| **Mood direction** | The menu after a battle that ended a long time ago. Patient, low-stakes, hopeful. Nothing should *demand* the player start a run; the music invites. |
| **Adaptive layers** | Single static layer; no combat RTPC. A secondary `menu_depth` RTPC (0 → 1) thickens choir when player drills into deeper screens (gacha, gear) so the menu feels reverent rather than transactional. |
| **Reference clip** | Hades — "Out of Tartarus" (Darren Korb). Also: GRIS opening menu cue. |
| **Loop technique** | Crossfade-loop on a 2-bar tail; no hard percussion hit at the loop seam. |

### Track 2 — `MUS_ARENA_A_Vale_and_Spire`

| Field | Value |
|---|---|
| **Use case** | In-run combat music, chapters 1–3 (The Vale of First Light, Sunken Cathedral, Frostspire) — the brighter half of the realm sequence |
| **Structure** | 4 s intro stinger → 120 s loop → 4 s outro |
| **Tempo / key** | 88 BPM, D Dorian |
| **Instrumentation** | Pizzicato strings (motion), low flute (melody), harp counterline, glass percussion (clave + tuned bowl), brushed kit at higher intensities, choir crest only at intensity = 1.0 |
| **Mood direction** | The player is *moving* through light. Forward-leaning, not aggressive. A traveler's pace, not a warrior's. |
| **Adaptive layers** | Combat-intensity RTPC drives 4 stem groups (see schema above). At 0.0 the track is almost ambient strings + harp; at 1.0 it lifts into full pizzicato + low choir + glass kit. |
| **Reference clip** | Tunic — "Grasslands" (Lifeformed). Also: Hyper Light Drifter — "The Last General." |
| **Loop technique** | Two 60 s halves with a half-bar fill at the seam so loop point is invisible. |

### Track 3 — `MUS_ARENA_B_Ember_and_Hollow`

| Field | Value |
|---|---|
| **Use case** | In-run combat music, chapters 4–6 (Emberforge, Glassroot Forest, Hollow Sky) — the darker half before the final realm |
| **Structure** | 4 s intro stinger → 120 s loop → 4 s outro |
| **Tempo / key** | 96 BPM, F# Phrygian (raised 6th — "Phrygian dominant" inflection) |
| **Instrumentation** | Low strings ostinato, bowed metal / bowl percussion, granular harp, low choir (no words), sub-pulse, occasional muted horn (warm, not brass-heavy) |
| **Mood direction** | The dark is bigger here. The music is still hopeful, but the player has to *carry* the hope into the room. Slightly more rhythmic urgency than Arena A. |
| **Adaptive layers** | Same RTPC schema. At 0.0 the track is a single sub-drone + bowl shimmer; at 1.0 the ostinato locks in with low choir and the muted horn arrives. |
| **Reference clip** | Solar Ash — "Starseed" (Disasterpeace). Also: Hyper Light Drifter — "Vignette: Beauty." |
| **Loop technique** | Single 120 s loop with internal A/B halves; intensity automation may switch which half is foregrounded. |

### Track 4 — `MUS_BOSS_The_Echo_Sings`

| Field | Value |
|---|---|
| **Use case** | All seven chapter bosses + the three recurring world bosses. Per-boss variation comes from the **boss intro stinger** (voice line + SFX), not from a per-boss track. |
| **Structure** | 6 s intro stinger (cue from voice line) → 75 s loop → 6 s phase-transition bridge → 75 s loop (phase 2 variation) → 4 s outro |
| **Tempo / key** | 104 BPM, B minor (modulates up a whole step at phase transition to C# minor) |
| **Instrumentation** | Full string section, low female choir (words = Latin-adjacent nonsense syllables, *not* real Latin, *not* English), glass percussion, hand drum, sub-pulse, accent woodwind, one warm horn for the crest. **No snare hits. No taiko.** |
| **Mood direction** | The boss is an Echo — something the realm *lost*, looping forever. The music should sound like grief that's still fighting. Beautiful and dangerous in equal measure. |
| **Adaptive layers** | Two RTPCs: `combat_intensity` (0–1) and `boss_phase` (0 / 1 / 2). Phase 0 = intro reveal. Phase 1 = active fight. Phase 2 = sub-50% HP, full crest, lifted by half-step. |
| **Reference clip** | Hades — "Good Riddance" (instrumental sections). Also: GRIS — "End Titles." Specifically *not*: any Bayonetta or Persona boss track. |
| **Loop technique** | Two distinct 75 s loops bridged by a transition cue triggered on phase change. |

### Track 5 — `MUS_VICTORY_The_Dark_Forgets_You`

| Field | Value |
|---|---|
| **Use case** | Run-clear / chapter-clear victory stinger; plays once, does not loop |
| **Structure** | 8 s rising bed → 4 s release → 4 s tail (total ~16 s) |
| **Tempo / key** | 72 BPM (drops back to the menu tempo), A major (the *only* fully major-key cue in the launch package) |
| **Instrumentation** | Harp, full strings, soft female choir on a single sustained "ah", solo violin lead for the final phrase |
| **Mood direction** | Earned warmth. The player has carried the light through one more room of the world. This is the only place we let ourselves sound *unambiguously* hopeful. Pair with the voice line `VO_VICTORY_01` ("The dark forgets you now.") |
| **Adaptive layers** | None. Single linear cue. Begin-on-room-clear, end naturally. |
| **Reference clip** | Hades — "Lament of Orpheus" final phrasing. Tunic — end-credits motif. |
| **Loop technique** | N/A — one-shot. |

### Music delivery checklist

- [ ] Stereo master `.wav` 48 kHz / 24-bit, -18 LUFS integrated, -1 dB TP ceiling
- [ ] Stem set (7 stem groups per track) at same spec, gain-matched to master
- [ ] Sample-accurate loop markers in `.wav` metadata
- [ ] Optional `.fspro` (FMOD Studio source) — preferred if vendor capability allows
- [ ] One-page cue sheet per track describing intended RTPC behavior
- [ ] Composer retains full copyright; Lucent receives perpetual, worldwide, royalty-free game-use license including marketing trailers and platform shorts

---

## 3. SFX list (50 at launch)

All SFX are routed through FMOD events. Each event has at least:

- 3 random-pitch variants on a ±2 semitone window (for any cue likely to play more than 5×/minute)
- A `size` RTPC (0–1) where applicable (enemy hurt, hit, death, roar) so big vs small variants share one event
- A `distance` attenuation curve (5 m near, 25 m far) for spatial cues
- Bus routing: `SFX/Combat`, `SFX/UI`, `SFX/Pickup`, `SFX/Player`, `SFX/Boss`

Targets in the table below are per-variant. "ms" = milliseconds total length including tail.

### 3.1 Combat (20)

| # | ID | Length (ms) | Key vibe | Reference | Layering notes |
|---|---|---|---|---|---|
| 1 | `SFX_BOW_DRAW` | 220 | Tight tension creak; warm string, no metallic squeak | Hades — Coronacht draw | Plays on hero idle-to-shoot transition; ducks under `BOW_LOOSE` |
| 2 | `SFX_BOW_LOOSE_01` | 180 | Soft whoof + airy whip; "light gone forward" | Tunic arrow loose | One of 5 variants random-picked; pairs with `SFX_BOW_DRAW` tail |
| 3 | `SFX_BOW_LOOSE_02` | 180 | Same family, slightly brighter highs | — | Variant pool, weighted equally |
| 4 | `SFX_BOW_LOOSE_03` | 180 | Same family, slightly darker low-mid body | — | Variant pool |
| 5 | `SFX_BOW_LOOSE_04` | 180 | Same family, faster transient | — | Variant pool |
| 6 | `SFX_BOW_LOOSE_05` | 180 | Same family, slight detune for a "crit-prep" feel | — | Variant pool; gets 1.5× spawn weight when crit chance ≥ 50% |
| 7 | `SFX_MULTISHOT_LOOSE` | 240 | Three loose layered with prismatic chime tail | HLD — burst shot | Combines with one base `SFX_BOW_LOOSE`; FMOD event triggers chime sub-event with stagger 0–30 ms |
| 8 | `SFX_HIT_FLESH` | 140 | Wet thud + breath puff (no gore) | GRIS — soft strike | `size` RTPC scales body weight; high-pass when `size < 0.3` |
| 9 | `SFX_HIT_ARMOR` | 160 | Bright glassy clack + metallic ring tail | Hades — armored hit | `size` RTPC scales tail length; never sounds "scrap-metal" |
| 10 | `SFX_HIT_SHIELD` | 200 | Glass bowl tap + low resonance | Tunic — shield deflect | Triggers parry visual on shielded enemies; ducks combat music briefly |
| 11 | `SFX_HIT_CRIT` | 260 | Bright additive chime + hit-flesh layer + sub-thump | Hades — critical hit | Layered FMOD event: pulls one `SFX_HIT_FLESH` + a fixed `crit_chime` + sub-thump sample |
| 12 | `SFX_ENEMY_HURT_01` | 220 | Small-creature whimper, breath-led | HLD — pup hurt | `size` RTPC; this one anchors `size < 0.4` |
| 13 | `SFX_ENEMY_HURT_02` | 280 | Mid-size grunt, throaty but not aggressive | — | Anchors `size` 0.4–0.7 |
| 14 | `SFX_ENEMY_HURT_03` | 360 | Large-creature low rumble + breath catch | — | Anchors `size > 0.7`; used for elite + recurring world bosses below the chapter-boss tier |
| 15 | `SFX_ENEMY_DEATH_01` | 420 | Small dissolve: bell-shimmer + ash-puff | HLD — death dissolve | Bound to "Dim creature dissolves into shards" VFX |
| 16 | `SFX_ENEMY_DEATH_02` | 520 | Mid dissolve: low note + glass break + breath release | — | Used for standard enemies |
| 17 | `SFX_ENEMY_DEATH_03` | 720 | Large dissolve: descending choir sigh + bowl resonance + sub-fall | GRIS — sad transition | Used for elites; chains into the loot-drop SFX with a 120 ms gap |
| 18 | `SFX_EXPLOSION` | 540 | Soft-bodied "whoom" + crystalline shatter highs | Solar Ash — burst | Body + highs split into two stems in FMOD; `size` RTPC scales body |
| 19 | `SFX_FREEZE` | 600 | Slowing reverb sweep + glass crystallize + held string note | Disasterpeace — freeze cue | Pairs with `SFX_HIT_FLESH` when the freezing arrow lands |
| 20 | `SFX_BURN_TICK` | 180 | Crackling ember + breath-warm tone, *not* fire-roar | Hades — burn tick | Loops up to 3 s at 360 ms intervals via FMOD parameter |
| — | `SFX_LIGHTNING_CRACKLE` | 280 | Glass arc + paper-rip crackle, dry tail | HLD — arc | Triggers on chain-lightning hops, slight pitch-up per hop |

> 20 entries. The last row reuses `#20`'s slot — there are exactly 20 combat SFX (5 loose variants count individually). Cross-check: bow-draw (1) + 5 loose variants (5) + multishot (1) + hit-flesh/armor/shield/crit (4) + 3 enemy-hurt (3) + 3 enemy-death (3) + explosion (1) + freeze (1) + burn (1) + lightning (1) = **20**.

### 3.2 UI (10)

| # | ID | Length (ms) | Key vibe | Reference | Layering notes |
|---|---|---|---|---|---|
| 21 | `SFX_UI_TAP` | 80 | Tiny wood tap + soft tone | Hades menu | Plays on every navigable button; pitch ±1 st random |
| 22 | `SFX_UI_CONFIRM` | 180 | Glass-tap + small bell rise | GRIS menu | For "accept / continue / claim" — never for purchase |
| 23 | `SFX_UI_CANCEL` | 160 | Reverse glass-tap, soft descent | — | For "back / decline" |
| 24 | `SFX_UI_SCREEN_IN` | 320 | Air whoosh + harp glissando in | Hades scene swipe | Plays when a screen pushes onto the stack |
| 25 | `SFX_UI_SCREEN_OUT` | 320 | Air whoosh + harp glissando out (reversed envelope) | — | Mirror of above |
| 26 | `SFX_UI_LEVELUP` | 900 | Choir "ah" rise + bell chime + sub-pulse | Hades — boon offered | Triggers ability-pick screen; ducks combat music to -8 dB |
| 27 | `SFX_UI_ACHIEVEMENT` | 700 | Three-note glass arpeggio rising | Tunic — discovery | For achievements / first-time unlocks |
| 28 | `SFX_UI_ERROR` | 220 | Soft buzz + low bell, *not* harsh | GRIS — wrong door | Never red-alert; we don't punish |
| 29 | `SFX_UI_BADGE_PING` | 140 | Tiny "ting" + sub-tap | iMessage-tier subtle | For notification dots, mailbox badges, daily-quest tick |
| 30 | `SFX_UI_PURCHASE_CONFIRM` | 540 | Coin-shimmer + warm choir "yes" + bell | Hades — store buy | Reserved for hard-currency purchases; *not* for free claims |

### 3.3 Pickup / progression (8)

| # | ID | Length (ms) | Key vibe | Reference | Layering notes |
|---|---|---|---|---|---|
| 31 | `SFX_PICKUP_GOLD` | 220 | Warm coin shimmer; 3 pitch variants stacked-when-rapid | Archero — coin | Auto-thins when ≥3 plays in 200 ms; otherwise fatigue |
| 32 | `SFX_PICKUP_GEM` | 280 | Higher, crystalline; "more rare" feel | Hades — diamond pickup | Always plays in full even when stacked |
| 33 | `SFX_PICKUP_XP_ORB` | 180 | Soft hum into bell tail | Hades — keepsake | Magnetized-pull start triggers a low whoosh; final absorb plays this cue |
| 34 | `SFX_CHEST_OPEN` | 1100 | Wood creak → glass cascade → choir release | Tunic chest | Triggers loot-cards reveal cue chain |
| 35 | `SFX_CARD_REVEAL_COMMON` | 320 | Single bell tap, dry | — | Ability-pick screen, common rarity |
| 36 | `SFX_CARD_REVEAL_RARE` | 440 | Two-note bell + light shimmer tail | — | Rare rarity |
| 37 | `SFX_CARD_REVEAL_EPIC` | 620 | Three-note arpeggio + choir touch + sub-pulse | Hades — epic boon | Epic / Legendary / Mythic — pitch shift +1 st per tier above Epic |
| 38 | `SFX_TIER_UP_SHIMMER` | 1400 | Long crystalline cascade + full choir rise | GRIS — color return | Plays on gear tier-up (Epic → Legendary), hero tier-up, talent threshold |

### 3.4 Player feedback (6)

| # | ID | Length (ms) | Key vibe | Reference | Layering notes |
|---|---|---|---|---|---|
| 39 | `SFX_LOW_HP_HEARTBEAT` | 900 (loop) | Slow heart-thud + breath, low-pass | HLD low HP | Loops while HP < 25%; FMOD `hp_pct` RTPC scales loudness |
| 40 | `SFX_FULL_HP_HEAL_SIGH` | 540 | Long warm breath out + bell tail | GRIS — restored | Triggers on full heal / new floor heal |
| 41 | `SFX_DODGE_WHOOSH` | 220 | Air-rush + small shimmer | Hades — dash | Plays on hero dash; pitch +1 st on i-frame variant |
| 42 | `SFX_INVULN_CHIME` | 320 | Glass chime + held bell, no decay until i-frames end | — | Loops as a long sustain; cross-fades with `SFX_DODGE_WHOOSH` |
| 43 | `SFX_HITSTOP_THUD` | 60 | Sub-thump only, no transient highs | Hades — hit-stop | Plays at every hit-stop frame freeze; designed to feel through speakers, not be "heard" |
| 44 | `SFX_SCREENSHAKE_WHOOMPH` | 80 | Deep sub-impulse | — | Plays in lockstep with screen-shake on crits and boss hits; do not stack with 43 — FMOD event picks one |

### 3.5 Boss / event (6)

| # | ID | Length (ms) | Key vibe | Reference | Layering notes |
|---|---|---|---|---|---|
| 45 | `SFX_BOSS_ROAR_01` | 1600 | Sunken-Cathedral Echo: drowned choir bellow, water rush tail | GRIS — sorrow boss | Triggers boss intro; pairs with `VO_BOSS_INTRO` line for chapter 2 |
| 46 | `SFX_BOSS_ROAR_02` | 1800 | Frostspire Echo: cracking ice + bowed glass low + breath roar | Solar Ash — colossus | Chapter 3 boss; pairs with chapter-3 boss intro line |
| 47 | `SFX_BOSS_ROAR_03` | 2000 | Long-Dusk Echo: deepest, slowest; sub-fall + reversed choir + held note | Disasterpeace — final | Chapter 7 boss (final); shorter `size`-scaled variants of 45–47 cover the other 4 chapter bosses and 3 recurring world bosses via FMOD pitch + EQ |
| 48 | `SFX_PHASE_TRANSITION` | 1200 | Rising bell + breath-in + sub-pulse + held note | Hades — phase 2 | Triggers `boss_phase` RTPC change in music; ducks SFX bus for 600 ms |
| 49 | `SFX_WAVE_INCOMING` | 540 | Low horn warm-note + drum hit pattern (3 hits) | Hades — wave incoming | Plays at survival-mode wave starts and at room mid-spawn waves |
| 50 | `SFX_VICTORY_FANFARE` | 1800 | Choir "ah" + harp cascade + held string note + bell release | GRIS — restoration | Pairs with `MUS_VICTORY` opening 4 s; voice line `VO_VICTORY_01` overlaps at +600 ms |

### SFX category totals (cross-check)

| Category | Count | IDs |
|---|---|---|
| Combat | 20 | 1–20 |
| UI | 10 | 21–30 |
| Pickup / progression | 8 | 31–38 |
| Player feedback | 6 | 39–44 |
| Boss / event | 6 | 45–50 |
| **Total** | **50** | — |

### SFX delivery spec

- Source files: `.wav` 48 kHz / 24-bit, mono for spatial cues, stereo for UI / music-adjacent
- Mastered: -12 LUFS peak, -1 dB TP, no inter-sample peaks above -1 dB
- Naming: `SFX_<category>_<name>_<variant>.wav` (lowercase except `SFX`)
- FMOD authoring: one event per logical cue (variants live inside the event as a multi-instrument with random selection)
- Compressed runtime: AAC 128 kbps for delivery; lossless source retained in repo at `art-source/audio/sfx/`

---

## 4. Voice line list (30 at launch)

**Single female narrator.** Same voice across all realms, all chapters, all event banners — this is a brand commitment. See section 5 for casting brief.

All lines are delivered as:

- `.wav` 48 kHz / 24-bit mono, -16 LUFS integrated, -1 dB TP
- Dialogue-edited: breath cleanup, de-essed, no obvious mouth clicks, soft-knee compression
- One alt take per line (designer picks the keeper)
- Per-line FMOD event with a `voice_priority` parameter; voice bus ducks SFX -6 dB and music -8 dB while a line plays

### 4.1 Voice line table

| Line ID | Text | Context (trigger) | Tone direction | Length target (s) |
|---|---|---|---|---|
| `VO_INTRO_01` | "Look. The light is yours to carry." | Cold-open hook on first launch; also plays after a "Welcome back" gap of 14+ days | Warm, low, intimate. Like she's leaning toward the player. Not a herald. | 2.6 |
| `VO_BIOME_01` | "They left the lanterns burning." | Entering The Vale of First Light | Quiet, almost a remembered line | 2.2 |
| `VO_BIOME_02` | "The prayers are still echoing." | Entering Sunken Cathedral | Reverent, slightly distant | 2.2 |
| `VO_BIOME_03` | "She climbed to call the sun back." | Entering Frostspire | Gentle awe; "she" should sound like grief | 2.4 |
| `VO_BIOME_04` | "The forges were never hot." | Entering Emberforge | Dry, knowing; almost a riddle | 2.0 |
| `VO_BIOME_05` | "Sap turned to glass. Glass remembers." | Entering Glassroot Forest | Soft and considered | 2.6 |
| `VO_BIOME_06` | "What falls from here lands as a wound." | Entering Hollow Sky | Quiet warning; not theatrical | 2.6 |
| `VO_BIOME_07` | "It can be ended. Walk in." | Entering The Long Dusk (final realm) | Firm. The grief is older here. | 2.4 |
| `VO_BOSS_INTRO_01` | "An Echo of the Lantern-Keeper." | Vale chapter boss reveal | Recognition, soft grief | 2.2 |
| `VO_BOSS_INTRO_02` | "She was the choir." | Sunken Cathedral chapter boss | Tender; not dramatic | 1.6 |
| `VO_BOSS_INTRO_03` | "The climber never came down." | Frostspire chapter boss | Quiet finality | 2.2 |
| `VO_BOSS_INTRO_04` | "The forgemaster, still working." | Emberforge chapter boss | Wry sadness | 2.0 |
| `VO_BOSS_INTRO_05` | "The first tree. Still listening." | Glassroot Forest chapter boss | Hushed, almost wonder | 2.2 |
| `VO_BOSS_INTRO_06` | "What fell from the sky has teeth." | Hollow Sky chapter boss | Slight edge; closer to warning | 2.2 |
| `VO_BOSS_INTRO_07` | "This is what the Dim wanted you to find." | The Long Dusk final boss | The most direct line; quiet, certain | 2.8 |
| `VO_VICTORY_01` | "The dark forgets you now." | Run / chapter / boss-clear victory stinger | Earned warmth; small smile in the voice | 2.0 |
| `VO_TUTORIAL_01` | "Move." | First tutorial prompt | Soft, almost coaxing | 0.6 |
| `VO_TUTORIAL_02` | "Stop to shoot." | Tutorial step 2 | Same warmth | 0.9 |
| `VO_TUTORIAL_03` | "Through the door." | Tutorial step 3 (first room cleared) | Encouraging | 1.0 |
| `VO_TUTORIAL_04` | "You're a Lucent." | Tutorial step 4 (after first level-up) | Quiet pride; the most important line in the tutorial | 1.4 |
| `VO_DEATH_01` | "Try once more." | Run-end on death (variant A) | Patient | 1.0 |
| `VO_DEATH_02` | "The light will wait." | Run-end on death (variant B) | Steady | 1.2 |
| `VO_DEATH_03` | "Again." | Run-end on death (variant C) | Soft, single word | 0.6 |
| `VO_DEATH_04` | "You came back. Good." | Run-end on death (variant D); rare; weighted lower | Warm | 1.6 |
| `VO_RETURNER_D3` | "Three days. The lanterns held." | First login after 3+ day absence | Soft welcome, no guilt | 2.0 |
| `VO_RETURNER_D7` | "A week. We thought of you." | First login after 7+ day absence | Warmer; "we" is intentional and ambiguous | 2.2 |
| `VO_EVENT_BANNER` | "A new bearer steps out of the dark." | New gacha banner launches | Slightly more theatrical; still restrained | 2.4 |
| `VO_EVENT_TOURNAMENT` | "The arena opens. Carry your light well." | PvP tournament start | A little more public-facing | 2.6 |
| `VO_EVENT_ANNIVERSARY` | "A year of light. Thank you for carrying it." | Annual anniversary event | The one line where she addresses the player directly; quiet gratitude | 2.8 |
| `VO_EVENT_COLLAB` | "Something old has crossed into Iridian." | Collab event launch | Curious; gentle hook | 2.4 |

### 4.2 Voice line category totals (cross-check)

| Category | Count | Line IDs |
|---|---|---|
| Cold-open hook | 1 | `VO_INTRO_01` |
| Biome stingers | 7 | `VO_BIOME_01` … `_07` |
| Chapter-boss intros | 7 | `VO_BOSS_INTRO_01` … `_07` |
| Victory tagline | 1 | `VO_VICTORY_01` |
| Tutorial cues | 4 | `VO_TUTORIAL_01` … `_04` |
| Death cues | 4 | `VO_DEATH_01` … `_04` |
| Returner cues | 2 | `VO_RETURNER_D3`, `VO_RETURNER_D7` |
| Event launch stingers | 4 | `VO_EVENT_BANNER`, `_TOURNAMENT`, `_ANNIVERSARY`, `_COLLAB` |
| **Total** | **30** | — |

---

## 5. Casting brief — voice actor

### Role

The Lucent narrator is the **only human voice in the game**. She is not a character with a name; she is closer to a memory, or a presence the player carries. She appears at the beginning of the run, at the threshold of each realm, at the moment of each boss, at the end of every run — won or lost — and on the player's return after long absences. She is the player's quietest constant.

### Casting parameters

| Field | Value |
|---|---|
| **Apparent age** | 28–45 |
| **Voice register** | Low-mid; chest-resonant; warm |
| **Accent** | Neutral / mid-Atlantic preferred; soft RP English acceptable; no strongly regional US, UK, or AU accent |
| **Pacing** | Unhurried. Comfortable with pauses. Trusts silence. |
| **Energy** | Warm-but-firm. A mentor who has lost something and is still here. Not breathy. Not aggressive. Not theatrical. |
| **What to avoid** | Pixie / breathy / ASMR; gravel / smoker-rasp; "epic trailer narrator" gravitas; cheerleader / hype-host energy; anime-dub theatricality |
| **Reference voice talents** | **Jennifer Hale** in her softer roles (FemShep's quiet moments, *Spider-Man: The Animated Series* Mary Jane). **Erika Ishii** in narrator mode (Critical Role narration, calm Apex stings). **Britne Oldford** in *The Umbrella Academy* (warm, measured, slightly weighted). Also acceptable directional reference: **Ashly Burch**'s quieter Aloy lines. |
| **Studio requirements** | Treated booth; -55 dB noise floor or better; consistent across sessions; AKG C414 / Neumann U87 / Sennheiser MKH 416 or comparable; raw 24-bit / 48 kHz |

### Audition sample script (3 lines)

Audition tape should include all three lines, in order, with a 1-second silence between each:

1. *"Look. The light is yours to carry."*
2. *"The dark forgets you now."*
3. *"Three days. The lanterns held."*

Direction notes for the audition:

- **Line 1** is the first thing the player ever hears. The voice should sound like a hand resting on a shoulder. Quiet, but present. Not whispered.
- **Line 2** is the victory line. It is the only place we let the voice smile. Just a little.
- **Line 3** is the returner line. The hardest of the three. The voice should welcome the player without making them feel guilty for being away.

Submit one take "as written" and one alt take. Length per line: 2.0–3.0 seconds. Format: `.wav` 48 kHz / 24-bit, no processing.

### Engagement terms

- **Scope:** 30 lines at launch, 5–10 lines per major content drop (6–8 week cadence).
- **Buyout vs residual:** Flat buyout for game-use + marketing-use license, perpetual, worldwide, all platforms. AI-voice clauses: **no AI training, no AI synthesis use of recorded material**, contractually.
- **Booking:** Expect one initial session (90 min) for the launch 30 lines, plus 30 min sessions for cadence updates.
- **Backup option:** Identify a second voice talent in the same casting register at engagement time, in case the primary is unavailable for a future cadence drop. Their voice should be close enough that an A/B blind test would not flag the difference.

---

## 6. Audio implementation map

This section is written for the FMOD integrator.

### 6.1 Bus architecture

```
Master (-1 dB TP limiter)
├── Music (-18 LUFS integrated target)
│   ├── Menu
│   ├── Arena_A
│   ├── Arena_B
│   ├── Boss
│   └── Victory
├── SFX (-12 LUFS peak target)
│   ├── Combat
│   ├── UI
│   ├── Pickup
│   ├── Player
│   └── Boss
└── Voice (-16 LUFS integrated target)
```

### 6.2 RTPCs (global parameters)

| Parameter | Range | Drives |
|---|---|---|
| `combat_intensity` | 0.0 – 1.0 | Stem layering on all arena + boss tracks; updated by gameplay code (kill rate, on-screen enemy count, player HP) |
| `boss_phase` | 0 / 1 / 2 (discrete) | Boss music phase switching; triggers `SFX_PHASE_TRANSITION` |
| `scene` | enum: menu / vale / cathedral / spire / forge / forest / sky / dusk / boss / victory | Music event selection |
| `hp_pct` | 0.0 – 1.0 | `SFX_LOW_HP_HEARTBEAT` loudness, music low-pass at < 0.25 |
| `size` | 0.0 – 1.0 | Per-event RTPC on hit/hurt/death/roar events for big-vs-small variants |
| `voice_priority` | 0 / 1 / 2 (discrete) | When ≥ 1, music ducks -8 dB and SFX duck -6 dB |
| `menu_depth` | 0.0 – 1.0 | Menu music depth (drills into deeper screens thicken the choir layer) |

### 6.3 Voice ducking

When any voice line plays, the FMOD voice bus emits a sidechain signal that ducks:

- Music bus: -8 dB with 80 ms attack, 400 ms release
- SFX bus: -6 dB with 60 ms attack, 300 ms release

Voice line FMOD events set `voice_priority = 2` for narrator lines, `1` for in-run UI prompts that contain narrator audio. Multiple voice events stack — only the highest-priority line plays at any moment.

### 6.4 Mix targets

| Target | Value | Notes |
|---|---|---|
| Master output | -1 dB TP, brickwall limit | iOS App Store loudness-friendly |
| Music bus | -18 LUFS integrated | Measured per track at full crest |
| SFX bus | -12 LUFS peak | Per-cue peaks normalized |
| Voice bus | -16 LUFS integrated | Per-line normalized; consistent across sessions |
| Inter-sample peaks | ≤ -1 dB TP | Check with TruePeak meter on every export |

### 6.5 Mobile compression

| Asset family | Format | Bitrate | Notes |
|---|---|---|---|
| Music | AAC | 192 kbps stereo | Source `.wav` retained in repo; runtime is AAC |
| SFX | AAC | 128 kbps mono / stereo (per cue) | UI cues under 200 ms can drop to 96 kbps |
| Voice | AAC | 128 kbps mono | Source `.wav` retained |

Build-target size budget for the entire audio pack at launch: **≤ 90 MB on disk**. (Music ~45 MB, SFX ~25 MB, Voice ~5 MB, FMOD banks overhead ~15 MB.)

### 6.6 FMOD event conventions

- One `.fspro` project, banked into:
  - `Master.bank` (always loaded)
  - `Music.bank` (loaded on scene transition)
  - `Combat.bank` (loaded with combat scenes)
  - `UI.bank` (always loaded)
  - `Voice.bank` (always loaded)
- Events follow `event:/<bus>/<id>` path naming.
- Random pitch / volume on multi-shot cues lives in the event, not in code.
- Spatial cues use FMOD 3D attenuation curves; UI / Music / Voice are 2D.
- Snapshots:
  - `Snapshot_PauseMenu` (music to -12 dB, SFX to -∞, voice off)
  - `Snapshot_LowHP` (music EQ low-pass at 800 Hz)
  - `Snapshot_BossPhase2` (music +1 dB, SFX +1 dB)

---

## 7. Budget & vendors

Per `research/games/art-audio-direction.md` §6 (composer / SFX outsourcing) and §8 (recommendation).

### 7.1 Line-item budget

| Item | Vendor | Range (USD) |
|---|---|---|
| SFX base library | Sonniss GameAudioGDC (free, lifetime-licensed) + Splice subscription + Soundly aggregator | **$0 – $500** |
| Music (5 tracks, all stems) | Single SoundBetter composer, fixed-price flat | **$3,000 – $5,000** |
| Voice actor (30 lines + 1 session, buyout) + dialogue editor | Single talent + editor (typically the talent's preferred or a small post house) | **$800 – $1,800** |
| FMOD integration pass | Freelance FMOD integrator (one-pass authoring, sidechain setup, bus calibration, mobile build verification) | **$1,500 – $3,000** |
| **Launch audio total** | — | **$5,300 – $10,300** |

### 7.2 Vendor selection criteria

- **Composer**: Must show prior published-game work in the target tonal space (warm-mythic, not cinematic-epic). Ask to hear an unreleased work-for-hire stem set, not just final masters. Confirm willingness to deliver an FMOD-ready event session (preferred) or a layered stem set with cue sheet (acceptable).
- **Sound designer**: Should be comfortable working from Sonniss GameAudioGDC base material and customizing rather than authoring from raw recordings; that's the budget-efficient path. Must demo at least one mobile shipped title.
- **Voice actor**: See section 5. Must have a treated home booth — studio rental costs are not in the budget.
- **FMOD integrator**: FMOD-certified or equivalent shipped-title experience. Should produce a written hand-off doc (event list, RTPC list, bus map) at the end of the engagement.

### 7.3 What is *not* in the budget

- Localized voice (en-only at launch). If we localize the narrator to JA / KR / ZH-Hans within the first 6 months, budget +$2,400–$5,400 across the three languages.
- Custom recorded foley sessions. We rely on libraries.
- Adaptive-music R&D beyond the RTPC schema in section 2.
- A second voice talent (the "answering" voice). If post-launch design adds a second narrator (e.g., a younger character), budget separately.

---

## 8. Cadence — post-launch

Per `design/01-core-loop-spec.md` §8 (content cadence) and `research/games/art-audio-direction.md` §8.

### 8.1 Per-update audio drop

Every 6–8 weeks, the major content update ships:

- **+1 music track**, by the same anchor composer to preserve tonal consistency. Track use case varies: alternate arena, alternate boss for a new chapter, special-event track, or seasonal menu variant.
- **+5 SFX** customized to the new content beat. Examples: new ability VFX SFX, new boss roar variant, new event UI cue.
- **+5–10 voice lines** when a new chapter, new event, or new returner-window beat ships. The 6-month rolling voice budget should target ~30 additional lines.

### 8.2 Cadence budget

| Cost head | Per update | Annualized (8 updates/yr) |
|---|---|---|
| Music (1 track) | $600 – $1,000 | $4,800 – $8,000 |
| SFX (5 cues + FMOD authoring) | $200 – $500 | $1,600 – $4,000 |
| Voice (5–10 lines + edit) | $200 – $500 | $1,600 – $4,000 |
| FMOD integration touch-up | $200 – $400 | $1,600 – $3,200 |
| **Per update total** | **$1,200 – $2,400** | **$9,600 – $19,200** |

### 8.3 Cadence governance

- The anchor composer is offered an annual retainer at the start of LiveOps (12 tracks/yr at a flat blended rate) — this both locks tonal consistency and reduces per-track negotiation overhead.
- The voice actor is offered a 12-month renewal with a minimum-engagement clause (≥ 30 additional lines guaranteed) — locks her availability and protects against scheduling drift.
- Every cadence drop runs through a 1-page audio review: tonal fit (against this brief), mix targets (LUFS / TP), bank size (against the 90 MB total budget), and FMOD event hygiene (no orphan events, no broken parameter links). The audio review is owned by the design lead; sign-off blocks the content release.

### 8.4 Quality bar — non-negotiables across cadence

- Single narrator voice continues across all post-launch content. No second voice without explicit design-lead approval.
- No brass-heavy or rock-instrumented tracks introduced post-launch. Tonal pillars in section 1 are permanent.
- No SFX cue under 60 ms (psychoacoustic floor) shipped without designer review — too-short cues mask through speaker lag on iOS.
- Every new voice line is FMOD-integrated with the same voice-ducking sidechain as launch.

---

## Appendix A — Reference clip index

The composer and sound designer should listen to this set as a single playlist before kickoff.

| # | Source | Track | Why we picked it |
|---|---|---|---|
| 1 | Hades (Darren Korb) | "Out of Tartarus" | Menu mood — patient, warm, restrained heroism |
| 2 | Hades (Darren Korb) | "Good Riddance" (instrumental sections) | Boss music feel — beautiful and dangerous |
| 3 | Hyper Light Drifter (Disasterpeace) | "The Last General" | Arena pulse + haze; minor-modal motion without rock energy |
| 4 | Hyper Light Drifter (Disasterpeace) | "Vignette: Beauty" | Sparse-but-warm; texture-led, not melody-led |
| 5 | Tunic (Lifeformed / Janice Kwan) | "Grasslands" | Arena-A reference; pizzicato + flute |
| 6 | Tunic (Lifeformed / Janice Kwan) | End-credits motif | Victory phrasing — earned warmth |
| 7 | GRIS (Berlinist) | "End Titles" | Choir + piano restraint; *the* tonal anchor |
| 8 | GRIS (Berlinist) | Opening menu cue | Menu reverence |
| 9 | Solar Ash (Disasterpeace) | "Starseed" | Slow-rising synthetic awe for Arena B |
| 10 | Solar Ash (Disasterpeace) | Colossus encounter cue | Boss roar pacing reference |

---

## Appendix B — Cross-document anchors

| Reference | What it locks |
|---|---|
| `design/00-design-pillars.md` Pillar 8 | Audio cues back every visual telegraph; mobile-portrait readability is sacred |
| `design/03-world-and-theme.md` "Audio direction commitments" | 5 tracks, 50 SFX, 1 narrator at launch; FMOD runtime; adaptive music via RTPC |
| `design/05-launch-scope.md` row 27–29 | Content counts: 5 music / 50 SFX / 1 narrator with ~30 lines |
| `research/games/art-audio-direction.md` §6 | Tool stack (FMOD), SFX inventory baseline, composer market rates, library sources |
| `research/games/art-audio-direction.md` §8 | Cadence numbers: +1 track, +5–10 SFX per 6–8-week update |

---

*End of brief. Sign-off required from design lead before vendor engagement begins.*
