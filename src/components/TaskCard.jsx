import { useState } from 'react'
import { cn } from '../lib/utils'
import { TASK_TYPES } from '../data/taskConstants'

// Single task row with animated check circle
export default function TaskCard({ task, onToggle, petPhoto, petName }) {
  const [animating, setAnimating] = useState(false)
  const type = TASK_TYPES[task.type] ?? TASK_TYPES.care
  const done = !!task.is_done

  const handleClick = () => {
    setAnimating(true)
    setTimeout(() => setAnimating(false), 400)
    onToggle(task)
  }

  return (
    <div
      className={cn(
        'rounded-2xl flex items-center gap-3 p-3.5 transition-all',
        done ? 'bg-brand-green-lt/40 border border-brand-green-lt opacity-75' : 'bg-white shadow-card'
      )}
    >
      {/* Type icon */}
      <div
        className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 text-[20px]"
        style={{ background: done ? '#E0E0E0' : type.bg, color: done ? '#9E9E9E' : type.color }}
      >
        {type.emoji}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className={cn(
          'text-[14px] font-extrabold truncate',
          done ? 'text-slate-400 line-through' : 'text-slate-700'
        )}>
          {task.name}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5">
          {petPhoto ? (
            <img src={petPhoto} alt="" className="w-4 h-4 rounded-full object-cover" />
          ) : (
            <span className="text-[11px]">🐾</span>
          )}
          <span className="text-[12px] text-slate-500 font-medium truncate">{petName}</span>
          {task.time && (
            <>
              <span className="text-slate-300">•</span>
              <span className="text-[12px] text-slate-500">⏰ {task.time}</span>
            </>
          )}
          {task.dosage && (
            <>
              <span className="text-slate-300">•</span>
              <span className="text-[12px] text-slate-500">{task.dosage}</span>
            </>
          )}
        </div>
        {task.is_overdue && !done && (
          <div className="flex items-center gap-1 mt-1">
            <span className="text-[11px] text-brand-red font-bold">⚠️ Overdue!</span>
          </div>
        )}
      </div>

      {/* Check circle */}
      <button
        onClick={handleClick}
        className={cn(
          'w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all active:scale-90',
          animating && 'animate-check-pop'
        )}
      >
        {done ? (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="#4CAF50">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        ) : (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={task.is_overdue ? '#FF5252' : '#BDBDBD'} strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
          </svg>
        )}
      </button>
    </div>
  )
}
