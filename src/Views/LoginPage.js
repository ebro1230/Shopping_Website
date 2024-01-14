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
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [cart, setCart] = useState([]);
  const [successfulLogin, setSuccessfulLogin] = useState(false);
  const [successfulSignUp, setSuccessfulSignUp] = useState(false);
  const [existingEmail, setExistingEmail] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [incorrectEmail, setIncorrectEmail] = useState(false);
  const [id, setId] = useState("");
  const navigate = useNavigate();
  console.log(cart);

  useEffect(() => {
    if (sessionStorage.getItem("oldCart")) {
      setCart(JSON.parse(sessionStorage.getItem("oldCart")));
    }
    if (sessionStorage.getItem("userId")) {
      setId(sessionStorage.getItem("userId"));
      navigate("/");
    }
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();
    if (!emailTest(email.toLowerCase())) {
      setInvalidEmail(true);
      setTimeout(() => {
        setInvalidEmail(false);
      }, 3000);
    } else if (!passwordTest(password)) {
      setInvalidPassword(true);
      setTimeout(() => {
        setInvalidPassword(false);
      }, 3000);
    } else {
      const headers = { "Content-Type": "application/json" };
      const payload = { email, password, cart };
      axios
        .put(`${process.env.REACT_APP_BACKEND_URL}api/user/login`, payload, {
          headers,
        })
        .then((response) => {
          console.log(response);
          if (!response.data) {
            setIncorrectEmail(true);
            setTimeout(() => {
              setIncorrectEmail(false);
            }, 3000);
          } else {
            setSuccessfulLogin(true);
            setTimeout(() => {
              sessionStorage.setItem("userId", response.data.newUser._id);
              sessionStorage.setItem(
                "userType",
                response.data.newUser.userType
              );
              sessionStorage.setItem(
                "oldCart",
                JSON.stringify(response.data.newUser.cart)
              );
              setId(response.data.newUser_id);
              setSuccessfulLogin(false);
              navigate(`/`);
            }, 3000);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setEmail("");
          setPassword("");
        });
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!emailTest(email.toLowerCase())) {
      setInvalidEmail(true);
      setTimeout(() => {
        setInvalidEmail(false);
      }, 3000);
    } else if (!passwordTest(password)) {
      setInvalidPassword(true);
      setTimeout(() => {
        setInvalidPassword(false);
      }, 3000);
    } else if (password !== passwordConfirm) {
      setPasswordMatch(true);
      setTimeout(() => {
        setPasswordMatch(false);
      }, 3000);
    } else {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}api/user/${email}`)
        .then((response) => {
          if (response.data !== null) {
            setExistingEmail(true);
            setTimeout(() => {
              setExistingEmail(false);
            }, 3000);
          } else {
            const headers = { "Content-Type": "application/json" };
            const payload = { email, password, cart };
            axios
              .post(
                `${process.env.REACT_APP_BACKEND_URL}api/user/signup`,
                payload,
                {
                  headers,
                }
              )
              .then((response) => {
                setSuccessfulSignUp(true);
                axios
                  .get(
                    `${process.env.REACT_APP_BACKEND_URL}api/user/${
                      JSON.parse(response.config.data).email
                    }`
                  )
                  .then((response) => {
                    console.log(response);
                    sessionStorage.setItem("userId", response.data._id);
                    sessionStorage.setItem("userType", response.data.userType);
                    sessionStorage.setItem(
                      "oldCart",
                      JSON.stringify(response.data.cart)
                    );
                    setId(response.data._id);
                  });
              })
              .catch((error) => {
                console.log(error);
              })
              .finally(() => {
                setTimeout(() => {
                  setSuccessfulSignUp(false);
                  setEmail("");
                  setPassword("");
                  setPasswordConfirm("");
                  navigate(`/`);
                }, 3000);
              })
              .catch((error) => {
                console.log(error);
              })
              .finally(() => {});
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    }
  };
  return (
    <>
      <CustomNav cart={cart} id={id} />
      <div className="login-div">
        {invalidEmail ? (
          <Modal show={true} centered>
            <Modal.Header>
              <Modal.Title>Invalid Email</Modal.Title>
            </Modal.Header>
          </Modal>
        ) : invalidPassword ? (
          <Modal show={true} centered>
            <Modal.Header>
              <Modal.Title>Invalid Password</Modal.Title>
            </Modal.Header>
          </Modal>
        ) : incorrectEmail ? (
          <Modal show={true} centered>
            <Modal.Header>
              <Modal.Title>Email Incorrect</Modal.Title>
            </Modal.Header>
          </Modal>
        ) : incorrectPassword ? (
          <Modal show={true} centered>
            <Modal.Header>
              <Modal.Title>Password Incorrect</Modal.Title>
            </Modal.Header>
          </Modal>
        ) : successfulLogin ? (
          <Modal show={true} centered>
            <Modal.Header>
              <Modal.Title>Login Successful</Modal.Title>
            </Modal.Header>
          </Modal>
        ) : existingEmail ? (
          <Modal show={true} centered>
            <Modal.Header>
              <Modal.Title>Email Already Exists</Modal.Title>
            </Modal.Header>
          </Modal>
        ) : passwordMatch ? (
          <Modal show={true} centered>
            <Modal.Header>
              <Modal.Title>Passwords Don't Match</Modal.Title>
            </Modal.Header>
          </Modal>
        ) : successfulSignUp ? (
          <Modal show={true} centered>
            <Modal.Header>
              <Modal.Title>Sign Up Successful</Modal.Title>
            </Modal.Header>
          </Modal>
        ) : (
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
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      value={passwordConfirm}
                      onChange={(e) => {
                        setPasswordConfirm(e.target.value);
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
        )}
      </div>
    </>
  );
};

export default LoginPage;
