import type { BookReview } from '../types/review'

export const sampleReviews: BookReview[] = [
  { id: 1, user: 'Əli M.', location: 'Bakı, AZ', reviewCount: 5, voteCount: 12, rating: 5, time: '1 həftə əvvəl', title: 'Möhtəşəm əsər!', body: 'Bu kitabı oxumaq həqiqətən möhtəşəm bir təcrübə oldu.', recommended: true, helpful: { yes: 8, no: 1 } },
  { id: 2, user: 'Nigar K.', location: 'Gəncə, AZ', reviewCount: 13, voteCount: 34, rating: 4, time: '2 həftə əvvəl', title: 'Çox sürükləyici hekayə', body: 'Kitabı bir nəfəsdə oxudum. Süjet gözlənilməz dönüşlərlə doludur.', recommended: true, helpful: { yes: 21, no: 3 } },
  { id: 3, user: 'Rauf T.', location: 'Sumqayıt, AZ', reviewCount: 2, voteCount: 5, rating: 3, time: '1 ay əvvəl', title: 'Orta səviyyəli', body: 'Kitab pis deyil amma gözlədiyim qədər yaxşı da çıxmadı.', recommended: false, helpful: { yes: 2, no: 1 } },
]
