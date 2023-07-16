import { useState } from "react";

const useInput = (validateInput) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [enteredValueTouched, setEnteredValueTouched] = useState(false);

  const enteredValueIsValid = validateInput(enteredValue);
  const hasError = !enteredValueIsValid && enteredValueTouched;

  const valueInputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const valueInputBlur = (event) => {
    setEnteredValueTouched(true);
  };

  const resetFunction = () => {
    setEnteredValue("");
    setEnteredValueTouched(false);
  };
  return {
    enteredValue,
    enteredValueIsValid,
    hasError,
    valueInputChangeHandler,
    valueInputBlur,
    resetFunction,
  };
};

export default useInput;
