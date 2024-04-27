import { Container, Row, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../../ui/Input";
import useFetch from "../../hooks/useFetch";
import { toast } from "react-toastify";

const SignUp = () => {
  const { isLoading, sendingReq } = useFetch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      const reqConfig = {
        endPoint:
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDC2MVcn7-mwsUSF3KjkHewIMUawqwDFr8",
        method: "POST",
        body: {
          email,
          password,
          returnSecureToken: true,
        },
        headers: {
          "Content-Type": "application/json",
        },
      };
      const [receiveData] = await sendingReq([reqConfig]);
      if (receiveData.error) throw new Error(receiveData.error.message);
      navigate("/auth");
    } catch (err) {
      toast.error(err.message ? err.message : "Failed to SignUp");
    }
  };

  return (
    <>
      <Container className="vh-100 vw-100 d-flex flex-column align-items-center justify-content-center">
        <Row className="mw-25 shadow py-4 px-3 bg-white border border-primary border-opacity-25 rounded py-5 ">
          <h3 className="fw-normal text-center">SignUp</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              })}
            />

            <Input
              error={errors?.password?.message}
              type="password"
              label="Password"
              id="password"
              {...register("password", {
                required: "Required*",
                minLength: {
                  value: 8,
                  message: "Should be minimun of 8 characters",
                },
              })}
            />
            <Input
              type="password"
              label="Confirm Password"
              id="confirmPassword"
              error={errors?.confirmPassword?.message}
              {...register("confirmPassword", {
                required: "Required*",
                validate: (value) =>
                  value === getValues().password || "Password need to match",
              })}
            />
            <Button
              type="submit"
              className="w-100 mt-4 py-2 text-white border-0 rounded-pill "
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>
        </Row>
        <Row className="my-4">
          <Button
            onClick={() => navigate("/auth")}
            variant="outline-primary"
            className="w-100"
          >
            Have an account? Login
          </Button>
        </Row>
      </Container>
    </>
  );
};

export default SignUp;
