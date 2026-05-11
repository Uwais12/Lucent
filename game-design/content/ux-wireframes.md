# UI / UX Wireframes & Flows — Lucent: Shards of the Shattered Sun

Wireframes for the 16 highest-traffic screens in the Lucent client. ASCII-art at iPhone portrait scale (approx. 19.5:9), with annotated components, tap targets, state coverage, and outbound deep-links. Pulled forward from `design/00-design-pillars.md` (especially Pillars 4 and 8), `design/01-core-loop-spec.md` §5 and §6, and tempered against `research/monetization/liveops-retention.md`'s warning that event-tab clutter is the single largest UI complaint about Archero 2.

---

## 0. Global UX Rules

### 0.1 Frame conventions

- All wireframes drawn at iPhone 15 Pro safe-area proportions: roughly 32 ASCII columns × 64 rows mapping to ~390 × 844 pt.
- Top safe-area band (rows 1–3) reserved for status bar.
- Bottom safe-area band (rows 60–64) reserved for home indicator gesture region.
- Bottom tab bar lives at rows 56–59. The tab bar is **not** drawn over in-run screens (HUD owns the screen) or in modal full-screen flows (the run, the end-of-run summary, the splash).
- Notches are not drawn — assume edge-to-edge with a dynamic island above row 1.

### 0.2 Universal HUD elements (every menu screen)

Persistent header strip, identical position on Home, Heroes, Shop, Events, Guild, Battle Pass, Mode Select, Chapter Map, Pre-Run Loadout, and all child tabs. Specifically **not** present in-run, on the splash, on the end-of-run summary, or in full-screen modals.

| Slot | Position | Element | Behavior |
|---|---|---|---|
| Top-left | row 4, col 2–10 | **Avatar tile** with level ring, player name, guild tag | Tap → Profile sheet (settings cog lives here too) |
| Top-center | row 4, col 11–21 | **Energy pill** — bolt icon + `12/30` + `+` button | Tap pill → energy detail (regen timer, ad refill, gem refill). `+` tap → refill modal. |
| Top-right | row 4, col 22–31 | **Gold pill** then **Gem pill** stacked horizontally, each with a `+` button | Tap pill → currency source/sink history sheet. `+` → corresponding store landing (gold conversion or gem-pack store). |
| Top-right corner | row 5 col 30 | **Settings cog** | Tap → settings drawer (audio, language, account, support, credits). Long-press → quick mute. |
| Below header right | row 6 col 28 | **Mailbox button** with red-number badge | Tap → mailbox modal. Badge shows unread count up to 99+. |
| Bottom edge | rows 56–59 | **5-tab navigation** | See §0.3. |

Why a top energy pill (not top-right with the currencies): energy is the only resource that **gates entry to a mode**. Putting it center-top in primary scanning territory is deliberate; players check energy before they pick a mode.

### 0.3 Bottom navigation (5 tabs)

```
[ Home ] [ Heroes ] [ Shop ] [ Events ] [ Guild ]
```

- **Home** — lobby with mode-select shortcut, mailbox, chest pickups, daily check-in flush.
- **Heroes** — roster, hero detail, equipment, inscription (talent) grid, sigils, spirits.
- **Shop** — Daily Deal, Premium Deal, Gem Packs, Starter Pack, Monthly Card, Privilege Card, Hero-buy, Gacha banner entry.
- **Events** — live event cards (max 4 visible; pagination from 5+).
- **Guild** — guild chat, members, donations, weekly boss.

**Battle Pass** is reached from a dedicated banner on the Home screen (and from contextual pushes on quest-complete toasts), not from the bottom bar. **Mailbox** is reached from the header badge, not the bottom bar. Keeping the bottom bar to five surfaces is the load-bearing decision that prevents the Archero-2 clutter problem.

### 0.4 Notification design language

Three distinct visual signals, each used for one job. Mixing them is forbidden — the second a badge means three different things, the player ignores all three.

| Signal | Visual | Meaning | Example |
|---|---|---|---|
| **Red dot** (10pt circle, no number) | Solid red dot in upper-right of icon | "Something new exists here that you haven't seen." Cleared on first view. | New ability unlocked, new hero added, new chat message |
| **Red number circle** (14pt circle with white digit) | Red circle, white number, max `99+` | "This many countable items are waiting." Cleared as items are claimed. | Mailbox count, claimable quests count, available gear to equip |
| **NEW! tag** (gold pill with white "NEW!" text) | Gold rounded rectangle, 10pt height, beside item title | "Permanent flag on a feature unlocked in the last 48h." Auto-clears after 48h of exposure. | A newly unlocked mode, a freshly unlocked talent tier |

Battle-pass deadline urgency uses a fourth element — a **pulsing amber clock** that appears only in the final 48 hours of a season — and is allowed alongside any of the above on the BP entry tile only.

### 0.5 First-time-user safeguards

Per `design/05-launch-scope.md` and the FTUE table in `design/01-core-loop-spec.md` §6, several systems are account-level-gated. Locked features are **visible-but-locked**, never hidden:

- Locked icons render at 40% opacity with a small grey padlock overlay (bottom-right of the icon).
- Tapping a locked icon plays a soft denial chirp and shows a one-line tooltip: e.g. `Unlocks at Account Level 4 — Beat the Sunken Cathedral.`
- Locked features never produce notification badges. They never feel ignored, only on the horizon.
- Bottom-tab icons that are locked are still tappable (so the player can see what's coming), but the contents are replaced with a single "Locked at Account Level N" splash, plus a "Show me where to find it" affordance that deep-links to the relevant pre-req screen.

Lock map at FTUE day 1:

| Tab / Surface | Locked until |
|---|---|
| Bottom-tab: Events | Account Lv 2 (end of day 1) |
| Bottom-tab: Guild | Account Lv 6 (day 6) |
| Battle Pass entry | Account Lv 3 (day 3) |
| Tower mode | First chapter boss kill (~day 5) |
| Survival mode | Account Lv 7 (day 7) |
| PvP (Arena) | After global launch only; soft-launch hides the icon entirely |

### 0.6 Accessibility commitments

Mobile-portrait readability is sacred (Pillar 8). These are non-negotiable:

1. **Color-blind mode** — three modes (Deuteranopia / Protanopia / Tritanopia) recolor the four telegraph colors (red=damage, yellow=warning, blue=friendly, green=heal). Critically, **shape primitives carry the same information** — a red AoE telegraph is also a filled circle, a yellow line attack is also a hard line, friendly auras are dashed rings. Color is redundant, not load-bearing. This was an explicit Pillar-8 commitment.
2. **Font scaling** — `Default / Large / X-Large / XX-Large` scales all UI text by 1.00x / 1.15x / 1.30x / 1.50x. Buttons grow proportionally with text; the layout never clips. Tested on every screen.
3. **Reduced motion** — kills incidental parallax on lobby, screen-shake on crits, and the dopamine-burst confetti on chest open. Preserves all telegraph animations (which carry combat information).
4. **Haptic feedback** — short tap on every button, medium thud on ability pick, sharp tick on level-up, double-buzz on rare/legendary drop, long warm rumble on boss defeat. Toggleable, on by default, respects iOS system haptic settings.
5. **Voice-over labels** — every interactive element ships with an accessibility label. Currency pills read as `Twelve hundred gems, tap to view gem store`. Locked features read as `Locked, unlocks at account level four`.
6. **Tap-target minimum** — 44 × 44 pt minimum on every interactive element. Joystick and active button get 88 pt invisible expansion rings during runs.
7. **High-contrast mode** — bumps UI panel contrast from 4.5:1 to 7:1 (WCAG AAA), thickens UI strokes by 1.5x.

---

## 1. Splash → Home

The cold-open landing surface. From the user's perspective: tap app icon → 2s logo fade → animated splash (5s, skippable) → home lobby with the daily check-in flush stacked as a sequenced modal chain.

```
+------------------------------+
|     (status bar)             |
|                              |
|        (1) LUCENT LOGO       |
|         "Shards of the       |
|          Shattered Sun"      |
|                              |
|                              |
|     (2) animated prism       |
|         splash anim          |
|                              |
|                              |
|                              |
|                              |
|       (3) Tap to begin       |
|       [studio  credit]       |
+------------------------------+
   ↓ tap or auto-advance 5s
+------------------------------+
| (4) HEADER (avatar | E | G | Gm | cog)
|                              |
|   (5) DAILY CHECK-IN MODAL   |
|   ┌────────────────────────┐ |
|   │ Day 1 Day 2 Day 3 [4] 5│ |
|   │  50g  100g  X  500g 1k │ |
|   │  ✓    ✓    miss [CLAIM]│ |
|   │ Day 6  Day 7 (big)     │ |
|   │  1k    HERO SHARD x10  │ |
|   │   [Forgive missed day] │ |
|   └────────────────────────┘ |
|                              |
|   then chains to:            |
|   (6) Mailbox unread modal   |
|   (7) Free chest claim modal |
|   (8) New event "tap to see" |
|                              |
|   [Skip flush →]             |
+------------------------------+
```

### Components
1. **Logo lockup** — full title with subtitle.
2. **Animated splash** — looping prism / shard particle effect, 5s.
3. **Tap-to-begin / studio credit footer**.
4. **Universal header** (see §0.2).
5. **Daily check-in modal** — 7-day login calendar; today's tile pulses; ad-or-gem forgiveness mechanic for missed days (per `research/monetization/liveops-retention.md` §1.1).
6. **Mailbox flush modal** — `Claim all` for pending mail.
7. **Free chest claim** — daily 24h chest auto-popped.
8. **Event "tap to see" toast** — a one-shot pointer to the Events tab when a new event has launched since last login.

### Tap targets
- Splash: anywhere → advance.
- Today's calendar tile: claim today's reward, plays a 1.2s opening flourish.
- Past day's missed tile: opens forgiveness modal (watch ad / spend 50 gems).
- Future day tile: tooltip-only — `Available in N days`.
- `Skip flush →` (top-right of modal stack): collapses all unclaimed → mailbox.
- Long-press today's tile: previews the day's reward without claiming.

### States
- **Loading** — branded prism loader inside the modal frame; calendar stays empty until network confirms current-day server time.
- **Empty** — never empty by design (day 1 is always claimable).
- **Network failure** — modal shows `Can't reach the Sun right now. Retry / Play offline.` Offline disables claim but allows starting a run; rewards queued.
- **Returner** — if 3+ days lapsed, the 7-day calendar is replaced by a **returner mini-calendar** (5 days, richer rewards) per `research/monetization/liveops-retention.md` §7.

### Deep-links out
- Mailbox modal → Mailbox tab.
- Event toast → Events tab.
- Calendar finale (Day 7) → Heroes tab with the new hero highlighted.

---

## 2. Home / Lobby

The "always come back here" screen. The biggest call-to-action is a single primary button: **Play**. Everything else is satellite.

```
+------------------------------+
| (1) HEADER ────────────────  |
| [av]  ⚡12/30+  💰1.2k+ 💎340+|
|                       ⚙  📬⑤|
|                              |
|  (2) Hero portrait (3D, idle)|
|       Dawnbow                |
|       Lv 24 | Mastery III    |
|                              |
|  (3) Battle Pass banner      |
|   ┌────────────────────────┐ |
|   │ Season 5 · 28d left    │ |
|   │ Tier 12/30  [▣▣▣▣▣...] │ |
|   └────────────────────────┘ |
|                              |
|  (4) Live event teaser strip |
|   [Inferno Vault · 4d 12h →] |
|                              |
|  (5) Free chest tile (24h)   |
|     ┌─────┐                  |
|     │chest│ Ready! [Open]    |
|     └─────┘                  |
|                              |
|  (6)        ┌──────────┐     |
|             │  PLAY ▶  │     |
|             │ Campaign │     |
|             │  Ch.3 R7 │     |
|             └──────────┘     |
|  (7) [Switch mode →]         |
|                              |
|  (8) Daily quests strip      |
|     [□ □ ✓ □ □ □]  [Claim x] |
|                              |
| (9) BOTTOM TABS ─────────────|
| [Home][Heroes][Shop][Events][Guild]
+------------------------------+
```

### Components
1. **Universal header** (§0.2).
2. **Hero portrait** — currently selected hero, 3D, idle animation; tap → Heroes tab on this hero.
3. **Battle Pass banner** — tier progress, days remaining; tap → BP tab.
4. **Live event teaser strip** — single rotating tile showing the next-ending live event; swipe to cycle.
5. **Free chest tile** — daily 24h ad-chest; cooldown timer when claimed.
6. **PLAY button (primary CTA)** — auto-resumes whatever the player did last (mode + chapter); on first session this is "Campaign, Ch 1 R1."
7. **Switch mode** — secondary link → Mode Select.
8. **Daily quests strip** — six tile slots with check marks; long-press to preview, tap claimable to claim.
9. **Bottom tabs**.

### Tap targets
- Hero portrait → Heroes detail on current hero.
- BP banner → Battle Pass tab.
- Event teaser strip → that specific event detail page.
- Free chest tile → open animation, then drop reveal.
- **PLAY** → if energy ≥ cost, go to Pre-Run Loadout for the player's last mode/chapter; if energy < cost, show refill modal.
- Switch mode → Mode Select.
- Quest tile (incomplete) → tooltip with progress; (complete) → claim animation; long-press → quest detail.

### States
- **Loading** — skeleton: header is real, banners show `...` placeholders, PLAY disabled.
- **Empty** — all events ended, no BP active (off-season): replaces the banner strip with `Season 6 begins in 2d 4h — pre-purchase available.`
- **Network failure** — header shows a small offline cloud icon. PLAY stays enabled (offline runs are queued).
- **Returner (≥3 days)** — bottom strip is replaced by the comeback offer ladder per `research/monetization/liveops-retention.md` §7.

### Deep-links out
- BP banner → Battle Pass tab.
- Event teaser → Events tab → specific event.
- Quest claim → if last quest claimed completes a tier → BP claim animation → BP tab.
- Mailbox badge → Mailbox modal.
- PLAY → Pre-Run Loadout.

---

## 3. Mode Select

Reached from the `Switch mode →` link. Modes laid out as a 2-column grid for thumb scan. Locked modes visible.

```
+------------------------------+
| (1) HEADER                   |
|                              |
|  ← Select Mode               |
|                              |
| ┌──────────┐  ┌──────────┐   |
| │(2) CAMP. │  │(3) TOWER │   |
| │ ⚡ 6     │  │ ⚡ 3     │   |
| │ Ch 3 R 7 │  │ Floor 42 │   |
| │ [PLAY]   │  │ [PLAY]   │   |
| └──────────┘  └──────────┘   |
|                              |
| ┌──────────┐  ┌──────────┐   |
| │(4) SURVIV│  │(5) DAILY │   |
| │ ⚡ 4     │  │ ⚡ 0     │   |
| │ Best 8:12│  │ 3/3 left │   |
| │ [PLAY]   │  │ [PLAY]   │   |
| └──────────┘  └──────────┘   |
|                              |
| ┌──────────┐  ┌──────────┐   |
| │(6) PVP   │  │(7) EVENTS│   |
| │ ⚡ 0     │  │ 🔴 NEW   │   |
| │ Gold III │  │ 4 live   │   |
| │ [PLAY]   │  │ [VIEW]   │   |
| └──────────┘  └──────────┘   |
|                              |
| (8) Energy refill row        |
|     ⚡ 12/30   Next +1 in 8m |
|     [Watch ad +5] [Buy +30] |
|                              |
| BOTTOM TABS                  |
+------------------------------+
```

### Components
1. **Header** + back chevron.
2. **Campaign tile** — energy cost, current chapter/room progress.
3. **Tower tile** — energy cost, highest floor cleared.
4. **Survival tile** — energy cost, best time.
5. **Daily Dungeon tile** — free, attempts remaining.
6. **PvP tile** — free, current rank tier.
7. **Events tile** — count of live events; red-dot if new since last visit.
8. **Energy refill row** — current energy, regen timer, ad refill, gem refill.

### Tap targets
- Any mode tile (unlocked + enough energy) → Pre-Run Loadout for that mode.
- Mode tile (unlocked, not enough energy) → energy refill modal.
- Mode tile (locked) → tooltip `Unlocks at Account Lv N` and a pointer to the prerequisite.
- Energy `Watch ad +5` → ad mediation flow → +5 toast.
- Energy `Buy +30` → gem-cost confirm modal.

### States
- **Loading** — tile content as skeletons.
- **Empty** — no locked or unavailable variant; this screen never empties.
- **Network failure** — PvP and Events tiles grey out (require network); Campaign/Tower/Survival/Daily remain available (offline-capable).

### Deep-links out
- Pre-Run Loadout (any mode).
- Events tab.
- Energy refill modal → gem store if player declines ad and doesn't have 50 gems.

---

## 4. Chapter Map

Reached when the player taps Campaign from Mode Select. The 7-realm map per `design/05-launch-scope.md`.

```
+------------------------------+
| (1) HEADER                   |
|                              |
|  ← The 7 Realms              |
|                              |
| (2) Map canvas (pannable)    |
|                              |
|   ⓵ The Vale ✓✓✓★            |
|        \                     |
|         ⓶ Sunken Cathedral   |
|              ✓★              |
|             /                |
|     ⓷ Frostspire (current)   |
|         R 7/20  ←—— player    |
|             \                |
|              ⓸ Emberforge 🔒  |
|                  Lv 18 req   |
|                              |
|              ⓹ ⓺ ⓻  (fogged) |
|                              |
| (3) Realm detail card        |
|   ┌────────────────────────┐ |
|   │ Frostspire             │ |
|   │ Room 7 of 20           │ |
|   │ Best: floor cleared 2× │ |
|   │ Boss: Lord Hollowfrost │ |
|   │ ⚡ 6   [CONTINUE ▶]    │ |
|   └────────────────────────┘ |
|                              |
| (4) Difficulty selector      |
|   [Normal] [Hard 🔒] [Heroic🔒]|
|                              |
| BOTTOM TABS                  |
+------------------------------+
```

### Components
1. **Header**.
2. **Map canvas** — pannable, pinch-zoom; nodes drawn as ornate iconic realms with connecting paths.
3. **Realm detail card** (bottom sheet) — info on the tapped realm, primary CTA.
4. **Difficulty selector** — Normal / Hard / Heroic; Hard unlocks at chapter-cleared, Heroic at all-chapter-cleared.

### Tap targets
- Realm node → updates detail card.
- Detail-card CTA → Pre-Run Loadout for the selected realm.
- Difficulty pill → switch difficulty (locked → tooltip).
- Map background → pan/zoom only.
- Long-press a beaten realm → see best-clear time, drops obtained, stars earned.

### States
- **Loading** — map renders, but stars and progress as `...` until save sync completes.
- **Empty** — never empty (Realm 1 always exists).
- **Network failure** — uses last-cached progress; toast `Showing offline progress, may not reflect recent runs.`

### Deep-links out
- Pre-Run Loadout for selected realm.
- Heroes tab if player taps "Hero too low" hint from a realm with a level recommendation gate.

---

## 5. Pre-Run Loadout

The contract screen. The player locks in hero, gear, sigils, spirit, abilities before tapping START. Everything modifiable from here.

```
+------------------------------+
| (1) HEADER                   |
|                              |
|  ← Loadout — Frostspire R7   |
|                              |
| (2) Hero card (large)        |
|   ┌────────────────────────┐ |
|   │  [Dawnbow 3D bust]     │ |
|   │  Lv 24 · Mastery III   │ |
|   │  ATK 1.4k  HP 8.2k     │ |
|   │  [Swap hero →]         │ |
|   └────────────────────────┘ |
|                              |
| (3) Gear bar (6 slots)       |
|   [W][H][A][R][L][B]         |
|   Tap any → swap             |
|                              |
| (4) Sigils row (3 slots)     |
|   [S1][S2][S3]               |
|                              |
| (5) Spirit slot              |
|   [Spirit] Wren · Lv 6       |
|                              |
| (6) Active ability + ult     |
|   Active: Phase Dash         |
|   Ultimate: Sunburst         |
|                              |
| (7) Power Score: 18,420 ↑    |
|                              |
| (8) Pre-run buffs            |
|   Privilege Card: +10% gold  |
|   Set bonus: Sun's Ascent 2pc|
|                              |
| (9) ┌───────────────────┐    |
|     │ START ▶  ⚡ -6    │    |
|     └───────────────────┘    |
|                              |
| BOTTOM TABS                  |
+------------------------------+
```

### Components
1. **Header**.
2. **Hero card** — current hero, level, mastery, headline stats, swap link to Heroes tab.
3. **Gear bar** — 6 slot icons (Weapon, Helm, Armor, Ring, Locket, Bracelet) per `design/04-progression-and-economy.md` §2.
4. **Sigils row** — 3 rune slots.
5. **Spirit slot** — 1 active pet.
6. **Active + ultimate** — the tap-trigger abilities for this hero.
7. **Power Score** — aggregated combat rating; arrow up if greater than last run.
8. **Pre-run buffs strip** — subscription, set, event modifiers stacked here for transparency.
9. **START button** — energy cost overlaid; haptic + audio on tap.

### Tap targets
- Hero card → Heroes tab with swap filter pre-applied.
- Any gear slot → Equipment tab with slot pre-filtered.
- Sigil slot → Sigils sub-screen (in Heroes tab).
- Spirit slot → Spirits sub-screen.
- Active/ultimate row → ability detail (read-only here; configuration lives on hero detail).
- Power Score → tooltip breakdown by source layer.
- START → if energy sufficient, enter run; if not, refill modal.

### States
- **Loading** — gear icons load progressively; START disabled until full hydration.
- **Empty** — empty slots render as ghosted outlines with `Equip` ghost-text; allowed (player can run without a full kit).
- **Network failure** — START still works for offline modes (Campaign/Tower/Survival/Daily). PvP loadout requires online.

### Deep-links out
- Heroes / Equipment / Sigils / Spirits sub-screens.
- Energy refill modal.

---

## 6. In-Run HUD

The screen that matters. Per Pillar 1, controls are: joystick (left or right, player-config), one tap-trigger active button (opposite corner), pause (top-right). No mini-map.

```
+------------------------------+
| (1) HP bar ████████░░░░ 612/812
| (2) ⏸  Floor 3 · R 8/20  ⚙   |
|                              |
|       (3) Gold ticker  💰 412|
|                              |
| (4) Ability icons (stacked)  |
|     [⚡][↺][✦][✦][✦][✦][✦]   |
|     7 picks deep             |
|                              |
|                              |
|                              |
|     (5) Arena play surface   |
|                              |
|     [hero]      [enemy]      |
|                              |
|     telegraph red ring       |
|                              |
|                              |
|                              |
|                              |
| (6) ULT meter ██████░░ 78%   |
|                              |
| (7) Joystick     (8) ULT     |
|   ⊙                  ⚡      |
+------------------------------+
```

### Components
1. **HP bar** — top edge, color shifts red below 30%, segmented at every 1k HP threshold so big-HP heroes are readable.
2. **Pause + run info** — pause icon, floor / room counter, settings cog (in-run audio + reduced motion).
3. **Gold ticker** — bottom-right of header; small particle-stream when picking up gold orbs.
4. **Ability stack** — horizontally scrolling row of acquired ability icons, capped at 7 visible (scroll to see more). Newest pick highlighted for 3 seconds.
5. **Arena play surface** — the actual playable area, ~70% of vertical real estate. No HUD overlays this region except the HP bar.
6. **Ult meter** — fills with damage dealt + time-on-screen; when full, the ult button pulses.
7. **Joystick** (player-config left or right) — 88pt touch radius, sticky-thumb tracking with a 20pt dead-zone.
8. **Ult / active button** — opposite corner; greyed when meter not full, pulses ready.

**No mini-map.** Decision rationale: per Pillar 8, screen real estate is sacred in portrait; a mini-map would consume telegraph-readability area, and rooms are small enough that a mini-map adds no information. The room-counter (component 2) tells the player where they are in the floor. Survivor.io and Archero 2 also ship without mini-maps for the same reason.

### Tap targets
- Pause → in-run pause sheet (resume / settings / quit-run with confirm).
- Joystick → move; release to root-and-fire.
- Ult button → cast active when ready, soft-deny haptic when not.
- Ability icon → long-press to read the description (in-run, pauses briefly).
- HP bar → no tap action.

### States
- **Loading** — pre-run room transition shows a 0.4s wipe; HUD elements fade in. Joystick disabled for 200ms after fade to prevent double-input.
- **Empty** — N/A.
- **Network failure** — runs are local; on network loss the run continues silently. Reward sync deferred to end-of-run.
- **Revive prompt** — on death, fullscreen modal: `Watch ad to revive — full HP, 1 use per run` + `Spend 30 gems` + `End run`. Capped at 2 revives/run per `design/04-progression-and-economy.md` §6.

### Deep-links out
- Quit-run-with-confirm → Home (forfeits in-run rewards).
- End-of-run summary (auto, on victory / final death).

---

## 7. Ability Pick

The 3-card draft. Appears between rooms. The "I built a build" decision moment per Pillar 2.

```
+------------------------------+
| (1) Banner: Pick an Ability  |
| (2) Run buff strip           |
|     7 abilities · build:     |
|     ⚡ Multishot · ✦ Bounce  |
|                              |
| (3) Cards (3 across, large)  |
|  ┌────┐  ┌────┐  ┌────┐      |
|  │ R  │  │ E  │  │ R  │      |
|  │ FX │  │ FX │  │ FX │      |
|  │name│  │name│  │name│      |
|  │desc│  │desc│  │desc│      |
|  │ +1 │  │+arc│  │+pen│      |
|  └────┘  └────┘  └────┘      |
|                              |
| (4) Synergy hint             |
|   [E] would awaken your kit  |
|   into "Sunsplitter Arrow"   |
|   (only if hidden — see ↓)   |
|                              |
| (5) Reroll: 💰 120  [Reroll] |
|     1 free reroll this room  |
|                              |
| (6) Skip for reward          |
|     [Skip → +50 gold / +1 HP]|
|                              |
+------------------------------+
```

### Components
1. **Banner** — `Pick an Ability` with a soft animated frame.
2. **Run buff strip** — what the player already has, scrollable; helps inform the pick.
3. **3 cards** — drawn with rarity-coded frames (white/green/blue/purple/orange/red for Common→Chaos). Big enough that card art and text are legible without zoom.
4. **Synergy hint** — appears only when one of the cards completes a known recipe; **for hidden Awakened recipes** the hint is suppressed (Pillar 7 — hidden weapon evolutions, Survivor.io style). The hint is shown only for the **named build archetypes** the player has already discovered or for explicitly-revealed synergies.
5. **Reroll** — gold-cost reroll; first reroll free per room.
6. **Skip for reward** — small gold or HP reward in exchange for declining all three; introduced via tutorial in FTUE day 1.

### Tap targets
- Tap card → tap a second time within 2s to confirm; double-tap-to-confirm prevents thumb-skid mistakes on the most consequential decision in the run.
- Long-press card → expanded description.
- Reroll → spend free or gold, redraw the 3.
- Skip → reward + advance.

### States
- **Loading** — N/A (the cards are drawn locally; no network round-trip).
- **Empty** — never empty; pool always returns 3.
- **Network failure** — no impact, this is offline-safe.

### Deep-links out
- Returns to in-run HUD with the picked ability added.

---

## 8. Shop (in-run)

The Room 10 stop, per `design/01-core-loop-spec.md` §3. Spend in-run gold.

```
+------------------------------+
| (1) Banner: Shopkeeper       |
| (2) Gold on hand: 💰 612     |
|                              |
| (3) Three item stands        |
|  ┌────┐  ┌────┐  ┌────┐      |
|  │item│  │item│  │item│      |
|  │ R  │  │ E  │  │ R  │      |
|  │name│  │name│  │name│      |
|  │💰120│  │💰340│  │💰180│   |
|  └────┘  └────┘  └────┘      |
|                              |
| (4) Heal stand               |
|  ┌────────────────────────┐  |
|  │   HEAL +25% HP          │  |
|  │   💰 200  [Heal]        │  |
|  └────────────────────────┘  |
|                              |
| (5) Reroll the shop          |
|     💰 100  [Reroll]         |
|                              |
| (6) [Leave Shop →]           |
|                              |
+------------------------------+
```

### Components
1. **Banner**.
2. **Current gold display** — big and central.
3. **3 item stands** — abilities or temporary buffs.
4. **Heal stand** — 25% max HP refill.
5. **Reroll** — gold cost to refresh the offer.
6. **Leave Shop** — exits to next room.

### Tap targets
- Item stand → confirm purchase; greyed if insufficient gold.
- Heal stand → confirm purchase.
- Reroll → refresh the 3 item stands (heal stays).
- Leave Shop → advance.

### States, deep-links — same as Ability Pick; entirely offline-safe, no exits.

---

## 9. End-of-Run Summary

The dopamine cash-out. The x2-rewards-via-ad button is the single highest-CTR ad surface in the game.

```
+------------------------------+
|                              |
| (1) "VICTORY"  / "DEFEATED"  |
|                              |
| (2) Run stats card           |
|  ┌────────────────────────┐  |
|  │ Time:        8:42       │  |
|  │ Rooms:       18/20      │  |
|  │ Kills:       142        │  |
|  │ Best build: Sunsplitter │  |
|  └────────────────────────┘  |
|                              |
| (3) Rewards card             |
|  ┌────────────────────────┐  |
|  │ XP    +1,820            │  |
|  │ Gold  +2,450            │  |
|  │ Embers +18              │  |
|  │ Drops (3):              │  |
|  │  - Sun Bracelet [E]     │  |
|  │  - Sigil Dust x8        │  |
|  │  - Chest of the Dawn    │  |
|  └────────────────────────┘  |
|                              |
| (4) BIG AD BUTTON            |
|  ┌────────────────────────┐  |
|  │ ▶ Watch — DOUBLE all    │  |
|  │   gold + drops          │  |
|  └────────────────────────┘  |
|                              |
| (5) Quest progress           |
|   Daily: 4/6 ✓✓✓✓□□           |
|   BP XP: +120 → Tier 13 (next)|
|                              |
| (6) [Run Again]  [Home]      |
|                              |
+------------------------------+
```

### Components
1. **Result banner** — Victory or Defeated; haptic + audio sting.
2. **Run stats card** — time, rooms cleared, kills, named-archetype detected.
3. **Rewards card** — XP, gold, embers, drops.
4. **2× rewards ad button** — primary action, large, pulses for 5s then settles.
5. **Quest + BP progress strip** — what this run did for the meta layer.
6. **Run Again / Home** — Run Again returns to Pre-Run Loadout pre-filled; Home returns to lobby.

### Tap targets
- Ad button → mediation → on success, animate rewards doubling; on fail, soft toast `Ad unavailable — rewards already claimed.`
- Run Again → Pre-Run Loadout (re-charges energy cost).
- Home → Home / Lobby.
- Drop row → tap a drop to see detail; long-press to equip directly.

### States
- **Loading** — rewards card placeholder while server confirms drops (anti-cheat); shows skeleton then fills.
- **Empty** — Defeated runs still pay partial rewards; the rewards card is never empty.
- **Network failure** — local-tally rewards shown, sync deferred; small offline icon on the card.

### Deep-links out
- Pre-Run Loadout (Run Again).
- Home.
- Mailbox (if a milestone reward dropped).

---

## 10. Heroes Tab

Roster grid + per-hero detail. The tab is two layers: roster overview at top, then a sticky detail panel below.

```
+------------------------------+
| (1) HEADER                   |
|                              |
|  Heroes                      |
| (2) Filter pills             |
| [All] [Free] [Banner] [Owned]|
|                              |
| (3) Roster grid (4-wide)     |
|  ┌──┐ ┌──┐ ┌──┐ ┌──┐         |
|  │D │ │W │ │E │ │F │         |
|  │L24│ │L18│ │L12│ │L9 │     |
|  └──┘ └──┘ └──┘ └──┘         |
|  ┌──┐ ┌──┐ ┌──┐ ┌──┐         |
|  │? │ │? │ │? │ │? │         |
|  │🔒 │ │🔒 │ │🔒 │ │🔒 │     |
|  └──┘ └──┘ └──┘ └──┘         |
|                              |
| (4) Detail panel (selected)  |
|  ┌────────────────────────┐  |
|  │ [Dawnbow 3D]   ATK 1.4k │  |
|  │ Lv 24 / Mastery III     │  |
|  │ Asc ★★☆☆☆               │  |
|  │ Sub-tabs:                │  |
|  │  [Equip][Insc][Sigil][Sp]│  |
|  │                          │  |
|  │ Equipped passive abilities│  |
|  │  - Phase Dash            │  |
|  │  - Sunburst (ult)        │  |
|  │                          │  |
|  │  [Level up: 120 XP]      │  |
|  │  [Ascend: need 30 shards]│  |
|  └────────────────────────┘  |
|                              |
| BOTTOM TABS                  |
+------------------------------+
```

### Components
1. **Header**.
2. **Filter pills** — quick scope.
3. **Roster grid** — 4-wide, owned heroes first, locked heroes greyed but visible.
4. **Detail panel** — sticky beneath the grid; sub-tabs for Equip / Inscription / Sigils / Spirits hand off to dedicated sub-screens.

### Tap targets
- Hero tile → updates detail panel; double-tap → set as active hero.
- Sub-tab → Equipment / Inscription / Sigils / Spirits tab on this hero.
- Level up button → confirm modal with cost; haptic on level.
- Ascend button → Ascension modal (with shard count, star preview).
- Locked tile → tooltip with unlock condition.

### States
- **Loading** — roster tiles as skeletons.
- **Empty** — never (one hero always granted at FTUE).
- **Network failure** — last-cached roster shown; level-up/ascend disabled until reconnect.

### Deep-links out
- Equipment tab (filtered to this hero).
- Inscription tab (per-hero scope).
- Sigils sub-screen.
- Spirits sub-screen.
- Shop tab → Hero-buy SKU for locked heroes (with FOMO countdown if banner-active).

---

## 11. Equipment Tab

Bag + slots + actions. Six gear slots, the long-tail "verbs": equip, upgrade, fuse, enchant, reforge, salvage.

```
+------------------------------+
| (1) HEADER                   |
|                              |
|  ← Equipment · Dawnbow       |
|                              |
| (2) Equipped slots strip     |
| [W ★3][H ★2][A ★2][R ★1][L ☐][B ★4]
| (tap any → focus)            |
|                              |
| (3) Bag grid (scrollable)    |
|  ┌──┐ ┌──┐ ┌──┐ ┌──┐         |
|  │W3│ │H2│ │A1│ │L4│         |
|  │ E│ │ R│ │ C│ │ L│         |
|  └──┘ └──┘ └──┘ └──┘         |
|  ┌──┐ ┌──┐ ...               |
|                              |
| (4) Detail card (selected)   |
|  ┌────────────────────────┐  |
|  │ Sun Bracelet [Epic +4]  │  |
|  │ ATK +18%                 │  |
|  │ Set: Sun's Ascent 1/4    │  |
|  │ Substats: Crit +4%       │  |
|  │                          │  |
|  │ Actions:                 │  |
|  │  [Equip] [Upgrade]       │  |
|  │  [Fuse] [Enchant]        │  |
|  │  [Reforge] [Salvage]     │  |
|  └────────────────────────┘  |
|                              |
| (5) Multi-select bar         |
|   [Select] [Salvage all C/R] |
|                              |
| BOTTOM TABS                  |
+------------------------------+
```

### Components
1. **Header** + back to Heroes.
2. **Equipped slots strip** — current 6 pieces with rarity star count.
3. **Bag grid** — owned, sorted by rarity then slot, filter chips above (not drawn).
4. **Detail card** — full piece info + 6 action buttons.
5. **Multi-select bar** — bulk salvage for trash, the "I dread inventory management" guardrail.

### Tap targets
- Slot tile → bag filters to that slot.
- Bag tile → updates detail card; double-tap → Equip.
- Action buttons each open their own modal (Upgrade, Fuse, Enchant, Reforge, Salvage all have distinct confirmation flows with cost preview).
- Select → enters multi-select mode; tiles get checkboxes; Salvage all C/R is the safe bulk default.

### States
- **Loading** — bag fades in.
- **Empty** — bag empty → `Run a chapter to find your first gear` with a deep-link to Campaign.
- **Network failure** — read-only; all actions disabled with `Reconnect to make changes` banner.

### Deep-links out
- Heroes tab (back).
- Campaign (when empty).

---

## 12. Inscription (Talents) Tab

Flat 5×4 grid per `design/04-progression-and-economy.md` §2. Each node has 20 levels at launch.

```
+------------------------------+
| (1) HEADER                   |
|                              |
|  ← Inscription                |
|                              |
| (2) Pillar / build summary   |
|   Path power: +14.2%         |
|   Points spent: 22/80         |
|                              |
| (3) 5×4 node grid             |
|  ┌──┐┌──┐┌──┐┌──┐┌──┐         |
|  │A4││B3││C0││D7││E2│         |
|  └──┘└──┘└──┘└──┘└──┘         |
|  ┌──┐┌──┐┌──┐┌──┐┌──┐         |
|  │F1││G0││H5││I0││J3│         |
|  └──┘└──┘└──┘└──┘└──┘         |
|  ┌──┐┌──┐┌──┐┌──┐┌──┐         |
|  │K0││L0││M2││N0││O0│         |
|  └──┘└──┘└──┘└──┘└──┘         |
|  ┌──┐┌──┐┌──┐┌──┐┌──┐         |
|  │P0││Q0││R0││S0││T0│         |
|  └──┘└──┘└──┘└──┘└──┘         |
|                              |
| (4) Node detail card          |
|  ┌────────────────────────┐  |
|  │ Crit Bloom — Lv 5/20    │  |
|  │ +0.5% crit per level     │  |
|  │ Next: +0.5% crit         │  |
|  │ Cost: 💰 1,200            │  |
|  │ [Upgrade]                │  |
|  └────────────────────────┘  |
|                              |
| (5) Reset button (gem cost)   |
|                              |
| BOTTOM TABS                  |
+------------------------------+
```

### Components
1. **Header**.
2. **Summary** — total spent, total power lift.
3. **5×4 grid** — flat by design (Pillar 3: long ladders, not branching trees).
4. **Node detail** — current level / max, next-level delta, cost to upgrade.
5. **Reset button** — full grid reset for gem cost (gated to prevent rage-resets).

### Tap targets
- Node → detail card updates.
- Upgrade → confirm + haptic; long-press → max-affordable upgrade (with confirm).
- Reset → modal with cost preview + double-confirm.

### States
- **Loading** — grid as skeletons.
- **Empty** — all nodes at Lv 0 → `Tap a node to start your build` ghost-text.
- **Network failure** — read-only.

### Deep-links out
- None outbound; this is a destination tab.

---

## 13. Shop Tab

Per `design/04-progression-and-economy.md` §5. Daily Deal, Premium Deal, Gem Packs, Starter Pack, Monthly Card, Privilege Card, Hero-buy. The compliance-with-restraint screen.

```
+------------------------------+
| (1) HEADER                   |
|                              |
|  Shop                        |
| (2) Sub-tabs                 |
| [Featured][Gems][Cards][Heroes][Gacha]
|                              |
| (3) Daily Deal (top)         |
|  ┌────────────────────────┐  |
|  │ DAILY DEAL · 14h left   │  |
|  │ 500 gems + chest x2     │  |
|  │ $0.99   [Buy]            │  |
|  └────────────────────────┘  |
|                              |
| (4) Premium Deal              |
|  ┌────────────────────────┐  |
|  │ DAILY PREMIUM · 14h     │  |
|  │ 2,000 gems + 10× pull   │  |
|  │ $2.99   [Buy]            │  |
|  └────────────────────────┘  |
|                              |
| (5) Starter Pack (one-time)   |
|  ┌────────────────────────┐  |
|  │ BEACON PACK · 36h left  │  |
|  │ ▸ One-time only         │  |
|  │ $0.99   [Buy]            │  |
|  └────────────────────────┘  |
|                              |
| (6) Monthly Card              |
|  ┌────────────────────────┐  |
|  │ MONTHLY CARD            │  |
|  │ +200 instant +100/day   │  |
|  │ $9.99   [Subscribe]     │  |
|  └────────────────────────┘  |
|                              |
| (7) Privilege Card            |
|                              |
| (8) Gem packs (scrolling row) |
|   [$0.99][$4.99][$9.99]...   |
|   "+ First-buy doubler" tag  |
|                              |
| (9) Hero-buy SKU              |
|   Featured: Pyrelaurel        |
|   $39.99 (BP-Hero)           |
|                              |
| (10) Gacha banner entry       |
|    Current: Wish of the Dawn  |
|    Rates: [Tap to view]       |
|                              |
| BOTTOM TABS                  |
+------------------------------+
```

### Components
1. **Header**.
2. **Sub-tabs** — Featured / Gems / Cards / Heroes / Gacha. Featured is the default landing.
3. **Daily Deal** — $0.99, 24h.
4. **Premium Deal** — $2.99, 24h.
5. **Beacon Pack** — one-time starter, 48h account-life timer.
6. **Monthly Card** — $9.99 evergreen anchor.
7. **Privilege Card** — $4.99 subscription.
8. **Gem packs row** — $0.99 → $99.99 horizontal scroll, with first-buy doubler flag.
9. **Hero-buy SKU** — current season's BP-hero direct buy.
10. **Gacha banner** — entry with rates link (compliance: rates visible from gacha entry per `design/04-progression-and-economy.md` §7).

### Tap targets
- Any `Buy` / `Subscribe` → StoreKit purchase confirmation.
- Pack tile → expanded detail (contents listed).
- Gem packs row → scroll horizontally; tap → buy.
- Hero-buy → season hero detail with pull-history if banner active.
- Gacha entry → Gacha screen.
- Rates link → Gacha rates modal (legal compliance surface).

### States
- **Loading** — skeleton.
- **Empty** — Beacon Pack disappears after first purchase, Daily Deals always present.
- **Network failure** — full screen `Shop unavailable offline. Reconnect to view offers.`

### Deep-links out
- Gacha screen.
- BP tab (via the BP-Hero card).

---

## 14. Battle Pass Tab

Per Pillar 4 and `research/monetization/liveops-retention.md` §3. Free + Premium tracks side-by-side. 30 tiers, 45-day season.

```
+------------------------------+
| (1) HEADER                   |
|                              |
|  Battle Pass · Season 5      |
| (2) Days remaining: 28d 4h   |
| (3) Tier progress: 12/30      |
|     XP: 240/500 to T13       |
|                              |
| (4) Season hero showcase     |
|  ┌────────────────────────┐  |
|  │ [Pyrelaurel 3D]         │  |
|  │ Unlock at Tier 25 (free)│  |
|  │ Or direct: $39.99       │  |
|  └────────────────────────┘  |
|                              |
| (5) Track view (scrollable)  |
|                              |
|  Tier 10 11 12 13 14 ...     |
|  Free  ✓  ✓  ✓  □  □   ...    |
|  Prem  ✓  ✓  ✓  □  □   ...    |
|                              |
|  Detail per tier (tap):       |
|  ┌────────────────────────┐  |
|  │ Tier 13                 │  |
|  │ Free: 100 gems          │  |
|  │ Prem: 500 gems + skin   │  |
|  └────────────────────────┘  |
|                              |
| (6) Upgrade CTAs              |
|   [Lite $4.99] [Premium $14.99]
|   [BP Hero $39.99]            |
|                              |
| (7) Tier-skip                 |
|   Skip to T15: 💎 250         |
|                              |
| (8) Season story (subdued)    |
|                              |
| BOTTOM TABS                  |
+------------------------------+
```

### Components
1. **Header**.
2. **Days remaining** — countdown; turns amber at 48h per §0.4.
3. **Tier progress strip**.
4. **Season hero showcase** — the headline reward at the top.
5. **Track view** — Free row + Premium row, scrollable; tap a tier → detail card pops above.
6. **Upgrade CTAs** — three tiers of pass purchase.
7. **Tier-skip** — per-tier or bulk gem skip.
8. **Season story** — 3–5 cutscene panels released at tier 5/10/15/20/30 milestones; subdued strip.

### Tap targets
- Tier tile → detail.
- Claim button per tier → claim animation.
- Lite / Premium / BP-Hero → StoreKit purchase.
- Tier-skip → confirm + StoreKit gem confirm.
- Story panel → fullscreen viewer.

### States
- **Loading** — track placeholder.
- **Empty** — between seasons → `Season 6 begins in 2d` with pre-purchase CTA.
- **Network failure** — read-only.

### Deep-links out
- Shop tab (purchase failures bounce to gem store).

---

## 15. Events Tab

The single highest-risk screen on the app. **Hard rule: max 4 cards visible.** Paginate at 5+ per Pillar 4 and the Archero-2-clutter warning in `research/monetization/liveops-retention.md`.

```
+------------------------------+
| (1) HEADER                   |
|                              |
|  Events                      |
|  (2) "4 live · 1 ending soon"|
|                              |
| (3) Card 1 (largest, ending) |
|  ┌────────────────────────┐  |
|  │ INFERNO VAULT           │  |
|  │ Time-limited dungeon    │  |
|  │ ⏱ 4h 12m  🔴 ENDING     │  |
|  │ [Enter →]                │  |
|  └────────────────────────┘  |
|                              |
| (4) Card 2                    |
|  ┌────────────────────────┐  |
|  │ DEMON KING CLASH        │  |
|  │ 14-day banner event     │  |
|  │ ⏱ 8d 2h                  │  |
|  │ [Enter →]                │  |
|  └────────────────────────┘  |
|                              |
| (5) Card 3                    |
|  ┌────────────────────────┐  |
|  │ CHECKPOINT MARATHON     │  |
|  │ Passive progress event  │  |
|  │ ⏱ 11d                    │  |
|  │ [Enter →]                │  |
|  └────────────────────────┘  |
|                              |
| (6) Card 4                    |
|  ┌────────────────────────┐  |
|  │ WEEKLY TOURNAMENT       │  |
|  │ 3d                       │  |
|  │ [Enter →]                │  |
|  └────────────────────────┘  |
|                              |
| (7) [● ○]  page dots if 5+   |
|                              |
| BOTTOM TABS                  |
+------------------------------+
```

### Components
1. **Header**.
2. **Summary line** — count of live events; flags the soonest-ending.
3–6. **Event cards** — exactly 4 visible. Cards are ordered: ending-soonest first, then by personal-relevance score (have I engaged with this event already? am I in a guild for guild-events? etc.), then by start-recency.
7. **Page dots** — only render when ≥5 events live. Swipe horizontally for page 2. Pages are capped at 4 cards each. Per Pillar 4 we never have more than 8 live concurrently, so a max of 2 pages.

### Tap targets
- Card → event detail (rules, rewards, leaderboard, entry tickets).
- Card long-press → quick-summary tooltip with reward preview.
- Page dot → jump.

### States
- **Loading** — card skeletons.
- **Empty** — no live events (rare; should not occur post-launch per LiveOps calendar) → `New events drop daily — check back soon` with a deep-link to the BP tab as a consolation surface.
- **Network failure** — last-cached event list shown with a `Showing offline event list` toast; entry disabled.

### Deep-links out
- Event-specific detail screens (designed per event, not catalogued here).

---

## 16. Guild Tab

Per Pillar 6 and `research/monetization/liveops-retention.md` §5. Chat, members, donations, weekly boss.

```
+------------------------------+
| (1) HEADER                   |
|                              |
|  Sunward Wardens · Lv 6      |
|  (2) Member: 27/30 · Rank 142|
|                              |
| (3) Sub-tabs                 |
| [Chat][Members][Donate][Boss]|
|                              |
| (4) Default: Chat            |
|  ┌────────────────────────┐  |
|  │ [icon] Lumi: hi all     │  |
|  │ [icon] Vex: boss at 60% │  |
|  │ [icon] (system) Lumi    │  |
|  │        joined the guild │  |
|  │ ...                      │  |
|  └────────────────────────┘  |
|  (5) [type message...] [↑]   |
|                              |
| (6) Donate sub-tab            |
|   Daily donation: 3/5 done    |
|   [Donate 💰 100]             |
|   [Donate 💎 10]               |
|                              |
| (7) Boss sub-tab              |
|   Weekly Boss · Wyrmking      |
|   HP: ████░░░░ 45%            |
|   Attempts: 3/10 today        |
|   Damage tiers:                |
|    5M ✓  25M □  100M □        |
|   [Fight →]                   |
|                              |
| BOTTOM TABS                  |
+------------------------------+
```

### Components
1. **Header**.
2. **Guild summary** — name, level, members, leaderboard rank.
3. **Sub-tabs** — Chat / Members / Donate / Boss.
4. **Chat** — guild channel.
5. **Chat composer** + emoji/sticker.
6. **Donate** — daily gold / gem donations with a guild-tracker.
7. **Boss** — weekly boss tile with damage-tier rewards and remaining attempts.

### Tap targets
- Sub-tab → switch view.
- Chat message → long-press for member profile (gift / mute / report).
- Chat composer → keyboard.
- Donate button → confirm.
- Fight → Pre-Run Loadout for the boss with the boss enemy pre-loaded.
- Member row (in Members sub-tab) → profile sheet with gift / promote / kick (leader only).

### States
- **Loading** — chat skeleton, sub-tabs disabled.
- **Empty (no guild)** — guildless replacement screen: `Join or create a guild` with a guild-finder list and a `Create new (250 gems)` CTA.
- **Network failure** — Chat shows the last-loaded messages with a `Reconnecting...` strip; Donate and Boss disabled.

### Deep-links out
- Pre-Run Loadout (Fight).
- Heroes tab (member profile inspect).

---

## 17. Cross-Cutting Notes

### 17.1 Concurrent LiveOps surface count

At any moment a typical day-30 player faces:

1. Daily quests strip on Home (always-on).
2. Battle Pass banner on Home + Battle Pass tab.
3. Weekly missions (surfaced inside the Events tab as one of the 4 cards, or as a sub-strip on Home).
4. At least one special event card on the Events tab.

That's 4 concurrent surfaces — the Pillar-4 minimum. We can ramp to 6 visible (Home quest strip, BP banner, Home event teaser, Events tab cards × 4) without crowding **any one tab** beyond comfort. The Events tab itself never shows more than 4 cards on a page — that's the hard restraint we're paying to keep.

### 17.2 The biggest UX risk we spotted

**The Heroes-tab-as-mega-router problem.** Heroes is the entry point to Equipment, Inscription, Sigils, Spirits, level-up, and ascension — six destinations behind one tab via sub-tabs. If any one of these grows post-launch (Sigils is designed to), the Heroes tab risks becoming the new Events tab: overloaded, intimidating, hostile to new players. Mitigations baked in: the detail panel only exposes the four sub-tabs after the player owns ≥2 heroes (day 1 it's a single Level-up button); sub-tabs unlock progressively as features unlock; and the top-level filter pills add an `Equipped` filter at account level 10 so the working set narrows automatically. Re-evaluate if any sub-screen accumulates ≥6 verbs.

### 17.3 Universal modal stack rules

The daily-flush splash (§1) is the only place we chain modals. Everywhere else: **one modal at a time, dismissible by tapping outside or swipe-down.** No nested confirms; one decision per modal. The pause sheet during in-run is the explicit exception (resume / settings / quit-run all live in one modal because we want to preempt accidental quits).

### 17.4 Haptic catalog

Light impact on every button tap. Medium impact on ability-pick confirm and daily-check-in claim. Sharp double-tick on level-up and BP tier-up. Heavy impact + warm rumble (length scales with rarity) on Rare → Legendary → Mythic drops. Sustained warm rumble on boss defeat. Single sharp impact on death. Soft three-buzz pattern on network error. All haptics respect both the iOS system "Reduce Haptics" toggle and our in-game accessibility toggle.

### 17.5 Color and shape discipline

Per Pillar 8, telegraph color and shape map is fixed for the lifetime of the game:

| Color | Shape | Meaning |
|---|---|---|
| Red | filled circle / sector | Damage AoE (incoming) |
| Yellow | hard line | Damage line attack (incoming) |
| Blue | dashed ring | Friendly aura (heal, buff) |
| Green | upward arrow | Heal pickup / friendly projectile |
| Indigo (Lucent) | prismatic shimmer | Lucent / ability / hero-unique FX |

In color-blind mode, the colors shift but shape primitives remain identical, so telegraph readability is preserved.

### 17.6 What we are deliberately not building (yet)

To avoid Archero 2's clutter trap, the following are out of launch scope and **must not be retrofitted into the bottom tab bar without removing something else**: a "News" tab (use Mailbox), a "Friends" tab (post-launch via mailbox + Guild chat-DM), a second BP track in the bottom bar (Home entry is sufficient), or per-event tabs (events stay behind the single Events tab, paginated). The bottom-tab discipline is the load-bearing decision that keeps this app readable.

---

*End of wireframes document. 16 screens, audited against Pillars 1–8.*
