import { Link } from 'react-router-dom'
import { PRIMARY, ACCENT } from '../constants/theme'
import { BROWSE_LINKS, SUBJECTS, CUSTOMER_FAV, SPECIAL } from '../data/nonfiction'
import { useNonfictionData } from '../hooks/useNonfictionData'
import { CarouselSection } from '../components/shared/CarouselSection'
import { Sidebar } from '../components/shared/Sidebar'

export default function NonfictionPage() {
  const { data, loading } = useNonfictionData()

  const {
    bestsellers, newNonfic, history,
    selfHelp, biography, paperbacks,
    bannerBook, monthPick,
  } = data

  return (
    <div className="min-h-screen bg-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 text-xs text-gray-500 flex gap-2">
        <Link to="/" className="hover:underline" style={{ color: PRIMARY }}>Ana Səhifə</Link>
        <span>›</span>
        <Link to="/books" className="hover:underline" style={{ color: PRIMARY }}>Kitablar</Link>
        <span>›</span>
        <span className="text-gray-900 font-medium">Qeyri-Bədii Ədəbiyyat</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-4 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Qeyri-Bədii Kitablar</h1>
        <p className="text-sm text-gray-600 max-w-2xl mx-auto">
          Mətbəxdən cinayət yerinə, evdən açıq dənizlərə — qeyri-bədii ədəbiyyat öyrənmək istədiyiniz
          bütün mövzuları əhatə edir.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div
          className="relative overflow-hidden rounded-lg mb-8 flex flex-col sm:flex-row items-center py-4 sm:py-0 sm:h-[200px]"
          style={{ background: '#f5f0e8' }}
        >
          <div className="hidden sm:flex items-end gap-2 px-6 h-full py-4 flex-shrink-0">
            {bestsellers.slice(0, 6).map((book, i) => (
              <img
                key={book.id}
                src={book.coverUrl ?? `https://placehold.co/60x90/e8e4dc/9ca3af?text=K`}
                alt={book.title}
                className="rounded shadow object-cover flex-shrink-0"
                style={{
                  width: 52,
                  height: i % 2 === 0 ? 80 : 70,
                  objectFit: 'cover',
                  opacity: loading.bestsellers ? 0 : 1,
                  transition: 'opacity 0.3s',
                }}
                onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/52x80/e8e4dc/9ca3af?text=K` }}
              />
            ))}
          </div>

          <div className="flex-1 px-4 sm:px-8 text-center sm:text-left">
            <p className="text-xs uppercase tracking-widest font-bold mb-1" style={{ color: ACCENT }}>
              Həmişə Oxumaq İstədiyiniz
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 leading-tight">
              Qeyri-Bədii Ədəbiyyat
            </h2>
            <Link
              to="/books"
              className="inline-block px-5 py-2 text-sm font-bold text-white rounded hover:opacity-90 transition-opacity"
              style={{ background: PRIMARY }}
            >
              İNDİ AL
            </Link>
          </div>

          {bannerBook?.coverUrl && (
            <div className="hidden md:flex px-8 flex-shrink-0 items-center gap-5">
              <img
                src={bannerBook.coverUrl}
                alt={bannerBook.title}
                className="rounded shadow-lg object-cover"
                style={{ width: 90, height: 130 }}
                onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/90x130/e8e4dc/9ca3af?text=K` }}
              />
              <div className="max-w-xs">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">May Seçimimiz</p>
                <p className="text-base font-bold text-gray-900 leading-snug mb-1">{bannerBook.title}</p>
                {bannerBook.authors?.[0] && (
                  <p className="text-sm text-gray-600 mb-2">{bannerBook.authors[0]}</p>
                )}
                <p className="text-xs text-gray-500 italic leading-snug line-clamp-2">
                  {bannerBook.description ?? 'Bu ay redaktorlarımızın ən sevdiyi seçim.'}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-10">
          <Sidebar sections={[
            { title: 'Qeyri-Bədiiyə Bax',    links: BROWSE_LINKS },
            { title: 'Qeyri-Bədii Mövzular', links: SUBJECTS     },
            { title: 'Oxucu Sevimlisi',      links: CUSTOMER_FAV },
            { title: 'Xüsusi Kolleksiyalar', links: SPECIAL      },
          ]} />

          <div className="flex-1 min-w-0">

            <CarouselSection
              title="Qeyri-Bədii Bestsellerlər"
              subtitle="Hamısına bax"
              seeAllTo="/books"
              books={bestsellers}
              loading={loading.bestsellers}
            />

            <div className="relative overflow-hidden rounded-lg mb-10 h-[140px] sm:h-[180px]" style={{ background: '#e8eef2' }}>
              <div className="absolute inset-0 flex">
                <div className="hidden sm:flex items-center gap-1 px-4 flex-shrink-0">
                  {biography.slice(0, 5).map((book, i) => (
                    <img
                      key={book.id}
                      src={book.coverUrl ?? `https://placehold.co/50x75/d4dde4/9ca3af?text=K`}
                      alt=""
                      className="rounded shadow object-cover"
                      style={{ width: 48, height: i % 2 === 0 ? 72 : 64, objectFit: 'cover' }}
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/48x72/d4dde4/9ca3af?text=K` }}
                    />
                  ))}
                </div>
                <div className="flex-1 flex flex-col justify-center px-4 sm:px-6">
                  <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2">
                    Həmişə Oxumaq İstədiyiniz Qeyri-Bədii Əsərlər
                  </h3>
                  <Link
                    to="/books"
                    className="self-start inline-block px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-white rounded hover:opacity-90 transition-opacity"
                    style={{ background: PRIMARY }}
                  >
                    İNDİ AL
                  </Link>
                </div>
                <div className="hidden sm:flex items-center gap-1 px-4 flex-shrink-0">
                  {selfHelp.slice(0, 5).map((book, i) => (
                    <img
                      key={book.id}
                      src={book.coverUrl ?? `https://placehold.co/50x75/d4dde4/9ca3af?text=K`}
                      alt=""
                      className="rounded shadow object-cover"
                      style={{ width: 48, height: i % 2 === 0 ? 64 : 72, objectFit: 'cover' }}
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/48x72/d4dde4/9ca3af?text=K` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <CarouselSection
              title="Ən Yaxşı Yeni Qeyri-Bədii"
              subtitle="Hamısına bax"
              seeAllTo="/books"
              books={newNonfic}
              loading={loading.newNonfic}
            />
            <CarouselSection
              title="Tezliklə Çıxacaq Qeyri-Bədii"
              subtitle="Hamısına bax"
              seeAllTo="/books"
              books={history}
              loading={loading.history}
            />

            <div
              className="relative overflow-hidden rounded-lg mb-10 flex flex-col sm:flex-row items-center px-4 sm:px-10 py-4 sm:py-0 gap-4 sm:gap-8 sm:h-[200px]"
              style={{ background: '#f0f4f6' }}
            >
              {monthPick?.coverUrl && (
                <img
                  src={monthPick.coverUrl}
                  alt={monthPick.title}
                  className="h-28 sm:h-44 rounded shadow-lg flex-shrink-0 object-cover"
                  style={{ width: 70 }}
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/110x176/e8e4dc/9ca3af?text=K` }}
                />
              )}
              <div className="text-center sm:text-left min-w-0">
                <p className="text-xs uppercase tracking-widest mb-1 font-bold" style={{ color: ACCENT }}>
                  B&N Kitab Klubu — Aylıq Seçim
                </p>
                <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-1">
                  {monthPick?.title ?? 'Bu Ayın Seçimi'}
                </h3>
                {monthPick?.authors?.[0] && (
                  <p className="text-sm text-gray-600 mb-1">{monthPick.authors[0]}</p>
                )}
                {monthPick?.description && (
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{monthPick.description}</p>
                )}
                <Link
                  to={monthPick?.id ? `/books/${monthPick.id}` : '/books'}
                  className="inline-block px-4 sm:px-5 py-1.5 sm:py-2 text-xs font-bold text-white rounded hover:opacity-90 transition-opacity"
                  style={{ background: PRIMARY }}
                >
                  ƏTRAFLƏ BAX
                </Link>
              </div>
            </div>

            <CarouselSection
              title="Özünüinkişaf & Münasibətlər"
              subtitle="Hamısına bax"
              seeAllTo="/books"
              books={selfHelp}
              loading={loading.selfHelp}
            />
            <CarouselSection
              title="Bioqrafiya & Xatirələr"
              subtitle="Hamısına bax"
              seeAllTo="/books"
              books={biography}
              loading={loading.biography}
            />
            <CarouselSection
              title="Ən Yaxşı Cib Kitabları"
              subtitle="Hamısına bax"
              seeAllTo="/books"
              books={paperbacks}
              loading={loading.paperbacks}
            />

          </div>
        </div>
      </div>

      <div className="text-center py-10 border-t border-gray-100 mt-10">
        <Link to="/" className="text-sm text-gray-400 hover:text-gray-600 hover:underline">
          ← Ana səhifəyə qayıt
        </Link>
      </div>
    </div>
  )
}