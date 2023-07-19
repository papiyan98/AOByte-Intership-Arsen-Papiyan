import React, { Component } from "react";

import { calcPostAverageRate } from "../../helpers/index";

import './styles.scss'

class PostPreview extends Component {
  render() {
    const { post, deletePost, listName } = this.props;

    return (
      <div className='post-box'>
        <div className='post-preview'>
          <div className='post-info'>
            <span className='post-title-prev'>{post.title}</span>
            <span className='description'>{(post.description).slice(0, 30)}...</span>
          </div>
          <span className='average-rate'>
            <img src='./star-icon.png' alt='Average rate' />
            {parseFloat(+(calcPostAverageRate(post)).toPrecision(2))}
          </span>
        </div>
        <button className='delete-btn' onClick={() => deletePost(post, listName)}>
          <img src="./delete-icon.png" alt="Delete" />
        </button>
      </div>
    )
  }
}

export default PostPreview;
