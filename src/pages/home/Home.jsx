import { Container } from "react-bootstrap";
import SideBar from "../../component/SideBar";
import Composed from "../Composed";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Home = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <>
      {!isLoggedIn && <Navigate to={"/auth"} />}
      <Container fluid className="p-0 d-flex">
        <SideBar />
        <Composed />
      </Container>
    </>
  );
};

export default Home;
