import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import React from "react";
import {Link} from "react-router-dom";
import App from "../App";
import OrderPage from "./OrderPage";
import NavLink from "react-bootstrap/NavLink";

function Header() {
    return <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand  as={Link} to="/" >Blaze</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link  as={Link} to="/order" >
                       order
                    </Nav.Link>
                    <Nav.Link as={Link}  to="/product" >
                        product
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>;
}

export default Header;
