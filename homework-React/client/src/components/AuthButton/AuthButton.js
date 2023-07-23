import React from "react";
import { useNavigate } from 'react-router-dom';

import Button from "../Button/Button";

import './styles.scss';

const AuthButton = () => {
  const navigate = useNavigate();

  const onSignInClickHandler = () => {
    navigate("/login");
  }

  return (
    <div className="auth-btns-container">
      <Button 
        text={"Sign In"}
        classname={"sign-in"}
        imgSrc={"./images/login-icon.png"}
        onClickHandler={onSignInClickHandler}
      />
    </div>
  )
}

export default AuthButton;