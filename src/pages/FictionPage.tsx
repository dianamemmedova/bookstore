import { Link } from 'react-router-dom'
import { PRIMARY, ACCENT, GOLD } from '../constants/theme'
import { BROWSE_LINKS, SUBJECTS, CUSTOMER_FAV, SPECIAL } from '../data/fiction'
import { useFictionData } from '../hooks/useFictionData'
import { CarouselSection } from '../components/shared/CarouselSection'
import { Sidebar } from '../components/shared/Sidebar'

export default function FictionPage() {
  const { data, loading } = useFictionData()

  return (
    <div className="min-h-screen bg-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 text-xs text-gray-500 flex gap-2">
        <Link to="/" className="hover:underline" style={{ color: PRIMARY }}>Ana Səhifə</Link>
        <span>›</span>
        <Link to="/books" className="hover:underline" style={{ color: PRIMARY }}>Kitablar</Link>
        <span>›</span>
        <span className="text-gray-900 font-medium">Bədii Ədəbiyyat</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-4 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Bədii Ədəbiyyat Kitabları</h1>
        <p className="text-sm text-gray-600 max-w-2xl mx-auto">
          Sevdiyiniz janrları kəşf edin.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="relative overflow-hidden rounded-lg mb-8 h-[200px] sm:h-[260px]" style={{ background: PRIMARY }}>
          {data.bannerBook?.coverUrl && (
            <img src={data.bannerBook.coverUrl} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
          )}
          <div className="relative z-10 h-full flex items-center px-4 sm:px-12 gap-4 sm:gap-8">
            {data.bannerBook?.coverUrl && (
              <img
                src={data.bannerBook.coverUrl}
                alt={data.bannerBook.title}
                className="h-28 sm:h-48 rounded shadow-2xl object-cover flex-shrink-0"
                style={{ width: 70 }}
              />
            )}
            <div className="text-white min-w-0">
              <p className="text-xs uppercase tracking-widest mb-1 sm:mb-2 opacity-70" style={{ color: ACCENT }}>
                Redaktor Seçimi
              </p>
              <h2 className="text-lg sm:text-3xl font-bold mb-2 sm:mb-3 line-clamp-2">{data.bannerBook?.title}</h2>
              <Link
                to={data.bannerBook?.id ? `/books/${data.bannerBook.id}` : '/books'}
                className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 text-sm border-2 border-white text-white rounded hover:bg-white hover:text-[#1a2e3d] transition-colors"
              >
                İNDİ AL
              </Link>
            </div>
          </div>
        </div>

        <div className="flex gap-10">
          <Sidebar sections={[
            { title: 'Bədii Ədəbiyyata Bax', links: BROWSE_LINKS },
            { title: 'Mövzular',             links: SUBJECTS     },
            { title: 'Oxucu Sevimlisi',      links: CUSTOMER_FAV },
            { title: 'Xüsusi Kolleksiyalar', links: SPECIAL      },
          ]} />

          <div className="flex-1 min-w-0">

            <CarouselSection
              title="Bədii Bestsellerlər"
              subtitle="Hamısına bax"
              seeAllTo="/books"
              books={data.bestsellers}
              loading={loading.bestsellers}
            />

            <div className="relative overflow-hidden rounded-lg mb-10 h-[140px] sm:h-[180px]" style={{ background: '#1a2e3d' }}>
              <div className="absolute inset-0 flex">
                <div className="hidden sm:flex items-center gap-1 px-4 flex-shrink-0">
                  {data.adventure.slice(0, 5).map((book, i) => (
                    <img
                      key={book.id}
                      src={book.coverUrl ?? `https://placehold.co/50x75/2e4455/9ca3af?text=K`}
                      alt=""
                      className="rounded shadow object-cover"
                      style={{ width: 48, height: i % 2 === 0 ? 72 : 64, objectFit: 'cover' }}
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/48x72/2e4455/9ca3af?text=K` }}
                    />
                  ))}
                </div>
                <div className="flex-1 flex flex-col justify-center px-4 sm:px-6">
                  <h3 className="text-base sm:text-xl font-bold text-white mb-2">
                    Macəra & Triller Dünyasına Qoşulun
                  </h3>
                  <Link
                    to="/books"
                    className="self-start inline-block px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-bold rounded hover:opacity-90 transition-opacity"
                    style={{ background: GOLD, color: '#1a2e3d' }}
                  >
                    İNDİ AL
                  </Link>
                </div>
                <div className="hidden sm:flex items-center gap-1 px-4 flex-shrink-0">
                  {data.mystery.slice(0, 5).map((book, i) => (
                    <img
                      key={book.id}
                      src={book.coverUrl ?? `https://placehold.co/50x75/2e4455/9ca3af?text=K`}
                      alt=""
                      className="rounded shadow object-cover"
                      style={{ width: 48, height: i % 2 === 0 ? 64 : 72, objectFit: 'cover' }}
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/48x72/2e4455/9ca3af?text=K` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <CarouselSection
              title="Yeni Bədii Əsərlər"
              subtitle="Hamısına bax"
              seeAllTo="/books"
              books={data.newFiction}
              loading={loading.newFiction}
            />
            <CarouselSection
              title="Macəra & Hərəkət"
              subtitle="Hamısına bax"
              seeAllTo="/books"
              books={data.adventure}
              loading={loading.adventure}
            />

            <div
              className="relative overflow-hidden rounded-lg mb-10 flex flex-col sm:flex-row items-center px-4 sm:px-10 py-4 sm:py-0 gap-4 sm:gap-8 sm:h-[200px]"
              style={{ background: '#f5f0f4' }}
            >
              {data.romance[0]?.coverUrl && (
                <img
                  src={data.romance[0].coverUrl}
                  alt={data.romance[0].title}
                  className="h-28 sm:h-44 rounded shadow-lg flex-shrink-0 object-cover"
                  style={{ width: 70 }}
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/110x176/e8e4dc/9ca3af?text=K` }}
                />
              )}
              <div className="text-center sm:text-left min-w-0">
                <p className="text-xs uppercase tracking-widest mb-1 font-bold" style={{ color: ACCENT }}>
                  Redaktor Seçimi
                </p>
                <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-1">
                  {data.romance[0]?.title ?? 'Bu Ayın Romans Seçimi'}
                </h3>
                {data.romance[0]?.authors?.[0] && (
                  <p className="text-sm text-gray-600 mb-1">{data.romance[0].authors[0]}</p>
                )}
                {data.romance[0]?.description && (
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{data.romance[0].description}</p>
                )}
                <Link
                  to={data.romance[0]?.id ? `/books/${data.romance[0].id}` : '/books'}
                  className="inline-block px-4 sm:px-5 py-1.5 sm:py-2 text-xs font-bold text-white rounded hover:opacity-90 transition-opacity"
                  style={{ background: PRIMARY }}
                >
                  ƏTRAFLI BAX
                </Link>
              </div>
            </div>

            <CarouselSection
              title="Sirr & Triller"
              subtitle="Hamısına bax"
              seeAllTo="/books"
              books={data.mystery}
              loading={loading.mystery}
            />
            <CarouselSection
              title="Romans"
              subtitle="Hamısına bax"
              seeAllTo="/books"
              books={data.romance}
              loading={loading.romance}
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