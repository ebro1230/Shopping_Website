import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";

const HomePage = (props) => {
  const cardImage = props.cardImage;
  const cardTitle = props.cardTitle;
  const cardText = props.cardText;

  return (
    <Card>
      <Card.Img variant="top" src={cardImage} />
      <Card.Body>
        <Card.Title>{cardTitle}</Card.Title>
        <Card.Text>{cardText}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default HomePage;
