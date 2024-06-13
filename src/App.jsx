import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import AuthRootLayout from "./pages/auth/AuthRootLayout";
import Home from "./pages/home/Home";
import { useEffect } from "react";
import getEmailAndToken from "./features/getEmailAndToken";
import { useDispatch } from "react-redux";
import { authActions } from "./store/reducers/authSlice";
import Composed from "./pages/Composed";
import Profile from "./pages/profile/Profile";
import Inbox from "./pages/inbox/Inbox";
import Send from "./pages/send/Send";
import MailDetail from "./pages/inbox/MailDetail";
import NoContent from "./component/noContent/NoContent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <Composed />,
      },
      {
        path: "/draft",
        element: <NoContent />,
      },
      {
        path: "/starred",
        element: <NoContent />,
      },
      {
        path: "/trash",
        element: <NoContent />,
      },
      {
        path: "/inbox",
        children: [
          {
            index: true,
            element: <Inbox />,
          },
          {
            path: "detail/:mailId",
            element: <MailDetail opr={"inbox"} />,
          },
        ],
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/send",
        children: [
          {
            index: true,
            element: <Send />,
          },
          {
            path: "detail/:mailId",
            element: <MailDetail opr={"send"} />,
          },
        ],
      },
    ],
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
