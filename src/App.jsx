import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import AuthRootLayout from "./pages/auth/AuthRootLayout";
import Home from "./pages/home/Home";
import { useEffect } from "react";
import getEmailAndToken from "./features/getEmailAndToken";
import { useDispatch } from "react-redux";
import { authActions } from "./store/reducers/authSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth",
    element: <AuthRootLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "signUp",
        element: <SignUp />,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const { email, token } = getEmailAndToken();
    if (!!email && !!token) {
      dispatch(authActions.login({ email, token }));
    }
  }, [dispatch]);
  return <RouterProvider router={router} />;
}

export default App;
