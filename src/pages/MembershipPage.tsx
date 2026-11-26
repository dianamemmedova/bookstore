import { rewardsBenefits, premiumBenefits, comparisonRows, faqs } from '../data/membership'
import FaqAccordion from '../components/shared/FaqAccordion'
import { PlanCard } from '../components/membership/PlanCard'

import PageHero from '../components/shared/PageHero'

export default function MembershipPage() {

  return (
    <div className="min-h-screen bg-surface">

      <PageHero
        eyebrow="Book & Store"
        title="Üzvlük & Mükafatlar"
        subtitle="Premium üzvlüyə qoşulun — endirimlərdən, pulsuz çatdırılmadan və eksklüziv təkliflərdən yararlananın."
      />

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