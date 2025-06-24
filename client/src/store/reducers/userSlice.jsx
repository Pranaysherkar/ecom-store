import { createSlice } from "@reduxjs/toolkit";

const initialState = { data:null };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loaduser: (state, action) => {
      state.data = action.payload;
    },
    removeuser:(state, action) => {
      state.data = null;
    }
  },
});

export default userSlice.reducer;
export const { loaduser, removeuser } = userSlice.actions;