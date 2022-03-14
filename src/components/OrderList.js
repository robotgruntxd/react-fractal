import React from 'react';
import axios from 'axios';
import Table from "react-bootstrap/Table";

export default class OrderList extends React.Component
{
    state = {
        orders: []
    }
    componentDidMount()
    {
        axios.get(`http://localhost:8080/order`)
            .then(res =>
            {
                const orders = res.data;
                this.setState({orders});
            })
    }
    render()
    {
        return (
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Nº</th>
                    <th>Consumer</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>

                {this.state.orders.map(order =>
                    <tr key={order.id}>

                        <td>{order.number}</td>
                        <td>{order.consumer}</td>
                        <td>{order.status}</td>
                        <td>{order.date}</td>
                        <td>{order.total}</td>
                        <td>edit</td>
                    </tr>)}

                </tbody>
            </Table>
        )
    }
}
