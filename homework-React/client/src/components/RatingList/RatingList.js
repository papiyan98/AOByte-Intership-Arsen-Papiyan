import React, { useState } from "react";

import PostPreview from "../PostPreview/PostPreview";

import './styles.scss'

const RatingList = ({ list, listId, sortList, addPost, deletePost }) => {
  const [asc, setAsc] = useState(false);

  const handleSortClick = () => {
    sortList(listId, asc);
    
    setAsc(!asc);
  }

  return (
    <div className='column'>
      <button className='sort-btn' onClick={handleSortClick}>
        <img src='./images/sort-icon.png' alt='Sort' />
      </button>
      <button className='add-btn' onClick={() => addPost(listId)}>
        <img src='./images/plus-icon.png' alt="Add" />
      </button>
      <div className='list'>
        {list.map(post => (
          <PostPreview
            key={post.id}
            post={post} 
            listId={listId} 
            deletePost={deletePost}
          />
        ))}
      </div>
    </div>
  )
}

export default RatingList;
