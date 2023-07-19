import React, { Component } from "react";

import './styles.scss';

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isReply: false
    };
  }

  onFormSubmitHandler = (event) => {
    event.preventDefault();

    const textInput = event.target.textInput.value;

    if (!textInput) {
      return;
    }
    
    if (event.target.className.includes("Reply")) {
      const reply = { commentor: "Guest", text: textInput, rate: 0, replies: [], date: Date.now(), isDeletable: true };

      this.props.onCommentReply(reply, this.props.comment, this.props.postId);
    } else {
      const comment = { commentor: "Guest", text: textInput, rate: 0, replies: [], date: Date.now(), isDeletable: true };
      
      this.props.addComment(comment, this.props.post.id);
    }

    event.target.reset();
  }

  render() {
    const { small } = this.props;

    return (
      <form className={!small ? "addComment-form" : "addReply-form"} onSubmit={(event) => this.onFormSubmitHandler(event)}>
        <input className="text-input" type="text" name="textInput" placeholder="Your comment..." autoComplete="off" />
        <button className="send-btn" type="submit"><img src="./send-icon.png" alt="Send" /></button>
      </form>
    )
  }
}

export default CommentForm;