import React from "react";
import { useNavigate } from 'react-router-dom';

import Button from "../Button/Button";

import loginIcon from "../../assets/images/login.png";

import './styles.scss';

const AuthButton = () => {
  const navigate = useNavigate();

  const handleAuthBtnClick = () => {
    navigate("/auth/login");
  };

  return (
    <div className="auth-btns-container">
      <Button 
        text={"Sign In"}
        classname={"sign-in"}
        imgSrc={loginIcon}
        handleClick={handleAuthBtnClick}
      />
    </div>
  );
};

export default AuthButton;