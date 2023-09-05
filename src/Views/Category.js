import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router";

import Item from "../Components/Item";
import LoadingIndicator from "../Components/LoadingIndicator";
import CustomNav from "../Components/CustomNav";

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const location = useLocation();
  let { category } = useParams();

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
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://fakestoreapi.com/products/category/${category}`)
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
  }, [category]);

  return (
    <>
      <CustomNav cart={cart} />
      <div className="items-container">
        {isLoading ? (
          <div className="loading-div">
            <LoadingIndicator />
          </div>
        ) : items.length ? (
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
                />
              </Col>
            ))}
          </Row>
        ) : (
          <p>No Items Available</p>
        )}
      </div>
    </>
  );
};

export default HomePage;
