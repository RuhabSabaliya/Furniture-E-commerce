import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistitem: [],
};

const wishlistslice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addtowishlist(state, action) {
      const newitem = action.payload;
      const existingitem = state.wishlistitem.find(i => i.id === newitem.id);
      if (existingitem) {
        // Optional: you might want to alert or just do nothing if already in wishlist
        // For now, let's just leave it or maybe increase quantity if that was the intent,
        // but typically wishlist is unique items.
        // The original code incremented quantity, which is odd for wishlist, but we will preserve 'no duplicates' logic roughly.
      } else {
        state.wishlistitem.push(newitem);
      }
    },
    removewishlistitem(state, action) {
      state.wishlistitem = state.wishlistitem.filter(
        (i) => i.id !== action.payload
      );
    },
    clearwishlist(state, action) {
      state.wishlistitem = [];
    },
  },
});
export const { addtowishlist, removewishlistitem, clearwishlist } =
  wishlistslice.actions;
export default wishlistslice.reducer;

