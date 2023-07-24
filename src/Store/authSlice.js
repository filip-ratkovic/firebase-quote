import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  email: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setData(state, actions) {
      const data = actions.payload;
      state = data;
      return state;
    },
    logout(state, actions) {
      return initialState;
    },
  },
});