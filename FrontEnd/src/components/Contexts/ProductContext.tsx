import { createContext, useContext, useState } from "react";
import { ProductCardProps, CartItem } from "@/types/types";

interface ProductContextType {
  selectedProduct: ProductCardProps | null;
  setSelectedProduct: (product: ProductCardProps) => void;
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
}

const ProductContext = createContext<ProductContextType>({
  selectedProduct: null,
  setSelectedProduct: () => {},
  cartItems: [],
  setCartItems: () => {},

});

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [selectedProduct, setSelectedProduct] =
    useState<ProductCardProps | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  return (
    <ProductContext.Provider
      value={{ selectedProduct, setSelectedProduct, cartItems, setCartItems }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProduct = () => useContext(ProductContext);
