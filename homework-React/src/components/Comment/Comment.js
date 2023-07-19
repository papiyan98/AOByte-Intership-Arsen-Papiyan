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
    if (isNaN(newRate)) {
      return;
    }

    this.props.updateCommentRate(this.props.postId, this.props.comment, +newRate);
    
    this.setState({
      ...this.state,
      isRated: true
    });
  }

  onCommentReply = (reply, comment, postId) => {
    this.setState({
      ...this.state,
      isReplied: true
    });

    this.props.addReply(reply, comment, postId);
  }

  onReplyBtnClickHandler = () => {
    this.setState({
      ...this.state,
      showReplies: !this.state.showReplies
    });
  }

  onDeleteBtnClickHandler = () => {
    this.props.deleteComment(this.props.comment, this.props.postId);
  }

  render() {
    const { comment, commentIndex, postId, updateCommentReplyRate, deleteReply } = this.props;
    const { isRated, showReplies } = this.state;

    return (
      <div className="comment">
        <div className="comment-info">
          <div className="commentor-avatar">
            <img src="./user-icon.png" alt="User" />
          </div>
          <div className="comament-data">
            <span className="commentor-name">{comment.commentor}</span>
            <span className="comment-box">
              <span className="comment-text">{comment.text}</span>
              <span className="comment-rate">
                <img src="./star-icon.png" alt="Comment Rate" />
                <span>{comment.rate}</span>
              </span>
            </span>
            <div className="comment-btns">
              <Tooltip onTooltipHide={this.onTooltipHide}>
                <button className="rate-btn">
                  <img src={isRated ? './star-icon.png' : './rate-icon.png'} alt="Like" />
                  <span>{isRated ? 'Rated' : 'Rate'}</span>
                </button>
              </Tooltip>
              <button className="reply-btn" onClick={() => this.onReplyBtnClickHandler()}>
                <img src="./reply-icon.png" alt="Reply" />
                <span>Reply</span>
              </button>
              {comment.isDeletable && (
                <button className="delete-btn" onClick={() => this.onDeleteBtnClickHandler()}>
                  <img src="./delete-icon-outfilled.png" alt="Delete" />
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
