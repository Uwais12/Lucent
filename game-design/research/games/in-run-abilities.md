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
| Front Arrow +1 | Archero, Archero 2 | Adds a second parallel projectile forward |
| Side Arrows +1 | Archero | Fires two extra projectiles perpendicular (left + right) |
| Rear Arrow +1 | Archero, Archero 2 | Adds a backward projectile |
| Diagonal Arrows +1 | Archero, Archero 2 | Adds two forward-diagonal projectiles |
| Multishot | Archero, Archero 2, Survivor.io | Fires a second volley of all projectiles (attack speed/frame cost) |
| Piercing Shot / Wall-Piercing Arrow | Archero, Archero 2 | Projectiles pass through enemies (and obstacles in A2) |
| Ricochet Arrow | Archero, Archero 2 | Projectiles bounce between monsters; 60% dmg per bounce |
| Bouncy Walls / Bounce Arrow | Archero, Archero 2 | Projectiles bounce off walls instead of stopping |
| Split Shot | Archero 2 | Forward projectile splits into 3 smaller (0.33x each) |
| Charged Arrow | Archero 2 | Giant slow arrow (2x damage, 0.7x attack speed) |
| Tracking Eye / Homing | Archero 2 | Projectiles track nearest enemy (-10% damage) |
| Smart Targeting | Archero | Arrows auto-correct toward enemies near aim line |
| Lightwing Arrow | Archero 2 | ~25% chance to deal 100% bonus damage on the shot |
| Headshot | Archero | Small chance to instant-kill (random crit-like) |
| Long-Range Power | Archero 2 | Projectiles gain up to +40% damage by travel distance |
| Short-Range Strike | Archero 2 | +20% damage, +100% attack speed, but range cut to 7m |
| Slow Projectile | Archero | Slows enemy projectiles (defensive read of category) |
| Fiery Path | Archero 2 | Leaves a trail behind player (movement-as-projectile) |
| Cloudfooted | Archero 2 | Periodic gusts knock back and damage enemies |
| Whip / Garlic / Bible (orbit-as-projectile) | Vampire Survivors | Area attacks that count as weapon picks |

**Design notes:** shot-count modifiers should *multiply*, not add. Genre soft-counters Multishot stacking with an attack-speed or per-shot damage tax (Archero 2: Multishot costs "8 frames"; Front Arrow +1 costs –15% damage). Piercing and Ricochet are mutually exclusive in Archero 1 (Ricochet wins); Archero 2 lets them coexist — a widely-cited power-creep choice.

### 2.2 Damage Types & Status Effects

The "second sentence" of every projectile — DoTs, debuffs, and amplifiers.

| Ability | Game(s) | Effect |
|---|---|---|
| Blaze / Burn | Archero, Archero 2 | Hits apply Burn DoT (~0.2x ATK per tick) |
| Super Blaze | Archero 2 | Burn damage +150%; tick rate doubled |
| Bolt / Lightning | Archero, Archero 2 | Chain lightning to 4 nearby (0.3x ATK) |
| Super Bolt | Archero 2 | Chain to 8 targets; +50% lightning damage |
| Venom / Poison | Archero, Archero 2 | Hits poison; ticks until enemy dies |
| Super Venom | Archero 2 | Venom +200%, extra proc chance |
| Freeze | Archero, Archero 2 | Hits freeze for 1.5s; deals 1x ATK |
| Super Freeze | Archero 2 | Freeze damage 3x ATK; 2.1s duration |
| Poisoned Touch | Archero | Melee/proximity poison aura |
| Holy Touch | Archero | Hit enemies fire 2 holy projectiles outward |
| Dark Touch | Archero | Death-burst dark damage |
| Corrosive Field | Archero 2 | Vulnerability zone, +35% damage taken in it |
| Crit Master | Archero | +crit chance and crit damage |
| Crit Plus / Crit Aura | Archero | Smaller crit chance scaling |
| Vulnerability stacks | Hades (Doom debuff) | Reference: stacking debuff increases damage taken |
| Bleed | (Hades, Slay the Spire reference) | DoT not gated by enemy armor |
| Wound | Hades (Ares) | Stacking DoT applied on hit |
| Weak | Hades (Aphrodite) | Target deals less damage; pairs with defense |
| Charm | Hades (Aphrodite) | Enemy temporarily fights for you |
| Mark / Hunter's Mark | Hades (Artemis ref) | Tagged enemy takes more damage |
| True Damage | (Archero boss build ref) | Bypasses armor/resistance — see §2.9 |

Design pattern: each elemental status ships in a **base tier** (Common/Rare) and a **Super tier** (Epic) that scales it dramatically. This is the genre's primary justification for Epic rarity — Epics upgrade Commons you already own.

### 2.3 Defensive Abilities

| Ability | Game(s) | Effect |
|---|---|---|
| HP Boost | Archero | +20% max HP |
| HP Plus | Archero | +small flat HP |
| Strength Blood | Archero 2 | +10% max HP |
| Soul of Strength | Archero 2 | +40% max HP (Legendary) |
| Heal / Restore HP | Archero, Archero 2 | One-time heal of random/% HP |
| Fountain of Life | Archero 2 | +15% max HP and full heal |
| Bloodthirst | Archero | Heal 1.5% current HP per kill |
| Demon Recovery | Archero 2 | Chance to heal 5% max HP on kill |
| Heart of Vitality | Archero 2 | +15% max HP, enhanced heart pickups |
| Lucky Heart | Archero 2 | +3% max HP per heart pickup (cap 30%) |
| Warrior's Heart | Archero 2 | +5% ATK per heart pickup (cap 50%) |
| Extra Life / Revive | Archero, Archero 2 | One-time revive with full HP |
| Angelic Shelter | Archero 2 | +15% max HP, 2s iframes after damage |
| Invincibility Star | Archero | 2s shield every 10s |
| Invincibility Potion | Archero 2 | 2s iframes on pickup |
| Sacred Protection | Archero 2 | Blocks 1 hit per wave (Legendary) |
| Shield Guard | Archero | 2 orbiting shields block projectiles |
| Bouncy Walls (defensive read) | Archero | Bouncing arrows also clear projectiles on collision |
| Dodge Master | Archero | +20% dodge chance |
| Wind Blessing | Archero 2 | +MS, smaller hitbox, dodge chance |
| Lucky Cracker | Archero 2 | +Luck, +Dodge |
| Wingman | Archero | Spirit absorbs enemy projectiles |
| Fairy of the Wind | Archero 2 | +10% AS and MS |
| Stand Strong | Archero 2 | Standing still stacks ATK and AS |
| Perilous Recovery | Archero 2 | Below 30% HP slowly regen to 30% |
| Saving Throw (reference) | DOOM Eternal rune | Fatal hit leaves 1 HP + time slow |

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
| Bomb Sprite | Archero 2 | Companion, 0.4x ATK, 5 hits |
| Flame Sprite | Archero 2 | Companion deals Blaze |
| Lightning Sprite | Archero 2 | Companion deals Bolt |
| Venom Sprite | Archero 2 | Companion deals Venom |
| Ice Spike Sprite | Archero 2 | Companion deals Freeze |
| Laser Sprite | Archero 2 | Companion fires beam (Epic) |
| Sprite King | Archero 2 | Tracking beam companion (Legendary) |
| Sprite Boost | Archero 2 | +40% sprite damage |
| Sprite Frenzy | Archero 2 | +50% sprite damage, +AS |
| Wingman | Archero | Spirit absorbs projectiles + attacks |
| Shadow Clone | Archero | Spawn arrow-firing clone on enemy death |
| Summon One-Eyed Bat | Archero | Additional bat spirit |
| Spirit Multi-Shot | Archero | Sprite copies your Multishot |
| Spirit Front Arrow | Archero | Sprite copies your Front Arrow |
| Spirit Diagonal Arrow | Archero | Sprite copies your Diagonal Arrows |
| Spirit Crit Boost | Archero | +Crit for sprite |
| Spirit Attack Boost | Archero | +ATK for sprite |
| Spirit Attack Speed Boost | Archero | +AS for sprite |
| Pet (Mighty DOOM) | Mighty DOOM | Permanent secondary follower with proc |

Design note: summons in this genre mirror the player's stats, scaled down. Keeps balance one-axis.

### 2.6 Auras & Passives (Player-Centered AoE)

| Ability | Game(s) | Effect |
|---|---|---|
| Attack Boost (Major/Minor) | Archero | +ATK passive |
| Attack Speed Aura | Archero | Pulsing AS bonus |
| Crit Aura | Archero | +crit while in zone |
| HP Gain Aura | Archero | Regen pulse |
| Speed Aura | Archero | +MS aura |
| Slow Field | Archero 2 | Slows nearby enemies & projectiles |
| Corrosive Field | Archero 2 | Vulnerability aura |
| Vampiric Circle | Archero 2 | Orbit orbs heal 2% max HP on hit |
| Garlic (reference) | Vampire Survivors | Damage aura |
| Sandalwood / Holy Water | Vampire Survivors | Ground AoE pools |
| Power Trio | Archero 2 | +15% ATK, +20% AS, +20% HP (Legendary triple-passive) |
| Warrior's Soul | Archero 2 | +30% ATK (Legendary) |
| Warrior's Breath | Archero 2 | +10% ATK (Common) |
| Fairy's Breath | Archero 2 | +10% AS (Common) |
| Giant's Strength | Archero 2 | +20% ATK, +25% HP, –MS |
| ATK Increase | Archero 2 | +25% ATK (Epic) |

### 2.7 Special Weapons / Orbs / Independent Damage

This category fires on its own clock, independent of the player's weapon. Vampire Survivors is the spiritual home; every Archero-like has cribbed from it.

| Ability | Game(s) | Effect |
|---|---|---|
| Fire Circle | Archero, Archero 2 | 2 orbiting fire orbs apply Burn |
| Bolt Circle | Archero, Archero 2 | 2 orbiting lightning orbs |
| Poison Circle | Archero, Archero 2 | 2 orbiting venom orbs |
| Ice Circle | Archero, Archero 2 | 2 orbiting frost orbs |
| Vampiric Circle | Archero 2 | Orbiting healing orbs |
| Obsidian Circle | Archero | Dark damage orbiters |
| Beam Circle | Archero 2 | 2 orbiting laser orbs (Epic) |
| Super Circle | Archero 2 | 4 orbiting non-elemental orbs (Epic) |
| Circle Web / Rotating Web | Archero 2 | Orbs form web; web hits deal damage |
| Circle Boost | Archero 2 | +50% orb damage |
| Energy Ring | Archero 2 | Charged ring up to 11 hits |
| Energy Beam | Archero 2 | Charged beam, 4 hits at 0.7x |
| Fire Sword / Ice Sword / Poison Sword / Bolt Sword | Archero | Orbiting elemental swords (single-element flavor) |
| Frost / Bolt / Toxic / Blazing Star | Archero | Random falling elemental stars |
| Frost / Bolt / Toxic / Blazing Meteor | Archero | Larger random falling meteors |
| Super Meteor | Archero 2 | Meteor every 4s, 1.25x ATK (Legendary) |
| Meteor Pursuit | Archero 2 | Attack-triggered meteor proc |
| Chain Meteors | Archero 2 | Doubles meteor proc rate |
| Demonslayer Meteor | Archero 2 | Meteor on kill |
| Blaze / Bolt / Toxic / Frost Meteor Potion | Archero 2 | One-shot meteor with element |
| Magic Strike / Strike Boost / Twin Strike | Archero 2 | Strikes inherit weapon element, +50% dmg, doubled count |
| Blitz Strike | Archero 2 | 5 strikes per wave |
| Instant Strike | Archero 2 | Strike every 1.5s |
| Assault Strike | Archero 2 | Chance to strike on attack |
| Pursuit Strike | Archero 2 | Strike on kill |
| Riposte Strike | Archero 2 | 5 strikes when damaged |
| Beam Strike | Archero 2 | Beam summons every 2.5s (Legendary, top tier) |
| Whip / King Bible / Magic Wand / Lightning Ring | Vampire Survivors | Independent weapon picks |
| Death Bomb / Death Nova / Chilling Blast | Archero | Enemy explodes on death |

### 2.8 Synergy / Scaling Abilities (Conditional Multipliers)

The category that creates **build identity**. These are the abilities that take a flat stat-stick run and turn it into a strategy.

| Ability | Game(s) | Effect |
|---|---|---|
| Rage | Archero | More damage the lower your HP |
| Perilous Fervor | Archero 2 | Below 50% HP: +30% ATK and AS |
| Wounded Warrior | Archero 2 | After taking damage: +50% ATK for 5s |
| Stand Strong | Archero 2 | Standing still stacks +ATK and +AS |
| Demon Slayer | Archero 2 | +10% ATK per kill, max 50% |
| Warrior's Heart | Archero 2 | +5% ATK per heart pickup, max 50% |
| Lucky Heart | Archero 2 | +3% HP per heart pickup, max 30% |
| Underworld Warrior | Archero 2 | Guarantees Demon offer after boss |
| Boss Slayer | Archero 2 | +25% boss damage, full heal before boss |
| Frenzy Potion | Archero 2 | +50% AS and high crit for 5s on pickup |
| Long-Range Power | Archero 2 | +1–40% damage by projectile travel |
| Grace | Archero | Heal more the lower your HP |
| Flexible | Archero | Dodge more the lower your HP |
| Strong Heart | Archero | Heals restore more |
| Smart | Archero | More coins/XP per kill |
| Fury | Archero | +AS based on missing HP |
| Headshot | Archero | RNG instakill |
| Combo / Streak | Archero 2 (Oracle gear) | Continuous attacks build stacking damage |
| Killstreak rewards | Mighty DOOM | Glory Kill chain refunds ammo / heals |
| Killing Spree | Hades (Hermes) | Speed bonus while streaking |
| Origination / "every Nth shot" | Hades (Daedalus) | Every Nth attack deals bonus / different effect |
| Low HP = damage | (genre) | Cf. Rage, Perilous Fervor |
| Full HP = damage | (Hades Aphrodite ref) | Inverse: rewards untouched runs |
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

Design note: most Archero-likes do NOT include explicit "boss-only" abilities — instead, generic damage picks like Multishot, Energy Beam, and Crit Master happen to also dominate bosses. Including 2–3 explicit boss multipliers (like Boss Slayer) gives players a way to pivot a clear-focused run when they see the boss coming.

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

The Archero-like usually offers **a small number of hero-flavored picks** that only appear if the hero is using that weapon class. Archero 2's recent skills below appear conditionally based on weapon.

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

Lucent take: weapon-conditional picks are great for replayability but **demand careful pool weighting** — if 1/3 of your pool is locked behind hero choice, the random offers feel thin in the first 5 levels. The Archero 2 model (hero-specific *runes* equipped pre-run, hero-agnostic *skills* in-run) cleanly separates the two.

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

Archero's gating model is widely copied:

1. **Levels are the primary gate.** Every level-up offers 3 abilities. Lower levels weight toward Common.
2. **Angels & Devils gate Legendaries.** Archero spawns an Angel every 10 maps. The Angel offers higher-rarity options. The Devil offers Legendary-tier options but costs HP.
3. **Boss completion gates upgrades.** Defeating a boss often offers a guaranteed Epic.
4. **Hero level / chapter level** raises the floor — late-game Common picks become rarer organically because the player has already taken them.

Archero 2 simplifies: at each level-up, the system rolls a rarity *first* (weighted by hero level), then samples 3 abilities of that rarity. This is why a "Legendary level-up" feels like a moment — all 3 options are top-tier.

### 3.3 Pick-3-of-N: How the Random Pool Works

The standard pattern across the genre:

| Element | Common implementation |
|---|---|
| **Pool size offered** | 3 abilities (sometimes 2 with a re-roll button) |
| **Sampling** | Without replacement within the level-up; with replacement across level-ups (you can be offered the same Common twice on different levels) |
| **Stacking rule** | Most picks are stackable up to a cap (Front Arrow can be picked 2–3 times) |
| **Rarity weighting** | Pre-roll the rarity (e.g. 70/20/8/2 for Common/Rare/Epic/Legendary at level 1, sliding to ~30/30/30/10 at level 20), THEN sample within rarity |
| **Re-roll** | Some games (Vampire Survivors, Survivor.io) sell a re-roll currency; Archero 2 grants free re-rolls via runes |
| **Lock / Banish** | Slay the Spire and modern roguelikes let you remove an option from future pools |
| **Smart filters** | Archero 2 won't offer a Common at high hero level if the player has all Commons; it upgrades the offer to Rare |

The "3" matters: 2 feels stingy, 4 paralyses players in a mobile UI. Lucent should ship **3 picks with a paid re-roll**.

---

## 4. Synergy Design — How Build Identity Emerges

The genre's most-cited synergies (all sourced):

| Build | Core Pieces | Reason it works |
|---|---|---|
| **Bullet Hell** | Multishot + Front Arrow +1 + Side Arrows +1 + Diagonal Arrows | All arrow modifiers multiply: a 1-shot becomes 10+ projectiles per click |
| **Ricochet Storm** | Ricochet + Multishot + Blaze + Poisoned Touch | Each bounce reapplies status to a new target — DoTs blanket the room |
| **Bouncing Bullets** | Piercing Shot + Bouncy Walls + Side Arrows + Multishot | Arrows pass through enemies AND bounce off walls = corridor wipe |
| **Combo Crit** | Crit Master + Multishot + Combo gear + Stand Strong | Stacking crit chance + continuous AS multiplier (Archero 2 Combo build) |
| **Orbit Bot** | All 4 Circles + Circle Boost + Vampiric Circle + Beam Circle | Player is a damage aura; just needs to walk |
| **Sprite Army** | All 4 Sprites + Sprite Boost + Sprite Frenzy + Sprite King | Player kites, companions kill |
| **Glass Cannon** | Rage + Perilous Fervor + Swift Arrow + Wounded Warrior | Sit at 30% HP, deal +120% damage |
| **Beam Channel** | Energy Beam + Energy Ring + Charged Arrow + Tracking Eye | Sustained DPS optimized for bosses |
| **Meteor Rain** | Super Meteor + Chain Meteors + Meteor Pursuit + Demonslayer Meteor | Independent damage source, hands-free clearing |
| **Strike Spam** | Blitz Strike + Instant Strike + Twin Strike + Magic Strike | Strikes inherit elements; constant procs |

**Source consensus:** the top-tier "always pick" abilities are Revive, Multishot, Tracking Eye, Soul of Swiftness, Front Arrow, and Power Trio. These are deliberately strong because they enable the largest number of build branches.

---

## 5. Anti-Synergies — When Picks Cancel

| Anti-Synergy | Why it's bad |
|---|---|
| **Piercing + Ricochet** (Archero 1) | Ricochet wins; Piercing wasted |
| **Holy Touch + Piercing / Bouncy Walls** | Holy procs require a "hit-stop" the pierce/bounce skips |
| **Multishot + Front Arrow +1 (Archero 2)** | Each Front Arrow taxes Main weapon damage 15%; stacking taxes Multishot |
| **Tracking Eye + Long-Range Power** | Tracking arrows zig-zag short; never reach max travel for bonus |
| **Bouncy Walls + Smart Targeting** | Smart re-aims toward enemies; bounces miss original wall geometry |
| **Stand Strong + Cloudfooted / Wind Blessing** | Stand-still build conflicts with mobility procs |
| **Soul of Strength + Rage / Perilous Fervor** | More max HP makes low-HP triggers harder to reach |
| **Frenzy Potion + Charged Arrow** | Charged arrow has –AS; frenzy gives +AS that's wasted |
| **Slow Field + Combo gear** | Combo requires constant attacking; slowed enemies means fewer hits per second |
| **Swift Arrow (–20% dmg) + Front Arrow (–15% dmg) + Tracking Eye (–10% dmg)** | Damage taxes stack multiplicatively to ~–40% |
| **Multishot + Rotating Web** | Web procs ignore Multishot proc count; one Web hit per shot |

The genre's deliberate anti-synergies exist so that **the third pick isn't always obvious**. A skilled player should be punished for taking +shots without considering the per-shot taxes.

---

## 6. Cross-Genre Lessons (Hades, Vampire Survivors, Slay the Spire)

- **Hades** rolls "Boon rarity" before showing the offer (same trick Archero 2 uses) and reveals it visually with a glow tier. Steal this UX.
- **Hades' Duo Boons** require having Boons from two specific gods. They are vanishingly rare but become a player's whole identity. Lucent should ship 6–10 of these.
- **Vampire Survivors' evolution** (weapon at L5 + matching passive → evolved weapon) is a great mid-run goal. Survivor.io and Archero 2 (Super-tier elementals) clone the pattern.
- **Slay the Spire** offers 3 cards from a deeply-weighted pool, with a Singing Bowl item that lets you skip for +max HP. Including a "skip = small permanent reward" softens runs where all 3 picks are bad.
- **Mighty DOOM's Slayer-specific perks** show how cosmetic-character identity can be wedded to in-run picks. Lucent should consider hero-conditional Legendary picks.

---

## 7. Recommendation for Lucent

### 7.1 Total Ability Count

Target **75 abilities at launch**, with room to add 5–10 per major update. This matches Archero 2's pool and is enough that no two runs feel identical, but small enough that a player can learn the full pool in ~10 hours.

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

Boss-room Angel and HP-cost Devil are how we deliver Legendaries reliably without level grinding.

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

### 7.5 Six Build Archetypes Lucent Must Support

These are the builds players will recognize from other games and seek out — every one must be reachable from any starting hero with average luck:

1. **Bullet Hell Archer** — Stack projectile-count picks. Identity: every shot is a fan of 10+ arrows.
2. **Ricochet DoT** — Bouncing arrows + Burn/Poison. Identity: full-room damage from a single shot.
3. **Crit Glass Cannon** — Crit Master + Rage + Low-HP procs. Identity: 50% HP is the sweet spot.
4. **Orbit Tank** — All Circles + Vampiric Circle + max-HP picks. Identity: walk through enemies, kill by touch, regen passively.
5. **Sprite Commander** — Build the whole sprite stack + Sprite King. Identity: companions out-DPS the player.
6. **Beam Channel / Boss Killer** — Energy Beam + Tracking Eye + Boss Slayer. Identity: cleanup is slow but bosses melt.
7. **Meteor Rain** — Super Meteor + Chain Meteors + Demonslayer Meteor. Identity: hands-free clearing.
8. **Combo Brawler** — Stand Strong + AS picks + Combo passive. Identity: don't move, attack speed maxes out.

Each archetype's "core 3 abilities" should appear at roughly the right rarity to be reachable by level 10–12 with normal RNG.

### 7.6 Anti-Synergy Discipline

Ship at least these intentional anti-synergies on day one — they make picks feel like decisions, not collectibles:

- Tax every projectile-modifier with a small damage debuff (–10 to –15% per pick) so stacking has cost.
- Make Piercing and Ricochet mutually exclusive (or strongly diminishing). Both feel like the same fantasy.
- Sit any "low HP" synergy in the same pool as +max HP options so the player must commit.
- Lock Combo-gear from Stand Strong (or impose a movement-attack tradeoff).

### 7.7 Pick UX Recommendations

- Show **3 picks** with rarity color glow (white/blue/purple/gold).
- Always allow **1 free re-roll** in the first 3 levels (training), and offer paid re-rolls via a gem currency thereafter.
- Allow **skip → small heal or coin** so the player isn't forced into a bad build.
- After Boss kills, offer a **forced rarity-Epic pick of 3** (Angel-style).
- After taking 0 damage on a boss, offer a **Devil pick** — 3 Legendaries at HP cost. This is the genre's iconic "skill rewards loot" moment.

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
