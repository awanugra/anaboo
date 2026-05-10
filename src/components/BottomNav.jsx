import { cn } from '../lib/utils'
import Icon from './Icon'

const NAV_ITEMS = [
  { screen: 'dashboard', icon: 'home',     label: 'Beranda' },
  { screen: 'articles',  icon: 'book',     label: 'Artikel' },
  { screen: 'clinics',   icon: 'hospital', label: 'Klinik'  },
]

export default function BottomNav({ currentScreen, navigate }) {
  return (
    <div className="flex justify-around items-center px-4 pt-3 pb-7 bg-white border-t border-slate-100 flex-shrink-0">
      {NAV_ITEMS.map(({ screen, icon, label }) => {
        const active = currentScreen === screen
        return (
          <button
            key={screen}
            onClick={() => navigate(screen)}
            className={cn(
              'flex flex-col items-center gap-0.5 px-5 py-1.5 rounded-2xl cursor-pointer active:scale-95 transition-all duration-200',
              active ? 'bg-brand-orange' : ''
            )}
          >
            <Icon
              name={icon}
              size={22}
              className={cn('transition-transform duration-200', active ? 'scale-110' : 'scale-100')}
              tone={active ? 'white' : 'default'}
            />
            <span className={cn(
              'text-[12px] font-bold tracking-[0.2px] transition-colors duration-200',
              active ? 'text-white' : 'text-slate-500'
            )}>
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
