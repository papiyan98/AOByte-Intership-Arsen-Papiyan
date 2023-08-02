import React, { useState, useContext } from "react";
import { cloneDeep } from "lodash";

import CustomSelect from "../CustomSelect/CustomSelect";
import CommentForm from "../CommentForm/CommentForm";
import Comment from "../Comment/Comment";

import { ThemeContext } from "../../context/Theme.context";

import { addCommentService, deleteCommentService, updateCommentRateService } from "../../services/comment.service";

import { selectOptions } from "../../constants";

import commentIcon from "../../assets/images/comment.png";

import './styles.scss';


const Post = ({ post, postComments, replies }) => {
  const [comments, setComments] = useState([...postComments].sort((a, b) => b.rate - a.rate));
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  const themeContext = useContext(ThemeContext);

  const addComment = (newComment) => {
    addCommentService(newComment, post._id)
      .then(updatedComments => {
        const filteredComments = updatedComments.filter(comment => comment.postId === post._id);
        
        const sortedComments = filteredComments.sort((a, b) => b.rate - a.rate);

        setComments(sortedComments);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteComment = (comment) => {
    deleteCommentService(comment)
      .then(updatedComments => {
        const filteredComments = updatedComments.filter(comment => comment.postId === post._id);

        const sortedComments = filteredComments.sort((a, b) => b.rate - a.rate);

        setComments(sortedComments);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const updateCommentRate = (commentId, newRate) => {
    updateCommentRateService(commentId, newRate)
      .then(updatedComments => {
        const filteredComments = updatedComments.filter(comment => comment.postId === post._id);
        
        const sortedComments = filteredComments.sort((a, b) => b.rate - a.rate);

        setComments(sortedComments);
      })
      .catch(error => {
        console.log(error);
      });
  }

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
  
  return (
    <div className={`post ${themeContext.isDarkTheme && 'dark-mode'}`}>
      <fieldset className="post-info">
        <legend className="post-title">{post.title}</legend>
        <p className="post-text">{post.description}</p>
      </fieldset>
      <div className="post-btns">
        <button className="comments-btn dark-btn" onClick={onCommentBtnClickHandler}>
          <img src={commentIcon} alt="Comment" />
          <span>{comments.length}</span>
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
          {comments.map((comment, index) => {
            const filtredReplies = replies.filter(reply => reply.commentId === comment._id);
            
            return (
              <Comment
                key={index}
                comment={comment}
                commentReplies={filtredReplies}
                postId={post._id}
                deleteComment={deleteComment}
                updateCommentRate={updateCommentRate}
              />
            )
          })}
          <CommentForm 
            postId={post._id}
            addComment={addComment}
          />
        </div>
      )}
    </div>
  )
}

export default Post;