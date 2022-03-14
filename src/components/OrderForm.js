import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import data from "bootstrap/js/src/dom/data";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

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
    order.details = details
    axios.post('http://localhost:8080/order/save', order)
      .then(response =>
      {
      });
  };
  //avoid empty products in db to prevent infinite loop
  if (!products.length)
  {
    axios.get(`http://localhost:8080/product`)
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

      <h3>Sub total</h3>
      <div>{subTotal()}</div>
      <Form.Group className="mb-3" >
      <Button variant="success" type="submit" onClick={sendOrder}>
        Complete Order
      </Button>
      </Form.Group>
      <Form.Group className="mb-3" >
      <Button variant="danger" type="submit" >
        Reject Order
      </Button>
      </Form.Group>
    </div>
  );
}
export default OrderForm;
