import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialAuthState = {
  user: Cookies.get("user") || null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.user = Cookies.get("user");
      window.location.href = "/";
    },

    logout(state) {
      Cookies.remove("user");
      state.user = false;
      window.location.href = "/login";
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
