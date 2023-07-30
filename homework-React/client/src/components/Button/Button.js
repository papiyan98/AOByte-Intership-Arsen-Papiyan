import React from "react";

import './styles.scss';

const Button = ({ text, classname, imgSrc, handleClick }) => {
  return (
    <button className={`${classname} btn`} onClick={handleClick}>
      <img src={imgSrc} alt="" />
      <span>{text}</span>
    </button>
  );
};

export default Button;