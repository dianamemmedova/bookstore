import { useState } from 'react'
import { Link } from 'react-router-dom'
import { categories, topNav } from '../data/giftCards'
import { CategorySection } from '../components/giftCards/CategorySection'
import { BalanceChecker } from '../components/giftCards/BalanceChecker'

import PageHero from '../components/shared/PageHero'

export default function GiftCardsPage() {
  const [selected, setSelected] = useState<Set<number>>(new Set())

  const toggleCard = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="min-h-screen bg-surface">

      <PageHero
        eyebrow="Book & Store"
        title="Hədiyyə Kartları"
        subtitle="Ailə və dostlarınıza həqiqətən istədikləri hədiyyəni verin. Poçtla və ya e-poçtla göndərilə bilər."
      >
        <a href="#" className="mt-1 w-fit border-b border-gold-light/40 pb-px text-xs text-gold-light transition-colors hover:border-gold-light">
          Hədiyyə Kartı Şərtləri və Qaydaları
        </a>
      </PageHero>

      <div className="max-w-[1100px] mx-auto px-4 lg:px-6 py-8">

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {topNav.map((nav) => (
            <button
              key={nav.label}
              className="flex flex-col items-center gap-2.5 py-4 px-3 bg-white rounded-md border border-line hover:border-[#3d5a6b] transition-colors cursor-pointer"
            >
              <span
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: nav.color + '1a' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={nav.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {nav.icon === 'credit-card' && <><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></>}
                  {nav.icon === 'mail' && <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>}
                  {nav.icon === 'building-store' && <><path d="M3 9l1-6h16l1 6" /><path d="M3 9a2 2 0 0 0 4 0m4 0a2 2 0 0 0 4 0m4 0a2 2 0 0 0 4 0" /><path d="M5 9v11h14V9" /></>}
                  {nav.icon === 'gift' && <><polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" /><line x1="12" y1="22" x2="12" y2="7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" /></>}
                </svg>
              </span>
              <span className="text-xs font-semibold text-gray-500 tracking-wide">{nav.label}</span>
            </button>
          ))}
        </div>

        {categories.map((cat) => (
          <CategorySection
            key={cat.title}
            category={cat}
            selected={selected}
            onToggle={toggleCard}
          />
        ))}

        <BalanceChecker />

        <div className="mt-8 text-center">
          <Link to="/" className="text-xs text-gray-400 hover:text-gray-600 hover:underline transition-colors">
            ← Ana səhifəyə qayıt
          </Link>
        </div>
      </div>
    </div>
  )
}