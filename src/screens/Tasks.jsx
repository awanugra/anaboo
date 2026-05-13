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
import { getDaysList, formatDateKey, todayKey } from '../lib/dates'
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
  const today = todayKey()
  const isViewingPast = selectedDate < today

  const dayTasks = tasks.filter(tk => tk.date === selectedDate)
  const filtered = filter === 'all' ? dayTasks : dayTasks.filter(tk => tk.type === filter)

  const petMap = Object.fromEntries(pets.map(p => [p.id, p]))

  // Group by status
  const overdue = filtered.filter(t => !t.is_done && selectedDate < today)
  const pending = filtered.filter(t => !t.is_done && !(selectedDate < today))
  const done    = filtered.filter(t =>  t.is_done)

  const total = filtered.length
  const doneCount = done.length
  const xpToday = done.reduce((s, t) => s + (XP_BY_TYPE[t.type] || 0), 0)
  const streak = progress?.daily_streak ?? 0
  const totalXP = progress?.xp ?? 0

  const handleToggle = (task) => {
    toggleTask(task.id)
    if (!task.is_done) {
      const np = awardXP(progress, task.type)
      setProgress(np)
      const m = MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)]
      setToast({ visible: true, xp: XP_BY_TYPE[task.type] || 10, message: m.msg, emoji: m.emoji })
    } else {
      setProgress(revokeXP(progress, task.type))
    }
  }

  const renderCard = (task) => {
    const pet = petMap[task.pet_id]
    return (
      <TaskCard
        key={task.id}
        task={task}
        petName={pet?.name}
        petPhoto={pet?.illustration || pet?.photo}
        onToggle={handleToggle}
      />
    )
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

        <ProgressSummaryCard
          done={doneCount}
          total={total}
          streak={streak}
          xp={totalXP}
        />

        <DayPicker days={days} selectedIndex={selectedIdx} onSelect={setSelectedIdx} />

        <FilterPills filters={FILTERS} active={filter} onChange={setFilter} />

        {total === 0 ? (
          <EmptyState
            useMascot
            variant="happy"
            title={t('tasks.empty')}
            subtitle={t('tasks.emptySubtitle')}
          />
        ) : (
          <>
            {overdue.length > 0 && (
              <TaskSection title="⚠️ Overdue" count={overdue.length} accentColor="#FF5252">
                {overdue.map(renderCard)}
              </TaskSection>
            )}
            {pending.length > 0 && (
              <TaskSection title={isViewingPast ? '⏳ Missed' : '🕐 Pending'} count={pending.length} accentColor="#FF8A65">
                {pending.map(renderCard)}
              </TaskSection>
            )}
            {done.length > 0 && (
              <TaskSection title="✅ Done" count={done.length} accentColor="#4CAF50">
                {done.map(renderCard)}
              </TaskSection>
            )}
          </>
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
