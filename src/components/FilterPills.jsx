import { cn } from '../lib/utils'

// Emoji + label chip filter row
export default function FilterPills({ filters, active, onChange }) {
  return (
    <div className="overflow-x-auto scrollbar-thin px-5 py-2">
      <div className="flex gap-2 w-max">
        {filters.map(f => {
          const isActive = active === f.key
          return (
            <button
              key={f.key}
              onClick={() => onChange(f.key)}
              className={cn(
                'flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] font-bold transition-all active:scale-95',
                isActive ? 'bg-brand-orange text-white shadow-card' : 'bg-white text-slate-700 border border-slate-100'
              )}
            >
              <span>{f.emoji}</span>
              {f.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
