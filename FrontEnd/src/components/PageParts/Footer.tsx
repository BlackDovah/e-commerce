import {
  Container,
  Group,
  ActionIcon,
  rem,
  Text,
  Stack,
  Image,
} from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  return (
    <div className="bg-[#E07B88] text-white">
      <Container size="xl">
        <div>
          <Group className="justify-between">
            <Stack className="justify-start w-[25%] pt-20">
              <Image
                src="/images/shopping-cart-with-dollar-sign-5399ld.png"
                alt="logo"
                className="w-40"
              />
              <Text className="w-auto">{t("footer.description")}</Text>
              <Text className="font-bold">{t("footer.request")}</Text>
              <Group gap={6} wrap="nowrap">
                <ActionIcon
                  size="xl"
                  color="#ffffff4D"
                  variant="filled"
                  radius="xl"
                >
                  <IconBrandTwitter
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                  />
                </ActionIcon>
                <ActionIcon
                  size="xl"
                  color="#ffffff4D"
                  variant="filled"
                  radius="xl"
                >
                  <IconBrandYoutube
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                  />
                </ActionIcon>
                <ActionIcon
                  size="xl"
                  color="#ffffff4D"
                  variant="filled"
                  radius="xl"
                >
                  <IconBrandInstagram
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                  />
                </ActionIcon>
              </Group>
              <Text>{t("footer.copyright")}</Text>
            </Stack>
            <Stack className="justify-center">
              <Text className="font-bold text-xl">
                {t("footer.quickLinks.title")}
              </Text>
              <Text>{t("footer.quickLinks.trackYourOrder")}</Text>
              <Text>{t("footer.quickLinks.refund&ReturnsPolicy")}</Text>
              <Text>{t("footer.quickLinks.terms&Conditions")}</Text>
              <Text>{t("footer.quickLinks.privacyPolicy")}</Text>
            </Stack>
            <Stack className="justify-center">
              <Text className="font-bold text-xl">
                {t("footer.products.title")}
              </Text>
              <Text>{t("footer.products.product1")}</Text>{" "}
              <Text>{t("footer.products.product2")}</Text>
              <Text>{t("footer.products.product3")}</Text>
            </Stack>
            <Stack className="justify-center">
              <Text className="font-bold text-xl">
                {t("footer.contactUs.title")}
              </Text>
              <Text>{t("footer.contactUs.address")}</Text>
              <Text>{t("footer.contactUs.internalPhone")}</Text>
              <Text>{t("footer.contactUs.externalPhone")}</Text>
              <Text>{t("footer.contactUs.email")}</Text>
            </Stack>
          </Group>
        </div>
      </Container>
    </div>
  );
}
