import { useState, useEffect } from 'react'
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

const IS_DEV = !import.meta.env.PROD

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

const PUBLIC_SCREENS = ['login', 'register', 'forgot-password']

export default function App() {
  const [user, setUser]                     = useLocalStorage('anaboo_user', null)
  const [session, setSession]               = useLocalStorage('anaboo_session', false)
  const [pets, setPets]                     = useLocalStorage('anaboo_pets', [])
  const [currentPetId, setCurrentPetId]     = useLocalStorage('anaboo_current_pet', null)
  const [records, setRecords]               = useLocalStorage('anaboo_records', [])

  // Initial screen — based on auth state
  const initialScreen = session ? (pets.length === 0 ? 'onboarding-new' : 'dashboard') : 'login'
  const [currentScreen, setCurrentScreen] = useState(initialScreen)

  // Guard: if not logged in and tries to access private screen, kick to login
  useEffect(() => {
    if (!session && !PUBLIC_SCREENS.includes(currentScreen)) {
      setCurrentScreen('login')
    }
  }, [session, currentScreen])

  // Guard: logged in but no pets — force onboarding (runs after state updates,
  // so it correctly reflects the latest pets.length without stale closures)
  useEffect(() => {
    if (session && pets.length === 0 && currentScreen === 'dashboard') {
      setCurrentScreen('onboarding-new')
    }
  }, [session, pets.length, currentScreen])

  const currentPet = pets.find(p => p.id === currentPetId) || null

  // Plain navigate — gate is handled by useEffect above, so no stale-closure issue
  const navigate = (screen) => setCurrentScreen(screen)

  // Auth
  const login = (email /*, password */) => {
    // MVP: client-side only. Trust stored user.
    // If user record matches email → welcome back. Otherwise create lightweight user record.
    const matched = user && user.email === email.toLowerCase().trim()
    if (!matched) {
      setUser({ email: email.toLowerCase().trim(), name: email.split('@')[0] })
    }
    setSession(true)
    // Existing pets → dashboard, otherwise force onboarding
    setCurrentScreen(pets.length === 0 ? 'onboarding-new' : 'dashboard')
  }
  const register = ({ name, email /*, password */ }) => {
    setUser({ name: name.trim(), email: email.toLowerCase().trim() })
    setSession(true)
    // Fresh account always goes to onboarding (first pet)
    setCurrentScreen('onboarding-new')
  }
  const logout = () => {
    setSession(false)
    setCurrentScreen('login')
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
    user,
    login,
    register,
    logout,
  }

  // Production layout: clean, just the phone frame full-bleed
  if (!IS_DEV) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center font-body">
        <div className="w-full max-w-[440px] min-h-screen bg-white relative shadow-card">
          {currentScreen === 'login'           && <Login           {...screenProps} />}
          {currentScreen === 'register'        && <Register        {...screenProps} />}
          {currentScreen === 'forgot-password' && <ForgotPassword  {...screenProps} />}
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

  // Dev layout: phone frame on dark bg + dev tab bar
  return (
    <div className="bg-[#0F172A] min-h-screen flex flex-col items-center py-7 px-4 pb-16 gap-5 font-body">
      <h1 className="font-display text-[1.75rem] text-white/90 tracking-wide text-center">
        🐾 <img src="/anaboo-logo.svg" alt="Anaboo" className="inline h-7 align-middle" />
      </h1>

      {/* Dev tab bar — only visible in development */}
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
        {currentScreen === 'login'           && <Login           {...screenProps} />}
        {currentScreen === 'register'        && <Register        {...screenProps} />}
        {currentScreen === 'forgot-password' && <ForgotPassword  {...screenProps} />}
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
