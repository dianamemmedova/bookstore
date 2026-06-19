export function BlogHero() {
  return (
    <section className="relative text-white overflow-hidden bg-gradient-to-br from-[#3d5a6b] via-[#2e4455] to-[#1a2e3d] py-10">
      <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-[#c9a454]/10 pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-[#c9a454]/10 pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-2">
        <p className="text-[11px] uppercase tracking-widest text-[#c9a454]/80 font-semibold">Book &amp; Store</p>
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">BookStore Oxuyur</h1>
        <p className="text-sm md:text-base opacity-65 max-w-md leading-relaxed">
          Redaktorların seçimləri, trend kitablar və aylıq tövsiyələr
        </p>
      </div>
    </section>
  )
}

// bu hisseni en sonda hamsi ucun dinamik edecem 