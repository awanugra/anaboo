import { useEffect, useRef } from 'react'
import { cn } from '../lib/utils'
import { shortDay, dayNum, isSameDay, formatDateKey } from '../lib/dates'

// Horizontal day strip — tap to pick a date
export default function DayPicker({ days, selectedIndex, onSelect }) {
  const ref = useRef(null)

  useEffect(() => {
    // auto-scroll selected into view
    const el = ref.current?.querySelector(`[data-index="${selectedIndex}"]`)
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [selectedIndex])

  const today = new Date()

  return (
    <div ref={ref} className="overflow-x-auto scrollbar-thin px-4 py-2">
      <div className="flex gap-2 w-max">
        {days.map((d, i) => {
          const active = i === selectedIndex
          const isToday = isSameDay(d, today)
          return (
            <button
              key={formatDateKey(d)}
              data-index={i}
              onClick={() => onSelect(i)}
              className={cn(
                'flex flex-col items-center justify-center w-12 h-16 rounded-2xl transition-all active:scale-95',
                active ? 'bg-brand-orange text-white shadow-card' : 'bg-white text-slate-700 border border-slate-100'
              )}
            >
              <span className={cn('text-[10px] font-bold uppercase', active ? 'text-white/90' : 'text-slate-500')}>
                {shortDay(d)}
              </span>
              <span className={cn('text-[16px] font-extrabold', active ? 'text-white' : 'text-slate-700')}>
                {dayNum(d)}
              </span>
              {isToday && (
                <span className={cn(
                  'w-1 h-1 rounded-full mt-0.5',
                  active ? 'bg-white' : 'bg-brand-orange'
                )} />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
