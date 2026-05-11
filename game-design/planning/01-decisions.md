# Decisions Log

A running record of significant design and tech decisions. Each decision should answer: *what*, *why*, *what we considered*, *what we rejected*, *when we'd revisit*.

> Decisions get added here once we have enough research to commit. Until then, the answer is "TBD pending research."

| # | Date | Area | Decision | Rationale | Revisit |
|---|------|------|----------|-----------|---------|
| 001 | 2026-05-11 | Platform | iOS-only at launch (iPhone, portrait). | User scope + small team focus. Android is a port consideration post-launch. | After global launch. |
| 002 | 2026-05-11 | Genre | Archero-style arena roguelite with auto-fire (stop-to-shoot variant TBD). | Matches user reference games (Archero 1/2, Whittle Defender). | Phase 1 prototype. |
| 003 | 2026-05-11 | Business model | F2P with IAPs + rewarded ads. No hard paywalls. | Genre norm; fair-to-F2P retention. | Phase 4 soft launch tuning. |
| 004 | 2026-05-11 | Engine | **Unity 6 LTS**. Backup: Godot 4.6. | Best-in-class iOS ad SDKs, 71% mobile market share for hiring, perf headroom for VFX. See `research/tech/engine-comparison.md`. | If Unity does something irrational again (post-runtime-fee-cancel) re-evaluate vs Godot. |
| 005 | 2026-05-11 | Backend | **Firebase**: Auth, Firestore, Cloud Functions (TS), Remote Config + A/B, FCM, App Check, Crashlytics, Analytics → BigQuery. | Cheapest credible path; defers re-platform until Firestore + Auth exceed ~$2K/mo. See `research/tech/backend-infra.md`. | At ~250K–1M MAU, migrate economy + leaderboards to PlayFab or Nakama. |
| 006 | 2026-05-11 | IAP / ads / attribution | RevenueCat (StoreKit 2 + entitlements) · AppLovin MAX (ads) · Tenjin → AppsFlyer at >$10K/mo UA (attribution). | Best free-tier economics + iOS eCPM. See `research/tech/monetization-sdks.md`. | Drop RevenueCat at scale once 1% fee > $5K/mo. |
| 007 | 2026-05-11 | Art direction | Chunky 2.5D low-poly (Synty POLYGON MINI baseline), prismatic indigo "Lucent" palette, FMOD audio runtime. | Genre-proven readability + cost-efficient for small team. See `research/games/art-audio-direction.md`. | Post-launch full-art-team upgrade. |
| 008 | 2026-05-11 | Theme / setting | **Lucent: Shards of the Shattered Sun** — heroic mythic-fantasy; 7 realms; the Dim as antagonist; player is a Lucent-bearer. | Cohesive identity, gives content team a shared frame, fits art palette. See `design/03-world-and-theme.md`. | After wave-2 content design lands. |
| 009 | 2026-05-11 | Control scheme | **Stop-to-shoot, single virtual joystick, auto-aim**. One tap-to-trigger active button. | Highest-converting control on iPhone for this genre; supported by Archero/Archero 2 success. See `design/00-design-pillars.md` Pillar 1. | Never (locked). |
| 010 | 2026-05-11 | Energy system | **Yes**, looser than Archero. Cap 30, regen 1/12min, 6/run Campaign. | Required for IAP business model but tuned to reduce churn. See `design/04-progression-and-economy.md` §4. | Soft-launch tuning. |
| 011 | 2026-05-11 | Currency count | **6 currencies max**: Gold, Gems, Lucent Shards, Embers, Sigil Dust, Pass Points. | Archero 2's 14-currency UI is a cautionary tale. | If a new system demands a 7th, fold into existing. |
| 012 | 2026-05-11 | Run structure | 7 chapters × 20 rooms (17 standard + 2 offer-givers + 1 boss) at launch. 3 offer-givers (Angel / Devil / Lucent Sprite). | Direct lift from Archero 2's three-offer-giver model. | Add new chapter every 6–8 weeks post-launch. |
| 013 | 2026-05-11 | Modes at launch | Campaign + Tower (endless) + Survival + Daily Dungeon + async PvP + guilds. | Multi-mode is cheap content multiplication; PvP + guilds are mandatory D30+ extenders. | — |
| 014 | 2026-05-11 | Gacha | 10-pull soft pity, 50-pull hard pity, 50% rate-up + mercy-guarantee on Mythic, duplicate → 30 hero-shards. Rates published in-app globally. | Genre standard + EU regulatory future-proofing. | — |
| 015 | 2026-05-11 | Battle pass | 45-day season. $4.99 Lite / $14.99 Premium / $39.99 Hero-buy. Free track present. | Survivor.io / Archero 2 cadence. | Season-1 retro before Season-2. |
| 016 | 2026-05-11 | Monthly Card | $9.99 / 30d non-renewing; +200 gems immediate +100/day for 30d. Also a $4.99 Privilege subscription. | Evergreen anchor SKU per F2P research. | — |
| 017 | 2026-05-11 | Hero count at launch | 8 heroes (6 free-path, 2 gacha-premium). **No cash-only heroes.** | Sufficient variety; sustainable to design + balance; avoids Archero 2's $30 hero-gate complaint. | Roughly 1 new hero per 4 weeks post-launch. |
| 018 | 2026-05-11 | Ability pool at launch | 120 in-run abilities: ~30 Common / ~40 Rare / ~30 Epic / ~15 Legendary / ~5 Mythic. 8 named build archetypes, 12 hidden "Awakened" recipes (Survivor.io borrow). | Wave-1 in-run-abilities research recommended 75 minimum; we ship more for build diversity. | — |
| 019 | 2026-05-11 | Anti-cheat | Server-authoritative gacha + grants; HMAC-signed run summaries; Firebase App Check (App Attest). | Required for any leaderboard / PvP. | — |
| 020 | 2026-05-11 | Languages | en-US/en-GB day 1; ja, ko, zh-Hans, pt-BR, de, fr within 4 weeks of global launch. | Per `research/tech/app-store-launch-aso.md`. | Add tr, ar, ru, es-LA post-launch. |

## Pending decisions (deferred to wave 2 content)
- 021 — Exact hero roster names and ability sets (`content/heroes.md`).
- 022 — Exact ability list of 120 (`content/abilities.md`).
- 023 — Specific enemy archetype stat blocks (`content/enemies.md`).
- 024 — Specific boss designs per chapter (`content/bosses.md`).
- 025 — Level / room layout templates per chapter (`content/levels.md`).
- 026 — Pet / Spirit roster of 12 (`content/pets.md`).
- 027 — Rune / Sigil catalog of 24 (`content/runes.md`).
- 028 — Power curves & XP/level tables (`content/balance-curves.md`).
- 029 — UI/UX wireframes (`content/ux-wireframes.md`).
- 030 — FTUE script (`content/ftue-script.md`).
