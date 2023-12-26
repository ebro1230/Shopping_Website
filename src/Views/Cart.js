import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";

import CartItem from "../Components/CartItem";
import LoadingIndicator from "../Components/LoadingIndicator";
import CustomNav from "../Components/CustomNav";
import ProceedToCheckOut from "../Components/ProceedToCheckOut";
import UpdateCartButton from "../Components/UpdateCartButton";

import useWindowResize from "../useWindowResize";

const Cart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [oldCart, setOldCart] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);
  const [newCartPrice, setNewCartPrice] = useState(0);
  const [quantityChange, setQuantityChange] = useState(false);
  const [id, setId] = useState("");
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  const { width, findScreenSize } = useWindowResize();

  window.addEventListener("resize", () => {
    findScreenSize();
  });

  useEffect(() => {
    findScreenSize();
    if (sessionStorage.getItem("oldCart")) {
      setCart(JSON.parse(sessionStorage.getItem("oldCart")));
      setOldCart(JSON.parse(sessionStorage.getItem("oldCart")));
      let price = 0;
      JSON.parse(sessionStorage.getItem("oldCart")).forEach((item) => {
        price = price + Number(item.quantity) * Number(item.price);
      });
      setCartPrice(price);
      setNewCartPrice(price);
    }
    if (sessionStorage.getItem("userType")) {
      setUserType(sessionStorage.getItem("userType"));
    }
    if (sessionStorage.getItem("userId")) {
      setId(sessionStorage.getItem("userId"));
    }
  }, []);

  const handleOnPlus = (e) => {
    e.preventDefault();
    let price = Number(newCartPrice);
    let difference = [];
    const increaseId = e.target.id;
    oldCart.forEach((oldItem) => {
      if (Number(oldItem.itemId) === Number(increaseId)) {
        price = Number(price) + Number(oldItem.price);
      }
    });
    for (let i = 0; i < cart.length; i++) {
      if (Number(cart[i].itemId) === Number(increaseId)) {
        if (Number(cart[i].quantity + 1) !== Number(oldCart[i].quantity)) {
          difference = [difference, true];
        }
      } else if (Number(cart[i].quantity) !== Number(oldCart[i].quantity)) {
        difference = [...difference, true];
      } else {
        difference = [...difference, false];
      }
    }
    setQuantityChange(difference.includes(true));
    setQuantityChange(difference.includes(true));
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
    let difference = [];
    let price = newCartPrice;
    oldCart.forEach((oldItem) => {
      if (Number(oldItem.itemId) === Number(decreaseId)) {
        if (
          cart.find((item) => item.itemId === oldItem.itemId).quantity !== 0
        ) {
          price = Number(price) - Number(oldItem.price);
        }
      }
    });
    for (let i = 0; i < cart.length; i++) {
      if (Number(cart[i].itemId) === Number(decreaseId)) {
        if (Number(cart[i].quantity - 1) !== Number(oldCart[i].quantity)) {
          difference = [difference, true];
        }
      } else if (Number(cart[i].quantity) !== Number(oldCart[i].quantity)) {
        difference = [...difference, true];
      } else {
        difference = [...difference, false];
      }
    }
    setQuantityChange(difference.includes(true));
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
    navigate(`/`);
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
    sessionStorage.setItem(
      "oldCart",
      JSON.stringify(
        cart.filter((item) => {
          return item.quantity > 0;
        })
      )
    );
    setCartPrice(newCartPrice);
    setQuantityChange(false);
  };

  const handleProceedToCheckOut = (e) => {
    e.preventDefault();
    navigate(`/checkout`);
  };

  const handleEmptyCart = (e) => {
    e.preventDefault();
    setCart([]);
    setOldCart([]);
    sessionStorage.setItem("oldCart", []);
    setCartPrice(0);
  };

  const handleItemClick = (e) => {
    e.preventDefault();
    const productId = Number(e.target.getAttribute("data-itemid"));
    navigate(`/product/${productId}`);
  };

  return (
    <>
      <CustomNav cart={cart} id={id} />
      <div className="items-container">
        {isLoading ? (
          <div className="loading-div">
            <LoadingIndicator />
          </div>
        ) : cart.length && width > 1074 ? (
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
                  <Col key={item.id} className="cartItemCol-div">
                    <CartItem
                      cardImage={item.image}
                      cardTitle={item.title}
                      cardRating={item.rating}
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
                      onItemClick={handleItemClick}
                      width={width}
                    />
                  </Col>
                ))}
              </Col>
              <Col xs={3} className="proceedToCheckoutCol-div">
                <ProceedToCheckOut
                  cartPrice={cartPrice}
                  onProceedToCheckOut={handleProceedToCheckOut}
                  onEmptyCart={handleEmptyCart}
                  onReturn={handleReturntoShopping}
                />
              </Col>
            </Row>
          </>
        ) : cart.length ? (
          <Col>
            <Row className="smallRowCart-div">
              <ProceedToCheckOut
                cartPrice={cartPrice}
                onProceedToCheckOut={handleProceedToCheckOut}
                onEmptyCart={handleEmptyCart}
                onReturn={handleReturntoShopping}
              />
            </Row>
            <Row>
              <Col className="updateButton-div">
                <UpdateCartButton
                  oldCart={oldCart}
                  cart={cart}
                  onUpdate={handleUpdate}
                  quantityChange={quantityChange}
                />
              </Col>
            </Row>
            <Row>
              {cart.map((item) => (
                <Col key={item.id} className="cartItemCol-div">
                  <CartItem
                    cardImage={item.image}
                    cardTitle={item.title}
                    cardRating={item.rating}
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
                    onItemClick={handleItemClick}
                    width={width}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        ) : width > 1074 ? (
          <Row>
            <Col xs={9}>
              <Card>
                <Card.Body className="noItemsBody-div">
                  <Card.Title className="noItems-div">
                    No Items In Cart
                  </Card.Title>
                </Card.Body>
              </Card>
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
        ) : (
          <Col>
            <Row>
              <ProceedToCheckOut
                cartPrice={cartPrice}
                onProceedToCheckOut={handleProceedToCheckOut}
                onEmptyCart={handleEmptyCart}
                onReturn={handleReturntoShopping}
              />
            </Row>
            <Row>
              <Card>
                <Card.Body className="noItemsBody-div">
                  <Card.Title className="noItems-div">
                    No Items In Cart
                  </Card.Title>
                </Card.Body>
              </Card>
            </Row>
          </Col>
        )}
      </div>
    </>
  );
};

export default Cart;
