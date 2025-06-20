import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: [] };

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    loadproducts: (state, action) => {
      state.data = action.payload;
    }
  },
});

export default productSlice.reducer;
export const { loadproducts } = productSlice.actions; //we can not perform async task here so we export it and use in another file to perform async task