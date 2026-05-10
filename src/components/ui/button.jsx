import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full font-body text-[16px] font-extrabold tracking-wide transition-all active:translate-y-px disabled:opacity-50 disabled:pointer-events-none w-full py-4 shadow-card',
  {
    variants: {
      variant: {
        primary: 'bg-brand-blue text-white active:bg-brand-blue-dk',
        orange:  'bg-brand-orange text-white active:bg-brand-orange-dk',
        ghost:   'bg-slate-100 text-slate-700 hover:bg-slate-200 shadow-none',
        outline: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-none',
      },
    },
    defaultVariants: { variant: 'primary' },
  }
)

const Button = React.forwardRef(({ className, variant, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant }), className)} ref={ref} {...props} />
})
Button.displayName = 'Button'

export { Button, buttonVariants }
