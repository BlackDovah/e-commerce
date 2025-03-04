import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";

import {
  MantineProvider,
  ColorSchemeScript,
  DirectionProvider,
} from "@mantine/core";
import { ProductProvider } from "./components/Contexts/ProductContext";
import { SearchProvider } from "./components/Contexts/SearchContext";
import { Router } from "./Router";
import { theme } from "./theme";
import "./output.css";

export default function App() {
  return (
    <>
      <ColorSchemeScript forceColorScheme="light" />
      <DirectionProvider>
        <MantineProvider forceColorScheme="light" theme={theme}>
          <SearchProvider>
            <ProductProvider>
              <Router />
            </ProductProvider>
          </SearchProvider>
        </MantineProvider>
      </DirectionProvider>
    </>
  );
}
