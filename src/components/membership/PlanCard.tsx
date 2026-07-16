import type { PlanCardProps } from "../../types/membership"

export function PlanCard({ variant, badge, title, price, priceNote, benefits, buttonText, ribbon }: PlanCardProps) {
  const isPremium = variant === 'premium'

  return (
    <div className={
      isPremium
        ? "bg-[#3d5a6b] rounded-2xl p-6 sm:p-8 flex flex-col relative overflow-hidden"
        : "border border-gray-200 rounded-2xl p-6 sm:p-8 flex flex-col"
    }>
      {isPremium && (
        <>
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#c9a454]/10" />
          {ribbon && (
            <div className="absolute top-4 sm:top-5 right-4 sm:right-5 text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2.5 sm:px-3 py-1 rounded-full bg-[#c9a454] text-white z-10">
              {ribbon}
            </div>
          )}
        </>
      )}

      <div className={`mb-6 ${isPremium ? 'relative' : ''}`}>
        <span className={`text-xs font-semibold uppercase tracking-widest ${isPremium ? 'text-white/60' : 'text-gray-400'}`}>
          {badge}
        </span>
        <h2 className={`text-xl sm:text-2xl font-bold mt-1 ${isPremium ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h2>
        <div className="flex items-end gap-1 mt-3">
          <span className={`text-3xl sm:text-4xl font-bold ${isPremium ? 'text-white' : 'text-gray-900'}`}>
            {price}
          </span>
        </div>
        <p className={`text-sm mt-1 ${isPremium ? 'text-white/60' : 'text-gray-400'}`}>
          {priceNote}
        </p>
      </div>

      <ul className={`space-y-3 flex-1 mb-8 ${isPremium ? 'relative' : ''}`}>
        {benefits.map((b) => (
          <li key={b.text} className={`flex items-start gap-3 text-sm ${isPremium ? 'text-white/90' : 'text-gray-600'}`}>
            <span className="flex items-start gap-2">
              <span className={`font-bold ${isPremium ? 'text-white' : 'text-[#2e6b4f]'}`}>✓</span>
              {b.text}
            </span>
          </li>
        ))}
      </ul>

      <button className={
        isPremium
          ? "w-full py-3 rounded-xl bg-[#c9a454] text-white font-bold text-sm hover:opacity-90 transition-opacity relative"
          : "w-full py-3 rounded-xl border-2 border-[#3d5a6b] text-[#3d5a6b] font-semibold text-sm hover:bg-gray-50 transition-colors"
      }>
        {buttonText}
      </button>
    </div>
  )
}