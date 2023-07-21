import React from "react";

import Button from "../Button/Button";

import './styles.scss';

const AuthButton = () => {
  return (
    <div className="auth-btn-container">
      <Button 
        text={"Login"}
        classname={"login"}
        imgSrc={"./images/login-icon.png"}
      />
    </div>
  )
}

export default AuthButton;