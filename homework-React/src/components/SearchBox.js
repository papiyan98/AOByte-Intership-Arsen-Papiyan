import React from "react";

class SearchBar extends React.Component {
  onSubmitHandler = (event) => {
    event.preventDefault();

    const searchedComment = event.target.elements.searchInput.value;

    if (!searchedComment) {
      this.props.clearSearchedPosts();
      return;
    }

    this.props.pool.forEach(post => {
      post.comments.forEach(comment => {
        if (comment.text.toLowerCase() === searchedComment.toLowerCase()) {
          this.props.filterSearchedPosts(post);
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
        <form className="search-bar" name="searchForm" onBlur={() => this.focusBlurHandler()} onFocus={() => this.focusBlurHandler()} onSubmit={(event) => this.onSubmitHandler(event)}>
          <input type="search" name="searchInput" placeholder="Search by comment..." autoComplete="off" />
          <button type="submit"><img src="./search-icon.png" alt="Search" /></button>
        </form>
      </div>
    )
  }
}

export default SearchBar;