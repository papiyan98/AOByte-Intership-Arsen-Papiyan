import React from "react";

import ResetButton from "../../components/ResetButton/ResetButton";
import SearchBar from "../../components/SearchBar/SearchBar";

import './styles.scss';
import AuthButton from "../../components/AuthButton/AuthButton";

const HeaderContainer = ({ pool, searchedPosts, resetApp, clearSearchedPosts, filterSearchedPosts  }) => {
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

export default HeaderContainer;