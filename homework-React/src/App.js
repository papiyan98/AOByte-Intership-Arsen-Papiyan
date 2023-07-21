import React, { useState } from 'react';

import HeaderContainer from './containers/HeaderContainer/HeaderContainer';
import PostsBoardContainer from './containers/PostsBoardContainer/PostsBoardContainer';
import RatingListContainer from './containers/RatingListContainer/RatingListContainer';

import { disableAllButtons } from './helpers';

import './App.scss';

const PostApp = ({ data }) => {
  const [isReseted, setIsReseted] = useState(false);
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [pool, setPool] = useState(structuredClone(data));

  const clearSearchedPosts = () => {
    setSearchedPosts([]);
  }

  const filterSearchedPosts = (post) => {
    setSearchedPosts([...searchedPosts, post]);
  }

  const updatePool = (newPool) => {
    setPool(newPool);
  }

  const resetApp = () => {
    setIsReseted(true);
    setSearchedPosts([]);
    setPool(structuredClone(data));

    disableAllButtons();

    clearSearchedPosts();
  }

  return (
    <div className='app-container'>
      <HeaderContainer 
        pool={pool}
        searchedPosts={searchedPosts}
        resetApp={resetApp}
        clearSearchedPosts={clearSearchedPosts}
        filterSearchedPosts={filterSearchedPosts}
      />
      <PostsBoardContainer 
        pool={pool}
        isReseted={isReseted}
        searchedPosts={searchedPosts}
        updatePool={updatePool}
      />
      <RatingListContainer 
        pool={pool} 
      />
    </div>
  )
}

export default PostApp;
