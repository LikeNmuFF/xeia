import React, { forwardRef, useState } from 'react';
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  View,
  Text,
  Pressable,
  Platform,
} from 'react-native';
import { colors, borderRadius, typography } from '../lib/theme';
import { Eye, EyeOff, CircleX } from 'lucide-react-native';

// Input variants
type InputVariant = 'default' | 'glass' | 'bordered' | 'underlined';

// Input sizes
type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends TextInputProps {
  variant?: InputVariant;
  size?: InputSize;
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isPassword?: boolean;
  clearable?: boolean;
  glow?: boolean;
}

// Size configurations
const sizeConfigs = {
  sm: {
    height: 40,
    paddingHorizontal: 12,
    textSize: typography.fontSize.sm,
    iconSize: 16,
    borderRadius: borderRadius.md,
  },
  md: {
    height: 48,
    paddingHorizontal: 16,
    textSize: typography.fontSize.base,
    iconSize: 20,
    borderRadius: borderRadius.lg,
  },
  lg: {
    height: 56,
    paddingHorizontal: 20,
    textSize: typography.fontSize.lg,
    iconSize: 24,
    borderRadius: borderRadius.xl,
  },
};

// Variant configurations
const variantConfigs = {
  default: {
    backgroundColor: colors.backgroundSecondary,
    borderColor: colors.neutral[700],
    borderWidth: 1,
    focusedBorderColor: colors.lovePrimary,
    errorBorderColor: colors.error,
  },
  glass: {
    backgroundColor: colors.glass.background,
    borderColor: colors.glass.border,
    borderWidth: 1,
    focusedBorderColor: colors.loveLight,
    errorBorderColor: colors.error,
  },
  bordered: {
    backgroundColor: 'transparent',
    borderColor: colors.neutral[600],
    borderWidth: 2,
    focusedBorderColor: colors.lovePrimary,
    errorBorderColor: colors.error,
  },
  underlined: {
    backgroundColor: 'transparent',
    borderColor: colors.neutral[600],
    borderWidth: 0,
    focusedBorderColor: colors.lovePrimary,
    errorBorderColor: colors.error,
  },
};

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      variant = 'default',
      size = 'md',
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      isPassword = false,
      clearable = false,
      glow = false,
      style,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [text, setText] = useState(props.value || '');
    
    const config = sizeConfigs[size];
    const variantConfig = variantConfigs[variant];
    
    const hasError = !!error;
    const borderColor = hasError 
      ? variantConfig.errorBorderColor 
      : isFocused 
        ? variantConfig.focusedBorderColor 
        : variantConfig.borderColor;

    const handleClear = () => {
      setText('');
      if (props.onChangeText) {
        props.onChangeText('');
      }
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <View style={styles.container}>
        {label && (
          <Text style={[styles.label, hasError && styles.labelError]}>
            {label}
          </Text>
        )}
        
        <View
          style={[
            styles.inputWrapper,
            variant === 'underlined' && styles.underlinedWrapper,
            glow && isFocused && !hasError && {
              shadowColor: colors.lovePrimary,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.3,
              shadowRadius: 10,
              elevation: 5,
            },
          ]}
        >
          {leftIcon && (
            <View style={styles.iconContainer}>
              {leftIcon}
            </View>
          )}
          
          <TextInput
            ref={ref}
            style={[
              styles.input,
              {
                height: config.height,
                paddingHorizontal: leftIcon ? config.paddingHorizontal / 2 : config.paddingHorizontal,
                paddingLeft: leftIcon ? config.paddingHorizontal + 12 : config.paddingHorizontal,
                paddingRight: (rightIcon || clearable || isPassword) ? config.paddingHorizontal + 12 : config.paddingHorizontal,
                fontSize: config.textSize,
                backgroundColor: variantConfig.backgroundColor,
                borderColor: borderColor,
                borderWidth: variantConfig.borderWidth,
                borderRadius: variant === 'underlined' ? 0 : config.borderRadius,
              },
              Platform.OS === 'web' && {
                outlineStyle: 'none',
              },
            ]}
            value={text}
            onChangeText={(value) => {
              setText(value);
              if (props.onChangeText) {
                props.onChangeText(value);
              }
            }}
            secureTextEntry={isPassword && !showPassword}
            placeholderTextColor={colors.foregroundTertiary}
            selectionColor={colors.lovePrimary}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          
          <View style={styles.rightIconsContainer}>
            {clearable && text.length > 0 && !isPassword && (
              <Pressable onPress={handleClear} style={styles.iconButton}>
                <CircleX size={config.iconSize} color={colors.foregroundTertiary} />
              </Pressable>
            )}
            
            {isPassword && (
              <Pressable onPress={togglePasswordVisibility} style={styles.iconButton}>
                {showPassword ? (
                  <EyeOff size={config.iconSize} color={colors.foregroundTertiary} />
                ) : (
                  <Eye size={config.iconSize} color={colors.foregroundTertiary} />
                )}
              </Pressable>
            )}
            
            {rightIcon && !clearable && !isPassword && (
              <View style={styles.iconContainer}>
                {rightIcon}
              </View>
            )}
          </View>
        </View>
        
        {hasError && (
          <Text style={styles.errorText}>{error}</Text>
        )}
        
        {hint && !hasError && (
          <Text style={styles.hintText}>{hint}</Text>
        )}
      </View>
    );
  }
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.foregroundSecondary,
    marginBottom: 6,
  },
  labelError: {
    color: colors.error,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  underlinedWrapper: {
    borderBottomWidth: 1,
  },
  input: {
    flex: 1,
    color: colors.foreground,
    fontFamily: typography.fontFamily.primary,
    includeFontPadding: false,
  },
  iconContainer: {
    marginRight: 12,
  },
  rightIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 4,
    marginLeft: 4,
  },
  errorText: {
    fontSize: typography.fontSize.xs,
    color: colors.error,
    marginTop: 4,
  },
  hintText: {
    fontSize: typography.fontSize.xs,
    color: colors.foregroundTertiary,
    marginTop: 4,
  },
});

export default Input;
