export interface Benefit {
  text: string
}

export interface ComparisonRow {
  benefit: string
  rewards: boolean
  premium: boolean
}

export interface FAQ {
  q: string
  a: string
}

export const rewardsBenefits: Benefit[] = [
  { text: 'Hər 10 AZN alışa 1 marka' },
  { text: '10 marka = 5 AZN mükafat' },
  { text: 'E-kitab və audiobook daxildir' },
  { text: 'Doğum günündə xüsusi sürpriz' },
  { text: 'Marka balansını istənilən vaxt yoxla' },
  { text: 'Yeni nəşrlərdən xəbərdar ol' },
  { text: 'Onlayn sifariş tarixçəsi' },
  { text: 'Üzv endirimlərindən yararlan' },
]

export const premiumBenefits: Benefit[] = [
  { text: 'Hər 10 AZN alışa 1 marka' },
  { text: '10 marka = 5 AZN mükafat' },
  { text: 'E-kitab və audiobook daxildir' },
  { text: 'Bütün kitablarda 10% endirim' },
  { text: 'Pulsuz çatdırılma (minimum yoxdur)' },
  { text: 'Ad günündə xüsusi təklif' },
  { text: 'Xüsusi nəşrlərə erkən çıxış' },
  { text: 'Eksklüziv endirimlər və təkliflər' },
  { text: 'Kafedə içki böyüdülməsi (pulsuz)' },
]

export const comparisonRows: ComparisonRow[] = [
  { benefit: 'Marka topla, mükafat qazan',        rewards: true,  premium: true },
  { benefit: 'Doğum günü sürprizi',               rewards: true,  premium: true },
  { benefit: 'Onlayn sifariş tarixçəsi',          rewards: true,  premium: true },
  { benefit: 'Üzv endirimlərindən yararlanma',    rewards: true,  premium: true },
  { benefit: 'Kitablarda 10% endirim',             rewards: false, premium: true },
  { benefit: 'Pulsuz çatdırılma',                  rewards: false, premium: true },
  { benefit: 'Ad günü təklifi',                    rewards: false, premium: true },
  { benefit: 'Eksklüziv nəşrlərə erkən çıxış',    rewards: false, premium: true },
  { benefit: 'Eksklüziv endirimlər',               rewards: false, premium: true },
  { benefit: 'Kafedə pulsuz içki böyüdülməsi',    rewards: false, premium: true },
]

export const faqs: FAQ[] = [
  {
    q: 'Rewards üzvlüyü pulsuzdur?',
    a: 'Bəli, Rewards üzvlüyü tamamilə pulsuzdur. Hesab yaradıb dərhal marka toplamağa başlaya bilərsiniz. Qeydiyyat üçün heç bir kredit kartı tələb olunmur.',
  },
  {
    q: 'Premium üzvlüyü ləğv edə bilərəm?',
    a: 'Bəli, istənilən vaxt ləğv edə bilərsiniz. Ləğvdən sonra da dövrün sonuna qədər bütün Premium üstünlüklərdən yararlanmağa davam edirsiniz. Heç bir gizli ödəniş yoxdur.',
  },
  {
    q: 'Markalar nə zaman qüvvədən düşür?',
    a: 'Markalar son alışdan 12 ay sonra qüvvədən düşür. Premium üzvlər üçün bu müddət 24 aydır. Hesabınızda marka balansınızı istənilən vaxt yoxlaya bilərsiniz.',
  },
  {
    q: 'Premium üzvlüyün qiyməti nədir?',
    a: 'Premium üzvlük aylıq 9.99 AZN və ya illik 89.99 AZN-dir. İllik planda 2 ay pulsuz əldə edirsiniz. İlk 30 gün sınaq müddəti tamamilə pulsuzdur.',
  },
  {
    q: 'Hədiyyə kartı necə istifadə edilir?',
    a: 'Hədiyyə kartınızı hesabınıza əlavə etmək üçün "Hesabım" bölməsindəki "Hədiyyə Kartı" seçiminə keçin və kartın üzərindəki kodu daxil edin. Balans dərhal hesabınıza yüklənir.',
  },
  {
    q: 'Sifarişimi necə izləyə bilərəm?',
    a: 'Sifariş verdikdən sonra email ünvanınıza izləmə linki göndərilir. Bundan əlavə "Hesabım → Sifarişlərim" bölməsindən bütün sifarişlərinizin statusunu real vaxtda izləyə bilərsiniz.',
  },
  {
    q: 'Kitabı geri qaytarmaq mümkündür?',
    a: 'Bəli, fiziki kitabları aldıqdan sonra 14 gün ərzində geri qaytara bilərsiniz. Kitab açılmamış və orijinal qablaşdırmada olmalıdır. Geri qaytarma prosesi üçün dəstək xidmətimizdə əlaqə saxlayın.',
  },
  {
    q: 'Elektron kitablar hansı cihazlarda oxunur?',
    a: 'Elektron kitablarımız iOS, Android, Windows və Mac cihazlarda oxunur. Open Library vasitəsilə təqdim olunan kitablar isə birbaşa brauzerinizdə pulsuz oxuna bilər.',
  },
]