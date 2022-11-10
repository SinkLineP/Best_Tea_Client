import React from 'react';
import {Container, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import CreateOrderForm from "./CreateOrderForm";

const CreateOrder = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  function handleRegisterOneClick(userObject) {
    console.log(userObject);
  }

  return (
    <Container>
      <CreateOrderForm nameButton={"Оформить заказ"} title={"Оформить заказ"} handleClick={handleRegisterOneClick}/>
    </Container>
  );
};

export default CreateOrder;