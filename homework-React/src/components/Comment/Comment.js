import React, { Component } from "react";

import CommentReply from "../CommentReply/CommentReply";
import CommentForm from "../CommentForm/CommentForm";
import Tooltip from "../Tooltip/Tooltip";

import './styles.scss';

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRated: false,
      isReplied: false,
      showReplies: false
    }
  }

  onTooltipHide = (newRate) => {
    const { postId, comment, updateCommentRate } = this.props;

    if (isNaN(newRate)) {
      return;
    }

    updateCommentRate(postId, comment, +newRate);
    
    this.setState({
      isRated: true
    });
  }

  onCommentReply = (reply, comment, postId) => {
    const { addReply } = this.props;

    this.setState({
      isReplied: true
    });

    addReply(reply, comment, postId);
  }

  onReplyBtnClickHandler = () => {
    this.setState({
      showReplies: !this.state.showReplies
    });
  }

  onDeleteBtnClickHandler = () => {
    const { comment, postId, deleteComment } = this.props;
    // console.log(comment, postId, deleteComment);

    deleteComment(comment, postId);
  }

  render() {
    const { comment, commentIndex, postId, updateCommentReplyRate, deleteReply } = this.props;
    const { isRated, showReplies } = this.state;
    
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
              <Tooltip onTooltipHide={this.onTooltipHide}>
                <button className="rate-btn">
                  <img src={isRated ? './images/star-icon.png' : './images/rate-icon.png'} alt="Like" />
                  <span>{isRated ? 'Rated' : 'Rate'}</span>
                </button>
              </Tooltip>
              <button className="reply-btn" onClick={() => this.onReplyBtnClickHandler()}>
                <img src="./images/reply-icon.png" alt="Reply" />
                <span>Reply</span>
              </button>
              {comment.isDeletable && (
                <button className="delete-btn" onClick={() => this.onDeleteBtnClickHandler()}>
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
                commentIndex={commentIndex}
                postId={postId}
                deleteReply={deleteReply}
                updateCommentReplyRate={updateCommentReplyRate}
              />
            ))}
            <CommentForm 
              small={true}
              comment={comment}
              postId={postId}
              onCommentReply={this.onCommentReply}
            />
          </div>
        )}
      </div>
    )
  }
}

export default Comment;
