import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import PostApp from './App';

import { postsData } from './data';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <PostApp data={postsData} />
);