import React, { Component } from "react";

import './styles.scss';

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1
    };
  }

  onClickHandler = (page) => {
    this.setState({
      currentPage: page
    });
  }

  render() {
    const { data, itemsPerPage } = this.props;
    const { currentPage } = this.state;

    const totalPages = Math.ceil(data.length / itemsPerPage);
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
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`pagination-btn${currentPage === page ? ' active' : ''}`}
              onClick={() => this.onClickHandler(page)}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    )
  }
}

export default Pagination;