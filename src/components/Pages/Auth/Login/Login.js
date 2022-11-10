import React, {useState} from 'react';
import FormAuth from "../FormAuth/FormAuth";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Container} from "react-bootstrap";
import "./styles/index.css";
import {setCurrentUser} from "../../../../store/Slices/currentUserSlice";
import AlertMessage from "../../../AlertMessage/AlertMessage";


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usersData = useSelector(state => state.usersList.usersData);
  const [showAlert, setShowAlert] = useState(false);

  function checkUserLogin(email, password, usersDataList) {
    usersDataList.map((props) => {
      if (props.email === email && props.password === password) {
        setShowAlert(false);
        const userObject = {
          id: props.id,
          email: props.email,
          password: props.password,
          token: props.token,
          phone: props.phone,
          name: props.name,
          lastname: props.lastname,
          surname: props.surname,
          permission: {
            isAdmin: props.permission.isAdmin,
            isManager: props.permission.isManager,
            isUser: props.permission.isUser,
            isGuest: props.permission.isGuest,
          }
        };
        dispatch(setCurrentUser(userObject));
        navigate("/");
      } else {
        setShowAlert(true);
      }
    })
  }

  function handleLogin(email, password) {
    console.log(`Email: ${email}, Password: ${password}.`);
    checkUserLogin(email, password, usersData);
  }

  return (
    <Container className={"form-login"}>
      <div className={"alert-block"} style={showAlert === false ? {display: "none"} : {display: "block"}}>
        <AlertMessage className={"alert-message"} variant={"danger"} message={"Error, no correct email or password!"}/>
      </div>
      <FormAuth nameButton={"Войти"} title={"Авторизация"} handleClick={handleLogin}/>
    </Container>
  );
};

export default Login;