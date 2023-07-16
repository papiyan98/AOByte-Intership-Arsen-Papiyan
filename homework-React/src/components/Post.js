import React from "react";
import Comment from "./Comment";

class Post extends React.Component {
  onKeyDownhandler = (event) => {
    if (event.key === 'Enter') {
      if (!event.target.value) return;

      this.props.addComment({ text: event.target.value, rate: 0 }, this.props.post.id);

      event.target.value = "";
    }
  }

  onAddBtnClick = () => {
    const textInput = document.querySelector('.text-input');

    if (!textInput.value) return;

    this.props.addComment({ text: textInput.value, rate: null }, this.props.post.id);

    textInput.value = "";
  }

  render() {
    return (
      <div className="post">
        <span className="post-title">{this.props.post.title}</span>
        <p className="post-text">{this.props.post.description}</p>

        <div className="comments">
          {this.props.post.comments.map(comment => (
            <Comment
              key={this.props.post.comments.indexOf(comment)}
              comment={comment}
              commentIndex={this.props.post.comments.indexOf(comment)}
              postId={this.props.post.id}
              updateCommentRate={this.props.updateCommentRate}
            />
          ))}
          <div className="addComment-form">
            <input className="text-input" type="search" placeholder="Your comment..." onKeyDown={(event) => this.onKeyDownhandler(event)} />
            <button className="send-btn" onClick={() => this.onAddBtnClick()}><img src="./send-icon.png" alt="Send" /></button>
          </div>
        </div>
      </div>
    )
  }
}

export default Post;
