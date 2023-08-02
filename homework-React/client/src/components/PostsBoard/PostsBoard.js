import React from "react";

import Pagination from "../Pagination/Pagintaion";
import Post from "../Post/Post";

import './styles.scss'

const PostsBoard = ({ posts, allComments, allReplies, searchedPosts }) => {
  let postsList = searchedPosts.length ? searchedPosts : posts;
  
  postsList = postsList.map(post => {
    const comments = allComments.filter(comment => comment.postId === post._id);

    const commentIds = comments.map(comment => comment._id);

    const replies = allReplies.filter(reply => commentIds.includes(reply.commentId));
    
    return (
      <Post
        key={post._id}
        post={post}
        postComments={comments} 
        replies={replies} 
      />
    )
  });
  
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