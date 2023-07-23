import React from "react";

import './styles.scss';

const Button = ({ text, classname, imgSrc, onClickHandler }) => {
  return (
    <button className={`${classname} btn`} onClick={onClickHandler}>
      <img src={imgSrc} alt="" />
      <span>{text}</span>
    </button>
  )
}

export default Button;