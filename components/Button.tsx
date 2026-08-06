import React, { forwardRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ActivityIndicator,
  View,
  Pressable,
} from 'react-native';
import { colors, borderRadius, animation, shadows } from '../lib/theme';

// Button variants
type ButtonVariant = 
  | 'primary'    // Love pink - main action
  | 'secondary'  // Gold - secondary action
  | 'tertiary'   // Purple - tertiary action
  | 'ghost'      // Minimal with text color
  | 'outline'    // Outlined with transparent background
  | 'danger'     // Red for destructive actions
  | 'link'       // Text-only link style
;

// Button sizes
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  glow?: boolean;
  disabled?: boolean;
}

// Color configurations for each variant
const variantConfigs = {
  primary: {
    backgroundColor: colors.lovePrimary,
    textColor: colors.foreground,
    borderColor: colors.lovePrimary,
    glowColor: colors.lovePrimary,
    pressedBackgroundColor: colors.loveDark,
    loadingColor: colors.foreground,
  },
  secondary: {
    backgroundColor: colors.goldPrimary,
    textColor: colors.neutral[900],
    borderColor: colors.goldPrimary,
    glowColor: colors.goldPrimary,
    pressedBackgroundColor: colors.goldDark,
    loadingColor: colors.neutral[900],
  },
  tertiary: {
    backgroundColor: colors.purplePrimary,
    textColor: colors.foreground,
    borderColor: colors.purplePrimary,
    glowColor: colors.purplePrimary,
    pressedBackgroundColor: colors.purpleDark,
    loadingColor: colors.foreground,
  },
  ghost: {
    backgroundColor: 'transparent',
    textColor: colors.foregroundSecondary,
    borderColor: 'transparent',
    glowColor: colors.foregroundSecondary,
    pressedBackgroundColor: colors.backgroundSecondary,
    loadingColor: colors.foregroundSecondary,
  },
  outline: {
    backgroundColor: 'transparent',
    textColor: colors.lovePrimary,
    borderColor: colors.lovePrimary,
    glowColor: colors.lovePrimary,
    pressedBackgroundColor: colors.backgroundSecondary,
    loadingColor: colors.lovePrimary,
  },
  danger: {
    backgroundColor: colors.error,
    textColor: colors.foreground,
    borderColor: colors.error,
    glowColor: colors.error,
    pressedBackgroundColor: '#dc2626',
    loadingColor: colors.foreground,
  },
  link: {
    backgroundColor: 'transparent',
    textColor: colors.loveLight,
    borderColor: 'transparent',
    glowColor: colors.loveLight,
    pressedBackgroundColor: 'transparent',
    loadingColor: colors.loveLight,
  },
};

// Size configurations
const sizeConfigs = {
  sm: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    textSize: 14,
    iconSize: 16,
    height: 36,
    borderWidth: 1,
  },
  md: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    textSize: 16,
    iconSize: 18,
    height: 44,
    borderWidth: 1,
  },
  lg: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    textSize: 18,
    iconSize: 20,
    height: 52,
    borderWidth: 2,
  },
  xl: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    textSize: 20,
    iconSize: 24,
    height: 60,
    borderWidth: 2,
  },
};

export const Button = forwardRef<TouchableOpacity, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      glow = false,
      disabled = false,
      style,
      ...props
    },
    ref
  ) => {
    const config = variantConfigs[variant];
    const sizeConfig = sizeConfigs[size];
    
    const isDisabled = disabled || isLoading;
    
    return (
      <Pressable
        ref={ref}
        style={({ pressed }) => [
          styles.base,
          {
            backgroundColor: isDisabled 
              ? `${config.backgroundColor}40` 
              : config.backgroundColor,
            borderColor: config.borderColor,
            borderWidth: sizeConfig.borderWidth,
            height: sizeConfig.height,
            paddingVertical: sizeConfig.paddingVertical,
            paddingHorizontal: sizeConfig.paddingHorizontal,
            opacity: isDisabled ? 0.6 : 1,
            ...(glow && !isDisabled && {
              shadowColor: config.glowColor,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.4,
              shadowRadius: 15,
              elevation: 5,
            }),
          },
          fullWidth && styles.fullWidth,
          style,
          pressed && !isDisabled && {
            backgroundColor: config.pressedBackgroundColor,
            transform: [{ scale: 0.98 }],
          },
        ]}
        disabled={isDisabled}
        {...props}
      >
        {isLoading ? (
          <ActivityIndicator 
            size={size === 'sm' ? 'small' : 'large'} 
            color={config.loadingColor}
          />
        ) : (
          <View style={styles.content}>
            {leftIcon && (
              <View style={styles.icon}>
                {leftIcon}
              </View>
            )}
            <Text
              style={[
                styles.text,
                {
                  color: config.textColor,
                  fontSize: sizeConfig.textSize,
                },
              ]}
            >
              {children}
            </Text>
            {rightIcon && (
              <View style={styles.icon}>
                {rightIcon}
              </View>
            )}
          </View>
        )}
      </Pressable>
    );
  }
);

Button.displayName = 'Button';

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    transition: 'all',
    // @ts-ignore - web specific
    transitionDuration: `${animation.fast}ms`,
  },
  fullWidth: {
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  icon: {
    marginHorizontal: 4,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Button;
