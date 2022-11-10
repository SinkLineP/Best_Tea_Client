import React from 'react';
import InfoContent from "../../InfoContent/InfoContent";
import Slider from "./Slider/Slider";
import "./styles/index.css";
import Catalog from "./Catalog/Catalog";
import PopularCategories from "./PopularCategories/PopularCategories";

const Home = () => {

  return (
    <>
      <div className={"info-content-visible"}>
        <InfoContent />
      </div>
      <Slider />
      <Catalog />
      <PopularCategories />
    </>
  );
};

export default Home;