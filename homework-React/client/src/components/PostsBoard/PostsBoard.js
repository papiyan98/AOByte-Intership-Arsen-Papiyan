import React from "react";

import Pagination from "../Pagination/Pagintaion";
import Post from "../Post/Post";

import './styles.scss'

const PostsBoard = ({ pool, searchedPosts }) => {
  let postsList = searchedPosts.length ? searchedPosts : pool;
  
  postsList = postsList.map(post => (
    <Post 
      post={post} 
      key={post.id} 
    />
  ));
  
  return (
    <div className="posts-board">
      <Pagination 
        data={postsList}
        itemsPerPage={4}
      />
    </div>
  )
}

export default PostsBoard;