import { useEffect } from 'react'

// Top slide-down toast — shown after task completion
export default function XPToast({ visible, xp, message, emoji, onHide }) {
  useEffect(() => {
    if (!visible) return
    const t = setTimeout(onHide, 2500)
    return () => clearTimeout(t)
  }, [visible, onHide])

  if (!visible) return null

  return (
    <div className="absolute top-3 left-3 right-3 z-50 animate-slide-down">
      <div className="bg-brand-green-dk rounded-2xl py-3 px-4 flex items-center gap-3 shadow-card">
        <span className="text-[24px]">{emoji || '🎉'}</span>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-extrabold text-white truncate">{message}</p>
        </div>
        <div className="bg-brand-gold rounded-xl px-2 py-1" style={{ background: '#FFD700' }}>
          <span className="text-[12px] font-extrabold text-slate-800">+{xp} XP</span>
        </div>
      </div>
    </div>
  )
}
