import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import BottomNav from '../components/BottomNav'
import FilterPills from '../components/FilterPills'
import { Input } from '../components/ui/input'
import { cn } from '../lib/utils'
import { SERVICES, SERVICE_TYPES, SERVICE_FILTERS } from '../data/clinics'

export default function Nearby({ navigate }) {
  const { t } = useTranslation()
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [view, setView] = useState('map')
  const [selectedId, setSelectedId] = useState(SERVICES[0].id)

  const filtered = SERVICES
    .filter(s => filter === 'all' || s.type === filter)
    .filter(s => !query || s.name.toLowerCase().includes(query.toLowerCase()) || s.address.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    if (view !== 'map') return
    let cancelled = false
    let markers = []

    ;(async () => {
      const L = (await import('leaflet')).default
      await import('leaflet/dist/leaflet.css')
      if (cancelled || !containerRef.current) return

      const map = L.map(containerRef.current, { zoomControl: false, attributionControl: false }).setView([-6.235, 106.82], 12)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map)

      const makeIcon = (active, color) => L.divIcon({
        className: '',
        html: `<div style="
          width:30px;height:30px;border-radius:50% 50% 50% 0;
          transform: rotate(-45deg);
          background:${active ? '#FF8A65' : color};
          border:3px solid white;
          box-shadow:0 4px 8px rgba(0,0,0,0.2);
          display:flex;align-items:center;justify-content:center;
        "><span style="transform:rotate(45deg);color:white;font-weight:900;font-size:12px;">📍</span></div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
      })

      filtered.forEach(s => {
        const m = L.marker(s.coords, { icon: makeIcon(s.id === selectedId, SERVICE_TYPES[s.type]?.color || '#FF8A65') })
          .addTo(map).on('click', () => setSelectedId(s.id))
        markers.push({ id: s.id, marker: m })
      })

      mapRef.current = { map, markers, makeIcon }
    })()

    return () => {
      cancelled = true
      if (mapRef.current?.map) {
        mapRef.current.map.remove()
        mapRef.current = null
      }
    }
  }, [view, filter, query])

  useEffect(() => {
    if (!mapRef.current) return
    const { markers, makeIcon, map } = mapRef.current
    markers.forEach(({ id, marker }) => {
      const sv = SERVICES.find(s => s.id === id)
      marker.setIcon(makeIcon(id === selectedId, SERVICE_TYPES[sv?.type]?.color || '#FF8A65'))
    })
    const sel = SERVICES.find(s => s.id === selectedId)
    if (sel && map) map.flyTo(sel.coords, 14, { duration: 0.5 })
  }, [selectedId])

  const selected = SERVICES.find(s => s.id === selectedId)

  return (
    <div className="flex flex-col min-h-[760px] bg-brand-cream overflow-hidden">
      {/* Header — search + view toggle */}
      <div className="bg-white pt-5 pb-3 px-5 shadow-card" style={{ borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}>
        <p className="font-display text-h1 text-slate-700">{t('nearby.title')}</p>
        <p className="text-[13px] font-semibold text-slate-500 mt-0.5">{t('nearby.subtitle')}</p>
        <div className="mt-3 flex gap-2">
          <Input
            type="text"
            placeholder={t('nearby.search')}
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 rounded-2xl"
          />
          <div className="flex bg-slate-100 rounded-2xl p-1">
            {['map', 'list'].map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  'px-3 py-1.5 rounded-xl text-[12px] font-extrabold transition-all',
                  view === v ? 'bg-white shadow-card text-slate-700' : 'text-slate-500'
                )}
              >
                {v === 'map' ? '🗺' : '☰'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <FilterPills filters={SERVICE_FILTERS} active={filter} onChange={setFilter} />

      <div className="flex-1 overflow-y-auto scrollbar-thin pb-4">
        {view === 'map' && (
          <div ref={containerRef} className="w-full h-[260px] bg-slate-100 mx-5 my-2 rounded-3xl overflow-hidden shadow-card" />
        )}

        <p className="text-[12px] font-extrabold text-slate-500 uppercase tracking-wide px-5 pt-3 pb-2">
          {filtered.length} services
        </p>

        <div className="px-4 flex flex-col gap-2">
          {filtered.map(s => {
            const tt = SERVICE_TYPES[s.type] || SERVICE_TYPES.clinic
            const active = s.id === selectedId
            return (
              <button
                key={s.id}
                onClick={() => setSelectedId(s.id)}
                className={cn(
                  'rounded-3xl p-4 flex items-center gap-3 text-left transition-all active:scale-[0.98]',
                  active ? 'bg-white border-2 border-brand-orange shadow-card' : 'bg-white shadow-card'
                )}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-[24px]"
                  style={{ background: tt.bg }}
                >
                  {tt.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[15px] font-extrabold text-slate-700 truncate">{s.name}</p>
                    {s.open24 && (
                      <span className="text-[10px] font-extrabold bg-brand-green text-white px-1.5 py-0.5 rounded-full shrink-0">{t('nearby.open24')}</span>
                    )}
                  </div>
                  <p className="text-[12px] font-semibold text-slate-500 truncate mt-0.5">{s.address}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[12px] font-extrabold text-slate-700">⭐ {s.rating}</span>
                    <span className="text-[12px] text-slate-400">·</span>
                    <span className="text-[12px] font-semibold text-slate-500">{s.distance} km</span>
                    <span className="text-[12px] text-slate-400">·</span>
                    <span className="text-[12px] font-semibold text-slate-500">{s.hours}</span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {selected && (
          <div className="mx-4 mt-4 flex gap-2">
            <a
              href={`tel:${selected.phone}`}
              className="flex-1 bg-brand-orange text-white font-extrabold text-[14px] py-3 rounded-2xl text-center active:scale-95 transition-all shadow-card"
            >
              📞 {t('nearby.call')}
            </a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${selected.coords[0]},${selected.coords[1]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-slate-700 text-white font-extrabold text-[14px] py-3 rounded-2xl text-center active:scale-95 transition-all shadow-card"
            >
              🗺 {t('nearby.openMaps')}
            </a>
          </div>
        )}
      </div>

      <BottomNav currentScreen="nearby" navigate={navigate} />
    </div>
  )
}
