import React, { useEffect, useState } from 'react';

import Spinner from '../Spinner/Spinner';
import PostsBoard from '../PostsBoard/PostsBoard';
import HeaderContainer from '../../containers/HeaderContainer/HeaderContainer';
import RatingListContainer from '../../containers/RatingListContainer/RatingListContainer';

import { getAllPostsService } from '../../services/posts.service';

import './styles.scss';

const Home = () => {
  const [pool, setPool] = useState([]);
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getAllPosts();
  }, []);

  const getAllPosts = () => {
    getAllPostsService()
      .then(posts => {
        setPool(posts);
        setIsLoading(false);
      });
  };

  const clearSearchedPosts = () => {
    setSearchedPosts([]);
  };

  const addSearchedPosts = (posts) => {
    setSearchedPosts(posts);
  };

  return (
    <div className='home-container'>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <HeaderContainer 
            pool={pool}
            addSearchedPosts={addSearchedPosts}
            clearSearchedPosts={clearSearchedPosts}
          />
          <div className="post-board-container">
            <PostsBoard 
              pool={pool}
              searchedPosts={searchedPosts}
            />
          </div>
          <RatingListContainer 
            pool={pool} 
          />
        </>
      )}
    </div>
  );
};

export default Home;