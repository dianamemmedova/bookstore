
export function LoadingScreen({ message = 'Yüklənir...' }: { message?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto" />
        <p className="mt-4 text-gray-600">{message}</p>
      </div>
    </div>
  )
}

export function ErrorScreen({message , onRetry = () => window.location.reload()}: {  message: string ,onRetry?: () => void}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center text-red-600">
        <p>{message}</p>
        <button onClick={onRetry} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Yenidən cəhd et
        </button>
      </div>
    </div>
  )
}