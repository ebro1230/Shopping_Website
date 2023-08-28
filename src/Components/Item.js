import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const HomePage = (props) => {
  const cardImage = props.cardImage;
  const cardTitle = props.cardTitle;
  const cardText = props.cardText;
  const number = 0;

  return (
    <Card>
      <Card.Img variant="top" src={cardImage} />
      <Card.Body>
        <Card.Title>{cardTitle}</Card.Title>
        <Card.Text>{cardText}</Card.Text>
        <div className="quantity-div">
          <Button>-</Button>
          <p>Quantity: {number}</p>
          <Button>+</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default HomePage;
