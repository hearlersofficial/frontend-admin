interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className="flex justify-center gap-2">
      <button
        className="rounded-full px-3 py-1 text-gray-500 hover:bg-gray-100 disabled:hidden"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`rounded-full px-3 py-1 ${page === currentPage ? 'bg-gray-300' : 'text-gray-500 hover:bg-gray-100'}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="rounded-full px-3 py-1 text-gray-500 hover:bg-gray-100 disabled:hidden"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        next
      </button>
    </div>
  );
};
export default Pagination;
