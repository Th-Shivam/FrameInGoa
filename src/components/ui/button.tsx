import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, HTMLMotionProps } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl font-medium tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#040711] disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer',
  {
    variants: {
      variant: {
        primary:
          'bg-[#00F0FF] text-[#040814] hover:bg-[#33F3FF] shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] font-semibold border border-[#00F0FF]/30',
        secondary:
          'bg-[#8A2BE2] text-white hover:bg-[#A044FF] shadow-[0_0_20px_rgba(138,43,226,0.4)] hover:shadow-[0_0_30px_rgba(138,43,226,0.6)] border border-[#8A2BE2]/30',
        pink:
          'bg-[#FF0F87] text-white hover:bg-[#FF2A95] border-0',
        yellow:
          'bg-[#FFE600] text-[#040814] hover:bg-[#FFEC33] shadow-[0_0_20px_rgba(255,230,0,0.4)] hover:shadow-[0_0_30px_rgba(255,230,0,0.6)] font-semibold border border-[#FFE600]/30',
        outline:
          'border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-[#00F0FF]/50 hover:text-[#00F0FF] backdrop-blur-md',
        ghost:
          'bg-transparent text-slate-300 hover:text-white hover:bg-white/10',
      },
      size: {
        sm: 'h-9 px-4 text-xs rounded-lg gap-1.5',
        md: 'h-11 px-6 text-sm rounded-xl gap-2',
        lg: 'h-13 px-8 text-base rounded-2xl gap-2.5',
        icon: 'h-10 w-10 p-0 rounded-xl',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'children'>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  children?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-current mr-2" />
        ) : (
          leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
