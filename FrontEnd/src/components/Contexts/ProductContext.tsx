import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { ProductCardProps, CartItem, ProductContextType } from "@/types/types";

const ProductContext = createContext<ProductContextType>({
  selectedProduct: null,
  setSelectedProduct: () => {},
  cartItems: [],
  setCartItems: () => {},
  isCartOpen: false,
  setIsCartOpen: () => {},
});

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [selectedProduct, setSelectedProduct] =
    useState<ProductCardProps | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const productState = useMemo(
    () => ({
      selectedProduct,
      setSelectedProduct,
      cartItems,
      setCartItems,
      isCartOpen,
      setIsCartOpen,
    }),
    [selectedProduct, cartItems, isCartOpen]
  );

  return (
    <ProductContext.Provider value={productState}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProduct = () => useContext(ProductContext);
