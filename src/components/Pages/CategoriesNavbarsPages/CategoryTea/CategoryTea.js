import React from 'react';
import InfoContent from "../../../InfoContent/InfoContent";
import {Container} from "react-bootstrap";
import {useSelector} from "react-redux";
import "./styles/index.css"
import CardProduct from "../../../CardProduct/CardProduct";


const CategoryTea = () => {
  const products = useSelector((state) => state.productList.teaList);


  return (
    <div>
      <InfoContent />
      <Container>
        <h1>Чай</h1>
        <p>breakfast</p>
        <hr />
        <div className={"container-tea"}>
          <div className={"tea-filters"}>
            Filters
          </div>
          <div className={"tea-products"}>
            <div className={"tea-products-content"}>
              {products.map((item, key) => (
                <CardProduct
                  key={key}
                  id={item.id}
                  img={item.img}
                  view={item.view}
                  score={item.score}
                  art={item.art}
                  title={item.title}
                  price={item.price}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryTea;