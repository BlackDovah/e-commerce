import { IconShoppingCart } from "@tabler/icons-react";
import { Drawer, Button, Box, Group, Image, Stack, Text } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { CartItem } from "@/types/types";
import { useProduct } from "../Contexts/ProductContext";
import { useEffect } from "react";
import { CART_OPEN_EVENT } from "@/components/Cart/CartOpenEvents";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function CartView() {
  const { t } = useTranslation();
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
    0,
  );

  return (
    <>
      <Button
        onClick={open}
        className="rounded-full"
        styles={
          useMediaQuery("(max-width: 1279px)")
            ? () => ({
                root: {
                  backgroundColor: "white",
                },
                label: { color: "black" },
              })
            : () => ({
                root: { backgroundColor: "#B07D43" },
                label: { color: "white" },
              })
        }
      >
        {" "}
        <Box className="[1279px]:text-black">{cartItems.length}</Box>
        <IconShoppingCart size={24} />{" "}
      </Button>

      <Drawer
        position="right"
        opened={opened}
        onClose={close}
        title={t("cart.title")}
        padding="xl"
        size={useMediaQuery("(min-width: 768px)") ? "35%" : "70%"}
      >
        <div className="flex flex-col h-[calc(100vh-120px)]">
          <Stack gap="md" className="flex-grow overflow-auto">
            {cartItems.map((item) => (
              <Group key={item.ID} justify="space-between" className="w-full">
                <Link
                  to={`/product/${item.title}`}
                  className="hover:bg-gray-100 w-[70%]"
                >
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
                      {t("cart.quantity")}: {item.quantity}
                      </Text>
                      <Text size="sm">${item.price}</Text>
                    </Box>
                  </Group>
                </Link>
                <Button color="red" onClick={() => removeFromCart(item.ID)}>
                  {t("cart.remove")}
                </Button>
              </Group>
            ))}

            {cartItems.length > 0 ? (
              <Box className="sticky bottom-0 mt-auto">
                <Text size="lg" fw={700}>
                  {t("cart.total")}: ${total.toFixed(2)}
                </Text>
                <Link to="/checkout">
                  <Button fullWidth className="mt-4">
                    {t("cart.checkout")}
                  </Button>
                </Link>
              </Box>
            ) : (
              <Text ta="center">{t("cart.empty")}</Text>
            )}
          </Stack>
        </div>
      </Drawer>
    </>
  );
}
