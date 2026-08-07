import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

export const cardVariants = cva(
  'rounded-2xl transition-all duration-300 relative overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'bg-[#0D111D] border border-white/10 text-slate-100 shadow-xl',
        glass:
          'bg-[#0D111D]/65 backdrop-blur-xl border border-white/10 text-slate-100 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]',
        gradient:
          'bg-gradient-to-br from-[#141A29]/90 via-[#0D111D]/80 to-[#040711]/90 border border-white/15 text-slate-100 shadow-2xl',
        interactive:
          'bg-[#0D111D]/75 backdrop-blur-xl border border-white/10 text-slate-100 shadow-xl hover:border-[#00F0FF]/40 hover:shadow-[0_0_30px_rgba(0,240,255,0.25)] hover:-translate-y-1 cursor-pointer',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
)

export interface CardProps
  extends Omit<HTMLMotionProps<'div'>, 'children'>,
    VariantProps<typeof cardVariants> {
  children?: React.ReactNode
  glowColor?: 'cyan' | 'pink' | 'purple' | 'yellow' | 'none'
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, variant, padding, glowColor = 'none', children, ...props },
    ref
  ) => {
    const glowClasses = {
      none: '',
      cyan: 'before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:shadow-[0_0_30px_rgba(0,240,255,0.25)]',
      pink: 'before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:shadow-[0_0_30px_rgba(255,0,127,0.25)]',
      purple: 'before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:shadow-[0_0_30px_rgba(138,43,226,0.25)]',
      yellow: 'before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:shadow-[0_0_30px_rgba(255,230,0,0.25)]',
    }

    return (
      <motion.div
        ref={ref}
        className={cn(cardVariants({ variant, padding, className }), glowClasses[glowColor])}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
Card.displayName = 'Card'

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 pb-4', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'font-display text-xl font-semibold leading-none tracking-tight text-white',
      className
    )}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-slate-400 leading-relaxed', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-4 border-t border-white/5', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'
