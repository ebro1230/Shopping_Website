import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import { LinkContainer } from "react-router-bootstrap";
import shopping_cart from "../Images/shopping-cart.png";
import login from "../Images/Login.png";
import logout from "../Images/Logout.png";

function CustomNav(props) {
  const [id, setId] = useState("");
  useEffect(() => {
    setId(props.id);
  }, [props.id]);
  return (
    <>
      <Navbar
        key="md"
        expand="lg"
        className="bg-body-tertiary mb-3"
        data-bs-theme="dark"
      >
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand>Generic Store</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                Generic Store
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <LinkContainer to="/">
                  <Nav.Link className="navItem">Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/category/Books">
                  <Nav.Link className="navItem">Books</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/category/Men's Clothing">
                  <Nav.Link className="navItem">Men's Clothing</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/category/Women's Clothing">
                  <Nav.Link className="navItem">Women's Clothing</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/category/Electronics">
                  <Nav.Link className="navItem">Electronics</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/category/Jewelry">
                  <Nav.Link className="navItem">Jewelry</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/cart">
                  <Nav.Link className="shoppingCart-div">
                    <Image src={shopping_cart} roundedCircle fluid />
                    {props.cart ? (
                      props.cart.length ? (
                        <Badge
                          bg="danger"
                          className="shoppingCartCount-div"
                          pill
                        >
                          {props.cart.length}
                        </Badge>
                      ) : null
                    ) : null}
                  </Nav.Link>
                </LinkContainer>
                {id ? (
                  <LinkContainer to="/">
                    <Nav.Link className="shoppingCart-div">
                      <Image
                        src={logout}
                        roundedCircle
                        fluid
                        onClick={props.onLogout}
                      />
                    </Nav.Link>
                  </LinkContainer>
                ) : (
                  <LinkContainer to="/login">
                    <Nav.Link className="shoppingCart-div">
                      <Image src={login} roundedCircle fluid />
                    </Nav.Link>
                  </LinkContainer>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default CustomNav;
