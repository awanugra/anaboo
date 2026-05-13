import { useState, useEffect } from 'react'
import { cn } from './lib/utils'
import useLocalStorage from './hooks/useLocalStorage'
import Onboarding from './screens/Onboarding'
import Dashboard from './screens/Dashboard'
import Pets from './screens/Pets'
import PetDetail from './screens/PetDetail'
import Tasks from './screens/Tasks'
import Nearby from './screens/Nearby'
import Profile from './screens/Profile'
import Articles from './screens/Articles'
import VetChat from './screens/VetChat'
import Login from './screens/Login'
import Register from './screens/Register'
import ForgotPassword from './screens/ForgotPassword'
import { DEFAULT_PROGRESS } from './lib/xp'
import { seedTasksForPet, spawnNextInstance } from './lib/taskScheduler'

const IS_DEV = !import.meta.env.PROD

const TABS = [
  ['login',          'Login'],
  ['register',       'Register'],
  ['forgot-password','Forgot PW'],
  ['onboarding',     'Onboarding'],
  ['dashboard',      'Home'],
  ['pets',           'Pets'],
  ['pet-detail',     'Pet'],
  ['tasks',          'Tasks'],
  ['nearby',         'Layanan'],
  ['profile',        'Profile'],
  ['articles',       'Articles'],
  ['vet-chat',       'Vet Chat'],
]

const PUBLIC_SCREENS = ['login', 'register', 'forgot-password']

export default function App() {
  const [user, setUser]           = useLocalStorage('anaboo_user', null)
  const [session, setSession]     = useLocalStorage('anaboo_session', false)
  const [pets, setPets]           = useLocalStorage('anaboo_pets', [])
  const [currentPetId, setCurrentPetId] = useLocalStorage('anaboo_current_pet', null)
  const [tasks, setTasks]         = useLocalStorage('anaboo_tasks', [])
  const [progress, setProgress]   = useLocalStorage('anaboo_progress', DEFAULT_PROGRESS)

  const initialScreen = session ? (pets.length === 0 ? 'onboarding-new' : 'dashboard') : 'login'
  const [currentScreen, setCurrentScreen] = useState(initialScreen)

  // Auth guard
  useEffect(() => {
    if (!session && !PUBLIC_SCREENS.includes(currentScreen)) {
      setCurrentScreen('login')
    }
  }, [session, currentScreen])

  // First-time pet gate
  useEffect(() => {
    if (session && pets.length === 0 && currentScreen === 'dashboard') {
      setCurrentScreen('onboarding-new')
    }
  }, [session, pets.length, currentScreen])

  const currentPet = pets.find(p => p.id === currentPetId) || null

  const navigate = (screen) => setCurrentScreen(screen)

  const login = (email) => {
    const matched = user && user.email === email.toLowerCase().trim()
    if (!matched) setUser({ email: email.toLowerCase().trim(), name: email.split('@')[0] })
    setSession(true)
    setCurrentScreen(pets.length === 0 ? 'onboarding-new' : 'dashboard')
  }
  const register = ({ name, email }) => {
    setUser({ name: name.trim(), email: email.toLowerCase().trim() })
    setSession(true)
    setCurrentScreen('onboarding-new')
  }
  const logout = () => {
    setSession(false)
    setCurrentScreen('login')
  }

  const savePet = (data) => setPets(prev => prev.map(p => p.id === currentPetId ? { ...p, ...data } : p))
  const addPet  = (data) => {
    const id = Date.now().toString()
    const newPet = { id, ...data }
    setPets(prev => [...prev, newPet])
    setCurrentPetId(id)
    // Auto-seed default tasks for this species
    const seeded = seedTasksForPet(newPet)
    if (seeded.length) setTasks(prev => [...prev, ...seeded])
  }
  const switchPet = (id) => setCurrentPetId(id)

  // Task operations
  const addTask = (task) => setTasks(prev => [
    ...prev,
    { ...task, id: Date.now().toString() + Math.random() },
  ])
  const toggleTask = (taskId) => setTasks(prev => {
    const target = prev.find(tk => tk.id === taskId)
    if (!target) return prev
    const willBeDone = !target.is_done
    const updated = prev.map(tk => tk.id === taskId ? { ...tk, is_done: willBeDone } : tk)
    // If marking a recurring task as done, spawn the next instance (only once)
    if (willBeDone && target.recurrence && target.recurrence !== 'once') {
      const alreadyHasNext = prev.some(tk => tk.id === `${target.id}-next`)
      if (!alreadyHasNext) {
        const next = spawnNextInstance({ ...target, id: `${target.id}-next` })
        if (next) return [...updated, next]
      }
    }
    return updated
  })
  const deleteTask = (taskId) => setTasks(prev => prev.filter(tk => tk.id !== taskId))

  const isNewPet    = currentScreen === 'onboarding-new'
  const isFirstTime = isNewPet && pets.length === 0

  const screenProps = {
    navigate,
    petData: currentPet,
    pets,
    currentPetId,
    tasks,
    progress,
    setProgress,
    addTask,
    toggleTask,
    deleteTask,
    savePet,
    addPet,
    switchPet,
    user,
    login,
    register,
    logout,
  }

  // Production layout: clean phone frame
  if (!IS_DEV) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center font-body">
        <div className="w-full max-w-[440px] min-h-screen bg-white relative shadow-card overflow-hidden">
          {currentScreen === 'login'           && <Login           {...screenProps} />}
          {currentScreen === 'register'        && <Register        {...screenProps} />}
          {currentScreen === 'forgot-password' && <ForgotPassword  {...screenProps} />}
          {(currentScreen === 'onboarding' || isNewPet) && (
            <Onboarding {...screenProps} mode={isNewPet ? 'new' : 'edit'} firstTime={isFirstTime} />
          )}
          {currentScreen === 'dashboard'  && <Dashboard  {...screenProps} />}
          {currentScreen === 'pets'       && <Pets       {...screenProps} />}
          {currentScreen === 'pet-detail' && <PetDetail  {...screenProps} />}
          {currentScreen === 'tasks'      && <Tasks      {...screenProps} />}
          {currentScreen === 'nearby'     && <Nearby     {...screenProps} />}
          {currentScreen === 'profile'    && <Profile    {...screenProps} />}
          {currentScreen === 'articles'   && <Articles   {...screenProps} />}
          {currentScreen === 'vet-chat'   && <VetChat    {...screenProps} />}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#0F172A] min-h-screen flex flex-col items-center py-7 px-4 pb-16 gap-5 font-body">
      <h1 className="font-display text-[1.75rem] text-white/90 tracking-wide text-center">
        🐾 <img src="/anaboo-logo.svg" alt="Anaboo" className="inline h-7 align-middle" />
      </h1>

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

      <div className="w-[375px] rounded-[48px] overflow-hidden relative shrink-0 bg-white">
        {currentScreen === 'login'           && <Login           {...screenProps} />}
        {currentScreen === 'register'        && <Register        {...screenProps} />}
        {currentScreen === 'forgot-password' && <ForgotPassword  {...screenProps} />}
        {(currentScreen === 'onboarding' || isNewPet) && (
          <Onboarding {...screenProps} mode={isNewPet ? 'new' : 'edit'} firstTime={isFirstTime} />
        )}
        {currentScreen === 'dashboard'  && <Dashboard  {...screenProps} />}
        {currentScreen === 'pets'       && <Pets       {...screenProps} />}
        {currentScreen === 'pet-detail' && <PetDetail  {...screenProps} />}
        {currentScreen === 'tasks'      && <Tasks      {...screenProps} />}
        {currentScreen === 'nearby'     && <Nearby     {...screenProps} />}
        {currentScreen === 'profile'    && <Profile    {...screenProps} />}
        {currentScreen === 'articles'   && <Articles   {...screenProps} />}
        {currentScreen === 'vet-chat'   && <VetChat    {...screenProps} />}
      </div>
    </div>
  )
}
