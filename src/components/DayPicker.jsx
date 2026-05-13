import { useEffect, useRef } from 'react'
import { cn } from '../lib/utils'
import { shortDay, dayNum, isSameDay, formatDateKey } from '../lib/dates'

// Horizontal day strip — bigger pills with shadow on active, today indicator dot
export default function DayPicker({ days, selectedIndex, onSelect }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current?.querySelector(`[data-index="${selectedIndex}"]`)
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [selectedIndex])

  const today = new Date()

  return (
    <div ref={ref} className="overflow-x-auto scrollbar-thin px-5 pb-3">
      <div className="flex gap-2.5 w-max pt-1">
        {days.map((d, i) => {
          const active = i === selectedIndex
          const isToday = isSameDay(d, today)
          return (
            <button
              key={formatDateKey(d)}
              data-index={i}
              onClick={() => onSelect(i)}
              className={cn(
                'flex flex-col items-center justify-center px-3.5 py-2.5 rounded-2xl transition-all active:scale-95',
                active
                  ? 'bg-brand-orange text-white'
                  : isToday
                    ? 'bg-white border-[1.5px] border-brand-orange'
                    : 'bg-white border border-slate-100'
              )}
              style={{
                minWidth: 52,
                boxShadow: active
                  ? '0 4px 12px rgba(255,138,101,0.3)'
                  : '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <span
                className={cn(
                  'text-[11px] font-bold uppercase tracking-wide',
                  active ? 'text-white/90' : 'text-slate-400'
                )}
              >
                {shortDay(d)}
              </span>
              <span
                className={cn(
                  'text-[18px] font-extrabold mt-0.5',
                  active ? 'text-white' : 'text-slate-800'
                )}
              >
                {dayNum(d)}
              </span>
              {isToday && (
                <span
                  className={cn(
                    'w-[5px] h-[5px] rounded-full mt-1',
                    active ? 'bg-white' : 'bg-brand-orange'
                  )}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
