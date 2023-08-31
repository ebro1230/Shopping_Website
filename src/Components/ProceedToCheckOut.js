import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const ProceedToCheckOut = (props) => {
  const cartPrice = props.cartPrice;

  return (
    <Card>
      <Card.Body className="ProceedToCheckOut-div">
        <Card.Title>Cart</Card.Title>
        <Card.Text>{cartPrice}</Card.Text>
        <Button onClick={props.onProceedToCheckOut}>Proceed to Checkout</Button>
        <Button onClick={props.EmptyCart}>Empty Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default ProceedToCheckOut;
