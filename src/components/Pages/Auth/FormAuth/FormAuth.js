import React from 'react';
import {Form} from 'react-bootstrap';
import { Formik, Field } from "formik";
import * as yup from "yup";
import "./Styles/index.css";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import YupCustomMethods from "YupCustomMethods/YupCustomMethods";

const FormAuth = ({nameButton, title, handleClick}) => {
  const validationsSchema = yup.object().shape({
    email: yup.string().email("Введите верный email").required("Обязательно"),
    password: yup.string().typeError("Должно быть строкой").required("Обязательно").test('len', title !== "Авторизация" ? 'Минимум 6 символов' : "Обязательно", val => val !== undefined ? val.length >= 6 : ""),
  })
  const usersData = useSelector(state => state.usersList.usersData);
  const handleRemember = (values) => {
    if (values.toggle === false) {
      if (localStorage.getItem("currentUser") === "{}") {
        localStorage.setItem("currentUser", JSON.stringify(values))
      }
    } else {
      localStorage.setItem("currentUser", "{}");
    }
  }

  return (
    <>
      <div className={"background-form auth-background"}>
        <h1 className={"title-form"}>{title}</h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
            toggle: false
          }}
          validateOnBlur
          onSubmit={(values) => {
            return handleClick(values.email, values.password)
          }}
          validationSchema={validationsSchema}
         >
          {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              isValid,
              handleSubmit,
              dirty
          }) => (
            <Form className={"custom-form"}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label className={"label-form"}>Введите почту: {nameButton !== "Войти" ? usersData.find(user => user.email === values.email) && <span className={"error-input"}>Эта почта уже используется</span> : ""}{touched.email && errors.email && <span className={"error-input"}>{errors.email}</span>}</Form.Label>
                <Form.Control
                  className={"mb-2"}
                  type="email"
                  name={`email`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Email.."
                />
                <Form.Label className={"label-form"}>Введите пароль: {title === "Регистрация" ? "" : ""} {touched.password && errors.password && <span className={"error-input"}>{errors.password}</span>}</Form.Label>
                <Form.Control
                  className={"mb-2"}
                  type={"password"}
                  name={`password`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Password.."
                />
                <div className={"content-remember"}>
                  <Field type="checkbox" name="toggle" onClick={() => handleRemember(values)} />
                  <p className={"remember-me"}>Запомнить меня</p>
                </div>
                {nameButton !== "Войти" ? usersData.find(user => user.email === values.email) ? (
                  <button
                    className={"submit-button"}
                    disabled={true}
                    type={`submit`}
                  >{nameButton}</button>
                ) : (
                  <button
                    className={"submit-button"}
                    disabled={!isValid && !dirty}
                    onClick={handleSubmit}
                    type={`submit`}
                  >{nameButton}</button>
                ) : (
                  <button
                    className={"submit-button"}
                    disabled={!isValid && !dirty}
                    onClick={handleSubmit}
                    type={`submit`}
                  >{nameButton}</button>
                )}
                <br />
                {title === "Регистрация" ? <p className={"isHaveAccount"}>Есть аккаунт - <Link to={"/login"}>Войдите</Link></p> : <p className={"isHaveAccountRegister"}>Нет аккаунта - <Link to={"/register"}>Зарегистрируйтесь</Link></p>}
              </Form.Group>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default FormAuth;