import React, { useState, useContext } from "react";

import PostPreview from "../PostPreview/PostPreview";

import { ThemeContext } from "../../context/Theme.context";

import sortIcon from "../../assets/images/sort.png";
import plusIcon from "../../assets/images/plus.png";

import './styles.scss'

const RatingList = ({ list, listId, sortList, addPost, deletePost }) => {
  const [asc, setAsc] = useState(false);

  const themeContext = useContext(ThemeContext);

  const handleSortClick = () => {
    sortList(listId, asc);
    
    setAsc(!asc);
  }

  return (
    <div className='column'>
      <button className={`sort-btn ${themeContext.isDarkTheme && 'dark-mode'}`} onClick={handleSortClick}>
        <img src={sortIcon} alt='Sort' />
      </button>
      <button className={`add-btn ${themeContext.isDarkTheme && 'dark-mode'}`} onClick={() => addPost(listId)}>
        <img src={plusIcon} alt="Add" />
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
