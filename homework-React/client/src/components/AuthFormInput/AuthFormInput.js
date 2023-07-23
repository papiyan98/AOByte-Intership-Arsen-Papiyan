import React from "react";

import './styles.scss';

const AuthFormInput = ({ type, name, placeholder, inputError }) => {
  const onInputHandler = (event) => {
    if (event.target.classList.contains("invalid")) {
      event.target.classList.remove("invalid");
    }
  }

  return (
    <div className="wrapper">
      <input type={type} name={name} className={inputError ? 'invalid' : ''} placeholder={placeholder} onInput={onInputHandler} />
      <div className="icon">
        {inputError && (
          <img src="./images/error-icon.png" alt="" />
        )}
      </div>
    </div>
  )
}

export default AuthFormInput;