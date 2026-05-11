# Master Plan — Lucent Mobile Game

**Status**: Phase 0 — Research & Planning
**Last updated**: 2026-05-11

---

## 1. Phases

| Phase | Goal | Exit criteria |
|---|---|---|
| **0. Research** | Understand the genre, pick tech, document everything we need before writing code. | All `research/` docs filled, design pillars + tech decision committed. |
| **1. Design** | Concrete GDD: characters, levels, items, enemies, economy, balance curves, UX flows. | `design/` and `content/` directories complete with named entities and stat tables. |
| **2. Prototype** | Vertical slice: one hero, one chapter, one boss, the in-run upgrade loop. Internal play-test on a real iPhone. | Vertical slice plays end-to-end at 60fps on iPhone 12+. |
| **3. Production** | Build out full content (heroes, chapters, items, events) + monetization + backend. | Feature-complete build, all systems wired, store config done. |
| **4. Soft Launch** | Limited geo launch + analytics. Tune retention, monetization, balance. | Hitting target D1/D7/D30 retention and ARPDAU. |
| **5. Global Launch** | App Store global release + UA + LiveOps cadence. | Launched. |
| **6. LiveOps** | Forever. Weekly content, seasonal events, balance tuning, new heroes. | Ongoing. |

---

## 2. Research backlog (Phase 0)

This is the index of all research deliverables. Filled in by parallel agents.

### Competitive analysis (`research/games/`)
- [ ] `archero-1.md` — Archero deep dive
- [ ] `archero-2.md` — Archero 2 deep dive
- [ ] `whittle-defender.md` — Whittle Defender deep dive
- [ ] `genre-overview.md` — Archero-like genre landscape & comparison matrix
- [ ] `progression-systems.md` — meta-progression patterns
- [ ] `in-run-abilities.md` — catalog of 100+ in-run upgrade concepts
- [ ] `enemies-and-bosses.md` — enemy archetypes & boss patterns
- [ ] `art-audio-direction.md` — visual & audio direction

### Monetization & LiveOps (`research/monetization/`)
- [ ] `f2p-patterns.md` — IAP, gacha, energy, ads
- [ ] `liveops-retention.md` — daily/weekly/seasonal events, retention curves

### Tech (`research/tech/`)
- [ ] `engine-comparison.md` — Unity vs Godot vs SpriteKit vs Cocos vs Defold
- [ ] `backend-infra.md` — Firebase vs PlayFab vs Supabase vs custom
- [ ] `monetization-sdks.md` — StoreKit / RevenueCat / AppLovin / etc.
- [ ] `app-store-launch-aso.md` — submission, ASO, UA, soft launch

---

## 3. Pre-build checklist (must be decided before code)

This is the master list of decisions we need to make in Phase 0 / 1 before writing the first line of game code. Each item links to a doc that will hold the decision.

### A. Game identity
- [ ] Working title → final title
- [ ] One-line pitch
- [ ] Setting / theme / lore (medieval fantasy? sci-fi? post-apocalyptic? cute / dark / mythic?)
- [ ] Tone (serious, cheerful, cheeky)
- [ ] Target audience (age, region, casual vs. mid-core)
- [ ] Primary fantasy ("be the legendary archer in a doomed kingdom" etc.)

### B. Core gameplay
- [ ] Camera & perspective (top-down 2D, 2.5D, isometric)
- [ ] Orientation (portrait — locked)
- [ ] Control scheme (single virtual joystick + stop-to-shoot vs. always-fire vs. auto-fire)
- [ ] Session length target (15–20 min main, 3–5 min "quick" mode?)
- [ ] Room/floor/chapter structure (rooms per floor, floors per chapter, chapters at launch)
- [ ] Run end conditions (death sends back to map; checkpoints? lives?)

### C. Heroes / characters
- [ ] Hero count at launch (target: 6–10)
- [ ] Hero archetypes (DPS, tank, support, summoner, glass cannon, etc.)
- [ ] Hero abilities (each: 1 ultimate, 1 passive, 1 talent tree)
- [ ] Unlock paths (campaign progress, gacha, premium, event)
- [ ] Hero ascension / shards / star levels

### D. Combat & in-run abilities
- [ ] Total in-run ability pool at launch (target: 80–120)
- [ ] Rarity tiers (Common/Rare/Epic/Legendary/Mythic distribution)
- [ ] Pick-3 system rules (rarity weights, anti-dup logic)
- [ ] Synergy / build archetypes (6–8 targeted builds)
- [ ] Damage types & status effects (fire/ice/lightning/poison/bleed/stun)

### E. Equipment & gear
- [ ] Gear slots (weapon, armor, ring, locket, bracelet, spirit — exact list)
- [ ] Rarity tiers (5–7 tiers)
- [ ] Upgrade systems (level up, fusion, enchant, set bonuses, reforge)
- [ ] Power curve and gear power budget vs. other progression layers

### F. Enemies & bosses
- [ ] Enemy archetypes (8–12 at launch)
- [ ] Boss roster (one chapter boss × N chapters + recurring world bosses)
- [ ] Boss design templates (charging brute, AoE caster, projectile pattern, summoner, multi-phase)
- [ ] Difficulty curve across chapters

### G. Meta-progression
- [ ] Hero level cap & XP curve
- [ ] Account level & feature unlocks (gating new modes)
- [ ] Permanent talent tree (branches, point sources, soft caps)
- [ ] Ascension / prestige if any

### H. Economy & monetization
- [ ] Currency set (gold, gems, scrolls, keys, dust, event tokens — name them)
- [ ] Energy/lives system or not
- [ ] IAP catalog (starter pack, monthly card, battle pass, gem packs, gacha banners, event packs)
- [ ] Ad rewards (free chest, 2x rewards, revive, extra picks)
- [ ] Subscription tiers (if any)
- [ ] Apple compliance (loot box odds disclosure, ATT, subscription rules)

### I. LiveOps
- [ ] Daily quests / login calendar
- [ ] Weekly missions / boss
- [ ] Battle pass length & content
- [ ] Seasonal events template
- [ ] Push notification strategy
- [ ] Guild / social features at launch vs. post-launch

### J. Tech stack
- [ ] Engine choice (decision doc with rationale)
- [ ] Backend choice
- [ ] IAP SDK
- [ ] Ad SDK
- [ ] Analytics SDK
- [ ] Attribution / MMP
- [ ] A/B test & remote config
- [ ] Crash reporter
- [ ] Auth (Sign in with Apple, Game Center, anonymous)
- [ ] Cloud save approach

### K. Art & audio
- [ ] Art direction (chunky low-poly vs. pixel vs. vector vs. chibi 3D)
- [ ] Color palette / mood boards
- [ ] Pipeline & tools (Aseprite, Spine, Blender)
- [ ] Outsourcing partners
- [ ] Audio direction (SFX library, composer, music count)

### L. UX & UI
- [ ] Wireframes for: main menu, run HUD, ability pick screen, gear screen, shop, battle pass, daily quests
- [ ] Tutorial / FTUE plan
- [ ] Onboarding hook (first 5 minutes)

### M. Launch
- [ ] App Store metadata (title, subtitle, screenshots, video)
- [ ] Privacy policy & support URL
- [ ] Soft-launch geos & duration
- [ ] UA budget tier
- [ ] KPI targets (D1, D7, D30, ARPDAU)

---

## 4. Decisions log

We will keep a single decision log at `planning/01-decisions.md` once research wave 1 is in.

## 5. Open questions

We will collect open questions in `planning/02-open-questions.md`.
