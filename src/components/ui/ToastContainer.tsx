import { useToast } from '../../hooks/useToast'
import { icons , styles } from '../../data/toast'


export function ToastContainer({ toasts }: { toasts: ReturnType<typeof useToast>['toasts'] }) {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 items-center pointer-events-none">
      {toasts.map(t => (
        <div key={t.id}
          className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium shadow-lg animate-in fade-in slide-in-from-top-2 ${styles[t.type]}`}>
          <i className={`ti ${icons[t.type]} text-base`} aria-hidden />
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  )
}