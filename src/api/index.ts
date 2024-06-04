import axios from "axios";
import { Product } from "../slices/types";

const API_URL = "/data/products.json";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(API_URL);
  console.log("resppnse", response.data);
  return response.data;
};
