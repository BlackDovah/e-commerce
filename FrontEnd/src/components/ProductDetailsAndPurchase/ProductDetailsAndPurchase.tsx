import React, { useState } from "react";
import {
  Modal,
  Paper,
  Text,
  TextInput,
  Button,
  Group,
  Stack,
  Image,
  Title,
  Select,
  LoadingOverlay,
  Alert,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconAlertCircle } from "@tabler/icons-react";
import { FormValues, ProductDetailsAndPurchaseProps } from "@/types/types";
import { useProduct } from "../Contexts/ProductContext";
import { useTranslation } from "react-i18next";

export function ProductDetailsAndPurchase({
  book,
}: ProductDetailsAndPurchaseProps) {
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { setSelectedProduct } = useProduct();

  const handleQuickPurchase = () => {
    setSelectedProduct(book);
    open();
  };

  const form = useForm<FormValues>({
    initialValues: {
      name: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      email: "",
      paymentMethod: "visa/credit card",
    },
    validate: {
      name: (value: string) =>
        value.length < 2 ? "Name must be at least 2 characters" : null,
      cardNumber: (value: string) => {
        const cleaned = value.replace(/\s/g, "");
        return cleaned.length !== 16 ? "Card number must be 16 digits" : null;
      },
      expiryMonth: (value: string) => (!value ? "Select expiry month" : null),
      expiryYear: (value: string) => (!value ? "Select expiry year" : null),
      cvv: (value: string) =>
        !/^\d{3,4}$/.test(value) ? "CVV must be 3 or 4 digits" : null,
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
      paymentMethod: (value: string) =>
        !value ? "Select payment method" : null,
    },
  });

  const handleSubmit = async (values: FormValues): Promise<void> => {
    setIsSubmitting(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Processing payment:", values);
      close();
    } catch (err) {
      setError("Payment processing failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years: string[] = Array.from({ length: 10 }, (_, i) =>
    String(currentYear + i),
  );
  const months: string[] = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0"),
  );

  const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\s/g, "");
    return cleaned.replace(/(\d{4})/g, "$1 ").trim();
  };

  return (
    <>
      <Button onClick={handleQuickPurchase} variant="filled">
        {t("paymentModal.quickPurchase")}
      </Button>

      <Modal
        opened={opened}
        onClose={close}
        title={<Title order={3}>{t("paymentModal.completeYourPurchase")}</Title>}
        size="lg"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <LoadingOverlay visible={isSubmitting} />
          <Stack gap="md">
            {/* Book Details Section */}
            <Paper shadow="xs" p="md" radius="md" withBorder>
              <Group gap="md">
                <Image
                  src={book.image}
                  alt={book.title}
                  width={100}
                  height={150}
                  fit="cover"
                  fallbackSrc="placeholder.png"
                />
                <Stack gap="xs">
                  <Title order={3}>{book.title}</Title>
                  <Text size="sm" color="dimmed">
                    {t("paymentModal.by")} {book.author}{" "}
                    <span className="italic">- {book.cover}</span>
                  </Text>
                  <Group gap="xs">
                    <Select
                      label={t("paymentModal.paymentMethod")}
                      data={[
                        {
                          value: "visa/credit card",
                          label: "visa/credit card",
                        },
                        { value: "cash", label: "cash" },
                      ]}
                      {...form.getInputProps("paymentMethod")}
                    />
                  </Group>
                </Stack>
              </Group>
            </Paper>

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
                <Title order={4}>{t("paymentModal.customerInformation")}</Title>
                <TextInput
                  label="Email"
                  placeholder="your@email.com"
                  {...form.getInputProps("email")}
                />
              </Stack>
            </Paper>

            {/* Payment Form Section */}
            <Paper shadow="xs" p="md" radius="md" withBorder>
              <Stack gap="md">
                <Title order={4}>{t("paymentModal.paymentDetails")}</Title>

                <TextInput
                  label="Name on card"
                  placeholder="Enter your full name"
                  {...form.getInputProps("name")}
                />

                <TextInput
                  label="Card number"
                  placeholder="0000 0000 0000 0000"
                  {...form.getInputProps("cardNumber")}
                  onChange={(event) => {
                    const formatted = formatCardNumber(
                      event.currentTarget.value,
                    );
                    form.setFieldValue("cardNumber", formatted);
                  }}
                  maxLength={19}
                />

                <Group grow>
                  <Group grow gap="xs">
                    <Select
                      label="Month"
                      placeholder="MM"
                      data={months}
                      {...form.getInputProps("expiryMonth")}
                    />
                    <Select
                      label="Year"
                      placeholder="YYYY"
                      data={years}
                      {...form.getInputProps("expiryYear")}
                    />
                  </Group>
                  <TextInput
                    label="CVV"
                    placeholder="123"
                    {...form.getInputProps("cvv")}
                    maxLength={4}
                  />
                </Group>

                <Button type="submit" fullWidth mt="md" loading={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Complete Purchase"}
                </Button>
              </Stack>
            </Paper>
          </Stack>
        </form>
      </Modal>
    </>
  );
}
