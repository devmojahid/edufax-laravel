import React, { useState, useCallback } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { DataTableEmpty } from "./data-table-empty";
import { DataTableLoading } from "./data-table-loading";
import { useIsomorphicLayoutEffect } from "@/lib/hooks/use-isomorphic-layout-effect";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { Checkbox } from "@/Components/ui/checkbox";
import { DataTableBulkActions } from "./data-table-bulk-actions";

const DataTable = ({
  columns,
  data,
  pageCount,
  onPaginationChange,
  onSortingChange,
  onFilterChange,
  filterableColumns = [],
  searchableColumns = [],
  enableRowSelection = true,
  toolbarHidden = false,
  isLoading = false,
  onRowClick,
  enableSorting = true,
  stickyHeader = true,
  striped = true,
  dense = false,
  className = "",
  enableMultiSort = false,
  enableColumnResizing = true,
  enableColumnOrdering = true,
  enablePinning = true,
  enableFullScreen = true,
  enableDensityToggle = true,
  storeStateKey,
  onBulkDelete,
  enableBulkActions = true,
  initialPageSize = 10,
  initialPageIndex = 0,
  onReset,
}) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedRows, setSelectedRows] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: initialPageIndex,
    pageSize: initialPageSize,
  });

  // Persist table state
  const [tableState, setTableState] = useLocalStorage(
    storeStateKey ? `table-state-${storeStateKey}` : null,
    {
      columnVisibility: {},
      columnOrder: [],
      columnPinning: {},
      density: dense,
    }
  );

  // Initialize table state from storage
  useIsomorphicLayoutEffect(() => {
    if (tableState) {
      setColumnVisibility(tableState.columnVisibility);
      table.setColumnOrder(tableState.columnOrder);
      table.setColumnPinning(tableState.columnPinning);
    }
  }, []);

  // Save table state changes
  const handleStateChange = useCallback(
    (state) => {
      if (storeStateKey) {
        setTableState(state);
      }
    },
    [storeStateKey]
  );

  // Add checkbox column at the beginning of columns
  const allColumns = [
    {
      id: "select",
      enableSorting: false,
      enableHiding: false,
      header: ({ table }) => (
        <div className="px-1">
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className="h-5 w-5 border-gray-400 rounded-md bg-gray-200 checked:bg-blue-600 checked:border-transparent transition duration-200 ease-in-out"
            style={{
              position: "relative",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="px-1">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="h-5 w-5 border-gray-400 rounded-md bg-gray-200 checked:bg-blue-600 checked:border-transparent transition duration-200 ease-in-out"
            style={{
              position: "relative",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </div>
      ),
      size: 40,
    },
    ...columns,
  ];

  // Get selected rows count
  const selectedRowsCount = Object.keys(selectedRows).length;

  const table = useReactTable({
    data,
    columns: allColumns,
    state: {
      pagination,
      sorting,
      columnFilters,
      globalFilter,
      rowSelection: selectedRows,
      columnVisibility,
    },
    pageCount: pageCount,
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function" ? updater(pagination) : updater;
      setPagination(newPagination);
      onPaginationChange?.(newPagination);
    },
    enableRowSelection,
    enableSorting,
    enableMultiSort,
    enableColumnResizing,
    onRowSelectionChange: setSelectedRows,
    onSortingChange: (newSorting) => {
      setSorting(newSorting);
      onSortingChange?.(newSorting);
    },
    onColumnFiltersChange: (newFilters) => {
      setColumnFilters(newFilters);
      onFilterChange?.(newFilters);
    },
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
  });

  return (
    <div className={`space-y-4 ${className}`}>
      {!toolbarHidden && (
        <>
          {selectedRowsCount > 0 && enableBulkActions ? (
            <DataTableBulkActions
              selectedRowsCount={selectedRowsCount}
              onBulkDelete={() => {
                const selectedRowIds = Object.keys(selectedRows).map(
                  (key) => table.getRow(key).original.id
                );
                onBulkDelete?.(selectedRowIds);
              }}
            />
          ) : (
            <DataTableToolbar
              table={table}
              filterableColumns={filterableColumns}
              searchableColumns={searchableColumns}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
              onReset={onReset}
            />
          )}
        </>
      )}

      <div className="relative rounded-md border bg-white dark:bg-gray-800 shadow-sm">
        <div
          className={`overflow-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700 ${
            stickyHeader ? "max-h-[calc(100vh-300px)]" : ""
          }`}
        >
          <Table>
            <TableHeader className={stickyHeader ? "sticky top-0 z-10" : ""}>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      style={{ width: header.getSize() }}
                      className={`
                        ${header.column.id === "select" ? "w-[40px] !p-0" : ""}
                        bg-gray-50/50 dark:bg-gray-800/50 
                        ${dense ? "h-10 py-2" : "h-12 py-3"} px-4
                        ${
                          header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : ""
                        }
                        relative group
                      `}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </div>
                        {enableColumnResizing &&
                          header.column.getCanResize() && (
                            <div
                              onMouseDown={header.getResizeHandler()}
                              onTouchStart={header.getResizeHandler()}
                            />
                          )}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-[400px] p-0">
                    <DataTableLoading columnCount={columns.length} />
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={`
                      hover:bg-gray-50 dark:hover:bg-gray-700/50 
                      transition-colors
                      ${
                        striped && index % 2
                          ? "bg-gray-50/50 dark:bg-gray-800/50"
                          : ""
                      }
                      ${enableRowSelection ? "cursor-pointer" : ""}
                      ${
                        row.getIsSelected()
                          ? "bg-primary/5 dark:bg-primary/10"
                          : ""
                      }
                    `}
                    onClick={(e) => {
                      if (enableRowSelection) {
                        row.toggleSelected();
                      }
                      onRowClick?.(row, e);
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={{ width: cell.column.getSize() }}
                        className={`
                          ${cell.column.id === "select" ? "!p-0" : ""}
                          ${dense ? "py-2" : "py-3"} px-4
                        `}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-[400px] p-0">
                    <DataTableEmpty
                      searchQuery={globalFilter}
                      filterCount={columnFilters.length}
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <DataTablePagination table={table} />
    </div>
  );
};

export { DataTable };
