import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./Views/Homepage";
import Cart from "./Views/Cart";
import Product from "./Views/Product";
import CustomNav from "./Components/CustomNav";

// import "./App.css";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:productId" element={<Product />} />
      </Routes>
    </>
  );
};

export default App;
