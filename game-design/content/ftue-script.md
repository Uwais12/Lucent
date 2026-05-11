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

- [ ] Camera comes up on the **Dawnbow** (default tutorial hero) standing in the center of a small portrait-friendly arena, glowing faintly indigo. No HUD yet. No joystick yet.
- [ ] A single shaft of warm light falls on the hero from above. The world around her is the Vale palette (`design/03-world-and-theme.md`): soft greens, lavender-violet creep at the arena edges.
- [ ] One bird call (FMOD: `Vale_Ambient_Bird_01`). No music — just ambience.
- [ ] After 0.8s of stillness, a soft chime plays, the joystick fades in at the bottom-left, and a single white-text prompt appears at the top-third of the screen:

**ON-SCREEN PROMPT (P-01):**
> "Move."

- [ ] The joystick has a gentle pulsing halo to draw the thumb. No arrow, no hand cartoon — the halo is enough.
- [ ] If the player does nothing for 6 seconds, the prompt re-pulses and the halo intensifies. If they do nothing for 15 seconds, the narrator delivers the *fallback nudge* (line N-02, see Part E). This is the only voice line in the tutorial that is conditional.

### Scene 3 — First Steps, First Enemy (00:09 – 00:18)

**THE GLADE — CONTINUOUS**

- [ ] Player nudges the joystick. The Dawnbow walks forward. Footstep SFX. Trail of pale indigo motes behind her (`feel/light-trail`).
- [ ] At 1.5 seconds of held movement (or as soon as the player has moved any direction at least 1.5 meters in-world), a **Dim Husk** (the simplest enemy archetype, red-coded per `design/03`) materializes from a curl of black-violet smoke 5 meters ahead of the player.
- [ ] On enemy spawn, a soft warning audio cue (`SFX_Enemy_Spawn_Low`) plays and the prompt text fades and is replaced.

**ON-SCREEN PROMPT (P-02):**
> "Stop to shoot."

- [ ] Player releases joystick. The hero roots. Auto-fire kicks in after 0.25 seconds. The first arrow leaves the bow with a clear *thwip* (SFX_Bow_Shoot_01), tracks the Husk, hits, knocks it back, kills it on the third arrow.
- [ ] If the player tries to keep walking, the hero will not shoot — proving the stop-to-shoot rule physically. After 4 seconds of held movement with no kill, the prompt re-pulses.
- [ ] On Husk death: a small burst of indigo confetti, a coin-pickup chime (SFX_Pickup_Gold_01), and a +5 gold popup. No XP yet — XP is unintroduced until run 2.

**ON-SCREEN PROMPT (P-03):**
> "More are coming."

### Scene 4 — The First Wave (00:18 – 00:30)

**THE GLADE — CONTINUOUS**

- [ ] Three Dim Husks spawn from the three non-player edges of the arena, staggered by 0.4 seconds so the player can't be sandwiched.
- [ ] Husks walk toward the player at 60% player movement speed (Husk is the most forgiving enemy archetype in the launch roster).
- [ ] Player kites, stops, shoots, repeats. Auto-aim picks the nearest Husk. No build choices yet, no abilities yet.
- [ ] All three killed → arena doors at the north edge animate open with a stone-grinding SFX and a warm yellow glow spills through.

**ON-SCREEN PROMPT (P-04):**
> "Through the door."

- [ ] An indigo waypoint marker bounces above the open door. Player walks in. Camera fades to white over 0.6 seconds.

> **Checkpoint — 30 seconds elapsed.** This is the formal "tutorial complete" event we fire to analytics. KPI target: ≥ 92% of installs reach this event.

### Scene 5 — The Ability Pick (00:30 – 00:50)

**INT. THE ABILITY ROOM — A STILL, MISTY CHAMBER**

- [ ] Fade up on the player standing in a smaller chamber. Combat music ducks to a hush.
- [ ] Three ability cards rise from the floor in an arc in front of the player. All three are **Rare** for the tutorial pick (no Common, no Epic — Rare is the visual sweet spot; it teaches the rarity color before introducing the rarity ladder).
- [ ] The three forced cards for the tutorial pool (rolled deterministically for the first run only):
  1. **Multishot I** — "+1 arrow per shot." (Front-arrow family.)
  2. **Bouncy Walls** — "Arrows bounce off walls once." (Ricochet family.)
  3. **Burning Touch** — "Arrows ignite enemies for 2s." (DoT family.)
- [ ] These three are chosen because each is a *seed* of one of the genre's signature build archetypes (`design/00` Pillar 2). The player picking any one of them will see a screenshot-worthy moment in the next room.

**ON-SCREEN PROMPT (P-05):**
> "Pick a power."

- [ ] Player taps a card. The other two dissolve. The chosen card flies into a slot at the top-right of the HUD with a satisfying *clack* (SFX_UI_Ability_Lock_01).
- [ ] No reroll button is shown in the tutorial pick (rerolls are introduced in run 2).
- [ ] Doors open ahead. Player walks through.

### Scene 6 — The Confidence Room (00:50 – 01:25)

**INT. ARENA II — STONE COURTYARD**

- [ ] Music swells (FMOD: `Arena_Combat_Low → Mid`).
- [ ] Five Dim Husks spawn in two waves: 3, then 2 after the first 3 die. Same archetype, no surprises.
- [ ] The player's new ability shines visibly — Multishot players see three arrows fan out, Bouncy Walls players see arrows ping around, Burning Touch players see enemies glow orange on hit. Whichever they picked, *the screen looks more impressive than the first room.* That gap is the dopamine moment.
- [ ] Player clears the room.

**ON-SCREEN PROMPT (P-06):**
> "You're a Lucent now."

- [ ] The hero glows brighter for 0.4 seconds. A soft swelling chord plays. The exit door opens.

### Scene 7 — Forced Exit to Lobby + Starter Chest (01:25 – 01:50)

**INT. THE HOME / LOBBY SCREEN — FIRST APPEARANCE**

- [ ] Cut to the Lobby. The player has never seen this screen before. The first thing they see is *one* lit-up element: a glowing chest in the center of the screen. Every other tab (Heroes, Gear, Shop, Battle Pass, Events) is dimmed and locked with a small padlock.
- [ ] A short animated sequence (1.2s) of the chest hopping and unlocking on its own. The player does not have to tap anything — this is a *gifted* moment, not a transaction.
- [ ] Chest pops open. Confetti. The reveal:
  - 1× **Legendary** weapon: **The Dawnbow's First Light** (scripted, deterministic, the same weapon for every player on first run; gives a clear baseline that scales for ~7 days). *Iconography: indigo arrow on a gold-rimmed card with a Legendary rarity halo.*
  - +200 **gems** (immediately credited; this is the "seed" hard-currency reserve so the player can later try the gacha system before any IAP friction).
  - 1× **Spirit**: **Mote**, a Common-rarity hovering wisp pet. Light AoE pulse, +5% gold gain. Sticks to the player visually for the rest of the run.
- [ ] No "press to claim" beat. The rewards animate directly into the player's inventory while the camera tilts to show the Lobby map behind the chest. The Heroes tab pulses softly to suggest "look here next, but no rush."

**ON-SCREEN PROMPT (P-07):**
> "Your shard. Carry it well."

- [ ] This is the only Lobby-side prompt in the entire FTUE. After this beat, the game is in "free play" — the player can tap anything they want and the tutorial is officially over.

> **Tutorial KPI gate (90–110s wall clock):** the analytics event `ftue_chest_pop` fires here. Soft-launch tuning bar: ≥ 92% of installs that reach `app_launch_first` also reach `ftue_chest_pop` within 3 minutes (a fat tail for slow-thumb / interrupted players).

---

## Part B — Day 1, First 10 Minutes (after Starter Chest)

**Goal:** Take the player through *one* full Campaign run (Chapter 1, Floor 1: all 20 rooms) so they understand the run loop, see the talent grid, see the first IAP offer, and grant push notification permission at a clean, earned moment. Total wall-clock for Part B: 8–10 minutes.

### Scene 8 — The Lobby Settles (~01:50 – 02:30)

- [ ] After the starter chest pop, the Lobby UI lights up *one* element at a time over 5 seconds, in this order:
  1. The **Play** button at the bottom-center (largest, glowing).
  2. The **Heroes** tab (a tiny indigo pip flickers on it — the new Legendary weapon is auto-equipped, but the pip signals "you have something new to inspect").
  3. The **Daily Login Calendar** card in the top-right corner (shows day 1 reward already claimed in a tick-mark; day 2 reward visible behind a soft veil).
- [ ] No shop tab visible yet. No battle pass tab visible yet. No gacha tab visible yet. (Progressive monetization unlock — first IAP surface comes only *after* the first run ends.)
- [ ] The **Play** button label reads "Begin." Not "Start." Not "Campaign." One word, mythic register.

**ON-SCREEN PROMPT (P-08, ambient, not voiced):**
> "Begin."

- [ ] If the player idles on the Lobby for 12 seconds, the Play button does a soft single-pulse animation. No nag text.

### Scene 9 — Chapter 1, Floor 1, Rooms 1–4 (Light Combat) (~02:30 – 04:00)

- [ ] Player taps Begin. A 1.5-second map-zoom transition lands them at the entrance to the Vale.
- [ ] A short narrator stinger plays on first chapter entry (line N-03, see Part E):

**NARRATOR (V.O.) (line N-03):**
> "They left the lanterns burning."

- [ ] Rooms 1–4 follow standard floor composition (`design/01` §3): 1–2 archetypes, ≤ 4 enemies on screen, no AoE telegraphs. Player should clear each room in 20–35 seconds.
- [ ] After room 1, the **gold/XP HUD bar** animates in for the first time (was hidden during the tutorial proper). A small label briefly explains it: "Gold + XP." 2-second fade. No voice line.
- [ ] After room 2, the **pause button** appears in the top-right and animates in with a soft tick. No prompt — it's intuitive. (Confirmed via wave-1 playtest: ≥ 95% of players ignore it until they need it.)
- [ ] Rooms 3 and 4 introduce a second enemy archetype: **Husk Archer** (ranged, blue-coded). Telegraph: a thin blue line from archer to player 0.9 seconds before the shot, per `design/00` Pillar 8.

### Scene 10 — Room 5: The First Offer-Giver (~04:00 – 04:45)

- [ ] Room 5 is the first **offer-giver room** (`design/01` §4). Player walks in to find three NPC silhouettes in an arc:
  - **Angel of Dawn** (golden silhouette).
  - **Devil of Dusk** (deep red silhouette).
  - **The Lucent Sprite** (small, indigo).
- [ ] A *non-voiced* on-screen tooltip explains each on hover/tap. No combat in this room. Music switches to a hushed contemplative cue.
- [ ] **First-run scripting:** the Angel of Dawn is gently highlighted (a soft yellow ring on her plinth). Players who tap her get a free Epic ability — high-value reward, low-risk choice. The other two are fully selectable; if the player picks Devil or Sprite they get the standard outcome with no scripted bonus.
- [ ] **ON-SCREEN PROMPT (P-09):** "Choose what carries you."
- [ ] After the choice, player walks through the exit door. No voice line here — the offer-giver beat is light text only to preserve the 30-line voice budget.

### Scene 11 — Rooms 6–9, the Shop Room, and Rooms 11–14 (~04:45 – 06:30)

- [ ] Rooms 6–9: medium combat, mix of archetypes (Husk + Husk Archer + a small Husk Skirmisher elite in room 8). Light AoE telegraphs introduced in room 9.
- [ ] Room 10: **Shop Room**. The player has accumulated ~300 gold by this point (tuned by the balance-curves agent later). Three offers:
  1. Heal 50% HP — 100 gold.
  2. Reroll your ability arsenal — 150 gold.
  3. Upgrade a current ability one tier — 200 gold.
- [ ] Tooltip-only explanation. No voice line.
- [ ] Rooms 11–14: heavy combat. Difficulty scales gently — a player who has been picking sensible abilities should still be at full or near-full HP entering room 15.

### Scene 12 — Room 15: Second Offer-Giver (~06:30 – 07:00)

- [ ] Standard offer-giver room. No scripting this time; the player has earned the right to pick freely.
- [ ] Player chooses. Continues.

### Scene 13 — Rooms 16–19 (Hard Combat, Mini-Boss in 19) (~07:00 – 08:30)

- [ ] Rooms 16–18: hardest standard rooms. Multi-archetype waves.
- [ ] Room 19: a **mini-boss** — the **Withered Stag**, a Vale-themed Echo of a creature that used to wander the meadow. 3 telegraphs to learn, 30–45 second fight. Drops a small gear chest.
- [ ] If the player drops below 25% HP at any point in room 17–19, a **rewarded-video revive offer** appears on death only (not pre-death) — see Part D for the failure flow. We do not pop a $0.99 revive IAP on the first run; ad-only revive in week 1 to protect the early-funnel.

### Scene 14 — The Cliffhanger (Room 20 Boss — Deferred) (~08:30 – 09:00)

- [ ] Player approaches room 20. The boss door is visible — a tall stone arch with carved suns, light glowing from behind it.
- [ ] **Subtle cliffhanger:** before the player can enter, a soft fade-to-Lobby trigger fires *not* on energy depletion (the player still has energy) but on a scripted **"first floor pre-boss" exit moment** that frames as a *natural rest beat*, not a paywall.
- [ ] An end-of-floor screen rises: "Floor 1 Cleared — Bonus Run Tomorrow." Shows the run's drops, gold earned (animated count-up), XP earned, and a *single* tomorrow-tile that says "Day 2: New Quests + Daily Dungeon Unlocks."
- [ ] **Critical design rule:** the cliffhanger must *never* feel forced. The boss is reachable in run 2. Players who want to fight the boss immediately can; the "rest tomorrow" copy is a *suggestion*, not a gate. (A gate here would tank D1 retention — see `research/monetization/f2p-patterns.md` §8: "let the player win for the first 10 minutes.")

**NARRATOR (V.O.) (line N-04):**
> "Come back. There is more light to carry."

### Scene 15 — Heroes Tab Lights Up + Mastery Node Unlocks (~09:00 – 09:30)

- [ ] Back at Lobby. The Heroes tab pulses brighter than before. A small "1" badge sits on it.
- [ ] Player taps it. The Heroes screen opens, the Dawnbow is centered, and a **Mastery Path node** at the level-20 ring lights up with a soft chime (line N-05 is *not* played here — UI sound only, to preserve the voice budget).
- [ ] Tooltip: "Mastery Path: Level her up to unlock." No deep tutorial yet. The grid is visible but only the first ring is interactive.
- [ ] Player can close the tab and continue.

### Scene 16 — The Starter Pack Offer Appears (~09:30 – 09:45)

- [ ] As the player closes the Heroes tab, a one-time modal slides in from the bottom of the screen.
- [ ] **The Beacon Pack** ($0.99, 48h timer) — sourced from `design/04` §5:
  - +600 gems (3× the seed grant).
  - +5,000 gold.
  - 3× Energy refill stones.
  - 1× guaranteed Epic ability scroll (usable on next run for a free pick).
- [ ] The modal has a single "View" CTA and a clear "Maybe later" X in the corner. **No dark patterns.** Dismissing it does not hide the offer permanently; it surfaces again only as a non-modal Lobby card with a visible countdown.
- [ ] No voice line on the offer. Voice budget is reserved for in-world beats.

### Scene 17 — The Daily Login Calendar Reveal (~09:45 – 10:00)

- [ ] Immediately after the Beacon Pack modal closes (or is dismissed), the **Daily Login Calendar** card in the top-right pulses and auto-opens once.
- [ ] Day 1 is already claimed (animation: chest icon swaps to checkmark). Days 2–7 are visible with reward icons. Day 7 is highlighted as the "wow" day with a hero-shard icon (the season hero teaser).
- [ ] Player taps to dismiss. The card collapses back to the corner.

### Scene 18 — The Push Notification Pre-Prompt (~10:00 – 10:30)

- [ ] One natural, earned beat for the push permission ask. This is the only iOS-system prompt fired on day 1.
- [ ] **In-game pre-prompt** (modal, before the OS dialog), worded to drive opt-in:
  > **Title:** Keep your light burning.
  > **Body:** We'll let you know when your energy is full and when a daily quest is waiting. That's it. No spam.
  > **CTAs:** "Notify me" (primary) / "Not now" (secondary).
- [ ] If the player taps **Notify me**, the iOS OS-level prompt fires immediately after. If they tap **Not now**, no OS prompt is shown today; the pre-prompt may re-fire on day 3 *only* if the player has logged in both day 2 and day 3 (one re-ask per week max).
- [ ] Best-practice opt-in rate: 60–70% with this pattern, per `research/monetization/liveops-retention.md` §6.3.

> **Day 1 wrap.** The player now: knows how to play, has a Legendary weapon and a Spirit, has cleared a Floor up to the boss-door cliffhanger, has seen the Heroes tab and the Mastery system, has seen their first IAP offer, has joined the Daily Login chain, and (probably) has push notifications on. Every system shown so far has been *earned*, not pushed. No shop tab, no gacha tab, no battle pass tab yet. Those come on days 2, 3, and 7.

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

**Hook:** First daily login bonus reward + first daily quests panel + first new mode (Daily Dungeon, an energy-free 1–2 minute mini-run).

**Voice line on app open (line N-06):**
> "Day breaks. Walk with me."

- [ ] App opens to a 1-second Lobby fade-in. The Daily Login Calendar slides forward, day-2 reward (200 gold + 1 ability scroll) animates into the inventory, and the card returns to the corner.
- [ ] A new card appears in the Lobby: **Daily Quests** (3 tasks for week 1; 6 for veterans). The 3 launch-week tasks:
  1. Clear 5 rooms in any mode.
  2. Kill 100 enemies.
  3. Pick 5 abilities in a run.
- [ ] Each quest pays Pass Points + a small gold/gem stipend. Filling the **activity bar** unlocks a small chest.
- [ ] The Lobby's bottom-bar surface gains a new icon: **Daily Dungeon** (a soft purple gate). It is the new mode unlocked today.
- [ ] **On-screen prompt (P-10):** "A new path opens."
- [ ] Player taps Daily Dungeon → enters a short 5-room mini-floor with a guaranteed gear drop. No energy cost. Designed to be completed in ≤ 2 minutes even by a slow player.

**Push notification (sent at 09:05 player local, morning of day 2):**
> "Your daily quests are open in Lucent."

**IAP surface today:** the **Daily Deal** card surfaces in the bottom-bar. A $0.99 rotating bundle (today's roll: 200 gems + 1,000 gold + 1 Spirit fragment). 24-hour timer.

---

### Day 3 — "A Season Begins"

**Hook:** Battle Pass intro with a free 5-tier headstart so the pass feels half-complete before the player engages with it. (`research/monetization/f2p-patterns.md` §7 "instant rewards on purchase" pattern, applied to free track for trust-building.)

**Voice line on app open (line N-07):**
> "The seasons turn. So do you."

- [ ] Lobby opens. The Battle Pass tab unlocks with a soft fanfare (FMOD: `UI_Unlock_BattlePass`). A glowing icon labeled "Season 1: Vale of First Light" appears in the bottom-bar.
- [ ] Tapping the tab reveals the 45-day season pass. Free track is on the left; premium track is on the right. Tiers 1–5 are auto-claimed (the headstart).
- [ ] A small modal explains the pass in three lines of text + one image:
  - "Play to earn Pass Points."
  - "Free rewards every tier."
  - "Unlock premium for the season hero, more gems, exclusive cosmetics."
- [ ] **Two IAP cards** appear in the pass modal:
  - **Battle Pass — Lite** at $4.99: unlocks the paid track.
  - **Battle Pass — Premium** at $14.99: paid track + 5-tier skip + cosmetic + 1 free 10-pull.
- [ ] *No "Buy a Hero" pass-tier shown on day 3* — that surface is locked until the player has completed at least one full chapter. Drip-feed the high-ARPU surfaces.

**Push notification (sent at 19:30 player local, evening of day 3):**
> "A new season has begun in the Vale."

**IAP surface today:** Battle Pass Lite + Premium. Beacon Pack still active for the rest of the day.

---

### Day 4 — "The First Weekly Boss"

**Hook:** Weekly Boss room unlocks. Ad-watch chests + ad-watch energy refills surface in the Lobby for the first time.

**Voice line on app open (line N-08):**
> "Something old wakes in the Vale."

- [ ] The Lobby gains a new card: **Weekly Boss** ("The Withering Stag, awakened"). Players get 3 attempts/day, can deal damage cumulatively, and unlock damage-tier rewards. A bracketed leaderboard (50-player shards) shows the current top of the player's bracket.
- [ ] A new **Free Chests** panel appears in the Lobby (sourced from `design/04` §6). It has 5 ad-watch slots:
  1. Free chest (4/day cap).
  2. Energy +5 (4/day cap).
  3. Free spin (1/day cap).
  4. Battle Pass +Pass Points (1/day cap).
  5. Lucky shop refresh (1/day cap).
- [ ] **On-screen prompt (P-11):** "Watch. Earn. Repeat."

**Push notification (sent at 09:30 player local, morning of day 4):**
> "The Withering Stag stirs. Strike first."

**IAP surface today:** **Gem Packs** surface in the shop for the first time, but only the bottom three tiers ($0.99, $4.99, $9.99). The $19.99/$49.99/$99.99 tiers remain hidden until day 8+ (post-FTUE-window) — these are the whale-anchor tiers and we want them to land *after* the player has formed a daily habit, not before. (Progressive monetization unlock — `research/monetization/f2p-patterns.md` §8, Survivor.io pattern.)

---

### Day 5 — "First Boss, First Mode"

**Hook:** The player returns to Chapter 1, Floor 1's boss room and kills the chapter boss. This unlocks the **Tower** mode.

**Voice line on the boss-room approach (line N-09):**
> "The first dark thing was never the worst."

**Voice line on boss-room victory (line N-10):**
> "One realm. Now six more."

- [ ] Player picks Campaign, enters Floor 1 of the Vale, plays through (the boss is also reachable by the much-shorter "skip to boss" option that unlocks at run-2; see Part D edge case for that branch).
- [ ] Boss is **Tatterhorn, the Forgotten Watcher** — a Vale-themed corrupted shepherd-Echo. 3 phases, ~90 seconds total.
- [ ] On boss kill: a long victory beat. Confetti. End-of-run screen. A short narrator victory line (N-10).
- [ ] Lobby returns. The bottom-bar gains a new icon: **Tower** (a tall spire silhouette). It's a mode badge with a small "NEW" pip.
- [ ] **On-screen prompt (P-12):** "Climb."
- [ ] Brief Tower tutorial card explains: endless floors, escalating difficulty, leaderboard, 3 energy per run. No forced first-Tower-run — the player can ignore Tower and come back to it later.

**Push notification (sent at 09:30 player local, morning of day 5):**
> "The Vale awaits its champion."

**IAP surface today:** **Privilege Card** subscription $4.99/30d surfaces in the shop with a "First Subscription" 3-day-free-trial offer (per `research/monetization/f2p-patterns.md` §11.1). No banner-style modal — it joins the shop tab quietly.

---

### Day 6 — "You Are Not Alone"

**Hook:** First guild invite prompt + Async PvP arena introduction. Day 6 is *the social day*, because Pillar 6 makes social the D30+ extender.

**Voice line on app open (line N-11):**
> "Others walk this path. Find them."

- [ ] On Lobby open, a soft notification slides down from the top: "You've been seen by a Guild." The guild **The Lanternbearers** (a launch-seeded NPC guild that auto-accepts new players to keep the social pool warm during soft launch — see Part D for the offline / no-real-guild case) extends an invite.
- [ ] Player taps to view. The Guild screen opens: 30/30 members (filled with low-activity NPCs + real returning players, mixed seamlessly), guild chat (read-only until accept), guild boss preview, donation panel.
- [ ] **On-screen prompt (P-13):** "Join, or walk alone."
- [ ] If the player accepts: a Guild-tab icon appears in the bottom-bar permanently.
- [ ] If the player declines: the prompt re-fires once on day 8 with a different guild option. After that, the Guilds tab is still discoverable from the Lobby menu but no longer pushed.
- [ ] Independently, the **Async PvP Arena** is surfaced as a side-card in the Guilds tab UI (it's its own mode, but day-6 reveal is bundled because both are "social" in player mental model). 5 daily PvP attempts, replay-based, bracketed.

**Push notification (sent the evening of day 6, ~20:00 local):**
> "A guild has invited you. Tap to see."

**IAP surface today:** **No new IAP surfaces today.** This is the intentional rest day for offer pressure. Player should *feel* a quiet day. (Critically important: monetization fatigue is real, and the day before the big day-7 surge needs to be calm.)

---

### Day 7 — "The First Long Run"

**Hook:** Survival mode unlocks. The first Hero Gacha banner opens with a 10-pull featured offer. The **Beacon Pack starter offer expires today** (48h timer placed it here intentionally — Beacon Pack started day 1, 48h means it dies during the day-7 wave; we want one final visible countdown).

**Voice line on app open (line N-12):**
> "Stand. The light remembers."

- [ ] The bottom-bar's last empty slot lights up: **Survival** (a circular arena icon). Tapping it explains the mode in one line: "Survive as long as you can. The horde grows."
- [ ] First Survival run is energy-cost-discounted by 50% (a 2-energy run instead of 4), once per player, to lower friction on first try.
- [ ] **On-screen prompt (P-14):** "Hold the light."
- [ ] After (or before) the player tries Survival, the **Hero Gacha banner** unlocks. Featured: **The Prismborn**, a launch hero per `design/03` Hero Fantasy Framework. 10-pull soft pity, 50-pull hard pity. Rates are visible on the banner entry screen (Apple compliance + `design/00` Pillar 5).
- [ ] Free **first 10-pull** is gifted — every new player gets one guaranteed Epic+ in their first pull (the "first gacha pull guaranteed Epic" from `design/01` §6 day-1 table is intentionally **slid to day 7** in this script to align with the gacha tab reveal; this matches the progressive-unlock pattern and protects the day-1 funnel from gacha-overwhelm).

**Push notification (sent the night of day 6, ~21:00 local, "tomorrow's hook"):**
> "Tomorrow: the first banner opens. The first hero waits."

**Push notification (sent the morning of day 7, ~09:30 local):**
> "Your first Survival is open. The horde gathers."

**Push notification (sent the evening of day 7, ~20:00 local, urgency):**
> "The Beacon fades at midnight. One last chance."

**IAP surfaces today (the big wave):**
- **Monthly Card** $9.99/30d goes live. Visible as a permanent Lobby card with the gem-drip preview ("+200 immediate / +100 daily for 30 days = 3,200 gems total").
- **Hero Gacha** banner with single-pull (60 gems) and 10-pull (540 gems) buttons. First 10-pull is free.
- **Beacon Pack** expires at midnight tonight with a visible countdown the player has now seen for ~36 hours.
- **Daily Premium Deal** $2.99 surfaces today (was hidden during days 1–6; today it joins the Daily Deal as a sibling).

> **End of Day 7 wrap.** The player has seen and engaged with all 4 launch modes (Campaign, Daily Dungeon, Tower, Survival), the Battle Pass, Daily Quests, Guilds + Async PvP, Heroes/Mastery, the Talent Grid (Inscription), the Forge (gear upgrade), the Hero Gacha banner with rates published, all 5 ad placements, and the full launch IAP catalog except the $39.99 "Buy a Hero" pass tier and the largest gem packs ($19.99+). Those will land in week 2 once daily habit is firmly established. **D7 retention KPI target: ≥ 20%** per `design/05` and per the genre's top-quartile benchmark in `research/monetization/liveops-retention.md` §8.

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
