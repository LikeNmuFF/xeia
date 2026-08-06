import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { TulipIcon } from '../components/TulipIcon';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Defs, Stop, LinearGradient as SvgLinearGradient } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSpring,
  Easing,
  FadeInUp,
} from 'react-native-reanimated';
import { MotiView } from 'moti';
import { colors, spacing, borderRadius, shadows } from '../lib/theme';
import { Card } from '../components/Card';

const { width } = Dimensions.get('window');
const START_DATE = new Date('2025-01-24T00:00:00');
const CIRCLE_SIZE = width * 0.55;
const STROKE_WIDTH = 12;
const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Tulip SVG icon
const TulipHero = ({ size = 120 }: { size?: number }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <View style={[heroStyles.petal, { transform: [{ rotate: '-30deg' }, { translateY: -size * 0.15 }] }]} />
    <View style={[heroStyles.petal, { transform: [{ rotate: '0deg' }, { translateY: -size * 0.2 }] }]} />
    <View style={[heroStyles.petal, { transform: [{ rotate: '30deg' }, { translateY: -size * 0.15 }] }]} />
    <View style={[heroStyles.petalCenter, { width: size * 0.18, height: size * 0.22 }]} />
    <View style={[heroStyles.stem, { height: size * 0.35 }]} />
    <View style={[heroStyles.leaf, { transform: [{ rotate: '-45deg' }, { translateX: -size * 0.06 }] }]} />
    <View style={[heroStyles.leaf, { transform: [{ rotate: '45deg' }, { translateX: size * 0.06 }] }]} />
  </View>
);

const heroStyles = StyleSheet.create({
  petal: {
    position: 'absolute',
    width: 32,
    height: 48,
    backgroundColor: colors.tulipPink,
    borderRadius: '50% 50% 50% 50%',
    top: '12%',
  },
  petalCenter: {
    position: 'absolute',
    backgroundColor: colors.tulipYellow,
    borderRadius: '50%',
    top: '22%',
  },
  stem: {
    position: 'absolute',
    width: 5,
    backgroundColor: colors.tulipGreen,
    bottom: '8%',
    borderRadius: 3,
  },
  leaf: {
    position: 'absolute',
    width: 20,
    height: 10,
    backgroundColor: colors.tulipGreen,
    borderRadius: '50%',
    bottom: '22%',
  },
});

const menuItems = [
  { name: 'Timeline', route: '/timeline' },
  { name: 'Love Meter', route: '/interactive' },
  { name: 'Photo Gallery', route: '/gallery' },
  { name: 'Photobooth', route: '/photobooth' },
];

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [time, setTime] = useState({ months: 0, days: 0, hours: 0, minutes: 0 });
  const progress = useSharedValue(0);

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
      
      // Animate circle progress (based on months, max 24 months = full circle)
      progress.value = withTiming(months / 24, {
        duration: 1500,
        easing: Easing.out(Easing.cubic),
      });
    };
    updateCounter();
    const interval = setInterval(updateCounter, 60000);
    return () => clearInterval(interval);
  }, []);

  const strokeDashoffset = CIRCUMFERENCE * (1 - progress.value);

  return (
    <LinearGradient
      colors={[colors.background, colors.backgroundTertiary]}
      style={styles.container}
    >
      {/* Background floating elements */}
      <View style={styles.bgPetal1} />
      <View style={styles.bgPetal2} />

      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 20 }]}>
        {/* Hero Section */}
        <MotiView
          from={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 100, duration: 800 }}
          style={styles.heroSection}
        >
          <TulipHero size={100} />
          <Text style={styles.heroTitle}>Our Love Story</Text>
          <Text style={styles.heroSubtitle}>Growing together, day by day</Text>
        </MotiView>

        {/* Circular Counter */}
        <MotiView
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 300, duration: 800, type: 'spring' }}
          style={styles.circleContainer}
        >
          <View style={styles.circleWrapper}>
            <Svg width={CIRCLE_SIZE} height={CIRCLE_SIZE}>
              <Defs>
                <SvgLinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <Stop offset="0%" stopColor={colors.tulipPink} />
                  <Stop offset="50%" stopColor={colors.tulipYellow} />
                  <Stop offset="100%" stopColor={colors.tulipGreen} />
                </SvgLinearGradient>
              </Defs>
              {/* Background circle */}
              <Circle
                cx={CIRCLE_SIZE / 2}
                cy={CIRCLE_SIZE / 2}
                r={RADIUS}
                stroke={colors.neutral[800]}
                strokeWidth={STROKE_WIDTH}
                fill="none"
              />
              {/* Progress circle */}
              <Circle
                cx={CIRCLE_SIZE / 2}
                cy={CIRCLE_SIZE / 2}
                r={RADIUS}
                stroke="url(#gradient)"
                strokeWidth={STROKE_WIDTH}
                fill="none"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform={`rotate(-90 ${CIRCLE_SIZE / 2} ${CIRCLE_SIZE / 2})`}
              />
            </Svg>
            
            {/* Center content */}
            <View style={styles.circleContent}>
              <Text style={styles.circleNumber}>{time.months}</Text>
              <Text style={styles.circleLabel}>months</Text>
              <View style={styles.circleSubRow}>
                <View style={styles.circleSubItem}>
                  <Text style={styles.circleSubNumber}>{time.days}</Text>
                  <Text style={styles.circleSubLabel}>days</Text>
                </View>
                <View style={styles.circleDivider} />
                <View style={styles.circleSubItem}>
                  <Text style={styles.circleSubNumber}>{time.hours}</Text>
                  <Text style={styles.circleSubLabel}>hours</Text>
                </View>
              </View>
            </View>
          </View>
        </MotiView>

        {/* Nav Cards */}
        <MotiView
          from={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 500, duration: 600 }}
        >
          <Text style={styles.sectionTitle}>Explore</Text>
        </MotiView>

        <View style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <MotiView
              key={item.name}
              from={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 600 + index * 100, duration: 500 }}
            >
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => router.push(item.route as any)}
                activeOpacity={0.8}
              >
                <View style={styles.menuTile}>
                  <View style={styles.menuIconContainer}>
                    <TulipIcon size={28} color={colors.purplePrimary} />
                  </View>
                  <Text style={styles.menuText}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            </MotiView>
          ))}
        </View>

        {/* Footer quote */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1000, duration: 800 }}
          style={styles.footerQuote}
        >
          <Text style={styles.quoteText}>"Every love story is beautiful, but ours is my favorite."</Text>
        </MotiView>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgPetal1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.tulipPink,
    opacity: 0.03,
    top: '5%',
    right: '-15%',
  },
  bgPetal2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.tulipGreen,
    opacity: 0.04,
    bottom: '15%',
    left: '-10%',
  },
  scrollContent: {
    padding: spacing.xl,
    paddingBottom: spacing['3xl'],
  },
  // Hero
  heroSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.cream,
    marginTop: spacing.md,
    letterSpacing: 1,
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.tulipPinkLight,
    fontStyle: 'italic',
    marginTop: spacing.xs,
  },
  // Circle counter
  circleContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  circleWrapper: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContent: {
    position: 'absolute',
    alignItems: 'center',
  },
  circleNumber: {
    fontSize: 64,
    fontWeight: 'bold',
    color: colors.tulipYellow,
  },
  circleLabel: {
    fontSize: 16,
    color: colors.foregroundTertiary,
    textTransform: 'uppercase',
    letterSpacing: 3,
    marginTop: -spacing.sm,
  },
  circleSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    gap: spacing.md,
  },
  circleSubItem: {
    alignItems: 'center',
  },
  circleSubNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.cream,
  },
  circleSubLabel: {
    fontSize: 11,
    color: colors.foregroundTertiary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  circleDivider: {
    width: 1,
    height: 24,
    backgroundColor: colors.neutral[700],
  },
  // Menu
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.cream,
    marginBottom: spacing.lg,
    letterSpacing: 0.5,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  menuItem: {
    width: '47%',
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  menuTile: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.glass.background,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.glass.border,
    minHeight: 120,
  },
  menuIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    marginBottom: spacing.md,
  },
  menuText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.cream,
    textAlign: 'center',
  },
  // Footer
  footerQuote: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  quoteText: {
    fontSize: 14,
    color: colors.foregroundTertiary,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 22,
  },
});
