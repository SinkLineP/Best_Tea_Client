import React from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as yup from "yup";
import {Container, Form} from "react-bootstrap";
import {Formik} from "formik";
import {updateUser} from "store/Slices/createUserSlice";

const FormUserCustom = () => {
  const params = useParams();
  const usersData = useSelector(state => state.usersList.usersData);
  const equalsUserWithDB = usersData.filter(user => Number(user.id) === Number(params.id));
  const getUser = equalsUserWithDB[0];

  const navigate = useNavigate();
  const validationsSchema = yup.object().shape({
    name: yup.string().typeError("Должно быть строкой").required("*"),
    surname: yup.string().typeError("Должно быть строкой").required("*"),
    lastname: yup.string().typeError("Должно быть строкой").required("*"),
    phone: yup.string().typeError("Должно быть строкой")
  })
  const dispatch = useDispatch();

  console.log(getUser);

  return (
    <Container>
      <h1 align={"center"}>Редактирование пользовательских настроек</h1>
      <Link to={"/profile/option-profile/"}>вернутся в настройки профиля</Link><br />
      <div className={""}>
        <Formik
          initialValues={{
            name: getUser.name,
            surname: getUser.surname,
            lastname: getUser.lastname,
            phone: getUser.phone
          }}
          validateOnBlur
          onSubmit={async (values) => {
            const userObject = {
              id: getUser.id,
              email: getUser.email,
              password: getUser.password,
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

export default FormUserCustom;