import { cn } from '../lib/utils'

export default function AchievementBadge({ achievement, size = 64 }) {
  const { emoji, title, desc, color, unlocked } = achievement
  return (
    <div className="flex flex-col items-center gap-1.5 px-1">
      <div
        className={cn(
          'rounded-2xl flex items-center justify-center transition-all',
          unlocked ? '' : 'grayscale opacity-40'
        )}
        style={{
          width: size,
          height: size,
          background: unlocked ? `${color}20` : '#F1F5F9',
          border: unlocked ? `2px solid ${color}` : '2px solid #E5E7EB',
        }}
      >
        <span style={{ fontSize: size * 0.45 }}>{emoji}</span>
      </div>
      <p className="text-[11px] font-extrabold text-slate-700 text-center leading-tight">{title}</p>
      <p className="text-[10px] font-semibold text-slate-500 text-center leading-tight">{desc}</p>
    </div>
  )
}
