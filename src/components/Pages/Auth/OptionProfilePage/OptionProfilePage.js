import React from 'react';
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useAuth} from "hooks/use-auth";


const OptionProfilePage = () => {
  const currentUser = useAuth();

  return (
    <Container>
      <Link to={"/profile"}>вернутся в профиль</Link><br />
      <Link to={`edit-user-custom-data/${currentUser.id}`}>Пользовательские данные</Link><br />
      <Link to={`edit-user-confidencial-data/${currentUser.id}`}>Учетные данные</Link>
    </Container>
  );
};

export default OptionProfilePage;