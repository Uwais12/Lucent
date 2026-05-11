# Boss Roster — Lucent: Shards of the Shattered Sun

> **Scope.** 7 chapter bosses (one per realm) + 3 recurring world bosses (weekly / guild raids / events) + 1 Sky Tower capstone at floors 50 / 100 / 150. Every boss respects Pillar 8 (portrait readability) and uses the shared telegraph language: red = damage, yellow = warning, blue = projectile path; shapes are circles, cones, rectangles, rings only.
>
> **Foundational templates** (per `research/games/enemies-and-bosses.md` §8.3): **Brute / Conductor / Architect / Mother / Engine**. Every chapter boss is one template or a clearly stated hybrid of two. Each chapter boss is a **3-phase, ~90s fight**, HP-gated at **66%** and **33%**. Each phase adds **exactly one new question** the player must learn — no phase introduces more than one new attack or behavior.

---

## Index

1. The Lanternwight — Vale of First Light (Brute)
2. The Tide-Echo — Sunken Cathedral (Conductor)
3. Aurelith, the Hollow Choir — Frostspire (Architect)
4. The Anvilfather — Emberforge (Brute × Engine)
5. Prismfen, the Glassroot Mother — Glassroot Forest (Mother)
6. The Star-Wound — Hollow Sky (Conductor × Architect)
7. The Long Dusk Itself — The Long Dusk (Engine)
8. World boss — The Tessellate (Conductor, weekly)
9. World boss — Sothren, the Echoing Knight (Brute, guild raid)
10. World boss — The Memory Bloom (Mother × Architect, weekly)
11. Sky Tower capstone — The Compound (floors 50 / 100 / 150)
12. Readability checklist (sign-off contract)
13. Boss difficulty curve (chapters 1→7)

---

# Chapter Bosses

## 1. The Lanternwight

- **Codename / display / title:** `BOSS_VALE_LANTERNWIGHT` / The Lanternwight / Last Watchman of the Vale
- **Realm:** The Vale of First Light (Ch. 1) — **Template: Brute** (textbook; teaches the language)

**Lore stinger.** *He was the village lampkeeper. When the Dim came, he kept lighting the lamps anyway — and never stopped.*

**Visual key.** A hulking armored figure carrying a six-foot iron lantern on a pole. Portrait silhouette = **two stacked rectangles** (wide body, lantern offset high right), pale-gold lantern is the only warm light. Palette: rusted iron, oxidized bronze, lavender Dim leaking from joints.

### Phases

| Phase | HP gate | New question |
|---|---|---|
| 1 | 100 → 66% | Read a wind-up, dodge perpendicular. |
| 2 | 66 → 33% | The lantern is a second AoE source on a different rhythm. |
| 3 | 33 → 0% | Manage persistent floor hazard while reading the same two threats. |

| Phase | Attack | Telegraph | Wind-up | Damage | Counter-play |
|---|---|---|---|---|---|
| 1 | **Iron Stride** (3-step dash) | Blue line along dash path | 0.8s | 35% HP | Sidestep 1 body-width perpendicular. |
| 1 | **Lantern Slam** | Red circle under boss, ~1.4 widths | 0.9s | 45% HP | Walk out; doesn't track. |
| 2 (+1) | **Hanging Light** (lantern drops AoE on boss's *previous* position) | Pulsing yellow ring above lantern → red circle on ground 0.4s later | 1.0s total | 40% HP | Don't stand where the boss *was*. |
| 3 (+1) | **Embered Footprints** (each dash leaves lingering puddle, 6s) | Puddle inherits dash line | passive | 12% HP/s | Plan dashes; don't get cornered. |

**Arena.** Square stone courtyard, ~8×8 grid units, four broken corner lanterns (decorative). No moving hazards before Phase 3; by Phase 3, ~25% of floor is lingering puddle.

**Music cue.** Solo cello pulse over low string bed. Phase 2 adds a struck bell; Phase 3 inverts the lantern motif into minor. **Audio brief:** `MUS_BOSS_VALE_LANTERNWIGHT_3LAYER`.

**Signature screenshot moment.** Phase 3 reveal: boss striding forward, four glowing footprint puddles trailing in a curve, indigo-glowing hero silhouetted between two of them. **App Store frame 2 candidate.**

**Tower scaling.** Iron Stride 3 → 4 → 5 dashes by floors 25/50/75. Lantern Slam gains a second concentric ring after floor 50. Embered Footprints appear in Phase 1 from floor 100. Wind-ups never drop below 0.6s.

**Reward bias.** **Watchful Set** (Helm + Locket; +crit on first hit per room). Guaranteed one set piece on first clear.

---

## 2. The Tide-Echo

- **Codename / display / title:** `BOSS_CATHEDRAL_TIDEECHO` / The Tide-Echo / The Drowned Cantor
- **Realm:** Sunken Cathedral (Ch. 2) — **Template: Conductor** (textbook projectile-pattern; teaches dodge-line reading)

**Lore stinger.** *She led the cathedral's choir. The Dim came in through the windows mid-hymn, and the hymn never finished.*

**Visual key.** Floating half-submerged figure in tattered robes, only torso and head above the waterline. Portrait silhouette = **vertical teardrop** with glowing throat. Palette: pale cyan, drowned-gold, indigo light at her sternum. Mouth open in silent note.

### Phases

| Phase | HP gate | New question |
|---|---|---|
| 1 | 100 → 66% | Read a projectile fan; sidestep on the wind-up frame. |
| 2 | 66 → 33% | Find the gap in a 12-projectile ring while flood-waves shove you. |
| 3 | 33 → 0% | Read two overlapping patterns offset by 0.5s. |

| Phase | Attack | Telegraph | Wind-up | Damage | Counter-play |
|---|---|---|---|---|---|
| 1 | **Hymn-Fan** (5-projectile 60° spread) | 5 short blue lines | 0.7s | 30% HP each | Sidestep perpendicular. |
| 1 | **Echo-Pulse** (slow homing orb) | Yellow halo around orb | 0.6s | 35% HP | Wide arc; turning radius is large. |
| 2 (+1) | **Ring of the Faithful** (12-projectile ring, one fixed gap at her back) | Yellow ring expands → blue projectile lines | 1.0s | 35% HP each | Read her facing; the gap is behind her. |
| 3 (+1) | **Counterpoint** (Hymn-Fan + Ring overlap, 0.5s offset) | Each pattern keeps its own telegraph | 0.7s + 1.0s | as above | Read both; gap still behind her. |

**Arena event** (from Phase 2 on): every 12s, a **flooding wave** crosses from one edge (yellow line on edge for 1.0s). No damage; shoves the player 2 units. Can shove into *or* out of projectile gaps — a second clock.

**Arena.** Wide flooded nave, ~10×8 units, four broken pillars as cover (and corners that can trap during a flood-wave). Animated waterline; the floor itself moves.

**Music cue.** Female choral pad on a sustained note, low organ, no percussion. Phase 2 adds a struck triangle on each wave. Phase 3 layers a soprano counter-melody **deliberately 0.5s off** the main line — the music teaches the rhythm. **Audio brief:** `MUS_BOSS_CATHEDRAL_TIDEECHO_OFFBEAT`.

**Signature screenshot moment.** Phase 2: the 12-projectile ring half-resolved, hero in the single gap, a flood-wave's blue telegraph cutting in from the right edge — three readability primitives (ring, gap, line) visible at once. **App Store frame 3 candidate.**

**Tower scaling.** Hymn-Fan: 5 → 7 → 9 projectiles at floors 50/100/150. Ring gap rotates slowly at late floors. Flood cadence: 12s → 9s → 7s. Phase-3 offset tightens to 0.4s at floor 100 (**floor; never below 0.4s**).

**Reward bias.** **Drowned Choir Set** (Ring + Bracelet; +projectile speed, +pierce on first projectile per volley).

---

## 3. Aurelith, the Hollow Choir

- **Codename / display / title:** `BOSS_FROSTSPIRE_AURELITH` / Aurelith / The Hollow Choir
- **Realm:** Frostspire (Ch. 3) — **Template: Architect** (textbook teleport / AoE; teaches floor management)

**Lore stinger.** *She climbed Frostspire to sing the suns back. The Dim heard her first. Now her voice arrives a moment before she does.*

**Visual key.** Tall gaunt figure of fractured ice and indigo light; her body is **incomplete**, pieces float beside her. Portrait silhouette = **vertical column of broken glass** with a bright crown. Palette: ice white, prismatic refraction edges, deep indigo eyes. Each teleport leaves a 0.4s **shard ghost** at her departure point — telegraph that says "she was here."

### Phases

| Phase | HP gate | New question |
|---|---|---|
| 1 | 100 → 66% | Track a teleporter whose telegraph spawns **before** her arrival. |
| 2 | 66 → 33% | Avoid a persistent ice-floor hazard that accumulates. |
| 3 | 33 → 0% | Read a long sweeping beam while the floor is half-claimed. |

| Phase | Attack | Telegraph | Wind-up | Damage | Counter-play |
|---|---|---|---|---|---|
| 1 | **Refrain** (teleport) | Shard-ghost at departure; yellow shimmer at arrival | 0.6s | n/a | Move away from the shimmer. |
| 1 | **Frostfall** (red circle on player's post-teleport position) | Standard red circle | 1.0s | 40% HP | Walk out; doesn't track once placed. |
| 2 (+1) | **Hoarfrost** (each Frostfall leaves an 8s ice patch; slow 30%) | Solid pale blue with dark outline | passive | n/a direct | Plan teleport arrivals; don't get herded onto ice. |
| 3 (+1) | **Choir-Beam** (sweeping line, rotates ~30°/s) | Wide yellow line, 2 units wide → red beam | **1.2s** | 70% HP | Cross during yellow phase, or stay on outer arc. She won't teleport during the beam. |

**Arena.** Open glacier shelf, ~9×9 units, central prismatic pillar blocks line of sight (Aurelith teleports behind it — tool *and* hazard). Phase 3: floor ~40% Hoarfrost.

**Music cue.** A high female voice (the same narrator from biome stingers, per `design/03-world-and-theme.md`) sustains a single note for the fight, modulating up a semitone per phase. Sparse glass-bell percussion. **This is the only boss where the narrator's voice *is* the boss's voice.** **Audio brief:** `MUS_BOSS_FROSTSPIRE_AURELITH_VOX`.

**Signature screenshot moment.** Phase 3: Choir-Beam slicing diagonally, floor half-frozen pale blue, Aurelith re-assembling from shards at screen edge, hero dashing through the yellow window. **App Store frame 4 candidate.**

**Tower scaling.** Refrain cadence: 3.0s → 2.4s → 2.0s. Frostfall: 1 → 2 → 3 circles in a triangle. Hoarfrost persistence: 8 → 12 → 16s. Choir-Beam wind-up **stays at 1.2s at all floors** (it is one-shot-class at high chapters).

**Reward bias.** **Crown-of-Frost Set** (Helm + Armor; freeze proc + damage vs frozen — matches Frostshard).

---

## 4. The Anvilfather

- **Codename / display / title:** `BOSS_EMBERFORGE_ANVILFATHER` / The Anvilfather / The Last Smith of the Burning Forge
- **Realm:** Emberforge (Ch. 4) — **Template: Brute × Engine hybrid** (Brute movement, Engine phase mechanics; first boss with truly distinct phases)

**Lore stinger.** *He forged the first lanterns of Iridian. When the suns shattered, he tried to weld them back together. He never put the hammer down.*

**Visual key.** Massive smith-figure, **one arm replaced by a glowing hammer fused to molten flesh**. Portrait silhouette = **wide triangle** body with offset rectangle (hammer). Palette: black iron, orange-gold cracks, white-hot core. Heat shimmer is part of his telegraph language.

### Phases

| Phase | HP gate | New question |
|---|---|---|
| 1 | 100 → 66% | Read a slow heavy attack while a melee body chases you. |
| 2 | 66 → 33% | The hammer detaches and is a second independent threat. |
| 3 | 33 → 0% | Persistent lava floor — manage shrinking space. |

| Phase | Attack | Telegraph | Wind-up | Damage | Counter-play |
|---|---|---|---|---|---|
| 1 | **Forge-Step** (slow tracking walk, body-blocks projectiles) | Always visible | passive | 25% HP contact | Keep distance; no dash in Phase 1. |
| 1 | **Anvil Strike** (overhead slam at player's position-on-windup) | Red circle 1.5u radius + yellow outer ring | 0.9s | 60% HP | Walk out; don't corner. |
| 2 (+1) | **The Hammer Falls** (hammer separates and acts independently) | Hammer pulses yellow before each strike, independent of body | 0.8s | 50% HP/swing | Treat as two bosses. Hammer can be staggered for 2s but not killed. |
| 3 (+1) | **Heart of the Forge** (every Anvil Strike leaves a permanent ~1u lava puddle) | Puddle inherits red circle outline | passive | 18% HP/s | Plan damage windows; arena ~30% lava by 10% HP. |

The Phase-2 transition uses a 1.2s screen-wide telegraph (yellow flash, hammer breaks off, single bell) — phase change is unmistakable, per the wind-up rules.

**Arena.** Octagonal forge floor, ~10×10 units, central anvil obstacle (the hammer phases through it). Two molten-iron rim channels surge occasionally (yellow rim line for 1.0s) — passive edge hazard.

**Music cue.** Heavy percussion on a **2/4 hammer beat** matching Anvil Strike's wind-up — the boss's tempo *is* the soundtrack. Phase 2 adds a metallic ring on hammer separation. Phase 3 adds a low brass drone. **Audio brief:** `MUS_BOSS_EMBERFORGE_ANVILFATHER_HAMMERBEAT`.

**Signature screenshot moment.** Phase 2 reveal: hammer mid-flight in foreground, separated from boss body, both telegraphing — yellow pulse on hammer, red circle below body. **App Store frame 5 candidate.**

**Tower scaling.** Anvil Strike radius: 1.5 → 2.0 → 2.5u. Hammer cadence: 4.0s → 3.0s → 2.4s. Lava puddles in Phase 1 from floor 100+. Wind-ups never drop below 0.6s (regular) / 0.9s (Anvil Strike).

**Reward bias.** **Burning Forge Set** (Weapon + Bracelet; +fire DoT, +damage vs enemies in red zones — matches Embercaller).

---

## 5. Prismfen, the Glassroot Mother

- **Codename / display / title:** `BOSS_GLASSROOT_PRISMFEN` / Prismfen / The Glassroot Mother
- **Realm:** Glassroot Forest (Ch. 5) — **Template: Mother** (textbook summoner; teaches AoE / priority targeting)

**Lore stinger.** *The trees here remember being trees. She remembers being their grove-keeper. She is teaching them to be something else now.*

**Visual key.** Six-armed dryad rooted to the floor, bottom half fused into a glass tree, top half humanoid and glowing prismatic. Portrait silhouette = **wide vertical diamond** with branching arms. Palette: translucent glass, refraction rainbows, single warm gold heart deep in the trunk (the weak spot). She doesn't move.

### Phases

| Phase | HP gate | New question |
|---|---|---|
| 1 | 100 → 66% | Manage a steady swarm while reading the stationary boss's slow attacks. |
| 2 | 66 → 33% | An elite add (Glasshound) demands focused DPS without ignoring the swarm. |
| 3 | 33 → 0% | A shielded phase: kill all minions to make the boss vulnerable. |

| Phase | Attack | Telegraph | Wind-up | Damage | Counter-play |
|---|---|---|---|---|---|
| 1 | **Glassbroods** (spawns 4 Glassmote adds / 6s) | Yellow circle at each spawn | 0.8s | 20% HP contact | AoE clears them. |
| 1 | **Refract-Orb** (slow homing prismatic orb) | Blue line 0.5s ahead of orb | 0.7s | 35% HP | Wide arc. |
| 2 (+1) | **The Glasshound** (one elite minion; half-Brute charge speed) | 60° yellow cone | 1.0s | 55% HP | Kill (~1/3 boss HP) or kite through Glassmote spawns. |
| 3 (+1) | **Heartshield** (boss invulnerable while motes alive; 8 motes on phase trigger, +4 every 8s) | Prism shell + live mote count above boss | n/a | n/a | Clear motes; boss exposed ~2s after each clear. |

The Glasshound is the chapter's single most important add — beating Prismfen often means deciding when to ignore the swarm and burn it down.

**Arena.** Circular grove, ~9u radius, six glass stumps as cover (block charges, hide players). Floor refracts the boss's light — the only arena where the **ground itself is bright**, so red telegraphs use a thick black outline.

**Music cue.** Glass-harmonica drone with a 4-note motif that **resolves on each Glassmote spawn** — the player anticipates spawns by ear. Phase 2 adds low cello on Glasshound entry. Phase 3 layers fast pizzicato during shielded windows. **Audio brief:** `MUS_BOSS_GLASSROOT_PRISMFEN_HARMONICA`.

**Signature screenshot moment.** Phase 3: Prismfen surrounded by 8 Glassmotes, prismatic shield up, hero mid-AoE-clear with rainbow refraction lighting the floor. **App Store frame 6 candidate.**

**Tower scaling.** Glassbrood spawn: 4 → 5 → 6. Refract-Orb: 1 → 2 in flight. Glasshound appears in Phase 1 from floor 100+. Heartshield motes per wave: 8 → 10 → 12.

**Reward bias.** **Prismlight Set** (Locket + Ring; +multishot, +pierce — matches Prismborn).

---

## 6. The Star-Wound

- **Codename / display / title:** `BOSS_HOLLOWSKY_STARWOUND` / The Star-Wound / What Fell From the Sky
- **Realm:** Hollow Sky (Ch. 6) — **Template: Conductor × Architect hybrid** (the synthesis chapter)

**Lore stinger.** *Something fell out of the sky when the suns shattered. It did not stop falling. It is still falling, here, where you found it.*

**Visual key.** A torn wound in mid-air — horizontal eye-shape leaking negative light, the Dim incarnate. No body, just a center of darkness with orbiting shards. Portrait silhouette = **horizontal lens** with rotating diamond points. Palette: pure indigo-black center, prismatic-white shard edges, no warm tones. It "moves" by jumping between floating platforms.

### Phases

| Phase | HP gate | New question |
|---|---|---|
| 1 | 100 → 66% | Read a rotating spoke pattern. |
| 2 | 66 → 33% | Layer falling-debris hazards on the projectile pattern. |
| 3 | 33 → 0% | The arena itself breaks — platforms fall on a fixed cadence. |

| Phase | Attack | Telegraph | Wind-up | Damage | Counter-play |
|---|---|---|---|---|---|
| 1 | **Spoke** (6 outward spokes, rotating 45°/s) | Blue line along each spoke | 0.9s | 30% HP each | Move *with* the rotation. |
| 1 | **Lurch** (boss jumps between 4 platform anchors) | Yellow shimmer at landing anchor | 0.7s | n/a | Reposition before next Spoke. |
| 2 (+1) | **Starfall** (3 red circles along player's last 0.5s of movement) | 3 sequential red circles, all resolve at 1.0s | 1.0s | 50% HP each | Reverse direction at telegraph spawn — prediction lags. |
| 3 (+1) | **The Sky is Falling** (one of 4 platforms cracks every 6s) | Yellow border on doomed platform; off-screen arrow if needed | 1.0s | 100% HP if standing on it | Move; ≥2 safe platforms always remain. Platforms regenerate in 10s. |

This is the chapter's signature **arena-as-attack** mechanic. Adapted from Mighty DOOM's spatial phase shifts.

**Arena.** Four floating platforms in a 2×2 grid joined by narrow light-bridges. Playable area shrinks across the fight; bridges block projectile lines but fall with their platforms. Inky void below; falling is a one-shot governed by the 4-condition rule.

**Music cue.** Glitched time-stretched main Lucent theme played backwards under a sparse synth pad. Phase 2 adds a high sine drone. Phase 3 adds a **descending** piano figure looping every 6s — perfectly synced to platform falls. The audio teaches the rhythm. **Audio brief:** `MUS_BOSS_HOLLOWSKY_STARWOUND_INVERTED`.

**Signature screenshot moment.** Phase 3 mid-platform-fall: hero leaping between platforms, one cracking and tipping into the void, six spokes radiating above. Maximum vertical drama. **App Store frame 1 candidate (the hero shot).**

**Tower scaling.** Spokes: 6 → 8 → 12. Lurch cadence: 4 → 3 → 2.5s. Starfall: 3 → 4 → 5 circles. Platform-fall cadence: 6 → 5 → 4s with a hard **2-platform floor** (one-shot 4-condition rule).

**Reward bias.** **Starfallen Set** (Helm + Bracelet + Ring; +damage in midair, +dodge on platform change — the only 3-piece set tied to a chapter mechanic).

---

## 7. The Long Dusk Itself

- **Codename / display / title:** `BOSS_LONGDUSK_DUSKITSELF` / The Long Dusk / The Last Echo
- **Realm:** The Long Dusk (Ch. 7 — final realm at launch) — **Template: Engine** (full 3-phase signature; the player has been learning to read this for 7 chapters)

**Lore stinger.** *It has no name. It is not a person, not an army, not a god. It is what remained when the suns went out. It has been waiting.*

**Visual key.** Begins as a **silhouette of the player** — a black-on-indigo outline of the hero — and only gradually reveals as something larger and older. Portrait silhouette: **starts mirroring the player's**, ends as **a vast incomplete crown** of indigo void. Palette: pure indigo, void-black, single warm gold point at its center (its stolen shard). It moves by Echo: it teleports to where the player **was** a moment ago.

### Phases

| Phase | HP gate | New question |
|---|---|---|
| 1 | 100 → 66% | The boss mirrors your last 1.0s. Move erratically. |
| 2 | 66 → 33% | A second silhouette appears and Echoes your *opposite* direction. |
| 3 | 33 → 0% | The arena floor goes dark; the boss attacks from within near-blackness. |

| Phase | Attack | Telegraph | Wind-up | Damage | Counter-play |
|---|---|---|---|---|---|
| 1 | **Mirror Step** (teleport to player's position from 1.0s ago, then 90° cone sweep) | Yellow cone at arrival | 0.7s | 40% HP | Move erratically. |
| 1 | **Dim-Reach** (slow tendril along player's recent path) | Blue line on player's path | 0.9s | 45% HP | Don't move in straight lines. |
| 2 (+1) | **The Anti-Echo** (second silhouette mirrors player on opposite axis) | Boss outline at mirrored position, faint indigo trail | passive entity | per its attacks | Use as a compass for safe positioning. Stunnable 5s with 15% boss HP burst. |
| 3 (+1) | **The Long Dark** (arena lighting drops to ~15%; only player aura, boss heart, and telegraph layer remain) | Screen-wide indigo flash, 1.2s phase transition | n/a | n/a (utility) | Trust the telegraph language. Final exam. |

This is the **culmination of Pillar 8**: in the last 33% of the last boss, the arena reduces to the telegraph layer. If the player reads the language, they win.

**Arena.** Endless dark hall, ~12×8 units, no visible walls — the floor fades into indigo beyond a radius. Central pedestal holds the boss's gold heart-shard, the only fixed reference in Phase 3.

**Music cue.** The Lucent main theme drained of warmth — brass replaced with low cello, percussion gone, the narrator's whispered "*Walk in*" under the music at phase transitions. Phase 3 silences all instruments except one sustained string. **Audio brief:** `MUS_BOSS_LONGDUSK_DUSKITSELF_FINAL`.

**Signature screenshot moment.** Phase 3: near-pure-black screen, hero glowing indigo at center, two boss-shaped outlines arcing in from either side, a single yellow cone cutting through the dark. The whole game in one frame. **App Store frame 7 candidate.**

**Tower scaling.** Mirror Step delay: 1.0 → 0.7 → 0.5s. Anti-Echo gains its own independent Dim-Reach at high floors. Long Dark starts at 50% HP from floor 250+. No wind-up ever drops below 0.6s.

**Reward bias.** **Last-Light Set** (6-piece full set, all slots; +scaling damage as HP drops, +revive once per run — the only 6-piece set at launch and the endgame chase).

---

# Recurring World Bosses

> Weekly bossfights, special events, guild raids. Designed for re-fight engagement at **week 50** — attack patterns must be deeply readable on the 50th rep. These bosses **rotate realm reskin**: each takes the local palette and one local hazard, but the core mechanics never change. Reskin = palette + 1 hazard swap, never new attacks.

## 8. The Tessellate

- **Codename / display / title:** `WBOSS_TESSELLATE` / The Tessellate / The Many-Sided Echo
- **Template:** **Conductor** (lighter; 2-phase weekly, ~60s)

**Lore stinger.** *Wherever the Dim could not reach a corner, it grew sides instead.*

**Visual key.** A floating tessellated polyhedron of indigo-and-glass facets, rotating slowly. Each visible facet is a different color — the player learns the facet currently facing them is the one that fires next. Portrait silhouette: **rotating crystal** with one bright facet at any moment.

| Phase | HP gate | New question | Attacks |
|---|---|---|---|
| 1 | 100 → 50% | Read the active facet to predict its spread. | **Faceted Volley** (5-projectile fan; spread angle keyed to facet hue — blue=tight, red=wide, gold=arcing). 0.8s wind-up. |
| 2 | 50 → 0% | Two facets are active at once. | Same Faceted Volley from two facets on a 0.4s offset; independent telegraphs. |

**Why it works at week 50.** 4 facets × 2 active = 6 unique combinations per fight, all built from one primitive (5-projectile fan with varying spread). The combination is what's new; the language is constant.

**Arena & audio.** Hexagonal floor takes the host realm's palette and one local hazard (e.g., flood-wave shove in Cathedral skin, lava rim in Emberforge skin). Music is procedural — each active facet swaps an instrument (cymbal blue, snare red, brass gold). Screenshot: two facets glowing, two fans crossing.

**Scaling.** Higher event tiers add a 3rd active facet in Phase 2; spread precision tightens 5% per tier. Wind-ups stay ≥0.6s.

**Reward bias.** Weekly event currency **Cut-Light** + small chance at any launch-set piece.

---

## 9. Sothren, the Echoing Knight

- **Codename / display / title:** `WBOSS_SOTHREN` / Sothren / The Echoing Knight
- **Template:** **Brute** (guild raid scale, 2-phase, ~120s, shared guild HP)

**Lore stinger.** *He died defending the gate of Iridian's first king. He has been defending it ever since.*

**Visual key.** Knight in chipped oversized armor; his **shield is twice his body's size** and is the readable threat. Portrait silhouette: small humanoid behind a massive rectangle. Palette: tarnished silver, indigo armor seams, small warm gold visor light.

| Phase | HP gate | New question | Attacks |
|---|---|---|---|
| 1 | 100 → 50% | Shield blocks all damage from front 180°; flank him. | **Bulwark** (passive). **Charge** (straight dash, 1.0s wind-up, leaves 4s red trail). **Shield-Slam** (red half-circle front, 0.9s, 60% HP). |
| 2 | 50 → 0% | Shield drops and becomes a movable hazard. | **Bulwark** off; faster. **Shield-Punt** (kicks shield like a puck, 1.0s wind-up, blue trajectory line, 50% HP, bounces off walls 2×). |

**Why it works at week 50.** Built around a **positional puzzle** (front vs back), legible at guild-of-8 scale without voice chat ("flank"). Phase 2 inverts the puzzle — everyone safe from front, the shield is the threat. Two simple mutually-exclusive questions, repeated weekly.

**Arena & audio.** Round courtyard, ~14×14u (larger for guild scale). Music: military low brass + male chorus on each Charge wind-up. Screenshot: 8 guild heroes flanking, his shield half-arc telegraphed across the front.

**Scaling.** HP scales linearly with guild count + difficulty rank. Charge cadence tightens. Shield-Punt becomes 2 simultaneous shields at top tier. **Never** a new attack — purely scales the existing two.

**Reward bias.** Guild currency **Oathmark** + chance at **Sothren's Plate** consumable (one-time damage shield in next run). No gear drops — Sothren is a currency boss.

---

## 10. The Memory Bloom

- **Codename / display / title:** `WBOSS_MEMORYBLOOM` / The Memory Bloom / The Garden That Remembered Wrong
- **Template:** **Mother × Architect hybrid** (3 short phases, ~75s)

**Lore stinger.** *A flower bloomed where a Lucent-bearer fell. It is trying to grow into what she was.*

**Visual key.** Massive glass-petal flower rooted in the arena center, with **petals that close protectively over its glowing core** when threatened. Portrait silhouette: wide rounded shape with a bright center that opens and closes. The only entirely symmetric boss in the roster.

| Phase | HP gate | New question | Attacks |
|---|---|---|---|
| 1 | 100 → 66% | Petals closed = invulnerable. Burst when open. | **Open/Closed cycle** (3s closed, 3s open). On open: ring of 12 projectiles, gap at a random petal. 0.8s wind-up. |
| 2 | 66 → 33% | Open windows spawn swarmers. | Open spawns 3 Glassmotes each cycle. |
| 3 | 33 → 0% | Persistent floor hazard at petal bases. | **Bloom-Floor** (5 slow indigo puddles grow from petal-base positions; 25% slow). |

**Why it works at week 50.** The only world boss with a **damage-window mechanic** — players must rebuild burst-damage habit each week. Different heroes solve it differently (Frostshard freeze-locks petals open; Dawnbow lines up multishot down the corridor between petals).

**Arena & audio.** Circular glass-floored garden with 5 stone basins on the rim (cover). Music: slow 6/8 waltz pausing on each "Closed" phase, resuming on "Open." Phase 3 adds a hum that grows with each Bloom-Floor puddle. Screenshot: petals fully open, 12-projectile ring resolving, hero firing a multishot down the gap.

**Scaling.** Open windows shorten with tier (3 → 2.5 → 2s). Mote spawns 3 → 4 → 5. Bloom-Floor capped at 8 puddles.

**Reward bias.** Weekly currency **Lightseed** + **Memory** consumables that reroll the next run's first 3 ability picks.

---

# Sky Tower Capstone

> Per `research/games/archero-2.md`: Archero 2's Sky Tower floor 95–100 difficulty cliff is the **#1 endgame complaint** — players bounce because the spike is **unsignaled** and **unfair**. The Lucent capstone fixes that pattern: hard but **fair**, with difficulty from **combinations the player has already faced**, not new attacks.

## 11. The Compound

- **Codename / display / title:** `BOSS_TOWER_COMPOUND` / The Compound / Everything You've Learned, All At Once
- **Appears at:** Tower floors **50, 100, 150** (and every 50 floors thereafter, scaling).
- **Template:** **Engine** frame, but each phase is **literally a phase from a prior boss** — no new attacks anywhere.

**Lore stinger.** *The Dim has been studying you. It has all your lessons memorized.*

**Visual key.** Abstract silhouette that takes the **outline** of the boss whose phase it is currently using. The silhouette change *is* the phase-transition signal. Palette: pure indigo with bright outline only — no internal detail, so attention stays on telegraphs.

### Floor combinations

| Floor | Phase 1 | Phase 2 | Phase 3 | Why |
|---|---|---|---|---|
| **50** | Lanternwight P1 | Tide-Echo P1 | Aurelith P1 | First 3 chapters' first phases — confidence check. |
| **100** | Tide-Echo P2 (Ring + flood) | Anvilfather P2 (separated hammer) | Prismfen P3 (Heartshield) | Second-question phases — endurance check. |
| **150** | Star-Wound P3 (platform falls) | Long Dusk P2 (Anti-Echo) | Long Dusk P3 (Long Dark) | Hardest learned phases — mastery / graduation. |

### Fairness rules (mandatory)

These are non-negotiable; they exist to prevent the Archero 2 cliff.

1. **No new attacks, ever.** Every projectile, AoE, hazard, and behavior must already exist on a prior boss. Same primitives, colors, wind-ups.
2. **The phase combination is announced.** Before the floor starts, the player sees: *"Floor 100 — Echoes of: Tide-Echo, Anvilfather, Prismfen."* Pre-warn the wall.
3. **Wind-ups stay at or above chapter-original.** Floor 150's Long Dark phase still uses 1.2s. We never shorten.
4. **HP is the dial, not telegraph speed.** ~2.5× / 4× / 6× original HP at floors 50/100/150; same attack frequencies as the source phase.
5. **Revives are unrestricted at the Compound floor.** One extra revive in addition to the standard one — two chances at the wall.
6. **Failure is legible.** Every death traces to a missed read, not a hidden mechanic. Replay the last 4 seconds and explain it.

**Arena.** Shifting backdrop swaps between the 3 source arenas in sync with phase transitions. Phase transition includes a 1.5s "loading" beat — short enough not to break flow, long enough to reset reading.

**Music cue.** Medley — each phase plays its **original boss's music** at +1 BPM. The medley structure is itself an audio cue. **Audio brief:** `MUS_BOSS_TOWER_COMPOUND_MEDLEY`.

**Signature screenshot moment.** Floor 150 Phase 3 — the Long Dark — boss in Long Dusk silhouette, two yellow cone telegraphs glowing in near-pure-black, hero glowing indigo at center, "150" floor counter at the screen edge. **The endgame screenshot.**

### Reward bias

- **Floor 50:** Guaranteed Epic set piece (player-chosen set).
- **Floor 100:** Guaranteed Legendary set piece + 1 random Awakened weapon recipe **hint** (per Pillar 7's hidden-recipe system).
- **Floor 150:** Mythic-tier gear roll + cosmetic title **Echo-Eater**. Repeatable weekly for currency.

**Scaling past floor 150.** Floors 200/250/300+ continue the Compound but rotate which 3 phases are used (e.g., floor 200 might use Phase 2 of every world boss). **Mechanic catalog is fixed at launch; only combinations change.** Per `enemies-and-bosses.md` §5 Lesson 6: endgame doesn't need new bosses, it needs new combinations.

---

# Readability Checklist (Sign-Off Contract)

> Every boss in this document — and every boss authored post-launch — must pass this checklist before milestone review. If a boss fails any single item, it does not ship. This is a gate, not a guideline. Reviewed and signed off by the design lead at QA milestone.

### Color discipline
- [ ] **Red** = "this will damage you now or imminently." Never for friendly effects, never for boss HP bars, never for environment art readable as a hazard.
- [ ] **Yellow** = "warning, soon." Only for telegraph rings, wind-up halos, off-screen indicators.
- [ ] **Blue** = projectile paths and friendly effects. Boss projectile trajectories are blue *before* resolution, red *during* damage frames.
- [ ] No third-party color carries threat semantics in any boss fight.

### Shape primitives only
- [ ] All AoEs are **filled circle**, **filled rectangle (line/beam)**, **filled cone**, or **ring**. No bespoke organic shapes, no irregular polygons.
- [ ] Persistent floor hazards inherit the shape of their generating attack (Anvilfather's lava puddles use Anvil Strike's circle outline).
- [ ] No two AoE shapes may be visually identical at the same time unless they are the same attack.

### Wind-up minimums
- [ ] **≥0.6s** on every regular attack.
- [ ] **≥1.0s** on phase-transition attacks and on any attack that can do >50% HP.
- [ ] **≥1.2s** on one-shot mechanics and phase-transition stingers.
- [ ] **No wind-up drops below 0.6s at any Tower scaling tier**, ever.

### Audio cue parity
- [ ] Every visual telegraph has a layered audio cue. Off-screen audio cues are mixed louder than on-screen ones (the thumb covers ~20% of the screen).
- [ ] One-shot mechanics get a **unique audio cue** — different timbre, not just louder.
- [ ] Phase transitions use a distinct bell-tone or brass swell, not in-fight audio.

### Off-screen attack indicators
- [ ] Any attack telegraphing off-screen has an **arrow at the screen edge**, ≥1.0s duration, yellow (or red if imminent).
- [ ] Star-Wound's platform-fall is the test case.

### One-shot 4-condition rule
Every one-shot mechanic must satisfy **all four** (per `enemies-and-bosses.md` §7):

- [ ] **Telegraphed ≥1.0s** with a unique visual.
- [ ] **Avoidable by movement alone** — never by a finite resource within a 0.4s reaction window.
- [ ] **Spatially predictable** — a non-obvious safe spot exists before the telegraph spawns.
- [ ] **Failure is legible** — on death the player can replay the last 2s and say "I should have moved left."

### Additional invariants
- [ ] Max **3 simultaneous telegraph indicators** on-screen. Excess attacks queue.
- [ ] Telegraph layer renders **above** enemy bodies, **below** player + HUD.
- [ ] Cancelled telegraphs **fade or pop**, never blink off.
- [ ] No single attack at chapter level deals >70% HP on a clean hit at recommended gear power. (Players must survive at least one mistake.)

---

# Boss Difficulty Curve (Chapters 1→7)

> **Design goal:** a player with chapter-appropriate gear and average build luck beats the chapter boss in **≤3 attempts**. Tighter = too easy; looser = we lose F2P players (Mighty DOOM chapter-5–6 lesson, Pillar 5). Numbers are relative; tune in playtest.
>
> **Power assumptions.** HP and damage are normalized to player's **expected HP at chapter unlock**. "1.0×" damage = expected max HP at that chapter in one hit. Player HP grows ~25% per chapter via gear and talents.

| Ch. | Boss | Template | Boss HP (× chapter elite) | Per-hit dmg (× player HP) | Phases | Distinct attacks | One-shots | Expected attempts |
|---|---|---|---|---|---|---|---|---|
| 1 | The Lanternwight | Brute | 14× | 0.45 | 3 | 3 | 0 | 1–2 |
| 2 | The Tide-Echo | Conductor | 16× | 0.40 / projectile | 3 | 3 + arena event | 0 | 2 |
| 3 | Aurelith | Architect | 18× | 0.70 (Choir-Beam) | 3 | 3 + floor hazard | 0 | 2–3 |
| 4 | The Anvilfather | Brute × Engine | 22× | 0.60 (Anvil Strike) | 3 | 4 (two entities) | 0 | 2–3 |
| 5 | Prismfen | Mother | 24× | 0.55 (Glasshound) | 3 | 3 + 2 entities | 0 | 2–3 |
| 6 | The Star-Wound | Conductor × Architect | 28× | 0.50 + 1.0 (platform) | 3 | 3 + arena destruction | 1 (4-cond) | 3 |
| 7 | The Long Dusk Itself | Engine | 35× | 0.45 + lighting | 3 | 4 (w/ Anti-Echo) | 1 (lighting drop) | 3 |

### Curve commentary

- **Ch. 1–2** teach the language. Brute is the most readable template; Tide-Echo introduces projectile reading + the first arena-as-attack event. Forgiving damage, large gaps.
- **Ch. 3 (Aurelith)** is the first arena-management fight. Choir-Beam is an honest cliff: 1.2s wind-up, 70% HP — the wind-up earns the damage.
- **Ch. 4–5** test composition. Anvilfather is the first two-entity fight; Prismfen introduces priority targeting (pure single-target builds struggle, AoE breezes — both feel correct).
- **Ch. 6 (Star-Wound)** introduces arena destruction and the first true one-shot (platform fall). Acceptable because the safe-platform floor is 2 and arrow indicators are engaged.
- **Ch. 7 (Long Dusk)** is the final exam — every prior reading skill needed. Phase 3's lighting drop is the only one-shot-class *environment* mechanic in the game. 3 attempts is the upper bound; beyond 3 there is a problem.

### Scaling levers in order of preference (per `enemies-and-bosses.md` §8.4)

1. **Attack frequency** (most fun to scale).
2. **Projectile count per attack.**
3. **Projectile speed.**
4. **Phase compression** — phases trigger earlier.
5. **Enemy / add density** — for Mother-template bosses.
6. **Damage values** (least fun; only when other levers exhausted).

**Never scale by shortening telegraphs below the minimum (0.6s normal, 1.0s one-shot, 1.2s phase-transition).** This is the readability checklist's hardest rule, and the curve respects it across every chapter and every Tower floor.

