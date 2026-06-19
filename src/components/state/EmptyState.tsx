interface EmptyStateProps {
  title: string
  description: string
  emoji?: string
}

export default function EmptyState({
  title,
  description,
  emoji = '📭',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
      <span className="text-5xl">{emoji}</span>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-gray-400 text-sm max-w-xs">{description}</p>
    </div>
  )
}