import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import { LinkContainer } from "react-router-bootstrap";
import shopping_cart from "../Images/shopping-cart.png";
import login from "../Images/Login.png";
import logout from "../Images/Logout.png";
const id = sessionStorage.getItem("userId");
const oldCart = JSON.parse(sessionStorage.getItem("oldCart"));

function CustomNav(props) {
  const cart = oldCart;
  console.log(3);
  return (
    <>
      <Navbar
        key="md"
        expand="md"
        className="bg-body-tertiary mb-3"
        data-bs-theme="dark"
      >
        <Container fluid>
          {/* <LinkContainer to="/" state={{ oldCart: { cart } }}> */}
          <LinkContainer to="/">
            <Navbar.Brand>Generic Store</Navbar.Brand>
          </LinkContainer>
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
                {/* <LinkContainer to="/" state={{ oldCart: { cart } }}> */}
                <LinkContainer to="/">
                  <Nav.Link className="navItem">Home</Nav.Link>
                </LinkContainer>
                {/* <LinkContainer
                  to="/category/electronics"
                  state={{ oldCart: { cart } }}
                > */}
                <LinkContainer to="/category/electronics">
                  <Nav.Link className="navItem">Electronics</Nav.Link>
                </LinkContainer>
                {/* <LinkContainer
                  to="/category/jewelery"
                  state={{ oldCart: { cart } }}
                > */}
                <LinkContainer to="/category/jewelery">
                  <Nav.Link className="navItem">Jewelery</Nav.Link>
                </LinkContainer>
                {/* <LinkContainer
                  to="/category/men's clothing"
                  state={{ oldCart: { cart } }}
                > */}
                <LinkContainer to="/category/men's clothing">
                  <Nav.Link className="navItem">Men's Clothing</Nav.Link>
                </LinkContainer>
                {/* <LinkContainer
                  to="/category/women's clothing"
                  state={{ oldCart: { cart } }}
                > */}
                <LinkContainer to="/category/women's clothing">
                  <Nav.Link className="navItem">Women's Clothing</Nav.Link>
                </LinkContainer>
                {/* <LinkContainer to="/cart" state={{ oldCart: { cart } }}> */}
                <LinkContainer to="/cart">
                  <Nav.Link className="shoppingCart-div">
                    <Image src={shopping_cart} roundedCircle fluid />
                    {cart ? (
                      cart.length ? (
                        <Badge
                          bg="danger"
                          className="shoppingCartCount-div"
                          pill
                        >
                          {cart.length}
                        </Badge>
                      ) : null
                    ) : null}
                  </Nav.Link>
                </LinkContainer>
                {/* <LinkContainer to="/login" state={{ oldCart: { cart } }}> */}
                {id ? (
                  <LinkContainer to="/">
                    <Nav.Link className="shoppingCart-div">
                      <Image
                        src={logout}
                        roundedCircle
                        fluid
                        onClick={sessionStorage.clear()}
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
