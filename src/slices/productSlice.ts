import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./types";

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
}

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
      state.products.push(action.payload);
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
});

export const { setProducts, addProduct, selectProduct, updateProduct } =
  productSlice.actions;

export default productSlice.reducer;
