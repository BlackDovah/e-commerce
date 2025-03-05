import { createContext, useContext, useState, useEffect } from 'react';
import { ProductCardProps } from '@/types/types';
import { fetchBooks } from '@/services/api';
import { useTranslation } from 'react-i18next';

type BooksContextType = {
  books: ProductCardProps | null;
  isLoading: boolean;
  error: string | null;
};

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export function BooksProvider({ children }: { children: React.ReactNode }) {
  const [books, setBooks] = useState<ProductCardProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    setIsLoading(true);
    fetchBooks(i18n.language)
      .then((data) => {
        setBooks(data);
        setError(null);
      })
      .catch((_error) => {
        setError("Failed to load books");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [i18n.language]);

  return (
    <BooksContext.Provider value={{ books, isLoading, error }}>
      {children}
    </BooksContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error('useBooks must be used within a BooksProvider');
  }
  return context;
}
