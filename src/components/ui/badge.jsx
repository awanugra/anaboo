import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full text-[12px] font-extrabold px-2.5 py-0.5 whitespace-nowrap',
  {
    variants: {
      variant: {
        done:     'bg-emerald-50  text-emerald-600',
        upcoming: 'bg-amber-100   text-amber-700',
        overdue:  'bg-rose-50     text-rose-600',
        future:   'bg-slate-100   text-slate-500',
        default:  'bg-slate-100   text-slate-500',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
