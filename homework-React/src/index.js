import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import PostApp from './App';

import { pool } from './data';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <PostApp pool={pool} />
);