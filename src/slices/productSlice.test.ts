import { configureStore } from "@reduxjs/toolkit";
import productReducer, {
  ProductState,
  selectProduct,
  toggleFavorite,
  updateProductAsync,
} from "./productSlice";
import { Product } from "./types";

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
};

const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

describe("productSlice", () => {
  it("should handle initial state", () => {
    expect(store.getState().products).toEqual(initialState);
  });

  it("should handle selectProduct", () => {
    const product: Product = {
      id: 1,
      title: "Product 1",
      price: 100,
      description: "Description",
      image: "",
      favorite: false,
    };
    store.dispatch(selectProduct(product));
    expect(store.getState().products.selectedProduct).toEqual(product);
  });

  it("should handle toggleFavorite", () => {
    const product: Product = {
      id: 1,
      title: "Product 1",
      price: 100,
      description: "Description",
      image: "",
      favorite: false,
    };
    store.dispatch(selectProduct(product));
    store.dispatch(toggleFavorite(1));
    expect(store.getState().products.selectedProduct?.favorite).toEqual(true);
  });

  // Add more tests for updateProductAsync and other actions
});
