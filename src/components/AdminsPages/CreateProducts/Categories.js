import React from 'react';
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";

const Categories = () => {
  return (
    <Container>
      <Link to={"/admin-dashboard"}>Вернуться к Доске управления</Link><br />
      <Link to={"tea"}>Добавить чай</Link><br />
      <Link to={"coffee"}>Добавить кофе</Link><br />
      <Link to={"mate"}>Добавить мате</Link><br />
      <Link to={"sweet"}>Добавить сладости</Link><br />
      <Link to={"cookware"}>Добавить посуда и акссесуары</Link><br />
      <Link to={"storage"}>Добавить хранение и упаковка</Link>
    </Container>
  );
};

export default Categories;