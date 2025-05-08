// frontend/src/components/ResultsTable/TablePagination.tsx
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

export const TablePagination = ({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  onPageChange,
  isLoading,
}: TablePaginationProps) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-between px-2 py-3">
      <div className="text-sm text-muted-foreground">
        {isLoading ? (
          <div className="h-5 w-60 bg-muted-foreground/20 rounded animate-pulse" />
        ) : (
          `Showing ${startIndex + 1} to ${Math.min(
            endIndex,
            totalItems
          )} of ${totalItems} entries`
        )}
      </div>
      <div className="flex items-center space-x-1">
        {isLoading ? (
          // Skeleton pagination
          Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="h-8 w-10 bg-muted-foreground/20 rounded animate-pulse"
            />
          ))
        ) : (
          // Actual pagination
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
            >
              First
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {getPageNumbers().map((pageNum) => (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(pageNum)}
              >
                {pageNum}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last
            </Button>
          </>
        )}
      </div>
    </div>
  );
};