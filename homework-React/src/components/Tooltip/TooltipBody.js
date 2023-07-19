import React, { Component } from "react";

class TooltipBody extends Component {
  onRateClickHandler = (event) => {
    const rateImages = event.target.parentElement.children;

    const ratedStarIndex = Array.from(rateImages).indexOf(event.target);

    for (let i = 0; i < rateImages.length; i++) {
      if (i <= ratedStarIndex) {
        rateImages[i].setAttribute("src", "./star-icon.png")
      } else {
        rateImages[i].setAttribute("src", "./rate-icon.png")
      }
    }

    event.target.parentElement.setAttribute('data-rate', ratedStarIndex + 1)
  }

  render() {
    return (
      <>
        <img className="rate-count" src="./rate-icon.png" alt="Rate" onClick={(event) => this.onRateClickHandler(event)} />
        <img className="rate-count" src="./rate-icon.png" alt="Rate" onClick={(event) => this.onRateClickHandler(event)} />
        <img className="rate-count" src="./rate-icon.png" alt="Rate" onClick={(event) => this.onRateClickHandler(event)} />
        <img className="rate-count" src="./rate-icon.png" alt="Rate" onClick={(event) => this.onRateClickHandler(event)} />
        <img className="rate-count" src="./rate-icon.png" alt="Rate" onClick={(event) => this.onRateClickHandler(event)} />
      </>
    )
  }
}

export default TooltipBody;