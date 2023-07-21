import React from "react";

import PostsBoard from "../../components/PostsBoard/PostsBoard";

import './styles.scss';

const PostsBoardContainer = ({ pool, updatePool, searchedPosts, isReseted }) => {
  const addComment = (comment, id) => {
    const newPool = [...pool];
    
    newPool.forEach(post => {
      if (post.id === id) {
        post.comments.push(comment);
      }
    });

    updatePool(newPool);
  }

  const addReply = (reply, comment, postId) => {
    const newPool = [...pool];

    newPool.forEach(post => {
      if (post.id === postId) {
        const index = post.comments.indexOf(comment);
        
        post.comments[index].replies.push(reply);
      }
    });

    updatePool(newPool);
  }

  const deleteComment = (comment, postId) => {
    const newPool = [...pool];

    newPool.forEach(post => {
      if (post.id === postId) {
        const index = post.comments.indexOf(comment);

        post.comments.splice(index, 1);
      }
    });

    updatePool(newPool);
  }

  const deleteReply = (selectedReply, commentIndex, postId) => {
    const newPool = [...pool];
    
    newPool.forEach(post => {
      if (post.id === postId) {
        post.comments[commentIndex].replies.forEach((reply, index) => {
          if (JSON.stringify(reply) === JSON.stringify(selectedReply)) {
            post.comments[commentIndex].replies.splice(index, 1);
          }
        });
      }
    });

    updatePool(newPool);
  }

  const updateCommentRate = (postId, ratedComment, newRate) => {
    const newPool = [...pool];

    newPool.forEach(post => {
      if (post.id === postId) {
        post.comments.forEach(comment => {
          if (JSON.stringify(comment) === JSON.stringify(ratedComment)) {
            if (comment.rate) {
              comment.rate = (comment.rate + newRate) / 2;
            } else {
              comment.rate = newRate;
            }
          }
        });
      }
    });

    updatePool(newPool);
  }

  const updateCommentReplyRate = (postId, commentIndex, ratedReply, newRate) => {
    const newPool = [...pool];
    
    newPool.forEach(post => {
      if (post.id === postId) {
        post.comments[commentIndex].replies.forEach(reply => {
          if (JSON.stringify(reply) === JSON.stringify(ratedReply)) {
            if (reply.rate) {
              reply.rate = (reply.rate + newRate) / 2;
            } else {
              reply.rate = newRate;
            }
          }
        })
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