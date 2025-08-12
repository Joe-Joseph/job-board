import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationButton } from './PaginationButton';

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);

    // Always show first page
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push('ellipsis1');
    }

    // Show current range
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Always show last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push('ellipsis2');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {/* Previous Button */}
      <PaginationButton
        icon={ChevronLeft}
        text={'Previous'}
        handleClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page) => {
          if (typeof page === 'string' && page.startsWith('ellipsis')) {
            return (
              <span key={page} className="px-3 py-2 text-gray-400">
                ...
              </span>
            );
          }
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-7 h-7 text-sm rounded-sm font-medium transition-colors cursor-pointer ${
                currentPage === page
                  ? 'bg-black dark:bg-gray-400 text-white dark:text-black'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <PaginationButton
        icon={ChevronRight}
        text={'Next'}
        handleClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </div>
  );
};
