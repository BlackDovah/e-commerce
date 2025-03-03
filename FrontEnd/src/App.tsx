import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";

import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { ProductProvider } from "./components/Contexts/ProductContext";
import { Router } from "./Router";
import { theme } from "./theme";
import "./output.css";

export default function App() {
  return (
    <>
      <ColorSchemeScript forceColorScheme="light" />
      <MantineProvider forceColorScheme="light" theme={theme}>
        <ProductProvider>
          <Router />
        </ProductProvider>
      </MantineProvider>
    </>
  );
}
