import { Link } from 'react-router-dom'
import { BROWSE_LINKS, SUBJECTS, CUSTOMER_FAV, SPECIAL } from '../data/nonfiction'
import { useNonfictionData } from '../hooks/useNonfictionData'
import { CarouselSection } from '../components/shared/CarouselSection'
import { Sidebar } from '../components/shared/Sidebar'
import Icon from '../components/ui/Icon'
import PageHero from '../components/shared/PageHero'
import FeaturedBook from '../components/shared/FeaturedBook'
import PromoStrip from '../components/shared/PromoStrip'

const covers = (list: { coverUrl: string | null }[]) => list.map((b) => b.coverUrl ?? '')

export default function NonfictionPage() {
  const { data, loading } = useNonfictionData()

  const {
    bestsellers, newNonfic, history,
    selfHelp, biography, paperbacks,
    bannerBook, monthPick,
  } = data

  return (
    <div className="min-h-screen bg-surface">
      <PageHero
        eyebrow="Janr"
        title="Qeyri-Bədii Kitablar"
        subtitle="Tarixdən bioqrafiyaya, özünüinkişafdan elmə qədər öyrənmək istədiyiniz bütün mövzular."
        covers={covers(bestsellers)}
      />

      <div className="mx-auto max-w-[1480px] px-4 pb-14 pt-4 lg:px-6">

        <nav className="mb-4 flex items-center gap-1 text-xs text-muted" aria-label="Naviqasiya">
          <Link to="/" className="hover:underline">Ana səhifə</Link>
          <Icon name="chevron_right" size={14} />
          <Link to="/books" className="hover:underline">Kitablar</Link>
          <Icon name="chevron_right" size={14} />
          <span className="font-medium text-ink">Qeyri-Bədii Ədəbiyyat</span>
        </nav>

        <div className="mt-5">
          <FeaturedBook book={bannerBook} label="Ayın seçimi" />
        </div>

        <div className="mt-8 flex gap-8">
          <Sidebar sections={[
            { title: 'Qeyri-Bədiiyə Bax',    links: BROWSE_LINKS },
            { title: 'Qeyri-Bədii Mövzular', links: SUBJECTS     },
            { title: 'Oxucu Sevimlisi',      links: CUSTOMER_FAV },
            { title: 'Xüsusi Kolleksiyalar', links: SPECIAL      },
          ]} />

          <div className="min-w-0 flex-1">
            <CarouselSection
              title="Qeyri-Bədii Bestsellerlər"
              subtitle="Hamısına bax"
              seeAllTo="/books"
              books={bestsellers}
              loading={loading.bestsellers}
            />

            <PromoStrip
              title="Həmişə Oxumaq İstədiyiniz Qeyri-Bədii Əsərlər"
              cta="İNDİ KƏŞF ET"
              leftCovers={covers(biography)}
              rightCovers={covers(selfHelp)}
            />

            <CarouselSection
              title="Ən Yaxşı Yeni Qeyri-Bədii"
              subtitle="Hamısına bax"
              seeAllTo="/books"
              books={newNonfic}
              loading={loading.newNonfic}
            />
            <CarouselSection
              title="Tarix"
              subtitle="Hamısına bax"
              seeAllTo="/books"
              books={history}
              loading={loading.history}
            />

            <div className="mb-8 sm:mb-10">
              <FeaturedBook book={monthPick} label="Kitab klubu · Aylıq seçim" />
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
    </div>
  )
}