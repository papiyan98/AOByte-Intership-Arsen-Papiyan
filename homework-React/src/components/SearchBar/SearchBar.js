import React from "react";

import './styles.scss'

const SearchBar = ({ pool, searchedPosts, filterSearchedPosts, clearSearchedPosts }) => {
  const onSubmitHandler = (event) => {
    event.preventDefault();

    const searchedComment = event.target.value;

    if (!searchedComment) {
      clearSearchedPosts();

      return;
    }

    pool.forEach(post => {
      post.comments.forEach(comment => {
        if (comment.text.toLowerCase().includes(searchedComment.toLowerCase())) {
          if (!searchedPosts.includes(post)) {
            filterSearchedPosts(post);
          }
        } 
      });
    });
  }

  const focusBlurHandler = () => {
    document.forms.searchForm.classList.toggle('focused');
  }

  return (
    <div className="search-box">
      <form className="search-bar" name="searchForm" onInput={onSubmitHandler} onBlur={focusBlurHandler} onFocus={focusBlurHandler} onSubmit={(event) => event.preventDefault()}>
        <input type="search" name="searchInput" placeholder="Search by comment..." autoComplete="off" />
        <button type="submit">
          <img src="./images/search-icon.png" alt="Search" />
        </button>
      </form>
    </div>
  )
}

export default SearchBar;