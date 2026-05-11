# Enemy Catalog — Lucent: Shards of the Shattered Sun

> **Scope:** The 12 launch enemy archetypes, their 7-realm Echo reskins, room composition rules, pressure scripts, scaling math, and fairness guarantees.
>
> **Lore frame:** Enemies are **Echoes** — corrupted impressions of what the realm used to hold, soaked through with the Dim. Each archetype is a shape; each biome gives it a new face. A Charger in The Vale was a wolf; a Charger in Frostspire is a glacier-clad bear-thing; a Charger in Hollow Sky is a falling star with teeth. The behavior is the same. The skin is local.
>
> **References:**
> - `design/00-design-pillars.md` (Pillar 1 stop-to-shoot, Pillar 8 readability)
> - `design/03-world-and-theme.md` (Dim antagonist, 7 realms)
> - `design/05-launch-scope.md` (12 archetypes × biome reskins)
> - `research/games/enemies-and-bosses.md` (archetype menu, telegraph rules, wave pacing)

---

## 1. Design intent

Every enemy in Lucent exists to answer one question for the moving player: **"what does this Echo force me to do?"** Variety comes from the axis of movement each enemy attacks, not from the silhouette. We deliberately ship the **12-archetype launch set** so the player can read the entire bestiary by chapter 2 and spend chapters 3–7 learning **combinations**, not new shapes.

Three rules govern every archetype below:

1. **Visible wind-up ≥ 0.5s on every attack** (one-shots ≥ 1.0s). Per `research/games/enemies-and-bosses.md` §6.
2. **Color-coded by archetype role**, per the art-direction commitment in `design/03-world-and-theme.md`: red aggressive, purple elite, white healer, blue ranged, gold boss, indigo summon-trail.
3. **Telegraph shapes are a fixed vocabulary** — circle (drop AoE), rectangle (line/beam), cone (fan), ring (shockwave), arrow (off-screen indicator). No archetype invents a new shape.

The Dim corruption motif gives us cheap reskinning: a single base mesh + biome material set + biome-specific death VFX yields 7 distinct enemies from one rigged asset. This is how we hit the launch-scope target of "12 archetypes × biome reskins" inside the Phase-3 budget in `design/05-launch-scope.md`.

---

## 2. The 12 launch archetypes

Stat values are **Chapter 1 baseline**. All later chapters apply the scaling formula in §5. "Range" is given in tile-units; the standard arena is ~14×24 tiles. Player base HP at Chapter 1 is 100, base contact-damage tolerance ≈ 4–5 hits to die.

### 2.1 Summary table

| # | Archetype | Role | HP | Contact dmg | Proj. dmg | Range | Move spd | Wind-up | Color tag |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **Charger** | Melee pursuer | 18 | 8 | — | melee | 4.2 | 0.6s lunge | Red |
| 2 | **Slinger** | Ranged shooter | 14 | 4 | 5 | 8 | 2.0 | 0.7s | Blue |
| 3 | **Lance-Eye** | Sniper | 22 | 4 | 16 | 14 | 1.4 | 1.2s | Indigo-blue |
| 4 | **Bulwark** | Tank | 90 | 6 | — | melee | 1.2 | 0.9s slam | Red |
| 5 | **Mote** | Swarmer | 6 | 3 | — | melee | 5.0 | 0.5s nip | Red |
| 6 | **Hivekeeper** | Summoner | 38 | 0 | — | n/a | 0.0 (rooted) | 1.0s call | Indigo |
| 7 | **Pyre** | Kamikaze | 10 | 22 burst | — | radius 2 | 4.6 | 0.8s pulsing circle | Red→white |
| 8 | **Caller** | AoE caster | 26 | 0 | 14 | 10 | 1.6 | 1.0s drop | Purple |
| 9 | **Mender** | Healer/buffer | 30 | 0 | — | 4 | 1.8 | 0.7s tether | White |
| 10 | **Warden** | Elite | 140 | 10 | 8 | mixed | 2.2 | 0.9s | Purple |
| 11 | **Sift** | Burrower / pop-up | 16 | 9 | — | melee | 3.4 (underground) | 1.1s surface | Indigo |
| 12 | **Prism Slime** | Splitter | 24 → 2×10 | 5 | — | melee | 2.0 | 0.5s hop | Refractive |

### 2.2 Archetype detail sheets

---

#### 1. Charger — *the one that pushes you*

| Field | Value |
|---|---|
| Role | Melee pursuer; the room's metronome of pressure |
| HP / Contact / Range | 18 / 8 / melee |
| Move speed | 4.2 (lunge bursts to 6.5 over 0.5s) |
| Behavior | Pursue nearest player; at melee range, telegraph 0.6s wind-up (paw lifted / glow flare), then lunge straight 1.5 tiles. Misses pass through; recovers in 0.4s. |
| Telegraph | Red glow building under the front quarter of the body + low growl. No ground decal — the body **is** the tell. |
| Counter-play | Strong: Multishot, Front Arrow, ricochet builds with knockback. Weak: stationary-DPS builds with no slow / push (Embercaller DoT alone struggles because Chargers close before stacks tick). |
| Death VFX | Body collapses into indigo motes that rise and dissolve in 0.4s. Readable as portrait silhouette. |
| Drop bias | Gold 70%, Embers 18%, no rare drop. Common XP fodder. |
| Sound key | `enm/charger/{growl,lunge,death}` — low growl→whoosh→soft chime |

---

#### 2. Slinger — *the one that punishes standing still*

| Field | Value |
|---|---|
| Role | Ranged shooter, lateral-strafe pressure |
| HP / Contact / Proj | 14 / 4 / 5 |
| Range / Move speed | 8 tiles / 2.0 |
| Behavior | Approach to range 8, halt, fire single linear projectile every 1.8s at player's last position. Re-positions if player closes inside 5 tiles. |
| Telegraph | 0.7s arm-draw animation + thin blue dotted line from shooter to target. Line is a **path indicator, not a damage zone** — dodge perpendicular. |
| Counter-play | Strong: dodge-roll / Spinekind chain-lightning that hits multiple Slingers in a back-line; Wardlight shield ignores one shot. Weak: glass-cannon builds with no mobility tools. |
| Death VFX | Shatters into 3 indigo shards that fall straight down. |
| Drop bias | Gold 55%, Embers 30%, 2% chance to drop a one-use Quiver pickup. |
| Sound key | `enm/slinger/{draw,release,impact}` |

---

#### 3. Lance-Eye — *the one that picks you off*

| Field | Value |
|---|---|
| Role | Sniper. Long, heavy, slow cadence. |
| HP / Contact / Proj | 22 / 4 / 16 (≈ 16% of max HP — heavy, not one-shot) |
| Range / Move speed | 14 tiles / 1.4 |
| Behavior | Holds position at max range. Acquires target, paints a **persistent red line** across the screen for 1.2s wind-up, then fires a fast piercing bolt. Repositions only if line-of-sight is blocked for 2s. |
| Telegraph | Persistent red rectangle line, 0.6 tiles wide, full screen length. Paired with a rising whistle (0.4s ramp). The line **only damages on the wind-up resolution**, not while drawn. |
| Counter-play | Strong: builds with break-line-of-sight tools (Frostshard ice walls, terrain abuse). Weak: stationary builds with no dash — must always move perpendicular to the line. |
| Death VFX | Single tall indigo lens cracks vertically and falls in two halves. Distinct silhouette at portrait scale. |
| Drop bias | Gold 60%, Embers 25%, 6% rare drop (Lucent Shard fragment). High-value target. |
| Sound key | `enm/lance_eye/{paint,whistle,fire,shatter}` |

---

#### 4. Bulwark — *the one that drains your DPS*

| Field | Value |
|---|---|
| Role | Tank. Body-blocks lanes, eats DPS budget. |
| HP / Contact | 90 / 6 (slam: 14 in radius 2 tile circle) |
| Range / Move speed | melee / 1.2 |
| Behavior | Slow walk toward player. At melee, 0.9s wind-up (shoulders rise), then a circular slam (red ground circle, radius 2). Cooldown 2.5s. Cannot be staggered below 50% HP. |
| Telegraph | Red filled circle on the ground, 0.9s, with shoulder-rise animation + low rumble. Standard shape primitive. |
| Counter-play | Strong: pierce / penetrating builds, Prismborn split-projectile builds, anything that ignores body-block. Weak: bouncing-projectile builds whose bounces are absorbed by the bulwark's mass. |
| Death VFX | Crumples backwards into a pile of indigo plates; plates fade in 0.8s. Clear "thing fell over" silhouette. |
| Drop bias | Gold 80%, Embers 50% (high), 8% guaranteed gear shard at first kill per room. |
| Sound key | `enm/bulwark/{footstep_loop,slam_windup,slam_impact,collapse}` |

---

#### 5. Mote — *the one that comes in a crowd*

| Field | Value |
|---|---|
| Role | Swarmer. Numbers, not damage. |
| HP / Contact | 6 / 3 |
| Range / Move speed | melee / 5.0 |
| Behavior | Always spawned in groups of 4–7. Pursue in loose flock with cohesion + separation steering (no perfect overlap, no perfect spread). Nip on contact (0.5s wind-up), then retreat 0.5 tiles. |
| Telegraph | Tiny red flick under the model + chittering audio cue. Cluster makes the **collective** the telegraph; individual nips are minor. |
| Counter-play | Strong: any AoE / chain / orbital build, especially Embercaller DoT and Prismborn split. Weak: single-target high-damage builds (Lance-Eye snipers in player form) — overkill per target. |
| Death VFX | Pops into 1–2 indigo motes, instant. Many simultaneous = satisfying pop chain. |
| Drop bias | Gold 35%, no Embers. Cheap XP. |
| Sound key | `enm/mote/{chitter_loop,nip,pop}` (pop is short and tuned to chain musically) |

---

#### 6. Hivekeeper — *the one that won't stop spawning*

| Field | Value |
|---|---|
| Role | Summoner. Inverts threat order. |
| HP / Contact / Proj | 38 / 0 / — |
| Range / Move speed | n/a (rooted) / 0 |
| Behavior | Stationary. Every 4.5s, 1.0s wind-up (rising indigo glow), then spawns 3 Motes in a triangle around itself. Hard cap: never has more than 8 of its summons alive at once. |
| Telegraph | Indigo glow ramps under the body during wind-up + a rising "summoning" tone. Spawn locations are **previewed as 3 small indigo X-marks** during the wind-up. |
| Counter-play | Strong: snipers / mobility builds that bypass the Mote screen; Wraithsworn on-kill chains feed off Mote waves. Weak: tanky melee builds — get drowned. |
| Death VFX | Implodes inward, all currently summoned Motes lose ~30% HP (sympathy damage). Clear feedback. |
| Drop bias | Gold 50%, Embers 60% (high), 4% rare drop. Priority target. |
| Sound key | `enm/hivekeeper/{idle_hum,summon_windup,spawn_pop,death_implode}` |

---

#### 7. Pyre — *the one that ruins your clump*

| Field | Value |
|---|---|
| Role | Kamikaze. Denies stationary DPS positions. |
| HP / Burst | 10 / 22 in radius 2 |
| Range / Move speed | radius 2 detonation / 4.6 |
| Behavior | Sprints in a straight line toward player. At range 2 OR on death (whichever first), 0.8s pulsing-circle wind-up, then detonate. **Pulsing circle remains 0.2s after detonate as a residue ghost** so player can confirm cause-of-death. |
| Telegraph | Red filled circle that **pulses** (vs. Bulwark's static circle). Pulse tempo = wind-up countdown. Distinct rising-then-popped audio chirp. |
| Counter-play | Strong: knockback procs, slows (Frostshard freeze), kiting space. Weak: melee builds, AoE builds that detonate Pyres prematurely in a clump. |
| Death VFX | Bright indigo-white flash, fades to red residue dot for 0.2s. Readable as portrait flash. |
| Drop bias | Gold 30%, Embers 15%, **no drop on self-detonate** (incentivize killing them before they pop). |
| Sound key | `enm/pyre/{sprint_breath,countdown_chirp,detonate,residue}` |

---

#### 8. Caller — *the one that paints the floor*

| Field | Value |
|---|---|
| Role | AoE caster. Forces relocation. |
| HP / Proj | 26 / 14 (AoE damage) |
| Range / Move speed | 10 / 1.6 |
| Behavior | Maintains range 10. Every 2.6s, 1.0s wind-up drops a red ground circle (radius 2.5) on player's **predicted** position (lead aim). Damage tick on resolve only — staying on the circle after resolve is safe. |
| Telegraph | Standard 1.0s red ground circle, outlined → filling → solid. Rising chime that resolves on impact. |
| Counter-play | Strong: high-mobility builds (Spinekind dash chain), any build that side-steps consistently. Weak: builds that root themselves for DPS (Embercaller stand-and-burn is punished). |
| Death VFX | Robe collapses; the staff/focus falls last and bursts into a small indigo bloom. |
| Drop bias | Gold 55%, Embers 40%, 5% rare drop. |
| Sound key | `enm/caller/{cast_loop,drop_windup,drop_impact,bloom}` |

---

#### 9. Mender — *the one that undoes your work*

| Field | Value |
|---|---|
| Role | Healer / buffer. Re-prioritization test. |
| HP / Heal | 30 / 3 HP/s on tethered ally |
| Range / Move speed | 4 (tether reach) / 1.8 |
| Behavior | Locks onto lowest-HP ally within 4 tiles. 0.7s tether wind-up, then maintains a **white beam** of healing while in range. Breaks if line of sight is blocked or distance exceeded. Cannot heal self. |
| Telegraph | White-blue beam (visually unambiguous: white = friendly to enemies = priority target for you). Mender model bears a white halo at all times. |
| Counter-play | Strong: piercing projectiles that hit Mender + target, snipers, lockon ultimates. Weak: low-DPS sustain builds — Mender outheals your incoming. |
| Death VFX | Halo bursts outward as a soft white ring then collapses; tethered allies briefly flash and lose the heal. |
| Drop bias | Gold 50%, Embers 45%, 7% rare drop. Always worth killing first. |
| Sound key | `enm/mender/{heal_beam_loop,tether_start,death_chime}` |

---

#### 10. Warden — *the elite version of whatever the room is about*

| Field | Value |
|---|---|
| Role | Elite. Bullet sponge. Mid-fight pacing change. |
| HP / Contact / Proj | 140 / 10 / 8 (varies by sub-type) |
| Range / Move speed | mixed / 2.2 |
| Behavior | Same as the base archetype it elevates (Charger-Warden, Slinger-Warden, Caller-Warden, etc.), but with **+1 special attack** and a tinted purple outline. Special is always a 1.0s telegraphed cone or ring. |
| Telegraph | Purple outline on body at all times (identity tell). Standard shape-primitive telegraphs on attacks; never invents a new shape. |
| Counter-play | Depends on sub-type. Universal: focus-fire builds; Wraithsworn lifesteal sustains through Warden attrition. Weak: clear-the-room AoE builds — overspend on adds, then Warden punishes. |
| Death VFX | Outline cracks first, then body shatters into 5 large indigo plates that fall slowly. Distinct "I killed the big one" payoff at portrait scale. |
| Drop bias | Gold 100%, Embers 80%, **25% rare drop** (always feels good). |
| Sound key | `enm/warden/{outline_hum,special_windup,special_release,shatter}` |

---

#### 11. Sift — *the one that comes from below*

| Field | Value |
|---|---|
| Role | Burrower / pop-up. Awareness test. |
| HP / Contact | 16 / 9 |
| Range / Move speed | melee / 3.4 (underground; surfaced 1.8) |
| Behavior | Spawns underground. Travels along a visible **indigo dust trail on the floor** toward player. At range 2, 1.1s surface wind-up (ground crack ring), then leaps up and bites. Surfaces vulnerable for 1.5s before re-burrowing. |
| Telegraph | **Indigo dust trail** is the always-on tell — you can see them coming. Surface wind-up is a small ring crack on the ground. Per `research/games/enemies-and-bosses.md` §5 Sand Dragon lesson: invisible enemies *must* telegraph their re-emergence. |
| Counter-play | Strong: builds that pre-damage via puddles/orbitals — the Sift takes hits while still underground; Frostshard freeze pins them on surface. Weak: pure ranged stationary builds — Sifts surface inside your DPS bubble. |
| Death VFX | Body sinks back into the floor, leaving a fading indigo splash for 0.5s. |
| Drop bias | Gold 65%, Embers 30%, 5% rare drop. |
| Sound key | `enm/sift/{burrow_rumble,trail_hiss,surface_crack,bite,death_sink}` |

---

#### 12. Prism Slime — *the one that punishes greedy AoE*

| Field | Value |
|---|---|
| Role | Splitter. Punishes single-shot clears. |
| HP / Contact | 24 / 5 — on death, splits into **2× child Slimes** (10 HP, 3 dmg each). Children do not re-split. |
| Range / Move speed | melee / 2.0 (children 2.6) |
| Behavior | Hops toward player every 0.9s (0.5s arc wind-up, 0.4s travel). Each hop covers ~2 tiles. On death, two children spawn 1 tile apart with brief 0.3s invuln frame to prevent same-tick chain death. |
| Telegraph | Body compresses (squash) before hop — animation primitive, 0.5s. No ground decal. |
| Counter-play | Strong: sustained DoT (Embercaller burn lingers through split), high-rate-of-fire builds. Weak: single-burst Mythic snipers that overspend per kill. |
| Death VFX | Slime body bursts into a **rainbow refraction flash** (signature Lucent-themed VFX), then two child slimes plop out. The flash is unique to splitters — it's the warning that "more is coming." |
| Drop bias | Parent: gold 40%, Embers 20%. Children: gold 10% each. Net drop equivalent to one normal enemy. |
| Sound key | `enm/prism_slime/{hop_squash,hop_land,split_burst,child_pop}` |

---

## 3. Biome reskin matrix

Same archetype, different Echo per realm. The behavior table above is **canonical**; only meshes, materials, particle colors, and audio voicing change per realm. Some archetypes are absent from realms where they wouldn't make narrative sense — noted as **—**.

| Archetype | 1. Vale of First Light | 2. Sunken Cathedral | 3. Frostspire | 4. Emberforge | 5. Glassroot Forest | 6. Hollow Sky | 7. The Long Dusk |
|---|---|---|---|---|---|---|---|
| **Charger** | Dim-Brand Wolf — mangy hound with indigo veins | Drowned Acolyte — robed swimmer that lunges | Frost-Maw — armored bear-thing crusted with rime | Forge-Hound — iron mastiff trailing embers | Glass-Splinter Hound — translucent quadruped, sharp facets | Star-Fall Beast — meteor with teeth | Hollow Knight-Echo — soundless armored figure |
| **Slinger** | Husk Bowman — village hunter's silhouette | Coral Archer — barnacle-armored figure with bone bow | Aurora Slinger — figure throwing prismatic shards | Forgewright — hurls glowing rivets | Glass Loom — refracting humanoid plucking shard-strings | Star-Caster — flings collapsed-star pellets | Long Echo — featureless silhouette throwing void slivers |
| **Lance-Eye** | Watchtower Eye — single floating eye atop a broken pike | Lighthouse Acolyte — held lantern paints the line | Cairn Eye — totem of stacked frost-stones with one eye | Forge-Sentry — slit-eye automaton, beam through visor | Prism Lens — a single hovering prism that focuses light | Star-Eye — collapsed star fixed on a tendril | The Last Eye — single point of indigo, no body |
| **Bulwark** | Stone Warden — ruined statue reanimated | Tide-Anchor — armored figure with seaweed plate | Avalanche — boulder of packed ice with limbs | Slag-Walker — molten armor crusted in cooled rock | Glasswall — translucent giant, internal cracks visible | Star-Mantle — chunk of star wrapped in voidcloth | Dim-Colossus — featureless monolith with shoulders |
| **Mote** | Sprite-Husk — flickering ex-pixie | Spawn-of-Coral — small crab-shells skittering | Snow-Mite — chittering frost crystals on legs | Cinder-Imp — flame-licked goblin embers | Shardlings — palm-sized glass critters | Star-Larva — wriggling void worms | Whisper — speech-shaped mote, says nothing |
| **Hivekeeper** | Lantern-Tree — burnt tree with hanging indigo lanterns | Spawning Reef — coral throne, eggs rupture | Crystalmother — frost-bloom that buds Snow-Mites | Bellows-Forge — broken bellows still pumping | Glass Loom-Mother — vast loom weaving Shardlings | Star-Nest — cracked star egg | Choir-of-One — silent chorus mouth |
| **Pyre** | Lantern-Husk — villager-shape sprinting with a too-bright lantern | Steam-Sister — pressurized acolyte hissing | Frost-Mortar — supercooled figure that flash-shatters | Magma Imp — classic kamikaze, bright orange-to-white | Refraction Bloom — flower that overloads with light | Falling Star — kamikaze meteor on a flat arc | Last Light — figure carrying a single bright shard |
| **Caller** | Bell-Ringer — robed figure ringing a cracked bell | Pulpit-Priest — submerged preacher drops "blessings" | Stormcaller — staff dragging aurora ribbons | Ash-Cantor — chants sparks into ground circles | Glass-Singer — voice cracks the air into refractions | Star-Reader — points at sky, sky answers | The Voice — speaks; the floor agrees |
| **Mender** | Lantern-Maiden — village healer, white halo | Choir-Sister — drowned, beam is bubbles of light | Hearth-Tender — keeps a small fire that heals allies | Forge-Priest — repairs allies with hammer-taps | Glass-Mender — sings cracks back together | Star-Stitcher — sews allies with thin starlight | Pale Echo — silhouette outlined in white |
| **Warden** | Captain-Husk — sergeant with broken pauldron | Drowned Champion — barnacle plate, two-hand mace | Glacial Knight — frozen paladin | Forge-Master — half-finished automaton smith | Glassblade — humanoid grown from one perfect shard | Star-Crowned — figure wearing a star helm | The Hollow — first-named voice the player hears |
| **Sift** | Mole-Husk — ex-rabbit / mole, indigo dust | Reef-Lurker — eel-shape under the silt | Snow-Burrower — surfaces through ice (cracks visible first) | Slag-Worm — molten thing under cooling crust | Glass-Root — root that ripples like glass underground | **—** *(no ground to burrow through; replaced by an extra Pyre wave)* | Floor-Thing — the floor itself wrinkles |
| **Prism Slime** | Sap-Slime — translucent green-violet blob | Tide-Slime — water-jelly with foam crown | Frost-Slime — semi-frozen, splits into two harder shards | Slag-Slime — half-cooled metal, split children glow brighter | **The default-rendered Prism Slime** (this is its home realm — most refractive version) | Void-Slime — black-purple with internal stars | Last Slime — barely visible outline; split children are visible |

**Absences and substitutions:**
- Sift is absent in **Hollow Sky** (no ground). The room generator substitutes a second Pyre spawn instead, preserving the pressure budget.
- Mote, Pyre, and Charger appear in **every** realm — these are the rhythm-keepers and must not be skipped.
- In **Glassroot Forest**, every archetype gets a +1 refraction VFX layer at no behavior cost — sets up the chapter's "prism boss" reveal.
- In **The Long Dusk** (final realm), all variants lose color and gain a 10% subtle indigo glow. Same archetype telegraphs, but **the player is reading silhouettes**. This is a deliberate readability ramp, not a fairness violation — telegraph shapes and timings are unchanged.

---

## 4. Wave / room composition rules

### 4.1 On-screen soft cap

Per `research/games/enemies-and-bosses.md` §10 (max simultaneous telegraphs ≤ 3) and our portrait-readability commitment in `design/00-design-pillars.md` Pillar 8:

| Chapter | Max enemies on screen | Max active telegraphs | Notes |
|---|---|---|---|
| 1 | 14 | 3 | Tutorial-feel pressure |
| 2 | 15 | 3 | |
| 3 | 16 | 3 | |
| 4 | 18 | 3 | Density spike (Emberforge is hot) |
| 5 | 19 | 4 | Glassroot uses small splitters; soft cap loosens |
| 6 | 20 | 4 | |
| 7 | 22 | 4 | Long Dusk — apex |

Motes (and Prism Slime children) count as **0.5 each** toward the cap to allow swarmer fantasy without breaking telegraph budget.

### 4.2 Per-chapter pacing curve (20 rooms)

Adapted from `research/games/enemies-and-bosses.md` §8.2:

| Room | Beat | Composition template | Density tag |
|---|---|---|---|
| 1 | Trash sweep | 6× Charger | Light |
| 2 | Trash sweep | 4× Charger + 2× Slinger | Light |
| 3 | Mixed | 2× Slinger + 3× Charger | Light |
| 4 | First positional test | 3× Charger + 1× Lance-Eye | Medium |
| 5 | Hazard | Static turrets/braziers + 3× Mote | Medium |
| 6 | Push-pull | 1× Bulwark + 5× Mote | Medium |
| 7 | Telegraph practice | 2× Caller + 2× Charger | Medium |
| 8 | Pinch | Pressure script **The Pinch** (see §4.4) | Heavy |
| 9 | Mini-boss room | 1× Warden + 2× Slinger | Heavy |
| 10 | Rest beat | 4× Mote (heal drop guaranteed) | Light |
| 11 | Summon test | 1× Hivekeeper + spawned Motes | Medium |
| 12 | Storm | Pressure script **The Storm** | Heavy |
| 13 | AoE caster room | 2× Caller + 2× Pyre | Heavy |
| 14 | Choir | Pressure script **The Choir** | Heavy |
| 15 | Splitter test | 4× Prism Slime + 1× Caller | Medium |
| 16 | Burrow test | 3× Sift + 2× Slinger | Medium |
| 17 | Rest beat | 3× Mote, heal + Ember drop | Light |
| 18 | Elite gate | 2× Warden | Heavy |
| 19 | Final pressure | Pressure script **The Eclipse** | Heavy |
| 20 | Boss arena | Chapter boss (see `bosses.md`) | Boss |

Light beats give the player **1+ heal drop** and breathing room. Heavy beats peak telegraph budget but stay below cap. The rest beat at room 17 is non-negotiable — it's the runway to the boss fight. This mirrors Archero's beat structure validated in `research/games/enemies-and-bosses.md` §2.

### 4.3 Push-pull routing

Per `research/games/enemies-and-bosses.md` §2 push-pull dynamic:

- **Chargers / Bulwarks / Pyres** push the player away.
- **Slingers / Lance-Eyes / Callers** pull the player in (need to close to kill them efficiently before they tick).
- **Menders / Hivekeepers** pull priority through threat-inversion.
- Room templates always plant a **puller** opposite a **pusher** to route the player through the middle, where Sifts/Pyres spawn most effectively.

### 4.4 Pressure scripts (named room compositions)

Five named scripts. Each is a reusable room recipe with a defined "shape" of pressure. Designers can drop them into any realm with the appropriate biome reskin.

#### Script 1 — **The Pinch**

> Two chargers from opposite walls + one sniper telegraphing the middle.

- **Setup:** 2× Charger spawn from opposing walls (4–6 tiles offset from player). 1× Lance-Eye spawns at the back of the room and immediately paints a line through the room's center.
- **Player problem:** lateral movement is needed to dodge Chargers, but the Lance-Eye line punishes lateral commit. Solution: dodge perpendicular to the line first, then back-pedal.
- **Soft cap usage:** 3 enemies, 1 active telegraph. Cheap and reusable.
- **First seen:** Chapter 1, Room 8.

#### Script 2 — **The Storm**

> One summoner anchoring the room + waves of swarmers it produces.

- **Setup:** 1× Hivekeeper at the center-back of the room. Spawns 3× Motes every 4.5s up to cap of 8 living Motes.
- **Player problem:** must choose between killing the source (slow, far) and clearing adds (fast, near). Wrong answer is "clear adds forever."
- **Soft cap usage:** 1 + 8 Motes (≈ 5 cap units). Telegraphs: only the Hivekeeper spawn windup.
- **First seen:** Chapter 1, Room 12.

#### Script 3 — **The Choir**

> Three callers arranged in a triangle; ground circles overlap on the player's "natural" path.

- **Setup:** 3× Caller at the three points of a triangle, each ~6 tiles from the others. Their ground-circle drops are slightly desynchronized (0.4s offset each) so a continuous stream of red circles appears on the floor.
- **Player problem:** the room teaches the player to read **multiple concurrent telegraphs** (still ≤ cap of 3) and to commit to a route through the gaps.
- **Soft cap usage:** 3 enemies, 3 active telegraphs (worst case). Hard floor: spawn never queues a 4th.
- **First seen:** Chapter 2, Room 14.

#### Script 4 — **The Anvil**

> One bulwark in the center + 4 motes nipping at the player's heels.

- **Setup:** 1× Bulwark slowly tracks player. 4–6× Motes surround the player from behind. Motes deny back-pedal, Bulwark denies the front.
- **Player problem:** must commit to circling — neither retreat nor advance is safe. Tests Multishot / Front Arrow build viability.
- **Soft cap usage:** 1 + 5 Motes (~3.5 cap units). Telegraphs: only Bulwark slam.
- **First seen:** Chapter 3, Room 6.

#### Script 5 — **The Eclipse**

> One elite (Warden) + one healer (Mender) + two ranged (Slingers).

- **Setup:** 1× Warden front-and-center. 1× Mender behind it, tethered to keep the Warden topped. 2× Slingers on the flanks fire perpendicular lines.
- **Player problem:** target prioritization (kill Mender first) under sustained crossfire. This is the launch game's signature "final pressure" room.
- **Soft cap usage:** 4 enemies, up to 2 active telegraphs.
- **First seen:** Chapter 2, Room 19; repeats with biome reskin in every chapter thereafter.

---

## 5. Scaling math across chapters

Goal: enemies feel meaningfully harder each chapter without ever shortening telegraphs below the floor (0.5s normal, 1.0s one-shot). Per `research/games/enemies-and-bosses.md` §8.4, prefer scaling **frequency / count / density** over raw damage.

### 5.1 Per-chapter scaling table

| Chapter | HP multiplier | Damage multiplier | Spawn density multiplier | Telegraph wind-up | Notes |
|---|---|---|---|---|---|
| 1 | 1.00× | 1.00× | 1.00× | 1.00× | Tutorial baseline |
| 2 | 1.18× | 1.10× | 1.07× | 1.00× | New archetype: Caller |
| 3 | 1.39× | 1.21× | 1.14× | 1.00× | New archetype: Pyre |
| 4 | 1.64× | 1.33× | 1.22× | 0.95× | Sift introduced; wind-ups tighten 5% |
| 5 | 1.94× | 1.46× | 1.31× | 0.92× | Prism Slime introduced |
| 6 | 2.28× | 1.61× | 1.40× | 0.90× | Composition era |
| 7 | 2.70× | 1.77× | 1.50× | 0.88× (floored at 0.5s normal / 1.0s one-shot) | Endgame |

Formulae (used by the build pipeline):
- `HP[ch] = HP[1] × 1.18^(ch − 1)` (≈ +18% per chapter, geometric)
- `Damage[ch] = Damage[1] × 1.10^(ch − 1)` (≈ +10% per chapter, gentler)
- `Density[ch] = Density[1] × 1.07^(ch − 1)` (≈ +7% per chapter, gentlest)
- `Windup[ch] = max(Windup_floor, Windup[1] × 0.98^(ch − 1))` — never drops below floor

These rates ensure the player's gear progression (per `design/00-design-pillars.md` Pillar 3 — power budget split) outpaces enemy HP gain on average, so progression always feels positive while individual encounters get tighter.

### 5.2 Levers used in priority order (most to least player-favored)

1. **Composition diversity** — mix more archetypes per room
2. **Attack frequency** (cooldowns shrink)
3. **Projectile/spawn count** (Hivekeeper goes 3 → 4 Motes; Caller drops 1 → 2 circles)
4. **Density** (spawn count per room)
5. **HP scaling** (above)
6. **Damage scaling** (above; the least fun lever — used sparingly)
7. **Wind-up compression** (capped at the fairness floor — used only to push expert play, never to add unfair difficulty)

---

## 6. Fairness rules

Non-negotiable. These are **engine-level checks**, not designer guidelines. The room generator and the AI runtime both enforce them.

### 6.1 No instant attacks

Every attack — base, special, elite, Warden, summoned — has a **visible wind-up ≥ 0.5s** (normal attacks) or **≥ 1.0s** (one-shot / heavy attacks). The wind-up must be:
- **Visually distinct** from the idle pose (animation change, color flare, or telegraph decal).
- **Audibly cued** with a sound from the audio brief (per `design/03-world-and-theme.md` audio commitments).
- **Cancellable cleanly** — if the enemy dies mid wind-up or loses line-of-sight, the telegraph fades in 0.15s, not blinks off. Vanishing telegraphs would teach players that visuals lie.

### 6.2 No off-screen attacks

If an enemy is off-screen but its attack will resolve on-screen (Lance-Eye, Slinger, Caller drop), an **inbound arrow indicator** appears at the screen edge during the entire wind-up. The arrow is yellow (warning) and points along the attack vector. Per `research/games/enemies-and-bosses.md` §6 rule 9.

Additionally: if an enemy is fully off-screen and intends to attack, it **delays its attack** until either:
- The player can see it, or
- The arrow indicator has been visible for ≥ 0.6s.

### 6.3 No simultaneous one-shot threats from 3+ directions

The room generator enforces: **at any frame, no more than 2 distinct attacks resolving in the next 1.0s may overlap the player's safe-movement cone**. If a 3rd attack would queue, the AI staggers it by 0.4s minimum. Implementation: a shared "telegraph budget" on the room. Each pending one-shot consumes 1 unit; max 2 units active.

This means a player can always solve any frame by moving in **at least one direction**.

### 6.4 Spawn safety radius

No enemy spawns within **2 meters (≈ 4 tiles)** of the player at the moment of spawn. Sifts (burrowers) may travel underground inside the radius, but their **surface point** is always ≥ 2m from the player. If the room template would force a spawn inside the radius, the spawn is delayed until the player moves, or relocated to the nearest valid edge.

### 6.5 Telegraph layer rules

- Telegraphs render **above enemy bodies, below player + HUD**.
- Max **3 concurrent telegraphs at Chapter 1–3, max 4 at Chapter 4–7** (see soft-cap table §4.1).
- Two attacks sharing the same shape primitive must differ in **size, outline pattern, or fill animation**. The Pyre's pulsing circle and the Bulwark's static circle are the canonical example.
- One-shot telegraphs use a **thicker outline + pulse animation** (visually distinct from normal AoEs) and a unique audio cue (low boom, not the standard chime).

### 6.6 Forgiveness frames

Damage resolves **100ms after the visual impact moment** for every telegraphed attack. Players who dodge "late" still survive. Per `research/games/enemies-and-bosses.md` §7 softening tricks.

### 6.7 Revive contract

Per `design/00-design-pillars.md` Pillar 5 (fair-to-F2P) and the launch-scope mode list: **one revive per run** is granted to the player. One-shot mechanics are tolerable because they're not run-enders on the first occurrence. We never gate revive behind hard currency in the campaign mode.

---

## 7. Audio brief — sound key callouts

The audio team owns 50 SFX at launch (per `design/05-launch-scope.md`). The enemy catalog claims **24 of those slots** (12 archetypes × ~2 key SFX each), with shared biome-voicing layers handled via FMOD parameter rather than additional samples.

| Archetype | Required SFX | Reuse strategy |
|---|---|---|
| Charger | growl loop, lunge whoosh, death chime | One sample; pitch-shift +2 / -2 semitones per realm |
| Slinger | draw, release, impact | Shared `proj/light_arrow` impact across all realms |
| Lance-Eye | paint, whistle (4-sec ramp), fire, shatter | Whistle is the signature audio; never reused elsewhere |
| Bulwark | footstep loop, slam wind-up, slam impact, collapse | Slam impact reused for boss ground-slam |
| Mote | chitter loop, nip, **pop** (musical) | Pop tuned to musical 4th above current track root |
| Hivekeeper | idle hum, summon wind-up, spawn pop, death implode | Implode reused for Pyre detonate |
| Pyre | sprint breath, countdown chirp, detonate, residue | Countdown chirp is **identity sound** — never reuse |
| Caller | cast loop, drop wind-up, drop impact, bloom | Bloom shared with player healing pickup |
| Mender | heal beam loop, tether start, death chime | Heal loop is **white-coded audio** — always recognizable |
| Warden | outline hum (always-on identity), special wind-up, special release, shatter | Outline hum is the "elite is here" cue |
| Sift | burrow rumble (under floor), trail hiss, surface crack, bite, death sink | Burrow rumble layered via low-frequency bus |
| Prism Slime | hop squash, hop land, split burst (rainbow chime), child pop | Split burst is the signature splitter sound — refractive shimmer |

**Cross-cutting audio commitments:**
- Every wind-up has a sound. No silent telegraphs.
- One-shot wind-ups use a **low frequency boom** layer (50–80 Hz) so the player feels the threat even with thumb-occluded screen.
- Mender and Pyre have the most distinct sound signatures — these are the two archetypes the player **must** identify by ear even when off-screen.
- Biome voicing is a **single FMOD bus parameter** (Vale → Cathedral → Frostspire → Emberforge → Glassroot → Hollow Sky → Long Dusk), not 7× SFX libraries. Reverb, EQ, and minor pitch shifts per biome.
- The narrator voice (see `design/03-world-and-theme.md` audio direction) does **not** voice enemies; enemies are sound-only. The Dim has no voice; the Long Dusk's "speaking" is environmental, not vocal.

---

## 8. Open questions and follow-ups

Tracked for wave-3 design pass:

1. **Should Wardens have a guaranteed-drop schedule** (e.g., 1 per chapter) or be probabilistic? Probabilistic is more fun but probability needs to lock to a floor (at least 1 Warden every 2 rooms in the back half of a chapter).
2. **Sift's substitute in Hollow Sky** is currently "extra Pyre wave." A "Falling Star" Pyre variant that drops from above with a top-screen arrow indicator would feel more native to the biome — needs prototype.
3. **Prism Slime in Glassroot Forest** is the most lavishly themed version — does it warrant a third child-tier (grandchildren)? Probably not for launch (soft cap pressure), revisit for first content drop.
4. **Mender priority targeting AI** needs a "feign death" countermeasure consideration if players consistently kite Menders out of healing range trivially.
5. **Color-blind mode** for telegraph language — red / yellow / white discipline assumed; needs a deuteranopia / protanopia QA pass with the art team before soft launch.

---

*Owners: Wave-2 content design. Cross-links: `content/bosses.md` (TBD), `content/abilities.md` (TBD), `content/levels.md` (TBD). All stat values subject to balance-pass spreadsheet in Phase 1.*
