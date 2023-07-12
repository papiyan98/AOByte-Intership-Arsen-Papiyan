import React from "react";

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      asc: false
    }
  }

  handleSortClick = () => {
    this.props.sortList(this.props.listName, this.state.asc);
    
    this.setState({ asc: !this.state.asc });
  }

  render() {
    return (
      <div className='column'>
        <button className='sort-btn' onClick={() => this.handleSortClick()}><img src='./sort-icon.png' alt='Sort' /></button>
        <button className='add-btn' onClick={() => this.props.addPost(this.props.listName)}>+</button>
        <div className='list'>
          {this.props.list.map(post => (
            <div key={post.id} className='post-box'>
              <div className='post'>
                <div className='post-info'>
                  <span className='title'>{post.title}</span>
                  <span className='description'>{(post.description).slice(0, 30)}...</span>
                </div>
                <span className='average-rate'>
                  <img src='./star-icon.png' alt='Average rate' />
                  {parseFloat(+(this.props.getPostAverageRate(post)).toPrecision(2))}
                </span>
              </div>
              <button className='delete-btn' onClick={() => this.props.deletePost(post, this.props.listName)}>-</button>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default List;