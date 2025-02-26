import { Stack, Title, Box } from "@mantine/core";
// import { useNavigate, Link } from "react-router-dom";
// import { Link } from "react-router-dom";
import { Advertisements } from "../Advertisements/Advertisements";
import { Footer } from "../PageParts/Footer";
import { Header } from "../PageParts/Header";
import { ProductDisplay } from "../Advertisements/ProductDisplay";

export function LandingPage() {
  return (
    <Box>
      <Header />
      {/* Main content */}

      <Stack className="bg-gray-100" gap="lg">
        <Box>
          <Box className="justify-center items-center 2xl:px-80 max-2xl:px-20 pt-20">
            <Title
              className="text-4xl max-lg:text-3xl max-md:text-2xl mt-8 mb-8 justify-center"
            >
              New Arrivals
            </Title>
            <ProductDisplay />
          </Box>

          <Box className="justify-center items-center 2xl:px-80 max-2xl:px-20 py-20">
            <Title
              className="text-4xl max-lg:text-3xl max-md:text-2xl mt-8 mb-8 justify-center"
            >
              Featured Books
            </Title>
            <Advertisements />
          </Box>
        </Box>
      </Stack>
      {/* End of the main content */}

      {/* Footer */}

      <Footer />
    </Box>
  );
}
