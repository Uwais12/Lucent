# Launch Scope — Lucent

This is the **content scope** for global launch. Soft launch will ship a reduced version (fewer chapters, fewer heroes). Anything beyond this list is post-launch.

## Content counts at launch

| Asset | Count | Notes |
|---|---|---|
| **Heroes** | 8 | 6 free-path unlockable, 2 gacha-banner premium |
| **Chapters / realms** | 7 | The Vale → The Long Dusk (`design/03-world-and-theme.md`) |
| **Rooms per chapter** | 20 | 17 standard + 2 offer rooms + 1 boss |
| **Chapter bosses** | 7 | One per realm |
| **Recurring world bosses** | 3 | Mini-bosses re-skinned per realm |
| **In-run abilities** | 120 | Across rarities; ~30 Common, 40 Rare, 30 Epic, 15 Legendary, 5 Mythic |
| **Named build archetypes** | 8 | Each viable from any hero with the right pickups |
| **Awakened (recipe) weapons** | 12 | Hidden recipes à la Survivor.io |
| **Enemy archetypes** | 12 | + biome reskins per realm |
| **Gear slots** | 6 | Weapon, Helm, Armor, Ring, Locket, Bracelet (plus Spirit/Pet slot) |
| **Gear sets** | 8 | 4-piece bonuses |
| **Pets / spirits** | 12 | Mix of free and gacha |
| **Runes / sigils** | 24 | 4 categories × 6 examples |
| **Modes** | 4 | Campaign, Tower (endless), Survival (timed), Daily Dungeon |
| **PvP** | Yes | Async leaderboard PvP (replay-based) |
| **Guilds** | Yes | Chat + donations + weekly guild boss |
| **Languages** | 2 day 1; 6 by week 4 | en-US/en-GB day 1; ja, ko, zh-Hans, pt-BR, de, fr within 4 weeks |
| **Music tracks** | 5 | Menu, 2× arena, boss, victory stinger |
| **SFX** | 50 | Per `research/games/art-audio-direction.md` |
| **Voice** | 1 narrator | Single female voice; ~30 lines (biome stingers, victory tagline, tutorial cues) |

## Soft-launch scope (vs global)

Per `research/tech/app-store-launch-aso.md`.

| Asset | Soft-launch | Notes |
|---|---|---|
| Heroes | 4 | Dawnbow, Wardlight, Embercaller, Frostshard |
| Chapters | 3 | The Vale, Sunken Cathedral, Frostspire |
| Abilities | 60 | Half the pool |
| Modes | Campaign + Tower | Survival and Daily Dungeon delayed to global |
| Pets | 4 | |
| PvP | No | Added before global launch |
| Guilds | Yes | Required for D30 retention testing |
| Battle pass | Yes | Required for monetization testing |
| Monthly card + Daily Deal | Yes | |
| Gacha | Yes | Single banner |
| Languages | en-US only | Localized for global |

## Phases & milestones (high level)

| Phase | Duration | Output |
|---|---|---|
| **0 — Research & Planning** | 2–3 weeks | Wave 1 + 2 research, full GDD, locked tech stack. **(In progress.)** |
| **1 — Design** | 4–6 weeks | Content catalogs (heroes, abilities, enemies, bosses, levels, gear), balance spreadsheets, UI wireframes, audio brief. |
| **2 — Vertical Slice** | 8–10 weeks | One hero, one chapter, one boss, the in-run loop, ability pick, energy, save/load via Firebase. Plays end-to-end on iPhone at 60 fps. |
| **3 — Production: Combat** | 8 weeks | All 8 heroes, all 120 abilities, all 12 enemy archetypes, all 7 chapter bosses, all 4 modes (campaign/tower/survival/daily). |
| **4 — Production: Meta** | 6 weeks | Gear, runes, pets, talent grid, currencies, mailbox, daily/weekly quests, battle pass framework. |
| **5 — Production: Monetization & LiveOps** | 4 weeks | RevenueCat, AppLovin MAX, full SKU catalog, gacha, remote config, A/B framework, push, event scheduler. |
| **6 — Production: Social** | 4 weeks | Guilds, async PvP, leaderboards. |
| **7 — Polish & QA** | 4 weeks | Tutorial polish, animation pass, audio pass, edge cases, localization wave 1, anti-cheat hardening. |
| **8 — Soft Launch** | 10–14 weeks | Philippines → CA/AU → BR/Nordics. KPI tuning loops. |
| **9 — Global Launch** | 1 week | App Store global release + UA push + PR. |
| **10 — LiveOps** | Forever | Cadence per `design/01-core-loop-spec.md` §8. |

Total to global launch from start of Phase 1: **~12 months** assuming a small team (1 game design lead, 2 client engineers, 1 backend/LiveOps engineer, 1 outsourced art lead managing 2–3 freelancers, 1 part-time audio). Solo-dev with outsourcing extends to 18–24 months.

## KPI gates (soft → global)

Per `research/tech/app-store-launch-aso.md`.

| KPI | Target to scale UA | Target to global launch |
|---|---|---|
| D1 retention | ≥ 40% | ≥ 40% |
| D7 retention | ≥ 18% | ≥ 20% |
| D30 retention | ≥ 8% | ≥ 10% |
| D7 ROAS | ≥ 15% | Trending toward 30% |
| D90 payback | ≤ 180 days | ≤ 150 days |
| Tutorial completion | ≥ 90% in ≤ 30s | ≥ 92% |
| Crash-free sessions | ≥ 99.5% | ≥ 99.7% |
| ARPDAU | $0.15 | $0.20+ |
