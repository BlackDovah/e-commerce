import {
  Box,
  Center,
  Group,
  Text,
  Burger,
  Image,
  Drawer,
  useDirection,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, memo } from "react";
import { Input } from "../BooksFetching/Input";
import { HeaderNavigationSection } from "./HeaderNavigationSection";
import { useNavigate } from "react-router-dom";
import { CartView } from "@/components/Cart/CartView";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "@/components/Utilities/LanguageToggle";
import { useSearch } from "../Contexts/SearchContext";

const MemoizedHeaderNavigationSection = memo(HeaderNavigationSection);
const MemoizedCartView = memo(CartView);
const MemoizedInput = memo(Input);

export function Header() {
  const { t, i18n } = useTranslation();
  const { toggleDirection, dir } = useDirection();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    toggleDirection();
  };

  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/");
  };

  const {
    submittedQuery,
    setSubmittedQuery,
    selectedCategory,
    setSelectedCategory,
  } = useSearch();

  const [opened, { open, close }] = useDisclosure();

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
        title={t("navigation.title")}
        hiddenFrom="xl"
      >
        <MemoizedHeaderNavigationSection />
      </Drawer>

      {/* Purple banner section */}
      <Box className="bg-[#E07B88] py-3">
        <Text className="flex text-lg text-white w-full justify-center">
          {t("delivery")}
        </Text>
      </Box>

      {/* Mobile menu and language selector */}
      <Box className="flex justify-between">
        <Burger opened={opened} onClick={open} hiddenFrom="xl" size="lg" />
        <LanguageToggle dir={dir} toggleLanguage={toggleLanguage} t={t} />
      </Box>

      {/* Logo and search section */}
      <Group>
        <Center>
          <button
            type="button"
            onClick={() => {
              handleLogoClick();
            }}
            className="flex w-full justify-start"
          >
            <Image
              className="pl-40 xl:pl-28 max-md:pl-20 max-sm:pl-0"
              src="/images/shopping-cart-with-dollar-sign-5399ld.png"
              loading="eager"
            />
          </button>
        </Center>
        <MemoizedInput />
        <Box visibleFrom="xl">
          <MemoizedCartView />
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
