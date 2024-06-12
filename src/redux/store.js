import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loadingg: false,
  collapsed: false,
  search: "",
  userActive: false,
  variantName: "",
};

const counterSlice = createSlice({
  name: "sopa",
  initialState,
  reducers: {
    setLoadingTrue: (state, actions) => {
      state.loadingg = actions.payload;
    },

    setVariantName: (state, action) => {
      state.variantName = action.payload;
    },
  },
});

export const { setLoadingTrue, setVariantName } = counterSlice.actions;
export default counterSlice.reducer;
