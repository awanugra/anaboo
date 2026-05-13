import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../components/ui/button'
import TaskCard from '../components/TaskCard'
import AddTaskModal from '../components/AddTaskModal'
import EmptyState from '../components/EmptyState'
import { TASK_TYPES } from '../data/taskConstants'
import { SPECIES_BY_ID } from '../data/species'
import { ageText, formatDate } from '../lib/dates'
import { cn } from '../lib/utils'

const TABS = ['medication', 'vaccine', 'care']

export default function PetDetail({ navigate, petData, tasks = [], pets = [], addTask, toggleTask }) {
  const { t } = useTranslation()
  const [tab, setTab] = useState('medication')
  const [showAdd, setShowAdd] = useState(false)

  if (!petData) {
    return (
      <div className="flex flex-col min-h-[760px] bg-white">
        <div className="flex-1 flex items-center justify-center text-slate-500">Pet not found</div>
      </div>
    )
  }

  const sp = SPECIES_BY_ID[petData.species] || SPECIES_BY_ID.cat
  const photo = petData.illustration || petData.photo
  const petTasks = tasks.filter(tk => tk.pet_id === petData.id && tk.type === tab)
  const tabLabel = TASK_TYPES[tab].label

  return (
    <div className="flex flex-col min-h-[760px] bg-white overflow-hidden relative">
      {/* Hero photo */}
      <div className="relative w-full" style={{ height: 320 }}>
        {photo ? (
          <img src={photo} alt={petData.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-orange to-brand-orange-dk">
            <span style={{ fontSize: 120 }}>{sp.emoji}</span>
          </div>
        )}
        {/* Top buttons */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <button
            onClick={() => navigate('pets')}
            className="w-10 h-10 rounded-2xl bg-white/90 backdrop-blur flex items-center justify-center active:scale-95"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#333"><path d="M14.7 5.3a1 1 0 010 1.4L9.4 12l5.3 5.3a1 1 0 11-1.4 1.4l-6-6a1 1 0 010-1.4l6-6a1 1 0 011.4 0z"/></svg>
          </button>
          <button
            onClick={() => navigate('onboarding')}
            className="w-10 h-10 rounded-2xl bg-white/90 backdrop-blur flex items-center justify-center active:scale-95"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#333"><path d="M12 5.5a2 2 0 100 4 2 2 0 000-4zm0 5.5a2 2 0 100 4 2 2 0 000-4zm0 5.5a2 2 0 100 4 2 2 0 000-4z"/></svg>
          </button>
        </div>
        {/* Bottom name overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-display text-[28px] font-extrabold text-white tracking-tight">{petData.name}</p>
              <p className="text-[13px] font-semibold text-white/90">
                {sp.label}{petData.breed ? ` · ${petData.breed}` : ''}
              </p>
            </div>
            {petData.gender && (
              <span className="text-[24px]">{petData.gender === 'male' ? '♂️' : '♀️'}</span>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto scrollbar-thin pb-6">
        {/* Stats row */}
        <div className="mx-5 -mt-6 relative z-10 bg-white rounded-3xl p-4 shadow-card grid grid-cols-3 gap-2">
          {[
            { label: t('petDetail.age'),    val: ageText(petData.birthDate) ?? '–', emoji: '📅' },
            { label: t('petDetail.weight'), val: petData.weight ? `${petData.weight}kg` : '–', emoji: '⚖️' },
            { label: t('petDetail.breed'),  val: petData.breed || '–', emoji: '🏷️' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <span className="text-[20px]">{s.emoji}</span>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mt-1">{s.label}</p>
              <p className="text-[13px] font-extrabold text-slate-700 mt-0.5 truncate">{s.val}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mx-5 mt-5">
          <div className="bg-white rounded-2xl p-1.5 flex border border-slate-100">
            {TABS.map(k => {
              const tt = TASK_TYPES[k]
              const active = tab === k
              return (
                <button
                  key={k}
                  onClick={() => setTab(k)}
                  className={cn(
                    'flex-1 flex flex-col items-center gap-0.5 py-2 rounded-xl text-[12px] font-extrabold transition-all',
                    active ? 'text-white shadow-card' : 'text-slate-500'
                  )}
                  style={active ? { background: tt.color } : {}}
                >
                  <span className="text-[16px]">{tt.emoji}</span>
                  {t(`petDetail.${k === 'medication' ? 'medications' : k === 'vaccine' ? 'vaccines' : 'care'}`)}
                </button>
              )
            })}
          </div>
        </div>

        {/* Task list */}
        <div className="px-5 mt-4 flex flex-col gap-2">
          {petTasks.length === 0 ? (
            <EmptyState
              useMascot
              variant="default"
              title={t('petDetail.noRecords')}
              subtitle={`Tap below to add a ${tabLabel.toLowerCase()}`}
            />
          ) : petTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              petName={petData.name}
              petPhoto={photo}
              onToggle={() => toggleTask(task.id)}
            />
          ))}
        </div>

        <div className="mx-5 mt-5">
          <Button onClick={() => setShowAdd(true)}>
            {tab === 'medication' ? t('petDetail.addMedication') :
             tab === 'vaccine'    ? t('petDetail.addVaccine')    :
                                    t('petDetail.addCare')}
          </Button>
        </div>
      </div>

      <AddTaskModal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        onSave={(task) => addTask({ ...task, type: tab })}
        pets={pets}
        defaultPetId={petData.id}
      />
    </div>
  )
}
