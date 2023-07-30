import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "../Button/Button";

import homeIcon from "../../assets/images/home.png";
import loginIcon from "../../assets/images/login.png";

import './styles.scss';

const NotFound = () => {
  const navigate = useNavigate();

  const onHomeBtnClickHandler = () => {
    navigate("/");
  };

  const onAuthBtnClickHandler = () => {
    navigate("/login");
  };

  return (
    <div className="not-found-container">
      <div className="not-found-header">
        <Button 
          text={"Home"} 
          classname={"home-btn"} 
          imgSrc={homeIcon} 
          onClickHandler={onHomeBtnClickHandler}
        />
        <Button 
          text={"Login"} 
          classname={"auth-btn"} 
          imgSrc={loginIcon} 
          onClickHandler={onAuthBtnClickHandler}
        />
      </div>
      <h2 className="not-found-title">404 - Not Found</h2>
      <p className="not-found-message">The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;