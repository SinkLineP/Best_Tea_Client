import React from 'react';
import {Form, Button} from 'react-bootstrap';
import { Formik } from "formik";
import * as yup from "yup";
import "./Styles/index.css";

const FormTemplate = ({ buttonSubmit }) => {
  const validationsSchema = yup.object().shape({
    name: yup.string().typeError("Должно быть строкой").required("Обязательно"),
    email: yup.string().email("Введите верный email").required("Обязательно"),
    phone: yup.number().typeError("Должно быть числом").required("Обязательно"),
    city: yup.string().typeError("Должно быть строкой").required("Обязательно")
  })

  function onSubmit(event, handle, isValids) {
    event.preventDefault();
    setTimeout(handle, 1)
    if (isValids === true) {
      setTimeout(buttonSubmit, 2);
    }
  }

  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phone: '',
          city: ''
        }}
        validateOnBlur
        onSubmit={(values) => {
          console.log("запрос на получение прайс листа");
          console.log(values); //запрос на получение прайс листа
        }}
        validationSchema={validationsSchema}
       >
        {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                className={"mb-2"}
                type="name"
                name={`name`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                placeholder="Имя"
              />
              { touched.name && errors.name && <p className={"error-input"}>{errors.name}</p>}
              <Form.Control
                className={"mb-2"}
                type="email"
                name={`email`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="E-mail"
              />
              { touched.email && errors.email && <p className={"error-input"}>{errors.email}</p>}
              <Form.Control
                className={"mb-2"}
                type="phone"
                name={`phone`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                placeholder="Телефон например 79993332211"
              />
              { touched.phone && errors.phone && <p className={"error-input"}>{errors.phone}</p>}
              <Form.Control
                className={"mb-2"}
                type="city"
                name={`city`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.city}
                placeholder="Город"
              />
              { touched.city && errors.city && <p className={"error-input"}>{errors.city}</p>}
              <Button
                disabled={!isValid && !dirty}
                onClick={(e) => onSubmit(e, handleSubmit, isValid)}
                type={`submit`}
              >Отправить</Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormTemplate;