import React from 'react';
import {Alert} from "react-bootstrap";

const AlertShow = ({variant, message}) => {
  return (
    <Alert key={variant} variant={variant}>
      {message}
    </Alert>
  );
};

export default AlertShow;