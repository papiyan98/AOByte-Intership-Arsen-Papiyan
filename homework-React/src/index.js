import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import PostRatingLists from './App';

const pool = [
  {id: 1, title: 'Post 1', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, iste.', comments: [
    {comment: 'Comment 1', rate: 5},
    {comment: 'Comment 2', rate: 3},
    {comment: 'Comment 3', rate: 3}
  ]},
  {id: 2, title: 'Post 2', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, iste.', comments: [
    {comment: 'Comment 4', rate: 4},
    {comment: 'Comment 6', rate: 1},
  ]},
  {id: 3, title: 'Post 3', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, iste.', comments: [
    {comment: 'Comment 7', rate: 1},
    {comment: 'Comment 8', rate: 2},
    {comment: 'Comment 9', rate: 5}
  ]},
  {id: 4, title: 'Post 4', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, iste.', comments: [
    {comment: 'Comment 10', rate: 5}
  ]}
];

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <PostRatingLists pool={pool} />
);