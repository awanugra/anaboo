// Friendly empty state with emoji + message
export default function EmptyState({ emoji = '🐾', title, subtitle, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-8 py-12 text-center">
      <span className="text-[64px] mb-2">{emoji}</span>
      <p className="font-display text-[18px] font-extrabold text-slate-700">{title}</p>
      {subtitle && <p className="text-[14px] font-semibold text-slate-500 leading-snug">{subtitle}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  )
}
