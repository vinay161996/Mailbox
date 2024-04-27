import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../../ui/Input";
import useFetch from "../../hooks/useFetch";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/reducers/authSlice";

const Login = () => {
  const [isForgetPassword, setIsForgetPassword] = useState(false);
  const { isLoading, sendingReq } = useFetch();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userLogin = async (data) => {
    try {
      const { email, password } = data;
      const reqConfig = {
        endPoint:
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDC2MVcn7-mwsUSF3KjkHewIMUawqwDFr8",
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
      const { idToken } = receiveData;
      dispatch(authActions.login({ email, token: idToken }));
      toast.success("Login success");
    } catch (err) {
      throw new Error(err.message ? err.message : "Failed to login");
    }
  };
  const forgetPasswordHandler = async (data) => {
    try {
      const { email } = data;
      const reqConfig = {
        endPoint:
          "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDC2MVcn7-mwsUSF3KjkHewIMUawqwDFr8",
        method: "POST",
        body: {
          email,
          requestType: "PASSWORD_RESET",
        },
        headers: {
          "Content-Type": "application/json",
        },
      };
      await sendingReq([reqConfig]);
      toast.success("Check your email");
    } catch (err) {
      throw new Error(err.message ? err.message : "Failed to reset");
    }
  };

  const onSubmit = async (data) => {
    try {
      if (!isForgetPassword) await userLogin(data);
      else await forgetPasswordHandler(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <Container className="vh-100 vw-100 d-flex flex-column align-items-center justify-content-center">
        <Row className="mw-25 shadow py-4 px-3 bg-white border border-primary border-opacity-25 rounded py-5 ">
          <h3 className="fw-normal text-center">Login</h3>
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

            {!isForgetPassword && (
              <>
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
                <Button
                  type="submit"
                  className="w-100 mt-4 py-2 text-white border-0 rounded-pill "
                  disabled={isLoading}
                >
                  {isLoading ? "Loging In..." : "Log In"}
                </Button>
                <Col className=" mt-2 d-flex align-items-center justify-content-center">
                  <Button
                    onClick={() => setIsForgetPassword((prev) => !prev)}
                    variant="link"
                  >
                    Forget password
                  </Button>
                </Col>
              </>
            )}
            {isForgetPassword && (
              <Button
                type="submit"
                className="w-100 mt-4 py-2 text-white border-0 rounded-pill "
              >
                Reset Password
              </Button>
            )}
          </form>
        </Row>
        <Row className="my-4">
          <Button
            onClick={() => navigate("signUp")}
            variant="outline-primary"
            className="w-100"
          >
            Don`t have an account? SignUp
          </Button>
        </Row>
      </Container>
    </>
  );
};

export default Login;
