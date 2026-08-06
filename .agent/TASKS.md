# Xeia Task Board

## 🎯 PHASE 1: Core UI Polish & NativeWind Setup
- [x] Create lib/theme.ts with color palette and typography — agent:vibe — 2026-07-24 11:55 PM
- [x] Create components/ directory with reusable styled components — agent:vibe — 2026-07-24 11:55 PM
- [x] Create components/Button.tsx — Multiple variants (primary, secondary, ghost, outline, danger, link) — agent:vibe — 2026-07-24 11:55 PM
- [x] Create components/Card.tsx — With variants (default, glass, gradient, bordered, elevated) — agent:vibe — 2026-07-25 12:00 AM
- [x] Create components/Input.tsx — With variants (default, glass, bordered, underlined) — agent:vibe — 2026-07-25 12:00 AM
- [x] Create components/Loading.tsx — 7 loading types (spinner, dots, heartbeat, bounce, shimmer, ring) — agent:vibe — 2026-07-25 12:05 AM
- [x] Create components/EmptyState.tsx — 7 empty state types with pre-configured messages — agent:vibe — 2026-07-25 12:05 AM
- [x] Create components/index.ts — Barrel export for all components — agent:vibe — 2026-07-25 12:05 AM
- [x] Update all screens to use new components and theme — agent:opencode — 2026-07-24 23:30
- [x] Add consistent styling across all screens — agent:opencode — 2026-07-24 23:30

## 🎯 PHASE 2: Motion & Animations
- [x] Set up Reanimated v3 with gesture handler — Updated babel.config.js, package.json, app/_layout.tsx — agent:vibe — 2026-07-25 12:15 AM
- [x] Add Moti for animated components — Added moti to package.json — agent:vibe — 2026-07-25 12:15 AM
- [x] Create components/animations/AnimatedHeart.tsx — Heartbeat, Fillable, Rating, Floating hearts — agent:vibe — 2026-07-25 12:20 AM
- [x] Create components/animations/AnimatedCounter.tsx — AnimatedCounter, CounterRow, CountUp, IconCounter — agent:vibe — 2026-07-25 12:25 AM
- [ ] Create animated transitions between screens
- [x] Add Love Meter heart beat animation — agent:opencode — 2026-07-25
- [x] Add gallery image hover effects — agent:opencode — 2026-07-25
- [x] Add timeline scroll animations — agent:opencode — 2026-07-25
- [x] Add Photobooth capture animation — agent:opencode — 2026-07-25

## 🎯 PHASE 3: Iconic & Lovely UI
- [ ] Create custom SVG icons for Xeia branding
- [x] Add gradient backgrounds — agent:opencode — 2026-07-25
- [x] Add glassmorphism effects — agent:opencode — 2026-07-25
- [ ] Add particle effects (confetti on love meter 100%)
- [ ] Create custom letter seal animation
- [ ] Add haptic feedback
- [ ] Polish all micro-interactions
- [ ] Add sound effects (optional)

## 📦 Backend & Deployment
- [x] Set up Firebase project (Auth, Firestore, Storage) — Configured with your credentials — agent:vibe — 2026-07-25 12:40 AM
- [x] Add Firebase config to .env and app.config.ts — Created app.config.ts, .env, .env.example — agent:vibe — 2026-07-25 12:40 AM

## 🎨 Tulip Logo & App Icon
- [ ] Add logo-tulip.png to assets/ (source file with black edges removed)
- [ ] Create assets/icon.png (1024x1024, transparent background)
- [ ] Create assets/adaptive-icon.png (1024x1024, transparent)
- [ ] Create assets/splash.png (1284x2778, #1a1a2e background)
- [ ] Create assets/favicon.png (48x48, transparent)
- [ ] Create vercel-api/ project with Next.js
- [ ] Implement POST /api/upload route
- [ ] Implement GET /api/gallery route
- [ ] Create lib/firebaseAdmin.ts
- [ ] Configure EAS Build for iOS/Android
- [ ] Configure EAS Update for OTA
- [ ] Test offline path (airplane mode)
- [ ] Test full sync flow
- [ ] Test Photobooth upload flow

## ✅ DONE
- [x] Set up Expo project with `npx create-expo-app xeia` — agent:vibe — 2026-07-24 10:15 PM
- [x] Configure Expo Router (file-based routing) — created app/_layout.tsx with Stack navigator
- [x] Install and configure NativeWind (Tailwind for RN) — added to package.json and babel.config.js
- [x] Create `lib/firebase.ts` with Firebase initialization — includes Auth, Firestore, Storage exports
- [x] Scaffold Expo Router screens — created all 8 screens (index, intro, home, timeline, interactive, finale, gallery, photobooth)
- [x] Create app/_layout.tsx for navigation — Stack navigator with screen options
- [x] Replace HTML elements with React Native equivalents — all screens use View, Text, Image, etc.
- [x] Replace localStorage with AsyncStorage in `lib/storage.ts` — full offline cache implementation
- [x] Implement local cache layer with syncFromFirebase() — timeline, gallery, love-meter sync
- [x] Set up expo-file-system for image caching — with FILE_PATHS and cacheImageFile
- [x] Replace camera code with expo-camera — Photobooth uses expo-camera
- [x] Implement Photobooth with expo-camera — full capture, preview, save flow
- [x] Build upload queue for Photobooth photos in `lib/uploadQueue.ts` — offline-first with retry logic
- [x] Set up @react-native-community/netinfo for connectivity detection — integrated in storage.ts and uploadQueue.ts
- [x] Create data/ directory with fallback static content — timeline.ts and gallery.ts with sample data
- [x] Configure app.json / app.config.ts for Expo — with icon, splash, orientations
- [x] Set up eas.json for EAS Build — development, preview, production profiles
- [x] Create lib/theme.ts with color palette and typography — agent:vibe — 2026-07-24 11:55 PM
- [x] Create components/ directory with reusable styled components — agent:vibe — 2026-07-24 11:55 PM
- [x] Create components/Button.tsx — Multiple variants (primary, secondary, ghost, outline, danger, link) — agent:vibe — 2026-07-24 11:55 PM
- [x] Create components/Card.tsx — With variants (default, glass, gradient, bordered, elevated) — agent:vibe — 2026-07-25 12:00 AM
- [x] Create components/Input.tsx — With variants (default, glass, bordered, underlined) — agent:vibe — 2026-07-25 12:00 AM
- [x] Create components/Loading.tsx — 7 loading types (spinner, dots, heartbeat, bounce, shimmer, ring) — agent:vibe — 2026-07-25 12:05 AM
- [x] Create components/EmptyState.tsx — 7 empty state types with pre-configured messages — agent:vibe — 2026-07-25 12:05 AM
- [x] Create components/index.ts — Barrel export for all components — agent:vibe — 2026-07-25 12:05 AM
- [x] Elegant & Minimal UI/UX upgrade — all 8 screens — agent:opencode — 2026-07-25
- [x] Tulip theme redesign — login date picker, dashboard circular counter — agent:opencode — 2026-07-25
