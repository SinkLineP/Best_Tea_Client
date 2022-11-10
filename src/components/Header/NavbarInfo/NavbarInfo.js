import React, {useState} from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import ModalWindow from "../../ModalWindow/ModalWindow";
import DropDownBtn from "./components/DropDownBtn/DropDownBtn";
import "./styles/index.css";

const NavbarInfo = ({phoneOne, phoneTwo}) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <Navbar className={"border-bottom"} style={{ minHeight: '40' }} collapseOnSelect expand="lg" bg="white" variant="light">
        <Container>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '130px' }} navbarScroll>
              <Nav.Link disabled>
                <span className={"nav-text"}>{phoneOne} - Магазин чая</span>
              </Nav.Link>
              <Nav.Link disabled>
                <span className={"nav-text"}>{phoneTwo} - Оптовый отдел</span>
              </Nav.Link>
              <Nav.Link onClick={() => setShow(true)}>
                <span className={"nav-text"}>Прайс лист</span>
              </Nav.Link>
            </Nav>
            <Nav className={"d-flex"}>
              <DropDownBtn classText={"nav-text"} titleBtn={"Информация"} />
              <Nav.Link>
                <span className={"nav-text"}>Местонахождение</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ModalWindow showModal={show} hide={() => setShow(false)} />
    </div>
  );
};

export default NavbarInfo;