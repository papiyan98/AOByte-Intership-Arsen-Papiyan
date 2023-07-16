import React from 'react';
import './App.css';
import List from './components/List';
import PostsBoard from './components/PostsBoard';
import { calcPostAverageRate } from './helpers/calcPostAverageRate';
import { filterMaxAverageRatedPost } from './helpers/filterMaxAverageRatedPost';
import SearchBar from './components/SearchBox';
import ResetButton from './components/ResetButton';

class PostApp extends React.Component {
  constructor(props) {
    super(props);

    this.defaultPool = this.props.pool;
    
    this.state = {
      searchedPosts: [],
      addedPosts: [],
      list1: [],
      list2: [],
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

  addComment = (comment, id) => {
    const newPool = [...this.state.pool];

    newPool.forEach(post => {
      if (post.id === id) {
        post.comments.push(comment);
      }
    });

    this.setState({
      ...this.state,
      pool: [...newPool]
    });
  }

  addPost = (listName) => {
    const unaddedPosts = this.state.pool.filter(post => !this.state.addedPosts.includes(post));

    if (!unaddedPosts.length) return;

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

  updateCommentRate = (postId, ratedCommentData, newRate) => {
    const newPool = [...this.state.pool];

    newPool.forEach(post => {
      if (post.id === postId) {
        post.comments.forEach(comment => {
          if (JSON.stringify(comment) !== JSON.stringify(ratedCommentData.comment) && ratedCommentData.index === post.comments.indexOf(comment)) {
            if (comment.rate) {
              comment.rate = (comment.rate + newRate) / 2;
            } else {
              comment.rate = newRate;
            }
          }
        });
      }
    });

    this.setState({
      ...this.state,
      pool: newPool
    });
  }

  resetApp = () => {
    document.querySelectorAll('.rate-btn').forEach(button => {
      Array.from(button.children).forEach(child => {
        switch (child.tagName) {
          case 'IMG':
            child.src = "./rate-icon.png";
            break;
          case 'SPAN':
            child.innerHTML = "Rate"
            break;
          default:
            break;
        }
      });
    });

    this.setState({
      searchedPosts: [],
      addedPosts: [],
      list1: [],
      list2: [],
      pool: structuredClone(this.props.pool)
    });
  }

  render() {
    const { list1, list2 } = this.state;

    return (
      <div className='app-container'>
        <ResetButton 
          resetApp={this.resetApp}
        />
        <SearchBar 
          pool={this.state.pool}
          filterSearchedPosts={this.filterSearchedPosts}
          clearSearchedPosts={this.clearSearchedPosts}
        />
        <PostsBoard
          pool={this.state.pool}
          searchedPosts={this.state.searchedPosts}
          addComment={this.addComment}
          updateCommentRate={this.updateCommentRate}
        />
        <div className='rating-container'>
          <List 
            list={list1} 
            addPost={this.addPost} 
            deletePost={this.deletePost} 
            sortList={this.sortList} 
            listName="list1" 
          />
          <List 
            list={list2} 
            addPost={this.addPost} 
            deletePost={this.deletePost} 
            sortList={this.sortList} 
            listName="list2" 
          />
        </div>
      </div>
    )
  }
}

export default PostApp;
