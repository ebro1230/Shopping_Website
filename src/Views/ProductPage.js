import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Rating from "react-rating";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
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
import { Modal } from "react-bootstrap";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const userType = sessionStorage.getItem("userType");
  const { width, height, findScreenSize } = useWindowResize();

  const numberValidation = /^[0-9]+$/;
  const priceValidation = /^\$[0-9]*(\.[0-9]{0,2})?$/;
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState([]);
  const [category, setCategory] = useState([]);
  const [description, setDescription] = useState([]);
  const [price, setPrice] = useState([]);
  const [rating, setRating] = useState("");
  const [image, setImage] = useState([]);
  const [updateProductSuccess, setUpdateProductSuccess] = useState(false);
  const [productUpdated, setProductUpdated] = useState(0);
  const [productDeleteSuccess, setProductDeletedSuccess] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    findScreenSize();
    axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      //.get(`${process.env.REACT_APP_BACKEND_URL}api/product/${productId}`)
      .then((response) => {
        console.log(response);
        setProduct({
          category: response.data.category,
          description: response.data.description,
          id: response.data._id,
          //itemId: response.data._id,
          itemId: response.data.id,
          image: response.data.image,
          price: response.data.price.toFixed(2),
          //rating: Number(response.data.rating),
          rating: Number(response.data.rating.rate),
          title: response.data.title,
          quantity: 0,
        });
        setTitle(response.data.title);
        setCategory(response.data.category);
        setDescription(response.data.description);
        setPrice(response.data.price);
        //setRating(response.data.rating);
        setRating(response.data.rating.rate);
        setImage(response.data.image);
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
  }, [productUpdated]);

  const handleProductDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}api/product/${productId}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        console.log(response.data); // log the product is deleted
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setProductDeletedSuccess(true);
        setTimeout(() => {
          setProductDeletedSuccess(false);
          navigate(`/`);
        }, 3000);
      });
  };
  const handleUpdateProductSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("price", Number(price.substring(1)).toFixed(2));
    formData.append("rating", Number(rating));
    formData.append("image", image);

    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}api/product/${productId}`,
        formData,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((response) => {
        console.log(response.data); // log the newly created product
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setUpdateProductSuccess(true);
        setTitle([]);
        setCategory([]);
        setDescription([]);
        setPrice([]);
        setRating([]);
        setImage([]);
        setTimeout(() => {
          setUpdateProductSuccess(false);
          setIsEdit(false);
          setProductUpdated(productUpdated++);
        }, 3000);
      });
  };

  window.addEventListener("resize", () => {
    findScreenSize();
  });

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
    const oldCart = cart;
    sessionStorage.setItem("oldCart", JSON.stringify(oldCart));
    navigate(`/`);
    // navigate(`/`, { state: { oldCart: { cart } } });
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

  const handleEditItem = (e) => {
    e.preventDefault();
    setIsEdit(true);
  };

  const handleCancelEdit = (e) => {
    e.preventDefault();
    setIsEdit(false);
    setTitle(product.title);
    setCategory(product.category);
    setDescription(product.description);
    setPrice(product.price);
    setRating(product.rating);
    setImage(product.image);
  };

  return (
    <>
      <CustomNav cart={cart} />

      {isLoading ? (
        <div className="loading-div">
          <LoadingIndicator />
        </div>
      ) : updateProductSuccess ? (
        <Modal show={true} centered>
          <Modal.Header>
            <Modal.Title>Product Updated Successfully</Modal.Title>
          </Modal.Header>
        </Modal>
      ) : productDeleteSuccess ? (
        <Modal show={true} centered>
          <Modal.Header>
            <Modal.Title>Product Deleted Successfully</Modal.Title>
          </Modal.Header>
        </Modal>
      ) : isEdit ? (
        <Modal>
          <Modal.Header className="newProductTitle">Edit Product:</Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleUpdateProductSubmit}>
              <Form.Group controlId="title">
                <Form.Label>*Title:</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>*Category:</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>*Description:</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>*Price:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="$0.00"
                  name="price"
                  value={price}
                  onChange={(e) => {
                    if (
                      priceValidation.test(e.target.value) ||
                      ((price == 0 || e.target.value === "$") &&
                        numberValidation.test(e.target.value))
                    ) {
                      if (e.target.value === "$") {
                        setPrice([]);
                      } else if (e.target.value.slice(0, 1) === "$") {
                        setPrice(e.target.value);
                      } else {
                        setPrice("$" + e.target.value);
                      }
                    }
                  }}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>*Rating:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="0-5"
                  name="rating"
                  value={rating}
                  onChange={(e) => {
                    if (
                      numberValidation.test(e.target.value) ||
                      e.target.value === ""
                    ) {
                      if (e.target.value >= 0 && e.target.value <= 5) {
                        setRating(e.target.value.slice(0, 1));
                      }
                      if (Number(e.target.value) === "") {
                        setRating("");
                      }
                    }
                  }}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>*Product Image:</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  value={image}
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                />
                <Form.Text className="text-muted">
                  Please select an image to upload.
                </Form.Text>
              </Form.Group>
              <p style={{ fontSize: "smaller" }}>* = Required Field</p>
              <div className="createProductButton-div">
                <Button className="submit-button" type="submit">
                  Update Product
                </Button>
                <Button
                  className="submit-button"
                  type="submit"
                  variant="warning"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      ) : product.itemId && width >= 1040 ? (
        <>
          {userType === "owner" ? (
            <Row xs={1} md={2} lg={3} xl={4} className="g-4 editItemButton-div">
              <Button
                className="editItemButton"
                variant="primary"
                onClick={handleEditItem}
              >
                Edit Item
              </Button>
            </Row>
          ) : null}
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
        </>
      ) : product.itemId ? (
        <Col>
          {userType === "owner" ? (
            <Row xs={1} md={2} lg={3} xl={4} className="g-4 editItemButton-div">
              <Button
                className="editItemButton"
                variant="primary"
                onClick={handleEditItem}
              >
                Edit Item
              </Button>
            </Row>
          ) : null}
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
