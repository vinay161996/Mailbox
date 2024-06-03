import { Button, Container } from "react-bootstrap";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { sendingEmailAction } from "../store/actions/mailInfoActions";

const Composed = () => {
  const typedVal = useRef();
  const [content, setContent] = useState("");
  const userEmail = useSelector((state) => state.auth.email);
  const loading = useSelector((state) => state.mailInfo.loading);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmitHandeler = (data) => {
    try {
      const enterValue = typedVal.current.editor.getText().trim();

      if (enterValue === "")
        return toast.error("Message Field cannot be blank");

      const submittedValue = {
        emailTo: data.email,
        senderMail: userEmail,
        subject: data.subject,
        typedText: enterValue,
        htmlFormat: content,
        read: false,
      };
      dispatch(sendingEmailAction(submittedValue));
      setValue("email", "");
      setValue("subject", "");
      setContent("");
    } catch (err) {
      console.log(err.message);
    }
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
          onSubmit={handleSubmit(onSubmitHandeler)}
          className="p-3 h-100 d-flex flex-column"
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
              validate: (value) =>
                value !== userEmail ||
                "Sender and Recipients must be different",
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
            <ReactQuill
              value={content}
              onChange={setContent}
              theme="snow"
              className="h-75"
              ref={typedVal}
            />
          </div>
          <Button disabled={loading} className="mb-3" type="submit">
            Send
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Composed;
