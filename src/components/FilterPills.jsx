import { cn } from '../lib/utils'

// Emoji + label chip filter row
export default function FilterPills({ filters, active, onChange }) {
  return (
    <div className="overflow-x-auto scrollbar-thin px-5 pb-3">
      <div className="flex gap-2.5 w-max">
        {filters.map(f => {
          const isActive = active === f.key
          return (
            <button
              key={f.key}
              onClick={() => onChange(f.key)}
              className={cn(
                'flex items-center gap-1.5 rounded-full transition-all active:scale-95',
                isActive ? 'bg-brand-orange text-white' : 'bg-white text-slate-600 border border-slate-100'
              )}
              style={{
                paddingInline: 16,
                paddingBlock: 9,
                boxShadow: isActive
                  ? '0 2px 8px rgba(255,138,101,0.3)'
                  : '0 1px 4px rgba(0,0,0,0.06)',
              }}
            >
              <span className="text-[14px]">{f.emoji}</span>
              <span className="text-[13px] font-bold">{f.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
