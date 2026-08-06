# Xeia UI/UX Upgrade: Elegant & Minimal Design

## Overview

Upgrade the 4 core screens (Login, Intro, Home, Timeline) from raw `StyleSheet.create()` to a polished, elegant, minimal design using the existing theme system, reusable components, and animation libraries.

## Approach

Refactor screens to use:
- `lib/theme.ts` colors, spacing, typography, gradients, glass effects
- `components/Button.tsx` (primary variant + glow)
- `components/Card.tsx` (glass, bordered, gradient variants)
- `components/Loading.tsx` (heartbeat, shimmer)
- `expo-linear-gradient` for gradient backgrounds
- `react-native-reanimated` for entrance animations and micro-interactions

No new components are created. All building blocks already exist.

---

## Screen 1: Login (app/index.tsx)

### Layout
- Full-screen `LinearGradient` background: `colors.gradient.night` (`#1a1a2e` → `#16213e`)
- Centered content with safe-area padding

### Elements
| Element | Component | Style |
|---------|-----------|-------|
| Heart icon | `Animated` wrapper around `Heart` (lucide) | Reanimated pulse: scale 1 → 1.15 → 1, loop with spring |
| "Xeia" title | `Text` | `fontSize: 42`, `fontWeight: 'bold'`, `color: colors.goldPrimary` |
| Subtitle | `Text` | `fontSize: 18`, `color: colors.loveLight` |
| Passcode input | `Input` from components (glass variant) | Glass background, white text, love-primary accent |
| Unlock button | `Button` from components (primary, glow, lg) | Full width, glow effect on hover |

### Animations
- Heart: `withRepeat(withSpring(...))` for continuous gentle pulse
- Elements fade in sequentially on mount (Moti `FadeInUp` with stagger)

### Spacing
- Uses `spacing.4xl` (64) below subtitle for breathing room
- Input uses `spacing.md` (16) internal padding

---

## Screen 2: Intro (app/intro.tsx)

### Layout
- Full-screen gradient: `LinearGradient` using `colors.gradient.aurora` (purple → love → gold)
- Radial glow overlay behind heart icon

### Elements
| Element | Component | Style |
|---------|-----------|-------|
| Heart icon | `Animated` + `Heart` (lucide, size 80) | Bouncy scale-in on mount (Moti `FadeIn` + `ScaleIn`) |
| Title | `Text` | `fontSize: 36`, bold, white, `letterSpacing: 0.05` |
| Description | `Text` | `fontSize: 18`, `color: colors.foregroundSecondary`, `lineHeight: 28` |
| "Begin Our Story" | `Button` (primary, glow, xl, fullWidth) | Pink with glow shadow |

### Animations
- Heart: Moti `FadeIn` delay 200ms + `ScaleIn` from 0.5 to 1
- Title: Moti `FadeInUp` delay 400ms
- Description: Moti `FadeInUp` delay 600ms
- Button: Moti `FadeInUp` delay 800ms

---

## Screen 3: Home (app/home.tsx)

### Layout
- ScrollView with gradient background
- Top section: large counter display
- Bottom section: 2x2 menu grid

### Counter Section
- Wrapped in `Card` (glass variant, size xl)
- 4 counter items in a row with `justifyContent: 'space-between'`
- Each counter:
  - Number: `fontSize: 48`, `fontWeight: 'bold'`, `color: colors.goldPrimary`
  - Label: `fontSize: 14`, `color: colors.foregroundTertiary`

### Menu Grid
- 2x2 grid with `gap: spacing.lg` (24)
- Each menu item: `GradientCard` with gradient matching its accent color
  - Timeline: `gradient: [colors.info + '33', colors.info + '11']`
  - Love Meter: `gradient: [colors.lovePrimary + '33', colors.lovePrimary + '11']`
  - Photo Gallery: `gradient: [colors.purplePrimary + '33', colors.purplePrimary + '11']`
  - Photobooth: `gradient: [colors.success + '33', colors.success + '11']`
- Each card has:
  - Icon with glow shadow matching its color
  - Label text in white
  - Pressable with scale-down feedback

### Animations
- Counter numbers: `Moti` `FadeIn` with stagger
- Menu items: `Moti` `FadeInUp` with stagger, each 100ms apart
- Counter numbers tick up on mount (Reanimated `withTiming` from 0 to value)

---

## Screen 4: Timeline (app/timeline.tsx)

### Layout
- ScrollView with gradient background
- Vertical timeline line with node markers

### Timeline Line
- `View` with `width: 2`, `position: 'absolute'`, left-aligned
- Background: `LinearGradient` from `colors.lovePrimary` to `colors.purplePrimary`

### Event Cards
- Each event: horizontal layout with alternating alignment (odd = left, even = right)
- Card: `Card` component with `bordered` variant, `size: lg`
- Date badge: Small pill with `backgroundColor: colors.lovePrimary + '20'`, `color: colors.lovePrimary`
- Node marker: `Heart` icon (size 16) at the timeline intersection, pulsing animation

### Elements
| Element | Component | Style |
|---------|-----------|-------|
| Title | `Text` | `fontSize: 32`, bold, white |
| Subtitle | `Text` | `fontSize: 16`, `color: colors.foregroundTertiary` |
| Date badge | `View` + `Text` | Pill shape, love-primary tint |
| Event card | `Card` (bordered) | `backgroundColor: colors.backgroundSecondary`, bordered |
| Timeline node | `Heart` (lucide, size 16) | `color: colors.lovePrimary`, animated pulse |

### Animations
- Cards slide in from left/right as they enter viewport (Reanimated `FadeInLeft`/`FadeInRight`)
- Node hearts pulse continuously with spring animation
- Timeline line draws from top to bottom on mount

---

## Shared Patterns

### Background Gradient
All screens use `LinearGradient` as the outermost wrapper:
```tsx
<LinearGradient colors={['#1a1a2e', '#0f172a']} style={{ flex: 1 }}>
  {/* screen content */}
</LinearGradient>
```

### Screen Title Pattern
```tsx
<Text style={{ fontSize: 32, fontWeight: 'bold', color: '#ffffff' }}>{title}</Text>
<Text style={{ fontSize: 16, color: '#9ca3af', marginBottom: 40 }}>{subtitle}</Text>
```

### Card Press Feedback
All interactive cards use `Pressable` with `transform: [{ scale: 0.98 }]` on press.

### Animation Timing
- Entrance stagger: 150ms between elements
- Spring config: `{ damping: 10, stiffness: 100 }` (from theme.animation.spring)
- Pulse loop: `withRepeat(withSpring(...))` with `-1` repeat

---

## Files Modified

| File | Change |
|------|--------|
| `app/index.tsx` | Gradient bg, Input/Button components, heart animation, staggered entrance |
| `app/intro.tsx` | Gradient bg, Button component, Moti staggered animations |
| `app/home.tsx` | Gradient bg, Card/GradientCard for counters and menu, counter tick animation |
| `app/timeline.tsx` | Gradient bg, Card for events, gradient timeline line, node pulse, alternating layout |

## Files NOT Modified (out of scope)

- `app/interactive.tsx` - Phase 2
- `app/finale.tsx` - Phase 2
- `app/gallery.tsx` - Phase 2
- `app/photobooth.tsx` - Phase 2
- All `lib/` and `components/` files - already complete
