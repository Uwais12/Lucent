# Enemies and Bosses in Archero-Style Mobile Games

A research catalog of enemy archetypes, encounter pacing, and boss design patterns drawn from Archero, Archero 2, Survivor.io, Mighty DOOM, and adjacent mobile action roguelites. Working reference for combat depth in Lucent.

---

## 1. Enemy Archetypes

In Archero-style combat the player is always moving. Every archetype exists to answer one question: **what does this enemy force the player to do?** Variety comes from which axis of player movement each enemy attacks, not from visuals.

| Archetype | Core Behavior | Pressure Created | Reference Examples |
|---|---|---|---|
| **Melee charger** | Closes distance, swings or bites on contact | Forces backpedal, denies stationary DPS | Gray Wolf, Green Snake (Archero); Zombies (Survivor.io); Imp (Mighty DOOM) |
| **Ranged shooter** | Maintains medium range, fires linear projectiles | Forces lateral strafing, perpendicular dodges | Skeleton Archer, Cactus, Fire Spirit (Archero) |
| **Sniper** | Long-range, slow cadence, heavy single shot | Forces line-of-sight breaks and tells | Skeleton Mage, Rock Golem rock-throw (Archero) |
| **Tank** | High HP, slow, body-blocks paths | Forces lane discipline, drains DPS budget | Ogre, Plated Slime (Archero); Mancubus (Mighty DOOM) |
| **Speeder / swarmer** | Low HP, fast, attacks in groups | Forces panic kiting and AoE spending | Red Bats, small Skulls (Archero); Zombie hordes (Survivor.io) |
| **Summoner** | Spawns minions on a timer or HP threshold | Forces priority targeting, fills the screen | Necromancer (Archero); Fish Eye Boss minions (Survivor.io) |
| **Bomber / kamikaze** | Runs in and explodes; corpse may persist | Forces clean disengage, denies clumping | Living Bomb, Red Living Bomb (Archero); Suiciders (Survivor.io) |
| **AoE caster** | Drops or projects telegraphed ground zones | Forces relocation, breaks stationary DPS | Fireball Mage, Ground Turret (Archero) |
| **Healer / buffer** | Restores HP or buffs nearby allies | Forces priority targeting, inverts threat order | Witch Doctor (mobile roguelites); rare in Archero |
| **Bullet sponge / elite** | Familiar archetype with multi-mult HP and tinted shader | Forces sustained focus, mid-fight pacing change | Champion / Elite variants in most -.io games |
| **Burrower / pop-up** | Hidden under terrain, surfaces near player | Forces awareness of off-screen threats | Brown Worm (Archero); sand mobs |
| **Splitter** | Divides into smaller copies on death | Punishes greedy AoE clears | Red Slime (Archero); some Survivor.io bosses on death |

**Design lesson:** the strongest rooms combine at least two pressure axes. Charger + sniper forces dodging perpendicular while retreating. Tank + speeders pulls DPS off the real threat. Same-archetype rooms feel flat regardless of enemy count.

---

## 2. Wave and Encounter Design

### Room composition rules of thumb (observed in Archero / Archero 2)

| Room type | Composition | Function |
|---|---|---|
| Trash sweep | 8-15 weak enemies of 1-2 archetypes | Power fantasy, reward power spikes |
| Mixed pressure | 1 tank + 4-6 speeders, OR 2 shooters + 3 chargers | Tests movement |
| Hazard room | Stationary turrets / spike traps + light enemy load | Tests pathing not aim |
| Elite gate | 1-2 elites of an archetype seen earlier | Power check before boss |
| Mini-boss room | Single elevated enemy + 0-4 adds | Pacing climax mid-chapter |
| Boss room | Single boss, scripted intro, no adds (usually) | Chapter climax |

### Density and pacing curve in a chapter

Archero chapters follow: easy → mixed → hazard → elite → mini-boss → mixed → elite → boss. Rest beats between spikes let the player consume health drops and feel recovered. Survivor.io uses the same logic on a time axis: trash minutes → elite → trash → elite + chaser → mini-boss → boss.

### Spawn density over a run

- **First 20% of a run:** sparse, 1-2 archetypes, generous space.
- **20-60%:** introduce a new archetype every 2-3 rooms, density rises by ~30%.
- **60-90%:** layered composition (3+ archetypes per room), elites become normal, hazards introduced.
- **90-100%:** boss room, no fluff, full attention on telegraphs.

### Push-pull dynamic

Melee enemies push the player away from them; ranged enemies pull the player toward them (the player wants to close and burst them down before another wave). Designers use this to **route the player around the room**. A shooter in the upper right plus a charger in the lower left literally steers the player through the middle - where you can plant a hazard or a bomb.

---

## 3. Boss Design

### Phase structure

| Structure | When used | Notes |
|---|---|---|
| **Single phase** | Mini-bosses, early chapters | Loop of 2-3 attacks. Cheap to author, easy to read. |
| **2-phase (50% HP)** | Mid-game world bosses | New attack added, animation tinted, often a "rage" speed-up. Most common in Archero/Mighty DOOM. |
| **3-phase (66% / 33%)** | Late-chapter and endgame | Each phase introduces 1 attack and retires or modifies 1 old one. Mighty DOOM's Mecha Zombie and Tentacle bosses follow this. |
| **HP-gated split** | Final / signature bosses | At a threshold, boss splits into smaller copies or summons (Archero's Demon Master, Survivor.io's Fish Eye). |

A reliable rule: each phase should add **one new question** for the player. Adding more than one at once feels unfair because the player cannot diagnose which question killed them.

### Common attack patterns (observed across games)

1. **Telegraphed AoE drop** — circular red zone, ~1.0-1.5s wind-up, then damage. Used by Fireball Mage in Archero and most caster-style bosses.
2. **Linear projectile fan** — 3, 5, or 7 projectiles in a spread, fired at the player's last known position. Player learns to side-step on the wind-up frame. Archero's Tornado boss and Demon boss both use this.
3. **Aimed-line laser / beam** — narrow rectangle telegraph, brief delay, then full damage. Sweeps slowly so the player has to keep moving.
4. **Charge / dash** — boss lines up with the player, pauses (the tell), then sprints in a straight line. Player dodges perpendicular. Archero bosses commonly chain two dashes followed by a projectile burst.
5. **Spin attack** — boss rotates while emitting projectiles or a damage aura. Forces the player to find the gap in the bullet ring.
6. **Minion summon** — boss freezes for 1-2s, spawns 4-8 adds, resumes. Tests the player's AoE / sustain.
7. **Ground slam** — boss raises a fist or weapon, ground cracks appear in a radius, damage on landing. Pure positional test.
8. **Persistent hazard placement** — boss spawns lingering puddles/fires that shrink usable space. Mancubus-style and Red Living Bomb residue.

### Tells / telegraphs (mobile-specific)

- **Color** — red is universally "this will hurt you." Yellow is "it will hurt soon." White or blue outline is a wind-up.
- **Shape primitives** — circle (AoE drop), rectangle (line/beam), cone (fan), ring (expanding shockwave). Players learn these in chapter 1 and they should never lie thereafter.
- **Animation wind-up** — minimum 0.6s, ideal 0.9-1.2s on a small screen. Below 0.5s feels like a gotcha.
- **Audio cue** — short rising whoosh or thump on telegraph spawn. Critical because the player's thumb is covering part of the screen.
- **Screen shake** — reserved for impact, not wind-up, to avoid teaching players to ignore it.

### Movement archetypes for bosses

- **Stationary** (turret bosses): everything telegraphs through projectiles and AoE drops. Player movement is the variable.
- **Slow tracking** (default): boss walks toward the player slowly. Creates positional pressure on top of attacks.
- **Charge-only** (dash bosses): stationary between dashes. Player has predictable downtime.
- **Teleport** (advanced bosses): boss vanishes, re-appears at telegraphed location 0.5-1s later. Used to break stale kiting patterns.
- **Mobile flier** (rare in 2D top-down): hovers, ignores walls, used for late-chapter "you can't corner-cheese me" bosses.

### Difficulty scaling at higher chapters

Archero's chapter 1 Tornado boss reappears in modified form many chapters later with: faster projectiles, more projectile waves per cycle, smaller dodge gaps, lingering hazards added, and frequently a +1 to phase count. The fight is still recognizable - the player's pattern knowledge has value - but every variable has been turned up. Sky Tower in Archero 2 follows the same principle: floors 96-100 stack five reskinned chapter bosses at once.

---

## 4. Mini-Boss vs World Boss

| Trait | Mini-boss | World boss (chapter-end) |
|---|---|---|
| HP budget | 3-5x normal elite | 15-30x normal elite |
| Phases | Single, sometimes 2 | 2-3 |
| Attack count | 2 distinct attacks | 4-6 distinct attacks |
| Arena | Same room as preceding fight | Dedicated arena, often larger |
| Adds | Frequently shares space with adds | Usually alone, may summon |
| Intro | Pop-up nameplate only | Cutscene/cinematic flourish, music shift |
| Drop | Currency + maybe rare drop | Guaranteed unique drop, key, or chapter unlock |
| Player expectation | Stumbling block, can be steamrolled | Marquee fight, expected death on first try |

Mini-bosses exist to **stress test a single mechanic** (e.g., a Red Slime mini-boss teaches the player about splitters before the real boss exploits it). World bosses are **compositional**: they combine 4-6 mechanics the player has already met into a single sustained encounter.

---

## 5. Specific Iconic Bosses

### Archero / Archero 2

1. **Tornado (Chapter 2 boss, Archero).** Stationary, large hitbox. Two attacks: a fan of small homing tornadoes, and a tracking tornado surrounded by clockwise orbiters. Works because both attacks are readable, projectiles spread over distance (more reaction time at range), and the rotation direction is a learnable cue (hide in the bottom-right corner so the orbit eats most of the small tornadoes on the wall). **Lesson: predictable physics > scripted dodge memorization.**
2. **Demon Master (mid-game Archero).** Four attacks: fire projectile spread, frontal clap explosion, three lunging swings, jump-lunge landing burst. Phase 2 chains attacks faster. Works because each attack has a different range, so the player's correct response (back up / dodge sideways / strafe in for damage) depends on the attack. **Lesson: variety of correct responses, not variety of attacks, creates depth.**
3. **Sand Dragon (Archero, desert chapter).** Buries and re-emerges. Uses pop-up to break kiting lines. Mixed reception - players complain about losing tracking. **Lesson: invisible bosses must telegraph their re-emergence with a strong ground tell.**
4. **Wolf King (Archero).** Charge boss. Dash, dash, projectile, jump. Loops cleanly. Works because the dash gives perpendicular dodge windows and the jump telegraphs a circular impact. **Lesson: a 4-attack loop is the sweet spot - long enough not to feel scripted, short enough to learn in 3 deaths.**
5. **Dragon King / final Archero boss.** Multi-phase, fire breath cone, projectile arcs, persistent lava patches. **Lesson: lingering hazards in a final fight create the "shrinking arena" feeling.**
6. **Sky Tower 100 boss stack (Archero 2).** Not one boss but five back-to-back reskinned chapter bosses. Works as an endurance gate. **Lesson: endgame doesn't need new bosses, it needs new combinations.**

### Survivor.io

7. **Butterfly Boss (Chapter 2, Survivor.io).** Pink butterfly that fires projectiles and leaves toxic gas trails the player can't path through. Works because the residue forces the player to commit to one half of the arena. **Lesson: persistent ground hazards work even on a bullet-hell screen because they fix the arena geometry.**
8. **Fish Eye / Cthulhu-style mid-chapter boss.** Spawns waves of minions while attacking, so the player can't ignore either. **Lesson: a summoner boss is its own composition - the player is fighting a room, not a duel.**
9. **The Reaper (timed elite spawn).** Not a chapter boss but a one-shot persistent threat that arrives if you stall too long. **Lesson: a timed punisher enforces pacing in an otherwise open-ended mode.**

### Mighty DOOM

10. **Tentacle (Mighty DOOM).** Phase 1 a single tentacle from below; phase 2 adds two flanking tentacles that pinch the player's escape route. Works because phase 2 doesn't add new mechanics, it constrains space. **Lesson: phase changes can be spatial, not just mechanical.**
11. **Mecha Zombie (Mighty DOOM).** Phase 1 fast projectiles dodged with lateral movement; phase 2 a wide spinning flamethrower that forces a retreat to arena edge. **Lesson: forcing the player to change their preferred position between phases prevents one strategy from solving the whole fight.**

### What doesn't work

- **Off-screen attacks with no edge indicator** (early Archero criticism). The player can't dodge what they can't see.
- **Below-0.5s telegraphs** at higher chapter difficulty - they feel like the game is cheating.
- **Hidden HP thresholds** that change behavior without any visual signal - the player thinks they're losing the pattern when actually the rules changed.

---

## 6. Telegraph and Readability Principles for Small Screens

1. **Color discipline.** Red = damage now or imminent. Yellow = warning, soon. Never use red for friendly effects.
2. **Shape primitives are a language.** Pick 4-5 (filled circle, filled rectangle, cone, ring, arrow) and use them consistently across every enemy and boss in the game. The player should be able to read a new boss without a tutorial.
3. **Telegraph duration scales with attack severity.** A nick takes 0.4s wind-up; a one-shot takes 1.2s. The player intuitively learns this mapping.
4. **High contrast against terrain.** Ground attacks need a bright outline that survives over any tile palette. Pre-baked tile color tests should be part of QA.
5. **Layer on audio.** A short rising tone for AoE drops, a hum for beams, a thud for slams. The player's thumb hides ~20% of the screen on iPhone - sound recovers what gets covered.
6. **No overlapping telegraphs that share visuals.** If two attacks both draw red circles, they must differ in size, outline pattern, or fill animation. Otherwise the player can't plan.
7. **Cancel telegraphs cleanly.** If a boss is interrupted or the wind-up should not resolve, the indicator should fade or pop, not just blink off. Vanishing indicators teach players the visuals lie.
8. **Indicators above bodies, not under them.** On a small screen, sprites overlap. Telegraph layer renders above enemy bodies but below player + HUD.
9. **Off-screen attack arrows.** Any attack originating off-screen needs an inbound arrow at the screen edge.
10. **Limit simultaneous telegraphs.** Cap concurrent indicators (e.g., max 3 visible at once). When more attacks queue, stagger them.

---

## 7. One-Shot Mechanics Without Feeling Unfair

One-shots can work, but they must satisfy four conditions, all four every time:

1. **Telegraphed for at least 1.0 second** with a unique visual (one-shot circles should look different from normal AoEs - e.g., thicker outline, pulsing, distinct sound).
2. **Avoidable by movement alone** - never by a resource the player might not have (no "dodge roll required" if dodge has a cooldown the boss can desync from).
3. **Spatially predictable** - the player can position to be safe even before the telegraph spawns. Boss room geometry should always allow a non-obvious safe spot.
4. **Failure is legible** - on death, the player can replay the last 2 seconds in their head and say "I should have moved left." If they can't, the mechanic is unfair.

Additional softening tricks used in mobile roguelites:

- **Damage scaling per chapter.** Chapter 1 one-shots aren't truly one-shots; they take 80% HP. By Chapter 15 they take 100%. The same visual mechanic feels different as the player has more HP and tools.
- **Forgiveness frames.** Apply damage 100ms after the visual impact moment - players who dodge late still survive.
- **Revives.** Most -.io games give one revive per run. This makes one-shots tolerable because they're not run-enders the first time.
- **Edge-of-screen safe arrows.** If the player is panicking and forgets the safe spot, a small "<--" arrow at the screen edge during the wind-up rescues them.

---

## 8. Recommendations for Lucent

### 8.1 Proposed enemy archetypes (10)

| Codename | Archetype | Speed | HP | DPS | Range | Behavior summary |
|---|---|---|---|---|---|---|
| **Husk** | Melee charger | Med | Low | Med | Touch | Default trash. Walks to player, swings on contact. |
| **Slinger** | Ranged shooter | Low | Low | Low | Med | Stops at medium range, fires every 1.4s. |
| **Lancer** | Sniper | V. low | Med | High | Long | 2s wind-up red line, single heavy shot. |
| **Boulder** | Tank | V. low | High | Low | Touch | Body-blocks, low damage, soaks DPS. |
| **Mote** | Speeder swarmer | High | V. low | Low | Touch | Spawns in groups of 5-8. |
| **Hivekeeper** | Summoner | Low | Med | None | n/a | Stationary, spawns 3 Motes every 4s. |
| **Pyre** | Bomber kamikaze | High | Low | High burst | Touch | Sprints in, 0.6s telegraph circle, explodes. |
| **Caller** | AoE caster | Low | Med | Med | Long | Drops a 1.2s red circle on the player. |
| **Mender** | Healer | Low | Med | None | Short | Heals nearest ally 5% HP/s, priority target. |
| **Warden** | Elite/bullet sponge | Med | V. high | High | Mixed | Reskinned/scaled-up Husk or Slinger with 1 special attack. |

Stat profiles are relative - we tune to feel, not to absolute numbers. The point is each archetype occupies a distinct cell on (range x speed x HP).

### 8.2 Wave / room pacing curve (per chapter, ~15-20 rooms)

| Room # | Type | Composition | Player feels |
|---|---|---|---|
| 1-3 | Trash sweep | Husks + Slingers | Warm-up, power fantasy |
| 4-5 | Mixed pressure | Husks + Lancer | First positional test |
| 6 | Hazard | Stationary turrets + few Husks | Pacing test |
| 7-8 | Mixed | Boulder + Motes | DPS priority test |
| 9 | Mini-boss | Elite Warden + 2 Slingers | First climax |
| 10-12 | Variety | Caller + Pyre + Husks | Telegraph practice |
| 13 | Elite gate | 2 Wardens | Power check |
| 14 | Summoner room | Hivekeeper + endless Motes | AoE check |
| 15-16 | Final mixed | Caller + Lancer + Husks | Composition test |
| 17 | Rest beat | Sparse trash, big heal drop | Breathe |
| 18-20 | Boss arena | Chapter boss | Climax |

Density rises monotonically except for the deliberate rest beat at room 17, which exists to set up the boss as a clean reset.

### 8.3 Five boss design templates

1. **The Brute (charging melee boss).** Stationary between dashes. 4-attack loop: dash, dash, ground-slam (circle AoE), recovery window. Phase 2 at 50% HP: dashes become triple, slam radius grows. Test: perpendicular dodging.
2. **The Conductor (projectile-pattern boss).** Slow tracking. Cycles through three patterns: 5-projectile fan, ring of 12 with one gap, spiral. Phase 2: patterns overlap with 0.5s offset. Test: dodge-line reading.
3. **The Architect (AoE caster boss).** Teleports. Drops 1-3 red circles on player positions, mixes in a long sweeping rectangle. Phase 2: leaves persistent puddles after each AoE. Test: arena management.
4. **The Mother (summoner boss).** Stationary central platform. Summons waves of 4 Motes plus occasional Pyres, fires a slow homing orb between waves. Phase 2: summons a Warden once. Test: target prioritization.
5. **The Engine (multi-phase mech boss).** Three distinct phases gated at 66% and 33%. Phase 1: linear missiles. Phase 2: missiles + leg stomps (circle AoEs). Phase 3: missiles retired, ultimate beam sweep + minion spawn. Test: adaptability across phases.

Each template is a different combination of (movement, attack shape, phase trigger). Authoring time per boss should be roughly equal so we can ship 5-6 per content drop.

### 8.4 Scaling across 20+ chapters

- **Chapters 1-5 (intro):** introduce one new enemy archetype per chapter. Each chapter ends with a fresh boss using one template. Damage values are forgiving - effective TTK on the player is 4-5 hits.
- **Chapters 6-10 (composition):** stop adding new enemies. Start mixing 3+ archetypes per room. Bosses become 2-phase, attack speeds rise ~15% per chapter.
- **Chapters 11-15 (elite era):** elite variants ("Husk+", "Slinger+") replace base versions. Bosses gain a third phase or a unique signature attack (e.g., Brute now leaves cracks in the ground that become Pyre spawn points).
- **Chapters 16-20 (endgame):** combine elite enemies + mini-boss-as-trash. Bosses become endurance fights with shrinking arenas, lingering hazards, and persistent debuffs (e.g., damage taken +10% if the player stops moving for >1s).
- **Chapter 20+ (post-game / tower mode):** stack chapter bosses 3-5 at a time per "floor" with shared HP bars, mirroring Sky Tower. No new bosses authored; new combinations.

Scaling levers, in order of preference:
1. Attack frequency (most fun to scale)
2. Projectile count per attack
3. Projectile speed
4. Phase compression (phases trigger earlier)
5. Enemy density
6. Damage values (least fun to scale - prefer adding mechanics over numbers)

We **never** scale by removing telegraphs or shortening them below the minimum (0.6s for normal, 1.0s for one-shot). Difficulty comes from compounding patterns, not from making them less readable.

---

## Sources

Archero Wiki (Fandom); Theria Games Archero 2 monster guide; AllClash Archero boss guide; Pocket Gamer Archero 2 guides; Game Vault Archero 2 Sky Tower wiki; Pro Game Guides Archero walkthroughs; Doom Wiki and GameSkinny on Mighty DOOM bosses; BlueStacks / WriterParty / AppGamer Survivor.io guides; Game Developer "Enemy Attacks and Telegraphing"; Chaotic Stupid telegraphing writeup; SMU Guildhall "Spatial Composition for a Pacing Curve" thesis.
