import React from "react";
import { Routes, Route } from 'react-router-dom';

import Login from "../../components/LogIn/LogIn";
import Register from "../../components/Register/Register"

const Auth = () => {
  return (
    <Routes>
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
    </Routes>
  );
};

export default Auth;