export interface Book {
  title: string;
  author: string;
  ISBN: string;
  image: string;
  cover?: string;
  price?: number;
  field: keyof Book;
}

export interface CategoryBooks {
  [genre: string]: {
    [id: string]: Book;
  };
}

export type BooksDisplayProps = {
  search: string | number | undefined;
  category: string | undefined;
};

export interface TextInputProps {
  searchQuery: string | number | undefined;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (search: string | number | undefined) => void;
}

export interface GenreMenuProps {
  selectedCategory: string | undefined;
  onCategorySelect: (category: string) => void;
}

export type BooksContextProps = {
  selectedCategory: string | undefined;
  setSelectedCategory: (category: string | undefined) => void;
  searchQuery: string | number | undefined;
  setSearchQuery: (value: string | undefined) => void;
  submittedQuery: string | number | undefined;
  setSubmittedQuery: (value: string | number | undefined) => void;
};

export interface CardProps {
  image: string;
  title: string;
  category: string;
}

export interface ProductDetailsAndPurchaseProps {
  book: ProductCardProps;
}

export interface FormValues {
  name: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  email: string;
  paymentMethod: "visa/credit card" | "cash";
}

export interface ProductCardProps {
  image: string;
  title: string;
  author: string;
  cover: string;
  price: number;
  description: string;
  ID: string;
  onImageClick?: () => void;
}

export interface CartItem {
  ID: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
}
