// Re-export all utilities

export {
  default as haptic,
  hapticFeedback,
  HapticProvider,
  useHaptics,
  isHapticsAvailable,
} from './haptics';
export type { HapticType } from './haptics';

// Future utilities:
// export { default as debounce } from './debounce';
// export { default as throttle } from './throttle';
// export { default as formatDate } from './formatDate';
// export { default as formatNumber } from './formatNumber';
// export { default as validate } from './validate';
// export { default as storage } from './storage';
