import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const AddToCart = (props) => {
  const product = props.product;
  return (
    <Card>
      <Card.Body className="addToCheckOut-div">
        {/* <Card.Title className="cartTitle-div">Cart:</Card.Title>
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
        ) : ( */}
        <div className="quantity-div">
          <Button id={product.itemId} onClick={props.onMinus}>
            -
          </Button>
          <p>Quantity: {product.quantity}</p>
          <Button id={product.itemId} onClick={props.onPlus}>
            +
          </Button>
        </div>
        <div className="productCartButtons-div">
          {product.quantity === 0 ? (
            <Button className="cartButton" variant="secondary">
              Add to Cart
            </Button>
          ) : (
            <Button
              className="cartButton"
              variant="primary"
              onClick={props.onAddToCart}
            >
              Add to Cart
            </Button>
          )}

          <Button
            className="cartButton"
            variant="warning"
            onClick={props.onReturn}
          >
            Continue Shopping
          </Button>
        </div>
        {/* )} */}
      </Card.Body>
    </Card>
  );
};

export default AddToCart;
