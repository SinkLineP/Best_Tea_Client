import React from 'react';
import {useParams} from "react-router-dom";
import CreateProductsTea from "../CreateProducts/CreateProductsTea";

const RouteMenuProducts = () => {
  const {category} = useParams();

  switch(category) {
    case 'tea':
      return <CreateProductsTea />
    default:
    break;
  }
};

export default RouteMenuProducts;