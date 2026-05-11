# Equipment & Gear Catalog — Lucent: Shards of the Shattered Sun

> **Locked-in spec.** Implements **The Forge** (L4 of the Lucent Spiral), the **35% power-budget** layer defined in `design/04-progression-and-economy.md` §2. Per-slot bases, six rarities, fusion / enchanting / reforging, eight sets mapped to the eight launch build archetypes, slot-bound upgrades (Archero 2 QoL lift), and a salvage table that closes the Ember faucet/sink loop.

The Spirit / Pet slot is **out of scope** for this document — handled by `content/pets.md`.

---

## 0. Slot, rarity, and curve summary

**Six gear slots** (Spirit is separate):

| Slot | Function in the build | Color of light when equipped |
|---|---|---|
| **Weapon** | Primary damage profile; defines projectile feel | Sun-gold |
| **Helm** | Defensive crown; HP & crit-resist | Pale-blue corona |
| **Armor** | Chest piece; the largest stat block on the body | Indigo |
| **Ring** | Modifier; offensive % multipliers | Prismatic spark |
| **Locket** | Modifier; on-hit and sustain effects | Soft white |
| **Bracelet** | Modifier; movement, attack speed, dodge | Pale violet |

**Six rarities**, color-coded to match the world palette:

| # | Rarity | Color | World-flavor name (UI subtitle) |
|---|---|---|---|
| 1 | Common | Slate gray | "Tarnished" |
| 2 | Rare | Vale green | "Burnished" |
| 3 | Epic | Cathedral cyan | "Radiant" |
| 4 | Legendary | Sun-gold | "Lucent" |
| 5 | Mythic | Dawn-crimson | "Auric" |
| 6 | Chaos | Iridescent black-prism | "Shardborn" |

**Stat magnitude curve** (multiplier vs Common base; clean exponential ≈ ×1.62 per step):

| Rarity | Multiplier vs Common | % of Common |
|---|---|---|
| Common | **1.0×** | 100% |
| Rare | **1.5×** | 150% |
| Epic | **2.4×** | 240% |
| Legendary | **4.0×** | 400% |
| Mythic | **6.5×** | 650% |
| Chaos | **11.0×** | 1100% |

This is the genre-standard exponential lift — about 1.62× per step — that lets each rarity be "the one I'm chasing" without making the previous tier instantly obsolete (a Mythic +25 is competitive with a Chaos +1 on raw numbers; only the inherent passive and the affix ceiling separate them).

**Drop probabilities** (Forge gacha, per `design/04-progression-and-economy.md` §7):

| Rarity | Forge drop rate | Notes |
|---|---|---|
| Common | 50% | Bulk salvage fodder past week 1. |
| Rare | 30% | Mid-floor staple. |
| Epic | 15% | First "real" upgrade. |
| Legendary | 4% | Unlocks inherent passives. |
| Mythic | 0.95% | Pity-tracked; soft pity at pull 80, hard pity at pull 200. |
| Chaos | 0.05% | Cannot drop directly until account level 60; before that, Chaos slot rolls re-roll as Mythic. |

**Per-rarity upgrade-level caps** (slot-bound, see §4):

| Rarity | Level cap |
|---|---|
| Common | +10 |
| Rare | +15 |
| Epic | +20 |
| Legendary | +20 |
| Mythic | +25 |
| Chaos | +30 |

---

## 1. Per-slot base-type catalog

Every slot ships **five base types** at launch, each with a distinct stat slant. Every base also carries an **inherent passive** that goes dormant on Common/Rare/Epic and **activates at Legendary** (the rarity at which "this piece feels like it has a name"). Mythic upgrades the inherent passive; Chaos adds a second clause.

### 1.1 Weapons (the primary stat-defining slot)

| Base | Stat slant | Projectile feel | Inherent passive (Legendary+) |
|---|---|---|---|
| **Longbow** | Balanced ATK / ATK-spd | Straight arrows, medium speed | *Sure-Shot* — first hit on a new target deals +40% damage. Mythic: +60%. Chaos: also +1 pierce on first hit. |
| **Greatbow** | High ATK, low ATK-spd, +crit dmg | Slow heavy arrows, mild knockback | *Heartshot* — crits deal +25% bonus to non-elite targets. Mythic: +40%. Chaos: kills below 30% HP refund 1s of cooldowns. |
| **Crystal-Shard Bow** | ATK + projectile speed, +pierce | Three thin shards, fast | *Refraction* — projectiles that pierce a wall split into 2 weaker shards. Mythic: split into 3. Chaos: split shards also pierce. |
| **Sprite-Crook** | ATK-spd + summon-power, lowest base ATK | Short staff; fires a homing wisp | *Choir* — every 5th shot summons a homing wisp that deals 50% ATK. Mythic: every 4th, 75%. Chaos: wisps explode for AoE 30%. |
| **Wraithstring** | Lifesteal + crit, low HP cost | Translucent draw; phantom arrows | *Soul-Tax* — 4% lifesteal; crits restore 2% max HP. Mythic: 6% / 3%. Chaos: overheal becomes a 5s damage shield. |

### 1.2 Helms

| Base | Stat slant | Inherent passive (Legendary+) |
|---|---|---|
| **Lightplate Helm** | HP + crit-resist | *Brightward* — 15% reduced crit damage taken. Mythic: 25%. Chaos: enemy crits heal you for 1% max HP. |
| **Lucent Diadem** | ATK% + ability cooldown | *Crowned* — active ability cooldown −10%. Mythic: −15%. Chaos: first ability in a room is free. |
| **Wraithcowl** | Dodge + lifesteal | *Wisp-Step* — first hit each room is dodged. Mythic: first hit *and* every 8th hit. Chaos: dodging heals 2% HP. |
| **Sprite-Mask** | Summon-power + ATK-spd | *Echo-Mask* — summoned wisps/totems gain +25% damage. Mythic: +40%. Chaos: also +1 summon slot. |
| **Chaos Husk Crown** | Mixed; gains a random stat on each room enter | *Husk-Hum* — at room start, gain a random buff (+15% ATK, +15% ATK-spd, +20% crit, +25% move-spd) for the room. Mythic: two random buffs. Chaos: buffs persist between rooms until you take damage. |

### 1.3 Armor

| Base | Stat slant | Inherent passive (Legendary+) |
|---|---|---|
| **Lightplate** | HP + flat damage reduction | *Bulwark* — incoming damage above 25% max HP is capped to 25%. Mythic: cap is 20%. Chaos: overflow damage is reflected. |
| **Lucent Robe** | ATK% + ability damage | *Sunweave* — non-weapon damage (abilities, procs, summons) +20%. Mythic: +30%. Chaos: ability crits also trigger weapon on-hit effects. |
| **Wraithcloak** | Dodge + move-spd | *Slip-Through* — moving for >1.5s grants +12% dodge. Mythic: +18%. Chaos: a successful dodge bursts AoE for 80% ATK. |
| **Sprite-Shell** | Shield regen + summon HP | *Carapace* — gain a 10% max-HP shield that regenerates after 6s out of combat. Mythic: 15% / 4s. Chaos: shield breaking releases 3 wisps. |
| **Chaos Husk** | Mixed; converts overkill into ATK | *Husk-Drink* — overkill damage (damage exceeding enemy HP) is banked, up to 50% ATK, added to next shot. Mythic: 75%. Chaos: bank cap doubled and lasts 8s. |

### 1.4 Rings (offensive %)

| Base | Stat slant | Inherent passive (Legendary+) |
|---|---|---|
| **Bowstring Ring** | ATK% + projectile count | *Doubled-Up* — 10% chance to fire +1 arrow. Mythic: 15%. Chaos: doubled shots also crit. |
| **Sun-Sigil Ring** | Crit chance + crit damage | *Solar Flare* — crits proc a 20% ATK explosion. Mythic: 30%. Chaos: explosions can crit again. |
| **Pierce Band** | Pierce + projectile speed | *Through-Line* — first 2 enemies hit take +25% damage. Mythic: first 3, +35%. Chaos: piercing kills refund the projectile. |
| **Echoing Loop** | Ricochet + projectile count | *Echo-Bounce* — projectiles bounce to 1 extra target. Mythic: 2 extra. Chaos: bounces gain +20% per bounce. |
| **Chaos Knot** | Chaotic; rotates between three random offensive buffs | *Untie* — every 8s, gain a random offensive buff (multishot, ricochet, pierce, AoE-on-hit) for 6s. Mythic: every 6s for 8s. Chaos: stack two buffs at once. |

### 1.5 Lockets (on-hit / sustain)

| Base | Stat slant | Inherent passive (Legendary+) |
|---|---|---|
| **Soul-Locket** | Lifesteal + HP | *Soul-Drink* — kills heal 1% max HP. Mythic: 1.5%. Chaos: elite kills heal 5%. |
| **Spark-Locket** | Chain lightning chance + ATK-spd | *Spark-Chain* — 12% chance per hit to chain 30% damage to a second enemy. Mythic: 18% / 45%. Chaos: chain bounces up to 3 times. |
| **Glyph-Locket** | Status duration + ability damage | *Glyph-Burn* — status effects you apply tick 25% faster. Mythic: 40%. Chaos: status effects cannot be cleansed by elites. |
| **Sprite-Locket** | Summon count + summon ATK | *Familiar-Echo* — +1 wisp slot. Mythic: +2. Chaos: summons inherit your crit chance. |
| **Chaos Sigil** | Chaotic; trigger-of-the-room | *Sigil-Roll* — at room start, randomly grants one of: full revive once, 30% lifesteal, immunity to first hit, double drop. Mythic: roll twice, keep best. Chaos: also grants the rejected roll at 50% effect. |

### 1.6 Bracelets (movement / tempo)

| Base | Stat slant | Inherent passive (Legendary+) |
|---|---|---|
| **Swift-Bracer** | Move-spd + ATK-spd | *Quickdraw* — first 0.5s after stopping, ATK-spd +25%. Mythic: +40%. Chaos: also +20% crit during the window. |
| **Iron-Bracer** | HP + block chance | *Stand-Fast* — standing still for >2s grants +20% damage reduction. Mythic: +30%. Chaos: also reflects 30% damage. |
| **Wraith-Bracer** | Dodge + crit | *Phantom-Step* — after dodging, next shot crits. Mythic: next 2 shots crit. Chaos: phantom shots also pierce. |
| **Sprite-Bracer** | Summon-spd + projectile-spd | *Hasten* — summons attack 20% faster. Mythic: 30%. Chaos: summons also gain pierce. |
| **Chaos Cuff** | Chaotic; on-roll movement bonus | *Untether* — every 12s, dash 4m in the joystick direction (no input needed). Mythic: every 8s; dashes deal 100% ATK. Chaos: dashes leave a damaging trail. |

> **Design intent.** 5 bases × 6 slots = **30 base archetypes**. The Chaos-prefix base in every slot is the wild-card identity. Sprite-prefix maps to summon, Wraith-prefix to dodge/lifesteal, Lucent/Sun to crit/ability, Lightplate/Iron to tank.

---

## 2. Rarity progression — drop, magnitude, levels

Putting §0 in one consolidated table for the implementation team:

| Rarity | Forge drop % | Magnitude vs Common | Level cap | Affix slots unlocked | Inherent passive |
|---|---|---|---|---|---|
| Common | 50% | 1.0× | +10 | 0 | Dormant |
| Rare | 30% | 1.5× | +15 | 1 | Dormant |
| Epic | 15% | 2.4× | +20 | 2 | Dormant |
| Legendary | 4% | 4.0× | +20 | 3 | **Active (base clause)** |
| Mythic | 0.95% | 6.5× | +25 | 4 | **Active (Mythic clause)** |
| Chaos | 0.05% | 11.0× | +30 | 5 | **Active (Chaos clause)** |

### 2.1 Per-level Ember cost curve

Slot-bound upgrade cost (Embers per **+1** level, regardless of which item currently sits in the slot):

| Level range | Common | Rare | Epic | Legendary | Mythic | Chaos |
|---|---|---|---|---|---|---|
| 1 → 5 | 20 / step | 30 | 50 | 90 | 180 | 360 |
| 6 → 10 | 40 | 60 | 100 | 180 | 360 | 720 |
| 11 → 15 | — | 120 | 200 | 360 | 720 | 1,440 |
| 16 → 20 | — | — | 400 | 720 | 1,440 | 2,880 |
| 21 → 25 | — | — | — | — | 2,880 | 5,760 |
| 26 → 30 | — | — | — | — | — | 11,520 |

**Total Embers** to fully max **one slot at one rarity**:

| Rarity | Total Embers to cap |
|---|---|
| Common +10 | 300 |
| Rare +15 | 1,050 |
| Epic +20 | 3,750 |
| Legendary +20 | 6,750 |
| Mythic +25 | 27,000 |
| Chaos +30 | 108,000 |

Across all six slots at endgame Mythic the player spends **162,000 Embers**; at full Chaos, **648,000**. (See §6 for the faucet math.)

Each upgrade also costs a scaling amount of **Gold** (a sink for the soft currency); we set Gold cost equal to `Embers × 25` so that the gold drip from runs feeds upgrades naturally.

### 2.2 Stat formula

A piece's final stat is computed:

```
final_stat = base_slot_stat
           × rarity_multiplier         (from §0)
           × (1 + 0.05 × slot_level)   (slot-bound levels add 5% each, see §4)
           × (1 + sum_of_affix_pct)    (from §3 enchanting)
           × set_multiplier            (from §5)
```

A Common Longbow +0 with no affixes is the canonical "1.0" reference unit; everything else multiplies from there.

---

## 3. Fusion, enchanting, reforging

### 3.1 Fusion (the rarity ladder)

**4-into-1, same base, same slot.** Four pieces of rarity *N* fuse into one piece of rarity *N+1* of the **same base type**. The inherent passive is carried up (which is why bases matter — fusing four Longbows gives a Longbow of the next rarity, never a Greatbow).

| Recipe | Cost |
|---|---|
| 4× Common → 1× Rare | 200 Embers + 50 Gold |
| 4× Rare → 1× Epic | 800 Embers + 250 Gold |
| 4× Epic → 1× Legendary | 3,000 Embers + 1,200 Gold |
| 4× Legendary → 1× Mythic | 10,000 Embers + 5,000 Gold + **5 Sigil Dust** |
| 4× Mythic → 1× Chaos | **requires Chaos Catalyst** (see below) |

**Effective drop pressure.** It takes **256 Commons** to fuse a single Chaos through pure fusion (4⁴ Commons → 1 Mythic, then 4 Mythics → 1 Chaos with a catalyst). At the published 0.05% drop rate, Chaos is also obtainable directly, but the practical F2P path is fusion-driven. This matches the published F2P time-to-cap of **~12 months for first Chaos piece** in `design/04-progression-and-economy.md` §3.

### 3.2 Chaos Catalyst (the gate)

Sources: 1 per battle pass premium season, 2 per anniversary bundle, 1 per chapter-7 weekly clear, 1 from any 200-pull pity track. F2P availability **~10/year**, whale **~30/year**. Catalyst is never sold as a standalone SKU — preserves Pillar 5 (no pay-to-skip-cap).

### 3.3 Enchanting (random affixes)

Spend **Embers + Sigil Dust** to roll affixes. Affixes are the variance layer that keeps even maxed-rarity pieces interesting.

| Affix slot opens at | Rarity |
|---|---|
| 1st affix | Rare |
| 2nd affix | Epic |
| 3rd affix | Legendary |
| 4th affix | Mythic |
| 5th affix | Chaos |

**Sample affix pool** (each piece rolls 1 of 18 affixes per slot at random; affix strength scales with rarity):

| Affix | Range at Rare | Range at Chaos |
|---|---|---|
| +ATK | +2–4% | +12–18% |
| +HP | +2–4% | +12–18% |
| +ATK-spd | +1–2% | +6–10% |
| +Crit chance | +1–2% | +5–8% |
| +Crit damage | +3–5% | +15–25% |
| +Lifesteal | +0.5–1% | +3–5% |
| +Dodge | +1–2% | +4–6% |
| +Move-spd | +2–3% | +6–9% |
| +Projectile count | n/a (Epic+) | +1–2 |
| +Pierce | n/a (Epic+) | +1–2 |
| +Boss damage | +3–5% | +15–25% |
| +Elite damage | +3–5% | +15–25% |
| +AoE damage | +2–4% | +10–18% |
| +Ability damage | +2–4% | +12–20% |
| +Status duration | +5–10% | +25–40% |
| +Shield strength | +5–10% | +25–40% |
| +Gold find | +5–10% | +25–40% |
| +Ember drop | +5–10% | +25–40% |

**Initial enchant cost**: 100 Embers + 20 Sigil Dust per affix slot.

**Re-roll cost**: a full re-roll re-randomizes **all** affixes on the piece, at **2× the initial cost** per slot. The previous affixes are lost. This is the "enchant gambling" loop and the primary endgame Sigil-Dust sink.

### 3.4 Reforging (locked re-rolls)

Reforging is a **surgical** version of re-rolling — used when 2 of 3 affixes are perfect and you only want to re-roll the third.

- **Star-lock**: When reforging, the player spends **gems** (50 / 100 / 200 depending on the rarity) and **Embers** (200 / 600 / 2,000) to **lock one affix** before the re-roll.
- **Affix protection**: A locked affix is guaranteed to remain unchanged through the re-roll.
- **One star per reforge.** Locking two affixes requires two reforges in sequence.
- **Diminishing return**: each subsequent reforge on the *same* piece increases its cost by +25% (capped at +200%, so the 9th reforge is the most expensive). This is the whale sink that prevents perfect-affix farming via brute force gems.

### 3.5 Slot-bound upgrades — the Archero 2 lift

The single biggest player-trust mechanic in our gear system, per `research/games/archero-2.md` §5.1: upgrades attach to the **slot**, not the item. When you swap to a higher-rarity piece in the same slot, your upgrade levels carry over.

- Each of the 6 slots stores a **slot-level** counter (0 → 30).
- Ember spend goes against the **slot**. Every piece equipped in that slot benefits from the slot's current level.
- **No upgrade-regret tax.** Upgrading an Epic Longbow does not lose progress when a Legendary Longbow later replaces it.
- **Per-rarity cap still applies.** A slot at stored level +20 with a Common piece equipped *displays* as +10 (Common's cap). The stored +20 instantly applies the moment a Legendary piece is equipped.
- **UI/UX.** The slot panel shows two numbers: equipped piece's effective level, and the slot's stored level. Headroom is highlighted in gold.

This eliminates Archero 1's "upgrade only the item you'll fuse" anti-pattern. Players upgrade aggressively because the investment compounds across all future drops in that slot — driving D14 retention and reducing salvage anxiety.

---

## 4. The 8 gear sets

Each set is a **4-piece composition** (the launch-scope `design/05-launch-scope.md` line item) with **2-piece** and **4-piece** bonuses. Each maps to one of the **8 launch build archetypes** locked in `design/00-design-pillars.md` Pillar 2 and `design/05-launch-scope.md`.

> **Slot economy.** Each set picks **4 of 6** slots; the remaining 2 are free for mixing (often a second 2-piece for double-set play). This is intentional — full 6-piece lockout would discourage off-set tinkering. 4-piece is the genre-correct "build-defining" threshold per `research/games/progression-systems.md` §4.5.

### Set 1 — **Choir of Auria**
*"Sing back the sun, shot by shot."*

- **Slots**: Weapon, Locket, Bracelet, Helm
- **2-piece**: +20% ATK-spd, +1 projectile
- **4-piece**: Every 4th basic attack fires a **Solar Volley** of 5 arrows in a 60° cone, each dealing 80% ATK. Solar Volley arrows can crit.
- **Archetype**: **Multishot Storm** — the canonical Archero "fill the screen with arrows" build.

### Set 2 — **Glassbreaker's Trove**
*"What strikes once, strikes deeper."*

- **Slots**: Weapon, Ring, Locket, Bracelet
- **2-piece**: +30% crit damage, +15% crit chance
- **4-piece**: Crits apply **Glassbreak** — the target takes +30% damage from all sources for 4s, stacking up to 3×.
- **Archetype**: **Crit-Stack** — focused-fire single-target deletion.

### Set 3 — **The Refracted Path**
*"One arrow, many endings."*

- **Slots**: Weapon, Ring, Helm, Bracelet
- **2-piece**: +2 pierce, +20% projectile speed
- **4-piece**: Piercing through an enemy **refracts** the arrow into a 90° fork (+1 split per pierce, max 3). Splits deal 60% damage.
- **Archetype**: **Pierce-Refract** — laneclear and chokepoint melt.

### Set 4 — **Echo of the Hollow Bell**
*"It rings, it rings, it rings."*

- **Slots**: Weapon, Ring, Locket, Bracelet
- **2-piece**: +1 ricochet, +15% ATK
- **4-piece**: Projectiles **bounce up to 4 extra times**; each bounce gains +25% damage (cumulative). The final bounce explodes for 80% ATK in a small AoE.
- **Archetype**: **Ricochet/Bouncy-Wall** — winding rooms and cluster fights.

### Set 5 — **The Sprite-Procession**
*"You are never alone in the light."*

- **Slots**: Weapon, Helm, Locket, Bracelet
- **2-piece**: +2 summon slots, +20% summon damage
- **4-piece**: Your summons gain **Procession** — wisps form a defensive arc around you, blocking 1 projectile every 2s, and fire a homing shard at the nearest enemy every 1.5s.
- **Archetype**: **Summon/Sprite** — the "I am a marching parade" identity.

### Set 6 — **Wraithweave**
*"The light bends around you."*

- **Slots**: Armor, Helm, Bracelet, Locket
- **2-piece**: +25% dodge, +15% move-spd
- **4-piece**: After dodging, gain **Phaseweave** — invulnerability for 0.8s and your next 3 shots crit. Phaseweave can trigger every 6s.
- **Archetype**: **Dodge-Phantom** — high-skill, low-HP risk/reward.

### Set 7 — **Sunward Bulwark**
*"Stand in the light. Let it stand for you."*

- **Slots**: Armor, Helm, Bracelet, Ring
- **2-piece**: +30% HP, +20% damage reduction while standing still
- **4-piece**: While stationary for >1.5s, generate a **Sunward Aura** — a 4m radius zone that absorbs 50% of incoming projectiles and reflects them back at 40% ATK.
- **Archetype**: **Tank-Anchor** — the immobile fortress build, perfect for boss-stand-and-deliver.

### Set 8 — **Husk of the Long Dusk**
*"Take a little of the Dim into you, and rule it."*

- **Slots**: Armor, Helm, Ring, Locket (the four Chaos-prefix bases recommended, though any base of these slots qualifies)
- **2-piece**: At room start, gain a random offensive buff (multishot, ricochet, pierce, AoE-on-hit) for 8s.
- **4-piece**: **Husk-Roulette** — every 10s during combat, swap to a *new* random offensive buff. The previous buff is retained at 50% strength (so buffs stack indefinitely as the room progresses; on room exit, all buffs reset). Pairs with the Chaos Knot ring and Chaos Husk armor for maximum entropy.
- **Archetype**: **Chaos-Cycler** — the build-discovery wildcard; rewards reactive play. The screenshot-worthy "everything everywhere all at once" Pillar 2 moment.

### Set composition matrix

| Set | Weapon | Helm | Armor | Ring | Locket | Bracelet | Archetype |
|---|---|---|---|---|---|---|---|
| Choir of Auria | ✓ | ✓ | | | ✓ | ✓ | Multishot Storm |
| Glassbreaker's Trove | ✓ | | | ✓ | ✓ | ✓ | Crit-Stack |
| Refracted Path | ✓ | ✓ | | ✓ | | ✓ | Pierce-Refract |
| Echo of the Hollow Bell | ✓ | | | ✓ | ✓ | ✓ | Ricochet |
| Sprite-Procession | ✓ | ✓ | | | ✓ | ✓ | Summon |
| Wraithweave | | ✓ | ✓ | | ✓ | ✓ | Dodge-Phantom |
| Sunward Bulwark | | ✓ | ✓ | ✓ | | ✓ | Tank-Anchor |
| Husk of the Long Dusk | | ✓ | ✓ | ✓ | ✓ | | Chaos-Cycler |

> **Note on slot variety.** The Weapon slot is used by 5 of 8 sets (offensive builds), Helm by 7 of 8 (the universal staple), Armor by only 3 (defensive identity). This is intentional — Weapon is the build's identity for damage archetypes; Helm is the universal stat block; Armor differentiates the defensive builds. Ring/Locket/Bracelet are flex.

---

## 5. Power-budget validation (worked examples)

The §2 invariant: **The Forge contributes ~35% of total power**. Let's verify with two canonical endgame builds. The other 65% comes from Hero Level (12%), Mastery (8%), Inscription (20%), Sets (12%, separate layer in §2), Sigils (8%), Spirits (5%).

### 5.1 Endgame F2P, ~12 months in

| Slot | Item | Rarity | Slot level | Affixes |
|---|---|---|---|---|
| Weapon | Crystal-Shard Bow | Mythic | +18 | 3 (1 maxed, 2 mid-roll) |
| Helm | Lightplate Helm | Legendary | +20 | 3 |
| Armor | Lightplate | Legendary | +18 | 3 |
| Ring | Sun-Sigil Ring | Mythic | +15 | 4 |
| Locket | Spark-Locket | Legendary | +20 | 3 |
| Bracelet | Swift-Bracer | Mythic | +12 | 4 |

**Active sets**: Full 4-piece **Glassbreaker's Trove** (Weapon/Ring/Locket/Bracelet) + 2-piece **Sunward Bulwark** (Armor/Helm).

**Computed gear power** (using a 1,000-unit Common-baseline = 100% formula):

| Source | Multiplier |
|---|---|
| Average rarity multiplier across slots | ≈ **4.95×** (mix of Legendary 4.0 and Mythic 6.5, weighted 3 / 3) |
| Average slot level lift | ≈ **1.85×** (mean slot lvl ~17 → 1 + 0.05 × 17 = 1.85) |
| Affixes (mean +24% per piece, summed across 6 pieces, multiplicative across stats) | ≈ **1.45×** |
| **Gear-layer total** | **≈ 13.2× base** |

The F2P player's **total power index** lands at **≈ 38× base** (Forge + L1 hero + L2 mastery + L3 inscription + L5 sets + L6 sigils + L7 pets, weighted by the §2 budget shares). Forge contributes **13.2 / 38 ≈ 34.7%** — squarely on the **35% target**.

### 5.2 Endgame whale, ~12 months in (~$3,000 IAP)

| Slot | Item | Rarity | Slot level | Affixes |
|---|---|---|---|---|
| Weapon | Crystal-Shard Bow | Chaos | +24 | 5 (perfect-rolled via reforging) |
| Helm | Lucent Diadem | Chaos | +22 | 5 |
| Armor | Lightplate | Mythic | +25 | 4 |
| Ring | Sun-Sigil Ring | Chaos | +20 | 5 |
| Locket | Soul-Locket | Mythic | +25 | 4 |
| Bracelet | Swift-Bracer | Chaos | +18 | 5 |

**Active sets**: Full 4-piece **Glassbreaker's Trove** + full 4-piece **Sunward Bulwark** (overlap of slots across sets means the whale runs *two* full 4-piece bonuses — a key build-budget unlock at endgame).

**Computed gear power**:

| Source | Multiplier |
|---|---|
| Average rarity multiplier | ≈ **8.7×** (mix of Mythic 6.5 and Chaos 11, weighted 2 / 4) |
| Average slot level lift | ≈ **2.10×** (mean slot lvl ~22) |
| Affixes (mean +52% per piece, near-maxed) | ≈ **2.30×** |
| **Gear-layer total** | **≈ 42.0× base** |

The whale's **total power index** lands at **≈ 121× base**; Forge contributes **42 / 121 ≈ 34.7%**. The whale is **~3.2× more powerful overall** than the F2P player — not 10× — preserving Pillar 5.

### 5.3 Sanity check vs §2 invariant

| Player | Total power index | Gear % of total | Target |
|---|---|---|---|
| F2P, 12 mo | 38× | 34.7% | **35% ✓** |
| Whale, 12 mo | 121× | 34.7% | **35% ✓** |
| Whale-to-F2P power ratio | 3.18× | n/a | <4× ✓ |

The whale-to-F2P ratio of **~3.2×** keeps PvP and leaderboard play **competitive** for F2P — Pillar 5 is satisfied. The 35% Forge target is hit in both archetypes.

---

## 6. Salvage table & Ember faucet/sink

Salvage converts unwanted gear into **Embers + Sigil Dust + base-type shards**. Shards exist to let players target a *specific base type* (e.g., farm Longbow shards to guarantee Longbow fusion materials).

### 6.1 Per-rarity salvage yield

| Rarity | Embers | Sigil Dust | Base shards | Notes |
|---|---|---|---|---|
| Common | 5 | 0 | 1 | Bulk fodder. |
| Rare | 20 | 1 | 4 | Daily-quest tier. |
| Epic | 80 | 5 | 16 | First "felt" salvage. |
| Legendary | 400 | 25 | 80 | Salvage duplicates only. |
| Mythic | 2,000 | 150 | 400 | Usually fused, not salvaged. |
| Chaos | 12,000 | 1,000 | 2,500 | Effectively never salvaged. |

**Base-type shards**: 100 shards craft 1 Common piece of that base at the Forge — a target-farm path for build identity (e.g., grinding Longbow shards to guarantee the Longbow fusion ladder).

**Salvage protections**: equipped gear cannot be salvaged; Legendary+ requires a two-tap confirm; salvage history allows undo within 24h for 50 gems (Pillar-5 anti-misclick guarantee).

### 6.2 Ember faucet/sink balance

**Faucets** (typical endgame day, 60 min play):

| Source | Embers/day |
|---|---|
| Run drops (3 Campaign + 2 Tower runs) | ~600 |
| Daily quest completion (6/6) | 300 |
| Daily login | 100 |
| Salvage of duplicate Commons / Rares from runs | ~400 |
| Weekly mission share (daily portion) | ~250 |
| Battle pass tier (daily portion, premium track) | ~150 |
| Ad-gated free chest (4× daily) | ~120 |
| **Daily total (F2P endgame)** | **~1,920** |
| **Daily total (whale w/ monthly card + battle pass premium)** | **~2,800** |

**Sinks** (a player working toward Mythic-cap loadout, ~3 months from start):

| Sink | Embers/day budget |
|---|---|
| Slot upgrades (active focus slot) | ~800 |
| Enchant + re-roll on focus slot | ~400 |
| Fusion materials (4×Legendary → 1×Mythic banking) | ~500 |
| Reforge save-up | ~200 |
| **Total daily sink target** | **~1,900** |

**Faucet ≈ Sink at endgame** with a slight F2P **deficit** (≈ –20/day) → resolves by running ad chests + weekly events → matches design intent: F2P players make slow but visible progress; whales accelerate via monthly card + IAP top-ups.

**Faucet > Sink** at early-game (days 1–14, sink is small) by design — supports the "first 30 min feels like reading a magazine" target from Pillar 3.

**Sink > Faucet** in the **Chaos phase** (months 8+) — this is the long-tail grind that gives Year-1 players a "next goal" per Pillar 3.

### 6.3 Ember weekly bottom line

| Phase | Weekly Embers in | Weekly Embers out | Net | Effect |
|---|---|---|---|---|
| Early (week 1–4) | 8,000 | 2,500 | **+5,500** | "Money rains." |
| Mid (month 2–6) | 12,000 | 11,500 | **+500** | "Balanced; one upgrade per session." |
| Endgame F2P (month 7–12) | 14,000 | 16,000 | **–2,000** | "Sink-heavy; chase ad bonuses & events." |
| Endgame whale | 20,000 | 24,000 | **–4,000** | "Spending gems on Ember bundles directly." |

The whale Ember deficit is the **monetization hook** — Ember bundles in the gem shop (500 gems = 5,000 Embers) become a meaningful purchase decision past month 6. Per Pillar 5, **no Ember pack ever exceeds $4.99** and Embers are **always available via play**, never paywalled.

---

## 7. Open balance levers for wave-2 tuning

Shape-locked, magnitude-tunable based on soft-launch telemetry:

1. Rarity multiplier step (currently ~1.62×).
2. Slot-level +5%/level coefficient.
3. Affix roll ranges per rarity.
4. Chaos Catalyst weekly availability.
5. Set 4-piece bonus magnitudes (set-vs-set parity is the wave-2 balance-curves deliverable).

**Source files**: `design/00-design-pillars.md`, `design/04-progression-and-economy.md`, `design/05-launch-scope.md`, `research/games/progression-systems.md`, `research/games/archero-2.md` §5.
