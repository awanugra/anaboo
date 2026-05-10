// Compute reminder list across all pets
import { DEFAULT_SCHEDULES, TREATMENT_TYPES } from '../data/treatments'
import { addDays, daysBetween } from './dates'

const REMINDER_THRESHOLD = 3 // H-3

// Get next due date for each scheduled treatment per pet
// Records: array of { petId, type, name, date, status }
// Returns: array of { id, petId, petName, type, name, dueDate, daysLeft, isUrgent, isOverdue }
export function computeReminders(pets, records) {
  const out = []
  for (const pet of pets) {
    const schedules = DEFAULT_SCHEDULES[pet.species] || DEFAULT_SCHEDULES.cat
    for (const sched of schedules) {
      const petRecords = records
        .filter(r => r.petId === pet.id && r.type === sched.type && r.name === sched.name && r.status === 'done')
        .sort((a, b) => new Date(b.date) - new Date(a.date))
      const last = petRecords[0]
      let dueDate
      if (last) {
        dueDate = addDays(last.date, sched.intervalDays)
      } else {
        // No record yet — use birthDate + age weeks if available
        if (pet.birthDate) {
          const baseWeeks = parseInt(String(sched.ageWeeks).split('–')[0], 10) || 8
          dueDate = addDays(pet.birthDate, baseWeeks * 7)
        } else {
          dueDate = addDays(null, 14) // default placeholder
        }
      }
      const daysLeft = daysBetween(dueDate)
      out.push({
        id:        `${pet.id}-${sched.type}-${sched.name}`,
        petId:     pet.id,
        petName:   pet.name,
        type:      sched.type,
        typeLabel: TREATMENT_TYPES[sched.type]?.label || sched.type,
        icon:      TREATMENT_TYPES[sched.type]?.icon   || 'health-care',
        name:      sched.name,
        dueDate,
        daysLeft,
        isUrgent:  daysLeft >= 0 && daysLeft <= REMINDER_THRESHOLD,
        isOverdue: daysLeft < 0,
      })
    }
  }
  return out
}

// Just the urgent / overdue ones — for badge counts & home reminders
export function getActiveReminders(pets, records) {
  return computeReminders(pets, records)
    .filter(r => r.isUrgent || r.isOverdue)
    .sort((a, b) => a.daysLeft - b.daysLeft)
}

// Per-pet count
export function countActiveByPet(pets, records) {
  const counts = {}
  for (const r of getActiveReminders(pets, records)) {
    counts[r.petId] = (counts[r.petId] || 0) + 1
  }
  return counts
}
