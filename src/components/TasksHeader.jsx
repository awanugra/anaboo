import { useTranslation } from 'react-i18next'

// Header used on Tasks screen
export default function TasksHeader({ onAdd }) {
  const { t } = useTranslation()
  return (
    <div className="px-5 pt-4 pb-2 flex items-center justify-between">
      <div>
        <p className="font-display text-h1 text-slate-700">{t('tasks.title')}</p>
        <p className="text-[13px] font-semibold text-slate-500 mt-0.5">{t('tasks.subtitle')}</p>
      </div>
      <button
        onClick={onAdd}
        className="w-11 h-11 rounded-2xl bg-brand-orange text-white flex items-center justify-center text-[22px] font-bold shadow-card active:scale-95 transition-all"
        aria-label="Add task"
      >
        +
      </button>
    </div>
  )
}
