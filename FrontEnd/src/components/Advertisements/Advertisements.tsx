import { Carousel } from "@mantine/carousel";
import { useMantineTheme, LoadingOverlay } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ProductCardProps } from "@/types/types";
import { ProductCard } from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../Contexts/ProductContext";
import { useBooks } from "../Contexts/BooksContext";

export function Advertisements() {
  // State management for books data, loading state and error handling
  const { books, isLoading, error } = useBooks();
  const navigate = useNavigate();
  const { setSelectedProduct } = useProduct();
  const handleProductClick = (product: ProductCardProps) => {
    setSelectedProduct(product);
    navigate(`/product/${product.title}`);
    console.log(product);
  };

  // Theme and responsive layout handling
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  // Conditional rendering for loading and error states
  if (isLoading) {
    return <LoadingOverlay visible />;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (!books) {
    return null;
  }

  // Transform books data into carousel slides
  const slides = Object.entries(books).flatMap(([genre, bookList]) =>
    Object.entries(bookList).map(([id, book]) => (
      <Carousel.Slide key={`${genre}-${id}`}>
        <ProductCard
          image={(book as ProductCardProps).image}
          title={(book as ProductCardProps).title}
          author={(book as ProductCardProps).author}
          cover={(book as ProductCardProps).cover || ""}
          price={(book as ProductCardProps).price}
          description={(book as ProductCardProps).description}
          ID={(book as ProductCardProps).ID}
          onImageClick={() => handleProductClick(book as ProductCardProps)}
        />
      </Carousel.Slide>
    )),
  );

  // Carousel component with responsive settings
  return (
    <Carousel
      height="fit-content"
      slideSize={{ base: "100%", md: "25%", sm: "25%", xs: "50%" }}
      slideGap={{ base: 2, sm: "sm" }}
      align="start"
      slidesToScroll={mobile ? 1 : 2}
      withIndicators
      loop
    >
      {slides}
    </Carousel>
  );
}
