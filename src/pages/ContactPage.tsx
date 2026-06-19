import SuccessModal from '../components/ui/SuccessModal'
import FaqAccordion from '../components/shared/FaqAccordion'
import { ContactInfo, WorkingHours, SocialLinks, NewsletterCard, ContactForm } from '../components/contact'
import { useContactForm } from '../hooks/useContactForm'
import { FAQ_ITEMS } from '../data/contactData'

export default function ContactPage() {
  const { isModalOpen, closeModal } = useContactForm()

  return (
    <div className="min-h-screen bg-gray-50">

      <section className="relative text-white overflow-hidden bg-gradient-to-br from-[#3d5a6b] via-[#2e4455] to-[#1a2e3d] min-h-[280px]">
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-[#c9a454]/10" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-[#c9a454]/10" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 text-center">
          <p className="text-xs uppercase tracking-widest mb-3 text-[#c9a454]/80 font-semibold">
            Book & Store
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Bizimlə Əlaqə
          </h1>
          <div className="w-16 h-0.5 bg-[#c9a454] mx-auto my-4 rounded-full" />
          <p className="text-lg opacity-80 max-w-xl mx-auto">
            Sualınız, təklifiniz və ya əməkdaşlıq üçün bizə yazın. Ən qısa zamanda geri dönüş edəcəyik.
          </p>
        </div>
      </section>

      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          
          <div className="lg:col-span-1 space-y-6">
            <ContactInfo />
            <WorkingHours />
            <SocialLinks />
            <NewsletterCard />
          </div>

  
          <div className="lg:col-span-2">
            <ContactForm />
            <div className="mt-8">
              <FaqAccordion items={FAQ_ITEMS} />
            </div>
          </div>

        </div>

        <div className="text-center mt-10 pt-6 border-t border-gray-200">
          <a href="/" className="text-sm text-gray-400 hover:text-[#3d5a6b] transition-colors inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Ana səhifəyə qayıt
          </a>
        </div>
      </div>

      <SuccessModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Mesaj göndərildi!"
        message="Mesajınız uğurla göndərildi. Ən qısa zamanda sizinlə əlaqə saxlayacağıq."
        buttonText="Bağla"
      />
    </div>
  )
}