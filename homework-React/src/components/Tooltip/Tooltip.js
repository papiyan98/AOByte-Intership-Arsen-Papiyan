import React, { Component } from "react";

import TooltipBody from "./TooltipBody";

import './styles.scss'

class Tooltip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showTooltip: false
    };
  }

  onClickHandler = () => {
    this.setState({
      showTooltip: true
    });
  }

  onPointerLeaveHandler = (event) => {
    this.props.onTooltipHide(event.target.dataset.rate);

    setTimeout(() => {
      this.setState({
        showTooltip: false
      });
    }, 300);
  }

  render() {
    const { showTooltip } = this.state;
    const { children, replyTooltip } = this.props;

    return (
      <div className="tooltip-container">
        <div className="tooltip-trigger" onClick={() => this.onClickHandler()}>
          {children}
        </div>
        {showTooltip && (
          <div className={!replyTooltip ? "tooltip" : "tooltip shifted"} onPointerLeave={(event) => this.onPointerLeaveHandler(event)} data-rate>
            <TooltipBody />
          </div>
        )}
      </div>
    )
  }
}

export default Tooltip;