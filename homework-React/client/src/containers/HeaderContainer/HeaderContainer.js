import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

import ThemeSwitcher from "../../components/ThemeSwitcher/ThemeSwitcher";
import AuthButton from "../../components/AuthButton/AuthButton";
import SearchBar from "../../components/SearchBar/SearchBar";

import userShortcut from "../../assets/images/user-shortcut.png";
import settingsIcon from "../../assets/images/settings.png";

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
        <div className="user-info">
          <img className="user-photo" src={userShortcut} alt="" />
          <span className="user-name">{cookieValue}</span>
          <button>
            <img className="user-settings" src={settingsIcon} alt="" />
          </button>
        </div>
      ) : (
        <AuthButton />
      )}
    </div>
  )
}

export default HeaderContainer;