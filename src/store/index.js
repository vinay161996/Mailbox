import { configureStore } from "@reduxjs/toolkit";
import authSlice, { authActions } from "./reducers/authSlice";
import emailChanger from "../features/emailChanger";

const authMiddleware = () => (next) => (action) => {
  if (authActions.login.match(action)) {
    const updatedEmail = emailChanger(action.payload.email);
    localStorage.setItem("email", JSON.stringify(updatedEmail));
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
  },
  middleware: (defaultMiddleware) => defaultMiddleware().concat(authMiddleware),
});

export default store;
