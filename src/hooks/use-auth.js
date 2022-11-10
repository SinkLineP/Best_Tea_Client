import {useSelector} from "react-redux";

export function useAuth() {
  const {email, password, token, id, permission, phone, name, surname, lastname} = useSelector(state => state.currentUser);
  const isAuth = () => {
    if (email !== "Guest@mail.ru" && password !== "guestTest") {//пользователь авторизированный
      console.log("user is auth, file 'use-auth.js'");
      JSON.parse("true");
    } else if (email === "Guest@mail.ru" && password === "guestTest") {//Пользователь не авторизирован
      console.log("user not auth, file 'use-auth.js'");
      JSON.parse("false");
    }
  }

  return {
    isAuth,
    email,
    token,
    id,
    password,
    permission,
    phone,
    name,
    surname,
    lastname
  }
}