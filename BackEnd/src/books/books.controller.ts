import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { RegisterUserDto } from './dto/book.dto';
import { UsersService } from '../users/users.service';

@Controller()
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    const { username, password } = registerUserDto;

    if (username && password) {
      if (!this.usersService.isValid(username)) {
        this.usersService.registerUser(username, password);
        return { message: 'User successfully registered. Now you can login' };
      } else {
        throw new HttpException('User already exists!', HttpStatus.NOT_FOUND);
      }
    }
    throw new HttpException('Unable to register user.', HttpStatus.NOT_FOUND);
  }

  @Get('books')
  getBooks(@Query('lang') language = 'en') {
    try {
      const books = this.booksService.loadBooks(language);
      return books;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get('books/category/:category')
  getBooksByCategory(
    @Param('category') category: string,
    @Query('lang') language = 'en',
  ) {
    try {
      this.booksService.loadBooks(language);
      return this.booksService.getBooksByCategory(category);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get('books/keyword/:keyword')
  getBooksByKeyword(
    @Param('keyword') keyword: string,
    @Query('lang') language = 'en',
  ) {
    try {
      this.booksService.loadBooks(language);
      const foundBooks = this.booksService.searchBooksWithKeyWord(keyword);

      if (foundBooks.length === 0) {
        throw new Error(`No books found with the keyword "${keyword}"`);
      }

      return foundBooks;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
