import { forwardRef } from "react";
import classes from "./Input.module.css";

const Input = forwardRef(function Input({ id, error, label, ...props }, ref) {
  return (
    <>
      <div className={classes.inputContainer}>
        <div className="position-relative">
          <input
            {...props}
            ref={ref}
            placeholder=" "
            className={`${classes.input} ${props.className}`}
            id={id}
          />
          <label className={classes.label} htmlFor={id}>
            {label}
          </label>
        </div>
      </div>
      {error && <p className="text-danger m-0">{error}</p>}
    </>
  );
});

export default Input;
