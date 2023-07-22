import React, { useEffect, useState } from "react";
import { cloneDeep } from "lodash";

import CustomSelect from "../CustomSelect/CustomSelect";
import CommentForm from "../CommentForm/CommentForm";
import Comment from "../Comment/Comment";

import { selectOptions } from "../../constants";

import './styles.scss';

const Post = ({ post, addComment, deleteComment, updateCommentRate, addReply, deleteReply, updateCommentReplyRate }) => {
  const [comments, setComments] = useState([]);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  useEffect(() => {
    const sortedComments = cloneDeep(post.comments).sort((a, b) => b.rate - a.rate);
    
    setComments(sortedComments);
  }, [post.comments]);

  const onCommentBtnClickHandler = () => {
    setIsCommentsVisible(!isCommentsVisible);
  }

  const onSelectChangeHandler = (selectedOption) => {
    const sortedComments = cloneDeep(post.comments);
    const order = selectedOption.value;
    
    switch (order) {
      case "oldest":
        sortedComments.sort((a, b) => a.date - b.date);
        break;
      case "newest":
        sortedComments.sort((a, b) => b.date - a.date);
        break;
      default:
        sortedComments.sort((a, b) => b.rate - a.rate);
        break;
    }

    setComments(sortedComments);
  }

  const addCommentTrigger = (comment, postId) => {
    addComment(comment, postId);

    setComments(cloneDeep(post.comments).sort((a, b) => b.rate - a.rate));
  }

  const deleteCommentTrigger = (comment, postId) => {
    deleteComment(comment, postId);

    setComments(cloneDeep(post.comments).sort((a, b) => b.rate - a.rate));
  }

  return (
    <div className="post">
      <fieldset className="post-info">
        <legend className="post-title">{post.title}</legend>
        <p className="post-text">{post.description}</p>
      </fieldset>
      <div className="post-btns">
        <button className="comments-btn" onClick={onCommentBtnClickHandler}>
          <img src="./images/comment-icon.png" alt="Comment" />
          <span>{post.comments.length}</span>
        </button>
        {isCommentsVisible && (
          <CustomSelect 
            options={selectOptions}
            defaultValue={selectOptions[0]}
            onChange={onSelectChangeHandler}
          />
        )}
      </div>
      {isCommentsVisible && (
        <div className="comments">
          {comments.map((comment, index) => (
            <Comment
              key={index}
              comment={comment}
              postId={post.id}
              addReply={addReply}
              deleteReply={deleteReply}
              deleteComment={(comment, id) => deleteCommentTrigger(comment, id)}
              updateCommentRate={updateCommentRate}
              updateCommentReplyRate={updateCommentReplyRate}
            />
          ))}
          <CommentForm 
            post={post}
            addComment={(comment, id) => addCommentTrigger(comment, id)}
          />
        </div>
      )}
    </div>
  )
}

export default Post;