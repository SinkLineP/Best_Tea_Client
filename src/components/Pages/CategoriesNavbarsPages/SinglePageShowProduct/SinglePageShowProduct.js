import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {Button, Container, InputGroup, Form, Alert} from "react-bootstrap";
import {useSelector} from "react-redux";
import Rate from "components/CardProduct/component/Rate/Rate";
import CartModalOnProduct from "components/Cart/CartModalOnProduct/CartModalOnProduct";
import {useAuth} from "hooks/use-auth";
import {useCart} from "react-use-cart";
import "./styles/index.css";


const SinglePageShowProduct = () => {
  // const dispatch = useDispatch();
  const {id} = useParams();
  const [currProduct, setProduct] = useState(null);
  const [show, setShow] = useState(false);
  const [valueCountProduct, setValueCountProduct] = useState(0);
  const productByOfID = useSelector(state => state.productList.teaList);
  const currentIdProduct = Number(id);
  const currentUser = useAuth();
  const { addItem } = useCart();


  useEffect(() => {
    productByOfID.map((item) => {
      if (item.id === currentIdProduct) {
        setProduct(item);
      }
    })
  }, [currentIdProduct])


  function handleCustomChange(event) {
    setValueCountProduct(event.target.value);
  }



  if (currProduct !== null) {

    return (
      <Container>
        <p>breakfast</p>
        <h1 className={"title-product"}>{currProduct.title}</h1>
        <hr />
        <div className={"header-product"}>
          <div className={"mini-photos"}>
            <img className={"preview-mini-image"} src={currProduct.img} alt={currProduct.title} />
          </div>
          <div className={"preview-image-product"}>
            <img className={"preview-full-image"} src={currProduct.img} alt={currProduct.title} />
          </div>
          <div className={"product-menu shadowForBlock"}>
            <div className={"product-menu-header"}>
              <div className={"rate"}>
                <Rate score={currProduct.score}/>
              </div>
              <div className={"review"}>
                <div className={"review-content"}>
                  <div className={"link-reviews"}>{currProduct.reviews} отзывов</div>
                  <div className={"link-create-reviews"}>Оставить отзыв</div>
                </div>
              </div>
              <div className={"art"}>
                <p>АРТ.: {currProduct.art}/PACK</p>
              </div>
            </div>
            <div className={"product-menu-content"}>
              <div className={"content-price"}>
                <div className={"price"}>
                  <p className={"price-number"}>{currProduct.price}₽</p>
                  <div className={"count-product"}>
                    {currProduct.countProducts >= 500 ? <span className={"high-count-products"}>много</span> : <span className={"low-count-products"}>мало</span>}
                  </div>
                </div>
                <div className={"product-stock"}>
                  {currProduct.isStock === true ? (
                    <p className={"stock-have"}>в наличии</p>
                  ) : (
                    <p className={"stock-no-have"}>нет в наличии</p>
                  )}
                </div>
                <div className={"content-add-to-cart"}>
                  <InputGroup className="mb-2 input-group-add-to-cart">
                    <Form.Control
                      className={"input-count-product"}
                      type={"number"}
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      min="0"
                      onChange={(event) => handleCustomChange(event)}
                      value={valueCountProduct}
                    />
                    <Button className={"btn-add-to-cart"} variant="success" id="button-addon2" onClick={currentUser.permission.isGuest === true ? () => setShow(true) : () => addItem(currProduct, Number(valueCountProduct))}>
                      Добавить в корзину
                    </Button>
                  </InputGroup>
                </div>
                <div className={"other-move-products"}>
                  <button className={"postpone"}>Отложить</button>
                  <button className={"compare"}>Сравнить</button>
                </div>
              </div>
              <div className={"content-info"}>
                <div className={"action"}>
                  <Alert variant={"danger"}>
                    Преимущество до 30% на большие упаковки чая!
                  </Alert>
                </div>
                <div className={"more-info"}>
                  <div className={"guarantee"}>гарантия</div>
                  <div className={"delivery"}>доставка</div>
                  <div className={"ways-of-delivery"}>
                    <div className={"in-moscow"}>по москве</div>
                    <div className={"in-russia"}>по россии</div>
                  </div>
                  <div className={"count-days-delivery"}>доставка 1-2 дня</div>
                  <Link to={"#"} className={"link-delivery-info"}>Условия доставки</Link><br />
                  <Link to={"#"} className={"link-payment-info"}>Условия оплаты</Link><br />
                  <Link to={"#"} className={"link-how-create-order"}>Как сделать заказ</Link>
                </div>
                <div className={"buy-this-product-wholesale"}>
                  <Link to={"#"} className={"link-wholesale"}>{currProduct.title}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={"main-product"}>
          <div className={"about-product"}>
            <h1 className={"about-product-title"}>О товаре</h1>
            <p className={"about-product-content"}>{currProduct.aboutProduct}</p>
          </div>
          <div className={"features"}>
            <h1 className={"features-product-title"}>Характеристики</h1>
            <div className={"features-content"}>
              <p className={"features-scented"}>Ароматизированный: {currProduct.scented}</p>
              <p className={"features-view"}>Вид: {currProduct.view}</p>
              <p className={"features-type"}>Тип: {currProduct.type}</p>
              <p className={"features-packaging"}>Упаковка: {currProduct.packaging}</p>
              <p className={"features-form-of-release"}>Форма выпуска: {currProduct.formOfRelease}</p>
              <p className={"features-producer"}>Производитель: {currProduct.producer}</p>
              <p className={"features-country"}>Страна: {currProduct.country}</p>
            </div>
          </div>
          <div className={"review"}>
            <h1 className={"review-product-title"}>Отзывы</h1>
            Review Component
          </div>
        </div>
        <CartModalOnProduct showModal={show} hide={() => setShow(false)} />
      </Container>
    );
  }
};

export default SinglePageShowProduct;