import React from "react";

import rateIcon from "../../assets/images/rate.png";
import starIcon from "../../assets/images/star.png";

const RateTooltip = () => {
  const onRateClickHandler = (event) => {
    const rateImages = event.target.parentElement.children;

    const ratedStarIndex = Array.from(rateImages).indexOf(event.target);

    for (let i = 0; i < rateImages.length; i++) {
      if (i <= ratedStarIndex) {
        rateImages[i].setAttribute("src", starIcon)
      } else {
        rateImages[i].setAttribute("src", rateIcon)
      }
    }

    event.target.parentElement.setAttribute('data-rate', ratedStarIndex + 1)
  };

  return (
    <>
      <img className="rate-count" src={rateIcon} alt="Rate" onClick={onRateClickHandler} />
      <img className="rate-count" src={rateIcon} alt="Rate" onClick={onRateClickHandler} />
      <img className="rate-count" src={rateIcon} alt="Rate" onClick={onRateClickHandler} />
      <img className="rate-count" src={rateIcon} alt="Rate" onClick={onRateClickHandler} />
      <img className="rate-count" src={rateIcon} alt="Rate" onClick={onRateClickHandler} />
    </>
  );
};

export default RateTooltip;