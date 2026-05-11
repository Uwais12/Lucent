# Art Style & Audio Direction Research

**Project:** Lucent (Archero-inspired iOS roguelike)
**Document type:** Research & recommendation
**Date:** 2026-05-11

This document analyzes the art and audio direction of leading Archero-style mobile games, distills the principles that drive App Store conversion and retention, evaluates production pipeline options for a small team, and ends with a concrete recommendation for Lucent.

---

## 1. Art Style Analysis of Reference Titles

### Archero (Habby, 2019)

Archero established the visual vocabulary that the entire "arena roguelike" sub-genre still copies. Its art is best described as **chunky low-poly 2.5D**: 3D characters and props on a flat playfield, rendered at a slightly tilted top-down angle that flatters silhouettes.

Defining traits:

- **Bold, simplified silhouettes.** The hero reads as a single shape even at 60×60px (icon size).
- **Saturated, almost Saturday-morning palette.** Skies and floors are flat color blocks; enemies pop in red, purple, and green.
- **Minimal texture detail.** Models lean on vertex color and gradient lighting rather than texture maps — this keeps memory low and rendering fast on five-year-old iPhones.
- **Stylized, exaggerated animation.** A 6–8 frame "shoot" loop with overshoot and squash so attacks read at a glance.
- **Vignette + soft drop shadow under every entity** to separate the character from the floor.

This style is also commercially load-bearing: it photographs well as a thumbnail icon and as the first frame of a preview video.

### Archero 2 (Habby, 2024)

Archero 2 is iterative, not revolutionary. The team kept the silhouette language and pushed everything one notch in polish.

What changed:

- **Crisper, higher-density VFX.** Particle counts roughly doubled; trails on projectiles last longer; level-up rings have additive bloom.
- **Wider color palette per biome.** Enchanted forest, burning desert, mysterious dungeon — each has its own dominant hue, but enemies remain color-coded across all biomes.
- **Cleaner UI.** Iconography is more rounded, abilities have unique frame colors, rarity tiers are clearer.
- **Smoother animations** with more in-between frames; better blending between idle/run/attack.
- **Better mid-range device support** (1.1.0 patch notes call this out specifically).

Net: the same brand, but more "premium" to a 2026 audience.

### Survivor.io (Habby, 2022)

Habby's sister title leans into a **pixel-pop hybrid**: characters are 2.5D pseudo-3D sprites rendered with a faux-pixel/cel-shaded treatment, but UI and effects are vector-clean. The result is more readable than Archero in chaotic moments — important because Survivor.io throws hundreds of enemies on screen simultaneously.

Key readability tricks:

- High-contrast enemy outlines (dark rim around every monster).
- Hero is always lit brighter than the environment.
- Damage numbers use a fixed color ramp (white → yellow → orange → red crit).
- Pickups have additive glow halos so they're visible in clutter.

### Mighty DOOM (Bethesda/Alpha Dog, 2023–2024)

Mighty DOOM took the opposite IP-prestige route: it adopted a **chibi 3D** aesthetic that traded DOOM's grit for a toy-shelf look. The signature "tiny DOOM Slayer" silhouette — oversized head, oversized weapon, stubby body — was deliberately collectible-figure shaped.

Lessons:

- A single hero silhouette that's recognizable in marketing is worth more than ten beautiful environment props.
- "Adorably violent" can carry a brand into a mobile-friendly demo while keeping the parent IP intact.
- The art direction got near-universal praise even though the game shut down in 2024 — proof that art alone doesn't save monetization, but it absolutely drives install conversion.

### Wittle Defender (Habby, 2024)

Wittle Defender is Habby's tower-defense roguelite. Visually it sits between Archero and the chibi end of the spectrum: **2D chibi-style heroes against semi-3D dungeons**, vertical interface, dark-fantasy color palette (Gloomy Dungeon, Stormcaller Tower). It demonstrates Habby's house style — vibrant, snappy, easy to read at a glance — applied to a darker mood.

### Stick figure / minimalist games

Stick-figure games (Stick War, Stick Fight, the Mr Bullet franchise) prove a low end: animation-friendly skeletal characters, two-color backgrounds, exaggerated hit reactions. The art budget approaches zero, but the genre ceiling is also lower — these games rarely break top-grossing charts. They are, however, a viable prototype style.

---

## 2. What Works for Mobile Portrait

Mobile portrait has unique constraints that force specific art decisions:

- **Thumb occlusion.** The bottom 25–30% of the screen is partially hidden by the player's hands. Critical action must happen in the upper 2/3.
- **Silhouette readability.** Characters must read at ~40px high. Use bold outlines, distinct head/body proportions, and avoid thin limbs that disappear at low resolution.
- **Color-coded enemy taxonomy.**
  - Grey/brown — common mooks
  - Green — ranged
  - Purple — mini-boss / elite
  - Red — boss
  - Gold — rare drop / treasure
  This convention is so consistent across Archero, Survivor.io, and Vampire Survivors that players learn it instinctively.
- **Telegraphed AoE.** Red ground decals that fade in over 0.5–1.0s before damage triggers. Used by Archero, Survivor.io, TERA, Lost Ark — universally understood.
- **Distinct hero outline.** Almost every successful mobile action game gives the hero a rim light, glow, or thicker outline. The eye must lock to the hero in 100ms.
- **Reserve red.** Red should *only* be used for danger (enemy attacks, low HP, AoE zones). Don't waste it on UI accents.

---

## 3. Three Candidate Directions for Lucent

### Option A — Chunky 2.5D Low-Poly (Archero-likeness)

**Pros**
- Proven category winner; players already know the visual contract.
- Asset libraries (Synty POLYGON, POLYGON MINI) provide a head-start; one artist can ship a vertical slice in 6–8 weeks.
- Animations port cleanly between characters via shared rigs.
- Photographs well for App Store icon and preview video.

**Cons**
- Visual differentiation is hard — "another Archero clone" is a real risk in store reviews and creator coverage.
- Requires a 3D-capable artist or studio; even with Synty packs, custom heroes/bosses need a modeler/rigger.
- Bigger build size than 2D (texture atlases, meshes, skinned animation).

### Option B — Cute 2D Hand-Drawn / Vector

**Pros**
- Strong differentiation against the 3D crowd.
- One skilled 2D illustrator can carry the entire art direction.
- Smaller build size; faster iteration.
- Spine 2D enables modular skinned animation with tiny file sizes.

**Cons**
- Per-character cost is high because every new enemy needs unique art, not just a recolor on a shared mesh.
- Harder to scale to large enemy counts without atlas pressure.
- Less common in top-grossing — harder benchmark for what "good" looks like in this genre.

### Option C — Pixel-Art

**Pros**
- Lowest art budget per asset; many recent hits (Vampire Survivors, Brotato, Soulstone Survivors, Survivor.io's pixel layer).
- Aseprite ecosystem is mature; single artist pipeline is well-understood.
- Loads fast, scales to thousands of entities.
- Strong nostalgic / "indie" brand signal.

**Cons**
- Pixel-art is now crowded; differentiation comes from palette and animation polish, not concept.
- iOS premium audience can read pixel-art as "cheap" if poorly executed.
- Crisp UI inside pixel-art games is its own art problem (mixing pixel and vector elements).

### Option D — Chibi 3D

**Pros**
- High App Store conversion; the silhouette sells itself.
- Reusable: one good base mesh can carry many costumes/skins (a monetization win).
- Mighty DOOM and Wittle Defender prove the look is current.

**Cons**
- Requires the most senior art talent of the four; chibi proportions are deceptively hard to get right.
- Custom character work, not stock. Synty MINI is a starting point only.
- Longest production timeline of the four options.

---

## 4. Art Production Pipeline

### Tools

| Tool | Use | Cost | Notes |
|---|---|---|---|
| **Aseprite** | Pixel art + sprite sheets | $20 one-time | Industry default; CLI for build pipeline. |
| **Spine 2D** | Skeletal 2D animation | $69–$2,200 | Editor tier matters; Unity runtime is free. |
| **Blender** | Low-poly modeling, rigging, animation | Free | Capable of full pipeline; export to glTF/FBX. |
| **Procreate** | Concept art, marketing illustrations | $13 iPad | Faster than Photoshop for ideation. |
| **Figma** | UI/UX, store assets, screenshots | Free–$15/seat | Single source of truth for UI specs. |
| **Photoshop / Affinity Photo** | Texture work, marketing comp | $20/mo or $70 one-time | Affinity is the cheaper indie pick. |

### Outsourcing options

- **Fiverr** — fast and cheap for single assets ($30–$300 per character icon). Quality is bimodal; vet portfolios carefully.
- **Upwork** — better for ongoing relationships; freelance game artists typically $25–$80/hr.
- **ArtStation** — premium freelance pool; expect $60–$150/hr but quality is consistently high.
- **Specialized studios** (RetroStyle Games, VSQUAD, Thunder Cloud, Room 8) — best for large batches or whole biomes; minimums usually $5k–$20k per scope.
- **PaintPool Studio, Demute, and similar** — for combined art+audio outsourcing.

Indicative budgets for an Archero-like vertical slice:
- 1 hero + 4 weapon-trail variants: $1.5–4k
- 12 enemies + 3 bosses: $4–10k
- 4 environment tile sets: $2–6k
- UI kit (icons, frames, popups): $1.5–4k
- VFX pack (hits, crits, level-up, AoE): $1.5–4k

### Asset libraries

- **Synty POLYGON / POLYGON MINI** — gold standard for 3D low-poly; MINI is mobile-optimized; ~$30–$70 per pack. Use them as gap-fillers, not for the hero.
- **Kenney.nl** — 60,000+ CC0 assets, $19.95 all-in-one bundle. Excellent for prototyping. Often used as placeholder, sometimes for shipped UI/SFX.
- **itch.io** — wide range of paid/free pixel and 2D packs; quality varies; check license terms.
- **GameDev Market** — curated 2D/3D packs; useful for UI kits.
- **Unity Asset Store** — VFX and shader packs that pair with any art style.

---

## 5. VFX & Feel

"Juice" is the single highest-ROI investment after core gameplay. It's the difference between an Archero clone that feels good and one that gets uninstalled in 20 minutes.

Core juice techniques to ship at launch:

- **Hit-stop / hit-pause.** Freeze the game for 3–5 frames on every hit. This is the single most impactful trick.
- **Hit flash.** White overlay on the enemy sprite for 1 frame, then back to normal. Costs nothing.
- **Knockback.** Push enemies 0.1–0.3 units away from the hit direction over 0.1s with easing.
- **Screen shake.** 0.1–0.3 second random offset, eased out. *Critically* — reserve large shake for crits and boss hits, not every shot. Too much shake creates the "juice problem" where everything stops feeling impactful.
- **Particle hits.** 3–8 small sparks on every hit. Burst additive particles for crits.
- **Damage numbers.** Floating numbers with a small upward pop and fade. Color ramp white → yellow → orange → red as damage scales. Crits get a bigger font and a small overshoot.
- **Pickup popups.** "+5 Gold" with a small bounce; consider stacking when multiple drop in quick succession.
- **Level-up.** Full-screen ring of additive light, audio fanfare, brief 0.5s time-slow.
- **Kill juice.** Enemy death = particle burst + small camera shake + slow-mo flash on bosses.
- **HP bar animation.** Damage chunk fills in red for 0.3s before shrinking, instead of snap. (Survivor.io does this well.)

Production note: build a single `Feel` / `Juice` module (similar to Unity's MoreMountains Feel) so designers can toggle effects per weapon and per enemy without touching code.

---

## 6. Audio Design

### SFX inventory (launch minimum: ~50 unique cues)

- **Combat:** shoot (per weapon family, 4–6), hit (soft/medium/heavy), crit, kill, enemy attack telegraph, AoE detonate, projectile whiz-by.
- **Player feedback:** level-up fanfare, ability ready, ability cast, dodge/roll, low HP warning, death.
- **Pickups:** gold (3 pitch variants to avoid fatigue), gem, heart, key, chest open.
- **UI:** button tap, panel open, panel close, purchase success, error, toggle, slider, reward reveal.
- **Boss:** roar (intro), telegraph charge, telegraph slam, phase transition, death.
- **Ambient / world:** door open, room enter, environment loop per biome.

### Music (launch minimum: 5–7 tracks)

- 1 menu / hub track (low-energy loop, 60–90s).
- 2–3 arena tracks (medium energy, 90–120s loops, varied per biome).
- 1 boss track (high energy, 60–90s loop with intro stinger).
- 1 victory stinger (~5s).
- 1 game-over stinger (~3s).

### Tools and middleware

For Lucent's scale, **FMOD Studio** is the right pick over Wwise:
- Free under $200k revenue, then ~$2k indie license.
- Drag-and-drop event design fits a small team.
- Excellent Unity integration.
- Easy to expose RTPCs (real-time parameters) for adaptive music — e.g., add a "combat intensity" parameter that swaps music layers.

Native Unity audio is technically sufficient but loses adaptive music, snapshot mixing, and per-event randomization, all of which are high-value for a roguelike where the same SFX plays thousands of times.

Wwise is overkill for our scale — keep it as an upgrade path if we ever scale to a 10+ person team.

### Sound libraries

- **Sonniss GameAudioGDC** — 200+GB of free, royalty-free, lifetime-licensed SFX. The single best starting point.
- **freesound.org** — community library, check per-file license. Useful for filling gaps.
- **Splice** — subscription model ($10–$20/mo), strong music loops and synth one-shots.
- **Epidemic Sound** — subscription, great music selection, but check game-licensing terms specifically.
- **Soundly** — searchable SFX library aggregator; productivity tool.
- **Kenney audio** — small but CC0 and consistent.

### Composer outsourcing

- **SoundBetter** — best curated game-audio composer marketplace. Expect $200–$800 per minute of music for indie tier.
- **Fiverr** — $80–$300 per track at the entry tier; quality varies, useful for prototyping.
- **Direct via ArtStation / Twitter** — best for finding a single composer who can do all 5–7 launch tracks for a flat $3–6k.
- **PaintPool, Aleix Ramon, Flavio Traversa** and similar boutique game-audio studios — full-service from $5k upward.

---

## 7. App Store Conversion

Art and audio are not just engineering — they're the top of the marketing funnel.

### Icon

- Must be readable at 60×60px.
- **Single character focus** — one hero face, looking forward, high contrast against background.
- **Rounded, organic forms** convert better than angular.
- High-contrast color: deep blue or purple background with a bright character; purple is currently the breakout color in gaming icons.
- Test 3–5 icon variants via Product Page Optimization. Even small icon changes routinely produce 10–25% conversion lift.

### Screenshots

- The **first three screenshots** carry the entire conversion — users rarely scroll past.
- Always include actual gameplay; concept art alone underperforms.
- Add overlay text (caption) on each screenshot calling out a single feature ("400+ Weapons", "Co-op Bosses", "Endless Loot"). Keep text large and readable in the App Store thumbnail size.
- Localize screenshots for at least EN, JP, KR, DE, FR, ES, PT-BR, ZH-Hans.
- Vertical-orientation games should use 6.7" iPhone screenshots as the master.

### Preview video

- **30-second cap.** Treat the **first 3 seconds** as the entire pitch — most users decide there.
- Open on the most visually loud moment: a boss fight, a big crit chain, a level-up explosion.
- No logo intros. Lead with gameplay.
- Adding a preview video typically lifts conversion 20–40% over screenshots alone.

### Audio's role in conversion

App Store previews now autoplay with sound off by default, but the first frame still needs to look impactful. The audio matters at install: a satisfying first 30 seconds of SFX drives D1 retention, which Apple's algorithm reads as quality signal.

---

## 8. Recommendation

### Primary art direction: **Option A — chunky 2.5D low-poly, with a deliberate "Lucent" twist**

Reasoning:
- The category players already understand this visual contract. We don't have to teach them anything.
- It's the only direction with mature stock-asset support (Synty POLYGON MINI) that lets a small team produce a vertical slice in 6–8 weeks while custom hero work happens in parallel.
- It photographs best for icon and preview video — the assets that drive 25%+ of paid conversion.
- The "twist" — Lucent's brand differentiator — should live in **lighting and palette**, not topology. Specifically: a slightly cooler, more crystalline palette (icy whites, prismatic glows, deep indigos) versus Archero's warm fantasy-fair palette. This gives us icon differentiation in the App Store grid without breaking the genre contract.

**Fallback / Plan B:** If we cannot secure a confident 3D artist within 4 weeks of pre-production, pivot to Option B (2D hand-drawn vector via Spine). Avoid Option C (pixel) unless we discover a strong pixel artist already on the team — the category lift from pixel is real but unpredictable. Avoid Option D (chibi 3D) at this team size; the talent bar is too high for our timeline.

### Tool & outsourcing pipeline

**In-house:**
- Blender for hero/boss modeling, rigging, animation
- Aseprite + Figma for UI iconography and store screenshots
- Procreate for concept art and marketing illustration
- Unity URP with mobile-optimized post-processing
- FMOD Studio for all audio

**Outsourced:**
- **Hero + 3 boss models + rigs** → senior ArtStation freelancer or boutique studio (~$6–10k).
- **Common enemy set (12 enemies)** → mid-tier Upwork artist working from a strict style guide (~$3–5k).
- **Environment biome props (4 biomes)** → Synty POLYGON MINI base + freelancer adding biome-specific signature props (~$2–3k incremental).
- **VFX pack** → specialist VFX artist on ArtStation; reusable across the project (~$2–4k).
- **UI kit** → dedicated mobile-game UI freelancer (~$2–3k).
- **Composer** → single SoundBetter composer for all 5–7 tracks (~$3–5k).
- **SFX** → Sonniss GameAudioGDC base + 1–2 weeks of a sound designer customizing signature cues (shoot, hit, crit, level-up, boss roar) (~$1.5–3k).

Total art+audio budget for a polished soft-launch: **~$22–37k**, plus in-house time.

### Audio cadence

- **Launch (soft-launch):** 50 SFX, 5 music tracks (1 menu, 2 arena, 1 boss, 1 victory stinger).
- **Worldwide launch:** 80 SFX, 7 music tracks (add 1 alternate arena, 1 alternate boss).
- **Live ops cadence:** +1 music track and 5–10 new SFX per major content update (every 6–8 weeks), composed by the same anchor composer to keep tonal consistency.

### Conversion creative

- Ship 3 icon variants on day one and run iOS Product Page Optimization from week 2.
- Preview video must open with a boss-fight crit chain; no logo intro.
- First three screenshots: (1) boss in mid-fight with damage numbers flying, (2) loot/upgrade screen showing depth, (3) hero in a "hero shot" pose with weapon glow.

---

## Sources

- [Archero 2 — App Store](https://apps.apple.com/us/app/archero-2/id6502820653)
- [Archero 2 review — Gaming on Phone](https://gamingonphone.com/action/archero-2-game-review/)
- [Archero 2 review — Game400](https://game400.com/reviews/archero-2-a-worthy-sequel-or-just-an-upgrade)
- [Mighty Doom — Wikipedia](https://en.wikipedia.org/wiki/Mighty_Doom)
- [Mighty DOOM retrospective — Rega Gamer](https://regagamer.com/mighty-doom-app/)
- [Wittle Defender — Pocket Gamer](https://www.pocketgamer.com/wittle-defender/)
- [Wittle Defender — App Store](https://apps.apple.com/us/app/wittle-defender/id6502815032)
- [Low Poly Game Art Guide — RetroStyle Games](https://retrostylegames.com/blog/low-poly-game-art-an-ultimate-guide/)
- [Synty Studios — POLYGON MINI mobile assets](https://syntystore.com/collections/polygon-mini-mobile-ready-low-poly-game-assets)
- [Kenney.nl assets](https://kenney.nl/assets)
- [Aseprite](https://www.aseprite.org/)
- [Spine 2D — Esoteric Software](http://esotericsoftware.com/)
- [Spine for mobile pipelines — Delta Animations](https://www.deltaanimations.com/blog/2d-skeletal-animation-games/)
- [Sonniss GameAudioGDC archive](https://sonniss.com/gameaudiogdc/)
- [FMOD](https://www.fmod.com/)
- [Wwise vs FMOD — Game Audio Co.](https://www.thegameaudioco.com/wwise-or-fmod-a-guide-to-choosing-the-right-audio-tool-for-every-game-developer)
- [Juice in game design — Blood Moon Interactive](https://www.bloodmooninteractive.com/articles/juice.html)
- [Making a game feel juicy — itch.io blog](https://itch.io/blog/1059831/making-a-game-feel-juicy-with-simple-effects)
- [Feel documentation — MoreMountains](https://feel-docs.moremountains.com/screen-shakes.html)
- [Mobile app icon design 2026 — DesignRush](https://www.designrush.com/best-designs/apps/trends/mobile-app-icon-design)
- [App icon best practices 2026 — Apptweak](https://www.apptweak.com/en/aso-blog/how-to-design-an-app-icon)
- [App Store screenshots that convert — App Screenshot Studio](https://medium.com/@AppScreenshotStudio/app-store-screenshots-that-convert-the-2026-design-guide-4438994689d6)
- [App Store preview videos — SplitMetrics](https://splitmetrics.com/blog/create-app-preview-video-app-store-ios/)
- [Game art outsourcing guide — ArtStation / RetroStyle](https://www.artstation.com/blogs/retrostylegames/AgjaW/full-guide-to-game-art-outsourcing-services-for-mobile-pc-and-console)
- [2D game art outsourcing 2026 — Juegostudio](https://www.juegostudio.com/blog/2d-game-art-outsourcing-guide)
- [Enemy attacks and telegraphing — Game Developer](https://www.gamedeveloper.com/design/enemy-attacks-and-telegraphing)
