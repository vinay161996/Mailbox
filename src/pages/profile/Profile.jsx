import { Button, Col, Container, Row } from "react-bootstrap";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import { BiSolidUserCircle } from "react-icons/bi";

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitHandler = (data) => {
    console.log(data);
  };

  return (
    <>
      <Container
        style={{
          minHeight: "80vh",
        }}
        className="rounded-5 w-75 shadow m-auto"
      >
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="p-3 h-100 d-flex flex-column"
        >
          <span className="fs-1 text-center">Your Profile</span>
          <div style={{ fontSize: "6rem" }} className="text-center">
            <BiSolidUserCircle />
          </div>
          <Input
            type="text"
            label="Name"
            id="name"
            error={errors?.email?.message}
            {...register("name", {
              required: "Required*",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Enter a valid email address",
              },
              validate: (value) =>
                value !== userEmail ||
                "Sender and Recipients must be different",
            })}
          />
          <Input
            type="email"
            label="Email"
            id="email"
            error={errors?.email?.message}
            {...register("email", {
              required: "Required*",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Enter a valid email address",
              },
              validate: (value) =>
                value !== userEmail ||
                "Sender and Recipients must be different",
            })}
          />
          <Input
            type="number"
            label="phone-Number"
            id="phoneNumber"
            error={errors?.email?.message}
            {...register("phoneNumber", {
              required: "Required*",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Enter a valid email address",
              },
              validate: (value) =>
                value !== userEmail ||
                "Sender and Recipients must be different",
            })}
          />
          <Input
            type="password"
            label="Password"
            id="password"
            error={errors?.subject?.message}
            {...register("password", {
              required: "Required*",
            })}
          />
          <Row className="">
            <Col>
              <Button className="mt-3 w-100" type="submit">
                Verify email
              </Button>
            </Col>
            <Col>
              <Button className="mt-3 w-100" type="submit">
                Edit
              </Button>
            </Col>
          </Row>
          <p className="text-center mt-2 fw-medium">
            Verify your email to use 100% feature
          </p>
        </form>
      </Container>
    </>
  );
};

export default Profile;
