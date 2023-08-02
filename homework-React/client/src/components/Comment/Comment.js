import React, { useState } from "react";
import Cookies from "js-cookie";

import CommentReply from "../CommentReply/CommentReply";
import CommentForm from "../CommentForm/CommentForm";
import Tooltip from "../Tooltip/Tooltip";
import RateTooltip from "../RateTooltip/RateTooltip";

import { addReplyService, deleteReplyService, updateReplyRateService } from "../../services/reply.service";

import userIcon from "../../assets/images/user.png";
import starIcon from "../../assets/images/star.png";
import rateIcon from "../../assets/images/rate.png";
import replyIcon from "../../assets/images/reply.png";
import deleteIcon from "../../assets/images/delete-outfilled.png";

import './styles.scss';

const Comment = ({ comment, commentReplies, postId, deleteComment, updateCommentRate }) => {
  const [replies, setReplies] = useState([...commentReplies].sort((a, b) => b.rate - a.rate));
  const [showReplies, setShowReplies] = useState(false);

  const addReply = (newReply) => {
    addReplyService(newReply, comment._id)
      .then(updatedReplies => {
        const filteredReplies = updatedReplies.filter(reply => reply.commentId === comment._id);

        const sortedReplies = filteredReplies.sort((a, b) => b.rate - a.rate);

        setReplies(sortedReplies);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteReply = (reply) => {
    deleteReplyService(reply)
      .then(updatedReplies => {
        const filteredReplies = updatedReplies.filter(reply => reply.commentId === comment._id);

        const sortedReplies = filteredReplies.sort((a, b) => b.rate - a.rate);
        
        setReplies(sortedReplies);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const updateReplyRate = (replyId, newRate) => {
    updateReplyRateService(replyId, newRate)
      .then(updatedReplies => {
        const filteredReplies = updatedReplies.filter(reply => reply.commentId === comment._id);

        const sortedReplies = filteredReplies.sort((a, b) => b.rate - a.rate);
        
        setReplies(sortedReplies);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onTooltipHide = (newRate) => {
    if (isNaN(newRate)) {
      return;
    }

    updateCommentRate(comment._id, +newRate);
  };

  const onReplyBtnClickHandler = () => {
    setShowReplies(!showReplies);
  };

  const onDeleteBtnClickHandler = () => {
    deleteComment(comment);
  };
  
  return (
    <div className="comment">
      <div className="comment-info">
        <div className="commentor-avatar">
          <img src={userIcon} alt="User" />
        </div>
        <div className="comament-data">
          <span className="commentor-name">{comment.commentor.name}</span>
          <span className="comment-box">
            <span className="comment-text">{comment.text}</span>
            <span className="comment-rate">
              <img src={starIcon} alt="Comment Rate" />
              <span>{+comment.rate.toFixed(1)}</span>
            </span>
          </span>
          <div className="comment-btns">
            <Tooltip onTooltipHide={onTooltipHide} tooltipBody={<RateTooltip />}>
              <button className="rate-btn dark-btn btn-text-color">
                <img src={rateIcon} alt="Like" />
                <span>Rate</span>
              </button>
            </Tooltip>
            <button className="reply-btn dark-btn btn-text-color" onClick={onReplyBtnClickHandler}>
              <img src={replyIcon} alt="Reply" />
              <span>Reply</span>
            </button>
            {comment.commentor.email === Cookies.get('email') && (
              <button className="delete-btn dark-btn btn-text-color" onClick={onDeleteBtnClickHandler}>
                <img src={deleteIcon} alt="Delete" />
                <span>Delete</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {showReplies && (
        <div className="replied-comments">
          {replies.map((reply, index) => (
            <CommentReply
              key={index} 
              reply={reply} 
              deleteReply={deleteReply}
              updateReplyRate={updateReplyRate}
            />
          ))}
          <CommentForm 
            small={true}
            addReply={addReply}
          />
        </div>
      )}
    </div>
  );
};

export default Comment;