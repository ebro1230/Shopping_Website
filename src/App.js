import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./Views/Homepage";
import Cart from "./Views/Cart";
import ProductPage from "./Views/ProductPage";
import CheckOut from "./Views/CheckOut";
import Category from "./Views/Category";
import AddProductPage from "./Views/AddProductPage";
import LoginPage from "./Views/LoginPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/product/newproduct" element={<AddProductPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
};

export default App;
