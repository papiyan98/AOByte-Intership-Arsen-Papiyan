import React, { Component } from "react";
import Post from "./Post";

class PostsBoard extends Component {
  render() {
    if (this.props.searchedPosts.length) {
      return (
        <div className="posts-board">
          {this.props.searchedPosts.map(post => (
            <Post 
              post={post} 
              key={post.id} 
              addComment={this.props.addComment}
              updateCommentRate={this.props.updateCommentRate}
            />
          ))}
        </div>
      )
    } else {
      return (
        <div className="posts-board">
          {this.props.pool.map(post => (
            <Post 
              post={post} 
              key={post.id} 
              addComment={this.props.addComment}
              updateCommentRate={this.props.updateCommentRate}
            />
          ))}
        </div>
      )
    }
  }
}

export default PostsBoard;