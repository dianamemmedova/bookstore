export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="w-8 h-0.5 bg-[#c9a454] rounded-full flex-shrink-0" />
      <h2 className="text-2xl font-bold text-gray-900">{children}</h2>
    </div>
  )
}