import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: { loaduser: (state, action) => { state.data = action.payload } }//lodeuser is not function it is action when we have to call that time use dispatch and we can do asyn operation here beacuse action i s synchronous operation
})

export const { loaduser } = userSlice.actions; //here we use "userSlice.actions" to export loaduser as action
export default userSlice.reducer;