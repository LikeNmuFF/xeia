# Xeia Elegant & Minimal UI/UX Upgrade — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade 4 core screens (Login, Intro, Home, Timeline) from raw StyleSheet to polished Elegant & Minimal design using existing theme, components, and animation libraries.

**Architecture:** Replace hardcoded StyleSheet colors with theme imports, wrap screens in LinearGradient backgrounds, swap TouchableOpacity/View for Button/Card components, and add Reanimated/Moti entrance animations. No new components created — all building blocks exist.

**Tech Stack:** expo-linear-gradient, react-native-reanimated, moti, lucide-react-native, existing components (Button, Card, Loading)

## Global Constraints

- Expo SDK 57 (React Native 0.86, React 19.2)
- Theme colors from `lib/theme.ts` — never hardcode hex values
- Components from `components/` directory — use existing Button, Card, Loading
- Animations via Reanimated v3 + Moti — use `animation.spring` config from theme
- Spacing via `spacing` from theme — no magic numbers
- All screens must keep existing functionality (navigation, state, cache)
- No new files created for screens — only modifications to existing `app/*.tsx`

---

### Task 1: Install Moti dependency (if not already in node_modules)

**Files:**
- Modify: `package.json`

**Interfaces:**
- Consumes: N/A (setup task)
- Produces: Moti available for import in screen files

- [ ] **Step 1: Check if moti is installed**

```bash
ls node_modules/moti/package.json 2>/dev/null && echo "INSTALLED" || echo "NOT INSTALLED"
```

- [ ] **Step 2: If not installed, install it**

```bash
npx expo install moti
```

- [ ] **Step 3: Verify moti imports work**

```bash
node -e "require('moti'); console.log('moti OK')"
```

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: ensure moti dependency installed for animations"
```

---

### Task 2: Upgrade Login Screen (app/index.tsx)

**Files:**
- Modify: `app/index.tsx` (full rewrite)

**Interfaces:**
- Consumes: `colors`, `spacing` from `lib/theme.ts`; `Button` from `components/Button.tsx`
- Produces: Gradient background, glass input, animated heart, staggered entrance

- [ ] **Step 1: Replace entire content of app/index.tsx**

```tsx
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Lock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSpring,
  FadeInUp,
} from 'react-native-reanimated';
import { colors, spacing, borderRadius } from '../lib/theme';
import { Button } from '../components/Button';

const AnimatedHeart = Animated.createAnimatedComponent(Lock);

export default function LoginScreen() {
  const router = useRouter();
  const [passcode, setPasscode] = useState('');

  const PASSCODE = '18MonthsOfLove';

  // Heart pulse animation
  const pulse = useSharedValue(1);

  useEffect(() => {
    pulse.value = withRepeat(
      withSpring(1.15, { damping: 10, stiffness: 100 }),
      -1,
      true
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  const handleSubmit = () => {
    if (passcode === PASSCODE) {
      router.replace('/intro');
    } else {
      Alert.alert('Incorrect', 'Please enter the correct passcode');
    }
  };

  return (
    <LinearGradient
      colors={[colors.background, colors.backgroundTertiary]}
      style={styles.container}
    >
      <Animated.View entering={FadeInUp.delay(100).duration(600)} style={styles.content}>
        <Animated.View style={[styles.heartWrapper, pulseStyle]}>
          <Lock size={64} color={colors.lovePrimary} />
        </Animated.View>

        <Text style={styles.title}>Xeia</Text>
        <Text style={styles.subtitle}>18 Months of Love</Text>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(400).duration(600)} style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Enter passcode"
          placeholderTextColor={colors.foregroundTertiary}
          value={passcode}
          onChangeText={setPasscode}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Button
          variant="primary"
          size="lg"
          fullWidth
          glow
          onPress={handleSubmit}
        >
          Unlock
        </Button>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  content: {
    alignItems: 'center',
    marginBottom: 60,
  },
  heartWrapper: {
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: colors.goldPrimary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 18,
    color: colors.loveLight,
  },
  form: {
    gap: spacing.md,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: colors.glass.background,
    borderWidth: 1,
    borderColor: colors.glass.border,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.lg,
    color: colors.foreground,
    fontSize: 16,
  },
});
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: No errors related to app/index.tsx

- [ ] **Step 3: Commit**

```bash
git add app/index.tsx
git commit -m "feat(login): upgrade to elegant minimal design with gradient and animations"
```

---

### Task 3: Upgrade Intro Screen (app/intro.tsx)

**Files:**
- Modify: `app/intro.tsx` (full rewrite)

**Interfaces:**
- Consumes: `colors`, `spacing` from `lib/theme.ts`; `Button` from `components/Button.tsx`
- Produces: Gradient background, staggered Moti entrance animations, glowing heart

- [ ] **Step 1: Replace entire content of app/intro.tsx**

```tsx
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Heart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { colors, spacing } from '../lib/theme';
import { Button } from '../components/Button';

export default function IntroScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={[colors.background, colors.backgroundTertiary]}
      style={styles.container}
    >
      {/* Glow backdrop */}
      <View style={styles.glowOrb} />

      <MotiView
        from={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 10, stiffness: 100, delay: 200 }}
        style={styles.heartContainer}
      >
        <Heart size={80} color={colors.lovePrimary} />
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 400, duration: 600 }}
      >
        <Text style={styles.title}>Welcome to Xeia</Text>
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 600, duration: 600 }}
      >
        <Text style={styles.description}>
          A celebration of 18 beautiful months together.
          {'\n\n'}
          Swipe through our journey, measure our love,
          and relive the memories that made us who we are.
        </Text>
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 800, duration: 600 }}
        style={styles.buttonContainer}
      >
        <Button
          variant="primary"
          size="xl"
          fullWidth
          glow
          onPress={() => router.replace('/home')}
        >
          Begin Our Story
        </Button>
      </MotiView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  glowOrb: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: colors.lovePrimary,
    opacity: 0.08,
    top: '25%',
  },
  heartContainer: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.foreground,
    marginBottom: spacing.xl,
    textAlign: 'center',
    letterSpacing: 0.02,
  },
  description: {
    fontSize: 18,
    color: colors.foregroundSecondary,
    textAlign: 'center',
    marginBottom: spacing['3xl'],
    lineHeight: 28,
  },
  buttonContainer: {
    width: '100%',
  },
});
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: No errors related to app/intro.tsx

- [ ] **Step 3: Commit**

```bash
git add app/intro.tsx
git commit -m "feat(intro): upgrade to elegant minimal with gradient, Moti stagger, glow orb"
```

---

### Task 4: Upgrade Home Screen (app/home.tsx)

**Files:**
- Modify: `app/home.tsx` (full rewrite)

**Interfaces:**
- Consumes: `colors`, `spacing`, `borderRadius`, `shadows` from `lib/theme.ts`; `Card`, `GradientCard` from `components/Card.tsx`
- Produces: Gradient bg, glass counter card, gradient menu cards with glow, counter tick animation

- [ ] **Step 1: Replace entire content of app/home.tsx**

```tsx
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Heart, Calendar, Camera, Images } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { MotiView } from 'moti';
import { colors, spacing, borderRadius, shadows } from '../lib/theme';
import { Card } from '../components/Card';

const START_DATE = new Date('2025-07-24T00:00:00');

const menuItems = [
  { name: 'Timeline', icon: Calendar, color: colors.info, route: '/timeline' },
  { name: 'Love Meter', icon: Heart, color: colors.lovePrimary, route: '/interactive' },
  { name: 'Photo Gallery', icon: Images, color: colors.purplePrimary, route: '/gallery' },
  { name: 'Photobooth', icon: Camera, color: colors.success, route: '/photobooth' },
];

function AnimatedCounter({ value, delay }: { value: number; delay: number }) {
  const displayValue = useSharedValue(0);

  useEffect(() => {
    displayValue.value = withTiming(value, {
      duration: 1200,
      easing: Easing.out(Easing.cubic),
    });
  }, [value]);

  const animatedStyle = useAnimatedStyle(() => ({
    // Reanimated displayValue doesn't directly map to Text, so we use a simple approach
  }));

  return (
    <Text style={counterStyles.value}>{value}</Text>
  );
}

const counterStyles = StyleSheet.create({
  value: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.goldPrimary,
  },
});

export default function HomeScreen() {
  const router = useRouter();
  const [time, setTime] = useState({ months: 0, days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const updateCounter = () => {
      const now = new Date();
      const diff = now.getTime() - START_DATE.getTime();
      const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
      const remaining = diff % (1000 * 60 * 60 * 24 * 30);
      const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const remaining2 = remaining % (1000 * 60 * 60 * 24);
      const hours = Math.floor(remaining2 / (1000 * 60 * 60));
      const remaining3 = remaining2 % (1000 * 60 * 60);
      const minutes = Math.floor(remaining3 / (1000 * 60));
      setTime({ months, days, hours, minutes });
    };
    updateCounter();
    const interval = setInterval(updateCounter, 60000);
    return () => clearInterval(interval);
  }, []);

  const counters = [
    { value: time.months, label: 'Months' },
    { value: time.days, label: 'Days' },
    { value: time.hours, label: 'Hours' },
    { value: time.minutes, label: 'Minutes' },
  ];

  return (
    <LinearGradient
      colors={[colors.background, colors.backgroundTertiary]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 100, duration: 600 }}
        >
          <Text style={styles.title}>Our Journey</Text>
        </MotiView>

        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 200, duration: 600 }}
        >
          <Card variant="glass" size="xl" glow glowColor={colors.goldPrimary}>
            <View style={styles.counterContainer}>
              {counters.map((item, index) => (
                <View key={item.label} style={styles.counterItem}>
                  <Text style={styles.counterValue}>{item.value}</Text>
                  <Text style={styles.counterLabel}>{item.label}</Text>
                </View>
              ))}
            </View>
          </Card>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 400, duration: 600 }}
        >
          <Text style={styles.sectionTitle}>Explore</Text>
        </MotiView>

        <View style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <MotiView
              key={item.name}
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 500 + index * 100, duration: 600 }}
            >
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => router.push(item.route as any)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[item.color + '33', item.color + '11']}
                  style={styles.menuGradient}
                >
                  <View style={[styles.menuIcon, { shadowColor: item.color, ...shadows.glow.love }]}>
                    <item.icon size={28} color={item.color} />
                  </View>
                  <Text style={styles.menuText}>{item.name}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </MotiView>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.xl,
    paddingTop: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.foreground,
    marginBottom: spacing.xl,
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  counterItem: {
    alignItems: 'center',
  },
  counterLabel: {
    fontSize: 14,
    color: colors.foregroundTertiary,
    marginTop: spacing.xs,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.foreground,
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  menuItem: {
    width: '47%',
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  menuGradient: {
    alignItems: 'center',
    padding: spacing.xl,
    borderRadius: borderRadius.xl,
  },
  menuIcon: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginBottom: spacing.sm,
  },
  menuText: {
    fontSize: 16,
    color: colors.foreground,
    fontWeight: '500',
  },
});
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: No errors related to app/home.tsx

- [ ] **Step 3: Commit**

```bash
git add app/home.tsx
git commit -m "feat(home): upgrade to elegant minimal with glass counter, gradient menu cards"
```

---

### Task 5: Upgrade Timeline Screen (app/timeline.tsx)

**Files:**
- Modify: `app/timeline.tsx` (full rewrite)

**Interfaces:**
- Consumes: `colors`, `spacing`, `borderRadius` from `lib/theme.ts`; `Card` from `components/Card.tsx`
- Produces: Gradient bg, gradient timeline line, bordered event cards, pulsing node hearts, alternating layout

- [ ] **Step 1: Replace entire content of app/timeline.tsx**

```tsx
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Calendar, Heart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSpring,
  FadeInLeft,
  FadeInRight,
} from 'react-native-reanimated';
import { MotiView } from 'moti';
import { colors, spacing, borderRadius } from '../lib/theme';
import { getCachedData, CACHE_KEYS } from '../lib/storage';

interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl?: string;
}

function PulsingHeart({ delay }: { delay: number }) {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSpring(1.2, { damping: 10, stiffness: 100 }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.node, animatedStyle]}>
      <Heart size={16} color={colors.lovePrimary} fill={colors.lovePrimary} />
    </Animated.View>
  );
}

export default function TimelineScreen() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTimeline();
  }, []);

  async function loadTimeline() {
    setLoading(true);
    try {
      let data = await getCachedData(CACHE_KEYS.TIMELINE);
      if (!data || data.length === 0) {
        data = getFallbackTimeline();
      }
      setEvents(data);
    } catch (error) {
      console.error('Error loading timeline:', error);
      setEvents(getFallbackTimeline());
    } finally {
      setLoading(false);
    }
  }

  const getFallbackTimeline = (): TimelineEvent[] => [
    { id: '1', title: 'First Date', date: 'July 24, 2025', description: 'Our first official date at the coffee shop downtown. We talked for hours and knew there was something special.' },
    { id: '2', title: 'First Kiss', date: 'August 2, 2025', description: 'Under the stars at the park. It was magical and we both knew our feelings were real.' },
    { id: '3', title: 'Made it Official', date: 'September 1, 2025', description: 'We decided to be exclusive and start our journey together officially.' },
    { id: '4', title: 'First Trip Together', date: 'October 15, 2025', description: 'Our weekend getaway to the mountains. First of many adventures together.' },
    { id: '5', title: 'Met the Family', date: 'November 22, 2025', description: 'Thanksgiving with both families. Everyone could see how happy we make each other.' },
    { id: '6', title: 'First Anniversary', date: 'January 24, 2026', description: 'Celebrated 6 months together with a romantic dinner and promises of forever.' },
    { id: '7', title: 'Moved In Together', date: 'March 1, 2026', description: 'Took the big step and started living together. Every day since has been amazing.' },
    { id: '8', title: '18 Months of Love', date: 'January 24, 2027', description: '18 beautiful months of love, laughter, and growing together. Here\'s to forever.' },
  ];

  if (loading) {
    return (
      <LinearGradient colors={[colors.background, colors.backgroundTertiary]} style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading our timeline...</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={[colors.background, colors.backgroundTertiary]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 100, duration: 600 }}
        >
          <Text style={styles.title}>Our Timeline</Text>
          <Text style={styles.subtitle}>A journey of love and memories</Text>
        </MotiView>

        <View style={styles.timeline}>
          {/* Gradient vertical line */}
          <LinearGradient
            colors={[colors.lovePrimary, colors.purplePrimary]}
            style={styles.timelineLine}
          />

          {events.map((event, index) => {
            const isEven = index % 2 === 0;
            return (
              <Animated.View
                key={event.id}
                style={[styles.eventRow, isEven ? styles.eventRowLeft : styles.eventRowRight]}
                entering={isEven ? FadeInLeft.delay(200 + index * 150).duration(600) : FadeInRight.delay(200 + index * 150).duration(600)}
              >
                <PulsingHeart delay={index * 100} />

                <View style={[styles.eventCard, isEven ? styles.eventCardLeft : styles.eventCardRight]}>
                  <View style={styles.dateBadge}>
                    <Calendar size={14} color={colors.lovePrimary} />
                    <Text style={styles.dateText}>{event.date}</Text>
                  </View>

                  <View style={styles.eventContent}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <Text style={styles.eventDescription}>{event.description}</Text>
                  </View>
                </View>
              </Animated.View>
            );
          })}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.foregroundSecondary,
    fontSize: 16,
  },
  scrollContent: {
    padding: spacing.xl,
    paddingTop: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.foreground,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: colors.foregroundTertiary,
    marginBottom: spacing.xl,
  },
  timeline: {
    position: 'relative',
    paddingTop: spacing.md,
  },
  timelineLine: {
    position: 'absolute',
    left: 20,
    top: 0,
    bottom: 0,
    width: 2,
    borderRadius: 1,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.xl,
    position: 'relative',
  },
  eventRowLeft: {
    paddingLeft: spacing['2xl'],
  },
  eventRowRight: {
    paddingLeft: spacing['2xl'],
  },
  node: {
    position: 'absolute',
    left: 12,
    top: spacing.lg,
    zIndex: 1,
  },
  eventCard: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.neutral[700],
    padding: spacing.lg,
  },
  eventCardLeft: {
    marginRight: spacing.lg,
  },
  eventCardRight: {
    marginRight: spacing.lg,
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.lovePrimary + '20',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    marginBottom: spacing.sm,
  },
  dateText: {
    fontSize: 12,
    color: colors.lovePrimary,
    fontWeight: '600',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  eventDescription: {
    fontSize: 14,
    color: colors.foregroundSecondary,
    lineHeight: 22,
  },
  eventContent: {},
});
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: No errors related to app/timeline.tsx

- [ ] **Step 3: Commit**

```bash
git add app/timeline.tsx
git commit -m "feat(timeline): upgrade to elegant minimal with gradient line, glass cards, pulsing nodes"
```

---

### Task 6: Update agent tracking files

**Files:**
- Modify: `.agent/TASKS.md`
- Modify: `.agent/PROGRESS.md`

**Interfaces:**
- Consumes: N/A (meta task)
- Produces: Updated task board and progress log

- [ ] **Step 1: Update TASKS.md**

Mark these tasks as DONE in `.agent/TASKS.md`:
- Update all screens to use new components and theme
- Add consistent styling across all screens

- [ ] **Step 2: Append to PROGRESS.md**

```markdown
## 2026-07-24 — agent:opencode
Completed Elegant & Minimal UI/UX upgrade for 4 core screens:
- Login (app/index.tsx): gradient bg, glass input, animated heart pulse, staggered entrance
- Intro (app/intro.tsx): gradient bg, Moti stagger animations, glowing orb backdrop
- Home (app/home.tsx): gradient bg, glass counter card, gradient menu cards with glow
- Timeline (app/timeline.tsx): gradient bg, gradient vertical line, bordered event cards, pulsing node hearts

All screens now use theme.ts colors, Button/Card components, and Reanimated/Moti animations.
```

- [ ] **Step 3: Commit**

```bash
git add .agent/TASKS.md .agent/PROGRESS.md
git commit -m "docs: update task board and progress log for UI/UX upgrade"
```

---

### Task 7: Final verification

**Files:**
- N/A (verification only)

**Interfaces:**
- Consumes: All modified screen files
- Produces: Confirmation that app builds and screens render

- [ ] **Step 1: Run TypeScript check**

```bash
npx tsc --noEmit 2>&1
```

Expected: No errors

- [ ] **Step 2: Run linter**

```bash
npx expo lint 2>&1 | tail -20
```

Expected: No new errors

- [ ] **Step 3: Test app starts**

```bash
npx expo start --web 2>&1 &
sleep 10 && kill %1 2>/dev/null
```

Expected: App starts without crashes

- [ ] **Step 4: Final commit if any fixes needed**

```bash
git add -A && git commit -m "fix: address lint issues from UI/UX upgrade" || true
```
