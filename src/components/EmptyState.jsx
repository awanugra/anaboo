import Mascot from './Mascot'

// Friendly empty state with mascot (default) or emoji
export default function EmptyState({ emoji, variant = 'default', title, subtitle, action, size = 110, useMascot = false }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-8 py-12 text-center">
      {useMascot ? (
        <Mascot variant={variant} size={size} className="mb-1" />
      ) : (
        <span style={{ fontSize: size * 0.55 }} className="mb-1 leading-none">{emoji || '🐾'}</span>
      )}
      <p className="font-display text-[18px] font-extrabold text-slate-700">{title}</p>
      {subtitle && <p className="text-[14px] font-semibold text-slate-500 leading-snug max-w-[280px]">{subtitle}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  )
}
