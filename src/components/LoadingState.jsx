// Simple loading state
export default function LoadingState({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-8 py-12">
      <div className="w-8 h-8 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
      <p className="text-[14px] font-semibold text-slate-500">{message}</p>
    </div>
  )
}
