import { rewardsBenefits, premiumBenefits, comparisonRows, faqs } from '../data/membership'
import FaqAccordion from '../components/shared/FaqAccordion'
import { PlanCard } from '../components/membership/PlanCard'

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
                <PlanCard
                  variant="standard"
                  badge="Standart"
                  title="Rewards"
                  price="PULSUZ"
                  priceNote="İllik ödəniş yoxdur"
                  benefits={rewardsBenefits}
                  buttonText="Rewards-a Qoşul"
                />
                <PlanCard
                  variant="premium"
                  badge="Premium"
                  title="Premium Membership"
                  price="39,99 AZN"
                  priceNote="İldə bir dəfə · Rewards daxildir"
                  benefits={premiumBenefits}
                  buttonText="Premium-a Qoşul"
                  ribbon="Tövsiyə edilir"
                />
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