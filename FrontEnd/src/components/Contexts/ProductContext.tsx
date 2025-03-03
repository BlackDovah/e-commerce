import { createContext, useContext, useState, useEffect } from "react";
import { ProductCardProps, CartItem, ProductContextType } from "@/types/types";



const ProductContext = createContext<ProductContextType>({
  selectedProduct: null,
  setSelectedProduct: () => {},
  cartItems: [],
  setCartItems: () => {},

});

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [selectedProduct, setSelectedProduct] =
    useState<ProductCardProps | null>(null);
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
      const savedCart = localStorage.getItem('cartItems');
      return savedCart ? JSON.parse(savedCart) : [];
    });
  
    useEffect(() => {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

  return (
    <ProductContext.Provider
      value={{ selectedProduct, setSelectedProduct, cartItems, setCartItems }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProduct = () => useContext(ProductContext);
