import React from 'react';
import {Form} from 'react-bootstrap';
import { Formik } from "formik";
import * as yup from "yup";
import "./Styles/index.css";
import {Link} from "react-router-dom";

const RegisterOneClickForm = ({nameButton, title, handleClick}) => {
  const validationsSchema = yup.object().shape({
    phone: yup.string().typeError("Введите верный номер телефона").required("Обязательно").test('len', 'Минимум 11 символов', val => val !== undefined ? val.length >= 11 : "").test('len', 'Максимум 11 символов', val => val !== undefined ? val.length <= 11 : ""),
  })

  return (
    <>
      <div className={"background-form-size"}>
        <h1 className={"title-form"}>{title}</h1>
        <Formik
          initialValues={{
            phone: ""
          }}
          validateOnBlur
          onSubmit={(values) => {
            return handleClick(values.phone)
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
                <Form.Label className={"label-form"}>Введите телефон: (79507778866) {touched.phone && errors.phone && <span className={"error-input"}>{errors.phone}</span>}</Form.Label>
                <Form.Control
                  className={"mb-2"}
                  type={"phone"}
                  name={`phone`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                  placeholder="phone.."
                />
                <button
                  className={"submit-button"}
                  disabled={!isValid && !dirty}
                  onClick={handleSubmit}
                  type={`submit`}
                >{nameButton}</button>
                <br />
                {nameButton === "Зарегистрироваться" ? <p className={"isHaveAccount"}>Есть аккаунт - <Link to={"/login"}>Войдите</Link></p> : ""}
              </Form.Group>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default RegisterOneClickForm;