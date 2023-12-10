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
  const cardItemId = props.cardItemId;
  const cardOldQuantity = props.cardOldQuantity;
  const totalPrice = (cardQuantity * cardPrice).toFixed(2);
  const width = props.width;

  return (
    <>
      {width >= 1074 ? (
        <Card key={cardItemId}>
          <Card.Body className="cartItemCard-div">
            <Row>
              <Col>
                <Row>
                  <Card.Img
                    variant="top"
                    src={cardImage}
                    data-itemid={cardItemId}
                    onClick={props.onItemClick}
                  />
                </Row>
                <Row>
                  <Card.Title
                    className="cartItemTitle-div"
                    data-itemid={cardItemId}
                    onClick={props.onItemClick}
                  >
                    {cardTitle}
                  </Card.Title>
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
                  <Button
                    id={cardItemId}
                    onClick={props.onMinus}
                    data-quantity={cardQuantity}
                  >
                    -
                  </Button>
                  <p>Quantity: {cardQuantity}</p>
                  <Button
                    id={cardItemId}
                    onClick={props.onPlus}
                    data-quantity={cardQuantity}
                  >
                    +
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ) : (
        <Card key={cardItemId}>
          <Card.Body className="cartItemCard-div">
            <Col className>
              <Card.Img
                variant="top"
                src={cardImage}
                data-itemid={cardItemId}
                onClick={props.onItemClick}
              />

              <Card.Title
                className="cartItemTitle-div"
                data-itemid={cardItemId}
                onClick={props.onItemClick}
              >
                {cardTitle}
              </Card.Title>

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

              <Card.Text>{cardText}</Card.Text>

              <div className="quantity-div">
                <Button
                  id={cardItemId}
                  onClick={props.onMinus}
                  data-quantity={cardQuantity}
                >
                  -
                </Button>
                <p>Quantity: {cardQuantity}</p>
                <Button
                  id={cardItemId}
                  onClick={props.onPlus}
                  data-quantity={cardQuantity}
                >
                  +
                </Button>
              </div>
            </Col>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default CartItem;
