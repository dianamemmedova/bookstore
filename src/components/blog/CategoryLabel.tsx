export function CategoryLabel({ label }: { label: string }) {
  return (
    <span className="inline-block text-[10px] font-bold tracking-widest text-[#3d5a6b] uppercase mb-1.5 border-b border-[#3d5a6b]/30 pb-0.5">
      {label}
    </span>
  )
}