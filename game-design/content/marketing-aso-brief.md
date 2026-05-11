# Marketing, App Store & ASO Creative Brief — Lucent: Shards of the Shattered Sun

> **Production-ready brief** for the launch creative team. Covers App Store listing copy, app icon, screenshots, app preview video, paid UA creative concepts, influencer and PR strategy, localization, and the launch creative test plan.
>
> Source of truth: `design/03-world-and-theme.md` (theme & palette), `design/05-launch-scope.md` (content scope & soft-launch gates), `research/tech/app-store-launch-aso.md` (ASO framework), `research/games/art-audio-direction.md` (visual direction).
>
> **Tone reminder.** Heroic, mythic, hopeful. Dry warmth. No memes, no swearing, no irony-poisoned writing. The Dim is always a "calm, beautiful catastrophe" — even our sad cuts end on a sunrise.

---

## 1. App Store Listing

### 1.1 Title and subtitle (locked)

- **Brand / display name:** `Lucent`
- **App Store title (30 chars max):** `Lucent: Archer Roguelike` — 24 chars
- **App Store subtitle (30 chars max):** `Bow Hero Action Dungeons` — 24 chars

Rationale: brand-first per `app-store-launch-aso.md` §2.1. Title carries the highest-weight keyword (`archer roguelike`). Subtitle picks up the second cluster (`bow`, `hero`, `action`, `dungeons`) with **zero word overlap** so each keyword counts. The promo line `Shards of the Shattered Sun` lives in marketing creative (icon ribbons, video end cards, paid creative VO) but is dropped from the ASO title to preserve keyword density.

Final marketing wordmark: `LUCENT — Shards of the Shattered Sun` (used on key art, video end cards, PR header).

### 1.2 Keywords field — 100 character stacked list

Comma-separated, no spaces, no plurals, no title/subtitle word repeats, no competitor trademarks (per Apple §3.1 — competitor names trigger rejection):

```
arrow,rogue,dungeon,arena,boss,rpg,loot,survivor,shoot,build,craft,gacha,raid,quest,mage,knight
```

Count: 99 characters. Mix rationale:
- **Genre intent:** `rogue`, `arena`, `survivor`, `rpg` — captures the obvious player searches.
- **Verb intent:** `shoot`, `build`, `craft`, `raid`, `quest` — long-tail combinations with title words (e.g., "archer build", "bow craft", "roguelike raid").
- **Object intent:** `arrow`, `dungeon`, `boss`, `loot` — Archero-genre core nouns we can't put in title/subtitle without breaking length.
- **Class intent:** `mage`, `knight` — heroes outside the bow archetype, picks up cross-class searchers.
- **Monetization intent:** `gacha` — strong intent term in JP/KR locales; deliberately included even at 99/100 chars.

We localize this field per storefront. Notable swaps:
- **ja-JP:** `アーチャー,弓,ローグ,ダンジョン,ボス,RPG,ヒーロー,アリーナ,ガチャ,放置,周回,進化,装備,職業`
- **ko-KR:** `로그라이크,궁수,활,던전,보스,RPG,영웅,아레나,가챠,장비,스킬,길드,레이드`
- **zh-Hans:** `射手,弓箭,肉鸽,地牢,BOSS,RPG,英雄,竞技,抽卡,装备,公会,挂机,合成,门派`
- **pt-BR:** `arqueiro,arco,roguelike,masmorra,chefe,herói,arena,heróis,construir,gacha,guilda,RPG`
- **de-DE:** `Bogenschütze,Pfeil,Rogue,Verlies,Boss,Held,Arena,Gilde,Beute,RPG,Aufbau`
- **fr-FR:** `archer,arc,roguelike,donjon,boss,héros,arène,guilde,butin,RPG,fléche`

### 1.3 Long description (4,000 char limit) — full draft

The first ~170 chars must work as the standalone "above the fold" hook (per `app-store-launch-aso.md` §2.2). Description is not indexed but is read by Apple editorial and surfaced by App Store AI summaries — so we lead with the hook, bullet the features, then social proof, then CTA.

Drafted text (3,612 chars):

> **The suns shattered. The Dim took everything they touched. You are the last bright thing.**
>
> Lucent is a one-thumb roguelike action RPG: walk into the dark, draw a shard of crystallized light, and fight room by room to bring color back to seven fallen realms.
>
> Auto-shoot. Move with your thumb. Stop walking and your hero looses an arrow. Pick three abilities every room, and watch your build unfold — the same hero never plays the same way twice.
>
> **WHAT YOU'LL DO**
>
> - **8 Lucent-bearers, 8 fantasies.** Pull the Dawnbow's bowstring back to the horizon. Wreath your shots in lightning as the Spinekind. Freeze a chapter boss in place as the Frostshard. Each hero has a signature ability and a build identity — no clones.
> - **120 in-run abilities.** Build a multishot wall, a fire-DoT inferno, a ricochet machine, a freeze-and-detonate combo. Find a hidden recipe and forge an **Awakened weapon** that rewrites the rules of the run.
> - **Seven shattered realms.** Wake the lanterns in the Vale of First Light. Dive the Sunken Cathedral. Climb Frostspire to where the aurora still remembers a sun. Walk into the Long Dusk, alone, and end it.
> - **Boss fights that feel like weather.** Every chapter ends with a hand-crafted Echo of what the realm lost. Phase changes. Telegraphs you can read. Crits you can chain.
> - **Tower mode.** Endless climb, your build, your call. The leaderboard remembers.
> - **Guilds and weekly Guild Bosses.** Four players, one boss, one giant HP bar, one chat room of friends pulling each other up.
> - **Async PvP.** Send your run as a replay. Steal their leaderboard slot.
> - **Daily Dungeon and Survival mode.** Bite-sized runs for the bus, the bath, the bed.
> - **Battle Pass seasons.** A new realm of cosmetics every six weeks, free and premium tracks, no daily login chains.
>
> **WHY LUCENT**
>
> - **Plays in one hand.** Thumb to move. Thumb only. No double-stick, no buttons to mash. Designed for portrait mobile from the first prototype.
> - **No story walls.** No cutscenes. Each realm tells you its story through one line of soft narration and the world itself.
> - **A look you can feel.** Chunky, painterly low-poly. Indigo light against soft-static dark. Custom heroes hand-modeled in our studio, custom music scored for each realm.
> - **Built for old phones.** 60 fps on iPhone 11. Sub-150 MB launch download. No background ads.
>
> **WHAT WE PROMISE NOT TO DO**
>
> - No energy timers that block you from playing.
> - No pay-to-win banners. Premium heroes are powerful, but every build archetype is achievable without paying.
> - No predatory pop-ups, no "you have 30 seconds left" panic UI.
> - We ship a patch every six weeks. Forever.
>
> **[SOCIAL PROOF PLACEHOLDER — fill at launch+7 with actual review pulls and chart positions; format: "★★★★★ — TouchArcade", "Top 20 Action — App Store US", "#1 New Roguelike — Sensor Tower"]**
>
> Made by a small studio that grew up on Diablo, Hades, and Archero. Reach us at hello@lucentgame.com or in the Discord linked from the main menu. We read everything.
>
> **The Dim does not wait. Walk in.**
>
> Privacy policy: lucentgame.com/privacy
> Terms of service: lucentgame.com/terms
>
> *Optional in-app purchases. Sign in with Apple supported. iCloud save included. Game Center achievements and leaderboards.*

### 1.4 Promotional text (170 chars, editable any time) — LiveOps swap cadence

Always include a single concrete event hook + a single soft "play now" line. Rotate every 14 days minimum, every LiveOps event without fail.

| Window | Promotional text (≤170 chars) |
|---|---|
| **Global launch wk 1** | `The suns shattered. You're what's left of the light. New player gift: 30 Prism Pulls + the Dawnbow's Lantern skin. Free this week.` (143) |
| **Wk 3 — First boss event** | `Echo of the Drowned King returns this weekend only. Beat him solo, take his crown skin. Bring a guild, take his weapon.` (124) |
| **Wk 6 — Battle Pass S1: Vale Reborn** | `Season 1: Vale Reborn. 50 free tiers, 3 new Awakened recipes, the Lantern Bearer hero skin. Climb the new Tower floors.` (122) |
| **Wk 9 — Frostspire content drop** | `Frostspire opens. New chapter, new chapter boss, new gear set. Frostshard hero unlocks the Aurora signature.` (109) |
| **Wk 12 — Season 2** | `Season 2: Glassroot's Promise. Forest realm live. New Awakened: Prismflight Bow. Read the patch — we listened.` (110) |
| **Halloween / Hollow Sky tie-in** | `The Hollow Sky leaks. Limited dungeon, ghost-skin event, double Lucent Shards through Nov 3.` (94) |
| **Winter — Frostspire seasonal** | `The Aurora returns to Frostspire. New seasonal boss, free hero gift, snow-quiet music. Open the game.` (101) |
| **LNY (zh/ja/ko priority)** | `Lunar New Year in Iridian. Red lantern skins, double pulls weekend, returning-player gift inside.` (97) |
| **Spring — anniversary** | `One year since the Dim met us. Free Mythic ability token. Anniversary chapter "Garden of Velios" live.` (104) |

### 1.5 "What's new" template (4,000 chars, used for every patch)

Tone: friendly, dev-voiced, scannable, ends on a "thank you." Always lead with the headline player-facing change.

```
LUCENT — [SEASON N: SEASON NAME]

The big thing this patch:
• [One-sentence headline player-facing change — the reason you'd open the app today.]

What's new:
• [New chapter / boss / mode]
• [New heroes / abilities / awakened recipes]
• [New event windows + dates]
• [Battle Pass theme + 3 standout cosmetics]

Balance:
• [Buff list — each line one sentence.]
• [Nerf list — same. Always explain why.]

Fixed:
• [Top 5 player-reported bugs we squashed.]

Quality of life:
• [3–5 small UX wins.]

Known issues we're still hunting:
• [Be honest. Players forgive bugs, not silence.]

Thank you for playing. We read every review and every Discord message. If something's broken or brilliant, tell us — we ship a patch every six weeks, forever.

— The Lucent team
```

---

## 2. App Icon

### 2.1 Concept brief — the baseline icon

**One-line concept:** A single Lucent-bearer, in 3/4 silhouette, drawing back a bow that glows prismatic-white, against a deep-indigo halo bleeding to cold black at the edges.

**Composition rules:**
- **Single character focus.** No crowds, no environment, no UI elements. Per `art-audio-direction.md` §7: icons read only at 60×60px, and a single hero face is what photographs.
- **3/4 silhouette pose.** Head slightly turned camera-right, bow drawn diagonally across the body, arrow tip lit. The silhouette must read as "archer" at a glance — bow line is the highest-priority shape.
- **Indigo halo behind the head.** Prismatic-violet rim light, radiating ~30% of the icon area. This is the **Lucent** brand signature — it differentiates us from the Archero warm-orange family in the App Store grid.
- **Bottom-third gradient to cold black** with a single faint shard glint. Gives the icon weight and makes the hero's chest the brightest contrast point — the eye locks here at thumbnail size.
- **No text.** Apple no longer allows icon text in featured placements.
- **Rounded organic forms** (helmet curve, hood curve, halo curve) — they outperform angular icons in PPO data (`art-audio-direction.md` §7).

**Color spec:**
- Halo: `#3C1F8C` outer → `#7A4FE0` mid → `#E8DFFF` inner.
- Hero rim light: `#FFF6D1` (warm cream, the only warm color in the icon — sells "light against dark").
- Background fade: indigo `#1A0E3E` → near-black `#06040D`.
- Bow string highlight: `#FFFFFF` 1px line, only at full size.

**Readability test:** the icon must be legible at 60×60px in a row of similar dark-fantasy icons. We mock up the home-screen and the search-results column before locking the variant.

### 2.2 Day-1 PPO variants (3 alternates against baseline)

Per `app-store-launch-aso.md` §2.4, ship 3 alternate icons in the binary on launch day; run Product Page Optimization from week 2; wait for ~90% confidence before applying winner.

| Variant | Concept | What changes vs. baseline | Hypothesis |
|---|---|---|---|
| **Baseline (B)** | Single Lucent-bearer (Dawnbow), 3/4, drawing bow, indigo halo | n/a — the locked default | "Indigo halo" is our differentiator in the genre grid. |
| **A — Hero-A close-up** | Dawnbow face only, hood up, one glowing eye, arrow notched at the edge of frame | Tighter framing (head and shoulders), bow becomes a single arrow tip and string fragment. Halo intensified — fills the icon. | Face-led icons convert higher in casual genres. We test whether the genre cue can drop the bow and survive on character alone. |
| **C — Hero-B mid-shot with arena hint** | Wardlight (the tank archetype) standing, shield raised, soft hexagonal floor tile under his feet, three red telegraph zones glowing | Different hero (genre-flex test), full body in frame, subtle environment context | Tests "is the female-coded mystic archer or the male-coded knight archer a better store thumbnail?" — answers our marketing-art question for free. |
| **D — Boss silhouette** | The Echo of the Drowned King (chapter 2 boss) in pure silhouette, eye sockets glowing indigo, the Dawnbow tiny in the lower third of frame, drawing an arrow up at him | Antagonist-led icon. Scale contrast: huge boss, tiny hero. No halo — boss is the shape. | Tests the "power fantasy / boss kill" pitch as conversion driver, mirroring the proven Mighty DOOM / Diablo Immortal icon school. |

Apple test plan: run B vs A vs C vs D at 25% traffic each for the first 28 days post-launch in en-US storefront. Lock the leader at 90% statistical confidence, then re-run with the loser slot rotated for a follow-up concept (likely a hero-skin tie-in for Season 1).

**Don'ts for every variant:**
- No App Store badges baked in ("New", "Free").
- No corporate "tap to play" arrows.
- No text overlay.
- No multi-character icons.

---

## 3. Screenshots — 7 frames (portrait, 6.7" iPhone master)

We ship seven portrait screenshots. Per `app-store-launch-aso.md` §2.4, the first three carry ~90% of conversion, so they map cleanly to **Value / Usage / Trust**. Frames 4–7 give depth signal to players who scroll. Captions are ≤8 words, large, anti-aliased white on a 20% black scrim. Frames are paired as visual diptychs (1+2, 3+4, 5+6, 7 standalone) so the "panorama" trick works in App Store search results.

**House rules across all screenshots — what's NOT included:**
- No countdown timers ("Offer ends in 1:47"). Apple flags them as deceptive urgency, and they tank trust.
- No dollar signs, no $99.99 SKU prices, no currency-pack art. Players bounce when the first impression is a store.
- No CTA buttons inside screenshot art ("Tap to play", "Install now"). The store has its own button.
- No competitor names or "better than" claims.
- No fake-gameplay creative (Archero's old misleading lane). Apple §2.3.1 is enforcing this hard in 2026.
- No hero or boss whose art is not actually in the build.

### Screenshot 1 — Boss crit chain (VALUE)

- **Copy overlay (8 words max):** `One arrow. Five crits. Boss down.` — 6 words.
- **Background color:** Sunken Cathedral palette — deep cyans, pale stone, hint of indigo Dim creep at the upper edge.
- **Character pose:** Dawnbow mid-strafe, bow at full draw, ribbon-trail of arrow path arcing into the Echo of the Drowned King. Crit damage numbers (large, gold) spraying upward in a column. Hero is rim-lit white-gold; the boss is silhouetted dark indigo, one eye open and very bright.
- **What's NOT in frame:** UI HUD is hidden (or 70% opacity) so the screenshot reads as a painting. No ad banner. No timer. No store icon.

### Screenshot 2 — Ability pick screen (USAGE)

- **Copy overlay:** `Three picks. A new build every run.` — 7 words.
- **Background color:** Dim-tinted dark indigo, soft static-noise overlay. Slight blur of a paused arena behind the cards.
- **Character pose:** Dawnbow standing center, low pedestal under feet, head down — the deliberate "between rooms" rest pose. Three ability cards float in front: `Multishot III` (prismatic), `Lightning Stitch` (electric-violet), `Hunter's Memory` (gold). Each card icon is custom art, not a generic frame.
- **What's NOT in frame:** No "buy more rerolls" button. No coin counter. No banner ad.

### Screenshot 3 — Hero with full gear / set bonus (TRUST)

- **Copy overlay:** `Forge a 4-piece set. Feel it.` — 6 words.
- **Background color:** Emberforge orange-gold, the "hero shot" plinth standard across the genre. Soft volumetric god-rays from frame-top.
- **Character pose:** Embercaller hero in a contrapposto stance, hammer-bow over the shoulder, full gear lit. Six gear slot icons orbit the hero in a halo; four are glowing prismatic (the active set bonus); the set-bonus chip reads `Lightbringer: +35% Crit, +1 Ability Slot`.
- **What's NOT in frame:** No "tap to upgrade" prompts. No paid-currency icons. No "★★★ rate us" UI.

### Screenshot 4 — Chapter map (DEPTH / WORLD)

- **Copy overlay:** `Seven realms. Each one fell differently.` — 6 words.
- **Background color:** A long vertical chapter map ribbon: Vale (green) → Cathedral (cyan) → Frostspire (white) → Emberforge (orange) → Glassroot (rainbow refraction) → Hollow Sky (purple-void) → Long Dusk (near-black). The Dim creeps across the unconquered realms as a slow lavender wash.
- **Character pose:** Top-down icon of the Dawnbow standing on the Sunken Cathedral node, indigo halo emitting outward. The further realms are visible but desaturated.
- **What's NOT in frame:** No level numbers above the cap (no "Stage 4000" inflation). No fake-promise content ("coming soon: hellscape" — only show what ships).

### Screenshot 5 — Tower mode preview (DEPTH SIGNAL)

- **Copy overlay:** `The Tower remembers your best.` — 5 words.
- **Background color:** Vertical indigo gradient, faint prismatic vertical light beams running floor-to-ceiling. A tall spire fills the right third of the frame; the Tower stretches up and out of view.
- **Character pose:** Side-view silhouette of the Wardlight tank climbing a ledge, shield raised, an Echo enemy mid-knockback. Leaderboard ticker on the left third shows the player's name climbing past three "Friends" entries (placeholder pop-art names that read as community, not whales).
- **What's NOT in frame:** No "VIP" badges, no whale-bait numerical inflation, no "$999 Tower Pack."

### Screenshot 6 — Guild boss / co-op moment (SOCIAL SIGNAL)

- **Copy overlay:** `Four friends. One Echo. One HP bar.` — 7 words.
- **Background color:** Hollow Sky purple-void; floating platform; the boss (Echo of the Twin Suns) takes up the top half of the frame as a colossal silhouette with two glowing crater-eyes.
- **Character pose:** Four heroes spread on the platform — Dawnbow center-firing, Wardlight blocking a telegraph zone, Embercaller laying a fire trail, Frostshard chaining freeze on a minion. A single giant boss HP bar runs across the upper third, ticking down; the player names beside it are clearly human, lowercase, friendly.
- **What's NOT in frame:** No "+99 coin pack" reward preview. No "Whale guild #1" tag. No global chat spam.

### Screenshot 7 — Battle Pass season hero (CADENCE / LIVE GAME SIGNAL)

- **Copy overlay:** `Season 1 — Vale Reborn. Free pass inside.` — 8 words.
- **Background color:** Vale of First Light dawn — soft yellow rising over green meadows, indigo retreating to the corners (the visual signature of "the Dim recedes").
- **Character pose:** The Dawnbow in a new Season 1 skin (the **Lantern Bearer** — green hood, glass lantern slung at hip), hero shot facing camera, indigo halo brightening to pale gold. The Battle Pass header shows three sample free-tier rewards (a skin chip, an ability token, a hero-icon frame), not premium-only.
- **What's NOT in frame:** No "$9.99 Premium Pass" price stamp. No tier-100 paywall. No "VIP only" label.

---

## 4. App Preview Video — 30s Frame-by-Frame Storyboard

**Spec:** 1080×1920 portrait, 30 fps, ≤30s, ≤500 MB, H.264, AAC stereo. Three uploads (English, JP, KR) for launch; PT-BR/DE/FR/zh-Hans at week 4 per localization tier. No logo intro for the first 3 seconds — that hook frame is the entire pitch (per `art-audio-direction.md` §7).

**Music:** custom 30s composer cut, built around the boss-music stinger from `art-audio-direction.md` §6. Strings + brass swell, settling on a soft string bed at the CTA.

**Audio note:** App Store autoplays muted in search, so all critical info must read silently. Sound design is layered for users who tap to unmute on the product page.

### Frame-by-frame storyboard

| Time | Visual | On-screen copy (large white, ≤6 words) | Audio (if user unmutes) |
|---|---|---|---|
| **0.0 – 0.4s** | **HOLD on the boss-crit moment.** Echo of the Drowned King mid-roar, Dawnbow arrow piercing his throat, 5 gold crit numbers spraying upward. Frame is paint-frozen for 400ms. | (none — let the image be the hook) | One sharp impact hit + boss roar tail. |
| **0.4 – 1.0s** | Crit chain ripples outward through three more enemies in the same arena; each enemy detonates in a small prismatic burst. | (none) | Three escalating impact hits, last one with a brass stinger. |
| **1.0 – 1.5s** | Smash cut to **black**, then a single arrow streaks across frame, leaving a violet trail. | (none) | Silence into a soft string swell. |
| **1.5 – 3.0s** | **3.0s mark** is where most viewers drop. The Dawnbow lands on a tiled floor in Vale of First Light dawn, bow ready, indigo halo flickering on. Hero is rim-lit gold, environment is soft green. | `Walk into the dark.` (held 1.5s) | String swell continues; bow-draw SFX. |
| **3.0 – 5.0s** | **Auto-shoot reveal.** Player thumb swipes onto frame (visible as a soft circular shadow at lower-left, not an obtrusive hand). Hero strafes, stops, looses three arrows that fan into a pack of common Dim enemies. Hit-flash on each. | `One thumb. Real RPG.` | Three quick shoot SFX, three hit SFX, a level-up chime at the end. |
| **5.0 – 7.0s** | **Ability pick screen.** Three cards float up: `Multishot III`, `Lightning Stitch`, `Frost Tether`. The thumb-shadow taps `Lightning Stitch`. Screen flashes violet-white. | `Pick three. Build a god.` | UI tap; ascending arpeggio. |
| **7.0 – 9.5s** | Cut back to gameplay — the hero's arrows now CHAIN lightning through 6 enemies. Screen-fill of bullets and chain-lightning forks. Hit-stop on each chain. | `Then again.` | Electric crackle, hit-stop "thock-thock-thock". |
| **9.5 – 11.0s** | **Quick montage** — three rapid 0.5s cuts: Dawnbow + multishot wall, Embercaller + fire ground, Frostshard + freeze field. Each cut tinted to its biome palette. | `Eight heroes.` | Three pitched-up shoot SFX in quick succession. |
| **11.0 – 13.0s** | **Chapter map fly-through.** Camera dollies up the vertical chapter ribbon from Vale through to the edge of the Long Dusk. Realms light up sequentially as the camera passes. | `Seven realms to free.` | Long string sustain, soft choral pad. |
| **13.0 – 16.0s** | **Boss intro (the Frostspire boss, Echo of the Star-Climber).** Towering ice silhouette, the screen darkens, the boss inhales (telegraph), red zones bloom on the floor. Hero rolls through them. | `Bosses you can read.` | Boss roar, low brass; player roll SFX. |
| **16.0 – 19.0s** | **Boss kill payoff.** Frostshard hero chains freeze across all three boss phases in two cuts; the boss shatters into prismatic shards on the third hit. Slo-mo flash. | `And out-think.` | Shatter SFX, music swell into victory stinger. |
| **19.0 – 21.5s** | **Guild Boss cut.** Hollow Sky purple-void. Four heroes circle the Echo of the Twin Suns. A giant single HP bar ticks down across the top of the frame, four player names beside it. | `Or call four friends.` | Multi-impact layered hits + a guild "ready" chime. |
| **21.5 – 24.0s** | **Tower mode tease.** Endless vertical climb, hero ascending past three "depth" floor numbers, leaderboard ticker on the right scrolling up. | `Then climb forever.` | Music drops to a quieter sustained string bed. |
| **24.0 – 27.0s** | **Season 1 hero shot.** Dawnbow in Lantern Bearer skin in dawn light, indigo halo brightening to gold. Camera slow-pushes in on the face; the eye opens. | `Made by people who play it.` | Music opens up to its final note; soft narrator: *"Walk in."* (single VO line — same narrator as in-game). |
| **27.0 – 30.0s** | **End card.** Black background. Centered: the Lucent app icon (baseline variant, large). Below the icon: `Lucent — Free on the App Store`. Below that, tiny: `Sign in with Apple. iCloud save. No ads in gameplay.` | `Free on the App Store` | Single soft string chord resolves to silence on the last frame. |

**Poster frame (the still that auto-displays when the video is paused):** frame at 0.2s — boss crit moment. Same image we'll license out for press kit hero art.

**B-roll bank for paid creative cuts:** every cut in this 30s video is also delivered as a clean 6:7 portrait file (no captions, no end card) so the UA team can recut without re-rendering from the engine.

---

## 5. Paid UA Creatives — 8 Launch Concepts

All concepts ship in **9:16 portrait** (1080×1920) and the new **4:5 / 6:7 portrait** Meta Reels safe format. Lengths 15–30s. Each concept ships with **3 variants** (different hooks at 0–3s, same body, two end-card cuts) at launch — so the launch creative pack is **24 ad units**. UA channel mix per `app-store-launch-aso.md` §9.4: Meta 35%, TikTok 25%, ASA 25%, AppLovin/Moloco 10%, influencer 5%.

We brief creatives by **concept bucket** (`app-store-launch-aso.md` §5.2): gameplay loop, UGC-style satire / power fantasy, character ability showcase, boss-kill power fantasy, meta-progression / build-craft.

### Concept 1 — "The Build Discovered"

- **Bucket:** Build-craft / power fantasy.
- **Hook beats (first 3s):** ECU on the ability pick screen — three cards. Thumb taps the middle one (`Lightning Stitch`). 0–3s freeze on the player's selected card.
- **Body (3–18s):** Cut back to the arena. The hero's arrows start chain-lightning. Screen progressively fills with bullets — 1 → 5 → 12 → 30 projectiles on screen. Smile-cut at 15s to a real player reaction shot (UGC plate from creator): mouth open, then a grin.
- **Pacing:** Fast. 4 cuts in the first 8s, then a single 6s held shot for the bullet wall, then the reaction.
- **Platform:** **TikTok primary, Meta Reels secondary, AppLovin tertiary.** The reaction beat is platform-native to TikTok culture.
- **Length:** 20s.
- **Expected lifespan:** 14–21 days before fatigue. Refresh by swapping the reaction shot.

### Concept 2 — "Boss Down"

- **Bucket:** Boss-kill power fantasy / UGC.
- **Hook beats (first 3s):** Phone-frame UGC overlay (a "screen capture" of someone playing). Boss telegraph blooms red. Voiceover: *"I almost died here…"*
- **Body (3–22s):** The boss attack hits, hero drops to 12% HP. Player rerolls an ability, picks `Hunter's Memory` (the comeback ability). Hero rebuilds, chains crits, kills boss. UGC voice: *"Bro. BRO."*
- **Pacing:** Slow build, fast finish. 6s buildup → 4s comeback ability → 8s onslaught.
- **Platform:** **TikTok + YouTube Shorts.** UGC framing dies on Meta.
- **Length:** 25s.
- **Expected lifespan:** 21–28 days. Highest expected lifespan of the set because the format mimics organic content.

### Concept 3 — "From the Top"

- **Bucket:** Meta-progression / world reveal.
- **Hook beats (first 3s):** Black frame → text card: `Chapter 1. The Vale.` → quick 1.5s clip of the first room. *"This is where it starts."*
- **Body (3–15s):** Hard-cut montage of one room per chapter, each cut 1.5s long: Vale → Cathedral → Frostspire → Emberforge → Glassroot → Hollow Sky → Long Dusk. Color palette shifts feel like watching the seasons. Each cut hits on the beat of an escalating music phrase.
- **End card (15s):** `7 realms. Free.`
- **Pacing:** Strictly metronomic. The music carries the cut.
- **Platform:** **Meta Reels + YouTube Shorts.** The cinematic montage reads as "premium game" — Meta CTRs reward this on iOS.
- **Length:** 15s.
- **Expected lifespan:** 28+ days. Slowest fatigue of the set; the montage feels like a trailer rather than an ad.

### Concept 4 — "One Hand, Full RPG"

- **Bucket:** Gameplay loop hook / accessibility pitch.
- **Hook beats (first 3s):** Real hand holds a phone (no jewelry, no obvious skin-tone bias — neutral mid-tone). Only the thumb is visible. Title card overlay: `One thumb.`
- **Body (3–22s):** Camera holds on the phone for the entire ad — we never cut to "screen recording" mode, the screen is always inside the phone in frame. Thumb strafes, hero auto-shoots. Title card swaps mid-ad to `Full RPG.` The thumb taps an ability card. Screen explodes with FX inside the phone frame.
- **End card (22–25s):** Thumb taps the Lucent icon on a fake home screen. `Free on the App Store.`
- **Pacing:** Single continuous shot. No cuts. This is the differentiator — the ad looks "real."
- **Platform:** **Meta Reels primary.** Meta IPM rewards "phone in hand" creative on iOS.
- **Length:** 25s.
- **Expected lifespan:** 14 days — the format is replicable but fatigues fast as players notice the device frame.

### Concept 5 — "Class Switch"

- **Bucket:** Character ability showcase.
- **Hook beats (first 3s):** ECU on a hero portrait (Dawnbow). Whip-pan to the next hero (Embercaller). Whip-pan to Frostshard. Three heroes in 3 seconds.
- **Body (3–20s):** Each hero gets a 4-second signature ability beat: Dawnbow's `Multishot Crown` (arrows fan to 9), Embercaller's `Forge Heart` (fire ground engulfs an arena), Frostshard's `Iceblink` (mass freeze + shatter), Prismborn's `Refraction` (every arrow becomes 3 on hit). Each beat ends on a satisfying kill.
- **End card (20–22s):** Four hero portraits in a 2×2 grid. `Pick your light. Free.`
- **Pacing:** Beat-driven; whip pans every 4s.
- **Platform:** **TikTok primary, AppLovin secondary.** Class-fantasy cuts test well on AppLovin's mid-core inventory.
- **Length:** 22s.
- **Expected lifespan:** 21 days. Refresh by swapping which 4 of the 8 heroes appear.

### Concept 6 — "TikTok recipe reveal"

- **Bucket:** UGC satire / build-craft reveal.
- **Hook beats (first 3s):** UGC phone-frame. Bold text overlay: `I tried THIS broken build…` Voiceover: *"Don't tell anyone."*
- **Body (3–25s):** "Recipe reveal" structure native to TikTok cooking videos. On-screen card 1: `1 × Multishot III`. Hero picks it. Card 2: `1 × Hunter's Memory`. Hero picks it. Card 3: `1 × Prismatic Quiver (Mythic)`. Hero picks it. Mid-ad reveal: `Combine = Awakened: Sunbleed Bow`. Hero looses the Awakened weapon — one shot, 60 enemies down, screen white-flash.
- **End card (25–28s):** `12 Awakened recipes. Find them.`
- **Pacing:** Slow, methodical recipe reveal. The payoff frame is the only kinetic moment.
- **Platform:** **TikTok primary, Reels secondary.** Native to TikTok cooking-video culture; tests platform tolerance for "spoiler" framing.
- **Length:** 28s.
- **Expected lifespan:** 14 days, but very high IPM in the window.

### Concept 7 — "Guild Boss"

- **Bucket:** Social signal / multiplayer.
- **Hook beats (first 3s):** Black frame → four player names tick onto frame in sequence (`Mira`, `Ash`, `Tev`, `you`). The four names lock under a giant boss HP bar. Music drops out.
- **Body (3–18s):** The Hollow Sky guild-boss arena reveals beneath the names. Four heroes spread across the platform. Boss inhales. Telegraph. The four heroes execute four different abilities in quick succession; boss HP bar drops in chunks, with each chunk labeled with the contributor's name. Final chunk under "you."
- **End card (18–20s):** `Bring four friends. Free this season.`
- **Pacing:** Names sequence is rhythmically slow (a heartbeat per name). Combat is fast.
- **Platform:** **Meta + AppLovin.** Guild content monetizes — channels with adult audiences (Meta) test better than TikTok.
- **Length:** 20s.
- **Expected lifespan:** 21 days. Refresh by swapping the four name plates to topical pop names.

### Concept 8 — "Soft sad → Soft sun"

- **Bucket:** Emotional / brand spot. Not gameplay-led — atmosphere only. Sits adjacent to the lane Genshin Impact and Honkai: Star Rail occupy for emotional UA on premium audiences.
- **Hook beats (first 3s):** A near-silent shot. Lavender-grey landscape — the Vale before light returns. The Dim creeps across the meadow. A single deer-Echo stops, looks at the camera. Held 3s in near-silence.
- **Body (3–22s):** A Lucent-bearer walks into frame from below. Indigo halo flickers on. Camera tracks alongside; the Dim recedes in soft waves as she walks. The meadow color returns one wash at a time — desaturated grey → muted green → full saturated dawn. The narrator (same female voice as in-game) speaks one line: *"They left the lanterns burning."* (the chapter 1 stinger from `design/03-world-and-theme.md`).
- **End card (22–25s):** Sun cracks over the horizon. Icon fades in over a dawn sky. `Lucent. Free on the App Store.`
- **Pacing:** Cinematic. Long, slow shots. No cuts under 3s.
- **Platform:** **YouTube Shorts + Meta.** Brand-led; do not put on AppLovin (the inventory hates atmospheric).
- **Length:** 25s.
- **Expected lifespan:** 60+ days. This is a low-IPM, low-CPI brand asset — kept alive as a "halo" creative that lifts the entire account quality score.

### Launch pack summary

| # | Concept | Channel | Length | Lifespan |
|---|---|---|---|---|
| 1 | The Build Discovered | TikTok / Meta | 20s | 14–21d |
| 2 | Boss Down | TikTok / Shorts | 25s | 21–28d |
| 3 | From the Top | Meta / Shorts | 15s | 28d+ |
| 4 | One Hand, Full RPG | Meta | 25s | 14d |
| 5 | Class Switch | TikTok / AppLovin | 22s | 21d |
| 6 | Recipe Reveal | TikTok | 28s | 14d |
| 7 | Guild Boss | Meta / AppLovin | 20s | 21d |
| 8 | Soft sad → Soft sun | Shorts / Meta | 25s | 60d+ |

---

## 6. Influencer & Content-Creator Outreach — 30 names to research at pre-launch

**Mix target:** 12 TikTokers (mobile gaming, 200k–2M followers), 12 YouTubers (Archero / Survivor.io / mobile roguelike adjacent, 100k–1M subs), 6 Twitch streamers (in-genre, 5k–50k average viewer). The cap on Twitch is per `app-store-launch-aso.md` §5.3 — Twitch is less useful for hybrid-casual UA but high-leverage for guild content later.

**Note:** the names below are **research targets** — the outreach team verifies follower count, audience geo, and engagement rate before any commit. Channels that have publicly disclosed pay-for-post rates are starred (★) for budget planning.

### TikTokers (12)

1. **@MrBeastGaming** (mobile vertical) — ★ enterprise-tier, used for a single splash post in week 1.
2. **@Pocketpairs** — mobile roguelike daily clips.
3. **@AppFinder** — mobile game discovery channel, 1.4M+, ★.
4. **@RoguelikeRecipes** — UGC build-recipe creator, perfect for Concept 6 lane.
5. **@HabbyGames-creator (community)** — Archero 2 / Survivor.io creator network.
6. **@TheMobileGamer** — 800k, mobile-only.
7. **@HeyImBee** — Australian, broad mobile-gaming, ★.
8. **@TwoHourGamer** — 30-minute-to-test format that fits early-access drops.
9. **@OneThumbGames** — accessibility-oriented mobile creator; great for Concept 4.
10. **@JaviGotMad** (LatAm) — PT/ES bilingual, critical for BR localization wave.
11. **@KoMobileGirl** (KR) — Korean mobile gaming TikTok; critical for KR wave-2.
12. **@JPGameDoll** (JP) — JP mobile gaming, gacha-savvy audience.

### YouTubers (12)

13. **CallMeKevin / Penguinz0 channels** — non-genre giants for one-off cross-pollination, ★.
14. **HybridGamer** — Survivor.io & Archero deep-dive channel, ~250k.
15. **Boco** — Archero history / meta channel, ~120k. **Top priority for embargo coverage.**
16. **Dragneel** — Archero meta builds, ~80k. Top priority.
17. **Spawn Wave Mobile** — mobile-gaming news adjacent, ~500k.
18. **Kripparrian (mobile clip channel)** — adjacent roguelike audience.
19. **TagBackTV** — mobile gaming reviews, 1.5M+, ★.
20. **MobileGamesDaily** — release-day coverage channel.
21. **Boomstick Gaming** — roguelike PC adjacent — useful for "PC players try mobile" angle.
22. **Outsidexbox / Outsidextra mobile picks** — UK-based, premium voice for UK softlaunch ASO data.
23. **Mobile Free To Play (Adam Telfer's channel)** — industry-adjacent; pitch the dev story angle.
24. **GameRant Mobile / IGN Mobile YT** — outlet channels covered in §7, but their creator slots count here.

### Twitch streamers (6)

25. **CohhCarnage's mobile slot** — once-a-month mobile stream, ★ if available.
26. **Disguised Toast (mobile-night format)** — ★, splash potential.
27. **PleasantlyTwstd** — Archero/Survivor.io regular streamer, ~10k avg.
28. **TheKingNappy mobile streams** — 5k avg, roguelike-friendly.
29. **OldMan_Mythras** — long-form mobile streamer who tests guild content well.
30. **Yvonnie** — mobile gaming streamer with strong female-coded audience overlap; great for chapter 5 (Glassroot Forest) reveal beat.

### Outreach offer template (single page, sent as a personal email with TestFlight link)

> Subject: Early access — Lucent: Shards of the Shattered Sun (TestFlight)
>
> Hey [Name],
>
> I'm [Sender] from the Lucent team — we're building a one-thumb roguelike action RPG for iOS. We've been watching [specific recent video / clip / stream — a real reference, not a template fill] and think your audience overlaps almost exactly with our soft-launch cohort.
>
> What we'd like to offer:
>
> 1. **Early access** to the soft-launch build, 30 days before global, via TestFlight. No NDA — talk about it freely.
> 2. **A free in-game founder pack** worth ~$30 (60 Prism Pulls, the Lantern Bearer skin, three weeks of premium battle pass) for your account and 50 codes to give your audience.
> 3. **Revenue share option:** if you want a paid integration, we offer a flat fee of $[budget tier — $500 micro / $2k mid / $5–10k macro] for a single 60-second integration, OR a 6-month revshare on a tracked link (10% of net iOS revenue from your installs). Most creators in your tier prefer flat + a small revshare topper. We're flexible.
> 4. **Direct line to the dev team.** Once a month, a private call with our game director — bring your audience's questions, we'll answer them.
>
> What we ask in return:
>
> - One 60-second post or stream segment minimum, your call on format. Honest is best — we'd rather you say "the gacha is rough but the bow build feels great" than read a script.
> - A 7-day exclusive window before the embargo lifts on outlets.
> - Disclose the sponsorship per FTC / your local equivalent.
>
> TestFlight link, asset pack, and a 90-second pitch video are below.
>
> [Send-from-personal-not-company-email]
>
> — [Sender], Lucent
>
> *Privacy & data: we'll send you a one-page sheet of what's tracked when you use the build. No surprises.*

---

## 7. PR Plan

### 7.1 Outlets and timing

| Outlet | Why | Lead time before launch | Asset |
|---|---|---|---|
| **TouchArcade forums + main site** | Mid-core mobile audience that still reads forums; very active soft-launch thread culture. | 4 weeks; soft-launch thread on day 1 of CA stage. | Forum-friendly GIF, soft-launch thread template, dev account active for 4 weeks. |
| **Pocket Gamer / PocketGamer.biz** | Editorial coverage + Big Indie Pitch potential. | 6 weeks pre-launch pitch; 5-day embargo on review. | Full press kit + 1-on-1 founder interview. |
| **AppMagic** | Data-driven outlet, hungry for launch case studies. | Day 1 launch share; case study at week 6 with numbers. | Soft-launch retention / ROAS chart pack (with PII stripped). |
| **GameRant** | Mass-audience mobile coverage; reaches casual searchers. | 3 weeks pre-launch; 5-day embargo. | 3 minutes of clean gameplay clips + 4 quotes from the game director. |
| **IGN Mobile** | Mainstream reach. | 6 weeks pre-launch; 5-day embargo. | Exclusive boss-reveal video (the Frostspire boss). |
| **Polygon Mobile** | Cultural / brand-narrative outlet; cares about art direction and "why we made this." | 6 weeks pre-launch. | Founder essay angle: "Why our roguelike isn't grimdark." |
| **EuroGamer Mobile** | UK-specific reach; lifts EU storefront. | 4 weeks pre-launch. | Embargoed review. |
| **Naavik** | B2B outlet; lifts industry credibility (and helps with later VC / partnership conversations). | 8 weeks pre-launch teaser; week-3 post-launch case study. | Dev process write-up + soft-launch KPI numbers. |
| **Deconstructor of Fun** | B2B podcast/blog; pitch the soft-launch story or a guest essay from the game director. | 12 weeks pre-launch (long lead). | Substack-quality post: "What we learned shipping a roguelike." |
| **Mobile Free To Play (MF2P)** | B2B podcast; pitch a soft-launch retrospective. | 8 weeks pre-launch; 3-week post-launch podcast spot. | Podcast pitch + audio-ready dev quotes. |

### 7.2 Press kit contents

Hosted at `lucentgame.com/press` (live 4 weeks before launch). Single .zip download.

- **Logo:** Lucent wordmark in PNG (white-on-transparent, black-on-transparent) and SVG. The full title `LUCENT — Shards of the Shattered Sun` as a separate file.
- **Screenshots:** 12 high-res PNGs (the 7 store screenshots + 5 unused B-roll: a Glassroot Forest wide, a Hollow Sky guild boss wide, the chapter map closeup, the UI dark theme, an Awakened weapon recipe screen).
- **Video:** the 30s preview at 1080×1920 + a 90s "developer cut" walkthrough at 1920×1080 (landscape for editorial embeds) + clean gameplay B-roll (180s, no UI, no captions).
- **Key art:** the launch hero illustration — Dawnbow standing on the Sunken Cathedral altar at dawn, indigo halo bright, the Echo of the Drowned King silhouette behind. Two versions: 16:9 (banner) and 1:1 (square for social).
- **Fact sheet (one page PDF):** title, studio, platform (iOS first; Android Q4 2026 indicative), genre, price (free with optional IAP), launch date, language list, monetization model, dev team size, engine, key features (5 bullets), 5 dev quotes, 3 review pull-quote placeholders.
- **Dev quotes:** 5 quotes from the game director, 2 from the art lead, 1 from the audio lead. Pre-written, embargo-safe.
- **Founder bio + headshot:** game director's bio (200 words) and headshot.
- **GIFs:** 6 looping ~3-second GIFs (one per concept lane) for forum-friendly drop-ins.
- **Embargo letter:** the actual letter outlets sign to receive the build. Plain-language. Lists what's allowed and not.

### 7.3 Embargo strategy

- **5-day pre-launch embargo** is the public-facing window. Outlets receive the build, screenshots, and video 5 working days before launch and can publish coverage at 9 AM PT on launch day.
- **Tier-1 outlets (IGN Mobile, Pocket Gamer, Polygon Mobile, EuroGamer Mobile, Naavik) get a 7-day window** (2 extra days) in exchange for a guaranteed publish slot — this is a common indie tactic that lifts launch-day coverage density.
- **Creator embargo is separate** — creators get 14 days early access (TestFlight) and a 24-hour window before global launch where they can publish but not say "out now." This drives wishlist / pre-order signal.
- **Embargo enforcement:** we use unique TestFlight links per outlet so a leak is traceable; the embargo letter explicitly says the studio reserves the right to revoke and pull future review codes for breaks.
- **Embargo break contingency:** if an outlet breaks early, we **do not panic-publish** — we send a brief "the build is now public" note to all other outlets so they can publish at their convenience instead of being scooped.

### 7.4 Community plan — Reddit, Discord, X/Twitter, Bluesky

| Channel | Use | Cadence |
|---|---|---|
| **Discord** | Primary community home. Surfaced from the game's main menu. Channels: announcements, build-discovery, bug-reports, art, audio, off-topic, language-specific (#ja, #ko, #zh, #pt, #es, #fr, #de). | Daily presence from a community manager + weekly dev AMA. |
| **Reddit /r/iOSGaming** | Soft-launch thread + global launch announce. Flair correctly to avoid mod action. | Weekly recurring presence; never spam, always reply. |
| **Reddit /r/incremental_games + /r/RoguelikeDevelopers** | Soft-launch thread + dev-process angle. | One thread at soft launch, one at global. |
| **Reddit /r/gamedev** | Dev-story angle: "How we shipped a roguelike with a 5-person team." | One thread, post-launch only. |
| **X / Twitter** | Patch notes, event announcements, dev quote-tweets of player highlights. | Daily during launch week, 3–4x/week after. |
| **Bluesky** | Mirror X. Slightly more "studio voice" — long-form devlog posts perform here. | 2x/week. |
| **TikTok (studio account)** | 6:7 vertical clips of player highlights, build reveals, dev moments. | 2 posts/week minimum. |
| **Instagram Reels** | Mirror of TikTok account. | Mirror, no extra effort. |
| **YouTube** | Patch trailer per season, monthly dev diary. | Monthly. |

Tone consistency: dry, warm, hopeful. The community manager has a public name (not "@LucentTeam") so players feel they're talking to a person. Mod rules are pinned and enforced.

---

## 8. Localization Priorities

Per `app-store-launch-aso.md` §2.5 tiers, applied to Lucent's launch-scope language plan (`design/05-launch-scope.md`: 2 day-1, 6 by week 4).

| Rank | Locale | Tier | When | Rationale |
|---|---|---|---|---|
| 1 | **en-US** | T1 | Day 1 | Source language; core US revenue. |
| 2 | **en-GB** | T1 | Day 1 | One-day cost (variant strings only); lifts UK CVR ~10%. |
| 3 | **ja-JP** | T2 | Week 4 | Highest single-market ARPU in mobile gaming. Gacha tolerance is strong. Voiceover line stays English (the narrator); UI/store fully localized. |
| 4 | **ko-KR** | T2 | Week 4 | Second-highest ARPU. Strong roguelike + gacha intent. ASA bid efficiency is excellent. |
| 5 | **zh-Hans** | T2 | Week 4 | Mainland China not on the iOS App Store path yet, but **zh-Hans is used by Singapore + Malaysia + emigré US** stores and lifts CVR meaningfully. Defer mainland-China publishing license process to year 2. |
| 6 | **pt-BR** | T2 | Week 4 | Cheap CPIs, large mobile-gaming install base, strong soft-launch geo. Localizing while we soft-launch there is a no-brainer. |
| 7 | **de-DE** | T3 | Week 6 | High ARPU EU market. Translation is fast. |
| 8 | **fr-FR** | T3 | Week 6 | High ARPU EU market. |
| 9 | **es-MX + es-ES** | T3 | Week 8 | Two SKUs (MX for LatAm scale, ES for EU price tolerance). Pairs naturally with pt-BR effort. |
| 10 | **it-IT** | T3 | Week 8 | Lower ARPU than DE/FR but cheap to localize alongside the EFIGS pass. |
| 11 | **ru-RU** | T4 | Month 3+ | Large install base, low CPI. Politically/payment-rail risk — re-evaluate at month 3. |
| 12 | **tr-TR** | T4 | Month 3+ | Big install volume, cheap UA. |
| 13 | **id-ID, vi-VN, th-TH** | T4 | Month 4+ | Volume markets, low ARPU; localize once monetization signal is healthy enough that volume is upside not noise. |
| 14 | **ar-SA** | T4 | Month 4+ | RTL is an engineering effort (UI mirror) — schedule as its own project, not lumped with EFIGS. |
| 15 | **zh-Hant** | T4 | Month 4+ | Taiwan + HK. Lower priority than zh-Hans because store CVR lift is smaller. |

**Localization minimum at each tier:**
- **Store metadata only:** title (within 30 chars in target script), subtitle, description, keywords field (100 chars in target script), promotional text, screenshot captions. Even this lifts CVR 15–25% per `app-store-launch-aso.md` §2.5.
- **Full in-app localization:** all UI strings, all tutorial copy, all narrator lines (the single narrator voice stays English — a documented brand choice, not a cost choice; subtitles in target language). Patch notes localized. Push notifications localized.

We do **not** translate the lore stingers ("They left the lanterns burning.") — the official translation is "the same line, in the player's language, that sounds right in their language." We pay native game-localization studios (not direct translation agencies) for these lines.

---

## 9. Launch Creative Test Budget

Per `app-store-launch-aso.md` §5.2 (20–40 new creatives/month) + §7.1 budget tiers. We plan at the **Mid tier** ($50–100k soft launch + $250k global month 1–3).

### 9.1 Soft-launch creative test plan (weeks 1–12)

| Week | Geo | Channels live | New creatives | Refresh winners | Spend / day | Focus KPI |
|---|---|---|---|---|---|---|
| 1–2 | PH (technical) | ASA Basic, Meta Reels | 4 (2 concepts × 2 hooks) | 0 | $250/day per channel | FTUE completion, crash-free sessions, raw CPI. |
| 3–4 | PH + VN | ASA Basic, Meta Reels, TikTok | 6 (3 new + 3 refreshed) | 2 | $500/day per channel | D1 retention, IPM. |
| 5–8 | CA + AU added (retention) | ASA Advanced, Meta Reels, TikTok | 8/wk (the full 8-concept launch pack staged across 4 weeks) | 4 | $750/day per channel | D7 retention, D1 ROAS. |
| 9–12 | BR + Nordics added (monetization) | + AppLovin test | 10/wk (concepts diversified; recipe + UGC + boss leaning into TikTok; brand spot into Reels) | 5 | $1,000–2,000/day per channel | D7 ROAS, payer conversion, D14 ROAS. |

**Creative cadence rule:** every concept is tested with **3 hook variants in week 1 of its life**. The single best-performing hook is kept; the body is then re-edited weekly. Full concept retirement is triggered at any of: CTR drops 30% from launch peak, IPM drops 25%, or 21 days elapsed.

### 9.2 Global launch creative test plan (months 1–3)

| Month | Total creatives /week | Mix | Spend /day per channel | KPIs (gate to scale) |
|---|---|---|---|---|
| **Month 1** | 12/week (the 8 launch concepts × 3 hooks rotated + 4 new monthly tests) | Meta 35%, TikTok 25%, ASA 25%, AppLovin 10%, influencer 5% | Start $2k/day per channel, scale to $5k as D7 ROAS hits 15% | **CPI ≤ $4.50 iOS US/CA, IPM ≥ 3.0, D1 retention ≥ 40%, D7 ROAS ≥ 15%.** |
| **Month 2** | 10/week (consolidating winners + 4 new tests) | Adjust mix toward winning channels; expected: TikTok grows to 30%+ if Concepts 1/2/6 hold; AppLovin grows to 15% once IAP signal is stable | Up to $10k/day per channel where ROAS holds | **D7 ROAS ≥ 18%, D14 ROAS ≥ 25%, IPM ≥ 3.5, payer conversion D7 ≥ 3%.** |
| **Month 3** | 8/week (mature account; refresh focused on winning lanes) | Heavy Meta + TikTok; Moloco added on top of AppLovin if IAP signal is healthy. Influencer share rises to 10%. | Up to $15k/day per channel — gate on **D7 ROAS ≥ 20% for 14 consecutive days** before doubling spend. | **D30 ROAS ≥ 40%, D90 payback trajectory ≤ 150 days, ARPDAU ≥ $0.20.** |

### 9.3 Creative team weekly rituals

- **Monday — Numbers review.** Read prior week's creatives by CPI, IPM, CTR, D1 retention, D7 ROAS per creative-channel-geo cell. Kill anything with CPI > 1.5× account average AND IPM < 2.0.
- **Tuesday — Concept brief.** UA creative lead briefs 2 new concepts for the next sprint, drawn from the bucket framework.
- **Wednesday — Production.** Editors cut 4–6 variants; engineers / engine team pull any new game footage needed.
- **Thursday — QA + tag.** Apple §2.3.1 compliance check on every new creative (no misleading gameplay). Add metadata tags for the BI dashboard.
- **Friday — Ship.** New creatives go live before noon UTC so the first weekend is on a full inventory cycle.

### 9.4 KPI gates summary (cross-reference)

These match the gates in `design/05-launch-scope.md` and `app-store-launch-aso.md` §4.3 / §9.5.

| Gate | Soft launch (PH/CA/AU) | Global launch (US/CA/AU/UK + EU/JP/KR) |
|---|---|---|
| **CPI (iOS, blended)** | ≤ $4.00 | ≤ $4.50 |
| **IPM** | ≥ 2.5 | ≥ 3.0 |
| **D1 retention** | ≥ 40% | ≥ 40% |
| **D7 retention** | ≥ 18% | ≥ 20% |
| **D7 ROAS** | ≥ 15% | Trending to ≥ 25% |
| **D90 payback** | ≤ 180 days | ≤ 150 days |
| **Tutorial complete** | ≥ 90% in ≤ 30s | ≥ 92% |

Scale UA spend only when D7 ROAS hits the target for **14 consecutive days** in the geo; pull back fast on creative fatigue and refresh weekly. This rule is per `app-store-launch-aso.md` §9.5 and is non-negotiable.

---

## 10. Open Items for the Wave-2 Marketing Pass

Things this brief deliberately does not lock — they're left for the marketing pass once we have soft-launch numbers:

1. **Final festival / awards strategy** — Big Indie Pitch, IGF, Apple Design Awards. Submission timing depends on soft-launch reception.
2. **Apple feature pitch** — the press kit, App Store Today-tab pitch, and Apple developer rep relationship plan owe an 8-week pre-launch update.
3. **Android UA mirror** — when Android launches in Q4 2026 indicative, we replan UA channel mix (Google AC enters at higher weight; ASA exits).
4. **Cross-promo deals** — Chartboost / direct deals with other indie iOS games. Negotiate once we have D1 retention numbers to share.
5. **Companion brand assets** — wordmark animation, Discord-bot persona, retail merch (hat, sticker) for community gifting. Production after soft launch.

— End of brief. —
