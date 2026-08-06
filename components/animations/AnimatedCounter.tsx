/**
 * Animated Counter Component
 * 
 * Features:
 * - Animated number counting
 * - Pulse animation on value change
 * - Glow effect
 * - Multiple number formats (months, days, hours, minutes)
 */

import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  withSequence,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import { colors, typography, animation } from '../../lib/theme';

// Counter configuration
type CounterSize = 'sm' | 'md' | 'lg' | 'xl';

type CounterType = 'months' | 'days' | 'hours' | 'minutes' | 'custom';

interface AnimatedCounterProps {
  value: number;
  label?: string;
  size?: CounterSize;
  color?: string;
  labelColor?: string;
  glow?: boolean;
  glowColor?: string;
  pulseOnChange?: boolean;
  duration?: number;
  decimals?: number;
  type?: CounterType;
}

// Size configurations
const sizeConfigs: Record<CounterSize, { valueSize: number; labelSize: number; gap: number }> = {
  sm: {
    valueSize: typography.fontSize.lg,
    labelSize: typography.fontSize.xs,
    gap: 4,
  },
  md: {
    valueSize: typography.fontSize.xl,
    labelSize: typography.fontSize.sm,
    gap: 6,
  },
  lg: {
    valueSize: typography.fontSize['3xl'],
    labelSize: typography.fontSize.base,
    gap: 8,
  },
  xl: {
    valueSize: typography.fontSize['5xl'],
    labelSize: typography.fontSize.lg,
    gap: 12,
  },
};

// Label configurations for each type
const labelConfigs: Record<CounterType, string> = {
  months: 'Months',
  days: 'Days',
  hours: 'Hours',
  minutes: 'Minutes',
  custom: '',
};

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  label,
  size = 'md',
  color = colors.foreground,
  labelColor = colors.foregroundTertiary,
  glow = false,
  glowColor = colors.lovePrimary,
  pulseOnChange = true,
  duration = animation.normal,
  decimals = 0,
  type = 'custom',
}) => {
  const displayValue: string = decimals > 0 ? value.toFixed(decimals) : String(value);
  const scale = useSharedValue(1);
  const previousValue = useSharedValue(value);

  // Animate on value change
  useEffect(() => {
    if (value !== previousValue.value) {
      if (pulseOnChange) {
        scale.value = withSequence(
          withTiming(1.15, { duration: animation.fast, easing: Easing.out(Easing.ease) }),
          withSpring(1, animation.spring)
        );
      }
      previousValue.value = value;
    }
  }, [value, pulseOnChange]);

  // Glow effect
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    ...(glow && {
      shadowColor: glowColor,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3 * (scale.value - 1),
      shadowRadius: 15,
      elevation: 3,
    }),
  }));

  const config = sizeConfigs[size as CounterSize];
  const finalLabel: string = label || labelConfigs[type as CounterType];

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text
        style={[
          styles.value,
          {
            fontSize: config.valueSize,
            color,
            fontWeight: typography.fontWeight.bold,
          },
        ]}
      >
        {displayValue}
      </Text>
      {finalLabel && (
        <Text
          style={[
            styles.label,
            {
              fontSize: config.labelSize,
              color: labelColor,
            },
          ]}
        >
          {finalLabel}
        </Text>
      )}
    </Animated.View>
  );
};

// Counter Row for multiple counters (like in home screen)
interface CounterItem {
  value: number;
  label: string;
  color?: string;
  glowColor?: string;
}

interface CounterRowProps {
  counters: CounterItem[];
  size?: CounterSize;
  gap?: number;
}

export const CounterRow: React.FC<CounterRowProps> = ({
  counters,
  size = 'md',
  gap = 16,
}) => {
  return (
    <View style={[styles.row, { gap }]}>
      {counters.map((counter: CounterItem, index: number) => (
        <AnimatedCounter
          key={index}
          value={counter.value}
          label={counter.label}
          size={size}
          color={counter.color || colors.foreground}
          glowColor={counter.glowColor || colors.lovePrimary}
          glow={index === 0} // Only first counter has glow by default
        />
      ))}
    </View>
  );
};

// Animated number that counts up
interface CountUpProps {
  from: number;
  to: number;
  duration?: number;
  size?: CounterSize;
  color?: string;
  onComplete?: () => void;
}

export const CountUp: React.FC<CountUpProps> = ({
  from,
  to,
  duration = animation.slow,
  size = 'lg',
  color = colors.lovePrimary,
  onComplete,
}) => {
  const current = useSharedValue(from);
  const displayText = useSharedValue(String(from));

  useEffect(() => {
    const startTime = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easingProgress = Easing.inOut(Easing.ease)(progress);
      const currentValue = from + (to - from) * easingProgress;
      
      current.value = currentValue;
      displayText.value = String(Math.floor(currentValue));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        displayText.value = String(to);
        if (onComplete) {
          onComplete();
        }
      }
    };
    
    requestAnimationFrame(animate);
    
    return () => {
      // Cleanup
    };
  }, [from, to, duration, onComplete]);

  const config = sizeConfigs[size as CounterSize];

  return (
    <Animated.Text
      style={[
        styles.value,
        {
          fontSize: config.valueSize,
          color,
          fontWeight: typography.fontWeight.bold,
        },
      ]}
    >
      {displayText.value}
    </Animated.Text>
  );
};

// Counter with icon
interface IconCounterProps {
  value: number;
  label: string;
  icon: React.ReactNode;
  size?: CounterSize;
  color?: string;
  iconColor?: string;
}

export const IconCounter: React.FC<IconCounterProps> = ({
  value,
  label,
  icon,
  size = 'md',
  color = colors.foreground,
  iconColor = colors.lovePrimary,
}) => {
  const config = sizeConfigs[size as CounterSize];

  return (
    <View style={styles.iconCounter}>
      <View style={[styles.iconWrapper, { marginBottom: config.gap / 2 }]}>
        {icon}
      </View>
      <AnimatedCounter
        value={value}
        label={label}
        size={size}
        color={color}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  value: {
    fontFamily: typography.fontFamily.primary,
  },
  label: {
    fontFamily: typography.fontFamily.primary,
    fontWeight: typography.fontWeight.medium,
    marginTop: 4,
  },
  iconCounter: {
    alignItems: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AnimatedCounter;
