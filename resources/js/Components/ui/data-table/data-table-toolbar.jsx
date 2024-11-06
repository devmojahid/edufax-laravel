import React, { useState, useEffect } from "react";
import { X, Search, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { useDebounce } from "@/lib/hooks/use-debounce";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/Components/ui/sheet";

export function DataTableToolbar({
  table,
  filterableColumns = [],
  searchableColumns = [],
  globalFilter,
  setGlobalFilter,
  onReset,
}) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [searchValue, setSearchValue] = useState(globalFilter ?? "");
  const debouncedSearchValue = useDebounce(searchValue, 500);

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (setGlobalFilter) {
      setGlobalFilter(searchValue);
    }
  };

  // Handle search reset
  const handleSearchReset = () => {
    setSearchValue("");
    if (setGlobalFilter) {
      setGlobalFilter("");
    }
    if (onReset) {
      onReset();
    }
    table.resetColumnFilters();
  };

  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit(e);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Desktop View */}
      <div className="hidden md:flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
        <div className="flex flex-1 items-center space-x-2">
          {searchableColumns.length > 0 && (
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center flex-1 max-w-sm"
            >
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-8 h-10 pr-20"
              />
              <div className="absolute right-0 top-0 h-full flex items-center space-x-1 pr-1">
                {searchValue && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setSearchValue("");
                      setGlobalFilter("");
                    }}
                    className="h-8 px-2 py-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
                <Button type="submit" size="sm" className="h-8">
                  Search
                </Button>
              </div>
            </form>
          )}

          <div className="flex flex-wrap gap-2">
            {filterableColumns.length > 0 &&
              filterableColumns.map((column) => (
                <DataTableFacetedFilter
                  key={column.id}
                  column={table.getColumn(column.id)}
                  title={column.title}
                  options={column.options}
                />
              ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {(isFiltered || searchValue) && (
            <Button
              variant="ghost"
              onClick={handleSearchReset}
              className="h-8 px-2 lg:px-3"
            >
              Reset all
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
          <DataTableViewOptions table={table} />
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
        <div className="flex items-center gap-2 flex-1">
          {searchableColumns.length > 0 && (
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center flex-1"
            >
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-8 h-10 w-full pr-20"
              />
              <div className="absolute right-0 top-0 h-full flex items-center space-x-1 pr-1">
                {searchValue && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleSearchReset}
                    className="h-8 px-2 py-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
                <Button type="submit" size="sm" className="h-8">
                  Search
                </Button>
              </div>
            </form>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-10 w-10 p-0 relative"
              >
                <Filter className="h-4 w-4" />
                {isFiltered && (
                  <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary rounded-full text-[10px] text-primary-foreground flex items-center justify-center">
                    {table.getState().columnFilters.length}
                  </div>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 py-4">
                {filterableColumns.map((column) => (
                  <div key={column.id} className="space-y-2">
                    <h4 className="text-sm font-medium">{column.title}</h4>
                    <DataTableFacetedFilter
                      column={table.getColumn(column.id)}
                      title={column.title}
                      options={column.options}
                    />
                  </div>
                ))}
              </div>
              {isFiltered && (
                <Button
                  variant="outline"
                  onClick={handleSearchReset}
                  className="w-full"
                >
                  Reset Filters
                  <X className="ml-2 h-4 w-4" />
                </Button>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
