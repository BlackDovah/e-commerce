import { IconHeart } from "@tabler/icons-react";
import { ActionIcon, Badge, Card, Group, Image, Text } from "@mantine/core";
import classes from "./ProductDisplay.module.css";
import { ProductCardProps } from "@/types/types";
import { ProductDetailsAndPurchase } from "../ProductDetailsAndPurchase/ProductDetailsAndPurchase";
import { AddToCartButton } from "../Cart/AddToCartButton";
import { useTranslation } from "react-i18next";

export function ProductCard({
  image,
  title,
  author,
  price,
  cover,
  description,
  ID,
  onImageClick,
}: ProductCardProps) {
  const bookData = {
    image,
    title,
    author,
    price,
    cover,
    description,
    ID,
  };
  const { t } = useTranslation();

  return (
    <Card withBorder radius="md" p="md" className="h-[100%] w-[100%]">
      <Card.Section className="flex justify-center items-center">
        <button type="button" onClick={onImageClick}>
          <Image
            src={image}
            alt={title}
            className="h-[300px] w-[100%] justify-center items-center"
            loading="lazy"
          />
        </button>
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group justify="apart">
          <Text fz="lg" fw={500}>
            {title}
          </Text>
          <Badge size="sm" variant="light">
            {author}
          </Badge>
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Text mt="md" className={classes.label} c="dimmed">
          {t("productCard.price")}
        </Text>
        <Group gap={7} mt={5} className="text-[#B07D43] font-bold">
          {price}
        </Group>
      </Card.Section>

      <Group mt="xs">
        <ProductDetailsAndPurchase book={bookData} />
        <AddToCartButton book={bookData} />
        <ActionIcon variant="default" radius="md" size={36}>
          <IconHeart className={classes.like} stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
  );
}
