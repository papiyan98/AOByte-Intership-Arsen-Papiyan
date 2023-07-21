import React, { useState } from "react";

import Tooltip from "../Tooltip/Tooltip";

import './styles.scss';

const CommentReply = ({ reply, commentIndex, postId, deleteReply, updateCommentReplyRate }) => {
  const [isRated, setIsRated] = useState(false);

  const onTooltipHide = (newRate) => {
    setIsRated(true);

    updateCommentReplyRate(postId, commentIndex, reply, +newRate);
  }

  const onDeleteBtnClickHandler = () => {
    deleteReply(reply, commentIndex, postId);
  }

  return (
    <div className="replied-comment">
      <div className="commentor-avatar">
        <img src="./images/user-icon.png" alt="User" />
      </div>
      <div className="comament-data">
        <span className="commentor-name">{reply.commentor}</span>
        <span className="reply-box">
          <span className="reply-text">{reply.text}</span>
          <span className="reply-rate">
            <img src="./images/star-icon.png" alt="Comment Rate" />
            <span>{reply.rate}</span>
          </span>
        </span>
        <div className="reply-btns">
          <Tooltip onTooltipHide={onTooltipHide} replyTooltip={true} >
            <button className="reply-rate-btn">
              <img src={isRated ? './images/star-icon.png' : './images/rate-icon.png'} alt="Like" />
              <span>{isRated ? 'Rated' : 'Rate'}</span>
            </button>
          </Tooltip>
          {reply.isDeletable && (
            <button className="delete-btn" onClick={onDeleteBtnClickHandler}>
              <img src="./images/delete-icon-outfilled.png" alt="Delete" />
              <span>Delete</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommentReply;