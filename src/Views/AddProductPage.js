import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Form, Modal } from "react-bootstrap";
import CustomNav from "../Components/CustomNav";

const AddProductPage = () => {
  const navigate = useNavigate();
  const numberValidation = /^[0-9]+$/;
  const priceValidation = /^\$[0-9]*(\.[0-9]{0,2})?$/;
  const ratingValidation = /^(?:[0-4](?:\.\d)?|5(?:\.0)?)$/;
  const ratingValidation2 = /^([0-5])(\.?)$/;
  const [title, setTitle] = useState([]);
  const [category, setCategory] = useState([]);
  const [description, setDescription] = useState([]);
  const [price, setPrice] = useState([]);
  const [rating, setRating] = useState("");
  const [image, setImage] = useState([]);
  const [newProductSuccess, setNewProductSuccess] = useState(false);
  const [cart, setCart] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("userType") === "customer") {
      navigate("/");
    }
    if (sessionStorage.getItem("oldCart")) {
      setCart(JSON.parse(sessionStorage.getItem("oldCart")));
    }
    if (sessionStorage.getItem("userId")) {
      setId(sessionStorage.getItem("userId"));
    }
  }, []);

  const handleNewProductSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("price", Number(price.substring(1)).toFixed(2));
    formData.append("rating", Number(rating));
    formData.append("image", image);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}api/product/newproduct`,
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
        setNewProductSuccess(true);
        setTitle([]);
        setCategory([]);
        setDescription([]);
        setPrice([]);
        setRating([]);
        setImage([]);
        setTimeout(() => {
          setNewProductSuccess(false);
          navigate("/");
        }, 3000);
      });
  };

  return (
    <>
      <CustomNav cart={cart} id={id} />
      <div className="newProduct-div">
        {newProductSuccess ? (
          <Modal show={true} centered>
            <Modal.Header>
              <Modal.Title>Successfully Added New Product</Modal.Title>
            </Modal.Header>
          </Modal>
        ) : (
          <>
            <h3 className="newProductTitle">Add New Product:</h3>
            <Form onSubmit={handleNewProductSubmit}>
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
                  as="textarea"
                  rows={3}
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
                  placeholder="0.0-5.0"
                  name="rating"
                  value={rating}
                  onChange={(e) => {
                    if (
                      ratingValidation.test(e.target.value) ||
                      ratingValidation2.test(e.target.value) ||
                      e.target.value === ""
                    ) {
                      if (Number(e.target.value) === "") {
                        setRating("");
                      } else {
                        setRating(e.target.value);
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
                  Create Product
                </Button>
              </div>
            </Form>
          </>
        )}
      </div>
    </>
  );
};

export default AddProductPage;
