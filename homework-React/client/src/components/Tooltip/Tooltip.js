import React, { useState } from "react";

import './styles.scss'

const Tooltip = ({ replyTooltip, children, onTooltipHide, tooltipBody }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const onClickHandler = () => {
    setShowTooltip(true);
  }

  const onPointerLeaveHandler = (event) => {
    onTooltipHide(event.target.dataset.rate);

    setTimeout(() => {
      setShowTooltip(false);
    }, 300);
  }

  return (
    <div className="tooltip-container">
      <div className="tooltip-trigger" onClick={onClickHandler}>
        {children}
      </div>
      {showTooltip && (
        <div className={!replyTooltip ? "tooltip" : "tooltip shifted"} onPointerLeave={onPointerLeaveHandler} data-rate>
          {tooltipBody}
        </div>
      )}
    </div>
  )
}

export default Tooltip;