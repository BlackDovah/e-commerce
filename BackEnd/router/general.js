const express = require('express');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const fs = require('fs');
const path = require('path');

const public_users = express.Router();

let books = {};

function loadBooks() {
  const booksFolder = path.join(__dirname, 'Books');
  const files = fs.readdirSync(booksFolder);

  files.forEach((file) => {
    if (file.endsWith('.json')) {
      const category = path.basename(file, '.json');
      const filePath = path.join(booksFolder, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      books[category] = data;
    }
  });
}

loadBooks();

// Helper function to search through nested books object
function searchBooks(criteria, value) {
  const results = [];
  Object.keys(books).forEach(category => {
    const categoryBooks = books[category];
    Object.keys(categoryBooks).forEach(bookId => {
      const book = categoryBooks[bookId];
      if (book[criteria].toLowerCase().includes(value.toLowerCase())) {
        results.push({
          ...book,
          category,
          id: bookId
        });
      }
    });
  });
  return results;
};

function searchBooksWithKeyWord(keyword) {
  const filteredBooks = [];
  const regex = new RegExp(`(${keyword})`, "i");
  Object.values(books).forEach((genreBooks) => {
    Object.values(genreBooks).forEach((book) => {
      const foundBook = book;
      if (regex.test(foundBook.title)) {
        foundBook.field = 'title';
        filteredBooks.push( foundBook );
      } else if (regex.test(foundBook.author)) {
        foundBook.field = 'author';
        filteredBooks.push( foundBook );
      } else if (regex.test(foundBook.ISBN)) {
        foundBook.field = 'ISBN';
        filteredBooks.push( foundBook );
      }
    });
  })
  return filteredBooks;
};

public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get('/books', (req, res) => {
  const get_books = new Promise((resolve, reject) => {
    if (Object.keys(books).length > 0) {
      resolve(books);
    } else {
      reject(new Error('No books available'));
    }
  });

  get_books
    .then((books) => {
      res.status(200).json(books);
      console.log("All books available");
    })
    .catch(error => {
      res.status(404).json({ message: error.message });
      console.error("Error:", error.message);
    });
});

// Get book details based on ISBN
public_users.get('/books/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;

  const get_books = new Promise((resolve, reject) => {
    const foundBooks = searchBooks('ISBN', isbn);
    if (foundBooks.length > 0) {
      resolve({ [isbn]: foundBooks });
    } else {
      reject(new Error(`Book with ISBN ${isbn} was not found`));
    }
  });

  get_books
    .then((data) => {
      res.status(200).json(data);
      console.log(`Book found with ISBN: ${isbn}`);
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
      console.error("Error:", error.message);
    });
});

// Get book details based on author
public_users.get('/books/author/:author', (req, res) => {
  const author = req.params.author;

  const get_books = new Promise((resolve, reject) => {
    const foundBooks = searchBooks('author', author);
    if (foundBooks.length > 0) {
      resolve({ [author]: foundBooks });
    } else {
      reject(new Error(`No books found for author ${author}`));
    }
  });

  get_books
    .then((data) => {
      res.status(200).json(data);
      console.log(`Books found for author: ${author}`);
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
      console.error("Error:", error.message);
    });
});

// Get all books based on title
public_users.get('/books/title/:title', (req, res) => {
  const title = req.params.title;

  const get_books = new Promise((resolve, reject) => {
    const foundBooks = searchBooks('title', title);
    if (foundBooks.length > 0) {
      resolve({ [title]: foundBooks });
    } else {
      reject(new Error(`No books found with title "${title}"`));
    }
  });

  get_books
    .then((data) => {
      res.status(200).json(data);
      console.log(`Books found with title: ${title}`);
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
      console.error("Error:", error.message);
    });
});

// Get all books based on category
public_users.get('/books/category/:category', (req, res) => {
  const category = req.params.category;

  const get_books = new Promise((resolve, reject) => {
    const foundBooks = books[category.charAt(0).toUpperCase() + category.slice(1)];
    if (Object.keys(foundBooks).length > 0) {
      resolve({ [category]: foundBooks });
    } else {
      reject(new Error(`No books found from category "${category}"`));
    }
  });

  get_books
    .then((data) => {
      res.status(200).json(data);
      console.log(`Books found from category: ${category}`);
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
      console.error("Error:", error.message);
    });
});

// Get all books based on a key word
public_users.get('/books/keyword/:keyword', (req, res) => {
  const keyWord = req.params.keyword;

  const get_books = new Promise((resolve, reject) => {
    const foundBooks = searchBooksWithKeyWord(keyWord);
    if (Object.keys(foundBooks).length > 0) {
      resolve( foundBooks );
    } else {
      reject(new Error(`No books found with the keyword "${keyWord}"`));
    }
  });

  get_books
    .then((data) => {
      res.status(200).json(data);
      console.log(`Books found with the keyword: ${keyWord}`);
    })
    .catch((error) => {
      res.status(404).json({ message: error.message });
      console.error("Error:", error.message);
    });
});

module.exports.general = public_users;