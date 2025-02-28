import { BillingDetails } from "@/types/types";
import { useProduct } from "../Contexts/ProductContext";
import {
  Group,
  Stack,
  Box,
  Paper,
  Text,
  TextInput,
  Button,
  Image,
  Title,
  Radio,
  LoadingOverlay,
  Alert,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { Footer } from "../PageParts/Footer";
import { Header } from "../PageParts/Header";

export function CheckOut() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [value, setValue] = useState<string>("Cash");

  const form = useForm<BillingDetails>({
    initialValues: {
      firstName: "",
      lastName: "",
      country: "",
      region: "",
      streetAddress: "",
      billingApartment: "",
      phone: "",
      email: "",
    },
    validate: {
      firstName: (value: string) =>
        !value.length ? "is a required field." : null,
      lastName: (value: string) =>
        !value.length ? "is a required field." : null,
      country: (value: string) =>
        !value.length ? "is a required field." : null,
      region: (value: string) =>
        !value.length ? "is a required field." : null,
      streetAddress: (value: string) =>
        !value.length ? "is a required field." : null,
      billingApartment: (value: string) =>
        !value.length ? "is a required field." : null,
      phone: (value: string) => (!value.length ? "is a required field." : null),
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
    },
  });

  const handleSubmit = async (values: BillingDetails): Promise<void> => {
    setIsSubmitting(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // eslint-disable-next-line no-console
      console.log("Processing payment:", values);
      close();
    } catch (err) {
      setError("Payment processing failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const { cartItems } = useProduct();
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Box>
      <Header />
      <Group className="bg-gray-100 min-h-screen justify-center items-start pt-28">
        <Box>
          <form id="checkout-form" onSubmit={form.onSubmit(handleSubmit)}>
            <LoadingOverlay visible={isSubmitting} />
            <Stack gap="md">
              {error && (
                <Alert
                  icon={<IconAlertCircle size={16} />}
                  title="Error"
                  color="red"
                >
                  {error}
                </Alert>
              )}

              {/* Customer Details */}
              <Paper shadow="xs" p="md" radius="md" withBorder>
                <Stack gap="md">
                  <Title order={4}>Billing Details</Title>
                  <Group>
                    <TextInput
                      label="First Name"
                      {...form.getInputProps("firstName")}
                    />
                    <TextInput
                      label="Last Name"
                      {...form.getInputProps("lastName")}
                    />
                  </Group>
                  <TextInput
                    label="Country"
                    {...form.getInputProps("country")}
                  />
                  <TextInput label="Region" {...form.getInputProps("region")} />
                  <TextInput
                    label="Street Address"
                    {...form.getInputProps("streetAddress")}
                  />
                  <TextInput
                    label="Billing Apartment"
                    {...form.getInputProps("billingApartment")}
                  />
                  <TextInput
                    label="Phone Number"
                    {...form.getInputProps("phone")}
                  />
                  <TextInput
                    label="Email"
                    placeholder="your@email.com"
                    {...form.getInputProps("email")}
                  />
                </Stack>
              </Paper>
            </Stack>
          </form>
        </Box>
        <Stack>
          {/* Order Details */}

          <Box>
            <Paper shadow="xs" p="md" radius="md" withBorder>
              <Title order={4} className="pb-5">
                Your Order
              </Title>
              <Stack gap="md">
                {cartItems.map((item) => (
                  <Group key={item.ID} gap="md">
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="w-[40px] h-[65px]"
                    />
                    <Stack gap="xs">
                      <Text>{item.title}</Text>
                      <Text>Quantity: {item.quantity}</Text>
                      <Text>${total.toFixed(2)}</Text>
                    </Stack>
                  </Group>
                ))}
                {/* Total */}

                <Group className="justify-between">
                  <Text size="lg" fw={700}>
                    Total:
                  </Text>
                  <Text size="xxl" fw={700} className="text-[#B07D43]">
                    ${total.toFixed(2)}
                  </Text>
                </Group>
              </Stack>
            </Paper>
          </Box>
          <Box>
            {/* Payment Form Section */}

            <Paper shadow="xs" p="md" radius="md" withBorder>
              <Stack gap="md">
                <Title order={4}>Payment Information</Title>
                <Radio.Group value={value} onChange={setValue}>
                  <Radio
                    value="Cash"
                    label="Cash on delivery."
                    description="Pay with cash upon delivery."
                  />
                  <Radio
                    value="Card"
                    label="Card."
                    description="Pay with your Credit Card."
                  />
                </Radio.Group>
                <Button
                  type="submit"
                  form="checkout-form"
                  fullWidth
                  mt="md"
                  loading={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Place Order"}
                </Button>
              </Stack>
            </Paper>
          </Box>
        </Stack>
      </Group>
      <Footer />
    </Box>
  );
}
