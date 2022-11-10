import React from 'react';
import {NavDropdown} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import "./styles/index.css";

const DropDownBtn = ({titleBtn}) => {
  return (
    <NavDropdown className={"nav-drop-menu-info"} id={"navbarScrollingDropdown"} title={titleBtn} menuVariant="light">
      <div className={"drop-menu-info"}>
        <NavLink className={"link-text-info"} to="/delivery">Доставка</NavLink><br />
        <NavLink className={"link-text-info"} to="/payment">Оплата</NavLink><br />
        <NavLink className={"link-text-info"} to="/exchange">Обмен и Возврат</NavLink>
      </div>
    </NavDropdown>
  );
};

export default DropDownBtn;