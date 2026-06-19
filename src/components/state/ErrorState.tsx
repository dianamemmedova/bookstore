interface ErrorStateProps {
  message?: string
}

export default function ErrorState({
  message = 'Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.',
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
      <span className="text-5xl">⚠️</span>
      <h3 className="text-lg font-semibold text-red-600">Xəta!</h3>
      <p className="text-gray-400 text-sm max-w-xs">{message}</p>
    </div>
  )
}