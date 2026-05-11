# World, Setting & Theme — Lucent

> **Working draft.** This is a strong-bias proposal that lets wave-2 agents design concrete content (heroes, biomes, bosses, lore). Specific names and lore beats may change after content design. The aesthetic and tonal commitments will not.

## Working title

**Lucent: Shards of the Shattered Sun**
(Shortened to **Lucent** in App Store title; the subtitle is ASO-driven.)

Working App Store title: `Lucent: Archer Roguelike`
Working App Store subtitle: `Bow Hero Action Dungeons`

## High concept (one line)

The suns shattered, and the **Dim** took everything they touched — you are a **Lucent-bearer**, a champion of crystallized light, fighting room-by-room through the corrupted realms to reignite the world.

## Core fantasy

The player is the **last bright thing in a fading world**. Every room cleared is one more pocket of light restored. Every chapter completed is one more realm pushed back from the Dim. The vibe is **hopeful heroic mythic-fantasy** — not grimdark, not cute-cozy, not anime-explicit. Think *Hades* meets *Tunic* meets a children's storybook printed on velvet.

## Tone & voice

- **Heroic** but with dry warmth. NPC offer-givers tease the player without being mean.
- **Mythic**, not modern. No memes, no swearing, no irony-poisoned writing.
- **Hopeful**. Even the darkest biome ends on the sun returning.
- **Light on plot, heavy on atmosphere**. Each biome tells its story through environment and a single short stinger of text — no cutscenes, no walls of text.

## Setting

The world is **Iridian**, a ring of seven realms that orbited the twin suns Auria and Velios. When the suns shattered (the **Dimming**), their light-shards fell across the realms; wherever a shard landed, life persisted. Wherever no shard fell, the **Dim** seeped in — a slow, soft, hungry darkness that eats memory and color and warmth.

A **Lucent-bearer** is anyone who has bonded with a shard. They glow faintly, refract the light around them, and can step into the Dim without being unmade. There are not many left.

You play one.

## The Dim (antagonist)

The Dim is not a person, not an army, not a god — it is the **absence** that the Dimming left. It manifests as corrupted creatures (former animals, knights, builders) and as **Echoes** (silhouettes of what used to be there, looped on repeat). Boss enemies are usually Echoes of something the realm lost.

Color palette: **deep indigo, washed-out lavender, cold black with a slight blue tint, soft static-noise textures**. The Dim should always look like a calm, beautiful catastrophe.

## The seven realms (chapters)

Realms are revisitable, gradually freed. Order = launch chapter sequence:

| # | Realm | Vibe | Visual key | Story stinger |
|---|---|---|---|---|
| 1 | **The Vale of First Light** | Tutorial meadow + ruined village | Soft greens, indigo creep at the edges | "They left the lanterns burning." |
| 2 | **Sunken Cathedral** | Drowned holy city, half submerged | Cyans, pale stone, swaying kelp | "The prayers are still echoing." |
| 3 | **Frostspire** | Mountain peak, perpetual aurora | Ice white, prismatic crystal cliffs | "She climbed to call the sun back." |
| 4 | **Emberforge** | Volcanic foundry where lightbringers worked | Orange/gold against black ash | "The forges never cooled. They were never hot." |
| 5 | **Glassroot Forest** | Petrified woods where trees became prisms | Translucent trunks, rainbow refractions | "Sap turned to glass. Glass remembers." |
| 6 | **Hollow Sky** | Floating archipelago of broken stars | Inky-purple void, glowing platforms | "What falls from up here lands as a wound." |
| 7 | **The Long Dusk** | The final realm; the heart of the Dim | Near-black, single point of player light | "It can be ended. Walk in." |

Each realm has **20 rooms + 1 chapter boss** at launch. Realms unlock sequentially. Post-launch chapters extend the world (**Garden of Velios**, **The Mirrorshore**, **The Memory Tide**, etc.).

## Hero fantasy framework

Heroes are **Lucent-bearers** with different shard alignments. Each hero embodies one **light archetype** so they read instantly and don't compete for the same fantasy:

| Archetype | One-line fantasy | Mechanical hook |
|---|---|---|
| **The Dawnbow** | The lone archer who walks into the dark | Baseline DPS, multishot synergies |
| **The Wardlight** | The shielded oath-bearer | Tankier, defensive procs |
| **The Spinekind** | The wild cousin of the lightning-veined | Burst, lightning chain |
| **The Embercaller** | The smith who fought back | Fire DoT, AoE specialist |
| **The Frostshard** | The mountain mystic who survived | Freeze + control synergies |
| **The Prismborn** | The youngest, a refractor | Multishot, splitting projectiles |
| **The Wraithsworn** | A Dim-touched defector | Lifesteal, on-kill triggers |
| **The Sunkin Heir** | The would-be king of the Sunken Cathedral | Summons, holy AoE |

(Final list lives in `content/heroes.md`, designed by wave-2 agent with full stat blocks. Names and exact counts can shift.)

## Art direction commitments

(See `research/games/art-audio-direction.md` for full analysis.)

- **Chunky 2.5D low-poly**, top-down, portrait camera.
- **Synty POLYGON MINI** baseline; senior outsourced art for heroes, chapter bosses, and signature biome props.
- **Signature palette per realm** with the indigo/prismatic Lucent palette as the unifying thread (every hero glows faintly indigo-violet on the move).
- **Color-coded enemies** by archetype (red = aggressive, purple = elite, gold = boss, white = healer, blue = ranged).
- **Strict telegraph language**: red zone = damage ground, yellow zone = warning, blue line = projectile path, 0.6–1.2s wind-ups, audio cue every time.

## Audio direction commitments

(See `research/games/art-audio-direction.md`.)

- **FMOD Studio runtime**.
- **5 music tracks at launch**: menu, two arena tracks (rotating by biome), boss music, victory stinger. +1 track per 6–8-week update.
- **50 SFX at launch**: shoot variants, hit, crit, level-up, pickup, UI, boss roar.
- **Adaptive music**: combat-intensity RTPC ramps a brass/percussion layer above a sustained string bed.
- **One human voice element**: a soft female narration voice that delivers the realm stinger and victory tagline. Same voice across all realms. Adds memorability at near-zero ongoing cost.

## What this lets the rest of the design pin down

With theme + 7 realms + 8 hero archetypes locked, wave-2 agents can now design:
- Concrete hero roster with names, abilities, stats.
- 20 rooms × 7 chapters of level / encounter design.
- 7+ chapter bosses + recurring world bosses.
- A cohesive ability pool whose flavor / VFX fits the prismatic-light theme.
- Enemy roster fit to the Dim corruption motif.
- Lore-flavored currency names (Lucent Shards, Embers, etc.).
- UI / icon language that doesn't fight the art direction.
