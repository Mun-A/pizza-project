import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // const findItem = state.items.find(
      //   (item) => item.id === action.payload.id
      // );
      // if (findItem) {
      //   state.items = state.items.map((item) =>
      //     item.id === action.payload.id
      //       ? { ...item, price: item.price + action.payload.price }
      //       : item
      //   );

      //   state.totalPrice = state.items.reduce((sum, item) => item.price + sum, 0)
      // } else {
      //   state.items.push(action.payload)

      //   state.totalPrice = state.items.reduce((sum, item) => item.price + sum, 0)
      // }

      const findItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce(
        (sum, item) => item.price * item.count + sum,
        0
      );
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);

      state.totalPrice = state.items.reduce(
        (sum, item) => item.price * item.count + sum,
        0
      );
    },
    decreaseItem(state, action) {
      const findItem = state.items.find((item) => item.id === action.payload);
      if (findItem.count > 1) {
        findItem.count--;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }

      state.totalPrice = state.items.reduce(
        (sum, item) => item.price * item.count + sum,
        0
      );
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state) => state.cart;
export const selectCartItemById = (id) => (state) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, clearItems, removeItem, decreaseItem } =
  cartSlice.actions;

export default cartSlice.reducer;
