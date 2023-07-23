import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'

import './index.css';

import App from './App';

localStorage.setItem('testUser', JSON.stringify({ email: "test@aobyte.com", password: "Test123." }));

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);