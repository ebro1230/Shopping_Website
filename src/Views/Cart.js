import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { useLocation } from "react-router-dom";

import CartItem from "../Components/CartItem";
import LoadingIndicator from "../Components/LoadingIndicator";
import CustomNav from "../Components/CustomNav";
import ProceedToCheckOut from "../Components/ProceedToCheckOut";
import UpdateCartButton from "../Components/UpdateCartButton";

const Cart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [oldCart, setOldCart] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setCart(location.state.oldCart.cart);
      location.state.oldCart.cart.forEach((item) => {
        setCartPrice(cartPrice + item.quantity * item.price);
      });
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
    setOldCart(
      cart.filter((item) => {
        return item.quantity > 0;
      })
    );
    cart.forEach((item) => {
      setCartPrice(cartPrice + item.quantity * item.price);
    });
  };

  const handleProceedToCheckOut = (e) => {
    e.preventDefault();
    setCart(
      cart.filter((item) => {
        return item.quantity > 0;
      })
    );
    setOldCart(
      cart.filter((item) => {
        return item.quantity > 0;
      })
    );
  };

  const handleEmptyCart = (e) => {
    e.preventDefault();
    setCart([]);
    setOldCart([]);
    setCartPrice(0);
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
          <>
            <Row>
              <Col xs={9} className="updateButton-div">
                <UpdateCartButton
                  oldCart={oldCart}
                  cart={cart}
                  onUpdate={handleUpdate}
                />
              </Col>
              <Col xs={3}></Col>
            </Row>
            <Row xs={2} className="g-4">
              <Col xs={9}>
                {cart.map((item) => (
                  <Col key={item.id}>
                    <CartItem
                      cardImage={item.image}
                      cardTitle={item.title}
                      cardRating={item.rating.rate}
                      cardPrice={item.price}
                      cardText={item.description}
                      cardQuantity={item.quantity}
                      cardOriginalQuantity={
                        oldCart.filter((oldItem) => {
                          return (oldItem.id = item.id);
                        }).quantity
                      }
                      cardId={item.id}
                      onPlus={handleOnPlus}
                      onMinus={handleOnMinus}
                    />
                  </Col>
                ))}
              </Col>
              <Col xs={3}>
                <ProceedToCheckOut
                  cartPrice={cartPrice}
                  onProceedToCheckOut={handleProceedToCheckOut}
                  onEmptyCart={handleEmptyCart}
                />
              </Col>
            </Row>
          </>
        ) : (
          <p>No Items In Cart</p>
        )}
      </div>
    </>
  );
};

export default Cart;
