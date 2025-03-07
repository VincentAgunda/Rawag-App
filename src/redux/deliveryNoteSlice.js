import { createSlice } from "@reduxjs/toolkit";

const deliveryNoteSlice = createSlice({
  name: "deliveryNotes",
  initialState: [],
  reducers: {
    addDeliveryNote: (state, action) => {
      state.push(action.payload);
    },
    updateDeliveryNote: (state, action) => {
      const index = state.findIndex((d) => d.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteDeliveryNote: (state, action) => {
      return state.filter((d) => d.id !== action.payload);
    },
  },
});

export const { addDeliveryNote, updateDeliveryNote, deleteDeliveryNote } =
  deliveryNoteSlice.actions;
export default deliveryNoteSlice.reducer;