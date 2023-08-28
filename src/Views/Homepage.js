import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";

import Item from "../Components/Item";
import shopping_cart from "../Images/shopping-cart.png";

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log(items);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
            <Col key={item.id}>
              <Item
                cardImage={item.image}
                cardTitle={item.title}
                cardText={item.description}
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
