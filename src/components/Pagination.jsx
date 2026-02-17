import React from "react";
import "../styles/Pagination.css";

const PaginationComponent = ({
  totalItems,
  paginationData,
  setPaginationData,
}) => {
  let pages = [];

  console.log(paginationData);
  console.log(totalItems);

  const { itemsPerPage, currentPage } = paginationData;

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="paginationBtnSection">
      {pages.map((page, index) => {
        return (
          <button
            className={`paginationBtn ${currentPage === page ? "active" : ""}`}
            key={index}
            onClick={() =>
              setPaginationData((prev) => ({ ...prev, currentPage: page }))
            }
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default PaginationComponent;
