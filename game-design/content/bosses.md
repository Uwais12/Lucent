# Boss Roster — Lucent: Shards of the Shattered Sun

> **Scope.** 7 chapter bosses (one per realm) + 3 recurring world bosses (weekly content / guild raids / events) + 1 Sky Tower capstone that recurs at floor 50 / 100 / 150 with scaled stats. All bosses follow Pillar 8: portrait readability is sacred, telegraphs use the shared color and shape language (red = damage, yellow = warning, blue = projectile path; circles, cones, lines, rings only).
>
> **Foundational templates** (from `research/games/enemies-and-bosses.md` §8.3): **Brute / Conductor / Architect / Mother / Engine**. Every boss below is one template or a clearly-stated hybrid of two — no third axes invented. Each chapter boss is a **3-phase, ~90s fight**, with HP gates at **66%** and **33%**. Each phase adds **exactly one new question** the player must learn; no phase ever introduces more than one new attack or behavior.
>
> **Reading order.** Chapter bosses 1→7 mirror the realm sequence in `design/03-world-and-theme.md`. World bosses follow. Capstone follows. Readability checklist and difficulty curve close the document and are the **sign-off contract** every boss must clear before milestone review.

---

## Index

1. **The Lanternwight** — Vale of First Light (Brute)
2. **The Tide-Echo** — Sunken Cathedral (Conductor)
3. **Aurelith, the Hollow Choir** — Frostspire (Architect)
4. **The Anvilfather** — Emberforge (Brute × Engine hybrid)
5. **Prismfen, the Glassroot Mother** — Glassroot Forest (Mother)
6. **The Star-Wound** — Hollow Sky (Conductor × Architect hybrid)
7. **The Long Dusk Itself** — The Long Dusk (Engine, full 3-phase signature)
8. **World boss A — The Tessellate** (rotating-realm reskin)
9. **World boss B — Sothren, the Echoing Knight** (guild raid)
10. **World boss C — The Memory Bloom** (weekly event)
11. **Sky Tower capstone — The Compound** (floors 50 / 100 / 150)
12. **Readability checklist (sign-off contract)**
13. **Boss difficulty curve (chapters 1→7)**

---

# Chapter Bosses

## 1. The Lanternwight

- **Codename:** `BOSS_VALE_LANTERNWIGHT`
- **Display name:** The Lanternwight
- **Title:** Last Watchman of the Vale
- **Realm:** The Vale of First Light (Chapter 1)
- **Template:** **Brute** (textbook; this is the boss that teaches the language)

### Lore stinger

> *He was the village lampkeeper. When the Dim came, he kept lighting the lamps anyway — and never stopped.*

### Visual key

A hulking armored figure carrying a six-foot iron lantern on a pole. Silhouette reads at portrait scale as **two stacked rectangles**: a wide body and the lantern hanging high above his right shoulder, glowing pale gold against the indigo realm wash. Palette: rusted iron, oxidized green-bronze, lantern is the only warm light source in the arena. He **bleeds dim** — wisps of lavender leak from his joints when he moves.

### Phases

| Phase | HP gate | New question the player must learn |
|---|---|---|
| 1 | 100 → 66% | Read a wind-up and dodge perpendicular. |
| 2 | 66 → 33% | Recognize that the lantern itself is a separate AoE source on a different rhythm than the body. |
| 3 | 33 → 0% | Manage a persistent floor hazard while still dodging the same two questions. |

#### Phase 1 attacks (HP 100 → 66%)

| Attack | Telegraph | Wind-up | Damage | Counter-play |
|---|---|---|---|---|
| **Iron Stride** (3-step dash) | Body crouches, blue line shows dash path | 0.8s | 35% HP | Sidestep 1 body-width perpendicular before dash resolves. |
| **Lantern Slam** | Red circle (~1.4 player-widths) under boss feet | 0.9s | 45% HP | Walk out; the slam doesn't track. |

#### Phase 2 adds (HP 66 → 33%) — **+1 attack only**

| Attack | Telegraph | Wind-up | Damage | Counter-play |
|---|---|---|---|---|
| **Hanging Light** (the lantern itself drops a delayed AoE *behind* the boss on the previous frame's position) | Pulsing yellow ring above the lantern, then red circle on the ground 0.4s later | 1.0s total | 40% HP | Don't stand where the boss **was** — the lantern remembers. |

Phase 1 attacks continue; nothing is retired.

#### Phase 3 adds (HP 33 → 0%) — **+1 behavior only**

| Behavior | Telegraph | Wind-up | Damage | Counter-play |
|---|---|---|---|---|
| **Embered Footprints** (every dash leaves a small lingering red puddle for 6s) | The puddle inherits the dash line's blue → red transition | n/a (passive) | 12% HP/s while standing in it | Plan dashes — don't get cornered. Arena is large enough that the floor never fully fills. |

### Arena

**Square stone courtyard**, ~8×8 grid units. Four broken lanterns at the corners (decorative, glow pale gold). No moving hazards in Phase 1–2. Phase 3 floor fills with up to ~25% lingering puddle coverage. No walls beyond the arena edge — corners are real (the player can be cornered if they over-commit).

### Music cue

A solo cello pulse under sustained low strings. On phase-2 trigger, a single struck bell layered in. On phase 3, the lantern motif is inverted into a minor key. **Audio brief tag:** `MUS_BOSS_VALE_LANTERNWIGHT_3LAYER`.

### Signature screenshot moment

The phase-3 reveal: the boss strides forward and four glowing footprint puddles bloom behind him in a curve, lantern raised, the player's hero (small, indigo-glowing) silhouetted between two of them. **App Store screenshot frame 2 candidate.**

### Difficulty scaling (Tower reappearance)

In Tower, the Lanternwight reappears every 25 floors as a "starter" gauntlet boss. Scaling levers, in preference order (per `enemies-and-bosses.md` §8.4):

1. Iron Stride becomes 4 dashes at floor 25; 5 at floor 75.
2. Lantern Slam circle gains +1 ring after floor 50 (concentric, dodge inward).
3. Embered Footprints appear in Phase 1 from floor 100 onward.
4. Telegraph wind-ups **never drop below 0.6s**, period.

### Reward bias

Drop table biased toward **Watchful Set** pieces (Helm + Locket; +crit on first hit in a room — matches "lamplighter" archetype). Guaranteed one set piece in first clear.

---

## 2. The Tide-Echo

- **Codename:** `BOSS_CATHEDRAL_TIDEECHO`
- **Display name:** The Tide-Echo
- **Title:** The Drowned Cantor
- **Realm:** Sunken Cathedral (Chapter 2)
- **Template:** **Conductor** (textbook projectile-pattern; the second boss teaches reading dodge-lines)

### Lore stinger

> *She led the cathedral's choir. The Dim came in through the windows mid-hymn, and the hymn never finished.*

### Visual key

A floating, half-submerged figure in tattered ceremonial robes, only the upper torso and head visible above the waterline. Silhouette at portrait scale: **a vertical teardrop** with a glowing throat. Palette: pale cyan, drowned-gold accents, a single point of indigo light at her sternum where her shard once was. Her mouth is open in a permanent silent note.

### Phases

| Phase | HP gate | New question |
|---|---|---|
| 1 | 100 → 66% | Read a projectile fan and sidestep on the wind-up frame. |
| 2 | 66 → 33% | Find the gap in a 12-projectile ring while flooding waves periodically force a relocation. |
| 3 | 33 → 0% | Manage two overlapping projectile patterns whose rhythms are offset by 0.5s. |

#### Phase 1 attacks (100 → 66%)

| Attack | Telegraph | Wind-up | Damage | Counter-play |
|---|---|---|---|---|
| **Hymn-Fan** (5 cyan projectiles in a 60° spread) | 5 short blue lines from her chest to firing direction | 0.7s | 30% HP per projectile | Sidestep 1 unit perpendicular at telegraph spawn. |
| **Echo-Pulse** (slow homing orb, can be juked) | Glowing yellow halo around the orb | 0.6s | 35% HP | Walk in a wide arc; orb's turning radius is large. |

#### Phase 2 adds (66 → 33%) — **+1 attack**

| Attack | Telegraph | Wind-up | Damage | Counter-play |
|---|---|---|---|---|
| **Ring of the Faithful** (12 projectiles in a full circle, **one gap** at a fixed angle relative to her facing) | Yellow ring expands from her body before resolving to blue projectile lines | 1.0s | 35% HP per | Find the gap; the gap is always at her back, telegraphed by where she's looking. |

**Arena event** added in phase 2: every 12 seconds, a **flooding wave** crosses the arena from one edge (telegraphed by a blue line on that edge for 1.0s). It does no direct damage but shoves the player 2 units in its direction — interesting because it can shove you out of, or into, a projectile gap.

#### Phase 3 adds (33 → 0%) — **+1 behavior**

| Behavior | Telegraph | Wind-up | Damage | Counter-play |
|---|---|---|---|---|
| **Counterpoint** (Hymn-Fan and Ring of the Faithful overlap, second pattern fires 0.5s after the first) | Each pattern keeps its own telegraph — they don't merge | 0.7s + 1.0s | as above | Read both telegraphs; the gap is still at her back. The flood-wave is now your second clock. |

#### Arena

**Wide flooded nave** of a sunken cathedral, ~10×8 units. Four broken pillars block straight projectile lines through the arena (cover, but also corners that can trap you during a flood-wave). Waterline is animated; the arena is the only place in Chapter 2 where the **floor itself moves** — it teaches the player that "your position is not stationary."

### Music cue

Female choral pad with a single sustained note, low organ, no percussion. Phase 2 adds a struck triangle on every wave. Phase 3 layers a counter-melody soprano line **deliberately 0.5s off** the main melody — the music *teaches* the player phase 3's rhythm. **Audio brief tag:** `MUS_BOSS_CATHEDRAL_TIDEECHO_OFFBEAT`.

### Signature screenshot moment

Phase 2: the 12-projectile ring half-resolved, hero silhouetted in the single gap, a flood-wave's blue telegraph line cutting in from the right edge of the screen. Three readability primitives (ring, gap, line) visible at once. **App Store screenshot frame 3 candidate.**

### Difficulty scaling (Tower reappearance)

1. Hymn-Fan grows from 5 → 7 → 9 projectiles by floors 50 / 100 / 150.
2. Ring of the Faithful's gap rotates slowly in late floors (still telegraphed by her facing — she just rotates faster).
3. Flood-wave cadence tightens from 12s → 9s → 7s.
4. The 0.5s offset in phase 3 tightens to 0.4s at floor 100 (**floor; never below 0.4s** — the readability checklist forbids it).

### Reward bias

**Drowned Choir Set** (Ring + Bracelet; +projectile speed, +pierce on first projectile of each volley — matches Conductor / projectile-build archetype).

---

## 3. Aurelith, the Hollow Choir

- **Codename:** `BOSS_FROSTSPIRE_AURELITH`
- **Display name:** Aurelith
- **Title:** The Hollow Choir
- **Realm:** Frostspire (Chapter 3)
- **Template:** **Architect** (textbook teleporter / AoE caster; chapter 3 teaches the player to **manage the floor**)

### Lore stinger

> *She climbed Frostspire to sing the suns back. The Dim heard her first. Now her voice arrives a moment before she does.*

### Visual key

A tall, gaunt figure of fractured ice and indigo light; her body is **incomplete** — pieces float beside her, slowly re-assembling. Silhouette at portrait scale: **a vertical column of broken glass** with a single bright crown. Palette: ice white, prismatic refraction edges, deep indigo at her eyes. Each teleport leaves a **shard ghost** that holds her pose for 0.4s — this is the telegraph that tells the player where she *was*.

### Phases

| Phase | HP gate | New question |
|---|---|---|
| 1 | 100 → 66% | Track a teleporting boss whose telegraphs spawn **before** her arrival. |
| 2 | 66 → 33% | Avoid a persistent ground hazard (frostbite floor) that accumulates over time. |
| 3 | 33 → 0% | Read a long sweeping line attack while the arena floor is half-claimed. |

#### Phase 1 attacks (100 → 66%)

| Attack | Telegraph | Wind-up | Damage | Counter-play |
|---|---|---|---|---|
| **Refrain** (teleport: 0.4s shard-ghost at departure, 0.6s yellow shimmer at arrival) | Yellow shimmer at landing site | 0.6s | n/a (movement) | Move away from the shimmer. |
| **Frostfall** (red circle drops on player's position after each teleport) | Standard red circle | 1.0s | 40% HP | Walk out — circle doesn't track once placed. |

#### Phase 2 adds (66 → 33%) — **+1 behavior**

| Behavior | Telegraph | Wind-up | Damage | Counter-play |
|---|---|---|---|---|
| **Hoarfrost** (each Frostfall leaves a persistent pale-blue ice patch for 8s; standing in it slows player 30%) | Patch is solid pale blue; readable against the snow-white arena via a dark outline | n/a | n/a direct (utility hazard) | Plan teleport arrivals — don't get herded into frozen floor. |

#### Phase 3 adds (33 → 0%) — **+1 attack**

| Attack | Telegraph | Wind-up | Damage | Counter-play |
|---|---|---|---|---|
| **Choir-Beam** (long sweeping line across the arena, rotates ~30°/s from her position) | Wide yellow line, ~2 units wide, resolves to red beam | **1.2s** (heaviest attack in the chapter) | 70% HP | Cross the beam *during* the yellow phase, or be on the outside arc. Note: she will not teleport during Choir-Beam. |

#### Arena

**Open glacier shelf**, ~9×9 units, with a prismatic crystal pillar at center that **blocks line of sight** — Aurelith can teleport to its back side, making the pillar a tool *and* a hazard. By phase 3, the floor is ~40% Hoarfrost.

### Music cue

A high female voice (the same narrator voice from biome stingers, per `design/03-world-and-theme.md`) sustains a single note for the entire fight, modulating up a semitone at each phase. Sparse glass-bell percussion. **This is the only boss where the narrator's voice is the boss's voice.** **Audio brief tag:** `MUS_BOSS_FROSTSPIRE_AURELITH_VOX`.

### Signature screenshot moment

Phase 3: the Choir-Beam slicing diagonally across the arena, half the floor frozen pale-blue, Aurelith re-assembling from shards at the screen's edge, hero dashing through the yellow telegraph window. **App Store screenshot frame 4 candidate.**

### Difficulty scaling (Tower reappearance)

1. Refrain cadence: every 3.0s → 2.4s → 2.0s.
2. Frostfall: 1 circle → 2 → 3 (placed in a tight triangle).
3. Hoarfrost persistence: 8s → 12s → 16s.
4. Choir-Beam wind-up **stays at 1.2s** at all floors — this is a one-shot-class attack at high chapters and the readability rule pins it.

### Reward bias

**Crown-of-Frost Set** (Helm + Armor; freeze proc + damage bonus vs frozen targets — matches Frostshard hero kit).

---

## 4. The Anvilfather

- **Codename:** `BOSS_EMBERFORGE_ANVILFATHER`
- **Display name:** The Anvilfather
- **Title:** The Last Smith of the Burning Forge
- **Realm:** Emberforge (Chapter 4)
- **Template:** **Brute × Engine hybrid** (Brute body movement, Engine phase mechanics; this is the first boss with truly distinct phases)

### Lore stinger

> *He forged the first lanterns of Iridian. When the suns shattered, he tried to weld them back together. He never put the hammer down.*

### Visual key

A massive smith-figure, three meters tall, **one arm replaced by a glowing hammer fused to molten flesh**. Silhouette at portrait scale: **a wide triangle** (broad shoulders) with the hammer as a separate offset rectangle. Palette: black iron, orange-gold molten cracks, white-hot core visible in his chest. He **smolders** — heat shimmer is part of his telegraph language.

### Phases

| Phase | HP gate | New question |
|---|---|---|
| 1 | 100 → 66% | Read a slow-tracking heavy attack while a charging melee chases you. |
| 2 | 66 → 33% | The hammer detaches and acts as a second, independent threat that telegraphs separately. |
| 3 | 33 → 0% | Persistent floor lava — manage shrinking space and dodge two threats. |

#### Phase 1 attacks (100 → 66%)

| Attack | Telegraph | Wind-up | Damage | Counter-play |
|---|---|---|---|---|
| **Forge-Step** (slow walk toward player, body-blocks projectiles) | n/a (movement, always visible) | n/a | 25% HP on contact | Keep distance; he doesn't dash in phase 1. |
| **Anvil Strike** (overhead hammer slam, red circle at impact site, target = player's position at telegraph start) | Red circle 1.5 units radius, yellow outer warning ring | 0.9s | 60% HP | Walk out; don't get cornered against arena edge. |

#### Phase 2 adds (66 → 33%) — **+1 behavior**

| Behavior | Telegraph | Wind-up | Damage | Counter-play |
|---|---|---|---|---|
| **The Hammer Falls** (at 66% HP, the hammer separates and becomes a **second mobile threat** — a slow-flying entity with its own targeting reticle) | Hammer pulses yellow before each strike (independent from boss body) | 0.8s | 50% HP per swing | Treat as two bosses. The hammer can be damaged to stagger it for 2s but cannot be killed. |

Phase-transition stinger (per readability rules): a **1.2s** screen-wide telegraph (yellow flash, hammer breaks off, single bell tone) makes the change unmistakable.

#### Phase 3 adds (33 → 0%) — **+1 behavior**

| Behavior | Telegraph | Wind-up | Damage | Counter-play |
|---|---|---|---|---|
| **Heart of the Forge** (every Anvil Strike now leaves a permanent lava puddle until end of fight, ~1 unit radius) | Puddle inherits the red circle's outline | n/a passive | 18% HP/s | Plan damage windows; arena becomes ~30% lava by 10% HP. Kill the boss fast or get pushed out. |

### Arena

**Octagonal forge floor**, ~10×10 units, with a central anvil (decorative obstacle, breaks line of sight, the hammer phases-through). Two molten-iron channels around the rim that occasionally surge (telegraph: yellow line on the rim for 1.0s) — passive hazard, teaches "watch the edges."

### Music cue

Heavy percussion drum loop on a **2/4 hammer beat** that matches the Anvil Strike wind-up — this is **mechanical foreshadowing through music** (an Archero 2 lesson: the boss's tempo *is* the soundtrack). Phase 2 introduces a metallic ring on hammer detachment. Phase 3 adds a low brass drone. **Audio brief tag:** `MUS_BOSS_EMBERFORGE_ANVILFATHER_HAMMERBEAT`.

### Signature screenshot moment

Phase 2 reveal: the hammer mid-flight in the foreground, separated from the boss body, both telegraphing simultaneously — yellow pulse on the hammer, red circle below the boss. The screenshot teaches the game's hybrid-template idea at a glance. **App Store screenshot frame 5 candidate.**

### Difficulty scaling (Tower reappearance)

1. Anvil Strike circle: 1.5 → 2.0 → 2.5 unit radius.
2. Hammer's independent attack cadence: 4.0s → 3.0s → 2.4s.
3. Lava puddles in Tower: appear from Phase 1 from floor 100+.
4. Wind-ups **do not** drop below 0.6s (regular) / 0.9s (Anvil Strike, since it's now floor-claiming).

### Reward bias

**Burning Forge Set** (Weapon + Bracelet; +fire DoT, +damage to enemies in red zones — matches Embercaller hero kit).

---

## 5. Prismfen, the Glassroot Mother

- **Codename:** `BOSS_GLASSROOT_PRISMFEN`
- **Display name:** Prismfen
- **Title:** The Glassroot Mother
- **Realm:** Glassroot Forest (Chapter 5)
- **Template:** **Mother** (textbook summoner; chapter 5 is the AoE / priority-target test)

### Lore stinger

> *The trees here remember being trees. She remembers being their grove-keeper. She is teaching them to be something else now.*

### Visual key

A six-armed dryad figure rooted to the arena floor, **bottom half is fused into a glass tree**, top half humanoid and glowing with prismatic light. Silhouette at portrait scale: **a wide vertical diamond** with branching arms. Palette: translucent glass, refraction rainbows on every plane, a single warm gold heart visible deep inside the trunk (= the weak spot the player should aim for). She does not move from her root.

### Phases

| Phase | HP gate | New question |
|---|---|---|
| 1 | 100 → 66% | Manage a steady wave of small adds while the stationary boss fires occasional homing orbs. |
| 2 | 66 → 33% | An elite add (Glasshound) appears once and demands focused DPS without ignoring the swarm. |
| 3 | 33 → 0% | A **shielded** phase: the boss is invulnerable until you kill the current wave of children. |

#### Phase 1 attacks (100 → 66%)

| Attack | Telegraph | Wind-up | Damage | Counter-play |
|---|---|---|---|---|
| **Glassbroods** (spawns 4 **Glassmote** adds every 6s — small, fast, low HP, melee) | Yellow circle on the floor at each spawn point | 0.8s | adds deal 20% HP on contact | AoE damage clears them; build for spread. |
| **Refract-Orb** (slow homing prismatic orb) | Blue line traces the orb's current path 0.5s ahead | 0.7s | 35% HP | Walk wide arcs; orb's turning radius is large. |

#### Phase 2 adds (66 → 33%) — **+1 entity**

| Entity | Telegraph | Wind-up | Damage | Counter-play |
|---|---|---|---|---|
| **The Glasshound** (one elite minion: half-Brute speed, charges in straight line, has a yellow telegraph cone) | 60° yellow cone, 1.0s wind-up | 1.0s | 55% HP per charge | Kill it (1/3 boss HP equivalent) or kite it through Glassmote spawns to clear both. |

The Glasshound is the **single most important add in the chapter** — beating Prismfen often means deciding when to ignore the swarm and kill the Glasshound. Boss continues all phase-1 attacks.

#### Phase 3 adds (33 → 0%) — **+1 behavior**

| Behavior | Telegraph | Wind-up | Damage | Counter-play |
|---|---|---|---|---|
| **Heartshield** (Prismfen wraps herself in a prismatic shell. While ≥1 Glassmote is alive, she is invulnerable. Spawns 8 Glassmotes immediately on phase trigger, then 4 every 8s.) | Visible prism shell shimmer (replaces her normal silhouette outline with a bright blue ring); **a number above her head shows live mote count** | n/a | n/a | Clear all motes between waves — the boss is exposed for ~2s after each clear. |

### Arena

**Circular grove**, ~9 unit radius, with 6 glass tree stumps as cover obstacles (block adds' line of sight, can be used to body-block charges). The floor refracts the boss's light — the only arena in the game where the **ground itself is bright**, by design (so red telegraphs need a thick black outline; we art-direct around it).

### Music cue

A glass-harmonica drone with a four-note repeating motif that **resolves** on each Glassmote spawn (the player learns to anticipate spawns by ear). Phase 2 adds a low cello when the Glasshound enters. Phase 3 layers a fast pizzicato strings line during the shielded windows. **Audio brief tag:** `MUS_BOSS_GLASSROOT_PRISMFEN_HARMONICA`.

### Signature screenshot moment

Phase 3: Prismfen surrounded by 8 Glassmotes, prismatic shield up, hero mid-AoE-clear with rainbow refraction lines lighting up the arena floor. **App Store screenshot frame 6 candidate.**

### Difficulty scaling (Tower reappearance)

1. Glassbrood spawn count: 4 → 5 → 6.
2. Refract-Orb: 1 → 2 orbs in flight at high floors.
3. The Glasshound appears in phase 1 from floor 100+.
4. Heartshield motes-per-wave from 8 → 10 → 12.

### Reward bias

**Prismlight Set** (Locket + Ring; +multishot, +pierce — matches Prismborn hero kit).

---

## 6. The Star-Wound

- **Codename:** `BOSS_HOLLOWSKY_STARWOUND`
- **Display name:** The Star-Wound
- **Title:** What Fell From the Sky
- **Realm:** Hollow Sky (Chapter 6)
- **Template:** **Conductor × Architect hybrid** (projectile-pattern body with teleport-and-claim-floor mechanics; chapter 6 is the **synthesis** chapter)

### Lore stinger

> *Something fell out of the sky when the suns shattered. It did not stop falling. It is still falling, here, where you found it.*

### Visual key

A torn wound in mid-air — a horizontal eye-shape that **leaks negative light** (the Dim incarnate). It has no body, only a center of darkness with rotating shards of star-matter orbiting it. Silhouette at portrait scale: **a horizontal lens** with rotating diamond points. Palette: pure indigo-black at center, prismatic-white shard edges, no warm tones at all. Its "movements" are jumps from one floating platform to another.

### Phases

| Phase | HP gate | New question |
|---|---|---|
| 1 | 100 → 66% | Read a rotating star-shard pattern that fires outward in 6 spokes. |
| 2 | 66 → 33% | The boss is now also placing **falling-debris** ground hazards on top of the projectile pattern. |
| 3 | 33 → 0% | The arena begins **breaking** — platforms fall away on a fixed cadence. |

#### Phase 1 attacks (100 → 66%)

| Attack | Telegraph | Wind-up | Damage | Counter-play |
|---|---|---|---|---|
| **Spoke** (6 projectile spokes radiating outward, rotating ~45°/s) | Blue lines along each spoke before fire | 0.9s | 30% HP per | Move *with* the rotation; don't fight it. |
| **Lurch** (boss jumps to one of 4 floating-platform anchors; brief invulnerability frame on arrival) | Yellow shimmer at landing anchor | 0.7s | n/a (movement) | Match the player position relative to the new anchor before the next Spoke. |

#### Phase 2 adds (66 → 33%) — **+1 attack**

| Attack | Telegraph | Wind-up | Damage | Counter-play |
|---|---|---|---|---|
| **Starfall** (3 red circles placed in a line along the player's last 0.5s of movement) | 3 red circles drawn sequentially, all resolve at 1.0s | 1.0s | 50% HP per | Reverse direction at telegraph spawn — the prediction line lags behind. |

#### Phase 3 adds (33 → 0%) — **+1 behavior**

| Behavior | Telegraph | Wind-up | Damage | Counter-play |
|---|---|---|---|---|
| **The Sky is Falling** (every 6s, one of the 4 floating platforms cracks and falls; falls 1.0s after a screen-wide yellow flash and an off-screen-edge arrow if the cracking platform is not currently visible) | Yellow border on the doomed platform; off-screen arrow if needed | 1.0s | 100% HP if standing on it | Move to a safe platform. There are always ≥2 safe platforms. Platforms regenerate after 10s. |

This is the chapter's signature **arena-as-attack** mechanic — adapted from Mighty DOOM's spatial phase shifts and Survivor.io's residue logic (see `enemies-and-bosses.md` §3).

### Arena

**4 floating platforms** arranged in a 2×2 grid, connected by narrow light-bridges. Total playable area shrinks across the fight; bridges block projectile lines (cover *and* hazard — Spokes don't path through bridges, but if a bridge platform falls the bridge falls with it). Inky-purple void below — falling is a one-shot, with the standard 4-condition safety rules.

### Music cue

A glitched, time-stretched version of the main Lucent theme played backwards under a sparse synth pad. Phase 2 adds a high sine-wave drone. Phase 3 adds a **descending** piano figure that loops every 6s — perfectly aligned with platform falls. The audio is teaching the rhythm. **Audio brief tag:** `MUS_BOSS_HOLLOWSKY_STARWOUND_INVERTED`.

### Signature screenshot moment

Phase 3 mid-platform-fall: hero leaping between two platforms, one platform cracking and tipping into the void below, 6 spokes radiating from the boss above. Maximum vertical drama. **App Store screenshot frame 1 candidate (the hero shot).**

### Difficulty scaling (Tower reappearance)

1. Spoke count: 6 → 8 → 12.
2. Lurch cadence: 4s → 3s → 2.5s.
3. Starfall: 3 circles → 4 → 5.
4. Platform-fall cadence: 6s → 5s → 4s (with a 2-platform-minimum floor that is **never** breached, per the 4-condition one-shot rule).

### Reward bias

**Starfallen Set** (Helm + Bracelet + Ring 3pc bonus; +damage in midair, +dodge on platform change — only set with a 3-piece bonus tied to a chapter mechanic).

---

## 7. The Long Dusk Itself

- **Codename:** `BOSS_LONGDUSK_DUSKITSELF`
- **Display name:** The Long Dusk
- **Title:** The Last Echo
- **Realm:** The Long Dusk (Chapter 7 — final realm at launch)
- **Template:** **Engine** (full 3-phase signature; this is the boss the entire game has been preparing the player to read)

### Lore stinger

> *It has no name. It is not a person, not an army, not a god. It is what remained when the suns went out. It has been waiting.*

### Visual key

The boss begins as a **silhouette of the player** — a black-on-indigo outline of the hero — and only gradually reveals itself as something larger and older. Silhouette at portrait scale: **starts mirroring the player's own silhouette**, ends as **a vast incomplete crown** of indigo void. Palette: pure indigo, void-black, single point of warm gold at its center (where its stolen shard sits). It moves by Echo: it teleports to where the player **was** a moment ago.

### Phases

| Phase | HP gate | New question |
|---|---|---|
| 1 | 100 → 66% | The boss mirrors your last 1.0s of movement. Move predictably, get hit; move erratically, win. |
| 2 | 66 → 33% | A second silhouette appears and Echoes your *opposite* direction. |
| 3 | 33 → 0% | The arena floor goes dark; only your character's indigo glow lights it. The boss attacks from the dark. |

#### Phase 1 attacks (100 → 66%)

| Attack | Telegraph | Wind-up | Damage | Counter-play |
|---|---|---|---|---|
| **Mirror Step** (boss teleports to player's position from 1.0s ago, then sweeps a 90° cone) | Yellow cone at arrival | 0.7s | 40% HP | Move erratically; the boss lags your movement. |
| **Dim-Reach** (a long, slow tendril extends from the boss along the line connecting player's two most recent positions) | Blue line from boss along player's recent path | 0.9s | 45% HP | Don't move in straight lines for long. |

#### Phase 2 adds (66 → 33%) — **+1 entity**

| Entity | Telegraph | Wind-up | Damage | Counter-play |
|---|---|---|---|---|
| **The Anti-Echo** (a second silhouette of the boss spawns, mirroring the player's movement on the **opposite** axis — if you go up-left, it telegraphs from down-right) | Boss-shape outline appears at the mirrored position; faint indigo trail | n/a (passive entity) | per its attack | Use the mirrored entity as a **compass** for safe positioning. |

The Anti-Echo uses the boss's Phase 1 attacks but is the only entity that can be temporarily stunned (5s) by dealing 15% of boss HP to it.

#### Phase 3 adds (33 → 0%) — **+1 behavior**

| Behavior | Telegraph | Wind-up | Damage | Counter-play |
|---|---|---|---|---|
| **The Long Dark** (arena lighting drops to ~15%; only the player's indigo aura, the boss's gold heart, and all telegraph layers remain visible — telegraphs are now the **only** thing the player can see clearly) | Screen-wide indigo flash on transition (1.2s phase-transition wind-up) | n/a | n/a (utility) | Trust the telegraph language. This is the final exam. |

This is the **culmination of Pillar 8**: in the final 33% of the final boss, the entire arena is reduced to the telegraph layer. If the player has been reading the language, they win. If they've been pattern-memorizing, they fail. The game has built up to this moment for 7 chapters.

### Arena

**Endless dark hall**, ~12×8 units, no walls visible — the floor just fades into indigo beyond a certain radius (the play area is fixed, but the visual horizon is not). One central pedestal where the boss's gold heart-shard glows. By phase 3, the pedestal is the only fixed point of reference.

### Music cue

The Lucent main theme played in full, but **drained of warmth**: the brass replaced with low cello, the percussion gone, the female narrator voice (yes, the same voice) speaking the realm's stinger line under the music at phase transitions. Phase 3 silences all instruments except a single sustained string note and the narrator's whispered "*Walk in.*" **Audio brief tag:** `MUS_BOSS_LONGDUSK_DUSKITSELF_FINAL`.

### Signature screenshot moment

Phase 3: a near-pure-black screen, the hero glowing indigo at center, two boss-shaped outlines arcing toward them from either side, a single yellow cone telegraph cutting through the dark. The whole game in one frame. **App Store screenshot frame 7 candidate (the hero shot, alternate).**

### Difficulty scaling (Tower reappearance)

The Long Dusk is the **Tower mode endgame boss** at floor 200+. Scaling:

1. Mirror Step delay: 1.0s → 0.7s → 0.5s (player movement window).
2. The Anti-Echo gains its own independent Dim-Reach at high floors.
3. The Long Dark phase begins at 50% HP instead of 33% from floor 250+.
4. No telegraph wind-up ever drops below 0.6s. The Long Dark phase remains the **only** lighting change in the game.

### Reward bias

**Last-Light Set** (full 6-piece set, all slots; +scaling damage as HP drops, +revive once per run — the only 6-piece set in launch and the most ambitious endgame chase).

---

# Recurring World Bosses

> Used in **weekly bossfights, special events, and guild raids**. Designed for re-fight engagement at week 50 — attack patterns must be **deeply readable and engaging on the 50th rep**, not just the first. These bosses **rotate realm reskin**: each takes on the local color palette and one local hazard, but the core readable mechanics never change. (Reskin = palette + 1 hazard swap, never new attacks.)

## 8. The Tessellate

- **Codename:** `WBOSS_TESSELLATE`
- **Display name:** The Tessellate
- **Title:** The Many-Sided Echo
- **Template:** **Conductor** (lighter version; 2-phase weekly fight, ~60s)

### Lore stinger

> *Wherever the Dim could not reach a corner, it grew sides instead.*

### Visual key

A floating tessellated polyhedron of indigo-and-glass facets, rotating slowly. Each visible facet is a **different color** — the player learns that the facet currently facing them is the one that will fire next. Silhouette at portrait scale: **a rotating crystal shape** with a single bright facet at any one time.

### Mechanics (2 phases, ~60s)

| Phase | New question | Attacks |
|---|---|---|
| 1 (100→50%) | Read which facet is "active" and predict its projectile pattern. | **Faceted Volley** (5-projectile fan; the *spread angle* depends on the active facet, color-coded by the facet's hue — blue facet = tight, red = wide, gold = arcing). 0.8s wind-up. |
| 2 (50→0%) | Two facets are active at once. | Same Faceted Volley, but fired from two facets on a 0.4s offset. Telegraphs do not stack — each is independent. |

### Why it works at week 50

The facet system is **combinatorial readability**: 4 facets × 2 active at a time = 6 unique pattern combinations per fight, but each combination is built from the same primitive (the 5-projectile fan with spread). Players never get bored because the *combination* is what's new, not the language. This is the Conductor template's strongest reusable expression.

### Arena, audio, screenshot

Hexagonal floor that takes the host realm's palette (e.g., cyan in Sunken Cathedral, gold in Emberforge). **Music:** a procedural arrangement that swaps instruments to match the active facet's color (cymbal for blue, snare for red, brass swell for gold). Screenshot moment: two facets glowing simultaneously, two projectile fans crossing the arena.

### Scaling

Higher event tiers add a 3rd active facet in phase 2; spread angle precision tightens by 5% per tier. Telegraphs never drop below 0.6s.

### Reward bias

Weekly event currency (**Cut-Light**) plus a small chance at a piece from any of the 8 launch sets. The reward is breadth, not depth.

---

## 9. Sothren, the Echoing Knight

- **Codename:** `WBOSS_SOTHREN`
- **Display name:** Sothren
- **Title:** The Echoing Knight
- **Template:** **Brute** (guild raid scale, 2-phase, ~120s with shared guild HP bar)

### Lore stinger

> *He died defending the gate of Iridian's first king. He has been defending it ever since.*

### Visual key

A knight in chipped, oversized armor, his **shield is twice his body's size** and is the readable threat. Silhouette: a small humanoid behind a massive rectangle. Palette: tarnished silver, dim-touched indigo seams in his armor, a small warm gold light visible through his visor.

### Mechanics (2 phases, ~120s, guild-shared HP)

| Phase | New question | Attacks |
|---|---|---|
| 1 (100→50%) | The shield blocks **all** damage from the front 180°; players must position behind him. | **Bulwark** (passive). **Charge** (straight-line dash, 1.0s wind-up, leaves a 4s lingering red trail). **Shield-Slam** (red half-circle in front, 0.9s wind-up, 60% HP). |
| 2 (50→0%) | He drops the shield; it becomes a movable hazard he kicks. | **Bulwark** off; he is vulnerable from any angle but faster. **Shield-Punt** (kicks the shield like a puck across the arena, 1.0s wind-up, blue line shows trajectory, 50% HP, shield bounces off walls 2 times). |

### Why it works at week 50

Sothren is built around the **positional puzzle** (front vs back), which is meaningful even with a guild of 8 attacking. Players coordinate ("flank") without voice chat. Phase 2 inverts the puzzle — now everyone is safe from his front, the shield is the threat. Two simple, mutually-exclusive questions, repeated weekly.

### Arena, audio, screenshot

A round courtyard, ~14×14 units (larger to accommodate guild members). **Music:** military low brass with a chorus of male voices on each Charge wind-up. Screenshot moment: 8 guild heroes flanking Sothren in phase 1, his shield-half red arc telegraphed across the front of the arena.

### Scaling

Guild-tier scaling: HP scales linearly with guild count + difficulty rank. Charge cadence tightens. Shield-Punt becomes 2 simultaneous shields at top tier. **Never** introduces a new attack — purely scales the two existing ones.

### Reward bias

Guild currency (**Oathmark**) + chance at a **Sothren's Plate** consumable that gives next run a one-time damage shield. No gear drops — Sothren is about guild-event currency.

---

## 10. The Memory Bloom

- **Codename:** `WBOSS_MEMORYBLOOM`
- **Display name:** The Memory Bloom
- **Title:** The Garden That Remembered Wrong
- **Template:** **Mother × Architect hybrid** (lighter weekly event boss, 3 phases but each phase is brief, ~75s total)

### Lore stinger

> *A flower bloomed where a Lucent-bearer fell. It is trying to grow into what she was.*

### Visual key

A massive flower of glass petals, rooted in the arena center, with **petals that close protectively over its glowing core** when threatened. Silhouette: a wide rounded shape with a bright center that opens and closes. Palette: prismatic-white petals, indigo core, the only entirely-symmetric boss in the roster.

### Mechanics (3 short phases, ~75s)

| Phase | New question | Attacks |
|---|---|---|
| 1 (100→66%) | Petals closed = boss invulnerable. Wait for them to open (2s window every 4s) and burst damage. | **Closed** (invulnerable; passive). **Open** (vulnerable; emits a slow ring of 12 projectiles outward, gap at a randomly-chosen petal). 0.8s wind-up. |
| 2 (66→33%) | Petals open more often but spawn **Glassmote** swarmers on each open. | Open cycle: 3s closed, 3s open. Each open spawns 3 Glassmotes. |
| 3 (33→0%) | A persistent floor pattern emerges — 5 flower-shaped puddles of slow indigo growth. | Open cycle stable. **Bloom-Floor** (5 small persistent indigo puddles grow from petal-base positions; standing in them slows player 25%). |

### Why it works at week 50

The Memory Bloom is the only world boss with a **damage-window mechanic**, which keeps it fresh for weekly play because the player must rebuild their burst-damage habit each week. Different heroes solve it differently — a Frostshard freeze-locks the petals open, a Dawnbow lines up multishot down the corridor between two petals.

### Arena, audio, screenshot

Circular glass-floored garden with 5 stone basins around the rim (cover from the projectile ring). **Music:** a slow waltz in 6/8 that pauses on each "Closed" phase, resumes on "Open." Phase 3 adds a faint hum that grows with each Bloom-Floor puddle. Screenshot moment: petals fully open, 12-projectile ring mid-resolution, hero lining up a multishot down the corridor.

### Scaling

Open windows shorten with event tier (3s → 2.5s → 2s). Mote spawns scale (3 → 4 → 5). Bloom-Floor puddles never exceed 8.

### Reward bias

Weekly event currency (**Lightseed**) + **Memory** consumables that randomize the player's first 3 ability picks in the next run (reroll-style — niche but beloved).

---

# Sky Tower Capstone — The Compound

> Per Pillar 7 (multi-mode) and `research/games/archero-2.md` (Archero 2's Sky Tower floor 95–100 difficulty cliff is the **#1 endgame complaint** — players bounce there because the spike is **unsignaled** and **unfair**). The Sky Tower capstone exists to fix that pattern: it must be **hard but fair**, with the difficulty coming from **combinations the player has already faced**, not new attacks.

## 11. The Compound

- **Codename:** `BOSS_TOWER_COMPOUND`
- **Display name:** The Compound
- **Title:** Everything You've Learned, All At Once
- **Appears at:** Tower floors **50, 100, 150** (and every 50 floors thereafter, scaling).
- **Template:** **Engine** (frame), but each phase is **literally a phase from a prior boss** — no new attacks anywhere.

### Lore stinger

> *The Dim has been studying you. It has all your lessons memorized.*

### Visual key

An **abstract silhouette** that, in each phase, takes the **outline** of the boss whose mechanics it's currently using. Players read the silhouette change as the phase-transition signal. Palette: pure indigo with bright outline only — no internal detail, so the player's attention stays on telegraphs.

### Phases

**The Compound is a 3-phase fight; each phase is drawn directly from prior bosses, and the player is told (visually, via silhouette and arena reskin) which one.**

| Floor | Phase 1 | Phase 2 | Phase 3 | Why this combination |
|---|---|---|---|---|
| **50** | The Lanternwight Phase 1 | The Tide-Echo Phase 1 | Aurelith Phase 1 | First 3 chapters, single-question phases — confidence check. |
| **100** | The Tide-Echo Phase 2 (Ring of the Faithful + flood wave) | Anvilfather Phase 2 (separated hammer) | Prismfen Phase 3 (Heartshield) | Second-question phases — endurance check. |
| **150** | Star-Wound Phase 3 (platform falls) | The Long Dusk Phase 2 (Anti-Echo) | Long Dusk Phase 3 (Long Dark) | Hardest learned phases — mastery check. The "graduation." |

### Fairness rules (mandatory)

These are the **non-negotiable** constraints that prevent the Archero 2 cliff:

1. **No new attacks, ever.** Every projectile, AoE, hazard, and behavior must already exist on a prior boss. Telegraphs use the same primitives, colors, and wind-ups.
2. **The phase combination is announced.** On the Tower run screen *before the floor starts*, the player sees: "Floor 100 — Echoes of: Tide-Echo, Anvilfather, Prismfen." This pre-warns the wall (per `archero-2.md` lessons-learned recommendation #5).
3. **Wind-ups stay at or above the chapter-original.** Floor 150's Long Dark phase still uses a 1.2s phase-transition flash; we **never** shorten it.
4. **HP is the dial**, not telegraph speed. The Compound has roughly 2.5× / 4× / 6× the HP of the original phases at floors 50 / 100 / 150 respectively, but uses the **same attack frequencies**.
5. **Revives are unrestricted.** One revive per Tower run is permitted at the Compound floor (vs the standard one-per-run rule, this gives the player two chances at the wall).
6. **Failure is legible.** Replay the last 4 seconds in your head — every death must trace to a missed read, not a hidden mechanic.

### Arena

A **shifting backdrop** that swaps between the 3 prior arenas in the combination, in sync with phase transitions. Phase transition includes a 1.5s "loading" beat — short enough not to break flow, long enough to let the player reset their reading.

### Music cue

A medley: each phase plays its **original boss's music** at +1 BPM. The medley structure is the player's audio cue for what's coming next. **Audio brief tag:** `MUS_BOSS_TOWER_COMPOUND_MEDLEY`.

### Signature screenshot moment

Floor 150 phase 3: the Long Dark — the boss has taken Long Dusk's silhouette, two telegraph cones glowing yellow in near-pure-black, hero glowing indigo at center, with the floor counter "150" visible at the screen edge. **Endgame screenshot.**

### Reward bias

- **Floor 50:** Guaranteed Epic set piece (player's choice of any launch set).
- **Floor 100:** Guaranteed Legendary set piece + 1 random Awakened weapon recipe **hint** (per Pillar 7 hidden-recipe system).
- **Floor 150:** Mythic-tier gear roll + cosmetic title "Echo-Eater." Floor 150 is **repeatable weekly** for currency.

### Scaling beyond floor 150

Floors 200, 250, 300+ continue the Compound but rotate the 3 phases used (e.g., floor 200 might use Phase 2 of every world boss). Mechanic catalog is **fixed at launch**; only combinations change. This is the same lesson from Archero 2's Sky Tower top-floor design: *endgame doesn't need new bosses, it needs new combinations* (`enemies-and-bosses.md` §5, Lesson 6).

---

# Readability Checklist (Sign-Off Contract)

> Every boss in this document — and every boss authored post-launch — must pass this checklist before milestone review. If a boss fails any single item, it does not ship. This is **not** a guideline; it is a gate. The checklist is reviewed by the design lead at QA milestone and signed off in the project's milestone doc.

### Color discipline
- [ ] **Red** is used only for "this will damage you now or imminently." Never for friendly effects, never for boss HP bars, never for environment art that could be misread as a hazard.
- [ ] **Yellow** is used only for "warning, soon" — telegraph rings, wind-up halos, off-screen indicators.
- [ ] **Blue** is used only for projectile paths and friendly effects. Boss ranged-attack trajectories are blue *before* they resolve, red *during* damage frames.
- [ ] No third-party color (purple, green, etc.) carries threat semantics in any boss fight.

### Shape primitives only
- [ ] All AoEs use **filled circle**, **filled rectangle (line/beam)**, **filled cone**, or **ring**. No bespoke organic shapes, no irregular polygons, no boss-unique AoE silhouettes.
- [ ] Persistent floor hazards use the same shapes as their generating attack (e.g., the Anvilfather's lava puddles inherit Anvil Strike's circle outline).
- [ ] No AoE shape may be visually identical to another at the same time on screen unless the two are the same attack (size + outline pattern + fill animation must differ).

### Wind-up minimums
- [ ] **≥0.6s** on every regular attack.
- [ ] **≥1.0s** on phase-transition attacks and on any attack that can do >50% HP.
- [ ] **≥1.2s** on one-shot mechanics and phase-transition stingers (e.g., The Anvilfather's hammer separation, Aurelith's Choir-Beam, The Long Dusk's phase 3 transition).
- [ ] **No wind-up ever drops below 0.6s at any Tower scaling tier.** This is the hardest of the cliffs the design avoids — the temptation to shorten wind-ups for difficulty is constant; the rule is firm.

### Audio cue parity
- [ ] Every visual telegraph has a layered audio cue. Off-screen audio cues are mixed louder than on-screen ones (the player's thumb covers ~20% of the screen).
- [ ] One-shot mechanics get a **unique audio cue** (not a louder version of a normal attack — a fundamentally different timbre).
- [ ] Phase transitions have a single bell-tone or low brass swell, distinct from any in-fight audio.

### Off-screen attack indicators
- [ ] Any attack whose telegraph originates off-screen has an **arrow at the screen edge** pointing inward, of at least 1.0s duration, in yellow (or red if imminent).
- [ ] The Star-Wound's platform-fall mechanic is the test case: if the doomed platform is off-screen, the arrow must be present.

### One-shot 4-condition rule
Every one-shot mechanic must satisfy **all four** conditions (per `enemies-and-bosses.md` §7):

- [ ] **Telegraphed ≥1.0s** with a unique visual.
- [ ] **Avoidable by movement alone** — never by a finite resource (no "you needed dash") within the 0.4s reaction window.
- [ ] **Spatially predictable** — the player can position to be safe before the telegraph spawns. Boss room geometry always allows a non-obvious safe spot.
- [ ] **Failure is legible** — on death, the player can replay the last 2 seconds and say "I should have moved left."

### Additional invariants
- [ ] Maximum **3 simultaneous telegraph indicators** on-screen at once. Excess attacks queue.
- [ ] Telegraph layer renders **above** enemy bodies, **below** player + HUD.
- [ ] Cancellable telegraphs **fade or pop**, never blink off.
- [ ] All boss attacks must be authored such that an average player on chapter-appropriate gear can survive **at least one mistake per fight** (i.e., no single attack at chapter level deals >70% HP on a clean hit at recommended gear power).

---

# Boss Difficulty Curve (Chapters 1→7)

> **Design goal:** A player with chapter-appropriate gear and average build luck beats the chapter boss in **≤3 attempts**. Tighter than that and we're too easy; looser than that and we're losing F2P players, per Mighty DOOM's chapter-5–6 lesson (`design/00-design-pillars.md` Pillar 5). The numbers below are relative; tune in playtest.
>
> **Power assumptions.** HP and damage figures are normalized to the player's **expected HP at chapter unlock**. "1.0×" damage = the player's expected max HP at that chapter, in one hit. The player's expected HP grows ~25% per chapter via gear and talents.

| Chapter | Boss | Template | Boss HP (× chapter elite) | Per-hit damage (× player HP) | Phases | Distinct attacks (across all phases) | One-shot mechanics | Expected attempts |
|---|---|---|---|---|---|---|---|---|
| 1 | The Lanternwight | Brute | 14× | 0.45 max | 3 | 3 | 0 | 1–2 |
| 2 | The Tide-Echo | Conductor | 16× | 0.40 max (per projectile) | 3 | 3 + 1 arena event | 0 | 2 |
| 3 | Aurelith | Architect | 18× | 0.70 max (Choir-Beam) | 3 | 3 + 1 floor hazard | 0 (Choir-Beam is high but escapable) | 2–3 |
| 4 | The Anvilfather | Brute × Engine | 22× | 0.60 max (Anvil Strike) | 3 | 4 (two entities) | 0 | 2–3 |
| 5 | Prismfen | Mother | 24× | 0.55 max (Glasshound charge) | 3 | 3 + 2 entities | 0 | 2–3 |
| 6 | The Star-Wound | Conductor × Architect | 28× | 0.50 max + 1.0× (platform fall) | 3 | 3 + arena destruction | 1 (platform fall; 4-condition compliant) | 3 |
| 7 | The Long Dusk Itself | Engine | 35× | 0.45 max (Mirror Step) + lighting change | 3 | 4 (with Anti-Echo) | 1 (phase 3 lighting drop) | 3 |

### Curve commentary

- **Chapter 1 (Lanternwight)** must be beatable on the first attempt by an average player. The Brute template is the most readable; the boss exists to teach the language, not to wall the player.
- **Chapter 2 (Tide-Echo)** introduces projectile pattern reading. The flood-wave arena event is the player's first encounter with arena-as-attack; the boss is forgiving (low per-projectile damage, large gaps).
- **Chapter 3 (Aurelith)** is the first **arena-management** boss. Choir-Beam is the chapter's highest single hit and the **first attack that requires a real read** (1.2s wind-up but takes 70% HP). Acceptable difficulty cliff because the wind-up is honest.
- **Chapter 4 (Anvilfather)** is the first **two-entity** fight. Difficulty bump from learning to track two telegraphs at once. This is the *first* boss where most players will fail and learn.
- **Chapter 5 (Prismfen)** introduces **priority targeting** as a skill. Players who built pure single-target struggle; players with AoE breeze through — both feel right.
- **Chapter 6 (Star-Wound)** introduces **arena destruction** and the first true one-shot (platform fall). Acceptable because the safe-platform count is bounded below at 2 and the arrow indicator system is engaged.
- **Chapter 7 (Long Dusk)** is the **final exam**. Every prior reading skill is needed. Phase 3's lighting change is the only one-shot-class environment mechanic in the game, designed to feel earned. We accept 3 attempts at this chapter as the **upper bound** — beyond 3 we have a problem; below 2 we are too easy.

### Scaling levers in order of preference

(Repeated from `enemies-and-bosses.md` §8.4 for proximity to the design table.)

1. **Attack frequency** — most fun to scale.
2. **Projectile count per attack** — second most fun.
3. **Projectile speed** — third.
4. **Phase compression** — phases trigger earlier in the HP bar.
5. **Enemy / add density** — for Mother-template bosses.
6. **Damage values** — least fun; only use when other levers exhausted.

**Never scale by shortening telegraphs below the minimum (0.6s normal, 1.0s one-shot, 1.2s phase-transition).** This is the readability checklist's hardest rule, and the difficulty curve respects it across every chapter and every Tower floor.

---

## Closing Note

The 7 chapter bosses, 3 world bosses, and 1 capstone are intentionally built from a **small vocabulary** of templates, shapes, and colors. The depth comes from **combinations**, not invention — the same lesson that lets a great fighting game stay fresh for years on the same move list. By chapter 7, the player will have read every primitive in the language. The Long Dusk's phase 3 is the moment that vocabulary becomes mastery: in near-darkness, with only the telegraph layer visible, **a player who has been paying attention can still win the fight.**

That is the contract. The roster above honors it.
