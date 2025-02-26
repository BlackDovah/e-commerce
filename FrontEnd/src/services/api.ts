import axios from "axios";
import { ProductCardProps } from "../types/types";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const fetchBooks = async (): Promise<ProductCardProps> => {
  const response = await api.get<ProductCardProps>("/books");
  return response.data;
};
export const fetchBooksByISBN = async (isbn: string | number) => {
  const response = await api.get(`/books/isbn/${isbn}`);
  return response.data;
};

export const fetchBooksByAuthor = async (author: string | number) => {
  const response = await api.get(`/books/author/${author}`);
  return response.data;
};

export const fetchBooksByTitle = async (title: string | number) => {
  const response = await api.get(`/books/title/${title}`);
  return response.data;
};

export const fetchBooksByCategory = async (category: string | undefined) => {
    const response = await api.get(`/books/category/${category}`);
    return response.data;
};

export const fetchBooksByKeyWord = async (KeyWord: string | number | undefined) => {
  const response = await api.get(`/books/keyword/${KeyWord}`);
  return response.data;
};