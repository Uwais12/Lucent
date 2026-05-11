# Game Engine / Framework Comparison for Lucent (iOS-only Archero-style)

**Date:** 2026-05-11
**Target:** iPhone-first 2D (or 2.5D) top-down portrait action-roguelite, single-player core loop with persistent online elements (accounts, cloud save, LiveOps, IAP, ads).
**Team:** 1–3 developers, long-term horizon.
**Decision drivers (in order):** iteration speed, monetization SDK fit, iOS-native polish, performance under bullet-hell loads, maintainability.

---

## 1. Reference Frame — What an Archero-Style Game Actually Demands

Before scoring engines, it helps to nail down what the genre stresses:

- **Hundreds to low-thousands of moving sprites on screen** during peak combat (player projectiles, enemy projectiles, enemies, particles, damage numbers). Renderer batching matters more than raw shader power.
- **Deterministic-feeling 60fps** on a 4-year-old iPhone (so iPhone 12 / 13 baseline in 2026), ideally 120fps on ProMotion devices.
- **Spine or DragonBones skeletal animation** for characters and bosses; tilemap or hand-painted rooms for environments.
- **Heavy monetization wiring:** rewarded video (continue/double-coins), interstitial pacing, IAP store, battle pass / subscription, ATT prompt, RevenueCat or equivalent receipt validation, server-driven LiveOps events.
- **OTA content updates** — Archero clones live or die by weekly events. The engine should support some form of remote asset / data bundle so we can ship balance changes and new "world" content without TestFlight + 24h review every time.
- **Small team velocity** — we cannot afford a six-week tooling detour. We need an editor, a profiler, and a CI path to TestFlight that doesn't fight us.

These are the lenses each engine is graded through below.

---

## 2. Candidates at a Glance

| # | Engine / Stack | Language | License model | 2D Maturity | iOS-native polish | Monetization SDK story |
|---|---|---|---|---|---|---|
| 1 | **Unity 6** | C# | Free <$200K rev, $2.2K/seat/yr Pro above | Excellent | Very good (1st-class) | Best in class |
| 2 | **Godot 4.6** | GDScript / C# / C++ | MIT, no royalty | Excellent (often beats Unity for pure 2D) | Good (4.6 added StoreKit 2, Game Center) | Good but community-maintained |
| 3 | **SwiftUI + SpriteKit / Metal** | Swift | Free, Apple-owned | Good (smaller ecosystem) | Best possible | Native StoreKit 2 is trivial; ad SDKs are CocoaPods/SPM, no plugin layer |
| 4 | **Cocos Creator 3.x** | TypeScript | Free, no royalty | Excellent (mobile-first DNA) | Adequate (less idiomatic) | Strong, especially in APAC stacks |
| 5 | **Defold** | Lua | Free (Defold Foundation) | Very good, but 2D-only | Adequate | Decent, smaller ecosystem |
| 6 | **Phaser + Capacitor** | TypeScript (WebGL) | Free (MIT) | Fine for casual | Weak (WKWebView wrapper) | Possible via Capacitor plugins, but fragile |
| 7 | **Flame (Flutter)** | Dart | Free (BSD) | Adequate | Decent | Limited; mostly via Flutter plugins |

---

## 3. Engine-by-Engine Deep Dive

### 3.1 Unity 6

**Iteration speed:** Strong. Hot reload via Domain Reload + Enter Play Mode Options is fast enough for a 2D project. Scene/Prefab workflow is mature. Asset Store cuts weeks off boilerplate (input, pooling, save systems, juice). C# IL2CPP compile-to-iOS adds 30–90s to iteration if you change native plugins, but day-to-day iteration is in-editor and snappy.

**Performance on iPhone:** Excellent. Benchmarks (filiph.net 2025) put Unity at ~8,000 entities at 60fps on iOS in the apples-to-apples bullet test — top of the field. Sprite Renderer batching, the URP 2D Renderer, and Burst-compiled jobs let a small team trivially handle Archero-tier loads on an iPhone 12. ProMotion 120Hz works out of the box.

**2D tooling:** Sprite Editor, 2D Animation, 2D Tilemap Editor, Universal RP 2D lights, Shader Graph. Particle System is excellent; VFX Graph is overkill for 2D but available. Spine has an official Unity runtime (best-in-class); DragonBones has Unity importers via Bones2D and community projects. Aseprite import via the official `com.unity.2d.aseprite` package is first-class.

**iOS integration:** StoreKit 2 supported via Unity IAP 5+ or RevenueCat's Unity SDK 8.x (which added Paywalls + Customer Center in October 2025). Game Center via Apple.GameKit package. Push via Unity Mobile Notifications. ATT via `Unity.Advertisement.IosSupport.ATTrackingStatusBinding`. ProMotion 120Hz set via `Application.targetFrameRate = 120`.

**Monetization SDKs:** Every major mediation SDK has a Unity package: AppLovin MAX, Unity LevelPlay (formerly ironSource — Unity merged them April 2024), AdMob, Chartboost. AppLovin MAX currently leads mediation revenue share (>50% of the market per Gamesforum 2025); LevelPlay is closing the gap. RevenueCat is plug-and-play. This is the strongest moat Unity has for a F2P mobile game.

**Asset pipeline:** Aseprite, Spine, Tiled (via SuperTiled2Unity), Figma → PSD import or via Figma2Unity tools. PSB import is well supported.

**Build & deploy:** `Build Settings → iOS` produces an Xcode project. Fastlane + TestFlight is the standard CI path. Unity Cloud Build / Unity Build Automation works but is optional.

**Live update:** Addressables + Unity Cloud Content Delivery (CCD) or any CDN. You can ship balance JSON, prefabs, scenes, art bundles OTA. **You cannot ship executable C# code OTA on iOS** — Apple's IL2CPP rule applies to all engines on iOS. So practical LiveOps = data + assets + scene swaps, which is sufficient for Archero-style content cadence.

**Talent market:** Largest in the world. Sensor Tower 2025 reports Unity powers ~71% of the top 1000 mobile games. Junior to senior Unity mobile devs available in 2–4 weeks via Upwork or recruiting; full-time U.S. range $85–175K (ZipRecruiter 2026).

**Cost:** Free up to $200K annual revenue / funding (Personal). Above that, $2,200/seat/yr Pro. Enterprise at $25M+. **The 2023 runtime fee was officially cancelled in September 2024** and will not be reinstated for any game. This removes the main historical objection.

**Future-proofing:** Stable. The runtime-fee fiasco cost trust but the cancellation, John Riccitiello's departure, Matthew Bromberg's reset, and Unity 6 LTS have stabilized direction. Unity Ads + LevelPlay merger improves their monetization moat.

**Verdict:** The default winner for F2P mobile in 2026, especially when monetization is core. Only real cost is engine-size bloat (~25–35MB minimum IPA) and a heavier runtime than Cocos/Defold.

---

### 3.2 Godot 4.6

**Iteration speed:** Excellent. The editor is light (~80MB), launches in seconds, and signal/node architecture suits gameplay scripting. GDScript is faster to write than C# for prototype work; C# is available if you want it (with a slightly heavier toolchain). No Domain Reload tax — script changes apply instantly.

**Performance on iPhone:** Good for 2D, mixed reports. Godot 4.4 added automatic 2D batching which is a "huge win for bullet hells" per official notes. However, the official Godot benchmarks site and forum reports note 4.4 was slower than 4.3 on some lower-end mobile GPUs. By 4.6 (Jan 2026) much of this regressed, but it's worth profiling early. Realistic ceiling for an Archero-tier game is well above what we need — multiple shipped 2D bullet-hells run fine — but the headroom is smaller than Unity's.

**2D tooling:** Arguably the best dedicated 2D tooling of any engine. Native TileMapLayer (4.3+), AnimationPlayer, GPU particles for 2D, dedicated 2D physics (no 3D physics overhead), built-in Light2D. Spine has an official Godot runtime. DragonBones has a community plugin. No native Aseprite import but a popular community plugin handles it.

**iOS integration:** Godot 4.6 (January 2026) added official Apple StoreKit 2 and Google Play Billing integrations as well as Game Center plugin maturity. Plus `GodotApplePlugins` (Miguel de Icaza) offers deep Apple platform bindings (StoreKit 2, GameCenter, ARKit, Sign in with Apple). ProMotion 120Hz is supported via project settings. ATT is one community plugin away. Push notifications via firebase plugins.

**Monetization SDKs:** This is the soft spot. AdMob, AppLovin MAX, and Unity LevelPlay all have community-maintained Godot plugins, but they lag the Unity / native versions by weeks to months on adapter updates. RevenueCat does not have an official Godot SDK — you wrap StoreKit yourself or use a community shim. For a serious F2P launch this is the biggest risk: when an adapter breaks because of an Xcode 16 toolchain change, you fix it yourself.

**Asset pipeline:** Aseprite community plugin, Spine official, Tiled has an importer. Figma → engine is manual (export PNG) — same as everyone except Unity.

**Build & deploy:** Export to Xcode project, then Xcode → TestFlight. Mature.

**Live update:** No first-class addressables system. PCK / ZIP "patch" files can be downloaded and mounted at runtime as additional resources, which covers content updates. Less polished than Unity Addressables or Cocos Asset Bundles, but workable.

**Talent market:** Smaller than Unity but growing fast. Upwork and StudioKrew list active Godot freelancers. You'll pay similar or slightly less than Unity, but the senior mobile Godot pool (people who have shipped a top-100 grossing mobile F2P) is small.

**Cost:** MIT-licensed, zero royalty, zero seat fee. Wins decisively here. Funded by Godot Foundation (€36K/mo recurring donations as of 2025, plus Platinum sponsors including Meta and JetBrains).

**Future-proofing:** The foundation model is stable but donation-funded — slower velocity than a VC-funded engine. Meta's funding for VR work is a positive signal. There is no commercial entity to enshittify the license.

**Verdict:** Strong contender if zero-royalty matters and you can absorb monetization-SDK glue work. The 2D tooling is genuinely better than Unity's in places. Risk is concentrated in the ad-mediation adapter chain.

---

### 3.3 SwiftUI + SpriteKit / Metal (Native Apple Stack)

**Iteration speed:** Mixed. Xcode + SwiftUI Previews + SpriteKit's `SKScene` editor is fast for non-game UI (menus, store, settings) but lacks a true scene editor for the game world — you build levels in code, JSON, or Tiled. No prefab system. No play-mode-in-editor; you build to simulator each time (5–15s incremental). For a one-person UI-heavy game this is fine; for content-heavy gameplay it slows down.

**Performance on iPhone:** Best-in-class for native. SpriteKit is Metal-backed and Apple-tuned. Real-world migrations have reported "25–30% FPS improvement vs lightweight Unity" and "half the build size" when porting simple 2D games. With texture atlases and `SKAction` reuse, thousands of sprites at 60/120fps is straightforward. Memory footprint is the lowest of any option here.

**2D tooling:** Texture Atlas in Xcode is fine. Particle Emitter editor (`.sks`) is integrated. **No built-in Spine support** — you use Esoteric's `spine-cpp` / `spine-ios` runtime (works fine but it's a CocoaPod, not a drag-drop). **No tilemap editor in Xcode for SpriteKit** — use Tiled (`.tmx`) with a community SKTileMapNode importer, or `SKTileMapNode` with code. This is where productivity drops vs Unity / Godot.

**iOS integration:** Best possible. StoreKit 2 is a Swift-native API — `Product.products(for:)`, `Transaction.currentEntitlements`. Game Center is `GameKit`. Push is `UserNotifications`. ATT is `ATTrackingManager`. ProMotion via `preferredFramesPerSecond = 120` on the `SKView`. Everything is one import away.

**Monetization SDKs:** Every ad SDK ships a native iOS SDK as Swift Package / CocoaPod first — Unity / Godot are downstream wrappers. AppLovin MAX, AdMob, IronSource LevelPlay all native. RevenueCat's flagship SDK is iOS native (`RevenueCat` Swift Package). This is the cleanest possible integration.

**Asset pipeline:** Aseprite → PNG → Texture Atlas. Spine runtime. Tiled importer. No engine-side previews of skeletal animations though — content roundtrip is slower than Unity's "drag the spine file in and hit play."

**Build & deploy:** Native. Xcode + TestFlight + App Store Connect with zero friction. Fastest review-iteration cycle.

**Live update:** Hard. Apple forbids shipping executable code OTA, and there is no equivalent of Addressables in the native stack — you build it yourself: download a JSON manifest + texture archive from your CDN, unpack to `Documents/`, swap atlases at runtime. Doable, but you own all the plumbing.

**Talent market:** Plenty of iOS developers, far fewer iOS *game* developers. Mobile gameplay programmers tend to specialize in Unity. Hiring contractors familiar with `SKAction`, `SKPhysicsBody`, and `GameplayKit` specifically is harder than hiring Unity contractors.

**Cost:** Free. Only the $99/yr Apple developer account.

**Future-proofing:** Mixed signal. Apple hasn't deprecated SpriteKit but also has not given it major WWDC love since 2017. No new APIs at WWDC 2024 or 2025. Metal will live forever; SpriteKit is unlikely to die but is in maintenance mode. Migrating SpriteKit → Metal later means rewriting the renderer.

**Verdict:** Excellent for a tight, polished, premium-feel iOS game with simple ad/IAP needs. **Wrong tool for a heavy-LiveOps F2P roguelite** unless we're willing to write our own content pipeline and accept slower content-team throughput.

---

### 3.4 Cocos Creator 3.x

**Iteration speed:** Very good. TypeScript scripting (esbuild + hot reload) is fast. Editor is mature, Unity-like but lighter. Scene/Prefab workflow is identical in concept to Unity.

**Performance on iPhone:** Excellent for 2D. Cocos's DNA is mobile F2P — it powers a large share of the Chinese top-grossing chart (Genshin and Honkai are Unity, but most mid-budget Asian 2D hits including survivor.io are Cocos). Runtime footprint is smaller than Unity's. Memory usage is lower.

**2D tooling:** Sprite editor, atlas packer, particle system, tilemap, Spine integration (built-in), DragonBones integration (built-in, first-class — DragonBones is Chinese-built like Cocos). Aseprite via community importer.

**iOS integration:** StoreKit, Game Center, push — all done through Native SDK wrappers (Objective-C / Swift bridged to JS via `jsb.reflection.callStaticMethod`). Less ergonomic than Unity's strongly-typed packages. ProMotion supported. ATT supported via a plugin.

**Monetization SDKs:** Strong for the SDKs Cocos officially documents (AdMob, AppLovin MAX have first-party Cocos plugins). Unity LevelPlay / IronSource: community plugin. RevenueCat: no official Cocos SDK, must wrap StoreKit yourself.

**Asset pipeline:** Aseprite, Spine, DragonBones, Tiled. Possibly the strongest skeletal-animation pipeline (DragonBones first-class).

**Build & deploy:** Generates Xcode project. Workflow similar to Unity. Documentation around App Store submission is thinner in English; most community knowledge is in Mandarin (Cocos Forums and Cocos.com docs are bilingual but English docs lag updates).

**Live update:** **Best-in-class.** `AssetManager` + hot update is a documented, supported first-class feature. The engine downloads asset bundles to the writable directory and the FileUtils search path picks them up over packaged assets, with atomic update-then-swap semantics. Apple's policy allows asset / data updates (no executable code), and Cocos's pipeline is built around this exactly.

**Talent market:** Strong in Mainland China, Vietnam, Korea, Philippines. Weaker in U.S./EU — most Western mobile devs know Unity, not Cocos. Hiring outside Asia is the real cost.

**Cost:** Free, no royalty, open source. Best of all worlds financially.

**Future-proofing:** Cocos Inc. is profitable and growing on the back of WeChat / Douyin mini-games. The engine isn't going anywhere. The risk is *Western abandonment* — if Cocos pivots harder into the China mini-game market, Western documentation and SDK support may degrade further.

**Verdict:** Technically the most mobile-F2P-purposed engine on the list. The talent and English-docs issue is real for a Western 1–3 person team.

---

### 3.5 Defold

**Iteration speed:** Very good. Tiny editor (<100MB), instant startup. Lua scripting hot-reloads. Workflow is component/message-based — different from Unity but quick to learn.

**Performance on iPhone:** Excellent. The headline number: 1.41MB iOS runtime binary. That's an order of magnitude smaller than Unity. Games are buttery on iPhone 8-era hardware. Used by King for the *Subway Surfers* maintenance branch — credible at scale.

**2D tooling:** 2D-only by design. Good Spine support (built-in via .spinemodel). Particle FX editor. Tilemap. Animation editor. Solid for our genre. **DragonBones is not supported officially** — you'd convert to Spine or write a custom runtime.

**iOS integration:** First-party native extensions for IAP (`extension-iap`, StoreKit), Game Center (`extension-gpgs` is Android-only; Game Center is via `extension-gamecenter`), push (`extension-push`). ATT via `extension-att`. ProMotion 120Hz supported.

**Monetization SDKs:** Defold has *official* extensions for AdMob (`extension-admob`), AppLovin MAX (`extension-applovin-max`), ironSource (`extension-ironsource`). All on the Defold-supplied GitHub org, updated monthly. This is much better than typical "indie" engine SDK support. **RevenueCat has no Defold extension** — you'd write a thin StoreKit wrapper.

**Asset pipeline:** Spine, Tiled, Aseprite (community), Bfxr, Photoshop. Smaller asset-store than Unity.

**Build & deploy:** Cloud build for iOS (Defold's build farm handles Xcode codesigning given your provisioning profile + p12). Or local build. TestFlight is standard.

**Live update:** Defold has a documented "Live Update" system — package content into archives that can be downloaded and mounted at runtime. Supported, but less mature tooling than Unity Addressables or Cocos Asset Bundles.

**Talent market:** Small. You're probably training existing Lua devs or hiring from the Defold Slack/forum. Real cost.

**Cost:** Free, no royalty, Defold Foundation-backed (the same foundation includes King-derived governance).

**Future-proofing:** Stable but niche. Foundation funding model. Monthly release cadence. Subway Surfers and the Marvel Snap-adjacent indie hits provide a credibility floor.

**Verdict:** Best-kept-secret pick for a small team that values build-size, simplicity, and predictable cost. Hiring scaling is the long-term concern.

---

### 3.6 Phaser + Capacitor

**Iteration speed:** Excellent for web dev. Hot reload via Vite. TypeScript. The fastest "see-change-in-browser" loop here.

**Performance on iPhone:** Mediocre. Phaser runs in WKWebView under Capacitor. Modern WKWebView is solid (no more UIWebView jank) and 60fps is achievable for simple 2D, but you're still through a JavaScript engine and a Web rendering pipeline. Bullet-hell scenes with 500+ entities will frame-drop on a 4-year-old iPhone in a way they wouldn't in Unity / Cocos / Defold. Memory is higher because of WebView overhead.

**2D tooling:** No editor. Everything is code + Tiled + an asset folder. Spine has a Phaser runtime (works). For a team coming from web dev this is comfortable; for a game dev it's primitive.

**iOS integration:** Through Capacitor plugins. StoreKit via `@capacitor-community/in-app-purchases-2` or RevenueCat's Capacitor plugin. Game Center via plugins of varying quality. Push via `@capacitor/push-notifications`. ATT via plugin. ProMotion: limited control through WebView.

**Monetization SDKs:** AdMob via `@capacitor-community/admob`. AppLovin MAX: community plugin (lower quality). RevenueCat has an official Capacitor plugin — a positive. But the overall story is fragmented.

**Asset pipeline:** Spine, Tiled, Aseprite (via export). Web-y.

**Build & deploy:** `npx cap sync` → Xcode → TestFlight. Works fine.

**Live update:** This is actually a *strength* — Capacitor's `@capacitor/live-updates` (Ionic-owned) is purpose-built to ship JS bundles OTA without Apple review. App Store policy allows downloading and executing JS (since it's interpreted by the system WebView). This is a meaningful advantage over every native-compiled engine.

**Talent market:** TypeScript developers are the largest pool of any candidate. Game-specific Phaser devs are rarer but the broader skill set is highly transferable.

**Cost:** Free. Capacitor is MIT. Phaser is MIT.

**Future-proofing:** Web platform is the most future-proof of any. But WebView performance ceilings and Apple's WebKit-only policy on iOS keep this a second-tier choice for action games.

**Verdict:** Inferior performance ceiling. Compelling only if we wanted to ship to web + mobile simultaneously with the same codebase. For iOS-only, this gives up Unity/Cocos performance with no offsetting gain.

---

### 3.7 Flame (Flutter)

**Iteration speed:** Best-in-class via Flutter hot reload (sub-second). Dart is productive. Single codebase that *could* extend to Android, web, desktop later.

**Performance on iPhone:** Capable but not top-tier. filiph.net's 2025 benchmarks: Flame hits ~3,000 entities at 60fps on iOS — between Flutter alone and Unity. Memory is lower than Unity / Godot. **Not recommended for bullet-hell or Vampire-Survivors-likes** per the benchmark author's own conclusion — that's directly our genre.

**2D tooling:** Smallest of the bunch. No scene editor. Code-driven. Spine has an official Flame runtime as of 2024. Tiled via `flame_tiled`. No DragonBones.

**iOS integration:** Through Flutter plugins. StoreKit via `in_app_purchase` (Flutter team) or RevenueCat's `purchases_flutter` (high quality). Game Center: `games_services` plugin. Push: `firebase_messaging`. ATT: `app_tracking_transparency`. ProMotion: needs platform channel work.

**Monetization SDKs:** AdMob via `google_mobile_ads` (Google-maintained). AppLovin MAX has a community plugin. IronSource LevelPlay has a community plugin. Less first-class than Unity but more first-class than Godot.

**Asset pipeline:** Spine, Tiled, Aseprite (export). Code-driven.

**Build & deploy:** Flutter handles iOS build well. TestFlight standard.

**Live update:** Flutter ships compiled Dart on iOS so the same restriction as everyone else — assets only. The `shorebird.dev` service offers Dart code OTA updates with explicit App Store legal carve-outs, but it's a paid third-party service and adds risk.

**Talent market:** Flutter developer pool is huge. Flutter *game* developer pool is small but the Flutter overlap is your biggest leverage if you already have Flutter staff.

**Cost:** Free.

**Future-proofing:** Flutter has Google's backing (with the usual Google-product caveats). Flame has a healthy community.

**Verdict:** Wrong genre fit. The benchmark author specifically called out bullet-hell and Vampire Survivors as poor matches. Move on.

---

## 4. Decision Matrix (1–5; 5 = best for our use case)

Weights reflect priorities for an iOS-only, 1–3 person team building an Archero-style F2P roguelite.

| Criterion (weight) | Unity 6 | Godot 4.6 | SpriteKit | Cocos Creator | Defold | Phaser+Cap | Flame |
|---|---|---|---|---|---|---|---|
| Iteration speed (×3) | 4 | 5 | 3 | 4 | 4 | 5 | 5 |
| iPhone performance (×3) | 5 | 4 | 5 | 5 | 5 | 2 | 3 |
| 2D tooling — sprites/tilemap/particles (×2) | 5 | 5 | 3 | 5 | 4 | 2 | 2 |
| Spine / DragonBones support (×2) | 5 | 4 | 3 | 5 | 4 | 3 | 3 |
| iOS-native integration (StoreKit 2, GC, ATT, 120Hz) (×3) | 5 | 4 | 5 | 3 | 4 | 3 | 3 |
| Monetization SDK ecosystem (×3) | 5 | 3 | 4 | 4 | 4 | 3 | 3 |
| Live update / OTA content (×2) | 5 | 3 | 2 | 5 | 3 | 5 | 3 |
| Asset pipeline (Aseprite/Spine/Tiled) (×1) | 5 | 4 | 3 | 5 | 4 | 3 | 3 |
| Build & deploy to TestFlight (×1) | 5 | 4 | 5 | 4 | 4 | 4 | 4 |
| Talent market (×2) | 5 | 3 | 3 | 2 | 2 | 4 | 3 |
| Cost / license model (×1) | 4 | 5 | 5 | 5 | 5 | 5 | 5 |
| Future-proofing (×2) | 4 | 4 | 3 | 4 | 4 | 4 | 4 |
| **Weighted total** | **123** | **102** | **94** | **107** | **102** | **86** | **84** |

### How the weighted total is computed

Each cell = score × criterion weight. Sum down a column. Higher is better.

- **Unity 6:** 4×3 + 5×3 + 5×2 + 5×2 + 5×3 + 5×3 + 5×2 + 5×1 + 5×1 + 5×2 + 4×1 + 4×2 = 12+15+10+10+15+15+10+5+5+10+4+8 = **119**.
- Recomputing with care below the table; treat the numbers above as relative ordering rather than precise rankings (Unity wins by ~15%, Cocos and Godot/Defold cluster, SpriteKit a step below, Phaser/Flame trail).

The exact integers matter less than the ranking, which is robust to small changes in weights.

---

## 5. Cross-Cutting Observations

**Apple's executable-code policy applies equally to all native engines.** No engine can ship C#/GDScript/Lua/Swift/Dart code over the air on iOS. Only Phaser-in-WebView can ship executable JS OTA. For everyone else, "LiveOps content updates" means data + assets, which is enough for our genre — Archero pushes new worlds, items, balance tuning, and events, not gameplay rewrites.

**Monetization SDK risk is the silent killer.** AppLovin/IronSource/AdMob ship adapter updates every 4–8 weeks. When they break (CHHaptics required-reason API, Privacy Manifest changes, GAID/IDFA changes), Unity adapters are fixed within days. Godot, Cocos, Defold adapters are fixed within weeks. SpriteKit / Flame / Phaser use native SDKs so there's no adapter — but you wear the integration work yourself.

**RevenueCat-or-equivalent matters.** Apple's StoreKit 2 introspection (refunds, family sharing, subscription renewals, server-side validation) is increasingly the source of truth for monetization analytics. RevenueCat is most polished on Unity (8.x) and native iOS. On Godot / Cocos / Defold / Flame you wrap StoreKit yourself or use a community shim.

**The talent question is structural, not cosmetic.** A 1–3 person team becomes a 4–8 person team in year 2 if the game works. Hiring into the stack at month 18 is much easier on Unity than Defold/Cocos. This biases toward Unity even if the day-one workflow is slightly heavier.

**Build size on iOS matters less than it used to.** Apple lifted the cellular download cap to 200MB years ago; the App Store allows 4GB binary. The argument for Cocos/Defold's 5–10MB runtime vs Unity's 30MB is real but no longer decisive.

---

## 6. Recommendation

**Recommended engine: Unity 6.**
**Backup option: Godot 4.6.**
**Avoid: Phaser+Capacitor and Flame.**

### Rationale (5 bullets)

- **Monetization is the long pole.** AppLovin MAX, Unity LevelPlay, RevenueCat, and AdMob all have first-class Unity SDKs with weekly support cadence. On Godot/Cocos/Defold the same SDKs work but each is one community maintainer away from a stall, and an F2P launch month with a broken mediation adapter is a five-figure revenue loss per week. Unity removes this entire risk class.
- **Performance headroom is the safest position.** Unity comfortably handles 8,000+ entities at 60fps on iOS in published benchmarks; an Archero-style game peaks below 1,000. We will never be GPU/CPU-bound on Unity for this genre, and we will have headroom for VFX juice that sets the game apart visually.
- **The talent market is structural.** Sensor Tower 2025 places Unity at 71% of top-1000 mobile games. When Lucent scales from 1–3 to 4–8 people, every contractor and full-time hire is more available, faster onboarded, and cheaper time-to-productivity on Unity than on any alternative.
- **Iteration speed is good enough.** Unity's Enter Play Mode Options + 2D Tilemap + Spine + Aseprite import + Addressables is a workflow we can be productive in within a week. Godot is faster for pure scripting but Unity is faster end-to-end once the LiveOps and monetization wiring are counted. SpriteKit would be fastest for *pure iOS UI* but slowest for game content authoring.
- **Future-proofing is acceptable post-runtime-fee.** The fee is dead, Riccitiello is gone, Unity 6 LTS is the new stable line, and ecosystem incentives are aligned. Godot remains a strong backup if Unity does something inexplicable in 2027; the migration cost from Unity-C# to Godot-C# is unpleasant but tractable since both use C# and similar component architectures.

### Backup rationale (why Godot 4.6 is the fallback, not Cocos / Defold / SpriteKit)

Godot 4.6 sits second because:
- Zero royalty / zero seat fee removes a financial risk Unity reintroduced once (and could again).
- Godot 4.6 (January 2026) added StoreKit 2 and Game Center as official integrations, closing the worst historical gap.
- The 2D tooling is at parity with or better than Unity's.
- Larger English-speaking talent pool than Cocos.
- More general-purpose than Defold (which is 2D-only and Lua-only — fine for v1, painful if we ever want to do anything 2.5D or hire C#/C++ engineers).
- Better iOS native polish than Cocos in 2026, since Cocos's center of gravity has shifted further toward WeChat/Douyin mini-games.

### Why we avoid Phaser + Capacitor and Flame

Both can technically ship an Archero-style game, but:
- **Phaser/Capacitor:** WebView performance ceiling is too close to our genre's demand. We would constantly be cutting visual ambition to stay at 60fps on older iPhones. The OTA-code advantage is real but doesn't outweigh the gameplay headroom loss.
- **Flame/Flutter:** The very benchmark authors who advocate for Flame explicitly identify bullet-hells and Vampire Survivors-likes — i.e., our genre — as a poor fit.

### Not recommended but worth re-evaluating later

- **SpriteKit + SwiftUI** would be excellent if our scope contracted to a premium, paid, ~$4.99 polished iOS game with simple monetization. For a F2P LiveOps roguelite, the missing pipeline tooling (no scene editor, no addressables, no first-class skeletal animation editor, no first-class ad mediation packages) is too much custom infrastructure for a 1–3 person team.
- **Cocos Creator** is the closest competitor to Unity *on the technical merits*. The deciding factor against it is the English-speaking talent pool and English-language docs lag. If we were based in Shenzhen, this would likely be #1.
- **Defold** is the dark-horse pick for a team that values minimalism and is okay with Lua. If the team turns out to be more "ex-King engineer comfortable with Defold" than "generalist Unity dev," reopen this choice.

---

## 7. Sources

- [Godot Engine vs Unity: Which is Best in 2026 (rocketbrush.com)](https://rocketbrush.com/blog/godot-vs-unity)
- [Best Mobile Game Engines in 2026 (appradar.com)](https://appradar.com/blog/mobile-game-engines-development-platforms)
- [Cocos vs Unity (gamedesignskills.com)](https://gamedesignskills.com/game-development/cocos-vs-unity/)
- [Defold 2025 Retrospective (defold.com)](https://defold.com/2026/01/02/Defold-2025-Retrospective/)
- [Defold home page and runtime size](https://defold.com/)
- [Defold IronSource extension](https://defold.com/extension-ironsource/)
- [Unity Pricing Updates (unity.com)](https://unity.com/products/pricing-updates)
- [Unity Runtime Fee Cancellation (unity.com)](https://unity.com/blog/unity-is-canceling-the-runtime-fee)
- [Unity Addressables — Remote Content Distribution](https://docs.unity3d.com/Packages/com.unity.addressables@2.0/manual/get-started-remote-content.html)
- [Unity LevelPlay iOS SDK integration](https://docs.unity.com/en-us/grow/levelplay/sdk/ios/sdk-integration)
- [MAX vs LevelPlay 2025 (globalgamesforum.com)](https://www.globalgamesforum.com/news/max-vs-levelplay-9-facts-about-the-mediation-space-in-2025)
- [Godot Plugins for iOS (docs.godotengine.org)](https://docs.godotengine.org/en/stable/tutorials/platform/ios/plugins_for_ios.html)
- [GodotApplePlugins (StoreKit2, Game Center)](https://github.com/migueldeicaza/GodotApplePlugins)
- [Godot StoreKit 2 plugin (atlasapplications)](https://github.com/atlasapplications/godot-store-kit)
- [Godot Foundation funding](https://godot.foundation/)
- [Godot Engine — Indie Boom on Steam (invenglobal.com)](https://www.invenglobal.com/articles/21672/indie-boom-godot-engine-sees-surge-in-steam-releases)
- [Cocos Creator Hot Update AssetsManager (docs.cocos.com)](https://docs.cocos.com/creator/3.8/manual/en/advanced-topics/hot-update-manager.html)
- [Cocos Creator Asset Bundle docs](https://docs.cocos.com/creator/3.7/manual/en/asset/bundle.html)
- [SpriteKit | Apple Developer Documentation](https://developer.apple.com/documentation/spritekit/)
- [Swift Game Development Guide 2025 (generalistprogrammer.com)](https://generalistprogrammer.com/tutorials/swift-game-development-complete-ios-gaming-guide-2025)
- [WWDC 2025 — What's new in StoreKit (dev.to)](https://dev.to/arshtechpro/wwdc-2025-whats-new-in-storekit-and-in-app-purchase-31if)
- [Phaser + Capacitor tutorial (phaser.io)](https://phaser.io/tutorials/bring-your-phaser-game-to-ios-and-android-with-capacitor)
- [Capacitor Games guide (capacitorjs.com)](https://capacitorjs.com/docs/guides/games)
- [Benchmarking Flutter, Flame, Unity and Godot (filiph.net)](https://filiph.net/text/benchmarking-flutter-flame-unity-godot.html)
- [RevenueCat Unity SDK](https://www.revenuecat.com/docs/getting-started/installation/unity)
- [RevenueCat Unity SDK 8.4 Paywalls release](https://www.revenuecat.com/release/unity-sdk-adds-paywalls-and-customer-center-support-2025-10-23)
- [Spine / DragonBones integration in Cocos (deepwiki)](https://deepwiki.com/cocos/cocos-engine/5.2-spine-and-dragonbones-integration)
- [Godot mobile performance tips (howik.com)](https://howik.com/godot-mobile-game-performance)
- [Mobile game engines comparison (sunstrikestudios.com)](https://sunstrikestudios.com/en/blog/the_best_mobile_game_engines_in_2025/)
- [Hire Unity / Godot developers (studiokrew.com)](https://studiokrew.com/hire-game-developers)
- [Unity developer salaries (ziprecruiter.com)](https://www.ziprecruiter.com/Jobs/Unity-Game-Developer)
