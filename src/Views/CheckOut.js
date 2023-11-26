import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Accordion from "react-bootstrap/Accordion";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";

import CartItem from "../Components/CartItem";
import UpdateCartButton from "../Components/UpdateCartButton";
import LoadingIndicator from "../Components/LoadingIndicator";

import useWindowResize from "../useWindowResize";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";

import { countryNames, stateAbbreviations, months, years } from "../utils";

import CustomNav from "../Components/CustomNav";

const CheckOut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [oldCart, setOldCart] = useState([]);
  const [cartPrice, setCartPrice] = useState([]);
  const [newCartPrice, setNewCartPrice] = useState([]);
  const [quantityChange, setQuantityChange] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [deliveryName, setDeliveryName] = useState([]);
  const [street, setStreet] = useState([]);
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [postalCode, setPostalCode] = useState([]);
  const [cardName, setCardName] = useState([]);
  const [cardNumber, setCardNumber] = useState([]);
  const [expirationMonth, setExpirationMonth] = useState([]);
  const [expirationYear, setExpirationYear] = useState([]);
  const [CCV, setCCV] = useState([]);
  const [differentAddress, setDifferentAddress] = useState(false);
  const [billingStreet, setBillingStreet] = useState([]);
  const [billingCountry, setBillingCountry] = useState([]);
  const [billingState, setBillingState] = useState([]);
  const [billingCity, setBillingCity] = useState([]);
  const [billingPostalCode, setBillingPostalCode] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const { width, findScreenSize } = useWindowResize();

  window.addEventListener("resize", () => {
    findScreenSize();
  });

  useEffect(() => {
    findScreenSize();
    if (location.state) {
      setCart(location.state.oldCart.cart);
      setOldCart(location.state.oldCart.cart);
      let price = 0;
      location.state.oldCart.cart.forEach((item) => {
        price = price + Number(item.quantity) * Number(item.price);
      });
      setCartPrice(price);
      setNewCartPrice(price);
    }
  }, []);

  const handleOnPlus = (e) => {
    e.preventDefault();
    let price = Number(newCartPrice);
    let difference = [];
    const increaseId = e.target.id;
    const increaseQuantity = Number(e.target.getAttribute("data-quantity")) + 1;
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
    const decreaseQuantity = Number(e.target.getAttribute("data-quantity")) - 1;
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
    navigate("/", { state: { oldCart: { cart } } });
  };

  const handleEmptyCart = (e) => {
    e.preventDefault();
    setCart([]);
    setOldCart([]);
    setCartPrice(0);
  };

  const handlePay = (e) => {
    e.preventDefault();
    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
    }, 3000);
    setCart([]);
    setCartPrice(0);
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

  const handleItemClick = (e) => {
    e.preventDefault();
    const productId = Number(e.target.getAttribute("data-itemid"));
    navigate(`/product/${productId}`, { state: { oldCart: { cart } } });
  };

  return (
    <>
      <CustomNav cart={cart} />

      {paymentSuccess ? (
        <Modal show={true} centered>
          <Modal.Header>
            <Modal.Title>Payment Successful!</Modal.Title>
          </Modal.Header>
        </Modal>
      ) : cart.length && width > 1073 ? (
        <>
          <Col xs={9} className="updateButton-div">
            <Button
              className="cartButton"
              variant="warning"
              onClick={handleReturntoShopping}
            >
              Back to Shopping
            </Button>
          </Col>
          <Row>
            <Col xs={9} className="deliveryAndBilling-div">
              <div className="checkOutForm-div">
                <Accordion>
                  <Form>
                    <Form.Group>
                      <Accordion.Item className="checkoutInfo-div" eventKey="0">
                        {(deliveryName.length &&
                          street.length &&
                          country.length &&
                          country !== "United States Of America" &&
                          city.length &&
                          postalCode.length === 5) ||
                        (deliveryName.length &&
                          street.length &&
                          country === "United States Of America" &&
                          state.length &&
                          city.length &&
                          postalCode.length === 5) ? (
                          <Accordion.Header>
                            Delivery Address:{" "}
                            <FontAwesomeIcon
                              icon={faSquareCheck}
                              size="xl"
                              style={{
                                color: "#4dc63c",
                                paddingLeft: "1rem",
                              }}
                            />
                          </Accordion.Header>
                        ) : (
                          <Accordion.Header>Delivery Address:</Accordion.Header>
                        )}

                        <Accordion.Body>
                          <Row className="formContent-div">
                            <Col xs={12}>
                              <Form.Label>Name:</Form.Label>
                              <Form.Control
                                type="text"
                                value={deliveryName}
                                onChange={(e) =>
                                  setDeliveryName(e.target.value)
                                }
                                required
                              />
                            </Col>
                          </Row>
                          <Row className="formContent-div">
                            <Col xs={12}>
                              <Form.Label>Street:</Form.Label>
                              <Form.Control
                                type="text"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                required
                              />
                            </Col>
                          </Row>
                          <Row className="formContent-div">
                            <Col xs={9}>
                              <Form.Label>Country:</Form.Label>
                              <Form.Select
                                onChange={(e) => {
                                  setCountry(e.target.value);
                                  if (
                                    e.target.value !==
                                    "United States Of America"
                                  ) {
                                    setState([]);
                                  }
                                }}
                                placeholder="Country"
                                required
                              >
                                <option key="blankChoice" hidden value>
                                  {" "}
                                  --Country--{" "}
                                </option>
                                {countryNames.map((countryName) => {
                                  return (
                                    <option key={countryName}>
                                      {countryName}
                                    </option>
                                  );
                                })}
                              </Form.Select>
                            </Col>

                            {country === "United States Of America" ? (
                              <Col xs={3}>
                                <Form.Label>State:</Form.Label>
                                <Form.Select
                                  onChange={(e) => setState(e.target.value)}
                                  placeholder="State"
                                  value={state}
                                  required
                                >
                                  <option key="blankChoice" hidden value>
                                    {" "}
                                    --State--{" "}
                                  </option>
                                  {stateAbbreviations.map((state) => {
                                    return <option key={state}>{state}</option>;
                                  })}
                                </Form.Select>
                              </Col>
                            ) : (
                              <Col xs={3}>
                                <Form.Label>State:</Form.Label>
                                <Form.Select
                                  onChange={(e) => setState(e.target.value)}
                                  placeholder="State"
                                  value={state}
                                  disabled
                                >
                                  <option key="blankChoice" hidden value>
                                    {" "}
                                    --State--{" "}
                                  </option>
                                  {stateAbbreviations.map((state) => {
                                    return <option key={state}>{state}</option>;
                                  })}
                                </Form.Select>
                              </Col>
                            )}
                          </Row>
                          <Row className="formContent-div">
                            <Col xs={9}>
                              <Form.Label>City:</Form.Label>
                              <Form.Control
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                              />
                            </Col>
                            <Col xs={3}>
                              <Form.Label>Postal Code:</Form.Label>
                              <Form.Control
                                type="text"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                              />
                            </Col>
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Form.Group>

                    <Form.Group>
                      <Accordion.Item className="checkoutInfo-div" eventKey="1">
                        {(cardName.length &&
                          cardNumber.length === 16 &&
                          expirationMonth.length === 2 &&
                          expirationYear.length === 2 &&
                          CCV.length === 3 &&
                          !differentAddress) ||
                        (cardName.length &&
                          cardNumber.length === 16 &&
                          expirationMonth.length === 2 &&
                          expirationYear.length === 2 &&
                          CCV.length === 3 &&
                          differentAddress &&
                          ((billingStreet.length &&
                            billingCountry.length &&
                            billingCountry !== "United States Of America" &&
                            billingCity.length &&
                            billingPostalCode.length === 5) ||
                            (billingStreet.length &&
                              billingCountry === "United States Of America" &&
                              billingState.length &&
                              billingCity.length &&
                              billingPostalCode.length === 5))) ? (
                          <Accordion.Header>
                            Credit Card Details:{" "}
                            <FontAwesomeIcon
                              icon={faSquareCheck}
                              size="xl"
                              style={{
                                color: "#4dc63c",
                                paddingLeft: "1rem",
                              }}
                            />
                          </Accordion.Header>
                        ) : (
                          <Accordion.Header>
                            Credit Card Details:
                          </Accordion.Header>
                        )}
                        <Accordion.Body>
                          <Row className="formContent-div">
                            <Col xs={12}>
                              <Form.Label>Name on Card:</Form.Label>
                              <Form.Control
                                type="text"
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                required
                              />
                            </Col>
                          </Row>
                          <Row className="formContent-div">
                            <Col>
                              <Form.Label>Card Number:</Form.Label>
                              <Form.Control
                                type="number"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                required
                              />
                            </Col>

                            <Col xs={3}>
                              <Form.Label>Expiration Date:</Form.Label>
                              <Row>
                                <Col xs={5}>
                                  <Form.Select
                                    onChange={(e) =>
                                      setExpirationMonth(e.target.value)
                                    }
                                    placeholder="MM"
                                    required
                                  >
                                    <option key="blankChoice" hidden value>
                                      {" "}
                                      MM{" "}
                                    </option>
                                    {months.map((month) => {
                                      return (
                                        <option key={month}>{month}</option>
                                      );
                                    })}
                                  </Form.Select>
                                </Col>
                                <Col className="expirationDateSlash-div">/</Col>
                                <Col xs={5}>
                                  <Form.Select
                                    onChange={(e) =>
                                      setExpirationYear(e.target.value)
                                    }
                                    placeholder="MM"
                                    required
                                  >
                                    <option key="blankChoice" hidden value>
                                      {" "}
                                      YY{" "}
                                    </option>
                                    {years.map((year) => {
                                      return <option key={year}>{year}</option>;
                                    })}
                                  </Form.Select>
                                </Col>
                              </Row>
                            </Col>
                            <Col xs={2}>
                              <Form.Label>CCV:</Form.Label>
                              <Form.Control
                                type="password"
                                value={CCV}
                                onChange={(e) => setCCV(e.target.value)}
                                required
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Form.Label>Billing Address:</Form.Label>
                              <Form.Check // prettier-ignore
                                type="checkbox"
                                id="custom-switch"
                                label="Billing Address different from Delivery Address?"
                                value={differentAddress}
                                onChange={(e) => {
                                  setDifferentAddress(!differentAddress);
                                  if (!differentAddress === false) {
                                    setBillingCity([]);
                                    setBillingCountry([]);
                                    setBillingPostalCode([]);
                                    setBillingState([]);
                                    setBillingStreet([]);
                                  }
                                }}
                              />
                            </Col>
                          </Row>
                          {differentAddress ? (
                            <>
                              <Row>
                                <Col>
                                  <Form.Label>Street:</Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={billingStreet}
                                    onChange={(e) =>
                                      setBillingStreet(e.target.value)
                                    }
                                    required
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <Form.Label>Country:</Form.Label>
                                  <Form.Select
                                    onChange={(e) => {
                                      setBillingCountry(e.target.value);
                                      if (
                                        e.target.value !==
                                        "United States Of America"
                                      ) {
                                        setBillingState([]);
                                      }
                                    }}
                                    placeholder="Country"
                                    required
                                  >
                                    <option key="blankChoice" hidden value>
                                      {" "}
                                      --Country--{" "}
                                    </option>
                                    {countryNames.map((countryName) => {
                                      return (
                                        <option key={countryName}>
                                          {countryName}
                                        </option>
                                      );
                                    })}
                                  </Form.Select>
                                </Col>

                                {billingCountry ===
                                "United States Of America" ? (
                                  <Col xs={3}>
                                    <Form.Label>State:</Form.Label>
                                    <Form.Select
                                      onChange={(e) =>
                                        setBillingState(e.target.value)
                                      }
                                      placeholder="State"
                                      value={billingState}
                                      required
                                    >
                                      <option key="blankChoice" hidden value>
                                        {" "}
                                        --State--{" "}
                                      </option>
                                      {stateAbbreviations.map((state) => {
                                        return (
                                          <option key={state}>{state}</option>
                                        );
                                      })}
                                    </Form.Select>
                                  </Col>
                                ) : (
                                  <Col xs={3}>
                                    <Form.Label>State:</Form.Label>
                                    <Form.Select
                                      onChange={(e) =>
                                        setBillingState(e.target.value)
                                      }
                                      placeholder="State"
                                      value={billingState}
                                      disabled
                                    >
                                      <option key="blankChoice" hidden value>
                                        {" "}
                                        --State--{" "}
                                      </option>
                                      {stateAbbreviations.map((state) => {
                                        return (
                                          <option key={state}>{state}</option>
                                        );
                                      })}
                                    </Form.Select>
                                  </Col>
                                )}
                              </Row>
                              <Row>
                                <Col xs={9}>
                                  <Form.Label>City:</Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={billingCity}
                                    onChange={(e) =>
                                      setBillingCity(e.target.value)
                                    }
                                    required
                                  />
                                </Col>
                                <Col xs={3}>
                                  <Form.Label>Postal Code:</Form.Label>
                                  <Form.Control
                                    type="text"
                                    value={billingPostalCode}
                                    onChange={(e) =>
                                      setBillingPostalCode(e.target.value)
                                    }
                                    required
                                  />
                                </Col>
                              </Row>{" "}
                            </>
                          ) : null}
                        </Accordion.Body>
                      </Accordion.Item>
                    </Form.Group>
                  </Form>

                  <Accordion.Item className="checkoutInfo-div" eventKey="2">
                    <Accordion.Header>Cart Summary:</Accordion.Header>

                    <Accordion.Body>
                      <>
                        <UpdateCartButton
                          oldCart={oldCart}
                          cart={cart}
                          onUpdate={handleUpdate}
                          quantityChange={quantityChange}
                        />
                        <div className="itemsCheckout-container">
                          {isLoading ? (
                            <div className="loading-div">
                              <LoadingIndicator />
                            </div>
                          ) : cart.length ? (
                            <>
                              <Row xs={2} className="g-4">
                                <Col xs={12}>
                                  {cart.map((item) => (
                                    <Col
                                      key={item.id}
                                      className="cartItemCol-div"
                                    >
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
                                        onItemClick={handleItemClick}
                                        width={width}
                                      />
                                    </Col>
                                  ))}
                                </Col>
                              </Row>
                            </>
                          ) : (
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
                            </Row>
                          )}
                        </div>
                      </>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </Col>
            <Col>
              <Card className="spacing-div">
                <Card.Body className="ProceedToCheckOut-div">
                  <Card.Title className="cartTitle-div">Cart:</Card.Title>
                  <Card.Text className="cartPrice-div">
                    ${cartPrice.toFixed(2)}
                  </Card.Text>

                  <div className="cartButtons-div">
                    {((deliveryName.length &&
                      street.length &&
                      country.length &&
                      country !== "United States Of America" &&
                      city.length &&
                      postalCode.length === 5) ||
                      (deliveryName.length &&
                        street.length &&
                        country === "United States Of America" &&
                        state.length &&
                        city.length &&
                        postalCode.length === 5)) &&
                    ((cardName.length &&
                      cardNumber.length === 16 &&
                      expirationMonth.length === 2 &&
                      expirationYear.length === 2 &&
                      CCV.length === 3 &&
                      !differentAddress) ||
                      (cardName.length &&
                        cardNumber.length === 16 &&
                        expirationMonth.length === 2 &&
                        expirationYear.length === 2 &&
                        CCV.length === 3 &&
                        differentAddress &&
                        ((billingStreet.length &&
                          billingCountry.length &&
                          billingCountry !== "United States Of America" &&
                          billingCity.length &&
                          billingPostalCode.length === 5) ||
                          (billingStreet.length &&
                            billingCountry === "United States Of America" &&
                            billingState.length &&
                            billingCity.length &&
                            billingPostalCode.length === 5)))) ? (
                      <Button
                        className="cartButton"
                        variant="primary"
                        type="submit"
                        onClick={handlePay}
                      >
                        Pay
                      </Button>
                    ) : (
                      <Button className="cartButton" variant="secondary">
                        Pay
                      </Button>
                    )}
                    <Button className="cartButton" onClick={handleEmptyCart}>
                      Empty Cart
                    </Button>
                    <Button
                      className="cartButton"
                      variant="warning"
                      onClick={handleReturntoShopping}
                    >
                      Back to Shopping
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      ) : cart.length ? (
        <Col>
          <Row>
            <Card className="spacing-div">
              <Card.Body className="ProceedToCheckOut-div">
                <Card.Title className="cartTitle-div">Cart:</Card.Title>
                <Card.Text className="cartPrice-div">
                  ${cartPrice.toFixed(2)}
                </Card.Text>

                <div className="cartButtons-div">
                  {((deliveryName.length &&
                    street.length &&
                    country.length &&
                    country !== "United States Of America" &&
                    city.length &&
                    postalCode.length === 5) ||
                    (deliveryName.length &&
                      street.length &&
                      country === "United States Of America" &&
                      state.length &&
                      city.length &&
                      postalCode.length === 5)) &&
                  ((cardName.length &&
                    cardNumber.length === 16 &&
                    expirationMonth.length === 2 &&
                    expirationYear.length === 2 &&
                    CCV.length === 3 &&
                    !differentAddress) ||
                    (cardName.length &&
                      cardNumber.length === 16 &&
                      expirationMonth.length === 2 &&
                      expirationYear.length === 2 &&
                      CCV.length === 3 &&
                      differentAddress &&
                      ((billingStreet.length &&
                        billingCountry.length &&
                        billingCountry !== "United States Of America" &&
                        billingCity.length &&
                        billingPostalCode.length === 5) ||
                        (billingStreet.length &&
                          billingCountry === "United States Of America" &&
                          billingState.length &&
                          billingCity.length &&
                          billingPostalCode.length === 5)))) ? (
                    <Button
                      className="cartButton"
                      variant="primary"
                      type="submit"
                      onClick={handlePay}
                    >
                      Pay
                    </Button>
                  ) : (
                    <Button className="cartButton" variant="secondary">
                      Pay
                    </Button>
                  )}
                  <Button className="cartButton" onClick={handleEmptyCart}>
                    Empty Cart
                  </Button>
                  <Button
                    className="cartButton"
                    variant="warning"
                    onClick={handleReturntoShopping}
                  >
                    Back to Shopping
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Row>
          <Row>
            <div className="checkOutForm-div">
              <Accordion>
                <Form>
                  <Form.Group>
                    <Accordion.Item className="checkoutInfo-div" eventKey="0">
                      {(deliveryName.length &&
                        street.length &&
                        country.length &&
                        country !== "United States Of America" &&
                        city.length &&
                        postalCode.length === 5) ||
                      (deliveryName.length &&
                        street.length &&
                        country === "United States Of America" &&
                        state.length &&
                        city.length &&
                        postalCode.length === 5) ? (
                        <Accordion.Header>
                          Delivery Address:{" "}
                          <FontAwesomeIcon
                            icon={faSquareCheck}
                            size="xl"
                            style={{
                              color: "#4dc63c",
                              paddingLeft: "1rem",
                            }}
                          />
                        </Accordion.Header>
                      ) : (
                        <Accordion.Header>Delivery Address:</Accordion.Header>
                      )}

                      <Accordion.Body>
                        <Row className="formContent-div">
                          <Col xs={12}>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                              type="text"
                              value={deliveryName}
                              onChange={(e) => setDeliveryName(e.target.value)}
                              required
                            />
                          </Col>
                        </Row>
                        <Row className="formContent-div">
                          <Col xs={12}>
                            <Form.Label>Street:</Form.Label>
                            <Form.Control
                              type="text"
                              value={street}
                              onChange={(e) => setStreet(e.target.value)}
                              required
                            />
                          </Col>
                        </Row>
                        <Row className="formContent-div">
                          <Col xs={12} md={9}>
                            <Form.Label>Country:</Form.Label>
                            <Form.Select
                              onChange={(e) => {
                                setCountry(e.target.value);
                                if (
                                  e.target.value !== "United States Of America"
                                ) {
                                  setState([]);
                                }
                              }}
                              placeholder="Country"
                              required
                            >
                              <option key="blankChoice" hidden value>
                                {" "}
                                --Country--{" "}
                              </option>
                              {countryNames.map((countryName) => {
                                return (
                                  <option key={countryName}>
                                    {countryName}
                                  </option>
                                );
                              })}
                            </Form.Select>
                          </Col>

                          {country === "United States Of America" ? (
                            <Col xs={12} md={3}>
                              <Form.Label>State:</Form.Label>
                              <Form.Select
                                onChange={(e) => setState(e.target.value)}
                                placeholder="State"
                                value={state}
                                required
                              >
                                <option key="blankChoice" hidden value>
                                  {" "}
                                  --State--{" "}
                                </option>
                                {stateAbbreviations.map((state) => {
                                  return <option key={state}>{state}</option>;
                                })}
                              </Form.Select>
                            </Col>
                          ) : (
                            <Col xs={12} md={3}>
                              <Form.Label>State:</Form.Label>
                              <Form.Select
                                onChange={(e) => setState(e.target.value)}
                                placeholder="State"
                                value={state}
                                disabled
                              >
                                <option key="blankChoice" hidden value>
                                  {" "}
                                  --State--{" "}
                                </option>
                                {stateAbbreviations.map((state) => {
                                  return <option key={state}>{state}</option>;
                                })}
                              </Form.Select>
                            </Col>
                          )}
                        </Row>
                        <Row className="formContent-div">
                          <Col xs={12} md={9}>
                            <Form.Label>City:</Form.Label>
                            <Form.Control
                              type="text"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              required
                            />
                          </Col>
                          <Col xs={12} md={3}>
                            <Form.Label>Postal Code:</Form.Label>
                            <Form.Control
                              type="text"
                              value={postalCode}
                              onChange={(e) => setPostalCode(e.target.value)}
                              required
                            />
                          </Col>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Form.Group>

                  <Form.Group>
                    <Accordion.Item className="checkoutInfo-div" eventKey="1">
                      {(cardName.length &&
                        cardNumber.length === 16 &&
                        expirationMonth.length === 2 &&
                        expirationYear.length === 2 &&
                        CCV.length === 3 &&
                        !differentAddress) ||
                      (cardName.length &&
                        cardNumber.length === 16 &&
                        expirationMonth.length === 2 &&
                        expirationYear.length === 2 &&
                        CCV.length === 3 &&
                        differentAddress &&
                        ((billingStreet.length &&
                          billingCountry.length &&
                          billingCountry !== "United States Of America" &&
                          billingCity.length &&
                          billingPostalCode.length === 5) ||
                          (billingStreet.length &&
                            billingCountry === "United States Of America" &&
                            billingState.length &&
                            billingCity.length &&
                            billingPostalCode.length === 5))) ? (
                        <Accordion.Header>
                          Credit Card Details:{" "}
                          <FontAwesomeIcon
                            icon={faSquareCheck}
                            size="xl"
                            style={{
                              color: "#4dc63c",
                              paddingLeft: "1rem",
                            }}
                          />
                        </Accordion.Header>
                      ) : (
                        <Accordion.Header>
                          Credit Card Details:
                        </Accordion.Header>
                      )}
                      <Accordion.Body>
                        <Row className="formContent-div">
                          <Col sm={12} md={5}>
                            <Form.Label>Name on Card:</Form.Label>
                            <Form.Control
                              type="text"
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value)}
                              required
                            />
                          </Col>
                          <Col sm={12} md={4}>
                            <Form.Label>Expiration Date:</Form.Label>
                            <Row>
                              <Col xs={5}>
                                <Form.Select
                                  onChange={(e) =>
                                    setExpirationMonth(e.target.value)
                                  }
                                  placeholder="MM"
                                  required
                                >
                                  <option key="blankChoice" hidden value>
                                    {" "}
                                    MM{" "}
                                  </option>
                                  {months.map((month) => {
                                    return <option key={month}>{month}</option>;
                                  })}
                                </Form.Select>
                              </Col>
                              <Col className="expirationDateSlash-div">/</Col>
                              <Col xs={5}>
                                <Form.Select
                                  onChange={(e) =>
                                    setExpirationYear(e.target.value)
                                  }
                                  placeholder="MM"
                                  required
                                >
                                  <option key="blankChoice" hidden value>
                                    {" "}
                                    YY{" "}
                                  </option>
                                  {years.map((year) => {
                                    return <option key={year}>{year}</option>;
                                  })}
                                </Form.Select>
                              </Col>
                            </Row>
                          </Col>
                          <Col sm={12} md={3}>
                            <Form.Label>CCV:</Form.Label>
                            <Form.Control
                              type="password"
                              value={CCV}
                              onChange={(e) => setCCV(e.target.value)}
                              required
                            />
                          </Col>
                        </Row>
                        <Row className="formContent-div">
                          <Col>
                            <Form.Label>Card Number:</Form.Label>
                            <Form.Control
                              type="number"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              required
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Label>Billing Address:</Form.Label>
                            <Form.Check // prettier-ignore
                              type="checkbox"
                              id="custom-switch"
                              label="Billing Address different from Delivery Address?"
                              value={differentAddress}
                              onChange={(e) => {
                                setDifferentAddress(!differentAddress);
                                if (!differentAddress === false) {
                                  setBillingCity([]);
                                  setBillingCountry([]);
                                  setBillingPostalCode([]);
                                  setBillingState([]);
                                  setBillingStreet([]);
                                }
                              }}
                            />
                          </Col>
                        </Row>
                        {differentAddress ? (
                          <>
                            <Row>
                              <Col>
                                <Form.Label>Street:</Form.Label>
                                <Form.Control
                                  type="text"
                                  value={billingStreet}
                                  onChange={(e) =>
                                    setBillingStreet(e.target.value)
                                  }
                                  required
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Form.Label>Country:</Form.Label>
                                <Form.Select
                                  onChange={(e) => {
                                    setBillingCountry(e.target.value);
                                    if (
                                      e.target.value !==
                                      "United States Of America"
                                    ) {
                                      setBillingState([]);
                                    }
                                  }}
                                  placeholder="Country"
                                  required
                                >
                                  <option key="blankChoice" hidden value>
                                    {" "}
                                    --Country--{" "}
                                  </option>
                                  {countryNames.map((countryName) => {
                                    return (
                                      <option key={countryName}>
                                        {countryName}
                                      </option>
                                    );
                                  })}
                                </Form.Select>
                              </Col>

                              {billingCountry === "United States Of America" ? (
                                <Col xs={12} md={3}>
                                  <Form.Label>State:</Form.Label>
                                  <Form.Select
                                    onChange={(e) =>
                                      setBillingState(e.target.value)
                                    }
                                    placeholder="State"
                                    value={billingState}
                                    required
                                  >
                                    <option key="blankChoice" hidden value>
                                      {" "}
                                      --State--{" "}
                                    </option>
                                    {stateAbbreviations.map((state) => {
                                      return (
                                        <option key={state}>{state}</option>
                                      );
                                    })}
                                  </Form.Select>
                                </Col>
                              ) : (
                                <Col xs={12} md={3}>
                                  <Form.Label>State:</Form.Label>
                                  <Form.Select
                                    onChange={(e) =>
                                      setBillingState(e.target.value)
                                    }
                                    placeholder="State"
                                    value={billingState}
                                    disabled
                                  >
                                    <option key="blankChoice" hidden value>
                                      {" "}
                                      --State--{" "}
                                    </option>
                                    {stateAbbreviations.map((state) => {
                                      return (
                                        <option key={state}>{state}</option>
                                      );
                                    })}
                                  </Form.Select>
                                </Col>
                              )}
                            </Row>
                            <Row>
                              <Col xs={12} md={9}>
                                <Form.Label>City:</Form.Label>
                                <Form.Control
                                  type="text"
                                  value={billingCity}
                                  onChange={(e) =>
                                    setBillingCity(e.target.value)
                                  }
                                  required
                                />
                              </Col>
                              <Col xs={12} md={3}>
                                <Form.Label>Postal Code:</Form.Label>
                                <Form.Control
                                  type="text"
                                  value={billingPostalCode}
                                  onChange={(e) =>
                                    setBillingPostalCode(e.target.value)
                                  }
                                  required
                                />
                              </Col>
                            </Row>{" "}
                          </>
                        ) : null}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Form.Group>
                </Form>

                <Accordion.Item className="checkoutInfo-div" eventKey="2">
                  <Accordion.Header>Cart Summary:</Accordion.Header>

                  <Accordion.Body>
                    <>
                      <UpdateCartButton
                        oldCart={oldCart}
                        cart={cart}
                        onUpdate={handleUpdate}
                        quantityChange={quantityChange}
                      />
                      <div className="itemsCheckout-container">
                        {isLoading ? (
                          <div className="loading-div">
                            <LoadingIndicator />
                          </div>
                        ) : cart.length ? (
                          <>
                            <Row xs={2} className="g-4">
                              <Col xs={12}>
                                {cart.map((item) => (
                                  <Col
                                    key={item.id}
                                    className="cartItemCol-div"
                                  >
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
                                      onItemClick={handleItemClick}
                                      width={width}
                                    />
                                  </Col>
                                ))}
                              </Col>
                            </Row>
                          </>
                        ) : (
                          <Row>
                            <Col>
                              <Card>
                                <Card.Body className="noItemsBody-div">
                                  <Card.Title className="noItems-div">
                                    No Items In Cart
                                  </Card.Title>
                                </Card.Body>
                              </Card>
                            </Col>
                          </Row>
                        )}
                      </div>
                    </>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </Row>
        </Col>
      ) : width > 1073 ? (
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

          <Col>
            <Card>
              <Card.Body className="ProceedToCheckOut-div">
                <Card.Title className="cartTitle-div">Cart:</Card.Title>
                <div className="cartButtons-div">
                  <Button className="cartButton" variant="secondary">
                    Pay
                  </Button>

                  <Button
                    className="cartButton"
                    variant="secondary"
                    onClick={handleEmptyCart}
                  >
                    Empty Cart
                  </Button>
                  <Button
                    className="cartButton"
                    variant="warning"
                    onClick={handleReturntoShopping}
                  >
                    Back to Shopping
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <Col>
          <Row>
            <Card>
              <Card.Body className="ProceedToCheckOut-div">
                <Card.Title className="cartTitle-div">Cart:</Card.Title>
                <div className="cartButtons-div">
                  <Button className="cartButton" variant="secondary">
                    Pay
                  </Button>

                  <Button
                    className="cartButton"
                    variant="secondary"
                    onClick={handleEmptyCart}
                  >
                    Empty Cart
                  </Button>
                  <Button
                    className="cartButton"
                    variant="warning"
                    onClick={handleReturntoShopping}
                  >
                    Back to Shopping
                  </Button>
                </div>
              </Card.Body>
            </Card>
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
    </>
  );
};

export default CheckOut;
