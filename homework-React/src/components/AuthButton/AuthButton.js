import React, { Component } from "react";

import Button from "../Button/Button";

import './styles.scss';

class AuthButton extends Component {
  onClickHandler = () => {}

  render() {
    return (
      <div className="auth-btn-container">
        <Button 
          text={"Login"}
          classname={"login"}
          imgSrc={"./images/login-icon.png"}
          onClickHandler={this.onClickHandler}
        />
      </div>
    )
  }
}

export default AuthButton;