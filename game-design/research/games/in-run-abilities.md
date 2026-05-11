# In-Run Abilities Research: The Archero-Style Upgrade Pool

> Source survey for designing Lucent's pick-one-of-three between-room upgrade system. Pulls from Archero, Archero 2, Survivor.io, Mighty DOOM, Vampire Survivors, and (for design lessons) Hades and Slay the Spire.

---

## 1. The Shape of the Genre's Upgrade System

The loop is identical across every Archero-like: clear a room, level up (or trigger an Angel/Devil offer), pick **1 of 3 random abilities**, repeat ~30 times per run. The combination of picks is the "build."

A good ability pool requires (a) abilities with sharp identities, (b) some abilities that synergize loudly, and (c) some that anti-synergize so picks have cost. Reference pool sizes: Archero ~80, Archero 2 ~75, Survivor.io 22 active + 22 passive (offset by 5-level scaling), Mighty DOOM ~40, Vampire Survivors 34 passives + 50+ weapons.

Genre sweet spot for first launch: **60–90 distinct in-run abilities** across ~10 categories with hard rarity gating.

---

## 2. Category-by-Category Catalog

Game names in parentheses cite the origin of each ability name.

### 2.1 Projectile Modifiers

The most important category — every Archero-like ships 8–12 of these. They physically transform the weapon.

| Ability | Game(s) | Effect |
|---|---|---|
| Front Arrow +1 | Archero, A2 | Second parallel forward projectile |
| Side Arrows +1 | Archero | Two extra projectiles, left + right |
| Rear Arrow +1 | Archero, A2 | Backward projectile |
| Diagonal Arrows +1 | Archero, A2 | Two forward-diagonal projectiles |
| Multishot | Archero, A2, Survivor.io | Second volley of all projectiles (AS cost) |
| Piercing / Wall-Piercing | Archero, A2 | Pass through enemies (and obstacles in A2) |
| Ricochet Arrow | Archero, A2 | Bounce between monsters; 60% per bounce |
| Bouncy Walls / Bounce | Archero, A2 | Bounce off walls instead of stopping |
| Split Shot | A2 | Forward shot splits into 3 (0.33x each) |
| Charged Arrow | A2 | Giant slow shot (2x dmg, 0.7x AS) |
| Tracking Eye / Homing | A2 | Projectiles track nearest (–10% dmg) |
| Smart Targeting | Archero | Auto-correct toward nearby enemies |
| Lightwing Arrow | A2 | ~25% chance to deal +100% dmg |
| Headshot | Archero | Small chance to instakill |
| Long-Range Power | A2 | +1–40% dmg by travel distance |
| Short-Range Strike | A2 | +20% dmg, +100% AS, range cut to 7m |
| Slow Projectile | Archero | Slows enemy projectiles |
| Fiery Path | A2 | Trail behind player |
| Cloudfooted | A2 | Periodic gusts knock back/damage |
| Whip / Garlic / Bible | Vampire Survivors | Orbit-as-projectile area attacks |

**Design notes:** shot-count modifiers should *multiply*, not add. Genre soft-counters Multishot stacking with an attack-speed or per-shot damage tax (Archero 2: Multishot costs "8 frames"; Front Arrow +1 costs –15% damage). Piercing and Ricochet are mutually exclusive in Archero 1 (Ricochet wins); Archero 2 lets them coexist — a widely-cited power-creep choice.

### 2.2 Damage Types & Status Effects

The "second sentence" of every projectile — DoTs, debuffs, and amplifiers.

| Ability | Game(s) | Effect |
|---|---|---|
| Blaze / Burn | Archero, A2 | Burn DoT (~0.2x ATK/tick) |
| Super Blaze | A2 | +150% Burn dmg, doubled tick rate |
| Bolt / Lightning | Archero, A2 | Chain to 4 nearby (0.3x ATK) |
| Super Bolt | A2 | Chain to 8; +50% lightning dmg |
| Venom / Poison | Archero, A2 | Poison ticks until death |
| Super Venom | A2 | Venom +200%, extra proc |
| Freeze | Archero, A2 | 1.5s freeze, 1x ATK |
| Super Freeze | A2 | Freeze 3x ATK, 2.1s |
| Poisoned Touch | Archero | Proximity poison aura |
| Holy Touch | Archero | Hit enemies fire 2 holy projectiles |
| Dark Touch | Archero | Death-burst dark damage |
| Corrosive Field | A2 | Vulnerability zone, +35% dmg taken |
| Crit Master | Archero | +crit chance + crit damage |
| Crit Plus / Crit Aura | Archero | Smaller crit scaling |
| Vulnerability stacks | Hades | Stacking debuff, +dmg taken |
| Bleed | Hades/StS | DoT bypassing armor |
| Wound | Hades (Ares) | Stacking on-hit DoT |
| Weak | Hades (Aphrodite) | Target deals less dmg |
| Charm | Hades (Aphrodite) | Enemy fights for you briefly |
| Mark | Hades (Artemis) | Tagged enemy takes +dmg |
| True Damage | Archero boss ref | Bypasses armor/resist (see §2.9) |

Design pattern: each elemental status ships in a **base tier** (Common/Rare) and a **Super tier** (Epic) that scales it dramatically. This is the genre's primary justification for Epic rarity — Epics upgrade Commons you already own.

### 2.3 Defensive Abilities

| Ability | Game(s) | Effect |
|---|---|---|
| HP Boost | Archero | +20% max HP |
| HP Plus | Archero | +small flat HP |
| Strength Blood | A2 | +10% max HP |
| Soul of Strength | A2 | +40% max HP (Leg.) |
| Heal / Restore HP | Archero, A2 | One-time heal |
| Fountain of Life | A2 | +15% max HP + full heal |
| Bloodthirst | Archero | 1.5% HP heal per kill |
| Demon Recovery | A2 | Chance to heal 5% on kill |
| Heart of Vitality | A2 | +15% HP, better heart pickups |
| Extra Life / Revive | Archero, A2 | One-time revive at full HP |
| Angelic Shelter | A2 | +15% HP, 2s iframes after damage |
| Invincibility Star | Archero | 2s shield every 10s |
| Invincibility Potion | A2 | 2s iframes on pickup |
| Sacred Protection | A2 | Blocks 1 hit/wave (Leg.) |
| Shield Guard | Archero | 2 orbiting shields block projectiles |
| Dodge Master | Archero | +20% dodge |
| Wind Blessing | A2 | +MS, smaller hitbox, dodge |
| Lucky Cracker | A2 | +Luck, +Dodge |
| Wingman | Archero | Spirit absorbs projectiles |
| Fairy of the Wind | A2 | +10% AS and MS |
| Perilous Recovery | A2 | <30% HP slowly regens to 30% |
| Saving Throw (ref.) | DOOM Eternal | Fatal hit leaves 1 HP, time slow |

### 2.4 Movement Abilities

| Ability | Game(s) | Effect |
|---|---|---|
| Breath of Wind | Archero 2 | +10% movement speed |
| Soul of Swiftness | Archero 2 | +25% AS, large MS bonus (Legendary) |
| Agility | Archero | +MS |
| Water Walker | Archero, Archero 2 | Walk on water terrain |
| Through The Wall | Archero | Walk through walls (HP cost) |
| Wind Blessing | Archero 2 | +MS, shrink hitbox |
| Dodge | (general) | Dash with iframes (Hades, Mighty DOOM "dash slayer") |
| Blink / Teleport | (Hades reference) | Short-range repositioning |
| Ghost / Phase | (genre staple) | Walk through enemy bodies |
| Cloudfooted | Archero 2 | Move and shed knockback gusts |
| Short-Range Strike (movement-shaping) | Archero 2 | Forces close play; +AS reward |
| Fiery Path | Archero 2 | Trail that punishes chasers |

Lucent take: Archero-likes intentionally **limit hard mobility** because dodging is the skill ceiling. Ship 2–3 mobility picks max.

### 2.5 Summons / Minions / Drones (a.k.a. "Sprites")

| Ability | Game(s) | Effect |
|---|---|---|
| Bomb Sprite | A2 | Companion, 0.4x ATK, 5 hits |
| Flame/Lightning/Venom/Ice Sprite | A2 | Elemental companions apply status |
| Laser Sprite | A2 | Beam companion (Epic) |
| Sprite King | A2 | Tracking beam companion (Leg.) |
| Sprite Boost | A2 | +40% sprite dmg |
| Sprite Frenzy | A2 | +50% sprite dmg, +AS |
| Wingman | Archero | Spirit absorbs + attacks |
| Shadow Clone | Archero | Arrow-firing clone on kill |
| Summon One-Eyed Bat | Archero | Extra bat spirit |
| Spirit Multi-Shot / Front / Diagonal | Archero | Sprite mirrors player arrow mods |
| Spirit Crit / ATK / AS Boost | Archero | Sprite stat scaling |
| Pet (Mighty DOOM) | Mighty DOOM | Permanent secondary follower |

Design note: summons in this genre mirror the player's stats, scaled down. Keeps balance one-axis.

### 2.6 Auras & Passives (Player-Centered AoE)

| Ability | Game(s) | Effect |
|---|---|---|
| Attack Boost (Major/Minor) | Archero | +ATK passive |
| Attack Speed Aura | Archero | Pulsing AS bonus |
| Crit Aura | Archero | +crit in zone |
| HP Gain Aura | Archero | Regen pulse |
| Speed Aura | Archero | +MS aura |
| Slow Field | A2 | Slows nearby enemies + projectiles |
| Corrosive Field | A2 | Vulnerability aura |
| Vampiric Circle | A2 | Orb hits heal 2% max HP |
| Garlic | VS | Damage aura |
| Sandalwood / Holy Water | VS | Ground AoE pools |
| Power Trio | A2 | +15% ATK / +20% AS / +20% HP (Leg.) |
| Warrior's Soul | A2 | +30% ATK (Leg.) |
| Warrior's / Fairy's Breath | A2 | +10% ATK / +10% AS (Common) |
| Giant's Strength | A2 | +20% ATK, +25% HP, –MS |
| ATK Increase | A2 | +25% ATK (Epic) |

### 2.7 Special Weapons / Orbs / Independent Damage

This category fires on its own clock, independent of the player's weapon. Vampire Survivors is the spiritual home; every Archero-like has cribbed from it.

| Ability | Game(s) | Effect |
|---|---|---|
| Fire / Bolt / Poison / Ice Circle | Archero, A2 | 2 orbiting elemental orbs apply status |
| Vampiric Circle | A2 | Orbiting healing orbs |
| Obsidian Circle | Archero | Dark damage orbiters |
| Beam Circle | A2 | 2 orbiting laser orbs (Epic) |
| Super Circle | A2 | 4 orbiting non-elemental orbs (Epic) |
| Circle Web / Rotating Web | A2 | Orbs form web; hits damage |
| Circle Boost | A2 | +50% orb damage |
| Energy Ring | A2 | Charged ring up to 11 hits |
| Energy Beam | A2 | Charged beam, 4 hits at 0.7x |
| Fire/Ice/Poison/Bolt Sword | Archero | Orbiting elemental swords |
| Frost/Bolt/Toxic/Blazing Star | Archero | Random falling elemental stars |
| Frost/Bolt/Toxic/Blazing Meteor | Archero | Larger random falling meteors |
| Super Meteor | A2 | Meteor every 4s, 1.25x ATK (Leg.) |
| Meteor Pursuit | A2 | Attack-triggered meteor |
| Chain Meteors | A2 | Doubles meteor proc rate |
| Demonslayer Meteor | A2 | Meteor on kill |
| Meteor Potions (4 elements) | A2 | One-shot elemental meteor |
| Magic / Strike Boost / Twin Strike | A2 | Strikes inherit element; +50% dmg; 2x count |
| Blitz Strike | A2 | 5 strikes per wave |
| Instant Strike | A2 | Strike every 1.5s |
| Assault Strike | A2 | Chance to strike on attack |
| Pursuit Strike | A2 | Strike on kill |
| Riposte Strike | A2 | 5 strikes when damaged |
| Beam Strike | A2 | Beam summons every 2.5s (Leg.) |
| Whip / King Bible / Magic Wand / Lightning Ring | Vampire Survivors | Independent weapon picks |
| Death Bomb / Death Nova / Chilling Blast | Archero | Enemy explodes on death |

### 2.8 Synergy / Scaling Abilities (Conditional Multipliers)

Where build identity lives — conditional multipliers turn a stat-stick run into a strategy.

| Ability | Game(s) | Effect |
|---|---|---|
| Rage | Archero | +dmg as HP drops |
| Perilous Fervor | A2 | <50% HP: +30% ATK and AS |
| Wounded Warrior | A2 | After damage: +50% ATK for 5s |
| Stand Strong | A2 | Stand still stacks +ATK, +AS |
| Demon Slayer | A2 | +10% ATK per kill, max 50% |
| Warrior's Heart | A2 | +5% ATK per heart, cap 50% |
| Lucky Heart | A2 | +3% HP per heart, cap 30% |
| Underworld Warrior | A2 | Forces Demon offer post-boss |
| Boss Slayer | A2 | +25% boss dmg, full heal pre-boss |
| Frenzy Potion | A2 | +50% AS, high crit for 5s |
| Long-Range Power | A2 | +1–40% dmg by travel |
| Grace | Archero | More heal at low HP |
| Flexible | Archero | More dodge at low HP |
| Strong Heart | Archero | Heals restore more |
| Smart | Archero | More coins/XP per kill |
| Fury | Archero | +AS by missing HP |
| Headshot | Archero | RNG instakill |
| Combo / Streak | A2 (Oracle) | Continuous attacks stack dmg |
| Killstreak | Mighty DOOM | Glory chains refund ammo/heal |
| Killing Spree | Hades (Hermes) | +MS while streaking |
| "Every Nth shot" | Hades (Daedalus) | Periodic bonus shot |
| Full HP = dmg | Hades (Aphro) | Rewards untouched runs |
| Crit on full HP | (genre) | Static crit when uninjured |

### 2.9 Boss-Shredder / Single-Target Abilities

| Ability | Game(s) | Effect |
|---|---|---|
| Boss Slayer | Archero 2 | +25% damage to bosses |
| Underworld Warrior | Archero 2 | Demon offer always after boss |
| Execute / Low-HP execute | (genre, see Hades "Mortal Wound") | Instakill at low % HP |
| Lucky Band-Aid | Archero 2 | 2x ATK to all on-screen + projectile clear (panic button) |
| Charged Arrow | Archero 2 | Slow heavy shot for boss DPS |
| Energy Beam | Archero 2 | Sustained channel ideal for bosses |
| Energy Ring | Archero 2 | Multi-hit ring great vs. fat targets |
| Headshot | Archero | RNG instakill (works on bosses statistically) |
| Demon Slayer (stacking) | Archero 2 | Brought to boss = +50% ATK |
| Crit Master + Crit gear | Archero | Single-target spike |
| Multishot (boss read) | Archero 2 | Every shot doubled = best boss DPS skill |
| Tracking Eye + slow projectiles | Archero 2 | Lets you kite boss without aim |
| True Damage / Armor Penetration | (genre reference) | Bypasses boss armor entirely |

Design note: most Archero-likes ship few explicit "boss-only" abilities; generic damage picks (Multishot, Energy Beam, Crit Master) dominate bosses anyway. Ship 2–3 explicit boss multipliers so players can pivot a clear-focused run when the boss is announced.

### 2.10 Combo / Chain Mechanics

| Ability | Game(s) | Effect |
|---|---|---|
| Combo gear set | Archero 2 (Oracle) | Continuous attacks build stacking damage multiplier |
| Demon Slayer stacking | Archero 2 | Stacks per kill |
| Warrior's Heart stacking | Archero 2 | Stacks per heart |
| Killstreak Glory Kill | Mighty DOOM | Chain executes refund secondary |
| Killing Spree | Hades | +MS per kill in window |
| Frenzy Potion | Archero 2 | Triggered burst |
| Beam Strike triggers | Archero 2 | Repeating summon procs (combos with everything) |
| Bolt chain (status) | Archero | Each lightning hit can chain to 4–8 |
| Ricochet chain | Archero | Each bounce keeps the projectile alive |
| Splitting on hit | Archero 2 | Forward arrow splits into 3 on contact |
| Death Nova / Death Bomb | Archero | Death triggers AoE that can chain-kill |

### 2.11 Hero-Specific / Weapon-Specific Abilities

A small subset of picks appear conditionally based on hero or weapon class.

| Ability | Game / Weapon | Effect |
|---|---|---|
| Ring of Agony | Archero 2 (Knuckle/Claw) | Aura on close-range weapons |
| Healing Sprite | Archero 2 | Strong in any heal-scaling hero |
| Star of Fury | Archero 2 (PvP) | Burst skill for arena |
| Arrow Rain | Archero 2 | Bow class top-tier rune |
| Flamenox Touch | Archero 2 | Fire-class signature |
| Frost Strike / Bolt Strike / Fire Strike / Toxic Strike | Archero | Sword class flavor |
| Hero Charm | Hades reference | Boon that only activates with weapon's special |
| Daedalus Hammers | Hades | Weapon-aspect-specific upgrades only |
| Weapon Evolutions | Survivor.io / Vampire Survivors | Pair weapon at L5 with required passive to evolve |
| Gold Slayer kit | Mighty DOOM | Slayer-specific traits |
| Mini Slayer headshot | Mighty DOOM | Slayer-specific instakill |
| Doomicorn Trail | Mighty DOOM | Slayer-specific rainbow damage trail |

Lucent take: weapon-conditional picks help replayability but demand careful pool weighting — if 1/3 of the pool is locked behind hero, early offers feel thin. The Archero 2 model (hero-specific *runes* pre-run, hero-agnostic *skills* in-run) is the cleanest split.

---

## 3. Rarity & Selection Systems

### 3.1 Rarity Tiers Used in the Genre

| Game | Tiers |
|---|---|
| Archero | Common, Epic, Legendary (gated by levels and Angel/Devil offers) |
| Archero 2 | Fine (Common), Rare, Epic, Legendary |
| Survivor.io | No formal tier on skills; rarity exists on equipment |
| Mighty DOOM | Common, Uncommon, Rare, Epic (gear-level) |
| Vampire Survivors | None — selection limited to 6 weapons / 6 passives per run |
| Hades | Common, Rare, Epic, Heroic, Legendary, Duo |

### 3.2 How Higher Rarities Are Gated

Archero's widely-copied model:

1. **Levels are the primary gate.** Lower levels weight toward Common.
2. **Angels & Devils gate Legendaries.** Angel every 10 maps offers higher rarities; Devil offers Legendaries at HP cost.
3. **Boss completion** often offers a guaranteed Epic.
4. **Hero/chapter level** raises the floor — late-game Commons get filtered out as the player exhausts them.

Archero 2 simplifies: roll a rarity *first* (weighted by hero level), then sample 3 abilities of that rarity. A "Legendary level-up" becomes a *moment* — all 3 options are top-tier.

### 3.3 Pick-3-of-N: How the Random Pool Works

| Element | Standard implementation |
|---|---|
| **Pool size** | 3 abilities (sometimes 2 + re-roll button) |
| **Sampling** | Without replacement within level-up; with replacement across level-ups |
| **Stacking** | Most picks stackable up to a cap (Front Arrow 2–3x) |
| **Rarity weighting** | Pre-roll rarity (e.g. 70/20/8/2 at lvl 1, ~30/30/30/10 at lvl 20), then sample within rarity |
| **Re-roll** | Vampire Survivors and Survivor.io sell rerolls; Archero 2 grants them via runes |
| **Lock / Banish** | Slay the Spire removes options from future pools |
| **Smart filters** | Archero 2 upgrades a Common offer to Rare if the player owns all Commons |

"3" is the number: 2 feels stingy, 4 paralyses on a mobile UI. Lucent should ship **3 picks with a paid re-roll**.

---

## 4. Synergy Design

Most-cited synergies in the genre:

| Build | Core Pieces | Reason it works |
|---|---|---|
| **Bullet Hell** | Multishot + Front Arrow + Side + Diagonal | Arrow modifiers multiply: 1 shot → 10+ projectiles |
| **Ricochet Storm** | Ricochet + Multishot + Blaze + Poison Touch | Each bounce reapplies status; DoTs blanket the room |
| **Bouncing Bullets** | Piercing + Bouncy Walls + Side + Multishot | Pass-through + wall bounce = corridor wipe |
| **Combo Crit** | Crit Master + Multishot + Combo gear + Stand Strong | Stacking crit + AS multiplier |
| **Orbit Bot** | All 4 Circles + Circle Boost + Vampiric + Beam Circle | Player is a damage aura |
| **Sprite Army** | All 4 Sprites + Sprite Boost + Frenzy + King | Companions out-DPS player |
| **Glass Cannon** | Rage + Perilous Fervor + Swift + Wounded Warrior | 30% HP = +120% damage |
| **Beam Channel** | Energy Beam + Ring + Charged Arrow + Tracking Eye | Sustained DPS for bosses |
| **Meteor Rain** | Super Meteor + Chain + Pursuit + Demonslayer | Independent damage, hands-free |
| **Strike Spam** | Blitz + Instant + Twin + Magic Strike | Strikes inherit elements; constant procs |

**Consensus auto-picks:** Revive, Multishot, Tracking Eye, Soul of Swiftness, Front Arrow, Power Trio. Strong because each enables many build branches.

---

## 5. Anti-Synergies — When Picks Cancel

| Anti-Synergy | Why it's bad |
|---|---|
| **Piercing + Ricochet** (A1) | Ricochet wins; Piercing wasted |
| **Holy Touch + Piercing/Bouncy** | Holy needs hit-stop the pierce/bounce skips |
| **Multishot + Front Arrow stacks (A2)** | Each Front Arrow taxes –15%; stacks against Multishot |
| **Tracking Eye + Long-Range Power** | Tracking arrows zig-zag short; never hit max travel |
| **Bouncy Walls + Smart Targeting** | Smart re-aims; bounces miss intended wall geometry |
| **Stand Strong + Cloudfooted/Wind** | Stand-still build vs. mobility procs |
| **Soul of Strength + Rage/Perilous** | More HP = low-HP triggers harder to reach |
| **Frenzy Potion + Charged Arrow** | Charged is –AS; Frenzy gives +AS, wasted |
| **Slow Field + Combo gear** | Slow enemies = fewer hits per second |
| **Swift + Front + Tracking** | Damage taxes stack multiplicatively to ~–40% |
| **Multishot + Rotating Web** | Web ignores Multishot count; 1 web/shot |

Deliberate anti-synergies exist so the third pick isn't always obvious — a skilled player must weigh per-shot taxes.

---

## 6. Cross-Genre Lessons

- **Hades** rolls Boon rarity before showing the offer (Archero 2 copies this) and reveals it with a glow tier — steal this UX.
- **Hades Duo Boons** require Boons from two specific gods. Vanishingly rare but become identity. Ship 6–10.
- **Vampire Survivors evolution** (weapon L5 + matching passive → evolved weapon) is a great mid-run goal. Survivor.io and Archero 2 (Super-tier elementals) clone the pattern.
- **Slay the Spire** offers 3 cards plus a Singing Bowl item that lets you skip for +max HP — a "skip = small permanent reward" softens bad-offer runs.
- **Mighty DOOM Slayer perks** show character identity married to in-run picks. Consider hero-conditional Legendaries.

---

## 7. Recommendation for Lucent

### 7.1 Total Ability Count

Target **75 abilities at launch**, +5–10 per major update. Matches Archero 2; enough that no two runs feel identical, small enough to learn in ~10 hours.

### 7.2 Recommended Rarity Distribution

| Rarity | Count | Share | Role |
|---|---|---|---|
| Common (Fine) | 24 | 32% | Flat stat boosts, base elements, +1 projectiles |
| Rare | 24 | 32% | Combined-stat boosts, status applicators, conditional procs |
| Epic | 18 | 24% | Super-element upgrades, dual-stat passives, orbit weapons |
| Legendary | 9 | 12% | Build-defining (Multishot, Revive, Power Trio, Super Meteor) |

### 7.3 Rarity Roll Weighting by Hero Level

| Hero Level | Common | Rare | Epic | Legendary |
|---|---|---|---|---|
| 1–3 | 70% | 25% | 5% | 0% |
| 4–7 | 50% | 35% | 13% | 2% |
| 8–12 | 30% | 35% | 25% | 10% |
| 13+ | 15% | 30% | 35% | 20% |
| Angel / Devil offer | 0% | 20% | 40% | 40% |

Boss-room Angel + HP-cost Devil deliver Legendaries reliably without level grinding.

### 7.4 Pool Distribution by Category

| Category | Count | Notes |
|---|---|---|
| Projectile modifiers | 14 | Most fun-defining category |
| Damage types / statuses | 12 | 4 elements × 3 tiers each |
| Defensive | 10 | Revive, shields, dodge, max HP |
| Movement | 4 | Tight pool — don't trivialize positioning |
| Summons | 8 | 4 elemental sprites + 4 modifiers |
| Auras & passive multipliers | 8 | ATK / AS / HP / Crit scaling |
| Orbit / independent weapons | 9 | Circles, meteors, strikes, beams |
| Synergy / conditional | 6 | Rage, Stand Strong, Streak-style |
| Boss & utility | 4 | Boss Slayer, Lucky Band-Aid, etc. |
| **Total** | **75** | |

### 7.5 Build Archetypes to Support

Recognized from other games and sought out; each must be reachable from any starting hero with average luck:

1. **Bullet Hell Archer** — Stack projectile-count picks. Identity: every shot is a fan of 10+ arrows.
2. **Ricochet DoT** — Bouncing arrows + Burn/Poison. Identity: full-room damage from a single shot.
3. **Crit Glass Cannon** — Crit Master + Rage + Low-HP procs. Identity: 50% HP is the sweet spot.
4. **Orbit Tank** — All Circles + Vampiric Circle + max-HP picks. Identity: walk through enemies, kill by touch, regen passively.
5. **Sprite Commander** — Build the whole sprite stack + Sprite King. Identity: companions out-DPS the player.
6. **Beam Channel / Boss Killer** — Energy Beam + Tracking Eye + Boss Slayer. Identity: cleanup is slow but bosses melt.
7. **Meteor Rain** — Super Meteor + Chain Meteors + Demonslayer Meteor. Identity: hands-free clearing.
8. **Combo Brawler** — Stand Strong + AS picks + Combo passive. Identity: don't move, attack speed maxes out.

Each archetype's "core 3 abilities" should appear at the right rarities to be reachable by level 10–12 with normal RNG.

### 7.6 Anti-Synergy Discipline

Ship these intentional anti-synergies day one so picks feel like decisions, not collectibles:

- Tax every projectile-modifier with –10 to –15% per pick so stacking has cost.
- Piercing and Ricochet mutually exclusive (or strongly diminishing) — same fantasy.
- "Low HP" synergies share offers with +max HP options so the player must commit.
- Combo-scaling vs. Stand Strong: impose a movement/attack tradeoff.

### 7.7 Pick UX

- 3 picks with rarity glow (white/blue/purple/gold).
- 1 free re-roll for the first 3 levels (training); paid via gems thereafter.
- Skip → small heal/coin so a bad offer isn't forced.
- Boss kill → forced Epic-pick of 3 (Angel).
- 0-damage boss → Devil pick: 3 Legendaries at HP cost.

---

## 8. Sources

- Archero Fandom Wiki — [Category:Abilities](https://archero.fandom.com/wiki/Category:Abilities)
- Archero 2 Game Vault Wiki — [Skills](https://archero-2.game-vault.net/wiki/Skills)
- Pocket Gamer — [Archero 2 Tier List](https://www.pocketgamer.com/archero-2/tier-list/)
- ProGameGuides — [Archero Abilities Tier List](https://progameguides.com/archero/archero-abilities-tier-list/)
- Level Winner — [Archero Skills Guide](https://www.levelwinner.com/archero-skills-and-abilities-guide-a-detailed-list-of-the-best-and-worst-skills/)
- GamerHub — [Archero Skills](https://gamerhub.gg/archero/skills/)
- AllClash — [Best Skills in Archero 2](https://www.allclash.com/best-skills-in-archero-2/) and [Combo Build](https://www.allclash.com/best-combo-build-in-archero-2-gear-skills-runes/)
- High Ground Gaming — [Archero 2 Ability Tier List](https://www.highgroundgaming.com/archero-2-ability-tier-list-best-skills/)
- Survivor.io Fandom Wiki — [Skills](https://survivorio.fandom.com/wiki/Skills) and [Weapon Skill Evolution Guide](https://survivorio.fandom.com/wiki/Weapon_Skill_Evolution_Guide)
- BlueStacks — [Survivor.io Skills & Evolution Guide](https://www.bluestacks.com/blog/game-guides/survivor-io/sio-skills-evolution-guide-en.html)
- Doom Wiki — [Mighty Doom](https://doomwiki.org/wiki/Mighty_Doom)
- BlueStacks — [Mighty Doom Tips & Tricks](https://www.bluestacks.com/blog/game-guides/mighty-doom/mdm-tips-tricks-en.html)
- Pocket Gamer — [Mighty Doom Best Slayer Guide](https://pocketgamer.io/mighty-doom/best-slayer-guide/)
- Vampire Survivors Wiki — [Passive Items](https://vampire.survivors.wiki/w/Passive_items) and [Weapons](https://vampire.survivors.wiki/w/Weapons)
- Hades Wiki — [Boons](https://hades.fandom.com/wiki/Boons), [Legendary Boons](https://hades.fandom.com/wiki/Legendary_Boons), [Duo Boons](https://hades.fandom.com/wiki/Duo_Boons)
