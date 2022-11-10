import React from 'react';
import {useCart} from "react-use-cart";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
// import {Link} from "react-router-dom";
import {MdDeleteForever} from "react-icons/md";
import "./Styles/index.css";
import NavbarButtonsCart from "./NavbarButtonsCart/NavbarButtonsCart";
import {Link} from "react-router-dom";


const Cart = () => {
  const {
    isEmpty,
    items,
    updateItemQuantity,
    removeItem,
    cartTotal
  } = useCart();

  if (isEmpty) return (
    <Container>
      <p className={"title-empty-cart"}>Ваша корзина пуста, <Link to={"/"} className={"title-empty-cart-link-back-to-shop"}>вернуться в Магазин</Link>.</p>
    </Container>
  );

  const priceCurrentItem = (price, count) => {
    return Number(price) * Number(count);
  }

  return (
    <Container className={"container-cart"}>
      <h1 className={"cart-title"}>Содержимое корзины</h1>

      <NavbarButtonsCart />

      <Table>
        <thead>
          <tr>
            <th>Товар</th>
            <th>Цена за ед.</th>
            <th>Кол-во</th>
            <th>Итого</th>
            <th className={"delete-product"}>Удалить</th>
          </tr>
        </thead>
        <tbody>
        {items.map((item) => {
          return (
            <tr key={item.id}>
              <td>
                <Row>
                  <Col>
                    <img src={item.img} alt={item.title} className={"cart-product-image"}/>
                  </Col>
                  <Col className={"cart-product-content"}>
                    <p className={"cart-product-title"}>{item.title}</p>
                    <p>Арт.: {item.art}</p>
                    <p>Вес 100г</p>
                  </Col>
                </Row>
              </td>
              <td>
                <p>{item.price} ₽</p>
              </td>
              <td>
                <Row className={"content-product-price"}>
                  <Col sm={4} className={"content-product-quantity"}>
                    {item.quantity}
                  </Col>
                  <Col sm={8} className={"content-product-price-buttons"}>
                    <div>
                      <Button
                        variant={"secondary"}
                        className={"button-edit-quantity-products add-product"}
                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                      >+</Button>
                    </div>
                    <div>
                      <Button
                        variant={"secondary"}
                        className={"button-edit-quantity-products"}
                        onClick={() => updateItemQuantity(item.id, item.quantity === 1 ? item.quantity = 1 : item.quantity - 1)}
                      >-</Button>
                    </div>
                  </Col>
                </Row>
              </td>
              <td>{priceCurrentItem(item.price, item.quantity)} ₽</td>
              <td>
                <Button variant={"danger"} onClick={() => removeItem(item.id)}><MdDeleteForever /></Button>
              </td>
            </tr>
          )
        })}
        </tbody>
      </Table>
      <div>
        <Row>
          <Col sm={11}>
            <p className={"total-title-price"}>Итого: </p>
          </Col>
          <Col className={"total-price"} sm={1}>
            {cartTotal} ₽
          </Col>
        </Row>
      </div>
      <NavbarButtonsCart />
    </Container>
  );
};

export default Cart;