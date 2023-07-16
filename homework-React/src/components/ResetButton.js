import React from "react";

class ResetButton extends React.Component {
  render() {
    return (
      <div className="resetBtn-box">
        <button className="reset-btn" onClick={() => this.props.resetApp()}><img src="./reset-icon.png" alt="Reset" /></button>
      </div>
    )
  }
}

export default ResetButton;