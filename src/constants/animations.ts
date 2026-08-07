/**
 * Hacker House Goa 2026 - Animation Timing & Easing Constants
 */

export const durations = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.35,
  slow: 0.5,
  deliberate: 0.8,
  pulse: 2.0,
  float: 4.0,
} as const

export const easings = {
  // Cubic Beziers
  smooth: [0.25, 0.1, 0.25, 1.0],
  easeOut: [0.0, 0.0, 0.2, 1.0],
  easeInOut: [0.4, 0.0, 0.2, 1.0],
  sharp: [0.4, 0.0, 0.6, 1.0],
  cyber: [0.19, 1.0, 0.22, 1.0],

  // Spring Presets for Framer Motion
  springGentle: { type: 'spring', stiffness: 120, damping: 14 },
  springSnappy: { type: 'spring', stiffness: 300, damping: 25 },
  springBouncy: { type: 'spring', stiffness: 400, damping: 15 },
  springElastic: { type: 'spring', stiffness: 500, damping: 12 },
} as const

export type DurationKey = keyof typeof durations
export type EasingKey = keyof typeof easings
