import { IconShoppingCart } from "@tabler/icons-react";
import { Drawer, Button, Box, Group, Image, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CartItem } from "@/types/types";
import { useProduct } from "../Contexts/ProductContext";
import { useEffect } from "react";
import { CART_OPEN_EVENT } from "@/components/Cart/CartOpenEvents";

export function CartView() {
  const [opened, { open, close }] = useDisclosure();
  const { cartItems, setCartItems } = useProduct();

  useEffect(() => {
    const handleOpen = () => open();
    window.addEventListener(CART_OPEN_EVENT, handleOpen);
    return () => window.removeEventListener(CART_OPEN_EVENT, handleOpen);
  }, [open]);


  const removeFromCart = (ID: string) => {
    const updatedItems = cartItems.filter((item: CartItem) => item.ID !== ID);
    setCartItems(updatedItems);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Button onClick={open} className="rounded-full">
        {" "}
        <IconShoppingCart size={24} />
      </Button>

      <Drawer
        position="right"
        opened={opened}
        onClose={close}
        title="Shopping Cart"
        padding="xl"
        size="35%"
      >
        <div className="flex flex-col h-[calc(100vh-120px)]">
        <Stack gap="md" className="flex-grow overflow-auto">
          {cartItems.map((item) => (
            <Group key={item.ID} justify="space-between" className="w-full">
              <Group>
                <Image
                  src={item.image}
                  alt={item.title}
                  fit="contain"
                  className="w-[40px] h-[65px]"
                />
                <Box>
                  <Text size="sm">{item.title}</Text>
                  <Text size="xs" c="dimmed">
                    Quantity: {item.quantity}
                  </Text>
                  <Text size="sm">${item.price}</Text>
                </Box>
              </Group>
              <Button color="red" onClick={() => removeFromCart(item.ID)}>
                Remove
              </Button>
            </Group>
          ))}

          {cartItems.length > 0 ? (
            <Box className="sticky bottom-0 mt-auto">
              <Text size="lg" fw={700}>
                Total: ${total.toFixed(2)}
              </Text>
              <Button fullWidth className="mt-4">
                Checkout
              </Button>
            </Box>
          ) : (
            <Text ta="center">Your cart is empty</Text>
          )}
        </Stack>
        </div>
      </Drawer>
    </>
  );
}
