import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

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
  const [newCartPrice, setNewCartPrice] = useState(0);
  const [quantityChange, setQuantityChange] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      setCart(location.state.oldCart.cart);
      setOldCart(location.state.oldCart.cart);
      let price = 0;
      location.state.oldCart.cart.forEach((item) => {
        console.log(cartPrice);
        price = price + Number(item.quantity) * Number(item.price);
      });
      setCartPrice(price);
      setNewCartPrice(price);
    }
  }, []);

  const handleOnPlus = (e) => {
    e.preventDefault();
    let price = Number(newCartPrice);
    const increaseId = e.target.id;
    const increaseQuantity = Number(e.target.getAttribute("data-quantity")) + 1;
    oldCart.forEach((item) => {
      if (Number(item.itemId) === Number(increaseId)) {
        price = Number(price) + Number(item.price);
        if (item.quantity != increaseQuantity) {
          setQuantityChange(true);
        } else {
          setQuantityChange(false);
        }
      }
    });
    setNewCartPrice(price);
    setCart(
      cart.map((item) => {
        if (Number(item.itemId) === Number(increaseId)) {
          return (item = {
            category: item.category,
            description: item.description,
            id: item.id,
            itemId: item.itemId,
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
    let price = newCartPrice;
    console.log(decreaseId);
    const decreaseQuantity = Number(e.target.getAttribute("data-quantity")) - 1;
    oldCart.forEach((item) => {
      if (Number(item.itemId) === Number(decreaseId)) {
        if (item.quantity != 0) {
          price = Number(price) - Number(item.price);
        }
        if (item.quantity != decreaseQuantity) {
          setQuantityChange(true);
        } else {
          setQuantityChange(false);
        }
      }
    });
    setNewCartPrice(Number(price));
    setCart(
      cart.map((item) => {
        if (Number(item.itemId) === Number(decreaseId)) {
          return (item = {
            category: item.category,
            description: item.description,
            id: item.id,
            itemId: item.itemId,
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

  const handleReturntoShopping = (e) => {
    e.preventDefault();
    navigate("/", { state: { oldCart: { cart } } });
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
    setCartPrice(newCartPrice);

    setQuantityChange(false);
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
                  quantityChange={quantityChange}
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
                      cardItemId={item.itemId}
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
                  onReturn={handleReturntoShopping}
                />
              </Col>
            </Row>
          </>
        ) : (
          <Row>
            <Col xs={9}>
              <p>No Items In Cart</p>
            </Col>

            <Col xs={3}>
              <ProceedToCheckOut
                cartPrice={cartPrice}
                onProceedToCheckOut={handleProceedToCheckOut}
                onEmptyCart={handleEmptyCart}
                onReturn={handleReturntoShopping}
              />
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

export default Cart;
