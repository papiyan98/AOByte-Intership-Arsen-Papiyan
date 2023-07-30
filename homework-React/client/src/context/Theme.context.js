import React, { createContext } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ value, children }) => {
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
};