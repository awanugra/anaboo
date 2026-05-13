import { useTranslation } from 'react-i18next'

// Today's progress card — big number, streak+XP pills on right, motivational message
export default function ProgressSummaryCard({ done = 0, total = 0, streak = 0, xp = 0 }) {
  const { t } = useTranslation()
  const pct = total > 0 ? Math.round((done / total) * 100) : 0
  const complete = pct === 100

  return (
    <div className="mx-5 mb-5">
      <div className="bg-white rounded-3xl p-5" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <div className="flex items-center justify-between mb-4">
          {/* Left: counter */}
          <div>
            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wide">
              {t('tasks.todayProgress')}
            </p>
            <p className="font-display mt-1">
              <span className="text-[28px] font-extrabold text-slate-800">{done}</span>
              <span className="text-[18px] font-extrabold text-slate-400">/{total}</span>
            </p>
            <p className="text-[12px] font-semibold text-slate-400">tasks completed</p>
          </div>

          {/* Right: streak + xp pills */}
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-1.5 bg-brand-orange-lt rounded-xl px-3 py-1.5">
              <span className="text-[14px]">🔥</span>
              <span className="text-[13px] font-extrabold text-brand-orange">{streak} day{streak === 1 ? '' : 's'}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-brand-yellow-lt rounded-xl px-3 py-1.5">
              <span className="text-[14px]">⭐</span>
              <span className="text-[13px] font-extrabold" style={{ color: '#FFB300' }}>{xp} XP</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${pct}%`,
              background: complete ? '#4CAF50' : '#FF8A65',
            }}
          />
        </div>
        <p
          className="text-[12px] font-semibold mt-2"
          style={{ color: complete ? '#4CAF50' : '#9E9E9E' }}
        >
          {complete ? '🎉 All done! You crushed it!' : `${pct}% completed`}
        </p>
      </div>
    </div>
  )
}
