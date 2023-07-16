import React from "react";
import { calcPostAverageRate } from "../helpers/calcPostAverageRate";

class PostPreview extends React.Component {
  render() {
    return (
      <div className='post-box'>
        <div className='post-preview'>
          <div className='post-info'>
            <span className='post-title-prev'>{this.props.post.title}</span>
            <span className='description'>{(this.props.post.description).slice(0, 30)}...</span>
          </div>
          <span className='average-rate'>
            <img src='./star-icon.png' alt='Average rate' />
            {parseFloat(+(calcPostAverageRate(this.props.post)).toPrecision(2))}
          </span>
        </div>
        <button className='delete-btn' onClick={() => this.props.deletePost(this.props.post, this.props.listName)}>-</button>
      </div>
    )
  }
}

export default PostPreview;
