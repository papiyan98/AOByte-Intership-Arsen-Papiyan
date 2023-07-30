import React, { useRef, useState } from "react";

import { getAllCommentsService } from "../../services/comment.service";

import searchIcon from "../../assets/images/search.png";

import './styles.scss'

const SearchBar = ({ pool, addSearchedPosts, clearSearchedPosts }) => {
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const formRef = useRef(null);

  const onInputHandler = (event) => {
    event.preventDefault();

    const searchedComment = event.target.value;

    if (!searchedComment) {
      clearSearchedPosts();
      return;
    }

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const newDebounceTimeout = setTimeout(async () => {
      const matchedPosts = await Promise.all(
        pool.map(async (post) => {
          const comments = await getAllCommentsService(post._id);
          if (comments.some((comment) => comment.text.toLowerCase().includes(searchedComment.toLowerCase()))) {
            return post;
          }
        })
      );

      const filteredMatchedPosts = matchedPosts.filter((post) => post !== undefined);
      
      addSearchedPosts(filteredMatchedPosts);
    });

    setDebounceTimeout(newDebounceTimeout);
  };

  const focusBlurHandler = () => {
    formRef.current.classList.toggle('focused');
  };

  return (
    <div className="search-box">
      <form ref={formRef} className="search-bar" name="searchForm" onInput={onInputHandler} onBlur={focusBlurHandler} onFocus={focusBlurHandler} onSubmit={(event) => event.preventDefault()}>
        <input type="search" name="searchInput" placeholder="Search by comment..." autoComplete="off" />
        <button type="submit">
          <img src={searchIcon} alt="Search" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;