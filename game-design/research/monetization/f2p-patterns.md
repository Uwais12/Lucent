# F2P Monetization Patterns in Mobile Action-Roguelites

A research catalog of in-app purchase (IAP), ad, and live-ops monetization mechanics used by Archero, Archero 2, Survivor.io, Mighty DOOM, and adjacent action-roguelite titles. Compiled to inform monetization design for a new iOS title in the genre.

Sources: Deconstructor of Fun, Naavik, GameRefinery, Mobile Free To Play, Udonis, Gamigion, Reverse Nerf, Apple App Store guidelines, and developer postmortems.

---

## 1. Executive Snapshot

The action-roguelite genre runs on a **hybrid IAP + rewarded-video** model. Archero pioneered the formula: short, ad-friendly runs as a "hyper-casual" funnel into a deep meta-progression layer that's monetized like a midcore RPG. Survivor.io (Habby) refined it into a "progressive monetization" stack that has now generated over **$500M lifetime IAP** while sustaining **$5-6M/month** three years post-launch. Archero 2 layers in true gacha pity systems imported from Genshin-style design. Mighty DOOM is the cautionary counter-example - strong combat, fatal meta, shut down by Microsoft on Aug 7, 2024 after only ~$10.5M lifetime.

The genre's core lesson: **gameplay must be 100% playable F2P, but the meta-progression (gear, talents, heroes) must be deep enough that whales have something to chase for two years**.

---

## 2. IAP Types - The Full Catalog

| Offer Type | Typical Price | Cadence | Conversion Role |
|---|---|---|---|
| Starter Pack / Beginner Bundle | $0.99 - $1.99 | One-time, 24-48h timer | First-purchase break-the-seal |
| First-Purchase Doubler | Any price tier | One-time per SKU | 2x value on initial buy of each pack |
| Daily Login Bonus (free) | Free | Daily, 7/14/30-day chain | Habit / retention |
| Monthly Card ("Treasure Pass") | $4.99 - $9.99 | 30-day evergreen sub | Best-LTV recurring SKU |
| Weekly Card | $2.99 - $4.99 | 7-day | Lower-friction sub for minnows |
| Battle Pass (Free + Premium) | $4.99 (basic) / $9.99-$19.99 (premium+) | 30-45-60 day seasons | Engagement + recurring spend |
| VIP / Loyalty Tier | Spend-driven, 0-15 levels | Permanent (cumulative XP) | Whale ladder |
| Hero / Weapon Gacha Pull | 60-300 gems / pull, ~$1-$3 | Always-on + rate-up banners | Gear chase / collection |
| Event Pack | $4.99 - $99.99 | 3-14 day limited | LiveOps revenue spikes |
| Hard Currency Packs (gems) | $0.99 - $99.99 (5-7 tiers) | Always | Top-up for whales |
| Resource Bundles (gold/keys/shards) | $1.99 - $49.99 | Always + flash sales | Catch-up SKU |
| Revive / Continue | $0.99 or 60 gems | Per-run | High emotional-moment conversion |
| Energy Refill | $0.99 or 60 gems | Per-stamina cap | Friction unlock |
| Piggy Bank / Gold Vault | $2.99 - $9.99 | Fills passively, one crack | Sunk-cost / endowment effect |

### Detail on each

**Starter Pack** - The single highest-converting IAP in the genre. Archero's Beginner Pack is **$1.99 for 300 gems + 10,000 gold + 5 free revives** (Reverse Nerf). The 24-48h timer is a soft-scarcity device; many games show it on-screen after the first death so the emotional moment aligns with the offer. Deconstructor of Fun has argued these are routinely **underpriced** - high conversion masks lost ARPPU.

**First-Purchase Doubler** - Archero applies a "1st-time bonus" to every hard-currency SKU, not just the cheapest one. Buy the $4.99 pack first, you get +620 gems worth of bonuses; buy the $99.99 pack first, the bonus scales. This rewards whales for spending big on day 1.

**Daily Login** - Free in all top titles. 7-day cycle typical; reward day 7 is always a "wow" (a rare hero shard, a chest key). Card-style UI; visible badge on home screen.

**Monthly Card / 30-Day Pass** - The evergreen workhorse. Pioneered by Clash of Clans' Gold Pass and copied across genres. Pay once, claim daily for 30 days. Total value is typically **5-8x the purchase price** spread over 30 logins, which means it pays for itself only with daily engagement (perfect retention loop). Archero charges **$9.99 / month** for VIP; the article notes a fake-cheap **$2.99 / 3-day** version exists solely as a price anchor to make $9.99 look better.

**Weekly Card** - Same mechanic, lower price ($2.99-$4.99). Captures minnows who won't commit 30 days. Some games stack weekly + monthly.

**Battle Pass** - Two-track season pass. Free track = engagement carrot for non-payers. Premium track = ~70% of total value gated behind a one-time purchase. Archero's Battle Pass is **$4.99 standard / $19.99 advanced** and is reportedly its top-grossing IAP (Reverse Nerf). Survivor.io's pass runs $19.99 and gives 3,000 gems plus other items - more gem value than just buying gems straight, so it's a stealth gem discount with engagement obligation.

**VIP Levels** - Permanent cumulative-spend ladder. Each $1 = 1 VIP point. Higher VIP unlocks daily bonuses, shop discounts, extra inventory slots, exclusive cosmetics. Crucial for whales because the perks compound and are non-resettable.

**Gacha Banners** - Archero 2's chest system: Obsidian (standard), Chromatic (broad rate-up), Mythstone (focused rate-up). Pulls are 60-300 gems each.

**Event Packs** - Time-limited, themed, often tied to LiveOps events. The classic "Spring Carnival" / holiday / collab structure. Highest impulse-purchase rate when the player has a clear short-term goal.

**Hard Currency Packs** - 5-7 escalating tiers with worsening per-gem cost-effectiveness at low end (psychological anchoring) and best value at the top. Standard ladder: **$0.99 / $4.99 / $9.99 / $19.99 / $49.99 / $99.99**.

**Revives & Energy Refills** - High-emotion impulse buys. A revive after a 15-minute run failing 5 seconds from the boss kill is the genre's gold standard for in-the-moment conversion.

**Piggy Bank** - Survivor.io's "Gold Piggy Bank" passively fills as the player earns gems through normal play. To unlock the accumulated stash, you pay $4.99-$9.99. Exploits the **endowment effect** ("those are MY gems"). One of the highest-converting offers in the genre.

---

## 3. Soft vs. Hard Currency Design

### Why two currencies?

A dual-currency system separates **time-spent rewards** (soft) from **money-spent rewards** (hard). It lets you:

1. Reward play generously in soft currency without inflating the gem economy.
2. Run sales and bundles on hard currency without devaluing player effort.
3. Create distinct sinks: soft for grindable upgrades, hard for time-skips and gachas.
4. Maintain psychological distance between "I bought this with $$$" and the friction of every transaction.

### Archero's model (canonical)

| Currency | Role | Earned | Spent on |
|---|---|---|---|
| Gold (soft) | Mass-produced progression fuel | Every run | Talent upgrades, gear fusion, blacksmith |
| Gems (hard) | Time-skip / gacha | Trickle from quests, login, achievements; main IAP | Chests, energy refill, revives, shop |
| Scrolls (utility) | Crafting | Drops | Item upgrade alongside gold |

### Conversion ratios (industry norms)

- $0.99 = ~60-100 gems (entry tier, worst rate)
- $99.99 = ~12,000-15,000 gems (top tier, best rate, often 2x first-buy)
- A single gacha pull: 60-300 gems = effectively $1-$3
- A 10-pull (with pity): 540-2,700 gems = $9-$27, intentionally aligned with monthly card / starter pack price points

### Faucets vs sinks

| Faucets (in) | Sinks (out) |
|---|---|
| Daily login | Gacha pulls |
| Achievements | Energy refills |
| Quest rewards | Revives |
| Login streak | Shop refresh |
| Battle pass | Inventory expansion |
| Rewarded video | Speed-ups |
| Mailbox / events | Cosmetics |

**Rule of thumb**: faucet should fund roughly **one gacha pull every 1-3 days** for non-payers. Less = frustration. More = no spend pressure.

---

## 4. Energy / Lives Systems

Energy is a **pacing device**, not a monetization device. It exists to:

1. Cap session length so players come back tomorrow (retention).
2. Create a low-friction spend opportunity ($0.99 for instant refill).
3. Reduce server load and balance per-day progression.

### Archero's energy system

- ~30 energy cap, regenerates 1 per ~5 minutes (~2.5 hours to full).
- Each chapter run costs energy.
- Refill: gems (premium), rewarded video (1-2 per day), or wait.
- VIP monthly raises the cap.

### Design principles (from Mobile Free To Play)

- **Generous early game** - players should never hit energy wall in first 3-5 sessions.
- **First friction at peak engagement** - around session 5-7, when habit forms.
- **Always offer ad alternative** - removes the "pay to play" perception.
- **Cap purchase value** - don't let whales chain 10 refills back-to-back; throttles play, prevents burnout.

### Skip mechanisms

- **Auto-battle / idle** (Survivor.io "Quick Patrol"): 300 minutes of offline rewards per ad/energy spend. Massive ARPDAU lift.
- **Sweep / clear tickets**: skip replay of a stage you've already cleared.
- **Speed-up tokens**: cut energy regen time.

Lives systems (3 lives, 30-min refresh) are common in puzzle but **not idiomatic for roguelites** - players expect to die a lot in the run, but want the meta-loop ungated. Use energy/stamina at the run level, not the death level.

---

## 5. Ad Monetization

### Rewarded video (RV) - the core ad format

Action-roguelites place RVs at high-emotion, high-value moments:

| Placement | Reward | Cadence cap |
|---|---|---|
| Post-run free chest | 1 small chest | 1-3/day |
| 2x end-of-run rewards | Double gold/XP | Every run, no cap |
| Revive on death | One more life | 1-2/run |
| Free spin / wheel | 1 spin | 1-3/day |
| Gem doubler offer | +N gems | 1/day |
| Shop unlock | Free daily item | 1/day |
| Energy refill | Partial stamina | 2-5/day |

**Best-practice**: cap each RV slot per day, but let the player rotate across 5-8 placements. Average daily RV views per engaged player: **8-15**.

### Interstitial frequency

- Min 60-90s between interstitials.
- Never during a run.
- Skip for first session.
- Skip entirely for any user with an IAP - critical for not eroding LTV.
- Strict cap of 1 per "main menu return" event.

### Offerwalls

Less common in action-roguelites than in idle/casual. If used, hide them deep in a "free gems" menu. Best fit for non-paying retention.

### Mediation networks (iOS, 2025 data)

| Network | iOS Share | Notes |
|---|---|---|
| AppLovin (MAX) | ~37% | Dominant for RV; best eCPMs |
| Unity Ads (LevelPlay) | ~16% | Strong for gaming; SDK is mature |
| Google AdMob | ~15% | Good fill; lower RV eCPM |
| Mintegral | ~11% | Best for APAC, esp. China |
| ironSource | ~9% | Solid mediation layer |

**Recommendation for our title**: AppLovin MAX as primary mediator on iOS with Unity Ads, AdMob, Mintegral, and ironSource as backfills. This matches Archero / Survivor.io stacks.

Estimated revenue impact: a tuned action-roguelite generates **~$500K/day in ad revenue at Survivor.io's scale**, ~30-40% of total revenue (rest from IAP).

---

## 6. Gacha Mechanics

### The three-pull structure

1. **Single pull** - 60-300 gems, cheap impulse.
2. **10-pull** - 540-2,700 gems, **guarantees at least one rare** (soft pity hard-coded in 10-pull).
3. **Free daily pull** - via ad or login, keeps non-payers engaged with the system.

### Pity systems

| Type | How it works | Example |
|---|---|---|
| **Hard pity** | Guaranteed rare/epic at N pulls | Archero 2: Epic guaranteed at 10 pulls; S-tier at 50 pulls (Chromatic/Mythstone) |
| **Soft pity** | Rate ramps up after threshold | Genshin: rate climbs from pull 74, hard ceiling at 90 |
| **10-pull guarantee** | Bundle ensures at least one rare | Standard across genre |

Pity creates **predictable ceiling spending**. A whale knows that 50 pulls = guaranteed S-tier = ~$50-$150 depending on bundle. This converts pulls from gambling-feel to investment-feel.

### Rate-up banners

Limited-time banners where one specific hero/weapon has elevated drop chance. Drives FOMO. Critical to advertise the featured item heavily. Pity often does **not** carry between banners (or does so with reduced count - a key dial).

### Duplicate conversion (shards / dust)

Always provide a fallback when a player pulls a hero they already own:
- **Shards**: stack toward unlocking that exact hero (great for older heroes).
- **Universal dust**: spend on any hero (whale-friendly catch-up).
- **Star-up materials**: dupes become power-ups for the existing copy.

Mighty DOOM's failure to do this well ("90% common drops, can't get rare weapons after 10+ hours") is the genre's canonical anti-pattern.

### Legal / regulatory risks

| Region | Status | Implication |
|---|---|---|
| **Japan** | Self-regulated. "Complete gacha" (combining items for rare) banned in 2012. Industry codes require odds disclosure. | Publish odds; avoid combine-to-win mechanics. |
| **Belgium** | Paid loot boxes interpreted as gambling. Many publishers disable IAP loot boxes for Belgian users. | Either disable for BE, or convert to a "shop" model with visible item picks. |
| **Netherlands** | Hostile; investigations have forced changes. | Same as Belgium - region-gate or restructure. |
| **China** | Mandatory odds disclosure since 2017. | Show drop rates in-game. |
| **South Korea** | Mandatory odds disclosure (2024). | Same. |
| **Apple (global)** | App Store requires odds disclosure prior to purchase. | Show drop rates in IAP description and/or in-game. |
| **USA / EU (general)** | No federal law yet, but FTC and ESRB pressure rising. | Disclose to be safe. |

**Practical rule**: bake odds disclosure in from day one. Region-gate hard loot boxes for BE/NL. Use a "banner shop" approach (player chooses the pool) wherever possible to reduce legal exposure.

---

## 7. Battle Pass Design

### Structure

- **Free track**: ~30 tiers of small rewards (gold, energy, minor cosmetic). Keeps non-payers in the system; advertises the premium track.
- **Premium track**: $4.99-$9.99. Same tiers but bigger rewards + 1-3 premium exclusives (hero shard, exclusive skin, large gem packs).
- **Premium+ track**: $14.99-$19.99 with instant XP boost (skip 20-25 tiers), exclusive cosmetic, sometimes a guaranteed hero pull.

### Season cadence

| Cadence | Pros | Cons | Best fit |
|---|---|---|---|
| 30 days | Maximum recurrence; aligns with monthly card | High content load; quick player burnout | High-engagement games (CoD Mobile, Clash Royale) |
| 45 days | Breathing room; doable for small team | Less recurrent revenue | Mid-tier roguelites |
| 60 days | Lower content cost; deeper themes | Risk of mid-season dropoff | Small teams, deep PvE content |

**Recommendation for a new roguelite**: start with **45-day seasons**. It splits the difference, allows content prep, and aligns with quarterly cadence (8 seasons/year).

### Differentiation patterns

- **Symmetric pace, premium bonuses** (Fortnite-style): same tier count, premium gets more per tier.
- **Premium XP boost**: 20-25% XP boost for premium owners.
- **Premium-exclusive tasks**: paid players have extra dailies; smooths the FOMO curve.
- **Instant rewards on purchase**: prevents post-purchase regret.

### Reward types players value most

1. Premium hero / weapon shards (collection-driven).
2. Cosmetic skins (status / identity).
3. Hard currency (gems).
4. Resource bundles (gold, fusion materials).
5. Quality-of-life items (inventory slots, auto-loot).

---

## 8. First-Time Player Offers (FTUE)

77% of players who ever make an IAP do so **within 14 days of install** (Unity data, via Business of Apps). The first 7 days are the conversion crucible.

### The "perfect" FTUE monetization stack

| Trigger | Offer | Goal |
|---|---|---|
| Tutorial complete (~5 min) | Show shop, no offer | Awareness |
| First death | Revive offer ($0.99) | Impulse |
| End of chapter 1 (~15 min) | **Starter Pack** $1.99, 48h timer | First-purchase break |
| First gacha pull | Show 10-pull bundle | Anchor gacha pricing |
| First daily login | Daily login chain starts | Habit |
| End of day 1 | Monthly card teaser | Awareness |
| Day 2 login | Hard energy wall, refill offer | Friction conversion |
| Day 3 | Battle pass intro | Recurring spend setup |
| Day 7 | "VIP Day 1" offer | LTV setup |

Most importantly: **let the player win for the first 10 minutes**. Friction must arrive AFTER the dopamine.

### The Survivor.io "progressive" approach

Habby unlocks monetization elements **one at a time** as the player crosses content thresholds: energy → shop → daily packs → battle pass → gacha → equipment fusion → events. By the time the player sees the full monetization surface (day 7-10), they're already invested. This is the strongest known anti-overwhelm pattern in the genre.

---

## 9. Whale vs. Minnow Design

The genre's spending distribution follows Pareto: **~2% of payers generate ~50% of revenue**. A profitable mix supports all three tiers:

| Tier | Spend | Share of Payers | Share of Revenue | Needs |
|---|---|---|---|---|
| Minnow | $1-$50 lifetime | ~75% | ~10-15% | Starter pack, weekly card, ad-substitutable rewards |
| Dolphin | $50-$500 lifetime | ~22% | ~35% | Monthly card, battle pass, event packs |
| Whale | $500-$50,000+ lifetime | ~3% | ~50%+ | VIP ladder, top-tier gacha, exclusive cosmetics, $99.99 packs |

### Design implications

- **Whales need a ceiling that recedes**: there must always be a next tier (VIP 16, new hero with new mechanic, new prestige system). Never let a whale "max out" a season.
- **Minnows need a path with zero spend**: 60-day F2P clear of all content should be possible, but not optimal. Use rewarded video as the F2P bridge.
- **Dolphins are the volume target**: design the monthly card + battle pass + occasional event pack to total **~$25-$40/month** without feeling coerced.

Mighty DOOM's failure case: insufficient whale depth, harsh paywall on dolphins, alienated minnows. Total: ~$10.5M lifetime - a fraction of Archero.

---

## 10. LiveOps Cadence

| Frequency | Event Type | Revenue Role |
|---|---|---|
| Daily | Login bonus, daily quests, daily shop refresh, daily gacha free pull | Retention |
| Daily | "Daily jackpot" mini-event (solvable in 1 session) | Habit |
| Weekly | Weekly card resets, weekly tournament, leaderboard event with milestone rewards | Recurring spend |
| Bi-weekly | Themed event pack (3-day flash) | Spike revenue |
| Monthly | New battle pass (or new season), monthly card resets, new gacha banner | Major spike |
| Quarterly | Major content update (new chapter, new hero class, new game mode) | UA reactivation |
| Yearly | Anniversary event, collab event (IP crossover) | Mega-spike |

The Habby playbook: **6-9 simultaneous events at any given time**, each with its own currency, leaderboard, and packs. A new player only sees 1-2; veterans see them all. This creates the genre's signature "stacked goals" feeling.

Estimated revenue impact: a well-run LiveOps program lifts ARPDAU by **30-60%** vs. a static game.

---

## 11. Apple-Specific Considerations

### StoreKit & subscriptions

- **StoreKit 2 (iOS 15+)** is now the standard. Plan for it; legacy StoreKit 1 is being deprecated.
- **Auto-renewing subscriptions** for monthly card. Apple takes 30% (or 15% for subs over 1 year of retention).
- **Free trials** allowed; useful for monthly card ("3 days free, then $9.99/mo"). Conversion rate ~40-60% if properly designed.
- **Family Sharing**: optional but useful for retention; if enabled, one paid sub covers up to 6 family members.
- **Subscription groups**: weekly + monthly + yearly tiers must be in the same group so users can upgrade/downgrade without separate purchases.

### App Store Review Guidelines (key clauses)

- **3.1.1 (In-App Purchase)**: all digital goods must use IAP. No external payment links for digital goods except via the StoreKit External Purchase Link Entitlement (EU/Japan/Korea, limited).
- **3.1.2(a) (Auto-renewing subs)**: must clearly disclose price, billing period, what the user gets.
- **Loot box odds disclosure**: "Apps offering 'loot boxes' or other mechanisms that provide randomized virtual items for purchase must disclose the odds of receiving each type of item to customers prior to purchase." Apply this to every gacha pull, chest, and random bundle.
- **No misleading offers**: "fake" discounts (showing a struck-through price that was never real) get flagged in review.
- **Age rating**: presence of "Simulated Gambling" elements raises the rating to 17+ in some regions. Roguelite gacha generally rates 12+ if framed as "chest opening" rather than "gambling."

### Ad SDK considerations on iOS

- **ATT prompt (App Tracking Transparency)** required before passing IDFA to ad networks. Opt-in rates ~30-40%.
- **SKAdNetwork 4.x** for attribution; coarse conversion values.
- **No fingerprinting** - Apple actively bans SDKs that try to circumvent ATT.

---

## 12. Recommendations for Our Game

### Adopt (Core stack)

1. **Hybrid IAP + Rewarded Video** - 60/40 IAP/ads target split. Mirror Archero's model.
2. **Dual currency**: gold (soft) and gems (hard) with a third utility resource (e.g., shards or runestones) for crafting.
3. **Energy system** at the run level - generous early, 2-3 hour full refill, ad-refillable.
4. **Starter Pack** at $1.99 with 48-hour timer, triggered after first chapter clear.
5. **First-purchase doubler** on every hard-currency SKU - low cost to implement, huge ARPPU lift.
6. **Monthly Card** at $9.99 / 30 days. Daily gem trickle + battle pass XP boost + 1 exclusive cosmetic.
7. **Battle Pass** at $4.99 (basic) and $14.99 (premium with XP skip) on **45-day seasons**.
8. **Gacha** with **10-pull soft pity** + **hard pity at 50 pulls** on rate-up banners. Always-on standard banner, 14-day rate-up banners.
9. **Duplicate conversion**: dupes give shards toward the same hero + universal dust for any hero.
10. **VIP ladder** of 15 tiers with permanent perks. Whale retention.
11. **Daily login chain** (7-day repeating, with a 30-day big reward).
12. **Piggy Bank** - passively fills, $4.99 to crack. High-converting.
13. **Revive offer** at death moments - 60 gems or rewarded video.
14. **AppLovin MAX** as primary ad mediator with Unity, AdMob, Mintegral, ironSource as backfills.
15. **Progressive monetization unlock** (Survivor.io pattern) - reveal one new IAP surface per major content threshold over the first 7 days.

### Skip / De-emphasize

1. **Offerwalls** - not idiomatic, low fit, brand-risky in a premium roguelite.
2. **Complete gacha / combine-to-win** mechanics - banned in Japan, legally risky.
3. **Hard paywalls** - never gate a story chapter or core gameplay loop behind IAP.
4. **Mighty DOOM-style triple-gating** (level + soft currency + meaningless extra currency). One progression gate at a time.
5. **Aggressive interstitials in the first session** - kill D1 retention.
6. **Cosmetic-only battle pass premium** (Mighty DOOM's mistake) - players want gameplay-relevant rewards too.
7. **Lives systems** at the death level - feels punishing in a die-often genre.

### Proposed monetization mix (target steady-state, post-launch)

| Source | % of Revenue | Per-DAU Target (ARPDAU) |
|---|---|---|
| IAP - Subscriptions (Monthly + Weekly cards) | 25-30% | ~$0.06 |
| IAP - Battle Pass | 15-20% | ~$0.04 |
| IAP - Gacha & Event Packs | 25-30% | ~$0.06 |
| IAP - Starter / Hard Currency / Piggy Bank | 10-15% | ~$0.03 |
| Rewarded Video | 8-12% | ~$0.02 |
| Interstitial / Banner | 2-5% | ~$0.005 |
| **Total ARPDAU target** | **100%** | **~$0.20-$0.25** |

A $0.20 ARPDAU on a tuned action-roguelite with 100K DAU = ~$600K/month revenue. Survivor.io scale (~$5M/month) implies sustained DAU around 500K-800K with strong LiveOps lifting ARPDAU above $0.30.

### Phased launch plan

- **Soft launch (months 1-3, 1-2 markets)**: starter pack, gem packs, monthly card, RV at key slots. Tune economy.
- **Global launch (month 4)**: layer in battle pass + first gacha banner + VIP ladder.
- **Month 6+**: add event packs, expand LiveOps to weekly themed events, introduce premium+ battle pass tier.
- **Year 2**: prestige system + endless mode + collab events for whale ceiling extension.

The action-roguelite genre rewards **patient, fair-feeling monetization with deep meta-progression**. Be Archero, not Mighty DOOM.

---

## Sources

- Deconstructor of Fun - Archero analysis: https://www.deconstructoroffun.com/blog/2019/8/9/why-archero-banked-25m-but-leaves-25m-hanging-hlx9n
- Deconstructor of Fun - Battle Passes guide: https://www.deconstructoroffun.com/blog/2022/6/4/battle-passes-analysis
- Deconstructor of Fun - Starter Pack pricing: https://www.deconstructoroffun.com/blog/2024/4/8/free-to-play-starter-pack-pricing-when-conversion-is-king-we-may-price-too-low
- Naavik - Mighty DOOM postmortem: https://naavik.co/deep-dives/how-dooms-mobile-spinoff-misstepped/
- Naavik - Hybridcasual evolution: https://naavik.co/deep-dives/evolution-of-hybridcasual-deepdive/
- Gamigion - Survivor.io masterclass: https://www.gamigion.com/survivor-io-the-progressive-monetization-masterclass/
- Reverse Nerf - Archero store breakdown: https://reversenerf.com/f2p-in-game-store-breakdown-archero/
- Udonis - Archero monetization: https://www.blog.udonis.co/mobile-marketing/mobile-games/archero-monetization
- Mobile Free To Play - Energy systems: https://mobilefreetoplay.com/understanding-and-eliminating-energy-systems/
- Mobile Free To Play - First purchase: https://mobilefreetoplay.com/free-to-play-monetization-making-the-first-purchase/
- GameRefinery - Battle pass: https://www.gamerefinery.com/12-ways-to-take-battle-passes-to-the-next-level-in-mobile-games/
- GameRefinery - Targeted IAP offers: https://www.gamerefinery.com/best-practice-and-strategies-for-targeted-iap-offers-in-mobile-games/
- Apple Developer - App Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Fenwick - Apple loot box odds: https://www.fenwick.com/insights/publications/apple-now-requires-disclosure-of-loot-box-odds
- MobileGamer.biz - Survivor.io revenue: https://mobilegamer.biz/two-months-in-survivor-io-passes-75m-from-37m-downloads/
- Tenjin - Ad monetization 2025: https://tenjin.com/blog/ad-mon-gaming-2025/
- Business of Apps - 77% IAP in first 2 weeks: https://www.businessofapps.com/news/77-of-players-make-in-app-purchases-within-the-first-two-weeks-of-downloading-a-game/
