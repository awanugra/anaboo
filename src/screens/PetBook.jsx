import { useState } from 'react'
import Icon from '../components/Icon'
import StatusBar from '../components/StatusBar'
import { Button } from '../components/ui/button'
import { cn } from '../lib/utils'
import { ageText, formatDate, addDays, daysBetween, todayKey } from '../lib/dates'
import { SPECIES_BY_ID } from '../data/species'
import { DEFAULT_SCHEDULES, TREATMENT_TYPES, TREATMENT_EDU } from '../data/treatments'
import { assessWeight } from '../lib/obesity'

const TABS = [
  { id: 'vaccine', label: 'Vaksin',      icon: 'shield' },
  { id: 'deworm',  label: 'Obat Cacing', icon: 'pill' },
  { id: 'flea',    label: 'Obat Kutu',   icon: 'health-care' },
  { id: 'vitamin', label: 'Vitamin',     icon: 'heart' },
]

function StatusPill({ daysLeft, isOverdue }) {
  if (isOverdue) {
    return <span className="text-[12px] font-extrabold px-2 py-1 rounded-full bg-brand-red text-white">Kelewat</span>
  }
  if (daysLeft <= 3) {
    return <span className="text-[12px] font-extrabold px-2 py-1 rounded-full bg-brand-orange text-white flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping-soft" /> Segera
    </span>
  }
  return <span className="text-[12px] font-extrabold px-2 py-1 rounded-full bg-slate-100 text-slate-500">{daysLeft} hari</span>
}

export default function PetBook({ navigate, petData, vaccineRecords = [], allRecords = [], addRecord }) {
  const [tab, setTab] = useState('vaccine')

  if (!petData) {
    return (
      <div className="flex flex-col min-h-[760px] bg-white">
        <StatusBar title="Anabul" onBack={() => navigate('dashboard')} />
        <div className="flex-1 flex items-center justify-center text-slate-500">Anabul tidak ditemukan</div>
      </div>
    )
  }

  const sp        = SPECIES_BY_ID[petData.species] || SPECIES_BY_ID.cat
  const age       = ageText(petData.birthDate)
  const obesity   = petData.weight ? assessWeight(petData.species, petData.weight) : null
  const records   = allRecords.filter(r => r.petId === petData.id)
  const schedules = (DEFAULT_SCHEDULES[petData.species] || []).filter(s => s.type === tab)

  // Build per-treatment status from records
  const items = schedules.map(sched => {
    const matching = records
      .filter(r => r.type === sched.type && r.name === sched.name && r.status === 'done')
      .sort((a, b) => new Date(b.date) - new Date(a.date))
    const last     = matching[0]
    const dueDate  = last ? addDays(last.date, sched.intervalDays) : (
      petData.birthDate ? addDays(petData.birthDate, (parseInt(String(sched.ageWeeks).split('–')[0], 10) || 8) * 7) : addDays(null, 14)
    )
    const daysLeft = daysBetween(dueDate)
    return { sched, last, dueDate, daysLeft, isOverdue: daysLeft < 0, history: matching }
  })

  // Vitamin tab — daily checklist
  const today = todayKey()
  const vitaminLog = records.filter(r => r.type === 'vitamin' && r.date === today)
  const handleVitaminToggle = (vitName) => {
    const existing = vitaminLog.find(v => v.name === vitName)
    if (existing) return // already checked today (no uncheck for now)
    addRecord({ type: 'vitamin', name: vitName, date: today, status: 'done', clinic: '', batch: '', note: '' })
  }

  const VITAMIN_LIST = [
    { name: 'Vitamin Bulu',     icon: 'heart' },
    { name: 'Vitamin Mata',     icon: 'star' },
    { name: 'Vitamin Imun',     icon: 'shield' },
  ]

  return (
    <div className="flex flex-col min-h-[760px] bg-white overflow-hidden">
      <StatusBar title={petData.name} onBack={() => navigate('dashboard')} />

      <div className="flex-1 overflow-y-auto scrollbar-thin pb-6">
        {/* Pet header card */}
        <div className="mx-4 mt-4 rounded-2xl bg-white border border-slate-100 p-4 flex items-center gap-3 shadow-card">
          <div className="w-16 h-16 rounded-2xl bg-brand-orange-lt flex items-center justify-center overflow-hidden shrink-0">
            {petData.photo ? (
              <img src={petData.photo} alt={petData.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-[32px]">{sp.emoji}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display text-[16px] font-extrabold text-slate-700 leading-tight truncate">{petData.name}</p>
            <p className="text-[12px] font-semibold text-slate-500 truncate">
              {sp.label}{petData.breed ? ` · ${petData.breed}` : ''}
            </p>
            <p className="text-[12px] font-semibold text-slate-500 truncate">
              {age ?? '–'}{petData.gender ? ` · ${petData.gender === 'male' ? 'Jantan' : 'Betina'}` : ''}
              {petData.weight ? ` · ${petData.weight} kg` : ''}
            </p>
          </div>
          <button
            onClick={() => navigate('onboarding')}
            className="w-9 h-9 rounded-xl bg-brand-orange-lt flex items-center justify-center text-slate-500 active:scale-90 transition-all shrink-0"
          >
            <Icon name="info" size={16} />
          </button>
        </div>

        {/* Obesity badge */}
        {obesity && obesity.status !== 'unknown' && (
          <div className={cn(
            'mx-4 mt-3 rounded-xl p-3 flex items-start gap-2',
            obesity.color === 'green'  && 'bg-brand-green-lt',
            obesity.color === 'yellow' && 'bg-brand-yellow-lt',
            obesity.color === 'red'    && 'bg-brand-red-lt',
          )}>
            <Icon name="info" size={14} className="shrink-0 mt-0.5" />
            <p className="text-[12px] font-semibold text-slate-700 leading-snug">
              <strong>Berat badan: {obesity.label}.</strong> {obesity.message}
            </p>
          </div>
        )}

        {/* Tabs */}
        <div className="px-4 pt-4">
          <div className="flex gap-1.5 bg-white border border-slate-100 rounded-2xl p-1.5">
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  'flex-1 flex flex-col items-center gap-0.5 py-2 rounded-xl text-[12px] font-bold transition-all',
                  tab === t.id ? 'bg-brand-orange text-white shadow-card' : 'text-slate-500'
                )}
              >
                <Icon name={t.icon} size={18} tone={tab === t.id ? 'white' : 'default'} />
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Edu tip */}
        <div className="mx-4 mt-3 bg-brand-yellow-lt rounded-xl p-3 flex items-start gap-2">
          <Icon name="info" size={14} className="shrink-0 mt-0.5" />
          <p className="text-[12px] font-semibold text-slate-700 leading-snug">{TREATMENT_EDU[tab]}</p>
        </div>

        {/* Vitamin checklist */}
        {tab === 'vitamin' && (
          <>
            <div className="flex items-center justify-between px-4 pt-5 pb-2">
              <p className="text-[12px] font-extrabold text-slate-500 uppercase tracking-[0.5px]">Checklist hari ini</p>
              <p className="text-[12px] font-bold text-slate-500">{formatDate(today)}</p>
            </div>
            <div className="mx-4 rounded-2xl overflow-hidden border border-slate-100 bg-white">
              {VITAMIN_LIST.map((v, i) => {
                const checked = !!vitaminLog.find(l => l.name === v.name)
                return (
                  <button
                    key={v.name}
                    onClick={() => handleVitaminToggle(v.name)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors',
                      i > 0 && 'border-t border-slate-100',
                      checked && 'bg-brand-green-lt'
                    )}
                  >
                    <div className={cn(
                      'w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all',
                      checked ? 'bg-brand-green' : 'bg-brand-orange-lt'
                    )}>
                      <Icon name={checked ? 'check-square' : v.icon} size={18}
                        tone={checked ? 'white' : 'default'} />
                    </div>
                    <div className="flex-1">
                      <p className={cn('text-[14px] font-extrabold', checked ? 'text-brand-green-dk line-through' : 'text-slate-700')}>
                        {v.name}
                      </p>
                      <p className="text-[12px] font-semibold text-slate-500">
                        {checked ? 'Sudah dikasih hari ini 🎉' : 'Tap untuk centang'}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Vitamin streak / history */}
            <div className="mx-4 mt-3 bg-white border border-slate-100 rounded-2xl p-4">
              <p className="text-[12px] font-extrabold text-slate-500 uppercase tracking-[0.5px] mb-2">Riwayat 7 hari</p>
              <div className="flex gap-1.5">
                {Array.from({ length: 7 }).map((_, i) => {
                  const d = new Date()
                  d.setDate(d.getDate() - (6 - i))
                  const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
                  const has = records.some(r => r.type === 'vitamin' && r.date === key)
                  return (
                    <div key={key} className="flex-1 flex flex-col items-center gap-1">
                      <div className={cn(
                        'w-full h-8 rounded-lg flex items-center justify-center text-[10px] font-extrabold',
                        has ? 'bg-brand-green text-white' : 'bg-slate-100 text-slate-400'
                      )}>
                        {has ? '✓' : '–'}
                      </div>
                      <span className="text-[10px] font-bold text-slate-500">{['M','S','S','R','K','J','S'][d.getDay()]}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )}

        {/* Scheduled treatments (vaksin/cacing/kutu) */}
        {tab !== 'vitamin' && (
          <>
            <div className="flex items-center justify-between px-4 pt-5 pb-2">
              <p className="text-[12px] font-extrabold text-slate-500 uppercase tracking-[0.5px]">
                Jadwal {TREATMENT_TYPES[tab].label}
              </p>
              <button
                onClick={() => navigate('addvaccine')}
                className="text-[12px] font-extrabold text-brand-blue active:opacity-70"
              >
                + Catat
              </button>
            </div>

            <div className="mx-4 rounded-2xl overflow-hidden border border-slate-100 bg-white">
              {items.map((it, idx) => (
                <div key={it.sched.name} className={cn('px-4 py-3.5', idx > 0 && 'border-t border-slate-100')}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-brand-orange-lt flex items-center justify-center shrink-0">
                      <Icon name={TREATMENT_TYPES[tab].icon} size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-extrabold text-slate-700 truncate">{it.sched.name}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Icon name="calendar" size={11} />
                        <span className="text-[12px] font-semibold text-slate-500 truncate">
                          Berikutnya: {formatDate(it.dueDate)}
                        </span>
                      </div>
                    </div>
                    <StatusPill daysLeft={it.daysLeft} isOverdue={it.isOverdue} />
                  </div>

                  {it.last && (
                    <div className="ml-12 mt-2 flex items-center gap-1">
                      <Icon name="check-square" size={11} />
                      <span className="text-[12px] font-semibold text-slate-500">
                        Terakhir: {formatDate(it.last.date)}{it.last.clinic ? ` · ${it.last.clinic}` : ''}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* History */}
            {records.filter(r => r.type === tab && r.status === 'done').length > 0 && (
              <>
                <p className="text-[12px] font-extrabold text-slate-500 uppercase tracking-[0.5px] px-4 pt-5 pb-2">
                  Riwayat
                </p>
                <div className="mx-4 rounded-2xl overflow-hidden border border-slate-100 bg-white">
                  {records
                    .filter(r => r.type === tab && r.status === 'done')
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((r, idx) => (
                      <div key={r.id} className={cn('px-4 py-3 flex items-center gap-3', idx > 0 && 'border-t border-slate-100')}>
                        <div className="w-8 h-8 rounded-xl bg-brand-green-lt flex items-center justify-center shrink-0">
                          <Icon name="check-square" size={14} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-extrabold text-slate-700 truncate">{r.name}</p>
                          <p className="text-[12px] font-semibold text-slate-500 truncate">
                            {formatDate(r.date)}{r.clinic ? ` · ${r.clinic}` : ''}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </>
            )}

            <div className="px-4 mt-4">
              <Button onClick={() => navigate('addvaccine')}>+ Catat {TREATMENT_TYPES[tab].label}</Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
