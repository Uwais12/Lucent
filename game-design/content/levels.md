# Levels & Chapter Structure — Lucent: Shards of the Shattered Sun

Encounter-design spec for the 7 launch realms. 20 rooms × 7 chapters = **140 room templates**. This document defines the *shape* of each room (arena, hazards, enemy composition, wave triggers). Exact stat values for enemies and bosses live in `content/enemies.md` and `content/bosses.md`. Procedural seed rules and difficulty math live below.

All chapters follow the 20-room template in `design/01-core-loop-spec.md` §3 (1–4 light, 5 offer, 6–9 medium, 10 shop, 11–14 heavy, 15 offer, 16–19 hardest with mini-boss in 18 or 19, 20 boss).

The 12 launch archetypes (per `content/enemies.md`): **Husk** (melee charger), **Slinger** (shooter), **Lancer** (sniper), **Boulder** (tank), **Mote** (speeder swarmer), **Hivekeeper** (summoner), **Pyre** (bomber), **Caller** (AoE caster), **Mender** (healer), **Warden** (elite), **Delver** (burrower), **Splitkin** (splitter). Each chapter biome-reskins these.

Offer-givers (core-loop §4): **Angel of Dawn** (free Rare/Epic), **Devil of Dusk** (Legendary at −30% max HP), **The Lucent Sprite** (re-roll top ability family).

---

## Chapter 1 — The Vale of First Light

### Chapter overview

- **Biome**: A sunlit meadow of long grass and broken stone walls, ruined village at the eastern edge. Pollen-motes drift through the air. The Dim creeps in at the corners as a soft violet vignette — present, not yet hostile.
- **Color palette**: Soft moss green, wheat gold, dawn-pink stone. Indigo bruise at screen edges.
- **Lore stinger** (narrator, after room 1 clear): *"They left the lanterns burning."*
- **Music cue**: `mus_arena_pastoral_A` — folk-flute lead over sustained strings; combat-intensity RTPC drops brass.
- **Featured hazards**: None. Chapter 1 is hazard-free on purpose — the only thing the player learns is the joystick and the dodge.
- **Featured enemies (5 of 12)**: Husk-Drifter, Slinger-Lantern, Mote-Wisp, Pyre-Tallow, Mender-Acolyte. (Lancer, Boulder, Caller, Hivekeeper, Warden, Delver, Splitkin debut in later chapters.)
- **Chapter boss**: **Echo of the Lantern-Keeper** — a sorrowful drifting figure carrying a broken lantern (single-phase mini-boss-style; charging melee template). Full design in `content/bosses.md`.
- **Expected player level at first clear**: Hero level 3–5, all Common gear, 1 Rare drop possible.

### 20-room layout

| # | Type | Shape & composition | Hazard |
|---|---|---|---|
| 1 | Light | Small square arena. 2 Husk-Drifters, wave 1 only. Generous space. | — |
| 2 | Light | Wide rectangular arena. 3 Husk-Drifters wave 1, +1 Slinger-Lantern wave 2. | — |
| 3 | Light | Pillared courtyard (4 cover blocks). 2 Slinger-Lanterns wave 1, +2 Husk-Drifters wave 2. | — |
| 4 | Light | Square arena. 4 Mote-Wisps wave 1, +1 Slinger-Lantern wave 2. First swarm taste. | — |
| 5 | **Offer** | Sun-dappled glade, no combat. Angel / Devil / Sprite spawn at center. | — |
| 6 | Medium | Square arena. 3 Husk-Drifters + 2 Slinger-Lanterns simultaneous wave 1. | — |
| 7 | Medium | L-shaped arena. 6 Mote-Wisps wave 1 (swarm intro), +2 Slingers wave 2. | — |
| 8 | Medium | Long rectangle. 1 Pyre-Tallow wave 1 (first bomber tutorial), +3 Husks wave 2. | — |
| 9 | Medium | Square arena, broken pillar in center. 2 Slingers diagonal opposite corners, +3 Mote-Wisps wave 2. | — |
| 10 | **Shop** | Ruined chapel. 3 ability cards + 1 heal stand (40g heal for 50% HP). | — |
| 11 | Heavy | Wide arena. 3 Husks + 2 Slingers wave 1, +1 Mender-Acolyte wave 2 (priority-target tutorial). | — |
| 12 | Heavy | Square arena. 1 Pyre + 4 Mote-Wisps wave 1, +1 Slinger wave 2. | — |
| 13 | Heavy | Pillared courtyard. 3 Slingers wave 1, +2 Husks wave 2, +1 Pyre wave 3. | — |
| 14 | Heavy | Long rectangle. 8 Mote-Wisps wave 1, +1 Mender-Acolyte wave 2 (heals the swarm). | — |
| 15 | **Offer** | Lantern-circle clearing. Higher-tier menu unlocks if same offer-giver picked at room 5. | — |
| 16 | Hardest | Square arena. 4 Husks + 2 Slingers + 1 Mender, simultaneous. | — |
| 17 | Hardest | Pillared arena. 2 Pyres + 4 Husks wave 1, +2 Slingers wave 2. | — |
| 18 | Hardest **mini-boss** | Wide arena. **Warden-Drifter** (elite Husk, 4× HP, gains a 360° push attack at 50% HP). +2 Slinger adds. | — |
| 19 | Hardest | Rest beat. 3 Slingers + 4 Mote-Wisps. Generous heart drop on clear. | — |
| 20 | **Boss** | Lantern-Keeper arena: large circular meadow, ring of burnt lanterns at perimeter. Single phase, charge + cone-projectile loop. | — |

---

## Chapter 2 — Sunken Cathedral

### Chapter overview

- **Biome**: A drowned holy city. Half-submerged nave, kelp curtains, light filters from a broken ceiling. Floor is patchwork tile and shallow water.
- **Color palette**: Cyan and seafoam, pale weathered stone, slivers of gold inlay. Lucent indigo refracted through water.
- **Lore stinger**: *"The prayers are still echoing."*
- **Music cue**: `mus_arena_cathedral_B` — choral pad over deep cello drone; combat layer adds a slow rhythmic anvil.
- **Featured hazards**: **Flooding tiles** — at room start, 1–3 tiles per room mark with a blue glow and begin to rise. After 12 seconds they become impassable water (block movement and projectiles). Forces the player to commit to a sub-arena. Tiles drain after wave clear.
- **Featured enemies (6 of 12)**: Husk-Drowned, Slinger-Chorister, Lancer-Anchor (debut), Mote-Minnow, Mender-Cleric, Caller-Hymn (debut).
- **Chapter boss**: **Echo of the Drowned Choir** — a chorus of three suspended bell-ringers sharing one HP bar (2-phase projectile-pattern boss). Full design in `content/bosses.md`.
- **Expected player level at first clear**: Hero level 8–12, full Common + 1–2 Rare gear, 1 Epic possible from Vale farming.

### 20-room layout

| # | Type | Shape & composition | Hazard |
|---|---|---|---|
| 1 | Light | Submerged nave, narrow. 3 Husk-Drowned wave 1. | 1 flooding tile, slow rise |
| 2 | Light | Square arena. 2 Husk-Drowned + 2 Slinger-Choristers wave 1. | — |
| 3 | Light | Wide rectangle. 4 Mote-Minnows wave 1, +2 Husks wave 2. | 2 flooding tiles |
| 4 | Light | Pillared arena. **Lancer-Anchor debut** — 1 Lancer (long red telegraph line) + 2 Husks. | — |
| 5 | **Offer** | Altar chamber, no combat. | — |
| 6 | Medium | Square arena. 1 Lancer + 3 Slingers wave 1, +2 Husks wave 2. | 2 flooding tiles |
| 7 | Medium | L-shaped arena. **Caller-Hymn debut** — 1 Caller (red circle drops on player) + 3 Husks. | — |
| 8 | Medium | Long rectangle. 1 Lancer + 1 Caller, both at far end. 4 Mote-Minnows rush from sides. | 1 flooding tile, center |
| 9 | Medium | Cross-shape arena. 4 Slingers in each arm's corner. | 4 flooding tiles, one per arm |
| 10 | **Shop** | Bell-tower interior. 3 ability cards + 1 heal stand (60g for 50% HP). | — |
| 11 | Heavy | Wide arena. 2 Callers + 3 Husks wave 1, +2 Slingers wave 2. | 3 flooding tiles |
| 12 | Heavy | Square arena. 1 Lancer + 1 Mender-Cleric + 4 Husks. Mender heals Lancer. | 2 flooding tiles |
| 13 | Heavy | Pillared courtyard. 2 Lancers in opposite corners, 4 Mote-Minnows from center. | — |
| 14 | Heavy | Long rectangle. 1 Caller + 1 Mender + 6 Mote-Minnows. | 3 flooding tiles |
| 15 | **Offer** | Inverted dome (light from below). Stage-2 menu if repeating. | — |
| 16 | Hardest | Square arena. 2 Callers + 2 Lancers + 2 Husks. | 3 flooding tiles, staggered |
| 17 | Hardest | Wide arena. 1 Mender + 3 Slingers + 1 Lancer wave 1, +4 Husks wave 2. | 2 flooding tiles |
| 18 | Hardest **mini-boss** | Cathedral nave. **Warden-Chorister** (elite Slinger, fires 5-projectile fan, 6× HP). +1 Mender add (must die first). | 2 flooding tiles |
| 19 | Hardest | Rest beat. 4 Mote-Minnows + 1 Caller. Big heart drop. | 1 flooding tile |
| 20 | **Boss** | Sunken nave arena, ring of submerged columns. 3 bells suspend from broken ceiling; floor is a flat circle. | Flooding tile cycle (4 tiles, 8s rise / 4s drain) |

---

## Chapter 3 — Frostspire

### Chapter overview

- **Biome**: A wind-cut mountain peak under an unbroken aurora. Crystal cliffs refract prismatic light. Snow drifts at corners; ice underfoot.
- **Color palette**: Ice-white, glacier blue, prismatic violet refractions. Aurora green at horizon line.
- **Lore stinger**: *"She climbed to call the sun back."*
- **Music cue**: `mus_arena_aurora_A` — sustained string drone, sparse piano motif, wind layer; combat layer adds choral whisper.
- **Featured hazards**: **Falling icicles** — yellow telegraph dots appear, then 1.0 s later a vertical projectile drops from off-screen-top, dealing damage in a 1-tile radius. Reads as a small circle. 2–6 per room, spawn rates vary. **Slick ice patches** in some rooms cause a 0.3 s slide after the joystick is released (delays auto-fire by 0.3 s).
- **Featured enemies (6 of 12)**: Husk-Frozen, Slinger-Shardspine, Lancer-Hoarbrand, Mote-Sleet, Boulder-Hoarfrost (debut), Caller-Aurora.
- **Chapter boss**: **Echo of the Skywalker** — a frozen figure who calls aurora-beam sweeps (2-phase laser-and-spin boss). Full design in `content/bosses.md`.
- **Expected player level at first clear**: Hero level 14–18, Rare gear standard, 1–2 Epic pieces, first Inscription tier visible.

### 20-room layout

| # | Type | Shape & composition | Hazard |
|---|---|---|---|
| 1 | Light | Open snowfield. 3 Husk-Frozen + 1 Slinger-Shardspine. | 2 icicle drops |
| 2 | Light | Narrow ridge (long rectangle). 2 Slingers at far end, 2 Husks rush. | 3 icicle drops, 1 ice patch |
| 3 | Light | Crystal cavern. 4 Mote-Sleets wave 1, +1 Slinger wave 2. | 1 ice patch |
| 4 | Light | Square arena. **Boulder-Hoarfrost debut** — 1 Boulder (8× HP, slow) + 2 Slingers behind it. | — |
| 5 | **Offer** | Aurora overlook, no combat. | — |
| 6 | Medium | Wide arena. 1 Boulder + 2 Husks + 2 Slingers. | 2 icicle drops |
| 7 | Medium | Pillared (crystal columns). 2 Lancers at corners + 4 Mote-Sleets wave 2. | 3 icicle drops |
| 8 | Medium | L-shape. 1 Caller-Aurora + 3 Husks wave 1, +1 Boulder wave 2. | 2 ice patches |
| 9 | Medium | Open snowfield. 1 Caller + 1 Lancer + 4 Mote-Sleets. | 4 icicle drops |
| 10 | **Shop** | Crystal alcove. 3 ability cards + 1 heal stand (80g for 50% HP). | — |
| 11 | Heavy | Square arena. 2 Boulders + 3 Slingers. DPS-priority test. | 2 icicle drops |
| 12 | Heavy | Cross-shape. 2 Callers + 4 Husks. | 2 ice patches |
| 13 | Heavy | Wide arena. 1 Boulder + 2 Lancers + 3 Husks. | 3 icicle drops |
| 14 | Heavy | Pillared courtyard. 1 Caller + 1 Lancer + 1 Mender-equivalent (Caller in heal mode? No — use Husk count) — 4 Husks + 1 Caller + 1 Lancer. | 4 icicle drops |
| 15 | **Offer** | Ice plateau, stage-2 menu. | — |
| 16 | Hardest | Square arena. 2 Boulders + 2 Callers + 2 Slingers. | 3 icicle drops, 2 ice patches |
| 17 | Hardest | Long rectangle. 2 Lancers far end + 5 Mote-Sleets rush + 2 Husks side. | 4 icicle drops |
| 18 | Hardest | Wide arena. 1 Caller + 1 Boulder + 1 Lancer + 3 Husks. Composition test. | 3 icicle drops |
| 19 | Hardest **mini-boss** | Crystal cathedral. **Warden-Hoarfrost** (elite Boulder, 12× HP, slam attack creates 3 expanding ice rings). +2 Slinger adds. | 2 ice patches |
| 20 | **Boss** | Aurora platform, circular ice plateau over a chasm. Edges are death-fall (3 free hops back, then a death pulse). | Continuous icicle rain (1/3 s) outside a moving safe-zone |

---

## Chapter 4 — Emberforge

### Chapter overview

- **Biome**: An abandoned volcanic foundry under perpetual ashfall. Cold-glowing forges line the walls. Cracks in the floor pulse orange — they were never hot, but the Dim animates the ash. The light is wrong: orange where it should be, but cold to the touch.
- **Color palette**: Black ash, ember orange, soot gray. The Lucent palette glows in stark contrast — the player is a clear violet light.
- **Lore stinger**: *"The forges never cooled. They were never hot."*
- **Music cue**: `mus_arena_forge_B` — deep anvil percussion, low brass drone; combat layer adds a piano dissonance.
- **Featured hazards**: **Lava cracks** — thin orange lines on the floor, 1.5 s yellow telegraph, then a 4 s damaging line. Patterns: cross, X, parallel-stripe, expanding-ring. 2–6 lines per room. **Falling cinders** — small AoE drops with a 0.9 s telegraph circle, 1–4 per room.
- **Featured enemies (6 of 12)**: Husk-Slag, Slinger-Bellows, Pyre-Cinder, Caller-Forge, Hivekeeper-Anvil (debut), Mender-Bellowtender.
- **Chapter boss**: **Echo of the Master Smith** — armored figure that summons cinder-imps and slams the floor (3-phase summoner+slam boss). Full design in `content/bosses.md`.
- **Expected player level at first clear**: Hero level 22–28, Epic gear standard, first Legendary attempt visible in the gear math.

### 20-room layout

| # | Type | Shape & composition | Hazard |
|---|---|---|---|
| 1 | Light | Forge floor. 4 Husk-Slag wave 1, +1 Pyre wave 2. | 2 lava cracks (parallel) |
| 2 | Light | Square arena. 2 Slinger-Bellows + 2 Husks. | 2 lava cracks (cross) |
| 3 | Light | L-shape. **Hivekeeper-Anvil debut** — 1 Hivekeeper (stationary, spawns 3 imps every 4 s) + 2 Husks. | 1 cinder drop |
| 4 | Light | Wide rectangle. 1 Pyre + 3 Slingers + 2 Husks. | 3 lava cracks, staggered |
| 5 | **Offer** | Cooled anvil hall. Higher pressure to take Devil's offer — chapter is meant to push the player here. | — |
| 6 | Medium | Square arena. 1 Hivekeeper + 1 Caller + 3 Husks. Priority test. | 2 cinder drops |
| 7 | Medium | Pillared. 2 Slingers + 1 Caller + 1 Pyre wave 1, +3 Husks wave 2. | 3 lava cracks (X) |
| 8 | Medium | Cross-shape. 1 Hivekeeper center + spawns to all 4 arms. | 4 cinder drops |
| 9 | Medium | Wide arena. 2 Pyres + 4 Husks wave 1, +1 Caller wave 2. | 2 lava cracks (parallel) |
| 10 | **Shop** | Cold forge. 3 ability cards + 1 heal stand (120g for 50% HP). **Prices jump here** — telegraphed soft-cap moment. | — |
| 11 | Heavy | Square arena. 2 Callers + 1 Hivekeeper + 2 Slingers. Telegraph + AoE saturation. | 3 cinder drops + 2 lava cracks |
| 12 | Heavy | Long rectangle. 3 Pyres staggered + 3 Husks + 1 Slinger. Kamikaze pressure. | 2 lava cracks (parallel) |
| 13 | Heavy | Pillared. 1 Mender-Bellowtender + 1 Caller + 3 Husks + 2 Slingers. Mender is priority. | 3 cinder drops |
| 14 | Heavy | Wide arena. 2 Hivekeepers in opposite corners + 1 Pyre roaming. | 3 lava cracks (cross) |
| 15 | **Offer** | Furnace-mouth. Devil offers Legendary Mythstone-class abilities; Angel offers double-rarity boost. The point is to over-equip the player before the wall hits room 16. | — |
| 16 | Hardest | Square arena. 1 Hivekeeper + 1 Caller + 1 Mender + 2 Slingers. Full composition test. | 3 cinder drops |
| 17 | Hardest | Long rectangle. 2 Callers far end + 2 Pyres rush + 3 Husks side. | 4 lava cracks (X + parallel) |
| 18 | Hardest | Wide arena. 1 Mender + 1 Hivekeeper + 2 Slingers + 3 Husks. | 3 cinder drops + 2 lava cracks |
| 19 | Hardest **mini-boss** | Forge-floor arena. **Warden-Bellows** (elite Slinger, fires 7-projectile fan + 1 Pyre summon every 8 s). +2 Husk adds. | 2 lava cracks (ring) |
| 20 | **Boss** | Smith's hall: circular forge floor, 4 corner anvils. | Ring of lava cracks closes inward each phase |

---

## Chapter 5 — Glassroot Forest

### Chapter overview

- **Biome**: A petrified woodland where the trees have crystallized into translucent prisms. Sap froze into rainbow glass. Footsteps tinkle. Light refracts visibly off every surface.
- **Color palette**: Refraction-rainbow trunks (subtle), midnight green undergrowth, white-violet sky. Player projectiles refract into 2–3 sub-arcs when passing trunks (visual flair, no mechanical effect).
- **Lore stinger**: *"Sap turned to glass. Glass remembers."*
- **Music cue**: `mus_arena_pastoral_A` (Vale reprise, transposed up a fourth, with bell-tree percussion). Intentional callback — the Vale's music remembers itself.
- **Featured hazards**: **Refracted laser beams** — Lancer-Glassroot snipers' beams pass through trees and refract into 2 sub-beams. **Glass shards** — destructible cover that on break drops a 1 s circular AoE telegraph (cinder-like). **Splitkin debut**: enemies divide on death.
- **Featured enemies (6 of 12)**: Husk-Vinebound, Slinger-Splinter, Lancer-Glassroot, Splitkin-Crystal (debut), Caller-Prism, Delver-Rootworm (debut).
- **Chapter boss**: **Echo of the Glasswright** — a multi-mirror figure that splits into refracted clones (HP-gated splitter boss). Full design in `content/bosses.md`.
- **Expected player level at first clear**: Hero level 32–38, Epic+1 to Epic+5 gear, first Legendary equipped, set 2-piece bonuses active.

### 20-room layout

| # | Type | Shape & composition | Hazard |
|---|---|---|---|
| 1 | Light | Open glade. 3 Husk-Vinebound + 2 Slinger-Splinters. | 2 glass-shard covers |
| 2 | Light | Pillared (crystal trunks). 2 Slingers + 1 Lancer. Refraction visual intro. | — |
| 3 | Light | L-shape. **Splitkin-Crystal debut** — 2 Splitkins (each splits into 2 smaller on death) + 2 Husks. | 2 glass-shard covers |
| 4 | Light | Wide rectangle. **Delver-Rootworm debut** — 2 Delvers (burrow, surface near player, 1.2 s tell) + 3 Husks. | — |
| 5 | **Offer** | Prismatic clearing. | — |
| 6 | Medium | Square arena. 3 Splitkins + 2 Slingers. AoE-greed punisher. | 3 glass-shard covers |
| 7 | Medium | Pillared. 2 Lancers + 2 Delvers + 2 Husks. | — |
| 8 | Medium | Wide arena. 1 Caller-Prism + 3 Splitkins. | 2 glass-shard covers |
| 9 | Medium | Long rectangle. 3 Delvers + 1 Lancer far end + 2 Slingers. | 3 glass-shard covers |
| 10 | **Shop** | Hollow trunk interior. 3 ability cards + 1 heal stand (160g for 50% HP). | — |
| 11 | Heavy | Square arena. 2 Callers + 4 Splitkins + 2 Husks. | 4 glass-shard covers |
| 12 | Heavy | Pillared. 3 Lancers (refracting beams) + 3 Husks. Beam-reading test. | — |
| 13 | Heavy | Cross-shape. 3 Delvers + 1 Caller + 2 Slingers. Pop-up + AoE composition. | 3 glass-shard covers |
| 14 | Heavy | Wide arena. 1 Hivekeeper-Anvil (carry-in from C4) + 4 Splitkins. | 2 glass-shard covers |
| 15 | **Offer** | Glass-grove altar, stage-2 menu. | — |
| 16 | Hardest | Square arena. 2 Lancers + 2 Callers + 3 Splitkins. | 4 glass-shard covers |
| 17 | Hardest | Pillared. 3 Delvers + 1 Caller + 2 Lancers. | 3 glass-shard covers |
| 18 | Hardest **mini-boss** | Glass-trunk arena. **Warden-Glasswright** (elite Caller, drops 3-stack AoE rings that refract into 5 each). +2 Splitkin adds. | 3 glass-shard covers |
| 19 | Hardest | Rest beat. 2 Splitkins + 2 Husks. Big drop. | — |
| 20 | **Boss** | Mirror-circle clearing. Glasswright divides into refracted echo-clones at phase break. | Glass shards regenerate every 12 s |

---

## Chapter 6 — Hollow Sky

### Chapter overview

- **Biome**: A floating archipelago of broken stars. Platforms hang in inky-purple void. Wind chimes of starlight. Distant Dim is no longer at the edge — it is *below* the platforms.
- **Color palette**: Deep indigo void, glowing violet platform edges, faint white starfield, Lucent violet hero glow stands out crisply.
- **Lore stinger**: *"What falls from up here lands as a wound."*
- **Music cue**: `mus_arena_void_A` — solo cello and synthetic wind chimes, no percussion until combat layer; combat layer adds a heartbeat sub-bass.
- **Featured hazards**: **Void edges** — falling off a platform deals 25% HP and respawns the player at the platform center after 1 s (no death, but a heavy punish). Platforms have visible glowing rims and a 0.5 s warning when player crosses. **Bridges** between platforms can collapse mid-fight (3 s yellow telegraph, then bridge falls — must dash before the break). **Starshatter** — falling star AoE drops, 1.0 s telegraph.
- **Featured enemies (7 of 12)**: Husk-Voidtouched, Slinger-Starshard, Lancer-Nightspar, Pyre-Comet, Caller-Eclipse, Hivekeeper-Voidnest, Warden-Voidwalker (chapter-elite).
- **Chapter boss**: **Echo of the Star-Eater** — teleporting void-caster, leaves persistent dim puddles (3-phase AoE-caster boss). Full design in `content/bosses.md`.
- **Expected player level at first clear**: Hero level 45–52, Legendary gear common, first Mythic possible, set 4-piece bonuses active, Resonance unlocked.

### 20-room layout

| # | Type | Shape & composition | Hazard |
|---|---|---|---|
| 1 | Light | Single platform, small. 3 Husk-Voidtouched + 2 Slingers. | Void edges all sides |
| 2 | Light | Two platforms + 1 bridge. 2 Husks + 2 Slingers (1 per platform). | Bridge stable |
| 3 | Light | Square platform. 1 Lancer-Nightspar + 3 Husks. | 2 Starshatter drops |
| 4 | Light | Three small platforms in triangle. 1 Slinger per platform + 3 roaming Husks. | 2 bridges, stable |
| 5 | **Offer** | Central platform, no combat. | — |
| 6 | Medium | Large platform. 2 Lancers + 1 Pyre + 3 Husks. | 3 Starshatter drops |
| 7 | Medium | Two platforms. 1 Caller-Eclipse + 2 Slingers per side. | 1 bridge, breaks at 50% wave clear |
| 8 | Medium | Cross of 5 platforms (center + 4 cardinal). 1 Husk per arm + 4 Slingers center. | 4 bridges, stable |
| 9 | Medium | Single large platform. 1 Hivekeeper-Voidnest + 6 Husks (spawns over time). | 3 Starshatter drops |
| 10 | **Shop** | Sanctuary platform. 3 ability cards + 1 heal stand (220g for 50% HP). | — |
| 11 | Heavy | Two large platforms + 1 bridge. 2 Lancers + 1 Caller + 3 Husks. | Bridge breaks at wave 2 |
| 12 | Heavy | Single platform. 1 Hivekeeper + 1 Caller + 2 Slingers. | 4 Starshatter drops |
| 13 | Heavy | Three platforms in row. 2 Pyres + 2 Lancers + 2 Husks. | 2 bridges, one breaks |
| 14 | Heavy | Large platform. 2 Callers + 3 Slingers + 3 Husks. | 5 Starshatter drops |
| 15 | **Offer** | Star-altar, stage-2 menu. | — |
| 16 | Hardest | Cross platforms. 2 Lancers + 2 Callers + 1 Hivekeeper. | 3 bridges, 1 breaks at wave 1, 1 at wave 2 |
| 17 | Hardest | Two platforms. 1 Caller + 1 Hivekeeper + 2 Lancers + 2 Slingers. | Bridge breaks at wave 1 — split fight |
| 18 | Hardest | Large platform. 3 Pyres staggered + 2 Callers + 3 Husks. | 5 Starshatter drops |
| 19 | Hardest **mini-boss** | Single platform, no bridges. **Warden-Voidwalker** (elite Caller, teleports every 6 s, drops 4-circle AoE on arrival, leaves a 4 s dim-puddle). +2 Slinger adds. | 3 Starshatter drops |
| 20 | **Boss** | The largest platform in the archipelago, ringed with smaller broken-star platforms (decorative). | Persistent dim-puddles per phase; arena shrinks visually as puddles accumulate |

---

## Chapter 7 — The Long Dusk

### Chapter overview

- **Biome**: The heart of the Dim. Near-black void interrupted only by the player's faint Lucent glow and the floor's last few unbroken light-tiles. There is no biome flora; the architecture is *implied* — half-suggestions of every prior realm at the edges of perception.
- **Color palette**: Near-black cold blue, with 1–2 single-pixel star points of pure white. The player is the brightest object in every frame, by 5×.
- **Lore stinger**: *"It can be ended. Walk in."*
- **Music cue**: `mus_boss_dusk` (boss-only track promoted to ambient) — long, single sustained string note with quarter-tone deviations, low choral pad, no drums until phase 3 of room 20.
- **Featured hazards**: **Dim creep** — at room start, the floor's outer ring begins to darken. After 20 s, outer ring becomes damaging Dim (drains 5% HP/s, no instant death — fixes pacing). Player must clear the wave before the safe-zone shrinks past viable. **All prior chapter hazards** rotate randomly per room (falling icicles, lava cracks, flooding tiles, glass shards, void edges) — the realm is a memory of every place fallen. **Echo enemies**: every standard enemy in this chapter is a Dim-Echo reskin of an earlier archetype, with one extra mechanic each (Husks leave 2-second poison trails, Slingers' shots split into 2 on impact, etc.).
- **Featured enemies (all 12 archetypes appear, biome-named "Dim-Echo of [X]")**: Husk-Echo, Slinger-Echo, Lancer-Echo, Boulder-Echo, Mote-Echo, Hivekeeper-Echo, Pyre-Echo, Caller-Echo, Mender-Echo, Warden-Echo, Delver-Echo, Splitkin-Echo.
- **Chapter boss**: **The Long Dusk itself** — a fight against an absence. Encounter has no visible boss model; the player fights waves of every chapter boss's signature attack until a final pure-Lucent silhouette appears (4-phase compositional boss). Full design in `content/bosses.md`.
- **Expected player level at first clear**: Hero level 58–65, Legendary+5 gear, 1–2 Mythic pieces, 4-piece set + Resonance active, talent grid at ~70% of cap.

### 20-room layout

| # | Type | Shape & composition | Hazard |
|---|---|---|---|
| 1 | Light | Small circle of light. 3 Husk-Echo (poison trail) + 2 Slinger-Echo. | Dim creep slow |
| 2 | Light | Wider circle. 2 Lancer-Echo + 2 Boulder-Echo. | Dim creep + 2 icicle drops |
| 3 | Light | Long rectangle. 1 Hivekeeper-Echo + 4 Mote-Echo (split on death). | Dim creep + 1 flooding tile |
| 4 | Light | Cross. 1 Caller-Echo + 2 Lancer-Echo + 2 Husk-Echo. | 3 lava cracks |
| 5 | **Offer** | Halo of remaining light. Stage-2 offers visible if the player took the same offer-giver in chapter 6. | — |
| 6 | Medium | Square. 2 Splitkin-Echo + 1 Caller-Echo + 3 Husk-Echo. | Dim creep + 3 glass shards |
| 7 | Medium | Pillared. 2 Boulder-Echo + 2 Slinger-Echo + 2 Lancer-Echo. | Dim creep faster |
| 8 | Medium | Wide. 1 Hivekeeper-Echo + 2 Mender-Echo + 3 Husk-Echo. Mender-stack priority test. | 3 cinder drops |
| 9 | Medium | Cross-shape. 4 Delver-Echo + 2 Caller-Echo. | Dim creep + 2 Starshatter drops |
| 10 | **Shop** | Pinpoint of light at center. 3 ability cards + 1 heal stand (300g for 50% HP). | — |
| 11 | Heavy | Square. 2 Callers + 2 Lancers + 1 Hivekeeper + 2 Husks. | Dim creep + 3 lava cracks |
| 12 | Heavy | Pillared. 3 Splitkin-Echo + 2 Boulder-Echo + 2 Slinger-Echo. | Dim creep + 2 flooding tiles |
| 13 | Heavy | Wide. 2 Menders + 2 Lancers + 3 Husks + 1 Caller. | 4 glass shards |
| 14 | Heavy | Cross. 1 Hivekeeper + 1 Caller + 1 Mender + 3 Slingers. | Dim creep + 3 Starshatter drops |
| 15 | **Offer** | Last clear circle of light, stage-2 menu always available. | — |
| 16 | Hardest | Square. 2 Boulder + 2 Caller + 2 Lancer + 1 Mender. | Dim creep + 3 cinder drops + 2 icicle drops |
| 17 | Hardest | Pillared. 2 Hivekeepers + 2 Splitkins + 2 Slingers. | Dim creep + 3 glass shards |
| 18 | Hardest **mini-boss** | Open arena. **Warden-Echo-of-the-Lantern-Keeper** (chapter-1 mini-boss reskinned, 20× HP, gains the chapter-3 ice-ring slam). +3 Slinger-Echo adds. | Dim creep + 2 lava cracks |
| 19 | Hardest **mini-boss-2** | Open arena. **Warden-Echo-of-the-Glasswright** (chapter-5 mini-boss reskinned, gains chapter-6 teleport). +2 Splitkin-Echo adds. | Dim creep + 3 Starshatter |
| 20 | **Boss** | The Long Dusk: black plane with a single ring of light around the player that contracts and expands by phase. Boss model invisible until phase 4. | All hazards cycle, one per phase |

---

## Per-Chapter Difficulty Scaling

All multipliers are relative to **Chapter 1 baseline = 1.00×**. Multipliers apply to enemy HP and damage. Density and elite ratio are independent levers.

| Chapter | Enemy HP | Enemy DMG | Avg enemies per room | Elite ratio | New archetype intro | New hazard intro |
|---|---|---|---|---|---|---|
| 1 — Vale | 1.00× | 1.00× | 3.8 | 0% | Husk, Slinger, Mote, Pyre, Mender | none |
| 2 — Cathedral | 1.45× | 1.30× | 4.6 | 4% | Lancer, Caller | Flooding tiles |
| 3 — Frostspire | 1.95× | 1.65× | 5.1 | 8% | Boulder | Icicles, ice patches |
| 4 — Emberforge | **2.55×** | **2.10×** | 5.8 | 14% | Hivekeeper | Lava cracks, cinders |
| 5 — Glassroot | 3.40× | 2.65× | 6.3 | 20% | Splitkin, Delver | Glass shards, refracted beams |
| 6 — Hollow Sky | 4.55× | 3.40× | 6.8 | 28% | Warden (chapter-elite) | Void edges, collapsing bridges, Starshatter |
| 7 — Long Dusk | **6.10×** | **4.40×** | 7.4 | 40% | Dim-Echo variants of all 12 | Dim creep + all prior |

Scaling is **superlinear in HP, sublinear in damage** — fights get longer and demand more positional discipline, rather than two-shotting the player. Per `research/games/enemies-and-bosses.md` §8.4, preferred levers in order: attack frequency, projectile count, projectile speed, phase compression, density, damage. Telegraphs never drop below 0.6 s (normal) or 1.0 s (one-shot) at any chapter.

Boss HP scaling follows a separate, gentler curve (×1.0 / ×1.4 / ×1.9 / ×2.5 / ×3.3 / ×4.4 / ×5.8) so that boss fights stay in the 75–110 second window across all chapters at appropriate gear levels.

---

## Soft-Cap / Wall Design (the Chapter 4 wall)

Per `research/games/archero-1.md`, **Archero's Chapter 7 "Silent Expanse" is the #1 cited churn point** in the entire game — players plateau there for weeks, blame the wall on pay-to-win, and uninstall. We will not repeat this mistake. We **deliberately design** a wall — players need a wall, both for retention pacing and to make the next gear tier meaningful — but we **telegraph it**, we **offer multiple paths through it**, and we **price the path within F2P reach**.

### Where the wall is

The wall is **Chapter 4, Emberforge, room 13 onwards**. Specifically:
- The DPS-check happens at room 13 (Mender-Bellowtender + Caller + Husks + Slingers). A player still using Rare-tier gear cannot kill the Mender fast enough before its heal ticks overwhelm them.
- The survival-check happens at room 18–20 (sustained AoE + add waves at 2.10× damage).

A player at expected progression (Hero L22–28, Epic gear) clears Chapter 4 in their first 2–3 attempts. A player at *under-progression* (Hero L18, all Rare gear, no set bonus) cannot, and the game must tell them so without insulting them.

### The path through (multiple, all F2P-reachable)

1. **Gear upgrade path**: Upgrade any 2 gear slots to **Epic +5** (≈ 600 Embers + 30k Gold per slot, ≈ 2 days of farming Chapter 3 with the Privilege Card or 4 days without). The pre-room-13 power-check screen explicitly highlights this in the inline tooltip: "Your Weapon is below Epic +3. Try the Forge before retrying."
2. **Talent threshold path**: Reach **Inscription node "Embered Aim" (3 levels)** which adds +12% DPS vs healers. This is one specific node, gated by reaching Account Tier 3, which the player will hit naturally during the Chapter 3 farm.
3. **Hero ascension path**: Star your starter hero to **2★** (60 Lucent Shards, attainable via the Chapter 3 daily-quest reward chain in 5 days), unlocking that hero's first Mastery passive.
4. **Build-discovery path**: The game's `tutorial_wall_c4` hint surfaces 1 of the 3 "Awakened" recipes that fit the player's current ability pool, giving a non-grind path through via skill alone.

### What the player sees

On first failure at room 13 or beyond in Chapter 4, the death screen surfaces a **"Power Check"** panel with three labeled tracks: **Forge** (gear), **Inscription** (talents), **Ascend** (hero). Each shows a green / yellow / red light versus chapter-recommended. The player is told *exactly* which lever is behind. The death screen also surfaces the **Chapter 3 Heroic variant** (if unlocked) as a recommended farming destination, with expected reward per run.

### Why this works

The wall stays — without one, payers don't pay and progress feels meaningless. But it stops being a "wall" and becomes a **gate with multiple keys**. Per pillar 5, the wall must be **bypassable through play time, not just dollars**. Expected F2P time-cost: **3–5 calendar days**, not Archero's 3–5 weeks. Payers compress to <24 hours but cannot skip the gear check.

A secondary, gentler wall sits at **Chapter 6 room 17–18**, handled by Resonance unlocking at hero level 45 during the Chapter 5 farm.

---

## Replay Value — Heroic and Nightmare Variants

Per pillar 3 ("mythic ceilings, friendly floors") and the Archero 1 lesson that farming chapters are a core meta, every chapter must remain meaningful at every hero level. Each of chapters 1–6 unlocks **scaled-up variants** that drop end-game materials (Embers, gear set fragments, hero shards).

| Variant | Unlock | Enemy HP / DMG | Density | Boss adds | Rewards |
|---|---|---|---|---|---|
| **Normal** | First-clear available always | base (per chapter table) | base | base | Standard gold/Embers/XP, gear drops to chapter tier |
| **Heroic** | Hero level **30** | ×2.5 base | +20% | +1 always | Embers ×2, Lucent Shards drop, **set fragment drop** for chapters 1–4 |
| **Nightmare** | Hero level **50** | ×5.0 base | +40% | +2 always | Embers ×4, set fragments for chapters 5–6, **rune drop** chance |
| **Mythic** | Hero level **70** | ×9.0 base | +60% | +3 + Dim-Echo modifier | Embers ×8, Mythic-tier gear shot, Sigil Dust drop chance |

Chapter 7 has no scaled variants — it gates Awakened progression instead and stays at its fixed extreme tuning.

Hazards remain identical between variants. Only enemy stats, density, and elite ratio scale. This preserves player learning (the player who memorized Chapter 2's flooding-tile pattern still wins at Heroic).

---

## Procedural Variance — What's Fixed, What's Seeded

Per pillar 1 ("positional decisions made under pressure"), the player must be able to *learn* a room and *get better at it*. Per pillar 4 ("a new event tab item every login"), no run should feel identical to yesterday's.

### Fixed across all runs (deterministic per room template)

- **Arena shape** (rectangle, cross, L, pillared) and its dimensions.
- **Hazard placement and timing** (flooding tile positions, lava crack pattern, icicle drop locations).
- **Enemy archetype composition per wave** (number and type of enemies).
- **Wave trigger logic** (wave 2 triggers at wave-1-count <= 1, wave 3 at wave-2-count <= 1).
- **Total wave count.**
- **Drop locations** for chests / hearts.

### Seeded per run (varies)

- **Enemy spawn positions** within designed spawn-arcs per slot (e.g., "left half, behind cover").
- **Spawn order within a wave** (door-opening order shuffled).
- **Wave timing micro-variance** ±0.4 s on inter-wave gaps.
- **Mote / Splitkin count within a designed band** (e.g., "4–6 motes" picks one per run).
- **Mender priority assignment** — within ally range, but which ally is seeded.
- **Cosmetic variance** (particle density, ambient creatures).

### Player-impact guardrails

- A seed never makes a room unwinnable (no Lancer first-shot at player spawn) and never trivial (no all-enemies-in-one-AoE cluster).
- Bosses have a fixed 4-second opening sequence regardless of seed — the encounter is learnable.
- Daily Dungeon uses a shared global daily seed (enables leaderboards).

---

## Time-to-Clear, Reward, and Energy Pacing

### Per chapter, for a chapter-appropriate-leveled player

| Chapter | First clear (min) | Veteran clear (min) | Gold | Embers | XP | Gear drop chance | Set fragment chance |
|---|---|---|---|---|---|---|---|
| 1 — Vale | 12–15 | 7–8 | 300 | 8 | 200 | 95% Common, 15% Rare | 0% |
| 2 — Cathedral | 14–18 | 8–9 | 500 | 14 | 380 | 90% Rare, 10% Epic | 5% |
| 3 — Frostspire | 16–20 | 9–10 | 800 | 22 | 620 | 60% Rare, 35% Epic, 2% Legendary | 12% |
| 4 — Emberforge | 18–24 | 10–11 | 1200 | 32 | 980 | 50% Epic, 8% Legendary | 18% |
| 5 — Glassroot | 18–24 | 11–12 | 1700 | 44 | 1450 | 70% Epic, 12% Legendary | 25% |
| 6 — Hollow Sky | 20–26 | 12–13 | 2400 | 58 | 2100 | 80% Epic, 18% Legendary, 0.5% Mythic | 32% |
| 7 — Long Dusk | 25–32 | 14–16 | 3500 | 80 | 3000 | 90% Legendary, 1.5% Mythic | 40% (chapter-set guaranteed every 3 clears) |

A clear also rolls 1–3 ability scrolls, 0–2 keys, and 60–120 Pass Points.

### Energy pacing

Per `design/04-progression-and-economy.md` §4: cap 30, regen 1 per 12 min (full cycle 6 hours), Campaign run cost **6 energy**.

- **Free runs per day (passive, no ads)**: ~20 energy regen + 30 cap if fully drained at login = **~8 runs/day**.
- **Ad-supplemented**: +5 energy × 4 ads/day = +20 energy = **+3 runs/day**.
- **Monthly Card daily refill**: full bar = **+5 runs/day**.

### F2P chapter progression pacing (target)

| Player day | Realistic chapter on first-clear | Hours of play |
|---|---|---|
| Day 1 | Chapter 1 cleared, into Chapter 2 | 25 min |
| Day 2 | Chapter 2 cleared | 25 min |
| Day 3–4 | Chapter 3 cleared | 30 min/day |
| Day 5–8 | Chapter 4 cleared (the wall — 3–5 days at this rate) | 25 min/day |
| Day 9–13 | Chapter 5 cleared | 30 min/day |
| Day 14–22 | Chapter 6 cleared | 35 min/day |
| Day 23–35 | Chapter 7 first-clear | 35 min/day |
| Day 35+ | Heroic/Nightmare farming, Tower, Survival, PvP, events | Open-ended |

Total first-clear of all 7 chapters: **~30–35 days of F2P play**. This is the explicit retention target — D30 retention of 10% (per `design/05-launch-scope.md`) requires a goal still 3 days away on D30. Payers (Monthly Card + Battle Pass Premium) compress to **~10–14 days**, but cannot complete chapter 7 inside week 1 regardless of spend. We never sell a cap-skip.

---

*End of levels spec. Per-room spawn coordinates live in `content/encounters/`. Boss internals in `content/bosses.md`. Enemy stats in `content/enemies.md`.*
