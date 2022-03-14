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
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
function App() {
  return (
      <div className="App">
          <Container>
              <Row className="justify-content-md-center">
                  <Header/>
              </Row>
              <Row>
                  <Col md={{ span: 10, offset: 1 }}>
                      <Routes>
                          <Route path="/" element={<OrderPage />} />
                          <Route path="/order" element={<OrderPage />} />
                          <Route path="/orderadd" element={<OrderPageAdd />} />
                          <Route path="/product" element={<ProductPage />} />
                      </Routes>
                  </Col>

              </Row>
          </Container>



      </div>
  );
}

export default App;
