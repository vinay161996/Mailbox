import { Button, Container } from "react-bootstrap";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Composed = () => {
  const typedVal = useRef(null);
  const userEmail = useSelector((state) => state.auth.email);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitHandeler = (data) => {
    const enterValue = typedVal.current.editor.getText().trim();
    const enterHtmlFormat = typedVal.current.value;
    if (enterValue === "") return toast.error("Message Field cannot be blank");
  };
  return (
    <div className=" bg-light flex-grow-1 d-flex g-3 flex-column">
      <div className="mb-4 z-3 p-3 bg-dark-subtle position-sticky top-0">
        hello
      </div>
      <Container
        style={{
          minHeight: "80vh",
        }}
        className="rounded-5 w-75 shadow"
      >
        <form
          onSubmit={handleSubmit(onSubmitHandeler)}
          className="p-3 mt-2 h-100 d-flex flex-column"
        >
          <span className="fs-1">New Message</span>
          <div>
            <span className=" mt-2">From: {userEmail}</span>
          </div>
          <Input
            type="email"
            label="To"
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
            type="text"
            label="Subject"
            id="subject"
            error={errors?.subject?.message}
            {...register("subject", {
              required: "Required*",
            })}
          />
          <div className="mt-4 flex-grow-1">
            <ReactQuill theme="snow" className="h-75" ref={typedVal} required />
          </div>
          <Button className="mb-3" type="submit">
            Send
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Composed;
