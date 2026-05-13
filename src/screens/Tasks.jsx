import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import BottomNav from '../components/BottomNav'
import DayPicker from '../components/DayPicker'
import FilterPills from '../components/FilterPills'
import TaskCard from '../components/TaskCard'
import TaskSection from '../components/TaskSection'
import TasksHeader from '../components/TasksHeader'
import ProgressSummaryCard from '../components/ProgressSummaryCard'
import XPToast from '../components/XPToast'
import AddTaskModal from '../components/AddTaskModal'
import EmptyState from '../components/EmptyState'
import { FILTERS, MOTIVATIONAL_MESSAGES, XP_BY_TYPE } from '../data/taskConstants'
import { getDaysList, formatDateKey } from '../lib/dates'
import { awardXP, revokeXP } from '../lib/xp'

export default function Tasks({ navigate, pets = [], tasks = [], progress, addTask, toggleTask, setProgress }) {
  const { t } = useTranslation()
  const days = useMemo(() => getDaysList(14, -3), [])
  const todayIndex = days.findIndex(d => formatDateKey(d) === formatDateKey(new Date()))
  const [selectedIdx, setSelectedIdx] = useState(todayIndex >= 0 ? todayIndex : 3)
  const [filter, setFilter] = useState('all')
  const [showAdd, setShowAdd] = useState(false)
  const [toast, setToast] = useState({ visible: false })

  const selectedDate = formatDateKey(days[selectedIdx])
  const dayTasks = tasks.filter(tk => tk.date === selectedDate)
  const filtered = filter === 'all' ? dayTasks : dayTasks.filter(tk => tk.type === filter)

  // group by pet
  const grouped = pets.map(p => ({
    pet: p,
    items: filtered.filter(tk => tk.pet_id === p.id),
  })).filter(g => g.items.length > 0)

  const done = filtered.filter(tk => tk.is_done).length
  const total = filtered.length
  const xpToday = filtered.filter(tk => tk.is_done).reduce((s, tk) => s + (XP_BY_TYPE[tk.type] || 0), 0)

  const handleToggle = (task) => {
    toggleTask(task.id)
    if (!task.is_done) {
      // about to mark done — award XP + toast
      const newProgress = awardXP(progress, task.type)
      setProgress(newProgress)
      const m = MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)]
      setToast({ visible: true, xp: XP_BY_TYPE[task.type] || 10, message: m.msg, emoji: m.emoji })
    } else {
      // un-done → revoke XP
      setProgress(revokeXP(progress, task.type))
    }
  }

  return (
    <div className="flex flex-col min-h-[760px] bg-brand-cream overflow-hidden relative">
      <XPToast
        visible={toast.visible}
        xp={toast.xp}
        message={toast.message}
        emoji={toast.emoji}
        onHide={() => setToast({ visible: false })}
      />

      <div className="flex-1 overflow-y-auto scrollbar-thin pb-4">
        <TasksHeader onAdd={() => setShowAdd(true)} />

        <DayPicker days={days} selectedIndex={selectedIdx} onSelect={setSelectedIdx} />

        <FilterPills filters={FILTERS} active={filter} onChange={setFilter} />

        <div className="mt-2 mb-4">
          <ProgressSummaryCard done={done} total={total} xpToday={xpToday} />
        </div>

        {total === 0 ? (
          <EmptyState
            emoji="🎉"
            title={t('tasks.empty')}
            subtitle={t('tasks.emptySubtitle')}
          />
        ) : grouped.length === 0 ? (
          <EmptyState
            emoji="🔍"
            title="No matches"
            subtitle="Try a different filter"
          />
        ) : (
          grouped.map(g => (
            <TaskSection
              key={g.pet.id}
              title={g.pet.name}
              subtitle={`${g.items.filter(t => t.is_done).length}/${g.items.length} done`}
              count={g.items.length}
            >
              {g.items.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  petName={g.pet.name}
                  petPhoto={g.pet.illustration || g.pet.photo}
                  onToggle={handleToggle}
                />
              ))}
            </TaskSection>
          ))
        )}
      </div>

      <AddTaskModal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        onSave={addTask}
        pets={pets}
      />

      <BottomNav currentScreen="tasks" navigate={navigate} />
    </div>
  )
}
