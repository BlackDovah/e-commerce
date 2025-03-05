import axios from "axios";
import { ProductCardProps } from "../types/types";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const fetchBooks = async (language: string): Promise<ProductCardProps> => {
  const response = await api.get<ProductCardProps>(`/books`, {
    params: { lang: language }
  });
  return response.data;
};

export const fetchBooksByCategory = async (category: string | undefined, language: string) => {
  const response = await api.get(`/books/category/${category}`, {
    params: { lang: language }
  });
  return response.data;
};

export const fetchBooksByKeyWord = async (
  KeyWord: string | number | undefined,
  language: string
) => {
  const response = await api.get(`/books/keyword/${KeyWord}`, {
    params: { lang: language }
  });
  return response.data;
};
