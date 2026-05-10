// Date utilities

export function ageText(birthDate) {
  if (!birthDate) return null
  const ms = new Date() - new Date(birthDate)
  const months = Math.floor(ms / (1000 * 60 * 60 * 24 * 30.44))
  if (months < 1) return 'Baru lahir'
  return months >= 12
    ? `${Math.floor(months / 12)} thn${months % 12 ? ` ${months % 12} bln` : ''}`
    : `${months} bln`
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
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function formatDate(dateStr, opts = { day: 'numeric', month: 'short', year: 'numeric' }) {
  if (!dateStr) return '–'
  const d = new Date(dateStr)
  if (isNaN(d)) return dateStr
  return d.toLocaleDateString('id-ID', opts)
}

// Add days to a date string and return YYYY-MM-DD
export function addDays(dateStr, days) {
  const d = dateStr ? new Date(dateStr) : new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}
