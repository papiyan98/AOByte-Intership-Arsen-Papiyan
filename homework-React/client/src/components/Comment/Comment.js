import React, { useState } from "react";

import CommentReply from "../CommentReply/CommentReply";
import CommentForm from "../CommentForm/CommentForm";
import Tooltip from "../Tooltip/Tooltip";

import './styles.scss';

const Comment = ({ comment, postId, deleteComment, addReply, deleteReply, updateCommentRate, updateCommentReplyRate }) => {
  const [showReplies, setShowReplies] = useState(false);

  const onTooltipHide = (newRate) => {
    if (isNaN(newRate)) {
      return;
    }

    updateCommentRate(postId, comment, +newRate);
  }

  const onReplyBtnClickHandler = () => {
    setShowReplies(!showReplies);
  }

  const onDeleteBtnClickHandler = () => {
    deleteComment(comment, postId);
  }

  return (
    <div className="comment">
      <div className="comment-info">
        <div className="commentor-avatar">
          <img src="./images/user-icon.png" alt="User" />
        </div>
        <div className="comament-data">
          <span className="commentor-name">{comment.commentor}</span>
          <span className="comment-box">
            <span className="comment-text">{comment.text}</span>
            <span className="comment-rate">
              <img src="./images/star-icon.png" alt="Comment Rate" />
              <span>{comment.rate}</span>
            </span>
          </span>
          <div className="comment-btns">
            <Tooltip onTooltipHide={onTooltipHide}>
              <button className="rate-btn">
                <img src={comment.isRated ? './images/star-icon.png' : './images/rate-icon.png'} alt="Like" />
                <span>{comment.isRated ? 'Rated' : 'Rate'}</span>
              </button>
            </Tooltip>
            <button className="reply-btn" onClick={onReplyBtnClickHandler}>
              <img src="./images/reply-icon.png" alt="Reply" />
              <span>Reply</span>
            </button>
            {comment.isDeletable && (
              <button className="delete-btn" onClick={onDeleteBtnClickHandler}>
                <img src="./images/delete-icon-outfilled.png" alt="Delete" />
                <span>Delete</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {showReplies && (
        <div className="replied-comments">
          {comment.replies.map(reply => (
            <CommentReply
              key={comment.replies.indexOf(reply)} 
              reply={reply} 
              comment={comment}
              postId={postId}
              deleteReply={deleteReply}
              updateCommentReplyRate={updateCommentReplyRate}
            />
          ))}
          <CommentForm 
            small={true}
            comment={comment}
            postId={postId}
            addReply={addReply}
          />
        </div>
      )}
    </div>
  )
}

export default Comment;