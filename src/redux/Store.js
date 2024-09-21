import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./Slices/CartSlice";
import LikedItemsSlice from "./Slices/LikedItemsSlice";


export const store = configureStore({
    reducer:{
        cart: CartSlice,
        likedItems: LikedItemsSlice
    }
});