import { useState, useEffect } from "react";
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
import { TextInputProps, Book } from "@/types/types";

export function Input({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}: TextInputProps) {
  const [opened, setOpened] = useState(false);
  const [books, setBooks] = useState<Book[] | null>(null);
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
    keyword: string | number | undefined
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
      )
    );
  };

  const Close = (
    <CloseButton
      variant="transparent"
      className="bg-[#B07D43] rounded-full size-[90%]"
      aria-label="Empty Search Field"
      onClick={() => onSearchChange("")}
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
          placeholder="Search for products"
          onChange={(e) => {
            onSearchChange(e.target.value);
            setOpened(e.target.value.length > 0);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearchSubmit(searchQuery);
              setOpened(false);
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
                  onClick={() => {
                    onSearchChange(book.title);
                    onSearchSubmit(book.title);
                    setOpened(false);
                  }}
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
