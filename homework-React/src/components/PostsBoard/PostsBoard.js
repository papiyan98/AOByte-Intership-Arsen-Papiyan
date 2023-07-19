import React, { Component } from "react";

import Post from "../Post/Post";

import './styles.scss'

class PostsBoard extends Component {
  render() {
    const { pool, searchedPosts, addComment, addReply, deleteComment, deleteReply, isReseted, updateCommentRate, updateCommentReplyRate } = this.props;

    const postsList = searchedPosts.length ? searchedPosts : pool;
    
    return (
      <div className="posts-board">
        {postsList.map(post => (
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

export default PostsBoard;