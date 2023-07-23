import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import LogIn from './components/LogIn/LogIn';

import './App.scss';
import SignUp from './components/SignUp/SignUp';

const App = () => {
  return (
    <div className='app-container'>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/login' element={ <LogIn /> } />
        <Route path='/signup' element={ <SignUp /> } />
      </Routes>
    </div>
  )
}

export default App;
