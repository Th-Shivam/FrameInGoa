/**
 * Hacker House Goa 2026 - Design System Master Theme Tokens
 */

import { colors } from './colors'
import { breakpoints, containerWidths } from './breakpoints'
import { durations, easings } from './animations'

export const radii = {
  none: '0px',
  sm: '6px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  full: '9999px',
} as const

export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  dock: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  toast: 1600,
  tooltip: 1700,
} as const

export const shadows = {
  sm: '0 2px 8px rgba(0, 0, 0, 0.4)',
  md: '0 4px 16px rgba(0, 0, 0, 0.5)',
  lg: '0 8px 32px rgba(0, 0, 0, 0.6)',
  xl: '0 16px 48px rgba(0, 0, 0, 0.7)',
  neonCyan: '0 0 20px rgba(0, 240, 255, 0.35), 0 0 40px rgba(0, 240, 255, 0.15)',
  neonPink: '0 0 20px rgba(255, 0, 127, 0.35), 0 0 40px rgba(255, 0, 127, 0.15)',
  neonPurple: '0 0 20px rgba(138, 43, 226, 0.35), 0 0 40px rgba(138, 43, 226, 0.15)',
  neonYellow: '0 0 20px rgba(255, 230, 0, 0.35), 0 0 40px rgba(255, 230, 0, 0.15)',
  glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
} as const

export const blurs = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '16px',
  xl: '24px',
  '2xl': '40px',
} as const

export const typography = {
  fonts: {
    sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: '"Space Grotesk", Inter, system-ui, sans-serif',
    mono: '"Fira Code", JetBrains Mono, ui-monospace, monospace',
  },
  sizes: {
    hero: { fontSize: '4.5rem', lineHeight: '1.05', letterSpacing: '-0.03em' },
    display: { fontSize: '3.75rem', lineHeight: '1.1', letterSpacing: '-0.025em' },
    h1: { fontSize: '3rem', lineHeight: '1.15', letterSpacing: '-0.02em' },
    h2: { fontSize: '2.25rem', lineHeight: '1.2', letterSpacing: '-0.015em' },
    h3: { fontSize: '1.75rem', lineHeight: '1.3', letterSpacing: '-0.01em' },
    body: { fontSize: '1rem', lineHeight: '1.6', letterSpacing: '0em' },
    small: { fontSize: '0.875rem', lineHeight: '1.5', letterSpacing: '0.01em' },
    caption: { fontSize: '0.75rem', lineHeight: '1.4', letterSpacing: '0.02em' },
    mono: { fontSize: '0.875rem', lineHeight: '1.5', letterSpacing: '0.05em' },
  },
} as const

export const theme = {
  colors,
  radii,
  zIndex,
  shadows,
  blurs,
  typography,
  breakpoints,
  containerWidths,
  durations,
  easings,
} as const

export type Theme = typeof theme
