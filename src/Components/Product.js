import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Rating from "react-rating";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarF } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarE } from "@fortawesome/free-regular-svg-icons";

const ProductPage = (props) => {
  const [product, setProduct] = useState(props.product);
  const width = props.width;

  return (
    <>
      {width >= 576 ? (
        <Card key={product.itemId}>
          <Card.Body className="productCard-div">
            <Row>
              <Col xs={6}>
                <Row>
                  <Card.Img
                    variant="top"
                    className="productImg-div"
                    src={product.image}
                  />
                </Row>
              </Col>
              <Col xs={6} className="productRatingAndDescription-div">
                <Row>
                  <Card.Title className="cartItemTitle-div">
                    <h1>{product.title}</h1>
                  </Card.Title>
                </Row>
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
                      intialRating={product.rating}
                      placeholderRating={product.rating}
                      fractions={10}
                      step={1}
                      readonly
                      quiet
                    />
                  </div>
                </Row>
                <Row>
                  <Card.Text>
                    <h4>{product.description}</h4>
                  </Card.Text>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ) : (
        <Card key={product.itemId}>
          <Card.Img
            variant="top"
            className="productImg-div"
            src={product.image}
          />
          <Card.Body>
            <Card.Title className="cartItemTitle-div">
              <h1>{product.title}</h1>
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
                intialRating={product.rating}
                placeholderRating={product.rating}
                fractions={10}
                step={1}
                readonly
                quiet
              />
            </div>

            <Card.Text>
              <h4>{product.description}</h4>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default ProductPage;
