import { Stack, Title, Box } from "@mantine/core";
import { Advertisements } from "../Advertisements/Advertisements";
import { Footer } from "../PageParts/Footer";
import { Header } from "../PageParts/Header";
import { ProductDisplay } from "../Advertisements/ProductDisplay";
import { BottomNavigationSection } from "../PageParts/BottomNavigationSection";
import { useTranslation } from "react-i18next";

export function LandingPage() {
  const { t } = useTranslation();
  return (
    <Box>
      <Header />
      {/* Main content */}

      <Stack className="bg-gray-100" gap="lg">
        <Box>
          <Box className="justify-center items-center 2xl:px-80 max-2xl:px-20 pt-20">
            <Title className="text-4xl max-lg:text-3xl max-md:text-2xl mt-8 mb-8 justify-center">
              {t("landingPage.newArrivals")}
            </Title>
            <ProductDisplay />
          </Box>

          <Box className="justify-center items-center 2xl:px-80 max-2xl:px-20 py-20">
            <Title className="text-4xl max-lg:text-3xl max-md:text-2xl mt-8 mb-8 justify-center">
              {t("landingPage.featuredProducts")}
            </Title>
            <Advertisements />
          </Box>
        </Box>
      </Stack>
      {/* End of the main content */}

      {/* Footer */}
      <Box className="flex sticky bottom-0 w-full justify-center bg-white border-t">
        <BottomNavigationSection />
      </Box>
      <Footer />
    </Box>
  );
}
