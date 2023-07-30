import React, { useState } from "react";
import Cookies from "js-cookie";

import Modal from "../Modal/Modal";

import { addCommentService } from "../../services/comment.service";

import sendIcon from "../../assets/images/send.png";

import './styles.scss';

const CommentForm = ({ postId, small, addReply, onAddCommentTrigger }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onFormSubmitHandler = (event) => {
    event.preventDefault();

    const textInput = event.target.textInput.value;
    
    if (!textInput) {
      return;
    }
    
    const user = {
      name: Cookies.get('name'),
      email: Cookies.get('email')
    };

    if (!user.email) {
      setIsModalOpen(true);
      return;
    }

    if (event.target.className.includes("Reply")) {
      const reply = { commentor: user, text: textInput, rate: 0, replies: [], date: new Date(), isRated: false, isDeletable: true };
      
      addReply(reply, postId);
    } else {
      const comment = { commentor: user, text: textInput, rate: 0, replies: [], date: new Date(), isRated: false, isDeletable: false };
      
      addCommentService(comment, postId)
        .then(() => {
          onAddCommentTrigger();
        });
    }

    event.target.reset();
  };

  const onModalCloseHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <form className={!small ? "addComment-form" : "addReply-form"} onSubmit={onFormSubmitHandler}>
        <input className="text-input" type="text" name="textInput" placeholder="Your comment..." autoComplete="off" />
        <button className="send-btn" type="submit">
          <img src={sendIcon} alt="Send" />
        </button>
      </form>
      <Modal isOpen={isModalOpen} onClose={onModalCloseHandler}>
        <div className="modal-content">
          <h2>User not found</h2>
          <p>Please login to add comment</p>
          <button onClick={onModalCloseHandler}>Close</button>
        </div>
      </Modal>
    </>
  );
};

export default CommentForm;