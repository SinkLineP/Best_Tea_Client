import React from 'react';
import {NavDropdown} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import "./styles/index.css";

const DropDownBtn = ({titleBtn}) => {
  return (
    <NavDropdown className={"drop-menu"} id={"navbarScrollingDropdown"} title={titleBtn}>
      <NavLink className={"link-text"} to="/tea-wholesale">Чай оптом</NavLink><br />
      <NavLink className={"link-text"} to="/coffee-wholesale">Кофе оптом</NavLink><br />
      <NavLink className={"link-text"} to="/ware-wholesale">Посуда оптом</NavLink><br />
      <NavLink className={"link-text"} to="/tea-production">Производство чая "Своё название"</NavLink><br />
      <NavLink className={"link-text"} to="/certificates">Сертификаты и Декларации</NavLink>
    </NavDropdown>
  );
};

export default DropDownBtn;