import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import invoiceReducer from "./invoiceSlice";
import deliveryNoteReducer from "./deliveryNoteSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    invoices: invoiceReducer,
    deliveryNotes: deliveryNoteReducer,
  },
});