// Badges earned through usage. Each badge has a `check(state)` predicate.
// `state` is computed in evaluateAchievements({ pets, tasks, progress }).

export const ACHIEVEMENTS = [
  {
    id: 'first_pet',
    title: 'First Friend',
    desc: 'Add your first pet',
    emoji: '🐾',
    color: '#FF8A65',
    check: (s) => s.pets.length >= 1,
  },
  {
    id: 'pack_leader',
    title: 'Pack Leader',
    desc: 'Add 3 pets',
    emoji: '🦁',
    color: '#FFB627',
    check: (s) => s.pets.length >= 3,
  },
  {
    id: 'first_task',
    title: 'First Step',
    desc: 'Complete your first task',
    emoji: '✓',
    color: '#4CAF50',
    check: (s) => s.tasksDone >= 1,
  },
  {
    id: 'task_master',
    title: 'Task Master',
    desc: 'Complete 25 tasks',
    emoji: '🎯',
    color: '#7C4DFF',
    check: (s) => s.tasksDone >= 25,
  },
  {
    id: 'centurion',
    title: 'Centurion',
    desc: 'Complete 100 tasks',
    emoji: '💯',
    color: '#FF5252',
    check: (s) => s.tasksDone >= 100,
  },
  {
    id: 'streak_3',
    title: 'On Fire',
    desc: '3-day streak 🔥',
    emoji: '🔥',
    color: '#FF8A65',
    check: (s) => s.streak >= 3,
  },
  {
    id: 'streak_7',
    title: 'Week Warrior',
    desc: '7-day streak',
    emoji: '💪',
    color: '#FF7043',
    check: (s) => s.streak >= 7,
  },
  {
    id: 'streak_30',
    title: 'Iron Habit',
    desc: '30-day streak',
    emoji: '🏆',
    color: '#FFD700',
    check: (s) => s.streak >= 30,
  },
  {
    id: 'level_5',
    title: 'Rising Star',
    desc: 'Reach level 5',
    emoji: '⭐',
    color: '#FFD700',
    check: (s) => s.level >= 5,
  },
  {
    id: 'level_10',
    title: 'Pro Parent',
    desc: 'Reach level 10',
    emoji: '👑',
    color: '#FFD700',
    check: (s) => s.level >= 10,
  },
  {
    id: 'vaccinator',
    title: 'Vaccinator',
    desc: 'Complete 5 vaccines',
    emoji: '💉',
    color: '#7C4DFF',
    check: (s) => s.vaccinesDone >= 5,
  },
  {
    id: 'groomer',
    title: 'Groomer',
    desc: 'Complete 10 care tasks',
    emoji: '🛁',
    color: '#26C6DA',
    check: (s) => s.careDone >= 10,
  },
]

export function evaluateAchievements({ pets = [], tasks = [], progress = {} }) {
  const done = tasks.filter(t => t.is_done)
  const state = {
    pets,
    tasksDone:    done.length,
    vaccinesDone: done.filter(t => t.type === 'vaccine').length,
    careDone:     done.filter(t => t.type === 'care').length,
    streak:       progress.daily_streak || 0,
    level:        Math.max(1, Math.floor((progress.xp || 0) / 100) + 1),
  }
  return ACHIEVEMENTS.map(a => ({ ...a, unlocked: a.check(state) }))
}
