import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { colors, animation } from '../lib/theme';
import { Heart } from 'lucide-react-native';

// Loading types
type LoadingType = 
  | 'spinner'      // Standard activity indicator
  | 'dots'         // Animated dots
  | 'pulse'        // Pulsing animation
  | 'heartbeat'    // Heart beating animation
  | 'bounce'       // Bouncing animation
  | 'shimmer'      // Shimmer effect for content
  | 'ring'         // Spinning ring
;

// Loading sizes
type LoadingSize = 'sm' | 'md' | 'lg' | 'xl';

interface LoadingProps {
  type?: LoadingType;
  size?: LoadingSize;
  color?: string;
  text?: string;
  textColor?: string;
  fullScreen?: boolean;
}

// Size configurations
const sizeConfigs = {
  sm: {
    spinnerSize: 'small',
    dotSize: 6,
    dotSpacing: 4,
    heartSize: 16,
    textSize: 12,
    containerSize: 24,
  },
  md: {
    spinnerSize: 'large',
    dotSize: 8,
    dotSpacing: 6,
    heartSize: 24,
    textSize: 14,
    containerSize: 32,
  },
  lg: {
    spinnerSize: 'large',
    dotSize: 12,
    dotSpacing: 8,
    heartSize: 32,
    textSize: 16,
    containerSize: 48,
  },
  xl: {
    spinnerSize: 'large',
    dotSize: 16,
    dotSpacing: 12,
    heartSize: 48,
    textSize: 20,
    containerSize: 64,
  },
};

// Spinner component (most common)
export const Spinner: React.FC<Omit<LoadingProps, 'type'>> = ({
  size = 'md',
  color = colors.lovePrimary,
  text,
  textColor = colors.foregroundSecondary,
  fullScreen = false,
}) => {
  const config = sizeConfigs[size];
  
  return (
    <View style={[styles.center, fullScreen && styles.fullScreen]}>
      <ActivityIndicator 
        size={config.spinnerSize as any} 
        color={color}
        style={styles.activityIndicator}
      />
      {text && (
        <Text style={[styles.text, { color: textColor, fontSize: config.textSize }]}>
          {text}
        </Text>
      )}
    </View>
  );
};

// Animated Dots
export const Dots: React.FC<Omit<LoadingProps, 'type'>> = ({
  size = 'md',
  color = colors.lovePrimary,
  text,
  textColor = colors.foregroundSecondary,
  fullScreen = false,
}) => {
  const config = sizeConfigs[size];
  
  // Animation values for dots
  const dot1Scale = useSharedValue(0.6);
  const dot2Scale = useSharedValue(0.6);
  const dot3Scale = useSharedValue(0.6);
  
  useEffect(() => {
    dot1Scale.value = withRepeat(
      withSequence(
        withTiming(1, { duration: animation.slow, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.6, { duration: animation.slow, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    
    dot2Scale.value = withRepeat(
      withSequence(
        withTiming(1, { duration: animation.slow, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.6, { duration: animation.slow, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    
    dot3Scale.value = withRepeat(
      withSequence(
        withTiming(1, { duration: animation.slow, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.6, { duration: animation.slow, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);
  
  const dot1Style = useAnimatedStyle(() => ({
    transform: [{ scale: dot1Scale.value }],
  }));
  
  const dot2Style = useAnimatedStyle(() => ({
    transform: [{ scale: dot2Scale.value }],
  }));
  
  const dot3Style = useAnimatedStyle(() => ({
    transform: [{ scale: dot3Scale.value }],
  }));

  return (
    <View style={[styles.center, fullScreen && styles.fullScreen]}>
      <View style={[styles.dotsContainer, { gap: config.dotSpacing }]}>
        <Animated.View style={[styles.dot, { width: config.dotSize, height: config.dotSize, backgroundColor: color }, dot1Style]} />
        <Animated.View style={[styles.dot, { width: config.dotSize, height: config.dotSize, backgroundColor: color }, dot2Style]} />
        <Animated.View style={[styles.dot, { width: config.dotSize, height: config.dotSize, backgroundColor: color }, dot3Style]} />
      </View>
      {text && (
        <Text style={[styles.text, { color: textColor, fontSize: config.textSize, marginTop: 12 }]}>
          {text}
        </Text>
      )}
    </View>
  );
};

// Heartbeat Loading (perfect for love theme)
export const Heartbeat: React.FC<Omit<LoadingProps, 'type'>> = ({
  size = 'md',
  color = colors.lovePrimary,
  text,
  textColor = colors.foregroundSecondary,
  fullScreen = false,
}) => {
  const config = sizeConfigs[size];
  const scale = useSharedValue(1);
  
  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withSpring(1.3, animation.springBouncy),
        withSpring(1, animation.springBouncy)
      ),
      -1,
      true
    );
  }, []);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={[styles.center, fullScreen && styles.fullScreen]}>
      <Animated.View style={[animatedStyle]}>
        <Heart size={config.heartSize} color={color} fill={color} />
      </Animated.View>
      {text && (
        <Text style={[styles.text, { color: textColor, fontSize: config.textSize, marginTop: 12 }]}>
          {text}
        </Text>
      )}
    </View>
  );
};

// Bounce Loading
export const Bounce: React.FC<Omit<LoadingProps, 'type'>> = ({
  size = 'md',
  color = colors.lovePrimary,
  text,
  textColor = colors.foregroundSecondary,
  fullScreen = false,
}) => {
  const config = sizeConfigs[size];
  const translateY = useSharedValue(0);
  
  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-20, { duration: animation.slow, easing: Easing.out(Easing.quad) }),
        withTiming(0, { duration: animation.slow, easing: Easing.in(Easing.quad) })
      ),
      -1,
      true
    );
  }, []);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View style={[styles.center, fullScreen && styles.fullScreen]}>
      <Animated.View style={[styles.bounceDot, { width: config.containerSize, height: config.containerSize, backgroundColor: color }, animatedStyle]} />
      {text && (
        <Text style={[styles.text, { color: textColor, fontSize: config.textSize, marginTop: 12 }]}>
          {text}
        </Text>
      )}
    </View>
  );
};

// Shimmer Effect (for content loading)
export const Shimmer: React.FC<{
  width: number | string;
  height: number;
  borderRadius?: number;
  color?: string;
}> = ({
  width,
  height,
  borderRadius = 8,
  color = colors.neutral[700],
}) => {
  const opacity = useSharedValue(0.3);
  
  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: animation.slowest }),
        withTiming(0.3, { duration: animation.slowest })
      ),
      -1,
      true
    );
  }, []);
  
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View 
      style={[
        {
          width,
          height,
          backgroundColor: color,
          borderRadius,
        },
        animatedStyle,
      ]}
    />
  );
};

// Ring Loading
export const Ring: React.FC<Omit<LoadingProps, 'type'>> = ({
  size = 'md',
  color = colors.lovePrimary,
  text,
  textColor = colors.foregroundSecondary,
  fullScreen = false,
}) => {
  const config = sizeConfigs[size];
  const rotate = useSharedValue(0);
  
  useEffect(() => {
    rotate.value = withRepeat(
      withTiming(360, { duration: animation.slower, easing: Easing.linear }),
      -1,
      false
    );
  }, []);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));

  return (
    <View style={[styles.center, fullScreen && styles.fullScreen]}>
      <Animated.View style={[styles.ring, { width: config.containerSize, height: config.containerSize, borderColor: color }, animatedStyle]} />
      {text && (
        <Text style={[styles.text, { color: textColor, fontSize: config.textSize, marginTop: 12 }]}>
          {text}
        </Text>
      )}
    </View>
  );
};

// Main Loading component that chooses the type
export const Loading: React.FC<LoadingProps> = ({
  type = 'spinner',
  ...props
}) => {
  const components: Record<LoadingType, React.FC<Omit<LoadingProps, 'type'>>> = {
    spinner: Spinner,
    dots: Dots,
    pulse: Spinner, // Pulse uses spinner with opacity animation
    heartbeat: Heartbeat,
    bounce: Bounce,
    shimmer: () => <Shimmer width={100} height={20} />,
    ring: Ring,
  };
  
  const Component = components[type] || Spinner;
  return <Component {...props as any} />;
};

// Full screen loading overlay
export const FullScreenLoading: React.FC<Omit<LoadingProps, 'fullScreen'>> = ({
  type = 'heartbeat',
  text = 'Loading...',
  ...props
}) => (
  <View style={styles.overlay}>
    <Loading type={type} text={text} {...props} fullScreen />
  </View>
);

// Content loader with shimmer effect
export const ContentLoader: React.FC<{
  lines?: number;
  width?: number | string;
  height?: number;
  color?: string;
}> = ({
  lines = 3,
  width = '100%',
  height = 20,
  color = colors.neutral[700],
}) => (
  <View style={[styles.contentLoader, { width }]}>
    {Array.from({ length: lines }).map((_, index) => (
      <Shimmer 
        key={index} 
        width={index === lines - 1 ? '70%' : width}
        height={height}
        borderRadius={4}
        color={color}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreen: {
    flex: 1,
  },
  activityIndicator: {
    marginBottom: 8,
  },
  text: {
    fontWeight: '500',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    borderRadius: 9999,
  },
  bounceDot: {
    borderRadius: 9999,
  },
  ring: {
    borderWidth: 3,
    borderLeftColor: 'transparent',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderRadius: 9999,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 1000,
  },
  contentLoader: {
    gap: 8,
  },
});

export default Loading;
