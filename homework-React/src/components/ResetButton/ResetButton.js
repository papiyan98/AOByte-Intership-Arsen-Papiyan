import React, { Component } from "react";

import Button from "../Button/Button";

import './styles.scss'

class ResetButton extends Component {
  onClickHandler = () => {
    this.props.resetApp();
  }

  render() {
    return (
      <div className="reset-btn-container">
        <Button 
          text={"Reset"}
          classname={"reset"}
          imgSrc={"./reset-icon.png"}
          onClickHandler={this.onClickHandler}
        />
      </div>
    )
  }
}

export default ResetButton;