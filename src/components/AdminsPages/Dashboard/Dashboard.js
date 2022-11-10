import React from 'react';
import {Link} from "react-router-dom";
import {Container} from "react-bootstrap";

const Dashboard = () => {
  return (
    <Container>
      <Link to={"/profile"}>вернутся в Профиль</Link><br />
      <Link to={"create-product-category"}>Добавление продукта в Базу</Link><br />
      <Link to={"tables"}>Таблицы</Link>
    </Container>
  );
};

export default Dashboard;