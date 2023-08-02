import React, { useState } from 'react';

import HeaderContainer from '../../containers/HeaderContainer/HeaderContainer';
import PostsBoardContainer from '../../containers/PostsBoardContainer/PostsBoardContainer';
import RatingListContainer from '../../containers/RatingListContainer/RatingListContainer';

import './styles.scss';

const Home = () => {
  const [searchedPosts, setSearchedPosts] = useState([]);

  const clearSearchedPosts = () => {
    setSearchedPosts([]);
  };

  const addSearchedPosts = (posts) => {
    setSearchedPosts(posts);
  };

  return (
    <div className='home-container'>
      <HeaderContainer 
        pool={[]}
        addSearchedPosts={addSearchedPosts}
        clearSearchedPosts={clearSearchedPosts}
      />
      <PostsBoardContainer 
        searchedPosts={searchedPosts}
      />
      <RatingListContainer 
        pool={[]} 
      />
    </div>
  );
};

export default Home;