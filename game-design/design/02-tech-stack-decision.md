# Tech Stack Decision — Lucent

Locked-in stack derived from `research/tech/*`. Each row points to the research doc that justified it.

| Layer | Choice | Why | Rejected | Source |
|---|---|---|---|---|
| **Engine** | **Unity 6 LTS** | 71% mobile market share, mature ad SDK packages, performance headroom for VFX juice, easy hiring scale-out. Runtime-fee scrapped Sept 2024. | Godot 4.6 (backup), SpriteKit (premium not F2P), Cocos Creator (talent pool too narrow in West), Defold (Lua-only), Phaser (perf). | `research/tech/engine-comparison.md` |
| **Render target** | iOS 17+, iPhone 12 baseline | 60fps stable budget; ProMotion 120Hz on supported devices. | Android (post-launch only). | — |
| **Auth** | **Firebase Auth** — anonymous sign-in at first launch, prompt **Sign in with Apple** before first IAP | Carries progress, no friction at install, future-proofs IAP receipts. | Game Center as system-of-record (unsuited), email/password (friction). | `research/tech/backend-infra.md` |
| **Social leaderboard** | **Apple Game Center** as adjunct | Native UI for friends + scoreboards, used only as a display layer. | — | `research/tech/backend-infra.md` |
| **Player data store** | **Cloud Firestore** | Schema-flex, real-time, easy security rules, scales to seven figures of MAU before re-platforming. | Supabase (less proven at scale), PlayFab (heavier, more expensive), DIY Postgres (too much ops). | `research/tech/backend-infra.md` |
| **Server logic** | **Cloud Functions (TypeScript)** | Server-authoritative run validation, idempotent grants, gacha rolls, mail. | Self-host Node (more ops). | `research/tech/backend-infra.md` |
| **Receipt validation** | **RevenueCat** (wraps StoreKit 2) | Free under $2.5K MTR, then 1%. Entitlements + paywall A/B without bespoke backend. | Native StoreKit 2 (we'd write our own server), Adapty/Qonversion (smaller ecosystem). | `research/tech/monetization-sdks.md` |
| **Ad mediation** | **AppLovin MAX** | Best iOS eCPM in 2025/2026; demand: AppLovin, Unity Ads, Liftoff, Mintegral, Meta Audience, AdMob, Pangle. | AdMob-only (lower eCPM at scale), LevelPlay (close 2nd). | `research/tech/monetization-sdks.md` |
| **Attribution / MMP** | **Tenjin** at launch → **AppsFlyer** at >$10K/mo UA | Tenjin free to 2k conversions/mo; AppsFlyer when paid UA scales. SKAN 4 + AdAttributionKit + Meta AEM dual-wired. | Adjust, Singular (more expensive at our scale). | `research/tech/monetization-sdks.md` |
| **Analytics** | **GameAnalytics** + **Firebase Analytics → BigQuery** | Free, game-specific funnels in GA; BigQuery export for warehouse later. | Amplitude/Mixpanel (cost), Tenjin only (less depth). | `research/tech/monetization-sdks.md` |
| **Crash + perf** | **Firebase Crashlytics** + **Performance Monitoring** | Free, mobile-native, Unity SDK first-class. | Sentry (server-side only later). | — |
| **Remote config + A/B** | **Firebase Remote Config + A/B Testing** | Free, ties to Firebase audiences, gates drop rates / event windows / paywalls. | GrowthBook (more ops), Statsig (cost). | `research/tech/monetization-sdks.md` |
| **Push** | **Firebase Cloud Messaging** (wraps APNs) | Free unlimited. | OneSignal (per-MAU cost). | `research/tech/monetization-sdks.md` |
| **Anti-cheat** | **Firebase App Check (App Attest)** + HMAC-signed run summaries + server-side reroll/RNG | Apple App Attest is the only first-party device attestation; signed summaries make replay attacks moot. | Client-authoritative state (no). | `research/tech/backend-infra.md` |
| **Audio runtime** | **FMOD Studio** | Free under $200k revenue, drag-and-drop event design, adaptive music RTPC, Unity integration. | Wwise (heavier), native Unity audio (no adaptive layers). | `research/games/art-audio-direction.md` |
| **2D skeletal animation** | **Spine 2D** | Industry standard, Unity runtime first-class. | DragonBones (smaller community). | `research/games/art-audio-direction.md` |
| **Art assets baseline** | **Synty POLYGON MINI** | Cheap, vast library, fits chunky low-poly direction; outsource heroes/bosses/biomes. | Bespoke from scratch (too slow / expensive at our budget). | `research/games/art-audio-direction.md` |
| **CI / build** | **GitHub Actions** + **Unity Build Server** | Standard, mature, free tier. TestFlight upload via Fastlane. | Bitrise (cost), self-host (ops). | — |
| **Source control** | **Git + Git LFS** for binaries | Standard. | Perforce (overkill for our scale). | — |

## Cost envelope

| Stage | Approx monthly run-rate |
|---|---|
| Pre-launch dev (≤10 internal testers) | ~$8 (Apple Developer Program / 12) |
| Launch (≤10k MAU) | ~$30 (Apple, Firebase free tier, RevenueCat free tier, GameAnalytics free) |
| Post-launch growth (~100k MAU) | $700–1,000/mo (Firebase Auth + Firestore dominate) |
| Scale (~250k DAU / $150k MTR) | $3,500–5,500/mo, 2–4% of revenue |
| Re-platform trigger | Firestore + Auth combined > $2k/mo, **migrate economy + leaderboards to PlayFab** (or Nakama if async PvP becomes core) |

## Architecture sketch

```
                ┌───────────────────────┐
                │   iPhone (iOS 17+)    │
                │   Unity 6 LTS client  │
                │  + FMOD + Spine + LMM │
                └──────────┬────────────┘
                           │
        ┌──────────────────┼──────────────────────────┐
        │                  │                          │
        ▼                  ▼                          ▼
┌──────────────┐  ┌───────────────────────┐  ┌────────────────────┐
│ AppLovin MAX │  │     RevenueCat        │  │   Firebase Suite    │
│  (rewarded,  │  │  (StoreKit 2 + JWS)   │  │  Auth (SiwA)        │
│ interstitial)│  └──────────┬────────────┘  │  Firestore          │
└──────┬───────┘             │               │  Cloud Functions    │
       │                     │               │  Remote Config + A/B│
       ▼                     ▼               │  FCM (APNs)         │
┌──────────────┐  ┌───────────────────────┐  │  Crashlytics        │
│ Tenjin / AF  │  │   Webhook → Cloud     │  │  App Check (App Attest)│
│  (SKAN 4)    │  │   Function entitle    │  │  Analytics → BQ     │
└──────────────┘  │   grant in Firestore  │  └────────┬───────────┘
                  └───────────────────────┘           │
                                                       ▼
                                              ┌─────────────────┐
                                              │ GameAnalytics   │
                                              │  (funnels)      │
                                              └─────────────────┘
```
