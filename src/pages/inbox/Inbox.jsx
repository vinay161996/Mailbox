import { Col, Container, Row } from "react-bootstrap";
import { FaCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import NoMail from "../../component/noMail/NoMail";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletingEmailAction } from "../../store/actions/mailInfoActions";

const Inbox = () => {
  const inboxMail = useSelector((state) => state.mailInfo.inbox);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeRoute = (id) => {
    navigate(`detail/${id}`);
  };

  const handleDelete = (emailId, e) => {
    e.stopPropagation();
    dispatch(deletingEmailAction(emailId, "inbox"));
  };

  return (
    <Container
      className="mt-4 mx-auto rounded shadow p-3 bg-dark-subtle"
      style={{ maxWidth: "95%", minHeight: "90vh" }}
    >
      {inboxMail.map((item) => (
        <Row
          onClick={() => changeRoute(item.id)}
          key={item.id}
          style={{ cursor: "pointer" }}
          className="mb-2"
        >
          <Col className=" rounded mx-1 p-2 bg-primary-subtle d-flex align-items-center justify-content-between">
            <div className=" d-flex gap-2 align-items-center">
              <FaCircle
                style={{ color: `${item.read ? "#cfe2ff" : "#0d6efd"}` }}
              />
              <h5>From : [{item.senderMail} ]</h5>
              <h5>Subject : [ {item.subject}... ]</h5>
            </div>
            <MdDelete
              onClick={(e) => handleDelete(item.id, e)}
              style={{ cursor: "pointer" }}
              className=" text-danger fs-3"
            />
          </Col>
        </Row>
      ))}
      {inboxMail.length === 0 && <NoMail />}
    </Container>
  );
};

export default Inbox;
