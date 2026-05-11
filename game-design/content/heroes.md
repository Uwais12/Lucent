# Heroes — Launch Roster

> **Scope:** 8 launch heroes. 6 free-path unlockable, 2 gacha-premium. No cash-only heroes. Each hero embodies exactly one of the 8 archetypes named in `design/03-world-and-theme.md` (Dawnbow, Wardlight, Spinekind, Embercaller, Frostshard, Prismborn, Wraithsworn, Sunkin Heir).
>
> **Design contract:** every hero must lean into 2–3 of the 8 launch build archetypes from `research/games/in-run-abilities.md`. Mastery Path tiers (unlocked at hero levels 20/40/60/80) each push the hero toward a *different* build archetype, so a single character supports multiple playstyles depending on which mastery the player commits to. Stats below are *level-1 baselines*; the balance-curves agent will fit the growth curves.
>
> **One-tap actives only.** Per design pillar 1, every hero has exactly one tap-to-trigger active and the rest of their identity lives in passives and Mastery. Cooldowns are listed in seconds at hero level 1; they shorten with ascension stars and certain gear.

---

## Stat baseline (for orientation)

A "median" launch hero at level 1 sits at: HP 100, ATK 10, ATK Speed 1.0/s, Move Speed 4.0 u/s, Crit Rate 5%, Crit DMG 150%. Heroes below skew off this baseline by ±25% on any axis; that variance is the *only* class differentiator before abilities and Mastery layer in. Numbers are tuned later — read them as silhouettes, not specs.

---

## 1. Kael, the Dawnbow — *"First Light"*

**Codename:** `hero_dawn_kael`
**Archetype:** Dawnbow
**Unlock path:** Free. Auto-granted at end of tutorial (Vale of First Light, room 5). The default avatar for new players.

### Lore tagline
Kael walked out of the burning village with one shard in his palm and the other in his bowstring. He has never put either down — and the Dim has been one footstep behind him every dawn since.

### Bow / weapon flavor
A short composite bow of bleached ashwood, strung with a thread of solidified Lucent. Each draw emits a soft chime; each release sounds like an exhale through cupped hands. Arrows trail thin gold streamers that fade to indigo at the tip. Visual key: warm amber glow, sunrise haze around the player root.

### Base stats (Lv 1)

| Stat | Value | vs. baseline |
|---|---|---|
| HP | 100 | baseline |
| ATK | 10 | baseline |
| ATK Speed | 1.05 /s | +5% |
| Move Speed | 4.0 u/s | baseline |
| Crit Rate | 7% | +2 pts |
| Crit DMG | 150% | baseline |

### Active — **Sunbreak Volley** (CD 14s)
Kael nocks and looses a fanned salvo of seven arrows in a 120° forward arc. Each arrow deals 1.0× ATK and applies a 2s **Sunmark** debuff (+15% damage taken). The arrows pierce one enemy. If Sunbreak Volley kills an enemy, the cooldown refunds 2s.

### Passive — **Steady Draw**
While stationary for ≥1.0s, Kael's next 3 shots are guaranteed crits. The timer resets when he moves. (This is the stop-to-shoot tax made into a reward — Kael's identity in one line.)

### Hero Mastery Path

| Tier | Hero Lv | Bonus | Pushes toward |
|---|---|---|---|
| I — Twin Arrow | 20 | Gain a permanent Front Arrow +1; this stacks with in-run picks. | **Bullet Hell** |
| II — Sunmark Spread | 40 | Sunmark spreads to enemies within 2m on application. Splash damage from Sunmarked targets is doubled. | **Ricochet DoT** |
| III — First-Shot Heart | 60 | The first shot fired after rooting deals +120% damage and is a guaranteed crit. | **Crit Glass Cannon** |
| IV — Solar Choir | 80 | Sunbreak Volley fires twice in succession; the second volley is automatically aimed at the lowest-HP enemy on screen. | **Bullet Hell** (capstone) |

### Ascension stars

| Star | Unlock |
|---|---|
| 1★ (base) | Hero unlocked. |
| 2★ | +6% ATK, +5% HP. |
| 3★ | +10% ATK, +8% HP. **Proc:** Sunmark crits leave a 1s gold pool (0.3× ATK/tick). |
| 4★ | +15% ATK, +12% HP, +5% AS. |
| 5★ | +20% ATK, +18% HP, –1s on active CD. |
| 6★ | +25% ATK, +25% HP, +10% AS. **Proc:** Steady Draw extends to 5 guaranteed crit shots and the third shot fires a free Sunbreak Volley arrow. |

### Build affinity
**Bullet Hell**, **Crit Glass Cannon**, secondary **Ricochet DoT**.

### Why he's different
Kael is the "stand and deliver" hero. His Steady Draw passive *rewards the very mechanic the genre is built on* — rooting — which makes him the cleanest teaching tool for new players while also creating a unique skill ceiling: experienced Kael players micro-root for 1.0s windows mid-dodge to chain crit volleys. Everyone else can root and shoot; only Kael gets paid for it. He's the comfort food of the roster and the genre-correct face of "Lucent" on the App Store screenshot.

---

## 2. Vespera, the Wardlight — *"The Standing Vow"*

**Codename:** `hero_ward_vespera`
**Archetype:** Wardlight
**Unlock path:** Free. Beat Chapter 2 (Sunken Cathedral) boss — first kill grants 50 hero shards (unlock threshold); additional clears farm to ascend.

### Lore tagline
Vespera knelt before the altar of the Sunken Cathedral while the water rose, and made an oath the water could not drown. She rose dripping with shard-light and the chains she now wears as armor still hum a hymn no one else remembers.

### Bow / weapon flavor
A heavy oathbow strung with consecrated chain — each shot rings like a small bell struck once. Arrows are shaped like keys. Visual key: cyan-white aurora, brass trim, drifting water motes circle her boots.

### Base stats (Lv 1)

| Stat | Value | vs. baseline |
|---|---|---|
| HP | 135 | +35% |
| ATK | 8 | –20% |
| ATK Speed | 0.85 /s | –15% |
| Move Speed | 3.6 u/s | –10% |
| Crit Rate | 4% | –1 pt |
| Crit DMG | 150% | baseline |

### Active — **Tidebreak Ward** (CD 18s)
Vespera plants her bow as a banner. For 4s, all enemy projectiles within 5m are deleted, and Vespera and any allied summons in the ring gain 30% damage reduction. Enemies that walk into the ring take 0.4× ATK/tick. She can move freely; the ring stays where it was planted.

### Passive — **Oathward**
Vespera blocks one projectile every 4s automatically (small shield shimmer telegraphs the block). When she blocks, she deals +20% damage for 3s.

### Hero Mastery Path

| Tier | Hero Lv | Bonus | Pushes toward |
|---|---|---|---|
| I — Anchor's Pull | 20 | Auto-fired arrows have +50% knockback. Knocked enemies that hit walls take 0.5× ATK. | **Combo Brawler** (positional) |
| II — Tide Orbiters | 40 | Two slow orbiting "Key" projectiles circle Vespera permanently (0.3× ATK on contact, applies Drench: –20% enemy move speed). | **Orbit Tank** |
| III — Sanctum Echo | 60 | Tidebreak Ward also summons two **Choir Sprites** for its duration; each fires a homing hymn-arrow every 0.8s (0.6× ATK). | **Sprite Commander** |
| IV — Hymn Eternal | 80 | While at or above 75% HP, Vespera radiates a 4m aura granting allies (summons, sprites) +30% damage. | **Orbit Tank** (capstone) |

### Ascension stars

| Star | Unlock |
|---|---|
| 1★ | Hero unlocked. |
| 2★ | +5% ATK, +10% HP. |
| 3★ | +8% ATK, +15% HP, +5% dmg reduction. **Proc:** When Oathward blocks, restore 2% max HP. |
| 4★ | +12% ATK, +20% HP. |
| 5★ | +18% ATK, +25% HP, +10% block frequency. |
| 6★ | +25% ATK, +35% HP. **Proc:** Tidebreak Ward at 6★ pulses a **second** ring 2s after deployment that re-applies its effect — effective uptime doubles when stacked with cooldown reduction. |

### Build affinity
**Orbit Tank**, **Sprite Commander**, secondary **Combo Brawler**.

### Why she's different
Vespera is the only hero who lets you misplay positioning and live. Her active is the genre's first "stand here and the bullets disappear" button, which makes her the cleanest counter to projectile-heavy bosses and the only viable Tower-mode anchor under 30 hero-shards. Her low base ATK means she needs orbiters and sprites to fill in DPS — Mastery II and III give her exactly those — and so the **build-discovery moment** for Vespera is realizing she's not a damage dealer, she's a fortress that grows tendrils. She is the only hero who can clear a room without firing the bow once.

---

## 3. Rhune, the Spinekind — *"The Wild Strand"*

**Codename:** `hero_spine_rhune`
**Archetype:** Spinekind
**Unlock path:** Free. Chapter 3 (Frostspire) story quest "The Cousin in the Storm" — clear the side dungeon 5 times for 50 shards.

### Lore tagline
The Spinekind are what's left of the lightning-veined — children born with shard-thread sewn through their nerves. Rhune walked out of Frostspire on bare feet that left scorch marks. She does not speak. She does not need to.

### Bow / weapon flavor
A recurve made from a single forked branch of conductor-wood; the bowstring is a length of stilled lightning that flickers between draws. Each shot cracks like a wet stone splitting. Arrows are pure arcs of plasma that leave a wet ozone smell and a violet afterimage. Visual key: hot magenta-into-white core, sharp blue rim-light, hair lifting in the static.

### Base stats (Lv 1)

| Stat | Value | vs. baseline |
|---|---|---|
| HP | 80 | –20% |
| ATK | 13 | +30% |
| ATK Speed | 1.15 /s | +15% |
| Move Speed | 4.3 u/s | +7% |
| Crit Rate | 8% | +3 pts |
| Crit DMG | 160% | +10 pts |

### Active — **Forked Strand** (CD 10s)
Rhune releases a single arrow that chains lightning to up to **6** nearby enemies, dealing 1.2× ATK per chain. Each chain has a 25% chance to stun for 0.5s. If the arrow lands on a critical hit, the chain count doubles to 12.

### Passive — **Static Bleed**
Every 4th shot is a "Crackle" shot: deals 1.5× ATK, applies a 3s lightning DoT (0.2× ATK/tick) and counts as 3 hits for combo-scaling purposes.

### Hero Mastery Path

| Tier | Hero Lv | Bonus | Pushes toward |
|---|---|---|---|
| I — Storm Tax | 20 | All lightning-type damage (status, in-run picks, Static Bleed) deals +35%. | **Ricochet DoT** (lightning variant) |
| II — Glassbone Crit | 40 | Crit DMG +30%. Crits chain lightning to 1 nearby enemy at 0.4× ATK. | **Crit Glass Cannon** |
| III — Conductor's Pulse | 60 | Every 5s, Rhune emits a silent shock pulse (3m radius, 0.8× ATK, applies Crackle DoT). Pulse triggers on Forked Strand cast as well. | **Combo Brawler** |
| IV — Eye of the Storm | 80 | When at or below 50% HP, AS +40% and lightning damage +50%. | **Crit Glass Cannon** (capstone) |

### Ascension stars

| Star | Unlock |
|---|---|
| 1★ | Hero unlocked. |
| 2★ | +6% ATK, +5% AS. |
| 3★ | +10% ATK, +8% Crit Rate. **Proc:** Crackle shots fire a free Forked Strand chain (3 jumps, no stun). |
| 4★ | +15% ATK, +10% Crit DMG. |
| 5★ | +20% ATK, –1.5s on active CD. |
| 6★ | +25% ATK, +15% AS. **Proc:** Killing an enemy with a lightning hit instantly resets Forked Strand if it was on CD (max once per 4s). |

### Build affinity
**Crit Glass Cannon**, **Ricochet DoT**, secondary **Combo Brawler**.

### Why she's different
Rhune is the high-skill, high-payoff option — fragile, fast, and reads enemy positioning rather than projectile arcs. Her active is the only "shape the battlefield" tool in the launch roster because chain lightning lets her hit enemies *she can't even see* — through walls of bodies, behind props. Her Mastery IV (Eye of the Storm) is genuinely scary: at half HP she's the highest-DPS hero in the game by a wide margin, which means good Rhune play looks like a tightrope walk where every dodge is also an HP optimization. The TikTok-screenshot hero.

---

## 4. Pyran, the Embercaller — *"The Forge That Forgot"*

**Codename:** `hero_ember_pyran`
**Archetype:** Embercaller
**Unlock path:** Free. Chapter 4 (Emberforge) campaign milestone — first clear awards 30 shards; the Emberforge weekly mission farms the remaining 20.

### Lore tagline
The lightbringers' forges in Emberforge never cooled — but they were never hot. They burned without heat for a thousand years, waiting for a hand. Pyran was the smith who walked in last, and the hammer rang again the moment he touched the anvil.

### Bow / weapon flavor
A forge-built shortbow with a barrel-like cast iron grip and glowing rivet-seams. Strung with a thin chain of orange-hot links. Each shot has a forge-bellows *whoosh* layered under a low *thunk*. Arrows are nails of slag that bury and burst. Visual key: orange-gold against soot-black, heat shimmer over the player root, sparks on every shot.

### Base stats (Lv 1)

| Stat | Value | vs. baseline |
|---|---|---|
| HP | 115 | +15% |
| ATK | 11 | +10% |
| ATK Speed | 0.90 /s | –10% |
| Move Speed | 3.8 u/s | –5% |
| Crit Rate | 5% | baseline |
| Crit DMG | 150% | baseline |

### Active — **Forge Drop** (CD 12s)
Pyran calls down a 3m circle of molten anvil at the cursor's auto-aim target. Impact deals 2.5× ATK; the burning crater remains for 5s, dealing 0.4× ATK/tick and applying **Slag** (+25% fire damage taken). Up to 2 craters can exist simultaneously.

### Passive — **Heat Soak**
Every arrow Pyran fires applies a stacking 0.15× ATK burn DoT (max 5 stacks). At max stacks the enemy *ignites* — explodes for 1.5× ATK, spreading 3 stacks to nearby enemies.

### Hero Mastery Path

| Tier | Hero Lv | Bonus | Pushes toward |
|---|---|---|---|
| I — Slagfield | 20 | Slag enemies that die leave a 1m fire pool (0.3× ATK/tick, 3s). Pools merge into Forge Drop craters. | **Meteor Rain** (ground variant) |
| II — Hammer Toss | 40 | Every 6s, Pyran auto-throws a hammer at the nearest elite/boss (3.0× ATK, applies Slag). | **Beam/Boss Killer** |
| III — Anvil Chorus | 60 | Forge Drop now spawns **3** craters in a triangle; total damage is unchanged per crater, total area is tripled. | **Meteor Rain** (capstone) |
| IV — Smith's Bargain | 80 | When at full HP, fire damage is doubled. Taking damage drops the buff for 4s. | **Beam/Boss Killer** (capstone) |

### Ascension stars

| Star | Unlock |
|---|---|
| 1★ | Hero unlocked. |
| 2★ | +5% ATK, +8% HP. |
| 3★ | +10% ATK, +15% HP. **Proc:** Heat Soak ignitions chain to one additional enemy. |
| 4★ | +15% ATK, +20% HP, +10% fire dmg. |
| 5★ | +20% ATK, +25% HP, –2s on active CD. |
| 6★ | +30% ATK, +30% HP. **Proc:** While a Forge Drop crater is active, Pyran's AS +25% and his arrows pierce one extra enemy. |

### Build affinity
**Meteor Rain**, **Beam/Boss Killer**, secondary **Ricochet DoT** (fire branch).

### Why he's different
Pyran is the only hero who *changes the floor* — his Forge Drop craters are persistent terrain that you must read alongside enemy telegraphs. Skilled Pyran play looks like a chess problem: kite the room into your crater pattern, then auto-fire becomes irrelevant because the room is already cooking. He's also the cleanest "AFK-style" hero for endless modes (Tower / Survival) because Hammer Toss and Anvil Chorus mean you can clear waves while running. The fantasy: *the forge fights for you, you just point.*

---

## 5. Nim, the Frostshard — *"Mountain Patience"*

**Codename:** `hero_frost_nim`
**Archetype:** Frostshard
**Unlock path:** Free. Soft-launch hero (included in the 4-hero soft-launch roster). At global launch, awarded via Day 5 login calendar reward (40 shards) + Frostspire boss clears (10 shards/clear).

### Lore tagline
Nim climbed Frostspire to call the suns back. The suns did not answer, but the mountain did — and the mountain, it turns out, was a long quiet creature who had been waiting to be asked.

### Bow / weapon flavor
A longbow carved from a single shard of fossilized ice; the bowstring is a strand of breath caught in winter air. Each shot makes a soft glass-on-glass *click*. Arrows are diamond-cut and leave a 1m vapor trail that lingers as a slowing field. Visual key: pale cyan and silver, lavender mist, frost crystals forming and shattering at her footfalls.

### Base stats (Lv 1)

| Stat | Value | vs. baseline |
|---|---|---|
| HP | 105 | +5% |
| ATK | 9 | –10% |
| ATK Speed | 0.95 /s | –5% |
| Move Speed | 3.9 u/s | –2% |
| Crit Rate | 6% | +1 pt |
| Crit DMG | 165% | +15 pts |

### Active — **Glacial Pin** (CD 11s)
Nim looses a heavy ice-spear at her auto-aim target. The spear deals 2.0× ATK, freezes the primary target for 2.5s, and erupts into a 2m **Frostfield** on impact (0.3× ATK/tick, slows enemies by 40%). If the primary target is a boss, freeze duration becomes 1.0s.

### Passive — **Slow Read**
All Nim's shots apply a 1s **Chill** (–25% enemy AS and MS). Chilled enemies take +20% damage from her crits.

### Hero Mastery Path

| Tier | Hero Lv | Bonus | Pushes toward |
|---|---|---|---|
| I — Shatter | 20 | Killing a frozen enemy spawns 3 ice shards (0.8× ATK each) toward random enemies. | **Bullet Hell** (procced) |
| II — Frostfield Web | 40 | Glacial Pin's Frostfield lasts 8s (was 4s) and slows projectiles inside it by 50%. | **Orbit Tank** |
| III — Cold Crit | 60 | Crits against chilled enemies deal +60% damage and apply a fresh 1.5s Chill. | **Crit Glass Cannon** |
| IV — Avalanche | 80 | Every 12s, a free Glacial Pin auto-fires at the densest enemy cluster on screen. | **Meteor Rain** (cold variant) |

### Ascension stars

| Star | Unlock |
|---|---|
| 1★ | Hero unlocked. |
| 2★ | +5% ATK, +5% Crit DMG. |
| 3★ | +8% ATK, +10% Crit DMG. **Proc:** Chilled enemies that die release a 1.5m frost burst (0.6× ATK, 0.5s freeze). |
| 4★ | +12% ATK, +15% Crit DMG. |
| 5★ | +18% ATK, –1s on active CD. |
| 6★ | +25% ATK, +25% Crit DMG. **Proc:** Glacial Pin pierces up to 3 enemies, freezing each. Bosses take 4.0× ATK from a piercing Glacial Pin (vs 2.0× normal). |

### Build affinity
**Crit Glass Cannon**, **Orbit Tank** (via Frostfield control), secondary **Meteor Rain**.

### Why she's different
Nim is the **time-buyer** of the roster. Every other hero fights the room in real time; Nim slows the room until it moves at her pace. Her Mastery II Frostfield Web is the only mechanic in the launch roster that interacts with enemy projectile speed — which makes her the single best counter to Hollow Sky and Long Dusk's projectile-soaked bosses. She rewards patient, defensive play and her ascension proc at 6★ turns her active into a credible boss-shredder, which means she scales gracefully from the soft-launch starter slot into endgame Tower runs.

---

## 6. Iris, the Prismborn — *"The Youngest"*

**Codename:** `hero_prism_iris`
**Archetype:** Prismborn
**Unlock path:** Free. Chapter 5 (Glassroot Forest) story quest + 60 shards via the Glassroot weekly mission. Designed to be the player's *third or fourth* hero unlocked at a normal cadence.

### Lore tagline
Iris was born after the Dimming, in a glasswright's hut deep in the Glassroot Forest. She is the youngest Lucent-bearer alive. Her shard did not bond to her hand; it bonded to her heart, and her heart refracts.

### Bow / weapon flavor
A delicate three-limbed bow shaped like a tuning fork made of stained glass; the bowstring is a beam of light. Each shot makes a high crystal *ping* and splits into rainbow streaks. Arrows are tiny prisms. Visual key: full rainbow gradient on her glow, white-violet core, walking leaves shimmer-trails behind her like a slow comet.

### Base stats (Lv 1)

| Stat | Value | vs. baseline |
|---|---|---|
| HP | 90 | –10% |
| ATK | 10 | baseline |
| ATK Speed | 1.0 /s | baseline |
| Move Speed | 4.1 u/s | +2% |
| Crit Rate | 5% | baseline |
| Crit DMG | 150% | baseline |

### Active — **Refraction** (CD 13s)
For 5s, every arrow Iris fires splits into **3** at the midpoint of its flight (each split deals 0.5× ATK; the split angle is 15°). Stacks multiplicatively with in-run Front Arrow / Side Arrow modifiers.

### Passive — **Bent Light**
Iris's arrows have a 25% chance to ricochet once off the nearest non-target enemy after impact (0.7× ATK on the ricochet). This passive does not consume any in-run Ricochet pickup — they stack.

### Hero Mastery Path

| Tier | Hero Lv | Bonus | Pushes toward |
|---|---|---|---|
| I — Arc of the Spectrum | 20 | Permanent +2 Side Arrows (one each side, 0.6× ATK). | **Bullet Hell** |
| II — Refract-on-Hit | 40 | Bent Light triggers on 50% of hits (up from 25%); ricochets can re-trigger Bent Light at 25% (one chain max). | **Ricochet DoT** |
| III — Prism Sprites | 60 | Two **Refraction Sprites** orbit Iris; each fires a copy of her arrow every 1.2s at 0.4× ATK and inherits her ricochet/split. | **Sprite Commander** |
| IV — Pure Light | 80 | All Iris's projectile damage gains a permanent +25% bonus that *cannot* be modified by other multipliers (additive floor). | **Bullet Hell** (capstone) |

### Ascension stars

| Star | Unlock |
|---|---|
| 1★ | Hero unlocked. |
| 2★ | +5% ATK, +5% AS. |
| 3★ | +8% ATK, +8% AS. **Proc:** Bent Light ricochets apply a 1s **Refract Mark** — marked enemies take +15% from all Iris's projectiles. |
| 4★ | +12% ATK, +10% AS. |
| 5★ | +18% ATK, +15% AS, –2s on active CD. |
| 6★ | +25% ATK, +20% AS. **Proc:** Refraction's split count becomes **5** (was 3) and the duration extends to 7s. |

### Build affinity
**Bullet Hell**, **Sprite Commander**, secondary **Ricochet DoT**.

### Why she's different
Iris is the **projectile multiplier** hero — every other hero in the roster *uses* in-run projectile picks, but Iris *manufactures* them from baseline. She's the only hero whose level-1 kit fires more than one bullet per shot without spending an ability pick. This makes her the highest-ceiling Bullet Hell selection and the cleanest expression of design pillar 2 ("damage multiplies, never adds"). On a hot Refraction proc with stacked in-run Multishot + Front Arrow + Side Arrow, she puts 40+ projectiles per shot on screen — the genre's defining screenshot moment, by design. The cost: her base ATK is plain and she dies fast if the bullet wall doesn't outpace incoming.

---

## 7. Mern, the Wraithsworn — *"Half-Dim"* — **GACHA PREMIUM**

**Codename:** `hero_wraith_mern`
**Archetype:** Wraithsworn
**Unlock path:** **Wish banner** (gacha). Mythic-tier rate-up on the launch banner; 50-pull hard pity guarantees a Mythic with 50% chance to be Mern. **Free alternative:** 600 generic Lucent Shards in the shop converts to one Mern unlock — slow but possible. (Designed to be obtainable in ~4 months F2P.)

### Lore tagline
Mern walked into the Dim. The Dim did not eat her. It cracked itself around her like a shell and now sits in the hollow of her chest, useful, hungry, hers. The other Lucent-bearers will not look her in the eye.

### Bow / weapon flavor
A bow of bone-black wood wrapped in a strip of pale violet shroud that drifts as if underwater. The bowstring is a strand of someone else's hair. Each shot is silent — a held breath, not a release. Arrows leave a smoke trail that curls *backward* into Mern as it dissipates. Visual key: violet-black against a thin halo of indigo Dim, eyes glow milk-white when she fires.

### Base stats (Lv 1)

| Stat | Value | vs. baseline |
|---|---|---|
| HP | 95 | –5% |
| ATK | 12 | +20% |
| ATK Speed | 1.0 /s | baseline |
| Move Speed | 4.0 u/s | baseline |
| Crit Rate | 5% | baseline |
| Crit DMG | 150% | baseline |

### Active — **Hollow Draw** (CD 15s)
Mern channels for 0.8s, then fires a single concentrated arrow that deals **5.0× ATK** and applies **Hollowing** (3s, takes 25% more damage from all sources). If the arrow kills its target, Mern heals 15% of her max HP and Hollow Draw's cooldown is reduced by 6s. If the target survives, Mern loses 5% max HP.

### Passive — **Tithe**
On each kill, Mern heals 2% of her max HP and gains a **Tithe Stack** (max 10). Each stack: +3% damage, –1% damage taken. Stacks expire if she goes 8s without a kill.

### Hero Mastery Path

| Tier | Hero Lv | Bonus | Pushes toward |
|---|---|---|---|
| I — Drained Mark | 20 | Hollowing now also reduces enemy AS by 30%. Hollowed enemies that die release a 1.5m draining pulse (heals 3% max HP). | **Combo Brawler** |
| II — Specter Bow | 40 | A shadow-double of Mern fires her arrows at 0.5× ATK, slightly delayed. Acts as a permanent sprite. | **Sprite Commander** |
| III — Glutton's Patience | 60 | Tithe Stack cap raised to 20; each stack also adds +1% lifesteal. | **Combo Brawler** (capstone) |
| IV — The Dim Recoils | 80 | Hollow Draw's damage scales with current Tithe Stacks (+15% per stack). At 20 stacks, that's 5.0× × 4.0 = enough to one-shot most non-elites. | **Beam/Boss Killer** |

### Ascension stars

| Star | Unlock |
|---|---|
| 1★ | Hero unlocked. |
| 2★ | +6% ATK, +8% HP. |
| 3★ | +10% ATK, +12% HP. **Proc:** Tithe stacks no longer decay below 5 (floor of 5 stacks while in combat). |
| 4★ | +15% ATK, +15% HP. |
| 5★ | +20% ATK, +20% HP, +5% lifesteal floor. |
| 6★ | +30% ATK, +25% HP. **Proc:** Killing a Hollowed enemy instantly resets Hollow Draw and adds 2 Tithe stacks. |

### Build affinity
**Combo Brawler**, **Beam/Boss Killer**, secondary **Sprite Commander**.

### Why she's different
Mern is the **on-kill snowball** — she starts a room weak and ends it overwhelming, but only if you kill fast. She's the only hero with both lifesteal and a true single-target nuke, which makes her the cleanest answer to the "I keep dying mid-floor" wall of soft-launch hour 3. She is also the only hero whose mechanical fantasy *can't be re-skinned* into a free hero without losing the Wraithsworn lore beat: she's a defector. Putting her behind the wish banner is a narrative cost (premium players get to *be the one who walked into the Dim*) and a design protection (her Tithe lifesteal mechanic is genuinely better than other heroes' sustain — concentrating it behind gacha means F2P balance isn't undercut, while the shard-shop alternative ensures no cash-only wall).

---

## 8. Solas, the Sunkin Heir — *"The Drowned Crown"* — **GACHA PREMIUM**

**Codename:** `hero_sunkin_solas`
**Archetype:** Sunkin Heir
**Unlock path:** **Wish banner.** Rotated rate-up after Mern (banner #2, launch +21 days). **Free alternative:** Battle Pass season 1 free track milestone — completing the BP free track twice over consecutive 45-day seasons grants the unlock. (≈90 days F2P.)

### Lore tagline
Before the Sunken Cathedral drowned, it had a crown prince. He should be three hundred years dead. He is not. The water keeps him — the prayers keep him — and now he carries the cathedral on his back, in a circle of lanterns that will not go out.

### Bow / weapon flavor
A tall ceremonial longbow of waterlogged gold, dripping constantly. Bowstring is a thread of unbroken liturgical chant — you can faintly hear it. Each shot rings like a struck cathedral bell. Arrows are tipped with tiny brass lanterns that float for a half-second after impact before bursting. Visual key: cyan-gold, water cascading down his armor, six lanterns orbiting him in a slow ring.

### Base stats (Lv 1)

| Stat | Value | vs. baseline |
|---|---|---|
| HP | 125 | +25% |
| ATK | 9 | –10% |
| ATK Speed | 0.85 /s | –15% |
| Move Speed | 3.7 u/s | –7% |
| Crit Rate | 5% | baseline |
| Crit DMG | 150% | baseline |

### Active — **The Crown's Procession** (CD 20s)
Solas releases his orbiting lanterns. **Six Lantern Sprites** float outward and seek nearby enemies; each sprite deals 0.8× ATK per hit, persists for 12s or 5 hits, and applies **Consecrated** (1s, +20% holy damage taken). When all six sprites expire, the next 3 of Solas's arrows ring with their stored damage (+50% per arrow).

### Passive — **Lantern Halo**
Solas always has **2** Lantern Sprites passively orbiting him; they fire automatically at the nearest enemy every 1.5s for 0.4× ATK. They cannot be lost. They are the floor of his kit.

### Hero Mastery Path

| Tier | Hero Lv | Bonus | Pushes toward |
|---|---|---|---|
| I — More Lanterns | 20 | Passive Lantern count is **4** (up from 2). | **Sprite Commander** |
| II — Cathedral Stand | 40 | While Solas is stationary for ≥1.5s, his lanterns deal +60% damage and gain piercing. | **Combo Brawler** (rooted variant) |
| III — Holy Tide | 60 | Killing Consecrated enemies leaves a 1m holy pool (1× ATK/tick for 2s). Pools combine with Crown's Procession sprites — sprites that pass over pools heal Solas for 1% max HP/tick. | **Orbit Tank** |
| IV — The Crown Remembers | 80 | Lantern Sprites' damage scales with Solas's max HP (1% of max HP added to each sprite hit). | **Sprite Commander** (capstone) |

### Ascension stars

| Star | Unlock |
|---|---|
| 1★ | Hero unlocked. |
| 2★ | +5% ATK, +10% HP. |
| 3★ | +8% ATK, +15% HP. **Proc:** Crown's Procession sprite count becomes **8** (was 6). |
| 4★ | +12% ATK, +20% HP. |
| 5★ | +18% ATK, +25% HP, –3s on active CD. |
| 6★ | +25% ATK, +30% HP. **Proc:** Passive Lantern count becomes **6** at all times, and Consecrated debuff stacks up to 3 times (each +20% holy damage taken). |

### Build affinity
**Sprite Commander**, **Orbit Tank**, secondary **Combo Brawler**.

### Why he's different
Solas is the genre's purest summoner — *zero* heroes in the launch roster ship with permanent passive sprites at level 1 except him. He turns the in-run Sprite ability family from "pick when offered" into "amplify my baseline," which makes him the only hero whose **starting state already represents a build**. His DPS at zero in-run picks is the highest of any hero, but his per-pick growth is the *flattest* of any hero — meaning Solas plays differently from every other character: most heroes ask "what do I draft?", Solas asks "how do I protect what I have?" His gacha placement reflects this: he's mechanically distinct enough to feel like a system unto himself, but his shard-floor unlock path via the free BP track ensures patient F2P players reach him.

---

## Balance Check — Hero × Build Archetype Matrix

A hero is marked **Strong (S)** in a build if their kit (base + Mastery + ascension procs) accelerates that build's core fantasy past what other heroes achieve. **Weak (W)** if the kit fights the build (anti-synergy in passives, wrong stat profile, or Mastery taxing away from it). **Neutral (—)** if the hero plays the build but doesn't lean into or against it.

| Hero | Bullet Hell | Ricochet DoT | Crit Glass Cannon | Orbit Tank | Sprite Commander | Beam/Boss Killer | Meteor Rain | Combo Brawler |
|---|---|---|---|---|---|---|---|---|
| **Kael, the Dawnbow** | S | S | S | W | — | — | — | — |
| **Vespera, the Wardlight** | W | — | W | S | S | — | — | S |
| **Rhune, the Spinekind** | — | S | S | W | — | — | — | S |
| **Pyran, the Embercaller** | — | S | — | — | — | S | S | — |
| **Nim, the Frostshard** | — | — | S | S | — | — | S | — |
| **Iris, the Prismborn** | S | S | — | — | S | W | — | — |
| **Mern, the Wraithsworn** | — | — | — | — | S | S | — | S |
| **Solas, the Sunkin Heir** | W | — | W | S | S | — | — | S |
| **Archetype S-count** | **2** | **3** | **3** | **3** | **3** | **2** | **2** | **3** |

### Validation pass

**Every archetype is supported by ≥2 heroes (S-marked):**
- Bullet Hell — Kael, Iris ✓
- Ricochet DoT — Kael, Rhune, Pyran, Iris ✓
- Crit Glass Cannon — Kael, Rhune, Nim ✓
- Orbit Tank — Vespera, Nim, Solas ✓
- Sprite Commander — Vespera, Iris, Mern, Solas ✓
- Beam/Boss Killer — Pyran, Mern ✓
- Meteor Rain — Pyran, Nim ✓
- Combo Brawler — Vespera, Rhune, Mern, Solas ✓

**No hero is a strict upgrade of another.** Pairwise check of the closest "fantasy neighbors":

- *Kael vs. Iris* (both Bullet Hell): Kael has higher per-shot crit ceiling via Steady Draw and stacks into Crit builds; Iris has higher baseline projectile count and stacks into Sprite/Ricochet builds. Different stat lines, different Mastery branches, neither is the other's strict upgrade.
- *Vespera vs. Solas* (both Orbit Tank + Sprite Commander): Vespera's identity is the Tidebreak Ward (projectile-deletion zone, defensive anchor); Solas's identity is the always-on Lantern Halo (offensive summon baseline). Vespera is the better PvP / boss-projectile counter; Solas is the better wave-clear / Tower endgame hero. Different mode strengths.
- *Pyran vs. Nim* (both have Meteor Rain affinity): Pyran's ground-AoE is *thermal* and combos with burn DoTs and crit-on-static-target play; Nim's is *cold* and combos with freeze-and-shatter chains plus Orbit Tank defensive bias. Pyran is the boss-killer-from-range; Nim is the kite-and-control specialist.
- *Rhune vs. Mern* (both fragile snowballers): Rhune's snowball is *crit at low HP* (mechanical skill expression — you choose the danger); Mern's snowball is *kill-streak Tithe* (positional / room-pace expression — you can't stop). They reward opposite playstyles.

**Stat-spread sanity:** HP range 80 (Rhune) to 135 (Vespera). ATK range 8 (Vespera) to 13 (Rhune). AS range 0.85 (Vespera/Pyran/Solas) to 1.15 (Rhune). No stat outlier collapses the roster — the spread is real but bounded.

**Build coverage by hero count:**
- Most-supported builds (4 strong heroes): **Sprite Commander**, **Combo Brawler**, **Ricochet DoT**. These are the genre's combo-friendly families and earn the breadth.
- Least-supported builds (2 strong heroes): **Bullet Hell**, **Beam/Boss Killer**, **Meteor Rain**. Each is a *focused* fantasy where two specialists is correct — adding a third would dilute identity. Both have free-path representation (Kael and Iris for Bullet Hell; Pyran for Boss Killer and Meteor; Nim for Meteor).
- **No build is locked behind gacha.** Every of the 8 archetypes has ≥1 free-path "Strong" hero. Mern and Solas (gacha) lean into Combo Brawler, Sprite Commander, Beam/Boss Killer, and Orbit Tank — all of which are already covered by Vespera, Kael, Rhune, Pyran, or Nim on the free track. Gacha pulls accelerate; they never gate.

### Roster balance summary

The 8-hero launch lineup distributes one hero per world-and-theme archetype, with 4 heroes anchored to defensive / sustain identities (Vespera, Pyran, Nim, Solas) and 4 anchored to aggressive / glass identities (Kael, Rhune, Iris, Mern). Every in-run build archetype is reachable from at least 2 heroes; every hero is the *best* expression of at least one build archetype (capstone Mastery IV picks ensure this). No two heroes share a primary build affinity at their capstone tier, so the "which hero do I take" choice is real, even after the player has unlocked the full roster.
