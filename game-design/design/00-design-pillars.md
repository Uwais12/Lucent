# Design Pillars — Lucent

Synthesized from wave-1 research. Every gameplay decision in the rest of the GDD should ladder up to one of these pillars.

---

## Pillar 1 — One thumb, full skill ceiling

The player only moves. The character auto-fires while stationary (Archero "stop-to-shoot"). Single virtual joystick. No tap-to-shoot, no aiming reticle. The depth comes from **positional decisions made under pressure** — "dodge or damage?" — replayed dozens of times per minute. This is the single highest-converting control scheme on iPhone in this genre and the lowest-friction tutorial in the medium.

**Implication**: We will not add a second stick, a fire button, or aim assist. Auto-aim picks the nearest valid target. Heroes can introduce mechanical variation via passive effects or *one tap-to-trigger active* (e.g., dash, ultimate) but never a per-shot input.

## Pillar 2 — Build-defining synergies, screenshot-worthy moments

Damage in our game **multiplies**, never adds. The "I built a build" moment is the dopamine engine of the genre — a Multishot × Ricochet × Bouncy Wall × Front Arrow combo that fills the screen with bullets is the screenshot players post on TikTok.

**Implication**: The in-run ability set is designed as orthogonal modifier families (projectiles, on-hit effects, bounces, pierces, orbitals, defensives) that stack multiplicatively. We commit to 6–8 named build archetypes at launch and ensure each is reachable in at least 1-in-5 runs given normal ability picks. Archero 1's *Holy Touch + Diagonal Arrow* (named-pair) and Archero 2's *Combo / Sprite / Multishot / Blast* synergy families are our reference.

## Pillar 3 — Mythic ceilings, friendly floors

A new player should be enjoying their first run inside 30 seconds. A player six months in should still have a clear next goal three levels away. F2P players should reach soft caps and keep climbing — never finish the game, never feel the wall is paywalled.

**Implication**: We use a **flat-grid talent screen with long upgrade ladders per node** (per progression-systems research) so the ceiling can be raised via patch. Gear has compound rarity sub-ladders (Epic +1 → Epic +20 → Legendary +1, etc.). Power-budget split: gear 40%, talents 20%, sets 12%, hero level 12%, runes 10%, pets 6% — no single source dominant.

## Pillar 4 — A new event tab item every login

Retention beyond D30 is owned by LiveOps, not the core loop. At any moment the player should face **4+ concurrent surfaces** they care about: daily quests, weekly missions, current battle pass season, plus 1–2 special events (banner, tower, tournament, collab).

**Implication**: We are not shipping without a battle pass at launch (45-day season). The daily layer (login calendar, 6 daily quests, 5 ad-gated rewards, $0.99/$2.99 Daily Deal) is a P0 launch requirement, not a post-launch feature. A LiveOps calendar template ships before global launch.

## Pillar 5 — Fair-to-F2P, generous-to-payers

Mighty DOOM died because the economy walled progression at chapter 5–6 for non-payers; AAA IP could not save it. Archero 2's hero gating at $30 cash-only and its artifact gacha are the #1 player complaints. We learn from both.

**Implication**:
- **No cash-only heroes.** Every hero is also obtainable via shards from a slow free path.
- **No more than 6 currencies** at launch. Archero 2's 14-currency UI is a cautionary tale.
- **All gacha rates published** in-app, regardless of jurisdiction (Apple compliance + future-proofing for EU regulation).
- **Energy soft-cap, generous regen.** 30 cap, 1/12 min, 6/run (slightly looser than Archero's 20 cap / 5 per run).
- **Monthly card $9.99** as the evergreen anchor; battle pass $4.99 basic / $14.99 premium.
- **First-purchase doubler on every hard-currency SKU**, not just the cheapest.

## Pillar 6 — Social as the D30+ extender

Per LiveOps research, async PvP + guilds drive D30 retention more than any other surface. Archero 2's guild-quota Monster Invasion is the strongest single retention hook in the genre. We ship with both at launch — not as a post-launch addition.

**Implication**: Guild + async PvP arena are launch-scope features. Co-op (PvE 2-player) is a 6-month post-launch headline addition.

## Pillar 7 — Differentiate on **build discovery + multi-mode**

Steal two genre-strongest borrows that competitors haven't fully copied:
- **Hidden weapon-evolution recipes** (Survivor.io's hidden-information puzzle). Picking the right pair of abilities at the right tier transforms one of them into a named "Awakened" version. Drives multi-week community discovery.
- **Multi-mode content from one combat core** (Archero 2's room / defense / survival from the same core). Campaign (rooms) + Tower (endless) + Survival (timed arena) at launch. Same combat, three retention surfaces, low marginal content cost.

## Pillar 8 — Mobile-portrait readability is sacred

Boss telegraphs, AoE rings, projectile silhouettes must all read at thumb-occluded portrait scale. Color discipline (red = damage, yellow = warning, blue = friendly), shape primitives (circles, cones, lines), 0.6–1.2s wind-ups, audio cues backing every visual telegraph.

**Implication**: Art direction is **chunky 2.5D low-poly** (Synty POLYGON MINI baseline, signature prismatic-indigo Lucent palette) with strict silhouette + telegraph rules. Hit-stop, hit-flash, knockback, screen-shake-on-crit are first-class engineering deliverables (the "Feel" module).
