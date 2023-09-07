import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
  const [sameAddress, setSameAddress] = useState([]);
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
    }
  }, []);

  const handleReturntoShopping = (e) => {
    e.preventDefault();
    navigate("/", { state: { oldCart: { cart } } });
  };

  return (
    <>
      <CustomNav cart={cart} />
      <Col>
        <Button
          className="cartButton"
          variant="warning"
          onClick={handleReturntoShopping}
        >
          Back to Shopping
        </Button>
      </Col>
      <Col>
        <div className="checkOutForm-div">
          <Form>
            <Form.Group>
              <Form.Label>Delivery Address:</Form.Label>
              <Row>
                <Col>
                  <Form.Label>Name:</Form.Label>
                  <Form.Control
                    type="text"
                    value={deliveryName}
                    onChange={(e) => setDeliveryName(e.target.value)}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Street:</Form.Label>
                  <Form.Control
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Country:</Form.Label>
                  <Form.Select
                    onChange={(e) => {
                      setCountry(e.target.value);
                      if (e.target.value != "United States Of America") {
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
                      return <option key={countryName}>{countryName}</option>;
                    })}
                  </Form.Select>
                </Col>
              </Row>
              {country === "United States Of America" ? (
                <Row>
                  <Col>
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
                </Row>
              ) : null}
              <Row>
                <Col>
                  <Form.Label>City:</Form.Label>
                  <Form.Control
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </Col>
                <Col>
                  <Form.Label>Postal Code:</Form.Label>
                  <Form.Control
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group>
              <Form.Label>Credit Card Details:</Form.Label>
              <Row>
                <Col>
                  <Form.Label>Name on Card:</Form.Label>
                  <Form.Control
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    required
                  />
                </Col>
              </Row>
              <Row>
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
                  <Form.Label>Expiration Date:</Form.Label>
                  <Row>
                    <Col>
                      <Form.Select
                        onChange={(e) => setExpirationMonth(e.target.value)}
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
                    <Col>/</Col>
                    <Col>
                      <Form.Select
                        onChange={(e) => setExpirationYear(e.target.value)}
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
              </Row>
              <Row>
                <Col>
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
                    value={sameAddress}
                    onChange={(e) => {
                      setSameAddress(!sameAddress);
                      console.log(e.target.value);
                    }}
                  />
                </Col>
              </Row>
              {sameAddress ? (
                <>
                  <Row>
                    <Col>
                      <Form.Label>Street:</Form.Label>
                      <Form.Control
                        type="text"
                        value={billingStreet}
                        onChange={(e) => setBillingStreet(e.target.value)}
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
                          if (e.target.value != "United States Of America") {
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
                            <option key={countryName}>{countryName}</option>
                          );
                        })}
                      </Form.Select>
                    </Col>
                  </Row>
                  {country === "United States Of America" ? (
                    <Row>
                      <Col>
                        <Form.Label>State:</Form.Label>
                        <Form.Select
                          onChange={(e) => setBillingState(e.target.value)}
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
                    </Row>
                  ) : null}
                  <Row>
                    <Col>
                      <Form.Label>City:</Form.Label>
                      <Form.Control
                        type="text"
                        value={billingCity}
                        onChange={(e) => setBillingCity(e.target.value)}
                        required
                      />
                    </Col>
                    <Col>
                      <Form.Label>Postal Code:</Form.Label>
                      <Form.Control
                        type="text"
                        value={billingPostalCode}
                        onChange={(e) => setBillingPostalCode(e.target.value)}
                        required
                      />
                    </Col>
                  </Row>{" "}
                </>
              ) : null}
            </Form.Group>
          </Form>
        </div>
      </Col>
    </>
  );
};

export default CheckOut;
