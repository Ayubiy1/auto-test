import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loadingg: false,
  collapsed: false,
  search: "",
  userActive: false,
  variantName: "",
  choosedMenu: ""
};

const counterSlice = createSlice({
  name: "auto-test",
  initialState,
  reducers: {
    setLoadingTrue: (state, actions) => {
      state.loadingg = actions.payload;
    },

    setVariantName: (state, action) => {
      state.variantName = action.payload;
    },

    setChoosedMenu: (state, action) => {
      state.choosedMenu = action.payload
    }
  },
});

export const { setLoadingTrue, setVariantName, setChoosedMenu } = counterSlice.actions;
export default counterSlice.reducer;
