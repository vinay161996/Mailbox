import { Container, Row, Col } from "react-bootstrap";
import { BiStar } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { mailReadingAction } from "../../store/actions/mailInfoActions";

const MailDetail = ({ opr }) => {
  const mailInfo = useSelector((state) => state.mailInfo);
  const dispatch = useDispatch();
  const { mailId } = useParams();

  let currentMailInfo = {};
  if (opr === "send") {
    mailInfo.send.forEach((element) => {
      if (element.id === mailId) {
        currentMailInfo = element;
      }
    });
  } else {
    mailInfo.inbox.forEach((element) => {
      if (element.id === mailId) {
        currentMailInfo = element;
      }
      if (!currentMailInfo.read) {
        dispatch(mailReadingAction(mailId));
      }
    });
  }

  return (
    <Container
      className=" mt-5 mx-auto rounded shadow p-3  fw-light"
      style={{ maxWidth: "95%", minHeight: "80vh" }}
    >
      <Row className="mb-2">
        <Col className=" rounded mx-1 p-2 bg-primary-subtle d-flex align-items-center justify-content-between">
          <div className=" d-flex gap-2 align-items-center">
            <BiStar />
            {opr === "send" ? (
              <h5>To : [ {currentMailInfo.emailTo}]</h5>
            ) : (
              <h5>From : [ {currentMailInfo.senderMail}]</h5>
            )}
          </div>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <span>Subject : {currentMailInfo.subject}</span>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col
          dangerouslySetInnerHTML={{ __html: currentMailInfo.htmlFormat }}
        ></Col>
      </Row>
    </Container>
  );
};

export default MailDetail;
