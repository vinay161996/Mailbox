import { Container } from "react-bootstrap";
import SideBar from "../../component/sideBar/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosCloseCircle } from "react-icons/io";
import { useEffect, useState } from "react";
import { fetchingEmails } from "../../store/actions/mailInfoActions";

const Home = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [showSidebar, setShowSidebar] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchingEmails());
  }, [dispatch]);

  return (
    <>
      {!isLoggedIn && <Navigate to={"/auth"} />}
      <Container fluid className="p-0 d-flex">
        <SideBar showSidebar={showSidebar} />

        <div
          style={{ minHeight: "100svh" }}
          className="bg-light flex-grow-1 d-flex flex-column"
        >
          <div className="d-block d-md-none z-3 p-3 bg-dark-subtle position-sticky top-0">
            <div className="d-flex justify-content-between">
              <GiHamburgerMenu
                onClick={() => setShowSidebar((prev) => !prev)}
                className="fs-2"
              />
              {showSidebar && (
                <IoIosCloseCircle
                  onClick={() => setShowSidebar((prev) => !prev)}
                  className="fs-3"
                />
              )}
            </div>
          </div>
          <Outlet />
        </div>
      </Container>
    </>
  );
};

export default Home;
