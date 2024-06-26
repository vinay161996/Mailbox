import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthRootLayout = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return <>{isLoggedIn ? <Navigate to={"/"} /> : <Outlet />}</>;
};

export default AuthRootLayout;
