import React from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setCurrentUser} from "../../../../store/Slices/currentUserSlice";
import {addNewUser} from "../../../../store/Slices/createUserSlice";
import {Container} from "react-bootstrap";
import RegisterOneClickForm from "./RegisterOneClickForm";

const RegisterOneClick = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  function handleRegisterOneClick(phone) {
    const userObject = {
      phone: phone,
      email: null,
      password: null,
      token: `TOKEN:PHONE:ID`,
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
    dispatch(addNewUser(userObject));
    dispatch(setCurrentUser(userObject));
    navigate("/");
  }

  return (
    <Container className={"form-register"}>
      <RegisterOneClickForm nameButton={"Зарегистрироваться"} title={"Регистрация в один клик"} handleClick={handleRegisterOneClick}/>
    </Container>
  );
};

export default RegisterOneClick;