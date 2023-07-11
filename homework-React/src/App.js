import React from 'react';
import './App.css';

class PostRatingLists extends React.Component {
  constructor(props) {
    super(props);
    this.pool = props.pool;
    this.state = {
      addedPosts: [],
      list1: [],
      list2: [],
      asc: false
    };
  }

  addPost = (event) => {
    const unaddedPosts = this.pool.filter(post => !this.state.addedPosts.includes(post));

    if (!unaddedPosts.length) return;

    const post = this.filterMaxAverageRatedPost(unaddedPosts);
    
    this.setState({
      ...this.state,
      addedPosts: [...this.state.addedPosts, post],
      [event.target.id]: [...this.state[event.target.id], post]
    });
  }

  calcPostAverageRate = (post) => {
    const { comments } = post;

    if (comments.length === 0) return 0;

    const totalRate = comments.reduce((acc, comment) => {
      return acc += comment.rate;
    }, 0);

    return totalRate / comments.length;
  }

  filterMaxAverageRatedPost = (posts) => {
    let maxAverageRate = -Infinity;
    let maxAverageRatedPost = null;

    posts.forEach(post => {
      const postAverageRate = this.calcPostAverageRate(post);

      if (postAverageRate > maxAverageRate) {
        maxAverageRate = postAverageRate;
        maxAverageRatedPost = post;
      }
    })

    return maxAverageRatedPost;
  }

  deletePost(selectedPost) {
    let newList, newaddedPosts;

    if (this.state.list1.includes(selectedPost)) {
      newList = this.state.list1.filter(post => !(post === selectedPost));
      newaddedPosts = this.state.addedPosts.filter(post => !(post === selectedPost));
      this.setState({
        ...this.state,
        'addedPosts': newaddedPosts,
        'list1': newList
      });
    } else {
      newList = this.state.list2.filter(post => !(post === selectedPost));
      newaddedPosts = this.state.addedPosts.filter(post => !(post === selectedPost));
      this.setState({
        ...this.state,
        'addedPosts': newaddedPosts,
        'list2': newList
      })
    }
  }

  sortList(listName) {
    const newList = [...this.state[listName]].sort((a, b) => this.calcPostAverageRate(a) - this.calcPostAverageRate(b));

    if (this.state.asc) {
      newList.reverse();
    }

    this.setState({
      ...this.state,
      [listName]: newList,
      asc: this.state.asc ? false : true
    });
  }

  render() {
    const { list1, list2 } = this.state;

    return (
      <div className='container'>
        <div className='left-column'>
          <button className='sort-btn' onClick={() => this.sortList('list1')}><img src='./sort-icon.png' alt='Sort' /></button>
          <button className='add-btn' id='list1' onClick={(event) => this.addPost(event)}>+</button>
          <div className='list'>
            {list1.map(post => (
              <div key={post.id} className='post-box'>
                <div className='post'>
                  <div className='post-info'>
                    <span className='title'>{post.title}</span>
                    <span className='description'>{(post.description).slice(0, 30)}...</span>
                  </div>
                  <span className='average-rate'>
                    <img src='./star-icon.png' alt='Average rate' />
                    {parseFloat(+(this.calcPostAverageRate(post)).toPrecision(2))}
                  </span>
                </div>
                <button className='delete-btn' onClick={() => this.deletePost(post)}>-</button>
              </div>
            ))}
          </div>
        </div>
        <div className='right-column'>
          <button className='sort-btn' onClick={() => this.sortList('list2')}><img src='./sort-icon.png' alt='Sort' /></button>
          <button className='add-btn' id='list2' onClick={(event) => this.addPost(event)}>+</button>
          <div className='list'>
            {list2.map((post) => (
              <div key={post.id} className='post-box'>
                <div className='post'>
                  <div className='post-info'>
                    <span className='title'>{post.title}</span>
                    <span className='description'>{(post.description).slice(0, 20)}</span>
                  </div>
                  <span className='average-rate'>
                    <img src='./star-icon.png' alt='Average rate' />
                    {parseFloat(+(this.calcPostAverageRate(post)).toPrecision(2))}
                  </span>
                </div>
                <button className='delete-btn' onClick={() => this.deletePost(post)}>-</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default PostRatingLists;
