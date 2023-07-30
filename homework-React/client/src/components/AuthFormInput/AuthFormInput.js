import React, { useState } from "react";

import errorIcon from "../../assets/images/error.png";

import './styles.scss';

const AuthFormInput = ({ type, name, placeholder, inputError }) => {
  const [isError, setIsError] = useState(true);

  const handleInput = (event) => {
    if (event.target.classList.contains("invalid")) {
      event.target.classList.remove("invalid");
      setIsError(false);
    }
  };

  return (
    <div className="wrapper">
      <input type={type} name={name} className={inputError ? 'invalid' : ''} placeholder={placeholder} onInput={handleInput} />
      <div className="icon">
        {(inputError && isError) && (
          <img src={errorIcon} alt="" />
        )}
      </div>
    </div>
  );
};

export default AuthFormInput;