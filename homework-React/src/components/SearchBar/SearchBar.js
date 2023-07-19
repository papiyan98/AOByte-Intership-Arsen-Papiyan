import React, { Component } from "react";

import './styles.scss'

class SearchBar extends Component {
  onSubmitHandler = (event) => {
    event.preventDefault();

    const searchedComment = event.target.value;

    if (!searchedComment) {
      this.props.clearSearchedPosts();

      return;
    }

    this.props.pool.forEach(post => {
      post.comments.forEach(comment => {
        if (comment.text.toLowerCase().includes(searchedComment.toLowerCase())) {
          if (!this.props.searchedPosts.includes(post)) {
            this.props.filterSearchedPosts(post);
          }
        } 
      });
    });
  }

  focusBlurHandler = () => {
    document.forms.searchForm.classList.toggle('focused');
  }

  render() {
    return (
      <div className="search-box">
        <form className="search-bar" name="searchForm" onInput={(event) => this.onSubmitHandler(event)} onBlur={() => this.focusBlurHandler()} onFocus={() => this.focusBlurHandler()} onSubmit={(event) => event.preventDefault()}>
          <input type="search" name="searchInput" placeholder="Search by comment..." autoComplete="off" />
          <button type="submit"><img src="./search-icon.png" alt="Search" /></button>
        </form>
      </div>
    )
  }
}

export default SearchBar;