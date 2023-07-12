import React from 'react';
import './App.css';
import List from './components/List';

class PostRatingLists extends React.Component {
  constructor(props) {
    super(props);
    this.pool = props.pool;
    this.state = {
      addedPosts: [],
      list1: [],
      list2: [],
    };
  }

  addPost = (listName) => {
    const unaddedPosts = this.pool.filter(post => !this.state.addedPosts.includes(post));

    if (!unaddedPosts.length) return;

    const post = this.filterMaxAverageRatedPost(unaddedPosts);
    
    this.setState({
      ...this.state,
      addedPosts: [...this.state.addedPosts, post],
      [listName]: [...this.state[listName], post]
    });
  }

  calcPostAverageRate = (post) => {
    const { comments } = post;

    if (comments.length === 0) return 0;

    const totalRate = comments.reduce((acc, comment) => {
      return acc += comment.rate;
    }, 0);

    return totalRate / comments.length;
  }

  filterMaxAverageRatedPost = (posts) => {
    let maxAverageRate = -Infinity;
    let maxAverageRatedPost = null;

    posts.forEach(post => {
      const postAverageRate = this.calcPostAverageRate(post);

      if (postAverageRate > maxAverageRate) {
        maxAverageRate = postAverageRate;
        maxAverageRatedPost = post;
      }
    })

    return maxAverageRatedPost;
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
    const newList = [...this.state[listName]].sort((a, b) => this.calcPostAverageRate(a) - this.calcPostAverageRate(b));

    if (asc) {
      newList.reverse();
    }

    this.setState({
      ...this.state,
      [listName]: newList,
    });
  }

  render() {
    const { list1, list2 } = this.state;

    return (
      <div className='container'>
        <List 
          list={list1} 
          addPost={this.addPost} 
          deletePost={this.deletePost} 
          sortList={this.sortList} 
          getPostAverageRate={this.calcPostAverageRate} 
          listName="list1" 
        />
        <List 
          list={list2} 
          addPost={this.addPost} 
          deletePost={this.deletePost} 
          sortList={this.sortList} 
          getPostAverageRate={this.calcPostAverageRate} 
          listName="list2" 
        />
      </div>
    )
  }
}

export default PostRatingLists;
