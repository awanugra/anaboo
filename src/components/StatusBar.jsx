import Icon from './Icon'

export default function StatusBar({ title = '', onBack, rightSlot }) {
  return (
    <div className="bg-white flex items-center gap-3 px-5 py-3.5 flex-shrink-0 border-b border-slate-100">
      {onBack && (
        <button
          onClick={onBack}
          className="w-7 h-7 flex items-center justify-center active:scale-90 transition-transform shrink-0"
        >
          <Icon name="back" size={18} />
        </button>
      )}
      <p className="font-display text-[16px] font-extrabold text-slate-700 tracking-wide flex-1">{title}</p>
      {rightSlot ?? (
        <button className="w-7 h-7 flex items-center justify-center shrink-0">
          <Icon name="paw" size={18} />
        </button>
      )}
    </div>
  )
}
