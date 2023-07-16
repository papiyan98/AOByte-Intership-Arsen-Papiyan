import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import PostApp from './App';

const pool = [
  {id: 1, title: 'Post 1', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium nam provident tempora sequi nobis? Voluptatibus similique illo consequatur assumenda a, iusto rem ullam mollitia cum eaque corporis? Aperiam, adipisci corrupti neque consequuntur, sint qui nihil hic nemo molestias vitae ducimus?', comments: [
    {text: 'Hello', rate: 5, rateCount: 1},
    {text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, delectus.', rate: 3, rateCount: 1},
    {text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, delectus.', rate: 3, rateCount: 1}
  ]},
  {id: 2, title: 'Post 2', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium nam provident tempora sequi nobis? Voluptatibus similique illo consequatur assumenda a, iusto rem ullam mollitia cum eaque corporis? Aperiam, adipisci corrupti neque consequuntur, sint qui nihil hic nemo molestias vitae ducimus?', comments: [
    {text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, delectus.', rate: 4, rateCount: 1},
    {text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, delectus.', rate: 1, rateCount: 1},
  ]},
  {id: 3, title: 'Post 3', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium nam provident tempora sequi nobis? Voluptatibus similique illo consequatur assumenda a, iusto rem ullam mollitia cum eaque corporis? Aperiam, adipisci corrupti neque consequuntur, sint qui nihil hic nemo molestias vitae ducimus?', comments: [
    {text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, delectus.', rate: 1, rateCount: 1},
    {text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, delectus.', rate: 5, rateCount: 1},
    {text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, delectus.', rate: 2, rateCount: 1}
  ]},
  {id: 4, title: 'Post 4', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium nam provident tempora sequi nobis? Voluptatibus similique illo consequatur assumenda a, iusto rem ullam mollitia cum eaque corporis? Aperiam, adipisci corrupti neque consequuntur, sint qui nihil hic nemo molestias vitae ducimus?', comments: [
    {text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, delectus.', rate: 5, rateCount: 1}
  ]}
];

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <PostApp pool={pool} />
);