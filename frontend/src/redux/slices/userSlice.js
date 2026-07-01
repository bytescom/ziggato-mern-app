import { createSlice } from "@reduxjs/toolkit";

const loadCartFromStorage = () => {
  try {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const loadTotalFromStorage = () => {
  try {
    const saved = localStorage.getItem("totalAmount");
    return saved ? JSON.parse(saved) : 0;
  } catch (e) {
    return 0;
  }
};

const saveCartToStorage = (cartItems, totalAmount) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    loading: true,
    city: null,
    state: null,
    address: null,
    shopsInMyCity: [],
    itemsInMyCity: [],
    cartItems: loadCartFromStorage(),
    totalAmount: loadTotalFromStorage(),
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.loading = false;
    },
    clearUser: (state) => {
      state.userData = null;
      state.loading = false;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setState: (state, action) => {
      state.state = action.payload;
    },
    setCurrentAddress: (state, action) => {
      state.address = action.payload;
    },
    setShopsInMyCity: (state, action) => {
      state.shopsInMyCity = action.payload;
    },
    setItemsInMyCity: (state, action) => {
      state.itemsInMyCity = action.payload;
    },
    addToCart: (state, action) => {
      const cartItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id == cartItem.id,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push(cartItem);
      }
      state.totalAmount = state.cartItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0,
      );
      saveCartToStorage(state.cartItems, state.totalAmount);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((i) => i.id == id);
      if (item) {
        item.quantity = quantity;
      }
      state.totalAmount = state.cartItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0,
      );
      saveCartToStorage(state.cartItems, state.totalAmount);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
      state.totalAmount = state.cartItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0,
      );
      saveCartToStorage(state.cartItems, state.totalAmount);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      saveCartToStorage([], 0);
    },
  },
});

export const {
  setUserData,
  clearUser,
  setCity,
  setState,
  setCurrentAddress,
  setShopsInMyCity,
  setItemsInMyCity,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} = userSlice.actions;

export default userSlice.reducer;
