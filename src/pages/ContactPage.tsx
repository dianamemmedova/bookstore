import FaqAccordion from '../components/shared/FaqAccordion'
import { ContactInfo, WorkingHours, SocialLinks, NewsletterCard, ContactForm } from '../components/contact'
import { FAQ_ITEMS } from '../data/contactData'

import PageHero from '../components/shared/PageHero'

export default function ContactPage() {

  return (
    <div className="min-h-screen bg-surface">

      <PageHero
        eyebrow="Book & Store"
        title="Bizimlə Əlaqə"
        subtitle="Sualınız, təklifiniz və ya əməkdaşlıq üçün bizə yazın. Ən qısa zamanda geri dönüş edəcəyik."
      />

      
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          
          <div className="lg:col-span-1 space-y-5">
            <ContactInfo />
            <WorkingHours />
            <SocialLinks />
            <NewsletterCard />
          </div>

  
          <div className="lg:col-span-2">
            <ContactForm />
            <div className="mt-6">
              <FaqAccordion items={FAQ_ITEMS} />
            </div>
          </div>

        </div>

        <div className="text-center mt-6 pt-4 border-t border-line">
          <a href="/" className="text-sm text-muted hover:text-primary transition-colors inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Ana səhifəyə qayıt
          </a>
        </div>
      </div>

    </div>
  )
}