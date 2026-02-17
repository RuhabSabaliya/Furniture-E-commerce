import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartitem: [],
};

const cartslice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addtocart(state, action) {
      const newitem = action.payload;
      const existingitem = state.cartitem.find(i => i.id === newitem.id);
      if (existingitem) {
        existingitem.quantity++;
      } else {
        state.cartitem.push({ ...newitem, quantity: 1 });
      }
    },

    removecartitem(state, action) {
      state.cartitem = state.cartitem.filter((i) => i.id !== action.payload);
    },

    incrementqty(state, action) {
      const item = state.cartitem.find((i) => i.id === action.payload);
      if (item) {
        item.quantity++;
      }
    },
    decrementqty(state, action) {
      const item = state.cartitem.find((i) => i.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          state.cartitem = state.cartitem.filter((i) => i.id !== action.payload);
        }
      }
    },

    clearcart(state, action) {
      state.cartitem = [];
    },
  },
});
export const {
  addtocart,
  removecartitem,
  incrementqty,
  decrementqty,
  clearcart,
} = cartslice.actions;
export default cartslice.reducer;
