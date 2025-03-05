import { Button } from "@mantine/core";
import { ProductDetailsAndPurchaseProps, CartItem } from "@/types/types";
import { useProduct } from "../Contexts/ProductContext";
import { useTranslation } from "react-i18next";

export function AddToCartButton({ book }: ProductDetailsAndPurchaseProps) {
  const { t } = useTranslation();
  const { setSelectedProduct, cartItems, setCartItems, setIsCartOpen } = useProduct();

  const addToCart = () => {
    setSelectedProduct(book);
    const existingItem = cartItems.find((item) => item.ID === book.ID);

    if (existingItem) {
      const updatedItems = cartItems.map((item) =>
        item.ID === book.ID ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { ...book, quantity: 1 } as CartItem]);
    }
    setIsCartOpen(true);
  };

  return <Button onClick={addToCart}>{t("cart.addToCart")}</Button>;
}
