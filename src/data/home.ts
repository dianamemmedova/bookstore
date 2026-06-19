import { MysteryIcon, RomanceIcon, ScifiIcon, HistoryIcon, BiographyIcon, TeensIcon, KidsIcon, ScienceIcon, AdventureIcon } from '../icons/Home'
import { MobileIcon, AudiobookIcon, BlogIcon, MembershipIcon, ClearanceIcon, GiftCardIcon, StoresIcon, AboutIcon } from '../icons/Home'


export const sliderImages = [
  { src: '/header_img2.jpg', alt: 'Promosyon 1', link: '/books?q=new+fiction' },
  { src: '/header_img3.jpg', alt: 'Promosyon 2', link: '/books?genre=fiction' },
  { src: '/header_img4.jpg', alt: 'Promosyon 3', link: '/books?genre=children' },
]

export const footerLinks = {
  'Xidmətlər': [
    { label: 'Müəllif Proqramı', to: '/authors' },
    { label: 'Toplu Sifariş', to: '/bulk-orders' },
    { label: 'Mobil Tətbiq', to: '/app' },
    { label: 'Üzvlük', to: '/membership' },
    { label: 'Hədiyyə Kartı', to: '/gift-cards' },
    { label: 'Bloq', to: '/blog' },
  ],
  'Haqqımızda': [
    { label: 'Şirkət', to: '/about' },
    { label: 'Karyera', to: '/careers' },
    { label: 'Mağazalar', to: '/stores' },
    { label: 'Mətbuat', to: '/press' },
  ],
  'Kömək': [
    { label: 'Yardım Mərkəzi', to: '/help' },
    { label: 'Çatdırılma', to: '/shipping' },
    { label: 'Qaytarma', to: '/returns' },
    { label: 'Sifariş Statusu', to: '/order-status' },
    { label: 'Əlaqə', to: '/contact' },
  ],
  'Janrlar': [
    { label: 'Kitablar', to: '/books' },
    { label: 'Bədii Ədəbiyyat', to: '/books?genre=fiction' },
    { label: 'Detektiv', to: '/books?genre=mystery' },
    { label: 'Elmi Fantastika', to: '/books?genre=scifi' },
    { label: 'Uşaq Kitabları', to: '/books?genre=children' },
    { label: 'Bioqrafiya', to: '/books?genre=biography' },
  ],
}


export const genres = [
  { label: 'MYSTERY & THRILLER', to: '/books?genre=mystery',    icon:  MysteryIcon   },
  { label: 'SCI-FI & FANTASY',   to: '/books?genre=scifi',      icon:  ScifiIcon     },
  { label: 'ROMANCE',            to: '/books?genre=romance',    icon:  RomanceIcon   },
  { label: 'HISTORY',            to: '/books?genre=history',    icon:  HistoryIcon   },
  { label: 'BIOGRAPHY & MEMOIR', to: '/books?genre=biography',  icon:  BiographyIcon },
  { label: 'TEENS & YA',         to: '/books?genre=ya',         icon:  TeensIcon     },
  { label: 'KIDS',               to: '/books?genre=children',   icon:  KidsIcon      },
  { label: 'SCIENCE',            to: '/books?genre=science',    icon:  ScienceIcon   },
  { label: 'ADVENTURE',          to: '/books?genre=adventure',  icon:  AdventureIcon },
]

export const services = [
  { label: 'Mobil Tətbiq',      to: '/app',           icon: MobileIcon     },
  { label: 'Səsli Kitablar',    to: '/audiobooks',    icon: AudiobookIcon  },
  { label: 'Bloq',              to: '/blog',          icon: BlogIcon       },
  { label: 'Üzvlük',            to: '/membership',    icon: MembershipIcon },
  { label: 'Endirimli Kitablar',to: '/clearance',     icon: ClearanceIcon  },
  { label: 'Hədiyyə Kartı',     to: '/gift-cards',    icon: GiftCardIcon   },
  { label: 'Mağazalar',         to: '/stores',        icon: StoresIcon     },
  { label: 'Haqqımızda',        to: '/about',         icon: AboutIcon      },
]

export type SectionKey = 'trending' | 'fiction' | 'adventure' | 'love' | 'children' | 'shakespeare'