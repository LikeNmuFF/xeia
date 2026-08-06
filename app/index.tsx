import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { TulipIcon } from '../components/TulipIcon';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSpring,
  FadeInUp,
  FadeIn,
} from 'react-native-reanimated';
import { colors, spacing, borderRadius } from '../lib/theme';
import { Button } from '../components/Button';

const { width } = Dimensions.get('window');
const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 5;

interface ScrollPickerProps {
  items: string[];
  selected: string;
  onSelected: (value: string) => void;
  color?: string;
}

function ScrollPicker({ items, selected, onSelected, color = colors.tulipPink }: ScrollPickerProps) {
  const scrollRef = useRef<ScrollView>(null);
  const selectedIndex = items.indexOf(selected);

  useEffect(() => {
    if (scrollRef.current && selectedIndex >= 0) {
      setTimeout(() => {
        scrollRef.current?.scrollTo({ y: selectedIndex * ITEM_HEIGHT, animated: false });
      }, 100);
    }
  }, []);

  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    if (index >= 0 && index < items.length) {
      onSelected(items[index]);
    }
  };

  return (
    <View style={styles.pickerContainer}>
      <View style={[styles.pickerHighlight, { borderColor: color }]} />
      <ScrollView
        ref={scrollRef}
        style={styles.pickerScroll}
        contentContainerStyle={{
          paddingTop: ITEM_HEIGHT * Math.floor(VISIBLE_ITEMS / 2),
          paddingBottom: ITEM_HEIGHT * Math.floor(VISIBLE_ITEMS / 2),
        }}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onMomentumScrollEnd={handleScroll}
      >
        {items.map((item, index) => (
          <View key={item} style={styles.pickerItem}>
            <Text
              style={[
                styles.pickerText,
                item === selected && [styles.pickerTextSelected, { color }],
              ]}
            >
              {item}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default function LoginScreen() {
  const router = useRouter();
  const [day, setDay] = useState('24');
  const [month, setMonth] = useState('07');
  const [year, setYear] = useState('2025');

  // Tulip pulse animation
  const pulse = useSharedValue(1);
  useEffect(() => {
    pulse.value = withRepeat(
      withSpring(1.1, { damping: 10, stiffness: 100 }),
      -1,
      true
    );
  }, []);
  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  // Generate date arrays
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const years = Array.from({ length: 10 }, (_, i) => String(2020 + i));

  const handleSubmit = () => {
    const selectedDate = `${year}-${month}-${day}`;
    const correctDate = '2025-01-24';
    
    if (selectedDate === correctDate) {
      router.replace('/intro');
    } else {
      Alert.alert(
        'Hmm, that\'s not quite right',
        'Think about when our love story began... 🌷',
        [{ text: 'Try Again', style: 'default' }]
      );
    }
  };

  return (
    <LinearGradient
      colors={[colors.background, colors.backgroundTertiary]}
      style={styles.container}
    >
      {/* Background petals */}
      <View style={styles.bgPetal1} />
      <View style={styles.bgPetal2} />
      <View style={styles.bgPetal3} />

      <Animated.View entering={FadeIn.delay(200).duration(800)} style={styles.content}>
        {/* Tulip Icon */}
        <Animated.View style={[styles.tulipWrapper, pulseStyle]}>
          <TulipIcon size={120} color={colors.purplePrimary} />
        </Animated.View>

        {/* Title */}
        <Text style={styles.title}>Xeia</Text>
        <Text style={styles.subtitle}>When did our love bloom?</Text>
      </Animated.View>

      {/* Date Picker */}
      <Animated.View entering={FadeInUp.delay(400).duration(600)} style={styles.dateSection}>
        <View style={styles.datePickerRow}>
          <View style={styles.dateColumn}>
            <Text style={styles.dateLabel}>Day</Text>
            <ScrollPicker
              items={days}
              selected={day}
              onSelected={setDay}
              color={colors.tulipPink}
            />
          </View>

          <Text style={styles.dateSeparator}>/</Text>

          <View style={styles.dateColumn}>
            <Text style={styles.dateLabel}>Month</Text>
            <ScrollPicker
              items={months}
              selected={month}
              onSelected={setMonth}
              color={colors.tulipGreen}
            />
          </View>

          <Text style={styles.dateSeparator}>/</Text>

          <View style={styles.dateColumn}>
            <Text style={styles.dateLabel}>Year</Text>
            <ScrollPicker
              items={years}
              selected={year}
              onSelected={setYear}
              color={colors.tulipYellow}
            />
          </View>
        </View>

        <Text style={styles.dateHint}>dd / mm / yyyy</Text>
      </Animated.View>

      {/* Submit Button */}
      <Animated.View entering={FadeInUp.delay(600).duration(600)} style={styles.buttonSection}>
        <Button
          variant="primary"
          size="xl"
          fullWidth
          glow
          onPress={handleSubmit}
          style={styles.submitButton}
        >
          Begin Our Story 🌷
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
    overflow: 'hidden',
  },
  // Background floating petals
  bgPetal1: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.tulipPink,
    opacity: 0.05,
    top: '10%',
    right: '-10%',
    transform: [{ rotate: '45deg' }],
  },
  bgPetal2: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.tulipGreen,
    opacity: 0.05,
    bottom: '20%',
    left: '-5%',
    transform: [{ rotate: '-30deg' }],
  },
  bgPetal3: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.tulipYellow,
    opacity: 0.08,
    top: '40%',
    right: '10%',
  },
  content: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  tulipWrapper: {
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.cream,
    marginBottom: spacing.sm,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 18,
    color: colors.tulipPinkLight,
    fontStyle: 'italic',
  },
  // Date picker
  dateSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  datePickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  dateColumn: {
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 12,
    color: colors.foregroundTertiary,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  dateSeparator: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.tulipPink,
    marginTop: spacing.lg,
  },
  pickerContainer: {
    width: 70,
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    overflow: 'hidden',
    backgroundColor: colors.glass.background,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.glass.border,
  },
  pickerHighlight: {
    position: 'absolute',
    top: ITEM_HEIGHT * 2,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
    borderWidth: 2,
    borderRadius: borderRadius.lg,
    zIndex: 1,
  },
  pickerScroll: {
    flex: 1,
  },
  pickerItem: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerText: {
    fontSize: 20,
    color: colors.foregroundTertiary,
    fontWeight: '500',
  },
  pickerTextSelected: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  dateHint: {
    fontSize: 12,
    color: colors.foregroundTertiary,
    marginTop: spacing.sm,
    letterSpacing: 2,
  },
  // Button
  buttonSection: {
    paddingHorizontal: spacing.lg,
  },
  submitButton: {
    backgroundColor: colors.tulipGreen,
    borderColor: colors.tulipGreen,
  },
});
