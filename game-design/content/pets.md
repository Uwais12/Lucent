# Spirits (Pets) — Lucent: Shards of the Shattered Sun

> 12 launch Spirits. Power-budget share: **5% of total combat power at endgame** (per `design/04-progression-and-economy.md` §2). One active Spirit slot. Each Spirit grants a **passive** while equipped and a **triggered active** on a long cooldown.
>
> Spirits are **fragments of pre-Dimming creatures** — small fauna of Iridian that survived because a light-shard bonded to them, much like Lucent-bearers. Lore-wise, they are the bearer's smaller cousins: companions, not subordinates.
>
> Build-affinity references the 8 launch hero archetypes from `design/03-world-and-theme.md`: **Dawnbow, Wardlight, Spinekind, Embercaller, Frostshard, Prismborn, Wraithsworn, Sunkin Heir**. (Spirits are hero-agnostic — they can be equipped by any hero. "Affinity" indicates which archetype's build pattern they amplify most.)

---

## Rarity distribution at launch

| Rarity | Count | Acquisition |
|---|---|---|
| Common | 3 | Free-path drops, weekly mission rewards, achievements |
| Rare | 3 | Free-path drops (slower), weekly missions, daily login calendar |
| Epic | 3 | Gacha banner standard pool, event milestone rewards |
| Legendary | 2 | Gacha banner (1.8% base rate, soft pity guarantees 1 per 50 pulls) |
| Mythic | 1 | Anniversary event only — limited time, returns annually |

Per-rarity power weight (at level 80, 6-star, before ascension multipliers):

| Rarity | Base power index | Notes |
|---|---|---|
| Common | 0.55 | Niche utility, free-path competitive |
| Rare | 0.70 | Generalist value |
| Epic | 0.85 | Build-amplifying passive |
| Legendary | 1.00 | Reference — full 5% budget when fully maxed |
| Mythic | 1.15 | Adds new option, never strict upgrade |

---

## Spirit 1 — Glimwing (Common)

> **Species:** Lantern moth, palm-sized, wings refract indigo light.
> **Tagline:** *"It still flies toward the brightest thing it sees. That is the world's oldest hope."*

- **Visual:** Flutters in a slow loop above the hero's left shoulder. Pulses brighter when the hero is at full HP.
- **Passive (while equipped):** +6% pickup radius. +1 starting Sigil Dust per run.
- **Active (every 22s):** Releases a **dust pulse** in a 4m radius — every enemy hit takes 80% ATK damage and is **revealed** (highlights through walls for 6s).

### Per-rarity stat curve (passive ATK boost added on top of utility)

| Pet Level | ATK% | Pickup Radius | Pulse Damage |
|---|---|---|---|
| 1 | +1% | +6% | 80% ATK |
| 20 | +2% | +9% | 120% ATK |
| 40 | +3% | +12% | 170% ATK |
| 60 | +4% | +15% | 220% ATK |
| 80 | +5% | +18% | 280% ATK |

### Ascension stars

| Star | Unlock |
|---|---|
| 1★ | Base passive + active. |
| 2★ | Pulse radius +25%. |
| 3★ | **Behavior:** Glimwing now drops a free Common ability roll once per run (5th room). |
| 4★ | Active cooldown -3s. |
| 5★ | Pulse also marks elites with a +10% damage-taken debuff for 5s. |
| 6★ — **"Wakemoth"** | Final Form. Each pulse leaves a **Lucent Trail** for 4s; hero standing in trail gains +12% move speed and +1 ability rarity tier on the next pickup. |

- **Build affinity:** Dawnbow, Prismborn (generalist DPS that benefits from extra pickups).
- **Unlock path:** Tutorial reward at end of Chapter 1. Free.

---

## Spirit 2 — Spinekitten (Common)

> **Species:** A kitten-sized cousin of the Spinekind lynx, electrified fur.
> **Tagline:** *"Static-veined and unrepentant. Pet it once and your hair stands a week."*

- **Visual:** Trots on the ground beside the hero, occasionally pouncing at corpses.
- **Passive:** +5% attack speed. Hero's first hit on a fresh enemy chains a small lightning arc to one nearby foe.
- **Active (every 18s):** **Sparkpounce.** Leaps at the nearest enemy, dealing 150% ATK as lightning and stunning for 0.6s.

### Per-rarity stat curve

| Pet Level | ATK SPD | Chain Damage | Sparkpounce |
|---|---|---|---|
| 1 | +2% | 25% ATK | 150% ATK |
| 20 | +3% | 40% ATK | 220% ATK |
| 40 | +4% | 60% ATK | 310% ATK |
| 60 | +5% | 80% ATK | 410% ATK |
| 80 | +6% | 100% ATK | 530% ATK |

### Ascension stars

| Star | Unlock |
|---|---|
| 1★ | Base. |
| 2★ | Chain hits 2 targets instead of 1. |
| 3★ | **Behavior:** Spinekitten pounces autonomously every 8s onto any enemy below 25% HP. |
| 4★ | Stun duration +0.3s. |
| 5★ | +3% crit chance baseline. |
| 6★ — **"Stormpelt"** | Sparkpounce becomes a **3-chain leap** (hits 3 enemies in sequence). Each leap stacks +1% lightning damage on the hero for the rest of the run, max 20. |

- **Build affinity:** Spinekind (lightning chain), Dawnbow.
- **Unlock path:** Free — awarded at Account Level 8.

---

## Spirit 3 — Mosslet (Common)

> **Species:** A turtle-shelled sapling, half-plant half-amphibian, slow and patient.
> **Tagline:** *"Older than the lanterns. Has outlasted three Dimmings already."*

- **Visual:** Hovers on a small disc of moss behind the hero, drifting in a lazy arc.
- **Passive:** +8% max HP. Out-of-combat regen +1% max HP/sec.
- **Active (every 25s):** **Greenward.** Plants a 4m radius healing puddle that heals 6% max HP per second to anyone standing in it for up to 4s.

### Per-rarity stat curve

| Pet Level | HP% | Regen | Greenward Heal/s |
|---|---|---|---|
| 1 | +3% | +0.5% | 4% max HP |
| 20 | +5% | +0.8% | 5% max HP |
| 40 | +7% | +1.1% | 6% max HP |
| 60 | +8% | +1.4% | 7% max HP |
| 80 | +10% | +1.6% | 8% max HP |

### Ascension stars

| Star | Unlock |
|---|---|
| 1★ | Base. |
| 2★ | Greenward radius +1m. |
| 3★ | **Behavior:** Auto-drops a Greenward at the start of every boss room. |
| 4★ | Out-of-combat regen +1%/s. |
| 5★ | Allies within Greenward gain +10% damage reduction (matters for co-op). |
| 6★ — **"Eldermoss"** | Final Form. Greenward becomes **persistent** (lasts until you leave the room) and adds **+15% damage dealt** to anyone standing in it. |

- **Build affinity:** Wardlight (tank), Wraithsworn (sustain).
- **Unlock path:** Free — awarded for completing Chapter 2.

---

## Spirit 4 — Prismfox (Rare)

> **Species:** A four-tailed kit fox whose pelt refracts every color in sequence.
> **Tagline:** *"Each tail remembers a color the Dim took. She is teaching them back."*

- **Visual:** Orbits the hero at 2m, leaving a trail of color shards.
- **Passive:** +1 starting Ability Reroll per run. +8% crit damage.
- **Active (every 24s):** **Refraction Burst.** Splits the hero's next 3 projectiles into 5-projectile fans (multishot +2 for 4 seconds, or 3 shots, whichever ends first).

### Per-rarity stat curve

| Pet Level | Crit DMG | Multishot Burst | Free Rerolls |
|---|---|---|---|
| 1 | +6% | +1 proj | 1 |
| 20 | +9% | +1 proj | 1 |
| 40 | +12% | +2 proj | 1 |
| 60 | +16% | +2 proj | 2 |
| 80 | +20% | +2 proj | 2 |

### Ascension stars

| Star | Unlock |
|---|---|
| 1★ | Base. |
| 2★ | Burst lasts 5s instead of 4s. |
| 3★ | **Behavior:** Prismfox flicks her tail when an offer NPC appears — adds 1 free re-roll on offer pools (Valkyrie/Devil/Angel equivalents). |
| 4★ | +4% crit chance. |
| 5★ | Burst projectiles ricochet once. |
| 6★ — **"Sunrefractor"** | Final Form. Burst is now **passive on a 12s loop** without consuming the active — the active instead becomes a **prismatic beam** dealing 600% ATK in a 6m line. |

- **Build affinity:** Prismborn (splitting projectiles), Dawnbow.
- **Unlock path:** Free — earned by clearing the Weekly Mission set 3 times.

---

## Spirit 5 — Wraithpup (Rare)

> **Species:** A spectral wolf-cub, half-here, half-Dim. Eyes are two pale circles of light.
> **Tagline:** *"It followed you out of the Hollow. It will not say from where."*

- **Visual:** Phases in and out at the hero's flank, occasionally vanishing entirely for 2–3s.
- **Passive:** +4% lifesteal. On-kill heal +0.4% max HP.
- **Active (every 20s):** **Soulbite.** Marks the strongest enemy on screen; the next 5 hits on the marked target heal the hero for 2% max HP each.

### Per-rarity stat curve

| Pet Level | Lifesteal | On-kill Heal | Soulbite Heal/Hit |
|---|---|---|---|
| 1 | +2% | +0.2% | 1% |
| 20 | +3% | +0.3% | 1.5% |
| 40 | +4% | +0.4% | 2% |
| 60 | +5% | +0.5% | 2.5% |
| 80 | +6% | +0.6% | 3% |

### Ascension stars

| Star | Unlock |
|---|---|
| 1★ | Base. |
| 2★ | Soulbite mark also reduces target's healing taken by 40%. |
| 3★ | **Behavior:** When hero drops below 30% HP, Wraithpup automatically applies Soulbite (off cooldown). |
| 4★ | +2% lifesteal. |
| 5★ | Soulbite hits trigger lifesteal at 2× rate. |
| 6★ — **"Hollowfang"** | Final Form. Each enemy killed within 4s of dying to the marked target heals 1% max HP. Boss kills heal 25% max HP. |

- **Build affinity:** Wraithsworn (lifesteal), Embercaller (DoT pressure).
- **Unlock path:** Free — awarded at Account Level 20.

---

## Spirit 6 — Frost Yeti-cub (Rare)

> **Species:** A round, palm-furred yeti calf. Frostspire-native. Sneezes snow.
> **Tagline:** *"Mother wandered into the Long Dusk. The cub waits. Bring it with you."*

- **Visual:** Waddles on the ground beside the hero, leaving tiny frosted footprints.
- **Passive:** +6% damage to frozen/slowed enemies. Hero hits apply **Chillstack** (slows by 4% per stack, max 5).
- **Active (every 22s):** **Frostshrug.** AoE blast 4m radius, deals 130% ATK and freezes affected enemies for 1.2s.

### Per-rarity stat curve

| Pet Level | DMG vs Slowed | Chillstack Slow | Frostshrug |
|---|---|---|---|
| 1 | +4% | 3% | 130% ATK |
| 20 | +6% | 4% | 200% ATK |
| 40 | +8% | 5% | 290% ATK |
| 60 | +10% | 6% | 390% ATK |
| 80 | +12% | 8% | 510% ATK |

### Ascension stars

| Star | Unlock |
|---|---|
| 1★ | Base. |
| 2★ | Freeze duration +0.4s. |
| 3★ | **Behavior:** Auto-triggers Frostshrug when 4+ enemies are within 3m of the hero. |
| 4★ | Chillstack max +2 (to 7). |
| 5★ | Frozen enemies shatter on death for 50% ATK splash. |
| 6★ — **"Avalanche Calf"** | Final Form. Frostshrug becomes a **rolling avalanche** that travels 8m and freezes everything it touches for 2s. |

- **Build affinity:** Frostshard (freeze + control), Wardlight.
- **Unlock path:** Free — awarded for clearing Chapter 3 (Frostspire).

---

## Spirit 7 — Hollow Owl (Epic)

> **Species:** A barn owl whose chest is a hollow socket where a shard sits.
> **Tagline:** *"It does not hunt. It witnesses. The shard sees through its eyes."*

- **Visual:** Floats at hero's right shoulder, head rotating to track threats.
- **Passive:** +12% damage to elites and bosses. Reveals room treasure chests when entering a new room.
- **Active (every 26s):** **Eyestrike.** Channels a 0.8s beam onto the highest-HP target, dealing 350% ATK and **piercing armor** (ignores 30% of target's defense for 8s).

### Per-rarity stat curve

| Pet Level | DMG vs Elites/Boss | Eyestrike | Armor Pierce |
|---|---|---|---|
| 1 | +6% | 200% ATK | 15% |
| 20 | +9% | 320% ATK | 20% |
| 40 | +12% | 460% ATK | 25% |
| 60 | +16% | 620% ATK | 28% |
| 80 | +20% | 820% ATK | 32% |

### Ascension stars

| Star | Unlock |
|---|---|
| 1★ | Base. |
| 2★ | Channel time -0.2s. |
| 3★ | **Behavior:** Hollow Owl marks **every boss telegraph zone** (red AoE) with a clearer pulse — pure quality-of-life, no power. |
| 4★ | Eyestrike crits at +50% damage if hero is below 50% HP. |
| 5★ | Armor-pierce window +4s. |
| 6★ — **"Shardwatcher"** | Final Form. Eyestrike now **chains** to a second target (50% damage). Reveals chest rooms two rooms ahead on the map. |

- **Build affinity:** Wardlight (boss DPS), Dawnbow, Sunkin Heir.
- **Unlock path:** Gacha banner — Epic pool, standard rate (10%).

---

## Spirit 8 — Ember Spider (Epic)

> **Species:** A spider the size of a fist, body of cooling forge-glass. Spins webs of molten thread.
> **Tagline:** *"Born in Emberforge when the bellows died. Still warm."*

- **Visual:** Rides on the hero's shoulder; occasionally drops to floor to spin a small web at the hero's feet.
- **Passive:** +10% burn damage. Hero attacks have a 5% chance to **ignite** for 80% ATK over 3s.
- **Active (every 20s):** **Forgeweb.** Spins a 3m web on the ground; enemies stepping in are slowed by 40% and take 60% ATK/s as burn for 5s.

### Per-rarity stat curve

| Pet Level | Burn DMG | Ignite Chance | Forgeweb DPS |
|---|---|---|---|
| 1 | +6% | 3% | 40% ATK/s |
| 20 | +8% | 4% | 60% ATK/s |
| 40 | +10% | 5% | 90% ATK/s |
| 60 | +13% | 7% | 120% ATK/s |
| 80 | +16% | 9% | 160% ATK/s |

### Ascension stars

| Star | Unlock |
|---|---|
| 1★ | Base. |
| 2★ | Forgeweb lasts 7s instead of 5s. |
| 3★ | **Behavior:** Drops a Forgeweb at hero's location whenever the hero takes a hit (10s internal cooldown). |
| 4★ | Burns crit. |
| 5★ | Ignite stack count up to 3 per enemy. |
| 6★ — **"Cinderqueen"** | Final Form. When an enemy dies while burning, its corpse **explodes** for 200% ATK and ignites all enemies within 3m. Chain-burn build enabler. |

- **Build affinity:** Embercaller (fire DoT, AoE), Wraithsworn.
- **Unlock path:** Gacha banner — Epic pool.

---

## Spirit 9 — Sunkin Carp (Epic)

> **Species:** A koi the size of a bread loaf. Drowned during the Sinking of the Cathedral and came back glowing.
> **Tagline:** *"Still swimming. The water is gone, but the carp does not know that."*

- **Visual:** Swims in slow loops around the hero, leaving a faint wake of golden water.
- **Passive:** +1 starting Sigil Dust per run. +10% to gold gained from rooms.
- **Active (every 24s):** **Tidesummon.** Summons 3 spectral koi that swim outward 6m, each dealing 90% ATK to the first enemy hit and applying **Blessed** (next ability pickup is upgraded one rarity tier; consumed on use, lasts 2 rooms).

### Per-rarity stat curve

| Pet Level | Sigil Dust | Gold% | Koi Damage |
|---|---|---|---|
| 1 | +1 | +6% | 60% ATK |
| 20 | +1 | +8% | 100% ATK |
| 40 | +1 | +11% | 140% ATK |
| 60 | +2 | +14% | 190% ATK |
| 80 | +2 | +18% | 250% ATK |

### Ascension stars

| Star | Unlock |
|---|---|
| 1★ | Base. |
| 2★ | Koi count +1 (4 total). |
| 3★ | **Behavior:** The first offer encounter of every run is **upgraded by one tier** (Common offers become Rare, etc.). |
| 4★ | +20% gold from boss rooms. |
| 5★ | Blessed buff lasts 3 rooms. |
| 6★ — **"Lordkoi"** | Final Form. Tidesummon also drops a **summoned ally Sun-Koi** that hovers near the hero, auto-attacking for 40% ATK every 1.5s for the next 2 rooms. |

- **Build affinity:** Sunkin Heir (summons + economy), Prismborn.
- **Unlock path:** Gacha banner — Epic pool. Currently the featured Spirit on the Chapter 2 (Sunken Cathedral) launch banner.

---

## Spirit 10 — Aurorhart (Legendary)

> **Species:** A young stag, antlers strung with aurora-light. Frostspire native.
> **Tagline:** *"It bows once and walks beside you. Old custom. Older oath."*

- **Visual:** Trots a few meters ahead of the hero, antlers shedding aurora dust where it walks.
- **Passive:** +8% all damage. **Resonance:** at the start of every room, the hero gains a buff matching their build's currently-strongest archetype (one of: +10% multishot damage, +10% burn damage, +10% lightning damage, +10% crit damage, +10% summon damage). Auto-detected from in-run ability picks.
- **Active (every 25s):** **Antlerfall.** 3 light-shards fall from above on a 5m radius, each dealing 250% ATK and stunning for 0.4s.

### Per-rarity stat curve

| Pet Level | DMG% | Resonance Bonus | Antlerfall Shard |
|---|---|---|---|
| 1 | +4% | +6% | 150% ATK |
| 20 | +6% | +8% | 240% ATK |
| 40 | +8% | +10% | 340% ATK |
| 60 | +10% | +12% | 460% ATK |
| 80 | +12% | +15% | 610% ATK |

### Ascension stars

| Star | Unlock |
|---|---|
| 1★ | Base. |
| 2★ | Antlerfall shards count +1 (4 total). |
| 3★ | **Behavior:** Resonance buff persists for the **whole run** once detected, and stacks with itself at +5% per room (cap +30%). |
| 4★ | Antlerfall stun +0.4s. |
| 5★ | First boss of each chapter takes +25% damage from Antlerfall. |
| 6★ — **"Auriastag"** | Final Form. Each ability the hero picks during a run permanently adds +1% to Aurorhart's Resonance bonus for the run. Resonance can now reach +60%. **Build-amplifier ceiling for any archetype.** |

- **Build affinity:** All 8 — but it leans into whichever the player commits to. Strongest with **Dawnbow**, **Prismborn**, **Embercaller** in practice.
- **Unlock path:** Gacha banner — Legendary pool (1.8% base, 50-pull pity).

---

## Spirit 11 — Dimcaller Raven (Legendary)

> **Species:** A raven the size of a dog, feathers shedding indigo motes. Once an Echo, now stable.
> **Tagline:** *"It speaks the Dim's true name once per run. The Dim flinches."*

- **Visual:** Flies in a wide circle 4m around the hero. Caws on cooldown ready.
- **Passive:** +12% damage to Dim-corrupted enemies (the standard enemy archetype across all 7 realms — i.e., **most** of the roster). +6% move speed.
- **Active (every 30s):** **Truename.** The raven calls out and a 6m radius shockwave **strips one buff** from all enemies, deals 300% ATK, and inflicts **Vulnerable** (+25% damage taken for 6s).

### Per-rarity stat curve

| Pet Level | DMG vs Dim | Move SPD | Truename DMG |
|---|---|---|---|
| 1 | +6% | +3% | 180% ATK |
| 20 | +8% | +4% | 290% ATK |
| 40 | +10% | +5% | 410% ATK |
| 60 | +14% | +6% | 550% ATK |
| 80 | +18% | +8% | 720% ATK |

### Ascension stars

| Star | Unlock |
|---|---|
| 1★ | Base. |
| 2★ | Truename radius +1m. |
| 3★ | **Behavior:** Raven autonomously dive-bombs the highest-HP enemy in every room for 100% ATK once. |
| 4★ | Vulnerable duration +3s. |
| 5★ | Truename also **silences** enemies for 2s (interrupts wind-ups). |
| 6★ — **"Echofeather"** | Final Form. Truename **echoes** — fires a second time 2s later. Bosses take an additional +10% damage during the Vulnerable window. |

- **Build affinity:** Wraithsworn (debuff/finisher), Spinekind, Sunkin Heir.
- **Unlock path:** Gacha banner — Legendary pool. Rotates as featured Spirit on Hollow Sky (Chapter 6) and Long Dusk (Chapter 7) themed banners.

---

## Spirit 12 — Solchild (Mythic, anniversary only)

> **Species:** A small humanoid figure of pure crystallized sunlight — neither Lucent-bearer nor Spirit, something between. The last echo of the suns themselves.
> **Tagline:** *"The suns left a piece of themselves behind. It chose you."*

- **Visual:** Floats above the hero's head in a slow halo. The hero glows brighter while it is equipped. In dark rooms the screen edges lift one notch.
- **Passive:** +10% all damage. **Sunbearer:** the hero starts every run with **1 free Legendary ability pre-equipped**, chosen from a pool of 6 build-defining Legendaries (multishot, ricochet, fire trail, frostbind, lifesteal aura, summon ally). Pool weighted to match strongest archetype detected on prior runs.
- **Active (every 35s):** **Suncall.** Channels for 1s, then a beam of light descends on the boss/strongest enemy for 800% ATK, dispels all enemy buffs in 8m, and grants the hero **invulnerability for 1.5s**.

### Per-rarity stat curve

| Pet Level | DMG% | Free Legendary Tier | Suncall |
|---|---|---|---|
| 1 | +5% | 1 free | 500% ATK |
| 20 | +7% | 1 free | 700% ATK |
| 40 | +10% | 1 free | 950% ATK |
| 60 | +13% | 1 free | 1250% ATK |
| 80 | +16% | 1 free | 1600% ATK |

### Ascension stars

| Star | Unlock |
|---|---|
| 1★ | Base. |
| 2★ | Invulnerability +0.5s. |
| 3★ | **Behavior:** Reveals which of the 3 offer NPCs (Valkyrie/Devil/Angel equivalents) will appear next room. |
| 4★ | Suncall cooldown -5s. |
| 5★ | Free starting Legendary can be **player-selected** from the pool (no longer auto-picked). |
| 6★ — **"Dawnchild"** | Final Form. Hero gains **a second permanent ability slot for the first room of every run**. Suncall now hits **all enemies** on screen (not just the strongest) for 50% of its damage. |

- **Build affinity:** All 8. By design: this is the "lift any build" Spirit. Crucially **not** a strict upgrade of Aurorhart — Solchild gives front-loaded power (free Legendary opener), Aurorhart scales mid- and late-run. Different shapes, similar AUC.
- **Unlock path:** **Anniversary event only.** Two paths:
  - Free path: 800 anniversary tokens (typical F2P earn over event = ~600 tokens, so anniversary card or one bundle bridges).
  - Whale path: anniversary mega-pack $74.99 includes 1 Solchild + ascension materials.
  - Once obtained, can be ascended over the year using duplicates from the next anniversary event or shard conversion.

---

# Gacha Banner Spec — "Spirit Wish"

The Spirit gacha runs on its own banner, separate from the Hero gacha (per `04-progression-and-economy.md` §5). Rates and pity match the **Hero Wish** banner structure for player legibility.

| Rule | Value |
|---|---|
| **Currency** | Gems → Spirit Wish Tokens (1 pull = 280 gems = 1 token, or 10 pulls = 2,520 gems = 9 tokens + 1 bonus) |
| **Rate — Common** | 60% |
| **Rate — Rare** | 28% |
| **Rate — Epic** | 10% |
| **Rate — Legendary** | 1.8% |
| **Rate — Mythic** | 0.2% (Solchild excluded — anniversary-only) |
| **Soft pity** | 10-pull guarantees Epic+ (carries across the banner; resets on Epic+ pull) |
| **Hard pity** | 50-pull guarantees **Legendary or Mythic** (resets on Legendary+ pull) |
| **Featured Spirit** | One Epic or Legendary Spirit is "rate-up" each banner. On a Legendary roll, 50% chance it is the featured Spirit; if not, the next Legendary on that banner is guaranteed to be it (mercy carries within banner). |
| **Duplicates** | Same Spirit duplicate converts to **30 pet-shards** (matches hero gacha conversion). 60 pet-shards = 1 ascension star (matches hero shard ladder). |
| **Banner cadence** | 14-day rotation, alternating Epic-featured (most banners) and Legendary-featured (every 4th banner). |
| **Off-banner rate-up** | Legendary featured banner: rate-up Legendary's pull rate is 0.9%, other Legendary shares the remaining 0.9%. |
| **Rates published** | Gacha entry screen displays all rates per Apple compliance / EU readiness, matching hero gacha policy. |
| **No cash-only Spirits at launch** | All Epic+ banner Spirits can also be earned through anniversary token shop, season battle pass rewards, or event milestone shops over time (slow free path). |

**Featured rotation at launch (first 90 days):**

| Banner | Days | Featured |
|---|---|---|
| Banner 1 (launch) | 1–14 | **Sunkin Carp** (Epic) |
| Banner 2 | 15–28 | **Ember Spider** (Epic) |
| Banner 3 | 29–42 | **Hollow Owl** (Epic) |
| Banner 4 (Legendary) | 43–56 | **Aurorhart** (Legendary) |
| Banner 5 | 57–70 | **Sunkin Carp** rerun |
| Banner 6 | 71–84 | **Ember Spider** rerun |
| Banner 7 (Legendary) | 85–98 | **Dimcaller Raven** (Legendary) |
| Anniversary (annual) | year mark, 10-day window | **Solchild** (Mythic) — token-shop path + mega-pack path |

---

# Synergy Table — Spirits × Hero Archetypes

How well each Spirit pairs with each of the 8 hero archetypes from `design/03-world-and-theme.md`. Score legend:
**S** = signature pairing (build-defining), **A** = strong, **B** = solid generalist value, **C** = weak / off-style.

| Spirit | Dawnbow | Wardlight | Spinekind | Embercaller | Frostshard | Prismborn | Wraithsworn | Sunkin Heir |
|---|---|---|---|---|---|---|---|---|
| Glimwing | **A** | B | B | B | B | **A** | B | B |
| Spinekitten | **A** | B | **S** | B | C | B | B | B |
| Mosslet | B | **S** | C | B | B | C | **A** | B |
| Prismfox | **A** | B | B | B | B | **S** | B | B |
| Wraithpup | B | B | B | **A** | B | C | **S** | B |
| Frost Yeti-cub | B | **A** | C | C | **S** | B | B | B |
| Hollow Owl | **A** | **S** | B | B | B | B | B | **A** |
| Ember Spider | B | B | B | **S** | C | B | **A** | B |
| Sunkin Carp | B | B | B | B | B | **A** | B | **S** |
| Aurorhart | **A** | **A** | **A** | **A** | **A** | **A** | **A** | **A** |
| Dimcaller Raven | **A** | B | **A** | B | B | B | **S** | **A** |
| Solchild | **A** | **A** | **A** | **A** | **A** | **A** | **A** | **A** |

**Non-redundancy**: every Spirit has at least one **S** or **A** column it owns, and no row is dominated by another. Adjacent-flavor pairs are differentiated by *verb*, not magnitude — Glimwing (pickup utility) vs Prismfox (burst multishot); Mosslet (passive sustain) vs Frost Yeti-cub (active CC); Hollow Owl (single-target nuke) vs Dimcaller Raven (AoE debuff); **Aurorhart scales through the run** (resonance stacks per room) while **Solchild front-loads** it (free Legendary in room 1) — different power curves, similar AUC.

---

# Balance Checks

### 1. Power budget — Spirits sum to ~5% at endgame

A maxed Legendary Spirit at L80 6★ provides ~+12% damage (passive) and a triggered active firing ~12× per 5-min run. Passive contributes ~2–3% of total combat power; active contributes ~3–4%. Sum: **~5%**, matching the §2 budget. Median across rarities equipped: Common 3%, Rare 4%, Epic 4.5%, Legendary 5%, Mythic 6%. The 5% target is preserved at the **median**, with Mythic occupying its expected ceiling.

### 2. No Spirit active outclasses a Legendary in-run ability

Reference: 15 Legendary in-run abilities at launch (per `05-launch-scope.md`), typically granting permanent run-wide effects like *"+30% damage for the run"* or *"+2 projectiles permanent."* Spirit actives are **time-windowed** equivalents at lower magnitude. Spot checks:

- Mosslet's Greenward (8%/s for 4s every 25s) < Legendary Holy Aura (10%/s permanent).
- Prismfox's burst (+2 projectiles for 4s) < Legendary Multishot (+2 permanent).
- Wraithpup's Soulbite (15% heal/cast) < Legendary Lifesteal Aura (8% lifesteal permanent).
- Hollow Owl's Eyestrike (820% ATK, 26s CD) ≈ one cast of a Legendary nuke; far less DPS over time than a sustained Legendary Energy Beam.
- **Solchild's Suncall** (1600% ATK + invuln, 35s CD) is the strongest single active but trails a sustained Legendary Energy Beam in cumulative damage over the same 35s window. Mythic-gating + anniversary-only acquisition justifies the ceiling.

Verdict: Spirits **augment** in-run builds; they never **substitute** for Legendary picks.

### 3. ≥3 free-path Spirits remain endgame-competitive

Free-path Spirits (Common + Rare): Glimwing, Spinekitten, Mosslet, Prismfox, Wraithpup, Frost Yeti-cub. Of these, **four are endgame-competitive in at least one meta build at 6★**:

- **Spinekitten** — Stormpelt's lightning stack is a Spinekind build keystone.
- **Mosslet** — Eldermoss's persistent Greenward is a guild-boss MVP for Wardlight/Wraithsworn sustain.
- **Frost Yeti-cub** — Avalanche Calf is the cheapest freeze-stack source, required for Frostshard's signature build.
- **Glimwing** — Wakemoth's Lucent Trail scales hard in Tower/Survival modes.

Exceeds the 3-minimum design target. No archetype except Sunkin Heir requires a gacha Spirit for its signature build — and Sunkin Heir's signature Spirit (Sunkin Carp) is the **featured Epic on the launch banner**, reachable in ~10 pulls via soft pity. F2P-accessible across all 8 archetypes.

### 4. Active cooldown sanity

Cooldown range across the 12 Spirits: **18–35s**. Per 5-min run, every Spirit fires **8–16 times** — enough to feel agentic, not enough to flood the portrait-scale screen (preserves Pillar 8 readability). Slower CDs (26–35s) are reserved for the highest-impact actives (Hollow Owl, Dimcaller Raven, Solchild).

---

# Summary

12 Spirits ship at launch: **3 Common, 3 Rare, 3 Epic, 2 Legendary, 1 Mythic**. Each contributes a passive bonus and a triggered active on an 18–35s cooldown. Together they sum to a 5% share of the endgame power budget, no Spirit active outclasses a Legendary in-run ability, and 4 of the 6 free-path Spirits remain endgame-competitive — exceeding the design target of 3. Sunkin Heir is the lone archetype with weaker free-path Spirit support and is mitigated by the launch banner featuring Sunkin Carp.

The gacha banner mirrors the Hero gacha (10-pull Epic+ soft pity, 50-pull Legendary hard pity, 30 pet-shards per duplicate, all rates published). Mythic Solchild is anniversary-only, with both a free token-shop path and a $74.99 mega-pack path — keeping the "no cash-only" pillar intact.
