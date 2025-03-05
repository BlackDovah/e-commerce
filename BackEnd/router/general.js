const express = require('express');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const fs = require('fs');
const path = require('path');

const public_users = express.Router();

let books = {};

function loadBooks(language = 'en') {
  const booksFolder = path.join(__dirname, 'Books', language);
  const files = fs.readdirSync(booksFolder);
  const languageBooks = {};

  files.forEach((file) => {
    if (file.endsWith('.json')) {
      const category = path.basename(file, '.json');
      const filePath = path.join(booksFolder, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      languageBooks[category] = data;
    }
  });
  return languageBooks;
}

function searchBooksWithKeyWord(keyword) {
  const filteredBooks = [];
  const regex = new RegExp(`(${keyword})`, "i");
  Object.values(books).forEach((genreBooks) => {
    Object.values(genreBooks).forEach((book) => {
      const foundBook = book;
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
  const language = req.query.lang || 'en';
  books = loadBooks(language);


  const get_books = new Promise((resolve, reject) => {
    const books = loadBooks(language);
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

// Get all books based on category
public_users.get('/books/category/:category', (req, res) => {
  const category = req.params.category;
  const language = req.query.lang || 'en';
  books = loadBooks(language);

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
  const language = req.query.lang || 'en';
  books = loadBooks(language);

  const get_books = new Promise((resolve, reject) => {
    const foundBooks = searchBooksWithKeyWord(keyWord);
    if (Object.keys(foundBooks).length > 0) {
      resolve(foundBooks);
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