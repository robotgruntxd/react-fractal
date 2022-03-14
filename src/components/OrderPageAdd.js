import React from "react";
import OrderForm from "./OrderForm";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function OrderPageAdd()
{
    return (

        <div>

            <Row><h2><Col md={4}>Order</Col></h2></Row>
            <Row>
                <Col md={10}>


                    <OrderForm/>
                </Col>
                <Col md={{span: 1, offset: 1}}/>
            </Row>
        </div>
    );
}

export default OrderPageAdd;
