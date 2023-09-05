import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import { LinkContainer } from "react-router-bootstrap";
import shopping_cart from "../Images/shopping-cart.png";

function CustomNav(props) {
  const cart = props.cart;
  return (
    <>
      <Navbar
        key="md"
        expand="md"
        className="bg-body-tertiary mb-3"
        data-bs-theme="dark"
      >
        <Container fluid>
          <Navbar.Brand href="#">Generic Store</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                Generic Store
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <LinkContainer to="/" state={{ oldCart: { cart } }}>
                  <Nav.Link className="navItem">Home</Nav.Link>
                </LinkContainer>
                <LinkContainer
                  to="/category/electronics"
                  state={{ oldCart: { cart } }}
                >
                  <Nav.Link className="navItem">Electronics</Nav.Link>
                </LinkContainer>
                <LinkContainer
                  to="/category/jewelery"
                  state={{ oldCart: { cart } }}
                >
                  <Nav.Link className="navItem">Jewelery</Nav.Link>
                </LinkContainer>
                <LinkContainer
                  to="/category/men's clothing"
                  state={{ oldCart: { cart } }}
                >
                  <Nav.Link className="navItem">Men's Clothing</Nav.Link>
                </LinkContainer>
                <LinkContainer
                  to="/category/women's clothing"
                  state={{ oldCart: { cart } }}
                >
                  <Nav.Link className="navItem">Women's Clothing</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/cart" state={{ oldCart: { cart } }}>
                  <Nav.Link className="shoppingCart-div">
                    <Image src={shopping_cart} roundedCircle fluid />
                    {cart.length ? (
                      <Badge bg="danger" className="shoppingCartCount-div" pill>
                        {cart.length}
                      </Badge>
                    ) : null}
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default CustomNav;
