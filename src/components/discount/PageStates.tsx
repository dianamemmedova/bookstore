export function LoadingScreen({ message = 'Yüklənir...' }: { message?: string }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-surface">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-line-strong border-t-primary" />
        <p className="mt-4 text-sm text-muted">{message}</p>
      </div>
    </div>
  )
}

export function ErrorScreen({ message, onRetry = () => window.location.reload() }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-surface px-4">
      <div className="rounded-md border border-line bg-white px-8 py-8 text-center">
        <p className="text-sm text-sale">{message}</p>
        <button
          onClick={onRetry}
          className="mt-4 rounded-sm bg-primary px-5 py-2 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary-dark"
        >
          Yenidən cəhd et
        </button>
      </div>
    </div>
  )
}