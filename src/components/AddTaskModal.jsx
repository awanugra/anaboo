import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '../lib/utils'
import { TASK_TYPES, CARE_TYPES } from '../data/taskConstants'
import { Button } from './ui/button'
import { Input } from './ui/input'

// Bottom-sheet style modal for creating a new task
export default function AddTaskModal({ open, onClose, onSave, pets = [], defaultPetId }) {
  const { t } = useTranslation()
  const [type,    setType]    = useState('medication')
  const [petId,   setPetId]   = useState(defaultPetId || pets[0]?.id)
  const [name,    setName]    = useState('')
  const [careKey, setCareKey] = useState('grooming')
  const [date,    setDate]    = useState(new Date().toISOString().split('T')[0])
  const [time,    setTime]    = useState('')
  const [dosage,  setDosage]  = useState('')
  const [notes,   setNotes]   = useState('')

  if (!open) return null

  const handleSave = () => {
    const finalName = type === 'care'
      ? (name.trim() || CARE_TYPES.find(c => c.key === careKey)?.label || 'Care task')
      : name.trim()
    if (!finalName || !petId) return
    onSave({
      type,
      pet_id: petId,
      name: finalName,
      care_key: type === 'care' ? careKey : undefined,
      date,
      time,
      dosage,
      notes,
      is_done: false,
    })
    // reset
    setType('medication'); setName(''); setCareKey('grooming'); setTime(''); setDosage(''); setNotes('')
    onClose()
  }

  return (
    <div className="absolute inset-0 z-40 flex items-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div
        onClick={e => e.stopPropagation()}
        className="relative w-full bg-white rounded-t-[28px] p-5 pb-8 max-h-[85%] overflow-y-auto animate-slide-down scrollbar-thin"
        style={{ animationName: 'slide-down', animationDuration: '0.3s' }}
      >
        {/* Handle */}
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4" />
        <p className="text-h2 font-display text-slate-700 mb-1">{t('tasks.addModal.title')}</p>

        {/* Type picker */}
        <p className="text-[12px] font-bold text-slate-500 uppercase tracking-wide mt-4 mb-2">{t('tasks.addModal.selectType')}</p>
        <div className="grid grid-cols-3 gap-2">
          {Object.values(TASK_TYPES).map(tt => {
            const selected = type === tt.id
            return (
              <button
                key={tt.id}
                onClick={() => setType(tt.id)}
                className={cn(
                  'flex flex-col items-center gap-1 py-3 rounded-2xl border transition-all',
                  selected ? 'border-brand-orange shadow-card' : 'border-slate-200'
                )}
                style={{ background: selected ? tt.bg : '#fff' }}
              >
                <span className="text-[22px]">{tt.emoji}</span>
                <span className="text-[12px] font-bold" style={{ color: selected ? tt.color : '#475569' }}>{tt.label}</span>
              </button>
            )
          })}
        </div>

        {/* Care subtype */}
        {type === 'care' && (
          <div className="mt-4">
            <p className="text-[12px] font-bold text-slate-500 uppercase tracking-wide mb-2">Care Type</p>
            <div className="grid grid-cols-3 gap-2">
              {CARE_TYPES.map(c => {
                const sel = careKey === c.key
                return (
                  <button
                    key={c.key}
                    onClick={() => setCareKey(c.key)}
                    className={cn(
                      'flex items-center justify-center gap-1 py-2 rounded-xl border text-[12px] font-bold transition-all',
                      sel ? 'bg-brand-care-bg border-brand-care text-brand-care' : 'border-slate-200 text-slate-700'
                    )}
                  >
                    <span>{c.emoji}</span>
                    {c.label}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Pet picker */}
        {pets.length > 0 && (
          <div className="mt-4">
            <p className="text-[12px] font-bold text-slate-500 uppercase tracking-wide mb-2">{t('tasks.addModal.selectPet')}</p>
            <div className="overflow-x-auto scrollbar-thin">
              <div className="flex gap-2 w-max">
                {pets.map(p => {
                  const sel = petId === p.id
                  return (
                    <button
                      key={p.id}
                      onClick={() => setPetId(p.id)}
                      className={cn(
                        'px-3 py-2 rounded-xl border text-[12px] font-bold transition-all',
                        sel ? 'bg-brand-orange text-white border-brand-orange' : 'bg-white text-slate-700 border-slate-200'
                      )}
                    >
                      🐾 {p.name}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Name */}
        <div className="mt-4">
          <label className="text-[12px] font-semibold text-slate-500">{t('tasks.addModal.name')}</label>
          <Input
            type="text"
            placeholder={t('tasks.addModal.namePlaceholder')}
            value={name}
            onChange={e => setName(e.target.value)}
            className="mt-1 rounded-2xl"
          />
        </div>

        {/* Date + Time */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div>
            <label className="text-[12px] font-semibold text-slate-500">{t('tasks.addModal.date')}</label>
            <Input type="date" value={date} onChange={e => setDate(e.target.value)} className="mt-1 rounded-2xl" />
          </div>
          <div>
            <label className="text-[12px] font-semibold text-slate-500">{t('tasks.addModal.time')}</label>
            <Input type="time" value={time} onChange={e => setTime(e.target.value)} className="mt-1 rounded-2xl" />
          </div>
        </div>

        {/* Dosage (only medication) */}
        {type === 'medication' && (
          <div className="mt-3">
            <label className="text-[12px] font-semibold text-slate-500">{t('tasks.addModal.dosage')}</label>
            <Input
              type="text"
              placeholder={t('tasks.addModal.dosagePlaceholder')}
              value={dosage}
              onChange={e => setDosage(e.target.value)}
              className="mt-1 rounded-2xl"
            />
          </div>
        )}

        {/* Notes */}
        <div className="mt-3">
          <label className="text-[12px] font-semibold text-slate-500">{t('tasks.addModal.notes')}</label>
          <Input
            type="text"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            className="mt-1 rounded-2xl"
          />
        </div>

        <Button onClick={handleSave} className="mt-5">{t('tasks.addModal.save')}</Button>
      </div>
    </div>
  )
}
