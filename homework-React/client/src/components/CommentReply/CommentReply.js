import React from "react";
import Cookies from "js-cookie";

import Tooltip from "../Tooltip/Tooltip";
import RateTooltip from "../RateTooltip/RateTooltip";

import userIcon from "../../assets/images/user.png";
import starIcon from "../../assets/images/star.png";
import rateIcon from "../../assets/images/rate.png";
import deleteIcon from "../../assets/images/delete-outfilled.png"

import './styles.scss';

const CommentReply = ({ reply, deleteReply, updateReplyRate }) => {
  const onTooltipHide = (newRate) => {
    updateReplyRate(reply._id, +newRate);
  };

  const onDeleteBtnClickHandler = () => {
    deleteReply(reply);
  };

  return (
    <div className="replied-comment">
      <div className="commentor-avatar">
        <img src={userIcon} alt="User" />
      </div>
      <div className="comament-data">
        <span className="commentor-name">{reply.commentor.name}</span>
        <span className="reply-box">
          <span className="reply-text">{reply.text}</span>
          <span className="reply-rate">
            <img src={starIcon} alt="Comment Rate" />
            <span>{reply.rate}</span>
          </span>
        </span>
        <div className="reply-btns">
          <Tooltip onTooltipHide={onTooltipHide} tooltipBody={<RateTooltip />} replyTooltip={true} >
            <button className="reply-rate-btn dark-btn btn-text-color">
              <img src={rateIcon} alt="Like" />
              <span>Rate</span>
            </button>
          </Tooltip>
          {reply.commentor.email === Cookies.get('email') && (
            <button className="delete-btn dark-btn btn-text-color" onClick={onDeleteBtnClickHandler}>
              <img src={deleteIcon} alt="Delete" />
              <span>Delete</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentReply;