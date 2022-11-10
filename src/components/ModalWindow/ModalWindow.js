import React from 'react';
import Modal from 'react-bootstrap/Modal';
import FormTemplate from "../Header/NavbarInfo/components/FormTemplate/FormTemplate";

const ModalWindow = ({showModal, hide}) => {
  return (
    <>
      <Modal show={showModal} onHide={hide}>
        <Modal.Header closeButton>
          <Modal.Title>Получите оптовый Прайс-Лист</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormTemplate buttonSubmit={hide}/>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalWindow;