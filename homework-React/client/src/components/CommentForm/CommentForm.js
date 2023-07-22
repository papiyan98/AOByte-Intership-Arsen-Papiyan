import React from "react";

import './styles.scss';

const CommentForm = ({ comment, post, postId, small, addComment, addReply }) => {
  const onFormSubmitHandler = (event) => {
    event.preventDefault();

    const textInput = event.target.textInput.value;
    
    if (!textInput) {
      return;
    }
    
    if (event.target.className.includes("Reply")) {
      const reply = { commentor: "Guest", text: textInput, rate: 0, replies: [], date: Date.now(), isDeletable: true };
      
      addReply(reply, comment, postId);
    } else {
      const comment = { commentor: "Guest", text: textInput, rate: 0, replies: [], date: Date.now(), isDeletable: true };
      
      addComment(comment, post.id);
    }

    event.target.reset();
  }

  return (
    <form className={!small ? "addComment-form" : "addReply-form"} onSubmit={onFormSubmitHandler}>
      <input className="text-input" type="text" name="textInput" placeholder="Your comment..." autoComplete="off" />
      <button className="send-btn" type="submit">
        <img src="./images/send-icon.png" alt="Send" />
      </button>
    </form>
  )
}

export default CommentForm;