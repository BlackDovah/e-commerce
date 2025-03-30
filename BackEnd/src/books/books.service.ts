import { Injectable } from '@nestjs/common';
import { BookDto, SearchResultDto } from './dto/book.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class BooksService {
  private books: Record<string, Record<string, BookDto>> = {};

  loadBooks(language = 'en'): Record<string, Record<string, BookDto>> {
    const booksFolder = path.join(__dirname, '..', '..', 'Books', language);
    const files = fs.readdirSync(booksFolder);
    const languageBooks: Record<string, Record<string, BookDto>> = {};

    files.forEach((file) => {
      if (file.endsWith('.json')) {
        const category = path.basename(file, '.json');
        const filePath = path.join(booksFolder, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Record<
          string,
          BookDto
        >;
        languageBooks[category] = data;
      }
    });
    this.books = languageBooks;
    return languageBooks;
  }

  searchBooksWithKeyWord(keyword: string): SearchResultDto[] {
    const filteredBooks: SearchResultDto[] = [];
    const regex = new RegExp(`(${keyword})`, 'i');

    Object.values(this.books).forEach((genreBooks) => {
      Object.values(genreBooks).forEach((book) => {
        const foundBook = { ...book } as SearchResultDto;
        if (regex.test(foundBook.title)) {
          foundBook.field = 'title';
          filteredBooks.push(foundBook);
        } else if (regex.test(foundBook.author)) {
          foundBook.field = 'author';
          filteredBooks.push(foundBook);
        } else if (regex.test(foundBook.ISBN)) {
          foundBook.field = 'ISBN';
          filteredBooks.push(foundBook);
        }
      });
    });

    return filteredBooks;
  }

  getBooksByCategory(
    category: string,
  ): Record<string, Record<string, BookDto>> {
    const categoryKey = category.charAt(0).toUpperCase() + category.slice(1);
    const foundBooks = this.books[categoryKey];

    if (!foundBooks || Object.keys(foundBooks).length === 0) {
      throw new Error(`No books found from category "${category}"`);
    }

    return { [category]: foundBooks };
  }

  getAllBooks(): Record<string, Record<string, BookDto>> {
    if (Object.keys(this.books).length === 0) {
      throw new Error('No books available');
    }
    return this.books;
  }
}
