import React from 'react';
import {Button, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useCart} from "react-use-cart";
import "./Styles/index.css";

const NavbarButtonsCart = () => {
  const {emptyCart} = useCart();

  return (
    <div className={"box-back-btn"}>
      <Row>
        <Col sm={2}>
          <Link to={"/category-tea"}>
            <Button variant={"secondary"}>Продолжить покупки</Button>
          </Link>
        </Col>
        <Col sm={8}>
          <Button onClick={() => emptyCart()} variant={"danger"}>Очистить корзину</Button>
        </Col>
        <Col className={"create-order"}>
          <Link to={"/cart/create-order"}>
            <Button className={"create-order-btn"} variant={"success"}>Оформить заказ</Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default NavbarButtonsCart;