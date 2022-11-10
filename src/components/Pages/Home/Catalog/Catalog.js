import React from 'react';
import {Container} from "react-bootstrap";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import "./styles/index.css";
import Discount from "./Images/Discount.svg";
import Novelties from "./Images/Novelties.svg";


const Catalog = () => {
  const catalog = useSelector(state => state.catalog.arrayImages);

  return (
    <Container>
      <div className={"catalog"}>
        <p className={"catalog-title"}>Каталог</p>
        <div className={"catalog-container"}>
          {catalog.map((item, key) => (
            <Link key={key} to={item.link} className={"catalog-link catalog-item"}>
              <div style={{backgroundColor: item.color}} className={"catalog-item-img"}>
                <img src={item.url} alt={item.title}/>
              </div>
              <p className={"catalog-content"}>{item.title}</p>
            </Link>
          ))}
          <Link to={"discounts"} className={"catalog-link catalog-item forMobile"}>
            <div style={{backgroundColor: "red"}} className={"catalog-item-img"}>
              <img src={Discount} alt={"discount"}/>
            </div>
            <p className={"catalog-content"}>Скидки</p>
          </Link>
          <Link to={"novelties"} className={"catalog-link catalog-item forMobile"}>
            <div style={{backgroundColor: "orange"}} className={"catalog-item-img"}>
              <img src={Novelties} alt={"novelties"}/>
            </div>
            <p className={"catalog-content"}>Новинки</p>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Catalog;