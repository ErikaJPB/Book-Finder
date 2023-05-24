import { FC } from "react";

interface PaginationProps {
  currentPage: number;
  totalBooks: number;
  booksPerPage: number;
  paginate: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalBooks,
  booksPerPage,
  paginate,
}) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    console.log(`Page number : ${i}`);
    pageNumbers.push(i);
  }

  function handlePrevBtn() {
    paginate(currentPage > 1 ? currentPage - 1 : 1);
  }

  function handleNextBtn() {
    paginate(
      currentPage < pageNumbers.length ? currentPage + 1 : pageNumbers.length
    );
  }

  return (
    <div className="flex justify-center mt-4">
      <button
        className="px-3 py-1 rounded-l border border-gray-300 bg-white hover:bg-gray-400"
        onClick={handlePrevBtn}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`px-3 py-1 border border-gray-300 hover:bg-gray-400 ${
            pageNumber === currentPage ? "bg-gray-400" : "bg-white"
          }`}
          onClick={() => paginate(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button
        className="px-3 py-1 rounded-r border border-gray-300 bg-white hover:bg-gray-400"
        onClick={handleNextBtn}
        disabled={currentPage === pageNumbers.length}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
