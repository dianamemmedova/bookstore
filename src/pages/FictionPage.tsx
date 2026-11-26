import { Link } from 'react-router-dom'
import { BROWSE_LINKS, SUBJECTS, CUSTOMER_FAV, SPECIAL } from '../data/fiction'
import { useFictionData } from '../hooks/useFictionData'
import { CarouselSection } from '../components/shared/CarouselSection'
import { Sidebar } from '../components/shared/Sidebar'
import Icon from '../components/ui/Icon'
import PageHero from '../components/shared/PageHero'
import FeaturedBook from '../components/shared/FeaturedBook'
import PromoStrip from '../components/shared/PromoStrip'

const covers = (list: { coverUrl: string | null }[]) => list.map((b) => b.coverUrl ?? '')

export default function FictionPage() {
  const { data, loading } = useFictionData()

  return (
    <div className="min-h-screen bg-surface">
      <PageHero
        eyebrow="Janr"
        title="Bədii Ədəbiyyat"
        subtitle="Romanlardan macəra və sirr kitablarına qədər sevdiyiniz janrları kəşf edin."
        covers={covers(data.bestsellers)}
      />

      <div className="mx-auto max-w-[1480px] px-4 pb-14 pt-4 lg:px-6">

        <nav className="mb-4 flex items-center gap-1 text-xs text-muted" aria-label="Naviqasiya">
          <Link to="/" className="hover:underline">Ana səhifə</Link>
          <Icon name="chevron_right" size={14} />
          <Link to="/books" className="hover:underline">Kitablar</Link>
          <Icon name="chevron_right" size={14} />
          <span className="font-medium text-ink">Bədii Ədəbiyyat</span>
        </nav>

        <div className="mt-5">
          <FeaturedBook book={data.bannerBook} label="Redaktor seçimi" />
        </div>

        <div className="mt-8 flex gap-8">
          <Sidebar sections={[
            { title: 'Bədii Ədəbiyyata Bax', links: BROWSE_LINKS },
            { title: 'Mövzular',             links: SUBJECTS     },
            { title: 'Oxucu Sevimlisi',      links: CUSTOMER_FAV },
            { title: 'Xüsusi Kolleksiyalar', links: SPECIAL      },
          ]} />

          <div className="min-w-0 flex-1">
            <CarouselSection
              title="Bədii Bestsellerlər"
              subtitle="Hamısına bax"
              seeAllTo="/books"
              books={data.bestsellers}
              loading={loading.bestsellers}
            />

            <PromoStrip
              title="Macəra & Triller Dünyasına Qoşulun"
              cta="İNDİ KƏŞF ET"
              leftCovers={covers(data.adventure)}
              rightCovers={covers(data.mystery)}
            />

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

            <div className="mb-8 sm:mb-10">
              <FeaturedBook book={data.romance[0]} label="Romans seçimi" />
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
    </div>
  )
}