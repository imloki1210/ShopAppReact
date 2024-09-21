import { createSlice } from "@reduxjs/toolkit";

const LikedItemsSlice = createSlice({
  name: "likedProducts",
  initialState: [],
  reducers: {
    like: (state, action) => {
      state.push(action.payload);
    },
    unlike: (state, action) => {
      return state.filter((product) => product.id !== action.payload);
    },
  },
});

export const { like, unlike } = LikedItemsSlice.actions;
export default LikedItemsSlice.reducer;
