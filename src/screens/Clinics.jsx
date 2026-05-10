import { useEffect, useRef, useState } from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import Icon from '../components/Icon'
import { cn } from '../lib/utils'
import { CLINICS } from '../data/clinics'

export default function Clinics({ navigate }) {
  const mapRef     = useRef(null)
  const containerRef = useRef(null)
  const [selectedId, setSelectedId] = useState(CLINICS[0].id)

  useEffect(() => {
    let map
    let markers = []
    let cancelled = false

    ;(async () => {
      const L = (await import('leaflet')).default
      await import('leaflet/dist/leaflet.css')
      if (cancelled || !containerRef.current) return

      map = L.map(containerRef.current, {
        zoomControl: false,
        attributionControl: false,
      }).setView([-6.235, 106.82], 11)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map)

      // Custom orange pin
      const makeIcon = (active) => L.divIcon({
        className: '',
        html: `<div style="
          width:28px;height:28px;border-radius:50% 50% 50% 0;
          transform: rotate(-45deg);
          background:${active ? '#FF6B00' : '#1E40FF'};
          border:3px solid white;
          box-shadow:0 4px 8px rgba(0,0,0,0.2);
          display:flex;align-items:center;justify-content:center;
        "><span style="transform:rotate(45deg);color:white;font-weight:900;font-size:11px;">🏥</span></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
      })

      CLINICS.forEach(c => {
        const m = L.marker(c.coords, { icon: makeIcon(c.id === selectedId) })
          .addTo(map)
          .on('click', () => setSelectedId(c.id))
        markers.push({ id: c.id, marker: m })
      })

      mapRef.current = { map, markers, makeIcon, L }
    })()

    return () => {
      cancelled = true
      if (mapRef.current?.map) {
        mapRef.current.map.remove()
        mapRef.current = null
      }
    }
  }, [])

  // Update marker icons when selection changes
  useEffect(() => {
    if (!mapRef.current) return
    const { markers, makeIcon, map } = mapRef.current
    markers.forEach(({ id, marker }) => {
      marker.setIcon(makeIcon(id === selectedId))
    })
    const sel = CLINICS.find(c => c.id === selectedId)
    if (sel && map) {
      map.flyTo(sel.coords, 13, { duration: 0.6 })
    }
  }, [selectedId])

  const selected = CLINICS.find(c => c.id === selectedId)

  return (
    <div className="flex flex-col min-h-[760px] bg-white overflow-hidden">
      <StatusBar title="Klinik" />

      {/* Map */}
      <div ref={containerRef} className="w-full h-[260px] bg-slate-100 shrink-0" />

      <div className="flex-1 overflow-y-auto scrollbar-thin bg-brand-peach-lt pb-4">
        <p className="text-[12px] font-extrabold text-slate-500 uppercase tracking-[0.5px] px-5 pt-4 pb-2">
          {CLINICS.length} klinik terdekat
        </p>

        <div className="px-4 flex flex-col gap-2">
          {CLINICS.map(c => {
            const active = c.id === selectedId
            return (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className={cn(
                  'rounded-2xl p-4 flex gap-3 active:scale-[0.98] transition-all text-left border',
                  active ? 'bg-brand-orange-lt border-brand-orange shadow-card' : 'bg-white border-slate-100'
                )}
              >
                <div className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
                  active ? 'bg-brand-orange' : 'bg-brand-orange-lt'
                )}>
                  <Icon name="hospital" size={22}
                    tone={active ? 'white' : 'default'} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[14px] font-extrabold text-slate-700 truncate">{c.name}</p>
                    {c.open24 && (
                      <span className="text-[10px] font-extrabold bg-brand-green text-white px-1.5 py-0.5 rounded-full shrink-0">24h</span>
                    )}
                  </div>
                  <p className="text-[12px] font-semibold text-slate-500 truncate mt-0.5">{c.address}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-[12px] font-bold text-slate-700">⭐ {c.rating}</span>
                    <span className="text-[12px] font-semibold text-slate-500">· {c.distance} km</span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Selected actions */}
        {selected && (
          <div className="mx-4 mt-4 flex gap-2">
            <a
              href={`tel:${selected.phone}`}
              className="flex-1 bg-brand-blue text-white font-extrabold text-[14px] py-3 rounded-xl text-center active:scale-95 transition-all shadow-card"
            >
              📞 Telepon
            </a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${selected.coords[0]},${selected.coords[1]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-brand-orange text-white font-extrabold text-[14px] py-3 rounded-xl text-center active:scale-95 transition-all shadow-card"
            >
              🗺️ Buka Maps
            </a>
          </div>
        )}
      </div>

      <BottomNav currentScreen="clinics" navigate={navigate} />
    </div>
  )
}
