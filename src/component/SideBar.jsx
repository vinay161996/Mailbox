import { BsPencil, BsTrash } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { MdMail } from "react-icons/md";
import { RiDraftFill, RiLogoutBoxLine } from "react-icons/ri";
import { TiStarFullOutline, TiLocationArrow } from "react-icons/ti";
import { CgProfile } from "react-icons/cg";

const navInfo = [
  {
    id: "inbox",
    name: "Inbox",
    symbol: <MdMail />,
    to: "/",
  },
  {
    id: "draft",
    name: "Draft",
    symbol: <RiDraftFill />,
    to: "/",
  },
  {
    name: "Starred",
    id: "starred",
    symbol: <TiStarFullOutline />,
    to: "/",
  },
  {
    id: "send",
    name: "Send",
    symbol: <TiLocationArrow />,
    to: "/",
  },
  {
    id: "trash",
    name: "Trash",
    symbol: <BsTrash />,
    to: "/",
  },
];

const SideBar = () => {
  return (
    <>
      <aside
        style={{ maxWidth: "350px" }}
        className=" bg-black bg-opacity-75 text-light text-center p-2 p-md-4 d-flex flex-column vh-100 justify-content-between col col-md-4 col-lg-3 position-sticky top-0 start-0 overflow-y-auto"
      >
        <section className="mt-3">
          <NavLink className="btn d-flex justify-content-start align-items-center fs-5 gap-2">
            <BsPencil />
            <span className="fs-4 flex-grow-1">Compose</span>
          </NavLink>
          <hr className=" border-2 border-light" />

          {navInfo.map((item) => (
            <NavLink
              key={item.id}
              to={item.to}
              className="btn border-0 d-flex justify-content-start align-items-center fs-5 my-3 "
            >
              {item.symbol}
              <span className="fs-5 flex-grow-1">{item.name}</span>
            </NavLink>
          ))}
        </section>

        <section>
          <NavLink className="d-flex justify-content-center align-items-center fs-5 btn gap-2 my-3">
            <CgProfile />
            <span>Profile</span>
          </NavLink>
          <NavLink className="d-flex justify-content-center align-items-center fs-5 btn gap-2 my-3">
            <RiLogoutBoxLine />
            <span>Logout</span>
          </NavLink>
        </section>
      </aside>
    </>
  );
};

export default SideBar;
