# In-Run Abilities Catalog — Lucent: Shards of the Shattered Sun

> The full launch pool of **120 in-run abilities**, picked between rooms via 3-card draft with one free reroll per pick. Damage stacks **multiplicatively** per Pillar 2. All numbers are first-pass tuning targets and will be validated in vertical-slice playtesting.

## Distribution at a glance

| Rarity | Count | Share | Where it shows up |
|---|---:|---:|---|
| Common (white) | 30 | 25% | Rooms 1–4, default level-up pool floor |
| Rare (blue) | 40 | 33% | Rooms 5+, common Angel offer |
| Epic (purple) | 30 | 25% | Boss-completion pool, Angel mid-floor |
| Legendary (gold) | 15 | 12.5% | Devil offer, late-floor weighting, Awakened ingredients |
| Mythic (prismatic) | 5 | 4% | Boss-floor Devil only, hard-gated, one-per-run cap |

Family targets (achieved exactly):

| Family | Count | C | R | E | L | M |
|---|---:|---:|---:|---:|---:|---:|
| Projectile-mod | 30 | 10 | 10 | 7 | 2 | 1 |
| Damage-type | 22 | 6 | 8 | 5 | 2 | 1 |
| Defensive | 12 | 4 | 4 | 3 | 1 | 0 |
| Movement | 8 | 3 | 3 | 2 | 0 | 0 |
| Summon | 10 | 2 | 4 | 3 | 1 | 0 |
| Aura | 10 | 3 | 3 | 2 | 1 | 1 |
| Orbit | 8 | 1 | 3 | 2 | 2 | 0 |
| Synergy / Conditional | 12 | 1 | 3 | 3 | 4 | 1 |
| Boss-shredder | 4 | 0 | 1 | 1 | 1 | 1 |
| Combo | 4 | 0 | 1 | 2 | 1 | 0 |
| **Total** | **120** | **30** | **40** | **30** | **15** | **5** |

### Universal stacking rules

- **Multishot-class projectile counts (Front/Side/Back/Diagonal):** each stack adds a projectile but subtracts a per-pick damage tax. Hard cap at 3 stacks per direction; soft cap on total projectile budget at 12 (over 12, additional picks reroll on offer).
- **Multipliers (ATK%, AS%, Crit%, etc.):** additive within an ability (Pick 2 = +X% more), multiplicative *across* abilities. This is the core of Pillar 2's "screenshot moment."
- **Status effects:** each element's "Touch" Common can take 1 pick (binary on/off), each "Surge" Rare takes 2 picks, each "Prism" Epic takes 1 pick. Stacking ceiling exists to prevent infinite DoT loops.
- **Legendaries are one-of:** no second pick offered. The catalog uses Lendgary as a *transformer* — it changes a behavior, not just scales it.
- **Mythics are one-per-run, hard-gated:** must be Devil-offered on a boss floor (rooms 15 or 20) and consume that offer slot entirely.

---

## Family 1 — Projectile Modifiers (30)

The most build-defining family. Multiplies what every "stop-to-shoot" frame produces.

| Name | Rarity | Effect text | Mechanical spec | Stack behavior | VFX/audio hook | Synergy notes |
|---|---|---|---|---|---|---|
| **Front Arrow** | Common | An extra arrow flies straight ahead. | +1 projectile in the forward 0° lane, –10% damage per stack. | Stacks up to 3; mutually-taxing with Multishot. | Crystal click + soft prism flare aligned with main shot. | Bullet Hell core. |
| **Side Arrows** | Common | Twin arrows fire from your flanks. | +2 projectiles at ±90°, –8% damage per stack. | Stacks up to 2 (4 side arrows max). | Side-burst chime, mirrored particles. | Bullet Hell, Ricochet DoT. |
| **Rear Arrow** | Common | A shard glances backward at any chaser. | +1 projectile at 180°, –5% damage. | Stacks up to 2. | Behind-back swoosh + faint indigo trail. | Combo Brawler (kiting). |
| **Diagonal Volley** | Common | Two arrows arc forward-diagonally. | +2 projectiles at ±30°, –8% damage per stack. | Stacks up to 2. | Twin-prism whoosh, slight pitch detune. | Bullet Hell. |
| **Wide Spread** | Common | Your fan-shot widens by 6°. | Spread cone expands +6° per stack; +0% damage. Useful with multiple Front/Diagonal. | Stacks up to 3. | Subtle horn-flare on shot. | Bullet Hell, AoE clear. |
| **Tight Spread** | Common | Your shots converge. | Cone narrows –6° per stack. Counter-pick for boss runs. | Stacks up to 3; cancels Wide Spread 1-for-1. | Quiet zither pluck on shot. | Beam/Boss Killer. |
| **Lightstep Pierce** | Common | Arrows pass through one enemy. | Each projectile pierces 1 additional target, –10% damage per stack. | Stacks up to 2; anti-synergy with Ricochet (see clamp list). | Body crack-flash on pierce, crystal shatter sample. | Bullet Hell, Beam Killer. |
| **Glancing Shot** | Common | Hits have a chance to chip past armor. | 15% chance per shot to ignore 25% armor. | Stacks up to 2 (max 30%). | Faint ringing high-note on glance. | Boss Killer baseline. |
| **Smart Aim** | Common | Auto-aim leads moving targets. | Forward arrow adds 0.15s lead prediction; +0% damage. | Does not stack. | No audio change; subtle aim-cursor twitch. | All builds. |
| **Quickdraw** | Common | Modest attack-speed boost. | +8% attack speed. | Stacks up to 3 (cap +24%). | Faster bow-creak sample on shot. | Combo Brawler. |
| **Refracted Volley** | Rare | Each shot splits into 3 mid-flight. | Forward arrow splits into 3 at 60% range; each fragment deals 0.4× damage. | Does not stack with itself; chains with multishot. | Audible split "tink" + prism rainbow burst. | Bullet Hell, Ricochet DoT. |
| **Bouncing Beam** | Rare | Shots ricochet to a nearby enemy on hit. | 100% chance to ricochet once to nearest target within 4m at 60% damage. | Stacks: each pick adds +1 bounce, –10% damage per added bounce (cap 4). | Tinging crystal chime per bounce, light-ray VFX. | Ricochet DoT, Orbit Tank. |
| **Wallspark** | Rare | Shots bounce off room walls. | Projectiles bounce off arena walls up to 2 times at 80% damage per bounce. | Does not stack. | Sharper wall-ping than Bouncing Beam; sparks. | Bullet Hell + Ricochet stacking. |
| **Multishot** | Rare | Each pull fires a second full volley. | Fires a second salvo 8 frames later, –12% damage to all shots. | Stacks up to 2 (3 volleys, –24% total). | Double pluck on shot; soft echo layer. | Every offensive build. |
| **Homing Mote** | Rare | A homing motes seeks the closest threat. | Per shot, 1 projectile becomes a homing mote (0.7× damage, 30° turn rate). | Each stack converts +1 projectile to homing (cap 3). | Whisper-pitched sustained note; trailing dust. | Sprite Commander, Boss Killer. |
| **Long Lens** | Rare | Damage rises the farther a shot flies. | +1% damage per meter traveled, capped at +35%. | Does not stack; anti-synergy with Homing. | Higher pitch on long shots; ranged ping. | Beam/Boss Killer. |
| **Close Quarters** | Rare | Damage rises the closer the enemy. | +30% damage at <4m; falls off linearly to 0% at 9m. | Stacks up to 2 (cap +50%). | Lower bass thump on point-blank shot. | Combo Brawler, Glass Cannon. |
| **Charged Shard** | Rare | Slower, heavier shot. | –30% attack speed, +120% damage, +50% projectile size. | Does not stack; anti-synergy with Quickdraw. | Drawn-string charge sample, deep boom. | Beam/Boss Killer. |
| **Featherlight Volley** | Rare | Faster, lighter shots. | +25% attack speed, –20% damage. | Does not stack; anti-synergy with Charged Shard. | Higher pluck pitch, lighter VFX trail. | Combo Brawler. |
| **Prism Crit** | Rare | Each shot can refract into a critical strike. | +12% crit chance, +25% crit damage. | Stacks up to 3 (cap +36% chance / +75% dmg). | Sharp glass-tap on crit + rainbow flash. | Crit Glass Cannon. |
| **Pierce of the Long Dusk** | Epic | Pierce passes through all targets in a line. | Pierce count = infinite within shot range; –20% per-target damage falloff. | Replaces Lightstep Pierce stacks (mutually exclusive Epic). | Long indigo beam echo on shot. | Bullet Hell, Beam Killer. |
| **Shatter Volley** | Epic | Shots split on impact instead of mid-flight. | On hit, projectile splits into 4 shards (±45°, ±90°) at 0.35× damage. | Does not stack. | Crisp shatter SFX + small prism rain. | Ricochet DoT, Bullet Hell. |
| **Refractor's Multishot** | Epic | Adds a third volley with a twist. | +1 volley (3 total when stacked with Multishot), each volley shifted +15° to fan out. | Replaces Multishot stack 2 (mutually exclusive Epic). | Triple-pluck chord; widening prism arc. | Bullet Hell core. |
| **Wraithstep Shot** | Epic | Your shots phase through walls. | Projectiles ignore environment collision. | Does not stack. | Faint reverb on shot; particles fade through walls. | Boss Killer (across-room sniping). |
| **Hunter's Mark Volley** | Epic | Marked enemies pull arrows toward them. | Last-damaged enemy receives 100% homing on all your projectiles for 2s. | Does not stack. | Sigil glow on marked enemy + tracking whoosh. | Boss Killer, Crit Glass Cannon. |
| **Sunfracture** | Epic | All projectiles become piercing lasers. | Converts arrow weapons into 0.25s laser hitscan lines; +15% damage; range +20%. | Does not stack; replaces Charged Shard. | Sun-tone hum, brief bloom each shot. | Beam/Boss Killer. |
| **Bouncing Wallstorm** | Epic | Wall bounces multiply. | +3 wall bounces, no damage falloff. | Stacks with Wallspark; mutually exclusive with itself. | Sustained wall-ping echo. | Bullet Hell + Ricochet. |
| **Soul of Multishot** | Legendary | A fourth volley joins, no tax. | +1 volley with **no damage tax**; can exceed Multishot cap. | One-of (Legendary). Requires Multishot owned. | Choral swell on shot; quadruple-pluck. | Bullet Hell capstone. |
| **Refracted Lattice** | Legendary | Every shot becomes a 5-shot fan with shared pierce. | Forward arrow becomes a fixed 5-arrow fan at ±15° each, shared pierce/ricochet. | One-of. Mutually exclusive with Front Arrow stacks. | Lattice-of-light spawn SFX; sustained prism glow. | Bullet Hell, Ricochet. |
| **Sunshatter Cascade** | Mythic | Every projectile detonates on hit. | On any hit, projectile bursts into a 1.5m radius prism explosion (50% of projectile damage). Explosions can crit. | One-per-run. Devil-only. | Heavy bass boom + screen-tinted prism shockwave. | Build-defining for Meteor Rain / Bullet Hell hybrid. |

---

## Family 2 — Damage Types & Status Effects (22)

Lucent's four elements are **Ember, Frost, Storm, and Bloom (poison)**. Each ships in a Common "Touch," a Rare "Surge," and an Epic "Prism" tier — pre-existing picks get scaled, fulfilling the genre's Common-to-Epic upgrade loop.

| Name | Rarity | Effect text | Mechanical spec | Stack behavior | VFX/audio hook | Synergy notes |
|---|---|---|---|---|---|---|
| **Ember Touch** | Common | Shots set enemies on fire. | 25% chance to apply Burn (3s, 15% ATK/tick). | Binary; second pick = 50% chance. | Crackle layer on hit; orange embers. | Ricochet DoT, Meteor Rain. |
| **Frost Touch** | Common | Shots have a chance to chill. | 20% chance to slow enemy MS –30% for 2s. | Binary; second pick = 40% chance. | Glass-tinkle on hit; pale frost halo. | Combo Brawler, Boss Killer. |
| **Storm Touch** | Common | Shots arc lightning to one nearby foe. | 25% chance to chain to 1 enemy within 3m for 30% damage. | Binary. | Light zap SFX; thin lightning ribbon. | Bullet Hell, Sprite Commander. |
| **Bloom Touch** | Common | Shots poison. | 30% chance to apply Poison (5s, 10% ATK/tick). | Binary. | Hiss + green-violet mist. | Ricochet DoT. |
| **Crit Edge** | Common | A small bump to critical strikes. | +5% crit chance, +10% crit damage. | Stacks up to 3. | Tiny "tick" SFX on crit. | Crit Glass Cannon. |
| **Vulnerable Mark** | Common | Marked enemies take more damage. | First hit applies Mark (3s), +10% damage taken. | Stacks up to 2 (cap +20%). | Red sigil flash above enemy head. | All builds. |
| **Ember Surge** | Rare | Burn does more, faster. | Burn tick rate ×1.5, damage ×1.4. Requires Ember Touch. | Stacks up to 2 (cap +96% Burn). | Larger ember plume; deeper crackle. | Ricochet DoT. |
| **Frost Surge** | Rare | Chill becomes brief freeze. | 100% Frost chance; chill upgrades to 0.8s freeze. | Stacks: stack 2 = 1.5s freeze. | Audible ice-snap when freeze triggers. | Boss Killer (freeze windows). |
| **Storm Surge** | Rare | Lightning chains farther. | Chain bounces to 3 enemies, 45% damage each. | Stacks up to 2 (cap 6 chains). | Multi-zap chord SFX. | Bullet Hell. |
| **Bloom Surge** | Rare | Poison spreads on death. | On poisoned-enemy death, poison spreads to 2 nearest enemies. | Stacks up to 2 (4 spread). | Wet pop SFX + spreading mist. | Ricochet DoT capstone. |
| **Bleed** | Rare | Crits cause bleeding. | Crits apply Bleed (4s, 20% of crit damage as DoT). Bypasses armor. | Stacks up to 2 (cap 40%). | Wet rip SFX; red mist droplets. | Crit Glass Cannon. |
| **Crit Mastery** | Rare | A real crit jump. | +12% crit chance, +50% crit damage. | Stacks up to 2 (cap +24% / +100%). | Distinct "shing" on crit; brighter flash. | Crit Glass Cannon core. |
| **Corrosive Aura** | Rare | Enemies near you take more damage. | Foes within 4m suffer +25% damage from your sources. | Does not stack. | Acid-pulse aura + low hiss. | Combo Brawler, Boss Killer (in melee). |
| **Sundered Mark** | Rare | Marked targets get crit-friendly. | Mark also adds +25% crit chance against marked target. | Stacks with Vulnerable Mark. | Yellow sigil overlay on marked. | Crit Glass Cannon. |
| **Ember Prism** | Epic | Burns now blossom. | Burning enemies explode for 100% ATK in a 2m radius on death. | One-of (Epic upgrade). Requires Ember Touch. | Mid-bass boom; outward ember ring. | Ricochet DoT, Meteor Rain hybrid. |
| **Frost Prism** | Epic | Frozen enemies shatter for AoE. | Killing a frozen enemy detonates a 3m shard burst (75% ATK). | One-of (Epic). Requires Frost Touch or Surge. | Crystalline shatter SFX. | Boss Killer (mob clear after freeze). |
| **Storm Prism** | Epic | Lightning never stops. | Storm chains can re-chain to already-hit enemies after 0.5s. | One-of (Epic). Requires Storm Touch. | Sustained crackle bed. | Bullet Hell, Combo Brawler. |
| **Bloom Prism** | Epic | Poison stacks become catastrophic. | Poison can stack on a single target up to 5 times, multiplicatively. | One-of (Epic). Requires Bloom Touch. | Layered hiss; thickening mist. | Ricochet DoT capstone. |
| **Vivisect** | Epic | Crits hit twice. | 25% of crits hit a second time at 75% damage. | Stacks up to 2 (cap 50%). | Double-thunk on crit. | Crit Glass Cannon. |
| **Soul of Cinders** | Legendary | All elements ignite a final blaze. | Every status effect, on expiry, deals a final burst equal to 200% of its total damage. | One-of. | Choir + sustained ember sweep on each expiry. | Ricochet DoT, Meteor Rain. |
| **Prismsworn Crit** | Legendary | Crits become prismatic. | Crits apply all 4 statuses at 25% standard chance. | One-of. | Rainbow shatter SFX on crit. | Crit Glass Cannon + any DoT build. |
| **Lucent Eclipse** | Mythic | The Dim drinks every status. | Each unique status currently active on the room's enemies adds +25% damage to all your sources. Caps at +100% (4 statuses). | One-per-run. | Persistent indigo bloom on screen edges; choir hum when active. | Cross-build cap; defines Prism builds. |

---

## Family 3 — Defensive (12)

Smaller pool by design — dodging is the player skill (Pillar 1). Defensives buy time and bail on bad picks.

| Name | Rarity | Effect text | Mechanical spec | Stack behavior | VFX/audio hook | Synergy notes |
|---|---|---|---|---|---|---|
| **Lantern Heart** | Common | A little more max health. | +12% max HP. | Stacks up to 3 (cap +36%). | Glass-bottle clink on pickup, soft glow on portrait. | Orbit Tank. |
| **Mend** | Common | Heal a little, now. | Instant heal 25% max HP. | Stacks across picks (each pick adds another 25% instant heal). | Soft chime; petals VFX. | All builds in trouble. |
| **Shardbearer's Vigor** | Common | Better dodge. | +12% dodge chance. | Stacks up to 2 (cap +24%). | Whoosh + indigo afterimage on dodge. | Crit Glass Cannon, Combo Brawler. |
| **Stillshield** | Common | Tiny shield charges while you stand. | After 1.5s standing still, gain a 1-hit shield. | Does not stack (refreshes). | Faint hum when shield refills. | Combo Brawler. |
| **Refraction Ward** | Rare | A 2-second invulnerability after a hit. | When damaged, gain 1.5s iframes. 8s cooldown. | Does not stack. | Brief prism dome SFX + visual. | Glass Cannon save. |
| **Wraith Veil** | Rare | Chance to dodge ignores damage entirely. | +18% dodge; on successful dodge, gain +10% MS for 1s. | Stacks with Shardbearer's Vigor; cap dodge 50% globally. | Inky teleport-blip SFX. | Crit Glass Cannon. |
| **Lifedraw** | Rare | Heal a sliver per kill. | Heal 1.5% max HP per kill. | Stacks up to 2 (cap 3%). | Subtle heartbeat sample on kill. | Orbit Tank. |
| **Sunken Bulwark** | Rare | Two orbiting wards block projectiles. | 2 small orbs orbit you, each blocks 1 enemy projectile (regenerate after 8s). | Does not stack. | Stony scrape SFX on block. | Orbit Tank. |
| **Dawnshield** | Epic | A real, regenerating shield. | Adds a 25% max-HP overshield, regenerates 1/3 of itself after 6s out of combat. | Stacks up to 2 (cap 50%). | Bright bell on regen complete. | Orbit Tank capstone. |
| **Phoenix Spark** | Epic | One revive at half HP. | First lethal hit revives you at 50% HP. One-time per run. | Does not stack (one-time). | Big choral swell + ember pillar. | Bail-out for Glass Cannon. |
| **Mirror Parry** | Epic | A perfectly-timed dodge reflects damage. | Dodges within 0.2s of incoming projectile reflect it at 200% damage. | Does not stack. | Bright "shing" SFX + flipped projectile color. | Crit Glass Cannon. |
| **Soul of the Wardlight** | Legendary | You become substantially harder to kill. | +35% max HP, +20% dodge, +10% damage resist, +1 Phoenix Spark stack. | One-of. | Long brass swell; permanent low-blue aura. | Orbit Tank capstone. |

---

## Family 4 — Movement (8)

Limited pool by design (Pillar 1: dodging is the skill ceiling). Movement picks shape positioning loops, not damage.

| Name | Rarity | Effect text | Mechanical spec | Stack behavior | VFX/audio hook | Synergy notes |
|---|---|---|---|---|---|---|
| **Breath of Dawn** | Common | A small movement-speed bump. | +8% MS. | Stacks up to 3 (cap +24%). | Light air-puff SFX on move start. | All builds. |
| **Lightfoot** | Common | Smaller hitbox while moving. | Hitbox –12% while in motion. | Does not stack. | Subtle particle compression. | Crit Glass Cannon. |
| **Quickstep Recovery** | Common | Faster restart of auto-fire after moving. | Time-to-auto-fire-resume cut by 0.1s. | Stacks up to 2 (cap 0.2s). | Faster bowstring pull. | Combo Brawler. |
| **Wraithstep** | Rare | Phase through enemy bodies. | Enemies don't block movement; player phases on contact. | Does not stack. | Inky blur trail. | Bullet Hell, Glass Cannon. |
| **Cinderpath** | Rare | Leave a damaging trail. | While moving, leave a 1m-wide trail dealing 30% ATK/0.5s for 3s. | Stacks: each pick +50% trail damage. | Footstep + ember sizzle. | Meteor Rain, kiting builds. |
| **Blink** | Rare | Tap-active short-range teleport. | Tap-active: teleport 4m in joystick direction. 6s cooldown, 0.3s iframes during blink. | Does not stack. **Replaces hero active if hero has none equipped.** | Sharp prism-pop SFX + blink-out flash. | Boss Killer (repositioning). |
| **Sprintsong** | Epic | Big MS, no penalty. | +25% MS. | Does not stack; replaces Breath of Dawn stack 3. | Wind-chime arpeggio while moving. | All builds. |
| **Sunchase Dash** | Epic | Active dash with damage. | Tap-active: dash 5m with iframes, dealing 200% ATK in path. 8s cooldown. | Does not stack; replaces Blink if both rolled. | Brassy whoosh + light cone trail. | Combo Brawler, Glass Cannon. |

---

## Family 5 — Summons / Sprites (10)

Lucent's sprites are **shard-companions**: small drifting motes of light that mirror your stats at scaled-down values. Per pillar 8, they read as silhouettes — no two sprite types share a shape.

| Name | Rarity | Effect text | Mechanical spec | Stack behavior | VFX/audio hook | Synergy notes |
|---|---|---|---|---|---|---|
| **Mote of Light** | Common | A tiny sprite shoots at the nearest enemy. | Sprite fires 1 projectile/sec at 25% ATK. | Stacks up to 2 (2 motes max). | Soft chime on shot; pale dot VFX. | Sprite Commander entry. |
| **Sparkbat** | Common | A swooping bat-sprite tags targets. | Sprite dive-attacks for 30% ATK every 2s. | Does not stack. | Wing-flap + small whoosh. | Sprite Commander. |
| **Ember Sprite** | Rare | A fire sprite applying Burn. | Sprite fires for 35% ATK and applies Burn (per Ember Touch rules). | Does not stack. | Ember crackle + small flame sprite. | Ricochet DoT, Sprite Commander. |
| **Frost Sprite** | Rare | An ice sprite chilling foes. | Sprite fires for 35% ATK, applies 1.5s slow (–40% MS). | Does not stack. | Icy whisper SFX. | Sprite Commander, Boss Killer. |
| **Storm Sprite** | Rare | A lightning sprite chaining hits. | Sprite fires for 35% ATK, chains to 2 (25% ATK each). | Does not stack. | Sharp zap + crackle. | Sprite Commander, Bullet Hell. |
| **Bloom Sprite** | Rare | A toxin sprite. | Sprite fires for 35% ATK, applies Poison (per Bloom Touch rules). | Does not stack. | Wet bubble SFX. | Ricochet DoT, Sprite Commander. |
| **Sprite Boost** | Epic | All sprites hit harder and faster. | +50% sprite damage, +25% sprite AS. | Stacks up to 2 (cap +100% / +50%). | Brighter sprite glow + chime. | Sprite Commander core. |
| **Mirror Sprite** | Epic | A sprite that copies your projectile mods. | Sprite fires your full projectile pattern at 30% damage scaling. | Does not stack. | Mirror-shimmer SFX. | Bullet Hell + Sprite Commander hybrid. |
| **Laser Mote** | Epic | A beam-sprite that channels. | Sprite emits a 1s sustained beam every 3s, 50% ATK total. | Does not stack. | Sustained hum + harmonic. | Beam/Boss Killer + Sprite Commander. |
| **Sprite King** | Legendary | A larger sprite that hunts the strongest target. | Spawns a king sprite: 100% ATK, prioritizes elites and bosses, tracking. | One-of. Requires ≥2 sprite picks. | Rich choral chord + bigger silhouette. | Sprite Commander capstone. |

---

## Family 6 — Auras (10)

Pulsing, player-centered AoE. Lucent's flavor: each aura is a **refraction halo** in a different color band.

| Name | Rarity | Effect text | Mechanical spec | Stack behavior | VFX/audio hook | Synergy notes |
|---|---|---|---|---|---|---|
| **Warlight Aura** | Common | Modest passive damage bump. | +10% ATK. | Stacks up to 3 (cap +30%). | Faint pulse-hum, indigo aura. | All builds. |
| **Quicklight Aura** | Common | Modest attack-speed bump. | +10% AS. | Stacks up to 3 (cap +30%). | Subtle bell pulse. | Combo Brawler. |
| **Vitalight Aura** | Common | Modest max-HP bump. | +10% max HP. | Stacks up to 2 (cap +20%). | Soft warm pulse on portrait. | Orbit Tank. |
| **Slow Halo** | Rare | Enemies near you slow down. | Enemies within 3m have MS –25% and AS –20%. | Does not stack. | Low drone + visible blue halo. | Orbit Tank, Combo Brawler. |
| **Vampiric Halo** | Rare | Hits within your aura heal you. | When you damage an enemy within 4m, heal 1% max HP. 0.5s cooldown. | Stacks up to 2 (cap 2%, cooldown unchanged). | Wet pulse SFX on heal. | Orbit Tank, Glass Cannon. |
| **Crit Halo** | Rare | More crit in your bubble. | Within 4m, +15% crit chance. | Does not stack. | Bell-tone on crit within aura. | Crit Glass Cannon, Combo Brawler. |
| **Searing Halo** | Epic | Constant Burn aura. | Enemies within 3m take Burn ticks (per Ember Touch rules) regardless of weapon. | Stacks with Ember Touch. | Persistent ember-crackle bed. | Ricochet DoT, Orbit Tank. |
| **Power Trio** | Epic | ATK + AS + HP, all at once. | +15% ATK, +15% AS, +15% max HP. | Stacks up to 2 (cap +30/30/30). | Triple-chord chime on pick + faint trio glow. | All builds; pillar Epic. |
| **Soul of Lucent** | Legendary | Your aura encompasses the room. | All other auras you own extend to 8m and gain +30% effectiveness. | One-of. Requires ≥2 aura picks. | Room-wide low-blue tint pulse; sustained harmonic. | Orbit Tank capstone. |
| **The Last Sun** | Mythic | Your light damages everything it touches. | Permanent 5m radius dealing 100% ATK/0.5s. Cannot crit. Stacks all your statuses on contact. | One-per-run. | Halo bloom + sustained celestial choir. | Orbit Tank, Ricochet DoT, Meteor Rain. |

---

## Family 7 — Orbit / Independent Weapons (8)

Things that fire on their own clock — orbiters, meteors, strikes. Lets the player redirect attention to dodging.

| Name | Rarity | Effect text | Mechanical spec | Stack behavior | VFX/audio hook | Synergy notes |
|---|---|---|---|---|---|---|
| **Lantern Orbit** | Common | A lantern orbits you, dealing contact damage. | 1 orb at 3m radius, 30% ATK on contact, 0.5s ICD per enemy. | Stacks up to 3 (3 orbs max). | Soft swing-chime as orb rotates. | Orbit Tank. |
| **Ember Orbit** | Rare | A flame orb applying Burn. | 1 orb, 40% ATK, applies Burn on contact. | Does not stack (one of element). | Flame-whoosh per rotation. | Ricochet DoT, Orbit Tank. |
| **Frost Orbit** | Rare | An ice orb that slows. | 1 orb, 40% ATK, applies Frost slow on contact. | Does not stack. | Crystal-chime per rotation. | Orbit Tank, Boss Killer. |
| **Storm Orbit** | Rare | A lightning orb chaining hits. | 1 orb, 40% ATK, chains to 2 (25% ATK each). | Does not stack. | Sharp zap per rotation. | Orbit Tank, Bullet Hell. |
| **Beam Orbit** | Epic | 2 laser orbs emit beams. | 2 orbs each fire a 0.5s beam every 2s at 50% ATK. | Does not stack. | Sustained hum per beam. | Beam Killer + Orbit Tank. |
| **Meteor Pursuit** | Epic | A meteor falls every few seconds. | A 2m meteor crashes every 4s near nearest enemy for 150% ATK. | Stacks up to 2 (cap +50% damage, –1s ICD). | Whistle wind-up + ground-crack boom. | Meteor Rain. |
| **Soul of the Meteor Choir** | Legendary | Two meteors fall on a rapid cadence. | Spawns 2 meteors every 3s, each 200% ATK, applies a random status. | One-of. Requires Meteor Pursuit. | Layered whistle-chord, dual-boom. | Meteor Rain capstone. |
| **Soul of the Prism Orbit** | Legendary | All orbits double, faster. | All orbs gain +1 copy (orbiting opposite direction), +50% rotation speed. | One-of. Requires ≥2 orbit picks. | Brighter, harmonized orbit hums. | Orbit Tank capstone. |

---

## Family 8 — Synergy / Conditional (12)

These pay off only if your build supports them. They are the "I am running a build" picks.

| Name | Rarity | Effect text | Mechanical spec | Stack behavior | VFX/audio hook | Synergy notes |
|---|---|---|---|---|---|---|
| **Streak Fervor** | Common | Killing enemies stacks attack. | +3% ATK per kill in last 6s, cap 10 stacks (+30%). | Does not stack pickwise. | Rising whoosh per stack. | Combo Brawler. |
| **Wounded Resolve** | Rare | Damage taken fuels damage dealt. | +25% ATK for 4s after taking damage. | Does not stack. | Heartbeat thump on proc. | Glass Cannon. |
| **Standstill Surge** | Rare | Standing still ramps attack speed. | Every 1s standing still: +6% AS, cap 10 stacks (+60%). Drops 1 stack per 0.25s moving. | Does not stack pickwise. | Rising bell-tone ladder. | Combo Brawler core. |
| **Low-Light Rage** | Rare | Bigger hits at low HP. | +30% ATK while ≤40% HP. | Stacks up to 2 (cap +50%). | Bass thump bed while active. | Glass Cannon. |
| **Every Fifth Shot** | Epic | Each fifth pull empowers. | Every 5th shot deals 300% damage and pierces. | Stacks up to 2 (cap 4th, 600% damage). | Distinct deep "boom" SFX on empowered shot. | Bullet Hell, Boss Killer. |
| **Killstreak Bloom** | Epic | Chain kills give brief invulnerability. | Killing 4 enemies within 3s grants 1s iframes. | Does not stack. | Quick triple-chime + bright flash. | Combo Brawler. |
| **Crit Cascade** | Epic | Crits beget crits. | Each crit increases crit chance by +5% for 3s, cap +25%. | Does not stack. | Climbing pitch SFX on crit. | Crit Glass Cannon core. |
| **Soul of the Glasswound** | Legendary | At low HP, you become deadly. | At ≤30% HP: +60% ATK, +30% AS, +40% crit chance. Lose 15% max HP on pick. | One-of. | Sustained bass drone + indigo screen vignette. | Glass Cannon capstone. |
| **Soul of the Standing Pillar** | Legendary | Stand-still becomes a build. | After 3s still: deploy a 4m halo dealing 150% ATK/0.5s. While standing still: +50% damage. | One-of. | Pillar-of-light VFX rising. | Combo Brawler capstone. |
| **Soul of the Untouched** | Legendary | Going untouched pays. | Every 5 consecutive rooms cleared without damage: permanent +10% ATK, +5% AS. Max 4 stacks. | One-of. | Bright choir on stack gained. | Skill-expression build. |
| **Soul of the Demon Slayer** | Legendary | Every kill makes you stronger. | +1.5% ATK per kill, cap +75%. Stacks persist this floor. | One-of. | Low growl on each kill bonus. | Bullet Hell, Combo Brawler. |
| **Prismborn Convergence** | Mythic | Every build-defining stat triggers off the others. | Each of (Multishot owned, Crit ≥40%, ≥2 sprites, ≥2 orbits, ≥3 statuses active) adds +15% ATK. Max +75%. | One-per-run. | Sweeping prism rainbow on screen edge while active. | Cross-build payoff. |

---

## Family 9 — Boss-Shredder (4)

Few but loud. The "pivot for the boss" picks.

| Name | Rarity | Effect text | Mechanical spec | Stack behavior | VFX/audio hook | Synergy notes |
|---|---|---|---|---|---|---|
| **Echohunter** | Rare | More damage to elites and bosses. | +25% damage vs. Boss/Elite-tagged enemies. | Stacks up to 2 (cap +40%). | Distinct higher-pitch hit on boss. | Boss Killer. |
| **Sundering Arrow** | Epic | Bosses take true damage. | All damage you deal ignores 50% of target armor; +20% damage vs. Boss. | Does not stack. | Heavy metallic crack on hit. | Boss Killer. |
| **Soul of the Boss-Slayer** | Legendary | Bosses bleed, full-heal before. | +50% damage to Boss; full-heal triggers when entering boss room; bosses suffer Bleed at +50% Bleed damage. | One-of. | Brass swell on boss-room entry. | Boss Killer capstone. |
| **Execute: Dim's Edge** | Mythic | A finishing window on bosses. | When Boss falls below 15% HP: gain +200% damage and +50% AS vs. them. | One-per-run. | Black-and-prism vignette on activation; sustained low hum. | Boss Killer, Crit Glass Cannon. |

---

## Family 10 — Combo (4)

Chain-kill builders that reward sustained pressure.

| Name | Rarity | Effect text | Mechanical spec | Stack behavior | VFX/audio hook | Synergy notes |
|---|---|---|---|---|---|---|
| **Cascade Strike** | Rare | Continuous attacks stack a damage multiplier. | Every 0.5s of continuous attack: +5% damage to next shot, cap 8 stacks (+40%). Resets on 1s pause. | Does not stack pickwise. | Rising harmonic ladder while attacking. | Combo Brawler core. |
| **Killpulse** | Epic | Kills empower your next shot. | After a kill: next shot within 2s deals +80% damage and pierces. | Stacks up to 2 (cap +120%, 2 pierces). | Distinct "shing" on empowered shot. | Combo Brawler, Bullet Hell. |
| **Chainflame** | Epic | Status-killed enemies explode into chain damage. | When a status-DoT kills, trigger a 1.5m burst dealing 50% ATK. Can chain to start new bursts (max 3 chains/event). | Does not stack. | Cascading pop-pop-pop SFX. | Ricochet DoT capstone. |
| **Soul of the Combo Choir** | Legendary | Sustained combat unlocks a multiplier. | Every 1s of continuous combat (attacks landing): +2% ATK and +1% AS to all sources. Caps at 25 stacks. Resets if no hit for 2s. | One-of. | Rising layered choir track. | Combo Brawler capstone. |

---

## Section A — 8 Named Build Archetypes

Each archetype below names the **defining core** (the 4–6 picks that mark the build), a couple of **flex picks** (any of which deepens it), and the **broken moment** — the specific in-run instant where the build "clicks" and the player wants to screenshot.

### 1. Bullet Hell

The screen-filling fan. The screenshot every TikTok wants.

- **Core:** Front Arrow (×3), Side Arrows (×2), Diagonal Volley (×2), Multishot, Refractor's Multishot
- **Flex:** Wide Spread, Lightstep Pierce, Wallspark, Storm Touch, Soul of Multishot, Refracted Lattice
- **Broken moment:** First time you fire and 15+ glowing arrows fill the arena in a fan. Stand-still feels like you're standing inside a chandelier.

### 2. Ricochet DoT

A single shot detonates the entire room over 5 seconds.

- **Core:** Bouncing Beam (×4), Wallspark, Refracted Volley, Ember Touch, Ember Surge, Bloom Touch
- **Flex:** Ember Prism, Bloom Prism, Searing Halo, Chainflame, Soul of Cinders
- **Broken moment:** You pull once; a single arrow chains through 6 enemies, all of them ignite, and 3 seconds later the room is empty without you firing again.

### 3. Crit Glass Cannon

You die in two hits. Your hits deal twelve thousand damage.

- **Core:** Prism Crit (×3), Crit Mastery (×2), Crit Cascade, Vivisect, Low-Light Rage
- **Flex:** Crit Halo, Sundered Mark, Bleed, Prismsworn Crit, Soul of the Glasswound, Phoenix Spark
- **Broken moment:** A mini-boss enters, you crit-cascade to +25% crit, the second crit hits for 14× base damage, the mini-boss dies before it spawns its add wave.

### 4. Orbit Tank

You walk through the arena, kill by proximity, regenerate from your own light.

- **Core:** Lantern Orbit (×3), Ember Orbit, Frost Orbit, Storm Orbit, Vampiric Halo, Slow Halo
- **Flex:** Vitalight Aura, Lifedraw, Dawnshield, Soul of the Wardlight, Soul of the Prism Orbit, Soul of Lucent
- **Broken moment:** You're at full HP, surrounded by 8 enemies, you don't move, you don't shoot, and they all die anyway while you stand inside a halo of bouncing lanterns.

### 5. Sprite Commander

Your companions fight the run for you.

- **Core:** Mote of Light (×2), Ember/Frost/Storm/Bloom Sprite (any 3), Sprite Boost (×2), Sprite King
- **Flex:** Mirror Sprite, Laser Mote, Homing Mote, Soul of Lucent
- **Broken moment:** You park behind a pillar; the king sprite, three elemental sprites, and a mirror-sprite that mirrors your full multishot pattern proceed to wipe a wave while you sip a soda.

### 6. Beam / Boss Killer

Cleanup is slow, but bosses melt in seconds.

- **Core:** Charged Shard, Sunfracture, Long Lens, Tight Spread, Hunter's Mark Volley, Echohunter, Sundering Arrow
- **Flex:** Pierce of the Long Dusk, Wraithstep Shot, Frost Surge, Soul of the Boss-Slayer, Execute: Dim's Edge
- **Broken moment:** Boss-phase 1 wind-up. You channel Sunfracture, mark the boss with Hunter's Mark, the boss loses 40% of its HP bar before its first attack lands.

### 7. Meteor Rain

You barely shoot. The sky does it for you.

- **Core:** Meteor Pursuit (×2), Cinderpath, Lantern Orbit, Soul of the Meteor Choir, Ember Touch, Ember Prism
- **Flex:** Storm Touch, Chainflame, Soul of Cinders, The Last Sun, Sunshatter Cascade
- **Broken moment:** You're in a corner. Three meteors fall on the spawn lane simultaneously, igniting every enemy on impact, and the chained ember bursts wipe the wave before half of them reach you.

### 8. Combo Brawler

Stand still, attack continuously, ramp into a damage god.

- **Core:** Standstill Surge, Cascade Strike, Quicklight Aura (×3), Stillshield, Quickdraw (×3), Featherlight Volley
- **Flex:** Close Quarters, Killpulse, Streak Fervor, Soul of the Standing Pillar, Soul of the Combo Choir, Soul of the Demon Slayer
- **Broken moment:** You haven't moved for 8 seconds. Your attack speed is at +60% cascade, your damage multiplier is +40% Cascade Strike on top, the wave that just entered the room never makes it to you.

---

## Section B — 12 Awakened Recipes

Awakened recipes are **hidden** transformations the player discovers by picking the right pair at the right tier. Each requires both ingredient abilities at **Epic or higher** by the time the player reaches a boss-floor offer (the rooms 15 or 20 Angel/Devil/Sprite). When both are owned and a boss-floor pick is invoked, the offer set is replaced by the Awakened transformation.

These are the **community-discovery seeds** for TikTok/Reddit/Discord (Pillar 7).

| # | Ingredient A (Epic+) | Ingredient B (Epic+) | Trigger | Awakened result | Build it caps |
|---|---|---|---|---|---|
| 1 | Refractor's Multishot | Soul of Multishot | Boss-floor Devil | **Awakened: Sun Chorus** — Multishot fires +2 volleys at –0% damage; volleys gain +10% damage each (compounding) | Bullet Hell |
| 2 | Ember Prism | Bouncing Beam (4 stacks) | Boss-floor Angel | **Awakened: Cinderchain** — Ricochets between burning enemies deal +200% bonus damage and refresh Burn | Ricochet DoT |
| 3 | Sundering Arrow | Soul of the Boss-Slayer | Boss-floor Devil | **Awakened: Dim's Lance** — All projectiles deal +50% damage to bosses, ignore 100% boss armor in last 25% HP | Boss Killer |
| 4 | Crit Cascade | Vivisect | Boss-floor Angel | **Awakened: Prism Refraction** — Crits chain to a second random target at 100% damage; if it crits, chain a third | Crit Glass Cannon |
| 5 | Power Trio | Soul of Lucent | Boss-floor Sprite | **Awakened: Trinity Halo** — All Power Trio bonuses become permanent room-wide auras and apply to allied sprites at 50% effect | Orbit Tank / Sprite Commander |
| 6 | Sprite King | Mirror Sprite | Boss-floor Angel | **Awakened: Sovereign Sprite** — Sprite King fires your full projectile pattern at 75% damage, gains your statuses and crits | Sprite Commander |
| 7 | Soul of the Meteor Choir | Storm Prism | Boss-floor Devil | **Awakened: Skyfracture** — Each meteor spawns 3 lightning chains on impact; meteor cadence reduced to 2s | Meteor Rain |
| 8 | Sunfracture | Hunter's Mark Volley | Boss-floor Angel | **Awakened: Searing Lance** — Marked enemies are hit by a continuous, piercing 3m-wide laser at 200% ATK/sec | Beam / Boss Killer |
| 9 | Soul of the Standing Pillar | Soul of the Combo Choir | Boss-floor Sprite | **Awakened: Cathedral of Light** — Stand-still halo becomes 6m, deals 300% ATK/0.5s, and grants the combo multiplier even after first hit drops | Combo Brawler |
| 10 | Soul of the Glasswound | Phoenix Spark | Boss-floor Devil | **Awakened: Wraithheart** — Phoenix Spark triggers at 25% HP instead of 0; on trigger, gain Glasswound bonuses doubled for 6s | Crit Glass Cannon |
| 11 | Soul of the Prism Orbit | The Last Sun (Mythic) | Boss-floor Devil | **Awakened: Sun-Wreath** — All orbs orbit inside The Last Sun's 5m halo, apply its status stack, deal +100% damage | Orbit Tank (capstone) |
| 12 | Bloom Prism | Chainflame | Boss-floor Angel | **Awakened: Verdant Catastrophe** — Poisoned enemies that die explode into 3m bursts that re-apply Poison-5 to all hit | Ricochet DoT (capstone) |

**Discovery design notes:**
- Recipes are *not* listed anywhere in the game text. They are surfaced only when both ingredients are owned and the trigger floor is reached: a fourth "discovered" card appears in the offer screen with a unique glow tier.
- Each player's first Awakened unlock should be telegraphed by a soft narrator cue ("the shards are aligning") — onboarding rather than walkthrough.
- Two recipes (#11 Sun-Wreath, and any future Mythic recipes) intentionally require a Mythic; these are the "endgame goal" recipes the community will spend weeks confirming.

---

## Section C — Anti-Synergy / Clamp List

These are the deliberate "decisions, not collectibles" tensions and the safety clamps that prevent runaway snowballs.

### C.1 Mutually exclusive (cannot both appear in a single offer)

| Pair | Reason |
|---|---|
| **Lightstep Pierce + Bouncing Beam** | Same fantasy; pierce wins the projectile, ricochet check never fires. Genre-classic anti-synergy. |
| **Charged Shard + Featherlight Volley / Quickdraw** | Opposing AS modifiers stacked produce confusing per-shot timing. |
| **Wide Spread + Tight Spread** | Direct opposites. Holding both in offer pool is bait. |
| **Soul of the Glasswound + Lantern Heart (3rd stack) / Soul of the Wardlight** | Glasswound wants you below 40% HP; max-HP picks push you above the threshold. |
| **Standstill Surge + Cinderpath / Wraithstep Shot (when paired with mobility builds)** | Stand-still vs. trail builds conflict in mid-run. |
| **Multishot + Front Arrow (3rd stack)** | Per-shot damage tax stacks compound multiplicatively; clamp at total tax –40% floor (any further picks gated). |
| **Tracking Eye / Homing Mote + Long Lens** | Tracking shots zig-zag and never reach max travel; tax wasted. |
| **Slow Halo + Cascade Strike (full stack)** | Slow halves the kill rate, starving the combo. Show one or the other per offer. |

### C.2 Hard rarity gates

| Rule | Reason |
|---|---|
| Mythics only on **Devil offer** at room 15 or 20 | Prevents lucky-roll early-floor god-runs. |
| Legendaries first appearance: room 5 Angel earliest, after hero level 7 | Replicates Archero 2's hero-level rarity floor. |
| "Soul of" Legendaries require **named precondition** (e.g., Soul of the Boss-Slayer requires ≥1 boss-killer Epic owned) | Forces investment, prevents stat-stick Legendaries. |
| Awakened recipes only at boss-floor offers (rooms 15, 20) | Each run gives 1–2 Awakened opportunities maximum. |
| Phoenix Spark, Soul of the Untouched, and Awakened Wraithheart **cannot all be active** — the third one offered is replaced | Triple-revive runs are unfun to play against in PvP replays. |

### C.3 Stack caps

| Stat / mechanic | Hard cap | Reason |
|---|---|---|
| Total projectile count | 12 simultaneous shots | Performance + portrait readability (Pillar 8). |
| Crit chance (global) | 75% | Preserve the "non-crit hit" feel; >75% picks reroll. |
| Dodge chance | 50% | Same reason; preserves dodge-as-skill (Pillar 1). |
| AS multiplier (across all sources) | +200% | Prevents physics/animation breaks. |
| MS multiplier | +60% | Prevents camera-frame-rate desync on iPhone SE. |
| Status stack on single enemy (any one element) | 5 | Prevents infinite DoT amplifier. |
| Orbiting projectiles | 8 total (across all orbit picks) | Visual silhouette discipline. |
| Sprite count | 5 active | Performance budget. |

### C.4 Anti-bait offer rules

- If the player already owns all 4 Common elements (Touch tier), Common-element offers re-roll up to Rare-element.
- If the player has 0 sprite picks at room 10+, Sprite King is not offered (precondition fails silently).
- If the player has all 3 stacks of a hard-cap projectile pick, that pick is replaced in subsequent offers.
- If the player has Soul of the Glasswound active, +max HP picks beyond Lantern Heart 1 are replaced with –max HP / +damage trades (Devil-flavored options).

### C.5 Snowball clamps (post-launch tuning hooks)

These are knobs left exposed for LiveOps balance patching:

- Multishot/Front Arrow per-pick damage tax floor: currently –40% across all stacks. Lowering increases Bullet Hell power.
- Ricochet damage falloff per bounce: 10% per added bounce after first. Increasing weakens Ricochet DoT.
- Awakened recipe trigger floor (currently boss-floor only): can be relaxed to any Angel offer for under-performing recipes.
- Status stack cap per enemy (currently 5): a primary balance lever for DoT builds.
- Mythic Devil-offer probability (currently 8% at room 20 with all preconditions met): the headline lottery the streamer/TikTok community will optimize for.

---

## Appendix — Implementation notes for the engineering team

- **Pick-screen UX:** 3 cards, rarity glow (white/blue/purple/gold/prismatic), one free reroll first pick per room, gem cost from second reroll. Skip → +1 small heal (Pillar 3 friendly floor).
- **Stack representation:** each ability tracked as `(ability_id, stack_count)` in the run state blob; offer pool weighted against current stack count vs. cap.
- **Anti-synergy enforcement:** runs on offer generation, not on pick — players never see the bad pair in a single offer.
- **Awakened recipe table:** stored as a hidden lookup, not in the visible ability pool. Surfaces on boss-floor offer regen only when ingredients + floor + offer-type match.
- **VFX/audio team:** the 120 abilities map to roughly 35 unique SFX (most share family beds + per-element overlays) and 18 unique particle systems (most share base shaders + tint). The launch-scope 50-SFX budget covers this; the per-ability "hook" in the table is the family bed plus a unique overlay note.
- **Telemetry:** log every offered card, picked card, rerolled card, and the per-room build snapshot at offer time. This drives the balance dashboard and the LiveOps tuning loop (Pillar 4/7).
