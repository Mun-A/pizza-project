import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { CartItem, CartSliceState } from "./types";

const { items, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice,
  items,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        (item) =>
          item.size === action.payload.size &&
          item.id === action.payload.id &&
          item.type === action.payload.type
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.type === action.payload.type &&
          item.size === action.payload.size
      );
      state.items = state.items.filter((item) => item !== findItem);

      state.totalPrice = calcTotalPrice(state.items);
    },
    decreaseItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.type === action.payload.type &&
          item.size === action.payload.size
      );
      if (findItem && findItem.count > 1) {
        findItem.count--;
      }
      // else {
      //   state.items = state.items.filter((item) => item.id !== action.payload);
      // }

      state.totalPrice = calcTotalPrice(state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, clearItems, removeItem, decreaseItem } =
  cartSlice.actions;

export default cartSlice.reducer;
