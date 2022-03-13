import './App.css';
import React from "react";
import OrderPage from "./components/OrderPage";
import OrderPageAdd from "./components/OrderPageAdd";
import ProductPage from "./components/ProductPage";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Header from "./components/Header";
function App() {
  return (
      <div className="App">
          <Header/>
          <br/>
          <Routes>
              <Route path="/" element={<OrderPage />} />
              <Route path="order" element={<OrderPage />} />
              <Route path="orderadd" element={<OrderPageAdd />} />
              <Route path="product" element={<ProductPage />} />
          </Routes>

      </div>



  );
}

export default App;
