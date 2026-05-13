import { cn } from '../lib/utils'

// Circle badge style — 70×70 white circle with emoji, label + desc below
export default function AchievementBadge({ achievement, size = 70 }) {
  const { emoji, title, desc, color, unlocked } = achievement
  return (
    <div className="flex flex-col items-center gap-1.5 w-[100px] shrink-0">
      <div
        className={cn(
          'rounded-full bg-white flex items-center justify-center transition-all',
          unlocked ? '' : 'grayscale opacity-40'
        )}
        style={{
          width: size,
          height: size,
          boxShadow: unlocked
            ? `0 4px 12px ${color}40`
            : '0 2px 6px rgba(0,0,0,0.05)',
          border: unlocked ? `2px solid ${color}` : '2px solid #E5E7EB',
        }}
      >
        <span style={{ fontSize: size * 0.45 }}>{emoji}</span>
      </div>
      <p className="text-[12px] font-extrabold text-slate-800 text-center leading-tight">{title}</p>
      <p className="text-[10px] font-semibold text-slate-400 text-center leading-tight">{desc}</p>
    </div>
  )
}
