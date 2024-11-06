import React from "react";
import { FileQuestion, SearchX, FilterX } from "lucide-react";
import { Button } from "@/Components/ui/button";

export function DataTableEmpty({ searchQuery, filterCount }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      {searchQuery || filterCount > 0 ? (
        <>
          {searchQuery ? (
            <>
              <SearchX className="h-16 w-16 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                No results found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                No items match your search for "{searchQuery}". Try checking for
                typos or using different keywords.
              </p>
            </>
          ) : (
            <>
              <FilterX className="h-16 w-16 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                No matches found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                No items match your current filter criteria. Try adjusting or
                clearing your filters.
              </p>
            </>
          )}
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="mt-2"
          >
            Reset all filters
          </Button>
        </>
      ) : (
        <>
          <FileQuestion className="h-16 w-16 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            No data available
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
            There are no items to display at the moment. Check back later or try
            adding some data.
          </p>
        </>
      )}
    </div>
  );
}
