import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";

const UpdateCartButton = (props) => {
  const quantityChange = props.quantityChange;

  return (
    <div className="updateButton-div">
      {quantityChange ? (
        <Button variant="primary" onClick={props.onUpdate}>
          Update Cart
        </Button>
      ) : (
        <Button variant="secondary">Update Cart</Button>
      )}
    </div>
  );
};

export default UpdateCartButton;
