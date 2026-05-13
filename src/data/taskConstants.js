// Task system constants — mirrors reference "from-anything" app

export const TASK_TYPES = {
  medication: { id: 'medication', label: 'Medication', emoji: '💊', color: '#FF8A65', bg: '#FBE9E7', xp: 10 },
  vaccine:    { id: 'vaccine',    label: 'Vaccine',    emoji: '💉', color: '#7C4DFF', bg: '#EDE7F6', xp: 25 },
  care:       { id: 'care',       label: 'Care',       emoji: '🛁', color: '#26C6DA', bg: '#E0F7FA', xp: 15 },
}

export const FILTERS = [
  { key: 'all',        label: 'All',        emoji: '📋' },
  { key: 'medication', label: 'Meds',       emoji: '💊' },
  { key: 'vaccine',    label: 'Vaccines',   emoji: '💉' },
  { key: 'care',       label: 'Care',       emoji: '🛁' },
]

export const CARE_TYPES = [
  { key: 'grooming',     label: 'Grooming',         emoji: '✂️' },
  { key: 'bath',         label: 'Bath',             emoji: '🛁' },
  { key: 'nail',         label: 'Nail Trim',        emoji: '💅' },
  { key: 'vet',          label: 'Vet Visit',        emoji: '🏥' },
  { key: 'ear',          label: 'Ear Cleaning',     emoji: '👂' },
  { key: 'walk',         label: 'Walk',             emoji: '🚶' },
  { key: 'other',        label: 'Other',            emoji: '🐾' },
]

export const MOTIVATIONAL_MESSAGES = [
  { msg: "Amazing! 🌟 You're the best pet parent!",   emoji: '🏆' },
  { msg: 'They are lucky to have you! 💕',             emoji: '🐾' },
  { msg: 'Consistency wins. Keep it up! 🔥',           emoji: '💪' },
  { msg: 'You did awesome today! 🎉',                  emoji: '✨' },
  { msg: 'Your pet must be so happy! 🥰',              emoji: '🐱' },
  { msg: 'Crushing it! 💯',                            emoji: '🚀' },
]

export const XP_BY_TYPE = { medication: 10, vaccine: 25, care: 15 }

export const XP_PER_LEVEL = 100 // simple linear

export function levelFromXP(xp) {
  return Math.max(1, Math.floor(xp / XP_PER_LEVEL) + 1)
}
export function xpToNextLevel(xp) {
  const level = levelFromXP(xp)
  return level * XP_PER_LEVEL - xp
}
