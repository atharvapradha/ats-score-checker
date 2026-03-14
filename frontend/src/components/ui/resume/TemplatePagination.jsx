import { ChevronLeft, ChevronRight } from "lucide-react";

const TemplatePagination = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className="flex justify-center gap-4">
      <button
        disabled={currentPage === 0}
        onClick={() => setCurrentPage(p => p - 1)}
      >
        <ChevronLeft />
      </button>

      <button
        disabled={currentPage === totalPages - 1}
        onClick={() => setCurrentPage(p => p + 1)}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default TemplatePagination;