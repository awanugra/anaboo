import { useTranslation } from 'react-i18next'

// Daily progress card — used in Tasks screen header
export default function ProgressSummaryCard({ done = 0, total = 0, xpToday = 0 }) {
  const { t } = useTranslation()
  const pct = total > 0 ? Math.round((done / total) * 100) : 0
  return (
    <div className="mx-5 bg-white rounded-3xl p-5 shadow-card">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[12px] font-bold text-slate-500 uppercase tracking-wide">{t('tasks.todayProgress')}</p>
          <p className="text-[20px] font-extrabold text-slate-700 mt-1">{t('tasks.summary', { done, total })}</p>
        </div>
        <div className="text-right">
          <p className="text-[12px] font-bold text-slate-500">XP</p>
          <p className="text-[20px] font-extrabold text-brand-orange">+{xpToday}</p>
        </div>
      </div>
      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${pct}%`,
            background: pct === 100 ? '#4CAF50' : '#FF8A65',
          }}
        />
      </div>
      <p className="text-[11px] font-semibold text-slate-500 mt-2 text-right">{pct}%</p>
    </div>
  )
}
