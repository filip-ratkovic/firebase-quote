import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 theme : "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
   
    toggleTheme(state, action) {
        if (state.theme === "light") {
            state.theme = "dark";
          } else {
            state.theme = "light";
          }
          return state;
    },
  },
});
