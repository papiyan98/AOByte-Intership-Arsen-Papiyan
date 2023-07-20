import React, { Component } from "react";

import './styles.scss';

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.totalPages = Math.ceil(this.props.data.length / this.props.itemsPerPage);

    this.state = {
      currentPage: 1
    };
  }

  onPageNumberClickHandler = (page) => {
    this.setState({
      currentPage: page
    });
  }

  onArrowClickHandler = (event) => {
    const { currentPage } = this.state;

    const id = event.target.closest('button').getAttribute('id');

    if (id === "prev" && currentPage > 1) {
      this.setState({ 
        currentPage: currentPage - 1 
      });

      return;
    }

    if (id === "next" && currentPage < this.totalPages) {
      this.setState({
        currentPage: currentPage + 1
      });

      return;
    }
  }

  render() {
    const { data, itemsPerPage } = this.props;
    const { currentPage } = this.state;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentData = data.slice(startIndex, endIndex);

    return (
      <div className="pagination">
        <ul className="pagination-list">
          {currentData.map((item, index) => (
            <li key={index} className="pagination-item">
              {item}
            </li>
          ))}
        </ul>
        <div className="pagination-controls">
          <button className="pagination-arrow-btn" id="prev" onClick={(event) => this.onArrowClickHandler(event)}>
            <img src="./images/arrow-left.png" alt="" />
          </button>
          {Array.from({ length: this.totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`pagination-btn${currentPage === page ? ' active' : ''}`}
              onClick={() => this.onPageNumberClickHandler(page)}
            >
              {page}
            </button>
          ))}
          <button className="pagination-arrow-btn" id="next" onClick={(event) => this.onArrowClickHandler(event)}>
            <img src="./images/arrow-right.png" alt="" />
          </button>
        </div>
      </div>
    )
  }
}

export default Pagination;