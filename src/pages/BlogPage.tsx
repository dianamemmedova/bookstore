import { Link } from 'react-router-dom'
import { useBlogData } from '../hooks/useBlogData'
import { BlogHero } from '../components/blog/BlogHero'
import { FeaturedBook } from '../components/blog/FeaturedBook'
import { TrendingSidebar } from '../components/blog/TrendingSidebar'
import { BookSection } from '../components/blog/BookSection'
import { BookOfTheMonth } from '../components/blog/BookOfTheMonth'
import { SectionTitle } from '../components/blog/SectionTitle'
import { BookCard } from '../components/blog/BookCard'
import { SkeletonCard } from '../components/blog/SkeletonCard'

function Divider() {
  return <hr className="border-t border-line my-8 sm:my-10" />
}

export default function BlogPage() {
  const {
    featured, trending, meantToBooks, springBooks,
    bookMonth, new2026, literary,
    meantLabels, springLabels, loading
  } = useBlogData()

  return (
    <div className="min-h-screen bg-surface">
      <BlogHero />

      <div className="max-w-[1480px] mx-auto px-4 lg:px-6 py-8 sm:py-10">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10">
          <div className="lg:col-span-2 flex gap-6 items-start">
            <FeaturedBook book={featured} loading={loading.featured} />
          </div>
          <TrendingSidebar books={trending} loading={loading.trending} />
        </div>

        <Divider />

        <section className="mb-0">
          <SectionTitle>Həmişə Oxumaq İstədiyiniz Kitablar</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {loading.meantTo
              ? [1,2,3].map((i) => <SkeletonCard key={i} />)
              : meantToBooks.map((book, i) => <BookCard key={book.id} book={book} label={meantLabels[i]} />)
            }
          </div>
        </section>

        <Divider />

        <section>
          <SectionTitle>Yaza Daxil Olan Oxumalar</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
            {loading.spring
              ? [1,2,3,4].map((i) => <SkeletonCard key={i} />)
              : springBooks.map((book, i) => <BookCard key={book.id} book={book} label={springLabels[i]} />)
            }
          </div>
        </section>

        <Divider />

        <BookOfTheMonth book={bookMonth} loading={loading.month} />

        <Divider />

        <BookSection title="Nə Oxuyuruq" books={new2026} loading={loading.new} cols={3} label="MAY 2026" />

        <Divider />

        <BookSection title="Sevdiyiniz Müəlliflərdən" books={literary} loading={loading.literary} cols={4} label="ƏDƏBİYYAT" />

        <Divider />

        <div className="text-center">
          <Link to="/" className="text-xs text-muted hover:text-ink hover:underline transition-colors">
            ← Ana səhifəyə qayıt
          </Link>
        </div>
      </div>
    </div>
  )
}