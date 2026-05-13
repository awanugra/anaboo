import { cn } from '../lib/utils'
import { SPECIES_BY_ID } from '../data/species'

// Circle avatar with optional orange ring + photo / emoji fallback
export default function PetAvatar({ pet, size = 70, ringWidth = 3, ring = true, onClick, className = '' }) {
  const sp = SPECIES_BY_ID[pet?.species] || SPECIES_BY_ID.cat
  const photo = pet?.illustration || pet?.photo
  const ringStyle = ring ? { padding: ringWidth, border: `${ringWidth}px solid #FF8A65` } : {}

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn('flex flex-col items-center gap-2 active:scale-95 transition-all', className)}
    >
      <div
        className="rounded-full bg-white"
        style={{ width: size, height: size, ...ringStyle }}
      >
        <div className="w-full h-full rounded-full overflow-hidden bg-brand-peach flex items-center justify-center">
          {photo ? (
            <img src={photo} alt={pet?.name} className="w-full h-full object-cover" />
          ) : (
            <span style={{ fontSize: size * 0.5 }}>{sp.emoji}</span>
          )}
        </div>
      </div>
      {pet?.name && (
        <span className="text-[13px] font-semibold text-slate-700 truncate max-w-[80px]">{pet.name}</span>
      )}
    </button>
  )
}
