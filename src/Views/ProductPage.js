import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Rating from "react-rating";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import useWindowResize from "../useWindowResize";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarF } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarE } from "@fortawesome/free-regular-svg-icons";

import LoadingIndicator from "../Components/LoadingIndicator";
import CustomNav from "../Components/CustomNav";
import Product from "../Components/Product";
import AddToCart from "../Components/AddToCart";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const { width, height, findScreenSize } = useWindowResize();

  window.addEventListener("resize", () => {
    findScreenSize();
  });

  useEffect(() => {
    setIsLoading(true);
    findScreenSize();
    axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => {
        setProduct({
          category: response.data.category,
          description: response.data.description,
          id: response.data.id,
          itemId: response.data.id,
          image: response.data.image,
          price: response.data.price.toFixed(2),
          rating: response.data.rating,
          title: response.data.title,
          quantity: 0,
        });
        if (location.state) {
          const { oldCart } = location.state;
          setCart(oldCart.cart);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleOnPlus = (e) => {
    e.preventDefault();
    setProduct({
      category: product.category,
      description: product.description,
      id: product.id,
      itemId: product.itemId,
      image: product.image,
      price: product.price,
      rating: product.rating,
      title: product.title,
      quantity: product.quantity + 1,
    });
  };

  const handleOnMinus = (e) => {
    e.preventDefault();
    setProduct({
      category: product.category,
      description: product.description,
      id: product.id,
      itemId: product.itemId,
      image: product.image,
      price: product.price,
      rating: product.rating,
      title: product.title,
      quantity: product.quantity === 0 ? 0 : product.quantity - 1,
    });
  };

  const handleReturntoShopping = (e) => {
    e.preventDefault();
    navigate("/", { state: { oldCart: { cart } } });
  };

  const handleOnAddToCart = (e) => {
    e.preventDefault();
    setCart(
      cart.find(
        (cartItem) => Number(cartItem.itemId) === Number(product.itemId)
      )
        ? cart.map((cartItem) => {
            if (Number(cartItem.itemId) === Number(product.itemId)) {
              return (cartItem = {
                category: cartItem.category,
                description: cartItem.description,
                id: cartItem.id,
                itemId: cartItem.itemId,
                image: cartItem.image,
                price: cartItem.price,
                rating: cartItem.rating,
                title: cartItem.title,
                quantity: Number(cartItem.quantity) + Number(product.quantity),
              });
            } else {
              return cartItem;
            }
          })
        : [...cart, product]
    );
    setProduct({
      category: product.category,
      description: product.description,
      id: product.id,
      itemId: product.itemId,
      image: product.image,
      price: product.price,
      rating: product.rating,
      title: product.title,
      quantity: 0,
    });
  };

  return (
    <>
      <CustomNav cart={cart} />

      {isLoading ? (
        <div className="loading-div">
          <LoadingIndicator />
        </div>
      ) : product.itemId && width >= 1040 ? (
        <div className="productPage-div">
          <Col xs={9} className="product-div">
            <Product product={product} width={width} />
          </Col>
          <Col className="productCart-div">
            <AddToCart
              product={product}
              onReturn={handleReturntoShopping}
              onPlus={handleOnPlus}
              onMinus={handleOnMinus}
              onAddToCart={handleOnAddToCart}
            />
          </Col>
        </div>
      ) : product.itemId ? (
        <Col>
          <Row>
            <AddToCart
              product={product}
              onReturn={handleReturntoShopping}
              onPlus={handleOnPlus}
              onMinus={handleOnMinus}
              onAddToCart={handleOnAddToCart}
              className="tinyWindowCart-div"
            />
          </Row>
          <Row>
            <Product product={product} width={width} />
          </Row>
        </Col>
      ) : width >= 1040 ? (
        <div className="productPage-div">
          <Col xs={9} className="product-div">
            <Card>
              <Card.Body className="noItemsBody-div">
                <Card.Title className="noItems-div">
                  Product Unavailable
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col className="productCart-div">
            <AddToCart
              product={product}
              onReturn={handleReturntoShopping}
              onPlus={handleOnPlus}
              onMinus={handleOnMinus}
              onAddToCart={handleOnAddToCart}
            />
          </Col>
        </div>
      ) : (
        <Col>
          <Row>
            <AddToCart
              product={product}
              onReturn={handleReturntoShopping}
              onPlus={handleOnPlus}
              onMinus={handleOnMinus}
              onAddToCart={handleOnAddToCart}
            />
          </Row>
          <Row>
            <Card>
              <Card.Body className="noItemsBody-div">
                <Card.Title className="noItems-div">
                  Product Unavailable
                </Card.Title>
              </Card.Body>
            </Card>
          </Row>
        </Col>
      )}
    </>
  );
};

export default ProductPage;
