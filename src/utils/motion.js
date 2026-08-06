// src/utils/motion.js

// Easing curves
export const ease = {
  smooth: [0.22, 1, 0.36, 1],    // Gentle deceleration
  bounce: [0.34, 1.56, 0.64, 1], // Subtle spring
  quick: [0.4, 0, 0.2, 1],       // Fast, responsive
};

// Duration presets
export const duration = {
  instant: 0.15,
  fast: 0.25,
  normal: 0.4,
  slow: 0.6,
  entrance: 0.8,
};

// Stagger timing for lists/grids
export const stagger = {
  fast: 0.05,
  normal: 0.08,
  slow: 0.12,
};

// Standard entrance variants
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.normal } },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.entrance, ease: ease.smooth } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: duration.normal, ease: ease.smooth } },
};

// Container variants (for staggering children)
export const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: stagger.normal, delayChildren: 0.3 },
  },
};

// Item variants (for staggered children)
export const item = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: duration.entrance, ease: ease.smooth },
  },
};
