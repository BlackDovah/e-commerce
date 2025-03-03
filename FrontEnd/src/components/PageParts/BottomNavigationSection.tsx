import { Group, Box } from "@mantine/core";
import { CartView } from "../Cart/CartView";
import classes from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function BottomNavigationSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <Box hiddenFrom="xl" className="mt-5">
      <header className={classes.header}>
        <Group className="bg-white">
          <Group h="100%" gap={0}>
            <button
              type="button"
              className={classes.link}
              onClick={handleHomeClick}
            >
              {t("navigation.home")}
            </button>
            <button type="button" className={classes.link}>
              <CartView />
            </button>
          </Group>
        </Group>
      </header>
    </Box>
  );
}
