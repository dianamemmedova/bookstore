import { rewardsBenefits, premiumBenefits, comparisonRows, faqs } from '../data/membership'
import FaqAccordion from '../components/shared/FaqAccordion'

export default function MembershipPage() {

  return (
    <div className="min-h-screen bg-white">

      <section className="relative text-white overflow-hidden bg-gradient-to-br from-[#3d5a6b] via-[#2e4455] to-[#1a2e3d] min-h-[260px] sm:min-h-[340px]">
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-[#c9a454]/10" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-[#c9a454]/10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 text-center">
          <p className="text-xs uppercase tracking-widest mb-3 text-[#c9a454]/80 font-semibold">
            Book & Store
          </p>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
            Üzvlük & Mükafatlar
          </h1>
          <p className="text-sm sm:text-lg opacity-80 max-w-xl mx-auto">
            Premium üzvlüyə qoşulun — endirimlərdən, pulsuz çatdırılmadan və eksklüziv təkliflərdən yararlananın.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">

          <div className="border border-gray-200 rounded-2xl p-6 sm:p-8 flex flex-col">
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Standart</span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                Rewards
              </h2>
              <div className="flex items-end gap-1 mt-3">
                <span className="text-3xl sm:text-4xl font-bold text-gray-900">PULSUZ</span>
              </div>
              <p className="text-sm text-gray-400 mt-1">İllik ödəniş yoxdur</p>
            </div>
            <ul className="space-y-3 flex-1 mb-8">
              {rewardsBenefits.map((b) => (
                <li key={b.text} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="flex items-start gap-2">
                    <span className="text-[#2e6b4f] font-bold">✓</span>
                    {b.text}
                  </span>
                </li>
              ))}
            </ul>
            <button className="w-full py-3 rounded-xl border-2 border-[#3d5a6b] text-[#3d5a6b] font-semibold text-sm hover:bg-gray-50 transition-colors">
              Rewards-a Qoşul
            </button>
          </div>

          <div className="bg-[#3d5a6b] rounded-2xl p-6 sm:p-8 flex flex-col relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#c9a454]/10" />
            <div className="absolute top-4 sm:top-5 right-4 sm:right-5 text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2.5 sm:px-3 py-1 rounded-full bg-[#c9a454] text-white z-10">
              Tövsiyə edilir
            </div>
            <div className="mb-6 relative">
              <span className="text-xs font-semibold uppercase tracking-widest text-white/60">Premium</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Premium Membership
              </h2>
              <div className="flex items-end gap-1 mt-3">
                <span className="text-3xl sm:text-4xl font-bold text-white">39,99 AZN</span>
              </div>
              <p className="text-sm mt-1 text-white/60">İldə bir dəfə · Rewards daxildir</p>
            </div>
            <ul className="space-y-3 flex-1 mb-8 relative">
              {premiumBenefits.map((b) => (
                <li key={b.text} className="flex items-start gap-3 text-sm text-white/90">
                  <span className="flex items-start gap-2">
                    <span className="text-white font-bold">✓</span>
                    {b.text}
                  </span>
                </li>
              ))}
            </ul>
            <button className="w-full py-3 rounded-xl bg-[#c9a454] text-white font-bold text-sm hover:opacity-90 transition-opacity relative">
              Premium-a Qoşul
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-6 sm:mb-8">
          Planları Müqayisə Et
        </h2>
        <div className="border border-gray-100 rounded-2xl overflow-hidden overflow-x-auto">
          <div className="min-w-[400px]">
            <div className="grid grid-cols-3 text-center text-xs sm:text-sm font-semibold py-3 sm:py-4 px-4 sm:px-6 bg-[#3d5a6b] text-white">
              <div className="text-left">Üstünlüklər</div>
              <div>Rewards</div>
              <div>Premium</div>
            </div>
            {comparisonRows.map((row, i) => (
              <div
                key={row.benefit}
                className={`grid grid-cols-3 items-center text-xs sm:text-sm px-4 sm:px-6 py-3 sm:py-4 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              >
                <span className="text-gray-700">{row.benefit}</span>
                <div className="text-center">
                  {row.rewards
                    ? <span className="text-green-600 font-bold text-base sm:text-lg">✓</span>
                    : <span className="text-gray-300 font-bold text-base sm:text-lg">—</span>}
                </div>
                <div className="text-center">
                  {row.premium
                    ? <span className="text-[#c9a454] font-bold text-base sm:text-lg">✓</span>
                    : <span className="text-gray-300 font-bold text-base sm:text-lg">—</span>}
                </div>
              </div>
            ))}
            <div className="grid grid-cols-3 items-center px-4 sm:px-6 py-4 sm:py-5 border-t border-gray-100 bg-white">
              <span className="text-xs sm:text-sm font-semibold text-gray-700">İllik qiymət</span>
              <div className="text-center">
                <span className="font-bold text-gray-900 text-xs sm:text-base">PULSUZ</span>
              </div>
              <div className="text-center">
                <span className="font-bold text-[#3d5a6b] text-xs sm:text-base">39,99 AZN/il</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        <FaqAccordion
          items={faqs}
          defaultOpenIndex={0}
        />
      </section>

    </div>
  )
}