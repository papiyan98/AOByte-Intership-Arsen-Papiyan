import React, { Component } from "react";

import PostPreview from "../PostPreview/PostPreview";

import './styles.scss'

class RatingList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      asc: false
    }
  }

  handleSortClick = () => {
    const { listName, sortList } = this.props;

    sortList(listName, this.state.asc);
    
    this.setState({ 
      asc: !this.state.asc 
    });
  }

  render() {
    const { list, listName, addPost, deletePost } = this.props;

    return (
      <div className='column'>
        <button className='sort-btn' onClick={() => this.handleSortClick()}>
          <img src='./sort-icon.png' alt='Sort' />
        </button>
        <button className='add-btn' onClick={() => addPost(listName)}>
          <img src='./plus-icon.png' alt="Add" />
        </button>
        <div className='list'>
          {list.map(post => (
            <PostPreview
              key={post.id}
              post={post} 
              listName={listName} 
              deletePost={deletePost}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default RatingList;
