import React, { Component } from "react";

import Post from "../Post/Post";

import './styles.scss'

class PostsBoard extends Component {
  render() {
    const { pool, searchedPosts, addComment, addReply, deleteComment, deleteReply, isReseted, updateCommentRate, updateCommentReplyRate } = this.props;

    if (searchedPosts.length) {
      return (
        <div className="posts-board">
          {searchedPosts.map(post => (
            <Post 
              post={post} 
              key={post.id} 
              addComment={addComment}
              addReply={addReply}
              isReseted={isReseted}
              deleteReply={deleteReply}
              deleteComment={deleteComment}
              updateCommentRate={updateCommentRate}
              updateCommentReplyRate={updateCommentReplyRate}
            />
          ))}
        </div>
      )
    } else {
      return (
        <div className="posts-board">
          {pool.map(post => (
            <Post 
              post={post} 
              key={post.id} 
              addComment={addComment}
              addReply={addReply}
              isReseted={isReseted}
              deleteReply={deleteReply}
              deleteComment={deleteComment}
              updateCommentRate={updateCommentRate}
              updateCommentReplyRate={updateCommentReplyRate}
            />
          ))}
        </div>
      )
    }
  }
}

export default PostsBoard;