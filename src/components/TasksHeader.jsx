import { useTranslation } from 'react-i18next'

// Header used on Tasks screen — title + today's date + add button
export default function TasksHeader({ onAdd }) {
  const { t, i18n } = useTranslation()
  const locale = i18n.language?.startsWith('en') ? 'en-US' : 'id-ID'
  const dateLabel = new Date().toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <div className="px-5 pt-4 pb-3 flex items-center justify-between">
      <div>
        <p className="font-display text-[24px] font-extrabold text-slate-800 tracking-tight">
          {t('tasks.title')} 📋
        </p>
        <p className="text-[13px] font-semibold text-slate-400 mt-0.5 capitalize">{dateLabel}</p>
      </div>
      <button
        onClick={onAdd}
        className="w-11 h-11 rounded-2xl bg-brand-orange text-white flex items-center justify-center text-[22px] font-bold active:scale-95 transition-all"
        style={{ boxShadow: '0 4px 14px rgba(255,138,101,0.4)' }}
        aria-label="Add task"
      >
        +
      </button>
    </div>
  )
}
