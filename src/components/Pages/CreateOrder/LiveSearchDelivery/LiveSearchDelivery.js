import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import "./Styles/index.css";

const LiveSearchDelivery = () => {
  const CITIES = useSelector(state => state.allCityList.cityData);


  return (
    <>
      <div>
        <form>
          <input />
        </form>
      </div>
    </>
  );
}

export default LiveSearchDelivery;
