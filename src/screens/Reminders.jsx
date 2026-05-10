import Icon from '../components/Icon'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import { cn } from '../lib/utils'
import { computeReminders } from '../lib/reminders'
import { formatDate } from '../lib/dates'
import { TREATMENT_TYPES } from '../data/treatments'

export default function Reminders({ navigate, pets = [], allRecords = [] }) {
  const all = computeReminders(pets, allRecords)
    .filter(r => r.daysLeft <= 30) // show within 30 days
    .sort((a, b) => a.daysLeft - b.daysLeft)

  const urgent  = all.filter(r => r.isUrgent || r.isOverdue)
  const upcoming = all.filter(r => !r.isUrgent && !r.isOverdue)

  return (
    <div className="flex flex-col min-h-[760px] bg-white overflow-hidden">
      <StatusBar title="Pengingat" onBack={() => navigate('dashboard')} />

      <div className="flex-1 overflow-y-auto scrollbar-thin pb-4">
        {all.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 px-8 pt-20">
            <span className="text-[64px]">🎉</span>
            <p className="font-display text-[16px] font-extrabold text-slate-700 text-center">Semua aman!</p>
            <p className="text-[14px] font-semibold text-slate-500 text-center">
              Nggak ada pengingat dalam 30 hari ke depan. Anaboo bakal ingetin lagi pas jadwalnya dekat ya 🐾
            </p>
          </div>
        ) : (
          <>
            {urgent.length > 0 && (
              <>
                <p className="text-[12px] font-extrabold text-brand-orange-dk uppercase tracking-[0.5px] px-5 pt-5 pb-2">
                  Perlu segera ({urgent.length})
                </p>
                <div className="mx-4 rounded-2xl overflow-hidden bg-white border border-brand-orange/30">
                  {urgent.map((r, idx) => (
                    <ReminderRow key={r.id} item={r} idx={idx} urgent />
                  ))}
                </div>
              </>
            )}

            {upcoming.length > 0 && (
              <>
                <p className="text-[12px] font-extrabold text-slate-500 uppercase tracking-[0.5px] px-5 pt-5 pb-2">
                  Mendatang ({upcoming.length})
                </p>
                <div className="mx-4 rounded-2xl overflow-hidden bg-white border border-slate-100">
                  {upcoming.map((r, idx) => (
                    <ReminderRow key={r.id} item={r} idx={idx} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>

      <BottomNav currentScreen="dashboard" navigate={navigate} />
    </div>
  )
}

function ReminderRow({ item, idx, urgent }) {
  return (
    <div className={cn('px-4 py-3.5 flex items-center gap-3', idx > 0 && 'border-t border-slate-100')}>
      <div className={cn(
        'w-9 h-9 rounded-xl flex items-center justify-center shrink-0',
        urgent ? 'bg-brand-orange' : 'bg-brand-orange-lt'
      )}>
        <Icon name={item.icon} size={18} tone={urgent ? 'white' : 'default'} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-extrabold text-slate-700 truncate">{item.name}</p>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          <span className="text-[12px] font-bold bg-white border border-slate-200 px-2 py-0.5 rounded-full text-slate-700">
            🐾 {item.petName}
          </span>
          <span className="text-[12px] font-semibold text-slate-500">
            {item.isOverdue ? `${Math.abs(item.daysLeft)} hari lalu` : `${item.daysLeft} hari lagi`} · {formatDate(item.dueDate, { day: 'numeric', month: 'short' })}
          </span>
        </div>
      </div>
      <span className={cn(
        'text-[12px] font-extrabold px-2 py-1 rounded-full shrink-0 whitespace-nowrap',
        item.isOverdue ? 'bg-brand-red text-white' :
        item.isUrgent  ? 'bg-brand-orange text-white' :
                         'bg-slate-100 text-slate-500'
      )}>
        {item.isOverdue ? 'Kelewat' : item.isUrgent ? 'H-3' : 'Direncanakan'}
      </span>
    </div>
  )
}
