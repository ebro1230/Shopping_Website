import Button from "react-bootstrap/Button";

const UpdateCartButton = (props) => {
  const oldCart = props.oldCart;
  const cart = props.cart;
  const quantityChange = 0;

  return (
    <div className="updateButton-div">
      {quantityChange ? (
        <Button>Update Cart</Button>
      ) : (
        <Button onClick={props.handleUpdate}>Update Cart</Button>
      )}
    </div>
  );
};

export default UpdateCartButton;
