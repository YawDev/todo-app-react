import React from "react";
import "../styles/Pagination.css";

const PaginationComponent = ({ totalItems, itemsPerPage, setCurrentPage }) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="paginationBtnSection">
      {pages.map((page, index) => {
        return (
          <button
            className="paginationBtn"
            key={index}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default PaginationComponent;
