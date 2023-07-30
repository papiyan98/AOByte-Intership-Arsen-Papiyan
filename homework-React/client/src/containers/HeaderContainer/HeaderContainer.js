import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

import ThemeSwitcher from "../../components/ThemeSwitcher/ThemeSwitcher";
import UserButton from "../../components/UserButton/UserButton";
import AuthButton from "../../components/AuthButton/AuthButton";
import SearchBar from "../../components/SearchBar/SearchBar";

import './styles.scss';

const HeaderContainer = ({ pool, addSearchedPosts, clearSearchedPosts  }) => {
  const [cookieValue, setCookieValue] = useState(null);

  useEffect(() => {
    const cookie = Cookies.get('name');
    setCookieValue(cookie);
  }, []);

  return (
    <div className="header-container">
      <ThemeSwitcher />
      <SearchBar 
        pool={pool}
        addSearchedPosts={addSearchedPosts}
        clearSearchedPosts={clearSearchedPosts}
      />
      {cookieValue ? (
        <UserButton 
          userName={cookieValue}
        />
      ) : (
        <AuthButton />
      )}
    </div>
  )
}

export default HeaderContainer;