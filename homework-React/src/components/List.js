import React from "react";
import PostPreview from "./PostPreview";

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
            <PostPreview 
              post={post} 
              listName={this.props.listName} 
              deletePost={this.props.deletePost}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default List;