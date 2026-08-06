/**
 * Animated Heart Component
 * 
 * Features:
 * - Heartbeat animation (pulsing)
 * - Fill animation (for love meter)
 * - Bounce animation (when tapped)
 * - Glow effect
 * - Customizable colors and sizes
 */

import React, { useEffect, useState } from 'react';
import { StyleSheet, Pressable, PressableProps } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { Heart } from 'lucide-react-native';
import { colors, animation } from '../../lib/theme';
import { motify } from 'moti';

// Heart states
type HeartState = 'idle' | 'beating' | 'bouncing' | 'filling' | 'filled';

interface AnimatedHeartProps extends PressableProps {
  size?: number;
  color?: string;
  fillColor?: string;
  isFilled?: boolean;
  fillPercentage?: number; // 0-100
  isBeating?: boolean;
  beatScale?: number;
  beatSpeed?: 'slow' | 'normal' | 'fast';
  glow?: boolean;
  glowColor?: string;
  bounceOnPress?: boolean;
  onPress?: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedHeartIcon = motify(Heart)();

export const AnimatedHeart: React.FC<AnimatedHeartProps> = ({
  size = 24,
  color = colors.lovePrimary,
  fillColor = colors.lovePrimary,
  isFilled = false,
  fillPercentage = 0,
  isBeating = false,
  beatScale = 1.2,
  beatSpeed = 'normal',
  glow = false,
  glowColor = colors.lovePrimary,
  bounceOnPress = true,
  onPress,
  style,
  ...props
}) => {
  const [state, setState] = useState<HeartState>('idle');
  const scale = useSharedValue(1);
  const fillValue = useSharedValue(isFilled ? 1 : 0);
  const rotation = useSharedValue(0);
  
  // Beat animation
  const beatDuration = {
    slow: animation.slower,
    normal: animation.slow,
    fast: animation.fast,
  }[beatSpeed];

  useEffect(() => {
    if (isBeating) {
      setState('beating');
      scale.value = withRepeat(
        withSequence(
          withSpring(beatScale, animation.springBouncy),
          withSpring(1, animation.springBouncy)
        ),
        -1,
        true
      );
    } else {
      scale.value = 1;
    }
    
    return () => {
      // Cleanup
    };
  }, [isBeating, beatScale, beatSpeed]);

  // Fill animation
  useEffect(() => {
    const target = isFilled ? 1 : 0;
    fillValue.value = withTiming(target, {
      duration: animation.normal,
      easing: Easing.inOut(Easing.ease),
    });
  }, [isFilled, fillPercentage]);

  // Handle press
  const handlePress = () => {
    if (bounceOnPress) {
      scale.value = withSequence(
        withTiming(0.9, { duration: animation.fast }),
        withSpring(1, animation.springBouncy)
      );
    }
    
    if (onPress) {
      runOnJS(onPress)();
    }
  };

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
    ...(glow && {
      shadowColor: glowColor,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5 * scale.value,
      shadowRadius: 20,
      elevation: 5,
    }),
  }));

  return (
    <AnimatedPressable
      onPress={handlePress}
      style={[
        styles.container,
        { width: size, height: size },
        animatedStyle,
        style,
      ]}
      {...props}
    >
      <AnimatedHeartIcon
        size={size}
        color={color}
        fill={isFilled ? fillColor : 'none'}
      />
    </AnimatedPressable>
  );
};

// Heart that fills based on percentage
export const FillableHeart: React.FC<Omit<AnimatedHeartProps, 'isFilled'> & {
  percentage: number;
}> = ({ percentage, ...props }) => {
  const [isFilled, setIsFilled] = useState(false);
  
  useEffect(() => {
    setIsFilled(percentage >= 100);
  }, [percentage]);

  return (
    <AnimatedHeart
      {...props}
      isFilled={isFilled}
      fillPercentage={percentage}
    />
  );
};

// Multiple hearts for rating
export const HeartRating: React.FC<{
  rating: number; // 0-5
  maxRating?: number;
  size?: number;
  activeColor?: string;
  inactiveColor?: string;
  editable?: boolean;
  onRatingChange?: (rating: number) => void;
}> = ({
  rating = 0,
  maxRating = 5,
  size = 28,
  activeColor = colors.lovePrimary,
  inactiveColor = colors.neutral[600],
  editable = false,
  onRatingChange,
}) => {
  const handleHeartPress = (index: number) => {
    if (editable && onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  return (
    <View style={styles.ratingContainer}>
      {Array.from({ length: maxRating }).map((_, index) => (
        <AnimatedHeart
          key={index}
          size={size}
          color={index < rating ? activeColor : inactiveColor}
          fillColor={index < rating ? activeColor : 'none'}
          isFilled={index < rating}
          bounceOnPress={editable}
          onPress={() => handleHeartPress(index)}
        />
      ))}
    </View>
  );
};

// Floating hearts animation (for confetti effect)
export const FloatingHearts: React.FC<{
  count?: number;
  size?: number;
  colors?: string[];
  duration?: number;
}> = ({
  count = 10,
  size = 16,
  colors = [colors.lovePrimary, colors.loveLight, colors.goldPrimary, colors.purplePrimary],
  duration = 3000,
}) => {
  const hearts = Array.from({ length: count });

  return (
    <View style={styles.floatingContainer} pointerEvents="none">
      {hearts.map((_, index) => {
        const delay = index * (duration / count);
        return (
          <FloatingHeart
            key={index}
            size={size}
            color={colors[index % colors.length]}
            delay={delay}
            duration={duration}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        );
      })}
    </View>
  );
};

// Single floating heart
const FloatingHeart: React.FC<{
  size: number;
  color: string;
  delay: number;
  duration: number;
  style?: any;
}> = ({ size, color, delay, duration, style }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(0);

  useEffect(() => {
    // Initial animation
    scale.value = withDelay(
      delay,
      withTiming(1, { duration: animation.fast })
    );
    
    // Float up animation
    translateY.value = withDelay(
      delay,
      withTiming(-200, { duration })
    );
    
    // Fade out
    opacity.value = withDelay(
      delay + duration - animation.slow,
      withTiming(0, { duration: animation.slow })
    );
    
    // Sway side to side
    translateX.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(10, { duration: 1000, easing: Easing.inOut(Easing.sin) }),
          withTiming(-10, { duration: 1000, easing: Easing.inOut(Easing.sin) })
        ),
        -1,
        true
      )
    );
  }, [delay, duration]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.floatingHeart, { width: size, height: size }, animatedStyle, style]}>
      <Heart size={size} color={color} fill={color} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  floatingContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  floatingHeart: {
    position: 'absolute',
  },
});

export default AnimatedHeart;
