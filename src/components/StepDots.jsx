import { cn } from '../lib/utils'

export default function StepDots({ total, current }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={cn(
            'rounded-full transition-all duration-300',
            i === current ? 'w-6 h-2 bg-brand-blue' : 'w-2 h-2 bg-slate-300'
          )}
        />
      ))}
    </div>
  )
}
