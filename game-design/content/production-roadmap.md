# Production Roadmap & Risk Register — Lucent: Shards of the Shattered Sun

**Project:** Lucent (iOS-first Archero-like roguelike)
**Document type:** Production plan, staffing scenarios, risk register
**Status:** Phase 0 (Research) complete; this document gates entry into Phase 1 (Design).
**Cross-references:** `design/05-launch-scope.md`, `design/02-tech-stack-decision.md`, `design/01-core-loop-spec.md`, `design/04-progression-and-economy.md`, `research/tech/app-store-launch-aso.md`, `research/games/art-audio-direction.md`, `content/heroes.md`, `content/abilities.md`, `content/enemies.md`, `content/equipment.md`, `content/runes.md`, `content/pets.md`.

Master schedule. Translates the ten-phase outline in `design/05-launch-scope.md` into a week-by-week plan, costs three staffing scenarios, enumerates risks with mitigation, specs the Wk16 vertical slice, details the soft-launch ramp, sums a Lean-indie budget, and lists the Phase-1 sign-off checklist.

---

## 1. Week-by-week schedule (start of Phase 1 → global launch)

Assumptions:
- Phase 0 (Research & Planning) is complete. Tech stack is locked per `design/02-tech-stack-decision.md`. Wave-1 and Wave-2 research are filed in `research/`.
- Calendar weeks Mon–Fri; we deliberately keep 8 unscheduled "slack" days per phase folded into the weeks (assumed inside the week-numbers below).
- Owners: **Des** (Design lead), **EC** (Eng-Client), **EB** (Eng-Backend / LiveOps), **Art** (Art lead, manages outsourcers), **Aud** (Audio, fractional / outsourced), **Prod** (Producer).
- "Outsourced art" rows are managed by Art and contracted via the pipeline in `research/games/art-audio-direction.md` §4.

### Phase 1 — Design (weeks 1–6)

| Wk | Phase | Primary deliverables | Owner(s) | Dependencies | Exit criteria |
|---|---|---|---|---|---|
| 1 | Design | GDD freeze v1.0; lock the 8-hero roster from `content/heroes.md`; freeze 11 ability families per `content/abilities.md`; biome/realm bible from `design/03-world-and-theme.md` | Des, Prod | Phase 0 complete | GDD v1.0 PDF circulated; all 8 heroes have a 1-page brief; biome bible has palette + props per realm |
| 2 | Design | Content catalogs v1: 120 abilities tagged by family/rarity; 12 enemy archetypes; 8 gear sets; 24 runes; 12 pets | Des | Wk1 | Catalogs reviewed by EC for parsability; spreadsheet schema agreed |
| 3 | Design | Balance v1 spreadsheet: damage curves, HP/level, gold-per-room, energy refill economy from `design/04-progression-and-economy.md`; Monte-Carlo run sim | Des, EB | Wk2 | Sim shows 7-chapter clear curve at intended difficulty; no chapter has >25% one-shot fail rate |
| 4 | Design | UI wireframes (Figma): meta hub, ability-pick screen, gear screen, gacha, battle pass, social tabs; FTUE script v1 in `content/ftue-script.md` | Des, Art | Wk1 | All 36 screens wireframed; FTUE script reviewed by Apple-guidelines proxy |
| 5 | Design | Audio brief delivered to composer; SFX cue list (50 cues); music intent doc (5 tracks); voice direction (1 narrator, ~30 lines) | Aud, Des | Wk1 | Composer signed; first 3-track demo commissioned; SFX cue list keyed to events |
| 6 | Design | Tech design: Firestore schema; Cloud Function contract list; run-summary HMAC spec; remote-config keys; analytics event taxonomy | EB, EC | Wks 1–5 | Schema diagram approved; event taxonomy in `analytics/events.yaml`; Phase-1 sign-off checklist in §7 passes |

**Phase 1 exit gate:** §7 sign-off checklist green. If not, slip Phase 2 until it is.

### Phase 2 — Vertical Slice (weeks 7–16)

| Wk | Phase | Primary deliverables | Owner(s) | Dependencies | Exit criteria |
|---|---|---|---|---|---|
| 7 | V-Slice | Unity 6 project scaffold; URP mobile; Git LFS; CI on GitHub Actions; first TestFlight build (placeholder scene) | EC, Prod | Phase 1 done | TestFlight build installs on 3 devices |
| 8 | V-Slice | Core loop skeleton: virtual joystick, auto-fire, room-to-room transitions, 1 placeholder enemy; 60fps target on iPhone 12 | EC | Wk7 | One placeholder room playable end-to-end |
| 9 | V-Slice | Dawnbow hero rig (Spine 2D or low-poly Blender); 6 hero animations (idle/run/shoot/hit/level-up/death); 4 enemy archetypes blockout | EC, Art | Wk1 catalog | Dawnbow + 4 enemies playable; hit-flash + hit-stop wired |
| 10 | V-Slice | Ability system: 30 abilities (1/3 of pool, all 11 families represented); stacking rules; ability-pick UI | EC, Des | Wks 2, 8 | Ability pick screen presents 3 cards; effects fire correctly on next room |
| 11 | V-Slice | The Vale of First Light biome art (props + tileset); 20 rooms procedurally arranged (17 standard + 2 offer + 1 boss) | Art, EC | Wks 1, 9 | Full chapter playable from room 1 to boss arena |
| 12 | V-Slice | Chapter boss (The Veiled Sentinel): 3 phases, telegraphed AoEs, phase-transition stinger | EC, Des, Art | Wk11 | Boss completable in 60–120s by a tester with average build |
| 13 | V-Slice | Firebase wiring: anonymous Auth, minimal Firestore schema (`/users/{uid}/run`, `/users/{uid}/profile`), save-on-room-clear, restore-on-launch | EB, EC | Wk6 schema | Run state persists across app kill on 5 devices |
| 14 | V-Slice | FTUE part A (rooms 1–3 scripted hints, joystick prompt, ability-pick callout); energy system (5-cap, 6-min refill) | Des, EC | Wks 4, 10 | FTUE completion >85% on 5 internal testers |
| 15 | V-Slice | Juice pass: hit-stop, screen shake (tiered), damage numbers, level-up ring, pickup popups, kill burst; placeholder SFX from Sonniss | EC, Aud | Wk12 | Subjective "feels good" rating ≥4/5 from 5 testers |
| 16 | V-Slice | **Vertical slice exit playtest** on 10 devices (mix of iPhone 12 / 13 / 14 / 15) | All | Wks 7–15 | All 10 testers complete a run + save + reload at 60fps. See §4 exit criteria. |

**Phase 2 exit gate:** §4 vertical-slice exit criteria. **No-go** = re-scope or hire art help; **go** = proceed to Phase 3.

### Phase 3 — Production: Combat (weeks 17–24)

| Wk | Phase | Primary deliverables | Owner(s) | Dependencies |
|---|---|---|---|---|
| 17 | P3-Combat | Heroes 2 + 3 (Wardlight, Embercaller): rigs, abilities, hero-specific synergies | EC, Art | V-slice done |
| 18 | P3-Combat | Heroes 4 + 5 (Frostshard, Stormhowl); ability pool grown to 60 | EC, Art, Des | Wk17 |
| 19 | P3-Combat | Heroes 6 + 7 + 8 (Sunpriest, Voidcaller, Shadewing); ability pool to 90 | EC, Art, Des | Wk18 |
| 20 | P3-Combat | All 120 abilities live; awakened weapon recipes (12) implemented as hidden combos | EC, Des | Wk19 |
| 21 | P3-Combat | Chapters 2 + 3 (Sunken Cathedral, Frostspire) — biome art, 20 rooms each, mini-boss rotation | Art, EC | Wk11 pattern |
| 22 | P3-Combat | Chapters 4 + 5 (Ember Wastes, Stormcrown) | Art, EC | Wk21 |
| 23 | P3-Combat | Chapters 6 + 7 (Tideless Reach, The Long Dusk) + final chapter boss | Art, EC, Des | Wk22 |
| 24 | P3-Combat | All 4 modes wired (Campaign, Tower endless, Survival timed, Daily Dungeon); mode-specific reward tables | EC, Des, EB | All chapters done |

**Phase 3 exit gate:** all 8 heroes + 120 abilities + 12 enemies + 7 chapter bosses + 4 modes complete; campaign clearable from chapter 1 to 7 in a 2-hour mega-playtest; 60fps stable on iPhone 12.

### Phase 4 — Production: Meta (weeks 25–30)

| Wk | Phase | Primary deliverables | Owner(s) | Dependencies |
|---|---|---|---|---|
| 25 | P4-Meta | Gear system: 6 slots, 8 sets, set-bonus engine, gear-tier rolling per `content/equipment.md` | EC, Des | Phase 3 |
| 26 | P4-Meta | Runes (24) + sigil engine; loadout UI; rune-fusion economy | EC, Des | Wk25 |
| 27 | P4-Meta | Pets / spirits (12): passive bonuses, active triggers, pet-slot UI | EC, Art, Des | Wk25 |
| 28 | P4-Meta | Talent grid: per-hero unlock tree; soft-reset / prestige path | EC, Des | Wk25 |
| 29 | P4-Meta | Currencies (gold, gems, dust, shards, BP-tokens, energy); mailbox; daily + weekly quest system | EC, EB | Wks 25–28 |
| 30 | P4-Meta | Battle pass framework (no SKUs yet): track structure, claim flow, season-rollover stub | EC, EB, Des | Wk29 |

**Phase 4 exit gate:** every meta-progression surface from `design/04-progression-and-economy.md` is reachable in-game; balance v2 spreadsheet updated against live data from internal play sessions.

### Phase 5 — Production: Monetization & LiveOps (weeks 31–34)

| Wk | Phase | Primary deliverables | Owner(s) | Dependencies |
|---|---|---|---|---|
| 31 | P5-Mon | RevenueCat integration; full SKU catalog created in App Store Connect; sandbox-tested purchases; webhook → Cloud Function entitlement grant | EB, EC | Phase 4 |
| 32 | P5-Mon | AppLovin MAX integration (rewarded + interstitial); ad placement audit; rewarded-video reward economy; SKAdNetwork wiring; Tenjin SDK | EC, EB | Wk31 |
| 33 | P5-Mon | Gacha banner system: server-authoritative pulls, pity counters, **odds-disclosure UI** (per Apple 3.1.1), idempotent grants; Remote Config gating | EB, EC, Des | Wk31 |
| 34 | P5-Mon | Event scheduler (Cloud Functions cron); push notifications via FCM; in-app event UI; A/B framework via Firebase | EB, EC | Wk31 |

**Phase 5 exit gate:** end-to-end purchase, ad view, gacha pull, and event participation all complete on TestFlight without a server-side error in 200 sandboxed runs.

### Phase 6 — Production: Social (weeks 35–38)

| Wk | Phase | Primary deliverables | Owner(s) | Dependencies |
|---|---|---|---|---|
| 35 | P6-Soc | Guilds: create/join, roster, chat (Firestore-backed), donations | EB, EC | Phase 5 |
| 36 | P6-Soc | Weekly guild boss: shared HP pool, contribution ranking, reward tiers | EB, EC, Des | Wk35 |
| 37 | P6-Soc | Async PvP: ghost-replay storage, matchmaking by tier, anti-cheat (HMAC-signed summaries + App Check), leaderboard | EB, EC | Wk31 SKU |
| 38 | P6-Soc | Apple Game Center adjunct: friends scoreboard, achievements (14), Live Activity stretch | EC | Wk37 |

**Phase 6 exit gate:** all 8 social features in `design/05-launch-scope.md` functional under load test of 1,000 simulated users; cheat-detection flags ≥99% of malformed run summaries.

### Phase 7 — Polish & QA (weeks 39–42)

| Wk | Phase | Primary deliverables | Owner(s) | Dependencies |
|---|---|---|---|---|
| 39 | P7-Polish | Tutorial polish (FTUE parts A + B + C); A/B variants for first-room intro | Des, EC | Phase 6 |
| 40 | P7-Polish | Animation pass: hero death anims, hero level-up overlays, boss intros; FMOD integration replacing placeholder audio | Art, Aud, EC | All chapters |
| 41 | P7-Polish | Edge-case + device QA (iPhone 11, SE 3rd-gen, 12 mini); crash-free target 99.5%; localization wave 1 (en-US/en-GB only, en-strings frozen for later translation) | EC, Prod | Wks 39–40 |
| 42 | P7-Polish | Anti-cheat hardening: App Check rollout, server-side reroll RNG audit, rate-limits, replay-attack tests; ASO assets v1 in App Store Connect | EB, EC, Prod | All |

**Phase 7 exit gate:** crash-free sessions ≥99.5% over a 72-hour internal stress test; tutorial completion ≥90% on 25 fresh TestFlight users; ASO assets approved by Apple Developer rep.

### Phase 8 — Soft Launch (weeks 43–52)

| Wk | Phase | Primary deliverables | Owner(s) | Dependencies |
|---|---|---|---|---|
| 43 | P8-SL Stage 1 | **PH launch (technical):** App Store live in Philippines; Apple Search Ads Basic on; 2 Meta Reels; daily crash + FTUE funnel review | Prod, EC, EB | Phase 7 |
| 44 | P8-SL Stage 1 | PH iteration: hotfix #1 (crash + balance) deployed; FTUE A/B variants seeded | All | Wk43 data |
| 45 | P8-SL Stage 2 | **CA + AU added (retention):** ASA Advanced 4-campaign structure; TikTok creative wave 1 (3 concepts × 3 variants); D1/D7 cohort dashboards | Prod, EC | Wks 43–44 stable |
| 46 | P8-SL Stage 2 | Retention tuning: ability-pick A/B (3 vs 4 cards), energy refill A/B (5 vs 6 min), boss-difficulty A/B in chapter 4 | Des, EB | Wk45 data |
| 47 | P8-SL Stage 2 | Creative wave 2; first influencer slate (5 mid-tier creators) | Prod | Wk46 |
| 48 | P8-SL Stage 2 | **Stage-2 KPI gate review:** D1 ≥40%, D7 ≥18%; if not, extend stage 2 by 2 weeks before stage 3 | All | Wks 45–47 |
| 49 | P8-SL Stage 3 | **BR + Nordics added (monetization):** RevenueCat SKU price-localization audit; rewarded-video placement A/B; first paid offer A/B | Prod, EB, Des | Wk48 pass |
| 50 | P8-SL Stage 3 | Monetization tuning: gacha banner A/B (pity-soft vs pity-hard); battle-pass price A/B ($4.99 vs $9.99); whale-track UI | Des, EB | Wk49 data |
| 51 | P8-SL Stage 3 | LiveOps cadence rehearsal: run a full mock event (3-day weekend); load-test push notifications | EB, Des, Prod | Wks 49–50 |
| 52 | P8-SL Stage 3 | **Global-go decision:** D1≥40%, D7≥20%, D30≥10%, D7 ROAS≥15%, ARPDAU≥$0.15, crash-free≥99.7%. **Go** → Wk53. **No-go** → Phase 8 extension, see schedule-risk row in §3. | All | All |

**Phase 8 exit gate:** KPI gates above. If any single floor metric misses by >20%, extend stage 3 by 4–6 weeks; if missed by >40%, escalate to schedule-risk contingency in §3 (push global one quarter).

### Phase 9 — Global Launch (week 53)

| Wk | Phase | Primary deliverables | Owner(s) | Dependencies |
|---|---|---|---|---|
| 53 | P9-Global | App Store global release; UA push (Meta + TikTok + ASA Advanced + AppLovin); PR push (TouchArcade + PocketGamer + 30-creator outreach); PPO icon A/B live; loc waves 2 (ja, ko, zh-Hans, pt-BR) | All | Phase 8 pass |

**Phase 9 exit gate:** day-1 stability ≥99.7% crash-free; first 24-hour install volume ≥10× soft-launch daily rate; D1 retention within ±5% of soft-launch baseline.

### Phase 10 — LiveOps (week 54 onward)

Per `design/01-core-loop-spec.md` §8. Six-to-eight-week content cadence, weekly events, monthly battle pass, quarterly new hero. Not scheduled here; staffing assumes 1 designer + 1 engineer + 0.5 producer retained for LiveOps.

---

## 2. Team composition options

Three staffing scenarios, each producing the same launch scope from `design/05-launch-scope.md`. Costs are USD, fully loaded (salary + benefits + equipment + tools), United-States-blended rates.

### 2.1 Scenario A — Solo + outsourcing (18–24 months)

| Role | FTE | Monthly cost |
|---|---|---|
| Solo dev (design + client + backend) | 1.0 | $11,000 |
| Outsourced art (rolling) | 0.5-eq | $1,800 |
| Outsourced audio | 0.2-eq | $500 |
| Voice (narrator, 30 lines) | one-shot | $200 amortized |
| Tools / Apple / Firebase / RevenueCat | flat | $150 |
| **Total monthly** | — | **~$13,650** |
| **Total dev cost (24-month worst case)** | — | **~$273k pre-launch** |

Every Phase doubles. Vertical slice at ~Wk32; global at month 22 mid-case. High burnout risk (see §3). **Not recommended for this category.**

### 2.2 Scenario B — Lean indie (12 months) — **RECOMMENDED**

| Role | FTE | Monthly cost | Notes |
|---|---|---|---|
| Design lead | 1.0 | $11,500 | Drives content catalogs + balance + LiveOps cadence |
| Client engineer #1 | 1.0 | $13,000 | Unity, gameplay, FTUE, juice |
| Client engineer #2 | 1.0 | $13,000 | Unity, UI, meta surfaces, FMOD integration |
| Art lead (full-time, manages outsourcers) | 1.0 | $10,000 | Blender + Spine + Figma; per `research/games/art-audio-direction.md` §8 |
| Producer | 1.0 | $11,000 | Schedule, QA coord, soft-launch ops, ASO, PR |
| Outsourced audio (composer + sound design) | 0.25-equivalent | $1,200 | $5–7k over 12 months |
| Voice (narrator, 30 lines) | one-shot | $200/mo amortized | $2.4k total |
| Outsourced art surge (heroes 6–8 + final boss) | rolling | $2,500 | Bursts in Phase 3 weeks 19–24 |
| Tools / Apple / Firebase / RevenueCat / FMOD | flat | $400 | Inc. FMOD indie when revenue hits |
| **Total monthly** | — | **~$62,800** | |
| **Duration to global** | 12 months (52 wks) | | Per this schedule |
| **Total pre-launch dev cost** | — | **~$754k** | Pre-launch only |

Backend engineering is split across the two client engineers, with Cloud Functions + Firestore work concentrated in weeks 6, 13, and Phases 5 + 6. If that proves brittle in Phase 5, swap one client engineer for a backend specialist for weeks 25–38; cost-neutral.

### 2.3 Scenario C — Funded indie (10 months)

| Role | FTE | Monthly cost |
|---|---|---|
| Design lead | 1.0 | $12,500 |
| Client engineer #1 | 1.0 | $13,500 |
| Client engineer #2 | 1.0 | $13,500 |
| Backend / LiveOps engineer | 1.0 | $14,000 |
| Art lead | 1.0 | $11,000 |
| Outsourced artist #1 (heroes / bosses) | 1.0-eq retainer | $5,000 |
| Outsourced artist #2 (envs / VFX) | 1.0-eq retainer | $4,500 |
| Producer | 0.5 | $6,000 |
| Outsourced audio | 0.3-eq | $1,800 |
| Voice | one-shot | $300 amortized |
| Tools / Apple / Firebase / RevenueCat / FMOD | flat | $400 |
| **Total monthly** | — | **~$82,500** |
| **Total pre-launch dev cost (10 months)** | — | **~$825k** |

Compresses Phases 3 + 4 via parallelization. Lower per-person risk (engineer redundancy). The real reason to take funded-tier capital is the UA tier it unlocks (see §6), not the dev compression.

### 2.4 Recommendation

**Choose Scenario B — Lean indie.** Reasoning:

1. The launch scope is genuinely a 5-person, 12-month job. Scenario A doubles the timeline and adds burnout risk; Scenario C costs ~$70k more in dev and ~$440k more in UA at mid tier without a proportionate quality lift.
2. Scenario B can be funded by a single seed cheque (~$1.1M including UA + 6 months post-launch runway). Scenario C needs a Series Seed or publisher deal whose terms often outweigh the speed advantage.
3. Scenario B matches the Lean-indie UA budget tier in `research/tech/app-store-launch-aso.md` §7.

Rest of this document assumes Scenario B unless called out.

---

## 3. Risk register

Scoring: **Probability** and **Impact** are each Low (L), Medium (M), or High (H). Composite risk = max of the two, weighted by interaction. "Owner" is the role on point for monitoring and triggering contingency.

### 3.1 Design risks

| ID | Risk | P | I | Mitigation (preventative) | Contingency (reactive) | Owner |
|---|---|---|---|---|---|---|
| D1 | Ability stacking unbalanced — degenerate combos (e.g. Multi-Shot × Ricochet × Pierce) trivialize chapters or fail to scale to chapter 5+ | M | H | Monte-Carlo run sim in Wk3 with all 120 abilities; require every ability to pass an "isolation test" (≥3 chapters viable solo) and a "synergy test" (no two-ability combo >1.6× DPS uplift); ship a balance dashboard reading from BigQuery | Hotfix via Remote Config (Wk34 framework); ban degenerate combos by tagging; re-tune coefficients without binary update | Des |
| D2 | Tutorial completion <90% in ≤30s | M | H | FTUE script in Wk4 reviewed against `research/tech/app-store-launch-aso.md`; A/B test 3 variants from Wk46; instrument every tap of room 1 | Skip optional ability-pick screen in FTUE; shorten room 1; auto-grant first ability if user idles >5s | Des |
| D3 | Chapter 4 (Ember Wastes) wall too punishing — D14 retention drops sharply | H | M | Difficulty curve from balance v1 (Wk3) targets 25–35% chapter-4 first-try fail rate; add 1 free retry token per day on first-time gates; rune unlocks at chapter 4 entry | Tune enemy HP via Remote Config; insert a "Sunset offering" rune drop in chapter 4 room 8 that adds defense | Des |
| D4 | Build archetypes feel samey — only 2 of 8 archetypes used in the wild | M | M | `content/abilities.md` already tags every ability with an archetype anchor; weekly "build of the week" event nudges variety | LiveOps event rotating archetype-specific boosts; balance pass quarterly | Des |
| D5 | Energy economy throttles whales — high-spend users hit the cap and stop spending | L | M | Whale-tier UI surfacing "infinite energy" SKU; soft-cap dynamic per `design/04-progression-and-economy.md` | Add 24-hour energy bundle SKU; raise cap to 10 via Remote Config | Des |

### 3.2 Tech risks

| ID | Risk | P | I | Mitigation | Contingency | Owner |
|---|---|---|---|---|---|---|
| T1 | Unity ad SDK (AppLovin MAX) breaks on an iOS point release | M | H | Pin SDK versions; subscribe to AppLovin + Unity release notes; weekly TestFlight build against latest iOS beta from Wk31 | Hotfix submitted; fall back to AdMob mediation via a feature-flag swap; reach out to AppLovin partner support | EC |
| T2 | Firebase costs scale faster than expected — Firestore reads dominate at 250k DAU | M | M | Re-platform trigger in `02-tech-stack-decision.md` ($2k/mo combined); cache hot reads on client; batch writes; sample analytics writes | Migrate economy + leaderboards to PlayFab (or Nakama if async-PvP-heavy); 4–6 week migration window pre-budgeted | EB |
| T3 | Cheating breaks PvP leaderboard — top 100 dominated by modified clients | M | H | App Check (App Attest) from Wk13; HMAC-signed run summaries; server-side reroll RNG; rate-limits per UID per hour; replay-attack tests in Wk42 | Wipe leaderboard; ship anti-cheat patch; ban detected UIDs; offer affected players a "good faith" reward | EB |
| T4 | Save-system corruption — players lose progress | L | H | Versioned Firestore docs; atomic transactions on grant; nightly export to Cloud Storage; client-side last-N rollback | Restore from nightly export; mailbox-grant lost gems; public postmortem | EB |
| T5 | Unity 6 LTS regression in a patch release | L | M | Pin Unity 6 LTS minor; only adopt patches after 2-week soak in a side branch | Hold on the previous LTS; coordinate with Unity partner support if license-tier | EC |
| T6 | Apple iOS 26 SDK transition (April 28, 2026) misses a build-target requirement | M | M | Unity 6 LTS supports iOS 26 SDK; CI builds against latest Xcode from Wk31 | Hotfix; if blocked, follow Unity LTS upgrade window | EC |
| T7 | App Attest broken on a specific device → users locked out | L | M | Soft-fail mode: server treats unattested clients as suspicious but not blocked; collect for review | Bypass App Attest for affected device family via Remote Config | EB |

### 3.3 Art / audio risks

| ID | Risk | P | I | Mitigation | Contingency | Owner |
|---|---|---|---|---|---|---|
| A1 | Outsourced art quality inconsistent across the 12 enemies | H | M | Style guide locked Wk1; same Upwork artist for the entire enemy set; per-asset acceptance criteria; weekly art-review with the art lead | Re-source the worst 3–4 enemies in-house or to a single backup artist; absorb 1–2 week slip in Wk22 | Art |
| A2 | FMOD integration drags — adaptive music never gets out of demo state | M | M | FMOD scaffold in Wk6 design phase; integration spike in Wk13 before full content; Aud retained from Wk5 | Ship static music tracks instead of adaptive; defer RTPC to post-launch | Aud, EC |
| A3 | Voice talent unavailable / quote price doubles after audition | L | L | Audition 3 narrators in Wk5; pick 1, hold 2 as backups under retainer | Use #2 backup; or AI-generated TTS as a placeholder with a recast in Phase 7 | Aud |
| A4 | Hero rig / animation pipeline blocks new heroes — every new hero takes 1.5× expected weeks | M | H | Build the rig template in Wk9 with the Dawnbow; force every hero to fit the template; Spine 2D + animation graph standardized | Reduce launch hero count from 8 to 6 (pull 2 to LiveOps month 2) | Art, EC |
| A5 | Icon variants underperform in PPO — store CVR drops below 3% | M | M | Pre-design 5 icon variants in Wk42; PPO test from Wk2 of soft launch; review weekly | Bring in an icon specialist (PaintPool, Apptopia consult) for a $1.5k re-design | Art, Prod |

### 3.4 Monetization risks

| ID | Risk | P | I | Mitigation | Contingency | Owner |
|---|---|---|---|---|---|---|
| M1 | ARPDAU below target ($0.15 floor, $0.20 strong) at end of soft launch | M | H | A/B framework live from Wk34; price-localization audit in Wk49; whale-tier UI from Wk30; rewarded-video placement tuning weekly | Extend Stage 3 of soft launch by 4 weeks; pivot ad mix toward rewarded-video; lower the entry price of monthly card from $9.99 to $4.99 | Des, EB |
| M2 | Whale spend below target — top 1% of payers <40% of revenue | M | M | Whale-track UI (cosmetic prestige, "founder" badges, hero-skin chase); first-30-day funnel A/B on starter pack pricing | Add a high-tier VIP SKU ($99 / $199) post-launch; private whale Discord channel | Des |
| M3 | Rewarded-video eCPM crashes — top-line ad revenue 50% below model | M | M | Diversify ad mediation: AppLovin MAX with Unity, Liftoff, Mintegral, Meta, AdMob, Pangle (per `02-tech-stack-decision.md`); raise rewarded-video frequency cap from 5 to 10 in soft test | Increase IAP weighting; pull marginal placements until eCPM recovers | EB |
| M4 | Conversion-to-payer at D7 <1.5% — payer funnel broken | M | H | First-IAP offer at $0.99 in FTUE chapter 1 clear; first-time-purchase double-bonus | A/B test multiple first-offers; relocate offer to earlier moment (chapter 1 boss kill instead of room 8) | Des, EB |
| M5 | Apple Promo Codes / Promotional Offers misconfigured — discount price not applied | L | M | RevenueCat handles entitlements; sandbox-test every SKU permutation in Wk31; pre-launch QA pass on Promo Offers in Wk42 | Manual mailbox grant + public apology email; refund anomalies via App Store Connect | EB |

### 3.5 Retention risks

| ID | Risk | P | I | Mitigation | Contingency | Owner |
|---|---|---|---|---|---|---|
| R1 | D7 retention <18% in soft launch (floor) | M | H | FTUE A/B from Wk46; daily-quest variety; energy refill timing tuned via Remote Config; chapter-4 wall mitigation (D3) | Re-tune economy + difficulty for 2 weeks; if still off, push global; if D7 <12% even after tuning, treat as no-launch and pivot the meta | Des, Prod |
| R2 | D30 retention <8% | M | H | Battle-pass framework live from Wk30; guild engagement (Wks 35–36) drives D14+; weekly events from Wk34 | LiveOps cadence ramp; add a "100-room Tower" chase from chapter 5; new-hero drop within first 30 days post-global | Des |
| R3 | LiveOps cadence unsustainable for the 5-person team | H | M | Event scheduler + Remote Config from Wk34 means events are data-driven, not code-driven; pre-author 8 events before global launch (Wks 39–42) | Slip to 8-week cadence instead of 6; cross-train Producer on event-config tooling | Des, Prod |
| R4 | Guild participation <30% of DAU | M | M | Guild boss reward = mailbox gems claimable solo (so non-guild players still get something but less); push-notif on guild joining and donation | Auto-assign players to a guild on chapter 2 clear; allow guild leaves without penalty for first 7 days | Des |

### 3.6 Apple risks

| ID | Risk | P | I | Mitigation | Contingency | Owner |
|---|---|---|---|---|---|---|
| AP1 | App Review rejection over gacha-odds disclosure (3.1.1) | M | H | Odds disclosure UI in Wk33; pre-submission checklist in `research/tech/app-store-launch-aso.md` §1.5; sandbox-build review by external mobile-game lawyer in Wk42 | Re-submit within 24h with fixed UI; activate emergency comms plan | EB, Prod |
| AP2 | ATT prompt drops attribution to single-digit opt-in | H | M | Delayed ATT prompt (post-FTUE chapter 1) per `research/tech/app-store-launch-aso.md` §6.1; clear-value copy; SKAN 4 + Meta AEM dual-wired from Wk32 | Lean harder on SKAN 4 + AEM modeling; lift UA bids on probabilistic networks (AppLovin Axon) | EB, Prod |
| AP3 | Sign-In-with-Apple missing alongside any social login → rejection | L | H | Implement SiwA on the same screen as any other social login from Wk13 | Submit with social login disabled until SiwA shipped | EC |
| AP4 | Promo offers misconfigured / age-rating mismatch | L | M | QA pass on offers in Wk42; age-rating completed honestly per `research/tech/app-store-launch-aso.md` §1.5 | Resubmit; mailbox-grant affected users | Prod |
| AP5 | App Privacy / SDK privacy manifest gap | M | M | Privacy manifest pre-flight in Wk42; every third-party SDK audited | Add missing manifest, resubmit; expect 24–48h re-review | EB, Prod |
| AP6 | Apple iOS 26 SDK mandate (April 28, 2026) — build target slip | M | M | CI builds against iOS 26 SDK from Wk31 | Bring forward iOS 26 SDK upgrade; absorb 1 week from Phase 7 slack | EC |

### 3.7 Market risks

| ID | Risk | P | I | Mitigation | Contingency | Owner |
|---|---|---|---|---|---|---|
| MK1 | Habby (or other top-grossing studio) ships another genre-redefiner mid-development | M | H | Quarterly competitive scan from Wk1; differentiate on Lucent's brand (cool/crystalline palette per `research/games/art-audio-direction.md`); avoid frontal feature war | Pivot meta to one differentiator (e.g. guild boss as headline) for global; delay global by one quarter if necessary | Prod, Des |
| MK2 | UA costs surge 30–50% before global launch | M | M | Build a UA model that holds at $5 iOS CPI; track Meta + TikTok CPI weekly; have organic levers (creators, Reddit, Discord) ready | Pull global UA budget back; lean on organic + influencer (`research/tech/app-store-launch-aso.md` §5.3) | Prod |
| MK3 | iOS App Store algorithm shift downranks the category | L | M | Diversify creative concepts (5 per `research/tech/app-store-launch-aso.md` §5.2); maintain ASA Brand campaign always-on | Reset ASO keyword set; double down on creator content for organic | Prod |

### 3.8 People risks

| ID | Risk | P | I | Mitigation | Contingency | Owner |
|---|---|---|---|---|---|---|
| P1 | Solo-dev burnout (Scenario A only — flagged for awareness) | H | H | Not applicable in chosen Scenario B; if Scenario A is forced, build mandatory 1-week breaks at end of each phase | Bring on a co-founder; pause project for 30 days; restructure scope | Prod |
| P2 | Key hire churn — any of the 5 lean-team members leaves mid-project | M | H | Pair-programming and design-docs from Wk1; every decision recorded in `design/` markdown; cross-training in Wks 17–18 | 6–8 week ramp for replacement; absorb slip from Phase 7 slack | Prod |
| P3 | Outsource partner ghosts mid-asset (e.g. enemy artist disappears with 6 enemies done) | M | M | Milestone-based payments (50% on style-frame, 50% on delivery); always have a backup artist on the shortlist | Pull work in-house for completion; re-source with the backup artist; expect 2-week slip | Art |
| P4 | Composer mid-cycle change | L | M | Single SoundBetter composer locked in Wk5; 50% deposit, contracted for all 5 tracks | Re-bid with backup composer; reuse menu loop as placeholder | Aud |
| P5 | Co-founder dispute / equity disagreement (Scenarios B + C) | L | H | Cap table + vesting + IP assignment signed before Wk1 | Mediation; documented escape clauses | Prod |

### 3.9 Schedule risks

| ID | Risk | P | I | Mitigation | Contingency | Owner |
|---|---|---|---|---|---|---|
| S1 | Vertical slice (Wk16) misses exit criteria — loop doesn't feel good | M | H | Weekly internal playtest from Wk8; juice pass dedicated week (Wk15); juice budget locked in Wk7 plan | Slip Phase 2 by 2–4 weeks; absorb from Phase 7 slack; if still failing, escalate to scope re-cut (drop modes from 4 to 3) | Des, EC, Prod |
| S2 | Phase 3 (Combat) slips — heroes 6–8 art not done by Wk19 | M | M | Outsource surge ($2.5k/mo in budget for Wks 19–24); style guide locked Wk1 | Drop launch heroes from 8 to 6, ship 2 in LiveOps month 1 + 2 | Art, Prod |
| S3 | Soft-launch KPIs fail Stage 3 gate — global pushed by 1 quarter | M | H | Stage-gated review at Wks 44, 48, 52; ship to global only when KPI gates met | Extend soft launch 3 months; spend $30k more UA on monetization-tuning; re-bid composer for new event tracks; tighten budget burn | Prod, Des |
| S4 | App Review rejection at Wk52 — global slips by 2 weeks | M | M | Pre-submission checklist (§7 sign-off); external lawyer review; sandbox + age-rating audit | Resubmit on 24-hour cycle until accepted; communicate any creator/PR commitments | Prod |
| S5 | Localization wave 2 (ja/ko/zh-Hans/pt-BR) slips past Wk4 post-global | M | L | Translator engaged in Wk42; string freeze in Wk42 | Slip CJK markets to month 2 post-global; accept lower CVR in those locales for 30 days | Prod |

### 3.10 Top-5 risks by composite

1. **D1 — Ability stacking unbalanced** (M × H) — gates retention and feel.
2. **T3 — Cheating breaks PvP** (M × H) — existential for D30 social.
3. **AP1 — Gacha-odds App Review rejection** (M × H) — blocks launch.
4. **R1 — D7 retention <18% in soft launch** (M × H) — gates global.
5. **S3 — Soft-launch KPIs fail → 1-quarter push** (M × H) — cash-flow stress.

All have Wk-numbered mitigations above. Schedule slack (Phase 7 = 4 wks; Phase 8 = 10 wks) absorbs any single major slip.

---

## 4. Vertical slice scope (week 16 deliverable)

The single most important milestone in this plan. The point of the vertical slice is not breadth — it's to validate *does the loop feel good?* If the answer is no at Wk16, we re-scope or re-plan rather than burn the next 36 weeks of production.

### 4.1 In scope (must ship by Wk16)

| Area | Spec | Source |
|---|---|---|
| Hero | **1 hero**: the Dawnbow. Spine 2D rig with 6 animations (idle, run, shoot, hit, level-up, death). Per `content/heroes.md`. | content/heroes.md |
| Chapter | **1 chapter**: The Vale of First Light. **20 rooms** (17 standard + 2 offer rooms + 1 boss arena). Procedurally selected from a 30-room pool. | design/03-world-and-theme.md, design/05-launch-scope.md |
| Chapter boss | **1 boss**: The Veiled Sentinel. 3 phases; telegraphed AoEs; phase-transition stinger. | design/05-launch-scope.md |
| Abilities | **30 abilities** — a third of the launch pool of 120. Coverage requirement: **all 11 ability families represented** (per `content/abilities.md`). Stacking + synergy rules functional. | content/abilities.md |
| Enemies | **4 archetypes** (a third of launch's 12). Each with **biome reskin variants** for The Vale. | content/enemies.md |
| Ability-pick screen | 3 cards offered between rooms; rarity-weighted; re-roll cost optional (gem cost; sandbox economy only). | design/01-core-loop-spec.md |
| Energy system | 5-cap, 6-min refill; instrumented but not yet monetized (no IAP wired). | design/04-progression-and-economy.md |
| Save / load | **Firebase anonymous Auth + Firestore.** Minimum schema: `/users/{uid}/profile` (uid, createdAt, lastSeen), `/users/{uid}/run` (chapter, room, hero, abilities[], hp, energy). Save on every room clear. Restore on cold-launch. | 02-tech-stack-decision.md |
| FTUE | **Part A** of the FTUE script in `content/ftue-script.md`: rooms 1–3 scripted hints (joystick, auto-shoot, ability-pick callout). Energy displayed but not enforced in rooms 1–3. | content/ftue-script.md |
| Audio | **Local-only, placeholder.** Sonniss SFX one-shots wired in Unity audio sources; placeholder music loop. **No FMOD yet.** | research/games/art-audio-direction.md |
| Performance | **60fps stable on iPhone 12.** Build-size budget: ≤300 MB. | 02-tech-stack-decision.md |
| Telemetry | GameAnalytics SDK installed; 8 instrumented events: app_open, ftue_step, room_enter, room_clear, ability_pick, boss_kill, save_success, save_fail. | 02-tech-stack-decision.md |

### 4.2 Explicitly **out of scope** at Wk16

No monetization (RevenueCat, SKUs, IAP, ads, gacha); no meta-progression (gear, runes, pets, talents, battle pass, daily quests); no social (guilds, PvP, leaderboards); no localization (English only); no FMOD (placeholder audio); no anti-cheat hardening (deferred to Phases 5/6); no App Store Connect listing yet (TestFlight internal only).

### 4.3 Exit criteria (the Wk16 playtest)

Vertical slice ships if and only if:

1. **10 internal testers** on iPhone 12/13/14/15 each complete a full run from room 1 to The Veiled Sentinel kill **without a crash**.
2. **Save/load works** on each device: kill app between rooms 5 and 6, reopen, resume at room 6 with same hero + abilities + HP.
3. **60fps stable** in boss arena per Unity Profiler — ≥95% of frames within 16.67ms on iPhone 12.
4. **Subjective "feels good" ≥4/5** from 8 of 10 testers (5-question survey: loop, controls, juice, pick-screen clarity, boss satisfaction).
5. **FTUE completion ≥85%** across the same testers.
6. **Save schema** matches `design/06-data-schema.md` (authored Wk6); no manual edits in prod.

**Pass → Phase 3 begins Wk17. Fail → re-scope, 2-week recovery sprint, redo playtest Wk18.** This is the only milestone where "fail" is acceptable — better at Wk16 than Wk52.

---

## 5. Soft-launch plan in detail

Per `research/tech/app-store-launch-aso.md` §4. Three stages, 10 weeks total (Wks 43–52). The point of staging is *not* slow rollout for caution's sake — it's to buy different types of data in cost-efficient geos in the right order: technical signal, then retention signal, then monetization signal.

### 5.1 Stage 1 — Philippines (Wks 43–44, **technical**)

- **Geo:** PH only. Cheap CPIs, English-speaking — best for crash + FTUE signal.
- **UA spend:** $1,500–$3,000 (ASA Basic + 1 Meta Reels concept × 3 variants).
- **Daily review:** crash rate, FTUE funnel, first-session length.
- **KPI gates to advance:** crash-free ≥99.0%; FTUE completion ≥80%; install→tutorial ≥65%; no P0/P1 open.
- **Fail action:** hotfix, hold in PH 2 more weeks.

### 5.2 Stage 2 — add CA + AU (Wks 45–48, **retention**)

- **Geos:** PH + CA + AU. Western-ARPU proxies; statistically meaningful retention in 2–3 weeks.
- **UA spend:** $7,000–$15,000; $500–$1,000/day/channel/geo per `research/tech/app-store-launch-aso.md` §7.1.
- **Channels:** ASA Advanced (Discovery + Brand + Category + Competitor); Meta Reels (3–6 creatives/wk); TikTok wave 1.
- **A/B tests live:** ability-pick 3-vs-4 cards; energy refill 5-vs-6 min; chapter-4 boss difficulty.
- **KPI gates to advance:** D1 ≥40%, D7 ≥18%, crash-free ≥99.5%, tutorial completion ≥90%.
- **Fail action:** extend Stage 2 by 2 weeks; tune; re-test.

### 5.3 Stage 3 — add BR + Nordics (Wks 49–52, **monetization**)

- **Geos:** PH + CA + AU + BR + SE + NO + DK + FI. BR for volume + PT loc test; Nordics for high-ARPU.
- **UA spend:** $7,000–$12,000. Lean soft-launch total stays inside $15–30k.
- **Channels:** ASA Advanced expanded; Meta + TikTok waves 2 + 3; AppLovin test; first influencer slate (5 × $1–3k).
- **A/B tests live:** gacha pity-soft vs pity-hard; battle pass $4.99 vs $9.99; first-IAP $0.99 timing (FTUE end vs ch.1 boss).
- **KPI gates to launch global:** D1 ≥40%, **D7 ≥20%**, **D30 ≥10%**, **D7 ROAS ≥15%**, **ARPDAU ≥$0.15**, D90 payback ≤180d, crash-free ≥99.7%, one mock LiveOps event ran end-to-end.
- **Pass:** go global Wk53. **Fail:** S3 contingency — extend soft launch by 1 quarter; reset UA model.

### 5.4 UA-budget summary (soft launch)

| Tier | Stages 1 + 2 + 3 total | Per `research/tech/app-store-launch-aso.md` |
|---|---|---|
| **Lean indie (this plan)** | **$15k–$30k** | Tier 1: Apple Search Ads Basic + Meta Reels; PH + CA primary |
| Mid | $50k–$100k | Adds TikTok + AppLovin in CA/AU/BR; 5–8 creatives/week; light influencer slate |
| Funded | $150k–$400k+ | Adds Moloco, Google AC; 3-geo staged from day 1; daily UA team meeting |

For Lucent: **$25k soft-launch UA** is the budgeted line in §6.

---

## 6. Budget summary (Lean indie scenario)

All figures USD, illustrative, ±15% confidence.

### 6.1 Pre-launch dev (52 weeks)

| Line | Monthly | 12-month total |
|---|---|---|
| Design lead | $11,500 | $138,000 |
| Client engineer #1 | $13,000 | $156,000 |
| Client engineer #2 | $13,000 | $156,000 |
| Art lead | $10,000 | $120,000 |
| Producer | $11,000 | $132,000 |
| Outsourced audio (composer + sound design) | $1,200 | $14,400 |
| Voice (narrator) | $200 amortized | $2,400 |
| Outsourced art surge (Wks 19–24 burst) | $2,500 | $30,000 |
| Tools (Apple $99/yr, Unity Pro 1 seat, FMOD Indie, Spine Pro, Aseprite, Figma, Adobe / Affinity, Procreate, Soundly) | flat | ~$3,000 |
| Apple Developer Program | — | $99 |
| Firebase (free → growth tier in Wks 35+) | low → modest | ~$2,500 |
| RevenueCat (free under $2.5k MTR) | $0 | $0 |
| GameAnalytics + Tenjin | $0 | $0 |
| Asset libraries (Synty POLYGON MINI; Sonniss free) | — | ~$500 |
| Contingency (10%) | — | ~$75,000 |
| **Pre-launch dev total** | — | **~$830,000** |

### 6.2 Soft-launch UA (Wks 43–52)

- $25,000 (mid of $15–30k Lean tier per `research/tech/app-store-launch-aso.md` §7.1).

### 6.3 Global-launch UA, year 1 (recommended tier)

- **Lean indie tier:** **$60,000 year-1 UA** (≈$40k in month 1, then taper). Target D90 payback per the published Lean tier.
- Mid tier alternative: $500k. Funded tier: $3–5M. **We recommend Lean** unless the soft launch beats KPI gates by ≥25%, in which case raise to Mid.

### 6.4 Total to break-even

| Line | Total |
|---|---|
| Pre-launch dev | ~$830,000 |
| Soft-launch UA | $25,000 |
| Global year-1 UA (Lean) | $60,000 |
| Year-1 post-launch ops (FTE retained, see §1 Phase 10) | ~$180,000 (3 retained FTE at fractional, 6-month run) |
| **Total cash needed to break-even window (D180 payback)** | **~$1.10M** |

This is the seed-cheque target: **$1.1M for 12-month dev + 6-month post-launch runway** to reach the D180 payback inflection. The funded tier requires more like $4–6M cash including UA scale-up.

### 6.5 Sensitivity

- If Phase 8 fails its Stage-3 gate and we slip 1 quarter (Risk S3), add ~$190k (3 months of burn at $63k + extra $20k soft-launch UA).
- If we lose one engineer mid-project (Risk P2), add ~$60k (recruitment + 1.5-month ramp gap).

---

## 7. Definition of Done — Phase 0 / Phase 1 sign-off checklist

This checklist must be **fully green** before the team commits to Phase 2 (Vertical Slice). Each item maps to a content catalog, design doc, or research artifact already in the repo or to be authored by Wk6.

### 7.1 Research artifacts (Phase 0)

- [ ] `research/tech/engine-comparison.md` — engine choice justified
- [ ] `research/tech/backend-infra.md` — backend choice justified
- [ ] `research/tech/monetization-sdks.md` — monetization stack justified
- [ ] `research/tech/app-store-launch-aso.md` — ASO + UA plan referenced
- [ ] `research/games/art-audio-direction.md` — art direction recommended

### 7.2 Locked design documents (Phase 1 outputs)

- [ ] `design/00-design-pillars.md` — 3–5 pillars adopted
- [ ] `design/01-core-loop-spec.md` — core loop frozen; cadence section §8 used in §1 Phase 10 of this doc
- [ ] `design/02-tech-stack-decision.md` — locked, used in §6 budget
- [ ] `design/03-world-and-theme.md` — 7 realms named + palette per realm
- [ ] `design/04-progression-and-economy.md` — currencies + energy + gear / rune economy frozen v1
- [ ] `design/05-launch-scope.md` — content counts frozen (this doc references it)

### 7.3 Content catalogs (Phase 1 deliverables; must be frozen v1)

- [ ] `content/heroes.md` — **8 heroes** spec'd: kit, animation budget, hero-specific synergies
- [ ] `content/abilities.md` — **120 abilities** spec'd across 11 families and 5 rarities; stacking rules per ability
- [ ] `content/enemies.md` — **12 archetypes** + biome reskin matrix per realm
- [ ] `content/equipment.md` — **6 gear slots × 8 sets** with set bonuses
- [ ] `content/runes.md` — **24 runes** across 4 categories
- [ ] `content/pets.md` — **12 pets** with passives + actives
- [ ] `content/ftue-script.md` (to be authored by Wk4) — Parts A, B, C
- [ ] `content/production-roadmap.md` — **this document**

### 7.4 Tech-design artifacts (Wks 1–6 deliverables)

- [ ] Firestore schema diagram in `design/06-data-schema.md` (to be authored Wk6)
- [ ] Cloud Function contracts (REST shape, idempotency keys, HMAC scheme) signed off by EB
- [ ] Analytics event taxonomy in `analytics/events.yaml`
- [ ] Remote Config key list authored
- [ ] Unity project bootstrap: URP mobile preset, IL2CPP build, Git LFS rules, GitHub Actions YAML

### 7.5 Art / audio briefs (Wk5 deliverables)

- [ ] Art style guide v1 (palette, hero proportions, enemy taxonomy color-code, UI iconography rules) — derived from `research/games/art-audio-direction.md`
- [ ] Composer signed; 3-track demo commissioned
- [ ] SFX cue list (50 cues) keyed to in-game events
- [ ] Voice direction (1 narrator, 30 lines) and 3-audition shortlist

### 7.6 Production artifacts

- [ ] Cap table + IP assignment + vesting signed for all 5 lean-team members (Risk P5 mitigation)
- [ ] Apple Developer org account verified, banking + tax forms signed (3 weeks lead time per `research/tech/app-store-launch-aso.md` §1.1)
- [ ] $1.1M seed funding committed (or scaled-down equivalent for a smaller team)
- [ ] Risk register (this §3) reviewed by all 5 leads; owners signed off

### 7.7 The single Phase-2 commit gate

When all of §7.1–§7.6 are green, the team commits to Phase 2. **Until then, do not start Wk7 client work.** Starting Phase 2 with unresolved Phase-1 items is the single highest-probability source of Phase-2 slip in projects of this shape.

---

## 8. Cross-reference index

- Phase definitions and content counts: `design/05-launch-scope.md`
- Tech stack and infra cost model: `design/02-tech-stack-decision.md`
- Soft-launch KPIs, UA tiers, ASO framework: `research/tech/app-store-launch-aso.md`
- Art / audio outsourcing pipeline and budgets: `research/games/art-audio-direction.md`
- Core loop and LiveOps cadence: `design/01-core-loop-spec.md`
- Currencies / energy / gear / runes economy: `design/04-progression-and-economy.md`
- Realms / biomes / palette per chapter: `design/03-world-and-theme.md`
- Hero, ability, enemy, gear, rune, pet catalogs: `content/heroes.md`, `content/abilities.md`, `content/enemies.md`, `content/equipment.md`, `content/runes.md`, `content/pets.md`
- (To be authored by Wk6) FTUE script: `content/ftue-script.md`; data schema: `design/06-data-schema.md`; analytics: `analytics/events.yaml`

---

*End of production roadmap. This document is the master schedule for Lucent. Re-baseline at the end of each phase. Major schedule changes (>1 week) require sign-off from the producer and the design lead.*
