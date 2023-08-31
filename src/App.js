import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./Views/Homepage";
import Cart from "./Views/Cart";
import Product from "./Views/Product";
import CheckOut from "./Views/CheckOut";

// import "./App.css";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/checkout" element={<CheckOut />} />
      </Routes>
    </>
  );
};

export default App;
