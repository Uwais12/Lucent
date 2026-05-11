# Meta-Progression Systems in Archero-Style Mobile Games

A research catalog of the persistent, between-run progression layers used by the Archero genre (Archero, Archero 2, Survivor.io, Wittle Defender, and adjacent action-roguelite mobile titles), and how those layers stack to deliver years of perceived progression. Closes with a recommended layered stack for our iOS Archero-style game.

---

## 1. Hero / Character Level

The per-hero level is the *innermost* progression loop. Players earn hero XP from runs (chapter clears in particular), and each hero level grants flat stat bumps to HP and ATK plus, occasionally, a passive ability unlock.

- **Archero (original)**: A single avatar levels up. XP per chapter scales — chapter 7 grants meaningfully more XP than chapter 2 — so the level grind accelerates as content gates open. Each level gives small flat HP/ATK and is the trigger for talent points.
- **Archero 2**: Each hero (Otta, Seraph, Helix, Nyanja, Alex, etc.) levels independently from shards. Shards are gated drops; unlocking a hero costs 50 shards and upgrades use exponentially more. Star levels (1–10) are the long pole; "Resonance" passive slots unlock at 3-star and 6-star and let a hero borrow another hero's signature skill, with the borrowed bonus scaling with the *donor's* star level. Level 3 resonance skill requires a 5-star donor; level 4 requires 8-star.
- **Survivor.io**: Character level uses dedicated Hero EXP, with characters (Kit, Akimbo Kate, Metallia, etc.) gaining stats and unlocking weapon-specific passives.
- **Wittle Defender**: Five hero slots per team. Hero EXP comes mainly from Daily Challenges (Golden Rat Hole, Goblin Ground, Boss Challenge). Heroes have classes (Fighter, Mage) that gate which gear set bonuses help them.

**What scales**: HP, ATK, and (in rarer cases) crit, attack speed, or move speed. Hero level is typically the *smallest* contributor to total combat power once mid-game hits — it is the early-game runway, not the endgame ceiling.

---

## 2. Account Level

A separate, run-agnostic level tied to total XP earned. Used primarily as a *feature gate* rather than a raw power source.

- **Archero 2** gates Hero Assist behind Chapter N18 + Account Level 50. Account level also gates daily quest tiers, arena modes, and certain events.
- **Survivor.io** uses player level to unlock Ender's Echo, Borderlands, evolution slots, and gear-design dailies.
- **Archero** uses account level to cap how many talent rolls you may purchase per level (after 15 talents owned you only get one upgrade *per* account level).

**Design role**: Account level is a *content unlock* axis. It paces feature reveal — drip-feeding new shops, modes, currencies, and progression systems over days/weeks so the new player isn't overwhelmed and the veteran always has the next box to open.

---

## 3. Talent Tree / Meta Talents

The "screen of permanent +5% buffs." Archero pioneered the model; the entire genre has copied it.

- **Archero (original)**: 12+ talents in three rarities (Common / Rare / Epic), each with max levels from 1 to 20. Examples: HP (+200 first, +100/level), ATK (+50 first, +25/level), ATK SPD (+2% first, +1%/level), HP Recovery, Block, Hero Power Up, Rune Power Up. Upgrades cost **gold**, and crucially each upgrade is **random** — the player spends a fixed gold price and the game rolls which unlocked talent it improves. This converts gold into a steady drip of permanent power. **No branching tree** — it's a flat grid where every node is independently leveled.
- **Archero 2**: Same flat grid, modernized. Permanent stat talents (HP%, ATK%, crit, dodge, etc.) shared across all heroes.
- **Survivor.io**: "Skill Inheritance" + permanent stat upgrades function as the talent layer. Less tree-shaped, more linear.
- **Wittle Defender**: Rune Shop unlocks/levels passive squad-wide buffs between dungeons; closest thing to a talent screen.

**Branching vs. linear**: The dominant pattern is **flat / non-branching** with each node having a long upgrade ladder (20+ levels). Branching trees exist in deeper RPG hybrids but are rare in pure Archero clones because they cost UI complexity and constrain monetization. The flat grid lets every node be a separate gold sink.

**Endless growth lever**: Talents are typically the *highest-ceiling* meta system. Many top accounts in Archero have talents that alone account for +200% HP and +150% ATK after years of play — the talent screen is what makes the genre "endless."

---

## 4. Equipment Progression

Equipment is the densest progression layer — it's typically 40–55% of total combat power at endgame and absorbs the most player attention.

### 4.1 Rarity Tiers

The genre-standard ladder (color-coded almost identically across all titles):

| Tier | Color | Example games |
|---|---|---|
| Common / Normal | Gray | Archero, Archero 2, Survivor.io |
| Uncommon / Fine / Good | Green | All |
| Rare / Better | Blue | All |
| Epic / Excellent | Purple | All |
| Legendary | Gold / Yellow | All |
| Mythic | Red | Archero 2, Survivor.io |
| Chaotic / S-Grade / Eternal | Iridescent / Gray-white | Archero 2 (Chaotic), Survivor.io (Eternal) |

Archero 2's full Blacksmith ladder reads Normal → Fine → Rare → Epic (+1/+2) → Legendary (+1/+2/+3) → Mythic (+1/+2/+3/+4) → Chaotic. Each "+N" step is a separate upgrade tier, so the *effective* ladder has 15–18 stops, not 7. This is critical: it lets one rarity sustain weeks of grind.

### 4.2 Upgrade / Level System

Per-slot upgrades using a fungible material:
- **Archero 2**: Gear Scrolls + Gold. Upgrades attach to the slot — when you swap to a higher-rarity weapon in the same slot, your scroll levels carry over (huge for player retention; reduces upgrade regret).
- **Survivor.io**: Equipment Designs + Gold; designs are item-type-specific, which creates farming targets.
- **Archero**: Gold per upgrade level on each item.

### 4.3 Fusion / Merging

Combine duplicates to advance rarity. Standard recipe is 2-into-1 of the same tier:
- Normal × 2 → Fine
- Fine × 2 → Rare
- Rare × 2 → Epic
- … etc.

Chaotic tier in Archero 2 requires **14 matching S-grade pieces**, which translates to **~266 epic-quality drops** to fuse a single Chaotic item. This is the endgame moat — single items can take a F2P player 4–8 months.

### 4.4 Enchanting (Affixes)

Add randomly-rolled bonus stats on top of base item stats. Re-rollable using a dedicated currency.
- **Archero 2 Runes**: Unlocked at Epic +2. Farm "Enchantium" in the Shackles Jungle; re-roll for the affix you want. Affixes scale dramatically by rarity — "Boss DMG" scales from a few % at green to massive multipliers at red.
- Enchant affix slots typically open one-by-one as item rarity climbs, so a Mythic item has 3–4 affix lines, a Chaotic has 5–6.

### 4.5 Sets & Set Bonuses

Six-slot sets where wearing 2/4/6 pieces grants a thematic buff.
- **Archero 2 sets**: Oracle (combo), Dragon Knight (explosion / meteor), Griffin (close-range), Echo (combo), Decisiveness (melee), Destruction (flame shield). 2-piece is usually a stat % bump; 6-piece is a unique mechanic that defines a build.
- Sets are the dominant **build-diversity** lever — players reroll entire equipment loadouts around 6-piece bonuses, which creates an excuse to push duplicate gear sets and re-engage the upgrade loop on a parallel item line.

### 4.6 Reforging

Less common than enchanting but used in Wittle Defender as "Refining" gear for additional sub-stats. Functionally a second affix layer to deepen the per-item progression.

---

## 5. Pet / Companion Progression

A parallel hero-like system that orbits the main hero.

- **Archero "Spirits"**: 1–2 spirit slots; each spirit is a separate gachable entity with its own level (scrolls), rarity, and active/passive effect (shoot extra projectiles, drop bombs, etc.). Spirit slots count as equipment for some calculations.
- **Archero 2**: Sub-pets and "Sprites" attach to runes/heroes; level via shards much like heroes.
- **Survivor.io**: Pet system added in later updates; pets level and evolve via duplicate shards.

**Common verbs**: *level* (XP/shards), *evolve* (rarity bump consuming dupes), *ascend* (star up at evolution max for an aura/passive). Pets typically contribute 5–10% of total power but are a high-value engagement hook because they're collectible.

---

## 6. Skill Trees / Mastery

Per-weapon or per-hero mastery is the "build identity" layer.

- **Archero 2** doesn't ship a deep weapon-mastery tree per se; skill identity comes from the run's in-run draft + the hero's signature. The Resonance slot acts as a quasi-skill-slot meta-upgrade.
- **Survivor.io** offers **Skill Inheritance** — a permanent system where leveling certain skills unlocks them as starting picks or biases the draft pool. The genre is gradually adopting "you start a run with X already unlocked" as a meta-skill layer.
- **Wittle Defender** has hero-specific "skill gems" upgraded between runs using a dedicated currency.

The clearest design trend: **per-character "Specialization" or "Mastery"** systems where each hero has a small (3–5 node) personal tree that unlocks at certain star levels. These are growth shelves the player crosses as they unlock more heroes.

---

## 7. Achievements & Milestones

Achievements convert *implicit play* into *explicit progression*, distributing premium currency and unlocking cosmetic / functional rewards.

- **Archero / Archero 2**: Daily Quests (~30 min/day) drop gems and keys; Weekly Quests award Wish Coins and Chromatic Chest keys at 80/100 points. Achievement milestones (clear chapter N, fuse N items, reach Mythic gear) grant lump-sum gems.
- **Otta's Treasure** and **Island Treasure Hunt** in Archero 2 are timed milestone-points events: every play action earns points, and points cross thresholds for premium rewards.

**Design role**: Achievements double as both a soft tutorial ("the game is telling me what to do next") and a F2P gem firehose that funds gacha pulls. They are *not* a primary power source but they fuel every other system.

---

## 8. Ascension / Prestige

Hard reset for permanent multiplier. Less common in pure Archero clones than in idle games — but the genre is adopting it.

- **Archero 2 Resonance** has prestige-flavored effects: a maxed-star donor hero passively buffs other heroes, encouraging "build them all up."
- **Survivor.io** late-game has "Skill Awakening" and "Eternal" tier mergers that act as soft prestiges.
- **Loop Survivor / Zorn Survivor / idle-roguelite hybrids**: Explicit "Ascend" / "Rebirth" buttons that reset hero level and refund a higher-tier currency.

The genre is converging on **soft prestige** — instead of a button that resets everything, you get parallel "Tier 2" copies of the systems (e.g., Chaotic gear with its own +N levels, post-100 talent nodes, "Eternal" tech parts). This avoids the regression sting while preserving the multiplier benefit.

---

## 9. Soft Caps and Walls

The genre lives or dies by its pacing curves.

- **Chapter walls**: At Archero chapter 7 and Archero 2 chapter ~20 there's a known difficulty spike. Players must return to meta-progression for 1–3 days before pushing again. These walls are *intentional* — they convert "playing the run" into "playing the meta-screen."
- **Soft caps via diminishing returns**: Talent level cost scales superlinearly. A talent at level 1 might cost 1k gold, at level 30 it might cost 250k. Same +1% bonus, vastly more grind. Players self-pace because the *next* upgrade always feels obtainable but the *next ten* feel distant.
- **Rarity walls**: Mythic→Chaotic is the canonical wall (266 epic items for one Chaotic in Archero 2). The wall is intentionally absurd; it gives whales something to spend on and F2Ps a six-month north star.
- **Account-level gates**: Force the player through other systems before unlocking the next deep one. (e.g., must clear Chapter 5 to unlock Runes.)

**The trick**: Make the *first 30 minutes* feel like reading a magazine (constant unlocks, levelups, dings) and the *first 30 days* still produce a meaningful upgrade *every session* even though each upgrade is now 0.1% of the player's total power.

---

## 10. Power Budget

Across the genre, the rough distribution of *combat power* at mid-to-late game is:

| Source | Share of Total Power | Notes |
|---|---|---|
| Equipment (slot upgrades + rarity) | **35–45%** | Largest single source. Mythic→Chaotic alone can be 15–20%. |
| Set Bonuses (build identity) | **10–15%** | Multiplicative with gear; defines build. |
| Talents (meta tree) | **15–25%** | Persistent, slow, infinite ceiling. |
| Hero Level + Stars + Resonance | **10–15%** | Front-loaded; matters most early. |
| Runes / Enchantments / Affixes | **8–12%** | Multiplicative; major mid-game power spike. |
| Pets / Spirits / Companions | **5–10%** | Diversification + collectibility. |
| In-Run Skills (drafted per run) | n/a | Multiplicative *within* a run; not a meta source. |

These numbers are inferred from community datamines and DPS calculators for Archero, Archero 2, and Survivor.io. The exact split depends on the player's progression stage:
- **Day 1–7**: Hero level + early talents dominate (50%+).
- **Day 30–90**: Gear and sets take over.
- **Day 90+**: Runes, Chaotic gear, and the long-tail of talent levels carry growth.

---

## 11. Time-to-Reach-Cap Analysis

How long to "max" the major systems as F2P, drawn from community reporting:

| System | F2P time to *useful* | F2P time to *theoretical max* |
|---|---|---|
| Hero level (single hero) | ~2 weeks | ~2 months |
| Account level | ~1 month to mid-game gates | 6–12 months to soft cap |
| Talent screen (all talents owned) | 2–4 weeks | **Effectively never** (cap rises with patches) |
| Gear: Epic full set | 2–4 weeks | n/a |
| Gear: Legendary full set | 2–3 months | n/a |
| Gear: Mythic full set | 6–9 months | n/a |
| Gear: Chaotic full set | **1.5–3 years** | **Never** without spending |
| All heroes 6-star + Resonance | 1+ year per hero, 5+ years for roster | Endless |
| Runes maxed with target enchants | 6–12 months | Endless (re-roll RNG) |

**What keeps "endless" games endless**:
1. **Infinite talent ceiling** — cap rises with each patch, so the screen is always upgradable.
2. **Compound rarity ladders** — every "tier" has its own +N sub-grid (Mythic +1/+2/+3/+4 then a fresh ladder at Chaotic).
3. **Parallel collectible axes** — heroes, pets, runes, set pieces all level independently, so "max one" still leaves dozens of other tracks open.
4. **Drip currencies** — premium currencies (Wish Coins, Enchantium, Gear Scrolls) are weekly-capped, so even with infinite gems the player is gated by time.
5. **Seasonal additions** — new heroes, new sets, new chapters every 4–8 weeks. Patches reset the chase.

The result is a system where Day 1 feels generous, Day 100 feels rich, and Day 1000 still gives one meaningful upgrade per session.

---

## Recommendation: Layered Progression Stack for Our iOS Archero-Style Game

Working title for the stack: **"The Lucent Spiral"** — six concentric loops, all of which produce a tangible upgrade per session, with most loops technically uncapped.

### Recommended Layers (innermost to outermost)

| Layer | In-Game Name | Mechanic | % of Total Power | F2P Time-to-Engage |
|---|---|---|---|---|
| **L1** | **Hero Level** | XP from runs; flat HP/ATK per level; passive at 10/25/50/75 | 10% | Day 1 |
| **L2** | **Mastery Path** | Per-hero linear 5-node tree, unlocks at star levels | 10% | Day 3 |
| **L3** | **The Inscription** (Talent Grid) | Flat 24-node grid, each node levels 1→∞ with gold. Gold is the run's main drop. | 20% | Day 1 (first upgrade by minute 10) |
| **L4** | **Forge** (Equipment) | 6 slots × 7 rarities × +N sub-levels. Fusion 2-for-1. Per-slot scroll upgrades carry across items. | 35% | Day 1 (first drop in run 1) |
| **L5** | **Resonance** (Set Bonuses) | 6-piece sets with 2/4/6 bonuses. 8 set themes at launch; 6-piece is build-defining. | 10% | Day 4 (first Rare items) |
| **L6** | **Sigils** (Runes + Enchants) | Equippable rune slots unlocked at Chapter 5. Affix re-roll currency. | 8% | Day 7 |
| **L7** | **Spirits** (Pets) | 2 spirit slots; each spirit gachable, levels, evolves, ascends at max. | 7% | Day 5 |
| **L8** | **Account Tier** | Pure unlock axis; gates features, not stats. Reset-proof. | 0% (gates only) | Day 1 |
| **L9** | **Ascension** (Soft Prestige) | At hero star 10, unlock "Awakened" tier — parallel +N ladder above Chaotic, post-cap talent nodes. | Endless multiplier | Month 6+ |

### Power Budget Sanity Check
Adding L1–L7: 10 + 10 + 20 + 35 + 10 + 8 + 7 = **100%**. L8 and L9 sit outside the budget as access/ceiling levers.

### Pacing Targets
- **Session 1 (10 min)**: Hero level 5, first Common→Uncommon fusion, first Inscription node unlocked, first Spirit awarded by Achievement.
- **Day 1 (3 sessions)**: All 6 gear slots filled, 5 Inscription nodes leveled, Hero Level 10, first Set 2-piece bonus active.
- **Week 1**: Full Rare gear set, ~15 Inscription levels, Spirit at Uncommon, Chapter 5 (Sigils unlock).
- **Month 1**: Full Epic set with one 6-piece bonus, Sigils at Epic+2 with first enchant, Mastery Path tier 2 on main hero.
- **Month 3**: Legendary gear set, mid-tier Sigils, 2nd hero at 3-star.
- **Year 1**: First Mythic items, working toward Awakened tier, full roster of 5+ heroes at 3-star.
- **Year 1+**: Awakened tier opens; the *real* endgame begins. Patch cadence (new chapters / sets / heroes every 6 weeks) refreshes the chase.

### Why This Stack Works

1. **Every loop produces a session-level upgrade.** New players hit something in L1, L3, L4 every run. Veterans hit something in L4, L5, L6, L9.
2. **The flat grid (L3) is the secret weapon.** Gold is the main run drop, so *every* run produces measurable permanent progress, even when no gear drops.
3. **Set bonuses (L5) gate build diversity.** They are the excuse to pursue a second and third full gear set — multiplying the gear grind ceiling.
4. **Sigils (L6) and Spirits (L7) are mid-game power spikes** that re-engage players around Week 2 when initial gear progression slows.
5. **Awakened tier (L9) keeps Year 2+ players engaged** without forcing a regression-style prestige. They keep their stuff and unlock a parallel tier on top.
6. **Account Tier (L8) drip-feeds the *systems themselves*** — players don't see Sigils until they've mastered Forge, don't see Awakened until they've mastered Resonance. This is the genre's most-copied retention mechanism and we should not skip it.

### What to Avoid

- **Branching trees in L3.** Players hate respec costs; flat grids monetize better.
- **Full prestige resets.** Soft prestige (parallel tiers) outperforms hard resets in retention.
- **One-source-dominant power.** If gear is >55% of power, players who get bad drops quit. Diversifying across 6 layers means a bad gear week is offset by Inscription and Mastery gains.
- **Uncapped premium currency velocity.** Even with infinite gems, weekly-capped specialty currencies (Enchantium analog, Resonance shards) must throttle the whales so the F2P gap stays climbable.

---

## Sources

- [Archero Talents Guide, Upgrade Order and Costs](https://empyreanrule.com/archero/talents/)
- [Talent | Archero Wiki | Fandom](https://archero.fandom.com/wiki/Talent)
- [Archero Talents List | Pro Game Guides](https://progameguides.com/archero/archero-talents-list/)
- [Gear - Archero 2 Wiki and Guides](https://archero-2.game-vault.net/wiki/Gear)
- [Runes - Archero 2 Wiki and Guides](https://archero-2.game-vault.net/wiki/Runes)
- [Currency and Items - Archero 2 Wiki and Guides](https://archero-2.game-vault.net/wiki/Currency_and_Items)
- [Ultimate Beginners Guide - Archero 2 Wiki](https://archero-2.game-vault.net/wiki/Guide:Ultimate_Beginners_Guide)
- [Complete Archero 2 Tier List | Pro Game Guides](https://progameguides.com/archero-2/archero-2-tier-list/)
- [Archero 2 Tier List May 2026](https://www.propelrc.com/archero-2-tier-list/)
- [Ultimate Resonance Guide Archero 2](https://roonby.com/2025/03/12/ultimate-resonance-guide-archero-2-how-to-unlock-tips-tricks/amp/)
- [Fusing & Dismantling Equipment | Archero Wiki](https://archero.fandom.com/wiki/Fusing_%26_Dismantling_Equipment)
- [Archero 2 - How To Get Uncommon, Rare, Epic, Legendary, Mythic, and S-Grade Equipment](https://writerparty.com/party/archero-2-how-to-get-epic-legendary-mythic-and-s-grade-equipment/)
- [Survivor.io Skills and Evolution Guide | BlueStacks](https://www.bluestacks.com/blog/game-guides/survivor-io/sio-skills-evolution-guide-en.html)
- [Survivor.io Tech Parts Guide & Ranking](https://www.allclash.com/survivor-io-tech-parts-guide-ranking/)
- [Tech Parts | SurvivorIO Wiki](https://survivorio.fandom.com/wiki/Tech_Parts)
- [Wittle Defender Beginner's Guide | BlueStacks](https://www.bluestacks.com/blog/game-guides/wittle-defender/wdd-beginners-guide-en.html)
- [Wittle Defender Treasures Guide](https://clashiverse.com/wittle-defender-treasures-guide/)
- [Finding the Fun: Archero Part 2 - Progression](https://www.gamedeveloper.com/design/finding-the-fun-archero-part-2---progression)
- [How Archero Shot to the Top — Deconstructor of Fun](https://www.deconstructoroffun.com/blog/2019/8/9/why-archero-banked-25m-but-leaves-25m-hanging-hlx9n)
- [Archero Pet Guide FAQ — Gamezebo](https://www.gamezebo.com/walkthroughs/archero-pet-guide-faq-what-is-the-best-spirit-how-do-i-get-them-and-do-i-upgrade/)
