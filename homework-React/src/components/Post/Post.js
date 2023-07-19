import React, { Component } from "react";

import CustomSelect from "../CustomSelect/CustomSelect";
import CommentForm from "../CommentForm/CommentForm";
import Comment from "../Comment/Comment";

import { selectOptions } from "../../constants";

import './styles.scss';

class Post extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      comments: [...this.props.post.comments].sort((a, b) => b.rate - a.rate),
      isCommentsVisible: false
    };
  }

  onCommentBtnClickHandler = () => {
    this.setState({
      isCommentsVisible: !this.state.isCommentsVisible
    });
  }

  onSelectChangeHandler = (selectedOption) => {
    const sortedComments = [...this.state.comments];
    const order = selectedOption.value;
    
    switch (order) {
      case "oldest":
        sortedComments.sort((a, b) => a.date - b.date);

        this.setState({
          comments: sortedComments
        });

        break;
      case "newest":
        sortedComments.sort((a, b) => b.date - a.date);

        this.setState({
          comments: sortedComments
        });

        break;
      default:
        sortedComments.sort((a, b) => b.rate - a.rate);

        this.setState({
          comments: sortedComments
        });

        break;
    }
  }

  addCommentTrigger = (comment, postId) => {
    const { post, addComment } = this.props;

    addComment(comment, postId);

    this.setState({
      comments: [...post.comments].sort((a, b) => b.rate - a.rate)
    });
  }

  deleteCommentTrigger = (comment, postId) => {
    const { post, deleteComment } = this.props;

    deleteComment(comment, postId);

    this.setState({
      comments: [...post.comments].sort((a, b) => b.rate - a.rate)
    });
  }

  render() {
    const { post, updateCommentRate, addReply, deleteReply, updateCommentReplyRate } = this.props;
    const { comments, isCommentsVisible } = this.state;

    return (
      <div className="post">
        <fieldset className="post-info">
          <legend className="post-title">{post.title}</legend>
          <p className="post-text">{post.description}</p>
        </fieldset>
        <div className="post-btns">
          <button className="comments-btn" onClick={() => this.onCommentBtnClickHandler()}>
            <img src="./comment-icon.png" alt="Comment" />
            <span>{post.comments.length}</span>
          </button>
          {isCommentsVisible && (
            <CustomSelect 
              options={selectOptions}
              defaultValue={selectOptions[0]}
              onChange={this.onSelectChangeHandler}
            />
          )}
        </div>
        {isCommentsVisible && (
          <div className="comments">
            {comments.map(comment => (
              <Comment
                key={post.comments.indexOf(comment)}
                comment={comment}
                commentIndex={post.comments.indexOf(comment)}
                postId={post.id}
                addReply={addReply}
                deleteReply={deleteReply}
                deleteComment={(comment, id) => this.deleteCommentTrigger(comment, id)}
                updateCommentRate={updateCommentRate}
                updateCommentReplyRate={updateCommentReplyRate}
              />
            ))}
            <CommentForm 
              post={post}
              addComment={(comment, id) => this.addCommentTrigger(comment, id)}
            />
          </div>
        )}
      </div>
    )
  }
}

export default Post;
