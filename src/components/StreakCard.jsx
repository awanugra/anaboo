import { useTranslation } from 'react-i18next'
import { levelFromXP } from '../data/taskConstants'

// 🔥 Hero card on Home — orange gradient with streak + XP + level
export default function StreakCard({ progress = {} }) {
  const { t } = useTranslation()
  const streak = progress.daily_streak ?? 0
  const xp     = progress.xp ?? 0
  const level  = levelFromXP(xp)

  return (
    <div className="mx-5 rounded-3xl p-5 flex items-center justify-between shadow-hero"
         style={{ background: 'linear-gradient(135deg, #FF8A65 0%, #FF7043 100%)' }}>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-[28px] leading-none">
          🔥
        </div>
        <div>
          <p className="text-[13px] font-semibold text-white/90">{t('home.streak')}</p>
          <p className="text-[22px] font-extrabold text-white">{t('home.streakDays', { count: streak })}</p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="flex items-center gap-1">
          <span className="text-[14px]">⭐</span>
          <span className="text-[14px] font-extrabold text-brand-gold" style={{ color: '#FFD700' }}>{xp} XP</span>
        </div>
        <p className="text-[12px] font-semibold text-white/90 mt-1">{t('home.level', { level })}</p>
      </div>
    </div>
  )
}
