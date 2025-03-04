import { useState, useEffect, useCallback } from "react";
import { IconX } from "@tabler/icons-react";
import {
  TextInput,
  Popover,
  Box,
  Text,
  Image,
  ScrollArea,
  Group,
  CloseButton,
} from "@mantine/core";
import { fetchBooksByKeyWord } from "@/services/api";
import { ProductCardProps } from "@/types/types";
import { useProduct } from "../Contexts/ProductContext";
import { useSearch } from "../Contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function Input() {
  const { searchQuery, setSearchQuery, setSubmittedQuery } = useSearch();
  const { setSelectedProduct } = useProduct();
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const handleSearch = (search: string | number | undefined) => {
    setSubmittedQuery(search);
  };

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchQuery(value);
      setOpened(value.length > 0);
    },
    [setSearchQuery],
  );

  const handleSearchSubmit = useCallback(
    (query: string) => {
      setSubmittedQuery(query);
      setOpened(false);
    },
    [setSubmittedQuery],
  );

  const handleProductSelect = useCallback(
    (book: ProductCardProps) => {
      setSearchQuery(book.title);
      handleSearchSubmit(book.title);
      handleSearch(book.title);
      setSelectedProduct(book);
      navigate(`/product/${book.title}`);
      setOpened(false);
    },
    [navigate, setSelectedProduct, setSearchQuery, handleSearchSubmit],
  );

  const { t } = useTranslation();

  const [books, setBooks] = useState<ProductCardProps[] | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        if (searchQuery !== "") {
          const data = await fetchBooksByKeyWord(searchQuery);
          setBooks(data);
        }
      } catch (err) {
        ("Sorry, either this book isn't in our collection yet, or no book or genre were selected. We apologize for the inconvenience.");
      }
    };

    loadBooks();
  }, [searchQuery]);
  Array.isArray(books);

  const highlightKeyword = (
    text: string,
    keyword: string | number | undefined,
  ) => {
    if (!keyword) {
      return text;
    }

    const regex = new RegExp(`(${keyword})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} style={{ fontWeight: "bold", color: "#f6b319" }}>
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  const Close = (
    <CloseButton
      variant="transparent"
      className="bg-[#B07D43] rounded-full size-[90%]"
      aria-label="Empty Search Field"
      onClick={() => setSearchQuery("")}
      icon={<IconX style={{ color: "white" }} />}
    />
  );

  return (
    <Popover
      width="target"
      position="bottom"
      opened={opened}
      onChange={setOpened}
    >
      <Popover.Target>
        <TextInput
          className="w-[50%] max-xl:w-full max-xl:mx-5 max-xl:mb-5"
          size="lg"
          radius="xl"
          rightSection={Close}
          value={searchQuery}
          placeholder={t("search.placeholder")}
          onChange={(e) => handleSearchChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchSubmit(searchQuery);
            }
          }}
        />
      </Popover.Target>
      <Popover.Dropdown>
        <ScrollArea type="hover">
          <Box className="max-h-[300px]">
            {books !== null ? (
              books.map((book, index) => (
                <Group
                  gap="xs"
                  grow
                  preventGrowOverflow={false}
                  wrap="nowrap"
                  key={index}
                  onClick={() => handleProductSelect(book)}
                  style={{
                    cursor: "pointer",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f0f0f0")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <Image
                    src={book.image}
                    alt={book.title}
                    fit="contain"
                    className="w-[40px] h-[40px]"
                  />
                  <Text size="sm">
                    {highlightKeyword(book.title, searchQuery)} -{" "}
                    <span className="text-cyan-500">
                      by {highlightKeyword(book.author, searchQuery)}
                    </span>
                  </Text>
                </Group>
              ))
            ) : (
              <Text size="sm" color="dimmed">
                No matches found
              </Text>
            )}
          </Box>
        </ScrollArea>
      </Popover.Dropdown>
    </Popover>
  );
}
