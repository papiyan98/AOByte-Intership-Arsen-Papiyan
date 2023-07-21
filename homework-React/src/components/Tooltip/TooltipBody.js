import React from "react";

const TooltipBody = () => {
  const onRateClickHandler = (event) => {
    const rateImages = event.target.parentElement.children;

    const ratedStarIndex = Array.from(rateImages).indexOf(event.target);

    for (let i = 0; i < rateImages.length; i++) {
      if (i <= ratedStarIndex) {
        rateImages[i].setAttribute("src", "./images/star-icon.png")
      } else {
        rateImages[i].setAttribute("src", "./images/rate-icon.png")
      }
    }

    event.target.parentElement.setAttribute('data-rate', ratedStarIndex + 1)
  }

  return (
    <>
      <img className="rate-count" src="./images/rate-icon.png" alt="Rate" onClick={onRateClickHandler} />
      <img className="rate-count" src="./images/rate-icon.png" alt="Rate" onClick={onRateClickHandler} />
      <img className="rate-count" src="./images/rate-icon.png" alt="Rate" onClick={onRateClickHandler} />
      <img className="rate-count" src="./images/rate-icon.png" alt="Rate" onClick={onRateClickHandler} />
      <img className="rate-count" src="./images/rate-icon.png" alt="Rate" onClick={onRateClickHandler} />
    </>
  )
}

export default TooltipBody;