// import { Image, Title } from "@mantine/core";
// import { useEffect, useState } from "react";
// import { CategoryBooks, Book, BooksDisplayProps } from "@/types/types";
// import * as APIs from "@/services/api";
// import { ProductDetailsAndPurchase } from "@/components/ProductDetailsAndPurchase/ProductDetailsAndPurchase";

// export function BooksDisplay({ search, category }: BooksDisplayProps) {
//   const [books, setBooks] = useState<CategoryBooks | Book[] | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadBooks = async () => {
//       try {
//         if (search !== "") {
//           const data = await APIs.fetchBooksByKeyWord(search);
//           setBooks(data);
//           setError(null);
//         } else if (category === "All Genres") {
//           const data = await APIs.fetchBooks();
//           setBooks(data as CategoryBooks);
//           setError(null);
//         } else if (category !== "All Genres") {
//           const data = await APIs.fetchBooksByCategory(category);
//           setBooks(data as CategoryBooks);
//           setError(null);
//         }
//       } catch (err) {
//         setError(
//           "Sorry, either this book isn't in our collection yet, or no book or genre were selected. We apologize for the inconvenience."
//         );
//       }
//     };

//     loadBooks();
//   }, [category, search]);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!books) {
//     return <div>Loading...</div>;
//   }

//   if (Array.isArray(books)) {
//     return (
//       <div>
//         <Title
//           c="#557c3e"
//           className="flex text-4xl max-lg:text-3xl max-md:text-2xl py-4 mb-8 justify-center"
//         >
//           Search Results
//         </Title>
//         <div className="relative">
//           {books.map((book, index) => (
//             <div key={index} className="flex flex-row gap-4 items-start">
//               <Image
//                 src={book.image}
//                 alt={`${book.title} cover`}
//                 className="w-[60%] h-[600px] max-md:h-[400px] mr-2.5 ml-8 mb-8"
//               />
//               <div className="flex flex-col lg:text-sm xl:text-md">
//                 <strong className="text-base lg:text-md xl:text-lg">
//                   {book.title}
//                 </strong>{" "}
//                 by
//                 {` "${book.author}" `}
//                 (ISBN: {book.ISBN})
//                 <ProductDetailsAndPurchase book={book} />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {Object.entries(books).map(([genre, genreBooks]) => (
//         <div key={genre}>
//           <Title
//             c="#557c3e"
//             className="flex text-4xl max-lg:text-3xl max-md:text-2xl py-4 mb-8 justify-center"
//           >
//             {genre} Books
//           </Title>
//           <div className="relative grid grid-cols-1 2xl:grid-cols-3 2xl:auto-rows-auto">
//             {Object.entries(genreBooks).map(([id, book]) => {
//               const bookDetails = book as Book;
//               return (
//                 <div className="">
//                   <div key={id} className="flex flex-row items-start">
//                     <Image
//                       src={bookDetails.image}
//                       alt={`${bookDetails.title} cover`}
//                       className="w-[60%] h-[600px] max-md:h-[400px] 2xl:h-[90%] mr-2.5 ml-8 mb-8"
//                     />

//                     <div className="flex flex-col lg:text-sm xl:text-md">
//                       <strong className="text-base lg:text-md xl:text-lg">
//                         {bookDetails.title}
//                       </strong>{" "}
//                       by
//                       {` "${bookDetails.author}" `} (ISBN: {bookDetails.ISBN})
//                       <ProductDetailsAndPurchase book={book} />
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
