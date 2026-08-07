/**
 * Hacker House Goa 2026 - Semantic Color Token Architecture
 * Production-grade cyber-neon palette with Goa coastal dark aesthetics.
 */

export const colors = {
  // Core Brand & Semantic Color Tokens
  primary: {
    DEFAULT: '#00F0FF', // Neon Cyber Cyan
    hover: '#33F3FF',
    glow: 'rgba(0, 240, 255, 0.4)',
    subtle: 'rgba(0, 240, 255, 0.12)',
    foreground: '#040814',
  },
  secondary: {
    DEFAULT: '#8A2BE2', // Electric Cyber Purple
    hover: '#A044FF',
    glow: 'rgba(138, 43, 226, 0.4)',
    subtle: 'rgba(138, 43, 226, 0.15)',
    foreground: '#FFFFFF',
  },
  accent: {
    pink: {
      DEFAULT: '#FF007F', // Cyber Neon Pink
      hover: '#FF3399',
      glow: 'rgba(255, 0, 127, 0.4)',
      subtle: 'rgba(255, 0, 127, 0.15)',
      foreground: '#FFFFFF',
    },
    yellow: {
      DEFAULT: '#FFE600', // Goa Sunset Neon Yellow
      hover: '#FFEC33',
      glow: 'rgba(255, 230, 0, 0.4)',
      subtle: 'rgba(255, 230, 0, 0.15)',
      foreground: '#040814',
    },
    teal: {
      DEFAULT: '#00E5A3', // Tropical Cyber Teal
      hover: '#33EBBA',
      glow: 'rgba(0, 229, 163, 0.4)',
      subtle: 'rgba(0, 229, 163, 0.15)',
      foreground: '#040814',
    },
  },
  surface: {
    DEFAULT: '#0D111D',
    elevated: '#141A29',
    glass: 'rgba(13, 17, 29, 0.75)',
    glassHover: 'rgba(20, 26, 41, 0.85)',
    border: 'rgba(255, 255, 255, 0.1)',
    card: '#0A0E18',
  },
  background: {
    DEFAULT: '#040711', // Deep Space Void
    alt: '#080C19',
    overlay: 'rgba(4, 7, 17, 0.85)',
  },
  border: {
    DEFAULT: 'rgba(255, 255, 255, 0.12)',
    subtle: 'rgba(255, 255, 255, 0.06)',
    active: '#00F0FF',
    glow: 'rgba(0, 240, 255, 0.3)',
  },
  success: {
    DEFAULT: '#10B981', // Neon Emerald
    subtle: 'rgba(16, 185, 129, 0.15)',
    border: 'rgba(16, 185, 129, 0.3)',
    foreground: '#FFFFFF',
  },
  warning: {
    DEFAULT: '#F59E0B', // Cyber Amber
    subtle: 'rgba(245, 158, 11, 0.15)',
    border: 'rgba(245, 158, 11, 0.3)',
    foreground: '#040814',
  },
  danger: {
    DEFAULT: '#EF4444', // Neon Crimson
    subtle: 'rgba(239, 68, 68, 0.15)',
    border: 'rgba(239, 68, 68, 0.3)',
    foreground: '#FFFFFF',
  },
  muted: {
    DEFAULT: '#64748B',
    foreground: '#94A3B8',
    subtle: 'rgba(100, 116, 139, 0.2)',
  },

  // Gradients presets
  gradients: {
    primary: 'linear-gradient(135deg, #00F0FF 0%, #8A2BE2 100%)',
    secondary: 'linear-gradient(135deg, #8A2BE2 0%, #FF007F 100%)',
    goaSunset: 'linear-gradient(135deg, #FF007F 0%, #FFE600 100%)',
    cyberCyan: 'linear-gradient(135deg, #00F0FF 0%, #00E5A3 100%)',
    glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
    borderGlow: 'linear-gradient(90deg, #00F0FF, #FF007F, #FFE600, #00F0FF)',
  },
} as const

export type ColorToken = typeof colors
