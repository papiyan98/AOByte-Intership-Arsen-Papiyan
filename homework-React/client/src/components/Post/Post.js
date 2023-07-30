import React, { useEffect, useState, useContext } from "react";
import { cloneDeep } from "lodash";

import CustomSelect from "../CustomSelect/CustomSelect";
import CommentForm from "../CommentForm/CommentForm";
import Comment from "../Comment/Comment";

import { ThemeContext } from "../../context/Theme.context";

import { getAllCommentsService, deleteCommentService, updateCommentRateService } from "../../services/comment.service";

import { selectOptions } from "../../constants";

import commentIcon from "../../assets/images/comment.png";

import './styles.scss';


const Post = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [isCommented, setIsCommented] = useState(false);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    getComments(post._id)
      .then(res => {
        setComments(res);
      })
  }, [isCommented]);

  const getComments = async (postId) => {
    const fetchedComments = await getAllCommentsService(postId);
    
    const sortedComments = fetchedComments.sort((a, b) => b.rate - a.rate);

    return sortedComments;
  };

  const addCommentTrigger = () => {
    setIsCommented(!isCommented);
  };

  const deleteComment = (comment, postId) => {
    deleteCommentService(comment, postId)
      .then(({ comments }) => {
        const sortedComments = comments.sort((a, b) => b.rate - a.rate);

        setComments(sortedComments);
      })
  }

  const updateCommentRate = (postId, ratedComment, newRate) => {
    updateCommentRateService(postId, ratedComment, newRate)
      .then(updatedComments => {
        const sortedComments = updatedComments.sort((a, b) => b.rate - a.rate);

        setComments(sortedComments);
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
          {comments.map((comment, index) => (
            <Comment
              key={index}
              comment={comment}
              postId={post._id}
              deleteComment={deleteComment}
              updateCommentRate={updateCommentRate}
            />
          ))}
          <CommentForm 
            postId={post._id}
            onAddCommentTrigger={addCommentTrigger}
          />
        </div>
      )}
    </div>
  )
}

export default Post;