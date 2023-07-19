import React, { Component } from "react";

import PostsBoard from "../../components/PostsBoard/PostsBoard";

import './styles.scss';

class PostsBoardContainer extends Component {
  addComment = (comment, id) => {
    const newPool = [...this.props.pool];
    
    newPool.forEach(post => {
      if (post.id === id) {
        post.comments.push(comment);
      }
    });

    this.props.updatePool(newPool);
  }

  addReply = (reply, comment, postId) => {
    const newPool = [...this.props.pool];

    newPool.forEach(post => {
      if (post.id === postId) {
        const index = post.comments.indexOf(comment);
        
        post.comments[index].replies.push(reply);
      }
    });

    this.props.updatePool(newPool);
  }

  deleteComment = (comment, postId) => {
    const { pool, updatePool } = this.props;

    const newPool = [...pool];

    newPool.forEach(post => {
      if (post.id === postId) {
        const index = post.comments.indexOf(comment);

        post.comments.splice(index, 1);
      }
    });

    updatePool(newPool);
  }

  deleteReply = (selectedReply, commentIndex, postId) => {
    const { pool, updatePool } = this.props;

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

  updateCommentRate = (postId, ratedComment, newRate) => {
    const { pool, updatePool } = this.props;

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

  updateCommentReplyRate = (postId, commentIndex, ratedReply, newRate) => {
    const { pool, updatePool } = this.props;

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

  render() {
    const { pool, isReseted, searchedPosts } = this.props;

    return (
      <div className="post-board-container">
        <PostsBoard 
          pool={pool}
          isReseted={isReseted}
          searchedPosts={searchedPosts}
          addComment={this.addComment}
          addReply={this.addReply}
          deleteReply={this.deleteReply}
          deleteComment={this.deleteComment}
          updateCommentRate={this.updateCommentRate}
          updateCommentReplyRate={this.updateCommentReplyRate}
        />
      </div>
    )
  }
}

export default PostsBoardContainer;