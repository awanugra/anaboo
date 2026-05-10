import { useTranslation } from 'react-i18next'
import Icon from '../components/Icon'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import BellBadge from '../components/BellBadge'
import { cn } from '../lib/utils'
import { ageText } from '../lib/dates'
import { SPECIES_BY_ID } from '../data/species'
import { getActiveReminders, countActiveByPet } from '../lib/reminders'

export default function Dashboard({ navigate, pets = [], allRecords = [], switchPet }) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.startsWith('en') ? 'en' : 'id'
  const reminders     = getActiveReminders(pets, allRecords)
  const reminderCount = reminders.length
  const perPet        = countActiveByPet(pets, allRecords)

  return (
    <div className="flex flex-col min-h-[760px] bg-white overflow-hidden">
      <StatusBar
        title={t('nav.home')}
        rightSlot={
          <div className="flex items-center gap-1.5">
            <BellBadge count={reminderCount} onClick={() => navigate('reminders')} />
            <button
              onClick={() => navigate('settings')}
              className="w-10 h-10 rounded-full bg-brand-orange-lt flex items-center justify-center active:scale-90 transition-all"
              aria-label="Settings"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#475569"><path d="M12 8a4 4 0 100 8 4 4 0 000-8zm9.4 4a1 1 0 00-.7-.95l-2-.6a7 7 0 00-.5-1.2l1-1.85a1 1 0 00-.18-1.2l-1.4-1.4a1 1 0 00-1.2-.18l-1.85 1a7 7 0 00-1.2-.5l-.6-2A1 1 0 0012 2.6h-2a1 1 0 00-.95.7l-.6 2a7 7 0 00-1.2.5l-1.85-1a1 1 0 00-1.2.18L2.8 6.4a1 1 0 00-.18 1.2l1 1.85a7 7 0 00-.5 1.2l-2 .6A1 1 0 002.6 12v2a1 1 0 00.7.95l2 .6a7 7 0 00.5 1.2l-1 1.85a1 1 0 00.18 1.2l1.4 1.4a1 1 0 001.2.18l1.85-1a7 7 0 001.2.5l.6 2a1 1 0 00.95.7h2a1 1 0 00.95-.7l.6-2a7 7 0 001.2-.5l1.85 1a1 1 0 001.2-.18l1.4-1.4a1 1 0 00.18-1.2l-1-1.85a7 7 0 00.5-1.2l2-.6A1 1 0 0021.4 14v-2z"/></svg>
            </button>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto scrollbar-thin pb-4">
        {/* Greeting */}
        <div className="px-5 pt-5 pb-4">
          <p className="font-display text-[22px] font-extrabold text-slate-700">{t('home.greeting')}</p>
          <p className="text-[14px] font-semibold text-slate-500 mt-0.5">
            {pets.length === 0
              ? t('home.noPets')
              : reminderCount > 0
                ? t('home.hasReminders', { count: reminderCount })
                : t('home.allClear')}
          </p>
        </div>

        {/* Pet bookshelf — 2 cols */}
        <div className="px-5">
          <p className="text-[12px] font-extrabold text-slate-500 uppercase tracking-[0.5px] mb-3">
            Pilih anabul
          </p>

          {pets.length === 0 ? (
            <button
              onClick={() => navigate('onboarding-new')}
              className="w-full rounded-2xl border-2 border-dashed border-brand-orange/40 bg-white p-8 flex flex-col items-center gap-3 active:scale-[0.98] transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-orange-lt flex items-center justify-center">
                <span className="text-[32px]">🐾</span>
              </div>
              <p className="font-display text-[16px] font-extrabold text-slate-700">Belum ada anabul</p>
              <p className="text-[12px] font-semibold text-slate-500 text-center">Tap untuk daftarin anabul pertamamu</p>
            </button>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {pets.map(pet => {
                const sp = SPECIES_BY_ID[pet.species] || SPECIES_BY_ID.cat
                const age   = ageText(pet.birthDate)
                const count = perPet[pet.id] || 0

                return (
                  <button
                    key={pet.id}
                    onClick={() => { switchPet(pet.id); navigate('pet-book') }}
                    className="relative rounded-2xl bg-white p-4 flex flex-col gap-2.5 cursor-pointer active:scale-95 transition-all duration-200 border border-slate-100 shadow-card text-left"
                  >
                    {/* Notification badge */}
                    {count > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 min-w-[24px] h-6 px-1.5 rounded-full bg-brand-orange flex items-center justify-center text-[12px] font-extrabold text-white animate-badge-pop ring-2 ring-white">
                        {count > 9 ? '9+' : count}
                      </span>
                    )}

                    {/* Avatar */}
                    <div className={cn(
                      'w-full aspect-square rounded-xl flex items-center justify-center overflow-hidden',
                      count > 0 ? 'bg-brand-orange-lt' : 'bg-white'
                    )}>
                      {pet.photo ? (
                        <img src={pet.photo} alt={pet.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[48px]">{sp.emoji}</span>
                      )}
                    </div>

                    {/* Info */}
                    <div>
                      <p className="font-display text-[16px] font-extrabold text-slate-700 leading-tight truncate">
                        {pet.name}
                      </p>
                      <p className="text-[12px] font-semibold text-slate-500 truncate">
                        {lang === 'en' ? sp.labelEn : sp.label}{age ? ` · ${age}` : ''}
                      </p>
                    </div>

                    {/* Status pill */}
                    <div className={cn(
                      'text-[12px] font-bold px-2 py-1 rounded-lg text-center',
                      count > 0 ? 'bg-brand-orange-lt text-brand-orange-dk' : 'bg-brand-green-lt text-brand-green-dk'
                    )}>
                      {count > 0 ? `${count} pengingat` : 'Aman 🎉'}
                    </div>
                  </button>
                )
              })}

              {/* Add pet card */}
              <button
                onClick={() => navigate('onboarding-new')}
                className="rounded-2xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all border-2 border-dashed border-slate-200 bg-white min-h-[200px]"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-orange-lt flex items-center justify-center">
                  <span className="text-[24px] leading-none text-brand-orange">+</span>
                </div>
                <p className="text-[12px] font-bold text-slate-500 text-center leading-snug">Tambah<br />anabul baru</p>
              </button>
            </div>
          )}
        </div>

        {/* Top reminder shortcut */}
        {reminders.length > 0 && (
          <div className="mx-5 mt-5 rounded-2xl bg-brand-orange p-4 flex items-center gap-3 cursor-pointer active:scale-[0.98] transition-all"
               onClick={() => navigate('reminders')}>
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Icon name="bell" size={20} tone="white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-extrabold text-white">{reminders[0].petName} {reminders[0].isOverdue ? 'kelewat' : `${reminders[0].daysLeft} hari lagi`} 🐾</p>
              <p className="text-[12px] font-semibold text-white/90 truncate">{reminders[0].name}, jangan lupa ya</p>
            </div>
            <Icon name="back" size={16} className="rotate-180 shrink-0" tone="white" />
          </div>
        )}
      </div>

      <BottomNav currentScreen="dashboard" navigate={navigate} />
    </div>
  )
}
