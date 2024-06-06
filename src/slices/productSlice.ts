import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "./types";

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
}

const API_URL = "https://data-server-1.onrender.com/product";

// Define the fetchProducts thunk
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

export const addProductAsync = createAsyncThunk(
  "products/addProductAsync",
  async (product: Product) => {
    const response = await axios.post(API_URL, product);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  "products/updateProductAsync",
  async (product: Product) => {
    const response = await axios.put(`${API_URL}/${product.id}`, product);
    return response.data;
  }
);

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.products.unshift(action.payload); // Insert at the beginning
    },
    selectProduct(state, action: PayloadAction<Product>) {
      state.selectedProduct = action.payload;
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(addProductAsync.fulfilled, (state, action) => {
      state.products.unshift(action.payload); // Insert at the beginning
    });
    builder.addCase(updateProductAsync.fulfilled, (state, action) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    });
  },
});

export const { setProducts, addProduct, selectProduct, updateProduct } =
  productSlice.actions;

export default productSlice.reducer;
