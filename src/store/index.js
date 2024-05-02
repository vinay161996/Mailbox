import { configureStore } from "@reduxjs/toolkit";
import authSlice, { authActions } from "./reducers/authSlice";
import userInfoSlice from "./reducers/userInfoSlice";

const authMiddleware = () => (next) => (action) => {
  if (authActions.login.match(action)) {
    localStorage.setItem("email", JSON.stringify(action.payload.email));
    localStorage.setItem("token", JSON.stringify(action.payload.token));
  }
  if (authActions.logOut.match(action)) {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
  }
  return next(action);
};

const store = configureStore({
  reducer: {
    auth: authSlice,
    userInfo: userInfoSlice,
  },
  middleware: (defaultMiddleware) => defaultMiddleware().concat(authMiddleware),
});

export default store;
