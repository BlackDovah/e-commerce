import { Box } from "@mantine/core";
import { ProductCard } from "./ProductCard";
import { useProduct } from "@/components/Contexts/ProductContext";
import { ProductCardProps } from "@/types/types";
import { useNavigate } from "react-router-dom";

const mockdata = [
  {
    author: "Douglas Adams",
    title: "The Restaurant at the End of the Universe Illustrated Edition",
    ISBN: "978-1529099133",
    cover: "Paperback",
    price: 40,
    description: "Second Item",
    ID: "C2",
    image: "https://m.media-amazon.com/images/I/816I++JreJL._SL1500_.jpg",
  },
  {
    author: "Douglas Adams",
    title: "The Hitchhiker's Guide to the Galaxy Illustrated Edition",
    ISBN: "978-1529046137",
    cover: "Paperback",
    price: 50,
    description: "First Item",
    ID: "C1",
    image: "https://m.media-amazon.com/images/I/91pUhA4qZnL._SL1500_.jpg",
  },
  {
    author: "Terry Pratchett & Neil Gaiman",
    title: "Good Omens",
    ISBN: "978-1473214712",
    cover: "Hardcover",
    price: 100,
    description: "third Item",
    ID: "C3",
    image: "https://m.media-amazon.com/images/I/91fm-JBn3GL._SL1500_.jpg",
  },
];

export function ProductDisplay() {
  const navigate = useNavigate();
  const { setSelectedProduct } = useProduct();
  const handleProductClick = (product: ProductCardProps) => {
    setSelectedProduct(product);
    navigate(`/product/${product.title}`);
    console.log(product);
  };

  return (
    <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-4">
      {mockdata.map((item, index) => (
        <Box key={index} className="flex justify-center">
          <ProductCard
            image={item.image}
            title={item.title}
            author={item.author}
            cover={item.cover}
            price={item.price}
            description={item.description}
            ID={item.ID}
            onImageClick={() => handleProductClick(item)}
          />
        </Box>
      ))}
    </div>
  );
}
