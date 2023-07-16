import { useState, useRef } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const isValueEmpty = (value) => value.trim() === "";
  const isNotFiveChars = (value) => value.trim().length !== 5;

  const nameRef = useRef("");
  const streetRef = useRef("");
  const postalRef = useRef("");
  const cityRef = useRef("");

  const confirmHandler = (event) => {
    event.preventDefault();

    const name = nameRef.current.value;
    const street = streetRef.current.value;
    const postal = postalRef.current.value;
    const city = cityRef.current.value;

    const nameRefValid = !isValueEmpty(name);
    const streetRefValid = !isValueEmpty(street);
    const postalRefValid = !isNotFiveChars(postal);
    const cityRefValid = !isValueEmpty(city);

    setFormInputValidity({
      name: nameRefValid,
      street: streetRefValid,
      postal: postalRefValid,
      city: cityRefValid,
    });

    const isFormValid =
      nameRefValid && streetRefValid && postalRefValid && cityRefValid;
    if (!isFormValid) {
      return;
    }

    if (isFormValid) {
      props.onConfirm({
        name: name,
        street: street,
        postal: postal,
        city: city,
      });
    }
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          !formInputValidity.name ? classes.invalid : ""
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input ref={nameRef} type="text" id="name" />
        {!formInputValidity.name && <p>Name Not Valid</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formInputValidity.street ? classes.invalid : ""
        }`}
      >
        <label htmlFor="street">Street</label>
        <input ref={streetRef} type="text" id="street" />
        {!formInputValidity.street && <p>Street Not Valid</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formInputValidity.postal ? classes.invalid : ""
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalRef} type="text" id="postal" />
        {!formInputValidity.postal && <p>Postal Not Valid</p>}
      </div>
      <div
        className={`${classes.control} ${
          !formInputValidity.city ? classes.invalid : ""
        }`}
      >
        <label htmlFor="city">City</label>
        <input ref={cityRef} type="text" id="city" />
        {!formInputValidity.city && <p>City Not Valid</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
