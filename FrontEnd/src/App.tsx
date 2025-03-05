import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";

import {
  MantineProvider,
  ColorSchemeScript,
  DirectionProvider,
} from "@mantine/core";
import { ProductProvider } from "./components/Contexts/ProductContext";
import { SearchProvider } from "./components/Contexts/SearchContext";
import { BooksProvider } from "./components/Contexts/BooksContext";
import { Router } from "./Router";
import { theme } from "./theme";
import "./output.css";

export default function App() {
  return (
    <>
      <ColorSchemeScript forceColorScheme="light" />
      <DirectionProvider>
        <MantineProvider forceColorScheme="light" theme={theme}>
          <BooksProvider>
            <SearchProvider>
              <ProductProvider>
                <Router />
              </ProductProvider>
            </SearchProvider>
          </BooksProvider>
        </MantineProvider>
      </DirectionProvider>
    </>
  );
}
