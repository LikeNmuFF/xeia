/**
 * Xeia Theme - Tulip Love Color Palette
 * 
 * Color Inspiration:
 * - Deep Navy (#0f172a) - Primary background, elegant and sophisticated
 * - Tulip Pink (#ec4899) - Petals, love, primary accent
 * - Tulip Green (#16a34a) - Stems, leaves, secondary accent
 * - Tulip Yellow (#eab308) - Pistil, warm highlights
 * - Cream (#fef9c3) - Soft text on dark
 */

import { Platform } from 'react-native';

export const colors = {
  // Primary Palette
  primary: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },
  
  // Love Pink - Main accent color
  love: {
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ec4899',
    600: '#db2777',
    700: '#be185d',
    800: '#9d174d',
    900: '#831843',
    950: '#500724',
  },
  
  // Gold - Secondary accent
  gold: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b75400',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },
  
  // Purple - Tertiary accent
  purple: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
    950: '#2e1065',
  },
  
  // Neutral / Dark Theme
  neutral: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#09090b',
    1000: '#000000',
  },
  
  // Semantic Colors
  background: '#0f172a',
  backgroundSecondary: '#1e293b',
  backgroundTertiary: '#020617',
  
  foreground: '#fef9c3',
  foregroundSecondary: '#d4d4d8',
  foregroundTertiary: '#a1a1aa',
  
  // Brand Colors (Tulip Theme)
  lovePrimary: '#ec4899',
  loveLight: '#f472b6',
  loveDark: '#be185d',
  
  tulipPink: '#ec4899',
  tulipPinkLight: '#f9a8d4',
  tulipPinkDark: '#db2777',
  
  tulipGreen: '#16a34a',
  tulipGreenLight: '#4ade80',
  tulipGreenDark: '#15803d',
  
  tulipYellow: '#eab308',
  tulipYellowLight: '#fde047',
  tulipYellowDark: '#ca8a04',
  
  cream: '#fef9c3',
  creamLight: '#fefce8',
  
  goldPrimary: '#eab308',
  goldLight: '#fde047',
  goldDark: '#ca8a04',
  
  purplePrimary: '#8b5cf6',
  purpleLight: '#a78bfa',
  purpleDark: '#6d28d9',
  purpleTulip: '#9d1686',
  
  // Status Colors
  success: '#16a34a',
  warning: '#eab308',
  error: '#ef4444',
  info: '#3b82f6',
  
  // Gradients
  gradient: {
    tulip: ['#ec4899', '#16a34a'],
    sunset: ['#eab308', '#ec4899'],
    night: ['#0f172a', '#1e293b'],
    garden: ['#16a34a', '#0f172a'],
    aurora: ['#ec4899', '#eab308', '#16a34a'],
  },
  
  // Glassmorphism
  glass: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'rgba(255, 255, 255, 0.2)',
    blur: 10,
  },
};

// Spacing scale
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 64,
  '5xl': 80,
  '6xl': 128,
};

// Typography
export const typography = {
  fontFamily: {
    primary: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    secondary: Platform.OS === 'ios' ? 'System' : 'sans-serif-condensed',
    monospace: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  fontSize: {
    '2xs': 10,
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
    '7xl': 72,
    '8xl': 96,
    '9xl': 128,
  },
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  letterSpacing: {
    tighter: -0.05,
    tight: -0.025,
    normal: 0,
    wide: 0.025,
    wider: 0.05,
    widest: 0.1,
  },
};

// Border Radius
export const borderRadius = {
  none: 0,
  sm: 4,
  base: 6,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
};

// Shadows
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  base: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2.22,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5.3,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 14.0,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.35,
    shadowRadius: 28.0,
    elevation: 16,
  },
  // Glow effects for tulip UI
  glow: {
    tulipPink: {
      shadowColor: '#ec4899',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.4,
      shadowRadius: 20,
      elevation: 0,
    },
    tulipGreen: {
      shadowColor: '#16a34a',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.4,
      shadowRadius: 20,
      elevation: 0,
    },
    tulipYellow: {
      shadowColor: '#eab308',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.4,
      shadowRadius: 20,
      elevation: 0,
    },
    love: {
      shadowColor: '#ec4899',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.4,
      shadowRadius: 20,
      elevation: 0,
    },
    gold: {
      shadowColor: '#eab308',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.4,
      shadowRadius: 20,
      elevation: 0,
    },
  },
};

// Animation durations
export const animation = {
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 700,
  slowest: 1000,
  // Spring configurations
  spring: {
    damping: 10,
    mass: 0.9,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 0.01,
    restDisplacementThreshold: 0.01,
  },
  springBouncy: {
    damping: 9,
    mass: 0.9,
    stiffness: 150,
    overshootClamping: false,
    restSpeedThreshold: 0.01,
    restDisplacementThreshold: 0.01,
  },
};

// Complete theme object
export const theme = {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  animation,
};

export type Theme = typeof theme;

export default theme;
