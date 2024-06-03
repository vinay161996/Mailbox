import { BsPencil, BsTrash } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { MdMail } from "react-icons/md";
import { RiDraftFill, RiLogoutBoxLine } from "react-icons/ri";
import { TiStarFullOutline, TiLocationArrow } from "react-icons/ti";
import { CgProfile } from "react-icons/cg";
import { Button } from "react-bootstrap";
import classes from "./SideBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/reducers/authSlice";

const navInfo = [
  {
    id: "inbox",
    name: "Inbox",
    symbol: <MdMail />,
    to: "/inbox",
  },
  {
    id: "draft",
    name: "Draft",
    symbol: <RiDraftFill />,
    to: "/draft",
  },
  {
    name: "Starred",
    id: "starred",
    symbol: <TiStarFullOutline />,
    to: "/starred",
  },
  {
    id: "send",
    name: "Send",
    symbol: <TiLocationArrow />,
    to: "/send",
  },
  {
    id: "trash",
    name: "Trash",
    symbol: <BsTrash />,
    to: "/trash",
  },
];

const SideBar = ({ showSidebar }) => {
  const dispatch = useDispatch();
  const inbox = useSelector((state) => state.mailInfo.inbox);

  const unreadMail = inbox.reduce(
    (acc, item) => (item.read ? acc : acc + 1),
    0
  );
  const handleLogout = () => {
    dispatch(authActions.logOut());
  };

  return (
    <>
      <aside
        style={{ maxWidth: "300px" }}
        className={`bg-opacity-50 text-light text-center p-2 p-md-4 d-flex flex-column vh-100 justify-content-between col col-md-4 col-lg-3 ${
          classes.sideBar
        } ${showSidebar ? classes.showSidebar : ""}`}
      >
        <section className="mt-3">
          <NavLink
            to={"/"}
            className="btn d-flex justify-content-start align-items-center fs-5 gap-2"
          >
            <BsPencil />
            <span className="fs-4 flex-grow-1">Compose</span>
          </NavLink>
          <hr className=" border-2 border-light" />

          {navInfo.map((item) => (
            <NavLink
              key={item.id}
              to={item.to}
              className="btn border-0 d-flex justify-content-start align-items-center fs-4 my-3"
            >
              {item.symbol}
              <span className="fs-4 flex-grow-1">{item.name}</span>
              {item.id == "inbox" && unreadMail !== 0 && (
                <span className="fs-6 bg-primary px-2 text-light  rounded-circle">
                  {unreadMail}
                </span>
              )}
            </NavLink>
          ))}
        </section>

        <section className="d-flex flex-column gap-2">
          <NavLink
            to={"/profile"}
            className="d-flex justify-content-center align-items-center fs-4 btn"
          >
            <CgProfile />
            <span className="fs-4 flex-grow-1">Profile</span>
          </NavLink>
          <Button
            variant="danger"
            className="d-flex justify-content-center align-items-center fs-5"
            onClick={handleLogout}
          >
            <RiLogoutBoxLine />
            <span className="fs-4 flex-grow-1">Logout</span>
          </Button>
        </section>
      </aside>
    </>
  );
};

export default SideBar;
