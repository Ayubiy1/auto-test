import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loadingg: false,
  collapsed: false,
  search: "",
  userActive: false,
};

const counterSlice = createSlice({
  name: "sopa",
  initialState,
  reducers: {
    setLoadingTrue: (state, actions) => {
      state.loadingg = actions.payload;
    },
  },
});

export const { setLoadingTrue } = counterSlice.actions;
export default counterSlice.reducer;
