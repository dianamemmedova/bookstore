export interface GiftCard {
  id: number
  title: string
  sub: string
  amount: string
  colorIndex: number
}

export interface CardCategory {
  title: string
  icon: string
  cards: GiftCard[]
}

export interface TopNav {
  label: string
  icon: string
  color: string
}

export const CARD_COLORS = [
  { bg: '#1a2e3d', chip: '#c9a454', text: '#c9a454', label: 'white' },
  { bg: '#1a3d2e', chip: '#6fcf97', text: '#6fcf97', label: 'white' },
  { bg: '#2d1a3d', chip: '#bb86fc', text: '#bb86fc', label: 'white' },
  { bg: '#3d2a10', chip: '#f6c90e', text: '#f6c90e', label: 'white' },
  { bg: '#0d1f3c', chip: '#60a5fa', text: '#60a5fa', label: 'white' },
  { bg: '#3d1010', chip: '#f87171', text: '#f87171', label: 'white' },
] as const

export const topNav: TopNav[] = [
  { label: 'Fiziki Kart',    icon: 'credit-card',    color: '#c9a96e' },
  { label: 'eHədiyyə Kartı', icon: 'mail',           color: '#3d5a6b' },
  { label: 'Mağaza Kartı',   icon: 'building-store', color: '#c9a96e' },
  { label: 'Xüsusi Kart',    icon: 'gift',           color: '#3d5a6b' },
]

export const categories: CardCategory[] = [
  {
    title: 'Ən Çox Seçilənlər',
    icon: 'star',
    cards: [
      { id: 1,  title: 'Klassik Hədiyyə Kartı', sub: 'Hər məbləğ üçün',      amount: '10₼ – 500₼', colorIndex: 0 },
      { id: 2,  title: 'Doğum Günü Xüsusi',    sub: 'İsim yazıla bilər',    amount: '25₼ – 200₼', colorIndex: 1 },
      { id: 3,  title: 'Yeni İl Hədiyyəsi',     sub: 'Qış kolleksiyası',     amount: '50₼ – 300₼', colorIndex: 4 },
      { id: 4,  title: 'Sevgililer Günü',        sub: 'Sevdikləriniz üçün',   amount: '20₼ – 150₼', colorIndex: 3 },
    ],
  },
  {
    title: 'eHədiyyə Kartları',
    icon: 'mail',
    cards: [
      { id: 5,  title: 'Ani E-Kart',       sub: 'Dərhal göndərilir',   amount: '10₼ – 500₼',  colorIndex: 5 },
      { id: 6,  title: 'Korporativ E-Kart', sub: 'Şirkət hədiyyəsi',   amount: '100₼ – 1000₼', colorIndex: 0 },
      { id: 7,  title: 'Tətil E-Kartı',    sub: 'Bayramlara xüsusi',   amount: '25₼ – 250₼',  colorIndex: 2 },
      { id: 8,  title: 'Oxucu E-Kartı',    sub: 'Kitabsevərlər üçün',  amount: '15₼ – 100₼',  colorIndex: 1 },
    ],
  },
  {
    title: 'Xüsusi Mərasim Kartları',
    icon: 'confetti',
    cards: [
      { id: 9,  title: 'Toy Tebrikat Kartı', sub: 'Cütlüklər üçün',    amount: '50₼ – 500₼',  colorIndex: 4 },
      { id: 10, title: 'Məzuniyyət Kartı',   sub: 'Uğurlar diləyin',   amount: '25₼ – 200₼',  colorIndex: 2 },
      { id: 11, title: 'Yeni Ev Bərəkəti',   sub: 'Ev sahibləri üçün', amount: '30₼ – 300₼',  colorIndex: 5 },
      { id: 12, title: 'Uşaq Hədiyyəsi',     sub: 'Körpə qönçələr',    amount: '10₼ – 100₼',  colorIndex: 3 },
      { id: 13, title: 'Uşaq Hədiyyəsi',     sub: 'Körpə qönçələr',    amount: '10₼ – 100₼',  colorIndex: 5 },
    ],
  },
]