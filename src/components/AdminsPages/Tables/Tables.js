import React from 'react';
import {Link} from "react-router-dom";
import {Container} from "react-bootstrap";

const Tables = () => {
  return (
    <Container>
      <Link to={"/admin-dashboard"}>Вернуться к Доске управления</Link><br />
      <Link to={"users"}>Все пользователи</Link><br />
      <Link to={"tea"}>Чай</Link><br />
      <Link to={"coffee"}>Кофе</Link><br />
      <Link to={"mate"}>Мате</Link><br />
      <Link to={"sweets"}>Сладости</Link><br />
      <Link to={"cookware"}>Посуда и аксессуары</Link><br />
      <Link to={"storage"}>Хранение и упаковка</Link><br />
    </Container>
  );
};

export default Tables;