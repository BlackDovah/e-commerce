// import { Drawer, Button, Box, Group, Image, Stack, Text } from "@mantine/core";
// import { useDisclosure } from "@mantine/hooks";
// import { ProductDetailsAndPurchaseProps, CartItem } from "@/types/types";
// import { useProduct } from "../Contexts/ProductContext";

// export function Cart({ book }: ProductDetailsAndPurchaseProps) {
//   const [opened, { open, close }] = useDisclosure();
//   const { setSelectedProduct, cartItems, setCartItems } = useProduct();

//   const addToCart = () => {
//     setSelectedProduct(book);
//     const existingItem = cartItems.find((item) => item.ID === book.ID);

//     if (existingItem) {
//       const updatedItems = cartItems.map((item) =>
//         item.ID === book.ID ? { ...item, quantity: item.quantity + 1 } : item,
//       );
//       setCartItems(updatedItems);
//     } else {
//       setCartItems([...cartItems, { ...book, quantity: 1 } as CartItem]);
//     }
//     open();
//   };

//   const removeFromCart = (ID: string) => {
//     const updatedItems = cartItems.filter((item: CartItem) => item.ID !== ID);
//     setCartItems(updatedItems);
//   };

//   const total = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0,
//   );

//   return (
//     <>
//       <Button onClick={addToCart}>Add to cart</Button>

//       <Drawer
//         position="right"
//         opened={opened}
//         onClose={close}
//         title="Shopping Cart"
//         padding="xl"
//         size="35%"
//       >
//         <Stack gap="md">
//           {cartItems.map((item) => (
//             <Group key={item.ID} justify="space-between" className="w-full">
//               <Group>
//                 <Image
//                   src={item.image}
//                   alt={item.title}
//                   fit="contain"
//                   className="w-[40px] h-[65px]"
//                 />
//                 <Box>
//                   <Text size="sm">{item.title}</Text>
//                   <Text size="xs" c="dimmed">
//                     Quantity: {item.quantity}
//                   </Text>
//                   <Text size="sm">${item.price}</Text>
//                 </Box>
//               </Group>
//               <Button color="red" onClick={() => removeFromCart(item.ID)}>
//                 Remove
//               </Button>
//             </Group>
//           ))}

//           {cartItems.length > 0 ? (
//             <Box className="mt-auto">
//               <Text size="lg" fw={700}>
//                 Total: ${total.toFixed(2)}
//               </Text>
//               <Button fullWidth className="mt-4">
//                 Checkout
//               </Button>
//             </Box>
//           ) : (
//             <Text ta="center">Your cart is empty</Text>
//           )}
//         </Stack>
//       </Drawer>
//     </>
//   );
// }
