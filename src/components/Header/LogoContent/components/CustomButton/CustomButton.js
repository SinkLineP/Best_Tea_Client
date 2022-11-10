import React from 'react';
import "./styles/index.css";

const CustomButton = ({children}) => {
  return (
    <div>
      <button className={"btn-custom"}>
        {children}
      </button>
    </div>
  );
};

export default CustomButton;