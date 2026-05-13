import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from '../components/ui/input'
import { cn } from '../lib/utils'
import { ARTICLES, ARTICLE_CATEGORIES } from '../data/articles'

export default function Articles({ navigate }) {
  const { t } = useTranslation()
  const [cat, setCat] = useState('Semua')
  const [query, setQuery] = useState('')

  const filtered = ARTICLES
    .filter(a => cat === 'Semua' || a.category === cat)
    .filter(a => !query || a.title.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="flex flex-col min-h-[760px] bg-brand-cream overflow-hidden">
      <div
        className="bg-white pt-6 px-5 pb-4 shadow-card"
        style={{ borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('dashboard')}
            className="w-10 h-10 rounded-2xl bg-brand-peach flex items-center justify-center active:scale-95"
            aria-label="back"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#333"><path d="M14.7 5.3a1 1 0 010 1.4L9.4 12l5.3 5.3a1 1 0 11-1.4 1.4l-6-6a1 1 0 010-1.4l6-6a1 1 0 011.4 0z"/></svg>
          </button>
          <p className="font-display text-h1 text-slate-700">{t('articles.title')}</p>
        </div>
        <p className="text-[13px] font-semibold text-slate-500 mt-1">{t('articles.subtitle')}</p>
        <Input
          type="text"
          placeholder={t('articles.search')}
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="mt-3 rounded-2xl"
        />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin pb-4">
        <div className="overflow-x-auto scrollbar-thin px-5 pt-3 pb-2">
          <div className="flex gap-2 w-max">
            {ARTICLE_CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  'px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all active:scale-95',
                  cat === c ? 'bg-brand-orange text-white shadow-card' : 'bg-white text-slate-700 border border-slate-100'
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="px-5 flex flex-col gap-3">
          {filtered.map(a => (
            <button
              key={a.id}
              className="bg-white rounded-3xl p-4 flex gap-3 active:scale-[0.98] transition-all text-left shadow-card"
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 text-[32px] bg-brand-peach">
                {a.image}
              </div>
              <div className="flex-1 min-w-0">
                <span className="inline-block text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-full bg-brand-orange-lt text-brand-orange-dk mb-1">
                  {a.category}
                </span>
                <p className="text-[14px] font-extrabold text-slate-700 leading-tight">{a.title}</p>
                <p className="text-[12px] font-semibold text-slate-500 mt-1 line-clamp-2 leading-snug">{a.excerpt}</p>
                <p className="text-[11px] font-semibold text-slate-500 mt-1">⏱ {t('articles.readTime', { min: a.readMin })}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
