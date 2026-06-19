import type { SectionKey } from '../services/bookService'

export interface PromoCard {
  src: string
  label: string
  to: string
}

export interface PromoBanner {
  src: string
  alt: string
  workId?: string   // Open Library work ID
}

export interface SectionConfig {
  key: SectionKey
  title: string
  seeAllQuery: string   // /books?q=... üçün
  banner?: PromoBanner
  cards?: PromoCard[]
}

export const homeSections: SectionConfig[] = [
  {
    key: 'trending',
    title: 'Ən Çox Oxunan Kitablar',
    seeAllQuery: 'trending',
    banner: {
      src: '/promo_banner.jpg',
      alt: 'Ən çox oxunan kitablar',
      workId: 'OL45804W',
    },
  },
  {
    key: 'fiction',
    title: 'Klassik Romanlar',
    seeAllQuery: 'fiction',
    cards: [
      { src: '/promo_card1.jpg', label: 'Yeni Çıxanlar',        to: '/books?q=new+fiction' },
      { src: '/promo_card2.jpg', label: 'Bestsellerlər',        to: '/books?q=bestseller' },
      { src: '/promo_card3.jpg', label: 'Hardcover Seçimlər',   to: '/books?q=hardcover+fiction' },
    ],
  },
  {
    key: 'adventure',
    title: 'Macəra & Səyahət',
    seeAllQuery: 'adventure',
    banner: {
      src: '/promo_banner2.jpg',
      alt: 'Macəra kitabları',
    },
    cards: [
      { src: '/promo2_card1.jpg', label: 'Yeni Çıxanlar',  to: '/books?q=new+adventure' },
      { src: '/promo2_card2.jpg', label: 'Bestsellerlər',  to: '/books?q=adventure+bestseller' },
      { src: '/promo2_card3.jpg', label: 'Klassiklər',     to: '/books?q=classic+adventure' },
    ],
  },
  {
    key: 'love',
    title: 'Sevgi Hekayələri',
    seeAllQuery: 'love stories',
    banner: {
      src: '/promo_banner3.jpg',
      alt: 'Sevgi hekayələri',
    },
    cards: [
      { src: '/promo2_card1.jpg', label: 'Yeni Çıxanlar',  to: '/books?q=new+romance' },
      { src: '/promo2_card2.jpg', label: 'Bestsellerlər',  to: '/books?q=romance+bestseller' },
      { src: '/promo2_card3.jpg', label: 'Klassiklər',     to: '/books?q=classic+romance' },
    ],
  },
  {
    key: 'children',
    title: 'Uşaqlar üçün Kitablar',
    seeAllQuery: 'children',
    banner: {
      src: '/promo_banner4.jpg',
      alt: 'Uşaq kitabları',
    },
    cards: [
      { src: '/promo_card1.jpg', label: 'Yeni Çıxanlar',  to: '/books?q=new+children' },
      { src: '/promo_card2.jpg', label: 'Bestsellerlər',  to: '/books?q=children+bestseller' },
      { src: '/promo_card3.jpg', label: 'Klassiklər',     to: '/books?q=classic+children' },
    ],
  },
  {
    key: 'shakespeare',
    title: 'William Shakespeare',
    seeAllQuery: 'william shakespeare',
    banner: {
      src: '/promo_banner5.jpg',
      alt: 'Shakespeare əsərləri',
    },
    cards: [
      { src: '/promo2_card1.jpg', label: 'Faciələr',   to: '/books?q=shakespeare+tragedy' },
      { src: '/promo2_card2.jpg', label: 'Komediyalar', to: '/books?q=shakespeare+comedy' },
      { src: '/promo2_card3.jpg', label: 'Sonetlər',   to: '/books?q=shakespeare+sonnets' },
    ],
  },
]