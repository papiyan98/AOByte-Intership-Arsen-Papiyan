import React, { useState } from "react";

import './styles.scss';

const Pagination = ({ data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = data.slice(startIndex, endIndex);

  const onPageNumberClickHandler = (page) => {
    setCurrentPage(page);
  }

  const onArrowClickHandler = (event) => {
    const id = event.target.closest('button').getAttribute('id');

    if (id === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }

    if (id === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

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
        <button className="pagination-arrow-btn" id="prev" onClick={onArrowClickHandler}>
          <img src="./images/arrow-left.png" alt="" />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`pagination-btn${currentPage === page ? ' active' : ''}`}
            onClick={() => onPageNumberClickHandler(page)}
          >
            {page}
          </button>
        ))}
        <button className="pagination-arrow-btn" id="next" onClick={onArrowClickHandler}>
          <img src="./images/arrow-right.png" alt="" />
        </button>
      </div>
    </div>
  )
}

export default Pagination;