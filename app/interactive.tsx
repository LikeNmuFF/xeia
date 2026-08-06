import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Slider } from '@miblanchard/react-native-slider';
import { Heart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSpring,
  FadeInUp,
} from 'react-native-reanimated';
import { MotiView } from 'moti';
import { Button, Card, AnimatedHeart } from '../components';
import { getCachedData, setCachedData, CACHE_KEYS } from '../lib/storage';
import { colors, typography, spacing, borderRadius } from '../lib/theme';

export default function InteractiveScreen() {
  const router = useRouter();
  const [lovePercentage, setLovePercentage] = useState(0);
  const [message, setMessage] = useState('');
  const [showLetter, setShowLetter] = useState(false);

  // Pulsing glow behind heart
  const glowScale = useSharedValue(1);
  useEffect(() => {
    glowScale.value = withRepeat(
      withSpring(1.3, { damping: 10, stiffness: 100 }),
      -1,
      true
    );
  }, []);
  const glowStyle = useAnimatedStyle(() => ({
    transform: [{ scale: glowScale.value }],
    opacity: 0.15,
  }));

  useEffect(() => {
    async function loadSavedState() {
      const saved = await getCachedData(CACHE_KEYS.LOVE_METER);
      if (saved?.percentage) {
        setLovePercentage(saved.percentage);
        setMessage(saved.message || getMessageForPercentage(saved.percentage));
        setShowLetter(saved.showLetter || false);
      }
    }
    loadSavedState();
  }, []);

  const getMessageForPercentage = (percentage: number): string => {
    if (percentage >= 100) {
      return "100% - You're my everything! Swipe down to read my letter to you.";
    } else if (percentage >= 90) {
      return "Wow, that's a lot of love! But I know it can go higher... keep going!";
    } else if (percentage >= 75) {
      return "Strong love! But there's still room to grow together.";
    } else if (percentage >= 50) {
      return "Halfway there! We're just getting started on our journey.";
    } else if (percentage >= 25) {
      return "Good start! But I know our love is much stronger than this.";
    } else {
      return "Every journey starts somewhere. Slide to show how much you love me!";
    }
  };

  const handleSliderChange = (value: number[]) => {
    const percentage = Math.round(value[0]);
    setLovePercentage(percentage);
    setMessage(getMessageForPercentage(percentage));
  };

  const handleSliderRelease = async (value: number[]) => {
    const percentage = Math.round(value[0]);
    setLovePercentage(percentage);
    const newMessage = getMessageForPercentage(percentage);
    setMessage(newMessage);
    await setCachedData(CACHE_KEYS.LOVE_METER, {
      percentage,
      message: newMessage,
      updatedAt: new Date().toISOString(),
    });
    if (percentage >= 100) {
      setShowLetter(true);
    }
  };

  const handleReadLetter = () => {
    setCachedData(CACHE_KEYS.LOVE_METER, {
      percentage: lovePercentage,
      message,
      showLetter: true,
      updatedAt: new Date().toISOString(),
    });
    router.push('/finale');
  };

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
          <Text style={styles.title}>Love Meter</Text>
          <Text style={styles.subtitle}>How much do you love me?</Text>
        </MotiView>

        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 200, duration: 600 }}
        >
          <Card variant="glass" size="xl" style={styles.sliderContainer}>
            <Text style={styles.percentageText}>{lovePercentage}%</Text>

            <Slider
              value={lovePercentage}
              onValueChange={handleSliderChange}
              onSlidingComplete={handleSliderRelease}
              minimumValue={0}
              maximumValue={100}
              step={1}
              containerStyle={styles.slider}
              trackStyle={styles.track}
              thumbStyle={styles.thumb}
              minimumTrackTintColor={colors.lovePrimary}
              maximumTrackTintColor={colors.neutral[700]}
              thumbTintColor={colors.lovePrimary}
            />

            <View style={styles.labels}>
              <Text style={styles.label}>0%</Text>
              <Text style={styles.label}>100%</Text>
            </View>
          </Card>
        </MotiView>

        <MotiView
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 400, duration: 800, type: 'spring' }}
          style={styles.heartContainer}
        >
          {/* Glow backdrop */}
          <Animated.View style={[styles.heartGlow, glowStyle]} />
          <AnimatedHeart
            size={lovePercentage * 3}
            color={colors.lovePrimary}
            fillColor={colors.lovePrimary}
            isFilled={lovePercentage >= 100}
            isBeating={lovePercentage >= 100}
            glow
          />
        </MotiView>

        {message ? (
          <MotiView
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 500, duration: 500 }}
          >
            <Card variant="glass" size="md" style={styles.messageContainer}>
              <Text style={styles.message}>{message}</Text>
            </Card>
          </MotiView>
        ) : null}

        {showLetter && lovePercentage >= 100 && (
          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 600, duration: 500 }}
          >
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onPress={handleReadLetter}
              glow
            >
              Read My Letter
            </Button>
          </MotiView>
        )}
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
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.foreground,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.lg,
    color: colors.foregroundTertiary,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  sliderContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    padding: spacing.lg,
  },
  percentageText: {
    fontSize: typography.fontSize['7xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.lovePrimary,
    marginBottom: spacing.md,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  track: {
    height: 8,
    borderRadius: borderRadius.full,
  },
  thumb: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: spacing.sm,
  },
  label: {
    fontSize: typography.fontSize.sm,
    color: colors.foregroundTertiary,
  },
  heartContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    minHeight: 200,
    justifyContent: 'center',
  },
  heartGlow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.lovePrimary,
  },
  messageContainer: {
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  message: {
    fontSize: typography.fontSize.lg,
    color: colors.foreground,
    textAlign: 'center',
    lineHeight: 28,
  },
});
