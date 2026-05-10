import { useState } from 'react'
import { cn } from './lib/utils'
import useLocalStorage from './hooks/useLocalStorage'
import Onboarding from './screens/Onboarding'
import Dashboard from './screens/Dashboard'
import PetBook from './screens/PetBook'
import AddVaccine from './screens/AddVaccine'
import Reminders from './screens/Reminders'
import Articles from './screens/Articles'
import Clinics from './screens/Clinics'
import Settings from './screens/Settings'
import Login from './screens/Login'
import Register from './screens/Register'
import ForgotPassword from './screens/ForgotPassword'

const TABS = [
  ['login',          'Login'],
  ['register',       'Register'],
  ['forgot-password','Forgot PW'],
  ['onboarding',     'Onboarding'],
  ['dashboard',      'Beranda'],
  ['pet-book',       'Buku Anabul'],
  ['addvaccine',     'Catat'],
  ['reminders',      'Pengingat'],
  ['articles',       'Artikel'],
  ['clinics',        'Klinik'],
  ['settings',       'Setting'],
]

export default function App() {
  const [currentScreen, setCurrentScreen]   = useState('login')
  const [pets, setPets]                     = useLocalStorage('anaboo_pets', [])
  const [currentPetId, setCurrentPetId]     = useLocalStorage('anaboo_current_pet', null)
  const [records, setRecords]               = useLocalStorage('anaboo_records', [])

  const currentPet = pets.find(p => p.id === currentPetId) || null

  const navigate = (screen) => {
    // First-time onboarding gate: after auth, if no pets, force onboarding-new
    if (screen === 'dashboard' && pets.length === 0) {
      setCurrentScreen('onboarding-new')
      return
    }
    setCurrentScreen(screen)
  }

  const savePet = (data) => setPets(prev => prev.map(p => p.id === currentPetId ? { ...p, ...data } : p))
  const addPet  = (data) => {
    const id = Date.now().toString()
    setPets(prev => [...prev, { id, ...data }])
    setCurrentPetId(id)
  }
  const switchPet = (id) => setCurrentPetId(id)
  const addRecord = (record) => setRecords(prev => [
    ...prev,
    { ...record, id: Date.now().toString() + Math.random(), petId: currentPetId },
  ])

  const isNewPet     = currentScreen === 'onboarding-new'
  const isFirstTime  = isNewPet && pets.length === 0

  const screenProps = {
    navigate,
    petData: currentPet,
    pets,
    currentPetId,
    allRecords: records,
    addRecord,
    savePet,
    addPet,
    switchPet,
  }

  return (
    <div className="bg-[#0F172A] min-h-screen flex flex-col items-center py-7 px-4 pb-16 gap-5 font-body">
      <h1 className="font-display text-[1.75rem] text-white/90 tracking-wide text-center">
        🐾 <img src="/anaboo-logo.svg" alt="Anaboo" className="inline h-7 align-middle" />
      </h1>

      {/* Dev tab bar */}
      <div className="flex gap-1.5 flex-wrap justify-center max-w-[700px]">
        {TABS.map(([id, label]) => (
          <button
            key={id}
            onClick={() => setCurrentScreen(id)}
            className={cn(
              'rounded-full px-3.5 py-1.5 text-[12px] font-bold border transition-all',
              currentScreen === id
                ? 'bg-brand-orange/20 border-brand-orange/60 text-brand-orange'
                : 'bg-white/5 border-white/10 text-white/40 hover:text-white/60'
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Phone frame */}
      <div className="w-[375px] rounded-[48px] overflow-hidden relative shrink-0 bg-white">
        {currentScreen === 'login'           && <Login           navigate={navigate} />}
        {currentScreen === 'register'        && <Register        navigate={navigate} />}
        {currentScreen === 'forgot-password' && <ForgotPassword  navigate={navigate} />}
        {(currentScreen === 'onboarding' || isNewPet) && (
          <Onboarding {...screenProps} mode={isNewPet ? 'new' : 'edit'} firstTime={isFirstTime} />
        )}
        {currentScreen === 'dashboard'  && <Dashboard  {...screenProps} />}
        {currentScreen === 'pet-book'   && <PetBook    {...screenProps} />}
        {currentScreen === 'addvaccine' && <AddVaccine {...screenProps} />}
        {currentScreen === 'reminders'  && <Reminders  {...screenProps} />}
        {currentScreen === 'articles'   && <Articles   {...screenProps} />}
        {currentScreen === 'clinics'    && <Clinics    {...screenProps} />}
        {currentScreen === 'settings'   && <Settings   {...screenProps} />}
      </div>
    </div>
  )
}
