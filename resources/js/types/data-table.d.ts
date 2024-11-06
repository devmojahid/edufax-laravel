interface DataTableProps {
  // Basic props
  data: any[];
  columns: ColumnDef[];
  
  // Pagination
  pageCount?: number;
  initialPageSize?: number;
  initialPageIndex?: number;
  
  // Features flags
  enableRowSelection?: boolean;
  enableMultiSort?: boolean;
  enableColumnResizing?: boolean;
  enableColumnOrdering?: boolean;
  enablePinning?: boolean;
  enableFullScreen?: boolean;
  enableDensityToggle?: boolean;
  enableBulkActions?: boolean;
  
  // Callbacks
  onPaginationChange?: (pagination: { pageIndex: number; pageSize: number }) => void;
  onSortingChange?: (sorting: SortingState) => void;
  onFilterChange?: (filters: ColumnFiltersState) => void;
  onRowClick?: (row: Row) => void;
  onBulkDelete?: (ids: string[]) => void;
  
  // Styling
  stickyHeader?: boolean;
  striped?: boolean;
  dense?: boolean;
  className?: string;
  
  // State persistence
  storeStateKey?: string;
} 