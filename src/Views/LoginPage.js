import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomNav from "../Components/CustomNav";
import { passwordTest, emailTest } from "../validations";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [cart, setCart] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      const { oldCart } = location.state;
      setCart(oldCart.cart);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventdefault();
    if (!emailTest(email.toLowerCase())) {
      setValidEmail(true);
      setTimeout(() => {
        setValidEmail(false);
      }, 3000);
    } else if (!passwordTest(password)) {
      setValidPassword(true);
      setTimeout(() => {
        setValidPassword(false);
      }, 3000);
    } else {
      //Check for email of user
    }
  };

  const handleSignUp = (e) => {
    e.preventdefault();
    if (!emailTest(email.toLowerCase())) {
      setValidEmail(false);
    } else if (!passwordTest(password)) {
      setValidPassword(false);
    } else {
      //Check if email is unique
    }
  };

  return (
    <>
      <CustomNav cart={cart} />
      <div className="login-div">
        <Col xs={11} s={8} md={8} lg={6} xl={6}>
          <Tabs defaultActiveKey="login" id="login-tab" fill>
            <Tab eventKey="login" title="Login">
              <Form>
                <Form.Group>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value.toLowerCase());
                    }}
                    required
                  />
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  />
                </Form.Group>
                <Form.Group className="submitButton-div">
                  <Button
                    className="loginButton"
                    variant="primary"
                    type="submit"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                </Form.Group>
              </Form>
            </Tab>
            <Tab eventKey="signUp" title="Sign Up">
              <Form>
                <Form.Group>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value.toLowerCase());
                    }}
                    required
                  />
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  />
                </Form.Group>
                <Form.Group className="submitButton-div">
                  <Button
                    className="signUpButton"
                    variant="primary"
                    type="submit"
                    onClick={handleSignUp}
                  >
                    Sign Up
                  </Button>
                </Form.Group>
              </Form>
            </Tab>
          </Tabs>
        </Col>
      </div>
    </>
  );
};

export default LoginPage;
