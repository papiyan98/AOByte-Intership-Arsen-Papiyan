import React, { Component } from "react";

import Tooltip from "../Tooltip/Tooltip";

import './styles.scss';

class CommentReply extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRated: false
    };
  }

  onTooltipHide = (newRate) => {
    const { postId, commentIndex, reply, updateCommentReplyRate } = this.props;

    this.setState({
      isRated: true
    });

    updateCommentReplyRate(postId, commentIndex, reply, +newRate);
  }

  onDeleteBtnClickHandler = () => {
    const { reply, commentIndex, postId, deleteReply } = this.props;

    deleteReply(reply, commentIndex, postId);
  }

  render() {
    const { isRated } = this.state;
    const { reply } = this.props;
    
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
            <Tooltip onTooltipHide={this.onTooltipHide} replyTooltip={true} >
              <button className="reply-rate-btn">
                <img src={isRated ? './images/star-icon.png' : './images/rate-icon.png'} alt="Like" />
                <span>{isRated ? 'Rated' : 'Rate'}</span>
              </button>
            </Tooltip>
            {reply.isDeletable && (
              <button className="delete-btn" onClick={() => this.onDeleteBtnClickHandler()}>
                <img src="./images/delete-icon-outfilled.png" alt="Delete" />
                <span>Delete</span>
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default CommentReply;