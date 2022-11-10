import React from 'react';
import Rate from "./component/Rate/Rate";
import "./styles/index.css";
import {Link} from "react-router-dom";


const CardProduct = ({ id, img, view, score, art, title, price }) => {

  return (
    <Link className={"card-link card-item"} to={`/category-tea/${id}`}>
      <div className={"card-content"}>
        <img className={"card-image"} src={img} alt={view} />
        <Rate score={score} />
        <p className={"card-art"}>{art}</p>
        <p className={"card-title"}>{title}</p>
        <hr />
        <p className={"card-price"}>{price} ₽</p>
      </div>
    </Link>
  );
};

export default CardProduct;