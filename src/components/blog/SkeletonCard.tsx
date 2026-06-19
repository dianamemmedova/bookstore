export function SkeletonCard() {
  return (
    <div className="flex flex-col animate-pulse">
      <div className="w-full bg-gray-100 rounded-lg mb-3 aspect-[3/4]" />
      <div className="h-2.5 bg-gray-100 rounded w-1/3 mb-2" />
      <div className="h-4 bg-gray-100 rounded w-full mb-1" />
      <div className="h-4 bg-gray-100 rounded w-3/4" />
    </div>
  )
}