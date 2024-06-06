import axios from "axios";
import { Product } from "../slices/types";

const API_URL = "https://data-server-1.onrender.com/product";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(API_URL);
  console.log("resppnse", response.data);
  return response.data;
};
