import React from 'react';
import NavbarInfo from "./NavbarInfo/NavbarInfo";
import LogoContent from "./LogoContent/LogoContent";
import NavbarSearch from "./NavbarSearch/NavbarSearch";
import "./styles/index.css";


const Header = () => {
  return (
    <div>
      <div className={"navbars-infomations"}>
        <NavbarInfo phoneOne={"+7 950 771 62 92"} phoneTwo={"+7 959 747 23 62"}/>
        <LogoContent />
      </div>
      <NavbarSearch />
    </div>
  );
};

export default Header;