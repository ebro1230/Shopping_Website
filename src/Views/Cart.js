import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { useLocation } from "react-router-dom";

import CartItem from "../Components/CartItem";
import LoadingIndicator from "../Components/LoadingIndicator";
import CustomNav from "../Components/CustomNav";

const Cart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setCart(location.state.oldCart.cart);
    }
  }, []);
  const handleOnPlus = (e) => {
    e.preventDefault();
    const increaseId = e.target.id;
    setCart(
      cart.map((item) => {
        if (Number(item.id) === Number(increaseId)) {
          return (item = {
            category: item.category,
            description: item.description,
            id: item.id,
            image: item.image,
            price: item.price,
            rating: item.rating,
            title: item.title,
            quantity: item.quantity + 1,
          });
        } else {
          return item;
        }
      })
    );
  };

  const handleOnMinus = (e) => {
    e.preventDefault();
    const decreaseId = e.target.id;
    setCart(
      cart.map((item) => {
        if (Number(item.id) === Number(decreaseId)) {
          return (item = {
            category: item.category,
            description: item.description,
            id: item.id,
            image: item.image,
            price: item.price,
            rating: item.rating,
            title: item.title,
            quantity: item.quantity === 0 ? 0 : item.quantity - 1,
          });
        } else {
          return item;
        }
      })
    );
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setCart(
      cart.filter((item) => {
        return item.quantity > 0;
      })
    );
  };

  return (
    <>
      <CustomNav cart={cart} />
      <div className="items-container">
        {isLoading ? (
          <div>
            <LoadingIndicator />
          </div>
        ) : cart.length ? (
          <Row xs={1} md={2} lg={3} xl={4} className="g-4">
            {cart.map((item) => (
              <Col key={item.id}>
                <CartItem
                  cardImage={item.image}
                  cardTitle={item.title}
                  cardRating={item.rating.rate}
                  cardPrice={item.price}
                  cardText={item.description}
                  cardQuantity={item.quantity}
                  cardId={item.id}
                  onPlus={handleOnPlus}
                  onMinus={handleOnMinus}
                  onUpdate={handleUpdate}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <p>No Items Available</p>
        )}
      </div>
    </>
  );
};

export default Cart;
