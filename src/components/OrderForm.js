import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import data from "bootstrap/js/src/dom/data";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import * as Constants from "./Constants";

const OrderForm = () =>
{
  const [details, setDetails] = useState([])
  const [products, setProducts] = useState([])
  const [order, setOrder] = useState({
    consumer: "",
    status: "",
    date: "",
    total: 0,
    details: []
  })
  const [detail, setDetail] = useState({
    number: 0,
    key: 0,
    product: "",
    quantity: 1,
    unitPrice: 0,
    cost: 0,
  })
  const handleChangeDet = e => setDetail({...detail, [e.target.name]: e.target.value})
  const handleChangeOrder = e => setOrder({...order, [e.target.name]: e.target.value})
  const addDetail = () =>
  {
    if (!detail.product)
    {
      alert("Select product");
      return;
    }
    detail.number++
    const newDetail = JSON.parse(JSON.stringify(detail));
    newDetail.cost = newDetail.unitPrice * newDetail.quantity;
    setDetails([...details, newDetail])
  };
  const subTotal = () =>
  {
    if(!details.length) return 0

    return details.map(value => value.cost).reduce((previousValue, currentValue) =>
      previousValue + currentValue)

  }
  const sendOrder = () =>
  {
    if(!order.consumer)  {
      alert("Fill Consumer");
      return;
    }
    order.details = details
    axios.post(Constants.HOST_URL +'/order/save', order)
      .then(response =>
      {
      });
  };
  //avoid empty products in db to prevent infinite loop
  if (!products.length)
  {
    axios.get( Constants.HOST_URL+`/product`)
      .then(res =>
      {
        setProducts(res.data)
      })
  }
  return (
    <div>
      <Form>

        <Row>
          <Col md={{span: 2}}>
            <Form.Label>Consumer</Form.Label>
          </Col>
          <Col md={{span: 8}}>

            <Form.Group className="mb-3" controlId="consumer">
              <Form.Control name="consumer" value={order.consumer}
                            onChange={e => handleChangeOrder(e)} type="text" placeholder="Enter consumer"/>
            </Form.Group>
          </Col>
        </Row>

        <Table striped bordered hover>
          <thead>
          <tr>
            <th>Nº</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>cost</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>#</td>
            <td><Form.Group className="mb-3">

              <Form.Select name="product" value={detail.product} onChange={e => handleChangeDet(e)}>
                <option value={-1}> select</option>
                {products.map(product =>
                  <option key={product.number} value={product.name} hidden={product.status==="Inactive"}>{product.name}</option>
                )}
              </Form.Select>
            </Form.Group>
            </td>
            <td>
              <Form.Group className="mb-3" controlId="quantity">
                <Form.Control name="quantity" value={detail.quantity}
                              onChange={e => handleChangeDet(e)} type="number"/>
              </Form.Group>
            </td>
            <td>
              <Form.Group className="mb-3" controlId="unitPrice">
                <Form.Control name="unitPrice" value={detail.unitPrice} onChange={e => handleChangeDet(e)} type="number"/>

              </Form.Group>
            </td>
            <td>
              <Form.Group className="mb-3" controlId="cost">
                <Form.Control name="cost" type="number" value={detail.unitPrice * detail.quantity} readOnly/>
              </Form.Group>
            </td>
            <td>edit delete</td>
          </tr>
          {details.map(detail =>
            <tr key={detail.number}>
              <td>{detail.number}</td>
              <td>{detail.product}</td>
              <td>{detail.quantity}</td>
              <td>{detail.unitPrice}</td>
              <td>{detail.cost}</td>
              <td>edit delete</td>
            </tr>)}
          </tbody>
        </Table>
        <Button variant="primary" type="button" onClick={addDetail}>
          Add item+
        </Button>
      </Form>
      <Container fluid={true} className="g-0">
        <h3>Sub total</h3>


        <div>{subTotal()}</div>
        <h3>Taxes</h3>

        <h4>Total city tax { (subTotal()*.1).toFixed(2)}</h4>
        <h4>Total County tax {(subTotal()*.055).toFixed(2)}</h4>
        <h4>Total state tax {(subTotal()*.0924).toFixed(2)}</h4>
        <h4>Total federal tax {(subTotal()*.0249).toFixed(2)}</h4>

        <h3>Total taxes {(subTotal()*.2723).toFixed(2)}</h3>
        <h3>Total {(subTotal()*1.2723).toFixed(2)}</h3>
      </Container>


      <div>
        <Button  variant="success" type="submit" onClick={sendOrder}>Complete Order</Button>{' '}
        <Button variant="danger">Reject Order</Button>{' '}
      </div>

    </div>
  );
}
export default OrderForm;
