import React, { Component } from 'react';

import HeaderContainer from './containers/HeaderContainer/HeaderContainer';
import PostsBoardContainer from './containers/PostsBoardContainer/PostsBoardContainer';
import RatingListContainer from './containers/RatingListContainer/RatingListContainer';

import { disableAllButtons } from './helpers';

import './App.scss';

class PostApp extends Component {
  constructor(props) {
    super(props);

    this.defaultPool = this.props.pool;
    
    this.state = {
      isReseted: false,
      searchedPosts: [],
      pool: structuredClone(this.props.pool)
    };
  }

  clearSearchedPosts = () => {
    this.setState({
      ...this.state,
      searchedPosts: []
    });
  }

  filterSearchedPosts = (post) => {
    this.setState({
      ...this.state,
      searchedPosts: [...this.state.searchedPosts, post]
    });
  }

  updatePool = (newPool) => {
    this.setState({
      ...this.state,
      pool: newPool
    })
  }

  resetApp = () => {
    this.setState({
      isReseted: true,
      searchedPosts: [],
      pool: structuredClone(this.props.pool)

    });

    disableAllButtons();

    this.clearSearchedPosts();
  }

  render() {
    return (
      <div className='app-container'>
        <HeaderContainer 
          pool={this.state.pool}
          searchedPosts={this.state.searchedPosts}
          resetApp={this.resetApp}
          clearSearchedPosts={this.clearSearchedPosts}
          filterSearchedPosts={this.filterSearchedPosts}
        />
        <PostsBoardContainer 
          pool={this.state.pool}
          isReseted={this.state.isReseted}
          searchedPosts={this.state.searchedPosts}
          updatePool={this.updatePool}
        />
        <RatingListContainer 
          pool={this.state.pool} 
        />
      </div>
    )
  }
}

export default PostApp;
