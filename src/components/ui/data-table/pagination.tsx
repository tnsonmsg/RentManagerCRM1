
import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DataTablePaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSizeOptions?: number[];
}

export const DataTablePagination: React.FC<DataTablePaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 30, 50, 100],
}) => {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(startItem + pageSize - 1, totalItems);

  const handlePageSizeChange = (value: string) => {
    onPageSizeChange(Number(value));
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4">
      <div className="text-sm text-muted-foreground">
        Hiển thị {startItem}-{endItem} trên tổng số {totalItems} kết quả
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Số dòng mỗi trang</span>
          <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((option) => (
                <SelectItem key={option} value={option.toString()}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
            </PaginationItem>
            
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            
            {/* Page numbers */}
            {totalPages <= 5 ? (
              // Show all pages if 5 or fewer
              Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    onClick={() => onPageChange(i + 1)}
                    isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))
            ) : (
              // Show limited pages with ellipsis
              <>
                {/* First page */}
                <PaginationItem>
                  <PaginationLink 
                    onClick={() => onPageChange(1)}
                    isActive={currentPage === 1}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                
                {/* Ellipsis or page before current */}
                {currentPage > 3 && (
                  <PaginationItem>
                    <PaginationLink className="cursor-default">
                      ...
                    </PaginationLink>
                  </PaginationItem>
                )}
                
                {/* Page before current (if not first or second page) */}
                {currentPage > 2 && currentPage !== totalPages && (
                  <PaginationItem>
                    <PaginationLink onClick={() => onPageChange(currentPage - 1)}>
                      {currentPage - 1}
                    </PaginationLink>
                  </PaginationItem>
                )}
                
                {/* Current page (if not first or last) */}
                {currentPage !== 1 && currentPage !== totalPages && (
                  <PaginationItem>
                    <PaginationLink isActive onClick={() => onPageChange(currentPage)}>
                      {currentPage}
                    </PaginationLink>
                  </PaginationItem>
                )}
                
                {/* Page after current (if not last or second-last page) */}
                {currentPage < totalPages - 1 && currentPage !== 1 && (
                  <PaginationItem>
                    <PaginationLink onClick={() => onPageChange(currentPage + 1)}>
                      {currentPage + 1}
                    </PaginationLink>
                  </PaginationItem>
                )}
                
                {/* Ellipsis or page after current */}
                {currentPage < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationLink className="cursor-default">
                      ...
                    </PaginationLink>
                  </PaginationItem>
                )}
                
                {/* Last page */}
                <PaginationItem>
                  <PaginationLink 
                    onClick={() => onPageChange(totalPages)}
                    isActive={currentPage === totalPages}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
            
            <PaginationItem>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
