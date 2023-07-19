import React, { Component } from "react";

import RatingList from "../../components/RatingList/RatingList";

import { filterMaxAverageRatedPost, calcPostAverageRate } from "../../helpers/index";

import './styles.scss'

class RatingListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list_1: [],
      list_2: [],
      addedPosts: []
    };
  }

  addPost = (listName) => {
    const unaddedPosts = this.props.pool.filter(post => !this.state.addedPosts.includes(post));

    if (!unaddedPosts.length) {
      return;
    }

    const post = filterMaxAverageRatedPost(unaddedPosts);
    
    this.setState({
      ...this.state,
      addedPosts: [...this.state.addedPosts, post],
      [listName]: [...this.state[listName], post]
    });
  }

  deletePost = (selectedPost, listName) => {
    const newList = this.state[listName].filter(post => !(post === selectedPost));
    
    const newaddedPosts = this.state.addedPosts.filter(post => !(post === selectedPost));

    this.setState({
      ...this.state,
      'addedPosts': newaddedPosts,
      [listName]: newList
    });
  }

  sortList = (listName, asc) => {
    const newList = [...this.state[listName]].sort((a, b) => calcPostAverageRate(a) - calcPostAverageRate(b));
    
    if (asc) {
      newList.reverse();
    }

    this.setState({
      ...this.state,
      [listName]: newList,
    });
  }

  render() {
    const { list_1, list_2 } = this.state;

    return (
      <div className='rating-container'>
        <RatingList 
          list={list_1} 
          addPost={this.addPost} 
          deletePost={this.deletePost} 
          sortList={this.sortList} 
          listName="list_1" 
        />
        <RatingList 
          list={list_2} 
          addPost={this.addPost} 
          deletePost={this.deletePost} 
          sortList={this.sortList} 
          listName="list_2" 
        />
      </div>
    )
  }
}

export default RatingListContainer;