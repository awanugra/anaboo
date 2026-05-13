import { useTranslation } from 'react-i18next'
import BottomNav from '../components/BottomNav'
import useLocalStorage from '../hooks/useLocalStorage'
import { levelFromXP, xpToNextLevel } from '../data/taskConstants'
import { cn } from '../lib/utils'
import AchievementBadge from '../components/AchievementBadge'
import { evaluateAchievements } from '../lib/achievements'

const VERSION = '2.0.0'

function Section({ title, children }) {
  return (
    <div className="px-5 mt-5">
      <p className="text-[12px] font-extrabold text-slate-500 uppercase tracking-[0.5px] mb-2">{title}</p>
      <div className="bg-white rounded-3xl overflow-hidden shadow-card">{children}</div>
    </div>
  )
}

function Row({ icon, label, sub, right, onClick, danger }) {
  const Comp = onClick ? 'button' : 'div'
  return (
    <Comp
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 px-4 py-3.5 text-left border-t border-slate-100 first:border-t-0',
        onClick && 'active:bg-slate-50 transition-colors'
      )}
    >
      {icon && (
        <div className="w-9 h-9 rounded-xl bg-brand-orange-lt flex items-center justify-center shrink-0 text-[16px]">{icon}</div>
      )}
      <div className="flex-1 min-w-0">
        <p className={cn('text-[14px] font-extrabold truncate', danger ? 'text-brand-red' : 'text-slate-700')}>{label}</p>
        {sub && <p className="text-[12px] font-semibold text-slate-500 truncate">{sub}</p>}
      </div>
      {right}
    </Comp>
  )
}

function Toggle({ value, onChange }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onChange(!value) }}
      className={cn(
        'w-11 h-6 rounded-full transition-colors relative shrink-0',
        value ? 'bg-brand-orange' : 'bg-slate-200'
      )}
    >
      <span className={cn(
        'absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-card transition-transform',
        value ? 'translate-x-[22px]' : 'translate-x-0.5'
      )} />
    </button>
  )
}

export default function Profile({ navigate, user, progress, pets = [], tasks = [], logout }) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.startsWith('en') ? 'en' : 'id'
  const xp = progress?.xp ?? 0
  const level = levelFromXP(xp)
  const toNext = xpToNextLevel(xp)
  const tasksDone = tasks.filter(tk => tk.is_done).length
  const achievements = evaluateAchievements({ pets, tasks, progress })
  const unlockedCount = achievements.filter(a => a.unlocked).length

  const [notif3, setNotif3]       = useLocalStorage('anaboo_notif_3', true)
  const [notif1, setNotif1]       = useLocalStorage('anaboo_notif_1', true)
  const [notifVit, setNotifVit]   = useLocalStorage('anaboo_notif_vit', false)
  const [notifSnd, setNotifSnd]   = useLocalStorage('anaboo_notif_snd', true)

  return (
    <div className="flex flex-col min-h-[760px] bg-brand-cream overflow-hidden">
      <div className="flex-1 overflow-y-auto scrollbar-thin pb-4">
        {/* Profile header — rounded bottom, stats float over it */}
        <div
          className="bg-white pt-6 px-5 shadow-card relative"
          style={{ borderBottomLeftRadius: 40, borderBottomRightRadius: 40, paddingBottom: 50 }}
        >
          <p className="font-display text-h1 text-slate-800">{t('profile.title')}</p>

          <div className="flex items-center gap-4 mt-4">
            <div className="w-20 h-20 rounded-full bg-brand-orange-lt flex items-center justify-center text-[40px]">👤</div>
            <div className="flex-1 min-w-0">
              <p className="font-display text-[20px] font-extrabold text-slate-800 truncate">{user?.name || 'Pet Parent'}</p>
              <p className="text-[13px] font-semibold text-slate-500 truncate">{user?.email || '—'}</p>
              <div className="mt-2 inline-flex items-center gap-1 bg-brand-orange rounded-full px-3 py-1">
                <span className="text-[11px]">⭐</span>
                <span className="text-[11px] font-extrabold text-white">{t('profile.goldMember')}</span>
              </div>
            </div>
          </div>

          {/* Level progress */}
          <div className="mt-5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[13px] font-extrabold text-slate-700">{t('home.level', { level })}</span>
              <span className="text-[12px] font-semibold text-slate-500">{toNext} XP to next</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-orange to-brand-orange-dk transition-all duration-500"
                style={{ width: `${100 - (toNext / 100) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Floating stats — overlap header */}
        <div className="px-5 -mt-8 relative z-10 flex gap-3">
          {[
            { label: 'XP Points',    val: xp,                              emoji: '⭐', bg: '#FFFDE7', color: '#FFB300' },
            { label: 'Daily Streak', val: progress?.daily_streak ?? 0,     emoji: '🔥', bg: '#FFF3E0', color: '#FF8A65' },
            { label: 'Pets',         val: pets.length,                     emoji: '🐾', bg: '#E1F5FE', color: '#03A9F4' },
          ].map(s => (
            <div
              key={s.label}
              className="flex-1 bg-white rounded-2xl p-3.5 flex flex-col items-center"
              style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-[18px] mb-1.5"
                style={{ background: s.bg }}
              >
                {s.emoji}
              </div>
              <p className="text-[16px] font-extrabold text-slate-800">{s.val}</p>
              <p className="text-[10px] font-bold text-slate-400 text-center mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="px-5 mt-7">
          <div className="flex items-center justify-between mb-3">
            <p className="font-display text-[18px] font-extrabold text-slate-800">{t('profile.achievements')}</p>
            <span className="text-[12px] font-extrabold text-brand-orange">{unlockedCount}/{achievements.length}</span>
          </div>
          <div className="overflow-x-auto scrollbar-thin -mx-5 px-5 py-1">
            <div className="flex gap-4 w-max">
              {achievements.map(a => <AchievementBadge key={a.id} achievement={a} />)}
            </div>
          </div>
        </div>

        {/* Language */}
        <Section title={t('profile.language')}>
          <Row
            icon="🇮🇩"
            label={t('profile.languageId')}
            onClick={() => i18n.changeLanguage('id')}
            right={lang === 'id' ? <span className="text-[18px]">✓</span> : null}
          />
          <Row
            icon="🇬🇧"
            label={t('profile.languageEn')}
            onClick={() => i18n.changeLanguage('en')}
            right={lang === 'en' ? <span className="text-[18px]">✓</span> : null}
          />
        </Section>

        {/* Notifications */}
        <Section title={t('profile.notifications')}>
          <Row icon="🔔" label={t('profile.notif3Days')}  right={<Toggle value={notif3} onChange={setNotif3} />} />
          <Row icon="🔔" label={t('profile.notif1Day')}   right={<Toggle value={notif1} onChange={setNotif1} />} />
          <Row icon="💖" label={t('profile.notifVitamin')} right={<Toggle value={notifVit} onChange={setNotifVit} />} />
          <Row icon="🔊" label={t('profile.notifSound')}  right={<Toggle value={notifSnd} onChange={setNotifSnd} />} />
        </Section>

        {/* Data */}
        <Section title={t('profile.data')}>
          <Row icon="📤" label={t('profile.exportData')} onClick={() => {
            const dump = {
              user, progress,
              pets: JSON.parse(localStorage.getItem('anaboo_pets') || '[]'),
              tasks: JSON.parse(localStorage.getItem('anaboo_tasks') || '[]'),
              exported: new Date().toISOString(),
            }
            const blob = new Blob([JSON.stringify(dump, null, 2)], { type: 'application/json' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url; a.download = 'anaboo-export.json'; a.click()
            URL.revokeObjectURL(url)
          }} />
          <Row icon="📥" label={t('profile.importData')} />
          <Row icon="⚠️" label={t('profile.clearData')} danger onClick={() => {
            if (confirm(t('profile.clearData') + '?')) {
              ['anaboo_pets', 'anaboo_tasks', 'anaboo_progress', 'anaboo_current_pet'].forEach(k => localStorage.removeItem(k))
              location.reload()
            }
          }} />
        </Section>

        {/* About */}
        <Section title={t('profile.about')}>
          <Row icon="ℹ️" label={t('profile.version', { version: VERSION })} />
          <Row icon="⭐" label={t('profile.rate')} />
          <Row icon="✉️" label={t('profile.contact')} />
          <Row icon="🔒" label={t('profile.privacyPolicy')} />
          <Row icon="📄" label={t('profile.terms')} />
        </Section>

        {/* Logout */}
        <div className="px-5 mt-5 mb-2">
          <button
            onClick={() => { if (confirm(t('profile.logoutConfirm'))) logout?.() }}
            className="w-full py-3.5 rounded-2xl bg-brand-red-lt text-brand-red font-extrabold text-[14px] active:scale-[0.98] transition-all"
          >
            {t('profile.logout')}
          </button>
        </div>

        <p className="text-center text-[11px] text-slate-400 mt-4">Anaboo v{VERSION} · Made with 🐾</p>
      </div>

      <BottomNav currentScreen="profile" navigate={navigate} />
    </div>
  )
}
