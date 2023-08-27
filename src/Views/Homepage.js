import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Item from "../Components/Item";
import shopping_cart from "../Images/shopping-cart.png";

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log(items);

  useEffect(() => {
    setItems([
      {
        number: 1,
        cardImage: shopping_cart,
        cardTitle: `This is my Title 1`,
        cardText: "This is my text",
      },
      {
        number: 2,
        cardImage: shopping_cart,
        cardTitle: `This is my Title 2`,
        cardText: "This is my text",
      },
      {
        number: 3,
        cardImage: shopping_cart,
        cardTitle: `This is my Title 3`,
        cardText: "This is my text",
      },
      {
        number: 4,
        cardImage: shopping_cart,
        cardTitle: `This is my Title 4`,
        cardText: "This is my text",
      },
    ]);
  }, []);

  return (
    <div className="items-container">
      {isLoading ? (
        <div>
          <h1>LOADING...</h1>
        </div>
      ) : items.length ? (
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {items.map((item) => (
            <Col key={item.number}>
              <Item
                cardImage={item.cardImage}
                cardTitle={item.cardTitle}
                cardText={item.cardText}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <p>No Items Available</p>
      )}
    </div>
  );
};

export default HomePage;
