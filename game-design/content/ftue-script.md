# First-Time User Experience (FTUE) Script — Lucent: Shards of the Shattered Sun

> Screenplay FTUE script from app open through end of day 7. Aligns with `design/00-design-pillars.md`, `design/01-core-loop-spec.md` §6, `design/03-world-and-theme.md`, `design/04-progression-and-economy.md`, `design/05-launch-scope.md`. Monetization sequenced per the Survivor.io progressive-unlock pattern in `research/monetization/f2p-patterns.md` §8.
>
> **KPIs this script targets:** tutorial completion ≥ 92% in ≤ 30s of play (90–110s wall-clock with chest pop); D1 ≥ 40%; D7 ≥ 20%; push opt-in ≥ 60%; week-1 first-purchase ≥ 4%; full launch-feature comprehension by end of day 7.
>
> **Voice rules (locked):** single female narrator. ≤ 30 voice lines at launch. Each line ≤ 12 words. Mythic, warm, hopeful.

---

## Part A — The First 30 Seconds (Tutorial Completion KPI: ≥ 92%)

**Goal:** From a fresh install to *clearing a room of their own free will* in under 30s of input time. Wall-clock to starter chest: 90–110s. No menu first, no story dump, no login wall.

### Scene 1 — Cold Open (00:00 – 00:03)

**INT. PLAYER'S PHONE — APP LAUNCH**

- [ ] App icon tap. Black for one frame; a pinprick of indigo light blooms center-screen.
- [ ] Light expands into the **Lucent** wordmark over 1.8s with a low string drone (FMOD bus `Menu_Bed_Low`). At 0:02 the wordmark refracts into *Shards of the Shattered Sun.*
- [ ] No "Tap to start," no splash logos. Studio logo plays once on first-ever launch only (capped 2s, skippable).

**NARRATOR (V.O.) (line N-01):**
> "Look. The light is yours to carry."

- [ ] Delivered over the last 2.5s of the splash. Music bed ducks –6 dB. No on-screen subtitle on first launch (accessibility toggle defaults OFF to preserve the cold-open).

### Scene 2 — Hard Cut to Play (00:03 – 00:09)

**EXT. THE VALE OF FIRST LIGHT — A SUNLIT GLADE**

- [ ] Camera up on the **Dawnbow** (default tutorial hero) glowing faintly indigo in a small portrait arena. No HUD, no joystick yet. Vale palette: soft greens, lavender creep at the edges. One bird call (`Vale_Ambient_Bird_01`). No music.
- [ ] After 0.8s, a chime plays, the joystick fades in bottom-left, and a single white-text prompt appears at the top third:

**ON-SCREEN PROMPT (P-01):** "Move."

- [ ] Joystick has a pulsing halo — no arrow, no hand cartoon. If the player does nothing for 15s, the narrator delivers the *fallback nudge* (line N-02). This is the only conditional voice line in the tutorial.

### Scene 3 — First Steps, First Enemy (00:09 – 00:18)

- [ ] Player nudges the joystick. The Dawnbow walks. Footstep SFX, trail of indigo motes (`feel/light-trail`).
- [ ] After 1.5s of held movement, a **Dim Husk** (simplest archetype, red-coded) materializes 5m ahead from black-violet smoke. Soft warning cue `SFX_Enemy_Spawn_Low` plays. Prompt swaps:

**ON-SCREEN PROMPT (P-02):** "Stop to shoot."

- [ ] Player releases joystick. Hero roots. Auto-fire begins after 0.25s. First arrow *thwip* (SFX_Bow_Shoot_01), tracks the Husk, kills on the third hit.
- [ ] If the player keeps walking, the hero will not shoot — the rule is taught physically. On death: indigo confetti, pickup chime, +5 gold popup. (XP introduced in run 2.)

**ON-SCREEN PROMPT (P-03):** "More are coming."

### Scene 4 — The First Wave (00:18 – 00:30)

- [ ] Three Husks spawn from non-player arena edges, staggered 0.4s apart. They walk at 60% of player speed; auto-aim picks the nearest. No abilities, no choices yet.
- [ ] All three down → north door grinds open, warm yellow light spills through.

**ON-SCREEN PROMPT (P-04):** "Through the door."

- [ ] Indigo waypoint marker bounces above the door. Player walks in. Fade to white over 0.6s.

> **Checkpoint — 30s elapsed.** Analytics event `ftue_tutorial_complete` fires here. KPI: ≥ 92% of installs reach this event.

### Scene 5 — The Ability Pick (00:30 – 00:50)

**INT. THE ABILITY ROOM**

- [ ] Combat music ducks. Three ability cards rise in an arc. All three are **Rare** (teaches the rarity color cleanly). Tutorial pool is deterministic on first run:
  1. **Multishot I** — "+1 arrow per shot." (Front-arrow family.)
  2. **Bouncy Walls** — "Arrows bounce off walls once." (Ricochet family.)
  3. **Burning Touch** — "Arrows ignite enemies 2s." (DoT family.)
- [ ] Each seeds a signature build archetype (`design/00` Pillar 2). Whichever the player picks creates a visible screen-effect difference in the next room — the dopamine moment.

**ON-SCREEN PROMPT (P-05):** "Pick a power."

- [ ] Player taps a card; the others dissolve; the pick *clacks* into the top-right HUD slot. No reroll yet (taught in run 2). Doors open.

### Scene 6 — The Confidence Room (00:50 – 01:25)

- [ ] Music swells (`Arena_Combat_Low → Mid`). Five Husks in two waves (3 then 2). The new ability *shines visibly* — fanning arrows, ricochets, or burn overlays — making this room obviously more impressive than room 1.

**ON-SCREEN PROMPT (P-06):** "You're a Lucent now."

- [ ] Hero glows brighter 0.4s. Swelling chord. Exit door opens.

### Scene 7 — Forced Exit to Lobby + Starter Chest (01:25 – 01:50)

- [ ] Cut to the Lobby (first appearance). One lit element: a glowing chest center-screen. Every other tab is dimmed and padlocked.
- [ ] 1.2s animation of the chest hopping and unlocking on its own. The player taps nothing — this is a *gift*, not a transaction.
- [ ] Reveal:
  - 1× **Legendary** weapon: **The Dawnbow's First Light** (scripted, deterministic — the same weapon for every player on first run; provides a 7-day baseline).
  - +200 **gems** (seed hard-currency reserve so they can try gacha later without IAP friction).
  - 1× **Spirit**: **Mote** (Common; AoE pulse, +5% gold gain; visible on the player).
- [ ] Rewards animate into inventory while the camera tilts to reveal the Lobby map behind the chest. Heroes tab pulses softly ("look here next, no rush").

**ON-SCREEN PROMPT (P-07):** "Your shard. Carry it well."

- [ ] Only Lobby-side tutorial prompt. After this beat, the game is in free-play and the tutorial is officially over.

> **Tutorial KPI gate (90–110s wall-clock):** analytics event `ftue_chest_pop` fires here. Bar: ≥ 92% of `app_launch_first` reach `ftue_chest_pop` within 3 minutes.

---

## Part B — Day 1, First 10 Minutes (after Starter Chest)

**Goal:** One full Campaign run (Chapter 1, Floor 1: rooms 1–19, boss deferred) so the player understands the run loop, sees the Heroes/Mastery surface, sees the first IAP offer, and grants push permission at an earned moment. Wall-clock for Part B: 8–10 minutes.

### Scene 8 — The Lobby Settles (~01:50 – 02:30)

- [ ] Lobby lights up *one* element at a time over 5s: (1) the **Play** button bottom-center (labelled "Begin," mythic register), (2) the **Heroes** tab with a small indigo pip ("you have something new"), (3) the **Daily Login Calendar** top-right (day 1 already ticked, days 2–7 veiled).
- [ ] No shop, battle pass, or gacha tab yet — those unlock on days 2, 3, 7. **Progressive monetization.**

**ON-SCREEN PROMPT (P-08):** "Begin."

- [ ] If the player idles 12s, Play does a single soft pulse. No nag text.

### Scene 9 — Chapter 1, Floor 1, Rooms 1–4 (Light Combat) (~02:30 – 04:00)

- [ ] Tap Begin. 1.5s map-zoom transition into the Vale.

**NARRATOR (V.O.) (line N-03):** "They left the lanterns burning."

- [ ] Rooms 1–4 follow `design/01` §3 light-combat composition (1–2 archetypes, ≤ 4 enemies). 20–35s per room.
- [ ] After room 1, the gold/XP HUD bar fades in with a 2s label "Gold + XP."
- [ ] After room 2, the pause button appears top-right.
- [ ] Rooms 3–4 introduce the **Husk Archer** (ranged, blue-coded) with a 0.9s blue-line telegraph (`design/00` Pillar 8).

### Scene 10 — Room 5: The First Offer-Giver (~04:00 – 04:45)

- [ ] First **offer-giver room** (`design/01` §4). Three silhouettes in an arc: Angel of Dawn (gold), Devil of Dusk (red), Lucent Sprite (indigo). Tooltip on tap explains each. No combat.
- [ ] **First-run scripting:** Angel of Dawn has a soft yellow ring (gentle highlight). Players who tap her get a free Epic ability — low-risk choice. Devil and Sprite are fully selectable for confident players.

**ON-SCREEN PROMPT (P-09):** "Choose what carries you."

### Scene 11 — Rooms 6–14 (Mid Combat + Shop) (~04:45 – 06:30)

- [ ] Rooms 6–9: medium combat. Husk + Husk Archer + a Husk Skirmisher elite in room 8. Light AoE telegraphs in room 9.
- [ ] Room 10: **Shop Room** (~300 gold by now): Heal 50% HP (100g), Reroll abilities (150g), Upgrade ability one tier (200g). Tooltip only.
- [ ] Rooms 11–14: heavy combat. Player should be at full/near-full HP entering 15.

### Scene 12 — Room 15: Second Offer-Giver (~06:30 – 07:00)

- [ ] Standard offer-giver room. No scripting — the player has earned a free choice.

### Scene 13 — Rooms 16–19 (Hard Combat + Mini-Boss) (~07:00 – 08:30)

- [ ] Rooms 16–18: hardest standard rooms, multi-archetype waves.
- [ ] Room 19: **Withered Stag** mini-boss (Vale Echo). 3 telegraphs, 30–45s fight. Drops a small gear chest.
- [ ] Sub-25% HP from room 17 on: rewarded-video revive offer surfaces *on death only*, not pre-death. No $0.99 revive IAP in week 1 — protects the funnel.

### Scene 14 — The Cliffhanger (Room 20 Boss — Deferred) (~08:30 – 09:00)

- [ ] Player approaches room 20. Tall stone boss-arch glows.
- [ ] **Subtle cliffhanger:** scripted "first floor pre-boss" Lobby exit fires *not* on energy depletion but as a framed *rest beat*. End-of-floor screen rises: "Floor 1 Cleared — Bonus Run Tomorrow." A single tomorrow-tile teases "Day 2: New Quests + Daily Dungeon."
- [ ] **Design rule:** the cliffhanger must never feel forced. The boss is reachable in run 2. Rest copy is a suggestion, not a gate — gates here tank D1.

**NARRATOR (V.O.) (line N-04):** "Come back. There is more light to carry."

### Scene 15 — Heroes Tab + Mastery (~09:00 – 09:30)

- [ ] Heroes tab pulses with a "1" badge. Tap opens the Heroes screen; the Dawnbow centered. A **Mastery Path node** on the level-20 ring lights up. Tooltip: "Mastery Path: level her up to unlock." UI chime only — no voice line spent here.

### Scene 16 — Starter Pack Offer (~09:30 – 09:45)

- [ ] One-time modal slides up: **Beacon Pack** ($0.99, 48h, from `design/04` §5):
  - +600 gems · +5,000 gold · 3× Energy refill stones · 1× guaranteed Epic ability scroll.
- [ ] CTA: "View" / "Maybe later" (X). Dismissing does not hide it; it persists as a non-modal Lobby card with countdown. **No dark patterns.**

### Scene 17 — Daily Login Calendar Reveal (~09:45 – 10:00)

- [ ] Calendar card pulses and auto-opens once. Day 1 ticked. Days 2–7 visible; day 7 is the "wow" day (hero-shard icon — the season hero teaser). Tap to dismiss.

### Scene 18 — Push Notification Pre-Prompt (~10:00 – 10:30)

- [ ] In-game pre-prompt fires before the OS dialog:
  > **Title:** Keep your light burning.
  > **Body:** We'll let you know when your energy is full and when a daily quest is waiting. No spam.
  > **CTAs:** "Notify me" / "Not now."
- [ ] Tap "Notify me" → OS-level prompt fires. Tap "Not now" → no OS prompt today; re-ask on day 3 only if player logged in days 2 and 3. Max one re-ask per week. Target opt-in: 60–70% (`research/monetization/liveops-retention.md` §6.3).

> **Day 1 wrap.** Player knows how to play, holds a Legendary weapon + Spirit, has cleared Floor 1 to the cliffhanger, has seen Heroes/Mastery, has seen their first IAP offer, has joined the Daily Login chain, has (likely) push on. No shop/gacha/battle-pass tabs yet.

---

## Part C — Days 2 through 7: The 7-Day Onboarding Loop

This part directly fulfills `design/01-core-loop-spec.md` §6. Each day adds **one** new core surface. By end of day 7 the player has seen everything in launch scope. The progressive-unlock cadence below is calibrated to the Survivor.io pattern surfaced in `research/monetization/f2p-patterns.md` §8.

### Unlock Cadence Table (Days 1–7)

| Day | Hook | Unlock | First IAP surface introduced | Push notification (night-before / morning-of) |
|---|---|---|---|---|
| **1** | Tutorial + first run + starter chest | Heroes tab, Mastery (tier 1), Daily Login | **Beacon Pack** ($0.99, 48h, after first run) | Pre-prompt fired post-run; no nightly push yet |
| **2** | First Daily Login bonus claim + first Daily Quests | **Daily Dungeon mode** + **Daily Quests panel** | Daily Deal $0.99 (random rotation) | Morning push at 09:05 local: "Your daily quests are open." |
| **3** | First Battle Pass intro with free 5-tier headstart | **Battle Pass tab** (S1: "Vale of First Light") | **Battle Pass — Lite** $4.99 / **Premium** $14.99 | Evening push at 19:30 local: "A new season has begun." |
| **4** | First Weekly Boss + first ad-watch reward chain | **Ad chest** (4/day cap) + **Weekly Boss** room | First **Gem Pack** tier appears in shop ($0.99 → $9.99 visible, larger tiers gated) | Morning push: "The Withering Stag stirs." |
| **5** | First chapter boss kill (the Vale boss) → Tower unlock | **Tower mode** (endless) | **Privilege Card** $4.99/30d teaser | Morning push: "The Vale awaits its champion." |
| **6** | First guild invite prompt | **Guilds tab** (chat + donations + weekly guild boss) | No new IAP today (rest day for offer surfaces) | Evening push (D+6): "A guild has invited you." |
| **7** | First Survival run; the big timed offer | **Survival mode** + the **Hero Gacha banner** | **Monthly Card** $9.99 + **Hero Gacha** (10-pull featured offer); **Beacon Pack expires** | Morning push: "Your first Survival is open." Night before: "The first banner closes soon." |

> By end of day 7, the player has seen: all 4 launch modes (Campaign, Daily Dungeon, Tower, Survival), Battle Pass, Daily Quests, Guilds, Async PvP (introduced as a Guilds-tab sibling), Ad Chests, Daily Login Calendar, Heroes/Mastery, Talent Grid (Inscription), Forge (gear upgrade), the gacha banner, the starter pack offer, the Daily Deal, the Privilege Card, and the Monthly Card. The full launch monetization surface area is revealed — *progressively*, never in a single screen.

---

### Day 2 — "The Habit Starts"

**Hook:** First daily login claim, first daily quests, first new mode (Daily Dungeon — energy-free, 1–2 min).

**Voice line (N-06):** "Day breaks. Walk with me."

- [ ] 1s Lobby fade-in. Daily Login Calendar slides forward, day-2 reward (200 gold + 1 ability scroll) animates into inventory.
- [ ] New Lobby card: **Daily Quests** (3 tasks for week 1; 6 for veterans):
  1. Clear 5 rooms in any mode.
  2. Kill 100 enemies.
  3. Pick 5 abilities in a run.
- [ ] Each task pays Pass Points + gold/gem stipend. Filling the activity bar unlocks a small chest.
- [ ] New bottom-bar icon: **Daily Dungeon** (purple gate). 5-room mini-floor, guaranteed gear drop, ≤ 2 min.
- [ ] **P-10:** "A new path opens."

**Push (09:05 local):** "Your daily quests are open in Lucent."

**IAP today:** **Daily Deal** card (24h, $0.99 rotation; today's roll: 200 gems + 1,000 gold + 1 Spirit fragment). Beacon Pack still active.

---

### Day 3 — "A Season Begins"

**Hook:** Battle Pass intro with a free 5-tier headstart (trust-building per `f2p-patterns.md` §7).

**Voice line (N-07):** "The seasons turn. So do you."

- [ ] Battle Pass tab unlocks with a soft fanfare. Bottom-bar gains "Season 1: Vale of First Light."
- [ ] 45-day season pass: free track left, premium right. Tiers 1–5 auto-claimed (the headstart).
- [ ] Three-line explainer modal: "Play to earn Pass Points. Free rewards every tier. Unlock premium for the season hero and more."
- [ ] Two IAP cards: **Battle Pass — Lite** $4.99 (unlocks paid track) and **Battle Pass — Premium** $14.99 (paid track + 5-tier skip + cosmetic + free 10-pull).
- [ ] *Buy-a-Hero ($39.99) tier is hidden until chapter 1 fully cleared* — drip-feed the high-ARPU surfaces.

**Push (19:30 local):** "A new season has begun in the Vale."

**IAP today:** Battle Pass Lite + Premium.

---

### Day 4 — "The First Weekly Boss"

**Hook:** Weekly Boss room + ad-watch reward panel.

**Voice line (N-08):** "Something old wakes in the Vale."

- [ ] New Lobby card: **Weekly Boss** ("The Withering Stag, awakened"). 3 attempts/day, cumulative damage tiers, bracketed leaderboard (50-player shards).
- [ ] New **Free Chests** panel (per `design/04` §6) with 5 ad-watch slots: free chest (4/day), energy +5 (4/day), free spin (1/day), Pass Points (1/day), lucky shop refresh (1/day).
- [ ] **P-11:** "Watch. Earn. Repeat."

**Push (09:30 local):** "The Withering Stag stirs. Strike first."

**IAP today:** **Gem Packs** appear in shop — but **only the bottom three tiers** ($0.99, $4.99, $9.99). The $19.99/$49.99/$99.99 whale anchors remain hidden until day 8+. Progressive unlock per `f2p-patterns.md` §8 (Survivor.io).

---

### Day 5 — "First Boss, First Mode"

**Hook:** Return to the boss room. Kill the chapter boss. Unlock Tower.

**Voice line (boss approach, N-09):** "The first dark thing was never the worst."
**Voice line (victory, N-10):** "One realm. Now six more."

- [ ] Boss: **Tatterhorn, the Forgotten Watcher** — Vale-themed corrupted shepherd-Echo. 3 phases, ~90s.
- [ ] On kill: long victory beat, end-of-run screen, narrator line N-10.
- [ ] Bottom-bar gains **Tower** (spire silhouette, "NEW" pip). Brief tutorial card: endless floors, escalating difficulty, leaderboard, 3 energy per run. No forced first-Tower run.
- [ ] **P-12:** "Climb."

**Push (09:30 local):** "The Vale awaits its champion."

**IAP today:** **Privilege Card** $4.99/30d surfaces quietly in shop with a 3-day free-trial offer (per `f2p-patterns.md` §11.1). No modal.

---

### Day 6 — "You Are Not Alone"

**Hook:** First guild invite + Async PvP Arena (Pillar 6 — social as D30+ extender).

**Voice line (N-11):** "Others walk this path. Find them."

- [ ] Top-of-screen banner: "You've been seen by a Guild." The seeded NPC guild **The Lanternbearers** auto-extends an invite (keeps the social pool warm during soft launch; degraded mode in Part D).
- [ ] Guild screen: 30/30 members (real returners + low-activity NPCs mixed seamlessly), chat (read-only until accept), guild boss preview, donations.
- [ ] Accept → permanent Guilds tab. Decline → one re-ask on day 8 with a different guild, then the tab is discoverable but not pushed.
- [ ] **Async PvP Arena** surfaces as a sibling card in the Guilds tab. 5 attempts/day, replay-based, bracketed.
- [ ] **P-13:** "Join, or walk alone."

**Push (~20:00 local):** "A guild has invited you. Tap to see."

**IAP today:** **No new IAP surfaces.** Intentional rest day before the day-7 surge.

---

### Day 7 — "The First Long Run"

**Hook:** Survival mode unlocks. Hero Gacha banner opens. Beacon Pack expires today (48h timer placed here intentionally — one last visible countdown).

**Voice line (N-12):** "Stand. The light remembers."

- [ ] Last empty bottom-bar slot lights up: **Survival** (circular arena icon). One-line explainer: "Survive as long as you can. The horde grows."
- [ ] First Survival is energy-discounted 50% (2 energy instead of 4) once per player.
- [ ] **Hero Gacha** banner opens. Featured: **The Prismborn**. 10-pull soft pity, 50-pull hard pity. Rates visible at banner entry (Apple compliance + Pillar 5).
- [ ] Free **first 10-pull** gifted — guaranteed Epic+. (`design/01` §6 lists the "guaranteed Epic" on day 1; we deliberately slide it to day 7 to align with the gacha tab reveal and avoid day-1 overwhelm.)
- [ ] **P-14:** "Hold the light."

**Push (day-6 night, ~21:00):** "Tomorrow: the first banner opens. The first hero waits."
**Push (day 7 morning, ~09:30):** "Your first Survival is open. The horde gathers."
**Push (day 7 evening, ~20:00):** "The Beacon fades at midnight. One last chance."

**IAP today (the big wave):**
- **Monthly Card** $9.99/30d goes live with the gem-drip preview ("+200 now / +100 daily for 30 days = 3,200 gems").
- **Hero Gacha** single-pull (60 gems) + 10-pull (540 gems). First 10-pull free.
- **Beacon Pack** expires at midnight with visible countdown.
- **Daily Premium Deal** $2.99 joins the Daily Deal as a sibling.

> **End of Day 7 wrap.** Player has engaged with all 4 modes (Campaign, Daily Dungeon, Tower, Survival), Battle Pass, Daily Quests, Guilds + Async PvP, Heroes/Mastery, Talent Grid, the Forge, the gacha banner, all 5 ad placements, and the full launch IAP catalog except the $39.99 Buy-a-Hero tier and the largest gem packs ($19.99+) — both delivered in week 2. **D7 retention KPI: ≥ 20%** (`design/05`, top-quartile per `liveops-retention.md` §8).

---

## Part D — Edge Cases and Failure Modes

These flows are the *vast minority of installs*, but they are where good FTUE designs differentiate from great ones. Each case below is designed to never break the 30-second tutorial KPI and never feel punitive.

### D.1 — Player Loses the Tutorial Run (Rare but Possible)

The tutorial enemies are tuned so that ~99% of installs clear them without dying. The Husk does 8 damage per hit; the Dawnbow has 100 HP and a 0.4-second i-frame on hit. A player would have to stand still inside three Husks to die.

If it happens:

- [ ] Death screen shows the hero kneeling, fading to indigo. No "you died" text — that's too grim for the tone.
- [ ] A soft narrator line is *suppressed* on tutorial death to preserve voice budget (we re-use the existing ambient bird call SFX instead).
- [ ] **On-screen prompt (P-15):** "Rise. The light holds you."
- [ ] A "Try Again" button appears. The room resets to the start of the tutorial run, not the start of the game. The narrator's opening line N-01 does *not* replay.
- [ ] **No revive offer on the tutorial run.** Ever. The first time we surface a revive ad is on the day-1 main Floor 1 run, room 17+ (see Scene 13).
- [ ] After two deaths in the same tutorial run, the Husks' damage drops to 4 per hit (a silent difficulty assist). After three deaths, damage drops to 2 and the player's auto-fire rate goes up 25% (also silent). Tutorial completion KPI is sacred; we will tilt the table to protect it.

### D.2 — Player Force-Quits During Tutorial

- [ ] Every input event in the tutorial writes a single-key save state to local storage: `ftue_step_id = "<scene_id>"`.
- [ ] On re-launch, after the splash, the game checks `ftue_step_id` and:
  - If `null` → run full FTUE from Scene 1.
  - If set to anything *before* Scene 7 (the chest pop) → resume **at the start of the scene the player was in**, with all prior progress preserved.
  - If set to Scene 7 or later → skip directly to the Lobby. The chest pop animation is replayed once (it's a positive memory; no harm) and the player is dropped into Day 1 free-play.
- [ ] No penalty. No retry timer. No "Welcome back, are you sure?" modal.
- [ ] Analytics event: `ftue_resume` fires with the prior step ID so we can measure where players quit and tune the friction beats.

### D.3 — Player Skips a Day (Returner Triggers)

Per `research/monetization/liveops-retention.md` §7, ~65% of lapsed users return within 30 days if push-notified. We layer returner mechanics on top of the day-2-through-7 flow:

- [ ] **Skipped day 2:** day 3 login opens with a "make-up" card that lets the player claim the missed day-2 reward by watching one rewarded video. No gem cost. No friction. The login chain does *not* reset (we are explicitly more generous than Archero on this — `design/00` Pillar 5, "fair-to-F2P").
- [ ] **Skipped 3 days:** the **Welcome Back Pack** ($0.99 returner-priced replacement for the Beacon Pack if it has expired) surfaces alongside a 5-tier returner mini-calendar. Push fires at the 72h-since-last-session mark with copy: "Your light is waiting." (line N-13 is *not* voiced — returner copy is text-only in week 1; voice lines are reserved for in-world beats.)
- [ ] **Skipped 7 days:** the **Hero Choice Ticket** (one free hero of the player's choice from the launch 6-hero free pool, excluding the 2 gacha-only premium heroes) is mailed. A push fires: "A hero waits to be chosen."
- [ ] **Skipped 14 days:** big-ticket returner offer (80–90% off Monthly Card for first month, plus a free 10-pull). One push, no further nags.
- [ ] **Skipped 30+ days:** full FTUE economy reset path — the player is segmented into a "lapsed_30+" cohort and re-offered a Beacon Pack equivalent with their existing progress fully preserved. The voice line that day on Lobby open replays N-01 ("Look. The light is yours to carry.") to bookend the return — the *only* re-use of that line.

### D.4 — Player Is Offline

- [ ] **Tutorial runs offline.** All tutorial assets ship in the binary. No network required for Scenes 1–7. This is the most-tested edge case in the build.
- [ ] **Day 1 first run runs offline if the player loses connectivity mid-run.** Run state is serialized locally; rewards are queued.
- [ ] On reconnect, queued rewards are flushed to the server with conflict-resolution rules favoring the client (the player keeps what the local run gave them). Cheating risk is bounded by the per-run reward cap.
- [ ] The Daily Login can be claimed offline; the claim is queued and validated on reconnect. If a server-side validation fails (extreme edge case), the player is shown a one-time apology message and the reward is auto-granted as if no error occurred. Trust > strict integrity in the first 7 days.
- [ ] Push permission prompt is **never** fired while offline (we wait until the player is online and at a clean trigger point).
- [ ] Guild invite (day 6) is **degraded to the seeded NPC guild only** when the player is in soft-launch or on a fresh region with low player density; the player is invited to a "starter guild" of low-activity bots until enough real players are around to migrate them into a real guild.

---

## Part E — Voice Lines and On-Screen Text (Localization Asset List)

> **Voice budget: ≤ 30 lines total at launch.** This list is exactly 22 voice lines used across days 1–7 plus the FTUE. Reserves 8 lines for chapter stingers (one per chapter, of which 1 is consumed by N-03 in the FTUE), boss-room ambient lines, and victory taglines. All voice lines are spoken by the **single female narrator** (`design/03` Audio Direction Commitments). Each line is ≤ 12 words.

### Voice Lines (all spoken by Narrator V.O.)

| ID | Line | Trigger | Beat |
|---|---|---|---|
| N-01 | "Look. The light is yours to carry." | App splash, first launch only (also re-fires once on 30-day return) | Cold open |
| N-02 | "Move when you are ready." | Tutorial idle ≥ 15s with no input | Tutorial fallback nudge |
| N-03 | "They left the lanterns burning." | First entry to Chapter 1 (the Vale) | Chapter 1 stinger |
| N-04 | "Come back. There is more light to carry." | Day 1 cliffhanger, post-Floor-1, pre-boss | End of first session |
| N-05 | *(reserved — not used; bank for later)* | — | Mastery node unlock SFX-only |
| N-06 | "Day breaks. Walk with me." | Day 2 app open | Daily login |
| N-07 | "The seasons turn. So do you." | Day 3 app open | Battle Pass reveal |
| N-08 | "Something old wakes in the Vale." | Day 4 app open | Weekly Boss reveal |
| N-09 | "The first dark thing was never the worst." | Day 5, approaching boss room | Pre-boss |
| N-10 | "One realm. Now six more." | Day 5, boss kill victory | Post-first-chapter-boss |
| N-11 | "Others walk this path. Find them." | Day 6 app open | Guild reveal |
| N-12 | "Stand. The light remembers." | Day 7 app open | Survival reveal |
| N-13 | *(reserved)* | — | — |
| N-14 | "The prayers are still echoing." | Chapter 2 first entry (Sunken Cathedral) | Chapter 2 stinger |
| N-15 | "She climbed to call the sun back." | Chapter 3 first entry (Frostspire) | Chapter 3 stinger |
| N-16 | "The forges never cooled." | Chapter 4 first entry (Emberforge) | Chapter 4 stinger |
| N-17 | "Sap turned to glass. Glass remembers." | Chapter 5 first entry (Glassroot Forest) | Chapter 5 stinger |
| N-18 | "What falls from up here lands as a wound." | Chapter 6 first entry (Hollow Sky) | Chapter 6 stinger |
| N-19 | "It can be ended. Walk in." | Chapter 7 first entry (Long Dusk) | Chapter 7 stinger |
| N-20 | "The light returned, because you carried it." | Final chapter victory | Endgame tagline |
| N-21 | "Rest. The Dim cannot follow you here." | First Lobby return from a campaign run | Generic post-run |
| N-22 | "You are not the last of us." | First guild boss participation | Social anchor |

> **Total voice lines used across the launch FTUE + chapter stingers + victory tagline + social anchor: 22.** Reserve of 8 lines remains under the 30-line cap for boss-specific reveals (Tatterhorn voice line at Vale boss room is currently SFX-only and could become voiced) or future events.

### On-Screen Text (Diegetic Prompts, Non-Voice)

These are sparse white-text overlays. Localization team treats these as separate strings from voice lines. Each prompt ≤ 5 words to support the mythic register and localization.

| ID | Text | Beat |
|---|---|---|
| P-01 | "Move." | Tutorial Scene 2 |
| P-02 | "Stop to shoot." | Tutorial Scene 3 |
| P-03 | "More are coming." | Tutorial Scene 3 |
| P-04 | "Through the door." | Tutorial Scene 4 |
| P-05 | "Pick a power." | Tutorial Scene 5 (ability pick) |
| P-06 | "You're a Lucent now." | Tutorial Scene 6 (post-first-pick clear) |
| P-07 | "Your shard. Carry it well." | Starter chest pop |
| P-08 | "Begin." | Lobby Play button label |
| P-09 | "Choose what carries you." | First offer-giver room |
| P-10 | "A new path opens." | Day 2 Daily Dungeon reveal |
| P-11 | "Watch. Earn. Repeat." | Day 4 Ad chest reveal |
| P-12 | "Climb." | Day 5 Tower reveal |
| P-13 | "Join, or walk alone." | Day 6 Guild invite |
| P-14 | "Hold the light." | Day 7 Survival reveal |
| P-15 | "Rise. The light holds you." | Tutorial death (edge case D.1) |

### Push Notification Copy (Localizable Strings)

All push copy is **never voiced**. Quiet-hours rule: no push between 23:00 and 08:00 player local. Frequency cap: 2/day for active, 1/day for low-engagement, per `research/monetization/liveops-retention.md` §6.2.

| Day | Time (local) | Copy |
|---|---|---|
| 2 | 09:05 | "Your daily quests are open in Lucent." |
| 3 | 19:30 | "A new season has begun in the Vale." |
| 4 | 09:30 | "The Withering Stag stirs. Strike first." |
| 5 | 09:30 | "The Vale awaits its champion." |
| 6 | 20:00 | "A guild has invited you. Tap to see." |
| 6→7 (night before) | 21:00 | "Tomorrow: the first banner opens. The first hero waits." |
| 7 | 09:30 | "Your first Survival is open. The horde gathers." |
| 7 | 20:00 | "The Beacon fades at midnight. One last chance." |

**Total push notifications across days 1–7: 8.** (Day 1 has no nightly push; the day-7 evening urgency-push is the only same-day "second push" of the week.)

### Localization Notes for the Translation Team

- The narrator's register is **mythic, warm, hopeful, never modern**. No contractions are mandatory in English — half are present for cadence, half avoided ("There is more light to carry," not "There's"). Translators should match the *register*, not the contractions.
- Avoid puns. Avoid colloquialisms. Avoid double-meanings that don't survive translation.
- Voice direction: imagine the narrator is a calm older woman speaking to a child she trusts to do hard things. Not a knight. Not a goddess. A keeper.
- All voice lines must be re-recordable in the target locale by a single contracted female VO actor per locale. Budget: 8 hours of studio time per launch locale (en + 5 added at week 4 per `design/05`).

---

## Appendix — Tutorial 30-Second Beat List (At-a-Glance)

For engineering and analytics implementation. Each beat fires one named event.

| Time (s) | Scene | Event | Player input expected |
|---|---|---|---|
| 0–3 | Splash + N-01 | `app_launch_first` | None |
| 3–6 | Glade reveal, joystick fade-in | `ftue_scene_glade_start` | None |
| 6–9 | First joystick touch | `ftue_input_move_first` | Move joystick |
| 9–13 | First Husk spawn + P-02 | `ftue_husk_spawn_first` | Release joystick |
| 13–18 | First Husk killed | `ftue_kill_first` | Auto-fire connects |
| 18–25 | Wave of 3 Husks | `ftue_wave_clear_first` | Move + stop loop |
| 25–28 | Door opens + P-04 | `ftue_door_first` | Walk to door |
| 28–32 | Ability pick screen + P-05 | `ftue_ability_pick_first` | Tap a card |
| 32–55 | Wave of 5 Husks | `ftue_wave_clear_second` | Combat with ability |
| 55–60 | Exit door + P-06 | `ftue_room2_exit` | Walk through |
| 60–90 | Lobby fade + chest pop animation | `ftue_chest_pop` | None |
| 90–110 | Starter chest reveal complete | `ftue_complete` | Tap to dismiss |

KPI gate: `ftue_complete / app_launch_first ≥ 0.92` is the soft-launch promotion bar. Soft-launch tuning loops iterate on Scene 2 (the longest pure-idle window) and Scene 5 (the ability pick comprehension moment) if the funnel sags below 92%.

---

*End of FTUE script. Companion documents: `design/01-core-loop-spec.md` (run loop), `design/04-progression-and-economy.md` (IAP SKU detail), `research/monetization/liveops-retention.md` §6 (push design), `research/tech/app-store-launch-aso.md` §1.4 (App Store rejection avoidance — ATT prompt, IAP odds disclosure, Sign In With Apple deferred to a quieter day-2 settings beat).*
