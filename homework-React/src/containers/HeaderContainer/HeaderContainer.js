import React, { Component } from "react";

import ResetButton from "../../components/ResetButton/ResetButton";
import SearchBar from "../../components/SearchBar/SearchBar";

import './styles.scss';
import AuthButton from "../../components/AuthButton/AuthButton";

class HeaderContainer extends Component {
  render() {
    const { pool, searchedPosts, resetApp, clearSearchedPosts, filterSearchedPosts  } = this.props;

    return (
      <div className="header-container">
        <ResetButton 
          resetApp={resetApp}
        />
        <SearchBar 
          pool={pool}
          searchedPosts={searchedPosts}
          clearSearchedPosts={clearSearchedPosts}
          filterSearchedPosts={filterSearchedPosts}
        />
        <AuthButton />
      </div>
    )
  }
}

export default HeaderContainer;