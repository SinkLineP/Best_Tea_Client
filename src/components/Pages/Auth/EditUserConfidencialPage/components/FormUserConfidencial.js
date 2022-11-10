import React from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as yup from "yup";
import {Container, Form} from "react-bootstrap";
import {Formik} from "formik";
import {updateUser} from "store/Slices/createUserSlice";

const FormUserConfidencial = () => {
  const params = useParams();
  const usersData = useSelector(state => state.usersList.usersData);
  const equalsUserWithDB = usersData.filter(user => Number(user.id) === Number(params.id));
  const getUser = equalsUserWithDB[0];

  const navigate = useNavigate();
  const validationsSchema = yup.object().shape({
    email: yup.string().email("Введите верный email").required("*"),
    password: yup.string().typeError("Должно быть строкой").required("*").test('len', "Обязательно", val => val !== undefined ? val.length >= 6 : ""),
  })
  const dispatch = useDispatch();

  return (
    <Container>
      <h1 align={"center"}>Редактирование пользователя</h1>
      <Link to={"/profile/option-profile/"}>вернутся в настройки профиля</Link><br />
      <div className={""}>
        <Formik
          initialValues={{
            email: getUser.email,
            password: getUser.password,
          }}
          validateOnBlur
          onSubmit={async (values) => {
            const userObject = {
              id: getUser.id,
              email: values.email,
              password: values.password,
              token: getUser.token,
              name: getUser.name,
              surname: getUser.surname,
              phone: getUser.phone,
              permission: {
                isAdmin: getUser.permission.isAdmin,
                isManager: getUser.permission.isManager,
                isUser: getUser.permission.isUser,
                isGuest: getUser.permission.isGuest
              }
            }
            dispatch(updateUser(userObject));
            navigate("/profile");
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

export default FormUserConfidencial;