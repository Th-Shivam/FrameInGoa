import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export const inputVariants = cva(
  'w-full bg-[#0D111D]/80 text-white placeholder:text-slate-500 text-sm rounded-xl border transition-all duration-200 focus:outline-none backdrop-blur-md disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      state: {
        default:
          'border-white/15 focus:border-[#00F0FF] focus:ring-2 focus:ring-[#00F0FF]/30 hover:border-white/25',
        success:
          'border-[#10B981] focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/30 bg-[#10B981]/5',
        error:
          'border-[#EF4444] focus:border-[#EF4444] focus:ring-2 focus:ring-[#EF4444]/30 bg-[#EF4444]/5 text-red-100',
        disabled:
          'border-white/5 bg-slate-900/50 text-slate-500 cursor-not-allowed',
      },
      inputSize: {
        sm: 'h-9 px-3 text-xs',
        md: 'h-11 px-4 text-sm',
        lg: 'h-13 px-5 text-base',
      },
    },
    defaultVariants: {
      state: 'default',
      inputSize: 'md',
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string
  helperText?: string
  errorMessage?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      state = 'default',
      inputSize = 'md',
      label,
      helperText,
      errorMessage,
      leftIcon,
      rightIcon,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const activeState = disabled ? 'disabled' : errorMessage ? 'error' : state
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

    return (
      <div className="w-full flex flex-col space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-medium text-slate-300 uppercase tracking-wider font-sans"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center w-full">
          {leftIcon && (
            <span className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center justify-center">
              {leftIcon}
            </span>
          )}

          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            className={cn(
              inputVariants({ state: activeState, inputSize, className }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10'
            )}
            {...props}
          />

          {rightIcon && (
            <span className="absolute right-3.5 text-slate-400 flex items-center justify-center">
              {rightIcon}
            </span>
          )}
        </div>

        {errorMessage ? (
          <p className="text-xs text-red-400 font-medium">{errorMessage}</p>
        ) : helperText ? (
          <p className="text-xs text-slate-400">{helperText}</p>
        ) : null}
      </div>
    )
  }
)

Input.displayName = 'Input'
