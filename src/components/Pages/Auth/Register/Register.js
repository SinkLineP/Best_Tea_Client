import React from 'react';
import FormAuth from "../FormAuth/FormAuth";
import {useDispatch} from "react-redux";
import {setCurrentUser} from "store/Slices/currentUserSlice";
import { useNavigate } from 'react-router-dom';
import {Container} from "react-bootstrap";
import "./styles/index.css";
import {addNewUser} from "../../../../store/Slices/createUserSlice";

const Register = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  function handleRegister(email, password) {
    console.log(`Email: ${email}, Password: ${password}.`);
    const userObject = {
      email: email,
      password: password,
      token: `TOKEN:XXX:ID`,
      phone: null,
      name: null,
      surname: null,
      lastname: null,
      permission: {
        isAdmin: false,
        isManager: false,
        isUser: true,
        isGuest: false
      }
    };
    dispatch(setCurrentUser(userObject));
    dispatch(addNewUser(userObject));
    navigate("/");
  }

  return (
    <Container className={"form-register"}>
      <FormAuth nameButton={"Зарегистрироваться"} title={"Регистрация"} handleClick={handleRegister}/>
    </Container>
  );
};

export default Register;