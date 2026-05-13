// Task scheduling: auto-seed default tasks for a new pet, generate recurring instances.
// Tasks have a recurrence: 'once' | 'daily' | 'weekly' | 'monthly' | 'yearly'
// When a recurring task is completed, the next instance is auto-scheduled.

import { addDays, formatDateKey, todayKey } from './dates'

// Default schedule template per species — what to seed when user adds a new pet.
// `daysFromNow`: due offset from today. `recurrence`: how often it repeats.
export const SCHEDULE_TEMPLATES = {
  cat: [
    { type: 'vaccine',    name: 'Tricat / FVRCP',     daysFromNow: 14, recurrence: 'yearly',  time: '10:00' },
    { type: 'vaccine',    name: 'Rabies',             daysFromNow: 30, recurrence: 'yearly',  time: '10:00' },
    { type: 'medication', name: 'Deworming',          daysFromNow: 7,  recurrence: 'monthly', time: '08:00' },
    { type: 'medication', name: 'Flea treatment',     daysFromNow: 14, recurrence: 'monthly', time: '08:00' },
    { type: 'care',       name: 'Bath',               daysFromNow: 7,  recurrence: 'monthly', time: '15:00', care_key: 'bath' },
    { type: 'care',       name: 'Nail trim',          daysFromNow: 14, recurrence: 'monthly', time: '15:00', care_key: 'nail' },
  ],
  dog: [
    { type: 'vaccine',    name: 'DHPPi vaccine',      daysFromNow: 14, recurrence: 'yearly',  time: '10:00' },
    { type: 'vaccine',    name: 'Rabies',             daysFromNow: 30, recurrence: 'yearly',  time: '10:00' },
    { type: 'medication', name: 'Deworming',          daysFromNow: 7,  recurrence: 'monthly', time: '08:00' },
    { type: 'medication', name: 'Heartworm pill',     daysFromNow: 7,  recurrence: 'monthly', time: '08:00', dosage: '1 tablet' },
    { type: 'medication', name: 'Flea & tick',        daysFromNow: 14, recurrence: 'monthly', time: '08:00' },
    { type: 'care',       name: 'Bath',               daysFromNow: 7,  recurrence: 'weekly',  time: '15:00', care_key: 'bath' },
    { type: 'care',       name: 'Walk',               daysFromNow: 1,  recurrence: 'daily',   time: '07:00', care_key: 'walk' },
    { type: 'care',       name: 'Grooming',           daysFromNow: 30, recurrence: 'monthly', time: '15:00', care_key: 'grooming' },
  ],
  bird: [
    { type: 'vaccine',    name: 'ND vaccine',         daysFromNow: 30, recurrence: 'yearly',  time: '10:00' },
    { type: 'medication', name: 'Deworming',          daysFromNow: 14, recurrence: 'monthly', time: '08:00' },
    { type: 'care',       name: 'Cage cleaning',      daysFromNow: 1,  recurrence: 'weekly',  time: '16:00', care_key: 'other' },
  ],
  rabbit: [
    { type: 'vaccine',    name: 'RHD vaccine',        daysFromNow: 30, recurrence: 'yearly',  time: '10:00' },
    { type: 'medication', name: 'Deworming',          daysFromNow: 14, recurrence: 'monthly', time: '08:00' },
    { type: 'care',       name: 'Nail trim',          daysFromNow: 21, recurrence: 'monthly', time: '15:00', care_key: 'nail' },
    { type: 'care',       name: 'Cage cleaning',      daysFromNow: 1,  recurrence: 'weekly',  time: '16:00', care_key: 'other' },
  ],
  reptile: [
    { type: 'care',       name: 'Tank cleaning',      daysFromNow: 7,  recurrence: 'weekly',  time: '16:00', care_key: 'other' },
    { type: 'medication', name: 'Parasite treatment', daysFromNow: 30, recurrence: 'monthly', time: '08:00' },
  ],
  fish: [
    { type: 'care',       name: 'Water change',       daysFromNow: 7,  recurrence: 'weekly',  time: '16:00', care_key: 'other' },
    { type: 'care',       name: 'Tank cleaning',      daysFromNow: 14, recurrence: 'monthly', time: '16:00', care_key: 'other' },
  ],
}

// Build initial tasks for a freshly added pet
export function seedTasksForPet(pet) {
  const template = SCHEDULE_TEMPLATES[pet.species] || SCHEDULE_TEMPLATES.cat
  const today = new Date()
  return template.map((t, idx) => ({
    id: `seed-${pet.id}-${idx}-${Date.now()}`,
    pet_id: pet.id,
    type: t.type,
    name: t.name,
    care_key: t.care_key,
    dosage: t.dosage || '',
    date: addDays(formatDateKey(today), t.daysFromNow),
    time: t.time || '',
    notes: '',
    recurrence: t.recurrence || 'once',
    is_done: false,
  }))
}

// Compute next due date for a recurring task
export function nextDueDate(currentDate, recurrence) {
  const d = new Date(currentDate)
  switch (recurrence) {
    case 'daily':   d.setDate(d.getDate() + 1); break
    case 'weekly':  d.setDate(d.getDate() + 7); break
    case 'monthly': d.setMonth(d.getMonth() + 1); break
    case 'yearly':  d.setFullYear(d.getFullYear() + 1); break
    default: return null
  }
  return formatDateKey(d)
}

// Spawn the next instance of a recurring task (called after completion)
export function spawnNextInstance(task) {
  if (!task.recurrence || task.recurrence === 'once') return null
  const next = nextDueDate(task.date, task.recurrence)
  if (!next) return null
  return {
    ...task,
    id: `${task.id}-next-${Date.now()}`,
    date: next,
    is_done: false,
  }
}

// Mark tasks as overdue if past today + not done
export function markOverdue(tasks) {
  const today = todayKey()
  return tasks.map(tk => ({
    ...tk,
    is_overdue: !tk.is_done && tk.date < today,
  }))
}

export const RECURRENCE_OPTIONS = [
  { key: 'once',    label: 'Once',    emoji: '🔂' },
  { key: 'daily',   label: 'Daily',   emoji: '🌅' },
  { key: 'weekly',  label: 'Weekly',  emoji: '📅' },
  { key: 'monthly', label: 'Monthly', emoji: '🗓️' },
  { key: 'yearly',  label: 'Yearly',  emoji: '🎂' },
]
