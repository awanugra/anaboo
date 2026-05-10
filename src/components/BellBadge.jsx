import Icon from './Icon'
import { cn } from '../lib/utils'

export default function BellBadge({ count = 0, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative w-10 h-10 rounded-full bg-brand-orange-lt flex items-center justify-center active:scale-90 transition-all',
        className
      )}
    >
      <Icon name="bell" size={20} />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-brand-orange flex items-center justify-center text-[11px] font-extrabold text-white animate-badge-pop ring-2 ring-white">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </button>
  )
}
