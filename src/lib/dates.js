// Date utilities

export function ageText(birthDate) {
  if (!birthDate) return null
  const ms = new Date() - new Date(birthDate)
  const months = Math.floor(ms / (1000 * 60 * 60 * 24 * 30.44))
  if (months < 1) return 'Just born'
  return months >= 12
    ? `${Math.floor(months / 12)} yr${months % 12 ? ` ${months % 12} mo` : ''}`
    : `${months} mo`
}

export function daysBetween(dateStr) {
  if (!dateStr) return null
  const d = new Date(dateStr)
  if (isNaN(d)) return null
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  d.setHours(0, 0, 0, 0)
  return Math.round((d - now) / (1000 * 60 * 60 * 24))
}

export function todayKey() {
  return formatDateKey(new Date())
}

export function formatDateKey(date) {
  const d = date instanceof Date ? date : new Date(date)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function formatDate(dateStr, opts = { day: 'numeric', month: 'short', year: 'numeric' }, locale = 'en-US') {
  if (!dateStr) return '–'
  const d = new Date(dateStr)
  if (isNaN(d)) return dateStr
  return d.toLocaleDateString(locale, opts)
}

// Add days to a date string and return YYYY-MM-DD
export function addDays(dateStr, days) {
  const d = dateStr ? new Date(dateStr) : new Date()
  d.setDate(d.getDate() + days)
  return formatDateKey(d)
}

// Get a list of `count` Date objects, centered around today by default.
// Example: getDaysList(14, -7) → 7 days before today through 6 days after.
export function getDaysList(count = 14, offset = -3) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() + offset + i)
    return d
  })
}

// Short day-of-week label, e.g. "Mon"
export function shortDay(date, locale = 'en-US') {
  return new Date(date).toLocaleDateString(locale, { weekday: 'short' })
}

// Day number, e.g. 13
export function dayNum(date) {
  return new Date(date).getDate()
}

export function isSameDay(a, b) {
  return formatDateKey(a) === formatDateKey(b)
}
