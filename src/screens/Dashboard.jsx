import { useTranslation } from 'react-i18next'
import BottomNav from '../components/BottomNav'
import StreakCard from '../components/StreakCard'
import PetAvatar from '../components/PetAvatar'
import { TASK_TYPES } from '../data/taskConstants'
import { todayKey } from '../lib/dates'

export default function Dashboard({ navigate, pets = [], tasks = [], progress, switchPet, user }) {
  const { t } = useTranslation()
  const today = todayKey()
  const todayTasks = tasks.filter(tk => tk.date === today)
  const doneCount = todayTasks.filter(tk => tk.is_done).length
  const total = todayTasks.length
  const progressPct = total > 0 ? Math.round((doneCount / total) * 100) : 0
  const pendingTop = todayTasks.filter(tk => !tk.is_done).slice(0, 3)

  const petMap = Object.fromEntries(pets.map(p => [p.id, p]))

  return (
    <div className="flex flex-col min-h-[760px] bg-brand-cream overflow-hidden">
      <div className="flex-1 overflow-y-auto scrollbar-thin pb-4">
        {/* Greeting */}
        <div className="flex items-center justify-between px-5 pt-6 pb-5">
          <div>
            <p className="text-[14px] font-semibold text-slate-500">{t('home.greeting')}</p>
            <p className="font-display text-h1 text-slate-700 mt-0.5">{user?.name ? `Hello, ${user.name}` : t('home.welcome')}</p>
          </div>
          <button
            onClick={() => navigate('tasks')}
            className="w-11 h-11 rounded-2xl bg-white shadow-card flex items-center justify-center active:scale-95 transition-all"
            aria-label="notifications"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#FF8A65">
              <path d="M12 2a7 7 0 00-7 7v4.6L3.3 17a1 1 0 00.9 1.4h15.6a1 1 0 00.9-1.4L19 13.6V9a7 7 0 00-7-7zm-2.5 18a2.5 2.5 0 005 0h-5z"/>
            </svg>
          </button>
        </div>

        {/* Streak hero */}
        <StreakCard progress={progress} />

        {/* Pets row */}
        <div className="mt-6">
          <div className="px-5 flex items-center justify-between mb-3">
            <p className="font-display text-[18px] font-extrabold text-slate-700">{t('home.myPets')}</p>
            <button
              onClick={() => navigate('onboarding-new')}
              className="text-[13px] font-extrabold text-brand-orange active:opacity-70"
            >
              {t('home.addPet')}
            </button>
          </div>

          {pets.length === 0 ? (
            <button
              onClick={() => navigate('onboarding-new')}
              className="mx-5 w-[calc(100%-2.5rem)] rounded-2xl bg-white p-5 flex items-center gap-3 active:scale-[0.98] transition-all shadow-card border-2 border-dashed border-brand-orange/30"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-orange-lt flex items-center justify-center text-[24px]">🐾</div>
              <div className="flex-1 text-left">
                <p className="text-[14px] font-extrabold text-slate-700">{t('home.noPets')}</p>
                <p className="text-[12px] font-semibold text-slate-500">Tap to add</p>
              </div>
              <span className="text-[24px] text-brand-orange leading-none">+</span>
            </button>
          ) : (
            <div className="overflow-x-auto scrollbar-thin">
              <div className="flex gap-3 px-5 w-max">
                {pets.map(pet => (
                  <PetAvatar
                    key={pet.id}
                    pet={pet}
                    onClick={() => { switchPet(pet.id); navigate('pet-detail') }}
                  />
                ))}
                <button
                  onClick={() => navigate('onboarding-new')}
                  className="flex flex-col items-center justify-center gap-2"
                >
                  <div className="w-[70px] h-[70px] rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center text-[28px] text-slate-400">
                    +
                  </div>
                  <span className="text-[12px] font-semibold text-slate-500">Add</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Today's Tasks card */}
        <div className="mt-6 px-5">
          <p className="font-display text-[18px] font-extrabold text-slate-700 mb-3">{t('home.todayTasks')}</p>
          <div className="bg-white rounded-3xl p-5 shadow-card">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-blue-lt flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#03A9F4"><path d="M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5zm5 13.4l-3.7-3.7 1.4-1.4 2.3 2.3 5.3-5.3 1.4 1.4-6.7 6.7z"/></svg>
                </div>
                <div>
                  <p className="text-[15px] font-extrabold text-slate-700">{t('home.doneCount', { done: doneCount, total })}</p>
                  {total > 0 && (
                    <p className="text-[12px] font-semibold text-slate-500">{t('home.progressToday', { pct: progressPct })}</p>
                  )}
                </div>
              </div>
              <button onClick={() => navigate('tasks')} className="text-[13px] font-extrabold text-brand-orange active:opacity-70">
                {t('home.viewAll')}
              </button>
            </div>

            {total > 0 && (
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%`, background: progressPct === 100 ? '#4CAF50' : '#FF8A65' }}
                />
              </div>
            )}

            {pendingTop.length > 0 ? (
              pendingTop.map((task, idx) => {
                const type = TASK_TYPES[task.type] ?? TASK_TYPES.care
                const pet = petMap[task.pet_id]
                return (
                  <button
                    key={task.id}
                    onClick={() => navigate('tasks')}
                    className="w-full flex items-center gap-3 py-2.5 border-t border-slate-100 first:border-t-0 text-left active:bg-slate-50"
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-[16px]"
                      style={{ background: type.bg, color: type.color }}
                    >
                      {type.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-extrabold text-slate-700 truncate">{task.name}</p>
                      <p className="text-[11px] font-semibold text-slate-500 truncate">
                        🐾 {pet?.name}{task.time ? ` • ${task.time}` : ''}
                      </p>
                    </div>
                    {task.is_overdue && (
                      <span className="text-[10px] font-extrabold text-brand-red bg-brand-red-lt px-2 py-1 rounded-lg">
                        Overdue
                      </span>
                    )}
                    <span className="text-slate-300 text-[14px]">›</span>
                  </button>
                )
              })
            ) : total === 0 ? (
              <div className="flex flex-col items-center py-6">
                <span className="text-[32px] mb-2">🎉</span>
                <p className="text-[13px] font-semibold text-slate-500">{t('home.noTasksToday')}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center py-6">
                <span className="text-[32px] mb-2">✅</span>
                <p className="text-[13px] font-extrabold text-brand-green-dk">{t('home.allTasksDone')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div className="mt-6 px-5">
          <p className="font-display text-[18px] font-extrabold text-slate-700 mb-3">{t('home.quickActions')}</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: t('home.addAnimal'),       emoji: '🐾', bg: '#FFF3E0', color: '#FF8A65', route: 'onboarding-new' },
              { label: t('home.todayTasksAction'),emoji: '📋', bg: '#EDE7F6', color: '#7C4DFF', route: 'tasks' },
              { label: t('home.nearbyAction'),    emoji: '📍', bg: '#E0F7FA', color: '#26C6DA', route: 'nearby' },
              { label: t('home.tipsAction'),      emoji: '📚', bg: '#E8F5E9', color: '#4CAF50', route: 'articles' },
            ].map((a, i) => (
              <button
                key={i}
                onClick={() => navigate(a.route)}
                className="bg-white rounded-3xl p-5 flex flex-col items-center gap-2 active:scale-95 transition-all shadow-card"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-[24px]"
                  style={{ background: a.bg }}
                >
                  {a.emoji}
                </div>
                <span className="text-[13px] font-extrabold text-slate-700 text-center leading-tight">{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <BottomNav currentScreen="dashboard" navigate={navigate} />
    </div>
  )
}
