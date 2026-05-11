# App Store Launch, ASO, and User Acquisition

Research findings for launching an Archero-style iOS mobile game (hybrid-casual / mid-core action). Compiled from Apple developer docs, App Store Connect documentation, AppTweak / Phiture / SplitMetrics / Sensor Tower / GameAnalytics blogs, PocketGamer.biz, Mobile Dev Memo, Matej Lancaric's soft-launch material, and 2025-2026 UA benchmark reports.

---

## 1. App Store Submission

### 1.1 Apple Developer Program

- **Cost:** USD $99/year for an individual or organization account. Organization accounts require a D-U-N-S number and typically take 1-3 weeks to verify; budget an extra two weeks for the legal-name vetting before any code is signed.
- **Required setup:** Apple ID with two-factor auth, tax/banking forms in App Store Connect (Agreements, Tax, and Banking section) before paid downloads or IAP can go live, and a designated Account Holder, Admin, and Finance role split.
- **Certificates:** Distribution certificate, App Store provisioning profile, App ID with required capabilities (Push Notifications, IAP, Game Center, Sign In With Apple if relevant). Use Xcode's automatic signing for the first build to avoid configuration errors.

### 1.2 App Store Connect (ASC)

- **TestFlight:** Up to 100 internal testers (no review required, builds expire in 90 days) and 10,000 external testers (one-time, fast Beta App Review). Use external TestFlight cohorts for retention/monetization sanity checks before any geo soft launch.
- **Builds:** Upload via Xcode, Transporter, or `xcrun altool`. Builds are scanned, then become available in TestFlight within ~15 minutes. Each build is valid for 90 days.
- **Metadata:** App name (30 chars), subtitle (30), promotional text (170, editable without review), description (4000), keywords field (100), what's new (4000), support URL, marketing URL, privacy policy URL, age rating, category, screenshots, app preview videos.
- **Starting April 28, 2026:** All submissions must build with the iOS 26 / iPadOS 26 SDK or later. Plan engine and CI bumps accordingly.

### 1.3 App Review Process and the Guidelines That Hit Games Hardest

Guidelines are grouped into Safety, Performance, Business, Design, Legal. The clauses most likely to bite an Archero-style title:

- **3.1.1 In-App Purchase & loot boxes:** Any randomized reward purchase (gacha pulls, equipment chests, mystery boxes that can be bought directly or with a hard currency obtained from IAP) must disclose the odds of receiving each item type *before* purchase. Show odds inside the store UI, not just in a buried legal page.
- **1.3 Kids Category:** If you opt in, no third-party analytics, no third-party ads, no behavioral advertising, and parental gates on external links and IAP. Most Archero-likes should *not* check the Kids box.
- **5.3 Gambling:** Even simulated gambling with no real money requires age 17+ and cannot offer real-world prizes. Spin-the-wheel daily rewards are fine; "buy a spin" mechanics need to be designed carefully.
- **4.7 / Anti-cheat:** Server-validated economies are expected. Apple does not block client-side games, but cheating that materially affects other users (live PvP leaderboards, guilds) draws Trust & Safety attention.
- **2.5.1 Software Requirements:** Only public APIs, no executable code download. Live-ops content updates are fine; downloading new gameplay logic is not.

### 1.4 Common Rejection Reasons

1. **Crashes / instability** on review devices - test on the lowest spec device you support (iPhone 11 / SE 3rd-gen) before each submission.
2. **Privacy policy missing or inaccessible** - link must be live and reachable from inside the app.
3. **Privacy manifest / SDK signatures missing** for third-party SDKs (Firebase, AppsFlyer, AppLovin, Unity Ads, etc.).
4. **IAP not functional** in the build sent to Review.
5. **Placeholder content** (Lorem ipsum, broken art, debug UI visible).
6. **Misleading metadata or screenshots** showing content not in the app.
7. **Mismatched age rating** vs. actual content (violence, simulated gambling, drug references).
8. **Sign In With Apple missing** when other social logins (Google, Facebook) are offered.
9. **ATT prompt** is required if you use any data for tracking; missing prompt or non-compliant copy is a rejection.
10. **AI / generative features without consent screen** disclosing which provider receives user data.

### 1.5 Pre-Launch Submission Checklist

- Privacy policy URL live and reachable in-app.
- Support URL with a working email or contact form.
- Age rating questionnaire completed (likely 12+ for fantasy violence, 17+ if simulated gambling).
- App Privacy "Data Collected" disclosures match what SDKs actually collect.
- Privacy manifests bundled for every third-party SDK.
- ATT prompt wired and copy approved (clear value statement).
- IAP products created in ASC, attached to the build, and tested in sandbox.
- Loot box / gacha odds visible in the IAP flow.
- Sign In With Apple alongside any other social login.
- Build tested on smallest supported iPhone for crashes and frame-rate.
- TestFlight external review passed.
- Screenshots and preview video match the final build's content.

---

## 2. ASO Basics

### 2.1 Title and Subtitle Strategy

- **Title (30 chars):** Brand first, then most valuable keyword. Example pattern: `Lucent: Archer Roguelike`. Apple's algorithm weighs the title the most.
- **Subtitle (30 chars):** Pick a second-tier keyword cluster that does *not* repeat title words (Apple counts a keyword only once). Example: `Bow Hero Action Dungeons`.
- A keyword that appears in your title, subtitle, or keywords field is also evaluated for proximity and combination; placing two complementary keywords near each other can surface long-tail terms like "archer roguelike dungeon."

### 2.2 Description

- The description is not indexed for search but is used heavily by the App Store's editorial team and increasingly by AI-powered product page summaries. Lead with a 2-line hook, then a feature bullet list, then social proof, then a CTA.
- Use the first ~170 characters as the "above the fold" hook because that is what shows before "more" on the product page.
- **Promotional text** (170 chars) is editable any time without resubmission - use it for live-ops events, seasons, and sales.

### 2.3 Keywords Field (100 chars)

- Comma-separated, no spaces between terms, no plurals (Apple handles them), no repeats of title/subtitle words, no competitor trademarks (rejection risk).
- Sample for an Archero-like: `archer,roguelike,dungeon,arrow,bow,rogue,hero,arena,survivor,shoot,rpg,action,boss,loot`.
- Localize the 100-char field per storefront (each locale gets its own).

### 2.4 Icon, Screenshots, Preview Video

- **Icon A/B testing via Product Page Optimization (PPO):** Up to 3 alternate treatments vs. baseline, tests run up to 90 days, traffic split is configurable. Wait for ~90% confidence before applying a winner. All icon variants must be shipped inside the binary.
- **Screenshots:** First 3 portrait screenshots are decisive - ~90% of users never scroll past them, and optimizing those three can lift conversion 20-35%. Use the "Value - Usage - Trust" framework:
  1. **Value:** big benefit-driven headline ("Master 200 Boss Fights").
  2. **Usage:** show the core loop (movement, auto-shoot, ability pick).
  3. **Trust:** social proof, ratings, or top-chart badge.
- Stack two portrait screenshots side-by-side as a "panorama" pair to grab thumb-stoppers in search results.
- Localize screenshot captions for top languages - Apple's 2025 algorithm indexes caption text.
- **App preview video (up to 30s, up to 3):** First frame is a static poster; it auto-plays muted in search. Hook in the first 3 seconds (boss kill, ability synergy moment).

### 2.5 Localization Tiers

Start with the priority languages, then add tiers based on early UA cohort behavior.

| Tier | Locales | Why |
|------|---------|-----|
| 1 (launch) | en-US, en-GB | Core English revenue and dev iteration speed. |
| 2 (T+0 if budget) | ja, ko, zh-Hans, zh-Hant | CJK is >50% of global mobile gaming revenue; ARPU is highest. |
| 3 (T+2 weeks) | de, fr, es-ES, es-MX, pt-BR, it | EFIGS plus LatAm, fully-localized lifts revenue 35-45%. |
| 4 (T+1 month) | ru, tr, ar, id, th, vi | Large install bases, low CPIs, lifts MAU. |

Tip: even if you don't translate gameplay strings yet, localizing the App Store listing alone meaningfully improves CVR in those locales.

---

## 3. Ratings and Rating Prompts

- Use Apple's `SKStoreReviewController.requestReview()` - the only Apple-approved method. The system shows at most 3 prompts per user per 365 days, regardless of how many times you call it. Users can disable all in-app prompts in iOS Settings.
- Prompt only after a clearly *positive* moment: clearing chapter boss, hitting a new highest stage, completing a daily run with a god-tier build. Never after a death, IAP funnel, or ad.
- Wait for D3+ before the first prompt - early prompts pull in dissatisfied users.
- Track call attempts vs. shown vs. submitted reviews to monitor whether iOS is throttling prompts.
- Build a server-side rule: if a user's local sentiment proxy (recent rage quits, ad cancels) is negative, skip the prompt - some teams route those users to an in-app NPS / feedback form instead.

---

## 4. Soft Launch Strategy

### 4.1 Geos

Pick a small, English-speaking or Western-proxy market for early monetization signal, then a higher-volume market for retention statistical power.

| Geo | Use |
|-----|-----|
| Philippines | Cheap CPIs, large English-speaking population - good for D1/D7 retention and tutorial funnel signal. |
| Canada | Strong proxy for US ARPU, English plus French QA, slightly cheaper CPIs than US. |
| Australia / New Zealand | English, Western ARPU, low fraud, decent volume. |
| Brazil | Cheap CPIs, LatAm proxy, good for stress-testing servers and Portuguese localization. |
| Vietnam, Indonesia, Malaysia | Very cheap CPIs for technical / retention tests, but ARPU is non-representative. |

A common cadence: **Stage 1 (technical):** Philippines + Vietnam, 2 weeks, focus on crash-free sessions and FTUE completion. **Stage 2 (retention):** add Canada + Australia, 4-6 weeks. **Stage 3 (monetization):** add Brazil + Nordics, 6-8 weeks, optimize for ARPDAU and D14 ROAS.

### 4.2 KPI Targets (mid-core / hybrid action)

| Metric | Floor | Strong | Excellent |
|--------|-------|--------|-----------|
| Install -> tutorial complete | 70% | 80% | 90% |
| D1 retention | 35% | 40-45% | 50%+ |
| D7 retention | 12% | 18-22% | 25%+ |
| D30 retention | 5% | 8-10% | 12%+ |
| ARPDAU (US/CA, blended) | $0.08 | $0.15-0.25 | $0.30+ |
| Conversion to payer (D7) | 1.5% | 3-4% | 5%+ |
| D7 ROAS (iOS) | 8% | 15% | 25%+ |
| D30 ROAS (iOS) | 25% | 40-50% | 60%+ |
| Session length | 6 min | 10-12 min | 15+ min |
| Sessions/day | 2.0 | 3-4 | 5+ |

Reference: GameAnalytics 2025 benchmarks put the top-quartile iOS D1 at ~31-33% across all genres; mid-core hits the upper end of this. Archero's launch hit D1 ~50% in soft launch.

### 4.3 When to Scale to Global

Soft launch ends when **(a) D1, D7, D30 retention** sit at "strong" tier in at least 2 representative geos AND **(b) D7 ROAS** is on track to hit D90 payback below 6 months. If retention is good but monetization is weak, iterate on economy and ad placement; don't try to fix it with global UA.

---

## 5. User Acquisition

### 5.1 Paid Channels

| Channel | Strengths | Weaknesses | Best use |
|---------|-----------|------------|----------|
| **Meta (Facebook / Instagram)** | Massive scale, strong AEM iOS signal, great for video creatives. | Creative fatigue is brutal; iOS CPI risen ~38% YoY on casual. | Primary scaling lever, especially Reels-format vertical video. |
| **TikTok Ads** | Lower CPI than Meta on creative-heavy genres (15-25% cheaper), young demos, viral hooks. | Less mature attribution outside SKAN 4. | Younger demo, hook-driven creatives, UGC and influencer-style ads. |
| **Apple Search Ads** | Deterministic, high-intent users; D1 retention 15-20% higher than other paid. | Capped scale, expensive on competitor terms. | Always-on Discovery + Brand + Category + Competitor architecture. |
| **AppLovin (AppDiscovery / Axon)** | Strong ML, well suited to mid-core, growing share. | Needs ~10 purchases/day per campaign to optimize; data-hungry. | Scaling lever once IAP signal is consistent. |
| **Google App Campaigns (AC)** | Reach across YouTube, Search, Play (cross-platform). | Less iOS share than Android; opaque optimization. | Diversification, not primary at launch. |
| **Unity Ads / IronSource** | Direct access to gaming inventory and rewarded video. | Lower-intent traffic for IAP-driven games. | Cross-promo and rewarded video integrations. |
| **Moloco** | ML on programmatic ad exchange inventory. | Requires healthy IAP signal first. | Late soft launch / early global scale. |

### 5.2 Creative Cadence

- Plan for **20-40 new creatives per month** (5-10 per week) on Meta + TikTok combined.
- Refresh winning ad sets every 7-10 days; full refresh every 2-3 weeks before fatigue kills CTR.
- Start each test wave with 3-6 high-quality variants per concept rather than 20 thin ones.
- Test **concept buckets** (gameplay loop hook, "wrong-way-to-play" satire, character ability showcase, boss-kill power fantasy, meta-progression / build crafting). Archero famously rode "fake gameplay" misdirection creatives - test that lane carefully (Apple flags strongly misleading creatives).

### 5.3 Influencer / Creator Marketing

- **TikTok creators (1-2M followers in gaming niche):** $1-3k per integration is typical; micro creators (100-500k) are often more cost-effective and authentic.
- **YouTube Shorts:** Repurpose TikTok deliverables; pay rights to whitelist for paid spark/branded posts.
- **Twitch:** Less useful for hybrid-casual / Archero clones - viewers want long-session competitive content. Reserve Twitch for guild-or PvP-driven phases.
- Brief direction, not script. Give creators a beat sheet (hook, gameplay moment, install CTA) and a list of dos/don'ts.

### 5.4 Organic Levers

- **Viral hooks in the meta:** "best build" screens, daily run highlights, shareable death replays. Add a one-tap share that posts a 9:16 video to TikTok or Reels.
- **Cross-promotion:** Trade install slots with other indie iOS games via networks like Chartboost cross-promo or direct deals.
- **Community:** Reddit /r/iOSGaming, /r/Archero, /r/incremental_games. Stand up a Discord at soft launch and surface it from the main menu. Discord communities are where you'll find your meta-game testers and best YouTube outreach leads.
- **App Store Today tab / Apple feature:** Pitch your Apple Developer rep 8-12 weeks before launch with a polished press kit and a list of platform-defining features (iCloud, Metal, Live Activities, Game Center achievements, controller support).

---

## 6. iOS UA Specifics

### 6.1 SKAdNetwork 4 (SKAN 4) and ATT

- SKAN 4 supports up to 3 postbacks per install at 0-2, 3-7, and 8-35 days, plus coarse (low/medium/high) and fine conversion values. This dramatically improves D7 / D30 LTV modeling versus SKAN 3.
- Adjust and TikTok reported ~37% CPA improvement and ~220% iOS conversion lift after SKAN 4 migration.
- **ATT prompt:** Required if you use IDFA-based attribution or ad personalization. Best practice is to delay the prompt to a friendly moment (after FTUE chapter 1 clear), use clear copy that explains the value ("Personalize events and rewards"), and split-test prompt timing.
- Run **Meta Aggregated Event Measurement (AEM) and SKAN 4 side-by-side** - AEM provides earlier signal, SKAN 4 provides cleaner cohort numbers. This is now the iOS UA standard.

### 6.2 Apple Search Ads

- **Apple Ads Basic:** Up to $10k/month/app, fully automated, CPI-billed. Useful for the first 30 days when you're learning - turn on, give Apple your daily cap, let it run.
- **Apple Ads Advanced:** Manual keyword bidding, full reporting, custom audiences (new users, returning, lapsed). Required to scale beyond a few thousand dollars per month or to bid on competitor keywords.
- **Four-campaign structure** (the industry standard):
  1. **Discovery:** broad / search-match, low bids, mines new keywords.
  2. **Brand:** your own app name and variants, protects against competitors bidding on you.
  3. **Category:** generic intent keywords (`roguelike`, `archery game`, `bow hero`).
  4. **Competitor:** rivals' app names (`archero`, `survivor.io`, `magic survival`). Bids are higher; intent is to steal high-LTV switchers.
- Negative keyword lists are critical to prevent the Discovery campaign cannibalizing the others.
- As of March 2026, Apple shows two ads per search result, so impression share gets diluted - expect to bid 10-20% higher on top terms.

---

## 7. Budgets

### 7.1 Soft Launch UA Budget Tiers

Soft launch budgets are about **buying enough data to trust the signal**, not buying scale.

| Tier | Total soft launch spend | Typical setup |
|------|--------------------------|---------------|
| Lean indie | $15k - $30k over 8-12 weeks | Apple Search Ads Basic + Meta Reels, 2 geos (PH + CA), 2-3 creative concepts/week. |
| Mid | $50k - $100k over 10-14 weeks | Adds TikTok + AppLovin tests in CA / AU / BR, 5-8 creatives/week, light influencer slate. |
| Funded | $150k - $400k+ over 12-16 weeks | Adds Moloco, Google AC, larger influencer push, 3 geos staged, daily UA team meeting. |

Per-region per-platform per-day rule of thumb: **$500-$1,000/day** is enough to get statistically meaningful retention data in 2-3 weeks for casual/mid-core.

### 7.2 LTV Targets for Mid-Core Action / Roguelike

| Target | iOS US/CA mid-core hybrid |
|--------|----------------------------|
| D7 LTV | $0.80 - $1.50 |
| D30 LTV | $2.50 - $5.00 |
| D90 LTV | $4.50 - $9.00 |
| D180 LTV | $6.00 - $14.00 |
| Payback window | <= 180 days (ideal <= 120) |
| Blended payer % (lifetime) | 4-7% |
| Whale share of IAP rev | 50-70% |

Genre note: pure hyper-casual is ad-only with D30 LTV of $0.30-$0.80; Archero-style hybrids should target **2-3x that** thanks to IAP plus rewarded video.

---

## 8. PR and Influencer Outreach

- **TouchArcade:** Forums (`toucharcade.com/community`) are still active even though the editorial site is in maintenance mode; posting a soft launch thread there gets you early mid-core players.
- **Pocket Gamer / PocketGamer.biz:** Editorial coverage is hard but doable - pitch a press kit (logline, GIFs, video, soft launch story, founder bio) 4-6 weeks before launch. Big Indie Pitch is a free showcase to know about.
- **App Magic / Sensor Tower / data.ai blogs:** Reach out with launch numbers post-launch for case studies.
- **Reddit communities:** /r/iOSGaming (mod-friendly to launch threads if you flair correctly), /r/incremental_games, /r/RoguelikeDevelopers, /r/Unity3D, /r/gamedev (for the dev story angle).
- **YouTuber outreach pre-launch:** Build a list of 30-50 creators in the action / roguelike / mobile space (300k-2M subs). Send personalized DMs with a TestFlight code, 7-day exclusive build, and a 90-second pitch video. Offer revenue share or flat fee plus performance bonus on installs.
- **Discord servers:** Indie Game Marketing, Indie Game Promotion, Mobile Free To Play, and several creator-run servers - good for warm intros to creators and other devs willing to cross-promote.

---

## 9. Launch Plan Recommendation

### 9.1 Pre-Launch Checklist (10 items)

1. Apple Developer org account verified, banking and tax forms signed in ASC.
2. Privacy policy + support URL live; ATT prompt and consent screens wired.
3. App Privacy data disclosures and SDK privacy manifests filed.
4. IAP catalog created in ASC, gacha/loot odds visible in-store.
5. Sign In With Apple alongside any other social login.
6. TestFlight external review passed; 100+ beta testers running for 2+ weeks.
7. ASO assets ready: en-US + 3 priority locales (ja, ko, pt-BR) for icon, 5 screenshots, 1 preview video.
8. PPO test queued for App Store launch day (icon variant A/B).
9. Press kit + 30-creator outreach list ready, with 5 pre-launch coverage commitments.
10. UA tracking stack (Adjust or AppsFlyer + Meta AEM + SKAN 4) validated against test installs.

### 9.2 Soft Launch Plan

- **Geos:** Stage 1 Philippines (tech), Stage 2 Canada + Australia (retention), Stage 3 Brazil + Nordics (monetization).
- **Duration:** 10-14 weeks total.
- **Budget:** $50k-$100k (Mid tier), ramping from $500/day per channel per geo to $2k/day in the monetization stage.
- **Exit KPI gates:** D1 >= 40%, D7 >= 18%, D30 >= 8%, D7 ROAS >= 15%, D90 payback trajectory <= 180 days.

### 9.3 ASO Framework

- **Title:** `Lucent: Archer Roguelike` (brand + top keyword).
- **Subtitle:** `Bow Hero Action Dungeons` (second keyword cluster, no title repeats).
- **Keywords (en-US):** `archer,roguelike,dungeon,bow,arrow,rogue,hero,arena,survivor,shoot,rpg,action,boss,loot`.
- **Icon:** Hero portrait + glowing bow; A/B test 3 variants (portrait, weapon, monster silhouette) via PPO.
- **Screenshots 1-3:** (1) Value headline "Master 200 Boss Fights" over hero pose; (2) gameplay screen with ability stack callout; (3) social-proof "Top 50 Action" badge plus build progression.
- **Preview video:** 22-second cut - 3s hook (boss kill) -> 10s loop showcase -> 6s meta progression -> 3s CTA.

### 9.4 UA Channel Mix at Launch

- Apple Search Ads Advanced (4-campaign structure): 25% of spend.
- Meta Ads (Reels + Stories vertical video): 35%.
- TikTok Ads (UGC + creator whitelisted posts): 25%.
- AppLovin / Moloco programmatic test: 10%.
- Influencer / creator flat-fee deals: 5%.
- Creative cadence: 20-30 new ads/month split Meta+TikTok, weekly refresh of top performers.

### 9.5 Budget Tier Suggestions

- **Lean indie:** $20k soft launch + $40k global month 1, total ~$60k year-one UA, target D90 payback.
- **Mid:** $80k soft launch + $250k global month 1-3, total ~$500k year-one UA, target D120 payback.
- **Funded:** $300k soft launch + $1M+ global month 1-3, total ~$3-5M year-one UA, target D150 payback with scale.

Across all tiers, **gate scale on D7 ROAS hitting target for 14 consecutive days** before doubling spend; pull back fast on creative fatigue and refresh weekly.

---

## Sources

- Apple Developer - App Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Apple Developer - Product Page Optimization: https://developer.apple.com/app-store/product-page-optimization/
- Apple Developer - SKStoreReviewController: https://developer.apple.com/documentation/storekit/skstorereviewcontroller
- AppTweak - Keyword Research and Apple Search Ads guides (2026): https://www.apptweak.com/en/aso-blog
- Phiture ASO Stack - 2026 trends: https://phiture.com/asostack/aso-trends-in-2026/
- SplitMetrics - SKAdNetwork and screenshot guides: https://splitmetrics.com/blog/
- GameAnalytics - 2025 Mobile Gaming Benchmarks: https://www.gameanalytics.com/reports/2025-mobile-gaming-benchmarks
- Matej Lancaric - Soft Launch Bible 2025: https://lancaric.substack.com/p/the-soft-launch-bible-full-2025-blueprint
- Mobile Dev Memo - Eric Seufert on soft launch: https://mobiledevmemo.com/how-to-optimally-soft-launch-a-mobile-game-in-2022/
- Deconstructor of Fun - Archero case study: https://www.deconstructoroffun.com/blog/2019/8/9/why-archero-banked-25m-but-leaves-25m-hanging-hlx9n
- Udonis - Mid-core mobile games 2026 / Archero dissection: https://www.blog.udonis.co/mobile-marketing/mobile-games/mid-core-games
- Admiral Media - Mobile game marketing benchmarks 2025: https://admiral.media/mobile-game-marketing-benchmarks/
- PocketGamer.biz - PR tricks and SKAN 4 case study: https://www.pocketgamer.biz/
- Segwise - Meta AEM vs SKAN 2026: https://segwise.ai/blog/meta-aem-vs-skan-2025-ios-attribution
- MAF - UA cost benchmarks and mid-core data: https://maf.ad/en/blog/
- LocalizeDirect - Game localization 2025: https://www.localizedirect.com/posts/top-languages-for-game-localization
- FoxData - Apple Ads 2026 guide: https://foxdata.com/en/blogs/apple-ads-2026-guide-campaign-structure-automation-scaling-strategies/
