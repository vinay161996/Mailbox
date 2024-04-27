import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  token: "",
  email: "",
  isLoggedIn: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    login(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    logOut(state) {
      state.token = "";
      state.email = "";
      state.isLoggedIn = false;
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
