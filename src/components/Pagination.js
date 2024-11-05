// Pagination.js
import React from "react";

const Pagination = ({
  totalEntries,
  entriesPerPageOptions,
  currentPage,
  itemsPerPage,
  onChangePage,
  onChangeEntriesPerPage,
}) => {
  const totalPages = Math.ceil(totalEntries / itemsPerPage);

  // Calculate entry range for display
  const startEntry = (currentPage - 1) * itemsPerPage + 1;
  const endEntry = Math.min(startEntry + itemsPerPage - 1, totalEntries);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onChangePage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onChangePage(currentPage + 1);
    }
  };

  const handleFirst = () => {
    onChangePage(1);
  };

  const handleLast = () => {
    onChangePage(totalPages);
  };

  const handleEntriesChange = (e) => {
    const newEntriesPerPage = Number(e.target.value);
    onChangeEntriesPerPage(newEntriesPerPage);
    onChangePage(1); // Reset to the first page when entries per page changes
  };

  return (
    <div className="pagination">
      <select value={itemsPerPage} onChange={handleEntriesChange}>
        {entriesPerPageOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span>
        {startEntry}-{endEntry} of {totalEntries}
      </span>
      <div className="pagination-controls">
        <button onClick={handleFirst} disabled={currentPage === 1}>
          {"<<"}
        </button>
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          {"<"}
        </button>
        <span> </span>
        {/* Show current page and total pages */}
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          {">"}
        </button>
        <button onClick={handleLast} disabled={currentPage === totalPages}>
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
