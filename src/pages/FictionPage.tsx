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

        <div
          className="relative overflow-hidden rounded-2xl mb-8 border border-[#ebe4d3] shadow-sm"
          style={{ background: 'linear-gradient(115deg, #f8f4ea 0%, #f3efe4 45%, #e4ecf0 100%)' }}
        >
          <div className="absolute -right-20 -top-24 w-72 h-72 rounded-full opacity-[0.12]" style={{ background: PRIMARY }} />
          <div className="absolute right-24 -bottom-16 w-40 h-40 rounded-full border-[14px] opacity-20" style={{ borderColor: GOLD }} />

          {data.bannerBook && (
            <div className="relative z-10 flex items-center justify-between gap-4 px-5 sm:px-12 py-6 sm:py-7">
              <div className="min-w-0 max-w-lg border-l-[3px] pl-4 sm:pl-6" style={{ borderColor: GOLD }}>
                <span
                  className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border"
                  style={{ color: ACCENT, borderColor: ACCENT }}
                >
                  <span aria-hidden="true">★</span> Redaktor seçimi
                </span>

                <h2 className="mt-3 text-lg sm:text-2xl font-bold text-gray-900 leading-snug line-clamp-2">
                  {data.bannerBook.title}
                </h2>
                {data.bannerBook.authors[0] && (
                  <p className="mt-1 text-xs sm:text-sm text-gray-500">
                    <span className="text-gray-400">Müəllif:</span>{' '}
                    <span className="font-medium text-gray-700">{data.bannerBook.authors[0]}</span>
                  </p>
                )}

                {data.bannerBook.subjects.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {data.bannerBook.subjects.slice(0, 3).map((s) => (
                      <span key={s} className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/70 border border-[#e3dccb] text-gray-600 capitalize">
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                {(data.bannerBook.firstPublishYear || data.bannerBook.pages || data.bannerBook.isAudiobook) && (
                  <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                    {data.bannerBook.firstPublishYear && <span>📅 {data.bannerBook.firstPublishYear}</span>}
                    {data.bannerBook.pages && <span>📄 {data.bannerBook.pages} səhifə</span>}
                    {data.bannerBook.isAudiobook && <span>🎧 Audio kitab</span>}
                  </p>
                )}

                {data.bannerBook.description && (
                  <p className="mt-3 text-xs text-gray-500 leading-relaxed line-clamp-2 hidden sm:block">
                    {data.bannerBook.description}
                  </p>
                )}

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Link
                    to={`/books/${data.bannerBook.id}`}
                    className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold tracking-wider text-white rounded-full shadow transition-all hover:shadow-md hover:-translate-y-0.5"
                    style={{ background: PRIMARY }}
                  >
                    İNDİ AL <span aria-hidden="true">→</span>
                  </Link>
                  {data.bannerBook.price != null && (
                    <p className="flex items-baseline gap-2 bg-white/80 border border-[#e3dccb] rounded-full px-4 py-1.5">
                      <span className="text-base font-bold text-gray-900">₼{data.bannerBook.price}</span>
                      {data.bannerBook.originalPrice != null && (
                        <>
                          <span className="text-xs text-gray-400 line-through">₼{data.bannerBook.originalPrice}</span>
                          <span className="text-[10px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-full">-{data.bannerBook.discountPercent}%</span>
                        </>
                      )}
                    </p>
                  )}
                </div>
              </div>

              {data.bannerBook.coverUrl && (
                <div className="relative flex-shrink-0 w-28 h-40 sm:w-72 sm:h-52">
                  {data.bestsellers.filter((b) => b.id !== data.bannerBook?.id && b.coverUrl).slice(0, 2).map((b, i) => (
                    <img
                      key={b.id}
                      src={b.coverUrl ?? ''}
                      alt=""
                      aria-hidden="true"
                      className="hidden sm:block absolute bottom-0 h-40 w-[107px] rounded object-cover shadow-lg ring-1 ring-black/5"
                      style={i === 0
                        ? { left: 6, transform: 'rotate(-10deg)', transformOrigin: 'bottom right' }
                        : { right: 6, transform: 'rotate(10deg)', transformOrigin: 'bottom left' }}
                    />
                  ))}
                  <Link
                    to={`/books/${data.bannerBook.id}`}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 block transition-transform duration-300 hover:-translate-y-1"
                  >
                    <img
                      src={data.bannerBook.coverUrl}
                      alt={data.bannerBook.title}
                      className="h-40 sm:h-52 w-[107px] sm:w-[139px] rounded object-cover shadow-2xl ring-1 ring-black/10"
                    />
                  </Link>
                </div>
              )}
            </div>
          )}
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