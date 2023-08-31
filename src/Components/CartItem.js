import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Rating from "react-rating";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarF } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarE } from "@fortawesome/free-regular-svg-icons";

const CartItem = (props) => {
  const cardImage = props.cardImage;
  const cardTitle = props.cardTitle;
  const cardRating = Number(props.cardRating);
  const cardPrice = props.cardPrice;
  const cardText = props.cardText;
  const cardId = props.cardId;
  const cardQuantity = props.cardQuantity;
  const cardOldQuantity = props.cardOldQuantity;
  const totalPrice = (cardQuantity * cardPrice).toFixed(2);

  return (
    <Card>
      <Card.Body className="cartItemCard-div">
        <Row>
          <Col>
            <Row>
              <Card.Img variant="top" src={cardImage} />
            </Row>
            <Row>
              <Card.Title className="cartItemTitle-div">{cardTitle}</Card.Title>
            </Row>
          </Col>
          <Col className="cartRatingAndDescription-div">
            <Row>
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
            </Row>
            <Row>
              <Card.Text>{cardText}</Card.Text>
            </Row>
          </Col>
          <Col className="cartQuantity-div">
            <div className="quantity-div">
              <Button id={cardId} onClick={props.onMinus}>
                -
              </Button>
              <p>Quantity: {cardQuantity}</p>
              <Button id={cardId} onClick={props.onPlus}>
                +
              </Button>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CartItem;
