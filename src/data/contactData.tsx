import type { ContactInfoItem, WorkingHourItem, SocialLinkItem } from '../types/contact'

export const CONTACT_INFO_ITEMS: ContactInfoItem[] = [
  {
    label: 'Email',
    value: 'info@bookstore.az',
    sub: '24/7 cavab',
    icon: (
      <svg className="w-5 h-5 text-[#3d5a6b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
  },
  {
    label: 'Telefon',
    value: '+994 12 345 67 89',
    sub: 'B.ertəsi – Cümə (09:00–18:00)',
    icon: (
      <svg className="w-5 h-5 text-[#3d5a6b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
      </svg>
    ),
  },
  {
    label: 'Ünvan',
    value: 'Bakı, Azərbaycan',
    sub: 'Nizami küç., 25',
    icon: (
      <svg className="w-5 h-5 text-[#3d5a6b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
  },
]

export const WORKING_HOURS: WorkingHourItem[] = [
  { day: 'Bazar ertəsi – Cümə', hours: '09:00 – 18:00' },
  { day: 'Şənbə', hours: '10:00 – 14:00' },
  { day: 'Bazar', hours: 'İstirahət', isOff: true },
]

export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    label: 'Facebook',
    href: '#',
    color: '#1877f2',
    bgColor: '#1877f2',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    color: '#e4405f',
    bgColor: '#e4405f',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'Telegram',
    href: '#',
    color: '#0088cc',
    bgColor: '#0088cc',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21.93 3.24a1.5 1.5 0 00-1.55-.22L2.89 10.43a1.5 1.5 0 00.06 2.79l3.7 1.28 1.82 5.47a1 1 0 001.7.37l2.44-2.44 4.07 3a1.5 1.5 0 002.3-.9l3-14.5a1.5 1.5 0 00-.05-.76zM10.06 15.4l-.75 2.27-.9-2.7 8.62-7.47z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    color: '#0a66c2',
    bgColor: '#0a66c2',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"/>
      </svg>
    ),
  },
]

export const FAQ_ITEMS = [
  { q: 'Kitabı necə sifariş edə bilərəm?', a: 'İstədiyiniz kitabı səbətə əlavə edib, ödəniş etdikdən sonra sifarişiniz qəbul olunacaq.' },
  { q: 'Çatdırılma nə qədər çəkir?', a: 'Bakı daxilində 1-3 iş günü, regionlarda 3-5 iş günü çəkir.' },
  { q: 'Hansı ödəniş üsulları var?', a: 'Kart ilə, nağd və hissə-hissə ödəniş imkanı mövcuddur.' },
]