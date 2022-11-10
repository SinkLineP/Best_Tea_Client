import React from 'react';
import Modal from 'react-bootstrap/Modal';
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

const CartModalOnProduct = ({showModal, hide}) => {
  return (
    <>
      <Modal show={showModal} onHide={hide}>
        <Modal.Header closeButton>
          <Modal.Title>Получите оптовый Прайс-Лист</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Link to={"/register-one-click"}>
            <Button>Регистрация в один клик</Button>
          </Link>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CartModalOnProduct;