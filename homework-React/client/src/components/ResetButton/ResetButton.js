import React from "react";

import Button from "../Button/Button";

import './styles.scss'

const ResetButton = ({ resetApp }) => {
  const onClickHandler = () => {
    // do something...
    resetApp();
  }

  return (
    <div className="reset-btn-container">
      <Button 
        text={"Reset"}
        classname={"reset"}
        imgSrc={"./images/reset-icon.png"}
        onClickHandler={onClickHandler}
      />
    </div>
  )
}

export default ResetButton;