// import { useState, useEffect } from "react";
// import { Menu, Button } from "@mantine/core";
// import { fetchBooks } from "@/services/api";
// import { CategoryBooks, GenreMenuProps } from "@/types/types";

// export function GenreMenu({
//   selectedCategory,
//   onCategorySelect,
// }: GenreMenuProps) {
//   const [books, setBooks] = useState<CategoryBooks>({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchBooks()
//       .then((data) => {
//         setBooks(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching books:", error); //eslint-disable-line
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Menu shadow="md" width={200}>
//       <Menu.Target>
//         <Button>{selectedCategory || "Choose Genre"}</Button>
//       </Menu.Target>
//       <Menu.Dropdown>
//         <Menu.Label>Genres</Menu.Label>
//         <Menu.Item onClick={() => onCategorySelect("All Genres")}>
//           All Genres
//         </Menu.Item>
//         {Object.keys(books).map((genre) => {
//           return (
//             <Menu.Item key={genre} onClick={() => onCategorySelect(genre)}>
//               {genre}
//             </Menu.Item>
//           );
//         })}
//       </Menu.Dropdown>
//     </Menu>
//   );
// }
