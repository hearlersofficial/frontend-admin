import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '~/components/ui/pagination';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CustomPagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <Pagination>
      <PaginationContent className="flex justify-center gap-2">
        <PaginationItem>
          <PaginationPrevious
            className={`${currentPage === 1 ? 'hidden' : ''} h-8 w-8 cursor-pointer border border-[#EEE] bg-[#F5F5F5] text-[#404B52]`}
            onClick={() => onPageChange(currentPage - 1)}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === currentPage}
              onClick={() => onPageChange(page)}
              className={`h-8 w-8 cursor-pointer rounded-md border text-sm ${
                page === currentPage
                  ? 'pointer-events-none border-[#68676A] bg-[#68676A] text-white'
                  : 'border-[#EEE] bg-[#F5F5F5] text-[#404B52]'
              }`}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            className={`${currentPage === totalPages ? 'hidden' : ''} h-8 w-8 cursor-pointer border border-[#EEE] bg-[#F5F5F5] text-[#404B52]`}
            onClick={() => onPageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
