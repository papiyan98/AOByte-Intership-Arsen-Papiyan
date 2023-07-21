import React, { useState } from "react";

import RatingList from "../../components/RatingList/RatingList";

import { filterMaxAverageRatedPost, calcPostAverageRate } from "../../helpers/index";

import './styles.scss'

const RatingListContainer = ({ pool }) => {
  const [leftList, setLeftList] = useState([]);
  const [rightList, setRightList] = useState([]);
  const [addedPosts, setAddedPosts] = useState([]);

  const addPost = (listId) => {
    const unaddedPosts = pool.filter(post => !addedPosts.includes(post));

    if (!unaddedPosts.length) {
      return;
    }

    const post = filterMaxAverageRatedPost(unaddedPosts);
    
    setAddedPosts([...addedPosts, post]);
    
    switch (listId) {
      case 1:
        setLeftList([...leftList, post]);
        break;
      case 2:
        setRightList([...rightList, post]);
        break;
      default:
        break;
    }
  }

  const deletePost = (selectedPost, listId) => {
    const list = listId === 1 ? leftList : rightList;

    const newList = list.filter(post => !(post === selectedPost));
    
    const newAddedPosts = addedPosts.filter(post => !(post === selectedPost));

    setAddedPosts(newAddedPosts);
    
    switch (listId) {
      case 1:
        setLeftList(newList);
        break;
      case 2:
        setRightList(newList);
        break;
      default:
        break;
    }
  }

  const sortList = (listId, asc) => {
    const list = listId === 1 ? leftList : rightList;

    const newList = [...list].sort((a, b) => calcPostAverageRate(a) - calcPostAverageRate(b));
    
    if (asc) {
      newList.reverse();
    }

    switch (listId) {
      case 1:
        setLeftList(newList);
        break;
      case 2:
        setRightList(newList);
        break;
      default:
        break;
    }
  }

  return (
    <div className='rating-container'>
      <RatingList
        listId={1} 
        list={leftList} 
        addPost={addPost} 
        deletePost={deletePost} 
        sortList={sortList} 
      />
      <RatingList
        listId={2}
        list={rightList} 
        addPost={addPost} 
        deletePost={deletePost} 
        sortList={sortList} 
      />
    </div>
  )
}

export default RatingListContainer;