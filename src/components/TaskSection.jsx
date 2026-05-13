import { useState } from 'react'
import { cn } from '../lib/utils'

// Collapsible task group by pet
export default function TaskSection({ title, subtitle, children, count, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="mx-5 mb-4">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-1 py-2"
      >
        <div className="text-left">
          <p className="text-[14px] font-extrabold text-slate-700">{title}</p>
          {subtitle && <p className="text-[12px] font-semibold text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          {typeof count === 'number' && (
            <span className="bg-slate-100 text-slate-700 text-[11px] font-extrabold px-2 py-0.5 rounded-full">{count}</span>
          )}
          <span className={cn('text-slate-400 text-[12px] transition-transform duration-200', !open && '-rotate-90')}>▼</span>
        </div>
      </button>
      {open && <div className="flex flex-col gap-2 mt-1 animate-fadeUp">{children}</div>}
    </div>
  )
}
