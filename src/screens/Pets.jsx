import { useTranslation } from 'react-i18next'
import BottomNav from '../components/BottomNav'
import EmptyState from '../components/EmptyState'
import { Button } from '../components/ui/button'
import { SPECIES_BY_ID } from '../data/species'
import { ageText } from '../lib/dates'
import { todayKey } from '../lib/dates'

export default function Pets({ navigate, pets = [], tasks = [], switchPet }) {
  const { t } = useTranslation()
  const today = todayKey()
  // last 7 days of task completion per pet
  const weekTaskCount = (petId) => tasks.filter(tk => tk.pet_id === petId && tk.is_done).length

  return (
    <div className="flex flex-col min-h-[760px] bg-brand-cream overflow-hidden">
      {/* Header with rounded bottom */}
      <div
        className="bg-white pt-6 pb-5 px-5 shadow-card"
        style={{ borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}
      >
        <div className="flex items-center justify-between">
          <p className="font-display text-h1 text-slate-700">{t('pets.title')}</p>
          <button
            onClick={() => navigate('onboarding-new')}
            className="w-11 h-11 rounded-2xl bg-brand-orange flex items-center justify-center text-white text-[22px] font-bold active:scale-95 transition-all shadow-card"
            aria-label="add pet"
          >+</button>
        </div>
        <p className="text-[13px] font-semibold text-slate-500 mt-1">{t('pets.subtitle')}</p>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 pt-5 pb-4 flex flex-col gap-3">
        {pets.length === 0 ? (
          <EmptyState
            useMascot
            variant="default"
            title="No pets yet"
            subtitle="Tap + to add your first companion"
            action={<Button onClick={() => navigate('onboarding-new')} className="w-auto px-6">Add pet</Button>}
          />
        ) : pets.map(pet => {
          const sp = SPECIES_BY_ID[pet.species] || SPECIES_BY_ID.cat
          const photo = pet.illustration || pet.photo
          const tasksDone = weekTaskCount(pet.id)

          return (
            <button
              key={pet.id}
              onClick={() => { switchPet(pet.id); navigate('pet-detail') }}
              className="bg-white rounded-3xl p-4 flex items-center gap-4 shadow-card active:scale-[0.98] transition-all text-left"
            >
              <div className="w-20 h-20 rounded-2xl bg-brand-peach overflow-hidden flex items-center justify-center shrink-0">
                {photo ? (
                  <img src={photo} alt={pet.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[44px]">{sp.emoji}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-display text-[17px] font-extrabold text-slate-700 truncate">{pet.name}</p>
                  {pet.gender && (
                    <span className="text-[14px]">{pet.gender === 'male' ? '♂️' : '♀️'}</span>
                  )}
                </div>
                <p className="text-[12px] font-semibold text-slate-500 truncate">
                  {sp.label}{pet.breed ? ` · ${pet.breed}` : ''}
                </p>
                <p className="text-[12px] font-semibold text-slate-500">
                  {ageText(pet.birthDate) ?? '–'}{pet.weight ? ` · ${pet.weight}kg` : ''}
                </p>
                <div className="flex items-center gap-1 mt-1.5">
                  <span className="text-[11px] font-extrabold bg-brand-green-lt text-brand-green-dk px-2 py-0.5 rounded-full">
                    ✓ {tasksDone} done
                  </span>
                </div>
              </div>
              <span className="text-slate-300 text-[18px]">›</span>
            </button>
          )
        })}
      </div>

      <BottomNav currentScreen="pets" navigate={navigate} />
    </div>
  )
}
