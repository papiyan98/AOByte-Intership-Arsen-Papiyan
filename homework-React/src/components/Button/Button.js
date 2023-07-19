import React, { Component } from "react";

import './styles.scss';

class Button extends Component {
  render() {
    const { text, classname, imgSrc, onClickHandler,  } = this.props;

    return (
      <button className={`${classname} btn`} onClick={() => onClickHandler()}>
        <img src={imgSrc} alt="" />
        <span>{text}</span>
      </button>
    )
  }
}

export default Button;