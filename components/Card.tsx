import React from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  PressableProps,
  Dimensions,
} from 'react-native';
import { colors, borderRadius, shadows } from '../lib/theme';

// Card variants
type CardVariant = 
  | 'default'    // Standard background
  | 'glass'      // Glassmorphism effect
  | 'gradient'   // Gradient background
  | 'bordered'   // With border
  | 'elevated'   // With shadow
  | 'plain'      // Minimal styling
;

// Card sizes
type CardSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface CardProps extends PressableProps {
  variant?: CardVariant;
  size?: CardSize;
  gradientColors?: [string, string];
  glow?: boolean;
  glowColor?: string;
  borderColor?: string;
  children: React.ReactNode;
}

const { width: screenWidth } = Dimensions.get('window');

// Size configurations
const sizeConfigs = {
  sm: {
    padding: 12,
    minHeight: 80,
    maxWidth: screenWidth * 0.8,
    borderRadius: borderRadius.md,
  },
  md: {
    padding: 16,
    minHeight: 100,
    maxWidth: screenWidth * 0.9,
    borderRadius: borderRadius.lg,
  },
  lg: {
    padding: 24,
    minHeight: 120,
    maxWidth: screenWidth * 0.95,
    borderRadius: borderRadius.xl,
  },
  xl: {
    padding: 32,
    minHeight: 140,
    maxWidth: screenWidth * 0.98,
    borderRadius: borderRadius['2xl'],
  },
  full: {
    padding: 0,
    minHeight: '100%',
    maxWidth: '100%',
    borderRadius: borderRadius.xl,
  },
};

// Gradient presets
const gradientPresets = {
  love: ['#e9456044', '#8b5cf644'],
  sunset: ['#ffd70044', '#e9456044'],
  night: ['#1a1a2e', '#16213e'],
  aurora: ['#8b5cf644', '#e9456044', '#ffd70044'],
};

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  size = 'md',
  gradientColors,
  glow = false,
  glowColor = colors.lovePrimary,
  borderColor = colors.neutral[700],
  style,
  ...props
}) => {
  const config = sizeConfigs[size];
  
  // Determine background based on variant
  const getBackgroundStyle = () => {
    switch (variant) {
      case 'glass':
        return {
          backgroundColor: colors.glass.background,
          borderWidth: 1,
          borderColor: colors.glass.border,
          // @ts-ignore - blur is iOS only
          backdropFilter: 'blur(10px)',
        };
      case 'gradient':
        const colorsToUse = gradientColors || gradientPresets.love;
        return {
          // For React Native, we'll use LinearGradient component
          // This is a placeholder for the gradient
          backgroundColor: colorsToUse[0],
        };
      case 'bordered':
        return {
          backgroundColor: colors.backgroundSecondary,
          borderWidth: 1,
          borderColor: borderColor,
        };
      case 'elevated':
        return {
          backgroundColor: colors.backgroundSecondary,
          ...shadows.md,
        };
      case 'plain':
        return {
          backgroundColor: 'transparent',
        };
      default:
        return {
          backgroundColor: colors.backgroundSecondary,
        };
    }
  };

  const baseStyle = {
    padding: config.padding,
    minHeight: config.minHeight,
    maxWidth: config.maxWidth,
    borderRadius: config.borderRadius,
    alignSelf: 'center',
    width: size === 'full' ? '100%' : 'auto',
  };

  const backgroundStyle = getBackgroundStyle();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        baseStyle,
        backgroundStyle,
        glow && {
          shadowColor: glowColor,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.3,
          shadowRadius: 20,
          elevation: 10,
        },
        pressed && variant !== 'plain' && {
          transform: [{ scale: 0.98 }],
          opacity: 0.9,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Pressable>
  );
};

// Special Card with gradient using expo-linear-gradient
import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';

interface GradientCardProps extends Omit<CardProps, 'variant' | 'gradientColors'> {
  gradientColors?: [string, string];
  gradientStart?: [number, number];
  gradientEnd?: [number, number];
  gradientLocations?: number[];
}

export const GradientCard: React.FC<GradientCardProps> = ({
  children,
  gradientColors = ['#e9456044', '#8b5cf644'],
  gradientStart = [0, 0],
  gradientEnd = [1, 1],
  gradientLocations,
  size = 'md',
  glow = false,
  glowColor = colors.lovePrimary,
  style,
  ...props
}) => {
  const config = sizeConfigs[size];
  
  return (
    <LinearGradient
      colors={gradientColors}
      start={gradientStart}
      end={gradientEnd}
      locations={gradientLocations}
      style={[
        styles.base,
        {
          padding: config.padding,
          minHeight: config.minHeight,
          maxWidth: config.maxWidth,
          borderRadius: config.borderRadius,
          alignSelf: 'center',
          width: size === 'full' ? '100%' : 'auto',
        },
        glow && {
          shadowColor: glowColor,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.3,
          shadowRadius: 20,
          elevation: 10,
        },
        style,
      ]}
    >
      <Pressable
        style={({ pressed }) => [
          { width: '100%', height: '100%' },
          pressed && {
            opacity: 0.9,
          },
        ]}
        {...props}
      >
        {children}
      </Pressable>
    </LinearGradient>
  );
};

// Glass Card with enhanced glassmorphism
export const GlassCard: React.FC<Omit<CardProps, 'variant'>> = ({
  children,
  glow = true,
  glowColor = colors.neutral[50],
  borderColor = colors.glass.border,
  size = 'md',
  style,
  ...props
}) => {
  const config = sizeConfigs[size];
  
  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        {
          padding: config.padding,
          minHeight: config.minHeight,
          maxWidth: config.maxWidth,
          borderRadius: config.borderRadius,
          alignSelf: 'center',
          width: size === 'full' ? '100%' : 'auto',
          backgroundColor: colors.glass.background,
          borderWidth: 1,
          borderColor: borderColor,
          // @ts-ignore - blur is iOS only
          backdropFilter: 'blur(10px)',
        },
        glow && {
          shadowColor: glowColor,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.2,
          shadowRadius: 15,
          elevation: 5,
        },
        pressed && {
          transform: [{ scale: 0.98 }],
          opacity: 0.9,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
});

export default Card;
