import "@mantine/core/styles.css";
import '@mantine/carousel/styles.css';

import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Router } from "./Router";
import "./output.css";
import { ProductProvider } from "./components/Contexts/ProductContext";
import { theme } from "./theme";
export default function App() {
  return (
    <>
    <ColorSchemeScript forceColorScheme="light"/>
    <MantineProvider forceColorScheme="light" theme={theme}>
      <ProductProvider>
        <Router />
      </ProductProvider>
    </MantineProvider>
  </>
  );
}
