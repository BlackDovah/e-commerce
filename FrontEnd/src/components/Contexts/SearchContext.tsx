import { createContext, useContext, useState, ReactNode, useMemo } from "react";

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  submittedQuery: string | number | undefined;
  setSubmittedQuery: (query: string | number | undefined) => void;
  selectedCategory: string | undefined;
  setSelectedCategory: (category: string | undefined) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [submittedQuery, setSubmittedQuery] = useState<
    string | number | undefined
  >("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  );

  const searchState = useMemo(
    () => ({
      searchQuery,
      submittedQuery,
      selectedCategory,
      setSearchQuery,
      setSubmittedQuery,
      setSelectedCategory,
    }),
    [searchQuery, submittedQuery, selectedCategory],
  );

  return (
    <SearchContext.Provider value={searchState}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
