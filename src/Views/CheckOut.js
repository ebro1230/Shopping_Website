import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Accordion from "react-bootstrap/Accordion";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";

import {
  getCountryCode,
  countryNames,
  stateAbbreviations,
  dialingCodes,
  months,
  years,
} from "../utils";

import CustomNav from "../Components/CustomNav";

const CheckOut = () => {
  const [cart, setCart] = useState([]);
  const [cartPrice, setCartPrice] = useState([]);
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

  useEffect(() => {
    if (location.state) {
      const { oldCart } = location.state;
      setCart(oldCart.cart);
      let price = 0;
      location.state.oldCart.cart.forEach((item) => {
        price = price + Number(item.quantity) * Number(item.price);
      });
      setCartPrice(price);
    }
  }, []);

  const handleReturntoShopping = (e) => {
    e.preventDefault();
    navigate("/", { state: { oldCart: { cart } } });
  };

  const handleEmptyCart = (e) => {
    e.preventDefault();
    setCart([]);
    setCartPrice(0);
  };

  const handlePay = (e) => {
    e.preventDefault();
    setCart([]);
    setCartPrice(0);
  };

  return (
    <>
      <CustomNav cart={cart} />

      {cart.length ? (
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
                <Form>
                  <Accordion defaultActiveKey="0">
                    <Form.Group>
                      <Accordion.Item className="checkoutInfo-div" eventKey="0">
                        {(deliveryName.length &&
                          street.length &&
                          country.length &&
                          country != "United States Of America" &&
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
                              style={{ color: "#4dc63c", paddingLeft: "1rem" }}
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
                                    e.target.value != "United States Of America"
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
                            billingCountry != "United States Of America" &&
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
                              style={{ color: "#4dc63c", paddingLeft: "1rem" }}
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
                                        e.target.value !=
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
                  </Accordion>
                </Form>
              </div>
            </Col>
            <Col>
              <Card>
                <Card.Body className="ProceedToCheckOut-div">
                  <Card.Title className="cartTitle-div">Cart:</Card.Title>
                  <Card.Text className="cartPrice-div">
                    ${cartPrice.toFixed(2)}
                  </Card.Text>

                  <div className="cartButtons-div">
                    {((deliveryName.length &&
                      street.length &&
                      country.length &&
                      country != "United States Of America" &&
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
                          billingCountry != "United States Of America" &&
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
      ) : null}
    </>
  );
};

export default CheckOut;
