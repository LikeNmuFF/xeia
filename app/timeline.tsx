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
          <LinearGradient
            colors={[colors.tulipPink, colors.tulipGreen]}
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
