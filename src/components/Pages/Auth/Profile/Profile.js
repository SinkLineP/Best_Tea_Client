import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import {removeCurrentUser} from "store/Slices/currentUserSlice";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../../../hooks/use-auth";
import {useCart} from "react-use-cart";
import {showContentIsAuth} from "components/ShowContentIsAuth/showContentIsAuth";


const Profile = () => {
  const currentUser = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {emptyCart} = useCart();

  return (
    <Container>
      <div>
        {showContentIsAuth("Email", currentUser.email, "Не указана почта")}
        {showContentIsAuth("Имя", currentUser.name, "Не указано имя")}
        {showContentIsAuth("Фамилия", currentUser.surname, "Не указана фамилия")}
        {showContentIsAuth("Отчество", currentUser.lastname, "Не указано отчество")}
        {showContentIsAuth("Телефон", currentUser.phone, "Не указан телефон")}
      </div>
      {
        currentUser.permission.isAdmin === true ? <><Link to={"/admin-dashboard"}>Доска управления</Link><br /></> : ""
      }
      {
        currentUser.permission.isGuest === true ? (
          <Link className={"register-button"} to={"/register"}>
            <Button variant={"light"}>Регистрация</Button>
          </Link>
        ) : (
          <>
            <Link to={`option-profile`}>
              <Button variant={"secondary"}>Настроить Профиль</Button>
            </Link>
            <br />
            <Button variant={"danger"} onClick={() => {
              dispatch(removeCurrentUser())
              navigate("/")
              emptyCart()
              localStorage.setItem("currentUser", "{}")
            }}>Выйти</Button>
          </>

        )
      }

    </Container>
  );
};

export default Profile;