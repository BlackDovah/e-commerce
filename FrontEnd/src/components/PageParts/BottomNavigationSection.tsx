import { Group, Box } from "@mantine/core";
import { CartView } from "../Cart/CartView";
import classes from "./Header.module.css";
import { useNavigate } from "react-router-dom";

export function BottomNavigationSection() {
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
              Home
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
