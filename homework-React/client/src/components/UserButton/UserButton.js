import React, { useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";

import Button from "../Button/Button";

import userShortcut from "../../assets/images/user-shortcut.png";
import settingsIcon from "../../assets/images/settings.png";
import logoutIcon from "../../assets/images/logout.png";
import userIcon from "../../assets/images/user.png";

import './styles.scss';

const UserButton = ({ userName }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const menuRef = useRef(null);

  const handleUserBtnClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOutsideClick = (event) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target) &&
      menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleLogoutBtnClick = () => {
    Cookies.remove('name');
    Cookies.remove('email');
    Cookies.remove('password');
    Cookies.remove('access_token');

    window.location.reload();
  }

  return (
    <div className="user-btn-container" ref={containerRef}>
      <Button
        text={userName}
        classname={"user"}
        imgSrc={userShortcut}
        handleClick={handleUserBtnClick}
      />
      {isMenuOpen && (
        <div className="profile-menu" ref={menuRef}>
          <div className="user-info-wrapper">
            <div className="user-avatar">
              <img src={userIcon} alt="" />
            </div>
            <div className="user-info">
              <span className="user-name">{Cookies.get('name')}</span>
              <span className="user-email">{Cookies.get('email')}</span>
            </div>
          </div>
          <button className="settings-btn">
            <img src={settingsIcon} alt="Settings" />
            <span>Settings</span>
          </button>
          <button className="logout-btn" onClick={handleLogoutBtnClick}>
            <img src={logoutIcon} alt="Log out" />
            <span>Log out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserButton;