# LiveOps, Events, and Retention Systems in Archero-Style Mobile Games

*Research compiled May 2026. Target genre: Archero-like roguelite action mobile (Archero, Archero 2, Survivor.io, and adjacent hybrid-casual hits). Sources: Deconstructor of Fun, Naavik, GameRefinery, Habby teardowns, Archero / Archero 2 / Survivor.io wikis and community guides, Reddit/YouTube event recaps, and mobile-retention research from MAF, Solsten, GameAnalytics, and Mistplay.*

---

## 0. Why LiveOps Is the Genre's Real Engine

Archero (2019) made over $35M IAP in its first three months but its revenue "peaked, dropped, and flatlined" relatively quickly because the post-launch live-ops calendar was thin. Survivor.io, released two months later than Archero 2's predecessor and built on a far more aggressive LiveOps backbone, crossed **$500M lifetime IAP by mid-2024 and continues to generate $5–6M/month three years post-launch**. The single biggest difference between a hit and a $500M+ franchise in this genre is not the core loop — it is the **density, variety, and rhythm of recurring events** layered on top.

GameRefinery's analysis of casual mobile games found that **~66% include a battle pass**, and the top iOS US Top Grossing 100 is dominated by titles whose Day-1 player sees three or more concurrent live-ops surfaces (login calendar, daily quests, weekly missions, seasonal pass, and at least one timed event). Players who consent to push notifications retain 15–20 percentage points better; comeback offers can pull back ~65% of lapsed users when paired with notifications. LiveOps is not "content"; it is the retention curve.

---

## 1. Daily Systems

The daily layer exists to **convert "I opened the app" into "I played a session"** within 30–60 seconds. Every Archero-style hit ships with five to seven daily surfaces, sequenced so the player must complete one to unlock the next.

### 1.1 Daily Login Calendar (7-Day + Monthly)

- **7-day calendar**: Used as the *welcome-back* loop and for new players. Linear escalation: day 1 small (50 gems), day 7 big (a hero shard, premium currency burst, or a chest). Archero and Archero 2 both anchor day 7 with a guaranteed featured-character shard.
- **30-day "Monthly Sign-In"**: Standard in mid-core mobile. Zig-zag pacing (small/small/medium/small/small/large) keeps anticipation high. Day 14 and day 28 are "milestone" days with the headline rewards (a costume, a rare gear chest, a high-pull-count gacha ticket).
- **Forgiveness mechanic**: A "make-up day" — players can rewatch an ad or spend ~50 gems to claim a missed day. Critical because *missing one day in a 30-day calendar is the #1 churn trigger for committed players* (per GameRefinery).
- **Calendar art swap**: Monthly calendar art changes with the season — small detail, but it signals "the game is alive."

### 1.2 Daily Quests / Missions

- **Volume**: 4–8 tasks, refreshed at 00:00 UTC (or local server reset).
- **Composition**: Three "you'll do this anyway" tasks (clear 3 stages, kill 500 monsters, spend energy), two "stretch" tasks (clear a Gold-Cave floor, win 1 PvP), one "spender nudge" (open a chest, summon once).
- **Two-layer payout**: Each task pays a small reward *and* contributes activity points to a daily bar; filling the bar at 60/100/200 points unlocks chests. This is the "task → activity bar → chest" pattern Archero 2 uses and is now standard.
- **Battle pass XP**: Daily quests are the #1 source of Pass XP. Survivor.io's Survivor Pass grants up to **130 Pass XP/day** from dailies; missing days is the dominant reason F2P players fail to finish a 30-tier pass.

### 1.3 Free Chests, Spins, and Roulettes

- **Silver chest** (every 24 h, free) → low-tier gear / currency.
- **Obsidian / gold chest** (every 48–72 h, free) → mid-tier gear, the F2P backbone.
- **Daily free 10× summon** during banner events — Habby's signature conversion trick.
- **Free spin wheel** (1/day): low-EV cosmetic gambling that doubles as an ad surface.

### 1.4 Daily Ad-Watch Rewards (the "5 Free Chests" pattern)

Archero 2 is the genre's poster child here. Free players can claim ~5–10 *ad-gated* daily bonuses: a free chest x3, free energy x2, free gems x2, free fishing attempt, free shop refresh. Each ad is 15–30 s of mediation revenue *and* delivers a dopamine reward — the ad is the gift wrap. Crucially, ad-watch caps reset at midnight, making the missed-day cost concrete.

### 1.5 Daily Premium Offers

- **Daily Deal** at $0.99 / $2.99: an inventory of 3–5 small packs, refreshes nightly. Anchors include a "first-purchase 10×" pull bundle and a "starter resource" pack.
- **Privilege Card / VIP** ($4.99 monthly): daily gem drip (~800 gems/day), ad-removal, +1 free-chest slot. This is Archero 2's primary subscription and the highest-ARPU surface per spender in the genre.
- **Daily ad-removal pitch**: Triggered on the third inter-stage interstitial.

---

## 2. Weekly Systems

The weekly layer raises the stakes: bigger rewards, mid-term goals, and the first competitive social surfaces.

### 2.1 Weekly Missions / Weekly Pass

- 6–10 longer-form objectives (clear 30 stages, win 20 PvPs, open 50 chests). Reset Monday 00:00 UTC.
- Pays the **"weekly chest"** — typically two pulls' worth of premium currency, a guaranteed rare, and 2× the equivalent of a daily reward.
- Doubles as a weekly *mini-pass* with its own 10-tier reward track (Archero 2's Wish Coin track is the canonical example).

### 2.2 Weekly Bosses

- Single, rotating boss available 7 days, refreshes Monday. Players get **3–10 attempts/day**.
- Damage-tier rewards: cumulative damage thresholds (5M, 25M, 100M…) unlock individual rewards, *plus* a global leaderboard (top 1/10/100/1k brackets) tied to that week's boss.
- In Archero 2, **Demon King Clash** runs a 14-day variant of this pattern with a guaranteed-character pity at 400 pulls. Daily 7 stages, then a leaderboard chase. This is the strongest single retention surface in the game.

### 2.3 Weekly Leaderboards

- Per-mode leaderboards: Sky Tower, Arena, Gold Cave high score, weekly boss damage.
- **Bracketed**: Players grouped into 50–100-player shards so everyone can plausibly hit top-10. Critical anti-frustration design.
- Settlements at Sunday 23:59. Rewards mailed Monday — itself a retention hook (mail badge in icon).

### 2.4 Weekly Arena Reset (PvP)

- Bronze → Gold → Diamond → Master tiers (Archero 2's structure).
- **Soft reset** weekly (you drop one tier) keeps demand-supply healthy and gives mid-pack players a fresh climb every Monday. Daily mailbox payout based on your rank.
- Hard season reset every 4–6 weeks.

### 2.5 Weekly Guild Activities

- **Guild Boss** (refreshes weekly): damage-tier rewards as above, plus guild-wide milestone chests.
- **Guild donation cap** resets weekly.
- **Guild Expedition** / Guild War: 7-day event-vs-event format where guilds match up against guilds; great for chat-channel activity.

---

## 3. Seasonal / Monthly Systems

The monthly layer is where **most revenue lives**. A typical Archero-style game runs a **28-day season**, anchored by the Battle Pass.

### 3.1 Battle Pass (Free + Paid Tracks)

Per Deconstructor of Fun and GameRefinery:

- **Length**: 28–30 days. Shorter passes maximize urgency and conversion when enthusiasm is highest.
- **Tier count**: 30–60 tiers (Survivor.io = 30; Archero 2 progresses across the season via dailies and weeklies). Linear progression is preferred so completion rates exceed 60% for paid users.
- **Free track**: 30–40% of the value of the paid track. Must be visibly valuable so non-payers feel the pass exists for them too.
- **Paid track tiers** (this is the genre standard):
  - **Tier 1: Premium Pass** at $9.99 — pays for itself in pulls/gems by tier 10.
  - **Tier 2: Premium+ / Elite** at $19.99–$29.99 — extra cosmetics, an exclusive hero/skin, an instant +10 tier skip.
  - **Direct character buy** for $39.99–$49.99 — for late-joiners and whales who don't want to grind.
- **Progression source**: Daily quests + weekly missions feed Pass XP. The pass must be completable in ~25 of 28 days with full engagement; missing more than 3 days kills completion for F2P.
- **Post-completion track**: After tier 30, players continue earning a "prestige" chest every 100 XP (Survivor.io: max 20 prestige chests).
- **Theme rotation**: Each month has a distinct visual theme — Lunar New Year, Summer Beach, Halloween, Winter Festival. The hero/skin of the month is **season-exclusive** and not re-sold for at least 12 months (FOMO is the load-bearing beam).

### 3.2 Season Story

Light narrative wrapper: 3–5 cutscene panels released at tier 5/10/15/20/30. Doesn't drive retention by itself, but provides theming consistency and shareable art.

### 3.3 Season Cosmetics

- **Hero skin**: Headline pass reward.
- **Weapon skin / projectile FX**: Mid-pass reward. Visible to other players in shared social surfaces.
- **Profile frame, chat bubble, login banner**: Cheap to produce, high collection value.
- **Pet / companion**: Survivor.io added pets as a whole new reward axis specifically to give passes something new to ship.

### 3.4 Season-Exclusive Heroes / Weapons (Rotation)

- **In**: 1 new hero + 1 new weapon per season. Available via the pass, a featured banner, *and* a direct purchase.
- **Out**: After the season, the hero/weapon goes into a long cooldown (12+ months) before reappearing in an "anniversary vault" or "return banner." Survivor.io's anniversary events explicitly bring back fan-favorite past characters.

---

## 4. Special Events

Stack 1–3 special events on top of the daily/weekly/seasonal baseline at any time. These are the surge surfaces — they spike DAU and ARPDAU.

### 4.1 Time-Limited Dungeons / Modes

- **Mechanic twist**: A modifier (all-fire-damage, no-dodge, double-loot) over a 5–10-floor dungeon.
- **Duration**: 3–7 days.
- **Reward**: Event currency redeemable in a temporary shop.

### 4.2 Collab / IP Crossover Events

- **Cadence**: 1–2 per year. Huge UA spike.
- **Format**: Themed boss, themed map, exclusive collab hero (usually returnable in a future event).
- Survivor.io has run collabs as anniversary tentpoles; Archero 2 has tested IP-themed bosses. The marketing alone justifies the cost.

### 4.3 PvE Tower / Escalating-Wave Events

- **Sky Tower** (Archero 2) and **Cake Tower** (Survivor.io) are the templates: climb N floors, each harder than the last, with checkpoint rewards every 5–10 floors.
- **Cake Tower twist**: Lottery layer mechanic where each floor's reward is partly randomized — gambling dopamine layered onto progression.
- **Reset**: Tower events refresh every 2 weeks; permanent-rotation towers refresh monthly.

### 4.4 "Pass-the-Checkpoint" Events

A simple linear-track event where players hit milestones (kill X enemies cumulatively, clear Y stages, deal Z damage) to claim escalating rewards from a 10–20-node track. Comes in two flavors:

- **Sprint** (3 days): low ask, low reward, drives weekend DAU.
- **Marathon** (14 days): big ask, includes a featured hero shard at the final node.

Players engage with these because they're *passively progressed* by playing the game normally — no special mode required.

### 4.5 Tournament Events

- **Format**: Fixed-rules competitive run (e.g., "everyone uses the same loadout, highest score wins").
- **Duration**: 3–5 days.
- **Bracketed leaderboards** with prize-pool style escalating top-N rewards.
- **Entry tickets**: 3–5/day; extra tickets purchasable (gem sink) or ad-watchable.

### 4.6 Anniversary Events

- **Cadence**: Annual, the biggest event of the year. Stack everything.
- **Components** (Survivor.io's 3rd Anniversary): treasure-hunt mini-game, "Brave Assembly" character-return banner with a ticket system, themed login calendar, exclusive anniversary cosmetics, free 10× pull, double-XP for the duration.
- **Marketing tie-in**: Social-media giveaways, creator codes, app-icon swap.

---

## 5. Social Retention

Social systems are the *only* mechanic that consistently extends D30+ retention in this genre. Archero v1 famously under-invested here; Archero 2 and Survivor.io corrected aggressively.

### 5.1 Guilds / Clans

- **Min viable**: 20–30-member cap, chat channel, daily donation, guild shop with exclusive currency, weekly guild boss.
- **Best-in-class**: Guild Expeditions / Guild War (guild-vs-guild competition), guild leveling with unlocks (extra inventory slots, +5% damage to all members), guild tournaments, cross-guild visiting.
- Archero 2's **Monster Invasion** requires the guild to collectively score 800k/day — a "if I don't play, I let my guild down" hook that is uniquely powerful for retention. Players report this as the single biggest reason they log in daily.

### 5.2 Friend Lists

- **Cap**: 50–100 friends.
- **Daily gift**: Send/receive a small currency packet — pure utility, but creates a graph effect.
- **Friend boss-help**: Tag a friend to deal bonus damage to your weekly boss. Encourages list-building.

### 5.3 Leaderboards (Global / Regional / Friends / Guild)

Multiple scope levels prevent demoralization. *Everyone* can be top-10 on at least one leaderboard (friends, guild). Best-in-class:

- Global per-mode (Sky Tower, Arena, Gold Cave).
- Regional (your country / server).
- Friends-only (always feels reachable).
- Guild-internal.

### 5.4 PvP Modes

- **Async PvP** (Arena, Archero 2 style): Fight other players' AI-controlled avatars; cheap to develop, no netcode pain.
- **Real-time co-op-vs-mob or PvP**: "Hero Duo" / matchmade duo mode is the trendy 2024+ addition. Synchronous play is a strong retention multiplier but expensive.
- **Daily caps**: 10/day is the standard, balancing matchmaking-pool health vs. engagement.

### 5.5 Co-op Modes

- **Co-op weekly boss**: 2-4 players, shared HP bar, individual loot.
- **Co-op dungeon**: Limited attempts, scaling difficulty with party size.
- Critical for word-of-mouth: a player who recruits a friend retains *dramatically* better than a solo player (~2× D30 in Habby internal numbers cited in the Naavik teardown).

---

## 6. Push Notification Design

Per OneSignal, Pushwoosh, and Google Play's notification guidance:

### 6.1 Notification Types (in order of effectiveness)

1. **Energy full** — concrete, actionable, the player already wanted this. Push when energy hits 100%.
2. **Daily quest reset** at 9–10 a.m. local (the "morning check-in" window). *Not* at midnight — players are asleep.
3. **Event ending soon** at T-24h and T-2h. Pull-conversion spike.
4. **Battle pass deadline** at T-3 days, T-1 day, T-2 hours.
5. **Friend / guild activity**: "Your guild boss is at 50% HP," "X invited you to a duo."
6. **Returning player offer** at day 3, day 7, day 14 of inactivity.

### 6.2 Frequency Rules (the hard guardrails)

- **Max 2 pushes/day** for active users; 1/day for low-engagement.
- **Quiet hours**: No pushes 11 p.m. – 8 a.m. local.
- **Inactive-window targeting**: Schedule for *outside* their normal play window. A 7:05 p.m. push to a 7 p.m. player is wasted; an 11 a.m. push lands.
- **Personalize**: "Your Gold Cave streak is at 5 days — don't break it" beats "Come play!" by 3–10× CTR.
- **Avoid guilt language** ("we miss you"); lead with what's new or what reward is waiting.

### 6.3 Opt-In Strategy

Industry average opt-in for gaming is **~63.5%**. Best practices: defer the system prompt until after the first reward delivery (post-tutorial), explain the value ("get notified when your energy is full"), and let players granularly opt out of notification categories rather than all-or-nothing.

---

## 7. Returner / Churn-Back Mechanics

~65% of lapsed users return within 30 days *if* they receive push notifications. The returner offer turns that return into a session.

### 7.1 Time-Gated Comeback Offers

- **Day 3 away**: Single push, "Your daily chest is waiting." No offer yet.
- **Day 7 away**: Returner login calendar (a 5-day mini-calendar of escalating rewards), one-time premium offer at 80% off.
- **Day 14 away**: Big-ticket bundle (a featured hero + 1 month of currency drip) at 90% off, plus an "instant boost" item (free 24h XP doubler, +10 stage skips).
- **Day 30+ away**: "Welcome back, hero" — a fully reset newbie pack ladder, hero choice ticket, and *opt-in* matchmaking that pairs returner with active friend / guild.

### 7.2 Value-Calibrated to Player Tier

Critical: do **not** give a level-5 player the same comeback offer as a level-50 spender. Segment by historical spend and progression; whales get cosmetic-heavy offers, F2P get resource-heavy.

### 7.3 Friend / Guild Pull

- "Your guild has a returner bonus — invite X back for a free 10×."
- Guildmates receive in-app notifications when their member opens the app after 3+ days away.

---

## 8. Retention Curve Targets

From Solsten, GameAnalytics 2025, MAF, and Amps33:

| Metric | Industry median (2025) | Top 25% | Hit Archero-likes |
|---|---|---|---|
| **D1** | 28–33% | 40%+ | 45–55% |
| **D7** | 12–15% | 20%+ | 22–28% |
| **D30** | 4–6% | 10%+ | 8–14% |
| **D90** | 1–2% | 3–5% | 4–7% |

**Viability bar**: If D1 ≥ 30% and D30 ≥ 4%, unit economics are usually viable at current iOS CPIs. Below that, UA payback is unlikely.

**LTV** (hybrid IAP+ads, action / casual-hybrid):

- Survivor.io reports per-download lifetime spend of **~$15.50 (KR), ~$9 (CN), ~$4.90 (US)**.
- iOS US benchmarks for hybrid-casual action: **$3–6 LTV** at scale; **$8–12** for top-decile hits.
- Whale concentration: top 1% of payers typically delivers 40–60% of revenue.

### 8.1 The 24-Month LiveOps Effect

Archero plateaued in revenue ~6 months post-launch because its LiveOps was thin. Survivor.io, with an aggressive event calendar from day 1, was still growing 18 months in. **The single highest-leverage retention investment is shipping with a real 30-day calendar of recurring + special events, not adding mechanics**.

---

## 9. Sample 30-Day LiveOps Calendar

Below is a representative one-month overlay. Daily and weekly surfaces run continuously; the timed events stack on top.

```
Day  | Daily       | Weekly       | Season         | Special Event(s)
-----|-------------|--------------|----------------|--------------------------------
 1   | DQ + Login  | Wk1 missions | Pass S5 starts | Login Calendar S5 (30-day) starts
 2   | DQ + Login  | Wk1 missions | Pass S5        | Pass-the-Checkpoint Sprint (3d) starts
 3   | DQ + Login  | Wk1 missions | Pass S5        | Sprint event last day
 4   | DQ + Login  | Wk1 missions | Pass S5        | -
 5   | DQ + Login  | Wk1 missions | Pass S5        | Time-limited Dungeon (5d): "Inferno Vault" starts
 6   | DQ + Login  | Wk1 missions | Pass S5        | Tier 10 pass milestone push
 7   | DQ + Login  | Wk1 reset    | Pass S5        | 7-day login finale; Weekly Boss #1 settles
-----|-------------|--------------|----------------|--------------------------------
 8   | DQ + Login  | Wk2 starts   | Pass S5        | New Weekly Boss; Arena soft reset
 9   | DQ + Login  | Wk2 missions | Pass S5        | Inferno Vault last day
10   | DQ + Login  | Wk2 missions | Pass S5        | Demon King Clash (14d) starts — banner pity
11   | DQ + Login  | Wk2 missions | Pass S5        | Daily DKC stages live
12   | DQ + Login  | Wk2 missions | Pass S5        | -
13   | DQ + Login  | Wk2 missions | Pass S5        | Guild Expedition (7d) starts
14   | DQ + Login  | Wk2 reset    | Pass S5 mid    | Day-14 calendar milestone (big chest)
-----|-------------|--------------|----------------|--------------------------------
15   | DQ + Login  | Wk3 starts   | Pass S5        | New Weekly Boss; Sky Tower refresh
16   | DQ + Login  | Wk3 missions | Pass S5        | Pass-the-Checkpoint Marathon (14d) starts
17   | DQ + Login  | Wk3 missions | Pass S5        | -
18   | DQ + Login  | Wk3 missions | Pass S5        | Tournament event (3d) starts
19   | DQ + Login  | Wk3 missions | Pass S5        | Guild Expedition settles
20   | DQ + Login  | Wk3 missions | Pass S5        | Tournament settles; leaderboard rewards
21   | DQ + Login  | Wk3 reset    | Pass S5        | -
-----|-------------|--------------|----------------|--------------------------------
22   | DQ + Login  | Wk4 starts   | Pass S5        | New Weekly Boss; Arena soft reset
23   | DQ + Login  | Wk4 missions | Pass S5        | Demon King Clash settles; new hero unlocked
24   | DQ + Login  | Wk4 missions | Pass S5        | Time-limited Dungeon (5d): "Frozen Spire"
25   | DQ + Login  | Wk4 missions | Pass S5        | Returner-window push to D7 lapsers
26   | DQ + Login  | Wk4 missions | Pass S5        | Tier 25 pass milestone
27   | DQ + Login  | Wk4 missions | Pass S5        | Last call: pass deadline T-48h push
28   | DQ + Login  | Wk4 reset    | Pass S5 ends   | Pass closes; Day-28 calendar finale
29   | DQ + Login  | Wk1 starts   | Inter-season   | Mini-event: "Vault Run" (2d)
30   | DQ + Login  | Wk1 missions | Pass S6 reveal | Trailer drop + pre-purchase offer
```

Note the rhythm: at any given moment, the player faces **at least 4 concurrent surfaces** (daily, weekly, pass, ≥1 special). Gaps longer than 24 hours between event-starts cause measurable DAU dips.

---

## 10. Recommendations for Lucent

### 10.1 Launch (Must-Have)

These are non-negotiable for a viable Archero-like in 2026:

1. **7-day login calendar** + **30-day login calendar** with day-14 and day-28 milestone rewards and one-tap ad/gem forgiveness.
2. **Daily quests** (6 tasks → activity bar → 3 chest tiers) that explicitly feed Battle Pass XP.
3. **Daily free chest** (24 h) + **daily ad-gated free chests** (5 slots).
4. **Daily Deal** at $0.99 / $2.99, **Privilege Card subscription** at $4.99/month.
5. **Weekly missions** + a **weekly chest track** (10-tier mini-pass).
6. **Weekly boss** with damage-tier rewards and bracketed leaderboard (50-player shards).
7. **28-day Battle Pass** with free + $9.99 + $19.99 tracks, an exclusive season hero, and ~30–50 tiers. This is the single highest-leverage system on the list.
8. **Async PvP Arena** with bronze→master tiers, daily mailbox rewards, weekly soft reset.
9. **Guilds** with chat, daily donations, weekly guild boss, guild shop.
10. **Push notifications** wired for: energy full, daily quest reset, event ending soon, pass deadline. Defer iOS prompt to post-tutorial.
11. **Returner offer ladder** at day 3 / 7 / 14 / 30 of inactivity, value-calibrated to player tier.
12. **One always-on rotating special event slot** seeded with three event templates (time-limited dungeon, pass-the-checkpoint sprint, tournament) ready to ship from day 1.

### 10.2 Post-Launch (Add at the 60–120 Day Mark)

13. **PvE Tower event** (Sky-Tower analog) with biweekly refresh.
14. **Demon-King-Clash-style 14-day banner event** with 400-pull pity and daily stages.
15. **Guild Expedition / Guild War** — guild-vs-guild matchmaking, 7-day cycles.
16. **Real-time co-op duo** mode (10 attempts/day cap).
17. **Friend list + daily friend gifts** for graph effects.
18. **Collab event slot** — start vetting IP partners at month 4.
19. **Hero/weapon rotation system** with vault returns at the 12-month mark.

### 10.3 Year-One Tentpole (Anniversary)

20. **Anniversary mega-event** at month 12: returning-character banner, treasure-hunt mini-game, free 10×, themed login calendar, app-icon swap, creator-code partnerships. Plan this from launch — it is the single biggest UA + win-back moment of year one.

### 10.4 Calendar Cadence

Adopt the **28-day season + always-on weekly + always-on daily + 1–3 stacked specials** pattern (see Section 9). At any moment the player must see at least four reasons to come back tomorrow. Gaps of more than 24 hours between event-starts is the threshold where Archero-style games measurably bleed DAU.

### 10.5 Retention Targets

Set internal goals at the **top-25% bar**: D1 40%+, D7 20%+, D30 8%+. Below D1 30% / D30 4%, do not increase UA spend — fix the early-funnel and the daily layer first. The biggest D7→D30 lift in this genre comes from social systems (guilds, friends, async PvP) and the battle pass loop, not from gameplay tuning.

---

*End of report.*

## Sources

- [Tiny Teardown: Archero 2 (Habby Games)](https://someselectedstories.substack.com/p/tiny-teardown-archero-2-habby-games)
- [Events — Archero 2 Wiki and Guides (Game Vault)](https://archero-2.game-vault.net/wiki/Events)
- [Demon King Clash — Archero 2 Wiki](https://archero-2.game-vault.net/wiki/Demon_King_Clash)
- [Arena — Archero 2 Wiki](https://archero-2.game-vault.net/wiki/Arena)
- [Battle Passes — Everything You Ought to Know (Deconstructor of Fun)](https://www.deconstructoroffun.com/blog/2022/6/4/battle-passes-analysis)
- [Survivor.io: Will It Follow in Archero's Footsteps? (Naavik)](https://naavik.co/deep-dives/survivorio-archeros-footsteps/)
- [How Survivor.io continues to pull in $5M/month three years later (Gamesforum)](https://www.globalgamesforum.com/news/how-survivor.io-continues-to-pull-in-5-million-a-month-three-years-later)
- [Retention Made Easy With Archero and What It's Missing (Reverse Nerf)](https://reversenerf.com/retention-made-easy-with-archero-and-what-its-missing/)
- [Survivor Pass — SurvivorIO Wiki](https://survivorio.fandom.com/wiki/Survivor_Pass)
- [Battle Pass — Archero Wiki](https://archero.fandom.com/wiki/Battle_Pass)
- [12 Ways to Take Battle Passes to the Next Level (GameRefinery)](https://www.gamerefinery.com/12-ways-to-take-battle-passes-to-the-next-level-in-mobile-games/)
- [Battle Pass is a Hot Trend in Mobile Games (GameRefinery)](https://www.gamerefinery.com/battle-pass-trend-mobile-games/)
- [Drive Up Your Revenues with Seasonal Events (GameRefinery)](https://www.gamerefinery.com/drive-up-your-revenues-with-seasonal-events/)
- [Four Ways How Mobile Games Re-Engage Lapsed Players (GameRefinery)](https://www.gamerefinery.com/four-ways-how-mobile-games-re-engage-lapsed-players/)
- [Feature Spotlight: Progression Elements in Daily Rewards (GameRefinery)](https://www.gamerefinery.com/feature-spotlight-progression-daily-rewards/)
- [Mobile Game Retention Benchmarks (MAF)](https://maf.ad/en/blog/mobile-game-retention-benchmarks/)
- [The True Drivers of D1, D7, D30 Retention in Gaming (Solsten)](https://solsten.io/blog/d1-d7-d30-retention-in-gaming)
- [Mobile Game Unit Economics 2026: CPI / LTV Benchmarks (Amps33)](https://amps33.com/insights/mobile-game-unit-economics-2026)
- [2025 Mobile Gaming Benchmarks (GameAnalytics)](https://www.gameanalytics.com/reports/2025-mobile-gaming-benchmarks)
- [Push Notification and Engagement Tips for Game Developers (OneSignal)](https://onesignal.com/blog/push-notifications-messaging-for-game-developers/)
- [Triple Your DAU & MAU as a Gaming App (Pushwoosh)](https://www.pushwoosh.com/blog/game-app-push-notifications/)
- [Optimizing notifications in games (Google Play Apps & Games / Medium)](https://medium.com/googleplaydev/optimizing-notifications-in-games-5efd6ba89701)
- [The Long Game: How to Reduce Churn and Retain Mobile Gamers (Mistplay)](https://business.mistplay.com/resources/mobile-game-churn-retention-strategies)
- [How Habby Mastered TikTok UA for Survivor.io (Naavik)](https://naavik.co/digest/how-habby-mastered-tiktok-ua-for-survivor/)
- [The Evolution of Hybridcasual (Naavik)](https://naavik.co/deep-dives/evolution-of-hybridcasual-deepdive/)
- [Archero 2 Beginner's Guide (Level Winner)](https://www.levelwinner.com/archero-2-beginners-guide/)
- [Archero 2 Guild Guide (Theria Games)](https://theriagames.com/guide/archero-2-guild-guide/)
- [Archero 2 Arena Guide (Theria Games)](https://theriagames.com/guide/archero-2-arena-guide/)
