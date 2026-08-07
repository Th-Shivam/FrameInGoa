import {
  fadeUp,
  fadeLeft,
  fadeRight,
  scale,
  staggerContainer,
  staggerItem,
  floating,
  hoverLift,
  cardHover,
  buttonTap,
  pageTransition,
} from './variants'

export const presets = {
  fadeUp: {
    variants: fadeUp,
    initial: 'hidden',
    animate: 'visible',
  },
  fadeLeft: {
    variants: fadeLeft,
    initial: 'hidden',
    animate: 'visible',
  },
  fadeRight: {
    variants: fadeRight,
    initial: 'hidden',
    animate: 'visible',
  },
  scale: {
    variants: scale,
    initial: 'hidden',
    animate: 'visible',
  },
  staggerContainer: {
    variants: staggerContainer,
    initial: 'hidden',
    animate: 'visible',
  },
  staggerItem: {
    variants: staggerItem,
  },
  floating: {
    variants: floating,
    animate: 'animate',
  },
  hoverLift: {
    variants: hoverLift,
    initial: 'rest',
    whileHover: 'hover',
  },
  cardHover: {
    variants: cardHover,
    initial: 'rest',
    whileHover: 'hover',
  },
  buttonTap: {
    variants: buttonTap,
    initial: 'rest',
    whileHover: 'hover',
    whileTap: 'tap',
  },
  pageTransition: {
    variants: pageTransition,
    initial: 'initial',
    animate: 'animate',
    exit: 'exit',
  },
} as const

export type PresetKey = keyof typeof presets
