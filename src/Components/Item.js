import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Rating from "react-rating";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarF } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarE } from "@fortawesome/free-regular-svg-icons";

const Item = (props) => {
  const cardImage = props.cardImage;
  const cardTitle = props.cardTitle;
  const cardRating = Number(props.cardRating);
  const cardPrice = props.cardPrice;
  const cardText = props.cardText;
  const cardId = props.cardId;
  const cardQuantity = props.cardQuantity;
  const totalPrice = (cardQuantity * cardPrice).toFixed(2);

  return (
    <Card>
      <Card.Img variant="top" src={cardImage} />
      <Card.Body>
        <Card.Title>{cardTitle}</Card.Title>
        <div className="card-rating">
          <Rating
            emptySymbol={
              <FontAwesomeIcon
                icon={faStarE}
                size="xl"
                style={{ color: "#f7eb02" }}
              />
            }
            fullSymbol={
              <FontAwesomeIcon
                icon={faStarF}
                size="xl"
                style={{ color: "#f7eb02" }}
              />
            }
            placeholderSymbol={
              <FontAwesomeIcon
                icon={faStarF}
                size="xl"
                style={{ color: "#f7eb02" }}
              />
            }
            intialRating={cardRating}
            placeholderRating={cardRating}
            fractions={10}
            step={1}
            readonly
            quiet
          />
        </div>
        <h3 className="card-price">${cardPrice}</h3>
        <Card.Text className="itemText-div">{cardText}</Card.Text>
        <div className="quantity-div">
          <Button id={cardId} onClick={props.onMinus}>
            -
          </Button>
          <p>Quantity: {cardQuantity}</p>
          <Button id={cardId} onClick={props.onPlus}>
            +
          </Button>
        </div>
        {cardQuantity > 0 ? (
          <div className="addToCart-div">
            <div>
              <p>Total Price: ${totalPrice}</p>
            </div>
            <Button
              id={cardId}
              data-quantity={cardQuantity}
              onClick={props.onAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        ) : null}
      </Card.Body>
    </Card>
  );
};

export default Item;
