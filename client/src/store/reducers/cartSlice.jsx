import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadcart: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default cartSlice.reducer;
export const { loadcart } = cartSlice.actions;