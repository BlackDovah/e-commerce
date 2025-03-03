import {
  Box,
  Button,
  Center,
  Group,
  Text,
  Burger,
  Image,
  Drawer,
  useDirection,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { Input } from "../BooksFetching/Input";
import { HeaderNavigationSection } from "./HeaderNavigationSection";
import { useNavigate } from "react-router-dom";
import { CartView } from "@/components/Cart/CartView";

export function Header() {
  const { toggleDirection, dir } = useDirection();
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/");
  };
  const [opened, { open, close }] = useDisclosure();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [submittedQuery, setSubmittedQuery] = useState<
    string | number | undefined
  >("");

  const handleSearch = (search: string | number | undefined) => {
    setSubmittedQuery(search);
  };

  useEffect(() => {
    if (selectedCategory !== "Choose Genre") {
      setSubmittedQuery("");
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (submittedQuery !== "") {
      setSelectedCategory("Choose Genre");
    }
    if (submittedQuery === "" && selectedCategory === "Choose Genre") {
      setSelectedCategory("All Genres");
    }
  }, [submittedQuery]);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        size="30%"
        padding="md"
        title="Navigation"
        hiddenFrom="xl"
      >
        <HeaderNavigationSection />
      </Drawer>

      {/* Purple banner section */}
      <Box className="bg-[#E07B88] py-3">
        <Text className="flex text-lg text-white w-full justify-center">
          Delivery: 3-5 working days depends on area
        </Text>
      </Box>

      {/* Mobile menu and language selector */}
      <Box className="flex justify-between">
        <Burger opened={opened} onClick={open} hiddenFrom="xl" size="lg" />
        <Button
          className={`flex ${dir === "ltr" ? "ml-auto" : "mr-auto"}`}
          variant="default"
          onClick={toggleDirection}
        >
          {dir === "ltr" ? (
            <>
              <Image
                src="/images/EgyptFlag.png"
                alt="logo"
                className="aspect-square object-contain"
                fit="contain"
              />
              <span>العربية</span>{" "}
            </>
          ) : (
            <>
              <Image
                src="/images/USAFlag.png"
                alt="logo"
                className="aspect-square object-contain"
                fit="contain"
              />
              <span>English</span>
            </>
          )}
        </Button>
      </Box>

      {/* Logo and search section */}
      <Group>
        <Center>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSubmittedQuery("");
              handleLogoClick();
            }}
            className="flex w-full justify-start"
          >
            <Image
              className="pl-40 xl:pl-28 max-md:pl-20 max-sm:pl-0"
              src="/images/shopping-cart-with-dollar-sign-5399ld.png"
            />
          </button>
        </Center>
        <Input
          searchQuery={searchQuery}
          onSearchChange={(value) => setSearchQuery(value)}
          onSearchSubmit={handleSearch}
        />
        <Box visibleFrom="xl">
          <CartView />
        </Box>
      </Group>

      {/* Navigation section */}
      <Box
        visibleFrom="xl"
        className="flex justify-center border-t border-b sticky top-0 z-10 bg-white"
      >
        <HeaderNavigationSection />
      </Box>
    </>
  );
}
