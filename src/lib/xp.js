// Gamification helpers — XP, streak, level
import { XP_BY_TYPE, levelFromXP } from '../data/taskConstants'
import { todayKey } from './dates'

// Default progress object
export const DEFAULT_PROGRESS = {
  xp: 0,
  daily_streak: 0,
  last_done_date: null,
}

// Compute level from xp
export { levelFromXP }

// Award XP for a task completion. Updates streak if first task of day.
// Returns the new progress object.
export function awardXP(progress, taskType) {
  const xpDelta = XP_BY_TYPE[taskType] ?? 10
  const today = todayKey()
  const last = progress.last_done_date

  let streak = progress.daily_streak ?? 0
  if (last === today) {
    // already counted today
  } else {
    // check if last_done_date is yesterday → continue streak; else reset to 1
    if (last) {
      const lastDate = new Date(last)
      const todayDate = new Date(today)
      const diffDays = Math.round((todayDate - lastDate) / 86400000)
      streak = diffDays === 1 ? streak + 1 : 1
    } else {
      streak = 1
    }
  }

  return {
    xp: (progress.xp ?? 0) + xpDelta,
    daily_streak: streak,
    last_done_date: today,
  }
}

// Reverse: subtract XP when user un-checks a task
export function revokeXP(progress, taskType) {
  const xpDelta = XP_BY_TYPE[taskType] ?? 10
  return {
    ...progress,
    xp: Math.max(0, (progress.xp ?? 0) - xpDelta),
  }
}
