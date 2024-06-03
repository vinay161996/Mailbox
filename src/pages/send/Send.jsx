import { Col, Container, Row } from "react-bootstrap";
import { BiStar } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import NoMail from "../../component/noMail/NoMail";
import { useNavigate } from "react-router-dom";
import { deletingEmailAction } from "../../store/actions/mailInfoActions";

const Send = () => {
  const sendMail = useSelector((state) => state.mailInfo.send);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeRoute = (id) => {
    navigate(`detail/${id}`);
  };

  const handleDelete = (emailId, e) => {
    e.stopPropagation();
    dispatch(deletingEmailAction(emailId, "send"));
  };

  return (
    <Container
      className="mt-4 mx-auto rounded shadow p-3 bg-dark-subtle"
      style={{ maxWidth: "95%", minHeight: "90vh" }}
    >
      {sendMail.map((item) => (
        <Row
          onClick={() => changeRoute(item.id)}
          key={item.id}
          style={{ cursor: "pointer" }}
          className="mb-2"
        >
          <Col className=" rounded mx-1 p-2 bg-primary-subtle d-flex align-items-center justify-content-between">
            <div className=" d-flex gap-2 align-items-center">
              <BiStar />
              <h5>To : [{item.emailTo} ]</h5>
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
      {sendMail.length === 0 && <NoMail />}
    </Container>
  );
};

export default Send;
