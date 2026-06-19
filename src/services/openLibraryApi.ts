import axios from 'axios';
import type { OpenLibraryBook, Audiobook } from '../types/audioBooks';

const apiClient = axios.create({
  baseURL: 'https://openlibrary.org',
  timeout: 10000,
});

export async function searchBooks(
  query: string,
  limit: number = 12
): Promise<Audiobook[]> {
  const { data } = await apiClient.get<{ docs: OpenLibraryBook[] }>(
    '/search.json',
    {
      params: {
        q: query,
        limit,
        fields: 'key,title,author_name,cover_i,first_publish_year,subject,ia,edition_count',
      },
    }
  );

  return (data.docs ?? []).map((book) => ({
    id: book.key,
    title: book.title,
    author: book.author_name?.join(', ') || 'Müəllif məlumatı yoxdur',
    coverId: book.cover_i,
    sampleUrl: '#',
  }));
}