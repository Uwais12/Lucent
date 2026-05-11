# Core Loop Spec — Lucent

## 1. The 7-second moment-to-moment loop

1. Player moves (joystick).
2. Player releases joystick → character roots and **auto-fires** at nearest valid target.
3. Enemies approach, telegraph, attack.
4. Player dodges or trades damage; picks up gold / XP orbs.
5. Repeat until room is cleared.

**Inputs**: one virtual joystick (bottom-left or bottom-right, player-configurable). One tap-to-trigger active button (bottom-right or bottom-left, opposite of joystick). One pause button (top-right).

**Default fire**: auto-aim picks the nearest enemy in a 360° arc. No reticle. No firing button.

## 2. The 1-minute room loop

1. Player enters a 4:6 aspect "arena" (portrait-friendly).
2. Doors lock. Enemies spawn in waves (1–3 waves per room).
3. Player clears all enemies.
4. Doors unlock; a chest or pickup drops in the room.
5. Player walks to one of the exits → triggers an **ability pick screen**.
6. **3 cards drawn** from the pool (weighted by rarity, see ability pick rules below). 1 free reroll per pick (gold cost from pick #2 onward in the same room).
7. Player picks one. Game advances to next room.

## 3. The 8–15 minute run loop (Campaign mode)

A "floor" is **20 rooms** including 2 special and 1 boss room.

Room composition for a standard floor:
- Rooms 1–4: light combat (1–2 archetypes, ≤4 enemies on screen).
- Room 5: **first offer-giver** (Angel/Devil/Spirit choice; see §4).
- Rooms 6–9: medium combat (mix of archetypes, light elites).
- Room 10: **shop room** (spend gold for one of: heal, ability, gear stat reroll).
- Rooms 11–14: heavy combat (multi-archetype waves, AoE telegraphs introduced).
- Room 15: **second offer-giver**.
- Rooms 16–19: hardest combat (mini-boss possible in 18 or 19).
- Room 20: **chapter boss** (3 phases, ~90 seconds).

After the boss: end-of-run screen → rewards → back to map.

## 4. The Three Offer-Givers (Archero 2 lift)

At rooms 5 and 15, the player picks **one** of three NPCs. Each offers a stronger-than-standard ability or transformation.

| Offer-giver | Vibe | Trade |
|---|---|---|
| **Angel of Dawn** | Pure buff | Pick any Rare or Epic ability, no downside. |
| **Devil of Dusk** | Faustian | Pick any Legendary ability, but lose 30% max HP (one-time). |
| **The Lucent Sprite** | Build-shaper | Forces a re-roll of your current top ability into a different family — useful for unbricking a stuck build. |

Choosing the same offer-giver twice in one run unlocks their stage-2 menu (more powerful but more expensive).

## 5. The full session loop (mobile player session)

1. Open app → animated splash → home screen.
2. **Daily check-ins flush**: login calendar, mailbox, claimable quests from prior session, time-based event tokens. ≤15 seconds, skippable.
3. Pick a mode (Campaign, Tower, Survival, Daily Dungeon, PvP).
4. Run for 3–15 minutes.
5. Post-run: claim rewards, equip new gear, level talents, spend currencies, check battle pass, peek at guild.
6. Repeat 1–3 more runs or close app.

**Energy cost**: 6 per Campaign run, 0 for Daily Dungeon, 3 for Tower, 4 for Survival, 0 for PvP. Energy cap 30, regen 1/12min, full refill cycle = 6 hours.

## 6. The 7-day onboarding loop (FTUE)

| Day | Hook | Unlock |
|---|---|---|
| 1 | Tutorial run, hero unlock, free starter pack, first gacha pull guaranteed Epic | Heroes screen, Talent grid (1 unlocked tier) |
| 2 | First daily login bonus, first daily quests | Daily Dungeon mode |
| 3 | First battle pass intro, free 5-tier headstart | Battle Pass tab |
| 4 | First weekly boss + first ad-watch reward chain | Ad chest, weekly boss |
| 5 | First chapter boss kill → Tower mode unlock | Tower mode |
| 6 | First guild invite prompt | Guilds tab |
| 7 | First Survival run; first big "starter pack" timed offer ends in 24h | Survival mode, premium offer revealed |

## 7. The seasonal loop (LiveOps cadence)

- **Daily reset**: 09:00 player local. New daily quests, free chest, refreshed shop offers.
- **Weekly reset**: Monday 09:00 local. New weekly missions, weekly boss reset, PvP leaderboard soft-reset.
- **Battle pass season**: 45 days. New season hero (free path via campaign progress + shards; premium path via pass).
- **Special events**: 7-day "Towers of Light," 5-day "Banner Festival," 3-day "Lucent Tournament," 14-day collab — rotated so 1–2 are live at any time.
- **Anniversary**: 1 large tentpole event per year with permanent additions.

## 8. End-state for new content (what gets added every patch)

| Cadence | Adds |
|---|---|
| Every 2 weeks | 5–10 new abilities, 1 new gear set, balance tuning, new event |
| Every 4 weeks | 1 new hero (free + premium path), 1 new pet |
| Every 6–8 weeks | 1 new chapter / biome (5 rooms or 1 boss + 4 rooms) + 1 music track |
| Quarterly | Major feature (co-op, new mode, etc.) |
| Annually | Anniversary event, story chapter conclusion, prestige reset |
