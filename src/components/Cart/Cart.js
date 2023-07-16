import { Fragment, useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [showForm, setShowForm] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const formItemHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-http-17c61-default-rtdb.asia-southeast1.firebasedatabase.app/form-data.json",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userData: userData,
          orderedItems: cartCtx.items,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data if needed
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.log(error);
      });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderHandler = () => {
    setShowForm(true);
  };

  const showButtonModal = () => {
    return (
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && (
          <button className={classes.button} onClick={orderHandler}>
            Order
          </button>
        )}
      </div>
    );
  };

  const cartModal = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showForm && (
        <Checkout onCancel={props.onClose} onConfirm={formItemHandler} />
      )}
      {!showForm && showButtonModal()}
    </Fragment>
  );

  const isSubmittingModalContent = <p>Sending Order Data....</p>;

  const didSubmitModalContent = (
    <Fragment>
      <h3>Order Successful</h3>
      <button className={classes.closeButton} onClick={props.onClose}>
        Close
      </button>
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModal}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
