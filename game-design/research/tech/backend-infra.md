# Backend, Accounts & Cloud Infrastructure Research

**Project:** Lucent (iOS-only Archero-style F2P mobile game)
**Date:** 2026-05-11
**Status:** Research draft for pre-production tech selection

---

## 1. Executive Summary

We need a backend that handles cloud save, server-authoritative economy, leaderboards, LiveOps (remote config + A/B + scheduled events), receipt validation, push, and analytics — for an iOS-only Archero-style runner where each "run" is a discrete unit that can be reported and validated end-to-end. Async PvP and guilds may follow.

After comparing seven options, the most pragmatic launch stack is a **Firebase-primary backend** (Sign in with Apple + anonymous link, Firestore for player profiles, Cloud Functions for server-authoritative grants/run validation, Remote Config + A/B Testing for LiveOps, FCM + APNs for push, Crashlytics) paired with **RevenueCat** for StoreKit 2 IAPs and **GameAnalytics** (or Firebase Analytics + a warehouse later) for player funnels. Apple Game Center is added purely for native leaderboards/achievements UI and friend discovery — not as our system of record.

This stack costs roughly **$0–$50/month at launch** (well within Firebase Spark + RevenueCat free tier), grows to **~$300–$600/month at 100k MAU**, and gives us a clean migration path to PlayFab or Nakama if we outgrow Firestore's economy model or need real-time multiplayer.

---

## 2. Requirements Recap

| Capability | Need | Notes |
|---|---|---|
| Auth | Sign in with Apple, anonymous device-id, account linking | First launch must "just work" with zero friction |
| Player data store | ~5–50 KB per player; ~10–100 ops/session | Profile, inventory, progression, gacha rolls |
| LiveOps | Remote config, A/B, scheduled events, segmentation | Daily/weekly/seasonal events, drop-rate tuning |
| Virtual economy | Server-authoritative gold/gem balances, idempotent grants | Anti-duplicate from network retries |
| Receipt validation | StoreKit 2 JWS verification, entitlements | Prefer hosted: RevenueCat or PlayFab |
| Anti-cheat | Server validation of run outcomes, rate limits, anomaly | Signed run summaries; reject impossible runs |
| Leaderboards | Global + friends + (later) guild; weekly/seasonal resets | Hundreds–thousands of writes/sec at peak |
| Push | APNs via FCM | Liveops nudges, event start, energy refill |
| Analytics | Funnels, D1/D7/D30, custom events, cohorts | First-party + MMP attribution later |
| Scale | 1k → 100k → 1M MAU | Cost-linear, no architectural rewrites |

---

## 3. Option-by-Option Comparison

### 3.1 Apple Game Center / GameKit / CloudKit

Apple's native gaming stack. **Game Center** provides authentication tied to Apple ID, leaderboards UI, achievements, and challenges. **GameKit** is the SDK. **CloudKit** is general-purpose iCloud storage you can use as a database.

**Pros**
- Free at any scale (CloudKit's per-user quotas come from the user's iCloud, not your budget).
- Zero-friction sign-in: tap-and-you're-in on a logged-in Apple ID device.
- Native leaderboard UI that players already trust.
- Apple's privacy story is unbeatable for App Store review.

**Cons**
- **No A/B testing, no remote config, no LiveOps tooling**, no segmentation.
- **CloudKit isn't suitable as a primary game DB** — it has aggressive rate limits, eventually consistent queries, and isn't designed for real-time game writes ([Apple Dev Forums on CloudKit limits](https://developer.apple.com/forums/thread/131696)).
- Multiplayer (`GKMatch`) capped at 4 players and disconnects regularly.
- iOS-only — if we ever want Android, this stack throws everything away.
- No webhook surface for server-side authoritative grants or analytics.
- No receipt validation helpers.

**Verdict:** Use Game Center as an **adjunct** (leaderboard UI + friend graph) but never as the system of record. CloudKit is out.

### 3.2 Firebase (Auth + Firestore + Functions + Remote Config + FCM + Crashlytics + Analytics)

Google's BaaS, the de-facto default for indie mobile.

**Auth.** Native Sign in with Apple provider plus anonymous auth and account linking; the anonymous UID is preserved on upgrade so player data is never orphaned ([Firebase anonymous auth docs](https://firebase.google.com/docs/auth/ios/anonymous-auth)). Free up to 50k MAU, then $0.0055/MAU.

**Firestore.** Document DB, fits a player profile per doc nicely. Key constraint: a single document has a ~1 write/sec throughput limit; global counters need [distributed counter sharding](https://firebase.google.com/docs/firestore/solutions/counters). For leaderboards, the official pattern uses [per-bucket aggregation with distributed counters](https://firebase.google.com/learn/pathways/firebase-leaderboards-with-firestore) — works to ~10k concurrent writers with a few hundred shards but gets gnarly past that.

**Cloud Functions.** Where we put server-authoritative logic: validate run summaries, grant rewards atomically, verify StoreKit 2 JWS, redeem promo codes. 2M invocations/month free.

**Remote Config + A/B Testing.** Strong LiveOps tooling: parameter overrides by audience, drop-rate experiments tied to Analytics goals, schedule by date. Not as game-specific as PlayFab's segments, but covers 80% of Archero-style ops.

**Cloud Messaging (FCM).** Free APNs proxy. Topic + token messaging, scheduled sends.

**Analytics + Crashlytics.** Free, with 500 unique events × 25 params each. BigQuery export is the upgrade path for funnels.

**Cost (rough)**
- 10k MAU: $0 (Spark tier).
- 100k MAU: ~$275 Auth + ~$50–$200 Firestore ops (depends heavily on session reads/writes) + ~$30 Functions = **~$350–$600/mo**.
- 1M MAU: $5k MAU overage + database costs balloon if not optimized; teams have reported $2k–$5k/mo for chat-heavy apps at 100k DAU ([Firebase pricing breakdown](https://www.sashido.io/en/blog/firebase-guide-and-pricing-traps-2026)). Expect **$3k–$10k/mo at 1M MAU**.

**Lock-in risk.** Medium. Firestore data model and security rules are Firestore-specific, but the data is portable (export to BigQuery / GCS). Auth UIDs are portable.

### 3.3 Supabase

Open-source Postgres + Auth + Storage + Edge Functions + Realtime.

**Pros**
- Real Postgres — joins, transactions, foreign keys, the right tool for an economy schema. Idempotent grant APIs become a `INSERT ... ON CONFLICT DO NOTHING` away.
- Row-level security is genuinely good for "player can only read their own row" rules.
- Predictable pricing: **Pro $25/mo includes 100k MAU**, then $0.00325/MAU; database scales independently.
- Self-hostable escape hatch.

**Cons**
- No LiveOps tooling. You build remote config / A/B / segmentation on top of Postgres yourself, or bolt on something else (e.g., GrowthBook, Unleash).
- No purpose-built leaderboard or economy primitives — you write them.
- No first-party iOS SDK for games; the Swift SDK is general-purpose. Unity support exists in the community but isn't on par with Firebase or PlayFab.
- No native push service — you'd add OneSignal or wire APNs directly.

**Cost**
- 10k MAU: $0–$25 (Free or Pro).
- 100k MAU: $25 base + DB compute (likely $25–$200) = **~$50–$250/mo**.
- 1M MAU: ~$25 + ~2,925 MAU overage + compute = **~$500–$2,000/mo**, cheaper than Firebase at scale.

**Verdict:** Excellent if we want SQL and don't mind building LiveOps. Skip for v1 because the LiveOps gap is real.

### 3.4 Microsoft PlayFab

Purpose-built game backend. Title-based pricing with consumption metering.

**Capabilities — full house for what we need**
- Auth: Sign in with Apple, Game Center, anonymous device ID, custom IDs, account linking ([PlayFab auth docs](https://learn.microsoft.com/en-us/gaming/playfab/features/authentication)).
- Player data: title-scoped + read-only + internal data buckets, plus PlayStream events.
- **Economy v2**: items, currencies, stacks, drop tables, **idempotent grants via `IdempotencyId` enforced for 14 days** ([Economy v2 idempotency](https://learn.microsoft.com/en-us/gaming/playfab/economy-monetization/economy-v2/inventory/items-and-inventory-overview)).
- LiveOps: segments, scheduled tasks, A/B tests, content updates, push templates, mail.
- Leaderboards + statistics, friends, guilds (groups), tournaments.
- **Receipt validation** for App Store and Play Store built in.
- CloudScript (server-authoritative JS/C#) for run validation.

**Pricing**
- Free dev mode: 10 titles, 1,000 lifetime players each. Useless past beta.
- **Pay-as-you-go**: $0 base, consumption-metered (Profile reads $0.33/M, writes $7.15/M, PlayStream $6.60/M).
- **Standard $99/mo** with $400 of included meters.
- **Premium $1,999/mo** with $8,000 included.

**Cost estimate (heavy assumptions)**
- 10k MAU: pay-as-you-go, likely **$10–$80/mo**.
- 100k MAU: probably Standard tier $99 + small overages = **$150–$400/mo**.
- 1M MAU: $1k–$3k/mo realistic if profile writes are kept thin.

**Pros**
- Every requirement on the list has a first-class feature.
- iOS SDK + Unity SDK both mature and well-documented.
- Excellent fit for Archero-style economy & LiveOps.

**Cons**
- Steep learning curve and console-heavy UX.
- Lock-in is real: porting Economy v2 + Segments out is non-trivial.
- Newer Foundation Mode / Xbox-coupled pricing introduces some strategic uncertainty.

**Verdict:** Strongest single-vendor fit on paper. Heavier than we need at launch. Keep as a planned migration target if Firebase economy logic gets gnarly.

### 3.5 AWS GameLift + GameTech

GameLift is for **dedicated multiplayer server hosting**. Not a player-data backend. The rest of AWS Game Tech (Cognito + DynamoDB + Lambda + AppSync + Pinpoint) is buildable but is essentially "build your own backend from cloud Legos."

**Pros**
- Infinite scale, full control, every primitive AWS sells.
- GameLift makes sense the day we ship realtime PvP at scale.

**Cons**
- High operational burden. Cognito UX is notoriously rough. DynamoDB design effort is significant for an indie team.
- No LiveOps tooling out of the box.
- Cost is opaque until you build the system.

**Verdict:** Overkill for an Archero-style runner. Revisit only if we hit dedicated-server PvP at hundreds of concurrent rooms.

### 3.6 Nakama (Heroic Labs)

Open-source Go game server with first-class support for auth, social, leaderboards, tournaments, parties, matchmaker, RPCs (server-authoritative custom logic in TypeScript/Go/Lua), and storage.

**Pros**
- Game-specific primitives: tournaments, leaderboards, parties, groups, matchmaker — all native and battle-tested.
- Server-authoritative RPCs are a perfect fit for "submit signed run summary → validate → grant rewards."
- Self-host for ~$50–$300/mo on a small cluster up through six figures of MAU.
- Heroic Cloud is the managed option — unlimited DAU per cluster, dedicated hardware; pricing is configurator-based, plus optional $2k–$6k/mo support tiers.
- Open source so no real lock-in: you keep the schema.

**Cons**
- Heavy by indie standards: you operate it (or pay Heroic Cloud).
- Companion LiveOps product (Satori) is separate and adds cost.
- No native push — wire APNs yourself or via FCM.
- iOS Swift SDK exists but is less polished than Firebase's; Unity client is excellent.

**Verdict:** The right pick if/when we go async-PvP + tournaments at scale. Too operational for launch.

### 3.7 Custom Node/Go on Cloud Run or Fly.io + Managed Postgres

Bring-your-own backend.

**Pros**
- Total control. Cheapest possible at very low scale (Cloud Run has 2M free invocations/mo; Fly.io's free tier covers prototyping).
- No vendor opinions polluting our schema.

**Cons**
- We build auth, receipt validation, leaderboards, segmentation, A/B, push, analytics from scratch. Weeks-to-months of dev cost.
- Operational toil: deploys, schema migrations, observability, on-call.
- No game-specific primitives.

**Cost**
- 10k MAU: $5–$30 on Cloud Run / Fly + Neon/Supabase Postgres.
- 100k MAU: $100–$500 depending on traffic shape.
- 1M MAU: $1k–$5k with good engineering.

**Verdict:** Only justifiable if we have a senior backend engineer who *wants* to build it. We don't, and this isn't where our differentiation lives.

---

## 4. Comparison Table

| Capability | Game Center / CloudKit | Firebase | Supabase | PlayFab | AWS Game Tech | Nakama | Custom |
|---|---|---|---|---|---|---|---|
| Sign in with Apple | Native (Game Center only) | First-class | First-class | First-class | Cognito (clunky) | Plug-in | DIY |
| Anonymous + linking | Limited | Excellent | Good | Excellent | OK | Good | DIY |
| Player data store | CloudKit (rate-limited) | Firestore (good) | Postgres (great) | Profile + Title data | DynamoDB | Storage engine | Any DB |
| LiveOps / Remote Config | None | Strong | None (DIY) | Best-in-class | Build it | Satori (paid) | DIY |
| A/B testing | None | Built-in | DIY | Built-in | Build it | Satori | DIY |
| Virtual economy | None | Functions + Firestore | Postgres tx | Economy v2 (best) | Build it | RPCs + storage | DIY |
| Idempotent grants | N/A | Firestore tx | SQL upsert | Native (14-day) | Build it | RPC idempotency | DIY |
| StoreKit 2 receipts | None | Functions + lib | Edge fn + lib | Native | Build it | Plug-in | DIY |
| Anti-cheat hooks | None | Functions | Edge fn / triggers | CloudScript | Build it | Server RPCs (great) | DIY |
| Leaderboards | UI yes, scale limited | Firestore (sharded) | SQL (manual) | Native, scales | DIY | Native, excellent | DIY |
| Push (APNs) | N/A | FCM (great) | OneSignal add-on | Native | Pinpoint | DIY | DIY |
| Analytics | Game Center stats only | Free, BigQuery export | DIY | PlayStream (rich) | Pinpoint + QuickSight | Add-on | DIY |
| iOS SDK quality | Native | Excellent | Good (general) | Excellent | OK | Good | DIY |
| Unity SDK | Plug-ins | Excellent | Community | Excellent | OK | Excellent | DIY |
| Cost @ 10k MAU | $0 | $0 | $0–$25 | $0–$80 | $50+ | $50–$200 (self-host) | $5–$30 |
| Cost @ 100k MAU | $0 | $350–$600 | $50–$250 | $150–$400 | $300–$1k | $300–$800 | $100–$500 |
| Cost @ 1M MAU | $0 | $3k–$10k | $500–$2k | $1k–$3k | $2k–$8k | $1k–$3k | $1k–$5k |
| Lock-in | Total (iOS-only) | Medium | Low (OSS Postgres) | High | Medium | Low (OSS) | None |
| Op burden | None | Low | Low–Med | Low | High | High | High |

---

## 5. Cross-Cutting Topics

### 5.1 Sign in with Apple vs Game Center vs Anonymous Device-ID

**Sign in with Apple.**
- Works across iOS, web, and (eventually) Android.
- User can hide email via `privaterelay.appleid.com`.
- Required by Apple if we offer *any* third-party social login. We won't, but it's still the right primary identity.
- Friction: one Face ID confirmation.

**Game Center.**
- Tap-zero friction if signed into iCloud (the player's Game Center ID is just there).
- Provides a free friend graph and leaderboard UI players recognize.
- Tied to Apple ID. Switching iCloud accounts on-device creates a different Game Center user.
- **No relationship between Sign in with Apple identity and Game Center identity** ([Apple Developer Forums](https://developer.apple.com/forums/thread/133828)) — they are independent identifiers.
- We can use it for *social/UI features* but should not anchor account identity to it alone.

**Anonymous device ID.**
- Best onboarding — zero taps. Player plays immediately.
- Risk: lost on app uninstall or device change. Must be paired with a linking flow.

**Recommended flow for Lucent:**

1. First launch → silent **anonymous Firebase Auth** + generate device-bound key for run-summary signing.
2. Silent **Game Center sign-in attempt** (no UI if user has GC enabled); store `teamPlayerID` against the anonymous UID for leaderboard posting + friends.
3. After the player has invested (e.g., first IAP, or end of chapter 2), prompt for **Sign in with Apple** and call Firebase `linkWithCredential`. UID is preserved, data carries over.
4. Anyone on a new device taps "Restore" → Sign in with Apple → Firebase finds the existing UID → state is restored.

This gives us frictionless start, social leaderboards, durable identity, and a clean restore path — without ever asking for an email/password.

### 5.2 Server-Authoritative vs Client-Authoritative State

An Archero-style game has a **discrete "run"** unit: enter chapter, fight rooms, die or beat boss, return to hub. That structure is friendly to a hybrid model:

**Client-authoritative (acceptable):**
- Per-frame movement, dodging, projectile rendering. Latency-critical, no economic impact.
- Cosmetic state, animations.

**Server-authoritative (mandatory):**
- Gold/gem balances and all currency mutations.
- Inventory & equipment ownership.
- Run rewards (XP, drops, key currency).
- Gacha pulls (server rolls against drop tables).
- IAP entitlements (RevenueCat is system of record).
- Energy/stamina regeneration timers.
- Leaderboard score submission.
- Daily/event progress completion.

**Pattern: signed end-of-run report.**

```
Client at run start:
  POST /run/start {hero, build, chapter, seed} → server returns runId + serverSeed + nonce
Client during run:
  Uses serverSeed for spawn/loot RNG so server can replay
Client at run end:
  POST /run/complete {runId, durationMs, kills, damage, dmgTaken, peakDPS, score, hash}
  Body is HMAC-signed with a per-session key derived during /run/start
Server:
  Validate signature + nonce (replay protection)
  Run sanity checks (see 5.3)
  Re-simulate or spot-check loot using serverSeed
  Atomic Firestore transaction (idempotent on runId): grant gold/xp/drops, write leaderboard score
  Return signed reward bundle to client
```

This keeps the server cheap (no full simulation) but unfalsifiable (the server picked the seed, controls drop tables, and validates aggregate metrics).

### 5.3 Anti-Cheat Strategy

Layered, all server-side. The bar is "make memory editors and modified clients economically uninteresting," not "stop a state-actor."

**Layer 1 — Schema & contract.**
- All currency mutations through Cloud Functions only. Firestore security rules deny client writes to balance fields.
- Idempotency keys (`runId`, `purchaseToken`, `eventClaimId`) prevent retry duplication.

**Layer 2 — Sanity checks per run.**
- `durationMs >= chapter.minPossibleDurationMs` (~30s of frames).
- `kills <= chapter.maxEnemies * 1.1`.
- `damageDealt / durationMs <= maxPossibleDPS(hero, build) * 1.5`.
- `damageTaken >= 0` unless invulnerability item equipped.
- Score within `[0, maxAchievableScore]`.
- Loot count consistent with `chapter.lootTable` distribution given `serverSeed`.

**Layer 3 — Rate limits.**
- Per-player: max N `/run/complete` per minute, max M IAP-grants per hour, max K leaderboard submits per hour.
- Per-IP: looser global caps via Cloudflare / Firebase App Check.
- App Check (Firebase) attests the binary is unmodified and running on real iOS.

**Layer 4 — Anomaly detection (offline, async).**
- Nightly BigQuery job: flag players whose 7-day gold gain Z-score > 4σ vs. their cohort, or whose DPS sits above the 99.5th percentile by build.
- Cluster suspicious accounts (same IP + same UA + same anomaly pattern).
- Auto-shadow-ban: keep account playable, exclude from leaderboards, throttle rewards.

**Layer 5 — Receipt validation.**
- All IAPs through RevenueCat (or a Cloud Function that validates the JWS via Apple's verifier).
- Never trust client-reported entitlements; pull from RevenueCat's REST API on session start.

**Layer 6 — Build attestation.**
- Firebase App Check (DeviceCheck / App Attest on iOS) gates all server endpoints.
- Cloud Functions reject calls without a valid attestation token.

### 5.4 Minimum-Viable Backend for Launch

Cheapest path that doesn't paint us into a corner:

- **Auth:** Firebase Auth — anonymous → Sign in with Apple linking. ($0 ≤ 50k MAU)
- **Game Center:** integrate for leaderboard/achievements UI + friend discovery only. (free)
- **DB:** Firestore. One `users/{uid}` document, sub-collections for `runs`, `inventory`, `mail`. ($0 at low scale)
- **Server logic:** Cloud Functions (TypeScript). Endpoints: `runStart`, `runComplete`, `claimMail`, `gachaPull`, `purchaseGrant`. ($0 ≤ 2M calls/mo)
- **LiveOps:** Firebase Remote Config + A/B Testing for drop rates, event flags, paywall variants. (free)
- **Push:** FCM → APNs. (free)
- **Crash + perf:** Crashlytics + Performance Monitoring. (free)
- **Analytics:** GameAnalytics (game-specific funnels, retention, progression) + Firebase Analytics (BigQuery export retained for warehouse later). (free)
- **IAPs:** RevenueCat. (free ≤ $2,500/mo MTR, then 1%)
- **Attestation:** Firebase App Check (App Attest). (free)
- **Ads (if/when monetized):** AppLovin MAX mediation. (rev-share, no upfront)

**Estimated cost at launch (≤10k MAU, pre-revenue):** $0.

### 5.5 Scaling Path (1k → 100k → 1M MAU)

**1k MAU (soft launch).** Spark tier. Single Firestore region. Cloud Functions in `us-central1`. Use Apple TestFlight + a TestFlight-only Remote Config audience for kill-switches.

**10k MAU.** Move to Blaze plan to remove daily caps. Turn on BigQuery export for Analytics. Add Sentry alongside Crashlytics for error context.

**100k MAU.** Cost watch: enforce read-budget per session (cache profile, batch reads). Add Redis (Memorystore) in front of leaderboard reads. Consider Cloud Tasks for fanout (mail to a guild). RevenueCat moves to paid 1% tier.

**~250k MAU.** Decision point: stay on Firestore or migrate the economy + leaderboards to PlayFab. Indicator to migrate: Firestore costs exceed $1k/mo *and* we're hitting hot-document write contention on leaderboards or guild chests.

**1M MAU.** Likely on PlayFab (economy + leaderboards + segments) or Nakama (if real-time async PvP / tournaments are core). Firebase stays for Auth + Analytics + Crashlytics + Remote Config. Postgres warehouse (BigQuery → dbt) for retention modelling.

---

## 6. Pricing Snapshot at 100k MAU (one-page)

| Service | Tier | Est. cost/mo |
|---|---|---|
| Firebase Auth (100k MAU, 50k free, 50k paid) | Blaze | ~$275 |
| Firestore reads/writes (assume 60 ops/session, 2 sessions/day) | Blaze | $50–$200 |
| Cloud Functions | Blaze | $20–$60 |
| Cloud Messaging (FCM) | Free | $0 |
| Analytics + Crashlytics + Remote Config + A/B | Free | $0 |
| BigQuery export | Pay-as-go | $20–$100 |
| RevenueCat (assume $20k MTR) | Pro | ~$175 |
| GameAnalytics | Free | $0 |
| AppLovin MAX | Rev-share | $0 |
| **Total** | | **~$540–$810** |

At 1M MAU, the same stack lands around **$3k–$10k/mo**, with Firestore Auth being the most punishing line item. The migration trigger to PlayFab is roughly when Firestore + Auth combined exceed $2k/mo — PlayFab's Standard tier ($99 + meters) starts to win.

---

## 7. Recommendation

### Primary Backend: **Firebase**, with strategic adjuncts

We pick Firebase because it is the only single-vendor option that gives us **all of** anonymous + Apple-linked auth, a usable DB, server-authoritative Cloud Functions, native LiveOps (Remote Config + A/B), free push, free analytics, and free crash reporting — at $0 through 50k MAU. None of the others clear every box at that price.

PlayFab is arguably a *better* fit on capability but the operational and conceptual overhead is unjustified pre-soft-launch. We keep the option to migrate cleanly because we treat Firebase as boring infrastructure (Auth + a document DB + serverless functions), not as a foundation we couple to deeply.

### Specific Stack

- **Identity:** Firebase Auth — anonymous on first launch, **Sign in with Apple** linking before first IAP.
- **Social/leaderboard UI:** **Apple Game Center** (post-score + friends only; not the source of truth).
- **Database:** **Cloud Firestore** (player profile + sub-collections).
- **Server logic:** **Cloud Functions** in TypeScript (run validation, gacha rolls, grants, mail).
- **LiveOps:** **Firebase Remote Config + A/B Testing** for drop rates, event windows, paywall variants.
- **Push:** **FCM → APNs**.
- **Crash + perf:** **Crashlytics + Performance Monitoring**.
- **Analytics:** **GameAnalytics** for game-specific funnels + **Firebase Analytics → BigQuery** for warehouse.
- **IAPs:** **RevenueCat** (StoreKit 2 JWS handled, entitlements API server-side).
- **Attestation/anti-cheat:** **Firebase App Check** (App Attest) + signed run summaries via Cloud Functions.
- **Ads (later):** **AppLovin MAX** mediation if/when we add rewarded video.

### Estimated Costs

- **At launch (≤10k MAU, low revenue):** **~$0/month** (all free tiers).
- **At 100k MAU:** **~$540–$810/month** (Firebase Auth dominates; Firestore + Functions + RevenueCat make up the rest).
- **At 1M MAU:** ~$3k–$10k/month and a planned migration of economy/leaderboards to PlayFab or Nakama.

### Why Not the Others (One-Liners)

- **Game Center / CloudKit alone:** no LiveOps, no real-time, iOS-only — fine as an adjunct, fatal as the whole stack.
- **Supabase:** great DB, no LiveOps; build it ourselves or skip.
- **PlayFab:** best capability set; too heavy until ~250k MAU. Planned migration target.
- **AWS GameLift / GameTech:** wrong shape (dedicated-server multiplayer) and operationally expensive.
- **Nakama:** the right answer when we ship async PvP + tournaments. Premature now.
- **Custom Node/Go:** every hour spent on auth and receipts is an hour not on the game.

---

## 8. Sources

- [Firebase pricing](https://firebase.google.com/pricing)
- [Firebase pricing 2026 breakdown — Sashido](https://www.sashido.io/en/blog/firebase-guide-and-pricing-traps-2026)
- [Build leaderboards with Firestore — Firebase Codelabs](https://firebase.google.com/codelabs/build-leaderboards-with-firestore)
- [Firestore distributed counters](https://firebase.google.com/docs/firestore/solutions/counters)
- [Firebase anonymous auth best practices](https://firebase.blog/posts/2023/07/best-practices-for-anonymous-authentication/)
- [Firebase A/B Testing with Remote Config](https://firebase.google.com/docs/ab-testing/abtest-config)
- [Supabase pricing](https://supabase.com/pricing)
- [Supabase vs Firebase 2026 — Upcloud](https://upcloud.com/global/blog/supabase-vs-firebase-which-backend-makes-the-most-sense-in-2026/)
- [PlayFab pricing](https://developer.microsoft.com/en-us/games/products/playfab/pricing)
- [PlayFab Economy v2 inventory overview](https://learn.microsoft.com/en-us/gaming/playfab/economy-monetization/economy-v2/inventory/items-and-inventory-overview)
- [PlayFab Economy v2 idempotency](https://learn.microsoft.com/en-us/gaming/playfab/economy-monetization/economy-v2/inventory/)
- [Heroic Cloud / Nakama pricing](https://heroiclabs.com/)
- [Nakama open-source vs managed 2026 — Supercraft](https://gsb.supercraft.host/blog/nakama-open-source-vs-managed-backend/)
- [AWS GameLift pricing](https://aws.amazon.com/gamelift/pricing/)
- [RevenueCat pricing](https://www.revenuecat.com/pricing)
- [StoreKit 2 vs RevenueCat 2026 — The Swift Kit](https://theswiftk.it.com/blog/storekit-2-vs-revenuecat-ios-subscriptions)
- [Game Center / GameKit](https://developer.apple.com/documentation/gamekit/)
- [Sign in with Apple vs Game Center — Apple Developer Forums](https://developer.apple.com/forums/thread/133828)
- [CloudKit rate-limit thread — Apple Developer Forums](https://developer.apple.com/forums/thread/131696)
- [Server-authoritative game logic — AccelByte](https://accelbyte.io/blog/server-authoritative-logic-to-prevent-cheating)
- [Modern anti-cheat strategies — Quago](https://quago.io/blog/mitigating-in-game-cheating-an-overview-of-modern-anti-cheat-strategies/)
- [Best mobile game backend providers 2026 — Metaplay](https://www.metaplay.io/blog/best-game-backend-providers)
- [Firebase vs GameAnalytics — StackShare](https://stackshare.io/stackups/firebase-vs-gameanalytics)
