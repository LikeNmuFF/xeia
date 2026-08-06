/**
 * Haptic Feedback Utilities
 * 
 * Provides haptic feedback for various user interactions
 * to make the UI feel more tactile and responsive.
 */

import * as Haptics from 'react-native-haptic-feedback';

// Haptic feedback types available on most devices
export type HapticType = 
  | 'selection'
  | 'impactLight'
  | 'impactMedium'
  | 'impactHeavy'
  | 'notificationSuccess'
  | 'notificationWarning'
  | 'notificationError'
;

// Haptic feedback presets for different actions
interface HapticPreset {
  type: HapticType;
  options?: any;
}

const hapticPresets: Record<string, HapticPreset> = {
  // Light feedback for small interactions
  buttonPress: {
    type: 'impactLight',
  },
  
  // Medium feedback for important actions
  confirm: {
    type: 'impactMedium',
  },
  
  // Heavy feedback for significant actions
  success: {
    type: 'notificationSuccess',
  },
  
  // Warning feedback
  warning: {
    type: 'notificationWarning',
  },
  
  // Error feedback
  error: {
    type: 'notificationError',
  },
  
  // Selection feedback
  select: {
    type: 'selection',
  },
  
  // Love/Heart specific feedback
  love: {
    type: 'impactMedium',
  },
  
  // Camera capture feedback
  capture: {
    type: 'impactMedium',
  },
  
  // Slider feedback
  slider: {
    type: 'impactLight',
  },
  
  // Heartbeat (repeating for love meter)
  heartbeat: {
    type: 'impactLight',
  },
};

/**
 * Trigger haptic feedback
 * @param preset - The haptic preset to use
 * @param enabled - Whether haptics are enabled (defaults to true)
 */
export function haptic(preset: string, enabled: boolean = true) {
  if (!enabled) return;
  
  const haptic = hapticPresets[preset];
  if (!haptic) {
    console.warn(`Unknown haptic preset: ${preset}`);
    return;
  }
  
  try {
    // @ts-ignore - Haptics types may vary by platform
    if (Haptics[haptic.type]) {
      // @ts-ignore
      Haptics[haptic.type](haptic.options);
    }
  } catch (error) {
    // Haptics may not be available on all devices
    console.warn('Haptic feedback not available:', error);
  }
}

/**
 * Check if haptics are available on the device
 */
export async function isHapticsAvailable(): Promise<boolean> {
  try {
    // @ts-ignore
    return await Haptics.isAvailable();
  } catch (error) {
    return false;
  }
}

// Convenience functions for common haptic actions
export const hapticFeedback = {
  buttonPress: () => haptic('buttonPress'),
  confirm: () => haptic('confirm'),
  success: () => haptic('success'),
  warning: () => haptic('warning'),
  error: () => haptic('error'),
  select: () => haptic('select'),
  love: () => haptic('love'),
  capture: () => haptic('capture'),
  slider: () => haptic('slider'),
  heartbeat: () => haptic('heartbeat'),
  
  // Batch haptics
  loveSequence: () => {
    haptic('love');
    setTimeout(() => haptic('love'), 100);
    setTimeout(() => haptic('love'), 200);
  },
  
  // Success with love
  loveSuccess: () => {
    haptic('success');
    setTimeout(() => haptic('love'), 100);
  },
};

// Context for haptic settings
import { createContext, useContext, useState, useEffect } from 'react';

interface HapticContextType {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
}

const HapticContext = createContext<HapticContextType>({
  enabled: true,
  setEnabled: () => {},
});

export const HapticProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [enabled, setEnabled] = useState(true);
  
  // Check availability on mount
  useEffect(() => {
    isHapticsAvailable().then(available => {
      setEnabled(available);
    });
  }, []);
  
  return (
    <HapticContext.Provider value={{ enabled, setEnabled }}>
      {children}
    </HapticContext.Provider>
  );
};

export const useHaptics = () => useContext(HapticContext);

export default haptic;
