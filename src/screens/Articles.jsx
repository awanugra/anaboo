import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import Icon from '../components/Icon'
import { cn } from '../lib/utils'
import { ARTICLES, ARTICLE_CATEGORIES } from '../data/articles'

export default function Articles({ navigate }) {
  const [cat, setCat] = useState('Semua')

  const filtered = cat === 'Semua' ? ARTICLES : ARTICLES.filter(a => a.category === cat)

  return (
    <div className="flex flex-col min-h-[760px] bg-white overflow-hidden">
      <StatusBar title="Artikel" />

      <div className="flex-1 overflow-y-auto scrollbar-thin pb-4">
        <div className="px-5 pt-5 pb-3">
          <p className="font-display text-[22px] font-extrabold text-slate-700">Pengetahuan anabul 📚</p>
          <p className="text-[14px] font-semibold text-slate-500 mt-0.5">Tips & info biar makin paham anabulmu</p>
        </div>

        {/* Category chips */}
        <div className="overflow-x-auto scrollbar-thin px-5 pb-3">
          <div className="flex gap-2 w-max">
            {ARTICLE_CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-[12px] font-bold transition-all active:scale-95',
                  cat === c ? 'bg-brand-orange text-white shadow-card' : 'bg-white text-slate-700 border border-slate-200'
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Article list */}
        <div className="px-5 flex flex-col gap-3">
          {filtered.map(a => (
            <button
              key={a.id}
              className="bg-white rounded-2xl border border-slate-100 p-4 flex gap-3 active:scale-[0.98] transition-all text-left shadow-card"
            >
              <div className={cn(
                'w-16 h-16 rounded-xl flex items-center justify-center shrink-0 text-[32px]',
                a.color === 'blue'   && 'bg-brand-blue-lt',
                a.color === 'orange' && 'bg-brand-orange-lt',
                a.color === 'yellow' && 'bg-brand-yellow-lt',
              )}>
                {a.image}
              </div>
              <div className="flex-1 min-w-0">
                <span className={cn(
                  'inline-block text-[10px] font-extrabold uppercase tracking-[0.5px] px-2 py-0.5 rounded-full mb-1',
                  a.color === 'blue'   && 'bg-brand-blue-lt text-brand-blue-dk',
                  a.color === 'orange' && 'bg-brand-orange-lt text-brand-orange-dk',
                  a.color === 'yellow' && 'bg-brand-yellow-lt text-slate-700',
                )}>
                  {a.category}
                </span>
                <p className="text-[14px] font-extrabold text-slate-700 leading-tight">{a.title}</p>
                <p className="text-[12px] font-semibold text-slate-500 mt-1 line-clamp-2 leading-snug">{a.excerpt}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Icon name="hourglass" size={11} />
                  <span className="text-[12px] font-semibold text-slate-500">{a.readMin} menit baca</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <BottomNav currentScreen="articles" navigate={navigate} />
    </div>
  )
}
