import React, { useEffect, useState } from 'react';

import HeaderContainer from './containers/HeaderContainer/HeaderContainer';
import PostsBoardContainer from './containers/PostsBoardContainer/PostsBoardContainer';
import RatingListContainer from './containers/RatingListContainer/RatingListContainer';

import { asyncData } from './helpers';

import './App.scss';

const App = () => {
  const [pool, setPool] = useState([]);
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [isReseted, setIsReseted] = useState(false);

  useEffect(() => {
    const dataPromise = asyncData();
    
    dataPromise.then(({ postsData }) => {
      setPool(postsData);
    })
  }, [isReseted]);

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
    setSearchedPosts([]);
    setIsReseted(!isReseted);

    // disableAllButtons();
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

export default App;
