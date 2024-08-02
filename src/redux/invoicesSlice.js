import { createSlice } from "@reduxjs/toolkit";

const invoicesSlice = createSlice({
  name: "invoices",
  initialState: [],
  reducers: {
    addInvoice: (state, action) => {
      state.push(action.payload);
    },
    deleteInvoice: (state, action) => {
      return state.filter((invoice) => invoice.id !== action.payload);
    },
    updateInvoice: (state, action) => {
      const index = state.findIndex(
        (invoice) => invoice.id == action.payload.id
      );
      console.log(index);
      if (index !== -1) {
        state[index] = action.payload.updatedInvoice;
      }
    },
    updateExistingInvoices: (state, action) => {
      const { updatedProduct } = action.payload;
      
      return state.map((invoice) => {
        const updatedItems = invoice.items.map((item) =>
          item.itemId === updatedProduct.id
            ? {
                ...item,
                itemName: updatedProduct.name,
                itemDescription: updatedProduct.description,
                itemCategory: updatedProduct.category,
              }
            : item
        );

        return {
          ...invoice,
          items: updatedItems,
        };
      });
    },
  },
});

export const {
  addInvoice,
  deleteInvoice,
  updateInvoice,
  updateExistingInvoices,
} = invoicesSlice.actions;

export const selectInvoiceList = (state) => state.invoices;

export default invoicesSlice.reducer;
