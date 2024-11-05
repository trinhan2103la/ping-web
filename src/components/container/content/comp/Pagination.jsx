/* eslint-disable react/prop-types */

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];

  if (currentPage > 2) {
    pageNumbers.push(1);
  }
  if (currentPage > 3) {
    pageNumbers.push("...");
  }

  if (currentPage > 1) {
    pageNumbers.push(currentPage - 1);
  }

  pageNumbers.push(currentPage);

  if (currentPage < totalPages) {
    pageNumbers.push(currentPage + 1);
  }

  if (currentPage < totalPages - 2) {
    pageNumbers.push("...");
  }

  if (currentPage < totalPages - 1) {
    pageNumbers.push(totalPages);
  }

  return (
    <div className="mt-4 flex justify-center">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`mx-1    ${
          currentPage === 1
            ? "bg-gray-300 text-gray-500"
            : "bg-white text-blue-500 border-blue-500"
        }`}
      >
        Previous
      </button>
      {pageNumbers.map((pageNumber, index) => (
        <button
          key={index}
          onClick={() => pageNumber !== "..." && onPageChange(pageNumber)}
          disabled={pageNumber === "..."}
          className={`mx-1 ${
            currentPage === pageNumber
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500 border-blue-500"
          }`}
        >
          {pageNumber}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`mx-1  ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-500"
            : "bg-white text-blue-500 border-blue-500"
        }`}
      >
        Next
      </button>
    </div>
  );
}
