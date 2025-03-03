import axios from "axios";
import { ProductCardProps } from "../types/types";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const fetchBooks = async (): Promise<ProductCardProps> => {
  const response = await api.get<ProductCardProps>("/books");
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