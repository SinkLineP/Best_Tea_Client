import React from 'react';
import {Container, Row, Col, Nav, Navbar, Image} from 'react-bootstrap';
import {NavLink, Link} from "react-router-dom";
import LogoImg from "./Images/web-logo.png";
import DropDownBtn from "./components/DropDownBtn/DropDownBtn";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faChartSimple } from "@fortawesome/free-solid-svg-icons";
import "./styles/index.css";
import CustomButton from "./components/CustomButton/CustomButton";

const LogoContent = () => {
  return (
    <div>
      <Navbar className={"navbar-custom"} expand="lg">
        <Container>
          <Navbar.Brand className={"navbar-brand"}>
            <Link to={"/"}>
              <Image className={"img-logo"} src={LogoImg} alt={"Logo-Type"}/>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 navbar-pos"
              navbarScroll
            >
              <Row>
                <Col>
                  <NavLink className={"links-nav"} to={"/novelties"}>Новинки</NavLink>
                </Col>
                <Col>
                  <NavLink className={"links-nav"} to={"/discounts"}>Скидки</NavLink>
                </Col>
                <Col>
                  <DropDownBtn titleBtn={"Оптовикам"} />
                </Col>
                <Col>
                  <NavLink className={"links-nav"} to={"/contacts"}>Контакты</NavLink>
                </Col>
              </Row>
            </Nav>
            <div className={"d-flex pos-buttons-nav"}>
              <Link className={"space"} to={"/wishlist"}>
                <CustomButton>
                  <FontAwesomeIcon className={"icon-btn fa-2xl"}  icon={faHeart} />
                </CustomButton>
              </Link>
              <Link to={"/compare"}>
                <CustomButton>
                  <FontAwesomeIcon className={"icon-btn fa-2xl"} icon={faChartSimple} />
                </CustomButton>
              </Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default LogoContent;