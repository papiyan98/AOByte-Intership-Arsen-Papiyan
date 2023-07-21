import React from "react";

import { finalAverageRateCalculation } from "../../helpers/index";

import './styles.scss'

const PostPreview = ({ listId, post, deletePost  }) => {
  return (
    <div className='post-box'>
      <div className='post-preview'>
        <div className='post-info'>
          <span className='post-title-prev'>{post.title}</span>
          <span className='description'>{(post.description).slice(0, 30)}...</span>
        </div>
        <span className='average-rate'>
          <img src='./images/star-icon.png' alt='Average rate' />
          {finalAverageRateCalculation(post)}
        </span>
      </div>
      <button className='delete-btn' onClick={() => deletePost(post, listId)}>
        <img src="./images/delete-icon.png" alt="Delete" />
      </button>
    </div>
  )
}

export default PostPreview;
