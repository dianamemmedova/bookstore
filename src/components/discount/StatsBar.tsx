interface StatItem {
  value: string
  label: string
}

function StatCard({ value, label }: StatItem) {
  return (
    <div className="bg-white rounded-xl shadow p-4 text-center">
      <p className="text-2xl font-bold text-red-600">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  )
}

export function StatsBar({ items }: { items: StatItem[] }) {
  return (
    <div className="grid gap-3 mt-16" style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}>
      {items.map((item) => (
        <StatCard key={item.label} {...item} />
      ))}
    </div>
  )
}