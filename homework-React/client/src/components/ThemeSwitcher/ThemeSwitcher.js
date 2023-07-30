import React, { useState } from "react";

import { useTheme } from "../../hooks/useTheme.hook";

import Button from "../Button/Button";

import lightIcon from "../../assets/images/light.png";
import darkIcon from "../../assets/images/dark.png";

import './styles.scss'

const ThemeSwitcher = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

  console.log(isDarkTheme);
  return (
    <Button 
      text="Theme"
      classname="theme-switcher"
      imgSrc={isDarkTheme ? darkIcon : lightIcon}
      handleClick={toggleTheme}
    />
  );
};

export default ThemeSwitcher;