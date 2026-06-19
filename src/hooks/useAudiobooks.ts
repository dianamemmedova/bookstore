import { useState, useEffect } from 'react';
import { searchBooks } from '../services/openLibraryApi';
import type { Audiobook } from '../types/audioBooks';

const CACHE_KEY = 'openlibrary_audiobooks_60';

export function useAudiobooks(limit?: number) {
  const [books, setBooks] = useState<Audiobook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchBooks = async () => {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed: Audiobook[] = JSON.parse(cached);
          setBooks(limit ? parsed.slice(0, limit) : parsed);
          return;
        }

        const data = await searchBooks('audiobooks', 60);

        if (!controller.signal.aborted) {
          localStorage.setItem(CACHE_KEY, JSON.stringify(data));
          setBooks(limit ? data.slice(0, limit) : data);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError('Kitablar yüklənərkən xəta baş verdi');
          console.error(err);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchBooks();
    return () => controller.abort();
  }, [limit]);

  return { books, loading, error };
}