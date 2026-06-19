export interface OpenLibraryBook {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  subject?: string[];
  ia?: string[];
  edition_count?: number;
}

export interface Audiobook {
  id: string;
  title: string;
  author: string;
  coverId?: number
  sampleUrl?: string;
}

export interface StatCardProps {
  icon: string
  value: string | number
  label: string
}