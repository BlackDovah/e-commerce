import { Button } from "@mantine/core";
import { ProductDetailsAndPurchaseProps, CartItem } from "@/types/types";
import { useProduct } from "../Contexts/ProductContext";
import { CART_OPEN_EVENT } from "@/components/Cart/CartOpenEvents";

export function AddToCartButton({ book }: ProductDetailsAndPurchaseProps) {
  const { setSelectedProduct, cartItems, setCartItems } = useProduct();
  const addToCart = () => {
    setSelectedProduct(book);
    const existingItem = cartItems.find((item) => item.ID === book.ID);

    if (existingItem) {
      const updatedItems = cartItems.map((item) =>
        item.ID === book.ID ? { ...item, quantity: item.quantity + 1 } : item,
      );
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { ...book, quantity: 1 } as CartItem]);
    }
    window.dispatchEvent(new Event(CART_OPEN_EVENT));
  };

  return <Button onClick={addToCart}>Add to cart</Button>;
}
