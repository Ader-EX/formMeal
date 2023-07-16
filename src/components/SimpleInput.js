import { useRef, useState, useEffect } from "react";
import useInput from "../hooks/useInput";

const SimpleInput = (props) => {
  const {
    enteredValue: enteredName,
    enteredValueIsValid: enteredNameIsValid,
    hasError: nameInputChecker,
    valueInputChangeHandler: nameInputChangeHandler,
    valueInputBlur: nameInputBlur,
    resetFunction: resetName,
  } = useInput((value) => value.trim() !== "");

  const {
    enteredValue: enteredEmail,
    enteredValueIsValid: enteredEmailIsValid,
    hasError: emailInputChecker,
    valueInputChangeHandler: emailInputChangeHandler,
    valueInputBlur: emailInputBlur,
    resetFunction: resetEmail,
  } = useInput((value) => {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(value.trim());
  });

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    console.log(enteredName);
    console.log(enteredEmail);
    resetName();

    resetEmail();
  };

  const nameInputClasses = nameInputChecker
    ? "form-control invalid"
    : "form-control ";

  const emailInputClasses = emailInputChecker
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onBlur={nameInputBlur}
          onChange={nameInputChangeHandler}
          value={enteredName}
        />
        {nameInputChecker && <p className="error-text">Name Isn't Valid</p>}
      </div>

      <div className={emailInputClasses}>
        <label htmlFor="name">Your Email</label>
        <input
          type="text"
          id="name"
          onBlur={emailInputBlur}
          onChange={emailInputChangeHandler}
          value={enteredEmail}
        />
        {emailInputChecker && <p className="error-text">Email Isn't Valid</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
