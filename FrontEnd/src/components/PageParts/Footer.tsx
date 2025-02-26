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

export function Footer() {
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
              <Text className="w-auto">
                We are dedicated to offering the best service, with high quality
                products, and low delivery times.
              </Text>
              <Text className="font-bold">Please consider following us</Text>
              <Group gap={0} wrap="nowrap">
                <ActionIcon size="lg" color="white" variant="subtle">
                  <IconBrandTwitter
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                  />
                </ActionIcon>
                <ActionIcon size="lg" color="white" variant="subtle">
                  <IconBrandYoutube
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                  />
                </ActionIcon>
                <ActionIcon size="lg" color="white" variant="subtle">
                  <IconBrandInstagram
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                  />
                </ActionIcon>
                <Text>© 2024 All rights reserved.</Text>
              </Group>
            </Stack>
            <Stack className="justify-center">
              <Text className="font-bold text-xl">Quick Links</Text>
              <Text>Track Your Order</Text>
              <Text>Refund & Returns Policy</Text>
              <Text>Terms & Conditions</Text>
              <Text>Privacy Policy</Text>
            </Stack>
            <Stack className="justify-center">
              <Text className="font-bold text-xl">Products</Text>
              <Text>Cleajour bundles</Text> <Text>Haircare</Text>
              <Text>Skincare</Text>
            </Stack>
            <Stack className="justify-center">
              <Text className="font-bold text-xl">Contact Us</Text>
              <Text>Cairo, Egypt</Text>
              <Text>Egypt : 01070544812</Text>
              <Text>Other Countries : +201070544812</Text>
              <Text>Info@cleajour.com</Text>
            </Stack>
          </Group>
        </div>
      </Container>
    </div>
  );
}
