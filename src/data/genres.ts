export interface Genre {
  label: string        
  slug: string          // URL param: /books?genre=fiction
  query: string         // Open Library search query
  iconKey: string       // GenreNav-da SVG seçimi üçün
}

export const genres: Genre[] = [
  { label: 'Hamısı',       slug: 'all',       query: '',                  iconKey: 'all' },
  { label: 'Roman',        slug: 'fiction',   query: 'fiction',           iconKey: 'fiction' },
  { label: 'Fantastika',   slug: 'scifi',     query: 'science fiction',   iconKey: 'scifi' },
  { label: 'Detektiv',     slug: 'mystery',   query: 'detective mystery', iconKey: 'mystery' },
  { label: 'Tarix',        slug: 'history',   query: 'history',           iconKey: 'history' },
  { label: 'Elm',          slug: 'science',   query: 'science',           iconKey: 'science' },
  { label: 'Psixologiya',  slug: 'psychology',query: 'psychology',        iconKey: 'psychology' },
  { label: 'Macəra',       slug: 'adventure', query: 'adventure',         iconKey: 'adventure' },
  { label: 'Uşaq',         slug: 'children',  query: 'children',          iconKey: 'children' },
  { label: 'Bioqrafiya',   slug: 'biography', query: 'biography memoir',  iconKey: 'biography' },
  { label: 'Romantika',    slug: 'romance',   query: 'love stories romance', iconKey: 'romance' },
]

export function genreQuery(slug: string): string {
  return genres.find((g) => g.slug === slug)?.query ?? slug
}

export const navGenres = genres.filter((g) => g.slug !== 'all')

export const filterGenres = genres