import React, { useState, useEffect } from "react";

import Spinner from '../../components/Spinner/Spinner';
import PostsBoard from "../../components/PostsBoard/PostsBoard";

import { getAllPostsService } from '../../services/posts.service';
import { getAllCommentsService } from '../../services/comment.service';
import { getAllRepliesService } from "../../services/reply.service";

const PostsBoardContainer = ({ searchedPosts }) => {
  const [posts, setPosts] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [allReplies, setAllReplies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      getAllPostsData();
    }
  }, [isLoading]);

  const getAllPostsData = () => {
    getAllPostsService()
      .then(fetchedPosts => {
        setPosts(fetchedPosts);
      })
      .catch(error => {
        console.log(error);
      });
    
    getAllCommentsService()
      .then(fetchedComments => {
        setAllComments(fetchedComments);
      })
      .catch(error => {
        console.log(error);
      });
    
    getAllRepliesService()
      .then(fetchedReplies => {
        setAllReplies(fetchedReplies);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  };

  if (isLoading) {
    return (
      <Spinner />
    );
  } else {
    return (
      <PostsBoard 
        posts={posts}
        allComments={allComments}
        allReplies={allReplies}
        searchedPosts={searchedPosts}
      />
    );
  }
};

export default PostsBoardContainer;