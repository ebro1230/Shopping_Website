import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const ProceedToCheckOut = (props) => {
  const cartPrice = props.cartPrice;

  return (
    <Card>
      <Card.Body className="ProceedToCheckOut-div">
        <Card.Title className="cartTitle-div">Cart:</Card.Title>
        <Card.Text className="cartPrice-div">${cartPrice.toFixed(2)}</Card.Text>
        {cartPrice ? (
          <div className="cartButtons-div">
            <Button className="cartButton" onClick={props.onProceedToCheckOut}>
              Proceed to Checkout
            </Button>
            <Button className="cartButton" onClick={props.onEmptyCart}>
              Empty Cart
            </Button>
            <Button
              className="cartButton"
              variant="warning"
              onClick={props.onReturn}
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="cartButtons-div">
            <Button className="cartButton" variant="secondary">
              Proceed to Checkout
            </Button>
            <Button className="cartButton" variant="secondary">
              Empty Cart
            </Button>
            <Button
              className="cartButton"
              variant="warning"
              onClick={props.onReturn}
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProceedToCheckOut;
