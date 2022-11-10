import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';
import { Formik } from "formik";
import * as yup from "yup";
import "./Styles/index.css";
import {useSelector} from "react-redux";
import DatalistInput from "react-datalist-input";
import {useCart} from "react-use-cart";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "hooks/use-auth";
import {
  showContentIsAuthNoLabel,
  changeClassIsActive, decoderIsActivePayment
} from "components/ShowContentIsAuth/showContentIsAuth";
import {ButtonsPayment} from "Variables/buttons";
import { AiFillCloseCircle } from "react-icons/ai";


const CreateOrderForm = ({nameButton, title, handleClick}) => {
  const validationsSchema = yup.object().shape({
    cityDelivery: yup.string().typeError("Выберите город доставки").required("*").test('len', 'Минимум 1 символов', val => val !== undefined ? val.length >= 1 : ""),
    address: yup.string().typeError("Введите верный адрес").required("*"),
    indexMail: yup.string().typeError("Введите верный индекс почты").required("*").test("len", "Минимум 6 символов", val => val !== undefined ? val.length >= 6 : ""),
    nameAndSurname: yup.string().typeError("Введите верное имя и фамилию").required("*"),
    email: yup.string().typeError("Введите верный email").required("*"),
    customerNotes: yup.string().typeError("Введите верное примечание"),
    typePayment: yup.string().typeError("Введите тип оплаты"),
    phone: yup.string().typeError("Введите верный номер телефона").required("*").test('len', 'Минимум 11 символов', val => val !== undefined ? val.length >= 11 : "").test('len', 'Максимум 11 символов', val => val !== undefined ? val.length <= 11 : ""),
  })
  const [addressCities, setAddressCities] = useState([]);
  const CITIES = useSelector(state => state.allCityList.cityData);
  const navigate = useNavigate();
  const currentUser = useAuth();
  const authUser = currentUser.isAuth === true;
  const {
    isEmpty,
    items,
    totalUniqueItems,
    totalItems,
    removeItem,
    cartTotal
  } = useCart();

  useEffect(() => {
    let arrayCitiesAddress = [];
    CITIES.map((city, index) => {
      arrayCitiesAddress.push({id: index, value: city.address});
    })
    setAddressCities(arrayCitiesAddress);
  }, [CITIES]);

  const [isActive, setActive] = useState({clname: "name0"});
  const [delivery, setDelivery] = useState("");
  const [priceTotal, setPriceTotal] = useState(0);
  const [statusPromo, setStatusPromo] = useState("bad");

  const handleClickActive = (event, id, values) => {
    event.preventDefault();
    setActive({clname: "name" + id});
    values.typePayment = decoderIsActivePayment(isActive);
  }

  const certificateCategories = useSelector(state => state.certificatesData.certificatesData);
  const getAllCertificatesAndPromoCodes = [];

  useEffect(() => {
    certificateCategories.map((categories) => {
      if (categories.categoriesCertificate !== undefined) {
        categories.categoriesCertificate.map((item) => {
          item.content.map((certificates) => {
            const codeObject = {
              code: certificates.code,
              sale: certificates.sale,
            }
            getAllCertificatesAndPromoCodes.push(codeObject);
          })
        })
      }
      if (categories.categoriesPromoCodes !== undefined) {
        categories.categoriesPromoCodes.map((item) => {
          item.promoCodes.map((promo) => {
            const codeObject = {
              code: promo.code,
              sale: promo.sale,
            }
            getAllCertificatesAndPromoCodes.push(codeObject);
          })
        })
      }
    });
  }, [getAllCertificatesAndPromoCodes])

  const checkCertificateOrPromoCode = (code) => {
    getAllCertificatesAndPromoCodes.map((codeCertificate) => {
      if (codeCertificate.code === code) {
        const price = cartTotal / 100 * codeCertificate.sale;
        setStatusPromo("ok");
        setPriceTotal(price);
      } else {
        setStatusPromo("bad");
      }
    })
  }


  return (
    <>
      <div>
        <h1 className={"title-form"}>{title}</h1>
        <Formik
          initialValues={{
            cityDelivery: delivery,
            address: "",
            indexMail: "",
            nameAndSurname: `${showContentIsAuthNoLabel(currentUser.name, "")} ${showContentIsAuthNoLabel(currentUser.surname, "")}`,
            phone: showContentIsAuthNoLabel(currentUser.phone, ""),
            email: showContentIsAuthNoLabel(currentUser.email, ""),
            customerNotes: "",
            typePayment: "online-payment",
          }}
          validateOnBlur
          onSubmit={(values) => {
            const orderObject = {
              orderInfo: values,
              cart: {
                totalPrice: statusPromo === "ok" ? priceTotal : cartTotal,
                items: items,
              },
              user: currentUser,
            }

            console.log(orderObject);

            // return handleClick({
            //   cityDelivery: values.cityDelivery,
            //   address: values.address,
            //   indexMail: values.indexMail,
            //   nameAndSurname: values.nameAndSurname,
            //   phone: values.phone,
            //   email: values.email,
            //   customerNotes: values.customerNotes,
            //   typePayment: values.typePayment,
            //   promoCertificate: values.promoCertificate
            // })
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
            <Row>
              <Col sm={9}>
                <Form className={"custom-form"}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label className={"label-form"}>Доставка в: {touched.cityDelivery && errors.cityDelivery && <span className={"error-input"}>{errors.cityDelivery}</span>}</Form.Label>
                    <DatalistInput
                      placeholder="Выберите город доставки"
                      onSelect={(item) => values.cityDelivery = item.value}
                      onChange={handleChange}
                      items={addressCities}
                      label={""}
                    />
                    <div className={"block-label-buyer"}>
                      <Row>
                        <Col>
                          <p className={"label-buyer"}>Покупатель</p>
                        </Col>
                        <Col className={"login-cell"}>
                          {authUser ? (
                            <Button className={"btn-LogIn"} variant={"secondary"} onClick={() => navigate("/login")}>Войти</Button>
                          ) : (
                            <p className={"label-buyer"}>{showContentIsAuthNoLabel(currentUser.name, "Не указано имя")}</p>
                          )}
                        </Col>
                      </Row>
                    </div>
                    <Row>
                      <Col>
                        <Form.Label className={"label-form"}>Адрес: {touched.address && errors.address && <span className={"error-input"}>{errors.address}</span>}</Form.Label>
                        <Form.Control
                          className={"mb-2"}
                          type="address"
                          name={"address"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.address}
                          placeholder="Введите адрес (Улица, дом, квартира или офис).."
                        />
                      </Col>
                      <Col>
                        <Form.Label className={"label-form"}>Индекс Почты: {touched.indexMail && errors.indexMail && <span className={"error-input"}>{errors.indexMail}</span>}</Form.Label>
                        <Form.Control
                          className={"mb-2"}
                          type="indexMail"
                          name={`indexMail`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.indexMail}
                          placeholder="Индекс (для почты России).."
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label className={"label-form"}>Имя и фамилия: {touched.nameAndSurname && errors.nameAndSurname && <span className={"error-input"}>{errors.nameAndSurname}</span>}</Form.Label>
                        <Form.Control
                          className={"mb-2"}
                          type="nameAndSurname"
                          name={`nameAndSurname`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.nameAndSurname === " " ? values.nameAndSurname = "" : values.nameAndSurname}
                          placeholder="Введите имя и фамилию.."
                        />
                      </Col>
                      <Col>
                        <Form.Label className={"label-form"}>Телефон: {touched.phone && errors.phone && <span className={"error-input"}>{errors.phone}</span>}</Form.Label>
                        <Form.Control
                          className={"mb-2"}
                          type="phone"
                          name={`phone`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phone}
                          placeholder="Введите телефон.."
                        />
                      </Col>
                      <Col>
                        <Form.Label className={"label-form"}>E-mail: {touched.email && errors.email && <span className={"error-input"}>{errors.email}</span>}</Form.Label>
                        <Form.Control
                          className={"mb-2"}
                          type="email"
                          name={`email`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          placeholder="Введите E-mail"
                        />
                      </Col>
                    </Row>
                    <Form.Label className={"label-form"}>Поле для примечаний покупателя: {touched.customerNotes && errors.customerNotes && <span className={"error-input"}>{errors.customerNotes}</span>}</Form.Label>
                    <Form.Control
                      className={"mb-2"}
                      style={{minHeight: "100px"}}
                      as={"textarea"}
                      type="customerNotes"
                      name={`customerNotes`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.customerNotes}
                      placeholder="Примечания покупателя.."
                    />
                    <Row>
                      {
                        ButtonsPayment.optionButtons.map((button, key) => {
                          return (
                            <Col key={key}>
                              <button
                                id={button.id}
                                className={`${changeClassIsActive(isActive, button.id, ButtonsPayment.classesButtons.activeBTNClass, ButtonsPayment.classesButtons.notActiveBTNClass)}`}
                                onClick={(event) => handleClickActive(event, button.id, values)}
                              >
                                <div className={"block-payment"}>
                                  <img src={button.urlImage} className={"icon-payment"} alt={"icon-payment"} />
                                  <p className={`${changeClassIsActive(isActive, button.id, ButtonsPayment.classesButtons.activeTITLEClass, ButtonsPayment.classesButtons.notActiveTITLEClass)}`}>{button.title}</p>
                                  <p className={`${changeClassIsActive(isActive, button.id, ButtonsPayment.classesButtons.activeDESCCLass, ButtonsPayment.classesButtons.notActiveDESCClass)}`}>{button.desc}</p>
                                </div>
                              </button>
                            </Col>
                          )
                        })
                      }
                    </Row>
                    <button
                      className={"submit-button"}
                      disabled={!isValid && !dirty}
                      onClick={handleSubmit}
                      type={`submit`}
                    >{nameButton} ({statusPromo === "ok" ? priceTotal : cartTotal} ₽)</button>
                    <br />
                  </Form.Group>
                </Form>
              </Col>
              <Col sm={3}>
                <div className={"delivery-form"}>
                  <p>Ваш заказ: </p>
                  <hr />
                  {items.map((item, key) => {
                    return (
                      <>
                        <Row className={"product-order"} key={key}>
                          <Col sm={10}>
                            <Link to={`/category-tea/${item.id}`}>{item.title}</Link>
                            <p>{item.quantity} x {item.price * item.quantity} ₽</p>
                          </Col>
                          <Col sm={2}>
                            <button className={"delete-button"} onClick={() => removeItem(item.id)}><AiFillCloseCircle /></button>
                          </Col>
                        </Row>
                        <hr />
                      </>
                    )
                  })}
                  <Row>
                    <Col sm={8}>
                      <p>{totalItems} шт.</p>
                    </Col>
                    <Col sm={4}>
                      <p className={"cart-total-price-delivery"}>{cartTotal} ₽</p>
                    </Col>
                  </Row>
                  <label>Введите промо-код: {statusPromo === "bad" ? <span className={"error-code"}>Неверный код</span> : ""} </label>
                  <input
                    type={"string"}
                    placeholder={"Введите подарочный сертификат или промо-код..."}
                    onChange={(event) => checkCertificateOrPromoCode(event.target.value)}/>
                  <Row>
                    <Col>
                      <p>Сумма заказа: </p>
                    </Col>
                    <Col>
                      <p className={"cart-total-price-delivery"}>{statusPromo === "ok" ? priceTotal : cartTotal} ₽{statusPromo === "ok" ? <span className={"sale"}>{cartTotal} ₽</span> : ""}</p>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          )}
        </Formik>
      </div>
    </>
  );
};

export default CreateOrderForm;