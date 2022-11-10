import React from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {Container, Form} from "react-bootstrap";
import {Formik} from "formik";
import {updateProduct} from "store/Slices/productsSlice";

const TeaEditPage = () => {
  const params = useParams();
  const teaProducts = useSelector(state => state.productList.teaList);
  const equalsTeaProducts = teaProducts.filter(tea => Number(tea.id) === Number(params.id));
  const currentProduct = equalsTeaProducts[0];

  const navigate = useNavigate();
  const validationsSchema = yup.object().shape({
    title: yup.string().typeError("Должно быть строкой").required("*"),
    art: yup.string().typeError("Должно быть строкой").required("*"),
    price: yup.string().typeError("Должно быть строкой").required("*"),
    img: yup.string().typeError("Должно быть строкой").required("*"),
    scented: yup.string().typeError("Должно быть строкой").required("*"),
    view: yup.string().typeError("Должно быть строкой").required("*"),
    extras: yup.string().typeError("Должно быть строкой").required("*"),
    formOfRelease: yup.string().typeError("Должно быть строкой").required("*"),
    producer: yup.string().typeError("Должно быть строкой").required("*"),
    country: yup.string().typeError("Должно быть строкой").required("*"),
    composition: yup.string().typeError("Должно быть строкой").required("*"),
    categories: yup.string().typeError("Должно быть строкой").required("*"),
    countProducts: yup.number().typeError("Должно быть числом").required("*"),
    isStock: yup.string().typeError("Должно быть строкой").required("*"),
    aboutProduct: yup.string().typeError("Должно быть строкой").required("*"),
    type: yup.string().typeError("Должно быть строкой").required("*"),
    packaging: yup.string().typeError("Должно быть строкой").required("*"),
  })
  const defaultImgURL = "https://firebasestorage.googleapis.com/v0/b/shop-tea.appspot.com/o/productImages%2Fimage_large.png?alt=media&token=143d383c-7eba-4538-871b-a76dc6d69c05";
  const dispatch = useDispatch();
  const teaList = useSelector(state => state.productList.teaList);



  return (
    <Container>
      <h1 align={"center"}>Edit Product</h1>
      <Link to={"/admin-dashboard/create-product-category"}>Вернуться к списку</Link>
      <div className={""}>
        <Formik
          initialValues={{
            title: currentProduct.title,
            art: currentProduct.art,
            price: currentProduct.price,
            img: currentProduct.img,
            scented: currentProduct.scented,
            view: currentProduct.view,
            extras: currentProduct.extras,
            formOfRelease: currentProduct.formOfRelease,
            producer: currentProduct.producer,
            country: currentProduct.country,
            composition: currentProduct.composition,
            categories: currentProduct.categories,
            score: currentProduct.score,
            reviews: currentProduct.reviews,
            countProducts: currentProduct.countProducts,
            isStock: currentProduct.isStock,
            aboutProduct: currentProduct.aboutProduct,
            type: currentProduct.type,
            packaging: currentProduct.packaging,
          }}
          validateOnBlur
          onSubmit={async (values) => {
            const productObject = {
              id: teaList.length + 1,
              title: values.title,
              art: values.art,
              price: values.price,
              img: values.img === "default" ? defaultImgURL : values.img,
              score: 0,
              scented: values.scented,
              view: values.view,
              extras: values.extras,
              formOfRelease: values.formOfRelease,
              producer: values.producer,
              country: values.country,
              composition: values.composition,
              categories: values.categories,
              reviews: [],
              countProducts: values.countProducts,
              isStock: values.isStock,
              aboutProduct: values.aboutProduct,
              type: values.type,
              packaging: values.packaging,
            }
            const currentItem = {
              idWithParams: params.id,
              currentProduct: productObject
            }
            dispatch(updateProduct(currentItem));


            // dispatch(editTeaProduct())
            navigate("/admin-dashboard/tables/tea");
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
                <Form.Label className={""}>Введите название продукта: {touched.title && errors.title && <span className={"error-input"}>{errors.title}</span>}</Form.Label>
                <Form.Control
                  className={"mb-2"}
                  type="title"
                  name={`title`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  placeholder="Введите название.."
                />
                <Form.Label className={""}>Введите ART продукта: {touched.art && errors.art && <span className={"error-input"}>{errors.art}</span>}</Form.Label>
                <Form.Control
                  className={"mb-2"}
                  type="art"
                  name={`art`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.art}
                  placeholder="Введите ART продукта.."
                />
                <Form.Label className={""}>Введите цену: {touched.price && errors.price && <span className={"error-input"}>{errors.price}</span>}</Form.Label>
                <Form.Control
                  className={"mb-2"}
                  type="price"
                  name={`price`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.price}
                  placeholder="Введите цену.."
                />
                <Form.Label className={""}>Впишите default или введите адресс картинки: {touched.img && errors.img && <span className={"error-input"}>{errors.img}</span>}</Form.Label>
                <Form.Control
                  className={"mb-2"}
                  type="img"
                  name={`img`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.img}
                  placeholder="Введите default или адресс картинки.."
                />
                <Form.Label className={""}>Араматизированный продукт `да` или `нет`: {touched.scented && errors.scented && <span className={"error-input"}>{errors.scented}</span>}</Form.Label>
                <Form.Control
                  className={"mb-2"}
                  type="scented"
                  name={`scented`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.scented}
                  placeholder="Араматизированный продукт `да` или `нет`"
                />
                <Form.Label className={""}>Введите вид продукта: {touched.view && errors.view && <span className={"error-input"}>{errors.view}</span>}</Form.Label>
                <Form.Control
                  className={"mb-2"}
                  type="view"
                  name={`view`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.view}
                  placeholder="Введите вид продукта"
                />
                <Form.Label className={""}>Введите добавки через запятую: {touched.extras && errors.extras && <span className={"error-input"}>{errors.extras}</span>}</Form.Label>
                <Form.Control
                  className={"mb-2"}
                  type="extras"
                  name={`extras`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.extras}
                  placeholder="Введите добавки"
                />
                <Form.Label className={""}>Введите форму продукта: {touched.formOfRelease && errors.formOfRelease && <span className={"error-input"}>{errors.formOfRelease}</span>}</Form.Label>
                <Form.Control
                  className={"mb-2"}
                  type="formOfRelease"
                  name={`formOfRelease`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.formOfRelease}
                  placeholder="Введите форму продукта"
                />
                <Form.Label className={""}>Введите производителя: {touched.producer && errors.producer && <span className={"error-input"}>{errors.producer}</span>}</Form.Label>
                <Form.Control
                  className={"mb-2"}
                  type="producer"
                  name={`producer`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.producer}
                  placeholder="Введите производителя"
                />
                <Form.Label className={""}>Введите страну производителя: {touched.country && errors.country && <span className={"error-input"}>{errors.country}</span>}</Form.Label>
                <Form.Control
                  className={"mb-2"}
                  type="country"
                  name={`country`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.country}
                  placeholder="Введите страну производителя"
                />
                <Form.Label className={""}>Введите состав: {touched.composition && errors.composition && <span className={"error-input"}>{errors.composition}</span>}</Form.Label>
                <Form.Control
                  className={"mb-2"}
                  type="composition"
                  name={`composition`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.composition}
                  placeholder="Введите состав"
                />
                <Form.Label className={""}>Введите категорию продукта: {touched.categories && errors.categories && <span className={"error-input"}>{errors.categories}</span>}</Form.Label>
                <Form.Control
                  className={"mb-2"}
                  type="categories"
                  name={`categories`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.categories}
                  placeholder="Введите категорию продукта"
                />
                <Form.Label className={""}>Введите количество продукта: {touched.countProducts && errors.countProducts && <span className={"error-input"}>{errors.countProducts}</span>}</Form.Label>
                <Form.Control
                  className={"mb-2"}
                  type="countProducts"
                  name={`countProducts`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.countProducts}
                  placeholder="Введите количество продукта"
                />
                <Form.Label className={""}>Вналичии?: {touched.isStock && errors.isStock && <span className={"error-input"}>{errors.isStock}</span>}</Form.Label>
                <Form.Control
                  className={"mb-2"}
                  type="isStock"
                  name={`isStock`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.isStock}
                  placeholder="Вналичии?"
                />
                <Form.Label className={""}>Введите описание продукта: {touched.aboutProduct && errors.aboutProduct && <span className={"error-input"}>{errors.aboutProduct}</span>}</Form.Label>
                <Form.Control
                  className={"mb-2"}
                  type="aboutProduct"
                  name={`aboutProduct`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.aboutProduct}
                  placeholder="Введите описание продукта"
                />
                <Form.Label className={""}>Введите тип продукта: {touched.type && errors.type && <span className={"error-input"}>{errors.type}</span>}</Form.Label>
                <Form.Control
                  className={"mb-2"}
                  type="type"
                  name={`type`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.type}
                  placeholder="Введите тип продукта"
                />
                <Form.Label className={""}>Введите тип упаковки продукта: {touched.packaging && errors.packaging && <span className={"error-input"}>{errors.packaging}</span>}</Form.Label>
                <Form.Control
                  className={"mb-2"}
                  type="packaging"
                  name={`packaging`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.packaging}
                  placeholder="Введите тип упаковки продукта"
                />
                <button
                  className={"submit-button"}
                  disabled={!isValid && !dirty}
                  onClick={handleSubmit}
                  type={`submit`}
                >Добавить продукт</button>
                <br />
              </Form.Group>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default TeaEditPage;