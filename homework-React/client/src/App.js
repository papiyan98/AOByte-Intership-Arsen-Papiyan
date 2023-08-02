import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Auth from './pages/Auth/Auth';
// import LogIn from './components/LogIn/LogIn';
// import SignUp from './components/SignUp/SignUp';
import NotFound from './components/NotFoundPage/NotFound';

import { ThemeProvider } from './context/Theme.context';

import './App.scss';

const App = () => {
  const sessionTheme = sessionStorage.getItem('isDarkTheme');
  
  const [isDarkTheme, setIsDarkTheme] = useState(sessionTheme ? JSON.parse(sessionTheme) : false);

  useEffect(() => {
    sessionStorage.setItem('isDarkTheme', JSON.stringify(isDarkTheme));
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div className={`app-container ${isDarkTheme && 'dark-mode'}`}>
      <ThemeProvider value={{ isDarkTheme, toggleTheme }}>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/auth/*' element={ <Auth /> } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </div>
  )
}

export default App;
