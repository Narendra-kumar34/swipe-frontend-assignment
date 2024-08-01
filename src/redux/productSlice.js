import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      id: 1,
      name: "Cement",
      price: 10,
      description: "Deccan Cement",
      category: "MATERIAL",
    },
    {
      id: 2,
      name: "Polishing",
      price: 70,
      description: "Floor polish",
      category: "LABOUR",
    },
    {
      id: 3,
      name: "Iron",
      price: 50,
      description: "TMT Iron",
      category: "MATERIAL",
    },
    {
      id: 4,
      name: "Wall crack removal",
      price: 20,
      description: "Crack removal and repaint",
      category: "REPAIR",
    },
  ],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const { product } = action.payload;
      state.products.push(product);
    },
    editProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload.updatedProduct;
      }
    },
    deleteProduct: (state, action) => {
      const { id } = action.payload;
      state.products = state.products.filter((product) => product.id !== id);
    },
  },
});

export const { editProduct, addProduct, deleteProduct } =
  productSlice.actions;

export const selectProductList = (state) => state.products.products;

export default productSlice.reducer;
