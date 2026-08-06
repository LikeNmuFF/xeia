// Re-export all animation components

export {
  default as AnimatedHeart,
  FillableHeart,
  HeartRating,
  FloatingHearts,
} from './AnimatedHeart';
export type { AnimatedHeartProps } from './AnimatedHeart';

export {
  default as AnimatedCounter,
  CounterRow,
  CountUp,
  IconCounter,
} from './AnimatedCounter';
export type { AnimatedCounterProps } from './AnimatedCounter';

// Future animation components:
// export { default as AnimatedText } from './AnimatedText';
// export { default as FadeIn } from './FadeIn';
// export { default as SlideIn } from './SlideIn';
// export { default as ScaleIn } from './ScaleIn';
// export { default as BounceIn } from './BounceIn';
// export { default as Shake } from './Shake';
// export { default as Pulse } from './Pulse';
// export { default as Spin } from './Spin';
