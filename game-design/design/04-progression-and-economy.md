# Progression & Economy — Lucent

Locked-in framework. Specific numbers tuned by wave-2 balance-curves agent.

## 1. Currencies (6, no more)

| Currency | Type | Faucets | Sinks | Notes |
|---|---|---|---|---|
| **Gold** | Soft | All runs, kills, shop sale | Talent upgrades, gear upgrades, ability rerolls in-run | Inflation expected; sinks scale with player level. |
| **Gems** | Hard | IAP, rare quest rewards, achievements, milestones | Energy refill, gacha pulls, premium shop, battle pass tier-skip | Cap exists at gem-pack sizes; no inventory cap. |
| **Lucent Shards** | Event/duplicate | Hero gacha duplicates, event rewards | Hero ascension, hero unlock from shop | Renamed from Archero's "scrolls." Hero-specific shards convert at 1 hero shard = N generic Lucent Shards. |
| **Embers** | Gear-upgrade | Drop in run, gear salvage, weekly missions | Gear leveling, fusion, reforge | Faucet > sink early; sink-heavy at endgame. |
| **Sigil Dust** | Rune-upgrade | Rune chests, weekly boss, daily quests | Rune leveling, enchanting | Endgame-skewed faucet. |
| **Pass Points** | Battle-pass-progression | Daily/weekly quests, run completion | Battle pass tier advancement | Tier-skip purchasable with gems. |

**No more than 6 currencies at launch.** Anything else is folded in (e.g., Hero Tokens become Lucent Shards; PvP currency is Pass Points equivalent until PvP needs its own).

## 2. Progression layers (9 total — "The Lucent Spiral")

From `research/games/progression-systems.md`. Numbers tuned later.

| # | Layer | Power-budget share | Caps |
|---|---|---|---|
| 1 | **Hero Level** | 12% | Hero level 1–80 at launch, raised by patch. |
| 2 | **Hero Mastery Path** | 8% | Per-hero passive points unlocked at level 20/40/60/80. |
| 3 | **The Inscription** (talent grid) | 20% | Flat 5×4 grid; each node has 20 levels at launch; raised by patch. |
| 4 | **The Forge** (equipment) | 35% | 6 slots, 6 rarities (Common → Chaos), per-rarity 1→20 levels, fusion across rarities. |
| 5 | **Resonance** (set bonuses) | 12% | 4-piece set unlocks 2/4-piece bonuses. |
| 6 | **Sigils** (runes) | 8% | 3 rune slots, 4 categories, enchanting on reroll. |
| 7 | **Spirits** (pets) | 5% | 1 active pet slot, 6 rarities, level + ascension. |
| 8 | **Account Tier** | (gates only) | Unlocks features, never directly grants power. |
| 9 | **Awakened** (soft prestige) | uncapped ceiling | Optional, post-level-cap; converts level XP overflow to permanent +0.1% stat per Awakening. |

**Power-budget invariant**: no layer exceeds 35% of total power at any cap. No single-source-dominant builds.

## 3. Time-to-cap targets (F2P)

| Layer | Reach cap (F2P) |
|---|---|
| First hero to Level 60 | ~30 days |
| Inscription full at launch cap | ~6 months |
| First piece of Legendary gear | ~14 days |
| First piece of Mythic gear | ~3 months |
| First Chaos piece | ~12 months |
| Awakened activated | ~9 months |
| "Done" with the game | Never. Year 1 player still has clear next goals. |

Payers compress these by 2–4×, not 10×. We never sell a cap-skip.

## 4. Energy system

- **Cap**: 30
- **Regen**: 1 per 12 minutes (full cycle: 6 hours)
- **Costs**: Campaign 6 / Tower 3 / Survival 4 / Daily Dungeon 0 / PvP 0
- **Refill**: Watch ad (+5, up to 4x/day), spend gems (50 → +30), Monthly Card grants daily refill, Battle Pass premium grants weekly refill
- **Soft-cap behavior**: energy can be banked past cap from rewards (event tokens convert to overflow energy, capped at 60).
- **Why looser than Archero**: research shows the 20-cap / 12-min Archero economy is the #1 source of churn. We give slightly more headroom while preserving the gem-refill business model.

## 5. Monetization SKUs (launch)

| SKU | Price | Refresh | Notes |
|---|---|---|---|
| **Beacon Pack** (starter, 48h) | $0.99 | Once per account | Heavy value, drives first-purchase. |
| **Daily Deal** | $0.99 | 24h | Random rotating; reveals after day 1. |
| **Daily Premium Deal** | $2.99 | 24h | Higher-value rotation. |
| **Privilege Card** (sub) | $4.99 / 30d | Subscription | +50 gems/day, +1 daily reroll, ad-free banner. |
| **Monthly Card** | $9.99 / 30d | Non-renewing | The evergreen anchor: +200 gems immediate, +100/day for 30d. |
| **Battle Pass — Lite** | $4.99 / 45d season | Per season | Unlocks paid track. |
| **Battle Pass — Premium** | $14.99 / 45d season | Per season | Lite + 5-tier skip + cosmetic. |
| **Battle Pass — Buy a Hero** | $39.99 / season | Per season | All of the above + direct unlock of season hero. |
| **Gem Packs** | $0.99 → $99.99 | Always | First-purchase doubler on every tier. |
| **Hero Gacha — Wish Banner** | gems / pulls | Rotating banner every 14–21 days | 10-pull soft pity, 50-pull hard pity (Mythic guaranteed). |
| **Event Pack — Tournament** | $4.99–$19.99 | Per event | Limited 5-day window. |
| **Anniversary Pack** | $24.99–$74.99 | Annual | Once per year, bundle of exclusives. |

**No cash-only heroes at launch.** Premium hero packs only accelerate; all heroes also obtainable via shard farming on a slow free path.

## 6. Ad placements (rewarded video only)

Per `research/monetization/f2p-patterns.md` and `research/monetization/liveops-retention.md`.

| Slot | Reward | Cap |
|---|---|---|
| Free chest (home screen) | 1 chest with gold / dust | 4/day |
| Energy +5 | Energy | 4/day |
| Revive (mid-run) | Continue current run | 2/run |
| Post-run x2 rewards | Doubles gold + drops | Unlimited |
| Daily lucky spin | Free spin | 1/day |
| Battle pass +Pass Points | Bonus Pass Points | 1/day |
| Event milestone unlocker | Event currency | per-event |

**No interstitial ads anywhere.** Mandatory ads suppress D7 retention. Banners suppressed for any user with active IAP entitlement.

## 7. Gacha rates (published in-app)

| Rarity | Wish (Hero) | Forge (Gear) |
|---|---|---|
| Common | 60% | 50% |
| Rare | 28% | 30% |
| Epic | 10% | 15% |
| Legendary | 1.8% | 4% |
| Mythic | 0.2% | 0.95% |
| Chaos | — | 0.05% |

- **Wish banner soft pity**: 10-pull guarantees Epic+; 50-pull guarantees Mythic; rate-up hero has 50% chance on Mythic, mercy guarantee on next.
- **Duplicates**: convert to hero-specific shards (1 dup = 30 shards; 60 shards = 1 ascension star).
- **Rates published** at gacha entry screen; same in every jurisdiction (Apple compliance + future-proofing).
