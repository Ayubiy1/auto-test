import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./store";

const store = configureStore({
  reducer: counterSlice,
});

export default store;
