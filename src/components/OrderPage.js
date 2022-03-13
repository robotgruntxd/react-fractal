import OrderList from "./OrderList";
import React from "react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

function OrderPage()
{
    return (

        <div>


            <h2>
                Orders
            </h2>

            <br/>
            <br/>
            <div>
                <Button variant="primary"as={Link} to="orderadd">create order</Button>
            </div>
            <br/>
            <OrderList/>
        </div>
    );
}

export default OrderPage;
