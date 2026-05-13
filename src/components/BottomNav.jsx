import { useTranslation } from 'react-i18next'
import { cn } from '../lib/utils'

// Inline SVG icons (lucide-style stroked outline)
const I = {
  home:    <path d="M3 9.5L12 2l9 7.5V20a1 1 0 01-1 1h-5v-7h-6v7H4a1 1 0 01-1-1V9.5z" />,
  paw:     <>
    <ellipse cx="6"  cy="9"  rx="2" ry="2.5"/>
    <ellipse cx="18" cy="9"  rx="2" ry="2.5"/>
    <ellipse cx="9"  cy="5"  rx="1.8" ry="2.3"/>
    <ellipse cx="15" cy="5"  rx="1.8" ry="2.3"/>
    <path d="M12 11c-3 0-6 3-6 6.5 0 2 1.5 3 3.5 3 1 0 1.7-.5 2.5-.5s1.5.5 2.5.5c2 0 3.5-1 3.5-3 0-3.5-3-6.5-6-6.5z"/>
  </>,
  check:   <>
    <rect x="3" y="3" width="18" height="18" rx="4"/>
    <path d="M9.5 13.5L7 11l-1.4 1.4 4 4 8-8L16 7l-6.5 6.5z" fill="white"/>
  </>,
  pin:     <path d="M12 2a8 8 0 00-8 8c0 5.5 8 12 8 12s8-6.5 8-12a8 8 0 00-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z" />,
  user:    <>
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8H4z"/>
  </>,
}

const NAV_ITEMS = [
  { screen: 'dashboard', icon: 'home',  key: 'home'    },
  { screen: 'pets',      icon: 'paw',   key: 'pets'    },
  { screen: 'tasks',     icon: 'check', key: 'tasks'   },
  { screen: 'nearby',    icon: 'pin',   key: 'nearby'  },
  { screen: 'profile',   icon: 'user',  key: 'profile' },
]

export default function BottomNav({ currentScreen, navigate }) {
  const { t } = useTranslation()
  return (
    <div
      className="flex justify-around items-center px-2 pt-2 pb-6 bg-white flex-shrink-0"
      style={{
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        boxShadow: '0 -4px 20px rgba(0,0,0,0.06)',
      }}
    >
      {NAV_ITEMS.map(({ screen, icon, key }) => {
        const active = currentScreen === screen
        return (
          <button
            key={screen}
            onClick={() => navigate(screen)}
            className={cn(
              'flex flex-col items-center gap-1 px-3 py-1.5 rounded-2xl transition-all duration-200 active:scale-95'
            )}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={active ? '#FF8A65' : '#BDBDBD'}
              className="transition-colors duration-200"
            >
              {I[icon]}
            </svg>
            <span
              className={cn(
                'text-[11px] font-semibold transition-colors duration-200',
                active ? 'text-brand-orange' : 'text-slate-400'
              )}
            >
              {t(`nav.${key}`)}
            </span>
          </button>
        )
      })}
    </div>
  )
}
