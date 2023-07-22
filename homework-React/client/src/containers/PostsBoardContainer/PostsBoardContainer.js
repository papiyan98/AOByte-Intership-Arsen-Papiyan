import React from "react";
import { isEqual, cloneDeep } from "lodash";

import PostsBoard from "../../components/PostsBoard/PostsBoard";

import './styles.scss'; 

const PostsBoardContainer = ({ pool, updatePool, searchedPosts, isReseted }) => {
  const addComment = (comment, id) => {
    const newPool = cloneDeep(pool);
    
    newPool.forEach(post => {
      if (post.id === id) {
        post.comments.push(comment);
      }
    });

    updatePool(newPool);
  }

  const addReply = (reply, targetComment, postId) => {
    const newPool = cloneDeep(pool);

    newPool.forEach(post => {
      if (post.id === postId) {
        post.comments.forEach(comment => {
          if (isEqual(comment, targetComment)) {
            comment.replies.push(reply);
          }
        });
      }
    });

    updatePool(newPool);
  }

  const deleteComment = (comment, postId) => {
    const newPool = cloneDeep(pool);

    newPool.forEach(post => {
      if (post.id === postId) {
        const index = post.comments.indexOf(comment);

        post.comments.splice(index, 1);
      }
    });

    updatePool(newPool);
  }

  const deleteReply = (selectedReply, targetComment, postId) => {
    const newPool = cloneDeep(pool);
    
    newPool.forEach(post => {
      if (post.id === postId) {
        post.comments.forEach(comment => {
          if (isEqual(comment, targetComment)) {
            comment.replies.forEach((reply, index) => {
              if (isEqual(reply, selectedReply)) {
                comment.replies.splice(index, 1);
              }
            });
          }
        });
      }
    });

    updatePool(newPool);
  }

  const updateCommentRate = (postId, ratedComment, newRate) => {
    const newPool = cloneDeep(pool);

    newPool.forEach(post => {
      if (post.id === postId) {
        post.comments.forEach(comment => {
          if (isEqual(comment, ratedComment)) {
            if (comment.rate) {
              comment.rate = (comment.rate + newRate) / 2;
            } else {
              comment.rate = newRate;
            }

            comment.isRated = true;
          }
        });
      }
    });

    updatePool(newPool);
  }

  const updateCommentReplyRate = (postId, targetComment, ratedReply, newRate) => {
    const newPool = cloneDeep(pool);

    newPool.forEach(post => {
      if (post.id === postId) {
        post.comments.forEach(comment => {
          if (isEqual(comment, targetComment)) {
            comment.replies.forEach(reply => {
              if (isEqual(reply, ratedReply)) {
                reply.rate = reply.rate ? (reply.rate + newRate) / 2 : newRate;

                reply.isRated = true;
              }
            });
          }
        }); 
      }
    });

    updatePool(newPool);
  }

  return (
    <div className="post-board-container">
      <PostsBoard 
        pool={pool}
        isReseted={isReseted}
        searchedPosts={searchedPosts}
        addComment={addComment}
        addReply={addReply}
        deleteReply={deleteReply}
        deleteComment={deleteComment}
        updateCommentRate={updateCommentRate}
        updateCommentReplyRate={updateCommentReplyRate}
      />
    </div>
  )
}

export default PostsBoardContainer;