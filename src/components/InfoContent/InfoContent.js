import React from 'react';
import {Link} from "react-router-dom";
import {TbTruckDelivery} from "react-icons/tb";
import {RiShieldCheckLine} from "react-icons/ri";
import {TbDiscount2} from "react-icons/tb";
import "./styles/index.css";
import {Container} from "react-bootstrap";
import HeaderInfo from "./components/HeaderInfo/HeaderInfo";


const InfoContent = () => {
  return (
    <div className={"info-content-main"}>
      <Container>
        <div className={"header-info-component"}>
          <HeaderInfo />
        </div>
        <div className={"info-content"}>
          <div className={"info-item-delivery"}>
            <TbTruckDelivery className={"info-icon"}/>
            <p>
              <span className={"info-title"}>Бесплатная доставка</span><br />
              <Link className={"info-link"} to={"/delivery-on-moscow-and-russia-free"}>по Москве и РФ от 4000 руб</Link>
            </p>
          </div>
          <div className={"info-item-guarantee"}>
            <RiShieldCheckLine className={"info-icon"}/>
            <p>
              <span className={"info-title"}>Лучшая гарантия</span><br />
              <Link className={"info-link"} to={"/best-guarantee"}>Обмен и возврат без проблем</Link>
            </p>
          </div>
          <div className={"info-item-loyalty-program"}>
            <TbDiscount2 className={"info-icon"}/><br/>
            <span className={"info-title"}>Программа лояльности</span><br />
            <Link className={"info-link"} to={"/loyalty-program"}>Накопительная скидка до 10%</Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default InfoContent;