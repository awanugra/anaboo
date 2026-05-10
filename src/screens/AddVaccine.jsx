import { useState } from 'react'
import Icon from '../components/Icon'
import StatusBar from '../components/StatusBar'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { VACCINES } from '../data/vaccines'
import { cn } from '../lib/utils'

export default function AddVaccine({ navigate, petData, addRecord }) {
  const [selectedId, setSelectedId] = useState('tricat')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [clinic, setClinic] = useState('')
  const [batch, setBatch] = useState('')
  const [note, setNote] = useState('')

  const selectedVaccine = VACCINES.find(v => v.id === selectedId)

  const handleSave = () => {
    addRecord({
      vaccineId: selectedId,
      vaccineName: selectedVaccine.name,
      date, clinic, batch, note,
      status: 'done',
    })
    navigate('timeline')
  }

  return (
    <div className="flex flex-col min-h-[760px] bg-white overflow-hidden">
      <StatusBar title="Tambah Vaksin Baru" onBack={() => navigate('dashboard')} />

      <div className="flex-1 overflow-y-auto scrollbar-thin px-5 pb-6 flex flex-col gap-4">
        {/* Tip */}
        <div className="flex items-center gap-3 bg-brand-yellow/20 rounded-2xl px-4 py-3 mt-2">
          <Icon name="paw" size={34} className="animate-wiggle shrink-0" />
          <p className="text-[14px] font-semibold text-slate-700 leading-snug">
            Anaboo ingetin ya 🐾 Tiap vaksin = perlindungan ekstra buat <strong>{petData.name}</strong>. Good job!
          </p>
        </div>

        {/* Vaccine picker */}
        <div>
          <p className="text-[12px] font-extrabold uppercase tracking-[0.5px] text-slate-500 mb-2">Pilih Jenis Vaksin</p>
          <div className="rounded-2xl overflow-hidden border border-slate-100">
            {VACCINES.map((v, i) => {
              const selected = selectedId === v.id
              return (
                <div
                  key={v.id}
                  onClick={() => setSelectedId(v.id)}
                  className={cn(
                    'cursor-pointer transition-all duration-200 relative',
                    i > 0 && 'border-t border-slate-100',
                    selected ? 'bg-brand-yellow/20 border-l-4 border-l-brand-yellow' : 'bg-white border-l-4 border-l-transparent'
                  )}
                >
                  <div className="flex items-center gap-3 p-3">
                    <Icon name={v.icon} size={26} className="shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-extrabold text-slate-700">{v.name}</p>
                      <p className="text-[12px] font-semibold text-slate-500">{v.sub}</p>
                    </div>
                    <span className={cn(
                      'text-[12px] font-bold px-2 py-0.5 rounded-full',
                      v.isZoonosis ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-500'
                    )}>
                      {v.priceBadge}
                    </span>
                  </div>
                  {selected && (
                    <div className="px-3 pb-3 flex flex-col gap-2 animate-fadeUp">
                      <p className="text-[14px] font-semibold text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: v.eduDesc }} />
                      <div className="flex items-center gap-1.5">
                        <Icon name="calendar" size={14} />
                        <span className="text-[12px] font-semibold text-slate-500">{v.eduAge}</span>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-semibold text-slate-500">Tanggal Diberikan</label>
          <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-500">
            <Icon name="hospital" size={13} />
            Dokter / Klinik Hewan
          </label>
          <Input type="text" placeholder="mis. Klinik Happy Paws" value={clinic} onChange={e => setClinic(e.target.value)} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-semibold text-slate-500">Nomor Batch (opsional)</label>
          <Input type="text" placeholder="mis. RB2405" value={batch} onChange={e => setBatch(e.target.value)} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-semibold text-slate-500">Catatan Kamu</label>
          <Input type="text" placeholder="mis. Luna berani banget hari ini!" value={note} onChange={e => setNote(e.target.value)} />
        </div>

        <Button variant="pink" onClick={handleSave}>Simpan ya 🎉</Button>
      </div>
    </div>
  )
}
