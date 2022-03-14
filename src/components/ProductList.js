import React from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

export default class ProductList extends React.Component
{
  state = {
    products: []
  }
  componentDidMount()
  {
    axios.get(`http://localhost:8080/product`)
      .then(res =>
      {
        const products = res.data;
        this.setState({products});
      })
  }
  render()
  {
    return (
      <Table striped bordered hover>
        <thead>
        <tr>
          <th>Nº</th>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>

        {this.state.products.map(product =>
          <tr key={product.id}>

            <td>{product.number}</td>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>{product.price}</td>
            <td>{product.status}</td>
            <td>edit</td>
          </tr>)}

        </tbody>
      </Table>
    )
  }
}
