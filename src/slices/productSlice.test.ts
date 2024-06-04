import productReducer, {
  setProducts,
  addProduct,
  updateProduct,
} from "./productSlice";

describe("product reducer", () => {
  const initialState = {
    products: [],
    selectedProduct: null,
  };

  it("should handle setProducts", () => {
    const products = [
      {
        id: 1,
        title: "Product 1",
        price: 100,
        image: "",
        description: "Description of Product 1",
      },
    ];
    const action = setProducts(products);
    const state = productReducer(initialState, action);
    expect(state.products).toEqual(products);
  });

  it("should handle addProduct", () => {
    const newProduct = {
      id: 2,
      title: "Product 2",
      price: 200,
      image: "",
      description: "Description of Product 2",
    };
    const action = addProduct(newProduct);
    const state = productReducer(initialState, action);
    expect(state.products).toEqual([newProduct]);
  });

  it("should handle updateProduct", () => {
    const initialStateWithProducts = {
      products: [
        {
          id: 1,
          title: "Product 1",
          price: 100,
          image: "",
          description: "Description of Product 1",
        },
      ],
      selectedProduct: null,
    };
    const updatedProduct = {
      id: 1,
      title: "Updated Product 1",
      price: 150,
      image: "",
      description: "Updated Description of Product 1",
    };
    const action = updateProduct(updatedProduct);
    const state = productReducer(initialStateWithProducts, action);
    expect(state.products).toEqual([updatedProduct]);
  });
});
