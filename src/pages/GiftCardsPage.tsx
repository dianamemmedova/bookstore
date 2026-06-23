import { useState } from 'react'
import { Link } from 'react-router-dom'
import { categories, topNav } from '../data/giftCards'
import { CategorySection } from '../components/giftCards/CategorySection'
import { BalanceChecker } from '../components/giftCards/BalanceChecker'

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
    <div className="min-h-screen bg-white">

      <section className="relative text-white overflow-hidden bg-gradient-to-br from-[#3d5a6b] via-[#2e4455] to-[#1a2e3d] min-h-[280px]">
        <div className="absolute -top-14 -right-14 w-64 h-64 rounded-full bg-[#c9a454]/10" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-[#c9a454]/10" />
        <div className="relative max-w-4xl mx-auto px-6 py-14 text-center">
          <p className="text-xs uppercase tracking-widest mb-3 text-[#c9a454]/80 font-semibold">
            Book & Store
          </p>
          <h1 className="text-4xl font-bold mb-4">Hədiyyə Kartları</h1>
          <p className="text-lg opacity-80 max-w-xl mx-auto">
            Ailə və dostlarınıza həqiqətən istədikləri hədiyyəni verin. Poçtla və ya <br />e-poçtla göndərilə bilər.
          </p>
          <a
            href="#"
            className="inline-block mt-4 text-xs text-[#c9a454] border-b border-[#c9a454]/40 pb-px hover:border-[#c9a454] transition-colors"
          >
            Hədiyyə Kartı Şərtləri və Qaydaları
          </a>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-10">

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {topNav.map((nav) => (
            <button
              key={nav.label}
              className="flex flex-col items-center gap-2.5 py-4 px-3 bg-white rounded-2xl border border-gray-200 hover:border-[#3d5a6b] transition-colors cursor-pointer"
            >
              <span
                className="w-11 h-11 rounded-full flex items-center justify-center"
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