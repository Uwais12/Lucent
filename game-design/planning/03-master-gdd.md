# Lucent — Master Game Design Document

**Working title**: **Lucent: Shards of the Shattered Sun**
**App Store title**: `Lucent: Archer Roguelike` — *Bow Hero Action Dungeons*
**Platform**: iPhone (iOS) only — portrait
**Business model**: F2P + IAP + rewarded ads
**Phase**: **0 — Research & Planning: COMPLETE**
**Next phase**: 1 — Vertical Slice prototype
**Last updated**: 2026-05-11

> This is the single entry-point document. It executive-summarizes the design and points to the full docs for each area. If you read only one file in this repo, read this one.

---

## 1. Elevator pitch

The suns shattered, and the **Dim** took everything they touched. You are a **Lucent-bearer**, a champion of crystallized light, fighting room-by-room through seven corrupted realms to reignite the world.

Lucent is a one-thumb, portrait, iOS-only Archero-style roguelite. You only move; the bow auto-fires when you stand still. Between rooms you draft one of three upgrades and build a bullet-hell power fantasy. Between runs you level heroes, forge gear, unlock talents, chase gacha banners, and climb a Tower that never ends. Everything a genre veteran expects (7 chapters, 8 heroes, 120 abilities, 4 modes, gear, pets, sigils, battle pass, guilds, PvP, LiveOps calendar) — plus two borrows the market hasn't copied yet: **hidden weapon-evolution recipes** (Survivor.io) and **three combat modes from one combat core** (Archero 2).

Fair to F2P. Generous to payers. No cash-only heroes. Six currencies max. Rates published.

---

## 2. Design pillars (short form)

Full detail: [`design/00-design-pillars.md`](../design/00-design-pillars.md)

1. **One thumb, full skill ceiling** — single joystick, stop-to-shoot, auto-aim. No fire button. Depth from positional decisions.
2. **Build-defining synergies, screenshot-worthy moments** — damage multiplies, never adds. 8 named build archetypes, hittable in 1-in-5 runs.
3. **Mythic ceilings, friendly floors** — 30-second first-run fun; six-month player still has next goals three levels away. Flat-grid talent screen so ceilings raise by patch.
4. **A new event-tab item every login** — battle pass at launch, 4+ concurrent LiveOps surfaces at all times.
5. **Fair-to-F2P, generous-to-payers** — no cash-only heroes; 6 currency cap; rates published globally; monthly card is the anchor SKU.
6. **Social as the D30+ extender** — guilds + async PvP at launch, not post-launch.
7. **Differentiate on build discovery + multi-mode** — hidden Awakened recipes; Campaign + Tower + Survival from one combat core.
8. **Mobile-portrait readability is sacred** — chunky 2.5D low-poly, strict telegraph language, hit-stop / hit-flash / knockback as first-class code.

---

## 3. World & fantasy

Full detail: [`design/03-world-and-theme.md`](../design/03-world-and-theme.md)

- **Setting**: **Iridian**, a ring of seven realms orbiting the twin suns Auria and Velios.
- **Inciting event**: The Dimming — suns shattered, their shards fell across the realms.
- **Antagonist**: **The Dim** — a soft, patient, hungry absence. Manifests as corrupted creatures and Echoes.
- **Player role**: A **Lucent-bearer** who bonded with a shard and can step into the Dim.
- **Seven realms at launch**: Vale of First Light → Sunken Cathedral → Frostspire → Emberforge → Glassroot Forest → Hollow Sky → The Long Dusk.
- **Tone**: Heroic mythic-fantasy. Hopeful. Light on plot, heavy on atmosphere. *Hades* × *Tunic* × a velvet-printed storybook.

---

## 4. Core loop

Full detail: [`design/01-core-loop-spec.md`](../design/01-core-loop-spec.md)

**Session (10–20 min)**:
Home → pick hero / mode → **Run**: 20 rooms per chapter (17 combat + 2 offer-givers + 1 boss) with a 1-of-3 ability draft between rooms → death or clear returns to Home → meta screens (upgrade gear, level hero, spend currencies, claim quests, gacha, battle pass) → repeat.

**Control**: single virtual joystick, stop-to-shoot, auto-aim, one tap-to-trigger active button (dash/ultimate).

**Three offer-givers**: Angel (safe upgrades) / Devil (upgrades with drawback) / **Lucent Sprite** (theme-tied third option). Directly modeled on Archero 2's three-offer system.

**Modes at launch**: Campaign (rooms) · Tower (endless) · Survival (timed arena) · Daily Dungeon · Async PvP · Guild Boss.

---

## 5. Progression & economy

Full detail: [`design/04-progression-and-economy.md`](../design/04-progression-and-economy.md), [`content/balance-curves.md`](../content/balance-curves.md), [`content/equipment.md`](../content/equipment.md), [`content/runes.md`](../content/runes.md), [`content/pets.md`](../content/pets.md)

**Power budget** (locked): Forge/gear 35% · Inscription 20% · Resonance 12% · Hero Level 12% · Mastery 8% · Sigils 8% · Spirits 5% = 100%.

**Six currencies** (locked cap): Gold · Gems · Lucent Shards · Embers · Sigil Dust · Pass Points.

**Endgame math** (from `content/balance-curves.md`):
- Hero XP: `XP_to_next(n) = round(100 × n^1.7)`. L80 cumulative = 5,007,424 XP.
- Gear power: `base × rarity_mult × (1 + 0.04 × level)`. Rarity multipliers 1.0 / 1.5 / 2.4 / 4.0 / 6.5 / 11.0.
- Chapter HP `× 1.65^(C-1)`, damage `× 1.40^(C-1)`.
- **F2P → Whale endgame gap = 2.30–2.40×** (target band 2.0–3.0×, no cap-skip).
- **F2P timelines**: L60 hero = 30d, first Legendary = 14d, first Mythic = 90d, Inscription max = 180d, first Chaos = ~365d, Awakened tier unlock = 270d.

**Energy**: cap 30, regen 1/12 min, 6 per Campaign run. Looser than Archero.

**Gacha** (locked): 10-pull soft pity, 50-pull hard pity, 50% rate-up + mercy-guarantee on Mythic, duplicate → 30 hero-shards. Rates published in-app globally.

---

## 6. Content specs

All catalogs are in [`content/`](../content/) with named entities and stat tables.

| Deliverable | Doc | What's in it |
|---|---|---|
| **8 launch heroes** | [`content/heroes.md`](../content/heroes.md) | Full roster with ultimates, passives, talent trees, unlock paths |
| **120 in-run abilities** | [`content/abilities.md`](../content/abilities.md) | ~30 Common / 40 Rare / 30 Epic / 15 Legendary / 5 Mythic; 8 named build archetypes; 12 hidden **Awakened** recipes |
| **12 enemy archetypes** | [`content/enemies.md`](../content/enemies.md) | Stat blocks, AI patterns, biome reskins |
| **7 chapter bosses + 3 mini** | [`content/bosses.md`](../content/bosses.md) | Phase structure, telegraphs, boss templates |
| **7 chapters × 20 rooms** | [`content/levels.md`](../content/levels.md) | Room recipes, pacing curve, chapter difficulty ramps |
| **6 gear slots × 5 bases × 8 sets** | [`content/equipment.md`](../content/equipment.md) | Fusion, enchant, reforge, slot-bound upgrade levels |
| **12 pets/Spirits** | [`content/pets.md`](../content/pets.md) | Common → Mythic, banner featured, synergy affinities |
| **24 runes/Sigils** | [`content/runes.md`](../content/runes.md) | 4 categories × 6 examples |
| **Balance math** | [`content/balance-curves.md`](../content/balance-curves.md) | Every stat curve, reproducible formulas |
| **LiveOps 90-day calendar** | [`content/liveops-calendar.md`](../content/liveops-calendar.md) | Daily/weekly/BP overlays, 12 special events, push cadence |
| **16 UI wireframes** | [`content/ux-wireframes.md`](../content/ux-wireframes.md) | ASCII layouts, tap targets, empty/error states |
| **FTUE script** | [`content/ftue-script.md`](../content/ftue-script.md) | Beat-by-beat 30s tutorial, D1–D7 unlock cadence |
| **Audio brief** | [`content/audio-brief.md`](../content/audio-brief.md) | 5 tracks, 50 SFX, 30 voice lines, FMOD map |
| **Tech architecture** | [`content/tech-architecture.md`](../content/tech-architecture.md) | 21 Firestore collections, 38 Cloud Functions, run-validation protocol |
| **Production roadmap & risks** | [`content/production-roadmap.md`](../content/production-roadmap.md) | Milestones, team plan, risk register |
| **Marketing & ASO brief** | [`content/marketing-aso-brief.md`](../content/marketing-aso-brief.md) | Icon, 7 screenshots, 8 UA creatives, PR outlets |

---

## 7. Tech stack (locked)

Full detail: [`design/02-tech-stack-decision.md`](../design/02-tech-stack-decision.md), [`content/tech-architecture.md`](../content/tech-architecture.md), the three [`research/tech/`](../research/tech/) docs.

| Layer | Choice | Rationale |
|---|---|---|
| **Engine** | Unity 6 LTS (backup: Godot 4.6) | Best iOS ad SDK support, hiring market, perf headroom |
| **Backend** | Firebase (Auth · Firestore · Cloud Functions TS · Remote Config · A/B · FCM · App Check · Crashlytics · Analytics → BigQuery) | ~$0/mo at launch; ~$540–810/mo at 100k MAU |
| **IAP** | RevenueCat on StoreKit 2 | Free < $2.5k MTR; drop at scale once 1% fee > $5k/mo |
| **Ads** | AppLovin MAX mediator (+ Unity/Liftoff/Mintegral/Meta/AdMob/Pangle) | Highest iOS eCPM |
| **Attribution** | Tenjin at launch → AppsFlyer at >$10k/mo UA | Free tier fits soft launch |
| **Analytics** | GameAnalytics + Firebase Analytics | Game-native funnels + BigQuery warehouse |
| **Crash** | Firebase Crashlytics | |
| **Remote config / A/B** | Firebase Remote Config + A/B Testing | |
| **Push** | Firebase Cloud Messaging (APNs) | |
| **Auth** | Anonymous silent + Sign in with Apple before first IAP + Game Center as social adjunct | |
| **Anti-cheat** | Server-authoritative gacha + grants + HMAC-signed run summaries + App Attest | |

**Cost envelope**: ~$8/mo at launch (just Apple Developer fee). ~$3.5–5.5k/mo at 250k DAU / $150k MTR (2–4% of revenue).

---

## 8. Launch scope (locked)

Full detail: [`design/05-launch-scope.md`](../design/05-launch-scope.md)

| Bucket | Global launch | Soft launch (subset) |
|---|---|---|
| Heroes | 8 | 4 (Dawnbow, Wardlight, Embercaller, Frostshard) |
| Chapters | 7 | 3 (Vale, Sunken Cathedral, Frostspire) |
| Abilities | 120 | 60 |
| Enemy archetypes | 12 | 8 |
| Chapter bosses | 7 | 3 |
| Modes | Campaign · Tower · Survival · Daily Dungeon · async PvP · Guilds | Campaign + Tower + Guilds + BP + gacha |
| Currencies | 6 | 6 |
| Gear slots × sets | 6 × 8 | 6 × 4 |
| Pets | 12 | 4 |
| Sigils | 24 | 12 |
| Languages | en-US day 1; ja/ko/zh-Hans/pt-BR/de/fr within 4 weeks | en-US only |

**Timeline** (small team of ~5): ~12 months from Phase 1 start to global launch.
**KPI gates to scale UA**: D1 ≥ 40% · D7 ≥ 18% · D30 ≥ 8% · D7 ROAS ≥ 15% · Tutorial completion ≥ 90% in ≤ 30s.

---

## 9. LiveOps at launch

Full detail: [`content/liveops-calendar.md`](../content/liveops-calendar.md)

**Concurrent surfaces always live**: 7 daily · 5 weekly · 1 battle pass season (45 days, Lite $4.99 / Premium $14.99 / Hero-Buy $39.99) · 1 monthly story arc (*The Long Dawn*) · ≥ 2 special events.

**Special event types** (12 windows across the 90-day rolling template): **Tower of Light** (×3) · **Banner Festival** (×3) · **Lucent Tournament** (×2) · **Realm Reckoning** (×3, one per elemental realm) · **IP Collab** (×1, reserved).

**Push cadence**: ≤ 2/day for active users, 1/day for low-engagement, 1 every 2–3 days for inactive. Quiet hours respected from user tz.

**Year-1 tentpoles**: D90 *First Shards* · D180 *The Half-Light* (co-op launch) · D270 *Twilight Vigil* (Awakened / prestige) · D365 *Anniversary: The Rekindling*.

---

## 10. Monetization catalog (launch SKUs)

Full detail: [`design/04-progression-and-economy.md`](../design/04-progression-and-economy.md), [`research/monetization/f2p-patterns.md`](../research/monetization/f2p-patterns.md)

| Tier | SKU | Price | Notes |
|---|---|---|---|
| Anchor | **Monthly Card** | $9.99 / 30d non-renewing | +200 gems immediate, +100/day for 30d |
| Anchor | **Privilege sub** | $4.99/mo auto-renew | Ad-free + daily boost |
| Season | **Battle Pass Lite / Premium / Hero-Buy** | $4.99 / $14.99 / $39.99 | 45-day season |
| FTUE | **Starter Pack** | $0.99 → $4.99 | 48h timer |
| Daily | **Daily Deal / Daily Premium** | $0.99 / $2.99 | Rotates |
| Gem packs | 6 tiers | $0.99 → $99.99 | First-purchase doubler on every tier |
| Event packs | Time-limited | $2.99 → $29.99 | Tied to events |
| Gacha | Hero/Spirit banner | 10 pulls = 2,400 gems | 10-pull soft pity, 50-pull hard pity |

**Never**: cash-only heroes, hidden gacha rates, misleading offers, energy-full paywall past chapter 3.

---

## 11. Pre-build checklist — sign-off

The pre-build checklist from [`planning/00-master-plan.md`](00-master-plan.md) is answered end-to-end. Every item is now either **decided** and linked to a doc, or explicitly **deferred to Phase 1 prototype**.

| Area | Status | Doc |
|---|---|---|
| Platform, orientation, session length | ✅ decided | `design/00`, `design/01` |
| Control scheme | ✅ decided (stop-to-shoot, auto-aim, single joystick) | `design/00` Pillar 1 |
| Run structure (7 × 20 rooms + 3 offer-givers) | ✅ decided | `design/01`, `content/levels.md` |
| Hero count, roster, ultimates, passives, unlocks | ✅ decided (8) | `content/heroes.md` |
| Ability pool (120), rarities, 8 build archetypes, 12 Awakened | ✅ decided | `content/abilities.md` |
| Enemy archetypes (12) | ✅ decided | `content/enemies.md` |
| Boss roster (7 chapter + 3 mini) | ✅ decided | `content/bosses.md` |
| Gear slots (6) × bases (5) × sets (8), fusion/enchant/reforge | ✅ decided | `content/equipment.md` |
| Pets / Spirits (12) | ✅ decided | `content/pets.md` |
| Runes / Sigils (24) | ✅ decided | `content/runes.md` |
| Balance curves & power budget | ✅ decided & validated | `content/balance-curves.md` |
| Currencies (6, capped) | ✅ decided | `design/04` |
| Energy system | ✅ decided | `design/04` §4 |
| IAP SKU catalog | ✅ decided | `design/04`, §10 above |
| Battle pass | ✅ decided (45d Lite/Premium/Hero-Buy) | `content/liveops-calendar.md` |
| Gacha system + published rates | ✅ decided | `design/04`, decisions log #014 |
| LiveOps daily/weekly/seasonal + special events | ✅ decided (90-day rolling template) | `content/liveops-calendar.md` |
| Push notification design | ✅ decided | `content/tech-architecture.md`, `content/liveops-calendar.md` |
| Guilds + PvP at launch | ✅ decided (both in scope) | `design/05` |
| Engine, backend, IAP, ads, attribution, analytics, crash, remote config, push, auth, anti-cheat | ✅ decided | §7 above, `design/02`, `content/tech-architecture.md` |
| Firestore schema (21 collections), Cloud Functions (38) | ✅ decided | `content/tech-architecture.md` |
| Art direction, palette, tools, outsourcing pipeline | ✅ decided | `research/games/art-audio-direction.md` |
| Audio direction, 5 tracks + 50 SFX + 30 voice lines | ✅ decided | `content/audio-brief.md` |
| UI wireframes (16 screens) | ✅ decided | `content/ux-wireframes.md` |
| FTUE (30s tutorial + D1–D7 unlock cadence) | ✅ decided | `content/ftue-script.md` |
| App Store metadata (title, subtitle, icon, screenshots, video) | ✅ decided | `content/marketing-aso-brief.md` |
| Soft-launch geos, KPIs, UA channels, PR list | ✅ decided | `content/marketing-aso-brief.md`, `research/tech/app-store-launch-aso.md` |
| Localization plan | ✅ decided (2 day 1, 6 by week 4) | decisions log #020 |
| Production roadmap, team plan, risk register | ✅ decided | `content/production-roadmap.md` |

**Deferred to Phase 1 prototype** (explicit):
- Exact tap-to-trigger active per hero (moves that need feel-testing on device).
- Exact damage numbers per ability (balance-curves.md provides the formulas; per-ability tuning happens during vertical slice).
- Final level layouts per room (recipes exist; specific room geometry is prototype-phase work).
- Final tutorial UI text (script exists; localized wording is Phase 1).

Everything else is **decided and ready to build**.

---

## 12. Decisions log

20 major decisions locked in [`planning/01-decisions.md`](01-decisions.md).

The 10 pending decisions listed there (021–030) are all resolved — they map 1:1 to wave-2 content docs.

---

## 13. Next step — enter Phase 1

The immediate next actions are execution, not more planning:

1. **Register Apple Developer account** ($99/yr).
2. **Spin up Unity 6 LTS project** in `game-client/` (parallel to the existing Next.js app).
3. **Spin up Firebase project** with the schema from `content/tech-architecture.md`.
4. **Build the vertical slice** per `content/production-roadmap.md` Phase 2:
   - 1 hero: **Dawnbow**
   - 1 chapter: **Vale of First Light** (5 rooms + 1 boss for prototype; expand to 20 for slice)
   - Full in-run ability draft with a subset of ~20 abilities
   - Energy system + save/load via Firebase
   - Runs end-to-end on a real iPhone at 60 fps
5. **Playtest daily. Tune. Iterate.**

Phase 0 — Research & Planning — is complete.
