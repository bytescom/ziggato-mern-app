import { configureStore } from "@reduxjs/toolkit";
import mapSlice from "./slices/mapSlice";
import ownerSlice from "./slices/ownerSlice";
import userSlice from "./slices/userSlice";

// step - 1
export const store = configureStore({
  reducer: {
    user: userSlice,
    owner: ownerSlice,
    map: mapSlice,
  },
});
