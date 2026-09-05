# Lucent — Mobile Game Project (Working Title)

iOS-only mobile action RPG / roguelite shooter inspired by **Archero**, **Archero 2**, and **Whittle Defender**.

**Working title**: **Lucent: Shards of the Shattered Sun**
**Phase**: **0 — Research & Planning: COMPLETE (36 docs / ~158k words)**
**Next**: Phase 1 — Vertical Slice prototype

---

## Read this first

👉 **[`planning/03-master-gdd.md`](planning/03-master-gdd.md)** — the master Game Design Document. Executive-summarizes everything and links to every other doc. If you read one file, read this.

Supporting entry-points:
- **[`planning/00-master-plan.md`](planning/00-master-plan.md)** — phase roadmap + pre-build checklist (all items now signed off).
- **[`planning/01-decisions.md`](planning/01-decisions.md)** — 20 locked decisions with rationale.
- **[`planning/02-open-questions.md`](planning/02-open-questions.md)** — historical; all questions have now been resolved.

## Goals

- **Genre**: One-thumb, arena-style, auto-fire roguelite (stop-to-shoot, single joystick, auto-aim).
- **Platform**: iPhone (iOS) only. Portrait orientation.
- **Session length**: 15–30 minutes per sitting, multiple sittings/day.
- **Retention**: Designed for years of progression — even F2P players never "finish."
- **Business model**: F2P + IAPs + rewarded ads. No hard paywalls. No cash-only heroes. Rates published.

## Repository structure

```
game-design/
├── README.md                    ← you are here
├── planning/
│   ├── 00-master-plan.md        ← phase roadmap + pre-build checklist
│   ├── 01-decisions.md          ← 20 locked decisions
│   ├── 02-open-questions.md     ← historical (all resolved)
│   └── 03-master-gdd.md         ← ⭐ Master GDD — start here
├── design/                      ← core design pillars & specs
│   ├── 00-design-pillars.md
│   ├── 01-core-loop-spec.md
│   ├── 02-tech-stack-decision.md
│   ├── 03-world-and-theme.md
│   ├── 04-progression-and-economy.md
│   └── 05-launch-scope.md
├── content/                     ← named entities, stat tables, briefs
│   ├── heroes.md                ← 8 launch heroes
│   ├── abilities.md             ← 120 in-run abilities
│   ├── enemies.md               ← 12 archetypes
│   ├── bosses.md                ← 7 chapter + 3 mini
│   ├── levels.md                ← 7 chapters × 20 rooms
│   ├── equipment.md             ← 6 slots × 5 bases × 8 sets
│   ├── pets.md                  ← 12 Spirits
│   ├── runes.md                 ← 24 Sigils
│   ├── balance-curves.md        ← every stat formula
│   ├── liveops-calendar.md      ← 90-day rolling template
│   ├── ux-wireframes.md         ← 16 screens
│   ├── ftue-script.md           ← 30s tutorial + D1–D7 unlock cadence
│   ├── audio-brief.md           ← 5 tracks, 50 SFX, 30 voice lines
│   ├── tech-architecture.md     ← Firestore + Cloud Functions spec
│   ├── production-roadmap.md    ← milestones, team, risks
│   └── marketing-aso-brief.md   ← ASO + UA + PR
└── research/                    ← competitive & tech research
    ├── games/                   ← Archero 1/2, Whittle Defender, genre, art/audio, etc.
    ├── monetization/            ← F2P patterns, LiveOps retention
    └── tech/                    ← engines, backend, monetization SDKs, App Store
```

## Status

Phase 0 (Research & Planning) is complete. Every pre-build checklist item is decided and documented. The next step is executing Phase 1 (Vertical Slice prototype) per [`content/production-roadmap.md`](content/production-roadmap.md).
