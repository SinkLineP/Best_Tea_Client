import React from 'react';
import {Col, Dropdown, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import { FaBars } from "react-icons/fa";
import "./styles/index.css";
import {Link} from "react-router-dom";

const CategoryDropDownBtn = () => {
  const categories = useSelector(state => state.categoryNavbarSearch.firstCategory);

  return (
    <div>
      <Dropdown className={"hide-dropDown-Categories-forMobile"}>
        <Dropdown.Toggle variant="light" className={"nav-drop-menu-search"} id="dropdown-basic">
          <span className={"nav-links btn-with-title"}><FaBars /> Категории</span>
          <span className={"nav-links btn-no-title"}><FaBars /></span>
        </Dropdown.Toggle>

        <Dropdown.Menu className={"drop-menu-categories shadowForBlock"}>
            {categories.map((items, key) => {
              return (
                <div className={"Categories-btn"} key={key}>
                  <Link to={items.link} className={"link-categories"}>
                    <Row>
                      <Col sm={2}>
                    <span id={"icon-btn"}>
                      <img src={items.icon} alt={items.title} />
                    </span>
                      </Col>
                      <Col sm={9}>
                    <span id={"title-btn"}>
                      {items.title}
                    </span>
                        <span id={"content-btn"}>{items.content}</span>
                      </Col>
                    </Row>
                  </Link>
                </div>
              )
            })}
        </Dropdown.Menu>

      </Dropdown>
      <Link className={"link-to-categories"} to={"/categories"}>
        Категории
      </Link>
    </div>
  );


};

export default CategoryDropDownBtn;
