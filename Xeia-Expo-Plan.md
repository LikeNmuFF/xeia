# Xeia - 18 Months of Love (Expo + Firebase + Vercel Edition)

A romantic **Expo (React Native)** app celebrating months of love and togetherness, now built for true native mobile deployment with **online sync via Firebase** and **image uploads via a Vercel-hosted API**, while remaining fully usable offline through local caching.

## About

**Xeia** is a personalized anniversary app for Erica Joy, featuring:

- **Live Counter**: Tracks months, days, and hours since the relationship began.
- **Timeline**: A visual journey through key relationship moments.
- **Interactive Love Meter**: A playful slider (0–100%) with dynamic responses.
- **Personal Letter**: A heartfelt message revealed after the interactive moment.
- **Photo Gallery**: Masonry-style gallery, now backed by Firebase Storage/Firestore and cached locally.
- **Photobooth**: In-app camera capture with a vintage photo-strip effect, uploaded automatically when online.

---

## Why Move to Expo

Capacitor wraps a web build in a native shell; Expo gives you a true React Native app with first-class native APIs (camera, filesystem, notifications), simpler builds via EAS, and easier OTA updates — a better fit now that this is going to sync photos and data online.

Current stable: **Expo SDK 57 (React Native 0.86, React 19.2)**. Expo ships roughly 3 SDKs a year; build against the latest stable and upgrade opportunistically rather than chasing betas.

---

## Updated Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                          Xeia App Architecture                        │
├──────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌───────────────┐   ┌───────────────┐   ┌────────────────────────┐  │
│  │   Expo App     │   │   EAS Build    │   │   Vercel (Web + API)   │  │
│  │ (React Native) │◄─►│ (Native builds)│   │  Next.js API routes    │  │
│  └───────────────┘   └───────────────┘   └───────────┬────────────┘  │
│         │                                              │              │
│         ▼                                              ▼              │
│  ┌───────────────┐                            ┌────────────────────┐ │
│  │ Local Storage  │◄──── sync on connect ─────►│      Firebase       │ │
│  │ (AsyncStorage/ │                            │ Auth · Firestore    │ │
│  │  SQLite +      │                            │ Storage (images)    │ │
│  │  FileSystem    │                            │                     │ │
│  │  image cache)  │                            └────────────────────┘ │
│  └───────────────┘                                                    │
│                                                                        │
└──────────────────────────────────────────────────────────────────────┘
```

**Key idea (offline-first, online-enhanced):**
1. App always reads from local storage first → instant load, works with no signal.
2. In the background, it checks Firebase for new/changed data (timeline, gallery, love-meter state).
3. New images/data are downloaded and cached locally (device filesystem), so once synced they're viewable offline too.
4. New photos taken in the Photobooth are saved locally immediately, then uploaded to Firebase Storage (via your Vercel API or directly via the Firebase SDK) when a connection is available.

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **App Framework** | Expo (SDK 57) / React Native 0.86 | Cross-platform native app (iOS + Android), plus web export |
| **Navigation** | Expo Router | File-based screen routing (replaces manual `App.jsx` state routing) |
| **Styling** | NativeWind (Tailwind for RN) or StyleSheet | Keep the existing Tailwind-based design system |
| **Animations** | React Native Reanimated + Moti (or Framer Motion on web) | Native-performance animations |
| **Auth** | Firebase Authentication | Simple email/passcode or anonymous auth for the lock screen |
| **Database** | Firebase Firestore | Timeline, gallery metadata, love-meter state, letter content |
| **File Storage** | Firebase Storage | Uploaded photos (Photobooth + Gallery) |
| **Backend/API** | Vercel (Next.js API routes / Route Handlers) | Upload endpoint, image processing (resize/compress), signed URLs |
| **Web Hosting** | Vercel | Hosts the web build (`npx expo export -p web`) and the API routes |
| **Local Persistence** | `@react-native-async-storage/async-storage` (key-value) + `expo-file-system` (cached images) or `expo-sqlite` (structured offline data) | Offline-first caching so the app opens fully even without internet |
| **Camera** | `expo-camera` | Photobooth capture |
| **Image Picker** | `expo-image-picker` | Manual photo uploads |
| **Icons** | Lucide React Native / `@expo/vector-icons` | Icon set |
| **Native Build** | EAS Build / EAS Update | Store builds + over-the-air JS updates |

---

## How the Pieces Fit Together

### 1. Vercel — Web hosting + Upload API
- Hosts the marketing/web version of the app (`expo export -p web`).
- Exposes API routes, e.g.:
  - `POST /api/upload` — accepts an image, uploads it to Firebase Storage, writes metadata to Firestore, returns the public/signed URL.
  - `GET /api/gallery` — returns gallery metadata (could also just query Firestore directly from the app; the API is mainly useful if you want to resize/compress images server-side, or hide Firebase config from a public web client).
- This is optional if you're comfortable calling Firebase Storage/Firestore directly from the Expo app — Vercel becomes most useful for server-side image processing (e.g. using `sharp` to generate thumbnails) and for the public web landing page.

### 2. Firebase — Source of truth when online
- **Firestore**: timeline entries, gallery captions, love-meter/finale state, "has the app been opened" flags — all as documents your app can `onSnapshot` (real-time) or fetch once and cache.
- **Storage**: full-resolution images and generated thumbnails.
- **Auth**: optional — could gate the app with a simple passcode instead if you don't want full accounts.

### 3. Local Storage — What makes it work offline
- On first successful sync, write a local snapshot:
  - `AsyncStorage` for small JSON (timeline, letter text, love-meter state).
  - `expo-file-system` to download and cache actual image files to the device's document directory, so `<Image>` components load from a local `file://` URI instead of hitting the network every time.
  - Optionally `expo-sqlite` if the gallery grows large and you want indexed queries instead of one big JSON blob.
- On app launch:
  1. Render immediately from local cache.
  2. If online, silently check Firestore for changes (e.g. compare a `lastUpdated` timestamp) and re-sync only what changed.
  3. Update local cache in the background; UI updates reactively.

### 4. Photobooth upload flow
1. User captures photo → saved to local cache instantly (so it's viewable right away, even offline).
2. Added to an "upload queue" in AsyncStorage.
3. When online, the queue is drained: each photo is uploaded to Firebase Storage (directly, or via the Vercel `/api/upload` route), and its Firestore record is created.
4. Once confirmed uploaded, mark the local copy as synced (so it's not re-uploaded).

---

## Updated Project Structure

```
xeia/
├── app/                      # Expo Router screens (file-based routing)
│   ├── index.tsx              # LoginScreen (lock screen)
│   ├── intro.tsx
│   ├── timeline.tsx
│   ├── interactive.tsx
│   ├── finale.tsx
│   ├── home.tsx
│   ├── gallery.tsx
│   └── photobooth.tsx
├── components/                # Shared UI components (TimelineCard, PhotoStripTemplate, etc.)
├── lib/
│   ├── firebase.ts            # Firebase app init (Auth, Firestore, Storage)
│   ├── storage.ts             # AsyncStorage/FileSystem helpers (cache read/write, sync logic)
│   └── uploadQueue.ts         # Offline upload queue for Photobooth
├── data/                      # Fallback/default static content (timeline, gallery seed data)
├── assets/                    # Fonts, default images
├── app.json / app.config.ts   # Expo config
├── eas.json                   # EAS Build profiles
└── package.json

vercel-api/                    # Separate Vercel project (Next.js) — optional
├── app/api/upload/route.ts
├── app/api/gallery/route.ts
└── lib/firebaseAdmin.ts       # Firebase Admin SDK (server-side)
```

---

## Migration Checklist (from Capacitor → Expo)

- [ ] `npx create-expo-app xeia` and set up **Expo Router**.
- [ ] Port components from `src/components/` — mostly drop-in, but replace `<div>`/`<img>` with `<View>`/`<Image>`, and Tailwind classes via **NativeWind**.
- [ ] Replace `localStorage` calls with `AsyncStorage` (same key/value pattern, async API).
- [ ] Replace `MediaDevices.getUserMedia()` camera code with `expo-camera`.
- [ ] Set up **Firebase** project: Auth (optional), Firestore, Storage; add config to `lib/firebase.ts`.
- [ ] Build the **local cache layer** (`lib/storage.ts`) with a `syncFromFirebase()` function that runs on app start and on reconnect (`@react-native-community/netinfo` to detect connectivity).
- [ ] Build the **upload queue** for Photobooth photos.
- [ ] Stand up the **Vercel** project for web export + optional `/api/upload` and `/api/gallery` routes.
- [ ] Configure **EAS Build** for iOS/Android binaries and **EAS Update** for OTA JS updates.
- [ ] Test the full offline path: airplane mode → app should still show timeline, gallery (cached images), and letter.

---

## Open Questions to Decide

1. **Auth**: passcode-only lock screen (simplest) vs. real Firebase Auth account for Erica Joy?
2. **Image pipeline**: do the Vercel API routes do resizing/compression (recommended, keeps mobile storage small), or upload originals straight to Firebase Storage from the device?
3. **Sync strategy**: real-time (`onSnapshot`) vs. manual "pull to refresh" sync — real-time is nicer but costs more Firestore reads.
