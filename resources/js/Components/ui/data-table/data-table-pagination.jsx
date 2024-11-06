import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/Components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

export function DataTablePagination({
  table,
  onPaginationChange,
  pageSizeOptions = [10, 20, 30, 40, 50],
}) {
  const { pageSize, pageIndex } = table.getState().pagination;
  const totalPages = table.getPageCount();

  const handlePageSizeChange = (newSize) => {
    const size = Number(newSize);
    // Reset to first page when changing page size
    table.setPageSize(size);
    onPaginationChange?.({
      pageIndex: 0,
      pageSize: size,
    });
  };

  return (
    <div className="flex items-center justify-between px-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select value={`${pageSize}`} onValueChange={handlePageSizeChange}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {pageIndex + 1} of {totalPages || 1}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              table.setPageIndex(0);
              onPaginationChange?.({
                pageIndex: 0,
                pageSize,
              });
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              const newPageIndex = pageIndex - 1;
              table.previousPage();
              onPaginationChange?.({
                pageIndex: newPageIndex,
                pageSize,
              });
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              const newPageIndex = pageIndex + 1;
              table.nextPage();
              onPaginationChange?.({
                pageIndex: newPageIndex,
                pageSize,
              });
            }}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              const lastPageIndex = table.getPageCount() - 1;
              table.setPageIndex(lastPageIndex);
              onPaginationChange?.({
                pageIndex: lastPageIndex,
                pageSize,
              });
            }}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
