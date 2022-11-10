import React from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as yup from "yup";
import {Col, Container, Form, Row} from "react-bootstrap";
import {Formik} from "formik";
import {updateUser} from "store/Slices/createUserSlice";

const UserEditPage = () => {
  const params = useParams();
  const usersData = useSelector(state => state.usersList.usersData);
  const equalsUserWithDB = usersData.filter(user => Number(user.id) === Number(params.id));
  const getUser = equalsUserWithDB[0];

  const navigate = useNavigate();
  const validationsSchema = yup.object().shape({
    email: yup.string().email("Введите верный email").required("*"),
    password: yup.string().typeError("Должно быть строкой").required("*").test('len', "Обязательно", val => val !== undefined ? val.length >= 6 : ""),
    name: yup.string().typeError("Должно быть строкой").required("*"),
    surname: yup.string().typeError("Должно быть строкой").required("*"),
    lastname: yup.string().typeError("Должно быть строкой").required("*"),
    phone: yup.string().typeError("Должно быть строкой").required("*")
  })
  const dispatch = useDispatch();

  return (
    <Container>
      <h1 align={"center"}>Редактирование пользователя</h1>
      <Link to={"/admin-dashboard/tables/users"}>Вернуться в таблицу без сохранения</Link>
      <div className={""}>
        <Formik
          initialValues={{
            email: getUser.email === null ? "" : getUser.email,
            password: getUser.password === null ? "" : getUser.password,
            name: getUser.name === null ? "" : getUser.name,
            surname: getUser.surname === null ? "" : getUser.surname,
            lastname: getUser.lastname === null ? "" : getUser.lastname,
            phone: getUser.phone === null ? "" : getUser.phone
          }}
          validateOnBlur
          onSubmit={async (values) => {
            const userObject = {
              id: getUser.id,
              email: values.email,
              password: values.password,
              token: getUser.token,
              name: values.name,
              surname: values.surname,
              lastname: values.lastname,
              phone: values.phone,
              permission: {
                isAdmin: getUser.permission.isAdmin,
                isManager: getUser.permission.isManager,
                isUser: getUser.permission.isUser,
                isGuest: getUser.permission.isGuest
              }
            }
            dispatch(updateUser(userObject));
            navigate("/admin-dashboard/tables/users");
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
            <Form className={""}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label className={""}>Введите почту: {touched.email && errors.email && <span className={"error-input"}>{errors.email}</span>}</Form.Label>
                <Form.Control
                  className={"mb-2"}
                  type="email"
                  name={`email`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Введите почту.."
                />
                <Form.Label className={""}>Введите пароль: {touched.password && errors.password && <span className={"error-input"}>{errors.password}</span>}</Form.Label>
                <Form.Control
                  className={"mb-2"}
                  type="string"
                  name={`password`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Введите пароль.."
                />
                <Row>
                  <Col>
                    <Form.Label className={""}>Введите имя: {touched.name && errors.name && <span className={"error-input"}>{errors.name}</span>}</Form.Label>
                    <Form.Control
                      className={"mb-2"}
                      type="name"
                      name={`name`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      placeholder="Введите имя.."
                    />
                  </Col>
                  <Col>
                    <Form.Label className={""}>Введите фамилию: {touched.surname && errors.surname && <span className={"error-input"}>{errors.surname}</span>}</Form.Label>
                    <Form.Control
                      className={"mb-2"}
                      type="surname"
                      name={`surname`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.surname}
                      placeholder="Введите фамилию.."
                    />
                  </Col>
                  <Col>
                    <Form.Label className={""}>Введите отчество: {touched.lastname && errors.lastname && <span className={"error-input"}>{errors.lastname}</span>}</Form.Label>
                    <Form.Control
                      className={"mb-2"}
                      type="lastname"
                      name={`lastname`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastname}
                      placeholder="Введите отчество.."
                    />
                  </Col>
                </Row>
                <Form.Label className={""}>Введите телефон: {touched.phone && errors.phone && <span className={"error-input"}>{errors.phone}</span>}</Form.Label>
                <Form.Control
                  className={"mb-2"}
                  type="phone"
                  name={`phone`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                  placeholder="Введите телефон.."
                />
                <button
                  className={"submit-button"}
                  disabled={!isValid && !dirty}
                  onClick={handleSubmit}
                  type={`submit`}
                >Применить</button>
                <br />
              </Form.Group>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default UserEditPage;