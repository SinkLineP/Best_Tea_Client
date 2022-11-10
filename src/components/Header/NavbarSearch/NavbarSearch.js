import React from 'react';
import {Button, Container, Form, Nav, Navbar, InputGroup} from "react-bootstrap";
import { ImSearch } from "react-icons/im";
import CategoryDropDownBtn from "./components/CategoryDropDownBtn/CategoryDropDownBtn";
import {Link} from "react-router-dom";
import {MdOutlineShoppingCart} from "react-icons/md";
import {CgProfile} from "react-icons/cg";
import "./styles/index.css";
import {useCart} from "react-use-cart";


const NavbarSearch = () => {
  const {totalItems} = useCart();
  return (
    <Navbar className={"navbar-search-customize"} expand="lg">
      <Container>
          <Nav className="me-auto my-auto my-lg-0 nav-col-1">
          <CategoryDropDownBtn />
        </Nav>
        <Nav className="me-auto my-auto my-lg-0 nav-col-2">
          <InputGroup>
            <Form.Control
              placeholder={"Введите товар..."}
              aria-describedby="basic-addon2"
            />
            <Button variant={"secondary"} className={"search-button"} id="button-addon2">
              <ImSearch />
            </Button>
          </InputGroup>
        </Nav>
        <Nav className="d-flex my-lg-0 nav-col-3">
          <div className={"account-and-cart"}>
            <div className={"row-width"}>
              <div className={"row-col-1"}>
                <Link className={"accountBtn"} to={"/profile"}>
                  <Button variant={"success"}>
                    <span className={"big-display"}>Аккаунт</span>
                    <span className={"small-display"}><CgProfile /></span>
                  </Button>
                </Link>
              </div>
              <div className={"row-col-2"}>
                <Link className={"cartBtn"} to={"/cart"}>
                  <Button variant={"success"} style={{color: "white"}}>
                    <p className={"countItems"}>{totalItems}</p>
                    <MdOutlineShoppingCart />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarSearch;