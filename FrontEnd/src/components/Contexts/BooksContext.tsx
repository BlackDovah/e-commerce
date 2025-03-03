import { createContext, useState, useContext } from "react";
import { BooksContextProps } from "@/types/types";

export const BooksContext = createContext<BooksContextProps | undefined>(
  undefined,
);

export const BooksContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  );
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
  const [submittedQuery, setSubmittedQuery] = useState<
    string | number | undefined
  >(undefined);
  return (
    <BooksContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        submittedQuery,
        setSubmittedQuery,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error("useBooks must be used within a BooksContextProvider");
  }
  return context;
};
