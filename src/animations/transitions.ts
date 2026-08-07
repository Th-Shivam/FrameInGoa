import { Transition } from 'framer-motion'

export const transitions = {
  smooth: {
    type: 'tween',
    ease: [0.25, 0.1, 0.25, 1.0],
    duration: 0.35,
  } as Transition,

  fast: {
    type: 'tween',
    ease: 'easeOut',
    duration: 0.2,
  } as Transition,

  springGentle: {
    type: 'spring',
    stiffness: 120,
    damping: 14,
    mass: 0.8,
  } as Transition,

  springSnappy: {
    type: 'spring',
    stiffness: 300,
    damping: 25,
  } as Transition,

  springBouncy: {
    type: 'spring',
    stiffness: 400,
    damping: 15,
  } as Transition,

  springElastic: {
    type: 'spring',
    stiffness: 500,
    damping: 12,
  } as Transition,

  floating: {
    duration: 4,
    ease: 'easeInOut',
    repeat: Infinity,
    repeatType: 'mirror',
  } as Transition,
} as const
