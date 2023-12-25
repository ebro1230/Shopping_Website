import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Item from "../Components/Item";
import LoadingIndicator from "../Components/LoadingIndicator";
import CustomNav from "../Components/CustomNav";

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [customerType, setCustomerType] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const userType = sessionStorage.getItem("userType");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://fakestoreapi.com/products`)
      .then((response) => {
        setItems(
          response.data.map((item) => {
            return (item = {
              category: item.category,
              description: item.description,
              id: item.id,
              itemId: item.id,
              image: item.image,
              price: item.price.toFixed(2),
              rating: item.rating,
              title: item.title,
              quantity: 0,
            });
          })
        );
        // if (location.state) {
        //   const { oldCart } = location.state;
        //   setCart(oldCart.cart);
        // }
        if (sessionStorage.getItem("oldCart")) {
          setCart(JSON.parse(sessionStorage.getItem("oldCart")));
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
    const increaseId = e.target.id;
    setItems(
      items.map((item) => {
        if (Number(item.id) === Number(increaseId)) {
          return (item = {
            category: item.category,
            description: item.description,
            id: item.id,
            itemId: item.id,
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
    setItems(
      items.map((item) => {
        if (Number(item.id) === Number(decreaseId)) {
          return (item = {
            category: item.category,
            description: item.description,
            id: item.id,
            itemId: item.id,
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

  const handleOnAddToCart = (e) => {
    e.preventDefault();
    const itemId = e.target.id;
    const itemQuantity = Number(e.target.getAttribute("data-quantity"));
    setItems(
      items.map((item) => {
        if (Number(item.id) === Number(itemId)) {
          setCart(
            cart.find((cartItem) => cartItem.id === item.id)
              ? cart.map((cartItem) => {
                  if (Number(cartItem.id) === Number(item.id)) {
                    return (cartItem = {
                      category: cartItem.category,
                      description: cartItem.description,
                      id: cartItem.id,
                      itemId: cartItem.id,
                      image: cartItem.image,
                      price: cartItem.price,
                      rating: cartItem.rating,
                      title: cartItem.title,
                      quantity:
                        Number(cartItem.quantity) + Number(itemQuantity),
                    });
                  } else {
                    return cartItem;
                  }
                })
              : [...cart, item]
          );
          return (item = {
            category: item.category,
            description: item.description,
            id: item.id,
            itemId: item.id,
            image: item.image,
            price: item.price,
            rating: item.rating,
            title: item.title,
            quantity: 0,
          });
        } else {
          return item;
        }
      })
    );
    const oldCart = cart;
    console.log(oldCart);
    sessionStorage.setItem("oldCart", JSON.stringify(oldCart));
  };

  const handleItemClick = (e) => {
    e.preventDefault();
    const productId = Number(e.target.getAttribute("data-itemid"));
    const oldCart = cart;
    sessionStorage.setItem("oldCart", JSON.stringify(oldCart));
    navigate(`/product/${productId}`);
    // navigate(`/product/${productId}`, { state: { oldCart: { cart } } });
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    navigate("/product/newproduct");
  };

  return (
    <>
      <CustomNav cart={cart} />
      <div className="items-container">
        {isLoading ? (
          <div className="loading-div">
            <LoadingIndicator />
          </div>
        ) : items.length ? (
          <>
            {userType === "owner" ? (
              <Row
                xs={1}
                md={2}
                lg={3}
                xl={4}
                className="g-4 addItemButton-div"
              >
                <Button
                  className="addItemButton"
                  variant="primary"
                  onClick={handleAddItem}
                >
                  Add Item
                </Button>
              </Row>
            ) : null}
            <Row xs={1} md={2} lg={3} xl={4} className="g-4">
              {items.map((item) => (
                <Col key={item.id}>
                  <Item
                    cardImage={item.image}
                    cardTitle={item.title}
                    cardRating={item.rating.rate}
                    cardPrice={item.price}
                    cardText={item.description}
                    cardQuantity={item.quantity}
                    cardId={item.id}
                    cardItemId={item.itemId}
                    onPlus={handleOnPlus}
                    onMinus={handleOnMinus}
                    onAddToCart={handleOnAddToCart}
                    onItemClick={handleItemClick}
                  />
                </Col>
              ))}
            </Row>
          </>
        ) : (
          <p>No Items Available</p>
        )}
      </div>
    </>
  );
};

export default HomePage;
