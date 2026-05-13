import { useState } from 'react'
import { cn } from '../lib/utils'

// Status-grouped section with accent color
export default function TaskSection({ title, accentColor = '#9E9E9E', count, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="mx-5 mb-5">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between mb-2 px-1"
      >
        <div className="flex items-center gap-2">
          <span className="text-[15px] font-extrabold text-slate-800">{title}</span>
          {typeof count === 'number' && (
            <span
              className="text-[11px] font-extrabold px-2 py-0.5 rounded-full"
              style={{ background: `${accentColor}1A`, color: accentColor }}
            >
              {count}
            </span>
          )}
        </div>
        <span
          className={cn('text-slate-400 text-[12px] transition-transform duration-200', !open && '-rotate-90')}
        >
          ▼
        </span>
      </button>
      {open && <div className="flex flex-col gap-2 animate-fadeUp">{children}</div>}
    </div>
  )
}
